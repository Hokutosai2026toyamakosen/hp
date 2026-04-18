"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getPath } from "@/constants/paths";
import PageHeader from "@/components/ui/PageHeader/PageHeader";
import WorksSection from "./WorksSection";
import ThanksSection from "./ThanksSection";
import worksData from "@/../public/data/works.json";
import "../sitenavi/sitenavi.css";
import "../visitor/visitor.css";

function WorksContent() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");

    const [currentTab, setCurrentTab] = useState<"works" | "thanks">("works");

    useEffect(() => {
        if (tabParam === "works" || tabParam === "thanks") {
            setCurrentTab(tabParam as "works" | "thanks");
        }
    }, [tabParam]);

    return (
        <>
            <div className="visitor-tab-nav">
                <button
                    className={`visitor-tab-btn ${currentTab === "works" ? "active" : ""}`}
                    onClick={() => setCurrentTab("works")}
                >
                    ご協賛企業様
                </button>
                <button
                    className={`visitor-tab-btn ${currentTab === "thanks" ? "active" : ""}`}
                    onClick={() => setCurrentTab("thanks")}
                >
                    スペシャルサンクス
                </button>
            </div>

            {currentTab === "works" && <WorksSection worksData={worksData.works}/>}
            {currentTab === "thanks" && <ThanksSection worksData={worksData.thanks} />}
        </>
    );
}

export default function WorksPage() {
    return (
        <main>
            <PageHeader enTitle="WORKS" jaTitle="ご協賛企業様" imgSrc={getPath("/img/works/mainvisual.jpg")} />
            <Suspense fallback={<div>Loading...</div>}>
                <WorksContent />
            </Suspense>
        </main>
    );
}
