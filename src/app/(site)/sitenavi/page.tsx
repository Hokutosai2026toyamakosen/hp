"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getPath } from "@/constants/paths";
import PageHeader from "@/components/ui/PageHeader/PageHeader";
import PrivacySection from "./PrivacySection";
import SitemapSection from "./SitemapSection";
import SitePolicySection from "./SitePolicySection";
import "./sitenavi.css";
import "../visitor/visitor.css";

function SitenaviContent() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");

    const [currentTab, setCurrentTab] = useState<"sitemap" | "policy" | "privacy">("sitemap");

    useEffect(() => {
        if (tabParam === "policy" || tabParam === "privacy" || tabParam === "sitemap") {
            setCurrentTab(tabParam as "sitemap" | "policy" | "privacy");
        }
    }, [tabParam]);

    return (
        <>
            <div className="visitor-tab-nav">
                <button
                    className={`visitor-tab-btn ${currentTab === "sitemap" ? "active" : ""}`}
                    onClick={() => setCurrentTab("sitemap")}
                >
                    サイトマップ
                </button>
                <button
                    className={`visitor-tab-btn ${currentTab === "policy" ? "active" : ""}`}
                    onClick={() => setCurrentTab("policy")}
                >
                    サイトポリシー
                </button>
                <button
                    className={`visitor-tab-btn ${currentTab === "privacy" ? "active" : ""}`}
                    onClick={() => setCurrentTab("privacy")}
                >
                    プライバシーポリシー
                </button>
            </div>

            {currentTab === "sitemap" && <SitemapSection />}
            {currentTab === "policy" && <SitePolicySection />}
            {currentTab === "privacy" && <PrivacySection />}
        </>
    );
}

export default function SitePage() {
    return (
        <main>
            <PageHeader enTitle="SITE NAVI" jaTitle="サイト案内" imgSrc={getPath("/img/faq/mainvisual.jpg")} />
            <Suspense fallback={<div>Loading...</div>}>
                <SitenaviContent />
            </Suspense>
        </main>
    );
}
