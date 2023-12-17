///axios
import { MOVIES } from '@consumet/extensions';
const flixhq = new MOVIES.FlixHQ();
export default async function handler(req, res) {
  try {
    const movies = await flixhq.fetchTrendingMovies();
    res.status(200).json(movies);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
