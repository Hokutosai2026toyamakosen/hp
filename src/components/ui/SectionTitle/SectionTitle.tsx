import React from 'react';
import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  children: React.ReactNode;
  type?: 'top' | 'sub';
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, type = 'sub', className = '' }) => {
  const titleClass = type === 'top' ? styles.topTitle : styles.subTitle;
  
  return (
    <h2 className={`${titleClass} ${className}`}>
      {type === 'sub' ? <span>{children}</span> : children}
    </h2>
  );
};

export default SectionTitle;
