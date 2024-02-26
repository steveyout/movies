import { MOVIES } from 'wikiextensions-flix'
const flixhq = new MOVIES.FlixHQ();

export default async function handler(req, res) {
  try {
    const { id } = await req.query;
    const movie = await flixhq.fetchMovieInfo(`movie/${id}`);
    const sources =await flixhq.fetchEpisodeSources(`movie/${id}`, movie.episodes[0].id);
    movie.sources = sources.sources;
    movie.subtitles=sources.subtiles
    res.status(200).json(movie);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
