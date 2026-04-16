import "./works.css";
import { getPath } from "@/constants/paths";

export default function () {
    return (
        <main>
            <div className="page-header">
                <div className="img">
                    <img src={getPath("/img/works/mainvisual.jpg")} alt="" />
                </div>
                <div className="page-title-area">
                    <h1 className="page-title">
                        <span className="en">WORKS</span>
                        <span className="ja">実績紹介</span>
                    </h1>
                </div>
            </div>

            <p className="head-text">
                住む人やその空間を利用されるお客様が笑顔になるような
                <br className="pc" />
                空間創りをお手伝いさせていただきます。
            </p>

            <ul className="works-list">
                <li className="work1">
                    <div className="img">
                        <img src={getPath("/img/works/works1-1.jpg")} alt="" />
                    </div>
                    <div className="text">
                        <p className="name">PROJECT NAME NO.001</p>
                        <dl className="info">
                            <div className="item">
                                <dt>Category:</dt>
                                <dd>Cafe</dd>
                            </div>
                            <div className="item">
                                <dt>Location:</dt>
                                <dd>Tokyo</dd>
                            </div>
                            <div className="item">
                                <dt>Detail:</dt>
                                <dd>東京都渋谷区にあるカフェの店舗デザインを担当させていただきました。</dd>
                            </div>
                        </dl>
                        <div className="modal-open">
                            More Images
                            <img src={getPath("/img/works/icon-modal-open.svg")} alt="" />
                        </div>
                    </div>

                    <div className="modal-container">
                        <div className="modal-content">
                            <div className="modal-close">
                                <img src={getPath("/img/works/icon-modal-close.svg")} alt="" />
                            </div>
                            <p className="modal-name">PROJECT NAME NO.001</p>
                            <div className="modal-img">
                                <img src={getPath("/img/works/works1-1.jpg")} alt="" />
                                <img src={getPath("/img/works/works1-2.jpg")} alt="" />
                                <img src={getPath("/img/works/works1-3.jpg")} alt="" />
                                <img src={getPath("/img/works/works1-4.jpg")} alt="" />
                            </div>
                        </div>
                    </div>
                </li>

                <li className="work2">
                    <div className="img">
                        <img src={getPath("/img/works/works2-1.jpg")} alt="" />
                    </div>
                    <div className="text">
                        <p className="name">PROJECT NAME NO.002</p>
                        <dl className="info">
                            <div className="item">
                                <dt>Category:</dt>
                                <dd>Apparel</dd>
                            </div>
                            <div className="item">
                                <dt>Location:</dt>
                                <dd>Osaka</dd>
                            </div>
                            <div className="item">
                                <dt>Detail:</dt>
                                <dd>大阪府大阪市にあるアパレルブランドの店舗デザインを担当させていただきました。</dd>
                            </div>
                        </dl>
                        <div className="modal-open">
                            More Images
                            <img src={getPath("/img/works/icon-modal-open.svg")} alt="" />
                        </div>
                    </div>

                    <div className="modal-container">
                        <div className="modal-content">
                            <div className="modal-close">
                                <img src={getPath("/img/works/icon-modal-close.svg")} alt="" />
                            </div>
                            <p className="modal-name">PROJECT NAME NO.002</p>
                            <div className="modal-img">
                                <img src={getPath("/img/works/works2-1.jpg")} alt="" />
                                <img src={getPath("/img/works/works2-2.jpg")} alt="" />
                                <img src={getPath("/img/works/works2-3.jpg")} alt="" />
                                <img src={getPath("/img/works/works2-4.jpg")} alt="" />
                            </div>
                        </div>
                    </div>
                </li>

                <li className="work3">
                    <div className="img">
                        <img src={getPath("/img/works/works3-1.jpg")} alt="" />
                    </div>
                    <div className="text">
                        <p className="name">PROJECT NAME NO.003</p>
                        <dl className="info">
                            <div className="item">
                                <dt>Category:</dt>
                                <dd>Residence</dd>
                            </div>
                            <div className="item">
                                <dt>Location:</dt>
                                <dd>Fukuoka</dd>
                            </div>
                            <div className="item">
                                <dt>Detail:</dt>
                                <dd>福岡県福岡市にある邸宅のインテリアデザインを担当させていただきました。</dd>
                            </div>
                        </dl>
                        <div className="modal-open">
                            More Images
                            <img src={getPath("/img/works/icon-modal-open.svg")} alt="" />
                        </div>
                    </div>

                    <div className="modal-container">
                        <div className="modal-content">
                            <div className="modal-close">
                                <img src={getPath("/img/works/icon-modal-close.svg")} alt="" />
                            </div>
                            <p className="modal-name">PROJECT NAME NO.003</p>
                            <div className="modal-img">
                                <img src={getPath("/img/works/works3-1.jpg")} alt="" />
                                <img src={getPath("/img/works/works3-2.jpg")} alt="" />
                                <img src={getPath("/img/works/works3-3.jpg")} alt="" />
                                <img src={getPath("/img/works/works3-4.jpg")} alt="" />
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </main>
    );
}
