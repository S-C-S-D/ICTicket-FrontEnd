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
})({"../src/components/mypage.js":[function(require,module,exports) {
$(document).ready(function () {
  var accessToken = localStorage.getItem('Authorization');
  //프로필 불러오기
  $.ajax({
    url: "".concat(window.SERVER_URL, "/users/profile"),
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
    success: function success(userProfileResponseDto) {
      console.log(userProfileResponseDto);
      var userData = userProfileResponseDto.data;
      var commnetListDiv = $('.user-profile');
      commnetListDiv.empty();
      var userDataElement = "\n                <div class=\"flex-group\">\n                <img src=\"https://ifh.cc/g/7kQYpA.png\">\n                    <div class=\"user-info-wrap\">\n                        <span class=\"user-nickname\">".concat(userData.nickname, "</span>\n                        <span class=\"user-email\">").concat(userData.email, "</span>\n                        <span class=\"user-address\">").concat(userData.address, "</span>\n                        <span class=\"user-phonenumber\">").concat(userData.phoneNumber, "</span>\n                    </div>\n                </div>\n                <div class=\"order-count-wrap\">\n                    <span class=\"order-count\">").concat(userData.orderCount, "</span>\n                    <span class=\"order-text\">\uC608\uB9E4\uB0B4\uC5ED</span>\n                </div>\n            ");
      commnetListDiv.append(userDataElement);
      loadOrders(userData.id);
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

  // 예매내역 불러오기 함수
  function loadOrders(userId) {
    $.ajax({
      url: "".concat(window.SERVER_URL, "/users/").concat(userId, "/orders"),
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
      success: function success(orderResponseDto) {
        console.log(orderResponseDto);
        var orders = orderResponseDto.data;
        var orderListDiv = $('.row-table-wrapper');
        orderListDiv.empty();
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
        function getKoreanOrderStatus(orderStatus) {
          switch (orderStatus) {
            case 'SUCCESS':
              return '결제완료';
            case 'CANCEL':
              return '결제취소';
            default:
              return '상태없음';
            // 기본값 설정
          }
        }
        orders.forEach(function (order, index) {
          var sessionDateTime = "".concat(order.sessionDate, " ").concat(order.sessionTime.slice(0, 5));
          var genreRankElement = "\n                        <div class=\"row-wrapper\">\n                            <div class=\"row date\">".concat(order.orderDate, "</div>\n                            <a href=\"/performances/").concat(order.performanceId, "\">\n                            <div class=\"row title\" data-id=\"\">\n                                <img class=\"performance-image\" src=\"").concat(order.imageUrl, "\">\n                                <div class=\"info-wrapper\">\n                                    <span class=\"performance-genre\">").concat(getKoreanGenreName(order.genreType), "</span>\n                                    <span class=\"performance-title\">").concat(order.title, "</span>\n                                    <span class=\"performance-date\">").concat(order.startAt + " ~ " + order.endAt, "</span>\n                                    <span class=\"performance-venue\">").concat(order.address, "</span>\n                                </div>\n                            </div>\n                            </a>\n                            <div class=\"row info\">\n                                <div class=\"info-wrapper\">\n                                    <div class=\"info-wrap\">\n                                        <span class=\"info-title\">\uC608\uC57D\uBC88\uD638</span>\n                                        <span class=\"info-detail view-date\">").concat(order.orderNumber, "</span>\n                                    </div>\n                                    <div class=\"info-wrap\">\n                                        <span class=\"info-title\">\uAD00\uB78C\uC77C</span>\n                                        <span class=\"info-detail\">").concat(sessionDateTime, "</span>\n                                    </div>\n                                    <div class=\"info-wrap\">\n                                        <span class=\"info-title\">\uB9E4\uC218</span>\n                                        <span class=\"info-detail\">").concat(order.ticketCount, "</span>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"row reserve\">\n                                <div class=\"status-wrap\">\n                                    <span class=\"order-status\">").concat(getKoreanOrderStatus(order.orderStatus), "</span>\n                                    <div class=\"cancelBtn\" data-id=\"").concat(order.orderId, "\">\n                                        \uCDE8\uC18C\uD558\uAE30\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    ");
          orderListDiv.append(genreRankElement);
          if (order.orderStatus == "CANCEL") {
            orderListDiv.find(".cancelBtn[data-id=\"".concat(order.orderId, "\"]")).hide();
          }
        });
        $('.cancelBtn').click(function () {
          var orderId = $(this).data('id');
          var confirmCancel = confirm("예매를 취소하시겠습니까?");
          if (confirmCancel) {
            $.ajax({
              url: "".concat(window.SERVER_URL, "/users/orders/").concat(orderId),
              type: 'PATCH',
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
              success: function success(userProfileResponseDto) {
                console.log(userProfileResponseDto);
                alert("예매가 취소되었습니다.");
                loadOrders(userId); // 목록을 다시 불러와서 갱신
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
          }
        });
      },
      error: function error(jqXHR) {
        var orderResponse = jqXHR.responseJSON;
        var orderResponseText = jqXHR.responseText;
        if (orderResponse != null) {
          alert(orderResponse.message);
        } else {
          alert(orderResponseText);
        }
      }
    });
  }
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../src/components/mypage.js"], null)
//# sourceMappingURL=/mypage.52adec26.js.map