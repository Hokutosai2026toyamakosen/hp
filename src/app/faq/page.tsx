"use client";
import { useState, useEffect } from "react";
import "./faq.css";

const dataUrlFaq = "/data/faq.json";

interface FaqItem {
  Q: string;
  A: string;
}
type FaqData = FaqItem[];

const FaqItemDOM = ({ faqdata }: { faqdata: FaqData }) => (
  <>
    {faqdata.map((faqitem, i) => (
      <div className="item" key={i}>
        <dt>
          <span className="question">Q</span>
          <span>{faqitem.Q}</span>
        </dt>
        <dd>
          <span className="answer">A</span>
          <span dangerouslySetInnerHTML={{ __html: faqitem.A }} />
        </dd>
      </div>
    ))}
  </>
);

export default function Faq() {
  const [faq, setFaq] = useState<FaqData | null>(null);

  useEffect(() => {
    fetch(dataUrlFaq)
      .then((response) => response.json())
      .then((data) => {
        setFaq(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);


  return (
    <main>
      <div className="page-header">
        <div className="img">
          <img src="/img/faq/mainvisual.jpg" alt="" />
        </div>
        <div className="page-title-area">
          <h1 className="page-title">
            <span className="en">FAQ</span>
            <span className="ja">よくある質問</span>
          </h1>
        </div>
      </div>

      <p className="head-text">
        お客様からよくいただく質問をまとめました。
        <br />
        その他、ご質問やご不明点がございましたらお気軽にお問い合わせください。
      </p>

      <dl className="faq-list" id="faq-list">
        {!faq ? <h5>データ準備！</h5> : <FaqItemDOM faqdata={faq} />}
      </dl>
    </main>
  );
}
