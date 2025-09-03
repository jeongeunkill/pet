import React, { useRef, useState } from 'react';
import {Link} from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RiPauseMiniFill } from "react-icons/ri";
import { IoPlayOutline } from "react-icons/io5";
import data from '../data/data'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './mainslider.scss';



// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules'; 

const Mainslider = () => {
    const [swiperIndex, setSwiperIndex]=useState(0);//페이지네이션
    const [swiper, setSwiper]=useState(null); //슬라이드용
    const [textSwiper, setTextSwiper]=useState(null); //텍스트 슬라이드용
    const [bgColor, setBgColor] = useState();//배경색
    const swiperRef=useRef(null);
    const [isAutoplayPaused, setIsAutoplayPaused]= useState(false); //제어버튼
    const [isActive, setIsActive] = useState(false); //active button

    const prev = () =>{
        swiper?.slidePrev()
        textSwiper?.slidePrev()
    }
    const next = () =>{
        swiper?.slideNext()
        textSwiper?.slideNext()
    }
    const autoPlayToggle=() =>{

        if(swiper && swiper.autoplay && textSwiper && textSwiper.autoplay){
            if(swiper.autoplay.running && textSwiper.autoplay.running){
                textSwiper.autoplay.stop();
                swiper.autoplay.stop();
                setIsAutoplayPaused(true)
            }else{
                textSwiper.autoplay.start();
                swiper.autoplay.start();
                setIsAutoplayPaused(false)
            }

        }


        setIsActive(!isActive)
    }
    return (
        <div className={`mySwiper mainslider`} style={{background: bgColor}}>
            <div className='cont'>
                <Swiper
                   
                    autoplay={
                        {
                            delay: 3000,
                            disableOnInteraction: false,
                        }
                    }
                    loop={true}
                    onSwiper={(swiper) => {setTextSwiper(swiper); swiperRef.current=swiper}}
                    onActiveIndexChange={(e)=>setSwiperIndex(e.realIndex)}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="textSlide"
                >
                    {
                        data.map(item => (
                            <SwiperSlide key={item.id}>
                                <div className="tit_wrap">
                                    <em>{item.textT}</em>
                                    <strong>{item.textblod}</strong>
                                    <Link to="">자세히보기</Link>
                                </div>
                            </SwiperSlide>
                        ))
                    }
               
    
                </Swiper>
            </div>
            <div className='img_wrap'>
                <Swiper
                    
                    autoplay={
                        {
                            delay: 3000,
                            disableOnInteraction: false,
                        }
                    }
                    loop={true}
                    onSwiper={(swiper) => {setSwiper(swiper); swiperRef.current=swiper}}
                    onActiveIndexChange={(e)=>setSwiperIndex(e.realIndex)}
                    onSlideChange={(e)=> {
                        const bgColors=['rgb(255,195,59)','rgb(255,182,182)','rgb(255,195,59)','rgb(133,141,170)'];
                        const realIndex=e.realIndex;
                        setBgColor(bgColors[realIndex]);
                        const progressBar=document.querySelector('.fill');
                        const progressWidth=((realIndex+1)/data.length)*100;
                        if(realIndex===0 && e.activeIndex !==0){
                            progressBar.style.transition='none';
                            progressBar.style.width=0;

                            setTimeout(()=>{
                                progressBar.style.transition='width .3s ease';
                            },50)

                            if(e.activeIndex !==0){
                                progressBar.style.transition='width .3s ease';
                                progressBar.style.width=`${progressWidth}%`
                            }
                        }else{
                            progressBar.style.width=`${progressWidth}%`
                        }
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mainSwiper"
                >
                    {
                        data.map(item => (
                            <SwiperSlide key={item.id}><img src={process.env.PUBLIC_URL + item.img} alt={item.textT} /></SwiperSlide>
                        ))
                    }
               
    
                </Swiper>
            </div>
            <div className="page_box">
                <div className="page">
                    <div className="swiper_progress_bar">
                        <div className="slider-bar">
                            <div className="fill"></div>
                        </div>
                    </div>
                    <div className="swiper-pagination">
                        <span>0{swiperIndex+1}</span>
                        <span>/</span>
                        <span>04</span>
                    </div>
                     <div className="swiper-btn">
                        <div className="swiperPrevBtn" onClick={prev}><IoIosArrowRoundBack /></div>
                        <div className="btn-auto">
                            <div className="btn-stop" onClick={autoPlayToggle}>
                                {
                                    isActive? <IoPlayOutline />: <RiPauseMiniFill />
                                }
                              
                            </div>
                        </div>
                        <div className="swiperNextBtn"  onClick={next}><IoIosArrowRoundForward /></div>
                     </div>
                </div>
                
            </div>
        </div>
    );
};

export default Mainslider;