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
})({"../src/components/description-popup.js":[function(require,module,exports) {
$(document).ready(function () {
  //인포 마크 클릭 시, 배경, 팝업 나타나게 한 후, 데이터 입력
  $(".info-mark").on('click', function () {
    console.log("test");
    $(".description-popup").show();
    $(".cover-description").show();

    // [home] 장르별 랭킹 조회
    if ($(this).hasClass('genre-rank')) {
      //보여줄 링크
      $(".service-link").show();
      $(".queryDsl-link").show();
      $(".jpa-link").hide();

      //새로운 링크
      $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L75-L87");
      $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L22-L43");
      $(".jpa-link").attr("href", "");

      //설명글
      $(".description-popup > .popup-flex > .description").text("장르별로 인기 순 TOP 10의 공연들을 조회합니다. 인기 순위는 공연 좋아요 수와 조회수의 합산으로 정해집니다. (pagenation적용)");

      // [home] 오늘 오픈 공연 조회
    } else if ($(this).hasClass('today-open')) {
      //보여줄 링크
      $(".service-link").show();
      $(".queryDsl-link").show();
      $(".jpa-link").hide();

      //새로운 링크
      $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L89-L101");
      $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L45-L65");
      $(".jpa-link").attr("href", "");

      //설명글
      $(".description-popup > .popup-flex > .description").text("오늘 오픈하는 공연들을 조회합니다. 오픈 시간이 빠른 순으로 보여집니다.");
      // [home] 추천 티켓
    } else if ($(this).hasClass('recommend')) {
      //보여줄 링크
      $(".service-link").show();
      $(".queryDsl-link").show();
      $(".jpa-link").hide();

      //새로운 링크
      $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L155-L166");
      $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L139-L177");
      $(".jpa-link").attr("href", "");

      //설명글
      $(".description-popup > .popup-flex > .description").text("장르별로 인기 순위가 1, 2위인 공연들을 조회해옵니다. 인기 순위는 공연 좋아요 수와 조회수의 합산으로 정해집니다.");

      // [performances/genre/genreType] 추천 티켓
    } else if ($(this).hasClass('sale')) {
      //보여줄 링크
      $(".service-link").show();
      $(".queryDsl-link").show();
      $(".jpa-link").hide();

      //새로운 링크
      $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/826d401cdb1bc6215681173bb600b5d421869eb4/src/main/java/com/sparta/icticket/performance/PerformanceController.java#L76-L85");
      $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L67-L92");
      $(".jpa-link").attr("href", "");

      //설명글
      $(".description-popup > .popup-flex > .description").text("해당 장르의 할인이 진행중인 공연들을 조회합니다. 할인율이 높은 순으로 보여지며, 할인 기간이 끝난 공연은 자동으로 리스트에서 제외됩니다. (pagenation 적용)");

      // [performances/genre/genreType] 오픈 예정
    } else if ($(this).hasClass('open-soon')) {
      //보여줄 링크
      $(".service-link").show();
      $(".queryDsl-link").show();
      $(".jpa-link").hide();

      //새로운 링크
      $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/826d401cdb1bc6215681173bb600b5d421869eb4/src/main/java/com/sparta/icticket/performance/PerformanceController.java#L94-L103");
      $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L94-L115");
      $(".jpa-link").attr("href", "");

      //설명글
      $(".description-popup > .popup-flex > .description").text("해당 장르의 오늘 오픈 예정인 공연들을 조회합니다. 오픈 시간이 빠른 순으로 보여집니다. 오늘 오픈일은 티켓 판매 시작일을 의미합니다. (pagenation 적용)");
      // [performances/rank-all] 전체 랭킹
    } else if ($(this).hasClass('rank-all')) {
      //보여줄 링크
      $(".service-link").show();
      $(".queryDsl-link").show();
      $(".jpa-link").hide();

      //새로운 링크
      $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/826d401cdb1bc6215681173bb600b5d421869eb4/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L148-L152");
      $(".queryDsl-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/performance/PerformanceRepositoryQueryImpl.java#L117-L137");
      $(".jpa-link").attr("href", "");

      //설명글
      $(".description-popup > .popup-flex > .description").text("전체 공연의 인기 순위가 조회됩니다. 인기 순위는 공연 좋아요 수와 조회수의 합산으로 정해집니다. (pagenation 적용)");
      // [performances/performanceId] 단일공연
    } else if ($(this).hasClass('performance')) {
      //보여줄 링크
      $(".service-link").show();
      $(".queryDsl-link").hide();
      $(".distributed-lock-link").hide();
      $(".optimistic-lock-link").show();
      $(".jpa-link").hide();

      //새로운 링크
      $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/826d401cdb1bc6215681173bb600b5d421869eb4/src/main/java/com/sparta/icticket/performance/PerformanceService.java#L32-L73");
      $(".queryDsl-link").attr("href", "");
      $(".jpa-link").attr("href", "");
      $(".optimistic-lock-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/588be3ce950ee9a3fdcf80a9795bb0f58f478d84/src/main/java/com/sparta/icticket/performance/PerformanceRepository.java#L11-L14");

      //설명글
      $(".description-popup > .popup-flex > .description").text("단일 공연 조회 시 공연에 대한 모든 정보들을 불러옵니다. [ 장소 / 공연기간 / 공연시간 / 관람연령 / 좌석별 가격 / 공연 이미지 ]가 포함됩니다. 낙관적 락을 통하여 해당 공연 조회수를 동시성 제어 처리를 하였습니다.");

      // [performances/performanceId - comment] 댓글조회
    } else if ($(this).hasClass('comment-mark')) {
      //보여줄 링크
      $(".service-link").show();
      $(".queryDsl-link").hide();
      $(".distributed-lock-link").hide();
      $(".optimistic-lock-link").hide();
      $(".jpa-link").show();

      //새로운 링크
      $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/comment/CommentService.java#L50-L60");
      $(".queryDsl-link").attr("href", "");
      $(".jpa-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/588be3ce950ee9a3fdcf80a9795bb0f58f478d84/src/main/java/com/sparta/icticket/comment/CommentRepository.java#L10-L11");

      //설명글
      $(".description-popup > .popup-flex > .description").text("해당 공연의 댓글들을 불러옵니다.  댓글은 별점, 제목, 내용으로 이루어져 있습니다.");

      // [performances/performanceId - comment] 세션 조회 
    } else if ($(this).hasClass('session')) {
      //보여줄 링크
      $(".service-link").show();
      $(".queryDsl-link").hide();
      $(".distributed-lock-link").hide();
      $(".optimistic-lock-link").hide();
      $(".jpa-link").show();

      //새로운 링크
      $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/session/SessionService.java#L18-L39");
      $(".queryDsl-link").attr("href", "");
      $(".jpa-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/588be3ce950ee9a3fdcf80a9795bb0f58f478d84/src/main/java/com/sparta/icticket/session/SessionRepository.java#L23-L24");

      //설명글
      $(".description-popup > .popup-flex > .description").text("해당 공연의 세션들을 불러옵니다. 세션은 [ 공연날짜 / 공연회차 / 공연시간 ] 으로 이루어져있고 하나의 공연은 적어도 하나의 세션을 가지며 여러개의 세션이 존재할수있습니다.");
      // [performances/performanceId - session seat] 잔여 좌석 개수 조회
    } else if ($(this).hasClass('session-seat')) {
      //보여줄 링크
      $(".service-link").show();
      $(".queryDsl-link").hide();
      $(".distributed-lock-link").hide();
      $(".optimistic-lock-link").hide();
      $(".jpa-link").show();

      //새로운 링크
      $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/seat/SeatService.java#L36-L65");
      $(".queryDsl-link").attr("href", "");
      $(".jpa-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/588be3ce950ee9a3fdcf80a9795bb0f58f478d84/src/main/java/com/sparta/icticket/seat/SeatRepository.java#L17-L18");

      //설명글
      $(".description-popup > .popup-flex > .description").text("공연의 날짜와 시간 선택 시, 해당 공연의 각 세션 별 총 좌석 수와 남은 좌석 수를 불러옵니다.");
      // [performances/performanceId - session seat] 잔여 좌석 개수 조회
    } else if ($(this).hasClass('popup-mark')) {
      //보여줄 링크
      $(".service-link").show();
      $(".queryDsl-link").hide();
      $(".distributed-lock-link").show();
      $(".optimistic-lock-link").hide();
      $(".jpa-link").show();

      //새로운 링크
      $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/seat/SeatService.java#L52-L102");
      $(".queryDsl-link").attr("href", "");
      $(".distributed-lock-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/5f868d867924cdb7d585677fb1ebb0b850cb5743/src/main/java/com/sparta/icticket/common/config/RedissonLockAspect.java#L16-L55");
      $(".jpa-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/seat/SeatRepository.java#L26-L27");
      //설명글
      $(".description-popup > .popup-flex > .description").text("결제가 완료되지 않았으면서 결제 진행 중이 아닌 좌석을 파란색으로 보여줍니다. 제한 시간 내에 결제가 이루어지지 않은 좌석에 대해 5분마다 좌석 현황이 업데이트 됩니다. 추가적으로 분산락을 통해 동시성 제어 처리를 하였습니다.");
      // [performances/performanceId - session seat] 잔여 좌석 개수 조회
    } else if ($(this).hasClass('popup-payment-mark')) {
      //보여줄 링크
      $(".service-link").show();
      $(".queryDsl-link").hide();
      $(".distributed-lock-link").hide();
      $(".optimistic-lock-link").hide();
      $(".jpa-link").hide();

      //새로운 링크
      $(".service-link").attr("href", "https://github.com/S-C-S-D/ICTicket-BackEnd/blob/0cbfe4fd9c550b5ac33da2518f0e5ba02e74b462/src/main/java/com/sparta/icticket/order/OrderService.java#L36-L93");
      $(".queryDsl-link").attr("href", "");
      $(".distributed-lock-link").attr("href", "");
      $(".jpa-link").attr("href", "");
      //설명글
      $(".description-popup > .popup-flex > .description").text("사용자가 결제하기 버튼을 누르면 선택한 좌석의 상태가 COMPLETED로 변경됩니다. 또한, 해당 세션의 남은 좌석 수가 선택한 좌석 수만큼 감소하고 자동으로 선택한 좌석에 대한 주문이 생성된 후 좌석 하나 당 하나의 티켓이 생성됩니다.");
    }
  });
  $(".cover-description");

  //배경 클릭 시, 팝업, 배경 안보이게 처리
  $(".cover-description").on('click', function () {
    $(".description-popup").hide();
    $(".cover-description").hide();
  });
  $(".close-popup-btn").on('click', function () {
    $(".description-popup").hide();
    $(".cover-description").hide();
  });
  $(".close-popup-payment-btn").on('click', function () {
    $(".popup").hide();
    $(".popup-payment").hide();
    $(".cover").hide();
  });
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51813" + '/');
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/components/description-popup.js"], null)
//# sourceMappingURL=/description-popup.8cd9cd53.js.map