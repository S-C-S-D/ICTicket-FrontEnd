$(document).ready(function () {
    //[ 메인 배너 ]
    $.ajax({
        url: `${window.SERVER_URL}/banners?bannerType=MAIN`,
        type: 'GET',
        success: function (PerformanceGenreRankResponseDto) {
            console.log(PerformanceGenreRankResponseDto);

            const performances = PerformanceGenreRankResponseDto.data;
            const performanceListFlexDiv = $('.performance-list-genre');

            // performanceListFlexDiv.empty();

            // performances.forEach((performance, index) => {
            //         const genreRankElement = `
            //                 <div class="performance-info" data-id="${performance.id}">
            //                     <div class="image-wrapper">
            //                         <span class="rank absolute fs-28">${index + 1}</span>
            //                         <img src="${performance.imageUrl}">
            //                     </div>
            //                     <p class="performance-title fs-17 bold">${performance.title}</p>
            //                     <p class="venue-location fs-15 medium">${performance.ㅍ}</p>
            //                     <p class="performance-date fs-15 medium">${performance.startAt}</p>
            //                 </div>
            //             `;
            //         performanceListFlexDiv.append(genreRankElement);
            // });


        },
        error: function (xhr) {
            const perforamceTodayResponse = JSON.parse(xhr.responseText);
            console.log(perforamceTodayResponse.message);
        }
    });


    //[ 오늘 오픈 ]
    function loadPerformances(page) {
        $.ajax({
            url: `${window.SERVER_URL}/performances/today-open?page=${page}&size=10`,
            type: 'GET',
            success: function (PerforamceTodayResponseDto) {
                console.log(PerforamceTodayResponseDto);

                const performances = PerforamceTodayResponseDto.data;
                const performanceListGridDiv = $('.main-today-open > .performance-list-grid');

                performanceListGridDiv.empty();

                performances.forEach(performance => {
                    // "2024-07-26-19:00" 형식에서 시간 부분만 추출
                    const openTime = performance.openAt.split('-').pop();
                    const todayOpenElement = `
                            <div class="performance-info" data-id="${performance.id}">
                                <a href="/performances/${performance.id}">
                                    <div class="image-wrapper today-open-temp">
                                        <div class="before-wrapper">
                                            <span class="today">오늘</span>
                                            <span class="open-time absolute fs-28">${openTime}</span>
                                        </div>
                                        <img src="${performance.imageUrl}">
                                    </div>
                                </a>
                                <p class="performance-title fs-17 bold">${performance.title}</p>
                                <p class="venue-location fs-15 medium">${performance.venueName}</p>
                                <p class="performance-date fs-15 medium">${performance.startAt}</p>
                            </div>
                        `;
                    performanceListGridDiv.append(todayOpenElement);
                });
            },
            error: function (xhr) {
                const perforamceTodayResponse = JSON.parse(xhr.responseText);
                console.log(perforamceTodayResponse.message);
            }
        });
    }

    //[ 추천 티켓 ]
    function loadRecommandPerformances(page) {
        $.ajax({
            url: `${window.SERVER_URL}/performances/recommend?page=${page}&size=4`,
            type: 'GET',
            success: function (PerformanceRecommendResponseDto) {
                console.log(PerformanceRecommendResponseDto);

                const performances = PerformanceRecommendResponseDto.data;
                const performanceListGridDiv = $('.main-recommand > .performance-list-grid');

                performanceListGridDiv.empty();

                performances.forEach(performance => {
                    const todayOpenElement = `
                            <div class="performance-info" data-id="${performance.id}">
                                <a href="/performances/${performance.id}">
                                    <div class="image-wrapper">
                                        <img src="${performance.imageUrl}">
                                    </div>
                                </a>
                                <p class="performance-title fs-17 bold">${performance.title}</p>
                                <p class="venue-location fs-15 medium">${performance.venueName}</p>
                                <p class="performance-date fs-15 medium">${performance.startAt}</p>
                            </div>
                        `;
                    performanceListGridDiv.append(todayOpenElement);
                });
            },
            error: function (xhr) {
                const performanceRecommendResponse = JSON.parse(xhr.responseText);
                console.log(performanceRecommendResponse.message);
            }
        });
    }

    //[ 장르별 랭킹 ]
    function loadRankingPerformances(genreType) {
        $.ajax({
            url: `${window.SERVER_URL}/performances/ranking?genre=${genreType}&page=1&size=10`,
            type: 'GET',
            success: function (PerformanceGenreRankResponseDto) {
                console.log(PerformanceGenreRankResponseDto);

                const performances = PerformanceGenreRankResponseDto.data;
                const performanceListFlexDiv = $('.performance-list-genre');

                performanceListFlexDiv.empty();

                performances.forEach((performance, index) => {
                        const genreRankElement = `
                                <div class="performance-info" data-id="${performance.id}">
                                    <a href="/performances/${performance.id}">
                                        <div class="image-wrapper">
                                            <span class="rank absolute fs-28">${index + 1}</span>
                                            <img src="${performance.imageUrl}">
                                        </div>
                                    </a>
                                    <p class="performance-title fs-17 bold">${performance.title}</p>
                                    <p class="venue-location fs-15 medium">${performance.venueName}</p>
                                    <p class="performance-date fs-15 medium">${performance.startAt}</p>
                                </div>
                            `;
                        performanceListFlexDiv.append(genreRankElement);
                });

                $.getScript('/main-rank-swiper.98f54644.js')
                .done(function(script, textStatus) {
                    console.log('main-rank-swiper.js 스크립트가 성공적으로 로드되었습니다.');
                })
                .fail(function(jqxhr, settings, exception) {
                    console.log('main-rank-swiper.js 스크립트 로드에 실패했습니다.');
                });

            },
            error: function (xhr) {
                const perforamceTodayResponse = JSON.parse(xhr.responseText);
                console.log(perforamceTodayResponse.message);
            }
        });
    }

    // [ 오늘 오픈 / 추천 티켓 ] 호출
    loadPerformances(1);
    loadRecommandPerformances(1);
    loadRankingPerformances("CONCERT")


    //[ page 버튼 클릭 시, 어떤 컨테이너 안에서 눌린 넘버인지 확인하는 메서드 ]
    function setupPagination(containerSelector, loadFunction) {
        $(containerSelector).on('click', '.page-num', function () {
            console.log("test")
            var pageNumber = $(this).text();

            $(containerSelector + ' > .page-wrapper > .page-num').removeClass('active');
            $(this).addClass('active');

            loadFunction(pageNumber);
        });
    }

    setupPagination('.main-today-open', loadPerformances);
    setupPagination('.main-recommand', loadRecommandPerformances);

    // 장르별 인기순위 장르 버튼 클릭 시, active 주기
    $('.genre-btn').on('click', function () {
        var genreType = $(this).data('genre');
        var isActive = $(this).hasClass('active');
    
        $('.genre-btn').removeClass('active');
        $(this).addClass('active');
    
        loadRankingPerformances(genreType);

        if (!isActive) {
            $('.slider-wrapper').css('transform', 'translateX(0)');
        }
    });
    
    

});
