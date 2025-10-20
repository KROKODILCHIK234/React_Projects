import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://api.football-data.org/v4/competitions/PL/standings"
HEADERS = {"X-Auth-Token": os.getenv("API_KEY")}


def fetch_standings_normalized():
    """Делает запрос к football-data API и нормализует JSON."""
    r = requests.get(API_URL, headers=HEADERS, timeout=10)
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