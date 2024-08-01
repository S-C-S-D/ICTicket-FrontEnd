$(document).ready(function () {

    const accessToken = localStorage.getItem('Authorization');
    //프로필 불러오기
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
        success: function (userProfileResponseDto) {
            console.log(userProfileResponseDto)
            
            const userData = userProfileResponseDto.data;
            const commnetListDiv = $('.user-profile');

            commnetListDiv.empty();

            const userDataElement = `
                <div class="flex-group">
                <img src="https://ifh.cc/g/7kQYpA.png">
                    <div class="user-info-wrap">
                        <span class="user-nickname">${userData.nickname}</span>
                        <span class="user-email">${userData.email}</span>
                        <span class="user-address">${userData.address}</span>
                        <span class="user-phonenumber">${userData.phoneNumber}</span>
                    </div>
                </div>
                <div class="order-count-wrap">
                    <span class="order-count">${userData.orderCount}</span>
                    <span class="order-text">예매내역</span>
                </div>
            `;
            commnetListDiv.append(userDataElement);
            loadOrders(userData.id);

        },
        error: function (jqXHR) {
            const commentResponse = jqXHR.responseJSON;
            const commentResponseText = jqXHR.responseText;

            if (commentResponse != null) {
                alert(commentResponse.message);
            } else {
                alert(commentResponseText)
            }

        }
    });

     // 예매내역 불러오기 함수
     function loadOrders(userId) {
        $.ajax({
            url: `http://localhost:8080/users/${userId}/orders`,
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
            success: function (orderResponseDto) {
                console.log(orderResponseDto);
    
                const orders = orderResponseDto.data;
                const orderListDiv = $('.row-table-wrapper');
    
                orderListDiv.empty();
    
                function getKoreanGenreName(genreType) {
                    switch (genreType) {
                        case 'MUSICAL':
                            return '뮤지컬';
                        case 'CONCERT':
                            return '콘서트';
                        case 'FESTIVAL':
                            return '페스티벌';
                        case 'SPORTS':
                            return '스포츠';
                        case 'EXHIBITION':
                            return '전시회';
                        case 'CLASSIC':
                            return '클래식/무용';
                        case 'RANKING':
                            return '랭크';
                        default:
                            return '공연'; // 기본값 설정
                    }
                }
    
                function getKoreanOrderStatus(orderStatus) {
                    switch (orderStatus) {
                        case 'SUCCESS':
                            return '결제완료';
                        case 'CANCEL':
                            return '결제취소';
                        default:
                            return '상태없음'; // 기본값 설정
                    }
                }
    
                orders.forEach((order, index) => {
                    const sessionDateTime = `${order.sessionDate} ${order.sessionTime.slice(0, 5)}`;
                    const genreRankElement = `
                        <div class="row-wrapper">
                            <div class="row date">${order.orderDate}</div>
                            <a href="/performances/${order.performanceId}">
                            <div class="row title" data-id="">
                                <img class="performance-image" src="${order.imageUrl}">
                                <div class="info-wrapper">
                                    <span class="performance-genre">${getKoreanGenreName(order.genreType)}</span>
                                    <span class="performance-title">${order.title}</span>
                                    <span class="performance-date">${order.startAt + " ~ " + order.endAt}</span>
                                    <span class="performance-venue">${order.address}</span>
                                </div>
                            </div>
                            </a>
                            <div class="row info">
                                <div class="info-wrapper">
                                    <div class="info-wrap">
                                        <span class="info-title">예약번호</span>
                                        <span class="info-detail view-date">${order.orderNumber}</span>
                                    </div>
                                    <div class="info-wrap">
                                        <span class="info-title">관람일</span>
                                        <span class="info-detail">${sessionDateTime}</span>
                                    </div>
                                    <div class="info-wrap">
                                        <span class="info-title">매수</span>
                                        <span class="info-detail">${order.ticketCount}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row reserve">
                                <div class="status-wrap">
                                    <span class="order-status">${getKoreanOrderStatus(order.orderStatus)}</span>
                                    <div class="cancelBtn" data-id="${order.orderId}">
                                        취소하기
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    orderListDiv.append(genreRankElement);
                    if (order.orderStatus == "CANCEL") {
                        orderListDiv.find(`.cancelBtn[data-id="${order.orderId}"]`).hide();
                    }
                });
    
                $('.cancelBtn').click(function () {
                    const orderId = $(this).data('id');
                    const confirmCancel = confirm("예매를 취소하시겠습니까?");
                    if (confirmCancel) {
                        $.ajax({
                            url: `http://localhost:8080/users/orders/${orderId}`,
                            type: 'PATCH',
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
                            success: function (userProfileResponseDto) {
                                console.log(userProfileResponseDto);
                                alert("예매가 취소되었습니다.");
                                loadOrders(userId); // 목록을 다시 불러와서 갱신
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
                    }
                });
            },
            error: function (jqXHR) {
                const orderResponse = jqXHR.responseJSON;
                const orderResponseText = jqXHR.responseText;
    
                if (orderResponse != null) {
                    alert(orderResponse.message);
                } else {
                    alert(orderResponseText);
                }
            }
        });
    }
    
});


