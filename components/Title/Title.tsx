import Head from 'next/head';
import AnimatedTitle from '../AnimatedTitle/AnimatedTitle';

interface Props {
  title: string;
  animatedTitle?: string | true;
}

const Title = ({ title, animatedTitle }: Props) => {
  return (
    <>
      <Head>
        <title>
          {`${process.env.NEXT_PUBLIC_NAME}${title ? ` - ${title}` : ''}`}
        </title>
      </Head>
      {animatedTitle && (
        <AnimatedTitle title={animatedTitle === true ? title : animatedTitle} />
      )}
    </>
  );
};

export default Title;
