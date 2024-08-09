
$(document).ready(function () {
    // 현재 페이지의 URL에서 장르 부분을 추출하고 대문자로 변환하는 함수
    function extractAndTransformGenreType() {
        const path = window.location.pathname;
        const genreType = path.split('/')[3]; // '/performances/festival'에서 'festival'을 추출
        return genreType.toUpperCase(); // 'festival'을 'FESTIVAL'로 변환
    }

    // 장르 타입을 추출하고 대문자로 변환
    const genreType = extractAndTransformGenreType();

    // genreType에 따라 한글 텍스트를 반환하는 함수
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


    $(".sale-title").text("할인 중인 " + getKoreanGenreName(genreType))

    //[ 장르별 랭킹 조회 ]
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
                    
                </div>
            `;
                performanceListFlexDiv.append(genreRankElement);

            });

            $.getScript('/genre-rank-swiper.0be238a9.js')
            .done(function(script, textStatus) {
                console.log('genre-rank-swiper.js 스크립트가 성공적으로 로드되었습니다.');
            })
            .fail(function(jqxhr, settings, exception) {
                console.log('genre-rank-swiper.js 스크립트 로드에 실패했습니다.');
            });


        },
        error: function (xhr) {
            const perforamceTodayResponse = JSON.parse(xhr.responseText);
            console.log(perforamceTodayResponse.message);
        }
    });

    //[ 할인 중 조회 ]
    function loadSalePerformances(page) {
        $.ajax({
            url: `${window.SERVER_URL}/performances/genre/discount?genre=${genreType}&page=${page}&size=5`,
            type: 'GET',
            success: function (PerformanceDiscountResponseDto) {
                console.log(PerformanceDiscountResponseDto);

                const performances = PerformanceDiscountResponseDto.data;
                const performanceListGridDiv = $('.performance-list-grid.sale');

                performanceListGridDiv.empty();

                performances.forEach((performance, index) => {
                    // 할인된 가격 계산
                    const discountedPrice = (performance.price * (100 - performance.discountRate) * 0.01).toFixed(0);
                    // 천 단위 쉼표 추가
                    const formattedPrice = Number(discountedPrice).toLocaleString();

                    const genreRankElement = `
                        <div class="performance-info" data-id="${performance.id}">
                            <a href="/performances/${performance.id}">
                                <div class="image-wrapper">
                                    <img src="${performance.imageUrl}">
                                </div>
                            </a>
                            <p class="performance-title fs-17 bold">${performance.title}</p>
                            <p class="venue-location fs-15 medium">${performance.venueName}</p>
                            <p class="performance-date fs-15 medium">${performance.startAt}</p>
                            <div class="sale-wrapper">
                                <p class="performance-discount-rate fs-17 black">${performance.discountRate}%</p>
                                <p class="performance-price fs-17 black">${formattedPrice}원</p>
                            </div>
                        </div>
                    `;
                    performanceListGridDiv.append(genreRankElement);
                });

            },
            error: function (xhr) {
                const perforamceTodayResponse = JSON.parse(xhr.responseText);
                console.log(perforamceTodayResponse.message);
            }
        });
    }

    //[ 오픈 예정 조회 ]
    function loadOpenSoonPerformances(page) {
        $.ajax({
            url: `${window.SERVER_URL}/performances/genre/will-be-opened?genre=${genreType}&page=${page}&size=5`,
            type: 'GET',
            success: function (PerformanceDiscountResponseDto) {
                console.log(PerformanceDiscountResponseDto);

                const performances = PerformanceDiscountResponseDto.data;
                const performanceListGridDiv = $('.performance-list-grid.open-soon');

                performanceListGridDiv.empty();

                performances.forEach((performance, index) => {
                    const genreRankElement = `
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
                    performanceListGridDiv.append(genreRankElement);
                });

            },
            error: function (xhr) {
                const perforamceTodayResponse = JSON.parse(xhr.responseText);
                console.log(perforamceTodayResponse.message);
            }
        });
    }

    loadSalePerformances(1)
    loadOpenSoonPerformances(1)

    function setupPagination(containerSelector, loadFunction) {
        $(containerSelector).on('click', '.page-num', function () {
            var pageNumber = $(this).text();

            $(containerSelector + ' > .page-wrapper > .page-num').removeClass('active');
            $(this).addClass('active');

            loadFunction(pageNumber);
        });
    }

    setupPagination('.main-today-sale', loadSalePerformances);
    setupPagination('.main-open-soon', loadOpenSoonPerformances);

});