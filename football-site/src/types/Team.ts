export interface Team {
  id: string;
  name: string;
  logo: string;
  league: string;
  country: string;
  city: string;
  stadium: string;
  founded: number;
  coach: string;
  playersCount: number;
  titles: number;
  description: string;
  position?: number;
  points?: number;
  matches?: number;
  wins?: number;
  draws?: number;
  losses?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference?: number;
}
