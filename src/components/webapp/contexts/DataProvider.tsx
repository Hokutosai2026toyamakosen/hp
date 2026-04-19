"use client";

import React, { useState, useEffect, useRef } from "react";
import { DataContext, DataContextType } from "./DataContext";
import { mockSupabase, FETCH_INTERVAL, StallStatus, NewsItem, LostItem, Question } from "@/components/webapp/scripts/Server/mockSupabase";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [stalls, setStalls] = useState<StallStatus[]>([]);
	const [news, setNews] = useState<NewsItem[]>([]);
	const [lostItems, setLostItems] = useState<LostItem[]>([]);
	const [questions, setQuestions] = useState<Question[]>([]);

	const isInitialRefreshStarted = useRef(false);

	const refreshAll = async () => {
		console.log("[DataProvider] Global Refresh starting...");
		const allData = await mockSupabase.fetchAllData();
		
		if (allData) {
			if (allData.stalls) {
				setStalls(allData.stalls.map((s: { stall_name: string; crowd_level: number; stock_level: number }) => ({
					stallName: s.stall_name, 
					crowdLevel: s.crowd_level as any, 
					stockLevel: s.stock_level as any
				})));
			}
			if (allData.news) setNews(allData.news);
			if (allData.lost_items) setLostItems(allData.lost_items);
			if (allData.questions) setQuestions(allData.questions);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (isInitialRefreshStarted.current) return;
		isInitialRefreshStarted.current = true;

		refreshAll();
		const timer = setInterval(refreshAll, FETCH_INTERVAL + mockSupabase.getJitter());
		return () => clearInterval(timer);
	}, []);

	const value: DataContextType = {
		api: {
			fetchedData: { stalls, news, lostItems, questions },
			isLoading,
			isPosting: false,
			error: "",
			fetchData: refreshAll,
			handlePost: () => {},
		},
		change: {} as any,
		work: {} as any,
	};

	return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
