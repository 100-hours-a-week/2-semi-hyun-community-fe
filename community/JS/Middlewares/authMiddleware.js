const authMiddleware = (req,res,next) => {
    if(req.session.user && req.session.user){ //세션에 사용자 정보가 있는지
        return next(); //인증 성공 후 다음 미들웨어로
    }

    //인증 실패
    // return res.redirect('/api/v1/auth/login?message=required_authorization');
    // res.status(401).redirect('required_authorization'); //연속해서 체이닝 불가
    res.send(`
        <script>
            alert("required_authorization");
            window.location.href = '/api/v1/auth/login';
        </script>
    `);
}

module.exports = authMiddleware;