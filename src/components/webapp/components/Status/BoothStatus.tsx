"use client";

import React, { useState, useEffect, useRef } from "react";
import { CardBase, CardInside, SubList, Divider } from "@/components/webapp/components/Layout/CardComp";
import {
  mockSupabaseStalls,
  StallStatus,
  StatusLevel,
  FETCH_INTERVAL,
  mockSupabase,
} from "@/components/webapp/scripts/Server/mockSupabase";
import { useRole } from "@/components/webapp/contexts/RoleContext";

const TrafficLight = ({
  level,
  onClick,
  disabled,
}: {
  level: StatusLevel;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const colorMap: Record<StatusLevel, string> = {
    0: "#52c41a",
    1: "#faad14",
    2: "#ff4d4f",
  };
  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={{
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        backgroundColor: colorMap[level],
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
        cursor: disabled ? "default" : "pointer",
        transition: "transform 0.1s, opacity 0.2s",
        opacity: disabled ? 1 : 0.8,
        transform: disabled ? "none" : "scale(1.1)",
      }}
    />
  );
};

export default function BoothStatus() {
  const [statuses, setStatuses] = useState<StallStatus[]>([]);
  const { isAdmin } = useRole();
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    let isMounted = true;
    const loadData = async () => {
      if (!isMounted) return;
      const isMainTab = !!containerRef.current?.closest("#main");
      if (isVisibleRef.current || isMainTab) {
        const data = await mockSupabaseStalls.fetch();
        if (isMounted) setStatuses(data);
      }
      timerId = setTimeout(loadData, FETCH_INTERVAL + mockSupabase.getJitter());
    };
    loadData();
    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, []);

  const cycleStatus = (current: StatusLevel): StatusLevel => {
    if (current === 0) return 1;
    if (current === 1) return 2;
    return 0;
  };

  const handleCrowdClick = (stallName: string, currentLevel: StatusLevel) => {
    if (!isAdmin) return;
    const newLevel = cycleStatus(currentLevel);
    setStatuses((prev) => prev.map((s) => (s.stallName === stallName ? { ...s, crowdLevel: newLevel } : s)));
    mockSupabaseStalls.update(stallName, { crowdLevel: newLevel });
  };

  const handleStockClick = (stallName: string, currentLevel: StatusLevel) => {
    if (!isAdmin) return;
    const newLevel = cycleStatus(currentLevel);
    setStatuses((prev) => prev.map((s) => (s.stallName === stallName ? { ...s, stockLevel: newLevel } : s)));
    mockSupabaseStalls.update(stallName, { stockLevel: newLevel });
  };

  return (
    <div ref={containerRef}>
      <CardBase title="Booth (Live)">
        <CardInside className="no-vertical-padding">
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              fontSize: "11px",
              color: "#666",
              padding: "5% 0 12px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <TrafficLight level={0} disabled /> <span>空き/あり</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <TrafficLight level={1} disabled /> <span>やや混雑/少なめ</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <TrafficLight level={2} disabled /> <span>混雑/品切れ</span>
            </div>
          </div>

          <div style={{ display: "flex", padding: "8px 5% 0", fontSize: "12px", color: "#666", fontWeight: "bold" }}>
            <div style={{ flex: 1, textAlign: "left" }}>模擬店名</div>
            <div style={{ width: "50px", textAlign: "right" }}>混雑</div>
            <div style={{ width: "50px", textAlign: "right" }}>在庫</div>
          </div>

          {statuses.length > 0 ? (
            statuses.map((status, index) => (
              <React.Fragment key={`${status.stallName}-${index}`}>
                {index !== 0 && <Divider />}
                <SubList>
                  <div style={{ display: "flex", alignItems: "center", width: "100%", padding: "4px 0" }}>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <p style={{ fontSize: "14px", fontWeight: "bold", margin: 0, color: "#333" }}>
                        {status.stallName}
                      </p>
                    </div>
                    <div style={{ width: "50px", display: "flex", justifyContent: "center" }}>
                      <TrafficLight
                        level={status.crowdLevel}
                        disabled={!isAdmin}
                        onClick={() => handleCrowdClick(status.stallName, status.crowdLevel)}
                      />
                    </div>
                    <div style={{ width: "50px", display: "flex", justifyContent: "center" }}>
                      <TrafficLight
                        level={status.stockLevel}
                        disabled={!isAdmin}
                        onClick={() => handleStockClick(status.stallName, status.stockLevel)}
                      />
                    </div>
                  </div>
                </SubList>
              </React.Fragment>
            ))
          ) : (
            <SubList>
              <p style={{ fontSize: "14px", color: "#999", textAlign: "center", width: "100%" }}>
                模擬店情報がありません
              </p>
            </SubList>
          )}
        </CardInside>
      </CardBase>
    </div>
  );
}
