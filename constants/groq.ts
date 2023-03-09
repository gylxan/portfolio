import { groq } from 'next-sanity';

export const allPostQuery = groq`
*[_type == "post"] | order(_createdAt desc) {
  ...,
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
    _type == "image" => {
      ...,
      "asset": asset-> {
        ...,
        metadata
      }
    } 
  },
  "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 )
}
`;

export const pathPostQuery = groq`
*[_type == "post"] {
  slug,
}
`;

export const configQuery = groq`
*[_type == "siteconfig"][0] {
  ...,
}
`

export const pathPageQuery = groq`
*[_type == "page"] {
  slug,
}
`;

export const singlePageQuery = groq`
*[_type == "page" && slug.current == $slug][0] {
  ...,
  "content": content[]{
    ...,
    _type == "column" => {
      ...,
      "content": content[]{ 
        ...,
        _type == "customImage" => {
          ...,
          "asset": asset-> {
            ...,
            metadata
         }
        },
      }
    },
    _type == "image" => {
      ...,
      "asset": asset-> {
        ...,
        metadata
      }
    },
    _type == "projects" => {
      ...,
      "projects": projects[]->{
        ...,
         "backgroundImage": backgroundImage {
            asset->{
              ...,
              metadata
            }
        },
      }
    },
    _type == "experiences" => {
      ...,
      "companies": companies[]->
    }
  },
}
`;
