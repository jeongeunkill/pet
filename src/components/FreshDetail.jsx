import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {DataFreshContext} from '../App';
import { useParams } from "react-router-dom";
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import './freshBox.scss';

const FreshDetail = () => {
    const {id} = useParams();
    const { freshData } =useContext(DataFreshContext);
    const item=freshData.find((item)=>String(item.id)===String(id));
    const [added, setAdded] = useState(false);
    const navigate = useNavigate();

    if(!item) {
        return <div>해당 상품을 찾을 수 없습니다.</div>
    }

    const handleAddCart = async () => {
        const user = auth.currentUser;
        if (!user) {
            navigate('/login');
            return;
        }
    
        const cartRef = doc(db, 'carts', user.uid);
        const cartSnap = await getDoc(cartRef);
    
        let updatedItems = [];
    
        if (cartSnap.exists()) {
            const existingItems = cartSnap.data().items || [];
    
            const itemIndex = existingItems.findIndex((i) => i.id === item.id);
    
            if (itemIndex > -1) {
                // 이미 같은 상품이 있는 경우 → 수량 증가
                updatedItems = [...existingItems];
                updatedItems[itemIndex].count += 1;
            } else {
                // 새 상품 추가
                updatedItems = [...existingItems, {
                    id: item.id,
                    title: item.title,
                    img: item.img,
                    price: item.price,
                    desc: item.desc,
                    count: 1
                }];
            }
    
            await setDoc(cartRef, { items: updatedItems });
        } else {
            // 장바구니 문서가 없으면 새로 생성
            updatedItems = [{
                id: item.id,
                title: item.title,
                img: item.img,
                price: item.price,
                desc: item.desc,
                count: 1
            }];
            await setDoc(cartRef, { items: updatedItems });
        }
    
        setAdded(true);
    };
    

    return (
        <div className='freshBox'>
            <h2>{item.title}</h2>
            <div className='freshBoxItem'>
                <img src={process.env.PUBLIC_URL + item.img} alt={item.title} />
                <div className="price">{item.price}</div>
                <div className="description">{item.desc}</div>
            </div>
            {!added ? (
                <button onClick={handleAddCart} className="add-cart-btn">장바구니 담기</button>
            ) : (
                <div style={{marginTop:'20px'}}>
                    <button onClick={()=>navigate('/')} style={{marginRight:'10px'}}>쇼핑 계속하기</button>
                    <button onClick={()=>navigate('/cart')}>장바구니로 가기</button>
                </div>
            )}
        </div>
    );
};

export default FreshDetail;