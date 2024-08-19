import { NextPage } from "next";
import { Badge, Button, Input, Join, Link } from "react-daisyui";
import { Bricolage_Grotesque } from 'next/font/google'
import Head from "next/head";
import { EmbedPosts } from "@/repositories/blogstraps-api/entity";
import { BlogstrapsApi } from "@/repositories/blogstraps-api";
import { useFetch } from "@/pkg/hook/useFetch";
import { useEffect, useState } from "react";
import moment from "moment";
import  Logo  from "@/assets/images/logo/logo.svg";
import Image from "next/image";
import SubscribeInput from "@/components/subscribe-input";

const font_bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage-grotesque',
})

const HomePage: NextPage = () => {
  const [email, setEmail] = useState("")
  const getPosts = useFetch<EmbedPosts>(BlogstrapsApi.GetEmbedPosts)
  useEffect(() => {
    if(process.env.NEXT_PUBLIC_BLOGSTRAPS_API_KEY !== ""){
        getPosts.request("", "", 1)
      }
  },[])
  
  return <>
  <Head>
    <title>Coming Soon</title>
    <meta name="description" content="Coming soon landing page template" />
  </Head>
  <div className="w-full max-w-3xl mx-auto min-h-screen py-12 text-center px-4 flex">
    <div className="m-auto">
    <section id="header" className="">
      <div className="flex justify-center">
        <Image src={Logo} alt="Coderbased" className="max-w-[72px]" />
      </div>
      <Badge className="my-4 bg-accent text-gray-700">ComingPage is coming soon</Badge>
      <h1 className={"max-w-xl text-5xl mx-auto font-bold " + font_bricolage.className}>Create Coming Soon Landing Page in Minute</h1>
    </section>
    <section id="subscribe-form" className="my-8">
      <SubscribeInput />
      <p className="text-sm text-gray-500">Join <b>2.000+</b> members who already sign up</p>
    </section>
    <section className="mb-8">
      <Link href="#" className="underline hover:text-accent">How it Works?</Link>
    </section>
    { process.env.NEXT_PUBLIC_BLOGSTRAPS_API_KEY !== "" && getPosts.data && 
    <section id="blogs" className={"p-6 border rounded-xl w-full max-w-lg mx-auto flex flex-col gap-y-4 mb-8"}>
      <h2 className="font-bold">Follow our Updates</h2>
      <div className="text-sm flex flex-col gap-y-2  mx-auto text-left w-full">
      { getPosts.data.posts.length <= 0 ?
      <p className="text-center">No updates</p>:
      getPosts.data.posts.map((p, index) => {
        if(index >= 5){
          return <></>
        }
        return <div key={`article-${p.code}`} className="flex gap-x-4 justify-between">
          <h3 className=""><Link href={`/post/${p.slug}`} className="hover:text-primary">{p.title}</Link></h3>
          <span className="whitespace-nowrap">{moment(p.published_at).format("DD MMM YYYY") }</span>
        </div>
        })
      }
      </div>
    </section>
    }
    <section id="social-media">
      <div className="flex gap-x-4 max-w-sm mx-auto justify-center ">
        <a href="#" className="socmed-fb w-8 h-8 p-2 fill-[#fff] stroke-none rounded bg-[#3b5998] border-[#3b5998]" target="_blank" rel="nofollow noopener">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"></path></svg>
        </a>
        <a href="#" className="socmed-twitter w-8 h-8 p-2 fill-[#fff] stroke-none rounded bg-[#000] border-[#000]" target="_blank" rel="nofollow noopener">
          <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
        </a>
        <a href="#" className="socmed-linkedin w-8 h-8 p-2 fill-[#fff] stroke-none rounded bg-[#0077b5] border-[#0077b5]" target="_blank"  rel="nofollow noopener">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z"></path></svg>
        </a>
        <a href="#" className="socmed-wa w-8 h-8 p-2 fill-[#fff] stroke-none rounded bg-[#25D366] border-[#25D366]" target="_blank" rel="nofollow noopener">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z"></path></svg>
        </a>
      </div>
    </section>
    </div>
  </div>
  </>
}

export default HomePage
