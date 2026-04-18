import React from "react";
import { Skeleton } from "antd";
import { useRole } from "@/components/webapp/contexts/RoleContext";

function CardBase(props: { title: string; children: React.ReactNode; SubjectUpdated?: React.ReactNode }) {
  return (
    <div className="carddiv">
      <div className="subProp">
        <CardTitle title={props.title} />
        {props.SubjectUpdated ? props.SubjectUpdated : null}
      </div>
      {props.children}
    </div>
  );
}

function CardTitle(props: { title: string }) {
  const { isAdmin } = useRole();
  const firstCharColor = isAdmin ? "#ff4d4f" : "#007AFF";

  return (
    <div className="cardTitle">
      <p>
        <span style={{ color: firstCharColor }}>{props.title.slice(0, 1)}</span>
        <span>{props.title.slice(1)}</span>
      </p>
    </div>
  );
}

function SubList(props: { SubNumber?: number; children: React.ReactNode }) {
  let link: React.ReactNode = null;
  if (props.SubNumber !== undefined) {
    if (true) {
      link = <a className="linkButton" href={""} target="_blank" rel="noreferrer"></a>;
    }
  }

  return (
    <div>
      <div style={{ padding: "12px 0", display: "flex", alignItems: "center", width: "100%" }}>{props.children}</div>
      {link}
    </div>
  );
}

function CardInside(props: { className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className={`card ${props.className || ""}`} id="card" style={props.style}>
      {props.children}
    </div>
  );
}

function Divider() {
  return <div className="scheList"></div>;
}

export { CardBase, CardInside, SubList, Divider };
