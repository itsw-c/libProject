import React, { useState } from 'react';
import axios from 'axios';

const FindPopup = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // phone 입력 필드

  const handleDeleteAccount = async () => {
    if (!name || !phone) {
      alert('이름과 전화번호를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/delete-account',
        {
          name,
          addr: phone, // phone을 addr로 전송
        },
      );

      alert(response.data.message);
      window.close(); // 팝업 창 닫기
    } catch (error) {
      alert(
        error.response?.data?.message || '계정 삭제 중 오류가 발생했습니다.',
      );
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#FFFCE6',
      }}
    >
      <h1 style={{ marginBottom: '20px' }}>아이디 / 비밀번호 찾기</h1>
      <p style={{ marginBottom: '10px' }}>
        이름과 전화번호를 입력하면 계정이 삭제됩니다.
        <br />
        재가입해주세요.
      </p>
      <div style={{ marginBottom: '10px' }}>
        <label>
          이름:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              marginLeft: '10px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          전화번호:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              marginLeft: '10px',
              padding: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </label>
      </div>
      <button
        onClick={handleDeleteAccount}
        style={{
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        계정 삭제
      </button>
    </div>
  );
};

export default FindPopup;
