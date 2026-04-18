"use client";

import React, { useState, useEffect } from "react";
import { Input, Button, App, Modal } from "antd";
import { CardBase, CardInside, Divider } from "@/components/webapp/components/Layout/CardComp";
import { mockSupabase, NewsItem, FETCH_INTERVAL } from "@/components/webapp/scripts/Server/mockSupabase";
import "@/components/webapp/components/Admin/admin.css";

export default function NewsManager() {
  const { message, modal } = App.useApp();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editReason, setEditReason] = useState("");

  const load = async () => {
    const data = await mockSupabase.news.fetch();
    setNews(data);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, FETCH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handlePost = async () => {
    if (!title || !content) {
      message.warning("タイトルと内容を入力してください");
      return;
    }
    setLoading(true);
    try {
      await mockSupabase.news.post(title, content);
      message.success("ニュースを配信しました");
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 1500);
      setTitle("");
      setContent("");
      load();
    } catch (error) {
      console.error(error);
      message.error("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string, title: string) => {
    modal.confirm({
      title: "ニュースの削除 (確認)",
      content: (
        <div style={{ marginTop: "10px" }}>
          <p style={{ marginBottom: "10px" }}>このニュースを削除します</p>
          <div style={{ padding: "10px", background: "#f5f5f5", borderRadius: "8px", fontSize: "12px", color: "#666", border: "1px solid #ddd" }}>
            {title}
          </div>
        </div>
      ),
      getContainer: () => document.querySelector(".webapp-root") || document.body,
      onOk: async () => {
        const originalNews = [...news];
        setNews(prev => prev.filter(n => n.id !== id));
        try {
          await mockSupabase.news.delete(id);
          message.success("削除しました");
        } catch (error) {
          console.error(error);
          message.error("削除に失敗しました");
          setNews(originalNews);
        }
      }
    });
  };

  const startEdit = (item: NewsItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditContent(item.content);
    setEditReason("");
  };

  const handleUpdate = async () => {
    if (!editTitle || !editContent || !editReason) {
      message.warning("すべての項目を入力してください");
      return;
    }
    setLoading(true);
    try {
      await mockSupabase.news.update(editingItem!.id, {
        title: editTitle,
        content: editContent,
        reason: editReason
      });
      message.success("編集しました");
      setEditingItem(null);
      load();
    } catch (error) {
      console.error(error);
      message.error("エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardBase title="News Manager (Admin)">
      <CardInside>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px"}}>
          <p style={{ textAlign: "left", margin: 0 }}>新規配信</p>
          <Input placeholder="タイトル" value={title} onChange={e => setTitle(e.target.value)} size="large" />
          <Input.TextArea placeholder="内容" rows={3} value={content} onChange={e => setContent(e.target.value)} size="large" />
          <Button type={isSuccess ? "default" : "primary"} block onClick={handlePost} loading={loading} disabled={isSuccess} className="main-push-btn" size="large">
            {isSuccess ? "配信完了！" : "配信する"}
          </Button>
        </div>
        <Divider />
        <p style={{ textAlign: "left", margin: "20px 0 10px", paddingTop: "10%" }}>配信済みニュース</p>
        {news.map(item => (
          <div key={item.id} style={{ textAlign: "left", padding: "10px", background: "#eee", borderRadius: "8px", marginBottom: "10px"}}>
            <p style={{ fontWeight: "bold", margin: 0 }}>{item.title}</p>
            <p style={{ fontSize: "12px", color: "#666", margin: "4px 0" }}>{item.content}</p>
            {item.edit_reason && <p className="edited-text">編集済み: {item.edit_reason}</p>}
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <Button onClick={() => startEdit(item)}>編集</Button>
              <Button danger onClick={() => handleDelete(item.id, item.title)}>削除</Button>
            </div>
          </div>
        ))}
        <Modal title="ニュースの編集" open={!!editingItem} onOk={handleUpdate} onCancel={() => setEditingItem(null)} okText="編集を反映" cancelText="キャンセル" confirmLoading={loading} getContainer={() => document.querySelector(".webapp-root") || document.body}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", paddingTop: "10px" }}>
            <Input size="large" placeholder="タイトル" value={editTitle} onChange={e => setEditTitle(e.target.value)} />
            <Input.TextArea size="large" rows={3} value={editContent} onChange={e => setEditContent(e.target.value)} />
            <Input size="large" placeholder="編集理由 (必須)" value={editReason} onChange={e => setEditReason(e.target.value)} />
          </div>
        </Modal>
      </CardInside>
    </CardBase>
  );
}
