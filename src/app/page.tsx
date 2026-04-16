import "./main.css";
import { path } from "@/lib/path";

export default function Home() {
    return (
        <div>
            <main className="top-page">
                <div className="mainvisual">
                    <img src={path("/img/common/mainlogo.jpg")} alt="" />
                </div>

                <section className="company fadein">
                    <h2 className="section-title">VISITOR INFORMATION</h2>

                    <div className="flex">
                        <div className="img">
                            <img src={path("/img/top/company.jpg")} alt="" />
                        </div>

                        <div className="text">
                            <p className="title">ご来場の皆様へ</p>
                            <p className="description">
                                ご来場の皆様とともに、最高の北斗祭を創り上げるため、いくつかのお願いがございます。
                                <br />
                                また、よくあるご質問に対する回答もご用意しておりますので、ぜひ一度ご覧ください。
                            </p>
                            <a className="btn" href={path("/faq")}>
                                VIEW MORE
                            </a>
                        </div>
                    </div>
                </section>

                <section className="products fadein">
                    <div className="text">
                        <h2 className="section-title">PROJECTS</h2>
                        <p className="description">
                            私たち富山高専生がつくる、色とりどりの展示や模擬店、
                            <br />
                            ステージ企画の情報を掲載しています。ぜひご活用ください。
                        </p>
                    </div>

                    <div className="products-list-area">
                        <ul className="products-list">
                            <li>
                                <img src={path("/img/top/products1.jpg")} alt="" />
                            </li>
                            <li>
                                <img src={path("/img/top/products2.jpg")} alt="" />
                            </li>
                            <li>
                                <img src={path("/img/top/products3.jpg")} alt="" />
                            </li>
                            <li>
                                <img src={path("/img/top/products4.jpg")} alt="" />
                            </li>
                            <li>
                                <img src={path("/img/top/products5.jpg")} alt="" />
                            </li>
                            <li>
                                <img src={path("/img/top/products6.jpg")} alt="" />
                            </li>
                        </ul>
                        <ul className="products-list">
                            <li>
                                <img src={path("/img/top/products1.jpg")} alt="" />
                            </li>
                            <li>
                                <img src={path("/img/top/products2.jpg")} alt="" />
                            </li>
                            <li>
                                <img src={path("/img/top/products3.jpg")} alt="" />
                            </li>
                            <li>
                                <img src={path("/img/top/products4.jpg")} alt="" />
                            </li>
                            <li>
                                <img src={path("/img/top/products5.jpg")} alt="" />
                            </li>
                            <li>
                                <img src={path("/img/top/products6.jpg")} alt="" />
                            </li>
                        </ul>
                    </div>

                    <a className="btn" href={path("/products")}>
                        VIEW MORE
                    </a>
                </section>

                <section className="works fadein">
                    <div className="text">
                        <h2 className="section-title">ABOUT</h2>
                        <p className="description">
                            富山高専のことや第18回北斗祭について
                            <br />
                            詳しい情報を掲載しています。
                        </p>
                        <p className="description">
                            また、情報を発信するニュースや当日のアクセスの方法も掲載しています。
                        </p>
                        <p className="description">ぜひご活用ください。</p>
                        <a className="btn" href={path("/company")}>
                            VIEW MORE
                        </a>
                    </div>

                    <ul className="works-list">
                        <li>
                            <img src={path("/img/top/works1.jpg")} alt="" />
                        </li>
                        <li>
                            <img src={path("/img/top/works2.jpg")} alt="" />
                        </li>
                        <li>
                            <img src={path("/img/top/works3.jpg")} alt="" />
                        </li>
                        <li>
                            <img src={path("/img/top/works4.jpg")} alt="" />
                        </li>
                    </ul>
                </section>

                <div className="faq-contact fadein">
                    <a className="item" href={path("/faq")}>
                        <div className="img">
                            <img src={path("/img/top/faq.jpg")} alt="" />
                        </div>
                        <p className="title">
                            <span className="en">MAP</span>
                            <span className="ja">キャンパスマップ</span>
                        </p>
                        <div className="arrow">
                            <img src={path("/img/top/arrow.svg")} alt="" />
                        </div>
                    </a>

                    <a className="item" href={path("/faq")}>
                        <div className="img">
                            <img src={path("/img/top/contact.jpg")} alt="" />
                        </div>
                        <p className="title">
                            <span className="en">SPONSORS</span>
                            <span className="ja">ご協賛企業様</span>
                        </p>
                        <div className="arrow">
                            <img src={path("/img/top/arrow.svg")} alt="" />
                        </div>
                    </a>
                </div>
            </main>
        </div>
    );
}
