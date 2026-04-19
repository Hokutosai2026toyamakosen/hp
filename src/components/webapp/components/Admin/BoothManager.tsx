"use client";

import React, { useState, useEffect } from "react";
import { Radio, Button, App, Modal } from "antd";
import { CardBase, CardInside, Divider } from "@/components/webapp/components/Layout/CardComp";
import { mockSupabaseStalls, StatusLevel } from "@/components/webapp/scripts/Server/mockSupabase";
import { useRole } from "@/components/webapp/contexts/RoleContext";
import { useData } from "@/components/webapp/contexts/DataContext";
import QrCodeIcon from "@mui/icons-material/QrCode";

export default function BoothManager() {
  const { message } = App.useApp();
  const { assignedStall } = useRole();
  const {
    api: { fetchedData, fetchData },
  } = useData();
  const [crowd, setCrowd] = useState<StatusLevel>(0);
  const [stock, setStock] = useState<StatusLevel>(0);
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (fetchedData?.stalls && assignedStall) {
      const myStall = fetchedData.stalls.find((s) => s.stallName === assignedStall);
      if (myStall) {
        setCrowd(myStall.crowdLevel);
        setStock(myStall.stockLevel);
      }
    }
  }, [fetchedData, assignedStall]);

  const handleUpdate = async () => {
    if (!assignedStall) return;
    setLoading(true);
    try {
      await mockSupabaseStalls.update(assignedStall, { crowdLevel: crowd, stockLevel: stock });
      message.success("ステータスを更新しました");
      await fetchData();
    } catch (e) {
      message.error("更新に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const generateHandoverURL = () => {
    if (typeof window === "undefined") return "";
    const pass = localStorage.getItem("admin_pass") || "";
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?pass=${encodeURIComponent(pass)}&booth=${encodeURIComponent(assignedStall || "")}`;
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generateHandoverURL())}`;

  return (
    <CardBase title="Booth Manager">
      <CardInside>
        <div style={{ display: "flex", flexDirection: "column", gap: "25px", padding: "10px 0" }}>
          <span style={{ fontSize: "1.4em", fontWeight: "bold" }}>
            模擬店名 : {assignedStall || "Loading..."}
          </span>
          <div>
            <p style={{ marginBottom: "12px", fontWeight: "bold", textAlign: "left" }}>混雑状況</p>
            <Radio.Group
              value={crowd}
              onChange={(e) => setCrowd(e.target.value)}
              buttonStyle="solid"
              size="large"
              style={{ width: "100%" }}
            >
              <Radio.Button
                value={0}
                style={{ width: "33.3%", textAlign: "center", background: crowd === 0 ? "#52c41a" : "" }}
              >
                空き
              </Radio.Button>
              <Radio.Button
                value={1}
                style={{ width: "33.3%", textAlign: "center", background: crowd === 1 ? "#faad14" : "" }}
              >
                やや混雑
              </Radio.Button>
              <Radio.Button
                value={2}
                style={{ width: "33.3%", textAlign: "center", background: crowd === 2 ? "#ff4d4f" : "" }}
              >
                混雑
              </Radio.Button>
            </Radio.Group>
          </div>

          <div>
            <p style={{ marginBottom: "12px", fontWeight: "bold", textAlign: "left" }}>在庫状況</p>
            <Radio.Group
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              buttonStyle="solid"
              size="large"
              style={{ width: "100%" }}
            >
              <Radio.Button
                value={0}
                style={{ width: "33.3%", textAlign: "center", background: stock === 0 ? "#52c41a" : "" }}
              >
                在庫あり
              </Radio.Button>
              <Radio.Button
                value={1}
                style={{ width: "33.3%", textAlign: "center", background: stock === 1 ? "#faad14" : "" }}
              >
                少なめ
              </Radio.Button>
              <Radio.Button
                value={2}
                style={{ width: "33.3%", textAlign: "center", background: stock === 2 ? "#ff4d4f" : "" }}
              >
                売り切れ
              </Radio.Button>
            </Radio.Group>
          </div>

          <Button
            type="primary"
            block
            size="large"
            onClick={handleUpdate}
            loading={loading}
            style={{ height: "50px", borderRadius: "12px", fontWeight: "bold" }}
          >
            情報を更新する
          </Button>

          <Divider />

          <div style={{ textAlign: "center" }}>
            <Button
              type="default"
              icon={<QrCodeIcon />}
              onClick={() => setShowQR(true)}
              style={{ border: "none", color: "#666" }}
            >
              交代用QRコードを表示
            </Button>
          </div>
        </div>

        <Modal
          title="シフト引き継ぎ用QR"
          open={showQR}
          onCancel={() => setShowQR(false)}
          footer={null}
          centered
          getContainer={() => document.querySelector(".webapp-root") || document.body}
        >
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ fontSize: "12px", color: "#666", marginBottom: "20px" }}>
              次の担当者のスマホでこのQRを読み取ってください。
              <br />
              自動的にログインと店舗設定が完了します。
            </p>
            <div
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "12px",
                display: "inline-block",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <img src={qrUrl} alt="Handover QR" style={{ width: "200px", height: "200px" }} />
            </div>
            <p style={{ marginTop: "20px", fontWeight: "bold", color: "var(--main-color)" }}>担当: {assignedStall}</p>
          </div>
        </Modal>
      </CardInside>
    </CardBase>
  );
}
