import Link from "next/link";
import "./header_footer.css";
import { getPath } from "@/constants/paths";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="info-area">
                <Link className="logo" href="/">
                    <img src={getPath("/img/common/logo-w.png")} alt="第18回北斗祭 HokutoFestival2026" />
                </Link>
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
                <p className="copyright">© 2026 北斗祭実行委員会 All rights reserved.</p>
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
                        <Link href="/faq">ご来場の皆様へ</Link>
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
