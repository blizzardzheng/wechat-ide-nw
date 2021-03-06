"use strict";
function init() {
    function e() {
        var e = c.getLastSelect();
        return e === p
    }
    var i = require("../dist/lib/react.js"),
        n = require("../dist/lib/react-dom.js"),
        t = require("../dist/common/loadInit/init.js"),
        o = require("../dist/components/ContainController.js"),
        s = require("../dist/common/proxy/startProxy.js"),
        r = require("../dist/actions/windowActions.js"),
        d = require("../dist/actions/webviewActions.js"),
        u = require("../dist/stores/webviewStores.js"),
        a = require("../dist/stores/windowStores.js"),
        c = require("../dist/stores/projectStores.js"),
        g = require("../dist/common/log/log.js"),
        l = require("../dist/common/shortCut/shortCut.js"),
        w = require("../dist/utils/syncMessage.js"),
        f = require("../dist/config/config.js"),
        p = f.SELECT_URL_TYPE,
        m = (f.SELECT_UNKNOW_TYPE, global.appConfig.isDev),
        E = a.getLastShow(),
        v = "darwin" !== process.platform;
    nw
        .App
        .on("open", function (e) {
            var i = tools.getArgsURL(e);
            if (i) {
                g.info("index.js Reopen App with url: " + i);
                var n = u.getCurrentWebviewID();
                d.getA8keyWebview(n, {
                    url: i,
                    isSync: !0,
                    from: "urlbar"
                })
            }
            nw
                .Window
                .get()
                .focus()
        }),
    nw
        .App
        .argv
        .indexOf("inspect") !== -1 && tools.openInspectWin();
    var h = tools.getArgsURL(nw.App.argv);
    h && (g.info("index.js Open App with url: " + h), d.setInitURL(h)),
    v && (l.registerCommon(), e() || "edit" !== a.getLastShow() || l.registerEdit());
    var j = void 0;
    window.addEventListener("resize", function () {
        clearTimeout(j),
        j = setTimeout(function () {
            r.resize(document.body.offsetHeight)
        }, 20)
    }),
    window.addEventListener("keydown", function (e) {
        var i = e.keyCode;
        123 === i && e.preventDefault()
    }),
    !m && !global.appConfig.isGamma && window.addEventListener("contextmenu", function (e) {
        e.preventDefault()
    }),
    Win.on("focus", function () {
        r.focus(),
        v && (l.hasCommonRegistered || l.registerCommon(), e() || "edit" !== E || l.hasEditRegistered || l.registerEdit())
    }),
    Win.on("blur", function () {
        r.blur(),
        v && (l.hasCommonRegistered && l.unRegisterCommon(), l.hasEditRegistered && l.unRegisterEdit())
    }),
    a.on("LAST_SHOW_CHANGE", function (i) {
        E = i,
        v && ("edit" === i
            ? e() || l.hasEditRegistered || l.registerEdit()
            : l.hasEditRegistered && l.unRegisterEdit())
    }),
    a.on("EDITOR_FOCUS", function () {
        v && l.hasEditRegistered && l.unRegisterEdit()
    }),
    a.on("EDITOR_BLUR", function () {
        !v || e() || l.hasEditRegistered || "edit" !== E || l.registerEdit()
    }),
    Win.on("navigation", function (e, i, n) {
        g.info("index.js navigation " + i + " ignore"),
        nw
            .Shell
            .openExternal(i),
        n.ignore()
    }),
    Win.on("new-win-policy", function (e, i, n) {
        g.info("index.js new-win-policy " + i + " ignore"),
        n.ignore()
    }),
    Win.on("close", function () {
        g.info("index.js close"),
        nw
            .App
            .quit()
    }),
    Win.setMinimumSize(nw.App.manifest.window.width, nw.App.manifest.window.height),
    document.addEventListener("mousewheel", function (e) {
        e.ctrlKey && e.preventDefault()
    }),
    s(function (e) {
        t(),
        g.info("index.js init proxy with " + e + " success!!");
        var s = function () {
            r.resize(document.body.offsetHeight),
            n.render(i.createElement(o, null), document.querySelector("#container"))
        };
        "complete" === document.readyState
            ? s()
            : window.addEventListener("load", s),
        w.startSync()
    })
}
var tools = require("../dist/utils/tools.js"),
    Win = nw
        .Window
        .get();
global.Win = Win,
global.appConfig = tools.getAppConfig(),
global.contentDocument = document,
global.contentDocumentBody = document.body,
global.contentWindow = window,
global.nwWindow = nw
    .Window
    .get(),
tools.up(init);