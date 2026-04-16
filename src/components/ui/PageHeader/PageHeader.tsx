import React from 'react';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  enTitle: string;
  jaTitle: string;
  imgSrc: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ enTitle, jaTitle, imgSrc }) => {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.img}>
        <img src={imgSrc} alt="" />
      </div>
      <div className={styles.pageTitleArea}>
        <h1 className={styles.pageTitle}>
          <span className={styles.en}>{enTitle}</span>
          <span className={styles.ja}>{jaTitle}</span>
        </h1>
      </div>
    </div>
  );
};

export default PageHeader;
