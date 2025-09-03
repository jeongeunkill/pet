import React,{useState} from 'react';
import datalocation from '../data/datalocation';
import { FaMapLocationDot } from "react-icons/fa6";
import './location.scss'
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from 'react-router-dom'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



const Location = () => {
    const [locationData] =useState(datalocation);
    //console.log(locationData)
    return (
        <div className='location'>
            <h2>Location</h2>
            <p><FaMapLocationDot /> Location is..</p>
            <div className="locationSlider">
                <Swiper
                    slidesPerView={2}
                    spaceBetween={30}
                    autoplay={{
                        delay:0
                    }}
                    speed={5000}
                    loop={true}

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

                    modules={[Navigation, Autoplay]}
                    className="mySwiper"
                >
                   {
                    locationData.map((item, i)=>{
                        return (
                            <SwiperSlide key={i}>
                                <Link to={`/location/${item.id}`} className='locationWrap'>
                                    <div className='imgWrap'><img src={process.env.PUBLIC_URL + item.img} alt={item.title} /></div>
                                    <div className="textBox">
                                        <div className="title">{item.title}</div>
                                        <div className="address">{item.add}</div>
                                    </div>

                                </Link>

                            </SwiperSlide>
                        )
                    })
                   }
                    
                </Swiper>
            </div>
        </div>
    );
};

export default Location;