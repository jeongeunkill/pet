import React from 'react';
import './footer.scss';
const Footer = () => {
    return (
        <div className="footer">
            <div className="footerInner">
                <ul>
                    <li><a href="#">이용약관</a></li>
                    <li><a href="#"><strong>개인정보처리방침</strong></a></li>
                </ul>
                <h2 className="footerLogo">CIRIUSPET</h2>
                <p>동물이 행복한 세상</p>
                <p>사업자정보 보기</p>
            </div>

            
        </div>
    );
};

export default Footer;