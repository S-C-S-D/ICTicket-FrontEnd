$(document).ready(function () {
    const accessToken = localStorage.getItem('Authorization');
    const refreshToken = localStorage.getItem('RefreshToken');

    if (accessToken && refreshToken) {
        $('#loginOption').html(`
            <div class="text-wrapper login-success">
                <div class="logout">
                    <span id="logOut" class="fs-15 medium">로그아웃</span>
                </div>
                <div class="mypage">
                    <span id="myPage" class="fs-15 medium">마이페이지</span>
                </div>
            </div>
        `);
    } else {
        $('#loginOption').html(`
            <div class="text-wrapper">
                <div class="login">
                    <span id="login" class="fs-15 medium">로그인</span>
                </div>
                <div class="signup">
                    <span id="signUp" class="fs-15 medium">회원가입</span>
                </div>
            </div>
        `);
    }


    $('input').focus(function () {
        $(this).parent().addClass('focused');
    }).blur(function () {
        $(this).parent().removeClass('focused');
    });


    $('#login').on('click', function() {
        if (true) {
            window.location.href = `/login`;
        } else {
            window.location.href = `/home`
        }
    });


    $('#signUp').on('click', function() {
        console.log('회원가입 클릭');
        window.location.href = '/signup';
    });

    $('#logOut').on('click', function() {
        if (accessToken && refreshToken) {
            if (confirm("로그아웃 하시겠습니까?")) {
                localStorage.removeItem('Authorization');
                localStorage.removeItem('RefreshToken');
                window.location.href = '/home'; // 페이지 이동
            }
        } else {
            alert("잘못된 접근입니다.");
        }
    });

    $('#myPage').on('click', function() {
        $.ajax({
            url: `http://localhost:8080/users/profile`,
            type: 'GET',
            xhrFields: {
                withCredentials: true // 필요 시 추가
            },
            crossDomain: true,
            headers: {
                'Authorization': 'Bearer ' + accessToken // 헤더명 수정
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', accessToken); // 헤더명 수정
            },
            success: function (likeResponseDto) {
                console.log(likeResponseDto)
                window.location.href = '/mypage';
            },
            error: function (jqXHR) {
                const commentResponse = jqXHR.responseJSON;
                const commentResponseText = jqXHR.responseText;
    
                if (commentResponse != null) {
                    alert(commentResponse.message);
                    window.location.href = '/login';
                    localStorage.removeItem('Authorization');
                    localStorage.removeItem('RefreshToken');
                } else {
                    alert(commentResponseText)
                }
    
            }
        });
    });
});