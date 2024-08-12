// $(document).ready(function() {
//     const $container = $('.gerne-ranking > .slider-container-rank > .slider-wrapper');
//     const $btnLeft = $('.gerne-ranking > .slider-container-rank > .nav-button.left');
//     const $btnRight = $('.gerne-ranking > .slider-container-rank > .nav-button.right');
//     let currentIndex = 0;
//     const itemsToShow = 4;
//     const gap = parseInt($('.performance-list-genre').css('gap')) || 0;

//     const updateSliderPosition = () => {
//         const $items = $container.find('.performance-info'); // 슬라이더 아이템 재초기화
//         const itemWidth = $items.first().outerWidth() + gap;
//         $container.css('transform', `translateX(-${currentIndex * itemWidth}px)`);
//         updateButtonStates();
//     };

//     const updateButtonStates = () => {
//         const $items = $container.find('.performance-info'); // 슬라이더 아이템 재초기화
//         $btnLeft.prop('disabled', currentIndex <= 0);
//         $btnRight.prop('disabled', currentIndex >= $items.length - itemsToShow);
//     };

//     $btnRight.off('click'); // 기존 이벤트 핸들러 제거
//     $btnRight.on('click', () => {
//         const $items = $container.find('.performance-info'); // 슬라이더 아이템 재초기화
//         if (currentIndex < $items.length - itemsToShow) {
//             currentIndex++;
//             updateSliderPosition();
//         }
//     });

//     $btnLeft.off('click'); // 기존 이벤트 핸들러 제거
//     $btnLeft.on('click', () => {
//         if (currentIndex > 0) {
//             currentIndex--;
//             updateSliderPosition();
//         }
//     });

//     let isDragging = false;
//     let dragStartX = 0;

//     $container.off('mousedown'); // 기존 이벤트 핸들러 제거
//     $container.on('mousedown', (e) => {
//         isDragging = true;
//         dragStartX = e.pageX;
//         e.preventDefault(); // 기본 드래그 앤 드롭 기능 비활성화
//     });

//     $(document).off('mouseup'); // 기존 이벤트 핸들러 제거
//     $(document).on('mouseup', (e) => {
//         if (isDragging) {
//             isDragging = false;
//             const dragEndX = e.pageX;
//             const dragDistance = dragEndX - dragStartX;
//             const $items = $container.find('.performance-info'); // 슬라이더 아이템 재초기화
//             const itemWidth = $items.first().outerWidth() + gap;

//             if (Math.abs(dragDistance) > itemWidth / 2) {
//                 if (dragDistance < 0 && currentIndex < $items.length - itemsToShow) {
//                     currentIndex++;
//                 } else if (dragDistance > 0 && currentIndex > 0) {
//                     currentIndex--;
//                 }
//             }
//             updateSliderPosition(); // 마우스 버튼을 놓았을 때 슬라이드 상태 업데이트
//         }
//     });

//     updateSliderPosition();

//     // 윈도우 리사이즈 시 슬라이더 재초기화
//     $(window).off('resize'); // 기존 이벤트 핸들러 제거
//     $(window).on('resize', () => {
//         updateSliderPosition();
//     });
// });
