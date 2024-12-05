// lib/src/api/bookApi.js

export const fetchBooks = async (query) => {
  const url = `https://dapi.kakao.com/v3/search/book?query=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `KakaoAK 27d3c8985b113087a2aca2a516b4bd0a`, // 카카오 API 키를 여기에 넣어주세요
    },
  });

  const data = await response.json();

  // API 응답 데이터를 콘솔에 출력
  console.log(data); // 응답 데이터가 어떤 형태로 오는지 확인할 수 있습니다.
  return data.documents || []; // 'documents'가 없다면 빈 배열을 반환하도록
};
