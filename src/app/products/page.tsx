import fs from "fs";
import path from "path";
import Link from "next/link";
import TabbedSectionClient from "./TabbedSectionClient";
import "./products.css";
import "../company/company.css";

function getLocalData(fileName: string) {
  const filePath = path.join(process.cwd(), "public/data", fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export default function Products() {
  const p = getLocalData("products.json");
  const s = getLocalData("stalls.json");
  const e = getLocalData("events.json");

  const allData = {
    products: [p.L1 || [], p.L2 || [], p.L3 || [], p.L4 || []],
    stalls: [s.L1 || [], s.L2 || [], s.L3 || [], s.L4 || []],
    events: [e.day1 || [], e.day2 || []],
  };

  return (
    <main>
      <div className="page-header">
        <div className="img">
          <img src="/img/company/mainvisual.jpg" alt="" />
        </div>
        <div className="page-title-area">
          <h1 className="page-title">
            <span className="en">PROJECTS</span>
            <span className="ja">企画紹介</span>
          </h1>
        </div>
      </div>

      <ul className="pagelink-list wrapper">
        <li>
          <Link href="#service">展示</Link>
        </li>
        <li>
          <Link href="#philosophy">模擬店</Link>
        </li>
        <li>
          <Link href="#overview">ステージ企画</Link>
        </li>
        <li>
          <Link href="#access">タイムテーブル</Link>
        </li>
      </ul>

      <TabbedSectionClient
        id="service"
        title="展示"
        tabs={["クラス展示", "部活動展示", "学科展示", "特別展示"]}
        data={allData.products}
        type="card"
      />

      <TabbedSectionClient
        id="philosophy"
        title="模擬店"
        tabs={["運動部", "文化部", "クラス", "その他"]}
        data={allData.stalls}
        type="card"
      />

      <TabbedSectionClient
        id="overview"
        title="ステージ企画"
        tabs={["1日目", "2日目"]}
        data={allData.events}
        type="list"
      />

      <TabbedSectionClient
        id="access"
        title="タイムテーブル"
        tabs={["1日目", "2日目"]}
        data={allData.events}
        type="timeline"
      />
    </main>
  );
}
