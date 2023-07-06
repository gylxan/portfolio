import { groq } from 'next-sanity';


export const postListFields = `
   _id,
  _type,
  _createdAt,
  title,
  slug,
  description,
  categories[]->{
    ...,
    "name": name[$lang],
    "description": description[$lang],
  },
  "mainImage": mainImage {
    asset->{
      ...,
      metadata
    }
  }
`
export const postPaginatedLimit = 6;
export const paginatedPostDocumentQuery = '_type == "post" && language == $lang';
export const paginatedPostOrderQuery = 'order(_createdAt desc)';

export const singlePostQuery = groq`
*[${paginatedPostDocumentQuery} && slug.current == $slug][0] {
  ...,
  categories[]->{
    ...,
    "name": name[$lang],
    "description": description[$lang],
  },
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
*[_type == "post" && enabled == true] {
  slug,
  language
}
`;

export const pathPostLimitedQuery = groq`
*[_type == "post" && enabled == true] | order(_createdAt desc)[0...$limit] {
  slug,
  language
}
`;
export const projectPaginatedLimit = 6;
export const paginatedProjectDocumentQuery = '_type == "project"';
export const paginatedProjectOrderQuery = 'order(workDate desc)';

export const projectFields = `
   _id,
  name,
  private,
  workDate,
  title,
  previewUrl,
  githubUrl,
  keywords,
  "backgroundImage": backgroundImage {
    asset->{
        ...,
        metadata
    }
  },
  "description": description[$lang]
`

export const allTranslationQuery = groq`
*[_type == "translation"]{
    namespace,
    "translations": translations[]{
        key,
        "value": value[$lang]
    }
}`;

export const configQuery = groq`
*[_type == "siteconfig"][0] {
  ...,
  "resume": resume[$lang] {
    ...,
    asset->
  },
  "menuLinks": menuLinks[] {
    ...,
    "title": title[$lang]
  },
  "copyright": copyright[$lang],
  "description": description[$lang],
  "translations": ${allTranslationQuery}
}
`;

export const pathPageQuery = groq`
*[_type == "page" && enabled == true] {
  slug,
  language
}
`;

export const singlePageQuery = groq`
*[_type == "page" && slug.current == $slug && language == $lang][0] {
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
    _type == "experiences" => {
      ...,
      "companies": companies[]->{
        ...,
        "positions": positions[] {
          ...,
          "role": role[$lang],
          "tasks": tasks[][$lang]
        },
      }
    },
     _type == "welcome" => {
      ...,
      "profileImage": profileImage {
        asset->{
          ...,
          metadata
        }
      }
     }
  },
}
`;
