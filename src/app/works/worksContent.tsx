"use client"

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import WorksSection from "./WorksSection";
import ThanksSection from "./ThanksSection";

interface worksDataType {
    worksData: any;
}

function WorksInner({ worksData }: worksDataType) {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab");

    const [currentTab, setCurrentTab] = useState<"works" | "thanks">("works");

    useEffect(() => {
        if (tabParam === "works" || tabParam === "thanks") {
            setCurrentTab(tabParam as "works" | "thanks");
        }
    }, [tabParam]);

    return (
        <main>
            <div className="visitor-tab-nav">
                <button
                    className={`visitor-tab-btn ${currentTab === "works" ? "active" : ""}`}
                    onClick={() => setCurrentTab("works")}
                >
                    協賛企業
                </button>
                <button
                    className={`visitor-tab-btn ${currentTab === "thanks" ? "active" : ""}`}
                    onClick={() => setCurrentTab("thanks")}
                >
                    スペシャルサンクス
                </button>
            </div>

            {currentTab === "works" && <WorksSection worksData={worksData.works} />}
            {currentTab === "thanks" && <ThanksSection worksData={worksData.thanks} />}
        </main>
    );
}

export default function WorksContent(props: { worksData: worksDataType }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <WorksInner {...props} />
        </Suspense>
    );
}
