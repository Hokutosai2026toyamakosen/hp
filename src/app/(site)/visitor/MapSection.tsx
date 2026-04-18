"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";
import { getPath } from "@/constants/paths";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Container from "@/components/ui/Container/Container";
import { mapList } from "@/components/webapp/scripts/Data/DataPack";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import("react-leaflet").then((mod) => mod.ImageOverlay), { ssr: false });

function MapController({ onFullscreen }: { onFullscreen: () => void }) {
  const map = useMap();
  return (
    <div className="maps-controls">
      <button className="maps-control-btn" onClick={() => map.zoomIn()}>
        ＋
      </button>
      <button className="maps-control-btn" onClick={() => map.zoomOut()}>
        －
      </button>
      <button className="maps-control-btn fs-btn" onClick={onFullscreen}>
        全画面
      </button>
    </div>
  );
}

export default function MapSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ratio, setRatio] = useState(1.414);
  const [L, setL] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  useEffect(() => {
    setIsReady(false);
    const img = new window.Image();
    img.src = getPath(mapList[activeIndex].src);
    img.onload = () => {
      setRatio(img.width / img.height);
      setIsReady(true);
    };
  }, [activeIndex]);

  const getBounds = () =>
    [
      [0, 0],
      [1000, 1000 * ratio],
    ] as [number, number][];

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const categories = Array.from(new Set(mapList.map((item) => item.category)));

  return (
    <div className="maps-section">
      <SectionTitle>エリア・フロア別マップ</SectionTitle>
      <Container>
        <table className="maps-nav-table">
          <tbody>
            {categories.map((category) => (
              <tr key={category} className="maps-nav-row">
                <th className="maps-nav-cell-category">{category}</th>
                <td className="maps-nav-cell-buttons">
                  {mapList
                    .map((map, index) => ({ ...map, index }))
                    .filter((map) => map.category === category)
                    .map((map) => (
                      <button
                        key={map.index}
                        onClick={() => setActiveIndex(map.index)}
                        className={`maps-button ${activeIndex === map.index ? "active" : "inactive"}`}
                      >
                        {map.title}
                      </button>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="maps-container-wrapper">
          <div ref={containerRef} className="maps-container">
            {L && isReady ? (
              <MapContainer
                key={`${activeIndex}-${ratio}`}
                crs={L.CRS.Simple}
                bounds={[
                  [-40, -40 * ratio],
                  [1040, 1040 * ratio],
                ]}
                className="leaflet-container-style"
                zoomSnap={0}
                minZoom={-2}
                zoomControl={false}
                attributionControl={false}
              >
                <ImageOverlay url={getPath(mapList[activeIndex].src)} bounds={getBounds()} />
                <MapController onFullscreen={toggleFullscreen} />
              </MapContainer>
            ) : (
              <div className="maps-loading">マップを読み込み中...</div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
