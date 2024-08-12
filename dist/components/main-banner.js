$(document).ready(function() {
    const $slider = $('.slider');
    const $dots = $('.dot');
    const $images = $slider.children('a');
    const imageCount = $images.length;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;
    let movedBy = 0; // 이동 거리 기록

    $slider.on('mousedown touchstart', function(event) {
        isDragging = true;
        startPos = getPositionX(event);
        $slider.addClass('grabbing');
        movedBy = 0; // 이동 초기화
        event.preventDefault(); // 기본 드래그 앤 드롭 기능 비활성화
    });

    $slider.on('mouseup mouseleave touchend', function(event) {
        isDragging = false;
        $slider.removeClass('grabbing');

        // 이동 거리 계산
        const finalTranslate = currentTranslate - prevTranslate;
        movedBy = finalTranslate;

        // 드래그가 너무 짧으면 클릭으로 간주
        if (Math.abs(movedBy) < 10) {
            return; // 클릭 이벤트로 처리하지 않음
        }

        if (movedBy < -100) {
            currentIndex = (currentIndex + 1) % imageCount;
        } else if (movedBy > 100) {
            currentIndex = (currentIndex - 1 + imageCount) % imageCount;
        }

        setPositionByIndex(true);
        updateDots();
    });

    $slider.on('mousemove touchmove', function(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
            setSliderPosition();
            event.preventDefault(); // 기본 드래그 앤 드롭 기능 비활성화
        }
    });

    $images.on('click', function(event) {
        // 스와이프가 이루어졌다면 클릭 이벤트 무시
        if (Math.abs(movedBy) >= 10) {
            event.preventDefault(); // 클릭 이벤트 기본 동작 방지
            return; // 클릭 이벤트 무시
        }

        const url = $(this).find('img').data('url'); // img의 data-url 가져오기
        window.location.href = url;
    });

    $dots.on('click', function() {
        currentIndex = $(this).index();
        setPositionByIndex(true);
        updateDots();
    });

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.originalEvent.touches[0].clientX;
    }

    function setSliderPosition() {
        $slider.css('transform', `translateX(${currentTranslate}px)`);
    }

    function setPositionByIndex(animate) {
        if (animate) {
            $slider.css('transition', 'transform 0.3s ease-out');
        } else {
            $slider.css('transition', 'none');
        }
        currentTranslate = currentIndex * -$slider.width();
        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    function updateDots() {
        $dots.each(function(index) {
            $(this).toggleClass('active', index === currentIndex);
        });
    }

    $slider.on('transitionend', function() {
        if (currentIndex === imageCount) {
            $slider.css('transition', 'none');
            currentIndex = 0;
            setPositionByIndex(false);
        } else if (currentIndex === -1) {
            $slider.css('transition', 'none');
            currentIndex = imageCount - 1;
            setPositionByIndex(false);
        }
    });

    updateDots();
});
