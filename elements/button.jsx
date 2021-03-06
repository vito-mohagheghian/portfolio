import React, { memo } from "react";

import Link from "next/link";

import styles from "../styles/button.module.css";

const Button = (props) => {
  const { href, text, containerClassName, scrollerClassName, onClick } = props;
  return (
    <Link href={href}>
      <a
        className={`${styles.container} ${containerClassName}`}
        onClick={onClick}
      >
        <span className={`${styles.scroller} ${scrollerClassName}`}></span>
        <div className={styles.text}>{text}</div>
      </a>
    </Link>
  );
};

export default React.memo(Button);
