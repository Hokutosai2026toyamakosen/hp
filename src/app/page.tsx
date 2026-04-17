"use client";

import { useEffect } from "react";
import Link from "next/link";
import styles from "./main.module.css";
import { getPath } from "@/constants/paths";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import BaseButton from "@/components/ui/BaseButton/BaseButton";

export default function Home() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const isMobile = window.innerWidth <= 767;
      const startPosition = window.scrollY;
      const targetPosition = isMobile ? window.innerHeight * 0.4 : window.innerHeight * 0.8;
      const distance = targetPosition - startPosition;
      if (distance <= 0) return;
      const duration = 1400;
      let start: number | null = null;
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      const easeInOutSine = (t: number): number => {
        return -(Math.cos(Math.PI * t) - 1) / 2;
      };

      let requestId: number;

      const stopAnimation = () => {
        cancelAnimationFrame(requestId);
        window.removeEventListener("wheel", stopAnimation);
        window.removeEventListener("touchmove", stopAnimation);
        window.removeEventListener("mousedown", stopAnimation);
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
      };
      window.addEventListener("wheel", stopAnimation);
      window.addEventListener("touchmove", stopAnimation);
      window.addEventListener("mousedown", stopAnimation);

      function step(timestamp: number) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);

        const currentPos = startPosition + distance * easeInOutSine(progress);

        window.scrollTo(0, currentPos);

        if (progress < 1) {
          requestId = requestAnimationFrame(step);
        } else {
          stopAnimation();
        }
      }

      requestId = requestAnimationFrame(step);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <main className={styles["top-page"]}>
        <div className={styles.mainvisual}>
          <img src={getPath("/img/common/mainlogo.jpg")} alt="" />
        </div>

        <section className={`${styles.company} fadein`}>
          <SectionTitle type="top">VISITOR INFORMATION</SectionTitle>

          <div className={styles.flex}>
            <div className={styles.img}>
              <img src={getPath("/img/top/company.jpg")} alt="" />
            </div>
            <div className={styles.text}>
              <p className={styles.title}>ご来場の皆様へ</p>
              <p className={styles.description}>
                ご来場の皆様とともに、最高の北斗祭を創り上げるため、いくつかのお願いがございます。
                <br />
                また、よくあるご質問に対する回答もご用意しておりますので、ぜひ一度ご覧ください。
              </p>
              <BaseButton href="/visitor">VIEW MORE</BaseButton>
            </div>{" "}
          </div>
        </section>

        <section className={`${styles.products} fadein`}>
          <div className={styles.text}>
            <SectionTitle type="top">PROJECTS</SectionTitle>
            <p className={styles.description}>
              私たち富山高専生がつくる、色とりどりの展示や模擬店、
              <br />
              ステージ企画の情報を掲載しています。ぜひご活用ください。
            </p>
          </div>

          <div className={styles["products-list-area"]}>
            <ul className={styles["products-list"]}>
              <li>
                <img src={getPath("/img/top/products1.jpg")} alt="" />
              </li>
              <li>
                <img src={getPath("/img/top/products2.jpg")} alt="" />
              </li>
              <li>
                <img src={getPath("/img/top/products3.jpg")} alt="" />
              </li>
              <li>
                <img src={getPath("/img/top/products4.jpg")} alt="" />
              </li>
              <li>
                <img src={getPath("/img/top/products5.jpg")} alt="" />
              </li>
              <li>
                <img src={getPath("/img/top/products6.jpg")} alt="" />
              </li>
            </ul>
            <ul className={styles["products-list"]}>
              <li>
                <img src={getPath("/img/top/products1.jpg")} alt="" />
              </li>
              <li>
                <img src={getPath("/img/top/products2.jpg")} alt="" />
              </li>
              <li>
                <img src={getPath("/img/top/products3.jpg")} alt="" />
              </li>
              <li>
                <img src={getPath("/img/top/products4.jpg")} alt="" />
              </li>
              <li>
                <img src={getPath("/img/top/products5.jpg")} alt="" />
              </li>
              <li>
                <img src={getPath("/img/top/products6.jpg")} alt="" />
              </li>
            </ul>
          </div>

          <BaseButton href="/products" centered>
            VIEW MORE
          </BaseButton>
        </section>

        <section className={`${styles.works} fadein`}>
          <div className={styles.text}>
            <SectionTitle type="top">ABOUT</SectionTitle>
            <p className={styles.description}>
              富山高専のことや第18回北斗祭について
              <br />
              詳しい情報を掲載しています。
            </p>
            <p className={styles.description}>
              また、情報を発信するニュースや当日のアクセスの方法も掲載しています。
            </p>
            <p className={styles.description}>ぜひご活用ください。</p>
            <BaseButton href="/company">VIEW MORE</BaseButton>
          </div>

          <ul className={styles["works-list"]}>
            <li>
              <img src={getPath("/img/top/works1.jpg")} alt="" />
            </li>
            <li>
              <img src={getPath("/img/top/works2.jpg")} alt="" />
            </li>
            <li>
              <img src={getPath("/img/top/works3.jpg")} alt="" />
            </li>
            <li>
              <img src={getPath("/img/top/works4.jpg")} alt="" />
            </li>
          </ul>
        </section>

        <div className={`${styles["faq-contact"]} fadein`}>

          <Link className={styles.item} href="/visitor?tab=maps">
            <div className={styles.img}>
              <img src={getPath("/img/top/faq.jpg")} alt="" />
            </div>
            <p className={styles.title}>
              <span className={styles.en}>MAP</span>
              <span className={styles.ja}>キャンパスマップ</span>
            </p>
            <div className={styles.arrow}>
              <img src={getPath("/img/top/arrow.svg")} alt="" />
            </div>
          </Link>

          <Link className={styles.item} href="/works">
            <div className={styles.img}>
              <img src={getPath("/img/top/contact.jpg")} alt="" />
            </div>
            <p className={styles.title}>
              <span className={styles.en}>SPONSORS</span>
              <span className={styles.ja}>ご協賛企業様</span>
            </p>
            <div className={styles.arrow}>
              <img src={getPath("/img/top/arrow.svg")} alt="" />
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
