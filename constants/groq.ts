import { groq } from 'next-sanity';

export const allPostQuery = groq`
*[_type == "post"] | order(_createdAt desc) {
  ...,
  'slug': slug.current,
  categories[]->,
  "mainImage": mainImage {
    asset->{
      ...,
      metadata
    }
  }
}
`;

export const singlePostQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  categories[]->,
  "mainImage": mainImage {
    asset->{
      ...,
      metadata
    }
  },
  "content": content[]{
    ...,
    ...select(
      _type == "image" => {
        ...,
        "asset": asset-> {
          ...,
          metadata
        }
      } 
    )
  },
  "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 )
}
`;

export const pathPostQuery = groq`
*[_type == "post"] {
  'slug': slug.current,
}
`;
