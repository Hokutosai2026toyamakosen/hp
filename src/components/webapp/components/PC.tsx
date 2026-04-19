"use client";

import React, { Suspense, useMemo } from "react";
import "@/components/webapp/App.css";
import Menu from "@/components/webapp/components/Layout/menu";
import EventStatus from "@/components/webapp/components/Status/EventStatus";
import BoothStatus from "@/components/webapp/components/Status/BoothStatus";
import NewsStatus from "@/components/webapp/components/Status/NewsStatus";
import ServerConfig from "@/components/webapp/components/Misc/ServerConfig";
import { useRole } from "@/components/webapp/contexts/RoleContext";
import { useData } from "@/components/webapp/contexts/DataContext";
import { useAppTime } from "@/components/webapp/contexts/TimeContext";
import dayjs from "dayjs";
import { MapContainer } from "react-leaflet";

const BusStatus = React.lazy(() => import("@/components/webapp/components/Status/BusStatus"));
const LostStatus = React.lazy(() => import("@/components/webapp/components/Status/LostStatus"));
const QAStatus = React.lazy(() => import("@/components/webapp/components/Status/QAStatus"));
const MapSection = React.lazy(() => import("@/components/webapp/components/Map/MapSection"));
const NewsManager = React.lazy(() => import("@/components/webapp/components/Admin/NewsManager"));
const BoothManager = React.lazy(() => import("@/components/webapp/components/Admin/BoothManager"));
const LostManager = React.lazy(() => import("@/components/webapp/components/Admin/LostManager"));
const QAManager = React.lazy(() => import("@/components/webapp/components/Admin/QAManager"));

const FallbackLoader = ({ text = "Loading..." }: { text?: string }) => (
  <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-sub-color)", fontSize: "13px" }}>
    {text}
  </div>
);
export default function PC() {
  const { isAdmin, isStallAdmin, assignedStall } = useRole();
  const {
    api: { fetchedData },
  } = useData();
  const { currentTime } = useAppTime();
  const news = fetchedData?.news || [];
  const hotTime = 20;

  const hasHotNews = useMemo(() => {
    const now = currentTime.valueOf();
    return news.some((item) => {
      const diffMin = (now - dayjs(item.created_at).valueOf()) / (1000 * 60);
      return diffMin > -1 && diffMin <= hotTime;
    });
  }, [news, currentTime]);

  const MainContent = useMemo(() => {
    const isServerAdmin = assignedStall === "server";

    if (isAdmin) {
      return (
        <Suspense fallback={<FallbackLoader text="Admin Tools..." />}>
          {isServerAdmin ? <ServerConfig /> : <NewsManager />}
        </Suspense>
      );
    }

    if (isStallAdmin) {
      return (
        <Suspense fallback={<FallbackLoader text="Stall Manager..." />}>
          <BoothManager />
        </Suspense>
      );
    }

    return (
      <>
        {hasHotNews && <NewsStatus onlyHot={true} hotTime={hotTime} />}
        <EventStatus />
        <BoothStatus />
        <NewsStatus />
      </>
    );
  }, [isAdmin, isStallAdmin, hasHotNews, news, currentTime]);

  const SubContent = useMemo(() => {
    const isServerAdmin = assignedStall === "server";
    if (isAdmin) {
      return (
        <Suspense fallback={<FallbackLoader text="Admin Tools..." />}>
          {!isServerAdmin ? (
            <>
              <LostManager />
              <QAManager />
            </>
          ) : (
            <NewsStatus />
          )}
        </Suspense>
      );
    }
    if (isStallAdmin) {
      return <NewsStatus />;
    }
    return (
      <>
        <LostStatus />
        <BusStatus />
        <QAStatus />
        <MapSection />
      </>
    );
  }, [isAdmin, isStallAdmin]);

  return (
    <div className="mainCanvas">
      <div className="PCCanvas">
        <div className="main" id="main">
          <div className="mainCards">{MainContent}</div>
        </div>
        <div className="sche" id="sche">
          <div className="mainCards">{SubContent}</div>
        </div>
      </div>
      <Menu />
    </div>
  );
}
