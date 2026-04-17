"use client";

import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Container from "@/components/ui/Container/Container";

export default function SitemapSection() {
    return (
        <div className="sitenavi-section">
            <SectionTitle>サイトマップ</SectionTitle>
            <Container>
                <div className="sitenavi-content">
                    <ul className="sitemap-list">
                        <li>
                            <Link href="/">トップページ</Link>
                        </li>
                        <li>
                            「北斗祭」について
                            <ul>
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
                        <li>
                            企画紹介
                            <ul>
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
                        <li>
                            ご来場の皆様へ
                            <ul>
                                <li>
                                    <Link href="/visitor?tab=notice">お願い</Link>
                                </li>
                                <li>
                                    <Link href="/visitor?tab=faq">よくあるご質問</Link>
                                </li>
                                <li>
                                    <Link href="/visitor?tab=maps">校内マップ</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="/shuttle_bus">シャトルバス時刻表</Link>
                        </li>
                        <li>
                            <Link href="/works">ご協賛企業様</Link>
                        </li>
                        <li>
                            <Link href="/contact">お問い合わせ</Link>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    );
}
