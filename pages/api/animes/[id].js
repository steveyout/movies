///axios
import { ANIME } from "@consumet/extensions";
const anime = new ANIME.AnimeSaturn();
export default async function handler(req, res) {
  try {
    const { sort } = await req.query;
    const movies = await anime.search("one");
    res.status(200).json(movies);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
