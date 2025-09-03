import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt2, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="menuBar m">
                <button onClick={toggleMenu}>
                    {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt2 />}
                </button>
            </div>

            <div className={`navbar ${isOpen ? 'open' : ''}`}>
                <ul className='navbar-list'>
                    <li><Link to="/brand">Brand</Link></li>
                    <li><Link to="/store">Store</Link></li>
                    <li><Link to="/global">Global</Link></li>
                    <li><Link to="/offline">Offline</Link></li>
                    <li><Link to="/community">Community</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
