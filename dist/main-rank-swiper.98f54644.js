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
})({"../src/components/main-rank-swiper.js":[function(require,module,exports) {
$(document).ready(function () {
  var $container = $('.main-genre-ranking > .slider-container-rank > .slider-wrapper');
  var $btnLeft = $('.main-genre-ranking > .slider-container-rank > .nav-button.left');
  var $btnRight = $('.main-genre-ranking > .slider-container-rank > .nav-button.right');
  var $dotsContainer = $('.dots-container');
  var currentIndex = 0;
  var itemsToShow = 5;
  var gap = parseInt($('.performance-list-genre').css('gap')) || 0;
  var updateSliderPosition = function updateSliderPosition() {
    var $items = $container.find('.performance-info'); // 슬라이더 아이템 재초기화
    var itemWidth = $items.first().outerWidth() + gap;
    $container.css('transform', "translateX(-".concat(currentIndex * itemWidth, "px)"));
    updateButtonStates();
    updateDots();
  };
  var updateButtonStates = function updateButtonStates() {
    var $items = $container.find('.performance-info'); // 슬라이더 아이템 재초기화
    $btnLeft.prop('disabled', currentIndex <= 0);
    $btnRight.prop('disabled', currentIndex >= $items.length - itemsToShow);
  };
  var createDots = function createDots() {
    $dotsContainer.empty(); // 기존 dot 제거
    var $items = $container.find('.performance-info'); // 슬라이더 아이템 재초기화
    var totalDots = Math.ceil($items.length / itemsToShow);
    for (var i = 0; i < totalDots; i++) {
      var $dot = $('<div>').addClass('dot-rank').data('index', i);
      if (i === 0) $dot.addClass('active');
      $dotsContainer.append($dot);
    }
    // 추가 dot 생성
    var additionalDots = $items.length - 4 - totalDots;
    for (var _i = 0; _i < additionalDots; _i++) {
      var $extraDot = $('<div>').addClass('dot-rank').data('index', totalDots + _i);
      $dotsContainer.append($extraDot);
    }
  };
  var updateDots = function updateDots() {
    $('.dot-rank').removeClass('active');
    $('.dot-rank').eq(currentIndex).addClass('active');
  };
  $dotsContainer.off('click', '.dot-rank'); // 기존 이벤트 핸들러 제거
  $dotsContainer.on('click', '.dot-rank', function () {
    var index = $(this).data('index');
    if (index !== undefined) {
      currentIndex = index;
      updateSliderPosition();
    }
  });
  $btnRight.off('click'); // 기존 이벤트 핸들러 제거
  $btnRight.on('click', function () {
    var $items = $container.find('.performance-info'); // 슬라이더 아이템 재초기화
    if (currentIndex < $items.length - itemsToShow) {
      currentIndex++;
      updateSliderPosition();
    }
  });
  $btnLeft.off('click'); // 기존 이벤트 핸들러 제거
  $btnLeft.on('click', function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });
  var startX,
    isDragging = false;
  $container.off('mousedown'); // 기존 이벤트 핸들러 제거
  $container.on('mousedown', function (e) {
    startX = e.pageX;
    isDragging = true;
    e.preventDefault(); // 기본 드래그 앤 드롭 기능 비활성화
  });
  $(document).off('mouseup'); // 기존 이벤트 핸들러 제거
  $(document).on('mouseup', function (e) {
    if (isDragging) {
      isDragging = false;
      // 드래그 거리가 50px 이상일 때만 이동
      var endX = e.pageX;
      var diff = startX - endX;
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
  $container.on('mousemove', function (e) {
    if (isDragging) {
      e.preventDefault(); // 기본 드래그 앤 드롭 기능 비활성화
    }
  });

  // 초기화 작업
  createDots();
  updateSliderPosition();

  // 윈도우 리사이즈 시 슬라이더 재초기화
  $(window).off('resize'); // 기존 이벤트 핸들러 제거
  $(window).on('resize', function () {
    updateSliderPosition();
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53857" + '/');
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/components/main-rank-swiper.js"], null)
//# sourceMappingURL=/main-rank-swiper.98f54644.js.map