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
        <h1>
          {title}
          <span></span>
        </h1>
      </div>

      {subTitle && (
        <div className={styles.subtitle}>
          <div className={styles.subBlock}></div>
          <p>{subTitle}</p>
        </div>
      )}
    </div>
  )
}

export default AnimatedTitle;
