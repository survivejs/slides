import React from "react";
import coloredLogo from "../assets/colored-logo.svg";
import styles from "./title.scss";

const TitlePage = () => (
  <div className={styles.titleContainer}>
    <div className={styles.logoContainer}>
      <img
        className={styles.titleLogo}
        src={coloredLogo}
        title="Introduction to GraphQL"
      />
    </div>
    <div className={styles.authorContainer}>
      <h2 className={styles.author}>Juho Vepsäläinen</h2>
    </div>
  </div>
);

export default TitlePage;
