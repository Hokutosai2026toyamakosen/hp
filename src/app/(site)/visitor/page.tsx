"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getPath } from "@/constants/paths";
import PageHeader from "@/components/ui/PageHeader/PageHeader";
import NoticeSection from "./NoticeSection";
import MapSection from "./MapSection";
import FaqSection from "./FaqSection";
import faqData from "@/../public/data/faq.json";
import "./visitor.css";

function VisitorContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [currentTab, setCurrentTab] = useState<"notice" | "maps" | "faq">("notice");

  useEffect(() => {
    if (tabParam === "maps" || tabParam === "faq" || tabParam === "notice") {
      setCurrentTab(tabParam as "notice" | "maps" | "faq");
    }
  }, [tabParam]);

  return (
    <>
      <div className="visitor-tab-nav">
        <button
          className={`visitor-tab-btn ${currentTab === "notice" ? "active" : ""}`}
          onClick={() => setCurrentTab("notice")}
        >
          お願い
        </button>
        <button
          className={`visitor-tab-btn ${currentTab === "maps" ? "active" : ""}`}
          onClick={() => setCurrentTab("maps")}
        >
          校内マップ
        </button>
        <button
          className={`visitor-tab-btn ${currentTab === "faq" ? "active" : ""}`}
          onClick={() => setCurrentTab("faq")}
        >
          よくあるご質問
        </button>
      </div>

      {currentTab === "notice" && <NoticeSection />}
      {currentTab === "maps" && <MapSection />}
      {currentTab === "faq" && <FaqSection data={faqData} />}
    </>
  );
}

export default function VisitorPage() {
  return (
    <main>
      <PageHeader
        enTitle="GUIDE"
        jaTitle="ご来場の皆様へ"
        imgSrc={getPath("/img/faq/mainvisual.jpg")}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <VisitorContent />
      </Suspense>
    </main>
  );
}
