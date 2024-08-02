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
})({"../src/components/session.js":[function(require,module,exports) {
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
$(document).ready(function () {
  // URL에서 performanceId 추출
  var pathParts = window.location.pathname.split('/');
  var performanceId = pathParts[pathParts.indexOf('performances') + 1];
  var accessToken = localStorage.getItem('Authorization');

  // 초기 상태 메시지
  function updateSeatCountMessage() {
    if (!$('.date.active').length || !$('.session.active').length) {
      $(".seat-text").text("날짜와 시간을 선택해 주세요");
      $(".seat-count").text("");
      $(".reserveBtn").addClass("disabled");
    }
  }

  // 두 요소가 모두 활성화되었는지 확인하여 seat-text의 margin-right를 업데이트하는 함수
  function updateSeatTextMargin() {
    if ($('.date.active').length && $('.session.active').length) {
      $(".seat-text").css("margin-right", "50px");
      $(".reserveBtn").removeClass("disabled");
    } else {
      $(".seat-text").css("margin-right", "");
    }
  }

  // [세션 조회]
  $.ajax({
    url: "http://localhost:8080/performances/".concat(performanceId, "/sessions"),
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
      var sessions = boardResponse.data;
      var dates = {};

      // 날짜별로 세션을 그룹화
      sessions.forEach(function (session) {
        if (!dates[session.date]) {
          dates[session.date] = [];
        }
        dates[session.date].push(session);
      });

      // 날짜를 "2024년 08월 07일 수요일" 형식으로 변환하는 함수
      function formatDate(dateString) {
        var date = new Date(dateString);
        var options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long'
        };
        return date.toLocaleDateString('ko-KR', options);
      }

      // 시간을 "오후 12시 00분" 형식으로 변환하는 함수
      function formatTime(timeString) {
        var _timeString$split$map = timeString.split(':').map(Number),
          _timeString$split$map2 = _slicedToArray(_timeString$split$map, 2),
          hour = _timeString$split$map2[0],
          minute = _timeString$split$map2[1];
        var period = hour >= 12 ? '오후' : '오전';
        var adjustedHour = hour % 12 || 12;
        return "".concat(period, " ").concat(String(adjustedHour).padStart(2, '0'), "\uC2DC ").concat(String(minute).padStart(2, '0'), "\uBD84");
      }

      // 날짜를 HTML에 추가
      for (var date in dates) {
        var formattedDate = formatDate(date);
        $('.date-list-wrapper').append("<span class=\"date\" data-date=\"".concat(date, "\">").concat(formattedDate, "</span>"));
      }

      // 날짜 클릭 이벤트 핸들러
      $('.date-list-wrapper').on('click', '.date', function () {
        var selectedDate = $(this).attr('data-date');

        // 모든 날짜에서 active 클래스 제거하고, 클릭한 날짜에만 추가
        $('.date').removeClass('active');
        $(this).addClass('active');

        // 선택한 날짜에 맞는 세션을 session-list-wrapper에 추가
        var selectedSessions = dates[selectedDate];
        $('.session-list-wrapper').empty();
        selectedSessions.forEach(function (session) {
          var formattedTime = formatTime(session.time);
          $('.session-list-wrapper').append("<span class=\"session\" data-id=\"".concat(session.id, "\">").concat(session.name, "\uD68C\uCC28 - ").concat(formattedTime, "</span>"));
        });

        // 첫 번째 세션을 기본적으로 선택된 상태로 설정
        // $('.session').first().click();

        // 좌석 메시지 업데이트
        updateSeatCountMessage();

        // seat-text margin-right 업데이트
        updateSeatTextMargin();
      });

      // 세션 클릭 이벤트 핸들러
      $('.session-list-wrapper').on('click', '.session', function () {
        // 모든 세션에서 active 클래스 제거하고, 클릭한 세션에만 추가
        $('.session').removeClass('active');
        $(this).addClass('active');
        var sessionId = $(this).attr('data-id');
        $(".reserveBtn").attr('data-session-id', sessionId);
        $(".reserveBtn").attr('data-performance-title', $(".performance-title").text());
        $(".reserveBtn").attr('data-date', $(".date.active").text());
        $(".reserveBtn").attr('data-time', $(".session.active").text());

        // 클릭한 세션의 data-id 값을 이용하여 AJAX 요청
        $.ajax({
          url: "http://localhost:8080/performances/".concat(performanceId, "/sessions/").concat(sessionId, "/seat-count"),
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
          success: function success(seatCount) {
            console.log(seatCount);
            var seatCountData = seatCount.data;
            $(".seat-text").text("잔여 좌석 개수");
            $(".seat-count").text(seatCountData.restSeatCount + "/" + seatCountData.totalSeatCount);
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

        // seat-text margin-right 업데이트
        updateSeatTextMargin();
      });

      // 초기 상태로 첫 번째 날짜를 선택한 상태로 설정
      $('.date').first().click();
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
  $('.reserveBtn').on('click', function () {
    if ($(this).hasClass("disabled") || $(this).hasClass("lock-btn")) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    $(".popup").show();
    var sessionId = $(this).attr('data-session-id');
    var performanceTitle = $(this).attr('data-performance-title');
    var dateInfo = $(this).attr('data-date');
    var timeInfo = $(this).attr('data-time');
    $.ajax({
      url: "http://localhost:8080/performances/".concat(performanceId, "/sessions/").concat(sessionId, "/seats"),
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
      success: function success(seatCount) {
        console.log(seatCount);
        $(".container > .cover").show();
        $(".performance-order-title").text(performanceTitle);
        $(".performance-order-date").text(dateInfo);
        $(".performance-order-time").text(timeInfo);
        // $(".footer").hide()
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
  // 초기 메시지 설정
  updateSeatCountMessage();
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51748" + '/');
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/components/session.js"], null)
//# sourceMappingURL=/session.3ad098d1.js.map