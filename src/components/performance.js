

$(document).ready(function () {
    // URL에서 performanceId 추출
    const pathParts = window.location.pathname.split('/');
    const performanceId = pathParts[pathParts.indexOf('performances') + 1];
    const accessToken = localStorage.getItem('Authorization');

    //[관심공연 조회]
    $.ajax({
        url: `${window.SERVER_URL}/performances/${performanceId}`,
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
            const openAt = performance.openAt;
            const currentTime = new Date();
            const openAtTime = new Date(openAt.replace("-", "/").replace("-", "/")); // "2024-07-31-19:00"을 Date 객체로 변환
    
            if (currentTime < openAtTime) {
                $(".reserveBtn").addClass("lock-btn");
                $(".reserveBtn").text(`${openAt} 오픈 예정`);
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
                                    <span class="info-price">150,000원</span>
                                </div>
                                <div class="seat-price-wrapper">
                                    <span class="info-seat">R석</span>
                                    <span class="info-price">130,000원</span>
                                </div>
                                <div class="seat-price-wrapper">
                                    <span class="info-seat">S석</span>
                                    <span class="info-price">110,000원</span>
                                </div>
                                <div class="seat-price-wrapper">
                                    <span class="info-seat">A석</span>
                                    <span class="info-price">90,000원</span>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="like-wrapper">
                    <img class="unlike" src="https://ifh.cc/g/HCH5O9.png" style="width: 24px; display: none;">
                    <img class="like" data-id="" src="https://ifh.cc/g/wGQQn7.png" style="width: 24px; display: none;">
                    <span class="like-count"></span>
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

            //관심 공연 좋아요 여부
            $.ajax({
                url: `${window.SERVER_URL}/performances/${performanceId}/likes`,
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

                    if (likeResponseDto.data != null) {
                        if (likeResponseDto.data.isLike) {
                            $(".unlike").hide();
                            $(".like").show();
                            $(".like").attr("data-id", likeResponseDto.data.id);
                        } else {
                            $(".like").hide();
                            $(".unlike").show();
                        }
                    } else {
                        $(".like").hide();
                        $(".unlike").show();
                    }
                    // location.reload(); // 페이지 리로드
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

            // 좋아요 등록
            $('.unlike').click(function () {

                $.ajax({
                    url: `${window.SERVER_URL}/performances/${performanceId}/likes`,
                    type: 'POST',
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
                    success: function (likeCreateResponse) {
                        console.log(likeCreateResponse)
                        // alert(likeCreateResponse.message)

                        //관심 공연 좋아요 여부    
                        $.ajax({
                            url: `${window.SERVER_URL}/performances/${performanceId}/likes`,
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

                                if (likeResponseDto.data != null) {
                                    if (likeResponseDto.data.isLike) {
                                        $(".unlike").hide();
                                        $(".like").show();
                                        $(".like").attr("data-id", likeResponseDto.data.id);
                                    } else {
                                        $(".like").hide();
                                        $(".unlike").show();
                                    }
                                } else {
                                    $(".like").hide();
                                    $(".unlike").show();
                                }
                                // location.reload(); // 페이지 리로드
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

                        //좋아요 개수 조회
                        $.ajax({
                            url: `${window.SERVER_URL}/performances/${performanceId}/likes-count`,
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
                                console.log(boardResponse)
                                $(".like-count").text(boardResponse.data + "명이 관심있음");
                                // location.reload(); // 페이지 리로드
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

            // 좋아요 취소
            $('.like').off('click').on('click', function () {
                var likeId = $(this).attr('data-id'); // 변경된 부분
                $.ajax({
                    url: `${window.SERVER_URL}/performances/${performanceId}/likes/${likeId}`,
                    type: 'DELETE',
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
                    success: function (likeDeleteResponse) {
                        console.log(likeDeleteResponse);
                        // alert(likeDeleteResponse.message);

                        // 관심 공연 좋아요 여부    
                        $.ajax({
                            url: `${window.SERVER_URL}/performances/${performanceId}/likes`,
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
                                console.log(likeResponseDto);

                                if (likeResponseDto.data != null) {
                                    if (likeResponseDto.data.isLike) {
                                        $(".unlike").hide();
                                        $(".like").show();
                                        $(".like").attr("data-id", likeResponseDto.data.id); // 변경된 부분
                                    } else {
                                        $(".like").hide();
                                        $(".unlike").show();
                                    }
                                } else {
                                    $(".like").hide();
                                    $(".unlike").show();
                                }
                                // location.reload(); // 페이지 리로드
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

                        // 좋아요 개수 조회
                        $.ajax({
                            url: `${window.SERVER_URL}/performances/${performanceId}/likes-count`,
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
                                $(".like-count").text(boardResponse.data + "명이 관심있음");
                                // location.reload(); // 페이지 리로드
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




            //좋아요 개수 조회
            $.ajax({
                url: `${window.SERVER_URL}/performances/${performanceId}/likes-count`,
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
                    console.log(boardResponse)
                    $(".like-count").text(boardResponse.data + "명이 관심있음");
                    // location.reload(); // 페이지 리로드
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










            //댓글 작성 버튼이 생긴 후, 클릭 효과 주기
            $("#commentBtn").on('click', function () {
                $(".comment.create-comment").show();
            });

            $("#cancelBtn").on('click', function () {
                $(".comment.create-comment").hide();
            });


            //별 클릭 효과
            var selectedRate = 0;
            var isClicked = false;


            $('.star-wrapper img').hover(function () {
                if (!isClicked) {
                    var rate = $(this).data('rate');
                    $('.star-wrapper img').each(function () {
                        if ($(this).data('rate') <= rate) {
                            $(this).attr('src', 'https://ifh.cc/g/dQCKxt.png');
                        } else {
                            $(this).attr('src', 'https://ifh.cc/g/9HJY7N.png');
                        }
                    });
                }
            }, function () {
                if (!isClicked) {
                    // 마우스가 벗어났을 때 고정된 이미지를 제외하고 초기화
                    $('.star-wrapper img').each(function () {
                        if ($(this).data('rate') <= selectedRate) {
                            $(this).attr('src', 'https://ifh.cc/g/dQCKxt.png');
                        } else {
                            $(this).attr('src', 'https://ifh.cc/g/9HJY7N.png');
                        }
                    });
                }
            });


            // 클릭 시 고정
            $('.star-wrapper img').click(function () {
                selectedRate = $(this).data('rate');
                isClicked = true;

                $('.star-wrapper img').removeClass('selected');

                $(this).addClass('selected');
                $('.star-wrapper img').each(function () {
                    if ($(this).data('rate') <= selectedRate) {
                        $(this).attr('src', 'https://ifh.cc/g/dQCKxt.png');
                    } else {
                        $(this).attr('src', 'https://ifh.cc/g/9HJY7N.png');
                    }
                });
            });


            // [댓글 조회]
            $.ajax({
                url: `${window.SERVER_URL}/performances/${performanceId}/comments`,
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

                $.ajax({
                    url: `${window.SERVER_URL}/performances/${performanceId}/comments`,
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
                        xhr.setRequestHeader('Authorization', accessToken); // 헤더명 수정
                    },
                    success: function (commentCreateResponse) {
                        console.log(commentCreateResponse)
                        alert(commentCreateResponse.message)
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



});