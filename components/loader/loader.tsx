import styles from './loader.module.css';
import clsx from 'clsx';
export interface LoaderProps {
  className?: string;
}
const Loader = ({ className }: LoaderProps) => {
  return (
    <div
      className={clsx(['flex h-20 justify-center py-6', className])}
      data-testid="loader"
    >
      <span className={styles.loader} />
    </div>
  );
};

export default Loader;
