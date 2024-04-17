import { MOVIES } from 'wikiextensions-flix';
import axios from "@/utils/axios";

export default async function handler(req, res) {
  try {
    const { id,server } = await req.query;
    const flixhq = new MOVIES.FlixHQ();
    const videoResult= {
      sources: [],
      subtitles: [],
    }
    const movie = await flixhq.fetchMovieInfo(`movie/${id}`);
    const servers=await flixhq.fetchEpisodeServers(`movie/${id}`,movie.episodes[0].id);
    const i = servers.findIndex(s => s.name === server||'UpCloud');
    const { data } = await axios.get(`${process.env.BASE_URL}/ajax/sources/${servers[i].id}`);
    const videoUrl = new URL(data.link);
    const mid = videoUrl.href.split('/').pop()?.split('?')[0];
    let sources =await axios.post(`${process.env.API}/api/sources/upcloud`, { "id": mid })
    let res2 = await axios.get(sources.data.source);
    res2=res2.data
    const urls = res2.split('\n').filter((line) => line.includes('.m3u8'));
    const qualities = res2.split('\n').filter((line) => line.includes('RESOLUTION='));
    const TdArray = qualities.map((s, i) => {
      const f1 = s.split('x')[1];
      const f2 = urls[i];

      return [f1, f2];
    });

    for (const [f1, f2] of TdArray) {
      videoResult.sources.push({
        url: f2,
        quality: f1,
        isM3U8: f2.includes('.m3u8'),
      });
    }

    videoResult.sources.push({
      url: sources.data.source,
      isM3U8: sources.data.source.includes('.m3u8'),
      quality: 'auto',
    });

    videoResult.subtitles = sources.data.subtitle.map((s) => ({
      url: s.file?s.file:s,
      lang: s.label ? s.label : s,
    }));
    movie.sources = videoResult.sources;
    movie.subtitles=videoResult.subtitles
    res.status(200).json(movie);
  } catch (error) {
    console.error('failed to load data');
    res.status(500).json({ error: 'failed to load data' });
  }
}
