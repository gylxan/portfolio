import styles from './AnimatedTitle.module.css'

export interface Props {
  title: string
  subTitle?: string
}
const AnimatedTitle = ({ title, subTitle }: Props) => {
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <span className={styles.block}></span>
        <h1 className={styles.blockTitle}>
          {title}
          <span className={styles.dot} />
        </h1>
      </div>

      {subTitle && (
        <div className={styles.subtitle}>
          <div className={styles.subBlock}></div>
          <p className={styles.subBlockTitle}>{subTitle}</p>
        </div>
      )}
    </div>
  )
}

export default AnimatedTitle;
