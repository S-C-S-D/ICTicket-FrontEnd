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
})({"../src/components/home.js":[function(require,module,exports) {
$(document).ready(function () {
  //[ 메인 배너 ]
  $.ajax({
    url: "".concat(window.SERVER_URL, "/banners?bannerType=MAIN"),
    type: 'GET',
    success: function success(PerformanceGenreRankResponseDto) {
      console.log(PerformanceGenreRankResponseDto);
      var performances = PerformanceGenreRankResponseDto.data;
      var performanceListFlexDiv = $('.performance-list-genre');

      // performanceListFlexDiv.empty();

      // performances.forEach((performance, index) => {
      //         const genreRankElement = `
      //                 <div class="performance-info" data-id="${performance.id}">
      //                     <div class="image-wrapper">
      //                         <span class="rank absolute fs-28">${index + 1}</span>
      //                         <img src="${performance.imageUrl}">
      //                     </div>
      //                     <p class="performance-title fs-17 bold">${performance.title}</p>
      //                     <p class="venue-location fs-15 medium">${performance.ㅍ}</p>
      //                     <p class="performance-date fs-15 medium">${performance.startAt}</p>
      //                 </div>
      //             `;
      //         performanceListFlexDiv.append(genreRankElement);
      // });
    },
    error: function error(xhr) {
      var perforamceTodayResponse = JSON.parse(xhr.responseText);
      console.log(perforamceTodayResponse.message);
    }
  });

  //[ 오늘 오픈 ]
  function loadPerformances(page) {
    $.ajax({
      url: "".concat(window.SERVER_URL, "/performances/today-open?page=").concat(page, "&size=10"),
      type: 'GET',
      success: function success(PerforamceTodayResponseDto) {
        console.log(PerforamceTodayResponseDto);
        var performances = PerforamceTodayResponseDto.data;
        var performanceListGridDiv = $('.main-today-open > .performance-list-grid');
        performanceListGridDiv.empty();
        performances.forEach(function (performance) {
          // "2024-07-26-19:00" 형식에서 시간 부분만 추출
          var openTime = performance.openAt.split('-').pop();
          var todayOpenElement = "\n                            <div class=\"performance-info\" data-id=\"".concat(performance.id, "\">\n                                <a href=\"/performances/").concat(performance.id, "\">\n                                    <div class=\"image-wrapper today-open-temp\">\n                                        <div class=\"before-wrapper\">\n                                            <span class=\"today\">\uC624\uB298</span>\n                                            <span class=\"open-time absolute fs-28\">").concat(openTime, "</span>\n                                        </div>\n                                        <img src=\"").concat(performance.imageUrl, "\">\n                                    </div>\n                                </a>\n                                <p class=\"performance-title fs-17 bold\">").concat(performance.title, "</p>\n                                <p class=\"venue-location fs-15 medium\">").concat(performance.venueName, "</p>\n                                <p class=\"performance-date fs-15 medium\">").concat(performance.startAt, "</p>\n                            </div>\n                        ");
          performanceListGridDiv.append(todayOpenElement);
        });
      },
      error: function error(xhr) {
        var perforamceTodayResponse = JSON.parse(xhr.responseText);
        console.log(perforamceTodayResponse.message);
      }
    });
  }

  //[ 추천 티켓 ]
  function loadRecommandPerformances(page) {
    $.ajax({
      url: "".concat(window.SERVER_URL, "/performances/recommend?page=").concat(page, "&size=4"),
      type: 'GET',
      success: function success(PerformanceRecommendResponseDto) {
        console.log(PerformanceRecommendResponseDto);
        var performances = PerformanceRecommendResponseDto.data;
        var performanceListGridDiv = $('.main-recommand > .performance-list-grid');
        performanceListGridDiv.empty();
        performances.forEach(function (performance) {
          var todayOpenElement = "\n                            <div class=\"performance-info\" data-id=\"".concat(performance.id, "\">\n                                <a href=\"/performances/").concat(performance.id, "\">\n                                    <div class=\"image-wrapper\">\n                                        <img src=\"").concat(performance.imageUrl, "\">\n                                    </div>\n                                </a>\n                                <p class=\"performance-title fs-17 bold\">").concat(performance.title, "</p>\n                                <p class=\"venue-location fs-15 medium\">").concat(performance.venueName, "</p>\n                                <p class=\"performance-date fs-15 medium\">").concat(performance.startAt, "</p>\n                            </div>\n                        ");
          performanceListGridDiv.append(todayOpenElement);
        });
      },
      error: function error(xhr) {
        var performanceRecommendResponse = JSON.parse(xhr.responseText);
        console.log(performanceRecommendResponse.message);
      }
    });
  }

  //[ 장르별 랭킹 ]
  function loadRankingPerformances(genreType) {
    $.ajax({
      url: "".concat(window.SERVER_URL, "/performances/ranking?genre=").concat(genreType, "&page=1&size=10"),
      type: 'GET',
      success: function success(PerformanceGenreRankResponseDto) {
        console.log(PerformanceGenreRankResponseDto);
        var performances = PerformanceGenreRankResponseDto.data;
        var performanceListFlexDiv = $('.performance-list-genre');
        performanceListFlexDiv.empty();
        performances.forEach(function (performance, index) {
          var genreRankElement = "\n                                <div class=\"performance-info\" data-id=\"".concat(performance.id, "\">\n                                    <a href=\"/performances/").concat(performance.id, "\">\n                                        <div class=\"image-wrapper\">\n                                            <span class=\"rank absolute fs-28\">").concat(index + 1, "</span>\n                                            <img src=\"").concat(performance.imageUrl, "\">\n                                        </div>\n                                    </a>\n                                    <p class=\"performance-title fs-17 bold\">").concat(performance.title, "</p>\n                                    <p class=\"venue-location fs-15 medium\">").concat(performance.venueName, "</p>\n                                    <p class=\"performance-date fs-15 medium\">").concat(performance.startAt, "</p>\n                                </div>\n                            ");
          performanceListFlexDiv.append(genreRankElement);
        });
        $.getScript('/main-rank-swiper.98f54644.js').done(function (script, textStatus) {
          console.log('main-rank-swiper.js 스크립트가 성공적으로 로드되었습니다.');
        }).fail(function (jqxhr, settings, exception) {
          console.log('main-rank-swiper.js 스크립트 로드에 실패했습니다.');
        });
      },
      error: function error(xhr) {
        var perforamceTodayResponse = JSON.parse(xhr.responseText);
        console.log(perforamceTodayResponse.message);
      }
    });
  }

  // [ 오늘 오픈 / 추천 티켓 ] 호출
  loadPerformances(1);
  loadRecommandPerformances(1);
  loadRankingPerformances("CONCERT");

  //[ page 버튼 클릭 시, 어떤 컨테이너 안에서 눌린 넘버인지 확인하는 메서드 ]
  function setupPagination(containerSelector, loadFunction) {
    $(containerSelector).on('click', '.page-num', function () {
      console.log("test");
      var pageNumber = $(this).text();
      $(containerSelector + ' > .page-wrapper > .page-num').removeClass('active');
      $(this).addClass('active');
      loadFunction(pageNumber);
    });
  }
  setupPagination('.main-today-open', loadPerformances);
  setupPagination('.main-recommand', loadRecommandPerformances);

  // 장르별 인기순위 장르 버튼 클릭 시, active 주기
  $('.genre-btn').on('click', function () {
    var genreType = $(this).data('genre');
    var isActive = $(this).hasClass('active');
    $('.genre-btn').removeClass('active');
    $(this).addClass('active');
    loadRankingPerformances(genreType);
    if (!isActive) {
      $('.slider-wrapper').css('transform', 'translateX(0)');
    }
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/components/home.js"], null)
//# sourceMappingURL=/home.2b8308a2.js.map