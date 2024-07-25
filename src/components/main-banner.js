$(document).ready(function() {
    const $slider = $('.slider');
    const $dots = $('.dot');
    const $images = $slider.children('img');
    const imageCount = $images.length;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;

    $slider.on('mousedown touchstart', function(event) {
        isDragging = true;
        startPos = getPositionX(event);
        $slider.addClass('grabbing');
        event.preventDefault(); // 기본 드래그 앤 드롭 기능 비활성화
    });

    $slider.on('mouseup mouseleave touchend', function() {
        isDragging = false;
        $slider.removeClass('grabbing');

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100) {
            currentIndex = (currentIndex + 1) % imageCount;
        }
        if (movedBy > 100) {
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