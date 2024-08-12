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
})({"../src/components/performance-genre.js":[function(require,module,exports) {
$(document).ready(function () {
  // 현재 페이지의 URL에서 장르 부분을 추출하고 대문자로 변환하는 함수
  function extractAndTransformGenreType() {
    var path = window.location.pathname;
    var genreType = path.split('/')[3]; // '/performances/festival'에서 'festival'을 추출
    return genreType.toUpperCase(); // 'festival'을 'FESTIVAL'로 변환
  }

  // 장르 타입을 추출하고 대문자로 변환
  var genreType = extractAndTransformGenreType();

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
        return '공연';
      // 기본값 설정
    }
  }
  $(".sale-title").text("할인 중인 " + getKoreanGenreName(genreType));

  //[ 장르별 랭킹 조회 ]
  $.ajax({
    url: "".concat(window.SERVER_URL, "/performances/ranking?genre=").concat(genreType, "&page=1&size=10"),
    type: 'GET',
    success: function success(PerformanceGenreRankResponseDto) {
      console.log(PerformanceGenreRankResponseDto);
      var performances = PerformanceGenreRankResponseDto.data;
      var performanceListFlexDiv = $('.performance-list-genre');
      performanceListFlexDiv.empty();
      performances.forEach(function (performance, index) {
        var genreRankElement = "\n                <a href=\"/performances/".concat(performance.id, "\">\n                    <div class=\"performance-info\" data-id=\"").concat(performance.id, "\">\n                    <div class=\"image-wrapper\">\n                        <span class=\"rank absolute fs-28\">").concat(index + 1, "</span>\n                        <img src=\"").concat(performance.imageUrl, "\">\n                    </div>\n                    <p class=\"performance-title fs-17 bold\">").concat(performance.title, "</p>\n                    \n                    </div>\n                </a>\n            ");
        performanceListFlexDiv.append(genreRankElement);
      });
      $.getScript('/genre-rank-swiper.0be238a9.js').done(function (script, textStatus) {
        console.log('genre-rank-swiper.js 스크립트가 성공적으로 로드되었습니다.');
      }).fail(function (jqxhr, settings, exception) {
        console.log('genre-rank-swiper.js 스크립트 로드에 실패했습니다.');
      });
    },
    error: function error(xhr) {
      var perforamceTodayResponse = JSON.parse(xhr.responseText);
      console.log(perforamceTodayResponse.message);
    }
  });

  //[ 할인 중 조회 ]
  function loadSalePerformances(page) {
    $.ajax({
      url: "".concat(window.SERVER_URL, "/performances/genre/discount?genre=").concat(genreType, "&page=").concat(page, "&size=5"),
      type: 'GET',
      success: function success(PerformanceDiscountResponseDto) {
        console.log(PerformanceDiscountResponseDto);
        var performances = PerformanceDiscountResponseDto.data;
        var performanceListGridDiv = $('.performance-list-grid.sale');
        performanceListGridDiv.empty();
        performances.forEach(function (performance, index) {
          // 할인된 가격 계산
          var discountedPrice = (performance.price * (100 - performance.discountRate) * 0.01).toFixed(0);
          // 천 단위 쉼표 추가
          var formattedPrice = Number(discountedPrice).toLocaleString();
          var genreRankElement = "\n                    <a href=\"/performances/".concat(performance.id, "\">\n                        <div class=\"performance-info\" data-id=\"").concat(performance.id, "\">\n                                <div class=\"image-wrapper\">\n                                    <img src=\"").concat(performance.imageUrl, "\">\n                                </div>\n                                <p class=\"performance-title fs-17 bold\">").concat(performance.title, "</p>\n                                <p class=\"venue-location fs-15 medium\">").concat(performance.venueName, "</p>\n                                <p class=\"performance-date fs-15 medium\">").concat(performance.startAt, "</p>\n                                <div class=\"sale-wrapper\">\n                                <p class=\"performance-discount-rate fs-17 black\">").concat(performance.discountRate, "%</p>\n                                <p class=\"performance-price fs-17 black\">").concat(formattedPrice, "\uC6D0</p>\n                                </div>\n                        </div>\n                                </a>\n                    ");
          performanceListGridDiv.append(genreRankElement);
        });
      },
      error: function error(xhr) {
        var perforamceTodayResponse = JSON.parse(xhr.responseText);
        console.log(perforamceTodayResponse.message);
      }
    });
  }

  //[ 오픈 예정 조회 ]
  function loadOpenSoonPerformances(page) {
    $.ajax({
      url: "".concat(window.SERVER_URL, "/performances/genre/will-be-opened?genre=").concat(genreType, "&page=").concat(page, "&size=5"),
      type: 'GET',
      success: function success(PerformanceDiscountResponseDto) {
        console.log(PerformanceDiscountResponseDto);
        var performances = PerformanceDiscountResponseDto.data;
        var performanceListGridDiv = $('.performance-list-grid.open-soon');
        performanceListGridDiv.empty();
        performances.forEach(function (performance, index) {
          // "2024-07-26-19:00" 형식에서 시간 부분만 추출
          var openTime = performance.openAt.split('-').pop();
          var openDateTime = new Date(performance.openAt.replace(/-/g, '/')); // Date 객체 생성
          var now = new Date(); // 현재 시간

          // 현재 시간이 openAt 시간을 지났는지 확인
          var isOpen = now >= openDateTime ? 'open' : '';
          var genreRankElement = "\n                    <a href=\"/performances/".concat(performance.id, "\">\n                            <div class=\"performance-info\" data-id=\"").concat(performance.id, "\">\n                                    <div class=\"image-wrapper\">\n                                        <div class=\"before-wrapper\">\n                                            <span class=\"today\">\uC624\uD508\uAE4C\uC9C0</span>\n                                            <span class=\"open-time fs-28\">").concat(openTime, "</span>\n                                        </div>\n                                        <img src=\"").concat(performance.imageUrl, "\">\n                                    </div>\n                                    <p class=\"performance-title fs-17 bold\">").concat(performance.title, "</p>\n                                    <p class=\"venue-location fs-15 medium\">").concat(performance.venueName, "</p>\n                                    <p class=\"performance-date fs-15 medium\">").concat(performance.startAt, "</p>\n                                    </div>\n                                    </a>\n                        ");
          performanceListGridDiv.append(genreRankElement);

          // 카운트다운 업데이트 함수
          function updateCountdown() {
            var now = new Date();
            var timeDifference = openDateTime - now;
            if (timeDifference > 0) {
              var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
              var hours = Math.floor(timeDifference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
              var minutes = Math.floor(timeDifference % (1000 * 60 * 60) / (1000 * 60));
              var seconds = Math.floor(timeDifference % (1000 * 60) / 1000);
              var countdownText = "".concat(days, "\uC77C ").concat(hours, "\uC2DC\uAC04 ").concat(minutes, "\uBD84 ").concat(seconds, "\uCD08");
              $(".open-time").text(countdownText);
            } else {}
          }

          // 1초마다 카운트다운 업데이트
          setInterval(updateCountdown, 1000);

          // 초기 카운트다운 업데이트
          updateCountdown();
          if (isOpen) {
            $(".before-wrapper").hide();
          } else {
            $(".before-wrapper").show();
            $('.performance-info').hover(function () {
              $(this).find('.before-wrapper').fadeOut(100);
            }, function () {
              $(this).find('.before-wrapper').fadeIn(100);
            });
          }
        });
      },
      error: function error(xhr) {
        var perforamceTodayResponse = JSON.parse(xhr.responseText);
        console.log(perforamceTodayResponse.message);
      }
    });
  }
  loadSalePerformances(1);
  loadOpenSoonPerformances(1);
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62807" + '/');
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/components/performance-genre.js"], null)
//# sourceMappingURL=/performance-genre.3adda65e.js.map