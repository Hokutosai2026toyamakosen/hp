"use client";

import React, { useEffect, useRef } from "react";
import { TabSelector, initSwipeHandlers, initIndicatorDrag } from "@/components/webapp/scripts/TabSelector";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import "@/components/webapp/App.css";
import { useRole } from "@/components/webapp/contexts/RoleContext";

const ALL_MENU_ITEMS = [
  { key: "0", icon: HomeOutlinedIcon, label: "Main" },
  { key: "1", icon: WidgetsOutlinedIcon, label: "Other" },
  { key: "2", icon: SettingsOutlinedIcon, label: "Settings" },
];

interface BottomNavigatorProps {
  value: string;
  setValue: (val: string) => void;
  isMoving: boolean;
  setIsMoving: (val: boolean) => void;
}

export default function BottomNavigator({ value, setValue, isMoving, setIsMoving }: BottomNavigatorProps) {
  const { isStallAdmin } = useRole();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef(value);
  const menuItems = isStallAdmin ? ALL_MENU_ITEMS.filter((item) => item.key !== "1") : ALL_MENU_ITEMS;

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const triggerMove = (prev: string, next: string) => {
    if (prev === next) return;
    setIsMoving(true);
    TabSelector(Number(next));
    setValue(next);
    setTimeout(() => setIsMoving(false), 400);
  };

  useEffect(() => {
    if (isStallAdmin) return;

    const cleanupSwipe = initSwipeHandlers((direction) => {
      const current = valueRef.current;
      const nextValue = Math.min(Math.max(Number(current) + direction, 0), 2);
      const nextValueStr = String(nextValue);

      if (nextValueStr !== current) {
        setIsMoving(true);
        TabSelector(nextValue);
        setValue(nextValueStr);
        setTimeout(() => setIsMoving(false), 400);
      }
    });

    const cleanupDrag =
      indicatorRef.current && footerRef.current
        ? initIndicatorDrag(indicatorRef.current, footerRef.current, (nextTab) => {
            const current = valueRef.current;
            const nextTabStr = String(nextTab);

            if (nextTabStr !== current) {
              setIsMoving(true);
              TabSelector(nextTab);
              setValue(nextTabStr);
              setTimeout(() => setIsMoving(false), 400);
            }
          })
        : null;

    return () => {
      cleanupSwipe();
      if (cleanupDrag) cleanupDrag();
    };
  }, [setValue, setIsMoving, isStallAdmin]);

  const tabCount = menuItems.length;
  const indicatorWidth = 100 / tabCount;
  const getDisplayIndex = (key: string) => {
    if (!isStallAdmin) return Number(key);
    return key === "0" ? 0 : 1;
  };

  return (
    <footer
      className="bottomFooter"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "9999px",
        position: "absolute",
        inset: 0,
        margin: "auto",
        display: "block",
        zIndex: 3,
      }}
    >
      <div
        className="footerRef"
        ref={footerRef}
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          borderRadius: "9999px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div
          className="nav-indicator"
          ref={indicatorRef}
          style={{
            position: "absolute",
            width: `${indicatorWidth}%`,
            height: "100%",
            transform: `translateX(${getDisplayIndex(value) * 100}%)`,
            transition: isMoving ? "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: isStallAdmin ? "default" : "grab",
          }}
        ></div>

        <div
          style={{ display: "flex", width: "100%", zIndex: 2, position: "relative", justifyContent: "space-around" }}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = value === item.key;
            return (
              <div
                key={item.key}
                onClick={() => triggerMove(value, item.key)}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  padding: "0",
                }}
              >
                <Icon
                  style={{
                    fontSize: "26px",
                    color: isActive ? "var(--main-color)" : "var(--text-sub-color)",
                    filter: isActive ? "drop-shadow(0 0 8px var(--main-color))" : "none",
                    transition: "all 0.3s ease",
                    zIndex: 3,
                  }}
                />
                <div
                  style={{
                    fontSize: "12px",
                    color: isActive ? "var(--main-color)" : "var(--text-sub-color)",
                    fontWeight: isActive ? "600" : "400",
                    transition: "all 0.3s ease",
                    zIndex: 3,
                  }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
