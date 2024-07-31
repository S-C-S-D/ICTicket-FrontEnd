$(document).ready(function () {
    // URL에서 performanceId 추출
    const pathParts = window.location.pathname.split('/');
    const performanceId = pathParts[pathParts.indexOf('performances') + 1];
    const accessToken = localStorage.getItem('Authorization');

    $.ajax({
        url: `http://localhost:8080/performances/${performanceId}`,
        type: 'GET',
        success: function (performanceDetailResponseDto) {
            console.log(performanceDetailResponseDto);

            const performance = performanceDetailResponseDto.data;
            const performanceListGridDiv = $('.performance-info-wrapper');

            performanceListGridDiv.empty();

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

            const performanceElement = `
                <div class="title-wrapper">
                    <span class="genre-type">${getKoreanGenreName(performance.genreType)}</span>
                    <span class="performance-title">${performance.title}</span>
                </div>
                <div class="image-info-wrapper">
                    <img src="${performance.imageUrl}">
                    <div class="info-wrapper">
                        <div class="info-title-wrapper">
                            <span class="info-title">장소</span>
                            <span class="info-title">공연기간</span>
                            <span class="info-title">공연시간</span>
                            <span class="info-title">관람연령</span>
                            <span class="info-title">가격</span>
                        </div>
                        <div class="info-detail-wrapper">
                            <span class="info-detail">${performance.venueName}</span>
                            <span class="info-detail">${performance.startAt} ~ ${performance.endAt}</span>
                            <span class="info-detail">${performance.runTime}분</span>
                            <span class="info-detail">${performance.ageGroup}</span>
                            <div class="seat-price-wrapper">
                                <span class="info-seat">VIP석</span>
                                <span class="info-price">159,000원</span>
                            </div>
                            <div class="seat-price-wrapper">
                                <span class="info-seat">VIP석</span>
                                <span class="info-price">159,000원</span>
                            </div>
                            <div class="seat-price-wrapper">
                                <span class="info-seat">VIP석</span>
                                <span class="info-price">159,000원</span>
                            </div>
                            <div class="seat-price-wrapper">
                                <span class="info-seat">VIP석</span>
                                <span class="info-price">159,000원</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="like-wrapper">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.234 3.00391C4.582 3.00391 2 4.83291 2 8.18091C2 11.9059 6.345 15.9079 11.303 20.7209C11.497 20.9099 11.749 21.0039 12 21.0039C12.251 21.0039 12.503 20.9099 12.697 20.7209C17.674 15.8899 22 11.9069 22 8.18091C22 4.82791 19.42 3.01291 16.771 3.01291C14.935 3.01291 13.125 3.87891 12 5.56691C10.87 3.87091 9.065 3.00391 7.234 3.00391ZM7.234 4.50391C9.224 4.50491 10.436 5.85691 11.389 7.20391C11.529 7.40191 11.757 7.51991 12 7.52091C12.243 7.52091 12.471 7.40391 12.612 7.20691C13.567 5.86791 14.802 4.51291 16.771 4.51291C18.567 4.51291 20.5 5.66091 20.5 8.18091C20.5 10.8519 17.619 13.8539 12 19.3079C6.546 14.0229 3.5 10.9189 3.5 8.18091C3.5 7.05591 3.889 6.11191 4.624 5.45391C5.297 4.84991 6.249 4.50391 7.234 4.50391Z" fill="black"/>
                    </svg>
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5.71987C9.376 1.20287 2 2.52187 2 8.18087C2 11.9059 6.345 15.9079 11.303 20.7209C11.497 20.9099 11.749 21.0039 12 21.0039C12.251 21.0039 12.503 20.9099 12.697 20.7209C17.674 15.8899 22 11.9069 22 8.18087C22 2.50287 14.604 1.23687 12 5.71987Z" fill="#DA3F36"/>
                    </svg> -->
                    <span class="like-count">142,000명이 관심있음</span>
                </div>
                <div class="description">"${performance.description}"</div>
                <div class="comment-info-wrapper">
                    <div class="comment-header">
                        <div class="text-wrapper-comment">
                            <span>총&nbsp;</span>
                            <span class="comment-count"></span>
                            <span>개의 댓글이 있습니다.</span>
                        </div>

                        <div id="commentBtn">댓글작성</div>

                    </div>
                    <div class="border-row"></div>
                        <div class="comment create-comment">
                            <div class="star-wrapper">
                                <img src="https://ifh.cc/g/9HJY7N.png" data-rate="1">
                                <img src="https://ifh.cc/g/9HJY7N.png" data-rate="2">
                                <img src="https://ifh.cc/g/9HJY7N.png" data-rate="3">
                                <img src="https://ifh.cc/g/9HJY7N.png" data-rate="4">
                                <img src="https://ifh.cc/g/9HJY7N.png" data-rate="5">
                            </div>
                            <div class="wrapper-label-input">
                                <input type="text" id="commentTitle" name="commentTitle" placeholder="제목" autocomplete="off" required>
                            </div>
                            <textarea type="text" id="commentDescription" placeholder="내용"></textarea>
                            <div class="btn-wrapper">
                                <div id="createCommentBtn">작성하기</div>
                                <div id="cancelBtn">취소</div>
                            </div>
                        </div>
                    <div class="comment-list-wrapper"></div>
                </div>
            `;
            performanceListGridDiv.append(performanceElement);

            //댓글 작성 버튼이 생긴 후, 클릭 효과 주기
            $("#commentBtn").on('click', function() {
                $(".comment.create-comment").show();
            });

            $("#cancelBtn").on('click', function() {
                $(".comment.create-comment").hide();
            });


            //별 클릭 효과
            var selectedRate = 0;
            var isClicked = false;
        
        
            $('.star-wrapper img').hover(function() {
                if (!isClicked) {
                    var rate = $(this).data('rate');
                    $('.star-wrapper img').each(function() {
                        if ($(this).data('rate') <= rate) {
                            $(this).attr('src', 'https://ifh.cc/g/dQCKxt.png');
                        } else {
                            $(this).attr('src', 'https://ifh.cc/g/9HJY7N.png');
                        }
                    });
                }
            }, function() {
                if (!isClicked) {
                    // 마우스가 벗어났을 때 고정된 이미지를 제외하고 초기화
                    $('.star-wrapper img').each(function() {
                        if ($(this).data('rate') <= selectedRate) {
                            $(this).attr('src', 'https://ifh.cc/g/dQCKxt.png');
                        } else {
                            $(this).attr('src', 'https://ifh.cc/g/9HJY7N.png');
                        }
                    });
                }
            });
        
        
            // 클릭 시 고정
            $('.star-wrapper img').click(function() {
                selectedRate = $(this).data('rate');
                isClicked = true;
        
                $('.star-wrapper img').removeClass('selected');
        
                $(this).addClass('selected');
                $('.star-wrapper img').each(function() {
                    if ($(this).data('rate') <= selectedRate) {
                        $(this).attr('src', 'https://ifh.cc/g/dQCKxt.png');
                    } else {
                        $(this).attr('src', 'https://ifh.cc/g/9HJY7N.png');
                    }
                });
            });
    

            // [댓글 조회]
            $.ajax({
                url: `http://localhost:8080/performances/${performanceId}/comments`,
                type: 'GET',
                success: function (CommentResponseDto) {
                    console.log(CommentResponseDto);

                    const comments = CommentResponseDto.data;
                    const commnetListDiv = $('.comment-list-wrapper');


                    $(".comment-count").text(comments.length)

                    commnetListDiv.empty();

                    comments.forEach((comment, index) => {
                        const commentElement = `
                            <div class="comment">
                                <div class="comment-header">
                                    <div class="comment-rate" data-rate="${comment.rate}"></div>
                                    <div class="user-info-wrapper">
                                        <span>${comment.nickname}</span>
                                        <div class="border-line" style="margin: 0;"></div>
                                        <span>${comment.createdAt}</span>
                                    </div>
                                </div>
                                <p class="comment-title">${comment.title}</p>
                                <p class="comment-description">${comment.description}</p>
                            </div>
                        `;
                        commnetListDiv.append(commentElement);

                    });


                },
                error: function (xhr) {
                    const perforamceTodayResponse = JSON.parse(xhr.responseText);
                    console.log(perforamceTodayResponse.message);
                }
            });

            
            //댓글 생성
            $('#createCommentBtn').click(function () {
                console.log(selectedRate)
                const requestData = {
                    title: $('#commentTitle').val(),
                    description: $('#commentDescription').val(),
                    rate: selectedRate
                };
                console.log(requestData)
        
                $.ajax({
                    url: `http://localhost:8080/performances/${performanceId}/comments`,
                    type: 'POST',
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
                        console.log(accessToken)
                        xhr.setRequestHeader('Authorization', accessToken); // 헤더명 수정
                    },
                    success: function (boardResponse) {
                        console.log(boardResponse)
                        alert(boardResponse.message)
                        location.reload(); // 페이지 리로드
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
            });


        },
        error: function (xhr) {
            const perforamceTodayResponse = JSON.parse(xhr.responseText);
            console.log(perforamceTodayResponse.message);
        }
        
    });

    //예약하기 스크롤에 맞게 따라오기
    // 예약하기 스크롤에 맞게 따라오기
    var $parentWrapper = $('.parent-wrapper');
    var $sessionWrapper = $('.session-info-wrapper');

    // // DOM 요소가 존재하는지 확인
    // if ($parentWrapper.length && $sessionWrapper.length) {
    //     var parentTop = $parentWrapper.offset().top;
    //     var parentHeight = $parentWrapper.height();
    //     var sessionHeight = $sessionWrapper.height();

    //     $(window).on('scroll', function () {
    //         var scrollPosition = $(window).scrollTop();
    //         var maxScroll = parentTop + parentHeight - sessionHeight - 70; // 부모 요소의 범위 내에서 스크롤 가능한 최대 값

    //         if (scrollPosition >= parentTop && scrollPosition <= maxScroll) {
    //             $sessionWrapper.css({
    //                 'top': (scrollPosition - parentTop + 70) + 'px'
    //             });
    //         } else if (scrollPosition < parentTop) {
    //             $sessionWrapper.css({
    //                 'top': '70px'
    //             });
    //         } else {
    //             $sessionWrapper.css({
    //                 'top': (parentHeight - sessionHeight) + 'px'
    //             });
    //         }
    //     });
    // } else {
    //     console.error("parent-wrapper 또는 session-info-wrapper 요소를 찾을 수 없습니다.");
    // }
    $(".container > .cover").on('click', function() {
        $(".container > .cover").hide();
    });

   
    
});