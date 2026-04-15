import "./contact.css";

export default function Contact() {
  return (
    <main>
      <div className="page-header">
        <div className="img">
          <img src="/img/contact/mainvisual.jpg" alt="" />
        </div>
        <div className="page-title-area">
          <h1 className="page-title">
            <span className="en">CONTACT</span>
            <span className="ja">お問い合わせ</span>
          </h1>
        </div>
      </div>

      <p className="head-text">
        ご不明点やご質問などございましたら、
        <br className="pc" />
        下記のフォームからお気軽にお問い合わせください。
      </p>

      <div className="form-area">
        <p className="form-title">お問い合わせフォーム</p>
        <form action="" method="post">
          <dl>
            <div className="item">
              <dt>
                <label htmlFor="kind">お問い合わせ種別</label>
                <span className="require">必須</span>
              </dt>
              <dd>
                <select name="kind" id="kind">
                  <option value="">選択してください</option>
                  <option value="インテリアについて">不明点について</option>
                  <option value="店舗デザインについて">不具合について</option>
                  <option value="採用について">落とし物について</option>
                  <option value="取材依頼について">協賛について</option>
                  <option value="その他">その他</option>
                </select>
              </dd>
            </div>
            <div className="item">
              <dt>
                <label htmlFor="kind">お名前</label>
                <span className="require">必須</span>
              </dt>
              <dd>
                <input id="name" type="text" name="name" placeholder="高専　太郎" />
              </dd>
            </div>
            <div className="item">
              <dt>
                <label htmlFor="mail">メールアドレス</label>
                <span className="require">必須</span>
              </dt>
              <dd>
                <input id="mail" type="email" name="mail" placeholder="xxxxxxxx@xxx.xxxx" />
              </dd>
            </div>
            <div className="item">
              <dt>どこでお知りになりましたか？</dt>
              <dd className="checkbox-group">
                <div className="checkbox-item">
                  <input type="checkbox" name="know[]" id="know-1" value="SNS" />
                  <label htmlFor="know-1">SNS（Instagram, Google検索など）</label>
                </div>
                <div className="checkbox-item">
                  <input type="checkbox" name="know[]" id="know-2" value="Google検索" />
                  <label htmlFor="know-2">ポスター</label>
                </div>
                <div className="checkbox-item">
                  <input type="checkbox" name="know[]" id="know-3" value="紹介・口コミ" />
                  <label htmlFor="know-3">紹介・口コミ</label>
                </div>
                <div className="checkbox-item">
                  <input type="checkbox" name="know[]" id="know-4" value="その他" />
                  <label htmlFor="know-4">その他</label>
                </div>
              </dd>
            </div>
            <div className="item">
              <dt>
                <label htmlFor="message">お問い合わせ内容</label>
                <span className="require">必須</span>
              </dt>
              <dd>
                <textarea id="message" cols={40} rows={8} name="message"></textarea>
              </dd>
            </div>
          </dl>

          <div className="privacy-policy">
            <div className="privacy-text">
              <p className="privacy-title">個人情報の取り扱いについて</p>
              <p>
                当社は、お客様等の個人情報について、個人情報保護に関する法令およびその他の規範を遵守します。
              </p>
              <ol>
                <li>
                  1.
                  個人情報の取り扱いに関するテキストが入ります個人情報の取り扱いに関するテキストが入ります個人情報の取り扱いに関するテキストが入ります
                </li>
                <li>
                  2.
                  個人情報の取り扱いに関するテキストが入ります個人情報の取り扱いに関するテキストが入ります個人情報の取り扱いに関するテキストが入ります
                </li>
                <li>
                  3.
                  個人情報の取り扱いに関するテキストが入ります個人情報の取り扱いに関するテキストが入ります個人情報の取り扱いに関するテキストが入ります
                </li>
                <li>
                  4.
                  個人情報の取り扱いに関するテキストが入ります個人情報の取り扱いに関するテキストが入ります個人情報の取り扱いに関するテキストが入ります
                </li>
                <li>
                  5.
                  個人情報の取り扱いに関するテキストが入ります個人情報の取り扱いに関するテキストが入ります個人情報の取り扱いに関するテキストが入ります
                </li>
              </ol>
            </div>
            <div className="privacy-item">
              <input type="checkbox" name="privacy" id="privacy" value="" />
              <label htmlFor="privacy">個人情報の取り扱いに同意する</label>
            </div>
          </div>

          <input className="btn-submit" type="submit" name="send" value="送信" />
        </form>
      </div>
    </main>
  );
}
