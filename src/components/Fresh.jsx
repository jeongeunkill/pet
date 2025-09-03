import React, { useContext } from 'react';
import {DataFreshContext} from '../App';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay} from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './fresh.scss';
/* import data from '../data/datafresh'; */
import { Link } from 'react-router-dom';

const Fresh = () => {
    const {freshData} =useContext(DataFreshContext)
    return (
        <div className='fresh'>
            <h2>Fresh</h2>
            <p>fresh fresh</p>
            <div className="freshBox">
                <Swiper
                    autoplay={{
                        delay:3000,
                        disableOnInteraction:false, //사용자가 스와이퍼 하더라도 autoplya유지
                    }}
                    loop={true}
                    slidesPerView={2}
                    spaceBetween={10}
                    breakpoints={{
                        720:{
                             slidesPerView:3,
                        },
                        980: {
                             slidesPerView:4,
                        },
                        1280:{
                            slidesPerView:5,
                        }
                    }}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                   
                    {
                        freshData.map((item, idx) => (
                             <SwiperSlide className='freshWrap'>
                                <Link to={`/fresh/${item.id}`}>
                                    <img src={item.img} alt={item.title} />
                                    <div className="textbox">
                                        <span className="Number">{item.id+1}</span>
                                        <strong>{item.title}</strong>
                                        <i className="price">{item.price}</i>
                                    </div>
                                </Link>
                             </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Fresh;