import PostListItem, {
  PostListItemProps,
} from 'components/post-list-item/post-list-item';
import { render, screen } from '@testing-library/react';
import * as hooks from 'hooks/useSanityImage';
import { getFormattedPostDate } from 'utils/date';
import { ImageLoader } from 'next/image';
import { Post } from 'types/post';
import { NextRouter, useRouter } from 'next/router';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

vi.mock('hooks/useSanityImage');
vi.mock('next-sanity');
vi.mock('use-intl');

const mockUseRouter = vi.mocked(useRouter);

vi.mock('next/router', async (importOriginal) => {
  return {
    ...(await importOriginal()),
    useRouter: vi.fn(),
  };
});

describe('<PostListItem />', () => {
  const post: Post = {
    _id: '1',
    title: 'Post 1',
    description: 'Description for post 1',
    _createdAt: '2022-10-22',
    slug: { _type: 'slug', current: 'post1' },
    mainImage: {
      asset: {
        _ref: '123',
        metadata: {
          lqid: '12324',
        },
      },
    },
    categories: [
      {
        name: 'Category 1',
        description: 'Description for category 1',
      },
      {
        name: 'Category 2',
        description: 'Description for category 2',
      },
    ],
    content: {
      _type: 'block',
      children: [],
    },
    estimatedReadingTime: 5,
  };

  const props: PostListItemProps = post;

  const useSanityMock = vi.spyOn(hooks, 'default').mockReturnValue({
    loader: undefined as unknown as ImageLoader,
    src: 'http://url/image.png',
    width: 123,
    height: 123,
  });

  const router = {
    locale: 'en',
    locales: ['en', 'de'],
    asPath: '/test',
  } as unknown as NextRouter;

  beforeEach(() => {
    mockUseRouter.mockReturnValue(router);
  });

  beforeAll(() => {
    vi.useFakeTimers().setSystemTime(new Date('2022-01-12'));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.resetAllMocks();
    vi.useRealTimers();
  });

  it('should render', async () => {
    render(<PostListItem {...props} />);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link').getAttribute('href')).toBe(
      `/post/${post.slug.current}`,
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('heading').textContent).toBe(post.title);
    expect(screen.getByText(post.description)).toBeInTheDocument();
    expect(screen.getAllByTestId('badge')).toHaveLength(
      post.categories?.length ?? 0,
    );
    expect(
      screen.getByText(getFormattedPostDate(post._createdAt, router.locale)),
    ).toBeInTheDocument();
  });

  it('should not render mainImage, when not given', async () => {
    useSanityMock.mockReturnValue(null);
    render(<PostListItem {...props} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('should render without badges, when no categories are specified', async () => {
    render(<PostListItem {...props} categories={null} />);

    expect(screen.queryAllByTestId('badge')).toHaveLength(0);
  });
});
