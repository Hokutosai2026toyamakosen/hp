"use client";

import React, { useState, useEffect, useRef } from "react";
import { DataContext, DataContextType } from "./DataContext";
import {
  mockSupabase,
  StallStatus,
  NewsItem,
  LostItem,
  Question,
} from "@/components/webapp/scripts/Server/mockSupabase";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useTheme } from "@/components/webapp/ThemeContext";

dayjs.extend(customParseFormat);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isDebugMode = theme?.isDebugMode || false;

  const [isLoading, setIsLoading] = useState(true);
  const [stalls, setStalls] = useState<StallStatus[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const isInitialRefreshStarted = useRef(false);
  const refreshCycle = useRef(0);
  const lastFetchTime = useRef(0);

  const [serverConfig, setServerConfig] = useState({
    interval: 15000,
    freq: 6,
  });

  const parseCompactDate = (compactDateStr: string) => {
    if (!compactDateStr) return new Date().toISOString();
    const currentYear = new Date().getFullYear();
    const parsed = dayjs(`${currentYear}${compactDateStr}`, "YYYYMMDDHHmm");
    return parsed.toISOString();
  };

  const performRefresh = async (forceFull = false) => {
    const fullRefreshFrequency = isDebugMode ? 2 : serverConfig.freq;
    const isFullRefresh = forceFull || refreshCycle.current % fullRefreshFrequency === 0;

    const currentTTL = (isDebugMode ? 10000 : serverConfig.interval) - 1000;

    try {
      const allData = isFullRefresh
        ? await mockSupabase.fetchAllData(forceFull ? 0 : currentTTL)
        : await mockSupabase.fetchStallsOnly(currentTTL);

      if (allData) {
        lastFetchTime.current = Date.now();

        if (allData.config) {
          setServerConfig({
            interval: allData.config.fetch_interval_ms || 15000,
            freq: allData.config.full_refresh_freq || 6,
          });
        }

        if (allData.s) {
          setStalls(
            allData.s.map((row: any) => ({
              stallName: row.n,
              crowdLevel: row.c,
              stockLevel: row.l,
            })),
          );
        }
        if (isFullRefresh) {
          if (allData.n)
            setNews(
              allData.n.map((row: any) => ({
                id: row.i,
                title: row.t,
                content: row.c,
                created_at: parseCompactDate(row.a),
                edit_reason: row.r,
              })),
            );
          if (allData.l)
            setLostItems(
              allData.l.map((row: any) => ({
                id: row.i,
                name: row.n,
                place: row.p,
                created_at: parseCompactDate(row.a),
                edit_reason: row.r,
              })),
            );
          if (allData.q)
            setQuestions(
              allData.q.map((row: any) => ({
                id: row.i,
                text: row.t,
                answer: row.w,
                created_at: parseCompactDate(row.a),
                edit_reason: row.r,
              })),
            );
        }
      }
    } catch (e) {
      console.error("[DataProvider] Refresh Error:", e);
    } finally {
      setIsLoading(false);
      refreshCycle.current = (refreshCycle.current + 1) % 24;
    }
  };

  useEffect(() => {
    if (isInitialRefreshStarted.current) return;
    isInitialRefreshStarted.current = true;
    performRefresh(true);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const now = Date.now();
        const diff = now - lastFetchTime.current;
        if (diff > (isDebugMode ? 10000 : serverConfig.interval)) {
          performRefresh(false);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [serverConfig.interval, isDebugMode]);

  useEffect(() => {
    const interval = isDebugMode ? 10000 : serverConfig.interval;
    const jitter = Math.floor(Math.random() * (isDebugMode ? 2000 : 10000));
    const timer = setInterval(() => performRefresh(), interval + jitter);
    return () => clearInterval(timer);
  }, [isDebugMode, serverConfig.interval]);

  const value: DataContextType = {
    api: {
      fetchedData: { stalls, news, lostItems, questions },
      isLoading,
      isPosting: false,
      error: "",
      fetchData: async () => performRefresh(true),
      handlePost: () => {},
    },
    change: { serverConfig },
    work: {} as any,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
