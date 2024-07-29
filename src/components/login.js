$(document).ready(function() {
    $('input').focus(function () {
        $(this).parent().addClass('focused');
    }).blur(function () {
        $(this).parent().removeClass('focused');
    });

    $('#login').on('click', function() {
        console.log("test")
        // console.log(genreType);
        if (true) {
            window.location.href = `/login`; // 절대 경로 사용
        } else {
            window.location.href = `/home`
        }
    });
});