"use client";

import Container from "@/components/ui/Container/Container";
import styles from "./CardWrapper.module.css";

interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children, className = "" }) => {
  return <ul className={`${styles.main} ${className}`}>{children}</ul>;
};

export default CardWrapper;
