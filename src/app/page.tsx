import styles from "./main.module.css";
import { getPath } from "@/constants/paths";

export default function Home() {
    return (
        <div>
            <main className={styles["top-page"]}>
                <div className={styles.mainvisual}>
                    <img src={getPath("/img/common/mainlogo.jpg")} alt="" />
                </div>

                <section className={`${styles.company} fadein`}>
                    <h2 className={styles["section-title"]}>VISITOR INFORMATION</h2>

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
                            <a className={styles.btn} href="/faq">
                                VIEW MORE
                            </a>
                        </div>
                    </div>
                </section>

                <section className={`${styles.products} fadein`}>
                    <div className={styles.text}>
                        <h2 className={styles["section-title"]}>PROJECTS</h2>
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

                    <a className={styles.btn} href="/products">
                        VIEW MORE
                    </a>
                </section>

                <section className={`${styles.works} fadein`}>
                    <div className={styles.text}>
                        <h2 className={styles["section-title"]}>ABOUT</h2>
                        <p className={styles.description}>
                            富山高専のことや第18回北斗祭について
                            <br />
                            詳しい情報を掲載しています。
                        </p>
                        <p className={styles.description}>
                            また、情報を発信するニュースや当日のアクセスの方法も掲載しています。
                        </p>
                        <p className={styles.description}>ぜひご活用ください。</p>
                        <a className={styles.btn} href="/company">
                            VIEW MORE
                        </a>
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
                    <a className={styles.item} href="/faq">
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
                    </a>

                    <a className={styles.item} href="/works">
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
                    </a>
                </div>
            </main>
        </div>
    );
}
