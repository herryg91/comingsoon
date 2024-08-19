export type EmbedPosts = {
  title: string
  seo_title: string
  seo_desc: string

  style: string
  html: string
  main_image: string

  posts: SimplePost[]
  pagination: Pagination
}

export type EmbedPost = {
  code: string
  slug: string
  title: string
  subtitle: string
  style: string
  html: string
  main_image: string
  seo_title: string
  seo_desc: string
  author: { uuid: string, name: string, slug: string }
  categories: { uuid: string, name: string, slug: string}[]
  published_at: Date
  created_by: { name: string, email: string, picture: string }
}


export type SimplePost = {
  code: string
  slug: string
  title: string
  main_image: string
  summary: string
  author: { uuid: string, name: string, slug: string }
  categories: { uuid: string, name: string, slug: string}[]
  published_at: Date
}

export type Pagination = {
  current_page: number
  last_page: number
  from: number
  to: number
  first_page: number
  per_page: number
  total: number
}

export type Category = {
  uuid: string
  name: string
  description: string
  slug: string
  seo_title: string
  seo_desc: string
}

export type SitemapUrl = {
  loc: string
  change_freq: string
  last_mod: string
}
