$(document).ready(function() {
        // [ 회원가입 ]
        $('#signUpForm').on('submit', function (event) {
            console.log("test")
            event.preventDefault(); // 기본 폼 제출 동작을 막음
    
            const requestData = {
                password: $('#password').val(),
                email: $('#email').val(),
                name: $('#name').val(),
                nickname: $('#nickName').val(),
                phoneNumber: $('#phoneNumber').val(),
                address: $('#address').val() + " " + $('#address2').val(),
            };
    
            $.ajax({
                url: `${window.SERVER_URL}/users`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(requestData),
                xhrFields: {
                    withCredentials: true // 필요 시 추가
                },
                crossDomain: true,
                success: function (response) {
                    if (response.status === 200) {
                        alert('회원 가입에 성공하였습니다.');
                        window.location.href = '/login';
                    }
                },
                error: function (jqXHR) {
                    console.log(jqXHR)
                    const responseValidation = jqXHR.responseText;
                    const response = jqXHR.responseJSON;
                    if (response != null) {
                        alert(response.message);
                    } else {
                        alert(responseValidation);
                    }
    
                }
            });
        });

        //다음 주소 API
        let isAddressWindowOpen = false;

        $('#address').on('click', function() {
            if (isAddressWindowOpen) return; // 창이 열려 있으면 클릭 무시
    
            isAddressWindowOpen = true; // 창이 열려 있음을 표시
    
            new daum.Postcode({
                oncomplete: function(data) {
                    var address = data.roadAddress;
                    $('#address').val(address);
                    isAddressWindowOpen = false; // 창이 닫혔음을 표시
                },
                onclose: function() {
                    isAddressWindowOpen = false; // 창이 닫혔음을 표시
                }
            }).open();
        });

        const $submitBtn = $('#submitBtn');
        const $inputs = $('#signUpForm input[required]');

        function checkInputs() {
            const allFilled = $inputs.toArray().every(input => $(input).val().trim() !== '');
            $submitBtn.prop('disabled', !allFilled);
        }

        $inputs.on('input', checkInputs);

        // 초기 검사
        checkInputs();

        //로그인 페이지로 이동
        $('#navigateButton').click(function () {
            window.location.href = '/login';
        });
});