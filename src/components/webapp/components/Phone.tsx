"use client";

import React, { Suspense, useState, useMemo } from "react";
import "@/components/webapp/App.css";
import BottomNavigator from "@/components/webapp/components/Layout/Bottom";
import EventStatus from "@/components/webapp/components/Status/EventStatus";
import StallsStatus from "@/components/webapp/components/Status/BoothStatus";
import NewsStatus from "@/components/webapp/components/Status/NewsStatus";
import { useRole } from "@/components/webapp/contexts/RoleContext";
import { useAppTime } from "@/components/webapp/contexts/TimeContext";
import { useData } from "@/components/webapp/contexts/DataContext";
import MapIcon from "@mui/icons-material/Map";
import dayjs from "dayjs";

const BusStatus = React.lazy(() => import("@/components/webapp/components/Status/BusStatus"));
const LostStatus = React.lazy(() => import("@/components/webapp/components/Status/LostStatus"));
const QAStatus = React.lazy(() => import("@/components/webapp/components/Status/QAStatus"));
const Other = React.lazy(() => import("@/components/webapp/components/Layout/other"));
const MapModal = React.lazy(() => import("@/components/webapp/components/Map/MapModal"));
const NewsManager = React.lazy(() => import("@/components/webapp/components/Admin/NewsManager"));
const StallManager = React.lazy(() => import("@/components/webapp/components/Admin/BoothManager"));
const LostAndFoundManager = React.lazy(() => import("@/components/webapp/components/Admin/LostManager"));
const QAManager = React.lazy(() => import("@/components/webapp/components/Admin/QAManager"));

const FallbackLoader = ({ text = "Loading..." }: { text?: string }) => (
  <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-sub-color)", fontSize: "13px" }}>
    {text}
  </div>
);

export default function Phone({ baseDate }: { baseDate: Date }) {
  const { isAdmin, isStallAdmin } = useRole();
  const { currentTime } = useAppTime();
  const {
    api: { fetchedData },
  } = useData();
  const [tabValue, setTabValue] = useState("0");
  const [isMoving, setIsMoving] = useState(false);
  const [isMapOpen, setIsMapMapOpen] = useState(false);
  const news = fetchedData?.news || [];
  const hotTime = 20;

  const hasHotNews = useMemo(() => {
    const now = currentTime.valueOf();
    return news.some((item) => {
      const diffMin = (now - dayjs(item.created_at).valueOf()) / (1000 * 60);
      return diffMin > -1 && diffMin <= hotTime;
    });
  }, [news, currentTime]);

  const MainTabContent = useMemo(() => {
    if (isAdmin) {
      return (
        <Suspense fallback={<FallbackLoader text="Admin Tools..." />}>
          <NewsManager />
          <StallManager />
          <LostAndFoundManager />
          <QAManager />
        </Suspense>
      );
    }
    if (isStallAdmin) {
      return (
        <Suspense fallback={<FallbackLoader text="Stall Manager..." />}>
          <StallManager />
        </Suspense>
      );
    }

    return (
      <>
        {hasHotNews && <NewsStatus onlyHot={true} hotTime={hotTime} />}
        <EventStatus />
        <StallsStatus />
        <NewsStatus />
      </>
    );
  }, [isAdmin, isStallAdmin, hasHotNews, news, currentTime]);

  return (
    <div className="mainCanvas">
      <Suspense fallback={null}>
        <MapModal isOpen={isMapOpen} onClose={() => setIsMapMapOpen(false)} />
      </Suspense>

      <div className="canvas">
        <div className="main" id="main">
          <div className="mainCards">{MainTabContent}</div>
        </div>
        <div className="sche" id="sche">
          <div className="mainCards">
            {!isAdmin && !isStallAdmin && (
              <Suspense fallback={<FallbackLoader text="Tools..." />}>
                <BusStatus />
                <LostStatus />
                <QAStatus />
              </Suspense>
            )}
          </div>
        </div>
        <div className="others" id="others">
          <div className="otherCards">
            <Suspense fallback={<FallbackLoader text="Settings..." />}>
              <Other />
            </Suspense>
          </div>
        </div>
      </div>

      {!isAdmin && !isStallAdmin && (
        <button className="map-float-btn" onClick={() => setIsMapMapOpen(true)}>
          <MapIcon style={{ fontSize: "28px" }} />
          <span style={{ fontSize: "10px", fontWeight: "bold" }}>MAP</span>
        </button>
      )}

      <div className="bottomCanvas">
        <BottomNavigator value={tabValue} setValue={setTabValue} isMoving={isMoving} setIsMoving={setIsMoving} />
      </div>
    </div>
  );
}
