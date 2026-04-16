import fs from "fs";
import path from "path";
import { getPath } from "@/constants/paths";
import PageHeader from "@/components/ui/PageHeader/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Container from "@/components/ui/Container/Container";
import ItemCard from "@/components/ui/ItemCard/ItemCard";
import "./works.css";

function getLocalData(fileName: string) {
  const filePath = path.join(process.cwd(), "public/data", fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export default function Works() {
  const worksData = getLocalData("works.json");

  return (
    <main>
      <PageHeader
        enTitle="WORKS"
        jaTitle="ご協賛企業様"
        imgSrc={getPath("/img/works/mainvisual.jpg")}
      />

      <SectionTitle>協賛企業様一覧</SectionTitle>
      <ul className="works-list">
        {worksData.map((item: { name: string; url: string; image: string }, index: number) => (
          <ItemCard
            key={index}
            data={{
              type: "company",
              name: item.name,
              url: item.url,
              image: item.image,
            }}
          />
        ))}
      </ul>
    </main>
  );
}
