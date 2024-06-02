///axios
import { ANIME } from "@consumet/extensions";
export default async function handler(req, res) {
  try {
    const { sort } = await req.query;
    const anime =new ANIME.Zoro();
    const movies = await anime.fetchTopAiring();
    res.status(200).json(movies);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
