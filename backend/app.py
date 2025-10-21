from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# Добавляем новые модели ответа
from schemas import StandingsResponse
# Добавляем новую сервисную функцию
from service import fetch_standings_normalized, get_players_by_competition

app = FastAPI(title="Football Data API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

# --- Эндпоинты для таблиц лиг ---

@app.get("/standings", response_model=StandingsResponse)
def get_premier_league_standings():
    """Возвращает таблицу Premier League."""
    try:
        return fetch_standings_normalized("PL")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings/la-liga", response_model=StandingsResponse)
def get_la_liga_standings():
    """Возвращает таблицу La Liga."""
    try:
        return fetch_standings_normalized("PD")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings/bundesliga", response_model=StandingsResponse)
def get_bundesliga_standings():
    """Возвращает таблицу Bundesliga."""
    try:
        return fetch_standings_normalized("BL1")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings/serie-a", response_model=StandingsResponse)
def get_serie_a_standings():
    """Возвращает таблицу Serie A."""
    try:
        return fetch_standings_normalized("SA")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings/ligue-1", response_model=StandingsResponse)
def get_ligue_1_standings():
    """Возвращает таблицу Ligue 1."""
    try:
        return fetch_standings_normalized("FL1")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")


# --- Эндпоинты для получения реальных данных игроков ---

@app.get("/players/premier-league")
def get_premier_league_players():
    """Возвращает всех реальных игроков Premier League."""
    try:
        return get_players_by_competition("PL")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/players/la-liga")
def get_la_liga_players():
    """Возвращает всех реальных игроков La Liga."""
    try:
        return get_players_by_competition("PD")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/players/bundesliga")
def get_bundesliga_players():
    """Возвращает всех реальных игроков Bundesliga."""
    try:
        return get_players_by_competition("BL1")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/players/serie-a")
def get_serie_a_players():
    """Возвращает всех реальных игроков Serie A."""
    try:
        return get_players_by_competition("SA")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/players/ligue-1")
def get_ligue_1_players():
    """Возвращает всех реальных игроков Ligue 1."""
    try:
        return get_players_by_competition("FL1")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")


# --- Health Check (без изменений) ---
@app.get("/health")
def health_check():
    """Проверка состояния API."""
    return {"status": "healthy", "message": "Football API is running"}