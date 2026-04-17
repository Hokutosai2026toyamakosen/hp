import fs from "fs";
import path from "path";
import { getPath } from "@/constants/paths";
import PageHeader from "@/components/ui/PageHeader/PageHeader";
import VisitorContent from "./VisitorContent";

function getLocalData(fileName: string) {
    const filePath = path.join(process.cwd(), "public/data", fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
}

export default function VisitorPage() {
    const faqData = getLocalData("faq.json");

    return (
        <main>
            <PageHeader 
                enTitle="GUIDE" 
                jaTitle="ご来場の皆様へ" 
                imgSrc={getPath("/img/faq/mainvisual.jpg")} 
            />
            <VisitorContent faqData={faqData} />
        </main>
    );
}
