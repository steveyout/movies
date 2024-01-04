import { MOVIES,ANIME } from '@consumet/extensions';
const flixhq = new MOVIES.FlixHQ();
const anime = new ANIME.AnimeSaturn();
export default async function handler(req, res) {
  try {
    const { query,type,page } = await req.query;
    let movies=[]
    if (type==='anime'){
      movies = await anime.search(query);
    }else {
       movies = await flixhq.search(query,page&&page);
    }
    res.status(200).json(movies);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
