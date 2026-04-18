"use client";

import React, { useState, useEffect } from "react";
import {
  CardBase,
  CardInside,
  SubList,
  Divider,
} from "@/components/webapp/components/Layout/CardComp";
import { mockSupabase, LostItem, FETCH_INTERVAL } from "@/components/webapp/scripts/Server/mockSupabase";
import dayjs from "dayjs";

export default function LostStatus() {
  const [items, setItems] = useState<LostItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    const loadItems = async () => {
      const data = await mockSupabase.lostAndFound.fetch();
      if (isMounted) setItems(data);
    };

    loadItems();
    const interval = setInterval(loadItems, FETCH_INTERVAL);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <CardBase title="Lost">
      <CardInside className="no-vertical-padding">
        {items.length > 0 ? (
          items.map((item, index) => (
            <React.Fragment key={item.id}>
              {index !== 0 && <Divider />}
              <SubList>
                <div style={{ textAlign: "left", width: "100%" }}>
                  <p style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 4px 0" }}>
                    {item.name}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>場所: {item.place}</p>
                    <p style={{ fontSize: "10px", color: "#999", margin: 0 }}>
                      {dayjs(item.created_at).format("HH:mm")}
                    </p>
                  </div>
                  {item.edit_reason && (
                    <p style={{ fontSize: "10px", color: "#999", margin: "4px 0 0 0", fontStyle: "italic" }}>
                      (編集: {item.edit_reason})
                    </p>
                  )}
                </div>
              </SubList>
            </React.Fragment>
          ))
        ) : (
          <SubList>
            <p style={{ fontSize: "14px", color: "#999", textAlign: "center", width: "100%" }}>
              現在、届け出のある落とし物はありません
            </p>
          </SubList>
        )}
      </CardInside>
    </CardBase>
  );
}
