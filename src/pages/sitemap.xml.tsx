import { ApiErrorResponse } from '@/pkg/api/response'
import { BlogstrapsApi } from '@/repositories/blogstraps-api'
import { SitemapUrl } from '@/repositories/blogstraps-api/entity'
import { GetServerSideProps, NextPage } from 'next'

const SitemapPage: NextPage<void> = (props) => <></>
export default SitemapPage

function generateSiteMap(host: string, urls: SitemapUrl[]) {
  host = host === "" ? "" : "https://"+host
  // const domain = process.env.NEXT_PUBLIC_DOMAIN
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${host}</loc>
        <changefreq>weekly</changefreq>
      </url>
      ${urls.map((u) => 
      `<url>
        <loc>${host}${u.loc}</loc>
        ${ u.change_freq === "" ? "": "<changefreq>"+u.change_freq+"</changefreq>"}
        ${ u.last_mod === "" ? "": "<lastmod>"+u.last_mod+"</lastmod>"}
      </url>` ).join("")
      }
   </urlset>
 `;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const resp = await BlogstrapsApi.GetSitemap()
    const sitemap = generateSiteMap(context.req.headers.host ?? "", resp.data.url);

    context.res.setHeader('Content-Type', 'text/xml');
    context.res.write(sitemap);
    context.res.end();

    return { props: { } }
  } catch (error) {
    if(error as ApiErrorResponse){
      const api_err = (error as ApiErrorResponse)
      if(api_err.http_status === 404){
        return { notFound: true, }
      } else if (api_err.http_status >= 400 && api_err.http_status <500){
        return {
          redirect: {
            permanent: true,
            destination: "/500",
          },
          props:{},
        };
      }      
    } else {
      console.log("Unknown error:",error);
    }
  }
  return { notFound: true, };
}
