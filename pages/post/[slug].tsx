import { Badge, Button, Layout, PortableText, Title } from 'components';
import type { GetStaticProps } from 'next';
import { client, getBlurDataUrl, getSanitizedSiteConfig } from 'utils/sanity';
import {
  configQuery,
  pathPostLimitedQuery,
  postPaginatedLimit,
  singlePostQuery,
} from 'constants/groq';
import type { Post as IPost } from 'types/post';
import { getFormattedPostDate } from 'utils/date';
import Image from 'next/image';
import useSanityImage from 'hooks/useSanityImage';
import type { SanitySiteConfig, SiteConfig } from 'types/siteConfig';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/router';
import { getPathsFromSlug } from 'utils/url';

interface PostProps {
  siteConfig: SiteConfig;
  post: IPost;
}

const Post = ({ siteConfig, post }: PostProps) => {
  const {
    title,
    _createdAt,
    categories,
    mainImage,
    content,
    description,
    slug,
    estimatedReadingTime,
  } = post;
  const t = useTranslations('post');
  const { locale, back } = useRouter();
  const imageProps = useSanityImage(mainImage);
  return (
    <Layout
      siteConfig={siteConfig}
      title={title}
      description={description}
      openGraphImage={mainImage}
      slug={`/post/${slug.current}`}
      className="flex flex-col items-center"
      type="article"
      publishedTime={_createdAt}
    >
      <Title>{title}</Title>
      <div className="container mt-4 flex max-w-screen-lg flex-col items-center gap-4">
        <div className="flex gap-2">
          <time>{getFormattedPostDate(_createdAt, locale)}</time>·{' '}
          <span>
            {t('read_time', {
              count: estimatedReadingTime === 0 ? '< 1' : estimatedReadingTime,
            })}
          </span>
        </div>
        <div className="flex flex-wrap gap-1">
          {categories?.map((category) => (
            <Badge key={category.name} title={category.description}>
              {category.name}
            </Badge>
          ))}
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          {imageProps && (
            <Image
              src={imageProps.src}
              loader={imageProps.loader}
              blurDataURL={getBlurDataUrl(mainImage)}
              alt={`${t('cover_image_of')} ${title}`}
              className="object-cover"
              placeholder="blur"
              fill
              loading="eager"
            />
          )}
        </div>
        <article className="w-full max-w-screen-sm [&>p:first-child]:mt-0 [&>p]:my-4">
          <PortableText value={content} />
        </article>
        <Button onClick={back}>← {t('view_all_posts')}</Button>
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const allPosts = await client.fetch<IPost[] | null>(pathPostLimitedQuery, {
    limit: postPaginatedLimit,
  });

  return {
    paths: allPosts?.map((post) => {
      return {
        params: {
          slug: getPathsFromSlug(post.slug.current, post.language).join('/'),
        },
        locale: post.language,
      };
    }),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({
  params,
  locale,
}) => {
  const siteConfig = await client.fetch<SanitySiteConfig>(configQuery, {
    lang: locale,
  });
  const post = await client.fetch<IPost>(singlePostQuery, {
    slug: params?.slug,
    lang: locale,
  });

  if (!post || !post.enabled) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      siteConfig: getSanitizedSiteConfig(siteConfig),
      post,
    },
    revalidate: 60,
  };
};

export default Post;
