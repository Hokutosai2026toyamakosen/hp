import React from 'react';
import Link from 'next/link';
import styles from './BaseButton.module.css';

interface BaseButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({ href, children, className = '', centered = false }) => {
  return (
    <Link 
      href={href} 
      className={`${styles.btn} ${centered ? styles.centered : ''} ${className}`}
    >
      {children}
    </Link>
  );
};

export default BaseButton;
