"use client";

import React, { useState, useEffect } from "react";
import { DataContext, DataContextType } from "./DataContext";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading] = useState(false);
  const [error] = useState("");

  useEffect(() => {}, []);

  const value: DataContextType = {
    api: {
      fetchedData: null,
      hwDataForUI: null,
      isLoading,
      isPosting: false,
      isWorkPosting: false,
      error,
      fetchData: async () => {},
      handlePost: () => {},
    },
    change: {} as unknown as any,
    work: {} as unknown as any,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
