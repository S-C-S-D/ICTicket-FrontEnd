$(document).ready(function () {
    // URL에서 performanceId 추출
    const pathParts = window.location.pathname.split('/');
    const performanceId = pathParts[pathParts.indexOf('performances') + 1];
    const accessToken = localStorage.getItem('Authorization');
    let selectedSeats = [];


    function updateSeatConfirmBtn() {
        if (selectedSeats.length === 0) {
            console.log("Test")
            $('#seatConfirmBtn').addClass('disabled').css('pointer-events', 'none');
    
        } else {
            $('#seatConfirmBtn').removeClass('disabled').css('pointer-events', 'auto')
        }
    }
    updateSeatConfirmBtn();

    
    let modifiedAt = '';

    function getFormattedDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);

        return `${year}-${month}-${day}-${hours}:${minutes}`;
    }

    $(".container > .cover").on('click', function () {
        $(".container > .cover").hide();
        $(".popup").hide();
        selectedSeats = [];
    });

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
        url: `${window.SERVER_URL}/performances/${performanceId}/sessions`,
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
                    url: `${window.SERVER_URL}/performances/${performanceId}/sessions/${sessionId}/seat-count`,
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

        updateSeatConfirmBtn();
        const sessionId = $(this).attr('data-session-id');
        const performanceTitle = $(this).attr('data-performance-title');
        const dateInfo = $(this).attr('data-date');
        const timeInfo = $(this).attr('data-time');
        
        
        $.ajax({
            url: `${window.SERVER_URL}/performances/${performanceId}/sessions/${sessionId}/seats`,
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
            success: function (seatList) {
                console.log(seatList);
                $(".container > .popup").show();
                $(".container > .cover").show()
                $(".performance-order-title").text(performanceTitle)
                $(".performance-order-date").text(dateInfo)
                $(".performance-order-time").text(timeInfo)

                const vipGridDiv = $('.seat-grid.vip');
                const rGridDiv = $('.seat-grid.r');
                const sGridDiv = $('.seat-grid.s');
                const aGridDiv = $('.seat-grid.a');

                const seatLists = seatList.data;
                vipGridDiv.empty();
                rGridDiv.empty();
                sGridDiv.empty();
                aGridDiv.empty();

                seatLists.forEach((seat, index) => {
                    if (seat.seatGrade == "VIP") {
                        const notReserved = `
                            <img class="notReserved" data-id="${seat.id}" data-grade="${seat.seatGrade}" data-index="${index+1}" data-price="${seat.price}" src="https://ifh.cc/g/5HSMgs.png">
                        `;

                        const paying = `
                            <img class="reserved" data-id="${seat.id}" data-grade="${seat.seatGrade}" data-index="${index+1}" data-price="${seat.price}" src="https://ifh.cc/g/QqyHzC.png">
                        `;

                        const paymentCompleted = `
                            <img class="reserved" data-id="${seat.id}" data-grade="${seat.seatGrade}" data-index="${index+1}" data-price="${seat.price}" src="https://ifh.cc/g/QqyHzC.png">
                        `;

                        if (seat.seatStatus == "NOT_RESERVED") {
                            vipGridDiv.append(notReserved)          
                        } else {
                            vipGridDiv.append(paying)          
                        }
                    }

                    if (seat.seatGrade == "R") {
                        const notReserved = `
                            <img class="notReserved" data-id="${seat.id}" data-grade="${seat.seatGrade}" data-index="${index+1}" data-price="${seat.price}" src="https://ifh.cc/g/5HSMgs.png">
                        `;

                        const paying = `
                            <img class="reserved" data-id="${seat.id}" data-grade="${seat.seatGrade}" data-index="${index+1}" data-price="${seat.price}" src="https://ifh.cc/g/QqyHzC.png">
                        `;

                        const paymentCompleted = `
                            <img class="reserved" data-id="${seat.id}" data-grade="${seat.seatGrade}" data-index="${index+1}" data-price="${seat.price}" src="https://ifh.cc/g/QqyHzC.png">
                        `;

                        if (seat.seatStatus == "NOT_RESERVED") {
                            rGridDiv.append(notReserved)          
                        } else {
                            rGridDiv.append(paying)          
                        }
                    }

                    if (seat.seatGrade == "S") {
                        const notReserved = `
                            <img class="notReserved" data-id="${seat.id}" data-grade="${seat.seatGrade}" data-index="${index+1}" data-price="${seat.price}" src="https://ifh.cc/g/5HSMgs.png">
                        `;

                        const paying = `
                            <img class="reserved" data-id="${seat.id}" data-grade="${seat.seatGrade}" data-index="${index+1}" data-price="${seat.price}" src="https://ifh.cc/g/QqyHzC.png">
                        `;

                        const paymentCompleted = `
                            <img class="reserved" data-id="${seat.id}" data-grade="${seat.seatGrade}" data-index="${index+1}" data-price="${seat.price}" src="https://ifh.cc/g/QqyHzC.png">
                        `;

                        if (seat.seatStatus == "NOT_RESERVED") {
                            sGridDiv.append(notReserved)          
                        } else {
                            sGridDiv.append(paying)          
                        }
                    }

                    if (seat.seatGrade == "A") {
                        const notReserved = `
                            <img class="notReserved" data-id="${seat.id}" data-grade="${seat.seatGrade}" data-index="${index+1}" data-price="${seat.price}" src="https://ifh.cc/g/5HSMgs.png">
                        `;

                        const paying = `
                            <img class="reserved" data-id="${seat.id}" data-grade="${seat.seatGrade}" data-index="${index+1}" data-price="${seat.price}" src="https://ifh.cc/g/QqyHzC.png">
                        `;

                        const paymentCompleted = `
                            <img class="reserved" data-id="${seat.id}" data-grade="${seat.seatGrade}" data-index="${index+1}" data-price="${seat.price}" src="https://ifh.cc/g/QqyHzC.png">
                        `;

                        if (seat.seatStatus == "NOT_RESERVED") {
                            aGridDiv.append(notReserved)          
                        } else {
                            aGridDiv.append(paying)          
                        }
                    }
                });

                const seatListWrapperDiv = $('.seat-list-wrapper');

                seatListWrapperDiv.empty();


                $('.notReserved').on('click', function() {

                    const seatId = $(this).data('id');
                    const seatGrade = $(this).data('grade');
                    const seatIndex = $(this).data('index');
                    const seatPrice = $(this).data('price');

                    if ($(this).hasClass("selected")) {
                        $(this).removeClass('selected');
                        $(this).attr('src', 'https://ifh.cc/g/5HSMgs.png');
                        seatListWrapperDiv.find(`div[data-id="${seatId}"]`).remove();

                        selectedSeats = selectedSeats.filter(id => id !== seatId);
                        updateSeatConfirmBtn();

                    } else {
        
                        // 변수에 저장
                        const seatData = {
                            id: seatId,
                            grade: seatGrade,
                            index: seatIndex,
                            price: seatPrice
                        };

                        // 클릭한 요소에 selected 클래스 추가 및 src 변경
                        $(this).addClass('selected');
                        $(this).attr('src', 'https://ifh.cc/g/7a0wjw.png');
    
                        const selectedSeatElement = `
                            <div data-id="${seatId}" data-price="${seatPrice}" class="selected-seat">${seatGrade + "석 " + seatIndex + "번 " + " " + seatPrice + "원" }<div>
                        `;


                        seatListWrapperDiv.append(selectedSeatElement);

                        selectedSeats.push(seatId);
                        updateSeatConfirmBtn();
                    }
                });



                $('#seatConfirmBtn').off('click').on('click', function() {
                    
                    console.log("testtest")

                    const requestData = {
                        seatIdList: selectedSeats
                    };
                    
                    $.ajax({
                        url: `${window.SERVER_URL}/sessions/${sessionId}/seats/reserve`,
                        type: 'PATCH',
                        contentType: 'application/json',
                        data: JSON.stringify(requestData),
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
                        success: function (seatSelectResponseDto) {
                            console.log(seatSelectResponseDto);
                            alert(seatSelectResponseDto.message)

                            let totalPrice = 0;
            
                            // 모든 .selected-seat 요소를 순회하면서 data-price 값을 합산
                            $('.selected-seat').each(function() {
                                const price = parseInt($(this).data('price'));
                                totalPrice += price;
                            });

                            // 현재 시간을 전역 변수에 저장
                            modifiedAt = getFormattedDate();

                            $(".container > .popup").hide()
                            $(".total-price").text(totalPrice / 2 + "원")
                            $(".container > .popup-payment").show()


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

                $('#orderConfirmBtn').off('click').on('click', function() {
                    console.log(modifiedAt)
                    const requestDtoData = {
                        seatIdList: selectedSeats,
                        modifiedAt: modifiedAt
                    };
                    

                    $.ajax({
                        url: `${window.SERVER_URL}/sessions/${sessionId}/orders`,
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(requestDtoData),
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
                        success: function (seatSelectResponseDto) {
                            console.log(seatSelectResponseDto);
                            alert(seatSelectResponseDto.message)

                            $(".container > .popup").hide()
                            $(".container > .popup-payment").hide()
                            window.location.href = '/mypage';

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
