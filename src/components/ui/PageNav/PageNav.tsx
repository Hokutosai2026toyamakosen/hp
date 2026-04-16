import React from 'react';
import Link from 'next/link';
import styles from './PageNav.module.css';

interface NavItem {
  label: string;
  href: string;
}

interface PageNavProps {
  items: NavItem[];
  className?: string;
}

const PageNav: React.FC<PageNavProps> = ({ items, className = '' }) => {
  return (
    <ul className={`${styles.pagelinkList} ${className}`}>
      {items.map((item, index) => (
        <li key={index}>
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PageNav;
