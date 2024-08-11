$(document).ready(function() { 
    //인포 마크 클릭 시, 배경, 팝업 나타나게 한 후, 데이터 입력
    $(".info-mark").on('click', function(){
        $(".description-popup").show();
        $(".cover-description").show();

        // [home] 장르별 랭킹 조회
        if ($(this).hasClass('genre-rank')) {
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").show()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L75-L87");
            $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L22-L43");

            //설명글
            $(".description-popup > .popup-flex > .description").text("장르별로 인기 순 TOP 10의 공연들을 조회합니다. 인기 순위는 공연 좋아요 수와 조회수의 합산으로 정해집니다. (pagenation적용)")
            
        // [home] 오늘 오픈 공연 조회
        } else if ($(this).hasClass('today-open')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").show()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L89-L101");
            $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L45-L65");

            //설명글
            $(".description-popup > .popup-flex > .description").text("오늘 오픈하는 공연들을 조회합니다. 오픈 시간이 빠른 순으로 보여집니다.")
        // [home] 추천 티켓
        } else if ($(this).hasClass('recommend')) { 
            //보여줄 링크
            $(".service-link").show()
            $(".queryDsl-link").show()

            //새로운 링크
            $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L155-L166");
            $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L139-L177");

            //설명글
            $(".description-popup > .popup-flex > .description").text("장르별로 인기 순위가 1, 2위인 공연들을 조회해옵니다. 인기 순위는 공연 좋아요 수와 조회수의 합산으로 정해집니다.")
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


});