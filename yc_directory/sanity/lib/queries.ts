import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`
*[
  _type == "startup" &&
  defined(slug.current) &&
  (
    !defined($search) || $search == "" ||
    category match $search ||
    author->name match $search ||
    title match $search
  )
] | order(_createdAt desc) {
  views,
  category,
  image,
  author -> {
    _id,
    name, 
    image,
    slug,
    bio
  }, 
  slug,
  _createdAt, 
  description, 
  _id, 
  title, pitch
}
`);

export const STARTUP_DETAIL_QUERY = defineQuery(`*[
  _type == "startup" &&
  defined(slug.current) &&
  _id==$id
][0] {
  views,
  category,
  image,
  author -> {
    _id,
    name, 
    image,
    slug,
    bio,
    username
  }, 
  slug,
  _createdAt, 
  description, 
  _id, 
  title,
  pitch
}
`);

export const STARTUP_VIEW_DETAIL_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
    _id,views
  }
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(
  `*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }`
);

export const AUTHOR_BY_EMAIL_QUERY = defineQuery(
  `*[_type == "author" && email == $email][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }`
);

export const AUTHOR_BY_ID_QUERY = defineQuery(
  `*[_type == "author" && _id == $id][0]{
    _id,
    id,
    name,
    username,
    email,
    image,
    bio
  }`
);

export const STARTUP_QUERY_BY_ID = defineQuery(`
*[
  _type == "startup" && author._ref == $id
] | order(_createdAt desc) {
  _id,
  title,
  description,
  pitch,
  slug,
  category,
  image,
  views,
  _createdAt,
  author->{
    _id,
    name,
    image,
    slug,
    bio
  }
}
`);
