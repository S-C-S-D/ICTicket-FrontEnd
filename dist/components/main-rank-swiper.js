$(document).ready(function() {
    const $container = $('.main-genre-ranking > .slider-container-rank > .slider-wrapper');
    const $btnLeft = $('.main-genre-ranking > .slider-container-rank > .nav-button.left');
    const $btnRight = $('.main-genre-ranking > .slider-container-rank > .nav-button.right');
    const $dotsContainer = $('.dots-container');
    let currentIndex = 0;
    const itemsToShow = 5;
    const gap = parseInt($('.performance-list-genre').css('gap')) || 0;

    const updateSliderPosition = () => {
        const $items = $container.find('.performance-info'); // 슬라이더 아이템 재초기화
        const itemWidth = $items.first().outerWidth() + gap;
        $container.css('transform', `translateX(-${currentIndex * itemWidth}px)`);
        updateButtonStates();
        updateDots();
    };

    const updateButtonStates = () => {
        const $items = $container.find('.performance-info'); // 슬라이더 아이템 재초기화
        $btnLeft.prop('disabled', currentIndex <= 0);
        $btnRight.prop('disabled', currentIndex >= $items.length - itemsToShow);
    };

    const createDots = () => {
        $dotsContainer.empty(); // 기존 dot 제거
        const $items = $container.find('.performance-info'); // 슬라이더 아이템 재초기화
        const totalDots = Math.ceil($items.length / itemsToShow);
        for (let i = 0; i < totalDots; i++) {
            const $dot = $('<div>').addClass('dot-rank').data('index', i);
            if (i === 0) $dot.addClass('active');
            $dotsContainer.append($dot);
        }
        // 추가 dot 생성
        const additionalDots = $items.length - 4 - totalDots;
        for (let i = 0; i < additionalDots; i++) {
            const $extraDot = $('<div>').addClass('dot-rank').data('index', totalDots + i);
            $dotsContainer.append($extraDot);
        }
    };

    const updateDots = () => {
        $('.dot-rank').removeClass('active');
        $('.dot-rank').eq(currentIndex).addClass('active');
    };

    $dotsContainer.off('click', '.dot-rank'); // 기존 이벤트 핸들러 제거
    $dotsContainer.on('click', '.dot-rank', function () {
        const index = $(this).data('index');
        if (index !== undefined) {
            currentIndex = index;
            updateSliderPosition();
        }
    });

    $btnRight.off('click'); // 기존 이벤트 핸들러 제거
    $btnRight.on('click', () => {
        const $items = $container.find('.performance-info'); // 슬라이더 아이템 재초기화
        if (currentIndex < $items.length - itemsToShow) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    $btnLeft.off('click'); // 기존 이벤트 핸들러 제거
    $btnLeft.on('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    let startX, isDragging = false;

    $container.off('mousedown'); // 기존 이벤트 핸들러 제거
    $container.on('mousedown', (e) => {
        startX = e.pageX;
        isDragging = true;
        e.preventDefault(); // 기본 드래그 앤 드롭 기능 비활성화
    });

    $(document).off('mouseup'); // 기존 이벤트 핸들러 제거
    $(document).on('mouseup', (e) => {
        if (isDragging) {
            isDragging = false;
            // 드래그 거리가 50px 이상일 때만 이동
            const endX = e.pageX;
            const diff = startX - endX;
            if (diff > 50 && currentIndex < $container.find('.performance-info').length - itemsToShow) {
                currentIndex++;
            } else if (diff < -50 && currentIndex > 0) {
                currentIndex--;
            }
            updateSliderPosition(); // 마우스 버튼을 놓았을 때 슬라이드 상태 업데이트
            e.preventDefault(); // 기본 드래그 앤 드롭 기능 비활성화
        }
    });

    $container.off('mousemove'); // 기존 이벤트 핸들러 제거
    $container.on('mousemove', (e) => {
        if (isDragging) {
            e.preventDefault(); // 기본 드래그 앤 드롭 기능 비활성화
        }
    });

    // 초기화 작업
    createDots();
    updateSliderPosition();

    // 윈도우 리사이즈 시 슬라이더 재초기화
    $(window).off('resize'); // 기존 이벤트 핸들러 제거
    $(window).on('resize', () => {
        updateSliderPosition();
    });
});
