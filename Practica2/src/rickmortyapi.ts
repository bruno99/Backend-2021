import axios from "axios";
import { Character, Episode, EpisodeAPI, CharacterAPI } from "./types";

//GETSTATUS
export const getStatus = async (ctx: any) => {
  ctx.response.body = "OKProgramacion-I";
  ctx.response.status = 200;
};

export const getEpisode = async (url: string): Promise<Episode> => {
  try {
    return (await axios.get<any, { data: EpisodeAPI }>(url)).data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getEpisodes = async (urls: string[]): Promise<Array<Episode>> => {
  try {
    return await Promise.all(urls.map((url) => getEpisode(url)));
  } catch (e) {
    console.error(e);
    throw e;
  }
};
//GETCHARACTERS
export const getCharacters = async (
  url: string
): Promise<{
  next: string;
  characters: Character[];
}> => {
  try {
    const data: { info: { next: string }; results: CharacterAPI[] } = (
      await axios.get<
        any,
        { data: { info: { next: string }; results: CharacterAPI[] } }
      >(url)
    ).data;

    const charactersAPI: CharacterAPI[] = data.results;

    const characters: Character[] = await Promise.all(
      charactersAPI.map(async (charAPI) => {
        const episodes: Episode[] = await getEpisodes(charAPI.episode);
        return {
          ...charAPI,
          episode: episodes,
        };
      })
    );

    return {
      next: data.info.next,
      characters,
    };
    //ctx.response.status = 200;
  } catch (e) {
    console.error(e);
    throw e;
    //ctx.response.status = 500;
    //ctx.response.body = `Unexpected Error: ${e.message}`;
  }
};
//GETCHARACTER
export const getCharacter = async (
  url: string,
  ctx: any
): Promise<{
  next: string;
  characters: Character[];
}> => {
  try {
    const data: { info: { next: string }; results: CharacterAPI[] } = (
      await axios.get<
        any,
        { data: { info: { next: string }; results: CharacterAPI[] } }
      >(url)
    ).data;
    const character = await CharacterData.findOne({ id: Number(url) });

    if (!character) {
      ctx.response.status = 404;
      ctx.response.body = "Character not found.";
      return;
    }
    
    const charactersAPI: CharacterAPI[] = data.results;
    
    const characters: Character[] = await Promise.all(
      charactersAPI.map(async (charAPI) => {
        const episodes: Episode[] = await getEpisodes(charAPI.episode);
        return {
          ...charAPI,
          episode: episodes,
        };
      })
    );

    return {
      next: data.info.next,
      characters,
    };
    ctx.response.status = 200;
  } catch (e) {
    console.error(e);
    throw e;
    ctx.response.status = 500;
    ctx.response.body = `Unexpected Error: ${e.message}`;
  }
};
//SWiTCHSTATUS
export const switchStatus = async (
  url: string,
  ctx: any
): Promise<{
  next: string;
  characters: Character[];
}> => {
  try {
    const character = await CharacterData.findOne({ id: Number(url) });
    if (!character) {
      ctx.response.status = 404;
      ctx.response.body = "Character not found.";
      return;
    }

    await CharacterData.updateOne(
      { id: Number(url) },
      { $set: { status: character.status === "Alive" ? "Dead" : "Alive" } }
    );

    return {
      console.info("Status changed")
      //status: character.status === "Alive" ? "Dead" : "Alive",
    };
    //ctx.response.status = 200;
  } catch (e) {
    console.error(e);
    throw e;
    //ctx.response.status = 500;
    //ctx.response.body = `Unexpected Error: ${e.message}`;
  }
};
//DELETECHARACTER
export const deleteCharacter = async (
  url: string,
  ctx: any
): Promise<{
  next: string;
  characters: Character[];
}> => {
  try {

    const character =await CharacterData.deleteOne({ id: Number(url) });
      if (!character) {
        ctx.response.status = 404;
        ctx.response.body = "Character not found";
        return;
      };
    return {

      console.info("Character deleted")

    };
    //ctx.response.status = 200;
  } catch (e) {
    console.error(e);
    throw e;
    //ctx.response.status = 500;
    //ctx.response.body = `Unexpected Error: ${e.message}`;
  }
};