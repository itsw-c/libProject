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

//회원가입 api
app.post("/register", (req, res) => {
  const { userid, userpw, name, birth, addr } = req.body;

  if (!userid || !userpw || !name || !birth || !addr) {
    console.error("Validation error: Missing fields");
    return res.status(400).json({ message: "모든 필드를 입력해주세요." });
  }

  const checkQuery = "SELECT userid FROM users WHERE userid = ?";
  db.query(checkQuery, [userid], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "데이터베이스 오류가 발생했습니다." });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "이미 존재하는 아이디입니다." });
    }

    const query =
      "INSERT INTO users (userid, userpw, name, birth, addr) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [userid, userpw, name, birth, addr], (err, result) => {
      if (err) {
        console.error("Database error:", err.message);
        return res
          .status(500)
          .json({ message: "데이터베이스 오류가 발생했습니다." });
      }

      res
        .status(201)
        .json({ message: "회원가입이 성공적으로 완료되었습니다." });
    });
  });
});

// 로그인 API
app.post("/login", (req, res) => {
  const { userid, userpw } = req.body;

  if (!userid || !userpw) {
    console.error("Validation error: Missing fields");
    return res
      .status(400)
      .json({ message: "아이디와 비밀번호를 모두 입력해주세요." });
  }

  const checkUserQuery = "SELECT * FROM users WHERE userid = ?";
  db.query(checkUserQuery, [userid], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "데이터베이스 오류가 발생했습니다." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "존재하지 않는 아이디입니다." });
    }

    if (results[0].userpw !== userpw) {
      return res.status(401).json({ message: "비밀번호가 잘못되었습니다." });
    }

    res.status(200).json({
      message: "로그인이 성공적으로 완료되었습니다.",
      user: {
        userid: results[0].userid,
        name: results[0].name,
      },
    });
  });
});

//중복확인 api
app.post("/check-duplicate", (req, res) => {
  const { userid } = req.body;

  if (!userid) {
    return res.status(400).json({ message: "아이디를 입력해주세요." });
  }

  const query = "SELECT userid FROM users WHERE userid = ?";
  db.query(query, [userid], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "데이터베이스 오류가 발생했습니다." });
    }

    if (results.length > 0) {
      return res.json({ isDuplicate: true });
    } else {
      return res.json({ isDuplicate: false });
    }
  });
});

//회원탈퇴 api
app.post("/delete-account", (req, res) => {
  const { name, addr } = req.body; // addr로 전화번호를 받음

  if (!name || !addr) {
    console.error("Validation error: Missing fields");
    return res
      .status(400)
      .json({ message: "이름과 전화번호를 모두 입력해주세요." });
  }

  // 사용자 계정 삭제 쿼리
  const deleteQuery = "DELETE FROM users WHERE name = ? AND addr = ?"; // addr로 매칭
  db.query(deleteQuery, [name, addr], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "데이터베이스 오류가 발생했습니다." });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "해당 정보로 계정을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "계정이 성공적으로 삭제되었습니다." });
  });
});

// 게시글 생성 API
app.post("/board", (req, res) => {
  const { title, content, writer } = req.body;

  // 필드 검증
  if (!title || !content || !writer) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요." });
  }

  // 게시글 추가 쿼리
  const insertQuery =
    "INSERT INTO board (title, content, writer) VALUES (?, ?, ?)";
  db.query(insertQuery, [title, content, writer], (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "게시글 추가 중 데이터베이스 오류가 발생했습니다." });
    }

    res.status(201).json({
      message: "게시글이 성공적으로 작성되었습니다.",
      postId: result.insertId, // 생성된 게시글 ID 반환
    });
  });
});

// 게시글 리스트 조회 API
app.get("/board", (req, res) => {
  const selectQuery = `
    SELECT 
      id, 
      title, 
      writer, 
      created_at, 
      views 
    FROM board
    ORDER BY id DESC
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

  // 조회수 증가 쿼리
  const updateViewsQuery = "UPDATE board SET views = views + 1 WHERE id = ?";
  db.query(updateViewsQuery, [postId], (err) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "조회수 업데이트 중 오류가 발생했습니다." });
    }

    // 게시글 상세 정보 조회 쿼리
    const selectQuery = `
      SELECT 
        id, 
        title, 
        content, 
        writer, 
        created_at, 
        views 
      FROM board
      WHERE id = ?
    `;
    db.query(selectQuery, [postId], (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        return res
          .status(500)
          .json({ message: "게시글 조회 중 오류가 발생했습니다." });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
      }

      res.status(200).json(results[0]);
    });
  });
});

// 게시글 삭제 API
app.delete("/board/:id", (req, res) => {
  const postId = req.params.id;

  const deleteQuery = "DELETE FROM board WHERE id = ?";
  db.query(deleteQuery, [postId], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({
        message: "게시글 삭제 중 오류가 발생했습니다.",
      });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "삭제할 게시글을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "게시글이 성공적으로 삭제되었습니다." });
  });
});

// 게시글 수정 API
app.put("/board/:id", (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  // 필드 검증
  if (!title || !content) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요." });
  }

  // 게시글 수정 쿼리
  const updateQuery = "UPDATE board SET title = ?, content = ? WHERE id = ?";
  db.query(updateQuery, [title, content, postId], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "게시글 수정 중 오류가 발생했습니다." });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "수정할 게시글을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "게시글이 성공적으로 수정되었습니다." });
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
