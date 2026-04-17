"use client";

import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Container from "@/components/ui/Container/Container";
import FaqList from "./FaqList";
import "./faq.css";

interface FaqSectionProps {
    data: any;
}

export default function FaqSection({ data }: FaqSectionProps) {
    return (
        <div className="faq-section">
            <SectionTitle>よくあるご質問</SectionTitle>
            <Container>
                <FaqList data={data} />
            </Container>
        </div>
    );
}
