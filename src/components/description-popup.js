$(document).ready(function() { 
    //인포 마크 클릭 시, 배경, 팝업 나타나게 한 후, 데이터 입력
    $(".info-mark").on('click', function(){
        console.log("test")
        $(".description-popup").show();
        $(".cover-description").show();

        // [home] 장르별 랭킹 조회
        if ($(this).hasClass('genre-rank')) {
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").show()
            $(".jpa-link").hide()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L75-L87");
            $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L22-L43");
            $(".jpa-link").attr("href", "");

            //설명글
            $(".description-popup > .popup-flex > .description").text("장르별로 인기 순 TOP 10의 공연들을 조회합니다. 인기 순위는 공연 좋아요 수와 조회수의 합산으로 정해집니다. (pagenation적용)")
            
        // [home] 오늘 오픈 공연 조회
        } else if ($(this).hasClass('today-open')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").show()
            $(".jpa-link").hide()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L89-L101");
            $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L45-L65");
            $(".jpa-link").attr("href", "");

            //설명글
            $(".description-popup > .popup-flex > .description").text("오늘 오픈하는 공연들을 조회합니다. 오픈 시간이 빠른 순으로 보여집니다.")
        // [home] 추천 티켓
        } else if ($(this).hasClass('recommend')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").show()
            $(".jpa-link").hide()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L155-L166");
            $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L139-L177");
            $(".jpa-link").attr("href", "");

            //설명글
            $(".description-popup > .popup-flex > .description").text("장르별로 인기 순위가 1, 2위인 공연들을 조회해옵니다. 인기 순위는 공연 좋아요 수와 조회수의 합산으로 정해집니다.")

        // [performances/genre/genreType] 추천 티켓
        } else if ($(this).hasClass('sale')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").show()
            $(".jpa-link").hide()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/826d401cdb1bc6215681173bb600b5d421869eb4/src/main/java/com/sparta/icticket/performance/PerformanceController.java#L76-L85");
            $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L67-L92");
            $(".jpa-link").attr("href", "");

            //설명글
            $(".description-popup > .popup-flex > .description").text("해당 장르의 할인이 진행중인 공연들을 조회합니다. 할인율이 높은 순으로 보여지며, 할인 기간이 끝난 공연은 자동으로 리스트에서 제외됩니다. (pagenation 적용)")

        // [performances/genre/genreType] 오픈 예정
        } else if ($(this).hasClass('open-soon')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").show()
            $(".jpa-link").hide()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/826d401cdb1bc6215681173bb600b5d421869eb4/src/main/java/com/sparta/icticket/performance/PerformanceController.java#L94-L103");
            $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L94-L115");
            $(".jpa-link").attr("href", "");

            //설명글
            $(".description-popup > .popup-flex > .description").text("해당 장르의 오늘 오픈 예정인 공연들을 조회합니다. 오픈 시간이 빠른 순으로 보여집니다. 오늘 오픈일은 티켓 판매 시작일을 의미합니다. (pagenation 적용)")
        // [performances/rank-all] 전체 랭킹
        } else if ($(this).hasClass('rank-all')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").show()
            $(".jpa-link").hide()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/826d401cdb1bc6215681173bb600b5d421869eb4/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L148-L152");
            $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L117-L137");
            $(".jpa-link").attr("href", "");

            //설명글
            $(".description-popup > .popup-flex > .description").text("전체 공연의 인기 순위가 조회됩니다. 인기 순위는 공연 좋아요 수와 조회수의 합산으로 정해집니다. (pagenation 적용)")
        // [performances/performanceId] 단일공연
        } else if ($(this).hasClass('performance')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").hide()
            $(".distributed-lock-link").hide()
            $(".optimistic-lock-link").show()
            $(".jpa-link").hide()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/826d401cdb1bc6215681173bb600b5d421869eb4/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L32-L73");
            $(".queryDsl-link").attr("href", "");
            $(".jpa-link").attr("href", "");
            $(".optimistic-lock-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/588be3ce950ee9a3fdcf80a9795bb0f58f478d84/src/main/java/com/sparta/icticket/performance/PerformanceRepository.java#L11-L14");

            //설명글
            $(".description-popup > .popup-flex > .description").text("단일 공연 조회 시 공연에 대한 모든 정보들을 불러옵니다. [ 장소 / 공연기간 / 공연시간 / 관람연령 / 좌석별 가격 / 공연 이미지 ]가 포함됩니다. 낙관적 락을 통하여 해당 공연 조회수를 동시성 제어 처리를 하였습니다.")
        
        // [performances/performanceId - comment] 댓글조회
        } else if ($(this).hasClass('comment-mark')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").hide()
            $(".distributed-lock-link").hide()
            $(".optimistic-lock-link").hide()
            $(".jpa-link").show()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/comment/CommentService.java#L50-L60");
            $(".queryDsl-link").attr("href", "");
            $(".jpa-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/588be3ce950ee9a3fdcf80a9795bb0f58f478d84/src/main/java/com/sparta/icticket/comment/CommentRepository.java#L10-L11");

            //설명글
            $(".description-popup > .popup-flex > .description").text("해당 공연의 댓글들을 불러옵니다.  댓글은 별점, 제목, 내용으로 이루어져 있습니다.")
    
        // [performances/performanceId - comment] 세션 조회 
        } else if ($(this).hasClass('session')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").hide()
            $(".distributed-lock-link").hide()
            $(".optimistic-lock-link").hide()
            $(".jpa-link").show()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/session/SessionService.java#L18-L39");
            $(".queryDsl-link").attr("href", "");
            $(".jpa-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/588be3ce950ee9a3fdcf80a9795bb0f58f478d84/src/main/java/com/sparta/icticket/session/SessionRepository.java#L23-L24");

            //설명글
            $(".description-popup > .popup-flex > .description").text("해당 공연의 세션들을 불러옵니다. 세션은 [ 공연날짜 / 공연회차 / 공연시간 ] 으로 이루어져있고 하나의 공연은 적어도 하나의 세션을 가지며 여러개의 세션이 존재할수있습니다.")
        // [performances/performanceId - session seat] 잔여 좌석 개수 조회
        } else if ($(this).hasClass('session-seat')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").hide()
            $(".distributed-lock-link").hide()
            $(".optimistic-lock-link").hide()
            $(".jpa-link").show()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/seat/SeatService.java#L36-L65");
            $(".queryDsl-link").attr("href", "");
            $(".jpa-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/588be3ce950ee9a3fdcf80a9795bb0f58f478d84/src/main/java/com/sparta/icticket/seat/SeatRepository.java#L17-L18");

            //설명글
            $(".description-popup > .popup-flex > .description").text("공연의 날짜와 시간 선택 시, 해당 공연의 각 세션 별 총 좌석 수와 남은 좌석 수를 불러옵니다.")
        // [performances/performanceId - session seat] 잔여 좌석 개수 조회
        } else if ($(this).hasClass('popup-mark')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").hide()
            $(".distributed-lock-link").show()
            $(".optimistic-lock-link").hide()
            $(".jpa-link").show()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/seat/SeatService.java#L52-L102");
            $(".queryDsl-link").attr("href", "");
            $(".distributed-lock-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/5f868d867924cdb7d585677fb1ebb0b850cb5743/src/main/java/com/sparta/icticket/common/config/RedissonLockAspect.java#L16-L55");
            $(".jpa-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/seat/SeatRepository.java#L26-L27");
            //설명글
            $(".description-popup > .popup-flex > .description").text("결제가 완료되지 않았으면서 결제 진행 중이 아닌 좌석을 파란색으로 보여줍니다. 제한 시간 내에 결제가 이루어지지 않은 좌석에 대해 5분마다 좌석 현황이 업데이트 됩니다. 추가적으로 분산락을 통해 동시성 제어 처리를 하였습니다.")
        // [performances/performanceId - session seat] 잔여 좌석 개수 조회
        } else if ($(this).hasClass('popup-payment-mark')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").hide()
            $(".distributed-lock-link").hide()
            $(".optimistic-lock-link").hide()
            $(".jpa-link").hide()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/order/OrderService.java#L36-L93");
            $(".queryDsl-link").attr("href", "");
            $(".distributed-lock-link").attr("href", "");
            $(".jpa-link").attr("href", "");
            //설명글
            $(".description-popup > .popup-flex > .description").text("사용자가 결제하기 버튼을 누르면 선택한 좌석의 상태가 COMPLETED로 변경됩니다. 또한, 해당 세션의 남은 좌석 수가 선택한 좌석 수만큼 감소하고 자동으로 선택한 좌석에 대한 주문이 생성된 후 좌석 하나 당 하나의 티켓이 생성됩니다.")
        }
    })

    $(".cover-description")
    

    //배경 클릭 시, 팝업, 배경 안보이게 처리
    $(".cover-description").on('click', function () {
        $(".description-popup").hide();
        $(".cover-description").hide();
    });

    $(".close-popup-btn").on('click', function () {
        $(".description-popup").hide();
        $(".cover-description").hide();
    });

    $(".close-popup-payment-btn").on('click', function () {
        $(".popup").hide();
        $(".popup-payment").hide();
        $(".cover").hide();
    });



});