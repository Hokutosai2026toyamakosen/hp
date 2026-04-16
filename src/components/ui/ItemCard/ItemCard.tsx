"use client";
import React from "react";
import Link from "next/link";
import { getPath } from "@/constants/paths";
import styles from "./ItemCard.module.css";

interface Product {
  type: "product";
  name: string;
  team: string;
  place: string;
  image: string;
}

interface Company {
  type: "company";
  name: string;
  url: string;
  image: string;
}

type Payload = Product | Company;

export default function ItemCard({ data: item }: { data: Payload }) {
  const isProduct = item.type === "product";

  const href = isProduct
    ? getPath(`/products?name=${encodeURIComponent(item.name)}`)
    : item.url.startsWith("http")
      ? item.url
      : `https://${item.url}`;

  const target = isProduct ? undefined : "_blank";

  return (
    <li className={styles.card}>
      <Link href={href} target={target}>
        {item.image && (
          <img 
            src={getPath(item.image)} 
            alt={item.name} 
            className={styles.image} 
          />
        )}
        <div className={`${styles.info} ${isProduct ? "" : styles.textOnlyInfo}`}>
          <p className={styles.name}>{item.name}</p>
          {isProduct ? (
            <div className={styles.details}>
              {item.team && <p>{item.team}</p>}
              {item.place && <p>{item.place}</p>}
            </div>
          ) : (
            <span className={styles.companyUrl}>{item.url}</span>
          )}
        </div>
      </Link>
    </li>
  );
}
