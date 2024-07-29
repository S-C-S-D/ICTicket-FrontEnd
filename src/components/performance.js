$(document).ready(function () {
    // URL에서 performanceId 추출
    const pathParts = window.location.pathname.split('/');
    const performanceId = pathParts[pathParts.indexOf('performances') + 1];

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

            const todayOpenElement = `
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M7.234 3.00391C4.582 3.00391 2 4.83291 2 8.18091C2 11.9059 6.345 15.9079 11.303 20.7209C11.497 20.9099 11.749 21.0039 12 21.0039C12.251 21.0039 12.503 20.9099 12.697 20.7209C17.674 15.8899 22 11.9069 22 8.18091C22 4.82791 19.42 3.01291 16.771 3.01291C14.935 3.01291 13.125 3.87891 12 5.56691C10.87 3.87091 9.065 3.00391 7.234 3.00391ZM7.234 4.50391C9.224 4.50491 10.436 5.85691 11.389 7.20391C11.529 7.40191 11.757 7.51991 12 7.52091C12.243 7.52091 12.471 7.40391 12.612 7.20691C13.567 5.86791 14.802 4.51291 16.771 4.51291C18.567 4.51291 20.5 5.66091 20.5 8.18091C20.5 10.8519 17.619 13.8539 12 19.3079C6.546 14.0229 3.5 10.9189 3.5 8.18091C3.5 7.05591 3.889 6.11191 4.624 5.45391C5.297 4.84991 6.249 4.50391 7.234 4.50391Z" fill="black"/>
                    </svg>
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5.71987C9.376 1.20287 2 2.52187 2 8.18087C2 11.9059 6.345 15.9079 11.303 20.7209C11.497 20.9099 11.749 21.0039 12 21.0039C12.251 21.0039 12.503 20.9099 12.697 20.7209C17.674 15.8899 22 11.9069 22 8.18087C22 2.50287 14.604 1.23687 12 5.71987Z" fill="#DA3F36"/>
                    </svg> -->
                    <span class="like-count">142,000명이 관심있음</span>
                </div>
        `;
    performanceListGridDiv.append(todayOpenElement);
        },
        error: function (xhr) {
            const perforamceTodayResponse = JSON.parse(xhr.responseText);
            console.log(perforamceTodayResponse.message);
        }
    });
});