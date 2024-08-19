import { ApiErrorResponse } from "@/pkg/api/response";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import parse from 'html-react-parser';
import { useEffect, useState } from "react";
import { EmbedPost } from "@/repositories/blogstraps-api/entity";
import { BlogstrapsApi } from "@/repositories/blogstraps-api";
import { Breadcrumbs, Button, Input, Join } from "react-daisyui";
import SubscribeInput from "@/components/subscribe-input";

const PostPage: NextPage<{ post: EmbedPost }> = (param) => {
  const [current_url, set_current_url ] = useState("")

  useEffect(() => {
    set_current_url(document.URL ?? "")
    const style = document.createElement('style');
    style.innerText = param.post.style
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }, [])

  return <>
    <Head>
      <title>{param.post.title}</title>
      <meta name="description" content={param.post.seo_title} />
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_NAME} />
      {current_url !== "" && <meta property="og:url" content={document.URL} />}
      <meta property="og:title" content={param.post.seo_title} />
      <meta property="og:description" content={param.post.seo_desc} />
      <meta property="og:type" content={"article"} />
      {param.post.main_image !== "" && <meta property="og:image" content={param.post.main_image} />}
      <meta name="twitter:site" content={process.env.NEXT_PUBLIC_TWITTER} />
      <meta name="twitter:card" content={"summary_large_image"} />
      <meta name="twitter:title" content={param.post.seo_title} />
      <meta name="twitter:description" content={param.post.seo_desc} />
      {param.post.main_image !== "" && <meta name="twitter:image" content={param.post.main_image} />}
      {/* <style>{blogstrapsDefaultCSS}</style> */}
    </Head>
    <div className="py-8">
      <Breadcrumbs className="mx-auto max-w-3xl">
        <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item>{param.post.title}</Breadcrumbs.Item>
      </Breadcrumbs>
      <div>
      { parse(param.post.html.replaceAll("__currentUrl__", current_url)) }
      </div>
      <div className="w-full max-w-3xl mx-auto py-12 text-center px-4 flex">
        <div className="m-auto">
          <section id="waitlist-form" className="my-8">
            <SubscribeInput />
            
          </section>
        </div>
      </div>
    </div>
  </>
}

export default PostPage

export const getServerSideProps: GetServerSideProps<{ post: EmbedPost }> = async (context) => {
  try {
    const post_slug = context.params?.slug?.toString() ?? ""
        
    const resp = await BlogstrapsApi.GetEmbedPost(post_slug)
    return { props: { post: resp.data } }
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