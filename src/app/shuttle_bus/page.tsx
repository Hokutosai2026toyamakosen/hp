"use client";
import { useState, useEffect } from "react";
import styles from "./bus.module.css";

const dataUrlBus = "/data/bus.json";

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

const BusTable = ({ routes, times }: { routes: string[]; times: string[][] }) => (
    <table className={styles.table}>
        <tbody>
            {routes.map((route, i) => (
                <tr key={i}>
                    <th className={styles.th}>{route}</th>
                    {times[i].map((t, j) => (
                        <td className={styles.td} key={j}>
                            {t}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
);

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
        <div className={styles.main}>
            <h1 className={styles.h1}>シャトルバス時刻表</h1>
            <div className={styles.timetable} id="timetable">
                {!busData ? (
                    <h5>データ準備！</h5>
                ) : (
                    <>
                        <h2 className={styles.h2}>本郷キャンパス／富山駅から射水キャンパスへ</h2>
                        <p>※1日目、2日目共通の時刻表です。</p>
                        <BusTable routes={busData.HongoToImizu.route} times={busData.HongoToImizu.time} />
                        <h2 className={styles.h2}>射水キャンパスから本郷キャンパス／富山駅へ</h2>
                        <BusTable routes={busData.ImizuToHongo.route} times={busData.ImizuToHongo.time} />
                        <p>射水キャンパスからの乗り場は管理棟前の噴水付近です。</p>
                    </>
                )}
            </div>
        </div>
    );
}
