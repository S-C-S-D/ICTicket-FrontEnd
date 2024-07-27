$(document).ready(function() {
    // 현재 URL에서 genreType 추출
    const currentPath = window.location.pathname.split('/').pop();
    console.log(currentPath)
    
    // nav-option 클릭 이벤트 핸들러
    $('.nav-bar').on('click', '.nav-option', function() {
        const genreType = $(this).data('type');
        // console.log(genreType);
        if (genreType != "home") {
            window.location.href = `/performances/${genreType}`; // 절대 경로 사용
        } else {
            window.location.href = `/home`
        }
    });

    // 현재 URL의 genreType과 일치하는 nav-option에 active 클래스 추가
    $('.nav-bar .nav-option').each(function() {
        if ($(this).data('type') === currentPath) {
            $(this).addClass('active');
        }
    });
});