import { getPath } from "@/constants/paths";
import PageHeader from "@/components/ui/PageHeader/PageHeader";
import SitenaviContent from "./SitenaviContent";

export default function SitePage() {
    return (
        <main>
            <PageHeader enTitle="SITE NAVI" jaTitle="サイト案内" imgSrc={getPath("/img/faq/mainvisual.jpg")} />
            <SitenaviContent />
        </main>
    );
}
