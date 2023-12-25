///axios
import { ANIME } from '@consumet/extensions';
const gogoanime = new ANIME.Gogoanime();
export default async function handler(req, res) {
  try {
    const { sort } = await req.query;
    const movies = await gogoanime.fetchTopAiring();
    res.status(200).json(movies);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
