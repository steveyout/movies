import { getServerSideSitemapLegacy } from 'next-sitemap'
import { PATH_PAGE } from '@/routes/paths';
import { MOVIES } from '@consumet/extensions';
export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const flixhq = new MOVIES.FlixHQ();
  const movies = await flixhq.fetchTrendingMovies();
  const fields=[]

  movies.map((movie, index) =>{
    const{id}=movie
    fields.push({
      loc:  process.env.SITE_URL+'/'+id, // Absolute url
      lastmod: new Date().toISOString(),
      priority:1
    },)
  })

  return getServerSideSitemapLegacy(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
