"use client";

import React, { useState, useMemo } from "react";
import { Select, Tag, Radio } from "antd";
import { CardBase, CardInside, Divider } from "@/components/webapp/components/Layout/CardComp";
import busData from "@/../public/data/bus.json";
import { useAppTime } from "@/components/webapp/contexts/TimeContext";
import dayjs from "dayjs";

const allStops = Array.from(new Set([...busData.HongoToImizu.route, ...busData.ImizuToHongo.route]));

interface BusTrip {
  time: string;
  arrivalTime: string;
  isoTime: string;
  routeTitle: string;
  direction: "to-imizu" | "to-hongo";
}

export default function BusStatus() {
  const [fromStop, setFromStop] = useState("富山駅北口 発");
  const [toStop, setToStop] = useState("射水キャンパス 着");
  const [filterMode, setFilterMode] = useState<"hour" | "all">("hour");
  const { currentTime } = useAppTime();

  const normalizeTime = (t: string) => {
    if (!t) return "";
    const [h, m] = t.split(":");
    return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  };

  const nowTimeStr = currentTime.format("HH:mm");
  const oneHourLaterStr = currentTime.add(1, "hour").format("HH:mm");
  const filteredBuses = useMemo(() => {
    const results: BusTrip[] = [];
    const processRoute = (routeData: any, direction: "to-imizu" | "to-hongo") => {
      const fromIdx = routeData.route.indexOf(fromStop);
      const toIdx = routeData.route.indexOf(toStop);

      if (fromIdx !== -1 && toIdx !== -1 && fromIdx < toIdx) {
        routeData.time[fromIdx].forEach((time: string, tripIndex: number) => {
          const arrivalTime = routeData.time[toIdx][tripIndex];

          if (time && arrivalTime) {
            const isoTime = normalizeTime(time);
            const isUpcoming = isoTime > nowTimeStr;
            const isWithinHour = isUpcoming && isoTime <= oneHourLaterStr;

            if (filterMode === "all" || isWithinHour) {
              let label = direction === "to-imizu" ? "射水キャンパス 行" : "富山駅・本郷 行";
              if (toStop === "富山駅北口 着") {
                label = "富山駅 行";
              }

              results.push({ 
                time, 
                arrivalTime,
                isoTime,
                routeTitle: label, 
                direction 
              });
            }
          }

        });
      }
    };

    processRoute(busData.HongoToImizu, "to-imizu");
    processRoute(busData.ImizuToHongo, "to-hongo");

    return results.sort((a, b) => a.isoTime.localeCompare(b.isoTime));
  }, [fromStop, toStop, nowTimeStr, oneHourLaterStr, filterMode]);

  const stopOptions = allStops.filter((s) => s.includes("発") || s.includes("着")).map((s) => ({ value: s, label: s }));

  return (
    <CardBase title="Bus">
      <CardInside>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "15px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Radio.Group value={filterMode} onChange={(e) => setFilterMode(e.target.value)} buttonStyle="solid">
              <Radio.Button value="hour">1時間以内</Radio.Button>
              <Radio.Button value="all">すべて表示</Radio.Button>
            </Radio.Group>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.2em", width: "40px" }}>乗場</span>
            <Select
              value={fromStop}
              options={stopOptions.filter((o) => o.value.includes("発"))}
              onChange={setFromStop}
              style={{ flex: 1 }}
              getPopupContainer={(trigger) => trigger.parentElement}
              size="large"
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.2em", width: "40px" }}>降場</span>
            <Select
              value={toStop}
              options={stopOptions.filter((o) => o.value.includes("着"))}
              onChange={setToStop}
              style={{ flex: 1 }}
              getPopupContainer={(trigger) => trigger.parentElement}
              size="large"
            />
          </div>
        </div>

        <div style={{ marginTop: "5%" }}>
          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus, index) => {
              const isPast = bus.isoTime <= nowTimeStr;
              return (
                <React.Fragment key={index}>
                  {index !== 0 && (
                    <div style={{ padding: "8px 0" }}>
                      <Divider />
                    </div>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      opacity: isPast ? 0.25 : 1,
                    }}
                  >
                    <div style={{ textAlign: "left" }}>
                      <Tag
                        color={bus.direction === "to-imizu" ? "blue" : "orange"}
                        style={{ fontSize: "10px", marginBottom: "4px" }}
                      >
                        {bus.routeTitle}
                      </Tag>
                      <p
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          margin: 0,
                          color: "#1f1f1f",
                        }}
                      >
                        {bus.time} <span style={{ fontSize: "12px", color: "#666", fontWeight: "normal" }}>発 →</span>{" "}
                        {bus.arrivalTime}
                        <span style={{ fontSize: "12px", fontWeight: "normal", color: "#666" }}> 着</span>
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      {!isPast ? (
                        <p style={{ fontSize: "11px", color: "var(--main-color)", margin: 0 }}>
                          {(() => {
                            const diffMin = dayjs(`2000-01-01 ${bus.isoTime}`).diff(
                              dayjs(`2000-01-01 ${nowTimeStr}`),
                              "minute",
                            );
                            if (diffMin >= 60) {
                              const hours = Math.floor(diffMin / 60);
                              return `${hours} 時間後`;
                            }
                            return `${diffMin} 分後`;
                          })()}
                        </p>
                      ) : (
                        <p style={{ fontSize: "11px", color: "#999", margin: 0 }}>出発済み</p>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <span style={{ color: "#1f1f1f", padding: "10px 0" }}>指定された区間で運行するバスはありません</span>
          )}
        </div>
      </CardInside>
    </CardBase>
  );
}
