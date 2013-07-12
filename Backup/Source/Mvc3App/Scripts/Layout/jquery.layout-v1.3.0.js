﻿/*
jquery.layout 1.3.0 - Release Candidate 29.15
$Date: 2011-06-25 08:00:00 (Sat, 25 Jun 2011) $
$Rev: 302915 $

Copyright (c) 2010 
Fabrizio Balliano (http://www.fabrizioballiano.net)
Kevin Dalman (http://allpro.net)

Dual licensed under the GPL (http://www.gnu.org/licenses/gpl.html)
and MIT (http://www.opensource.org/licenses/mit-license.php) licenses.

Changelog: http://layout.jquery-dev.net/changelog.cfm#1.3.0.rc29.15

Docs: http://layout.jquery-dev.net/documentation.html
Tips: http://layout.jquery-dev.net/tips.html
Help: http://groups.google.com/group/jquery-ui-layout
*/
(function (f) {
    f.layout = { version: "1.3.rc29.15", revision: 0.032915, language: { Open: "Open", Close: "Close", Resize: "Resize", Slide: "Slide Open", Pin: "Pin", Unpin: "Un-Pin", noRoomToOpenTip: "Not enough room to show this pane.", pane: "pane", selector: "selector", errButton: "Error Adding Button \n\nInvalid ", errContainerMissing: "UI Layout Initialization Error\n\nThe specified layout-container does not exist.", errCenterPaneMissing: "UI Layout Initialization Error\n\nThe center-pane element does not exist.\n\nThe center-pane is a required element.",
        errContainerHeight: "UI Layout Initialization Warning\n\nThe layout-container \"CONTAINER\" has no height.\n\nTherefore the layout is 0-height and hence 'invisible'!"
    }, browser: { mozilla: !!f.browser.mozilla, webkit: !!f.browser.webkit || !!f.browser.safari, msie: !!f.browser.msie, isIE6: !!f.browser.msie && 6 == f.browser.version, boxModel: !1 }, scrollbarWidth: function () { return window.scrollbarWidth || f.layout.getScrollbarSize("width") }, scrollbarHeight: function () { return window.scrollbarHeight || f.layout.getScrollbarSize("height") },
        getScrollbarSize: function (h) { var p = f('<div style="position: absolute; top: -10000px; left: -10000px; width: 100px; height: 100px; overflow: scroll;"></div>').appendTo("body"), o = { width: p.width() - p[0].clientWidth, height: p.height() - p[0].clientHeight }; p.remove(); window.scrollbarWidth = o.width; window.scrollbarHeight = o.height; return h.match(/^(width|height)$/i) ? o[h] : o }, showInvisibly: function (h, p) {
            if (!h) return {}; h.jquery || (h = f(h)); var o = { display: h.css("display"), visibility: h.css("visibility") }; return p ||
"none" == o.display ? (h.css({ display: "block", visibility: "hidden" }), o) : {}
        }, getElementDimensions: function (h) {
            var p = {}, o = p.css = {}, t = {}, F, L, A = f.layout.cssNum, y = h.offset(); p.offsetLeft = y.left; p.offsetTop = y.top; f.each("Left,Right,Top,Bottom".split(","), function (y, A) { F = o["border" + A] = f.layout.borderWidth(h, A); L = o["padding" + A] = f.layout.cssNum(h, "padding" + A); t[A] = F + L; p["inset" + A] = L }); p.offsetWidth = h.innerWidth(); p.offsetHeight = h.innerHeight(); p.outerWidth = h.outerWidth(); p.outerHeight = h.outerHeight(); p.innerWidth =
Math.max(0, p.outerWidth - t.Left - t.Right); p.innerHeight = Math.max(0, p.outerHeight - t.Top - t.Bottom); o.width = h.width(); o.height = h.height(); o.top = A(h, "top", !0); o.bottom = A(h, "bottom", !0); o.left = A(h, "left", !0); o.right = A(h, "right", !0); return p
        }, getElementCSS: function (f, p) {
            var o = {}, t = f[0].style, F = p.split(","), L = "Top,Bottom,Left,Right".split(","), A = "Color,Style,Width".split(","), y, T, ca, U, V, Z; for (U = 0; U < F.length; U++) if (y = F[U], y.match(/(border|padding|margin)$/)) for (V = 0; 4 > V; V++) if (T = L[V], "border" == y) for (Z = 0; 3 > Z; Z++) ca =
A[Z], o[y + T + ca] = t[y + T + ca]; else o[y + T] = t[y + T]; else o[y] = t[y]; return o
        }, cssWidth: function (h, p) { var o = f.layout.borderWidth, t = f.layout.cssNum; if (0 >= p) return 0; if (!f.layout.browser.boxModel) return p; o = p - o(h, "Left") - o(h, "Right") - t(h, "paddingLeft") - t(h, "paddingRight"); return Math.max(0, o) }, cssHeight: function (h, p) { var o = f.layout.borderWidth, t = f.layout.cssNum; if (0 >= p) return 0; if (!f.layout.browser.boxModel) return p; o = p - o(h, "Top") - o(h, "Bottom") - t(h, "paddingTop") - t(h, "paddingBottom"); return Math.max(0, o) }, cssNum: function (h,
p, o) { h.jquery || (h = f(h)); var t = f.layout.showInvisibly(h), p = f.curCSS(h[0], p, !0), o = o && "auto" == p ? p : parseInt(p, 10) || 0; h.css(t); return o }, borderWidth: function (h, p) { h.jquery && (h = h[0]); var o = "border" + p.substr(0, 1).toUpperCase() + p.substr(1); return "none" == f.curCSS(h, o + "Style", !0) ? 0 : parseInt(f.curCSS(h, o + "Width", !0), 10) || 0 }, isMouseOverElem: function (h, p) {
    var o = f(p || this), t = o.offset(), F = t.top, t = t.left, L = t + o.outerWidth(), o = F + o.outerHeight(), A = h.pageX, y = h.pageY; return f.layout.browser.msie && 0 > A && 0 > y || A >= t && A <= L &&
y >= F && y <= o
} 
    }; f.fn.layout = function (h) {
        function p(a) {
            if (!a) return !0; var b = a.keyCode; if (33 > b) return !0; var c = { 38: "north", 40: "south", 37: "west", 39: "east" }, e = a.shiftKey, d = a.ctrlKey, j, g, i, m; d && 37 <= b && 40 >= b && n[c[b]].enableCursorHotkey ? m = c[b] : (d || e) && f.each(k.borderPanes.split(","), function (a, c) { j = n[c]; g = j.customHotkey; i = j.customHotkeyModifier; if (e && "SHIFT" == i || d && "CTRL" == i || d && e) if (g && b == (isNaN(g) || 9 >= g ? g.toUpperCase().charCodeAt(0) : g)) return m = c, !1 }); if (!m || !r[m] || !n[m].closable || l[m].isHidden) return !0; da(m);
            a.stopPropagation(); return a.returnValue = !1
        } function o(a) {
            if (w()) {
                this && this.tagName && (a = this); var b; G(a) ? b = r[a] : f(a).data("layoutRole") ? b = f(a) : f(a).parents().each(function () { if (f(this).data("layoutRole")) return b = f(this), !1 }); if (b && b.length) {
                    var c = b.data("layoutEdge"), a = l[c]; a.cssSaved && t(c); if (a.isSliding || a.isResizing || a.isClosed) a.cssSaved = !1; else {
                        var e = { zIndex: k.zIndex.pane_normal + 2 }, d = {}, j = b.css("overflow"), g = b.css("overflowX"), i = b.css("overflowY"); if ("visible" != j) d.overflow = j, e.overflow = "visible";
                        if (g && !g.match(/visible|auto/)) d.overflowX = g, e.overflowX = "visible"; if (i && !i.match(/visible|auto/)) d.overflowY = g, e.overflowY = "visible"; a.cssSaved = d; b.css(e); f.each(k.allPanes.split(","), function (a, b) { b != c && t(b) })
                    } 
                } 
            } 
        } function t(a) {
            if (w()) {
                this && this.tagName && (a = this); var b; G(a) ? b = r[a] : f(a).data("layoutRole") ? b = f(a) : f(a).parents().each(function () { if (f(this).data("layoutRole")) return b = f(this), !1 }); if (b && b.length) {
                    var a = b.data("layoutEdge"), a = l[a], c = a.cssSaved || {}; !a.isSliding && !a.isResizing && b.css("zIndex",
k.zIndex.pane_normal); b.css(c); a.cssSaved = !1
                } 
            } 
        } function F(a, b, c) { var e = f(a), d = n.showErrorMessages; if (e.length) if (-1 == k.borderPanes.indexOf(b)) d && alert(C.errButton + C.pane + ": " + b); else return a = n[b].buttonClass + "-" + c, e.addClass(a + " " + a + "-" + b).data("layoutName", n.name), e; else d && alert(C.errButton + C.selector + ": " + a); return null } function L(a, b, c) {
            switch (b.toLowerCase()) {
                case "toggle": A(a, c); break; case "open": y(a, c); break; case "close": T(a, c); break; case "pin": ca(a, c); break; case "toggle-slide": A(a, c, !0);
                    break; case "open-slide": y(a, c, !0)
            } 
        } function A(a, b, c) { (a = F(a, b, "toggle")) && a.click(function (a) { da(b, !!c); a.stopPropagation() }) } function y(a, b, c) { (a = F(a, b, "open")) && a.attr("title", C.Open).click(function (a) { M(b, !!c); a.stopPropagation() }) } function T(a, b) { var c = F(a, b, "close"); c && c.attr("title", C.Close).click(function (a) { H(b); a.stopPropagation() }) } function ca(a, b) {
            var c = F(a, b, "pin"); if (c) {
                var e = l[b]; c.click(function (a) { V(f(this), b, e.isSliding || e.isClosed); e.isSliding || e.isClosed ? M(b) : H(b); a.stopPropagation() });
                V(c, b, !e.isClosed && !e.isSliding); k[b].pins.push(a)
            } 
        } function U(a, b) { f.each(k[a].pins, function (c, e) { V(f(e), a, b) }) } function V(a, b, c) { var e = a.attr("pin"); if (!(e && c == ("down" == e))) { var e = n[b].buttonClass + "-pin", d = e + "-" + b, b = e + "-up " + d + "-up", e = e + "-down " + d + "-down"; a.attr("pin", c ? "down" : "up").attr("title", c ? C.Unpin : C.Pin).removeClass(c ? b : e).addClass(c ? e : b) } } function Z(a) {
            for (var a = f.extend({}, n.cookie, a || {}).name || n.name || "Layout", b = document.cookie, b = b ? b.split(";") : [], c, e = 0, d = b.length; e < d; e++) if (c = f.trim(b[e]).split("="),
c[0] == a) return Aa(decodeURIComponent(c[1])); return ""
        } function na(a, b) {
            var c = f.extend({}, n.cookie, b || {}), e = c.name || n.name || "Layout", d = "", j = "", g = !1; c.expires.toUTCString ? j = c.expires : "number" == typeof c.expires && (j = new Date, 0 < c.expires ? j.setDate(j.getDate() + c.expires) : (j.setYear(1970), g = !0)); j && (d += ";expires=" + j.toUTCString()); c.path && (d += ";path=" + c.path); c.domain && (d += ";domain=" + c.domain); c.secure && (d += ";secure"); g ? (l.cookie = {}, document.cookie = e + "=" + d) : (l.cookie = oa(a || c.keys), document.cookie = e + "=" + encodeURIComponent(Ba(l.cookie)) +
d); return f.extend({}, l.cookie)
        } function Ca(a) { if (a = Z(a)) l.cookie = f.extend({}, a), Da(a); return a } function Da(a, b) { a = Ea(a); f.extend(!0, n, a); if (l.initialized) { var c, e, d, j, g = !b; f.each(k.allPanes.split(","), function (b, f) { c = a[f]; if ("object" == typeof c) e = c.size, j = c.initClosed, d = c.initHidden, (0 < e || "auto" == e) && $(f, e), !0 === d ? ka(f, g) : !1 === j ? M(f, !1, g) : !0 === j ? H(f, !1, g) : !1 === d && ha(f, !1, g) }) } } function oa(a) {
            var b = {}, c = { isClosed: "initClosed", isHidden: "initHidden" }, e, d, j; if (!a) a = n.cookie.keys; f.isArray(a) && (a = a.join(","));
            for (var a = a.replace(/__/g, ".").split(","), g = 0, i = a.length; g < i; g++) e = a[g].split("."), d = e[0], e = e[1], 0 > k.allPanes.indexOf(d) || (j = l[d][e], void 0 != j && ("isClosed" == e && l[d].isSliding && (j = !0), (b[d] || (b[d] = {}))[c[e] ? c[e] : e] = j)); return b
        } function Ba(a) { function b(a) { var e = [], d = 0, f, g, i; for (f in a) g = a[f], i = typeof g, "string" == i ? g = '"' + g + '"' : "object" == i && (g = b(g)), e[d++] = '"' + f + '":' + g; return "{" + e.join(",") + "}" } return b(a) } function Aa(a) { try { return window.eval("(" + a + ")") || {} } catch (b) { return {} } } var C = f.layout.language,
n = { name: "", containerClass: "ui-layout-container", scrollToBookmarkOnLoad: !0, resizeWithWindow: !0, resizeWithWindowDelay: 200, resizeWithWindowMaxDelay: 0, onresizeall_start: null, onresizeall_end: null, onload_start: null, onload_end: null, onunload_start: null, onunload_end: null, autoBindCustomButtons: !1, zIndex: null, initPanes: !0, showErrorMessages: !0, defaults: { applyDemoStyles: !1, closable: !0, resizable: !0, slidable: !0, initClosed: !1, initHidden: !1, contentSelector: ".ui-layout-content", contentIgnoreSelector: ".ui-layout-ignore",
    findNestedContent: !1, paneClass: "ui-layout-pane", resizerClass: "ui-layout-resizer", togglerClass: "ui-layout-toggler", buttonClass: "ui-layout-button", minSize: 0, maxSize: 0, spacing_open: 6, spacing_closed: 6, togglerLength_open: 50, togglerLength_closed: 50, togglerAlign_open: "center", togglerAlign_closed: "center", togglerTip_open: C.Close, togglerTip_closed: C.Open, togglerContent_open: "", togglerContent_closed: "", resizerDblClickToggle: !0, autoResize: !0, autoReopen: !0, resizerDragOpacity: 1, maskIframesOnResize: !0, resizeNestedLayout: !0,
    resizeWhileDragging: !1, resizeContentWhileDragging: !1, noRoomToOpenTip: C.noRoomToOpenTip, resizerTip: C.Resize, sliderTip: C.Slide, sliderCursor: "pointer", slideTrigger_open: "click", slideTrigger_close: "mouseleave", slideDelay_open: 300, slideDelay_close: 300, hideTogglerOnSlide: !1, preventQuickSlideClose: f.layout.browser.webkit, preventPrematureSlideClose: !1, showOverflowOnHover: !1, enableCursorHotkey: !0, customHotkeyModifier: "SHIFT", fxName: "slide", fxSpeed: null, fxSettings: {}, fxOpacityFix: !0, triggerEventsOnLoad: !1,
    triggerEventsWhileDragging: !0, onshow_start: null, onshow_end: null, onhide_start: null, onhide_end: null, onopen_start: null, onopen_end: null, onclose_start: null, onclose_end: null, onresize_start: null, onresize_end: null, onsizecontent_start: null, onsizecontent_end: null, onswap_start: null, onswap_end: null, ondrag_start: null, ondrag_end: null
}, north: { paneSelector: ".ui-layout-north", size: "auto", resizerCursor: "n-resize", customHotkey: "" }, south: { paneSelector: ".ui-layout-south", size: "auto", resizerCursor: "s-resize", customHotkey: "" },
    east: { paneSelector: ".ui-layout-east", size: 200, resizerCursor: "e-resize", customHotkey: "" }, west: { paneSelector: ".ui-layout-west", size: 200, resizerCursor: "w-resize", customHotkey: "" }, center: { paneSelector: ".ui-layout-center", minWidth: 0, minHeight: 0 }, useStateCookie: !1, cookie: { name: "", autoSave: !0, autoLoad: !0, domain: "", path: "", expires: "", secure: !1, keys: "north.size,south.size,east.size,west.size,north.isClosed,south.isClosed,east.isClosed,west.isClosed,north.isHidden,south.isHidden,east.isHidden,west.isHidden"}
},
pa = { slide: { all: { duration: "fast" }, north: { direction: "up" }, south: { direction: "down" }, east: { direction: "right" }, west: { direction: "left"} }, drop: { all: { duration: "slow" }, north: { direction: "up" }, south: { direction: "down" }, east: { direction: "right" }, west: { direction: "left"} }, scale: { all: { duration: "fast"}} }, l = { id: "layout" + (new Date).getTime(), initialized: !1, container: {}, north: {}, south: {}, east: {}, west: {}, center: {}, cookie: {} }, k = { allPanes: "north,south,west,east,center", borderPanes: "north,south,west,east", altSide: { north: "south",
    south: "north", east: "west", west: "east"
}, hidden: { visibility: "hidden" }, visible: { visibility: "visible" }, zIndex: { pane_normal: 1, resizer_normal: 2, iframe_mask: 2, pane_sliding: 100, pane_animate: 1E3, resizer_drag: 1E4 }, resizers: { cssReq: { position: "absolute", padding: 0, margin: 0, fontSize: "1px", textAlign: "left", overflow: "hidden" }, cssDemo: { background: "#DDD", border: "none"} }, togglers: { cssReq: { position: "absolute", display: "block", padding: 0, margin: 0, overflow: "hidden", textAlign: "center", fontSize: "1px", cursor: "pointer", zIndex: 1 },
    cssDemo: { background: "#AAA"}
}, content: { cssReq: { position: "relative" }, cssDemo: { overflow: "auto", padding: "10px" }, cssDemoPane: { overflow: "hidden", padding: 0} }, panes: { cssReq: { position: "absolute", margin: 0 }, cssDemo: { padding: "10px", background: "#FFF", border: "1px solid #BBB", overflow: "auto"} }, north: { side: "Top", sizeType: "Height", dir: "horz", cssReq: { top: 0, bottom: "auto", left: 0, right: 0, width: "auto" }, pins: [] }, south: { side: "Bottom", sizeType: "Height", dir: "horz", cssReq: { top: "auto", bottom: 0, left: 0, right: 0, width: "auto" }, pins: [] },
    east: { side: "Right", sizeType: "Width", dir: "vert", cssReq: { left: "auto", right: 0, top: "auto", bottom: "auto", height: "auto" }, pins: [] }, west: { side: "Left", sizeType: "Width", dir: "vert", cssReq: { left: 0, right: "auto", top: "auto", bottom: "auto", height: "auto" }, pins: [] }, center: { dir: "center", cssReq: { left: "auto", right: "auto", top: "auto", bottom: "auto", height: "auto", width: "auto"}}
}, E = { data: {}, set: function (a, b, c) { E.clear(a); E.data[a] = setTimeout(b, c) }, clear: function (a) { var b = E.data; b[a] && (clearTimeout(b[a]), delete b[a]) } }, G = function (a) {
    try {
        return "string" ==
typeof a || "object" == typeof a && null !== a.constructor.toString().match(/string/i)
    } catch (b) { return !1 } 
}, z = function (a, b) { return Math.max(a, b) }, Ea = function (a) {
    var b, c = { cookie: {}, defaults: { fxSettings: {} }, north: { fxSettings: {} }, south: { fxSettings: {} }, east: { fxSettings: {} }, west: { fxSettings: {} }, center: { fxSettings: {}} }, a = a || {}; a.effects || a.cookie || a.defaults || a.north || a.south || a.west || a.east || a.center ? c = f.extend(!0, c, a) : f.each(a, function (a, d) {
        b = a.split("__"); if (!b[1] || c[b[0]]) c[b[1] ? b[0] : "defaults"][b[1] ? b[1] : b[0]] =
d
    }); return c
}, Fa = function (a, b, c) { function e(j) { var g = k[j]; g.doCallback ? (d.push(j), j = g.callback.split(",")[1], j != b && 0 <= !f.inArray(j, d) && e(j)) : (g.doCallback = !0, g.callback = a + "," + b + "," + (c ? 1 : 0)) } var d = []; f.each(k.borderPanes.split(","), function (a, b) { if (k[b].isMoving) return e(b), !1 }) }, Ga = function (a) {
    a = k[a]; k.isLayoutBusy = !1; delete a.isMoving; if (a.doCallback && a.callback) {
        a.doCallback = !1; var b = a.callback.split(","), c = 0 < b[2] ? !0 : !1; "open" == b[0] ? M(b[1], c) : "close" == b[0] && H(b[1], c); if (!a.doCallback) a.callback =
null
    } 
}, v = function (a, b) { if (b) { var c; try { if ("function" == typeof b) c = b; else if (G(b)) if (b.match(/,/)) { var e = b.split(","); c = eval(e[0]); if ("function" == typeof c && 1 < e.length) return c(e[1]) } else c = eval(b); else return; if ("function" == typeof c) return a && r[a] ? c(a, r[a], l[a], n[a], n.name) : c(ea, l, n, n.name) } catch (d) { } } }, Ha = function (a) { if (!f.layout.browser.mozilla) { var b = r[a]; "IFRAME" == l[a].tagName ? b.css(k.hidden).css(k.visible) : b.find("IFRAME").css(k.hidden).css(k.visible) } }, J = function (a, b) {
    var c = G(a), e = c ? r[a] : f(a);
    if (!e.length) return 0; isNaN(b) && (b = c ? R(a) : e.outerWidth()); return f.layout.cssWidth(e, b)
}, K = function (a, b) { var c = G(a), e = c ? r[a] : f(a); if (!e.length) return 0; isNaN(b) && (b = c ? R(a) : e.outerHeight()); return f.layout.cssHeight(e, b) }, la = function (a) { var b = k[a].dir, a = { minWidth: 1001 - J(a, 1E3), minHeight: 1001 - K(a, 1E3) }; if ("horz" == b) a.minSize = a.minHeight; if ("vert" == b) a.minSize = a.minWidth; return a }, Ra = function (a, b, c) {
    var e = a; G(a) ? e = r[a] : a.jquery || (e = f(a)); a = K(e, b); e.css({ height: a, visibility: "visible" }); 0 < a && 0 < e.innerWidth() ?
c && e.data("autoHidden") && (e.show().data("autoHidden", !1), f.layout.browser.mozilla || e.css(k.hidden).css(k.visible)) : c && !e.data("autoHidden") && e.hide().data("autoHidden", !0)
}, W = function (a, b, c) {
    if (!c) c = k[a].dir; G(b) && b.match(/%/) && (b = parseInt(b, 10) / 100); if (0 === b) return 0; if (1 <= b) return parseInt(b, 10); if (0 < b) {
        var a = n, e; "horz" == c ? e = u.innerHeight - (r.north ? a.north.spacing_open : 0) - (r.south ? a.south.spacing_open : 0) : "vert" == c && (e = u.innerWidth - (r.west ? a.west.spacing_open : 0) - (r.east ? a.east.spacing_open : 0)); return Math.floor(e *
b)
    } if ("center" == a) return 0; e = r[a]; var c = "horz" == c ? "height" : "width", a = f.layout.showInvisibly(e), d = e.css(c); e.css(c, "auto"); b = "height" == c ? e.outerHeight() : e.outerWidth(); e.css(c, d).css(a); return b
}, R = function (a, b) { var c = r[a], e = n[a], d = l[a], f = b ? e.spacing_open : 0, e = b ? e.spacing_closed : 0; return !c || d.isHidden ? 0 : d.isClosed || d.isSliding && b ? e : "horz" == k[a].dir ? c.outerHeight() + f : c.outerWidth() + f }, N = function (a, b) {
    if (w()) {
        var c = n[a], e = l[a], d = k[a], f = d.dir; d.side.toLowerCase(); d.sizeType.toLowerCase(); var d = void 0 !=
b ? b : e.isSliding, g = c.spacing_open, i = k.altSide[a], m = l[i], Q = r[i], h = !Q || !1 === m.isVisible || m.isSliding ? 0 : "horz" == f ? Q.outerHeight() : Q.outerWidth(), i = (!Q || m.isHidden ? 0 : n[i][!1 !== m.isClosed ? "spacing_closed" : "spacing_open"]) || 0, m = "horz" == f ? u.innerHeight : u.innerWidth, Q = la("center"), Q = "horz" == f ? z(n.center.minHeight, Q.minHeight) : z(n.center.minWidth, Q.minWidth), d = m - g - (d ? 0 : W("center", Q, f) + h + i), f = e.minSize = z(W(a, c.minSize), la(a).minSize), g = c.maxSize ? W(a, c.maxSize) : 1E5, d = Math.min(g, d), d = e.maxSize = d, e = e.resizerPosition =
{}, g = u.insetTop, h = u.insetLeft, i = u.innerWidth, m = u.innerHeight, c = c.spacing_open; switch (a) { case "north": e.min = g + f; e.max = g + d; break; case "west": e.min = h + f; e.max = h + d; break; case "south": e.min = g + m - d - c; e.max = g + m - f - c; break; case "east": e.min = h + i - d - c, e.max = h + i - f - c } 
    } 
}, O = function (a) { return f.layout.getElementDimensions(a) }, qa = function (a, b) {
    var c = f(a), e = c.data("layoutRole"), d = c.data("layoutEdge"), j = n[d][e + "Class"], d = "-" + d, g = c.hasClass(j + "-closed") ? "-closed" : "-open", i = "-closed" == g ? "-open" : "-closed", g = j + "-hover " +
(j + d + "-hover ") + (j + g + "-hover ") + (j + d + g + "-hover "); b && (g += j + i + "-hover " + (j + d + i + "-hover ")); "resizer" == e && c.hasClass(j + "-sliding") && (g += j + "-sliding-hover " + (j + d + "-sliding-hover ")); return f.trim(g)
}, ra = function (a, b) { var c = f(b || this); a && "toggler" == c.data("layoutRole") && a.stopPropagation(); c.addClass(qa(c)) }, S = function (a, b) { var c = f(b || this); c.removeClass(qa(c, !0)) }, Ia = function (a) { f("body").disableSelection(); ra(a, this) }, sa = function (a, b) {
    var c = b || this, e = f(c).data("layoutEdge"), d = e + "ResizerLeave"; E.clear(e +
"_openSlider"); E.clear(d); b ? l[e].isResizing || f("body").enableSelection() : (S(a, this), E.set(d, function () { sa(a, c) }, 200))
}, w = function () { return l.initialized || l.creatingLayout ? !0 : ta() }, ta = function () {
    var a = n; if (!q.is(":visible")) return !1; if (!Ja("center").length) return a.showErrorMessages && alert(C.errCenterPaneMissing), !1; l.creatingLayout = !0; f.extend(u, O(q)); Sa(); fa(); if (a.scrollToBookmarkOnLoad) { var b = self.location; b.hash && b.replace(b.hash) } a.resizeWithWindow && !q.data("layoutRole") && f(window).bind("resize." +
B, Ta); delete l.creatingLayout; l.initialized = !0; v(null, a.onload_end || a.onload); return !0
}, Ta = function () { var a = Number(n.resizeWithWindowDelay); 10 > a && (a = 100); E.clear("winResize"); E.set("winResize", function () { E.clear("winResize"); E.clear("winResizeRepeater"); var a = O(q); (a.innerWidth !== u.innerWidth || a.innerHeight !== u.innerHeight) && ga() }, a); E.data.winResizeRepeater || Ka() }, Ka = function () { var a = Number(n.resizeWithWindowMaxDelay); 0 < a && E.set("winResizeRepeater", function () { Ka(); ga() }, a) }, La = function () {
    var a = n;
    l.cookie = oa(); v(null, a.onunload_start); a.useStateCookie && a.cookie.autoSave && na(); v(null, a.onunload_end || a.onunload)
}, Ma = function (a) { if (!a || "all" == a) a = k.borderPanes; f.each(a.split(","), function (a, c) { var e = n[c]; if (e.enableCursorHotkey || e.customHotkey) return f(document).bind("keydown." + B, p), !1 }) }, Ua = function () {
    function a(a) { for (var c in b) void 0 != a[c] && (a[b[c]] = a[c], delete a[c]) } h = Ea(h); var b = { applyDefaultStyles: "applyDemoStyles" }; a(h.defaults); f.each(k.allPanes.split(","), function (b, c) { a(h[c]) }); h.effects &&
(f.extend(pa, h.effects), delete h.effects); f.extend(n.cookie, h.cookie); f.each("name,containerClass,zIndex,scrollToBookmarkOnLoad,resizeWithWindow,resizeWithWindowDelay,resizeWithWindowMaxDelay,onresizeall,onresizeall_start,onresizeall_end,onload,onload_start,onload_end,onunload,onunload_start,onunload_end,autoBindCustomButtons,useStateCookie,showErrorMessages".split(","), function (a, b) { void 0 !== h[b] ? n[b] = h[b] : void 0 !== h.defaults[b] && (n[b] = h.defaults[b], delete h.defaults[b]) }); f.each("paneSelector,resizerCursor,customHotkey".split(","),
function (a, b) { delete h.defaults[b] }); f.extend(!0, n.defaults, h.defaults); k.center = f.extend(!0, {}, k.panes, k.center); var c = n.zIndex; if (0 === c || 0 < c) k.zIndex.pane_normal = c, k.zIndex.resizer_normal = c + 1, k.zIndex.iframe_mask = c + 1; f.extend(n.center, h.center); var e = f.extend(!0, {}, n.defaults, h.defaults, n.center), c = "paneClass,contentSelector,applyDemoStyles,triggerEventsOnLoad,showOverflowOnHover,onresize,onresize_start,onresize_end,resizeNestedLayout,resizeContentWhileDragging,findNestedContent,onsizecontent,onsizecontent_start,onsizecontent_end".split(",");
    f.each(c, function (a, b) { n.center[b] = e[b] }); var d, j = n.defaults; f.each(k.borderPanes.split(","), function (a, b) {
        k[b] = f.extend(!0, {}, k.panes, k[b]); d = n[b] = f.extend(!0, {}, n.defaults, n[b], h.defaults, h[b]); if (!d.paneClass) d.paneClass = "ui-layout-pane"; if (!d.resizerClass) d.resizerClass = "ui-layout-resizer"; if (!d.togglerClass) d.togglerClass = "ui-layout-toggler"; f.each(["_open", "_close", ""], function (a, c) {
            var e = "fxName" + c, g = "fxSpeed" + c, k = "fxSettings" + c; d[e] = h[b][e] || h[b].fxName || h.defaults[e] || h.defaults.fxName ||
d[e] || d.fxName || j[e] || j.fxName || "none"; var l = d[e]; if ("none" == l || !f.effects || !f.effects[l] || !pa[l] && !d[k] && !d.fxSettings) l = d[e] = "none"; l = pa[l] || {}; e = l.all || {}; l = l[b] || {}; d[k] = f.extend({}, e, l, j.fxSettings || {}, j[k] || {}, d.fxSettings, d[k], h.defaults.fxSettings, h.defaults[k] || {}, h[b].fxSettings, h[b][k] || {}); d[g] = h[b][g] || h[b].fxSpeed || h.defaults[g] || h.defaults.fxSpeed || d[g] || d[k].duration || d.fxSpeed || d.fxSettings.duration || j.fxSpeed || j.fxSettings.duration || l.duration || e.duration || "normal"
        })
    })
}, Ja = function (a) {
    a =
n[a].paneSelector; if ("#" === a.substr(0, 1)) return q.find(a).eq(0); var b = q.children(a).eq(0); return b.length ? b : q.children("form:first").children(a).eq(0)
}, Sa = function () {
    f.each(k.allPanes.split(","), function (a, b) { Na(b, !0) }); ua(); f.each(k.borderPanes.split(","), function (a, b) { r[b] && l[b].isVisible && (N(b), X(b)) }); Y("center"); setTimeout(function () { f.each(k.allPanes.split(","), function (a, b) { var c = n[b]; r[b] && l[b].isVisible && (c.triggerEventsOnLoad && v(b, c.onresize_end || c.onresize), aa(b)) }) }, 50); n.showErrorMessages &&
2 > q.innerHeight() && alert(C.errContainerHeight.replace(/CONTAINER/, u.ref))
}, Na = function (a, b) {
    if (b || w()) {
        var c = n[a], e = l[a], d = k[a], j = d.dir, g = "center" == a, i = {}, m = r[a], h; m ? va(a) : P[a] = !1; m = r[a] = Ja(a); if (m.length) {
            m.data("layoutCSS") || m.data("layoutCSS", f.layout.getElementCSS(m, "position,top,left,bottom,right,width,height,overflow,zIndex,display,backgroundColor,padding,margin,border")); m.data("parentLayout", ea).data("layoutRole", "pane").data("layoutEdge", a).css(d.cssReq).css("zIndex", k.zIndex.pane_normal).css(c.applyDemoStyles ?
d.cssDemo : {}).addClass(c.paneClass + " " + c.paneClass + "-" + a).bind("mouseenter." + B, ra).bind("mouseleave." + B, S); Oa(a, !1); if (!g) h = e.size = W(a, c.size), d = W(a, c.minSize) || 1, g = W(a, c.maxSize) || 1E5, 0 < h && (h = z(Math.min(h, g), d)), e.isClosed = !1, e.isSliding = !1, e.isResizing = !1, e.isHidden = !1; e.tagName = m[0].tagName; e.edge = a; e.noRoom = !1; e.isVisible = !0; switch (a) {
                case "north": i.top = u.insetTop; i.left = u.insetLeft; i.right = u.insetRight; break; case "south": i.bottom = u.insetBottom; i.left = u.insetLeft; i.right = u.insetRight; break; case "west": i.left =
u.insetLeft; break; case "east": i.right = u.insetRight
            } if ("horz" == j) i.height = z(1, K(a, h)); else if ("vert" == j) i.width = z(1, J(a, h)); m.css(i); "horz" != j && Y(a, !0); c.initClosed && c.closable && !c.initHidden ? H(a, !0, !0) : c.initHidden || c.initClosed ? ka(a) : e.noRoom || m.css("display", "block"); m.css("visibility", "visible"); c.showOverflowOnHover && m.hover(o, t); l.initialized && (ua(a), Ma(a), ga(), e.isVisible && (c.triggerEventsOnLoad && v(a, c.onresize_end || c.onresize), aa(a)))
        } else r[a] = !1
    } 
}, ua = function (a) {
    if (!a || "all" == a) a = k.borderPanes;
    f.each(a.split(","), function (a, c) {
        var e = r[c]; x[c] = !1; D[c] = !1; if (e) {
            var e = n[c], d = l[c], j = e.resizerClass, g = e.togglerClass; k[c].side.toLowerCase(); var i = "-" + c, m = x[c] = f("<div></div>"), h = e.closable ? D[c] = f("<div></div>") : !1; !d.isVisible && e.slidable && m.attr("title", e.sliderTip).css("cursor", e.sliderCursor); m.attr("id", "#" == e.paneSelector.substr(0, 1) ? e.paneSelector.substr(1) + "-resizer" : "").data("parentLayout", ea).data("layoutRole", "resizer").data("layoutEdge", c).css(k.resizers.cssReq).css("zIndex", k.zIndex.resizer_normal).css(e.applyDemoStyles ?
k.resizers.cssDemo : {}).addClass(j + " " + j + i).appendTo(q); h && (h.attr("id", "#" == e.paneSelector.substr(0, 1) ? e.paneSelector.substr(1) + "-toggler" : "").data("parentLayout", ea).data("layoutRole", "toggler").data("layoutEdge", c).css(k.togglers.cssReq).css(e.applyDemoStyles ? k.togglers.cssDemo : {}).addClass(g + " " + g + i).appendTo(m), e.togglerContent_open && f("<span>" + e.togglerContent_open + "</span>").data("layoutRole", "togglerContent").data("layoutEdge", c).addClass("content content-open").css("display", "none").appendTo(h),
e.togglerContent_closed && f("<span>" + e.togglerContent_closed + "</span>").data("layoutRole", "togglerContent").data("layoutEdge", c).addClass("content content-closed").css("display", "none").appendTo(h), Pa(c)); Va(c); d.isVisible ? wa(c) : (xa(c), ba(c, !0))
        } 
    }); ia("all")
}, Oa = function (a, b) {
    if (w()) {
        var c = n[a], e = c.contentSelector, d = r[a], j; e && (j = P[a] = c.findNestedContent ? d.find(e).eq(0) : d.children(e).eq(0)); j && j.length ? (j.data("layoutCSS") || j.data("layoutCSS", f.layout.getElementCSS(j, "height")), j.css(k.content.cssReq),
c.applyDemoStyles && (j.css(k.content.cssDemo), d.css(k.content.cssDemoPane)), l[a].content = {}, !1 !== b && fa(a)) : P[a] = !1
    } 
}, Wa = function () { var a; f.each("toggle,open,close,pin,toggle-slide,open-slide".split(","), function (b, c) { f.each(k.borderPanes.split(","), function (b, d) { f(".ui-layout-button-" + c + "-" + d).each(function () { a = f(this).data("layoutName") || f(this).attr("layoutName"); (void 0 == a || a == n.name) && L(this, c, d) }) }) }) }, Va = function (a) {
    var b = "function" == typeof f.fn.draggable, c; if (!a || "all" == a) a = k.borderPanes; f.each(a.split(","),
function (a, d) {
    var j = n[d], g = l[d], i = k[d], m = "horz" == i.dir ? "top" : "left", h, I; if (!b || !r[d] || !j.resizable) return j.resizable = !1, !0; var o = x[d], p = j.resizerClass, t = p + "-drag", w = p + "-" + d + "-drag", z = p + "-dragging", A = p + "-" + d + "-dragging", y = p + "-dragging-limit", C = p + "-" + d + "-dragging-limit", D = !1; g.isClosed || o.attr("title", j.resizerTip).css("cursor", j.resizerCursor); o.bind("mouseenter." + B, Ia).bind("mouseleave." + B, sa); o.draggable({ containment: q[0], axis: "horz" == i.dir ? "y" : "x", delay: 0, distance: 1, helper: "clone", opacity: j.resizerDragOpacity,
        addClasses: !1, zIndex: k.zIndex.resizer_drag, start: function () {
            j = n[d]; g = l[d]; I = j.resizeWhileDragging; if (!1 === v(d, j.ondrag_start)) return !1; k.isLayoutBusy = !0; g.isResizing = !0; E.clear(d + "_closeSlider"); N(d); h = g.resizerPosition; o.addClass(t + " " + w); D = !1; c = f(!0 === j.maskIframesOnResize ? "iframe" : j.maskIframesOnResize).filter(":visible"); var a, b = 0; c.each(function () {
                a = "ui-layout-mask-" + ++b; f(this).data("layoutMaskID", a); f('<div id="' + a + '" class="ui-layout-mask ui-layout-mask-' + d + '"/>').css({ background: "#fff",
                    opacity: "0.001", zIndex: k.zIndex.iframe_mask, position: "absolute", width: this.offsetWidth + "px", height: this.offsetHeight + "px"
                }).css(f(this).position()).appendTo(this.parentNode)
            }); f("body").disableSelection()
        }, drag: function (a, b) {
            D || (b.helper.addClass(z + " " + A).css({ right: "auto", bottom: "auto" }).children().css("visibility", "hidden"), D = !0, g.isSliding && r[d].css("zIndex", k.zIndex.pane_sliding)); var c = 0; if (b.position[m] < h.min) b.position[m] = h.min, c = -1; else if (b.position[m] > h.max) b.position[m] = h.max, c = 1; c ? (b.helper.addClass(y +
" " + C), window.defaultStatus = "Panel has reached its " + (0 < c && d.match(/north|west/) || 0 > c && d.match(/south|east/) ? "maximum" : "minimum") + " size") : (b.helper.removeClass(y + " " + C), window.defaultStatus = ""); I && F(a, b, d)
        }, stop: function (a, b) { f("body").enableSelection(); window.defaultStatus = ""; o.removeClass(t + " " + w); g.isResizing = !1; k.isLayoutBusy = !1; F(a, b, d, !0) } 
    }); var F = function (a, b, d, e) {
        var a = b.position, b = k[d], g; switch (d) {
            case "north": g = a.top; break; case "west": g = a.left; break; case "south": g = u.offsetHeight - a.top -
j.spacing_open; break; case "east": g = u.offsetWidth - a.left - j.spacing_open
        } if (e) { if (f("div.ui-layout-mask").each(function () { this.parentNode.removeChild(this) }), !1 === v(d, j.ondrag_end || j.ondrag)) return !1 } else c.each(function () { f("#" + f(this).data("layoutMaskID")).css(f(this).position()).css({ width: this.offsetWidth + "px", height: this.offsetHeight + "px" }) }); ya(d, g - u["inset" + b.side])
    } 
})
}, va = function (a, b, c) {
    if (w() && r[a]) {
        var e = r[a], d = P[a], j = x[a], g = D[a], i = n[a].paneClass, m = i + "-" + a, i = [i, i + "-open", i + "-closed", i + "-sliding",
m, m + "-open", m + "-closed", m + "-sliding"]; f.merge(i, qa(e, !0)); e && e.length && (b && !e.data("layoutContainer") && (!d || !d.length || !d.data("layoutContainer")) ? e.remove() : (e.removeClass(i.join(" ")).removeData("layoutParent").removeData("layoutRole").removeData("layoutEdge").removeData("autoHidden").unbind("." + B), e.data("layoutContainer") || e.css(e.data("layoutCSS")).removeData("layoutCSS"), d && d.length && !d.data("layoutContainer") && d.css(d.data("layoutCSS")).removeData("layoutCSS"))); g && g.length && g.remove(); j &&
j.length && j.remove(); r[a] = P[a] = x[a] = D[a] = !1; c || (ga(), l[a] = {})
    } 
}, ka = function (a, b) { if (w()) { var c = n[a], e = l[a], d = r[a], f = x[a]; if (d && !e.isHidden && !(l.initialized && !1 === v(a, c.onhide_start))) if (e.isSliding = !1, f && f.hide(), !l.initialized || e.isClosed) { if (e.isClosed = !0, e.isHidden = !0, e.isVisible = !1, d.hide(), Y("horz" == k[a].dir ? "all" : "center"), l.initialized || c.triggerEventsOnLoad) v(a, c.onhide_end || c.onhide) } else e.isHiding = !0, H(a, !1, b) } }, ha = function (a, b, c, e) {
    if (w()) {
        var d = l[a]; if (r[a] && d.isHidden && !1 !== v(a, n[a].onshow_start)) d.isSliding =
!1, d.isShowing = !0, !1 === b ? H(a, !0) : M(a, !1, c, e)
    } 
}, da = function (a, b) { if (w()) { G(a) || (a.stopImmediatePropagation(), a = f(this).data("layoutEdge")); var c = l[G(a) ? f.trim(a) : void 0 == a || null == a ? "" : a]; c.isHidden ? ha(a) : c.isClosed ? M(a, !!b) : H(a) } }, Xa = function (a) { var b = l[a]; r[a].hide(); b.isClosed = !0; b.isVisible = !1 }, H = function (a, b, c, e) {
    function d() {
        if (i.isClosed) {
            ba(a, !0); var b = k.altSide[a]; l[b].noRoom && (N(b), X(b)); if (!e && (l.initialized || g.triggerEventsOnLoad)) m || v(a, g.onclose_end || g.onclose), m && v(a, g.onshow_end || g.onshow),
h && v(a, g.onhide_end || g.onhide)
        } Ga(a)
    } if (!l.initialized && r[a]) Xa(a); else if (w()) {
        var f = r[a], g = n[a], i = l[a], c = !c && !i.isClosed && "none" != g.fxName_close, m = i.isShowing, h = i.isHiding; delete i.isShowing; delete i.isHiding; if (f && (g.closable || m || h) && (b || !i.isClosed || m)) if (k.isLayoutBusy) Fa("close", a, b); else if (m || !1 !== v(a, g.onclose_start)) {
            k[a].isMoving = !0; k.isLayoutBusy = !0; i.isClosed = !0; i.isVisible = !1; if (h) i.isHidden = !0; else if (m) i.isHidden = !1; i.isSliding ? ja(a, !1) : Y("horz" == k[a].dir ? "all" : "center", !1); xa(a);
            c ? (ma(a, !0), f.hide(g.fxName_close, g.fxSettings_close, g.fxSpeed_close, function () { ma(a, !1); d() })) : (f.hide(), d())
        } 
    } 
}, xa = function (a) {
    var b = x[a], c = D[a], e = n[a], d = k[a].side.toLowerCase(), j = e.resizerClass, g = e.togglerClass, i = "-" + a; b.css(d, u["inset" + k[a].side]).removeClass(j + "-open " + j + i + "-open").removeClass(j + "-sliding " + j + i + "-sliding").addClass(j + "-closed " + j + i + "-closed").unbind("dblclick." + B); e.resizable && "function" == typeof f.fn.draggable && b.draggable("disable").removeClass("ui-state-disabled").css("cursor",
"default").attr("title", ""); c && (c.removeClass(g + "-open " + g + i + "-open").addClass(g + "-closed " + g + i + "-closed").attr("title", e.togglerTip_closed), c.children(".content-open").hide(), c.children(".content-closed").css("display", "block")); U(a, !1); l.initialized && ia("all")
}, M = function (a, b, c, e) {
    function d() { i.isVisible && (Ha(a), i.isSliding || Y("vert" == k[a].dir ? "center" : "all", !1), wa(a)); Ga(a) } if (w()) {
        var f = r[a], g = n[a], i = l[a], c = !c && i.isClosed && "none" != g.fxName_open, m = i.isShowing; delete i.isShowing; if (f && (g.resizable ||
g.closable || m) && (!i.isVisible || i.isSliding)) if (i.isHidden && !m) ha(a, !0); else if (k.isLayoutBusy) Fa("open", a, b); else if (N(a, b), !1 !== v(a, g.onopen_start)) if (N(a, b), i.minSize > i.maxSize) U(a, !1), !e && g.noRoomToOpenTip && alert(g.noRoomToOpenTip); else { k[a].isMoving = !0; k.isLayoutBusy = !0; b ? ja(a, !0) : i.isSliding ? ja(a, !1) : g.slidable && ba(a, !1); i.noRoom = !1; X(a); i.isVisible = !0; i.isClosed = !1; if (m) i.isHidden = !1; c ? (ma(a, !0), f.show(g.fxName_open, g.fxSettings_open, g.fxSpeed_open, function () { ma(a, !1); d() })) : (f.show(), d()) } 
    } 
},
wa = function (a, b) {
    var c = r[a], e = x[a], d = D[a], j = n[a], g = l[a], i = k[a].side.toLowerCase(), m = j.resizerClass, h = j.togglerClass, I = "-" + a; e.css(i, u["inset" + k[a].side] + R(a)).removeClass(m + "-closed " + m + I + "-closed").addClass(m + "-open " + m + I + "-open"); g.isSliding ? e.addClass(m + "-sliding " + m + I + "-sliding") : e.removeClass(m + "-sliding " + m + I + "-sliding"); j.resizerDblClickToggle && e.bind("dblclick", da); S(0, e); j.resizable && "function" == typeof f.fn.draggable ? e.draggable("enable").css("cursor", j.resizerCursor).attr("title", j.resizerTip) :
g.isSliding || e.css("cursor", "default"); d && (d.removeClass(h + "-closed " + h + I + "-closed").addClass(h + "-open " + h + I + "-open").attr("title", j.togglerTip_open), S(0, d), d.children(".content-closed").hide(), d.children(".content-open").css("display", "block")); U(a, !g.isSliding); f.extend(g, O(c)); l.initialized && (ia("all"), fa(a, !0)); if (!b && (l.initialized || j.triggerEventsOnLoad) && c.is(":visible")) v(a, j.onopen_end || j.onopen), g.isShowing && v(a, j.onshow_end || j.onshow), l.initialized && (v(a, j.onresize_end || j.onresize), aa(a))
},
Qa = function (a) { function b() { d.isClosed ? k[e].isMoving || M(e, !0) : ja(e, !0) } if (w()) { var c = G(a) ? null : a, e = c ? f(this).data("layoutEdge") : a, d = l[e], a = n[e].slideDelay_open; c && c.stopImmediatePropagation(); d.isClosed && c && "mouseenter" == c.type && 0 < a ? E.set(e + "_openSlider", b, a) : b() } }, za = function (a) {
    function b() { d.isClosed ? ja(e, !1) : k[e].isMoving || H(e) } if (w()) {
        var c = G(a) ? null : a, e = c ? f(this).data("layoutEdge") : a, a = n[e], d = l[e], j = k[e].isMoving ? 1E3 : 300; if (!d.isClosed && !d.isResizing) if ("click" == a.slideTrigger_close) b(); else if (!a.preventQuickSlideClose ||
!k.isLayoutBusy) if (!a.preventPrematureSlideClose || !c || !f.layout.isMouseOverElem(c, r[e])) c ? E.set(e + "_closeSlider", b, z(a.slideDelay_close, j)) : b()
    } 
}, ma = function (a, b) {
    var c = r[a]; if (b) c.css({ zIndex: k.zIndex.pane_animate }), "south" == a ? c.css({ top: u.insetTop + u.innerHeight - c.outerHeight() }) : "east" == a && c.css({ left: u.insetLeft + u.innerWidth - c.outerWidth() }); else {
        c.css({ zIndex: l[a].isSliding ? k.zIndex.pane_sliding : k.zIndex.pane_normal }); "south" == a ? c.css({ top: "auto" }) : "east" == a && c.css({ left: "auto" }); var e = n[a]; f.layout.browser.msie &&
e.fxOpacityFix && "slide" != e.fxName_open && c.css("filter") && 1 == c.css("opacity") && c[0].style.removeAttribute("filter")
    } 
}, ba = function (a, b) { var c = n[a], e = x[a], d = c.slideTrigger_open.toLowerCase(); if (e && (!b || c.slidable)) { if (d.match(/mouseover/)) d = c.slideTrigger_open = "mouseenter"; else if (!d.match(/click|dblclick|mouseenter/)) d = c.slideTrigger_open = "click"; e[b ? "bind" : "unbind"](d + "." + B, Qa).css("cursor", b ? c.sliderCursor : "default").attr("title", b ? c.sliderTip : "") } }, ja = function (a, b) {
    function c(b) {
        E.clear(a + "_closeSlider");
        b.stopPropagation()
    } var e = n[a], d = l[a], f = k.zIndex, g = e.slideTrigger_close.toLowerCase(), i = b ? "bind" : "unbind", m = r[a], h = x[a]; d.isSliding = b; E.clear(a + "_closeSlider"); b && ba(a, !1); m.css("zIndex", b ? f.pane_sliding : f.pane_normal); h.css("zIndex", b ? f.pane_sliding : f.resizer_normal); if (!g.match(/click|mouseleave/)) g = e.slideTrigger_close = "mouseleave"; h[i](g, za); "mouseleave" == g && (m[i]("mouseleave." + B, za), h[i]("mouseenter." + B, c), m[i]("mouseenter." + B, c)); b ? "click" == g && !e.resizable && (h.css("cursor", b ? e.sliderCursor :
"default"), h.attr("title", b ? e.togglerTip_open : "")) : E.clear(a + "_closeSlider")
}, X = function (a, b, c, e) {
    var b = n[a], d = l[a], j = k[a], g = r[a], i = x[a], m = "vert" == j.dir, h = !1; if ("center" == a || m && d.noVerticalRoom) if ((h = 0 < d.maxHeight) && d.noRoom) { g.show(); i && i.show(); d.isVisible = !0; d.noRoom = !1; if (m) d.noVerticalRoom = !1; Ha(a) } else if (!h && !d.noRoom) g.hide(), i && i.hide(), d.isVisible = !1, d.noRoom = !0; if ("center" != a) if (d.minSize <= d.maxSize) {
        if (d.size > d.maxSize ? $(a, d.maxSize, c, e) : d.size < d.minSize ? $(a, d.minSize, c, e) : i && g.is(":visible") &&
(c = j.side.toLowerCase(), e = d.size + u["inset" + j.side], f.layout.cssNum(i, c) != e && i.css(c, e)), d.noRoom) d.wasOpen && b.closable ? b.autoReopen ? M(a, !1, !0, !0) : d.noRoom = !1 : ha(a, d.wasOpen, !0, !0)
    } else if (!d.noRoom) d.noRoom = !0, d.wasOpen = !d.isClosed && !d.isSliding, d.isClosed || (b.closable ? H(a, !0, !0) : ka(a, !0))
}, ya = function (a, b, c) { if (w()) { var e = n[a], d = e.resizeWhileDragging && !k.isLayoutBusy; e.autoResize = !1; $(a, b, c, d) } }, $ = function (a, b, c, e) {
    if (w()) {
        var d = n[a], j = l[a], g = r[a], i = x[a], m = k[a].side.toLowerCase(), h = k[a].sizeType.toLowerCase(),
I = "inset" + k[a].side, o = k.isLayoutBusy && !d.triggerEventsWhileDragging, p; N(a); p = j.size; b = W(a, b); b = z(b, W(a, d.minSize)); b = Math.min(b, j.maxSize); if (b < j.minSize) X(a, !1, c); else if (e || b != p) !c && l.initialized && j.isVisible && v(a, d.onresize_start), g.css(h, z(1, "horz" == k[a].dir ? K(a, b) : J(a, b))), j.size = b, f.extend(j, O(g)), i && g.is(":visible") && i.css(m, b + u[I]), fa(a), !c && !o && l.initialized && j.isVisible && (v(a, d.onresize_end || d.onresize), aa(a)), c || (j.isSliding || Y("horz" == k[a].dir ? "all" : "center", o, e), ia("all")), a = k.altSide[a],
b < p && l[a].noRoom && (N(a), X(a, !1, c))
    } 
}, Y = function (a, b, c) {
    if (!a || "all" == a) a = "east,west,center"; f.each(a.split(","), function (a, d) {
        if (r[d]) {
            var j = n[d], g = l[d], i = r[d], m = !0, h = {}, m = { top: R("north", !0), bottom: R("south", !0), left: R("west", !0), right: R("east", !0), width: 0, height: 0 }; m.width = u.innerWidth - m.left - m.right; m.height = u.innerHeight - m.bottom - m.top; m.top += u.insetTop; m.bottom += u.insetBottom; m.left += u.insetLeft; m.right += u.insetRight; f.extend(g, O(i)); if ("center" == d) {
                if (!c && g.isVisible && m.width == g.outerWidth &&
m.height == g.outerHeight) return !0; f.extend(g, la(d), { maxWidth: m.width, maxHeight: m.height }); h = m; h.width = J(d, h.width); h.height = K(d, h.height); m = 0 < h.width && 0 < h.height; if (!m && !l.initialized && 0 < j.minWidth) { var k = j.minWidth - g.outerWidth, o = n.east.minSize || 0, p = n.west.minSize || 0, q = l.east.size, t = l.west.size, w = q, x = t; 0 < k && l.east.isVisible && q > o && (w = z(q - o, q - k), k -= q - w); 0 < k && l.west.isVisible && t > p && (x = z(t - p, t - k), k -= t - x); if (0 == k) { q != o && $("east", w, !0); t != p && $("west", x, !0); Y("center", b, c); return } } 
            } else {
                g.isVisible && !g.noVerticalRoom &&
f.extend(g, O(i), la(d)); if (!c && !g.noVerticalRoom && m.height == g.outerHeight) return !0; h.top = m.top; h.bottom = m.bottom; h.height = K(d, m.height); g.maxHeight = z(0, h.height); m = 0 < g.maxHeight; if (!m) g.noVerticalRoom = !0
            } m ? (!b && l.initialized && v(d, j.onresize_start), i.css(h), g.noRoom && !g.isClosed && !g.isHidden && X(d), g.isVisible && (f.extend(g, O(i)), l.initialized && fa(d))) : !g.noRoom && g.isVisible && X(d); if (!g.isVisible) return !0; if ("center" == d) g = f.layout.browser, g = g.isIE6 || g.msie && !g.boxModel, r.north && (g || "IFRAME" == l.north.tagName) &&
r.north.css("width", J(r.north, u.innerWidth)), r.south && (g || "IFRAME" == l.south.tagName) && r.south.css("width", J(r.south, u.innerWidth)); !b && l.initialized && (v(d, j.onresize_end || j.onresize), aa(d))
        } 
    })
}, ga = function () {
    if (l.initialized) {
        if (q.is(":visible:") && (f.extend(l.container, O(q)), u.outerHeight)) {
            if (!1 === v(null, n.onresizeall_start)) return !1; var a, b, c; f.each(["south", "north", "east", "west"], function (a, d) { r[d] && (c = l[d], b = n[d], b.autoResize && c.size != b.size ? $(d, b.size, !0, !0) : (N(d), X(d, !1, !0, !0))) }); Y("all", !0,
!0); ia("all"); b = n; f.each(k.allPanes.split(","), function (c, d) { if ((a = r[d]) && l[d].isVisible) v(d, b[d].onresize_end || b[d].onresize), aa(d) }); v(null, b.onresizeall_end || b.onresizeall)
        } 
    } else ta()
}, aa = function (a) { var b = r[a], c = P[a]; n[a].resizeNestedLayout && (b.data("layoutContainer") ? b.layout().resizeAll() : c && c.data("layoutContainer") && c.layout().resizeAll()) }, fa = function (a, b) {
    if (w()) {
        if (!a || "all" == a) a = k.allPanes; f.each(a.split(","), function (a, e) {
            function d(a) {
                return z(o.css.paddingBottom, parseInt(a.css("marginBottom"),
10) || 0)
            } function f() { var a = n[e].contentIgnoreSelector, a = i.nextAll().not(a || ":lt(0)"), b = a.filter(":visible"), c = b.filter(":last"); p = { top: i[0].offsetTop, height: i.outerHeight(), numFooters: a.length, hiddenFooters: a.length - b.length, spaceBelow: 0 }; p.spaceAbove = p.top; p.bottom = p.top + p.height; p.spaceBelow = c.length ? c[0].offsetTop + c.outerHeight() - p.bottom + d(c) : d(i) } var g = r[e], i = P[e], h = n[e], o = l[e], p = o.content; if (!g || !i || !g.is(":visible")) return !0; if (!1 !== v(null, h.onsizecontent_start)) {
                if (!k.isLayoutBusy || void 0 ==
p.top || b || h.resizeContentWhileDragging) f(), 0 < p.hiddenFooters && "hidden" == g.css("overflow") && (g.css("overflow", "visible"), f(), g.css("overflow", "hidden")); g = o.innerHeight - (p.spaceAbove - o.css.paddingTop) - (p.spaceBelow - o.css.paddingBottom); if (!i.is(":visible") || p.height != g) Ra(i, g, !0), p.height = g; l.initialized && (v(e, h.onsizecontent_end || h.onsizecontent), aa(e))
            } 
        })
    } 
}, ia = function (a) {
    if (!a || "all" == a) a = k.borderPanes; f.each(a.split(","), function (a, c) {
        var e = n[c], d = l[c], h = r[c], g = x[c], i = D[c], m; if (h && g) {
            var p = k[c].dir,
o = d.isClosed ? "_closed" : "_open", q = e["spacing" + o], t = e["togglerAlign" + o], o = e["togglerLength" + o], v; if (0 == q) g.hide(); else {
                !d.noRoom && !d.isHidden && g.show(); "horz" == p ? (v = h.outerWidth(), d.resizerLength = v, g.css({ width: z(1, J(g, v)), height: z(0, K(g, q)), left: f.layout.cssNum(h, "left") })) : (v = h.outerHeight(), d.resizerLength = v, g.css({ height: z(1, K(g, v)), width: z(0, J(g, q)), top: u.insetTop + R("north", !0) })); S(e, g); if (i) {
                    if (0 == o || d.isSliding && e.hideTogglerOnSlide) { i.hide(); return } i.show(); if (!(0 < o) || "100%" == o || o > v) o = v, t =
0; else if (G(t)) switch (t) { case "top": case "left": t = 0; break; case "bottom": case "right": t = v - o; break; default: t = Math.floor((v - o) / 2) } else h = parseInt(t, 10), t = 0 <= t ? h : v - o + h; if ("horz" == p) { var w = J(i, o); i.css({ width: z(0, w), height: z(1, K(i, q)), left: t, top: 0 }); i.children(".content").each(function () { m = f(this); m.css("marginLeft", Math.floor((w - m.outerWidth()) / 2)) }) } else {
                        var y = K(i, o); i.css({ height: z(0, y), width: z(1, J(i, q)), top: t, left: 0 }); i.children(".content").each(function () {
                            m = f(this); m.css("marginTop", Math.floor((y -
m.outerHeight()) / 2))
                        })
                    } S(0, i)
                } if (!l.initialized && (e.initHidden || d.noRoom)) g.hide(), i && i.hide()
            } 
        } 
    })
}, Pa = function (a) { if (w()) { var b = D[a], c = n[a]; if (b) c.closable = !0, b.bind("click." + B, function (b) { b.stopPropagation(); da(a) }).bind("mouseenter." + B, ra).bind("mouseleave." + B, S).css("visibility", "visible").css("cursor", "pointer").attr("title", l[a].isClosed ? c.togglerTip_closed : c.togglerTip_open).show() } }, q = f(this).eq(0); if (!q.length) return n.showErrorMessages && alert(C.errContainerMissing), null; if (q.data("layoutContainer") &&
q.data("layout")) return q.data("layout"); var r = {}, P = {}, x = {}, D = {}, u = l.container, B = l.id, ea = { options: n, state: l, container: q, panes: r, contents: P, resizers: x, togglers: D, toggle: da, hide: ka, show: ha, open: M, close: H, slideOpen: Qa, slideClose: za, slideToggle: function (a) { da(a, !0) }, initContent: Oa, sizeContent: fa, sizePane: ya, swapPanes: function (a, b) {
    function c(a) { var b = r[a], c = P[a]; return !b ? !1 : { pane: a, P: b ? b[0] : !1, C: c ? c[0] : !1, state: f.extend({}, l[a]), options: f.extend({}, n[a])} } function e(a, b) {
        if (a) {
            var c = a.P, d = a.C, e = a.pane,
h = k[b], j = h.side.toLowerCase(), o = "inset" + h.side, p = f.extend({}, l[b]), q = n[b], t = { resizerCursor: q.resizerCursor }; f.each("fxName,fxSpeed,fxSettings".split(","), function (a, b) { t[b] = q[b]; t[b + "_open"] = q[b + "_open"]; t[b + "_close"] = q[b + "_close"] }); r[b] = f(c).data("layoutEdge", b).css(k.hidden).css(h.cssReq); P[b] = d ? f(d) : !1; n[b] = f.extend({}, a.options, t); l[b] = f.extend({}, a.state); c.className = c.className.replace(RegExp(q.paneClass + "-" + e, "g"), q.paneClass + "-" + b); ua(b); h.dir != k[e].dir ? (c = g[b] || 0, N(b), c = z(c, l[b].minSize),
ya(b, c, !0)) : x[b].css(j, u[o] + (l[b].isVisible ? R(b) : 0)); a.state.isVisible && !p.isVisible ? wa(b, !0) : (xa(b), ba(b, !0)); a = null
        } 
    } if (w()) {
        l[a].edge = b; l[b].edge = a; var d = !1; !1 === v(a, n[a].onswap_start) && (d = !0); !d && !1 === v(b, n[b].onswap_start) && (d = !0); if (d) l[a].edge = a, l[b].edge = b; else {
            var d = c(a), h = c(b), g = {}; g[a] = d ? d.state.size : 0; g[b] = h ? h.state.size : 0; r[a] = !1; r[b] = !1; l[a] = {}; l[b] = {}; D[a] && D[a].remove(); D[b] && D[b].remove(); x[a] && x[a].remove(); x[b] && x[b].remove(); x[a] = x[b] = D[a] = D[b] = !1; e(d, b); e(h, a); d = h = g = null; r[a] &&
r[a].css(k.visible); r[b] && r[b].css(k.visible); ga(); v(a, n[a].onswap_end || n[a].onswap); v(b, n[b].onswap_end || n[b].onswap)
        } 
    } 
}, resizeAll: ga, initPanes: w, destroy: function () {
    f(window).unbind("." + B); f(document).unbind("." + B); f.each(k.allPanes.split(","), function (a, b) { va(b, !1, !0) }); q.removeData("layout").removeData("layoutContainer").removeClass(n.containerClass); !q.data("layoutEdge") && q.data("layoutCSS") && q.css(q.data("layoutCSS")).removeData("layoutCSS"); "BODY" == u.tagName && (q = f("html")).data("layoutCSS") &&
q.css(q.data("layoutCSS")).removeData("layoutCSS"); La()
}, addPane: Na, removePane: va, setSizeLimits: N, bindButton: L, addToggleBtn: A, addOpenBtn: y, addCloseBtn: T, addPinBtn: ca, allowOverflow: o, resetOverflow: t, encodeJSON: Ba, decodeJSON: Aa, getState: oa, getCookie: Z, saveCookie: na, deleteCookie: function () { na("", { expires: -1 }) }, loadCookie: Ca, loadState: Da, cssWidth: J, cssHeight: K, enableClosable: Pa, disableClosable: function (a, b) {
    if (w()) {
        var c = D[a]; if (c) n[a].closable = !1, l[a].isClosed && M(a, !1, !0), c.unbind("." + B).css("visibility",
b ? "hidden" : "visible").css("cursor", "default").attr("title", "")
    } 
}, enableSlidable: function (a) { if (w()) { var b = x[a]; if (b && b.data("draggable")) n[a].slidable = !0, s.isClosed && ba(a, !0) } }, disableSlidable: function (a) { if (w()) { var b = x[a]; if (b) n[a].slidable = !1, l[a].isSliding ? H(a, !1, !0) : (ba(a, !1), b.css("cursor", "default").attr("title", ""), S(null, b[0])) } }, enableResizable: function (a) {
    if (w()) {
        var b = x[a], c = n[a]; if (b && b.data("draggable")) c.resizable = !0, b.draggable("enable").bind("mouseenter." + B, Ia).bind("mouseleave." +
B, sa), l[a].isClosed || b.css("cursor", c.resizerCursor).attr("title", c.resizerTip)
    } 
}, disableResizable: function (a) { if (w()) { var b = x[a]; if (b && b.data("draggable")) n[a].resizable = !1, b.draggable("disable").unbind("." + B).css("cursor", "default").attr("title", ""), S(null, b[0]) } } 
}; return "cancel" === function () {
    Ua(); var a = n; f.layout.browser.boxModel = f.support.boxModel; a.useStateCookie && a.cookie.autoLoad && Ca(); l.creatingLayout = !0; if (!1 === v(null, a.onload_start)) return "cancel"; var b = u.tagName = q[0].tagName, c = n, e = "BODY" ==
b, d = {}, h = q.is(":visible"); u.selector = q.selector.split(".slice")[0]; u.ref = b + "/" + u.selector; q.data("layout", ea).data("layoutContainer", B).addClass(c.containerClass); q.data("layoutCSS") || (e ? (d = f.extend(f.layout.getElementCSS(q, "overflow,position,margin,padding,border"), { height: q.css("height"), overflow: q.css("overflow"), overflowX: q.css("overflowX"), overflowY: q.css("overflowY") }), b = f("html"), b.data("layoutCSS", { height: "auto", overflow: b.css("overflow"), overflowX: b.css("overflowX"), overflowY: b.css("overflowY") })) :
d = f.layout.getElementCSS(q, "overflow,position,margin,padding,border,top,bottom,left,right,width,height,overflow,overflowX,overflowY"), q.data("layoutCSS", d)); try {
        if (e) f("html").css({ height: "100%", overflow: "hidden", overflowX: "hidden", overflowY: "hidden" }), f("body").css({ position: "relative", height: "100%", overflow: "hidden", overflowX: "hidden", overflowY: "hidden", margin: 0, padding: 0, border: "none" }), f.extend(u, O(q)); else {
            var d = { overflow: "hidden", overflowX: "hidden", overflowY: "hidden" }, g = q.css("position"); q.css("height");
            if (!q.data("layoutRole") && (!g || !g.match(/fixed|absolute|relative/))) d.position = "relative"; q.css(d); h && (f.extend(u, O(q)), c.showErrorMessages && 2 > u.innerHeight && alert(C.errContainerHeight.replace(/CONTAINER/, u.ref)))
        } 
    } catch (i) { } Ma(); a.autoBindCustomButtons && Wa(); f(window).bind("unload." + B, La); a.initPanes && ta(); delete l.creatingLayout; return l.initialized
} () ? null : ea
    } 
})(jQuery);