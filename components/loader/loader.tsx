import styles from './loader.module.css';
const Loader = () => {
  return (
    <div className="flex justify-center h-20 py-6" data-testid="loader">
      <span className={styles.loader} />
    </div>
  );
};

export default Loader;
