"use client";

import React, { useState, useEffect } from "react";
import { Input, Button, App, Modal } from "antd";
import { CardBase, CardInside } from "@/components/webapp/components/Layout/CardComp";
import { mockSupabase, LostItem, FETCH_INTERVAL } from "@/components/webapp/scripts/Server/mockSupabase";
import "@/components/webapp/components/Admin/admin.css";

export default function LostManager() {
  const { message, modal } = App.useApp();
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [items, setItems] = useState<LostItem[]>([]);
  const [editingItem, setEditingItem] = useState<LostItem | null>(null);
  const [editName, setEditName] = useState("");
  const [editPlace, setEditPlace] = useState("");
  const [editReason, setEditReason] = useState("");

  const loadItems = async () => {
    const data = await mockSupabase.lostAndFound.fetch();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
    const interval = setInterval(loadItems, FETCH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handlePost = async () => {
    if (!name || !place) {
      message.warning("品名と場所を入力してください");
      return;
    }
    setLoading(true);
    try {
      await mockSupabase.lostAndFound.post({ name, place });
      message.success("落とし物を登録しました");
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 1500);
      setName("");
      setPlace("");
      loadItems();
    } catch (error) {
      console.error(error);
      message.error("エラー");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string, name: string) => {
    modal.confirm({
      title: "落とし物の削除 (確認)",
      content: (
        <div style={{ marginTop: "10px" }}>
          <p style={{ marginBottom: "10px" }}>この落とし物情報を削除します</p>
          <div style={{ padding: "10px", background: "#f5f5f5", borderRadius: "8px", fontSize: "12px", color: "#666", border: "1px solid #ddd" }}>
            {name}
          </div>
        </div>
      ),
      getContainer: () => document.querySelector(".webapp-root") || document.body,
      onOk: async () => {
        const originalItems = [...items];
        setItems(prev => prev.filter(item => item.id !== id));
        try {
          await mockSupabase.lostAndFound.delete(id);
          message.success("削除しました");
        } catch (error) {
          console.error(error);
          message.error("削除に失敗しました");
          setItems(originalItems);
        }
      },
    });
  };

  const startEdit = (item: LostItem) => {
    setEditingItem(item);
    setEditName(item.name);
    setEditPlace(item.place);
    setEditReason("");
  };

  const handleUpdate = async () => {
    if (!editName || !editPlace || !editReason) {
      message.warning("品名、場所、編集理由をすべて入力してください");
      return;
    }
    setLoading(true);
    try {
      await mockSupabase.lostAndFound.update(editingItem!.id, {
        name: editName,
        place: editPlace,
        reason: editReason,
      });
      message.success("編集しました");
      setEditingItem(null);
      loadItems();
    } catch (error) {
      console.error(error);
      message.error("エラー");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardBase title="Lost Manager (Admin)">
      <CardInside>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <p style={{ textAlign: "left", margin: 0 }}>新規登録</p>
          <Input placeholder="落とし物の名前" value={name} onChange={e => setName(e.target.value)} size="large" />
          <Input placeholder="落ちていた場所" value={place} onChange={e => setPlace(e.target.value)} size="large" />
          <Button type={isSuccess ? "default" : "primary"} block onClick={handlePost} loading={loading} disabled={isSuccess} className="main-push-btn" size="large">
            {isSuccess ? "投稿完了！" : "落とし物を登録"}
          </Button>
        </div>
        <p style={{ textAlign: "left", margin: "20px 0 10px", paddingTop: "10%" }}>登録済みアイテム</p>
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} style={{ textAlign: "left", padding: "15px", background: "#eee", borderRadius: "8px", marginTop: "5%" }}>
              <p style={{ fontWeight: "bold", margin: 0 }}>{item.name}</p>
              <p style={{ fontSize: "12px", color: "#666", margin: "4px 0" }}>場所: {item.place}</p>
              {item.edit_reason && <p className="edited-text">編集済み: {item.edit_reason}</p>}
              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <Button onClick={() => startEdit(item)}>編集</Button>
                <Button danger onClick={() => handleDelete(item.id, item.name)}>削除</Button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "12px", color: "#999", textAlign: "center", padding: "20px" }}>登録されているアイテムはありません</p>
        )}
        <Modal title="落とし物の編集" open={!!editingItem} onOk={handleUpdate} onCancel={() => setEditingItem(null)} okText="更新" cancelText="キャンセル" confirmLoading={loading} getContainer={() => document.querySelector(".webapp-root") || document.body}>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px", paddingTop: "10px" }}>
            <Input size="large" placeholder="品名" value={editName} onChange={e => setEditName(e.target.value)} />
            <Input size="large" placeholder="場所" value={editPlace} onChange={e => setEditPlace(e.target.value)} />
            <Input size="large" placeholder="編集理由 (必須)" value={editReason} onChange={e => setEditReason(e.target.value)} />
          </div>
        </Modal>
      </CardInside>
    </CardBase>
  );
}
