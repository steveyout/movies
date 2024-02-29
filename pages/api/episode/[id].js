///axios
import { ANIME,MOVIES } from '@consumet/extensions';
const flixhq = new MOVIES.FlixHQ();
const anime =new ANIME.AnimeSaturn();
export default async function handler(req, res) {
  try {
    const { id,episode,type } = await req.query;
    let sources={};
    if (type==='anime'){
      sources = await anime.fetchEpisodeSources( episode);
    }else {
      sources = await flixhq.fetchEpisodeSources(
        `tv/${id}`,
        episode
      );
    }
    res.status(200).json(sources);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
