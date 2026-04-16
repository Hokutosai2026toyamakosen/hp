import "./contact.css";
import { getPath } from "@/constants/paths";
import PageHeader from "@/components/ui/PageHeader/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";
import Container from "@/components/ui/Container/Container";

export default function Contact() {
  return (
    <main>
      <PageHeader 
        enTitle="CONTACT" 
        jaTitle="お問い合わせ" 
        imgSrc={getPath("/img/contact/mainvisual.jpg")} 
      />

      <Container>
        <section className="form-area">
          <SectionTitle>お問い合わせフォーム</SectionTitle>
          <p className="form-title">
            北斗祭に関するお問い合わせは、以下のフォームより受け付けております。
          </p>
          
          <form>
            <dl>
              <div className="item">
                <dt>
                  お名前
                  <span className="require">必須</span>
                </dt>
                <dd>
                  <input type="text" name="name" required placeholder="例）北斗 太郎" />
                </dd>
              </div>

              <div className="item">
                <dt>
                  メールアドレス
                  <span className="require">必須</span>
                </dt>
                <dd>
                  <input type="email" name="email" required placeholder="例）example@hokuto.ac.jp" />
                </dd>
              </div>

              <div className="item">
                <dt>お問い合わせ内容</dt>
                <dd>
                  <textarea name="message" rows={10} placeholder="お問い合わせ内容をご記入ください"></textarea>
                </dd>
              </div>
            </dl>

            <div className="privacy-policy">
              <div className="privacy-text">
                <p className="privacy-title">プライバシーポリシー</p>
                <p>当委員会は、取得した個人情報を適切に管理し、お問い合わせへの回答目的以外には使用いたしません。</p>
              </div>
              <div className="privacy-item">
                <label>
                  <input type="checkbox" name="agree" required />
                  プライバシーポリシーに同意する
                </label>
              </div>
            </div>

            <button type="submit" className="btn-submit">送信する</button>
          </form>
        </section>
      </Container>
    </main>
  );
}
