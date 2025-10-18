from pydantic import BaseModel
from typing import List


class Team(BaseModel):
    position: int
    name: str
    shortName: str
    points: int
    goalsFor: int
    goalsAgainst: int
    goalDifference: int
    crest: str


class StandingsResponse(BaseModel):
    competition: str
    season: str
    table: List[Team]