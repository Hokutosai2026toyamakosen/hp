import fs from "fs";
import path from "path";
import "./faq.css";
import { getPath } from "@/constants/paths";
import PageHeader from "@/components/ui/PageHeader/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Container from "@/components/ui/Container/Container";

function getLocalData(fileName: string) {
    const filePath = path.join(process.cwd(), "public/data", fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
}

export default function Faq() {
  const faqData = getLocalData("faq.json");

  return (
    <main>
      <PageHeader 
        enTitle="FAQ" 
        jaTitle="よくあるご質問" 
        imgSrc={getPath("/img/faq/mainvisual.jpg")} 
      />

      <Container>
        <div className="faq-list">
          <SectionTitle>ご来場の皆様へ</SectionTitle>
          {faqData.map((item: { Q: string; A: string }, index: number) => (
            <dl key={index} className="item">
              <dt>
                <span className="question">Q</span>
                {item.Q}
              </dt>
              <dd>
                <span className="answer">A</span>
                <span dangerouslySetInnerHTML={{ __html: item.A }} />
              </dd>
            </dl>
          ))}
        </div>
      </Container>
    </main>
  );
}
