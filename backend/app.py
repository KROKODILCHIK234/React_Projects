from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import StandingsResponse
from service import fetch_standings_normalized

app = FastAPI(title="Football Standings API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/standings", response_model=StandingsResponse)
def get_standings():
    """Возвращает нормализованную таблицу Premier League."""
    try:
        return fetch_standings_normalized("PL")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings/la-liga", response_model=StandingsResponse)
def get_la_liga_standings():
    """Возвращает нормализованную таблицу La Liga."""
    try:
        return fetch_standings_normalized("PD")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings/bundesliga", response_model=StandingsResponse)
def get_bundesliga_standings():
    """Возвращает нормализованную таблицу Bundesliga."""
    try:
        return fetch_standings_normalized("BL1")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings/serie-a", response_model=StandingsResponse)
def get_serie_a_standings():
    """Возвращает нормализованную таблицу Serie A."""
    try:
        return fetch_standings_normalized("SA")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings/ligue-1", response_model=StandingsResponse)
def get_ligue_1_standings():
    """Возвращает нормализованную таблицу Ligue 1."""
    try:
        return fetch_standings_normalized("FL1")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings-full")
def get_standings_full():
    """Возвращает полные данные таблицы Premier League с матчами."""
    try:
        data = fetch_standings_normalized("PL")
        return {
            "competition": data["competition"],
            "season": data["season"],
            "table": data["table"]
        }
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings-full/la-liga")
def get_la_liga_standings_full():
    """Возвращает полные данные таблицы La Liga с матчами."""
    try:
        data = fetch_standings_normalized("PD")
        return {
            "competition": data["competition"],
            "season": data["season"],
            "table": data["table"]
        }
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings-full/bundesliga")
def get_bundesliga_standings_full():
    """Возвращает полные данные таблицы Bundesliga с матчами."""
    try:
        data = fetch_standings_normalized("BL1")
        return {
            "competition": data["competition"],
            "season": data["season"],
            "table": data["table"]
        }
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings-full/serie-a")
def get_serie_a_standings_full():
    """Возвращает полные данные таблицы Serie A с матчами."""
    try:
        data = fetch_standings_normalized("SA")
        return {
            "competition": data["competition"],
            "season": data["season"],
            "table": data["table"]
        }
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings-full/ligue-1")
def get_ligue_1_standings_full():
    """Возвращает полные данные таблицы Ligue 1 с матчами."""
    try:
        data = fetch_standings_normalized("FL1")
        return {
            "competition": data["competition"],
            "season": data["season"],
            "table": data["table"]
        }
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/health")
def health_check():
    """Проверка состояния API."""
    return {"status": "healthy", "message": "Football API is running"}