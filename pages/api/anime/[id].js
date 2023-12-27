///axios
import { ANIME } from '@consumet/extensions';
const anime =new ANIME.Zoro();

export default async function handler(req, res) {
  try {
    const { id } = await req.query;
    const movie = await anime.fetchAnimeInfo(id);
    const sources = await anime.fetchEpisodeSources(id);
    movie.sources = sources.sources;
    movie.subtitles=sources.subtitles
    res.status(200).json(movie);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
