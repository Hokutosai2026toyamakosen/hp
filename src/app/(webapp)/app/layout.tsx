export const metadata = {
  title: "北斗祭2026アプリ | 富山高専",
  description: "富山高専で行われる北斗祭2026で使えるウェブアプリ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
