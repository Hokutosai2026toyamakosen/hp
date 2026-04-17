import fs from "fs";
import path from "path";
import { getPath } from "@/constants/paths";
import PageHeader from "@/components/ui/PageHeader/PageHeader";
import WorksContent from "./worksContent";
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
            <PageHeader enTitle="WORKS" jaTitle="ご協賛企業様" imgSrc={getPath("/img/works/mainvisual.jpg")} />
            <WorksContent worksData={worksData} />
        </main>
    );
}