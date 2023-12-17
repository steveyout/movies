///axios
import { MOVIES } from '@consumet/extensions';

export default async function handler(req, res) {
  try {
    const { id } = await req.query;
    const flixhq = new MOVIES.FlixHQ();
    const movie = await flixhq.fetchMediaInfo(`movie/${id}`);
    const sources = await flixhq.fetchEpisodeSources(
      movie.episodes[0].id,
      `movie/${id}`,
      'upcloud'
    );
    movie.sources = sources.sources;
    res.status(200).json(movie);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
