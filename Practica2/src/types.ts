
import "https://deno.land/x/dotenv/load.ts";

export type CharacterAPI = {
  id: string;
  name: string;
  status: string;
  species: string;
  episode: [string];
};
interface CharacterSchema {
  _id: { $oid: string };
  id: number,
  name:string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: number,
  location: number,
  image: string,
  episode: number[],
}
export type EpisodeAPI = {
  name: string;
  episode: string;
};
interface EpisodeSchema {
  _id: { $oid: string };
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: number[];
}
const url = {
  characters: "https://rickandmortyapi.com/api/character",
  episodes: "https://rickandmortyapi.com/api/episode",
  locations: "https://rickandmortyapi.com/api/location",
};
export type Character = Omit<CharacterAPI, "episode"> & {
  episode: Array<EpisodeAPI>;
};
export type Episode = EpisodeAPI;
