const express = require('express');
const path = require('path');
const Bundler = require('parcel-bundler');

const app = express();
const port = 3000;

// Parcel 번들러 설정
const bundler = new Bundler(['public/home.html', 'public/performance.html', 'public/performance-genre.html', 'public/performance-rank-all.html', 'public/login.html', 'public/signup.html'], {
    outDir: './dist', // 번들된 파일들이 저장될 디렉토리
    watch: true, // 파일 변경 감지
});

// Parcel 미들웨어 사용
app.use(bundler.middleware());

// 정적 파일 서빙
app.use(express.static(path.join(__dirname, 'dist')));

// 기본 루트 경로 요청 처리
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'home.html'));
});

app.get('/performances/rank-all', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'performance-rank-all.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'login.html'));
});

// /login 경로 요청 처리
app.get('/performances/genre', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'performance-genre.html'));
});

// /boards/:boardId 경로 요청 처리
app.get('/performances/genre/:genreType', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'performance-genre.html'));
});

// /boards/:boardId 경로 요청 처리
app.get('/performances/:performanceId', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'performance.html'));
});


// /signup 경로 요청 처리
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'signup.html'));
});

// /signup 경로 요청 처리
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'home.html'));
});


// 토큰 유효성 검사 미들웨어
const checkAuth = (req, res, next) => {
    const token = req.headers['accsstoken'];
    console.log(req.headers);

    // 토큰 유효성 검사 로직 (여기서는 예시로 간단하게 처리)
    if (!token || token !== 'accsstoken') {
        return res.redirect('/login');
    }
    next();
};

// 특정 경로에 대해서만 토큰 유효성 검사 미들웨어 적용
app.use(['/protected-route1', '/protected-route2'], checkAuth);

// 다른 모든 경로에 대해서는 404 페이지 반환
app.use((req, res, next) => {
    res.status(404).send('페이지를 찾을 수 없습니다.');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
