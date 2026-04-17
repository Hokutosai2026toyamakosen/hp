import Link from "next/link";
import "./header_footer.css";
import { getPath } from "@/constants/paths";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="info-area">
                <div className="logo_sns">
                    <Link className="logo" href="/">
                        <img src={getPath("/img/common/logo-w.png")} alt="第18回北斗祭 HokutoFestival2026" />
                    </Link>
                    <div className="sns_link">
                        <a href="https://www.instagram.com/toyama.hokutosai_2026">
                            <svg
                                className="insta_icon"
                                fill="#fff"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                data-name="Layer 1"
                            >
                                <path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="info">
                    <p>富山高等専門学校射水キャンパス</p>
                    <p>
                        〒933-0293
                        <br />
                        富山県射水市海老江練谷1番2
                    </p>
                    <p>TEL: (0766)86-5135</p>
                    <p>FAX: (0766)86-5130</p>
                </div>
                <div className="sitenavi">
                    <Link href="/sitenavi?tab=sitemap">サイトマップ</Link>
                    <Link href="/sitenavi?tab=policy">サイトポリシー</Link>
                    <Link href="/sitenavi?tab=privacy">プライバシーポリシー</Link>
                </div>
                <p className="copyright">© 2026 北斗祭実行委員会 All rights reserved.</p>{" "}
            </div>

            <div className="menu-area">
                <div className="menu-col">
                    <p className="menu-title">
                        <Link href="/company">
                            「北斗祭」
                            <br />
                            　について
                        </Link>
                    </p>
                    <ul className="menu-list">
                        <li>
                            <Link href="/company#service">ご挨拶</Link>
                        </li>
                        <li>
                            <Link href="/company#philosophy">テーマ</Link>
                        </li>
                        <li>
                            <Link href="/company#overview">ニュース</Link>
                        </li>
                        <li>
                            <Link href="/company#access">アクセス</Link>
                        </li>
                    </ul>
                </div>

                <div className="menu-col">
                    <p className="menu-title">
                        <Link href="/products">企画紹介</Link>
                    </p>
                    <ul className="menu-list">
                        <li>
                            <Link href="/products#service">
                                展示
                                <br />
                            </Link>
                        </li>
                        <li>
                            <Link href="/products#philosophy">模擬店</Link>
                        </li>
                        <li>
                            <Link href="/products#overview">ステージ企画</Link>
                        </li>
                        <li>
                            <Link href="/products#access">タイムテーブル</Link>
                        </li>
                    </ul>
                </div>

                <div className="menu-col">
                    <p className="menu-title">
                        <Link href="/visitor">ご来場の皆様へ</Link>
                    </p>
                </div>

                <div className="menu-col">
                    <p className="menu-title">
                        <Link href="/works">ご協賛企業様</Link>
                    </p>
                    <p className="menu-title">
                        <Link href="/contact">お問い合わせ</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
