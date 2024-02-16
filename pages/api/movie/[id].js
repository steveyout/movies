///axios
import axios from 'axios'

export default async function handler(req, res) {
  try {
    const { id } = await req.query;
    const response = await axios.get(`${process.env.API}/movies/flixhq/info?id=movie/${id}`)
    const movie=response.data;
    const {data} =await axios.get(`${process.env.API}/movies/flixhq/watch`,
      {
        params: {
          episodeId:  movie.episodes[0].id,
          mediaId:  `movie/${id}`,
          server: "upcloud"
        } });
    const sources=data
    movie.sources = sources.sources;
    movie.subtitles=sources.subtitles
    res.status(200).json(movie);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
