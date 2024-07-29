$(document).ready(function () {

    //[ 할인 중 조회 ]
    function loadRankAllPerformances(page) {
        $.ajax({
            url: `http://localhost:8080/performances/rank-all?page=${page}&size=10`,
            type: 'GET',
            success: function (PerformanceRankResponseDto) {
                console.log(PerformanceRankResponseDto);

                const performances = PerformanceRankResponseDto.data;
                const performanceListGridDiv = $('.row-table-wrapper');

                performanceListGridDiv.empty();

                console.log("page = "  + page)
                performances.forEach((performance, index) => {

                    console.log("index = "  + index)
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
                    const genreRankElement = `
                        <div class="row-wrapper">
                            <div class="row rank" data-rank="${(page * 10) - (9 - index)}">${(page * 10) - (9 - index)}</div>
                            <a href="/performances/${performance.id}">
                                <div class="row title" data-id="${performance.id}">
                                    <img class="performance-image" src="${performance.imageUrl}">
                                    <div class="info-wrapper">
                                        <span class="performance-genre">${getKoreanGenreName(performance.genreType)}</span>
                                        <span class="performance-title">${performance.title}</span>
                                    </div>
                                </div>
                            </a>
                            <div class="row location">
                                <div class="location-wrapper">
                                    <span class="performance-date">${performance.startAt} ~ ${performance.endAt}</span>
                                    <span class="performance-venue">${performance.venueName}</span>
                                </div>
                            </div>
                            <div class="row reserve">
                                <div id="reserveBtn" data-id="${performance.id}">
                                    예매하기
                                </div>
                            </div>
                        </div>
                    `;
                    performanceListGridDiv.append(genreRankElement);
                });
                window.scrollTo(0, 0);

            },
            error: function (xhr) {
                const perforamceTodayResponse = JSON.parse(xhr.responseText);
                console.log(perforamceTodayResponse.message);
            }
        });
    }

    loadRankAllPerformances(1)

    function setupPagination(containerSelector, loadFunction) {
        $(containerSelector).on('click', '.page-num', function () {
            var pageNumber = $(this).text();

            $(containerSelector + ' > .page-wrapper > .page-num').removeClass('active');
            $(this).addClass('active');

            loadFunction(pageNumber);
        });
    }

    setupPagination('.inner', loadRankAllPerformances);
});