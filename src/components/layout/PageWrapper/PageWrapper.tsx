import React from 'react';
import styles from './PageWrapper.module.css';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => {
  return (
    <main className={`${styles.main} ${className}`}>
      {children}
    </main>
  );
};

export default PageWrapper;
