const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");

const app = express();
const port = 8080;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // 프론트엔드 주소
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); // JSON 요청 바디를 파싱

// 세션 미들웨어 설정
app.use(
  session({
    secret: "your-secret-key", // 세션 암호화를 위한 키
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // HTTPS를 사용하지 않는 경우 false
      maxAge: 24 * 60 * 60 * 1000, // 24시간
      sameSite: "lax",
    },
    name: "sessionId",
  })
);

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
  console.log("로그인 시도:", userid);

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

    // 세션에 사용자 정보 저장
    req.session.user = {
      userid: results[0].userid,
      name: results[0].name,
    };

    console.log("세션 저장됨:", req.session);

    // 세션 저장 완료 후 응답
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res
          .status(500)
          .json({ message: "세션 저장 중 오류가 발생했습니다." });
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
// 관리자 권한 체크 미들웨어
const checkAdmin = (req, res, next) => {
  try {
    const { userid } = req.body; // 요청 본문에서 userid 확인

    console.log("현재 사용자:", userid); // 디버깅용

    if (!userid || userid !== "admin") {
      return res.status(403).json({ message: "관리자만 접근할 수 있습니다." });
    }

    next();
  } catch (error) {
    console.error("Admin check error:", error);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
};

// 공지사항 작성 API (관리자만)
app.post("/notice", checkAdmin, (req, res) => {
  const { title, content, writer } = req.body;

  if (!title || !content || !writer) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요." });
  }

  const insertQuery =
    "INSERT INTO notice (title, content, writer) VALUES (?, ?, ?)";
  db.query(insertQuery, [title, content, writer], (err, result) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "공지사항 추가 중 오류가 발생했습니다." });
    }

    res.status(201).json({
      message: "공지사항이 성공적으로 작성되었습니다.",
      postId: result.insertId,
    });
  });
});

// 공지사항 목록 조회 API (모든 사용자)
app.get("/notice", (req, res) => {
  const selectQuery = `
    SELECT 
      id, 
      title, 
      writer, 
      created_at, 
      views 
    FROM notice
    ORDER BY id DESC
  `;

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "공지사항 조회 중 오류가 발생했습니다." });
    }

    res.status(200).json(results);
  });
});

// 공지사항 상세 조회 API (모든 사용자)
app.get("/notice/:id", (req, res) => {
  const postId = req.params.id;

  const updateViewsQuery = "UPDATE notice SET views = views + 1 WHERE id = ?";
  db.query(updateViewsQuery, [postId], (err) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "조회수 업데이트 중 오류가 발생했습니다." });
    }

    const selectQuery = `
      SELECT 
        id, 
        title, 
        content, 
        writer, 
        created_at, 
        views 
      FROM notice
      WHERE id = ?
    `;
    db.query(selectQuery, [postId], (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        return res
          .status(500)
          .json({ message: "공지사항 조회 중 오류가 발생했습니다." });
      }

      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "공지사항을 찾을 수 없습니다." });
      }

      res.status(200).json(results[0]);
    });
  });
});

// 공지사항 수정 API (관리자만)
app.put("/notice/:id", checkAdmin, (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "모든 필드를 입력해주세요." });
  }

  const updateQuery = "UPDATE notice SET title = ?, content = ? WHERE id = ?";
  db.query(updateQuery, [title, content, postId], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "공지사항 수정 중 오류가 발생했습니다." });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "수정할 공지사항을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "공지사항이 성공적으로 수정되었습니다." });
  });
});

// 공지사항 삭제 API
app.delete("/notice/:id", (req, res) => {
  const postId = req.params.id;
  const { userid } = req.body; // 클라이언트에서 보낸 userid

  // 관리자 권한 체크
  if (userid !== "admin") {
    return res.status(403).json({ message: "관리자만 접근할 수 있습니다." });
  }

  const deleteQuery = "DELETE FROM notice WHERE id = ?";
  db.query(deleteQuery, [postId], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).json({
        message: "공지사항 삭제 중 오류가 발생했습니다.",
      });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "삭제할 공지사항을 찾을 수 없습니다." });
    }

    res.status(200).json({ message: "공지사항이 성공적으로 삭제되었습니다." });
  });
});

// 회원정보 수정 API
app.put("/update-user", (req, res) => {
  console.log("회원정보 수정 요청 데이터:", req.body);
  const { userid, userpw, name, birth, addr } = req.body;

  // 필수 필드 검사
  if (!userid || !userpw || !name || !birth || !addr) {
    console.log("필수 필드 누락:", { userid, userpw, name, birth, addr });
    return res.status(400).json({
      message: "모든 필드를 입력해주세요.",
      receivedData: { userid, name, birth, addr },
    });
  }

  // 세션 체크
  if (!req.session.user) {
    console.log("세션 없음");
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  // 로그인한 사용자와 수정하려는 사용자가 같은지 확인
  if (req.session.user.userid !== userid) {
    console.log("권한 없음:", req.session.user.userid, "!=", userid);
    return res.status(403).json({ message: "권한이 없습니다." });
  }

  console.log("회원정보 수정 요청:", { userid, name, birth, addr });

  const updateQuery = `
    UPDATE users 
    SET userpw = ?, name = ?, birth = ?, addr = ?
    WHERE userid = ?
  `;

  console.log("실행될 쿼리:", updateQuery);
  console.log("쿼리 파라미터:", [userpw, name, birth, addr, userid]);

  db.query(updateQuery, [userpw, name, birth, addr, userid], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        message: "회원정보 수정 중 오류가 발생했습니다.",
        error: err.message,
        sqlMessage: err.sqlMessage,
      });
    }

    console.log("쿼리 실행 결과:", results);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.status(200).json({
      message: "회원정보가 성공적으로 수정되었습니다.",
      user: {
        userid,
        name,
        birth,
        addr,
      },
    });
  });
});

// 사용자 정보 조회 API
app.get("/userinfo", (req, res) => {
  // 세션에서 사용자 정보 확인
  if (!req.session.user) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  const userid = req.session.user.userid;

  const query =
    "SELECT userid, userpw, name, birth, addr FROM users WHERE userid = ?";
  db.query(query, [userid], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res
        .status(500)
        .json({ message: "사용자 정보 조회 중 오류가 발생했습니다." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 사용자 정보 반환
    res.status(200).json(results[0]);
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
