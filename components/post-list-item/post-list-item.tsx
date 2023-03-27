import type { Post } from 'types/post';
import Badge from 'components/badge/badge';
import Link from 'components/link/link';
import { getFormattedPostDate } from 'utils/date';
import Image from 'next/image';
import useSanityImage from 'hooks/useSanityImage';
import { getBlurDataUrl } from 'utils/sanity';
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/router';

export type PostListItemProps = Post;
const PostListItem = ({ categories, slug, title, description, _createdAt, mainImage }: PostListItemProps) => {
  const imageProps = useSanityImage(mainImage);
  const t = useTranslations('post');
  const { locale } = useRouter();

  return (
    <Link
      href={`/post/${slug.current}`}
      underlined={false}
      coloredHover={false}
      key={title}
      className="relative top-0 flex flex-col gap-2 rounded-md p-3 p-0 transition-top"
    >
      {imageProps && (
        <div className="relative aspect-video overflow-hidden transition-transform hover:scale-105">
          <Image
            src={imageProps.src}
            loader={imageProps.loader}
            alt={`${t('cover_image_of')} ${title}`}
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
          {!!categories && categories.map((category) => (
            <Badge key={category.name}>{category.name}</Badge>
          ))}
        </div>
        <span className="self-end text-sm">
          {getFormattedPostDate(_createdAt, locale)}
        </span>
      </div>
    </Link>
  );
};

export default PostListItem;
