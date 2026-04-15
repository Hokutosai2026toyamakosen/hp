"use client";
import React, { useState } from "react";
import Link from "next/link";

interface ProjectItemData {
  name: string;
  image?: string;
  team?: string;
  place?: string;
  start?: string;
  end?: string;
}

const ProjectCard = ({ item }: { item: ProjectItemData }) => (
  <li>
    <Link href={`/products?name=${encodeURIComponent(item.name)}`}>
      {item.image && <img src={item.image} alt={item.name} />}
      <div className="info">
        <p className="name">{item.name}</p>
        {item.team && <p className="price">{item.team}</p>}
        {item.place && <p className="place">{item.place}</p>}
      </div>
    </Link>
  </li>
);

const OverviewList = ({ items }: { items: ProjectItemData[] }) => (
  <dl className="overview-list wrapper">
    {items.map((item, i) => (
      <React.Fragment key={i}>
        <dt>{item.start}～{item.end}</dt>
        <dd>{item.name}</dd>
      </React.Fragment>
    ))}
  </dl>
);

const Timeline = ({ items }: { items: ProjectItemData[] }) => {
  const START_HOUR = 10;
  const END_HOUR = 14;
  const HEIGHT_SCALE = 2.5;

  const timeToMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const base = START_HOUR * 60;
  const labels = [];
  for (let h = START_HOUR; h <= END_HOUR; h++) labels.push(h);

  return (
    <div className="timeline-container">
      <div className="time-axis">
        {labels.map((h) => (
          <div key={h} className="time-label" style={{ height: "150px" }}>{h}</div>
        ))}
      </div>
      <div className="timeline">
        {items.map((event, i) => {
          if (!event.start || !event.end) return null;
          const start = timeToMinutes(event.start);
          const end = timeToMinutes(event.end);
          const topPos = (start - base) * HEIGHT_SCALE;
          const height = (end - start) * HEIGHT_SCALE;
          return (
            <div key={i} className="event" style={{ top: `${topPos}px`, height: `${height}px` }}>
              <div className="event-name">{event.name}</div>
              <div className="event-time">{event.start} - {event.end}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function TabbedSectionClient({
  id, title, tabs, data, type = "card"
}: {
  id: string; title: string; tabs: string[]; data: ProjectItemData[][]; type?: "card" | "list" | "timeline";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = data[activeIndex] || [];

  return (
    <section id={id} className="fadein">
      <h2 className="section-title"><span>{title}</span></h2>
      <div className="wrapper">
        <ul className="tab-list">
          {tabs.map((tab, i) => (
            <li key={i} className={activeIndex === i ? "active" : ""} onClick={() => setActiveIndex(i)}>
              {tab}
            </li>
          ))}
        </ul>
        {type === "card" && (
          <ul className="products-list active">
            {items.map((item, i) => <ProjectCard key={i} item={item} />)}
          </ul>
        )}
        {type === "list" && (
          <div className="products-list active">
            <OverviewList items={items} />
          </div>
        )}
        {type === "timeline" && (
          <div className="active">
            <Timeline items={items} />
          </div>
        )}
        {items.length === 0 && <p style={{ textAlign: "center", padding: "2rem", width: "100%" }}>データがありません</p>}
      </div>
    </section>
  );
}
