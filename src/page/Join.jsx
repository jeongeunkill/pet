import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 추가
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './join.scss';

const Join = () => {
    const navigate = useNavigate(); // 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // 1. Firebase Auth로 회원가입
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Firestore에 추가 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        name,
        phone,
        address,
      });

      setSuccess('회원가입이 완료되었습니다!');
      setEmail('');
      setPassword('');
      setName('');
      setPhone('');
      setAddress('');
      navigate('/login'); // 추가
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="join-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className="join-form">
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="주소"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">회원가입</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default Join;