"use client";

import React, { Suspense, useMemo } from "react";
import "@/components/webapp/App.css";
import Menu from "@/components/webapp/components/Layout/menu";
import EventStatus from "@/components/webapp/components/Status/EventStatus";
import BoothStatus from "@/components/webapp/components/Status/BoothStatus";
import NewsStatus from "@/components/webapp/components/Status/NewsStatus";
import { useRole } from "@/components/webapp/contexts/RoleContext";
import { useData } from "@/components/webapp/contexts/DataContext";
import { useAppTime } from "@/components/webapp/contexts/TimeContext";
import dayjs from "dayjs";

const BusStatus = React.lazy(() => import("@/components/webapp/components/Status/BusStatus"));
const LostStatus = React.lazy(() => import("@/components/webapp/components/Status/LostStatus"));
const QAStatus = React.lazy(() => import("@/components/webapp/components/Status/QAStatus"));
const MapSection = React.lazy(() => import("@/components/webapp/components/Map/MapSection"));
const NewsManager = React.lazy(() => import("@/components/webapp/components/Admin/NewsManager"));
const BoothManager = React.lazy(() => import("@/components/webapp/components/Admin/BoothManager"));
const LostManager = React.lazy(() => import("@/components/webapp/components/Admin/LostManager"));
const QAManager = React.lazy(() => import("@/components/webapp/components/Admin/QAManager"));

const FallbackLoader = () => (
  <div style={{ textAlign: "center", padding: "20px", color: "var(--text-sub-color)" }}>Loading Panel...</div>
);

export default function PC({ baseDate }: { baseDate: Date }) {
  const { isAdmin, isStallAdmin } = useRole();
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
    if (isAdmin) {
      return (
        <Suspense fallback={<FallbackLoader />}>
          <NewsManager />
        </Suspense>
      );
    }
    if (isStallAdmin) {
      return (
        <Suspense fallback={<FallbackLoader />}>
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
  }, [isAdmin, isStallAdmin, hasHotNews]);

  const SubContent = useMemo(() => {
    if (isAdmin) {
      return (
        <Suspense fallback={<FallbackLoader />}>
          <QAManager />
          <LostManager />
        </Suspense>
      );
    }
    if (isStallAdmin) {
      return <NewsStatus />;
    }
    return (
      <Suspense fallback={<FallbackLoader />}>
        <LostStatus />
        <BusStatus />
        <QAStatus />
        <MapSection />
      </Suspense>
    );
  }, [isAdmin, isStallAdmin, hasHotNews, news, currentTime]);

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
