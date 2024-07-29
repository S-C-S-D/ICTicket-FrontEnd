$(document).ready(function() {
    $('input').focus(function () {
        $(this).parent().addClass('focused');
    }).blur(function () {
        $(this).parent().removeClass('focused');
    });

    // [ 로그인 ]
    $('#loginForm').on('submit', function (event) {
        event.preventDefault(); // 기본 폼 제출 동작을 막음

        const requestData = {
            password: $('#password').val(),
            email: $('#email').val(),
        };

        $.ajax({
            url: 'http://localhost:8080/users/login', 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestData),
            xhrFields: {
                withCredentials: true // 필요 시 추가
            },
            crossDomain: true,
            success: function (response, status, xhr) {
                if (xhr.status === 200) {
                    alert(response.body.message);

                    // 토큰 저장
                    const accessToken = xhr.getResponseHeader('Authorization');
                    const refreshToken = xhr.getResponseHeader('RefreshToken');

                    localStorage.setItem('Authorization', accessToken);
                    localStorage.setItem('RefreshToken', refreshToken);

                    // home.html로 이동
                    window.location.href = 'home';
                }
            },
            error: function (jqXHR) {
                const response = jqXHR.responseJSON;
                if (response != null) {
                    alert(response.body.message);
                } else {
                    alert('로그인 중 오류가 발생했습니다.');
                }
            }
        });
    });

    //회원가입 페이지로 이동
    $('#navigateButton').click(function () {
        window.location.href = '/signup';
    });
});