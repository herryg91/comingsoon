import { GetServerSideProps, NextPage } from 'next'

const SitemapPage: NextPage<void> = () => <></>
export default SitemapPage

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      statusCode: 301,
      destination: "https://blogstraps.com/sitemap/embed/"+process.env.NEXT_PUBLIC_BLOGSTRAPS_EMBED_KEY+".xml",
    },
    props:{},
  };
}