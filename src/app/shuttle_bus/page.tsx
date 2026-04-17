"use client";
import { useState, useEffect } from "react";
import styles from "./bus.module.css";
import PageHeader from "@/components/ui/PageHeader/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";

import { getPath } from "@/constants/paths";

const dataUrlBus = getPath("/data/bus.json");

interface BusData {
  HongoToImizu: {
    route: string[];
    time: string[][];
  };
  ImizuToHongo: {
    route: string[];
    time: string[][];
  };
}

const BusTable = ({ routes, times }: { routes: string[]; times: string[][] }) => {
  const tripCount = times[0]?.length || 0;

  const trips = Array.from({ length: tripCount }, (_, tripIndex) => {
    return routes.map((route, routeIndex) => ({
      stop: route,
      time: times[routeIndex][tripIndex],
    }));
  });

  return (
    <div className={styles.cardGrid}>
      {trips.map((trip, i) => (
        <div key={i} className={styles.tripCard}>
          <div className={styles.tripHeader}>{i + 1}便目</div>
          <div className={styles.tripBody}>
            {trip.map((stopInfo, j) => (
              <div key={j} className={styles.stopRow}>
                <div className={styles.stopName}>{stopInfo.stop}</div>
                <div className={styles.stopTime}>{stopInfo.time}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Bus() {
  const [busData, setBusData] = useState<BusData | null>(null);

  useEffect(() => {
    fetch(dataUrlBus)
      .then((response) => response.json())
      .then((data) => {
        setBusData(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <>
      <PageHeader
        enTitle="Bus"
        jaTitle="シャトルバス"
        imgSrc={getPath("/img/works/mainvisual.jpg")}
      />
            <SectionTitle>シャトルバス時刻表</SectionTitle>
      <div className={styles.main}>
        <div className={styles.skipNav}>
          <a href="#to-imizu" className={styles.skipBtn}>
            本郷 → 射水
          </a>
          <a href="#to-hongo" className={styles.skipBtn}>
            射水 → 本郷
          </a>
        </div>

        <div className={styles.timetable} id="timetable">
          {!busData ? (
            <h5>データ準備中！</h5>
          ) : (
            <>
              <h2 className={styles.h2} id="to-imizu">
                本郷キャンパス / 富山駅<br></br>↓<br></br>射水キャンパス
              </h2>
              <p className={styles.note}>1日目、2日目共通の時刻表です。</p>
              <BusTable routes={busData.HongoToImizu.route} times={busData.HongoToImizu.time} />

              <h2 className={`${styles.h2} ${styles.toHongo}`} id="to-hongo">
                射水キャンパス<br></br>↓<br></br>本郷キャンパス / 富山駅
              </h2>
              <p className={styles.note}>射水キャンパスの乗り場は管理棟前の噴水付近です。</p>
              <BusTable routes={busData.ImizuToHongo.route} times={busData.ImizuToHongo.time} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
