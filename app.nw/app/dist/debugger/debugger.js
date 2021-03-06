"use strict";
function init() {
    function e(e, n, t, r) {
        t
            ? chrome
                .debugger
                .sendCommand(e, n, t, r)
            : chrome
                .debugger
                .sendCommand(e, n, r)
    }
    function n(e, n, t) {
        var r = e.targetId;
        u[r] && u[r].onEventCall(e, n, t)
    }
    function t(e, n) {
        var t = e.targetId;
        u[t] && (u[t].onDetachCall(e, n), delete u[t])
    }
    function r(e, n, t, r, i) {
        function d(e) {
            chrome
                .debugger
                .getTargets(function (n) {
                    e(null, n)
                })
        }
        function a(n, t) {
            var o = n.find(function (n) {
                return !!n && n.url === e.src
            });
            if (!o) 
                return void t("did not find target");
            var d = {
                targetId: o.id
            };
            chrome
                .debugger
                .attach(d, "1.1", function () {
                    u[d.targetId] = {
                        onEventCall: r,
                        onDetachCall: i
                    },
                    t(null, d)
                })
        }
        function c(e, n) {
            chrome
                .debugger
                .sendCommand(e, "DOM.enable", function () {
                    n(null, e)
                })
        }
        function l(e, n) {
            chrome
                .debugger
                .sendCommand(e, "CSS.enable", function () {
                    n(null, e)
                })
        }
        function g(e, n) {
            chrome
                .debugger
                .sendCommand(e, "Emulation.setTouchEmulationEnabled", {
                    enabled: !0,
                    configuration: "mobile"
                }, function () {
                    n(null, e)
                })
        }
        function m(e, t) {
            var r = n.webviewOffset;
            chrome
                .debugger
                .sendCommand(e, "Emulation.setDeviceMetricsOverride", {
                    width: parseInt(r.width),
                    height: parseInt(r.height),
                    deviceScaleFactor: r.dpr,
                    mobile: !0,
                    fitWindow: !1
                }, function () {
                    t(null, e)
                })
        }
        var s = [];
        s.push(d),
        s.push(a),
        s.push(c),
        s.push(l),
        s.push(g),
        s.push(m),
        o.waterfall(s, function (e, n) {
            e || t && t(n)
        })
    }
    var o = require("async"),
        u = (chrome.debugger, {});
    chrome
        .debugger
        .onEvent
        .addListener(n),
    chrome
        .debugger
        .onDetach
        .addListener(t),
    _exports = {
        start: r,
        sendCommand: e
    }
}
var _exports;
init(),
module.exports = _exports;