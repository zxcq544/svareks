/*
 Input Mask plugin for jquery
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 - 2014 Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 2.5.8
 */
(function (d) {
    if (void 0 === d.fn.inputmask) {
        var Q = function (d) {
            var k = document.createElement("input");
            d = "on" + d;
            var a = d in k;
            a || (k.setAttribute(d, "return;"), a = "function" == typeof k[d]);
            return a
        }, D = function (e, k, a) {
            return(e = a.aliases[e]) ? (e.alias && D(e.alias, void 0, a), d.extend(!0, a, e), d.extend(!0, a, k), !0) : !1
        }, C = function (e) {
            function k(a) {
                e.numericInput && (a = a.split("").reverse().join(""));
                var g = !1, k = 0, n = e.greedy, p = e.repeat;
                "*" == p && (n = !1);
                1 == a.length && !1 == n && 0 != p && (e.placeholder = "");
                a = d.map(a.split(""), function (a, d) {
                    var l = [];
                    if (a == e.escapeChar)g = !0; else if (a != e.optionalmarker.start && a != e.optionalmarker.end || g) {
                        var p = e.definitions[a];
                        if (p && !g)for (var r = 0; r < p.cardinality; r++)l.push(e.placeholder.charAt((k + r) % e.placeholder.length)); else l.push(a), g = !1;
                        k += l.length;
                        return l
                    }
                });
                for (var s = a.slice(), r = 1; r < p && n; r++)s = s.concat(a.slice());
                return{mask: s, repeat: p, greedy: n}
            }

            function a(a) {
                e.numericInput && (a = a.split("").reverse().join(""));
                var g = !1, k = !1, p = !1;
                return d.map(a.split(""), function (a, d) {
                    var l = [];
                    if (a == e.escapeChar)k = !0; else {
                        if (a != e.optionalmarker.start || k) {
                            if (a != e.optionalmarker.end || k) {
                                var m = e.definitions[a];
                                if (m && !k) {
                                    for (var u = m.prevalidator, x = u ? u.length : 0, w = 1; w < m.cardinality; w++) {
                                        var B = x >= w ? u[w - 1] : [], J = B.validator, B = B.cardinality;
                                        l.push({fn: J ? "string" == typeof J ? RegExp(J) : new function () {
                                            this.test = J
                                        } : /./, cardinality: B ? B : 1, optionality: g, newBlockMarker: !0 == g ? p : !1, offset: 0, casing: m.casing, def: m.definitionSymbol || a});
                                        !0 == g && (p = !1)
                                    }
                                    l.push({fn: m.validator ? "string" == typeof m.validator ? RegExp(m.validator) : new function () {
                                        this.test =
                                            m.validator
                                    } : /./, cardinality: m.cardinality, optionality: g, newBlockMarker: p, offset: 0, casing: m.casing, def: m.definitionSymbol || a})
                                } else l.push({fn: null, cardinality: 0, optionality: g, newBlockMarker: p, offset: 0, casing: null, def: a}), k = !1;
                                p = !1;
                                return l
                            }
                            g = !1
                        } else g = !0;
                        p = !0
                    }
                })
            }

            function m(a) {
                for (var d = a.length, g = 0; g < d && a.charAt(g) != e.optionalmarker.start; g++);
                var k = [a.substring(0, g)];
                g < d && k.push(a.substring(g + 1, d));
                return k
            }

            function g(l, t, x) {
                for (var n = 0, w = 0, s = t.length, r = 0; r < s && !(t.charAt(r) == e.optionalmarker.start &&
                n++, t.charAt(r) == e.optionalmarker.end && w++, 0 < n && n == w); r++);
                n = [t.substring(0, r)];
                r < s && n.push(t.substring(r + 1, s));
                r = m(n[0]);
                1 < r.length ? (t = l + r[0] + (e.optionalmarker.start + r[1] + e.optionalmarker.end) + (1 < n.length ? n[1] : ""), -1 == d.inArray(t, p) && "" != t && (p.push(t), s = k(t), u.push({mask: t, _buffer: s.mask, buffer: s.mask.slice(), tests: a(t), lastValidPosition: -1, greedy: s.greedy, repeat: s.repeat, metadata: x})), t = l + r[0] + (1 < n.length ? n[1] : ""), -1 == d.inArray(t, p) && "" != t && (p.push(t), s = k(t), u.push({mask: t, _buffer: s.mask, buffer: s.mask.slice(),
                    tests: a(t), lastValidPosition: -1, greedy: s.greedy, repeat: s.repeat, metadata: x})), 1 < m(r[1]).length && g(l + r[0], r[1] + n[1], x), 1 < n.length && 1 < m(n[1]).length && (g(l + r[0] + (e.optionalmarker.start + r[1] + e.optionalmarker.end), n[1], x), g(l + r[0], n[1], x))) : (t = l + n, -1 == d.inArray(t, p) && "" != t && (p.push(t), s = k(t), u.push({mask: t, _buffer: s.mask, buffer: s.mask.slice(), tests: a(t), lastValidPosition: -1, greedy: s.greedy, repeat: s.repeat, metadata: x})))
            }

            var u = [], p = [];
            d.isFunction(e.mask) && (e.mask = e.mask.call(this, e));
            d.isArray(e.mask) ?
                d.each(e.mask, function (a, d) {
                    void 0 != d.mask ? g("", d.mask.toString(), d) : g("", d.toString())
                }) : g("", e.mask.toString());
            return e.greedy ? u : u.sort(function (a, d) {
                return a.mask.length - d.mask.length
            })
        }, fa = "function" === typeof ScriptEngineMajorVersion ? ScriptEngineMajorVersion() : 10 <= (new Function("/*@cc_on return @_jscript_version; @*/"))(), x = navigator.userAgent, ga = null !== x.match(/iphone/i), ha = null !== x.match(/android.*safari.*/i), ia = null !== x.match(/android.*chrome.*/i), Y = null !== x.match(/android.*firefox.*/i), Z =
            /Kindle/i.test(x) || /Silk/i.test(x) || /KFTT/i.test(x) || /KFOT/i.test(x) || /KFJWA/i.test(x) || /KFJWI/i.test(x) || /KFSOWI/i.test(x) || /KFTHWA/i.test(x) || /KFTHWI/i.test(x) || /KFAPWA/i.test(x) || /KFAPWI/i.test(x), S = Q("paste") ? "paste" : Q("input") ? "input" : "propertychange", w = function (e, k, a, m) {
            function g() {
                return e[k]
            }

            function u() {
                return g().tests
            }

            function p() {
                return g()._buffer
            }

            function l() {
                return g().buffer
            }

            function t(h, c, b) {
                function f(h, b, c, f) {
                    for (var d = w(h), g = c ? 1 : 0, v = "", L = b.buffer, e = b.tests[d].cardinality; e > g; e--)v +=
                        H(L, d - (e - 1));
                    c && (v += c);
                    return null != b.tests[d].fn ? b.tests[d].fn.test(v, L, h, f, a) : c == H(b._buffer.slice(), h, !0) || c == a.skipOptionalPartCharacter ? {refresh: !0, c: H(b._buffer.slice(), h, !0), pos: h} : !1
                }

                if (b = !0 === b) {
                    var v = f(h, g(), c, b);
                    !0 === v && (v = {pos: h});
                    return v
                }
                var L = [], v = !1, K = k, p = l().slice(), m = g().lastValidPosition;
                F(h);
                var t = [];
                d.each(e, function (a, d) {
                    if ("object" == typeof d) {
                        k = a;
                        var e = h, y = g().lastValidPosition, q;
                        if (y == m) {
                            if (1 < e - m)for (y = -1 == y ? 0 : y; y < e && (q = f(y, g(), p[y], !0), !1 !== q); y++)G(l(), y, p[y], !0), !0 === q &&
                            (q = {pos: y}), q = q.pos || y, g().lastValidPosition < q && (g().lastValidPosition = q);
                            if (!n(e) && !f(e, g(), c, b)) {
                                y = r(e) - e;
                                for (q = 0; q < y && !1 === f(++e, g(), c, b); q++);
                                t.push(k)
                            }
                        }
                        (g().lastValidPosition >= m || k == K) && 0 <= e && e < s() && (v = f(e, g(), c, b), !1 !== v && (!0 === v && (v = {pos: e}), q = v.pos || e, g().lastValidPosition < q && (g().lastValidPosition = q)), L.push({activeMasksetIndex: a, result: v}))
                    }
                });
                k = K;
                return function (a, b) {
                    var g = !1;
                    d.each(b, function (h, b) {
                        if (g = -1 == d.inArray(b.activeMasksetIndex, a) && !1 !== b.result)return!1
                    });
                    if (g)b = d.map(b, function (h, b) {
                        if (-1 == d.inArray(h.activeMasksetIndex, a))return h;
                        e[h.activeMasksetIndex].lastValidPosition = m
                    }); else {
                        var v = -1, L = -1, l;
                        d.each(b, function (h, b) {
                            -1 != d.inArray(b.activeMasksetIndex, a) && !1 !== b.result & (-1 == v || v > b.result.pos) && (v = b.result.pos, L = b.activeMasksetIndex)
                        });
                        b = d.map(b, function (b, g) {
                            if (-1 != d.inArray(b.activeMasksetIndex, a)) {
                                if (b.result.pos == v)return b;
                                if (!1 !== b.result) {
                                    for (var K = h; K < v; K++)if (l = f(K, e[b.activeMasksetIndex], e[L].buffer[K], !0), !1 === l) {
                                        e[b.activeMasksetIndex].lastValidPosition = v - 1;
                                        break
                                    } else G(e[b.activeMasksetIndex].buffer, K, e[L].buffer[K], !0), e[b.activeMasksetIndex].lastValidPosition = K;
                                    l = f(v, e[b.activeMasksetIndex], c, !0);
                                    !1 !== l && (G(e[b.activeMasksetIndex].buffer, v, c, !0), e[b.activeMasksetIndex].lastValidPosition = v);
                                    return b
                                }
                            }
                        })
                    }
                    return b
                }(t, L)
            }

            function x() {
                var a = k, c = {activeMasksetIndex: 0, lastValidPosition: -1, next: -1};
                d.each(e, function (a, h) {
                    "object" == typeof h && (k = a, g().lastValidPosition > c.lastValidPosition ? (c.activeMasksetIndex = a, c.lastValidPosition = g().lastValidPosition, c.next =
                        r(g().lastValidPosition)) : g().lastValidPosition == c.lastValidPosition && (-1 == c.next || c.next > r(g().lastValidPosition)) && (c.activeMasksetIndex = a, c.lastValidPosition = g().lastValidPosition, c.next = r(g().lastValidPosition)))
                });
                k = -1 != c.lastValidPosition && e[a].lastValidPosition == c.lastValidPosition ? a : c.activeMasksetIndex;
                a != k && (J(l(), r(c.lastValidPosition), s()), g().writeOutBuffer = !0);
                q.data("_inputmask").activeMasksetIndex = k
            }

            function n(a) {
                a = w(a);
                a = u()[a];
                return void 0 != a ? a.fn : !1
            }

            function w(a) {
                return a % u().length
            }

            function s() {
                var h = p(), c = g().greedy, b = g().repeat, f = l();
                if (d.isFunction(a.getMaskLength))return a.getMaskLength(h, c, b, f, a);
                var v = h.length;
                c || ("*" == b ? v = f.length + 1 : 1 < b && (v += h.length * (b - 1)));
                return v
            }

            function r(a) {
                var c = s();
                if (a >= c)return c;
                for (; ++a < c && !n(a););
                return a
            }

            function F(a) {
                if (0 >= a)return 0;
                for (; 0 < --a && !n(a););
                return a
            }

            function G(a, c, b, f) {
                f && (c = D(a, c));
                f = u()[w(c)];
                var d = b;
                if (void 0 != d && void 0 != f)switch (f.casing) {
                    case "upper":
                        d = b.toUpperCase();
                        break;
                    case "lower":
                        d = b.toLowerCase()
                }
                a[c] = d
            }

            function H(a, c, b) {
                b && (c = D(a, c));
                return a[c]
            }

            function D(a, c) {
                for (var b; void 0 == a[c] && a.length < s();)for (b = 0; void 0 !== p()[b];)a.push(p()[b++]);
                return c
            }

            function B(a, c, b) {
                a._valueSet(c.join(""));
                void 0 != b && z(a, b)
            }

            function J(a, c, b, f) {
                for (var d = s(); c < b && c < d; c++)!0 === f ? n(c) || G(a, c, "") : G(a, c, H(p().slice(), c, !0))
            }

            function C(a, c) {
                var b = w(c);
                G(a, c, H(p(), b))
            }

            function O(h) {
                return a.placeholder.charAt(h % a.placeholder.length)
            }

            function I(a, c, b, f, v) {
                f = void 0 != f ? f.slice() : T(a._valueGet()).split("");
                d.each(e, function (a, b) {
                    "object" == typeof b && (b.buffer = b._buffer.slice(), b.lastValidPosition = -1, b.p = -1)
                });
                !0 !== b && (k = 0);
                c && a._valueSet("");
                s();
                d.each(f, function (f, e) {
                    if (!0 === v) {
                        var l = g().p, l = -1 == l ? l : F(l), k = -1 == l ? f : r(l);
                        -1 == d.inArray(e, p().slice(l + 1, k)) && R.call(a, void 0, !0, e.charCodeAt(0), c, b, f)
                    } else R.call(a, void 0, !0, e.charCodeAt(0), c, b, f), b = b || 0 < f && f > g().p
                });
                !0 === b && -1 != g().p && (g().lastValidPosition = F(g().p))
            }

            function Q(a) {
                return d.inputmask.escapeRegex.call(this, a)
            }

            function T(a) {
                return a.replace(RegExp("(" + Q(p().join("")) + ")*$"),
                    "")
            }

            function U(a) {
                var c = l(), b = c.slice(), f, d;
                for (d = b.length - 1; 0 <= d; d--)if (f = w(d), u()[f].optionality)if (n(d) && t(d, c[d], !0))break; else b.pop(); else break;
                B(a, b)
            }

            function ja(h, c) {
                if (!u() || !0 !== c && h.hasClass("hasDatepicker"))return h[0]._valueGet();
                var b = d.map(l(), function (a, b) {
                    return n(b) && t(b, a, !0) ? a : null
                }), b = (A ? b.reverse() : b).join("");
                return d.isFunction(a.onUnMask) ? a.onUnMask.call(h, l().join(""), b, a) : b
            }

            function M(h) {
                !A || "number" != typeof h || a.greedy && "" == a.placeholder || (h = l().length - h);
                return h
            }

            function z(h, c, b) {
                var f = h.jquery && 0 < h.length ? h[0] : h;
                if ("number" == typeof c)c = M(c), b = M(b), d(f).is(":visible") && (b = "number" == typeof b ? b : c, f.scrollLeft = f.scrollWidth, !1 == a.insertMode && c == b && b++, f.setSelectionRange ? (f.selectionStart = c, f.selectionEnd = b) : f.createTextRange && (h = f.createTextRange(), h.collapse(!0), h.moveEnd("character", b), h.moveStart("character", c), h.select())); else {
                    if (!d(h).is(":visible"))return{begin: 0, end: 0};
                    f.setSelectionRange ? (c = f.selectionStart, b = f.selectionEnd) : document.selection && document.selection.createRange &&
                    (h = document.selection.createRange(), c = 0 - h.duplicate().moveStart("character", -1E5), b = c + h.text.length);
                    c = M(c);
                    b = M(b);
                    return{begin: c, end: b}
                }
            }

            function P(h) {
                if (d.isFunction(a.isComplete))return a.isComplete.call(q, h, a);
                if ("*" != a.repeat) {
                    var c = !1, b = 0, f = k;
                    d.each(e, function (a, f) {
                        if ("object" == typeof f) {
                            k = a;
                            var d = F(s());
                            if (f.lastValidPosition >= b && f.lastValidPosition == d) {
                                for (var g = !0, e = 0; e <= d; e++) {
                                    var l = n(e), m = w(e);
                                    if (l && (void 0 == h[e] || h[e] == O(e)) || !l && h[e] != p()[m]) {
                                        g = !1;
                                        break
                                    }
                                }
                                if (c = c || g)return!1
                            }
                            b = f.lastValidPosition
                        }
                    });
                    k = f;
                    return c
                }
            }

            function ka(a) {
                a = d._data(a).events;
                d.each(a, function (a, b) {
                    d.each(b, function (a, b) {
                        if ("inputmask" == b.namespace && "setvalue" != b.type) {
                            var c = b.handler;
                            b.handler = function (a) {
                                if (this.readOnly || this.disabled)a.preventDefault; else return c.apply(this, arguments)
                            }
                        }
                    })
                })
            }

            function la(a) {
                function c(a) {
                    if (void 0 == d.valHooks[a] || !0 != d.valHooks[a].inputmaskpatch) {
                        var b = d.valHooks[a] && d.valHooks[a].get ? d.valHooks[a].get : function (a) {
                            return a.value
                        }, c = d.valHooks[a] && d.valHooks[a].set ? d.valHooks[a].set : function (a, b) {
                            a.value = b;
                            return a
                        };
                        d.valHooks[a] = {get: function (a) {
                            var c = d(a);
                            if (c.data("_inputmask")) {
                                if (c.data("_inputmask").opts.autoUnmask)return c.inputmask("unmaskedvalue");
                                a = b(a);
                                c = c.data("_inputmask");
                                return a != c.masksets[c.activeMasksetIndex]._buffer.join("") ? a : ""
                            }
                            return b(a)
                        }, set: function (a, b) {
                            var f = d(a), h = c(a, b);
                            f.data("_inputmask") && f.triggerHandler("setvalue.inputmask");
                            return h
                        }, inputmaskpatch: !0}
                    }
                }

                var b;
                Object.getOwnPropertyDescriptor && (b = Object.getOwnPropertyDescriptor(a, "value"));
                if (b && b.get) {
                    if (!a._valueGet) {
                        var f =
                            b.get, g = b.set;
                        a._valueGet = function () {
                            return A ? f.call(this).split("").reverse().join("") : f.call(this)
                        };
                        a._valueSet = function (a) {
                            g.call(this, A ? a.split("").reverse().join("") : a)
                        };
                        Object.defineProperty(a, "value", {get: function () {
                            var a = d(this), b = d(this).data("_inputmask"), c = b.masksets, h = b.activeMasksetIndex;
                            return b && b.opts.autoUnmask ? a.inputmask("unmaskedvalue") : f.call(this) != c[h]._buffer.join("") ? f.call(this) : ""
                        }, set: function (a) {
                            g.call(this, a);
                            d(this).triggerHandler("setvalue.inputmask")
                        }})
                    }
                } else document.__lookupGetter__ &&
                a.__lookupGetter__("value") ? a._valueGet || (f = a.__lookupGetter__("value"), g = a.__lookupSetter__("value"), a._valueGet = function () {
                    return A ? f.call(this).split("").reverse().join("") : f.call(this)
                }, a._valueSet = function (a) {
                    g.call(this, A ? a.split("").reverse().join("") : a)
                }, a.__defineGetter__("value", function () {
                    var a = d(this), b = d(this).data("_inputmask"), c = b.masksets, h = b.activeMasksetIndex;
                    return b && b.opts.autoUnmask ? a.inputmask("unmaskedvalue") : f.call(this) != c[h]._buffer.join("") ? f.call(this) : ""
                }), a.__defineSetter__("value",
                    function (a) {
                        g.call(this, a);
                        d(this).triggerHandler("setvalue.inputmask")
                    })) : (a._valueGet || (a._valueGet = function () {
                    return A ? this.value.split("").reverse().join("") : this.value
                }, a._valueSet = function (a) {
                    this.value = A ? a.split("").reverse().join("") : a
                }), c(a.type))
            }

            function $(a, c, b, f) {
                var d = l();
                if (!1 !== f)for (; !n(a) && 0 <= a - 1;)a--;
                for (f = a; f < c && f < s(); f++)if (n(f)) {
                    C(d, f);
                    var e = r(f), k = H(d, e);
                    if (k != O(e))if (e < s() && !1 !== t(f, k, !0) && u()[w(f)].def == u()[w(e)].def)G(d, f, k, !0); else if (n(f))break
                } else C(d, f);
                void 0 != b && G(d,
                    F(c), b);
                if (!1 == g().greedy) {
                    c = T(d.join("")).split("");
                    d.length = c.length;
                    f = 0;
                    for (b = d.length; f < b; f++)d[f] = c[f];
                    0 == d.length && (g().buffer = p().slice())
                }
                return a
            }

            function aa(a, c, b) {
                var d = l();
                if (H(d, a, !0) != O(a))for (var e = F(c); e > a && 0 <= e; e--)if (n(e)) {
                    var k = F(e), m = H(d, k);
                    m != O(k) && !1 !== t(e, m, !0) && u()[w(e)].def == u()[w(k)].def && (G(d, e, m, !0), C(d, k))
                } else C(d, e);
                void 0 != b && H(d, a) == O(a) && G(d, a, b);
                a = d.length;
                if (!1 == g().greedy) {
                    b = T(d.join("")).split("");
                    d.length = b.length;
                    e = 0;
                    for (k = d.length; e < k; e++)d[e] = b[e];
                    0 == d.length &&
                    (g().buffer = p().slice())
                }
                return c - (a - d.length)
            }

            function ba(d, c, b) {
                if (a.numericInput || A) {
                    switch (c) {
                        case a.keyCode.BACKSPACE:
                            c = a.keyCode.DELETE;
                            break;
                        case a.keyCode.DELETE:
                            c = a.keyCode.BACKSPACE
                    }
                    if (A) {
                        var f = b.end;
                        b.end = b.begin;
                        b.begin = f
                    }
                }
                f = !0;
                b.begin == b.end ? (f = c == a.keyCode.BACKSPACE ? b.begin - 1 : b.begin, a.isNumeric && "" != a.radixPoint && l()[f] == a.radixPoint && (b.begin = l().length - 1 == f ? b.begin : c == a.keyCode.BACKSPACE ? f : r(f), b.end = b.begin), f = !1, c == a.keyCode.BACKSPACE ? b.begin-- : c == a.keyCode.DELETE && b.end++) : 1 !=
                b.end - b.begin || a.insertMode || (f = !1, c == a.keyCode.BACKSPACE && b.begin--);
                J(l(), b.begin, b.end);
                var e = s();
                if (!1 == a.greedy && (isNaN(a.repeat) || 0 < a.repeat))$(b.begin, e, void 0, !A && c == a.keyCode.BACKSPACE && !f); else {
                    for (var k = b.begin, m = b.begin; m < b.end; m++)if (n(m) || !f)k = $(b.begin, e, void 0, !A && c == a.keyCode.BACKSPACE && !f);
                    f || (b.begin = k)
                }
                c = r(-1);
                J(l(), b.begin, b.end, !0);
                I(d, !1, !1, l());
                g().lastValidPosition < c ? (g().lastValidPosition = -1, g().p = c) : g().p = b.begin
            }

            function V(e) {
                W = !1;
                var c = this, b = d(c), f = e.keyCode, k = z(c);
                f ==
                a.keyCode.BACKSPACE || f == a.keyCode.DELETE || ga && 127 == f || e.ctrlKey && 88 == f ? (e.preventDefault(), 88 == f && (N = l().join("")), ba(c, f, k), x(), B(c, l(), g().p), c._valueGet() == p().join("") && b.trigger("cleared"), a.showTooltip && b.prop("title", g().mask)) : f == a.keyCode.END || f == a.keyCode.PAGE_DOWN ? setTimeout(function () {
                    var b = r(g().lastValidPosition);
                    a.insertMode || b != s() || e.shiftKey || b--;
                    z(c, e.shiftKey ? k.begin : b, b)
                }, 0) : f == a.keyCode.HOME && !e.shiftKey || f == a.keyCode.PAGE_UP ? z(c, 0, e.shiftKey ? k.begin : 0) : f == a.keyCode.ESCAPE ||
                90 == f && e.ctrlKey ? (I(c, !0, !1, N.split("")), b.click()) : f != a.keyCode.INSERT || e.shiftKey || e.ctrlKey ? !1 != a.insertMode || e.shiftKey || (f == a.keyCode.RIGHT ? setTimeout(function () {
                    var a = z(c);
                    z(c, a.begin)
                }, 0) : f == a.keyCode.LEFT && setTimeout(function () {
                    var a = z(c);
                    z(c, a.begin - 1)
                }, 0)) : (a.insertMode = !a.insertMode, z(c, a.insertMode || k.begin != s() ? k.begin : k.begin - 1));
                b = z(c);
                !0 === a.onKeyDown.call(this, e, l(), a) && z(c, b.begin, b.end);
                ca = -1 != d.inArray(f, a.ignorables)
            }

            function R(h, c, b, f, m, p) {
                if (void 0 == b && W)return!1;
                W = !0;
                var q =
                    d(this);
                h = h || window.event;
                b = c ? b : h.which || h.charCode || h.keyCode;
                if (!(!0 === c || h.ctrlKey && h.altKey) && (h.ctrlKey || h.metaKey || ca))return!0;
                if (b) {
                    !0 !== c && 46 == b && !1 == h.shiftKey && "," == a.radixPoint && (b = 44);
                    var n, w, u = String.fromCharCode(b);
                    c ? (b = m ? p : g().lastValidPosition + 1, n = {begin: b, end: b}) : n = z(this);
                    p = A ? 1 < n.begin - n.end || 1 == n.begin - n.end && a.insertMode : 1 < n.end - n.begin || 1 == n.end - n.begin && a.insertMode;
                    var D = k;
                    p && (d.each(e, function (a, b) {
                        "object" == typeof b && (k = a, g().undoBuffer = l().join(""))
                    }), k = D, ba(this, a.keyCode.DELETE,
                        n), a.insertMode || d.each(e, function (a, b) {
                        "object" == typeof b && (k = a, aa(n.begin, s()), g().lastValidPosition = r(g().lastValidPosition))
                    }), k = D);
                    var C = l().join("").indexOf(a.radixPoint);
                    a.isNumeric && !0 !== c && -1 != C && (a.greedy && n.begin <= C ? (n.begin = F(n.begin), n.end = n.begin) : u == a.radixPoint && (n.begin = C, n.end = n.begin));
                    var E = n.begin;
                    b = t(E, u, m);
                    !0 === m && (b = [
                        {activeMasksetIndex: k, result: b}
                    ]);
                    var y = -1;
                    d.each(b, function (b, d) {
                        k = d.activeMasksetIndex;
                        g().writeOutBuffer = !0;
                        var c = d.result;
                        if (!1 !== c) {
                            var e = !1, f = l();
                            !0 !== c &&
                            (e = c.refresh, E = void 0 != c.pos ? c.pos : E, u = void 0 != c.c ? c.c : u);
                            if (!0 !== e) {
                                if (!0 == a.insertMode) {
                                    c = s();
                                    for (f = f.slice(); H(f, c, !0) != O(c) && c >= E;)c = 0 == c ? -1 : F(c);
                                    c >= E ? (aa(E, s(), u), f = g().lastValidPosition, c = r(f), c != s() && f >= E && H(l().slice(), c, !0) != O(c) && (g().lastValidPosition = c)) : g().writeOutBuffer = !1
                                } else G(f, E, u, !0);
                                if (-1 == y || y > r(E))y = r(E)
                            } else!m && (f = E < s() ? E + 1 : E, -1 == y || y > f) && (y = f);
                            y > g().p && (g().p = y)
                        }
                    });
                    !0 !== m && (k = D, x());
                    if (!1 !== f)if (d.each(b, function (a, b) {
                            if (b.activeMasksetIndex == k)return w = b, !1
                        }), void 0 != w) {
                        var J =
                            this;
                        setTimeout(function () {
                            a.onKeyValidation.call(J, w.result, a)
                        }, 0);
                        if (g().writeOutBuffer && !1 !== w.result) {
                            var I = l();
                            f = c ? void 0 : a.numericInput ? E > C ? F(y) : u == a.radixPoint ? y - 1 : F(y - 1) : y;
                            B(this, I, f);
                            !0 !== c && setTimeout(function () {
                                !0 === P(I) && q.trigger("complete");
                                X = !0;
                                q.trigger("input")
                            }, 0)
                        } else p && (g().buffer = g().undoBuffer.split(""))
                    } else p && (g().buffer = g().undoBuffer.split(""));
                    a.showTooltip && q.prop("title", g().mask);
                    h && (h.preventDefault ? h.preventDefault() : h.returnValue = !1)
                }
            }

            function da(e) {
                var c = d(this),
                    b = e.keyCode, f = l();
                a.onKeyUp.call(this, e, f, a);
                b == a.keyCode.TAB && a.showMaskOnFocus && (c.hasClass("focus.inputmask") && 0 == this._valueGet().length ? (f = p().slice(), B(this, f), z(this, 0), N = l().join("")) : (B(this, f), f.join("") == p().join("") && -1 != d.inArray(a.radixPoint, f) ? (z(this, M(0)), c.click()) : z(this, M(0), M(s()))))
            }

            function ea(e) {
                if (!0 === X && "input" == e.type)return X = !1, !0;
                var c = this, b = d(c);
                if ("propertychange" == e.type && c._valueGet().length <= s())return!0;
                setTimeout(function () {
                    var f = d.isFunction(a.onBeforePaste) ?
                        a.onBeforePaste.call(c, c._valueGet(), a) : c._valueGet();
                    I(c, !1, !1, f.split(""), !0);
                    B(c, l());
                    !0 === P(l()) && b.trigger("complete");
                    b.click()
                }, 0)
            }

            function ma(e) {
                var c = d(this), b = z(this), f = this._valueGet(), f = f.replace(RegExp("(" + Q(p().join("")) + ")*"), "");
                b.begin > f.length && (z(this, f.length), b = z(this));
                1 != l().length - f.length || f.charAt(b.begin) == l()[b.begin] || f.charAt(b.begin + 1) == l()[b.begin] || n(b.begin) ? (I(this, !1, !1, f.split("")), B(this, l()), !0 === P(l()) && c.trigger("complete"), c.click()) : (e.keyCode = a.keyCode.BACKSPACE,
                    V.call(this, e));
                e.preventDefault()
            }

            function na(h) {
                q = d(h);
                if (q.is(":input")) {
                    q.data("_inputmask", {masksets: e, activeMasksetIndex: k, opts: a, isRTL: !1});
                    a.showTooltip && q.prop("title", g().mask);
                    g().greedy = g().greedy ? g().greedy : 0 == g().repeat;
                    if (null != q.attr("maxLength")) {
                        var c = q.prop("maxLength");
                        -1 < c && d.each(e, function (a, b) {
                            "object" == typeof b && "*" == b.repeat && (b.repeat = c)
                        });
                        s() >= c && -1 < c && (c < p().length && (p().length = c), !1 == g().greedy && (g().repeat = Math.round(c / p().length)), q.prop("maxLength", 2 * s()))
                    }
                    la(h);
                    a.numericInput &&
                    (a.isNumeric = a.numericInput);
                    ("rtl" == h.dir || a.numericInput && a.rightAlignNumerics || a.isNumeric && a.rightAlignNumerics) && q.css("text-align", "right");
                    if ("rtl" == h.dir || a.numericInput) {
                        h.dir = "ltr";
                        q.removeAttr("dir");
                        var b = q.data("_inputmask");
                        b.isRTL = !0;
                        q.data("_inputmask", b);
                        A = !0
                    }
                    q.unbind(".inputmask");
                    q.removeClass("focus.inputmask");
                    q.closest("form").bind("submit", function () {
                        N != l().join("") && q.change()
                    }).bind("reset", function () {
                        setTimeout(function () {
                            q.trigger("setvalue")
                        }, 0)
                    });
                    q.bind("mouseenter.inputmask",
                        function () {
                            !d(this).hasClass("focus.inputmask") && a.showMaskOnHover && this._valueGet() != l().join("") && B(this, l())
                        }).bind("blur.inputmask", function () {
                            var b = d(this), c = this._valueGet(), f = l();
                            b.removeClass("focus.inputmask");
                            N != l().join("") && b.change();
                            a.clearMaskOnLostFocus && "" != c && (c == p().join("") ? this._valueSet("") : U(this));
                            !1 === P(f) && (b.trigger("incomplete"), a.clearIncomplete && (d.each(e, function (a, b) {
                                "object" == typeof b && (b.buffer = b._buffer.slice(), b.lastValidPosition = -1)
                            }), k = 0, a.clearMaskOnLostFocus ?
                                this._valueSet("") : (f = p().slice(), B(this, f))))
                        }).bind("focus.inputmask", function () {
                            var b = d(this), c = this._valueGet();
                            a.showMaskOnFocus && !b.hasClass("focus.inputmask") && (!a.showMaskOnHover || a.showMaskOnHover && "" == c) && this._valueGet() != l().join("") && B(this, l(), r(g().lastValidPosition));
                            b.addClass("focus.inputmask");
                            N = l().join("")
                        }).bind("mouseleave.inputmask", function () {
                            var b = d(this);
                            a.clearMaskOnLostFocus && (b.hasClass("focus.inputmask") || this._valueGet() == b.attr("placeholder") || (this._valueGet() == p().join("") ||
                            "" == this._valueGet() ? this._valueSet("") : U(this)))
                        }).bind("click.inputmask", function () {
                            var b = this;
                            setTimeout(function () {
                                var c = z(b), f = l();
                                if (c.begin == c.end) {
                                    var c = A ? M(c.begin) : c.begin, e = g().lastValidPosition, f = a.isNumeric ? !1 === a.skipRadixDance && "" != a.radixPoint && -1 != d.inArray(a.radixPoint, f) ? a.numericInput ? r(d.inArray(a.radixPoint, f)) : d.inArray(a.radixPoint, f) : r(e) : r(e);
                                    c < f ? n(c) ? z(b, c) : z(b, r(c)) : z(b, f)
                                }
                            }, 0)
                        }).bind("dblclick.inputmask", function () {
                            var a = this;
                            setTimeout(function () {
                                    z(a, 0, r(g().lastValidPosition))
                                },
                                0)
                        }).bind(S + ".inputmask dragdrop.inputmask drop.inputmask", ea).bind("setvalue.inputmask", function () {
                            I(this, !0);
                            N = l().join("");
                            this._valueGet() == p().join("") && this._valueSet("")
                        }).bind("complete.inputmask", a.oncomplete).bind("incomplete.inputmask", a.onincomplete).bind("cleared.inputmask", a.oncleared);
                    q.bind("keydown.inputmask", V).bind("keypress.inputmask", R).bind("keyup.inputmask", da);
                    if (ha || Y || ia || Z)if (q.attr("autocomplete", "off").attr("autocorrect", "off").attr("autocapitalize", "off").attr("spellcheck",
                            !1), Y || Z)q.unbind("keydown.inputmask", V).unbind("keypress.inputmask", R).unbind("keyup.inputmask", da), "input" == S && q.unbind(S + ".inputmask"), q.bind("input.inputmask", ma);
                    fa && q.bind("input.inputmask", ea);
                    b = d.isFunction(a.onBeforeMask) ? a.onBeforeMask.call(h, h._valueGet(), a) : h._valueGet();
                    I(h, !0, !1, b.split(""));
                    N = l().join("");
                    var f;
                    try {
                        f = document.activeElement
                    } catch (m) {
                    }
                    f === h ? (q.addClass("focus.inputmask"), z(h, r(g().lastValidPosition))) : a.clearMaskOnLostFocus ? l().join("") == p().join("") ? h._valueSet("") :
                        U(h) : B(h, l());
                    ka(h)
                }
            }

            var A = !1, N = l().join(""), q, W = !1, X = !1, ca = !1;
            if (void 0 != m)switch (m.action) {
                case "isComplete":
                    return P(m.buffer);
                case "unmaskedvalue":
                    return A = m.$input.data("_inputmask").isRTL, ja(m.$input, m.skipDatepickerCheck);
                case "mask":
                    na(m.el);
                    break;
                case "format":
                    return q = d({}), q.data("_inputmask", {masksets: e, activeMasksetIndex: k, opts: a, isRTL: a.numericInput}), a.numericInput && (a.isNumeric = a.numericInput, A = !0), m = m.value.split(""), I(q, !1, !1, A ? m.reverse() : m, !0), A ? l().reverse().join("") : l().join("");
                case "isValid":
                    return q = d({}), q.data("_inputmask", {masksets: e, activeMasksetIndex: k, opts: a, isRTL: a.numericInput}), a.numericInput && (a.isNumeric = a.numericInput, A = !0), m = m.value.split(""), I(q, !1, !0, A ? m.reverse() : m), P(l())
            }
        };
        d.inputmask = {defaults: {placeholder: "_", optionalmarker: {start: "[", end: "]"}, quantifiermarker: {start: "{", end: "}"}, groupmarker: {start: "(", end: ")"}, escapeChar: "\\", mask: null, oncomplete: d.noop, onincomplete: d.noop, oncleared: d.noop, repeat: 0, greedy: !0, autoUnmask: !1, clearMaskOnLostFocus: !0, insertMode: !0,
            clearIncomplete: !1, aliases: {}, onKeyUp: d.noop, onKeyDown: d.noop, onBeforeMask: void 0, onBeforePaste: void 0, onUnMask: void 0, showMaskOnFocus: !0, showMaskOnHover: !0, onKeyValidation: d.noop, skipOptionalPartCharacter: " ", showTooltip: !1, numericInput: !1, isNumeric: !1, radixPoint: "", skipRadixDance: !1, rightAlignNumerics: !0, definitions: {9: {validator: "[0-9]", cardinality: 1, definitionSymbol: "*"}, a: {validator: "[A-Za-z\u0410-\u044f\u0401\u0451]", cardinality: 1, definitionSymbol: "*"}, "*": {validator: "[A-Za-z\u0410-\u044f\u0401\u04510-9]",
                cardinality: 1}}, keyCode: {ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, COMMAND: 91, COMMAND_LEFT: 91, COMMAND_RIGHT: 93, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, MENU: 93, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38, WINDOWS: 91}, ignorables: [8, 9, 13, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
            getMaskLength: void 0, isComplete: void 0}, escapeRegex: function (d) {
            return d.replace(RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)", "gim"), "\\$1")
        }, format: function (e, k) {
            var a = d.extend(!0, {}, d.inputmask.defaults, k);
            D(a.alias, k, a);
            return w(C(a), 0, a, {action: "format", value: e})
        }, isValid: function (e, k) {
            var a = d.extend(!0, {}, d.inputmask.defaults, k);
            D(a.alias, k, a);
            return w(C(a), 0, a, {action: "isValid", value: e})
        }};
        d.fn.inputmask = function (e, k) {
            var a = d.extend(!0, {}, d.inputmask.defaults, k), m, g = 0;
            if ("string" === typeof e)switch (e) {
                case "mask":
                    return D(a.alias, k, a), m = C(a), 0 == m.length ? this : this.each(function () {
                        w(d.extend(!0, {}, m), 0, a, {action: "mask", el: this})
                    });
                case "unmaskedvalue":
                    var u = d(this);
                    return u.data("_inputmask") ? (m = u.data("_inputmask").masksets, g = u.data("_inputmask").activeMasksetIndex, a = u.data("_inputmask").opts, w(m, g, a, {action: "unmaskedvalue", $input: u})) : u.val();
                case "remove":
                    return this.each(function () {
                        var e = d(this);
                        if (e.data("_inputmask")) {
                            m = e.data("_inputmask").masksets;
                            g = e.data("_inputmask").activeMasksetIndex;
                            a = e.data("_inputmask").opts;
                            this._valueSet(w(m, g, a, {action: "unmaskedvalue", $input: e, skipDatepickerCheck: !0}));
                            e.removeData("_inputmask");
                            e.unbind(".inputmask");
                            e.removeClass("focus.inputmask");
                            var l;
                            Object.getOwnPropertyDescriptor && (l = Object.getOwnPropertyDescriptor(this, "value"));
                            l && l.get ? this._valueGet && Object.defineProperty(this, "value", {get: this._valueGet, set: this._valueSet}) : document.__lookupGetter__ && this.__lookupGetter__("value") && this._valueGet && (this.__defineGetter__("value", this._valueGet),
                                this.__defineSetter__("value", this._valueSet));
                            try {
                                delete this._valueGet, delete this._valueSet
                            } catch (k) {
                                this._valueSet = this._valueGet = void 0
                            }
                        }
                    });
                case "getemptymask":
                    return this.data("_inputmask") ? (m = this.data("_inputmask").masksets, g = this.data("_inputmask").activeMasksetIndex, m[g]._buffer.join("")) : "";
                case "hasMaskedValue":
                    return this.data("_inputmask") ? !this.data("_inputmask").opts.autoUnmask : !1;
                case "isComplete":
                    return m = this.data("_inputmask").masksets, g = this.data("_inputmask").activeMasksetIndex,
                        a = this.data("_inputmask").opts, w(m, g, a, {action: "isComplete", buffer: this[0]._valueGet().split("")});
                case "getmetadata":
                    if (this.data("_inputmask"))return m = this.data("_inputmask").masksets, g = this.data("_inputmask").activeMasksetIndex, m[g].metadata;
                    break;
                default:
                    return D(e, k, a) || (a.mask = e), m = C(a), 0 == m.length ? this : this.each(function () {
                        w(d.extend(!0, {}, m), g, a, {action: "mask", el: this})
                    })
            } else {
                if ("object" == typeof e)return a = d.extend(!0, {}, d.inputmask.defaults, e), D(a.alias, e, a), m = C(a), 0 == m.length ? this : this.each(function () {
                    w(d.extend(!0,
                        {}, m), g, a, {action: "mask", el: this})
                });
                if (void 0 == e)return this.each(function () {
                    var e = d(this).attr("data-inputmask");
                    if (e && "" != e)try {
                        var e = e.replace(RegExp("'", "g"), '"'), g = d.parseJSON("{" + e + "}");
                        d.extend(!0, g, k);
                        a = d.extend(!0, {}, d.inputmask.defaults, g);
                        D(a.alias, g, a);
                        a.alias = void 0;
                        d(this).inputmask(a)
                    } catch (m) {
                    }
                })
            }
        }
    }
})(jQuery);
