import { groq } from 'next-sanity';

export const allPostQuery = groq`
*[_type == "post" && __i18n_lang == $lang] | order(_createdAt desc) {
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
  }
}
`;

export const singlePostQuery = groq`
*[_type == "post" && slug.current == $slug && __i18n_lang == $lang][0] {
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
  "language": __i18n_lang
}
`;

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
  "resume": resume {
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
`

export const pathPageQuery = groq`
*[_type == "page" && enabled == true] {
  slug,
  "language": __i18n_lang
}
`;

export const singlePageQuery = groq`
*[_type == "page" && slug.current == $slug && __i18n_lang == $lang][0] {
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
         "description": description[$lang]
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
     },
     _type == "posts" => {
        ...,
        "posts": ${allPostQuery}
     },
  },
}
`;


