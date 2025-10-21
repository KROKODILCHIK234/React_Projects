import os
import requests
from dotenv import load_dotenv
import httpx # Импортируем httpx
import asyncio # Импортируем asyncio
import time # Добавляем time для задержек

load_dotenv()

API_BASE_URL = "https://api.football-data.org/v4"
HEADERS = {"X-Auth-Token": os.getenv("API_KEY")}


# --- Существующие функции (без изменений) ---
def fetch_standings_normalized(competition_id="PL"):
    # ... (код без изменений)
    api_url = f"{API_BASE_URL}/competitions/{competition_id}/standings"
    r = requests.get(api_url, headers=HEADERS, timeout=10)
    r.raise_for_status()
    data = r.json()

    season = data["season"]["startDate"][:4]
    table_src = data["standings"][0]["table"]

    table = []
    for row in table_src:
        team = row["team"]
        table.append({
            "position": row["position"],
            "name": team["name"],
            "shortName": team["shortName"],
            "points": row["points"],
            "goalsFor": row["goalsFor"],
            "goalsAgainst": row["goalsAgainst"],
            "goalDifference": row["goalDifference"],
            "crest": team["crest"],
            "played": row["playedGames"],
            "won": row["won"],
            "drawn": row["draw"],
            "lost": row["lost"],
        })

    return {
        "competition": data["competition"]["name"],
        "season": season,
        "table": table,
    }


def fetch_top_scorers(competition_id="PL"):
    # ... (код без изменений)
    api_url = f"{API_BASE_URL}/competitions/{competition_id}/scorers?limit=20"
    r = requests.get(api_url, headers=HEADERS, timeout=10)
    r.raise_for_status()
    data = r.json()

    season = data["season"]["startDate"][:4]
    scorers_src = data["scorers"]

    scorers = []
    for row in scorers_src:
        player = row["player"]
        team = row["team"]
        scorers.append({
            "player": {
                "id": player["id"],
                "name": player["name"],
                "nationality": player.get("nationality"),
                "position": player.get("position"),
            },
            "team": {
                "id": team["id"],
                "name": team["name"],
                "shortName": team["shortName"],
                "crest": team["crest"],
            },
            "goals": row["goals"],
            "assists": row.get("assists"),
            "penalties": row.get("penalties"),
        })

    return {
        "competition": data["competition"]["name"],
        "season": season,
        "scorers": scorers,
    }


# --- Новая асинхронная функция для получения всех составов ---

async def fetch_team_squad(team_id: int, client: httpx.AsyncClient):
    """Асинхронно получает состав одной команды."""
    api_url = f"{API_BASE_URL}/teams/{team_id}"
    try:
        response = await client.get(api_url, headers=HEADERS, timeout=20)
        response.raise_for_status()
        data = response.json()
        
        squad = []
        for player in data.get("squad", []):
            squad.append({
                "id": player["id"],
                "name": player["name"],
                "position": player.get("position"),
                "dateOfBirth": player.get("dateOfBirth"),
                "nationality": player.get("nationality")
            })
            
        return {
            "id": data["id"],
            "name": data["name"],
            "shortName": data["shortName"],
            "crest": data["crest"],
            "squad": squad,
        }
    except httpx.HTTPStatusError as e:
        print(f"Error fetching team {team_id}: {e}")
        return None


async def fetch_squads_for_competition(competition_id="PL"):
    """Получает все команды лиги и асинхронно запрашивает состав каждой."""
    # 1. Получаем список команд (синхронно, так как это всего один запрос)
    standings_url = f"{API_BASE_URL}/competitions/{competition_id}/standings"
    r = requests.get(standings_url, headers=HEADERS, timeout=10)
    r.raise_for_status()
    standings_data = r.json()

    team_ids = [row["team"]["id"] for row in standings_data["standings"][0]["table"]]
    
    # 2. Асинхронно получаем составы всех команд
    async with httpx.AsyncClient() as client:
        tasks = [fetch_team_squad(team_id, client) for team_id in team_ids]
        teams_with_squads = await asyncio.gather(*tasks)

    # Фильтруем команды, для которых не удалось получить данные
    valid_teams = [team for team in teams_with_squads if team is not None]

    return {
        "competition": standings_data["competition"]["name"],
        "season": standings_data["season"]["startDate"][:4],
        "teams": valid_teams,
    }


def get_players_by_competition(competition_id="PL"):
    """Получает всех игроков из команд лиги с реальными данными."""
    try:
        print(f"🔍 Начинаем парсинг реальных данных игроков для лиги {competition_id}")
        
        # 1. Получаем команды лиги
        standings_url = f"{API_BASE_URL}/competitions/{competition_id}/standings"
        r = requests.get(standings_url, headers=HEADERS, timeout=10)
        r.raise_for_status()
        standings_data = r.json()
        
        teams = standings_data["standings"][0]["table"]
        all_players = []
        
        print(f"🔍 Найдено команд в лиге: {len(teams)}")
        
        # 2. Для каждой команды получаем реальных игроков с задержками
        for i, team_data in enumerate(teams):
            team_id = team_data["team"]["id"]
            team_name = team_data["team"]["name"]
            
            # Добавляем задержку между запросами для избежания 429 ошибок
            if i > 0:
                print(f"⏳ Ожидание 3 секунды перед запросом к {team_name}...")
                time.sleep(3)
            
            try:
                # Получаем состав команды
                team_url = f"{API_BASE_URL}/teams/{team_id}"
                print(f"🔄 Запрашиваем игроков команды {team_name}...")
                team_response = requests.get(team_url, headers=HEADERS, timeout=15)
                team_response.raise_for_status()
                team_info = team_response.json()
                
                # Извлекаем игроков из состава
                squad = team_info.get("squad", [])
                print(f"✅ Найдено {len(squad)} игроков в команде {team_name}")
                
                for player in squad:
                    # Вычисляем возраст
                    age = None
                    if player.get("dateOfBirth"):
                        birth_year = int(player["dateOfBirth"][:4])
                        age = 2024 - birth_year
                    
                    all_players.append({
                        "id": player["id"],
                        "name": player["name"],
                        "position": player.get("position", "Unknown"),
                        "nationality": player.get("nationality", "Unknown"),
                        "dateOfBirth": player.get("dateOfBirth", "1990-01-01"),
                        "team": team_name,
                        "teamId": team_id,
                        "shirtNumber": player.get("shirtNumber"),
                        "role": player.get("role", "PLAYER"),
                        "age": age or 25
                    })
                    
            except requests.exceptions.HTTPError as e:
                if e.response.status_code == 429:
                    print(f"⚠️ Превышен лимит запросов для {team_name}. Ожидание 15 секунд...")
                    time.sleep(15)
                    # Повторная попытка
                    try:
                        team_response = requests.get(team_url, headers=HEADERS, timeout=15)
                        team_response.raise_for_status()
                        team_info = team_response.json()
                        squad = team_info.get("squad", [])
                        print(f"✅ Повторный запрос успешен: {len(squad)} игроков в команде {team_name}")
                        
                        for player in squad:
                            age = None
                            if player.get("dateOfBirth"):
                                birth_year = int(player["dateOfBirth"][:4])
                                age = 2024 - birth_year
                            
                            all_players.append({
                                "id": player["id"],
                                "name": player["name"],
                                "position": player.get("position", "Unknown"),
                                "nationality": player.get("nationality", "Unknown"),
                                "dateOfBirth": player.get("dateOfBirth", "1990-01-01"),
                                "team": team_name,
                                "teamId": team_id,
                                "shirtNumber": player.get("shirtNumber"),
                                "role": player.get("role", "PLAYER"),
                                "age": age or 25
                            })
                    except Exception as retry_e:
                        print(f"❌ Повторная попытка не удалась для {team_name}: {retry_e}")
                        continue
                else:
                    print(f"❌ Ошибка при получении игроков команды {team_name}: {e}")
                    continue
            except Exception as e:
                print(f"❌ Ошибка при получении игроков команды {team_name}: {e}")
                continue
        
        print(f"🎯 Всего реальных игроков получено: {len(all_players)}")
        
        return {
            "competition": standings_data["competition"]["name"],
            "season": standings_data["season"]["startDate"][:4],
            "players": all_players
        }
        
    except Exception as e:
        print(f"❌ Ошибка при получении игроков: {e}")
        raise