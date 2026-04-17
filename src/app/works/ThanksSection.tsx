import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import ItemCard from "@/components/ui/ItemCard/ItemCard";
import "./works.css";

interface worksDataItem {
    name: string;
    url: string;
    image: string;
}

type worksDataType = worksDataItem[];

export default function ThanksSection(props: {worksData: worksDataType}) {
    return (
        <div className="sitenavi-section">
            <SectionTitle>協賛企業様一覧</SectionTitle>
            <ul className="works-list">
                {props.worksData.map((item: { name: string; url: string; image: string }, index: number) => (
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
        </div>
    );
}
