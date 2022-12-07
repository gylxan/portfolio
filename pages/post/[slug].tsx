import { Badge, Link, Page, PortableText, Title } from 'components';
import type { GetStaticProps } from 'next';
import client from 'utils/sanity';
import { pathPostQuery, singlePostQuery } from 'constants/groq';
import type { Post as IPost } from 'types/post';
import { getFormattedPostDate } from 'utils/date';
import Image from 'next/image';
import useSanityImage from 'hooks/useSanityImage';
import { blurImageUrl } from 'constants/image';
import { Routes } from 'constants/routes';

interface PostProps {
  post: IPost;
}

const Post = ({ post }: PostProps) => {
  const { title, _createdAt, categories, mainImage, content, description, slug, estimatedReadingTime } =
    post;

  console.warn(post);
  const imageProps = useSanityImage(mainImage);
  return (
    <Page
      title={title}
      description={description}
      openGraphImage={mainImage}
      slug={`/post/${slug.current}`}
      className="flex flex-col items-center"
      type="article"
      publishedTime={_createdAt}
    >
      <Title animated={false}>{title}</Title>
      <div className="container mt-4 flex max-w-screen-lg flex-col items-center gap-4">
        <div className="flex gap-2">
          <time>{getFormattedPostDate(_createdAt)}</time>
          · <span>{estimatedReadingTime === 0 ? '< 1' : estimatedReadingTime} min read</span>
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
              blurDataURL={mainImage.asset.metadata.lqip || blurImageUrl}
              alt={`${title} cover image`}
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
        <Link href={Routes.Blog}>← View all posts</Link>
      </div>
    </Page>
  );
};

export const getStaticPaths = async () => {
  const allPosts = await client.fetch<IPost[] | null>(pathPostQuery);

  return {
    paths: allPosts?.map((post) => ({
      params: {
        slug: post.slug.current,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  const post = await client.fetch(singlePostQuery, { slug: params?.slug });

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export default Post;
