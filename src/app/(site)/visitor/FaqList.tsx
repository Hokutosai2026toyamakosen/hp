"use client";

import { useState } from "react";

interface FaqItemData {
  Q: string;
  A: string;
}

export default function FaqList({ data }: { data: FaqItemData[] }) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="faq-list">
      {data.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <dl key={index} className={`item ${isOpen ? "active" : ""}`}>
            <dt onClick={() => toggleItem(index)} className={isOpen ? "active" : ""}>
              <span className="question">Q</span>
              {item.Q}
            </dt>
            <dd>
              <div className="answer-content">
                <span className="answer">A</span>
                <span dangerouslySetInnerHTML={{ __html: item.A }} />
              </div>
            </dd>
          </dl>
        );
      })}
    </div>
  );
}
