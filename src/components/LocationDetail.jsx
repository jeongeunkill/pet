import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import datalocation from '../data/datalocation';
import './locationDeatil.scss';

const LocationDetail = () => {
  const { id } = useParams();
  const item = datalocation.find((data) => String(data.id) === String(id));

  // 지도 초기화 함수
  const initMap = () => {
    if (!item || !window.kakao) return;

    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(item.map.lat, item.map.lng), // ✅ 수정됨
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(item.map.lat, item.map.lng), // ✅ 수정됨
    });
    marker.setMap(map);
  };

  // 카카오 맵 스크립트 로딩
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement('script');
      script.src =
        '//dapi.kakao.com/v2/maps/sdk.js?appkey=0ad896b952f3acf017c0656ed9b57e6d&autoload=false';
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          initMap();
        });
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [item]);

  if (!item) {
    return <div>데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="locationDetail">
      <h2>{item.title}</h2>
      <img
        src={process.env.PUBLIC_URL + item.img}
        alt={item.title}
        style={{ width: '100%', maxWidth: '500px' }}
      />

      <ul>
        <li><strong>주소:</strong> {item.add}</li>
        <li><strong>전화번호:</strong> {item.tel}</li>
        <li><strong>운영시간:</strong> {item.openTime}</li>
        <li><strong>휴무일:</strong> {item.dayOff}</li>
        <li><strong>지점장:</strong> {item.manager}</li>
        <li><strong>제공 서비스:</strong> {item.services?.join(', ')}</li>
        <li><strong>대표 반려동물:</strong> {item.featuredPet}</li>
      </ul>

      <div>
        <strong>SNS:</strong><br />
        <a href={item.sns.instagram} target="_blank" rel="noopener noreferrer">인스타그램</a> |{' '}
        <a href={item.sns.blog} target="_blank" rel="noopener noreferrer">블로그</a>
      </div>

      <div className="mapTitle">
        <h3>찾아오시는 길</h3>
      </div>
      <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
    </div>
  );
};

export default LocationDetail;
