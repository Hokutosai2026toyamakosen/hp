"use client";

import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Container from "@/components/ui/Container/Container";

export default function NoticeSection() {
    return (
        <div className="notice-section">
            <SectionTitle>ご来場の皆様へのお願い</SectionTitle>
            <Container>
                <div style={{ lineHeight: "2", marginBottom: "80px" }}>
                    <p>第18回北斗祭を安全に楽しく開催するため、来場者の皆様には以下の点にご協力をお願いいたします。</p>
                    <ul style={{ marginTop: "20px", listStyle: "disc", paddingLeft: "20px" }}>
                        <li>校内は全面禁煙です。</li>
                        <li>酒類の持ち込み、および飲酒は固くお断りいたします。</li>
                        <li>ゴミの分別にご協力ください。</li>
                        <li>駐車場には限りがございます。公共交通機関のご利用をお願いいたします。</li>
                        <li>他のお客様のご迷惑となる行為はお控えください。</li>
                    </ul>
                </div>
            </Container>
        </div>
    );
}
