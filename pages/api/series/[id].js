///axios

export default async function handler(req, res) {
  try {
    const { id } = await req.query;
    const response = await axios.get(`${process.env.API}/movies/flixhq/info?id=tv/${id}`)
    const movie=response.data;
    const {data} =await axios.get(`${process.env.API}/movies/flixhq/watch`,
      {
        params: {
          episodeId:  movie.episodes[0].id,
          mediaId:  `tv/${id}`,
          server: "upcloud"
        } });
    movie.sources = data.sources;
    res.status(200).json(movie);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
