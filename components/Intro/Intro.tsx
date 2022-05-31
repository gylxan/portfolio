import Image from 'next/image'

import styles from './Intro.module.css'

const Intro = () => {
  return (
    <div className={styles.intro}>
      <div className="relative w-40 h-40">
        <Image
          className={styles.logo}
          src="/icon.png"
          alt="logo"
          layout="fill"
        />
      </div>
    </div>
  )
}

export default Intro
