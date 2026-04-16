import Link from "next/link";
import { path } from "@/lib/path";
import "./header_footer.css";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link href={path("/")}>
                    <img src={path("/img/common/logo-transparent.png")} alt="第18回北斗祭 HokutoFestival2026" />
                </Link>
            </div>

            <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>

            <nav className="navi">
                <ul className="menu">
                    <li className="menu-first">
                        <span>「北斗祭」について</span>
                        <ul className="menu-second">
                            <li>
                                <Link href={path("/company#service")}>ご挨拶</Link>
                            </li>
                            <li>
                                <Link href={path("/company#philosophy")}>テーマ</Link>
                            </li>
                            <li>
                                <Link href={path("/company#overview")}>ニュース</Link>
                            </li>
                            <li>
                                <Link href={path("/company#access")}>アクセス</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="menu-first">
                        <span>企画紹介</span>
                        <ul className="menu-second">
                            <li>
                                <Link href={path("/products#service")}>展示</Link>
                            </li>
                            <li>
                                <Link href={path("/products#philosophy")}>模擬店</Link>
                            </li>
                            <li>
                                <Link href={path("/products#overview")}>ステージ企画</Link>
                            </li>
                            <li>
                                <Link href={path("/products#access")}>タイムテーブル</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link href={path("/faq")}>ご来場の皆様へ</Link>
                    </li>
                    <li>
                        <Link href={path("/works")}>ご協賛企業様</Link>
                    </li>
                    <li className="menu-contact">
                        <Link href={path("/contact")}>お問い合わせ</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
