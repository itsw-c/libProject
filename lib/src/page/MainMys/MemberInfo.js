import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/SideBar';

const MemberInfo = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    fetchUserInfo();
    fetchBorrowedBooks();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/userinfo', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUserData(response.data);
      setEditedData(response.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(
        err.response?.data?.message || '사용자 정보를 가져오는데 실패했습니다.',
      );
    }
  };

  const fetchBorrowedBooks = () => {
    const borrowedBooks =
      JSON.parse(localStorage.getItem('borrowedBooks')) || [];
    setBorrowedBooks(borrowedBooks);
  };

  const handleReturn = (bookTitle) => {
    const updatedBorrowedBooks = borrowedBooks.filter(
      (book) => book.title !== bookTitle,
    );
    setBorrowedBooks(updatedBorrowedBooks);
    localStorage.setItem('borrowedBooks', JSON.stringify(updatedBorrowedBooks));
    alert('책이 성공적으로 반납되었습니다.');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(userData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (
        !editedData.userpw ||
        !editedData.name ||
        !editedData.birth ||
        !editedData.addr
      ) {
        alert('모든 필드를 입력해주세요.');
        return;
      }

      const formattedBirth = new Date(editedData.birth)
        .toISOString()
        .split('T')[0];

      const dataToSubmit = {
        ...editedData,
        birth: formattedBirth,
      };

      const response = await axios.put(
        'http://localhost:8080/update-user',
        dataToSubmit,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.message === '회원정보가 성공적으로 수정되었습니다.') {
        setUserData(editedData);
        setIsEditing(false);
        alert('회원정보가 성공적으로 수정되었습니다.');
      }
    } catch (err) {
      console.error('Error updating user data:', err);
      alert(err.response?.data?.message || '회원정보 수정에 실패했습니다.');
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      <div className="sticky top-0 h-screen">
        <SideBar />
      </div>
      <div className="container mx-auto p-10">
        {/* 상단 헤더 섹션 */}
        <div className="w-full min-h-[170px] bg-amber-50 rounded flex flex-col border-4 border-orange-50 mb-10 p-10">
          <div className="w-full pb-5 border-b border-orange-200">
            <h1 className="text-2xl font-bold">내 서재</h1>
          </div>
          <div className="mt-3">
            <h3 className="text-base font-normal">내 서재 - 회원정보</h3>
          </div>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="w-full bg-[#FFFCE6] rounded border-4 border-orange-50 mt-5 md:mt-10 p-5 md:p-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">회원정보</h1>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-[#533300] text-white px-4 py-2 rounded hover:bg-[#6B4400]"
              >
                수정하기
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={handleSubmit}
                  className="bg-[#533300] text-white px-4 py-2 rounded hover:bg-[#6B4400]"
                >
                  저장
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  취소
                </button>
              </div>
            )}
          </div>

          {/* 회원 정보 섹션 */}
          {userData && (
            <div className="border p-6 rounded-md bg-white shadow-md mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="border-b pb-2">
                  <span className="font-semibold">아이디:</span>
                  <span className="ml-2">{userData.userid}</span>
                </div>
                <div className="border-b pb-2">
                  <span className="font-semibold">비밀번호:</span>
                  {isEditing ? (
                    <div className="flex items-center">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="userpw"
                        value={editedData.userpw}
                        onChange={handleChange}
                        className="ml-2 border rounded px-2"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="ml-2 text-sm text-blue-500"
                      >
                        {showPassword ? '숨기기' : '보이기'}
                      </button>
                    </div>
                  ) : (
                    <span className="ml-2">{'*'.repeat(8)}</span>
                  )}
                </div>
                <div className="border-b pb-2">
                  <span className="font-semibold">이름:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedData.name}
                      onChange={handleChange}
                      className="ml-2 border rounded px-2"
                    />
                  ) : (
                    <span className="ml-2">{userData.name}</span>
                  )}
                </div>
                <div className="border-b pb-2">
                  <span className="font-semibold">생년월일:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="birth"
                      value={editedData.birth}
                      onChange={handleChange}
                      className="ml-2 border rounded px-2"
                    />
                  ) : (
                    <span className="ml-2">{userData.birth}</span>
                  )}
                </div>
                <div className="border-b pb-2">
                  <span className="font-semibold">전화번호:</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="addr"
                      value={editedData.addr}
                      onChange={handleChange}
                      className="ml-2 border rounded px-2"
                    />
                  ) : (
                    <span className="ml-2">{userData.addr}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 대출 현황 섹션 */}
          <div className="border p-6 rounded-md bg-white shadow-md">
            <h2 className="text-lg font-semibold mb-4">대출 현황</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">도서명</th>
                  <th className="border p-2 text-left">대출일</th>
                  <th className="border p-2 text-left">반납 예정일</th>
                  <th className="border p-2 text-left">상태</th>
                  <th className="border p-2 text-left">반납</th>
                </tr>
              </thead>
              <tbody>
                {borrowedBooks.map((book, index) => (
                  <tr key={index}>
                    <td className="border p-2">{book.title}</td>
                    <td className="border p-2">{book.borrowDate}</td>
                    <td className="border p-2">{book.returnDate}</td>
                    <td className="border p-2 text-green-500">대출 중</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleReturn(book.title)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      >
                        반납
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
