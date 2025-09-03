import React from 'react';
import './best.scss';

const Best = () => {
    return (
        <div className='best'>
            <h2>BEST ITEM</h2>
            <p>Anniversary Sale early</p>
            <div className="bestItem">
                <div className="bestItemLeft">
                    <div>
                        <h3>토코 쿨러백 </h3>
                        <p>
                            매일매일 신선하게. <br />
                            기능성 안감으로 무더운 여름에도 온도를 적절하게 유지해줘요.
                        </p>
                        <button>more BTN</button>
                    </div>
                </div>
                <div className="bestItemRight">
                    <div className="Item_pinkBg">
                        <h3>휴대용 원터치 산책 물병</h3>
                        <p> 뚜껑에 물을 부으면 흘리지 않고 그릇으로 사용 가능해요</p>
                    </div>
                    <div className="Item_grayBg best1"></div> 
                    <div className="Item_grayBg best2"></div>
                    <div className="Item_pinkBg">
                        <h3>스누즈 쿨 매트</h3>
                        <p>몸의 열기를 빠르게 식혀서<br />자연스럽게 체온을 낮춰줘요.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Best;