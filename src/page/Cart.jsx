import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, enableNetwork } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import './Cart.scss';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Firestore 네트워크 강제로 활성화 (오프라인 오류 방지)
        enableNetwork(db).catch((err) => {
            console.error("Firestore 네트워크 활성화 실패:", err);
        });

        // 로그인 상태 감지 및 장바구니 불러오기
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                navigate('/login');
                return;
            }

            try {
                const cartRef = doc(db, 'carts', user.uid);
                const cartSnap = await getDoc(cartRef);

                if (cartSnap.exists()) {
                    setCartItems(cartSnap.data().items || []);
                } else {
                    setCartItems([]);
                }
            } catch (error) {
                console.error('장바구니 불러오기 오류:', error);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe(); // 컴포넌트 unmount 시 구독 해제
    }, [navigate]);

    // 상품을 장바구니에 추가하는 함수 (사용 예시용)
    const addToCart = async (item) => {
        const user = auth.currentUser;
        if (!user) {
            alert('로그인이 필요합니다');
            return;
        }

        try {
            const cartRef = doc(db, 'carts', user.uid);
            const cartSnap = await getDoc(cartRef);

            let existingItems = [];
            if (cartSnap.exists()) {
                existingItems = cartSnap.data().items || [];
            }

            const updatedItems = [...existingItems, item];
            await setDoc(cartRef, { items: updatedItems });
            setCartItems(updatedItems); // UI 즉시 반영

        } catch (error) {
            console.error('장바구니 추가 중 오류:', error);
        }
    };

    if (loading) return <div>로딩 중...</div>;

    return (
        <div className="cart-container" style={{ maxWidth: '600px', margin: '200px auto', padding: '2rem' }}>
            <h2>장바구니</h2>
            {cartItems.length === 0 ? (
                <div>
                    <p>장바구니가 비어 있습니다.</p>
                    <button onClick={() => navigate('/')}>쇼핑 계속하기</button>
                </div>
            ) : (
                <>
                    <ul style={{ padding: 0 }}>
                        {cartItems.map((item, idx) => (
                            <li key={item.id || idx} style={{ borderBottom: '1px solid #eee', padding: '10px 0', listStyle: 'none' }}>
                                <img src={process.env.PUBLIC_URL + item.img} alt={item.title} style={{ width: '60px', marginRight: '10px', verticalAlign: 'middle' }} />
                                <span style={{ fontWeight: 'bold' }}>{item.title}</span>
                                <span style={{ marginLeft: '10px' }}>{item.price}원</span>
                            </li>
                        ))}
                    </ul>
                    <div style={{ marginTop: '20px' }}>
                        <button onClick={() => navigate('/')}>쇼핑 계속하기</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
