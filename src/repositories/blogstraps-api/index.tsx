import { ApiSuccessResponse } from "@/pkg/api/response";
import { EmbedPosts, EmbedPost, SitemapUrl } from "./entity";

const host = "https://api.blogstraps.com"

const GetEmbedPosts = (keyword: string, category: string, page: number, size?: number) :Promise<ApiSuccessResponse<EmbedPosts>> => {
  var api_params: string[] = []
  if(category && category !== "") { api_params.push("category="+category) }
  if(keyword !== "") { api_params.push("keyword="+keyword) }
  if(page > 0) { api_params.push("page="+page.toString()) }
  if(size && size > 0) { api_params.push("size="+size.toString()) }

  return fetch(host+`/v1/embed/posts?${api_params.join("&")}`, {
    headers: {
      "Authorization": process.env.NEXT_PUBLIC_BLOGSTRAPS_API_KEY ?? ""
    },
  }).
  then((r) => {
    if(r.status >= 400){
      throw r
    }
    return r.json()
  })
};

const GetEmbedPost = (slug: string) :Promise<ApiSuccessResponse<EmbedPost>> => {
  return fetch(host+`/v1/embed/post?slug=${slug}`, {
    headers: {
      "Authorization": process.env.NEXT_PUBLIC_BLOGSTRAPS_API_KEY ?? ""
    },
  }).
  then((r) => {
    if(r.status >= 400){
      throw r
    }
    return r.json()
  })
};


const GetSitemap = () :Promise<ApiSuccessResponse<{url: SitemapUrl[]}>> => {
  return fetch(host+`/v1/blog/sitemap`, {
    headers: {
      "Authorization": process.env.NEXT_PUBLIC_BLOGSTRAPS_API_KEY ?? ""
    },
  }).
  then((r) => {
    if(r.status >= 400){
      throw r
    }
    return r.json()
  })
};


export const BlogstrapsApi = {
  GetEmbedPosts,
  GetEmbedPost,
  GetSitemap,
};

