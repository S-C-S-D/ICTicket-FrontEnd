$(document).ready(function () {
    // URL에서 performanceId 추출
    const pathParts = window.location.pathname.split('/');
    const performanceId = pathParts[pathParts.indexOf('performances') + 1];
    const accessToken = localStorage.getItem('Authorization');

    // 초기 상태 메시지
    function updateSeatCountMessage() {
        if (!$('.date.active').length || !$('.session.active').length) {
            $(".seat-text").text("날짜와 시간을 선택해 주세요");
            $(".seat-count").text("");
            $(".reserveBtn").addClass("disabled")
        }
    }

    // 두 요소가 모두 활성화되었는지 확인하여 seat-text의 margin-right를 업데이트하는 함수
    function updateSeatTextMargin() {
        if ($('.date.active').length && $('.session.active').length) {
            $(".seat-text").css("margin-right", "50px");
            $(".reserveBtn").removeClass("disabled")
        } else {
            $(".seat-text").css("margin-right", "");
        }
    }

    // [세션 조회]
    $.ajax({
        url: `http://localhost:8080/performances/${performanceId}/sessions`,
        type: 'GET',
        contentType: 'application/json',
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
        success: function (boardResponse) {
            console.log(boardResponse);

            const sessions = boardResponse.data;
            const dates = {};

            // 날짜별로 세션을 그룹화
            sessions.forEach(session => {
                if (!dates[session.date]) {
                    dates[session.date] = [];
                }
                dates[session.date].push(session);
            });

            // 날짜를 "2024년 08월 07일 수요일" 형식으로 변환하는 함수
            function formatDate(dateString) {
                const date = new Date(dateString);
                const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
                return date.toLocaleDateString('ko-KR', options);
            }

            // 시간을 "오후 12시 00분" 형식으로 변환하는 함수
            function formatTime(timeString) {
                const [hour, minute] = timeString.split(':').map(Number);
                const period = hour >= 12 ? '오후' : '오전';
                const adjustedHour = hour % 12 || 12;
                return `${period} ${String(adjustedHour).padStart(2, '0')}시 ${String(minute).padStart(2, '0')}분`;
            }

            // 날짜를 HTML에 추가
            for (const date in dates) {
                const formattedDate = formatDate(date);
                $('.date-list-wrapper').append(`<span class="date" data-date="${date}">${formattedDate}</span>`);
            }

            // 날짜 클릭 이벤트 핸들러
            $('.date-list-wrapper').on('click', '.date', function () {
                const selectedDate = $(this).attr('data-date');

                // 모든 날짜에서 active 클래스 제거하고, 클릭한 날짜에만 추가
                $('.date').removeClass('active');
                $(this).addClass('active');

                // 선택한 날짜에 맞는 세션을 session-list-wrapper에 추가
                const selectedSessions = dates[selectedDate];
                $('.session-list-wrapper').empty();
                selectedSessions.forEach(session => {
                    const formattedTime = formatTime(session.time);
                    $('.session-list-wrapper').append(
                        `<span class="session" data-id="${session.id}">${session.name}회차 - ${formattedTime}</span>`
                    );
                });

                // 첫 번째 세션을 기본적으로 선택된 상태로 설정
                // $('.session').first().click();

                // 좌석 메시지 업데이트
                updateSeatCountMessage();

                // seat-text margin-right 업데이트
                updateSeatTextMargin();
            });

            // 세션 클릭 이벤트 핸들러
            $('.session-list-wrapper').on('click', '.session', function () {
                // 모든 세션에서 active 클래스 제거하고, 클릭한 세션에만 추가
                $('.session').removeClass('active');
                $(this).addClass('active');
   

                const sessionId = $(this).attr('data-id');

                $(".reserveBtn").attr('data-session-id', sessionId);
                $(".reserveBtn").attr('data-performance-title', $(".performance-title").text());
                $(".reserveBtn").attr('data-date', $(".date.active").text());
                $(".reserveBtn").attr('data-time',  $(".session.active").text());

                // 클릭한 세션의 data-id 값을 이용하여 AJAX 요청
                $.ajax({
                    url: `http://localhost:8080/performances/${performanceId}/sessions/${sessionId}/seat-count`,
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
                    success: function (seatCount) {
                        console.log(seatCount);
                        var seatCountData = seatCount.data;
                        $(".seat-text").text("잔여 좌석 개수");
                        $(".seat-count").text(seatCountData.restSeatCount + "/" + seatCountData.totalSeatCount);
                    },
                    error: function (jqXHR) {
                        const commentResponse = jqXHR.responseJSON;
                        const commentResponseText = jqXHR.responseText;

                        if (commentResponse != null) {
                            alert(commentResponse.message);
                        } else {
                            alert(commentResponseText);
                        }
                    }
                });

                // seat-text margin-right 업데이트
                updateSeatTextMargin();
            });

            // 초기 상태로 첫 번째 날짜를 선택한 상태로 설정
            $('.date').first().click();
        },
        error: function (jqXHR) {
            const commentResponse = jqXHR.responseJSON;
            const commentResponseText = jqXHR.responseText;

            if (commentResponse != null) {
                alert(commentResponse.message);
            } else {
                alert(commentResponseText);
            }
        }
    });

    $('.reserveBtn').on('click', function () {
        if ($(this).hasClass("disabled") || $(this).hasClass("lock-btn")) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }

        $(".popup").show();

        const sessionId = $(this).attr('data-session-id');
        const performanceTitle = $(this).attr('data-performance-title');
        const dateInfo = $(this).attr('data-date');
        const timeInfo = $(this).attr('data-time');
        
        
        $.ajax({
            url: `http://localhost:8080/performances/${performanceId}/sessions/${sessionId}/seats`,
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
            success: function (seatCount) {
                console.log(seatCount);
                $(".container > .cover").show()
                $(".performance-order-title").text(performanceTitle)
                $(".performance-order-date").text(dateInfo)
                $(".performance-order-time").text(timeInfo)
                // $(".footer").hide()

            },
            error: function (jqXHR) {
                const commentResponse = jqXHR.responseJSON;
                const commentResponseText = jqXHR.responseText;

                if (commentResponse != null) {
                    alert(commentResponse.message);
                } else {
                    alert(commentResponseText);
                }
            }
        });
        
    });
    // 초기 메시지 설정
    updateSeatCountMessage();
});
