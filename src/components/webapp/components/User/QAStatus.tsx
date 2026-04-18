"use client";

import React, { useState, useEffect } from "react";
import { Input, Button, App } from "antd";
import { CardBase, CardInside, Divider } from "@/components/webapp/components/Layout/CardComp";
import { mockSupabase, Question, FETCH_INTERVAL } from "@/components/webapp/scripts/Server/mockSupabase";

export default function QAStatus() {
  const { message } = App.useApp();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadQuestions = async () => {
      const data = await mockSupabase.qa.fetch();
      if (isMounted) setQuestions(data);
    };
    loadQuestions();

    const interval = setInterval(loadQuestions, FETCH_INTERVAL);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleAsk = async () => {
    if (!text) return;
    setLoading(true);
    try {
      await mockSupabase.qa.ask(text);
      message.success("質問を送信しました。運営からの回答をお待ちください。");
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 1500);
      setText("");
    } catch {
      message.error("質問の送信に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const answeredQuestions = questions.filter((q) => q.answer);

  return (
    <CardBase title="Q & A">
      <CardInside>
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
          <Input.TextArea
            placeholder="運営への質問を入力..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            value={text}
            onChange={(e) => setText(e.target.value)}
            size="large"
          />
          <Button
            type="primary"
            onClick={handleAsk}
            loading={loading}
            disabled={isSuccess}
            style={{
              height: "auto",
              background: isSuccess ? "#52c41a" : "#1f1f1f",
              borderColor: isSuccess ? "#52c41a" : "#1f1f1f",
            }}
            size="large"
          >
            {isSuccess ? "送信完了！" : "送信"}
          </Button>
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "#666",
            margin: "10px 0",
            textAlign: "left",
            fontWeight: "bold",
          }}
        >
          回答済みの質問
        </p>

        {answeredQuestions.length > 0 ? (
          answeredQuestions.map((q, index) => (
            <React.Fragment key={q.id}>
              {index !== 0 && (
                <div style={{ padding: "8px 0" }}>
                  <Divider />
                </div>
              )}
              <div style={{ textAlign: "left", width: "100%" }}>
                <p style={{ fontSize: "14px", margin: "0 0 8px 0" }}>
                  <span style={{ color: "#007AFF" }}>Q.&ensp;</span>
                  {q.text}
                </p>
                <p style={{ fontSize: "14px", margin: 0 }}>
                  <span style={{ color: "#ff4d4f", fontWeight: "bold", marginRight: "8px" }}>A:</span>
                  {q.answer}
                </p>
                {q.edit_reason && (
                  <p style={{ fontSize: "10px", color: "#999", margin: "4px 0 0 0", fontStyle: "italic" }}>
                    (編集: {q.edit_reason})
                  </p>
                )}
              </div>
            </React.Fragment>
          ))
        ) : (
          <p style={{ fontSize: "12px", color: "#999", textAlign: "center", padding: "10px" }}>
            回答済みの質問はまだありません
          </p>
        )}
      </CardInside>
    </CardBase>
  );
}
