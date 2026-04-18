"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPath } from "@/constants/paths";
import "./header_footer.css";

const Header = () => {
  const [isEventDay, setIsEventDay] = useState(false);

  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const eventDay =
        (now.getFullYear() === 2026 &&
          now.getMonth() === 4 &&
          (now.getDate() === 23 || now.getDate() === 24)) ||
        new URLSearchParams(window.location.search).get("app") === "true";
      setIsEventDay(eventDay);
    };
    checkDate();
  }, []);

  return (
    <>
      {isEventDay && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          background: "#007aff",
          color: "white",
          textAlign: "center",
          padding: "15px",
          zIndex: 1200,
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}>
          <p style={{ margin: "0 0 10px 0", fontSize: "14px", fontWeight: "bold" }}>本日は北斗祭開催日です！</p>
          <Link href="/app" style={{
            background: "white",
            color: "#007aff",
            padding: "8px 20px",
            borderRadius: "20px",
            fontWeight: "bold",
            fontSize: "14px",
            textDecoration: "none",
            display: "inline-block"
          }}>
            当日用ウェブアプリを開く
          </Link>
        </div>
      )}
      <header className="header" style={{ top: isEventDay ? "95px" : "0", transition: "top 0.3s" }}>
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
    </>
  );
};

export default Header;
