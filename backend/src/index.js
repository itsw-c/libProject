const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.json()); // JSON 요청 바디를 파싱

// MySQL 연결 설정
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306, // MySQL 기본 포트
  password: "root", // 비밀번호
  database: "lib", // 사용할 데이터베이스
});

// MySQL 연결
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// 게시글 생성 API
app.post("/board", (req, res) => {
  const { title, content, writer } = req.body;

  if (!title || !content || !writer) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요." });
  }

  const insertQuery = `
    INSERT INTO board (title, content, writer) 
    VALUES (?, ?, ?)
  `;
  db.query(insertQuery, [title, content, writer], (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "게시글 추가 중 데이터베이스 오류가 발생했습니다." });
    }

    res.status(201).json({
      message: "게시글이 성공적으로 작성되었습니다.",
      postId: result.insertId,
    });
  });
});

// 게시글 리스트 조회 API
app.get("/board", (req, res) => {
  const selectQuery = `
    SELECT 
      board.id, 
      board.title, 
      board.content, 
      users.name AS writer, 
      board.created_at, 
      board.views 
    FROM board
    JOIN users ON board.userid = users.userid
    ORDER BY board.created_at DESC
  `;

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "게시글 조회 중 데이터베이스 오류가 발생했습니다." });
    }

    res.status(200).json(results);
  });
});

// 게시글 상세 조회 API
app.get("/board/:id", (req, res) => {
  const postId = req.params.id;

  const selectQuery = `
    SELECT 
      board.id, 
      board.title, 
      board.content, 
      users.name AS writer, 
      board.created_at, 
      board.views 
    FROM board
    JOIN users ON board.userid = users.userid
    WHERE board.id = ?
  `;
  db.query(selectQuery, [postId], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "게시글 조회 중 데이터베이스 오류가 발생했습니다." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    res.status(200).json(results[0]);
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
