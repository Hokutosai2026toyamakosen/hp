"use client";

import React, { Suspense } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "@/components/webapp/App.css";

const MapSection = React.lazy(() => import("./MapSection"));

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MapModal({ isOpen, onClose }: MapModalProps) {
  return (
    <div
      className={`map-modal-overlay ${isOpen ? "open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="map-modal-content">
        <button className="map-modal-close" onClick={onClose}>
          <CloseIcon style={{ fontSize: "24px" }} />
        </button>

        <div className="map-modal-body">
          <Suspense fallback={<div style={{ padding: "40px", textAlign: "center" }}>Loading Map...</div>}>
            <MapSection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
