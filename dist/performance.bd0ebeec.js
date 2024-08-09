// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/components/performance.js":[function(require,module,exports) {
$(document).ready(function () {
  // URL에서 performanceId 추출
  var pathParts = window.location.pathname.split('/');
  var performanceId = pathParts[pathParts.indexOf('performances') + 1];
  var accessToken = localStorage.getItem('Authorization');

  //[공연 조회]
  $.ajax({
    url: "".concat(window.SERVER_URL, "/performances/").concat(performanceId),
    type: 'GET',
    success: function success(performanceDetailResponseDto) {
      console.log(performanceDetailResponseDto);
      var performance = performanceDetailResponseDto.data;
      var performanceListGridDiv = $('.performance-info-wrapper');
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
            return '공연';
          // 기본값 설정
        }
      }
      var openAt = performance.openAt;
      // const currentTime = new Date();
      var openAtTime = new Date(openAt.replace("-", "/").replace("-", "/")); // "2024-07-31-19:00"을 Date 객체로 변환

      function updateCountdown() {
        var currentTime = new Date();
        var timeDiff = openAtTime - currentTime;
        if (timeDiff <= 0) {
          $(".reserveBtn").removeClass("lock-btn");
          $(".reserveBtn").text("예약 가능");
          clearInterval(countdownInterval);
          return;
        }
        var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        var hours = Math.floor(timeDiff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        var minutes = Math.floor(timeDiff % (1000 * 60 * 60) / (1000 * 60));
        var seconds = Math.floor(timeDiff % (1000 * 60) / 1000);
        $(".reserveBtn").addClass("lock-btn");
        $(".reserveBtn").text("".concat(days, "\uC77C ").concat(hours, "\uC2DC\uAC04 ").concat(minutes, "\uBD84 ").concat(seconds, "\uCD08 \uD6C4 \uC624\uD508 \uC608\uC815"));
      }
      updateCountdown();
      var countdownInterval = setInterval(updateCountdown, 1000);
      var performanceElement = "\n                <div class=\"title-wrapper\">\n                    <span class=\"genre-type\">".concat(getKoreanGenreName(performance.genreType), "</span>\n                    <span class=\"performance-title\">").concat(performance.title, "</span>\n                </div>\n                <div class=\"image-info-wrapper\">\n                    <img src=\"").concat(performance.imageUrl, "\">\n                    <div class=\"info-wrapper\">\n                        <div class=\"info-title-wrapper\">\n                            <span class=\"info-title\">\uC7A5\uC18C</span>\n                            <span class=\"info-title\">\uACF5\uC5F0\uAE30\uAC04</span>\n                            <span class=\"info-title\">\uACF5\uC5F0\uC2DC\uAC04</span>\n                            <span class=\"info-title\">\uAD00\uB78C\uC5F0\uB839</span>\n                            <span class=\"info-title\">\uAC00\uACA9</span>\n                        </div>\n                        <div class=\"info-detail-wrapper\">\n                            <span class=\"info-detail\">").concat(performance.venueName, "</span>\n                            <span class=\"info-detail\">").concat(performance.startAt, " ~ ").concat(performance.endAt, "</span>\n                            <span class=\"info-detail\">").concat(performance.runTime, "\uBD84</span>\n                            <span class=\"info-detail\">").concat(performance.ageGroup, "</span>\n                            <div class=\"seat-price-wrapper\">\n                                    <span class=\"info-seat\">VIP\uC11D</span>\n                                    <span class=\"info-price\">150,000\uC6D0</span>\n                                </div>\n                                <div class=\"seat-price-wrapper\">\n                                    <span class=\"info-seat\">R\uC11D</span>\n                                    <span class=\"info-price\">130,000\uC6D0</span>\n                                </div>\n                                <div class=\"seat-price-wrapper\">\n                                    <span class=\"info-seat\">S\uC11D</span>\n                                    <span class=\"info-price\">110,000\uC6D0</span>\n                                </div>\n                                <div class=\"seat-price-wrapper\">\n                                    <span class=\"info-seat\">A\uC11D</span>\n                                    <span class=\"info-price\">90,000\uC6D0</span>\n                                </div>\n                                </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"like-wrapper\">\n                    <img class=\"unlike\" src=\"https://ifh.cc/g/HCH5O9.png\" style=\"width: 24px; display: none;\">\n                    <img class=\"like\" data-id=\"\" src=\"https://ifh.cc/g/wGQQn7.png\" style=\"width: 24px; display: none;\">\n                    <span class=\"like-count\"></span>\n                </div>\n                <div class=\"description\">\"").concat(performance.description, "\"</div>\n                <div class=\"comment-info-wrapper\">\n                    <div class=\"comment-header\">\n                        <div class=\"text-wrapper-comment\">\n                            <span>\uCD1D&nbsp;</span>\n                            <span class=\"comment-count\"></span>\n                            <span>\uAC1C\uC758 \uB313\uAE00\uC774 \uC788\uC2B5\uB2C8\uB2E4.</span>\n                        </div>\n\n                        <div id=\"commentBtn\">\uB313\uAE00\uC791\uC131</div>\n\n                    </div>\n                    <div class=\"border-row\"></div>\n                        <div class=\"comment create-comment\">\n                            <div class=\"star-wrapper\">\n                                <img src=\"https://ifh.cc/g/9HJY7N.png\" data-rate=\"1\">\n                                <img src=\"https://ifh.cc/g/9HJY7N.png\" data-rate=\"2\">\n                                <img src=\"https://ifh.cc/g/9HJY7N.png\" data-rate=\"3\">\n                                <img src=\"https://ifh.cc/g/9HJY7N.png\" data-rate=\"4\">\n                                <img src=\"https://ifh.cc/g/9HJY7N.png\" data-rate=\"5\">\n                            </div>\n                            <div class=\"wrapper-label-input\">\n                                <input type=\"text\" id=\"commentTitle\" name=\"commentTitle\" placeholder=\"\uC81C\uBAA9\" autocomplete=\"off\" required>\n                            </div>\n                            <textarea type=\"text\" id=\"commentDescription\" placeholder=\"\uB0B4\uC6A9\"></textarea>\n                            <div class=\"btn-wrapper\">\n                                <div id=\"createCommentBtn\">\uC791\uC131\uD558\uAE30</div>\n                                <div id=\"cancelBtn\">\uCDE8\uC18C</div>\n                            </div>\n                        </div>\n                    <div class=\"comment-list-wrapper\"></div>\n                </div>\n            ");
      performanceListGridDiv.append(performanceElement);

      //관심 공연 좋아요 여부
      $.ajax({
        url: "".concat(window.SERVER_URL, "/performances/").concat(performanceId, "/likes"),
        type: 'GET',
        xhrFields: {
          withCredentials: true // 필요 시 추가
        },
        crossDomain: true,
        headers: {
          'Authorization': 'Bearer ' + accessToken // 헤더명 수정
        },
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('Authorization', accessToken); // 헤더명 수정
        },
        success: function success(likeResponseDto) {
          console.log(likeResponseDto);
          if (likeResponseDto.data != null) {
            if (likeResponseDto.data.isLike) {
              $(".unlike").hide();
              $(".like").show();
              $(".like").attr("data-id", likeResponseDto.data.id);
            } else {
              $(".like").hide();
              $(".unlike").show();
            }
          } else {
            $(".like").hide();
            $(".unlike").show();
          }
          // location.reload(); // 페이지 리로드
        },
        error: function error(jqXHR) {
          var commentResponse = jqXHR.responseJSON;
          var commentResponseText = jqXHR.responseText;
          if (commentResponse != null) {
            alert(commentResponse.message);
          } else {
            alert(commentResponseText);
          }
        }
      });

      // 좋아요 등록
      $('.unlike').click(function () {
        $.ajax({
          url: "".concat(window.SERVER_URL, "/performances/").concat(performanceId, "/likes"),
          type: 'POST',
          contentType: 'application/json',
          xhrFields: {
            withCredentials: true // 필요 시 추가
          },
          crossDomain: true,
          headers: {
            'Authorization': 'Bearer ' + accessToken // 헤더명 수정
          },
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('Authorization', accessToken); // 헤더명 수정
          },
          success: function success(likeCreateResponse) {
            console.log(likeCreateResponse);
            // alert(likeCreateResponse.message)

            //관심 공연 좋아요 여부    
            $.ajax({
              url: "".concat(window.SERVER_URL, "/performances/").concat(performanceId, "/likes"),
              type: 'GET',
              xhrFields: {
                withCredentials: true // 필요 시 추가
              },
              crossDomain: true,
              headers: {
                'Authorization': 'Bearer ' + accessToken // 헤더명 수정
              },
              beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader('Authorization', accessToken); // 헤더명 수정
              },
              success: function success(likeResponseDto) {
                console.log(likeResponseDto);
                if (likeResponseDto.data != null) {
                  if (likeResponseDto.data.isLike) {
                    $(".unlike").hide();
                    $(".like").show();
                    $(".like").attr("data-id", likeResponseDto.data.id);
                  } else {
                    $(".like").hide();
                    $(".unlike").show();
                  }
                } else {
                  $(".like").hide();
                  $(".unlike").show();
                }
                // location.reload(); // 페이지 리로드
              },
              error: function error(jqXHR) {
                var commentResponse = jqXHR.responseJSON;
                var commentResponseText = jqXHR.responseText;
                if (commentResponse != null) {
                  alert(commentResponse.message);
                } else {
                  alert(commentResponseText);
                }
              }
            });

            //좋아요 개수 조회
            $.ajax({
              url: "".concat(window.SERVER_URL, "/performances/").concat(performanceId, "/likes-count"),
              type: 'GET',
              contentType: 'application/json',
              xhrFields: {
                withCredentials: true // 필요 시 추가
              },
              crossDomain: true,
              headers: {
                'Authorization': 'Bearer ' + accessToken // 헤더명 수정
              },
              beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader('Authorization', accessToken); // 헤더명 수정
              },
              success: function success(boardResponse) {
                console.log(boardResponse);
                $(".like-count").text(boardResponse.data + "명이 관심있음");
                // location.reload(); // 페이지 리로드
              },
              error: function error(jqXHR) {
                var commentResponse = jqXHR.responseJSON;
                var commentResponseText = jqXHR.responseText;
                if (commentResponse != null) {
                  alert(commentResponse.message);
                } else {
                  alert(commentResponseText);
                }
              }
            });
          },
          error: function error(jqXHR) {
            var commentResponse = jqXHR.responseJSON;
            var commentResponseText = jqXHR.responseText;
            if (commentResponse != null) {
              alert(commentResponse.message);
            } else {
              alert(commentResponseText);
            }
          }
        });
      });

      // 좋아요 취소
      $('.like').off('click').on('click', function () {
        var likeId = $(this).attr('data-id'); // 변경된 부분
        $.ajax({
          url: "".concat(window.SERVER_URL, "/performances/").concat(performanceId, "/likes/").concat(likeId),
          type: 'DELETE',
          xhrFields: {
            withCredentials: true // 필요 시 추가
          },
          crossDomain: true,
          headers: {
            'Authorization': 'Bearer ' + accessToken // 헤더명 수정
          },
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('Authorization', accessToken); // 헤더명 수정
          },
          success: function success(likeDeleteResponse) {
            console.log(likeDeleteResponse);
            // alert(likeDeleteResponse.message);

            // 관심 공연 좋아요 여부    
            $.ajax({
              url: "".concat(window.SERVER_URL, "/performances/").concat(performanceId, "/likes"),
              type: 'GET',
              xhrFields: {
                withCredentials: true // 필요 시 추가
              },
              crossDomain: true,
              headers: {
                'Authorization': 'Bearer ' + accessToken // 헤더명 수정
              },
              beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader('Authorization', accessToken); // 헤더명 수정
              },
              success: function success(likeResponseDto) {
                console.log(likeResponseDto);
                if (likeResponseDto.data != null) {
                  if (likeResponseDto.data.isLike) {
                    $(".unlike").hide();
                    $(".like").show();
                    $(".like").attr("data-id", likeResponseDto.data.id); // 변경된 부분
                  } else {
                    $(".like").hide();
                    $(".unlike").show();
                  }
                } else {
                  $(".like").hide();
                  $(".unlike").show();
                }
                // location.reload(); // 페이지 리로드
              },
              error: function error(jqXHR) {
                var commentResponse = jqXHR.responseJSON;
                var commentResponseText = jqXHR.responseText;
                if (commentResponse != null) {
                  alert(commentResponse.message);
                } else {
                  alert(commentResponseText);
                }
              }
            });

            // 좋아요 개수 조회
            $.ajax({
              url: "".concat(window.SERVER_URL, "/performances/").concat(performanceId, "/likes-count"),
              type: 'GET',
              contentType: 'application/json',
              xhrFields: {
                withCredentials: true // 필요 시 추가
              },
              crossDomain: true,
              headers: {
                'Authorization': 'Bearer ' + accessToken // 헤더명 수정
              },
              beforeSend: function beforeSend(xhr) {
                xhr.setRequestHeader('Authorization', accessToken); // 헤더명 수정
              },
              success: function success(boardResponse) {
                console.log(boardResponse);
                $(".like-count").text(boardResponse.data + "명이 관심있음");
                // location.reload(); // 페이지 리로드
              },
              error: function error(jqXHR) {
                var commentResponse = jqXHR.responseJSON;
                var commentResponseText = jqXHR.responseText;
                if (commentResponse != null) {
                  alert(commentResponse.message);
                } else {
                  alert(commentResponseText);
                }
              }
            });
          },
          error: function error(jqXHR) {
            var commentResponse = jqXHR.responseJSON;
            var commentResponseText = jqXHR.responseText;
            if (commentResponse != null) {
              alert(commentResponse.message);
            } else {
              alert(commentResponseText);
            }
          }
        });
      });

      //좋아요 개수 조회
      $.ajax({
        url: "".concat(window.SERVER_URL, "/performances/").concat(performanceId, "/likes-count"),
        type: 'GET',
        contentType: 'application/json',
        xhrFields: {
          withCredentials: true // 필요 시 추가
        },
        crossDomain: true,
        headers: {
          'Authorization': 'Bearer ' + accessToken // 헤더명 수정
        },
        beforeSend: function beforeSend(xhr) {
          xhr.setRequestHeader('Authorization', accessToken); // 헤더명 수정
        },
        success: function success(boardResponse) {
          console.log(boardResponse);
          $(".like-count").text(boardResponse.data + "명이 관심있음");
          // location.reload(); // 페이지 리로드
        },
        error: function error(jqXHR) {
          var commentResponse = jqXHR.responseJSON;
          var commentResponseText = jqXHR.responseText;
          if (commentResponse != null) {
            alert(commentResponse.message);
          } else {
            alert(commentResponseText);
          }
        }
      });

      //댓글 작성 버튼이 생긴 후, 클릭 효과 주기
      $("#commentBtn").on('click', function () {
        $(".comment.create-comment").show();
      });
      $("#cancelBtn").on('click', function () {
        $(".comment.create-comment").hide();
      });

      //별 클릭 효과
      var selectedRate = 0;
      var isClicked = false;
      $('.star-wrapper img').hover(function () {
        if (!isClicked) {
          var rate = $(this).data('rate');
          $('.star-wrapper img').each(function () {
            if ($(this).data('rate') <= rate) {
              $(this).attr('src', 'https://ifh.cc/g/dQCKxt.png');
            } else {
              $(this).attr('src', 'https://ifh.cc/g/9HJY7N.png');
            }
          });
        }
      }, function () {
        if (!isClicked) {
          // 마우스가 벗어났을 때 고정된 이미지를 제외하고 초기화
          $('.star-wrapper img').each(function () {
            if ($(this).data('rate') <= selectedRate) {
              $(this).attr('src', 'https://ifh.cc/g/dQCKxt.png');
            } else {
              $(this).attr('src', 'https://ifh.cc/g/9HJY7N.png');
            }
          });
        }
      });

      // 클릭 시 고정
      $('.star-wrapper img').click(function () {
        selectedRate = $(this).data('rate');
        isClicked = true;
        $('.star-wrapper img').removeClass('selected');
        $(this).addClass('selected');
        $('.star-wrapper img').each(function () {
          if ($(this).data('rate') <= selectedRate) {
            $(this).attr('src', 'https://ifh.cc/g/dQCKxt.png');
          } else {
            $(this).attr('src', 'https://ifh.cc/g/9HJY7N.png');
          }
        });
      });

      // [댓글 조회]
      $.ajax({
        url: "".concat(window.SERVER_URL, "/performances/").concat(performanceId, "/comments"),
        type: 'GET',
        success: function success(CommentResponseDto) {
          console.log(CommentResponseDto);
          var comments = CommentResponseDto.data;
          var commnetListDiv = $('.comment-list-wrapper');
          $(".comment-count").text(comments.length);
          commnetListDiv.empty();
          comments.forEach(function (comment, index) {
            var commentElement = "\n                            <div class=\"comment\">\n                                <div class=\"comment-header\">\n                                    <div class=\"comment-rate\" data-rate=\"".concat(comment.rate, "\"></div>\n                                    <div class=\"user-info-wrapper\">\n                                        <span>").concat(comment.nickname, "</span>\n                                        <div class=\"border-line\" style=\"margin: 0;\"></div>\n                                        <span>").concat(comment.createdAt, "</span>\n                                    </div>\n                                </div>\n                                <p class=\"comment-title\">").concat(comment.title, "</p>\n                                <p class=\"comment-description\">").concat(comment.description, "</p>\n                            </div>\n                        ");
            commnetListDiv.append(commentElement);
          });
        },
        error: function error(xhr) {
          var perforamceTodayResponse = JSON.parse(xhr.responseText);
          console.log(perforamceTodayResponse.message);
        }
      });

      //댓글 생성
      $('#createCommentBtn').click(function () {
        console.log(selectedRate);
        var requestData = {
          title: $('#commentTitle').val(),
          description: $('#commentDescription').val(),
          rate: selectedRate
        };
        $.ajax({
          url: "".concat(window.SERVER_URL, "/performances/").concat(performanceId, "/comments"),
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(requestData),
          xhrFields: {
            withCredentials: true // 필요 시 추가
          },
          crossDomain: true,
          headers: {
            'Authorization': 'Bearer ' + accessToken // 헤더명 수정
          },
          beforeSend: function beforeSend(xhr) {
            xhr.setRequestHeader('Authorization', accessToken); // 헤더명 수정
          },
          success: function success(commentCreateResponse) {
            console.log(commentCreateResponse);
            alert(commentCreateResponse.message);
            location.reload(); // 페이지 리로드
          },
          error: function error(jqXHR) {
            var commentResponse = jqXHR.responseJSON;
            var commentResponseText = jqXHR.responseText;
            if (commentResponse != null) {
              alert(commentResponse.message);
            } else {
              alert(commentResponseText);
            }
          }
        });
      });
    },
    error: function error(xhr) {
      var perforamceTodayResponse = JSON.parse(xhr.responseText);
      console.log(perforamceTodayResponse.message);
    }
  });

  //예약하기 스크롤에 맞게 따라오기
  // 예약하기 스크롤에 맞게 따라오기
  var $parentWrapper = $('.parent-wrapper');
  var $sessionWrapper = $('.session-info-wrapper');

  // // DOM 요소가 존재하는지 확인
  // if ($parentWrapper.length && $sessionWrapper.length) {
  //     var parentTop = $parentWrapper.offset().top;
  //     var parentHeight = $parentWrapper.height();
  //     var sessionHeight = $sessionWrapper.height();

  //     $(window).on('scroll', function () {
  //         var scrollPosition = $(window).scrollTop();
  //         var maxScroll = parentTop + parentHeight - sessionHeight - 70; // 부모 요소의 범위 내에서 스크롤 가능한 최대 값

  //         if (scrollPosition >= parentTop && scrollPosition <= maxScroll) {
  //             $sessionWrapper.css({
  //                 'top': (scrollPosition - parentTop + 70) + 'px'
  //             });
  //         } else if (scrollPosition < parentTop) {
  //             $sessionWrapper.css({
  //                 'top': '70px'
  //             });
  //         } else {
  //             $sessionWrapper.css({
  //                 'top': (parentHeight - sessionHeight) + 'px'
  //             });
  //         }
  //     });
  // } else {
  //     console.error("parent-wrapper 또는 session-info-wrapper 요소를 찾을 수 없습니다.");
  // }
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56980" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/components/performance.js"], null)
//# sourceMappingURL=/performance.bd0ebeec.js.map