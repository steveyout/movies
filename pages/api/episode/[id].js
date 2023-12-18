///axios
import { MOVIES } from '@consumet/extensions';
const flixhq = new MOVIES.FlixHQ();
export default async function handler(req, res) {
  try {
    const { id,episode } = await req.query;
    const sources = await flixhq.fetchEpisodeSources(
        episode,
        id,
        'upcloud'
    );
    res.status(200).json(sources);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
