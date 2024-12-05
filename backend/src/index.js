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

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
