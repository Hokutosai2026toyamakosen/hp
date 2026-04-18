"use client";

import React, { useState, useEffect } from "react";
import { CardBase, CardInside, SubList, Divider } from "@/components/webapp/components/Layout/CardComp";
import { mockSupabase, NewsItem, FETCH_INTERVAL } from "@/components/webapp/scripts/Server/mockSupabase";
import "@/components/webapp/App.css";
import dayjs from "dayjs";

export default function NewsStatus() {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const loadNews = async () => {
      const data = await mockSupabase.news.fetch();
      setNews(data);
    };
    loadNews();

    const interval = setInterval(loadNews, FETCH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <CardBase title="News">
      <CardInside className="no-vertical-padding">
        {news.length > 0 ? (
          news.map((item, index) => (
            <React.Fragment key={item.id}>
              {index !== 0 && <Divider />}
              <SubList>
                <div style={{ textAlign: "left", width: "100%" }}>
                  <div className="subProp">
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: "var(--main-color)",
                        margin: "0 0 4px 0",
                      }}
                    >
                      {item.title}
                    </p>
                    <p style={{ fontSize: "10px", color: "#999", margin: 0, textAlign: "right" }}>
                      {dayjs(item.created_at).format("HH:mm")}
                    </p>
                  </div>
                  <p style={{ fontSize: "13px", margin: "0 0 8px 0", whiteSpace: "pre-wrap" }}>{item.content}</p>
                  {item.edit_reason && <p className="edited-text">修正履歴: {item.edit_reason}</p>}
                </div>
              </SubList>
            </React.Fragment>
          ))
        ) : (
          <SubList>
            <p style={{ fontSize: "14px", color: "#999", textAlign: "center", width: "100%" }}>ニュースはありません</p>
          </SubList>
        )}
      </CardInside>
    </CardBase>
  );
}
