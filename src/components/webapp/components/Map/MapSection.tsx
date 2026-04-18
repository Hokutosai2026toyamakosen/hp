"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useMap } from "react-leaflet";
import { getPath } from "@/constants/paths";
import { CardBase, CardInside } from "@/components/webapp/components/Layout/CardComp";
import { mapList } from "@/components/webapp/scripts/Data/DataPack";
import "leaflet/dist/leaflet.css";
import "@/app/(site)/visitor/visitor.css";

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
    <CardBase title="Maps">
      <CardInside className="mapCard">
        <div className="webapp-map-wrapper" style={{ padding: 0 }}>
          <table className="maps-nav-table" style={{ marginTop: 0, marginBottom: "0", fontSize: "12px" }}>
            <tbody>
              {categories.map((category) => (
                <tr key={category} className="maps-nav-row">
                  <th className="maps-nav-cell-category" style={{ width: "60px", padding: "10px" }}>
                    {category}
                  </th>
                  <td className="maps-nav-cell-buttons" style={{ padding: "10px" }}>
                    {mapList
                      .map((map, index) => ({ ...map, index }))
                      .filter((map) => map.category === category)
                      .map((map) => (
                        <button
                          key={map.index}
                          onClick={() => setActiveIndex(map.index)}
                          className={`maps-button ${activeIndex === map.index ? "active" : "inactive"}`}
                          style={{ padding: "4px 12px", fontSize: "1.2em" }}
                        >
                          {map.title}
                        </button>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            ref={containerRef}
            className="maps-container"
            style={{ height: "400px", borderRadius: "15px", position: "relative" }}
          >
            {L && isReady ? (
              <MapContainer
                key={`${activeIndex}-${ratio}`}
                crs={L.CRS.Simple}
                bounds={[
                  [-40, -40 * ratio],
                  [1040, 1040 * ratio],
                ]}
                style={{ height: "100%", width: "100%" }}
                zoomSnap={0}
                minZoom={-2}
                zoomControl={false}
                attributionControl={false}
              >
                <ImageOverlay url={getPath(mapList[activeIndex].src)} bounds={getBounds()} />
                <MapController onFullscreen={toggleFullscreen} />
              </MapContainer>
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                Loading Map...
              </div>
            )}
          </div>
        </div>
      </CardInside>
    </CardBase>
  );
}
