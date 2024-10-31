const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

/*
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'community', 'DashBoard.html'));
});*/

router.get('/', dashboardController.getDashboard);

//NOTE: 라우터 객체를 모듈로 내보내기 -> 주서버에 모두 작성하지 않아도됨
module.exports = router;