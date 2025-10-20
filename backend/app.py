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
    """Возвращает нормализованную таблицу лиги."""
    try:
        return fetch_standings_normalized()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e}")

@app.get("/standings-full")
def get_standings_full():
    """Возвращает полные данные таблицы лиги с матчами."""
    try:
        data = fetch_standings_normalized()
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