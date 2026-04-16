import Link from "next/link";
import "./company.css";
import { getPath } from "@/constants/paths";

export default function Company() {
    return (
        <main>
            <div className="page-header">
                <div className="img">
                    <img src={getPath("/img/company/mainvisual.jpg")} alt="" />
                </div>
                <div className="page-title-area">
                    <h1 className="page-title">
                        <span className="en">ABOUT</span>
                        <span className="ja">「北斗祭」について</span>
                    </h1>
                </div>
            </div>

            <ul className="pagelink-list wrapper">
                <li>
                    <Link href="#service">ご挨拶</Link>
                </li>
                <li>
                    <Link href="#philosophy">テーマ</Link>
                </li>
                <li>
                    <Link href="#overview">ニュース</Link>
                </li>
                <li>
                    <Link href="#access">アクセス</Link>
                </li>
            </ul>

            <section id="service">
                <h2 className="section-title">
                    <span>ご挨拶</span>
                </h2>

                <div className="wrapper">
                    <Link className="item interior" href="/products">
                        <div className="text">
                            <p className="title-ja">富山高等専門学校　校長</p>
                            <p className="title-en">名前</p>
                            <p className="description">軽く一言お願いします。</p>
                            <p className="view-more">VIEW MORE</p>
                        </div>
                        <div className="img">
                            <img src={getPath("/img/company/products-interior.jpg")} alt="" />
                        </div>
                    </Link>

                    <Link className="item store" href="/works">
                        <div className="text">
                            <p className="title-ja">北斗祭実行委員長</p>
                            <p className="title-en">名前</p>
                            <p className="description">軽く一言お願いします。</p>
                            <p className="view-more">VIEW MORE</p>
                        </div>
                        <div className="img">
                            <img src={getPath("/img/company/products-store.jpg")} alt="" />
                        </div>
                    </Link>

                    <Link className="item interior" href="/products">
                        <div className="text">
                            <p className="title-ja">射水キャンパス学生会長</p>
                            <p className="title-en">名前</p>
                            <p className="description">軽く一言お願いします。</p>
                            <p className="view-more">VIEW MORE</p>
                        </div>
                        <div className="img">
                            <img src={getPath("/img/company/products-interior.jpg")} alt="" />
                        </div>
                    </Link>
                </div>
            </section>

            <section id="philosophy">
                <h2 className="section-title">
                    <span>テーマ</span>
                </h2>

                <div className="wrapper">
                    <div className="text-area">
                        <div className="inner">
                            <p className="title">
                                再煌
                                <br />
                                ～Reigntion～
                            </p>
                            <p className="text">文章は誰かに任せます</p>
                            <p className="text">以下同文</p>
                        </div>
                    </div>
                    <div className="img-top">
                        <img src={getPath("/img/common/mainlogo.jpg")} alt="" />
                    </div>
                </div>
            </section>

            <section id="overview">
                <h2 className="section-title">
                    <span>ニュース</span>
                </h2>
            </section>

            <section id="access">
                <h2 className="section-title">
                    <span>アクセス</span>
                </h2>

                <div className="info wrapper">
                    <p>〒933-0293 富山県射水市海老江練谷1番2</p>
                    <Link href="https://maps.app.goo.gl/qpgf2kbS3oXDsw3L6" target="_blank">
                        Google Map
                    </Link>
                </div>

                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.487505609848!2d137.15628597552555!3d36.758870770028636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5ff79ea9182a709d%3A0x9d311ac5104b9c23!2z5a-M5bGx6auY562J5bCC6ZaA5a2m5qChIOWwhOawtOOCreODo-ODs-ODkeOCuQ!5e0!3m2!1sja!2sjp!4v1775809405908!5m2!1sja!2sjp"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className="info wrapper">
                    <p>
                        当日は無料シャトルバスをご用意しております。
                        <br />
                        ぜひ、ご利用ください。
                    </p>
                    <Link href="/shuttle_bus">時刻表はこちら</Link>
                </div>
            </section>
        </main>
    );
}
