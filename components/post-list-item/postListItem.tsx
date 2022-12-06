import type { Post } from 'types/post';
import { Badge, Link } from 'components';
import { getFormattedPostDate } from 'utils/date';
import Image from 'next/image';
import useSanityImage from 'hooks/useSanityImage';
import { getBlurDataUrl } from 'utils/sanity';
import styles from 'components/post-list-item/postListItem.module.css';

export interface PostListItemProps {
  post: Post;
}
const PostListItem = ({ post }: PostListItemProps) => {
  const { categories, slug, title, description, _createdAt, mainImage } = post;
  const imageProps = useSanityImage(post.mainImage);

  return (
    <Link
      href={`/post/${slug}`}
      underlined={false}
      coloredHover={false}
      key={title}
      className="relative top-0 flex flex-col gap-2 rounded-md p-3 p-0 transition-top"
    >
      {imageProps && (
        <div className={styles.imageContainer}>
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            alt={`Cover Image for ${title}`}
            placeholder="blur"
            blurDataURL={getBlurDataUrl(mainImage)}
            sizes="(max-width: 640px) 90vw, 480px"
            className="rounded-md object-cover"
            fill
          />
        </div>
      )}
      <h2 className="mt-4 text-xl">{title}</h2>
      <p>{description}</p>
      <div className="flex justify-between">
        <div className="mt-auto flex flex-wrap gap-1">
          {categories?.map((category) => (
            <Badge key={category.name}>{category.name}</Badge>
          ))}
        </div>
        <span className="self-end text-sm">
          {getFormattedPostDate(_createdAt)}
        </span>
      </div>
    </Link>
  );
};

export default PostListItem;
