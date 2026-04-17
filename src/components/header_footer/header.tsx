import Link from "next/link";
import { getPath } from "@/constants/paths";
import "./header_footer.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">
          <img
            src={getPath("/img/common/logo-transparent.png")}
            alt="第18回北斗祭 HokutoFestival2026"
          />
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
            <span>北斗祭について</span>
            <ul className="menu-second">
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
          </li>
          <li className="menu-first">
            <span>企画紹介</span>
            <ul className="menu-second">
              <li>
                <Link href="/products#service">展示</Link>
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
          </li>
          <li className="menu-first">
            <span>ご来場の皆様へ</span>
            <ul className="menu-second">
              <li>
                <Link href="/visitor?tab=notice">お願い</Link>
              </li>
              <li>
                <Link href="/visitor?tab=maps">校内マップ</Link>
              </li>
              <li>
                <Link href="/shuttle_bus">シャトルバス時刻表</Link>
              </li>
              <li>
                <Link href="/visitor?tab=faq">よくあるご質問</Link>
              </li>
            </ul>
          </li>
          <li className="menu-first">
            <span>ご協賛企業様</span>
            <ul className="menu-second">
              <li>
                <Link href="/works?tab=works">ご協賛企業様</Link>
              </li>
              <li>
                <Link href="/works?tab=thanks">スペシャルサンクス</Link>
              </li>
            </ul>
          </li>
          <li className="menu-contact">
            <Link href="/contact">お問い合わせ</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
