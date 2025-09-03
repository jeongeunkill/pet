import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import { IoSearch } from "react-icons/io5";
import { FaBasketShopping } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 로그인 상태 감지
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // 로그아웃 함수
    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        navigate('/'); // 로그아웃 후 홈으로 이동 (원하면 다른 경로로 변경 가능)
    };

    return (
        <div className={`header ${isScrolled ? 'scrolled': ""}`}>
            <div className="header-inner">
                <h1 className="logo">
                    <Link to="/">
                        <img src={process.env.PUBLIC_URL + "/img/logo.png"} alt="" className="p"/>
                        <img src={process.env.PUBLIC_URL + "/img/logo_m.png" } alt="" className="m"/>
                    </Link>
                </h1>
                <Navbar />
                <div className="header-gnb">
                    <ul>
                        {user ? (
                            <li>
                                <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                    로그아웃
                                </button>
                            </li>
                        ) : (
                            <>
                                <li><Link to="/login">로그인</Link></li>
                                <li><Link to="/join">회원가입</Link></li>
                            </>
                        )}
                        <li><Link to="/cart">장바구니</Link></li>
                        <li><Link to="/search"><IoSearch /></Link></li>
                    </ul>
                    <ul className="m">
                        <li>
                            <Link to="/"><FaBasketShopping /></Link>
                            <Link to="/"><IoPersonOutline /></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;