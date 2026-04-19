"use client";

import React, { useState, useEffect } from "react";
import { Radio, Button, App, Spin } from "antd";
import { CardBase, CardInside } from "@/components/webapp/components/Layout/CardComp";
import { mockSupabaseStalls, StallStatus, StatusLevel } from "@/components/webapp/scripts/Server/mockSupabase";
import { useRole } from "@/components/webapp/contexts/RoleContext";
import { useData } from "@/components/webapp/contexts/DataContext";
import "@/components/webapp/App.css";

export default function BoothManager() {
  const { message } = App.useApp();
  const { assignedStall } = useRole();
  const {
    api: { fetchedData, fetchData, isLoading },
  } = useData();
  const [crowd, setCrowd] = useState<StatusLevel>(0);
  const [stock, setStock] = useState<StatusLevel>(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (assignedStall && fetchedData?.stalls) {
      const stall = fetchedData.stalls.find((s: StallStatus) => s.stallName === assignedStall);
      if (stall) {
        setCrowd(stall.crowdLevel);
        setStock(stall.stockLevel);
      }
    }
  }, [assignedStall, fetchedData]);

  const handleUpdate = async () => {
    if (!assignedStall) {
      message.error("担当の模擬店が見つかりません");
      return;
    }

    setIsUpdating(true);
    try {
      await mockSupabaseStalls.update(assignedStall, {
        crowdLevel: crowd,
        stockLevel: stock,
      });
      message.success(`${assignedStall} の状況を更新しました`);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 1500);
      await fetchData();
    } catch (error) {
      console.error(error);
      message.error("エラー");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!assignedStall) return null;

  if (isLoading && !fetchedData) {
    return (
      <CardBase title={`${assignedStall}`}>
        <CardInside>
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Spin size="large" />
          </div>
        </CardInside>
      </CardBase>
    );
  }

  return (
    <CardBase title={`${assignedStall}`}>
      <CardInside>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "14px", marginBottom: "10px", fontWeight: "bold" }}>混雑状況</p>
            <Radio.Group
              value={crowd}
              onChange={(e) => setCrowd(e.target.value)}
              buttonStyle="solid"
              style={{ width: "100%", display: "flex" }}
              size="large"
            >
              <Radio.Button
                value={0}
                style={{ flex: 1, textAlign: "center", backgroundColor: crowd === 0 ? "#52c41a" : "" }}
              >
                空き
              </Radio.Button>
              <Radio.Button
                value={1}
                style={{ flex: 1, textAlign: "center", backgroundColor: crowd === 1 ? "#faad14" : "" }}
              >
                普通
              </Radio.Button>
              <Radio.Button
                value={2}
                style={{ flex: 1, textAlign: "center", backgroundColor: crowd === 2 ? "#ff4d4f" : "" }}
              >
                混雑
              </Radio.Button>
            </Radio.Group>
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: "14px", marginBottom: "10px", fontWeight: "bold" }}>在庫状況</p>
            <Radio.Group
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              buttonStyle="solid"
              style={{ width: "100%", display: "flex" }}
              size="large"
            >
              <Radio.Button
                value={0}
                style={{ flex: 1, textAlign: "center", backgroundColor: stock === 0 ? "#52c41a" : "" }}
              >
                あり
              </Radio.Button>
              <Radio.Button
                value={1}
                style={{ flex: 1, textAlign: "center", backgroundColor: stock === 1 ? "#faad14" : "" }}
              >
                わずか
              </Radio.Button>
              <Radio.Button
                value={2}
                style={{ flex: 1, textAlign: "center", backgroundColor: stock === 2 ? "#ff4d4f" : "" }}
              >
                売り切れ
              </Radio.Button>
            </Radio.Group>
          </div>

          <Button
            type={isSuccess ? "default" : "primary"}
            size="large"
            onClick={handleUpdate}
            loading={isUpdating}
            disabled={isSuccess}
            className="main-push-btn"
          >
            {isSuccess ? "反映完了！" : "状況を反映"}
          </Button>
        </div>
      </CardInside>
    </CardBase>
  );
}
