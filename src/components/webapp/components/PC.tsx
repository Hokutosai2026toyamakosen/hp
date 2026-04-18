"use client";

import React, { Suspense, useMemo } from "react";
import "@/components/webapp/App.css";
import Menu from "@/components/webapp/components/Layout/menu";
import EventStatus from "@/components/webapp/components/Status/EventStatus";
import BoothStatus from "@/components/webapp/components/Status/BoothStatus";
import NewsStatus from "@/components/webapp/components/Status/NewsStatus";
import { useRole } from "@/components/webapp/contexts/RoleContext";

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

export default function PC(props: { baseDate: Date }) {
  const { isAdmin, isStallAdmin } = useRole();

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
        <EventStatus />
        <BoothStatus />
        <NewsStatus />
      </>
    );
  }, [isAdmin, isStallAdmin]);

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
