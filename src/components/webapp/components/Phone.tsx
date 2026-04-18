"use client";

import React, { useRef, Suspense, useState, useMemo } from "react";
import "@/components/webapp/App.css";
import BottomNavigator from "@/components/webapp/components/Layout/Bottom";
import EventStatus from "@/components/webapp/components/Status/EventStatus";
import BoothStatus from "@/components/webapp/components/Status/BoothStatus";
import NewsStatus from "@/components/webapp/components/Status/NewsStatus";
import { useRole } from "@/components/webapp/contexts/RoleContext";
import MapIcon from "@mui/icons-material/Map";

const BusStatus = React.lazy(() => import("@/components/webapp/components/Status/BusStatus"));
const LostStatus = React.lazy(() => import("@/components/webapp/components/Status/LostStatus"));
const QAStatus = React.lazy(() => import("@/components/webapp/components/Status/QAStatus"));
const Other = React.lazy(() => import("@/components/webapp/components/Layout/other"));
const MapModal = React.lazy(() => import("@/components/webapp/components/Map/MapModal"));
const NewsManager = React.lazy(() => import("@/components/webapp/components/Admin/NewsManager"));
const BoothManager = React.lazy(() => import("@/components/webapp/components/Admin/BoothManager"));
const LostManager = React.lazy(() => import("@/components/webapp/components/Admin/LostManager"));
const QAManager = React.lazy(() => import("@/components/webapp/components/Admin/QAManager"));

const FallbackLoader = ({ text = "Loading..." }: { text?: string }) => (
  <div
    style={{
      textAlign: "center",
      padding: "40px 20px",
      color: "var(--text-sub-color)",
      fontSize: "13px",
    }}
  >
    {text}
  </div>
);

export default function Phone(props: { baseDate: Date }) {
  const { isAdmin, isStallAdmin } = useRole();
  const [tabValue, setTabValue] = useState("0");
  const [isMoving, setIsMoving] = useState(false);
  const [isMapOpen, setIsMapMapOpen] = useState(false);

  const targetCanvasRef = useRef<HTMLDivElement>(null);

  const MainContent = useMemo(() => {
    if (isAdmin) {
      return (
        <Suspense fallback={<FallbackLoader text="Admin Tools..." />}>
          <NewsManager />
        </Suspense>
      );
    }
    if (isStallAdmin) {
      return (
        <Suspense fallback={<FallbackLoader text="Stall Manager..." />}>
          <BoothManager />
          <NewsStatus />
        </Suspense>
      );
    }
    return (
      <>
        <EventStatus />
        <BoothStatus />
        <NewsStatus />
      </>
    );
  }, [isAdmin, isStallAdmin]);

  const ScheContent = useMemo(() => {
    if (isAdmin) {
      return (
        <Suspense fallback={<FallbackLoader text="Admin Tools..." />}>
          <LostManager />
          <QAManager />
        </Suspense>
      );
    }
    if (isStallAdmin) {
      return <></>;
    }
    return (
      <>
        <LostStatus />
        <BusStatus />
        <QAStatus />
      </>
    );
  }, [isAdmin, isStallAdmin]);

  return (
    <div className="mainCanvas">
      <Suspense fallback={null}>
        <MapModal isOpen={isMapOpen} onClose={() => setIsMapMapOpen(false)} />
      </Suspense>

      <div className="canvas" id="canvas" ref={targetCanvasRef}>
        <div className="main" id="main">
          <div className="mainCards">{MainContent}</div>
        </div>

        <div className="sche" id="sche">
          <div className="mainCards">{ScheContent}</div>
        </div>

        <div className="others" id="others">
          <div className="otherCards">
            <Suspense fallback={<FallbackLoader text="Settings..." />}>
              <Other />
            </Suspense>
          </div>
        </div>
      </div>

      <button className="map-float-btn" onClick={() => setIsMapMapOpen(true)}>
        <MapIcon style={{ fontSize: "28px" }} />
        <span style={{ fontSize: "10px", fontWeight: "bold" }}>MAP</span>
      </button>

      <div className="bottomCanvas">
        <BottomNavigator value={tabValue} setValue={setTabValue} isMoving={isMoving} setIsMoving={setIsMoving} />
      </div>
    </div>
  );
}
