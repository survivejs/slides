import React from "react";
import styles from "./title.scss";

const TitlePage = () => (
  <div className={styles.titleContainer}>
    <h1 className={styles.presentation}>Brief Introduction to GraphQL</h1>
    <h2 className={styles.author}>Juho Vepsäläinen</h2>
  </div>
);

export default TitlePage;
