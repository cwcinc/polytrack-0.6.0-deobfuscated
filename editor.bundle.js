"use strict";
(self.webpackChunk = self.webpackChunk || []).push([['editor'], {
    2346: (t, e, n) => {
        n.d(e, {
            A: () => r
        });
        var i = n(1601)
          , s = n.n(i)
          , o = n(6314)
          , a = n.n(o)()(s());
        a.push([t.id, ".editor-side-toolbar-ui {\n\tdisplay: flex;\n\tflex-direction: column;\n\tposition: absolute;\n\tbottom: 40px;\n\tleft: var(--safe-area-left);\n}\n.editor-side-toolbar-ui.touch {\n\tbottom: 176px;\n}\n\n.editor-side-toolbar-ui > .accordion {\n\tdisplay: flex;\n\tflex-direction: row;\n\twidth: 100px;\n\toverflow: hidden; /* Use hidden if clip is not supported */\n\toverflow: clip;\n\ttransition: width 0.25s ease-out;\n}\n.editor-side-toolbar-ui.touch > .accordion {\n\twidth: 120px;\n}\n.editor-side-toolbar-ui > .accordion.open {\n\twidth: auto;\n}\n\n.editor-side-toolbar-ui button {\n\tposition: relative;\n\tflex-shrink: 0;\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100px;\n\theight: 100px;\n\tbackground-color: rgba(17, 32, 82, 0.48);\n\tborder: none;\n\tpointer-events: auto;\n\tcursor: pointer;\n\ttransition: background-color 0.25s ease-out;\n}\n.editor-side-toolbar-ui button:hover {\n\tbackground-color: rgba(37, 54, 105, 0.48);\n}\n.editor-side-toolbar-ui > .accordion > button:not(:first-of-type) {\n\tbackground-color: rgba(17, 32, 82, 0.35);\n}\n.editor-side-toolbar-ui > .accordion > button:not(:first-of-type):hover {\n\tbackground-color: rgba(37, 54, 105, 0.35);\n}\n.editor-side-toolbar-ui > .accordion > button:not(:first-of-type).selected {\n\tbackground-color: rgba(17, 32, 82, 0.55);\n}\n.editor-side-toolbar-ui > .accordion > button:not(:first-of-type):active {\n\tbackground-color: rgba(17, 32, 82, 0.6);\n}\n@media (hover: none) {\n\t.editor-side-toolbar-ui button:hover {\n\t\tbackground-color: rgba(17, 32, 82, 0.48);\n\t}\n}\n.editor-side-toolbar-ui button:active {\n\tbackground-color: rgba(17, 32, 82, 0.6);\n\ttransition: none;\n}\n\n.editor-side-toolbar-ui.touch button {\n\twidth: 120px;\n\theight: 120px;\n}\n\n.editor-side-toolbar-ui button img {\n\tmargin: 0;\n\tpadding: 20%;\n\tvertical-align: top;\n\twidth: 100%;\n    height: 100%;\n\tbox-sizing: border-box;\n\tpointer-events: none;\n\ttransition: transform 0.25s ease-out;\n\tfilter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));\n}\n.editor-side-toolbar-ui button:active img {\n\ttransition: none;\n\ttransform: scale(0.9);\n}\n\n.editor-side-toolbar-ui button.rotate > span {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tposition: absolute;\n\ttop: 0;\n\tleft: 1px;\n\twidth: 100%;\n\theight: 100%;\n\tcolor: var(--text-color);\n\tfont-size: 16px;\n\ttext-shadow: 0 0 2px #000;\n\tpointer-events: none;\n\ttransition: transform 0.25s ease-out;\n}\n.editor-side-toolbar-ui button.rotate:active > span {\n\ttransition: none;\n\ttransform: scale(0.9);\n}\n", ""]);
        const r = a
    }
    ,
    4124: (t, e, n) => {
        n.d(e, {
            default: () => xi
        });
        var i = n(1635)
          , s = n(5072)
          , o = n.n(s)
          , a = n(7825)
          , r = n.n(a)
          , h = n(7659)
          , l = n.n(h)
          , c = n(5056)
          , d = n.n(c)
          , g = n(540)
          , f = n.n(g)
          , p = n(1113)
          , u = n.n(p)
          , m = n(6057)
          , v = {};
        v.styleTagTransform = u(),
        v.setAttributes = d(),
        v.insert = l().bind(null, "head"),
        v.domAPI = r(),
        v.insertStyleElement = f();
        o()(m.A, v);
        m.A && m.A.locals && m.A.locals;
        var THREE = n(4922)
          , b = n(7024);
        class k extends b.N {
            constructor(t, e) {
                super(t, e),
                this.screenSpacePanning = !1,
                this.mouseButtons = {
                    LEFT: THREE.MOUSE.PAN,
                    MIDDLE: THREE.MOUSE.DOLLY,
                    RIGHT: THREE.MOUSE.ROTATE
                },
                this.touches = {
                    ONE: THREE.TOUCH.PAN,
                    TWO: THREE.TOUCH.DOLLY_ROTATE
                }
            }
        }
        class G extends THREE.Loader {
            constructor(t) {
                super(t)
            }
            load(t, e, n, i) {
                const s = this
                  , o = new THREE.FileLoader(this.manager);
                o.setPath(this.path),
                o.setRequestHeader(this.requestHeader),
                o.setWithCredentials(this.withCredentials),
                o.load(t, (function(t) {
                    const n = s.parse(JSON.parse(t));
                    e && e(n)
                }
                ), n, i)
            }
            parse(t) {
                return new x(t)
            }
        }
        class x {
            constructor(t) {
                this.isFont = !0,
                this.type = "Font",
                this.data = t
            }
            generateShapes(t, e=100, n="ltr") {
                const i = []
                  , s = function(t, e, n, i) {
                    const s = Array.from(t)
                      , o = e / n.resolution
                      , a = (n.boundingBox.yMax - n.boundingBox.yMin + n.underlineThickness) * o
                      , r = [];
                    let h = 0
                      , l = 0;
                    "rtl" != i && "tb" != i || s.reverse();
                    for (let t = 0; t < s.length; t++) {
                        const e = s[t];
                        if ("\n" === e)
                            h = 0,
                            l -= a;
                        else {
                            const t = y(e, o, h, l, n);
                            "tb" == i ? (h = 0,
                            l += n.ascender * o) : h += t.offsetX,
                            r.push(t.path)
                        }
                    }
                    return r
                }(t, e, this.data, n);
                for (let t = 0, e = s.length; t < e; t++)
                    i.push(...s[t].toShapes());
                return i
            }
        }
        function y(t, e, n, i, s) {
            const o = s.glyphs[t] || s.glyphs["?"];
            if (!o)
                return void console.error('THREE.Font: character "' + t + '" does not exists in font family ' + s.familyName + ".");
            const a = new THREE.ShapePath;
            let r, h, l, c, d, g, f, p;
            if (o.o) {
                const t = o._cachedOutline || (o._cachedOutline = o.o.split(" "));
                for (let s = 0, o = t.length; s < o; ) {
                    switch (t[s++]) {
                    case "m":
                        r = t[s++] * e + n,
                        h = t[s++] * e + i,
                        a.moveTo(r, h);
                        break;
                    case "l":
                        r = t[s++] * e + n,
                        h = t[s++] * e + i,
                        a.lineTo(r, h);
                        break;
                    case "q":
                        l = t[s++] * e + n,
                        c = t[s++] * e + i,
                        d = t[s++] * e + n,
                        g = t[s++] * e + i,
                        a.quadraticCurveTo(d, g, l, c);
                        break;
                    case "b":
                        l = t[s++] * e + n,
                        c = t[s++] * e + i,
                        d = t[s++] * e + n,
                        g = t[s++] * e + i,
                        f = t[s++] * e + n,
                        p = t[s++] * e + i,
                        a.bezierCurveTo(d, g, f, p, l, c)
                    }
                }
            }
            return {
                offsetX: o.ha * e,
                path: a
            }
        }
        var A, M, E, C, W, Track = n(8971), TrackPartTransform = n(5735);
        class z {
            constructor(t) {
                M.set(this, void 0),
                E.set(this, []),
                C.set(this, []),
                i.set(this, M, t, "f")
            }
            dispose() {
                for (const t of i.get(this, E, "f")) {
                    if (Array.isArray(t.material))
                        for (const e of t.material)
                            e.dispose();
                    else
                        t.material.dispose();
                    t.geometry.dispose(),
                    i.get(this, M, "f").scene.remove(t)
                }
                i.get(this, E, "f").length = 0
            }
            refresh(t) {
                if (null == i.get(A, A, "f", W))
                    throw new Error("Font is not loaded yet");
                const e = t.getCheckpoints();
                let n = !1;
                if (e.length == i.get(this, C, "f").length)
                    for (let t = 0; t < e.length; t++) {
                        const s = e[t]
                          , o = i.get(this, C, "f")[t];
                        if (s.x != o.x || s.y != o.y || s.z != o.z || s.rotation != o.rotation || s.rotationAxis != o.rotationAxis || s.type != o.type || s.checkpointOrder != o.checkpointOrder) {
                            n = !0;
                            break
                        }
                    }
                else
                    n = !0;
                if (n) {
                    this.dispose(),
                    i.set(this, C, e, "f");
                    const t = new THREE.MeshBasicMaterial({
                        color: 16777215
                    });
                    for (const n of e) {
                        const e = TrackPartTransform.rotationAndAxisToQuaternion(n.rotation, n.rotationAxis)
                          , s = new THREE.Vector3(...n.detector.center).add(new THREE.Vector3(0,-1.3,0)).applyQuaternion(e);
                        s.add(new THREE.Vector3(n.x * Track.A.partSize,n.y * Track.A.partSize,n.z * Track.A.partSize));
                        const o = i.get(A, A, "f", W).generateShapes((n.checkpointOrder + 1).toString(), 4)
                          , a = new THREE.ShapeGeometry(o);
                        a.computeBoundingBox();
                        const r = a.boundingBox;
                        if (null == r)
                            throw new Error("Bounding box is null");
                        const h = -.5 * (r.max.x - r.min.x);
                        a.translate(h, 0, 0);
                        const l = new THREE.Mesh(a,t);
                        l.position.copy(s),
                        l.quaternion.copy(e),
                        i.get(this, M, "f").scene.add(l),
                        i.get(this, E, "f").push(l);
                        const c = new THREE.Mesh(a,t);
                        c.position.copy(s),
                        c.quaternion.copy(e).multiply((new THREE.Quaternion).setFromEuler(new THREE.Euler(0,Math.PI,0))),
                        i.get(this, M, "f").scene.add(c),
                        i.get(this, E, "f").push(c)
                    }
                }
            }
            static initResources() {
                return null == i.get(this, A, "f", W) ? new Promise(( (t, e) => {
                    (new G).load("forced_square.json", (e => {
                        i.set(this, A, e, "f", W),
                        t()
                    }
                    ), void 0, e)
                }
                )) : Promise.resolve()
            }
        }
        A = z,
        M = new WeakMap,
        E = new WeakMap,
        C = new WeakMap,
        W = {
            value: null
        };
        const N = z;
        var S = n(7296)
          , T = {};
        T.styleTagTransform = u(),
        T.setAttributes = d(),
        T.insert = l().bind(null, "head"),
        T.domAPI = r(),
        T.insertStyleElement = f();
        o()(S.A, T);
        S.A && S.A.locals && S.A.locals;
        var q, D, O, I, B, _, U, R, H, K;
        D = new WeakMap,
        O = new WeakMap,
        I = new WeakMap,
        B = new WeakMap,
        _ = new WeakMap,
        U = new WeakMap,
        R = new WeakMap,
        q = new WeakSet,
        H = function() {
            i.get(this, _, "f").textContent = i.get(this, O, "f").get("Checkpoint order") + ": " + (this.checkpointOrder + 1).toString()
        }
        ,
        K = function(t) {
            const e = t.getCheckpointOrders()
              , n = new Set;
            for (const t of e)
                n.add(t);
            for (let t = 0; t < 65535; t++)
                if (!n.has(t))
                    return t;
            return 65535
        }
        ;
        const F = class {
            constructor(t, e, n, s) {
                q.add(this),
                D.set(this, void 0),
                O.set(this, void 0),
                I.set(this, void 0),
                B.set(this, void 0),
                _.set(this, void 0),
                U.set(this, 0),
                R.set(this, void 0),
                i.set(this, D, t, "f"),
                i.set(this, O, e, "f"),
                i.set(this, I, s, "f"),
                i.set(this, B, document.createElement("div"), "f"),
                i.get(this, B, "f").className = "hidden",
                t.appendChild(i.get(this, B, "f")),
                i.get(this, I, "f").addChangeListener(i.set(this, R, (t => {
                    t ? i.get(this, B, "f").classList.add("touch") : i.get(this, B, "f").classList.remove("touch")
                }
                ), "f"));
                const o = document.createElement("div");
                o.className = "buttons",
                i.get(this, B, "f").appendChild(o);
                const a = document.createElement("button");
                a.addEventListener("click", ( () => {
                    n.playUIClick(),
                    this.checkpointOrder++
                }
                )),
                a.addEventListener("contextmenu", (t => {
                    t.preventDefault()
                }
                )),
                o.appendChild(a);
                const r = document.createElement("img");
                r.src = "images/arrow_up.svg",
                a.appendChild(r);
                const h = document.createElement("button");
                h.addEventListener("click", ( () => {
                    n.playUIClick(),
                    this.checkpointOrder--
                }
                )),
                h.addEventListener("contextmenu", (t => {
                    t.preventDefault()
                }
                )),
                o.appendChild(h);
                const l = document.createElement("img");
                l.src = "images/arrow_down.svg",
                h.appendChild(l),
                i.set(this, _, document.createElement("p"), "f"),
                i.get(this, B, "f").appendChild(i.get(this, _, "f")),
                i.get(this, q, "m", H).call(this)
            }
            dispose() {
                i.get(this, D, "f").removeChild(i.get(this, B, "f")),
                i.get(this, I, "f").removeChangeListener(i.get(this, R, "f"))
            }
            hide() {
                i.get(this, B, "f").classList.add("hidden"),
                i.get(this, B, "f").classList.remove("editor-checkpoint-order-ui")
            }
            show() {
                i.get(this, B, "f").classList.remove("hidden"),
                i.get(this, B, "f").classList.add("editor-checkpoint-order-ui")
            }
            reset() {
                this.checkpointOrder = 0
            }
            get checkpointOrder() {
                return i.get(this, U, "f")
            }
            set checkpointOrder(t) {
                i.set(this, U, Math.max(0, Math.min(65535, t)), "f"),
                i.get(this, q, "m", H).call(this)
            }
            setFromExistingCheckpoints(t) {
                this.checkpointOrder = i.get(this, q, "m", K).call(this, t)
            }
        }
        ;
        var Y = n(5298)
          , V = {};
        V.styleTagTransform = u(),
        V.setAttributes = d(),
        V.insert = l().bind(null, "head"),
        V.domAPI = r(),
        V.insertStyleElement = f();
        o()(Y.A, V);
        Y.A && Y.A.locals && Y.A.locals;
        var Z, X, j, J, Q, $, tt, et, nt;
        Z = new WeakMap,
        X = new WeakMap,
        j = new WeakMap,
        J = new WeakMap,
        Q = new WeakMap,
        $ = new WeakMap,
        tt = new WeakMap,
        et = new WeakMap,
        nt = new WeakMap;
        const it = class {
            constructor(t, e, n, s, o) {
                Z.set(this, void 0),
                X.set(this, void 0),
                j.set(this, void 0),
                J.set(this, void 0),
                Q.set(this, void 0),
                $.set(this, void 0),
                tt.set(this, !1),
                et.set(this, !1),
                nt.set(this, void 0),
                i.set(this, Z, t, "f"),
                i.set(this, X, e, "f"),
                i.set(this, j, n, "f"),
                i.set(this, J, document.createElement("div"), "f"),
                i.get(this, J, "f").className = "editor-height-selector-ui",
                t.appendChild(i.get(this, J, "f")),
                i.get(this, j, "f").addChangeListener(i.set(this, $, (t => {
                    t ? i.get(this, J, "f").classList.add("touch") : i.get(this, J, "f").classList.remove("touch")
                }
                ), "f")),
                i.set(this, Q, document.createElement("p"), "f"),
                i.get(this, J, "f").appendChild(i.get(this, Q, "f"));
                const a = document.createElement("div");
                a.className = "buttons",
                i.get(this, J, "f").appendChild(a);
                const r = document.createElement("button");
                r.addEventListener("pointerdown", ( () => {
                    if (s(),
                    !i.get(this, tt, "f")) {
                        i.set(this, tt, !0, "f");
                        const t = () => {
                            i.get(this, tt, "f") && (s(),
                            setTimeout(t, 50))
                        }
                        ;
                        setTimeout(t, 500)
                    }
                }
                )),
                r.addEventListener("contextmenu", (t => {
                    t.preventDefault()
                }
                )),
                a.appendChild(r);
                const h = document.createElement("img");
                h.src = "images/arrow_up.svg",
                r.appendChild(h);
                const l = document.createElement("button");
                l.addEventListener("pointerdown", ( () => {
                    if (o(),
                    !i.get(this, et, "f")) {
                        i.set(this, et, !0, "f");
                        const t = () => {
                            i.get(this, et, "f") && (o(),
                            setTimeout(t, 50))
                        }
                        ;
                        setTimeout(t, 500)
                    }
                }
                )),
                l.addEventListener("contextmenu", (t => {
                    t.preventDefault()
                }
                )),
                a.appendChild(l);
                const c = document.createElement("img");
                c.src = "images/arrow_down.svg",
                l.appendChild(c),
                i.set(this, nt, ( () => {
                    i.set(this, tt, !1, "f"),
                    i.set(this, et, !1, "f")
                }
                ), "f"),
                window.addEventListener("pointerup", i.get(this, nt, "f"))
            }
            refresh(t) {
                i.get(this, Q, "f").textContent = i.get(this, X, "f").get("Height") + ": " + t.toString()
            }
            dispose() {
                i.get(this, Z, "f").removeChild(i.get(this, J, "f")),
                i.get(this, j, "f").removeChangeListener(i.get(this, $, "f")),
                window.removeEventListener("pointerup", i.get(this, nt, "f"))
            }
        }
        ;
        var RenderManager = n(2825).A
          , KeyBind = n(5818).A
          , TrackExportUI = n(579).A
          , TrackPartColorId = n(4183).A
          , Part = n(2203).A
          , TrackPartRotationAxis = n(8566).A;
        var ct = n(4839)
          , dt = n(7129)
          , TrackPartDetectorType = n(2247).A
          , ft = n(2346)
          , pt = {};
        pt.styleTagTransform = u(),
        pt.setAttributes = d(),
        pt.insert = l().bind(null, "head"),
        pt.domAPI = r(),
        pt.insertStyleElement = f();
        o()(ft.A, pt);
        ft.A && ft.A.locals && ft.A.locals;
        var ut, mt, vt, wt, bt, kt, Gt, xt;
        ut = new WeakMap,
        mt = new WeakMap,
        vt = new WeakMap,
        wt = new WeakMap,
        bt = new WeakMap,
        kt = new WeakMap,
        Gt = new WeakMap,
        xt = new WeakMap;
        const yt = class {
            constructor(t, e, n, s, o, a, r) {
                ut.set(this, void 0),
                mt.set(this, void 0),
                vt.set(this, void 0),
                wt.set(this, void 0),
                bt.set(this, void 0),
                kt.set(this, void 0),
                Gt.set(this, []),
                xt.set(this, void 0),
                i.set(this, ut, t, "f"),
                i.set(this, mt, n, "f"),
                i.set(this, vt, document.createElement("div"), "f"),
                i.get(this, vt, "f").className = "editor-side-toolbar-ui",
                i.get(this, ut, "f").appendChild(i.get(this, vt, "f"));
                let h = !1;
                const l = document.createElement("button")
                  , c = document.createElement("img");
                c.src = "images/overlapping_disabled.svg",
                l.appendChild(c),
                l.addEventListener("click", ( () => {
                    e.playUIClick(),
                    h = !h,
                    c.src = h ? "images/overlapping_enabled.svg" : "images/overlapping_disabled.svg",
                    s(h)
                }
                )),
                i.get(this, vt, "f").appendChild(l);
                let d = !0;
                const g = document.createElement("button")
                  , f = document.createElement("img");
                f.src = "images/grid_large.svg",
                g.appendChild(f),
                g.addEventListener("click", ( () => {
                    e.playUIClick(),
                    d = !d,
                    f.src = d ? "images/grid_large.svg" : "images/grid_small.svg",
                    o(d)
                }
                )),
                i.get(this, vt, "f").appendChild(g);
                const p = document.createElement("div");
                p.className = "accordion",
                i.get(this, vt, "f").appendChild(p),
                i.set(this, kt, document.createElement("button"), "f"),
                i.get(this, kt, "f").innerHTML = '<img src="images/rotation_axis_y_positive.svg">',
                i.get(this, kt, "f").addEventListener("click", ( () => {
                    e.playUIClick(),
                    p.classList.toggle("open");
                    for (const t of p.children)
                        t != i.get(this, kt, "f") && t instanceof HTMLButtonElement && (p.classList.contains("open") ? (t.inert = !1,
                        t.tabIndex = 0) : (t.inert = !0,
                        t.tabIndex = -1))
                }
                )),
                p.appendChild(i.get(this, kt, "f"));
                for (const t of [TrackPartRotationAxis.YPositive, TrackPartRotationAxis.YNegative, TrackPartRotationAxis.XPositive, TrackPartRotationAxis.XNegative, TrackPartRotationAxis.ZPositive, TrackPartRotationAxis.ZNegative]) {
                    const n = document.createElement("button");
                    switch (n.inert = !0,
                    n.tabIndex = -1,
                    t) {
                    case TrackPartRotationAxis.YPositive:
                        n.innerHTML = '<img src="images/rotation_axis_y_positive.svg">';
                        break;
                    case TrackPartRotationAxis.YNegative:
                        n.innerHTML = '<img src="images/rotation_axis_y_negative.svg">';
                        break;
                    case TrackPartRotationAxis.XPositive:
                        n.innerHTML = '<img src="images/rotation_axis_x_positive.svg">';
                        break;
                    case TrackPartRotationAxis.XNegative:
                        n.innerHTML = '<img src="images/rotation_axis_x_negative.svg">';
                        break;
                    case TrackPartRotationAxis.ZPositive:
                        n.innerHTML = '<img src="images/rotation_axis_z_positive.svg">';
                        break;
                    case TrackPartRotationAxis.ZNegative:
                        n.innerHTML = '<img src="images/rotation_axis_z_negative.svg">'
                    }
                    n.addEventListener("click", ( () => {
                        e.playUIClick(),
                        a(t)
                    }
                    )),
                    t == TrackPartRotationAxis.YPositive && n.classList.add("selected"),
                    p.appendChild(n),
                    i.get(this, Gt, "f").push([t, n])
                }
                const u = document.createElement("button");
                u.className = "rotate",
                u.addEventListener("click", ( () => {
                    e.playUIClick(),
                    r()
                }
                )),
                i.get(this, vt, "f").appendChild(u),
                i.set(this, wt, document.createElement("div"), "f"),
                i.get(this, wt, "f").innerHTML = '<img src="images/rotate.svg">',
                u.appendChild(i.get(this, wt, "f")),
                i.set(this, bt, document.createElement("span"), "f"),
                i.get(this, bt, "f").textContent = "0°",
                u.appendChild(i.get(this, bt, "f")),
                n.addChangeListener(i.set(this, xt, (t => {
                    t ? i.get(this, vt, "f").classList.add("touch") : i.get(this, vt, "f").classList.remove("touch")
                }
                ), "f"))
            }
            dispose() {
                i.get(this, ut, "f").removeChild(i.get(this, vt, "f")),
                i.get(this, mt, "f").removeChangeListener(i.get(this, xt, "f"))
            }
            set rotation(t) {
                i.get(this, wt, "f").style.transform = `rotate(${(90 * -t).toString()}deg)`,
                i.get(this, bt, "f").textContent = (90 * t).toString() + "°"
            }
            set rotationAxis(t) {
                let e;
                switch (t) {
                case TrackPartRotationAxis.YPositive:
                    e = "images/rotation_axis_y_positive.svg";
                    break;
                case TrackPartRotationAxis.YNegative:
                    e = "images/rotation_axis_y_negative.svg";
                    break;
                case TrackPartRotationAxis.XPositive:
                    e = "images/rotation_axis_x_positive.svg";
                    break;
                case TrackPartRotationAxis.XNegative:
                    e = "images/rotation_axis_x_negative.svg";
                    break;
                case TrackPartRotationAxis.ZPositive:
                    e = "images/rotation_axis_z_positive.svg";
                    break;
                case TrackPartRotationAxis.ZNegative:
                    e = "images/rotation_axis_z_negative.svg"
                }
                i.get(this, kt, "f").innerHTML = "";
                const n = document.createElement("img");
                n.src = e,
                i.get(this, kt, "f").appendChild(n);
                for (const [e,n] of i.get(this, Gt, "f"))
                    e == t ? n.classList.add("selected") : n.classList.remove("selected")
            }
            hide() {
                i.get(this, vt, "f").classList.add("hidden")
            }
            show() {
                i.get(this, vt, "f").classList.remove("hidden")
            }
        }
        ;
        var At = n(9242)
          , Mt = {};
        Mt.styleTagTransform = u(),
        Mt.setAttributes = d(),
        Mt.insert = l().bind(null, "head"),
        Mt.domAPI = r(),
        Mt.insertStyleElement = f();
        o()(At.A, Mt);
        At.A && At.A.locals && At.A.locals;
        var Et, Ct, Wt;
        Et = new WeakMap,
        Ct = new WeakMap,
        Wt = new WeakMap;
        const Lt = class {
            constructor(t, e, n, s, o, a, r, h) {
                Et.set(this, void 0),
                Ct.set(this, void 0),
                Wt.set(this, void 0);
                const l = document.getElementById("ui");
                if (null == l)
                    throw new Error("UI element not found");
                i.set(this, Et, l, "f"),
                i.set(this, Ct, document.createElement("div"), "f"),
                i.get(this, Ct, "f").className = "editor-help-ui",
                i.get(this, Et, "f").appendChild(i.get(this, Ct, "f"));
                const c = document.createElement("div");
                c.className = "background",
                i.get(this, Ct, "f").appendChild(c);
                const d = document.createElement("section");
                d.className = "container",
                i.get(this, Ct, "f").appendChild(d);
                const g = document.createElement("h1");
                g.textContent = e.get("How to use the editor"),
                d.appendChild(g);
                const f = document.createElement("section");
                f.className = "content",
                d.appendChild(f);
                const p = document.createElement("h2");
                function u(t) {
                    const i = n.getKeyBindings(t).filter((t => null != t));
                    return 0 == i.length ? e.get("Not set") : i.map((t => "[" + t + "]")).join(" " + e.get("or") + " ")
                }
                p.textContent = e.get("Camera controls"),
                f.appendChild(p);
                let m = "";
                s.touchEnabled ? (m += e.get("The camera can be moved by dragging with one finger. Rotate the camera by dragging with two fingers. Zoom in and out by pinching.") + "\n\n",
                m += e.get("The edited height can be changed by using the height selection in the bottom left corner.")) : (m += e.get("The camera can be moved by right clicking and dragging the mouse. Rotate the camera by clicking the middle mouse button (mouse wheel) or holding the control key and right clicking and dragging the mouse. Zoom in and out by scrolling the mouse wheel.") + "\n\n",
                m += e.get("Alternatively, the camera can also be controlled using the following keyboard keys:") + "\n\n",
                m += "\t" + e.get("Move forwards:") + " " + u(KeyBind.EditorMoveForwards) + "\n",
                m += "\t" + e.get("Move backwards:") + " " + u(KeyBind.EditorMoveBackwards) + "\n",
                m += "\t" + e.get("Move left:") + " " + u(KeyBind.EditorMoveLeft) + "\n",
                m += "\t" + e.get("Move right:") + " " + u(KeyBind.EditorMoveRight) + "\n",
                m += "\t" + e.get("Rotate left:") + " " + u(KeyBind.EditorRotateViewLeft) + "\n",
                m += "\t" + e.get("Rotate right:") + " " + u(KeyBind.EditorRotateViewRight) + "\n\n",
                m += e.get("The edited height can be changed either by using the height selection in the bottom left corner, or holding the shift key and scrolling the mouse wheel. Alternatively, you can use the following keyboard keys:") + "\n\n",
                m += "\t" + e.get("Move up:") + " " + u(KeyBind.EditorMoveUp) + "\n",
                m += "\t" + e.get("Move down:") + " " + u(KeyBind.EditorMoveDown));
                const v = document.createElement("p");
                v.textContent = m,
                f.appendChild(v);
                const w = document.createElement("h2");
                w.textContent = e.get("Editing"),
                f.appendChild(w);
                let b = "";
                s.touchEnabled ? (b += e.get("Track parts can be selected in the menu on the right after which they can be placed by tapping on the screen.") + "\n\n",
                b += e.get("The selected part can then be rotated by tapping the rotate button in the bottom left corner.") + "\n\n",
                b += e.get("Track parts can be deleted by using the delete tool in the right side menu.")) : (b += e.get("Track parts can be selected in the menu on the right after which they can be placed by left clicking with the mouse.") + "\n\n",
                b += e.get("Alternatively, the track part currently hovered by the mouse can be selected with the following keyboard shortcut:") + " " + u(KeyBind.EditorPick) + "\n\n",
                b += e.get("The selected part can then be rotated using the following keyboard shortcut:") + " " + u(KeyBind.EditorRotatePart) + "\n\n",
                b += e.get("Track parts can be deleted by using the delete tool in the right side menu or by holding the following key:") + " " + u(KeyBind.EditorDelete));
                const k = document.createElement("p");
                k.textContent = b,
                f.appendChild(k);
                const G = document.createElement("h2");
                G.textContent = e.get("Starting points, checkpoints and the finish line"),
                f.appendChild(G);
                let x = e.get("Starting points, checkpoints and finish lines can all be selected in the uppermost category in the right side menu.") + "\n\n";
                x += e.get("Each track must have at least one starting point. If there are multiple starting points, the last placed one will be used.") + "\n\n",
                x += e.get("Checkpoints should be placed between the starting point and the finish line. When a checkpoint track part is selected there will be a tool in the bottom right to select the order of the checkpoint. This determines the order in which the checkpoints must be passed before driving to the finish line. Notice that it is possible to have multiple checkpoints with the same checkpoint order.") + "\n\n",
                x += e.get("The finish line is where the track ends but will only become active after all checkpoints have been passed. It is also possible to have multiple finish lines.");
                const y = document.createElement("p");
                y.textContent = x,
                f.appendChild(y);
                const A = document.createElement("div");
                A.className = "part-images",
                f.appendChild(A);
                const M = document.createElement("div");
                A.appendChild(M);
                const E = document.createElement("img");
                E.className = "loading",
                o.then((t => {
                    E.className = "",
                    E.src = t
                }
                )).catch((t => {
                    console.error(t)
                }
                )),
                M.appendChild(E);
                const C = document.createElement("span");
                C.textContent = e.get("Starting point"),
                M.appendChild(C);
                const W = document.createElement("div");
                A.appendChild(W);
                const L = document.createElement("img");
                L.className = "loading",
                a.then((t => {
                    L.className = "",
                    L.src = t
                }
                )).catch((t => {
                    console.error(t)
                }
                )),
                W.appendChild(L);
                const P = document.createElement("span");
                P.textContent = e.get("Checkpoint"),
                W.appendChild(P);
                const z = document.createElement("div");
                A.appendChild(z);
                const N = document.createElement("img");
                N.className = "loading",
                r.then((t => {
                    N.className = "",
                    N.src = t
                }
                )).catch((t => {
                    console.error(t)
                }
                )),
                z.appendChild(N);
                const S = document.createElement("span");
                S.textContent = e.get("Finish line"),
                z.appendChild(S);
                const T = document.createElement("h2");
                T.textContent = e.get("Exporting the track"),
                f.appendChild(T);
                const q = e.get("When the track is finished, a name for the track can be entered in top left after which the track can be exported using the export button. This will reveal a track code which can be sent to other users so they can import and play the track.") + "\n\n"
                  , D = document.createElement("p");
                D.textContent = q,
                f.appendChild(D);
                const O = document.createElement("div");
                O.className = "button-wrapper",
                d.appendChild(O);
                const I = document.createElement("button");
                I.className = "button",
                I.innerHTML = '<img class="button-icon" src="images/cancel.svg"> ',
                I.append(document.createTextNode(e.get("Close"))),
                I.addEventListener("click", ( () => {
                    t.playUIClick(),
                    h()
                }
                )),
                O.appendChild(I),
                window.addEventListener("keydown", i.set(this, Wt, (t => {
                    "Escape" == t.code && (h(),
                    t.preventDefault())
                }
                ), "f"))
            }
            dispose() {
                i.get(this, Et, "f").removeChild(i.get(this, Ct, "f")),
                window.removeEventListener("keydown", i.get(this, Wt, "f"))
            }
        }
        ;
        var Pt = n(4512)
          , zt = {};
        zt.styleTagTransform = u(),
        zt.setAttributes = d(),
        zt.insert = l().bind(null, "head"),
        zt.domAPI = r(),
        zt.insertStyleElement = f();
        o()(Pt.A, zt);
        Pt.A && Pt.A.locals && Pt.A.locals;
        var Nt, St, Tt, qt, SunDirection = n(7680).A, TrackEnvironment = n(5169).A;
        Nt = new WeakMap,
        St = new WeakMap,
        Tt = new WeakMap,
        qt = new WeakMap;
        const It = class {
            constructor(t, e, n, s, o, a, r, h) {
                Nt.set(this, void 0),
                St.set(this, void 0),
                Tt.set(this, null),
                qt.set(this, void 0);
                const l = document.getElementById("ui");
                if (null == l)
                    throw new Error("UI element not found");
                i.set(this, Nt, l, "f"),
                i.set(this, St, document.createElement("div"), "f"),
                i.get(this, St, "f").className = "editor-track-settings-ui",
                i.get(this, Nt, "f").appendChild(i.get(this, St, "f"));
                const c = document.createElement("div");
                c.className = "background",
                i.get(this, St, "f").appendChild(c);
                const d = document.createElement("section");
                d.className = "container",
                i.get(this, St, "f").appendChild(d);
                const g = document.createElement("h1");
                g.textContent = e.get("Track settings"),
                d.appendChild(g);
                const f = document.createElement("section");
                f.className = "content",
                d.appendChild(f);
                const p = document.createElement("div");
                p.className = "setting",
                f.appendChild(p);
                const u = document.createElement("label");
                u.className = "title",
                u.append(document.createTextNode(e.get("Track name"))),
                p.appendChild(u);
                const m = document.createElement("input");
                m.type = "text",
                m.maxLength = 64,
                m.spellcheck = !1,
                m.value = n ?? "",
                m.addEventListener("input", ( () => {
                    0 == m.value.trim().length ? (null != i.get(this, Tt, "f") && (i.get(this, Tt, "f").disabled = !0),
                    p.classList.add("error")) : (null != i.get(this, Tt, "f") && (i.get(this, Tt, "f").disabled = !1),
                    p.classList.remove("error"))
                }
                )),
                p.appendChild(m),
                null != n && 0 != n.length || (p.classList.add("error"),
                m.focus());
                const v = document.createElement("div");
                v.className = "setting",
                f.appendChild(v);
                const w = document.createElement("label");
                w.className = "title",
                w.append(document.createTextNode(e.get("Author"))),
                v.appendChild(w);
                const b = document.createElement("input");
                b.type = "text",
                b.maxLength = 64,
                b.spellcheck = !1,
                b.value = s ?? "",
                b.placeholder = e.get("Unknown"),
                b.addEventListener("input", ( () => {
                    const t = b.value.trim();
                    s = 0 == t.length ? null : t
                }
                )),
                v.appendChild(b);
                const k = document.createElement("div");
                k.className = "setting",
                f.appendChild(k);
                const G = document.createElement("div");
                G.className = "title",
                G.append(document.createTextNode(e.get("Environment"))),
                k.appendChild(G);
                const x = document.createElement("button");
                x.className = "button environment-button",
                o.environment == TrackEnvironment.Summer && (x.classList.add("selected"),
                x.disabled = !0),
                x.innerHTML = '<img src="images/summer.svg"> ',
                x.append(document.createTextNode(e.get("Summer"))),
                x.addEventListener("click", ( () => {
                    t.playUIClick(),
                    a(TrackEnvironment.Summer),
                    x.classList.add("selected"),
                    y.classList.remove("selected"),
                    A.classList.remove("selected"),
                    x.disabled = !0,
                    y.disabled = !1,
                    A.disabled = !1
                }
                )),
                k.appendChild(x);
                const y = document.createElement("button");
                y.className = "button environment-button",
                o.environment == TrackEnvironment.Winter && (y.classList.add("selected"),
                y.disabled = !0),
                y.innerHTML = '<img src="images/winter.svg"> ',
                y.append(document.createTextNode(e.get("Winter"))),
                y.addEventListener("click", ( () => {
                    t.playUIClick(),
                    a(TrackEnvironment.Winter),
                    x.classList.remove("selected"),
                    y.classList.add("selected"),
                    A.classList.remove("selected"),
                    x.disabled = !1,
                    y.disabled = !0,
                    A.disabled = !1
                }
                )),
                k.appendChild(y);
                const A = document.createElement("button");
                A.className = "button environment-button",
                o.environment == TrackEnvironment.Desert && (A.classList.add("selected"),
                A.disabled = !0),
                A.innerHTML = '<img src="images/desert.svg"> ',
                A.append(document.createTextNode(e.get("Desert"))),
                A.addEventListener("click", ( () => {
                    t.playUIClick(),
                    a(TrackEnvironment.Desert),
                    x.classList.remove("selected"),
                    y.classList.remove("selected"),
                    A.classList.add("selected"),
                    x.disabled = !1,
                    y.disabled = !1,
                    A.disabled = !0
                }
                )),
                k.appendChild(A);
                const M = document.createElement("div");
                M.className = "setting",
                f.appendChild(M);
                const E = document.createElement("label");
                E.className = "title",
                E.append(document.createTextNode(e.get("Sun direction") + " (")),
                M.appendChild(E);
                const C = document.createTextNode(o.sunDirection.toDegrees().toString());
                E.appendChild(C),
                E.append(document.createTextNode("°)"));
                let W = null;
                const L = document.createElement("input");
                L.type = "range",
                L.min = "0",
                L.max = "360",
                L.step = "2",
                L.value = o.sunDirection.toDegrees().toString(),
                L.addEventListener("input", ( () => {
                    o.sunDirection = SunDirection.fromDegrees(parseInt(L.value, 10)),
                    C.textContent = L.value,
                    W ?? (W = setTimeout(( () => {
                        o.generateMeshes(),
                        W = null
                    }
                    ), 100))
                }
                )),
                M.appendChild(L);
                const P = document.createElement("div");
                P.className = "button-wrapper",
                d.appendChild(P);
                const z = document.createElement("button");
                z.className = "button",
                z.innerHTML = '<img class="button-icon" src="images/cancel.svg"> ',
                z.append(document.createTextNode(e.get("Close"))),
                z.addEventListener("click", ( () => {
                    t.playUIClick();
                    const e = m.value.trim();
                    0 == e.length ? r(null, s) : r(e, s)
                }
                )),
                P.appendChild(z),
                null != h && (i.set(this, Tt, document.createElement("button"), "f"),
                i.get(this, Tt, "f").disabled = null == n || 0 == n.length,
                i.get(this, Tt, "f").className = "button",
                i.get(this, Tt, "f").innerHTML = '<img class="button-icon" src="images/save.svg"> ',
                i.get(this, Tt, "f").append(document.createTextNode(e.get("Save"))),
                i.get(this, Tt, "f").addEventListener("click", ( () => {
                    t.playUIClick();
                    const e = m.value.trim();
                    0 == e.length || h(e, s)
                }
                )),
                P.appendChild(i.get(this, Tt, "f"))),
                window.addEventListener("keydown", i.set(this, qt, (t => {
                    if ("Escape" == t.code) {
                        const e = m.value.trim();
                        0 == e.length ? r(null, s) : r(e, s),
                        t.preventDefault()
                    }
                }
                ), "f"))
            }
            dispose() {
                i.get(this, Nt, "f").removeChild(i.get(this, St, "f")),
                window.removeEventListener("keydown", i.get(this, qt, "f"))
            }
        }
        ;
        var Bt = n(9437);
        let _t = null
          , Ut = null
          , Rt = null
          , Ht = null;
        async function Kt(t) {
            for (; null != Ht; )
                await Ht;
            const e = function(t) {
                return new Promise((e => {
                    setTimeout(( () => {
                        if (null == _t || null == Ut || null == Rt) {
                            const t = document.createElement("canvas");
                            t.width = 128,
                            t.height = 128,
                            _t = new Bt.JeP({
                                canvas: t,
                                alpha: !0,
                                preserveDrawingBuffer: !0,
                                antialias: !0
                            }),
                            _t.outputColorSpace = THREE.LinearSRGBColorSpace,
                            Rt = new THREE.Scene,
                            Ut = new THREE.OrthographicCamera(-1,1,1,-1,.5,RenderManager.maxViewDistance),
                            Ut.position.set(1e3, 1e3, 1e3),
                            Ut.lookAt(0, 0, 0),
                            Rt.add(Ut);
                            const e = new THREE.DirectionalLight(16777215,4.7);
                            e.position.set(8, 10, 10),
                            Rt.add(e)
                        }
                        t.geometry.computeBoundingSphere();
                        const n = t.geometry.boundingSphere?.clone();
                        if (null == n)
                            throw new Error("Bounding sphere is null");
                        Ut.zoom = 1 / n.radius * .9,
                        Ut.position.copy(n.center),
                        Ut.position.addScalar(1e3),
                        Ut.updateProjectionMatrix(),
                        _t.clear(),
                        Rt.add(t),
                        _t.render(Rt, Ut),
                        Rt.remove(t),
                        e(_t.domElement.toDataURL())
                    }
                    ), 25)
                }
                ))
            }(t);
            let n;
            Ht = e;
            try {
                n = await e
            } finally {
                Ht = null
            }
            return n
        }
        var Ft, Yt, Vt, Zt, Xt, jt, Jt, Qt, $t, te, ee, ne, ie, se, oe, ae, re, he, le, ce, de, ge, fe, pe, ue, me, ve, we, be, ke, Ge, xe, ye, Ae, Me, Ee, Ce, We, Le, Pe, ze, Ne, Se, Te, qe, De, Oe, Ie, Be, _e, Ue, Re, He, Ke, Fe, Ye, Ve, Ze, Xe, je, Je, Qe, $e, tn, en, nn, sn, on, an, rn, hn, ln, cn, dn, gn, fn, pn, un, mn, vn, wn, bn, kn, Gn, xn, yn, An, Mn, En, Cn, Wn, Ln, Pn, zn, Nn, Sn, Tn, qn, Dn, On, In, Bn, _n, Un, Rn, Hn, Kn, Fn, Yn, Vn, Zn, Xn, jn, Jn, Qn, $n, ti, ei, ni, ii, si, oi, ai, ri, hi, li, ci, di, gi = n(6223), LoadingScreenUI = n(5302).A;
        Yt = new WeakMap,
        Vt = new WeakMap,
        Zt = new WeakMap,
        Xt = new WeakMap,
        jt = new WeakMap,
        Jt = new WeakMap,
        Qt = new WeakMap,
        $t = new WeakMap,
        te = new WeakMap,
        ee = new WeakMap,
        ne = new WeakMap,
        ie = new WeakMap,
        se = new WeakMap,
        oe = new WeakMap,
        ae = new WeakMap,
        re = new WeakMap,
        he = new WeakMap,
        le = new WeakMap,
        ce = new WeakMap,
        de = new WeakMap,
        ge = new WeakMap,
        fe = new WeakMap,
        pe = new WeakMap,
        ue = new WeakMap,
        me = new WeakMap,
        ve = new WeakMap,
        we = new WeakMap,
        be = new WeakMap,
        ke = new WeakMap,
        Ge = new WeakMap,
        xe = new WeakMap,
        ye = new WeakMap,
        Ae = new WeakMap,
        Me = new WeakMap,
        Ee = new WeakMap,
        Ce = new WeakMap,
        We = new WeakMap,
        Le = new WeakMap,
        Pe = new WeakMap,
        ze = new WeakMap,
        Ne = new WeakMap,
        Se = new WeakMap,
        Te = new WeakMap,
        qe = new WeakMap,
        De = new WeakMap,
        Oe = new WeakMap,
        Ie = new WeakMap,
        Be = new WeakMap,
        _e = new WeakMap,
        Ue = new WeakMap,
        Re = new WeakMap,
        He = new WeakMap,
        Ke = new WeakMap,
        Fe = new WeakMap,
        Ye = new WeakMap,
        Ve = new WeakMap,
        Ze = new WeakMap,
        Xe = new WeakMap,
        je = new WeakMap,
        Je = new WeakMap,
        Qe = new WeakMap,
        $e = new WeakMap,
        tn = new WeakMap,
        en = new WeakMap,
        nn = new WeakMap,
        sn = new WeakMap,
        on = new WeakMap,
        an = new WeakMap,
        rn = new WeakMap,
        hn = new WeakMap,
        ln = new WeakMap,
        cn = new WeakMap,
        dn = new WeakMap,
        gn = new WeakMap,
        fn = new WeakMap,
        pn = new WeakMap,
        un = new WeakMap,
        mn = new WeakMap,
        vn = new WeakMap,
        wn = new WeakMap,
        bn = new WeakMap,
        kn = new WeakMap,
        Gn = new WeakMap,
        xn = new WeakMap,
        yn = new WeakMap,
        An = new WeakMap,
        Mn = new WeakMap,
        En = new WeakMap,
        Cn = new WeakMap,
        Wn = new WeakMap,
        Ln = new WeakMap,
        Pn = new WeakMap,
        zn = new WeakMap,
        Nn = new WeakMap,
        Sn = new WeakMap,
        Tn = new WeakMap,
        Ft = new WeakSet,
        qn = function() {
            if (i.get(this, Mn, "f") || i.get(this, En, "f")) {
                const t = i.get(this, Ft, "m", ai).call(this);
                if (null != t) {
                    let e;
                    e = null != i.get(this, Cn, "f") ? i.get(this, Cn, "f") : {
                        x: t.x,
                        y: t.y,
                        z: t.z
                    };
                    let n = 0;
                    n = i.get(this, gn, "f") ? -2 : 0;
                    const s = Math.min(e.x + n, t.x + n)
                      , o = Math.min(e.y, t.y)
                      , a = Math.min(e.z + n, t.z + n)
                      , r = Math.max(e.x + n, t.x + n)
                      , h = Math.max(e.y, t.y)
                      , l = Math.max(e.z + n, t.z + n);
                    let c;
                    c = i.get(this, gn, "f") ? 4 : 1;
                    const d = (r - s + c) * Track.A.partSize
                      , g = (h - o + 1) * Track.A.partSize
                      , f = (l - a + c) * Track.A.partSize;
                    let p, u;
                    if (i.get(this, Mn, "f"))
                        p = 65280,
                        u = 21760;
                    else {
                        if (!i.get(this, En, "f"))
                            throw new Error("Invalid copy/cut state");
                        p = 16776960,
                        u = 5592320
                    }
                    if (null == i.get(this, Pn, "f")) {
                        const t = (new THREE.BufferGeometry).setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), new THREE.Vector3(1,0,1), new THREE.Vector3(1,0,1), new THREE.Vector3(1,0,1), new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,1,1), new THREE.Vector3(0,1,1), new THREE.Vector3(0,1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,0), new THREE.Vector3(1,1,0), new THREE.Vector3(1,1,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), new THREE.Vector3(0,1,1), new THREE.Vector3(1,0,1), new THREE.Vector3(1,0,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), new THREE.Vector3(1,1,0)].map((t => t.addScalar(-.5))));
                        i.set(this, Pn, {
                            fill: new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({
                                color: p,
                                transparent: !0,
                                opacity: .25,
                                polygonOffset: !0,
                                polygonOffsetFactor: -.3,
                                depthWrite: !1
                            })),
                            outline: new THREE.Mesh(t,new THREE.MeshBasicMaterial({
                                color: u,
                                wireframe: !0,
                                polygonOffset: !0,
                                polygonOffsetFactor: -.3
                            }))
                        }, "f"),
                        i.get(this, Xt, "f").scene.add(i.get(this, Pn, "f").fill),
                        i.get(this, Xt, "f").scene.add(i.get(this, Pn, "f").outline)
                    } else
                        i.get(this, Pn, "f").fill.material.color.setHex(p),
                        i.get(this, Pn, "f").outline.material.color.setHex(u);
                    i.get(this, Pn, "f").fill.position.set((s + r + c) / 2 * Track.A.partSize, (o + h + 1) / 2 * Track.A.partSize, (a + l + c) / 2 * Track.A.partSize),
                    i.get(this, Pn, "f").fill.scale.set(d, g, f),
                    i.get(this, Pn, "f").fill.visible = !0,
                    i.get(this, Pn, "f").outline.position.copy(i.get(this, Pn, "f").fill.position),
                    i.get(this, Pn, "f").outline.scale.copy(i.get(this, Pn, "f").fill.scale),
                    i.get(this, Pn, "f").outline.visible = !0
                } else
                    null != i.get(this, Pn, "f") && (i.get(this, Pn, "f").fill.visible = !1,
                    i.get(this, Pn, "f").outline.visible = !1)
            } else
                null != i.get(this, Pn, "f") && (i.get(this, Xt, "f").scene.remove(i.get(this, Pn, "f").fill),
                i.get(this, Pn, "f").fill.geometry.dispose(),
                i.get(this, Pn, "f").fill.material.dispose(),
                i.get(this, Xt, "f").scene.remove(i.get(this, Pn, "f").outline),
                i.get(this, Pn, "f").outline.geometry.dispose(),
                i.get(this, Pn, "f").outline.material.dispose(),
                i.set(this, Pn, null, "f"))
        }
        ,
        Dn = function(t, e, n, s, o, a, r) {
            t > s && ([t,s] = [s, t]),
            e > o && ([e,o] = [o, e]),
            n > a && ([n,a] = [a, n]),
            i.get(this, gn, "f") && (t -= 2,
            n -= 2,
            s += 1,
            a += 1);
            const h = i.get(this, Jt, "f").getPartsWithin(t, e, n, s, o, a);
            if (0 == h.length)
                return;
            if (r) {
                const r = i.get(this, Jt, "f").deletePartsWithin(t, e, n, s, o, a);
                r.length > 0 && (i.get(this, bn, "f").push({
                    removed: r,
                    added: []
                }),
                i.get(this, kn, "f").length = 0,
                i.get(this, fe, "f").disabled = 0 == i.get(this, bn, "f").length,
                i.get(this, pe, "f").disabled = 0 == i.get(this, kn, "f").length),
                i.get(this, Ft, "m", oi).call(this),
                i.get(this, Ft, "m", si).call(this)
            }
            const l = h.reduce(( (t, e) => Math.min(t, e.x)), 1 / 0)
              , c = h.reduce(( (t, e) => Math.min(t, e.y)), 1 / 0)
              , d = h.reduce(( (t, e) => Math.min(t, e.z)), 1 / 0)
              , g = h.reduce(( (t, e) => Math.max(t, e.x)), -1 / 0)
              , f = h.reduce(( (t, e) => Math.max(t, e.y)), -1 / 0)
              , p = h.reduce(( (t, e) => Math.max(t, e.z)), -1 / 0)
              , u = 4 * Math.floor((l + g) / 2 / 4)
              , m = Math.floor((c + f) / 2)
              , v = 4 * Math.floor((d + p) / 2 / 4)
              , w = h.map((t => ({
                id: t.id,
                offset: {
                    x: t.x - u,
                    y: t.y - m,
                    z: t.z - v
                },
                rotation: t.rotation,
                rotationAxis: t.rotationAxis,
                color: t.color,
                checkpointOrder: t.checkpointOrder
            })))
              , b = [];
            for (const t of w) {
                i.get(this, Qt, "f").getPart(t.id).configuration.tiles.rotated(t.rotation, t.rotationAxis).forEach(( (e, n, i) => {
                    b.push([e + t.offset.x, n + t.offset.y, i + t.offset.z])
                }
                ))
            }
            const k = new dt.A(b);
            i.set(this, Wn, {
                parts: w,
                tiles: k
            }, "f"),
            i.get(this, ge, "f").disabled = !1,
            i.get(this, Ft, "m", On).call(this)
        }
        ,
        On = function() {
            null != i.get(this, Wn, "f") && (i.get(this, Ft, "m", ti).call(this, null),
            i.set(this, cn, 0, "f"),
            i.get(this, xe, "f").rotation = i.get(this, cn, "f"),
            i.set(this, dn, TrackPartRotationAxis.YPositive, "f"),
            i.get(this, xe, "f").rotationAxis = i.get(this, dn, "f"),
            i.set(this, Ln, i.get(this, Wn, "f"), "f"),
            i.get(this, Ft, "m", Qn).call(this),
            i.get(this, Ft, "m", ii).call(this))
        }
        ,
        In = function() {
            if (null == i.get(this, Ln, "f") || null == i.get(this, hn, "f"))
                return;
            const t = i.get(this, hn, "f")
              , e = []
              , n = [];
            if (!i.get(this, fn, "f")) {
                i.get(this, Ln, "f").tiles.rotated(i.get(this, cn, "f"), i.get(this, dn, "f")).forEach(( (n, s, o) => {
                    const a = t.x + n
                      , r = t.y + s
                      , h = t.z + o
                      , l = i.get(this, Jt, "f").deletePartsAt(a, r, h);
                    for (const t of l)
                        e.push({
                            id: t.id,
                            x: t.x,
                            y: t.y,
                            z: t.z,
                            rotation: t.rotation,
                            rotationAxis: t.rotationAxis,
                            color: t.color,
                            checkpointOrder: t.checkpointOrder,
                            startOrder: t.startOrder
                        })
                }
                ))
            }
            for (const s of i.get(this, Ln, "f").parts) {
                let o = null;
                null != i.get(this, Qt, "f").getPart(s.id).configuration.startOffset && (o = i.get(this, Jt, "f").getNextStartOrder());
                const {rotation: a, rotationAxis: r} = TrackPartTransform.combineTwoPartOrientations(s.rotation, s.rotationAxis, i.get(this, cn, "f"), i.get(this, dn, "f"))
                  , h = TrackPartTransform.rotatePartOffset(s.offset.x, s.offset.y, s.offset.z, i.get(this, cn, "f"), i.get(this, dn, "f"))
                  , l = t.x + h[0]
                  , c = t.y + h[1]
                  , d = t.z + h[2];
                if (i.get(this, fn, "f")) {
                    const t = i.get(this, Jt, "f").deleteSpecificPart(s.id, l, c, d, a, r);
                    null != t && e.push({
                        id: t.id,
                        x: t.x,
                        y: t.y,
                        z: t.z,
                        rotation: t.rotation,
                        rotationAxis: t.rotationAxis,
                        color: t.color,
                        checkpointOrder: t.checkpointOrder,
                        startOrder: t.startOrder
                    })
                }
                i.get(this, Jt, "f").setPart(l, c, d, s.id, a, r, s.color, s.checkpointOrder, o),
                n.push({
                    id: s.id,
                    x: l,
                    y: c,
                    z: d,
                    rotation: a,
                    rotationAxis: r,
                    color: s.color,
                    checkpointOrder: s.checkpointOrder,
                    startOrder: o
                })
            }
            i.get(this, Ft, "m", oi).call(this),
            i.get(this, Ft, "m", si).call(this),
            (e.length > 0 || n.length > 0) && (i.get(this, bn, "f").push({
                removed: e,
                added: n
            }),
            i.get(this, kn, "f").length = 0,
            i.get(this, fe, "f").disabled = 0 == i.get(this, bn, "f").length,
            i.get(this, pe, "f").disabled = 0 == i.get(this, kn, "f").length)
        }
        ,
        Bn = function(t) {
            i.get(this, Ft, "m", _n).call(this, t.name),
            i.get(this, Ft, "m", Un).call(this, t.author),
            i.set(this, wn, t.lastModified, "f")
        }
        ,
        _n = function(t) {
            i.get(this, mn, "f") != t && (i.set(this, mn, t, "f"),
            i.set(this, wn, new Date, "f"),
            i.get(this, Me, "f").innerHTML = '<img class="button-icon" src="images/settings.svg"> ',
            i.get(this, Me, "f").append(document.createTextNode(i.get(this, mn, "f") ?? i.get(this, Zt, "f").get("Unnamed Track"))))
        }
        ,
        Un = function(t) {
            i.get(this, vn, "f") != t && (i.set(this, vn, t, "f"),
            i.set(this, wn, new Date, "f"))
        }
        ,
        Rn = function(t) {
            const e = () => {
                i.get(this, jt, "f").trigger(( () => {
                    i.set(this, Ve, !0, "f"),
                    i.get(this, Ft, "m", _n).call(this, null),
                    t(),
                    i.get(this, he, "f").inert = !1
                }
                ))
            }
            ;
            i.get(this, Ve, "f") ? e() : (i.get(this, he, "f").inert = !0,
            i.get(this, ie, "f").showConfirm(i.get(this, Zt, "f").get("Are you sure you want to exit the editor?") + "\n\n" + i.get(this, Zt, "f").get("All unsaved data will be lost!"), i.get(this, Zt, "f").get("Cancel"), i.get(this, Zt, "f").get("Confirm"), ( () => {
                i.get(this, he, "f").inert = !1
            }
            ), ( () => {
                e()
            }
            )))
        }
        ,
        Hn = function() {
            if (null != i.get(this, Jt, "f").getStartTransform()) {
                if (null == i.get(this, ae, "f"))
                    throw new Error("Test callback is null");
                i.get(this, ae, "f").call(this)
            } else
                i.get(this, Ft, "m", Vn).call(this, i.get(this, Zt, "f").get("Starting point is missing!"), !1)
        }
        ,
        Kn = function() {
            if (null != i.get(this, hn, "f") && null != i.get(this, yn, "f")) {
                const t = i.get(this, xn, "f")[i.get(this, yn, "f")]
                  , e = i.get(this, Ft, "m", ri).call(this, i.get(this, hn, "f"), t.tiles);
                if (e.length > 0) {
                    let t;
                    t = i.get(this, gn, "f") ? new THREE.Vector3(i.get(this, hn, "f").x + 2,i.get(this, hn, "f").y,i.get(this, hn, "f").z + 2) : new THREE.Vector3(i.get(this, hn, "f").x,i.get(this, hn, "f").y,Math.floor(i.get(this, hn, "f").z));
                    let n = e[0]
                      , s = t.distanceToSquared(new THREE.Vector3(n.x,n.y,n.z));
                    for (let i = 1; i < e.length; i++) {
                        const o = e[i]
                          , a = t.distanceToSquared(new THREE.Vector3(o.x,o.y,o.z));
                        a < s && (n = o,
                        s = a)
                    }
                    const o = n.parts[n.parts.length - 1]
                      , a = i.get(this, xn, "f").findIndex((t => t.id == o.id));
                    if (a >= 0) {
                        const t = i.get(this, xn, "f")[a];
                        i.set(this, cn, o.rotation, "f"),
                        i.get(this, xe, "f").rotation = i.get(this, cn, "f"),
                        i.set(this, dn, o.rotationAxis, "f"),
                        i.get(this, xe, "f").rotationAxis = i.get(this, dn, "f"),
                        i.set(this, An, o.color, "f"),
                        i.get(this, Ft, "m", $n).call(this, t.category),
                        i.get(this, Ft, "m", ti).call(this, a)
                    }
                }
            }
        }
        ,
        Fn = function() {
            const t = i.get(this, bn, "f").pop();
            if (null != t) {
                for (const e of t.added)
                    i.get(this, Jt, "f").deleteSpecificPart(e.id, e.x, e.y, e.z, e.rotation, e.rotationAxis);
                for (const e of t.removed)
                    i.get(this, Jt, "f").setPart(e.x, e.y, e.z, e.id, e.rotation, e.rotationAxis, e.color, e.checkpointOrder, e.startOrder);
                i.get(this, Ft, "m", si).call(this),
                i.get(this, kn, "f").push(t)
            }
            i.get(this, fe, "f").disabled = 0 == i.get(this, bn, "f").length,
            i.get(this, pe, "f").disabled = 0 == i.get(this, kn, "f").length
        }
        ,
        Yn = function() {
            const t = i.get(this, kn, "f").pop();
            if (null != t) {
                for (const e of t.added)
                    i.get(this, Jt, "f").setPart(e.x, e.y, e.z, e.id, e.rotation, e.rotationAxis, e.color, e.checkpointOrder, e.startOrder);
                for (const e of t.removed)
                    i.get(this, Jt, "f").deleteSpecificPart(e.id, e.x, e.y, e.z, e.rotation, e.rotationAxis);
                i.get(this, Ft, "m", si).call(this),
                i.get(this, bn, "f").push(t)
            }
            i.get(this, fe, "f").disabled = 0 == i.get(this, bn, "f").length,
            i.get(this, pe, "f").disabled = 0 == i.get(this, kn, "f").length
        }
        ,
        Vn = function(t, e) {
            null != i.get(this, de, "f") && (clearTimeout(i.get(this, de, "f")),
            i.set(this, de, null, "f")),
            e ? i.get(this, ce, "f").classList.add("green") : i.get(this, ce, "f").classList.remove("green"),
            i.get(this, ce, "f").classList.remove("show"),
            i.get(this, ce, "f").classList.remove("hide"),
            i.set(this, de, window.setTimeout(( () => {
                i.get(this, ce, "f").textContent = t,
                i.get(this, ce, "f").classList.add("show"),
                i.set(this, de, window.setTimeout(( () => {
                    i.get(this, ce, "f").classList.remove("show"),
                    i.get(this, ce, "f").classList.add("hide")
                }
                ), 3e3), "f")
            }
            ), 0), "f")
        }
        ,
        Zn = function() {
            const t = i.get(this, Qt, "f").getAllParts();
            for (let e = 0; e < t.length; e++) {
                const n = t[e];
                let s = i.get(this, Nn, "f").find((t => t.category == n.configuration.category))?.partPanel;
                if (null == s) {
                    s = document.createElement("div"),
                    s.className = "part-panel hidden",
                    i.get(this, ue, "f").prepend(s);
                    const t = i.get(this, Qt, "f").getCategoryMesh(n.configuration.category, i.get(this, Jt, "f").environment)
                      , e = document.createElement("button");
                    e.addEventListener("click", ( () => {
                        i.get(this, Ft, "m", $n).call(this, n.configuration.category),
                        i.get(this, Yt, "f").playUIClick()
                    }
                    )),
                    i.get(this, me, "f").appendChild(e);
                    const o = document.createElement("img");
                    o.className = "loading",
                    Kt(t).then((t => {
                        o.src = t,
                        o.className = ""
                    }
                    )),
                    e.appendChild(o),
                    i.get(this, Nn, "f").push({
                        category: n.configuration.category,
                        button: e,
                        image: o,
                        partPanel: s,
                        selectedIndex: null
                    })
                }
                const o = document.createElement("button");
                o.addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick(),
                    i.get(this, Ft, "m", ti).call(this, 1 + e)
                }
                )),
                s.appendChild(o);
                const a = document.createElement("img");
                a.className = "loading",
                o.appendChild(a);
                const r = [];
                let h;
                if (n.colors.size <= 1)
                    h = null;
                else {
                    h = document.createElement("div"),
                    h.className = "color-panel hidden",
                    i.get(this, ue, "f").prepend(h);
                    const t = [TrackPartColorId.Default].concat(Array.from(n.colors.keys()));
                    for (const e of t) {
                        const t = document.createElement("button");
                        t.addEventListener("click", ( () => {
                            i.get(this, Yt, "f").playUIClick(),
                            i.set(this, An, e, "f"),
                            t.classList.add("selected");
                            const n = t.parentElement;
                            if (null == n)
                                throw new Error("Color panel not found");
                            for (const e of n.children)
                                e != t && e.classList.remove("selected")
                        }
                        )),
                        e == TrackPartColorId.Default && t.classList.add("selected"),
                        h.appendChild(t);
                        const n = document.createElement("img");
                        n.className = "loading",
                        t.appendChild(n),
                        r.push([e, t, n])
                    }
                }
                const l = {
                    id: n.configuration.id,
                    trackPartData: n,
                    button: o,
                    image: a,
                    colorPanel: h,
                    colorButtons: r,
                    tiles: n.configuration.tiles,
                    isCheckpoint: null != n.configuration.detector && n.configuration.detector.type == TrackPartDetectorType.Checkpoint,
                    isStart: null != n.configuration.startOffset,
                    category: n.configuration.category
                };
                i.get(this, xn, "f").push(l)
            }
        }
        ,
        Xn = function() {
            if (null == i.get(this, yn, "f"))
                return TrackPartColorId.Default;
            return i.get(this, xn, "f")[i.get(this, yn, "f")].colorButtons.some(( ([t]) => t == i.get(this, An, "f"))) ? i.get(this, An, "f") : TrackPartColorId.Default
        }
        ,
        jn = function(t) {
            i.get(this, Jt, "f").environment != t && (i.get(this, Jt, "f").environment = t,
            i.get(this, Ft, "m", Jn).call(this),
            i.get(this, Ft, "m", si).call(this))
        }
        ,
        Jn = function() {
            for (const t of i.get(this, Nn, "f")) {
                const e = i.get(this, Qt, "f").getCategoryMesh(t.category, i.get(this, Jt, "f").environment);
                t.image.removeAttribute("src"),
                t.image.className = "loading",
                Kt(e).then((e => {
                    t.image.src = e,
                    t.image.className = ""
                }
                ))
            }
            let t;
            switch (i.get(this, Jt, "f").environment) {
            case TrackEnvironment.Summer:
                t = TrackPartColorId.Summer;
                break;
            case TrackEnvironment.Winter:
                t = TrackPartColorId.Winter;
                break;
            case TrackEnvironment.Desert:
                t = TrackPartColorId.Desert
            }
            for (const e of i.get(this, xn, "f"))
                if (null != e.id)
                    if (e.category == i.get(this, Sn, "f")) {
                        const n = i.get(this, Qt, "f").getPart(e.id).colors.get(t);
                        if (null == n)
                            throw new Error("Mesh is not loaded");
                        e.image.removeAttribute("src"),
                        e.image.className = "loading",
                        Kt(n).then((t => {
                            e.image.src = t,
                            e.image.className = ""
                        }
                        ))
                    } else
                        e.image.removeAttribute("src"),
                        e.image.className = "loading"
        }
        ,
        Qn = function() {
            for (const t of i.get(this, Qe, "f"))
                if (i.get(this, je, "f").remove(t),
                t.geometry.dispose(),
                Array.isArray(t.material))
                    for (const e of t.material)
                        e.dispose();
                else
                    t.material.dispose();
            if (null != i.get(this, en, "f")) {
                if (i.get(this, je, "f").remove(i.get(this, en, "f")),
                i.get(this, en, "f").geometry.dispose(),
                Array.isArray(i.get(this, en, "f").material))
                    for (const t of i.get(this, en, "f").material)
                        t.dispose();
                else
                    i.get(this, en, "f").material.dispose();
                i.get(this, en, "f").dispose(),
                i.set(this, en, null, "f")
            }
            if (null != i.get(this, Ln, "f")) {
                const t = i.get(this, Ln, "f").parts.length;
                let e = 0
                  , n = 0;
                const s = new Set;
                for (const t of i.get(this, Ln, "f").parts) {
                    const o = i.get(this, Qt, "f").getPart(t.id).colors.get(TrackPartColorId.Summer);
                    if (null == o)
                        throw new Error("Track part mesh has not loaded yet");
                    s.has(o.geometry) || (s.add(o.geometry),
                    e += o.geometry.attributes.position.count,
                    null != o.geometry.index && (n += o.geometry.index.count))
                }
                const o = new THREE.BatchedMesh(t,e,n,i.get(this, Je, "f"))
                  , a = new Map;
                for (const t of i.get(this, Ln, "f").parts) {
                    const e = i.get(this, Qt, "f").getPart(t.id).colors.get(TrackPartColorId.Summer);
                    if (null == e)
                        throw new Error("Track part mesh has not loaded yet");
                    let n = a.get(e.geometry);
                    null == n && (n = o.addGeometry(e.geometry),
                    a.set(e.geometry, n));
                    const s = o.addInstance(n)
                      , r = (new THREE.Matrix4).makeRotationFromQuaternion(TrackPartTransform.rotationAndAxisToQuaternion(t.rotation, t.rotationAxis)).setPosition(t.offset.x * Track.A.partSize, t.offset.y * Track.A.partSize, t.offset.z * Track.A.partSize);
                    o.setMatrixAt(s, r)
                }
                i.get(this, je, "f").add(o),
                i.get(this, Qe, "f").push(o);
                const r = new THREE.InstancedMesh(i.get(this, tn, "f"),i.get(this, $e, "f"),i.get(this, Ln, "f").tiles.length);
                i.get(this, Ln, "f").tiles.forEach(( (t, e, n, i) => {
                    const s = (new THREE.Matrix4).makeTranslation(t * Track.A.partSize, e * Track.A.partSize, n * Track.A.partSize);
                    r.setMatrixAt(i, s)
                }
                )),
                i.get(this, je, "f").add(r),
                i.set(this, en, r, "f")
            } else if (null != i.get(this, yn, "f")) {
                const t = i.get(this, xn, "f")[i.get(this, yn, "f")];
                let e;
                if (null == t.trackPartData) {
                    const t = new THREE.BoxGeometry(4 * Track.A.partSize,Track.A.partSize,4 * Track.A.partSize);
                    t.translate(0, Track.A.partSize / 2, 0),
                    e = new THREE.Mesh(t,i.get(this, Je, "f"))
                } else if (e = t.trackPartData.colors.get(TrackPartColorId.Summer)?.clone(),
                null == e)
                    throw new Error("Track part mesh has not loaded yet");
                e.material = i.get(this, Je, "f"),
                i.get(this, je, "f").add(e),
                i.get(this, Qe, "f").push(e);
                const n = new THREE.InstancedMesh(i.get(this, tn, "f"),i.get(this, $e, "f"),t.tiles.length);
                t.tiles.forEach(( (t, e, i, s) => {
                    const o = (new THREE.Matrix4).makeTranslation(t * Track.A.partSize, e * Track.A.partSize, i * Track.A.partSize);
                    n.setMatrixAt(s, o)
                }
                )),
                i.get(this, je, "f").add(n),
                i.set(this, en, n, "f")
            }
        }
        ,
        $n = function(t) {
            if (i.get(this, Sn, "f") != t || null == t) {
                i.set(this, Sn, t, "f");
                for (const e of i.get(this, Nn, "f"))
                    e.category == t ? (e.button.classList.add("selected"),
                    e.partPanel.classList.remove("hidden")) : (e.button.classList.remove("selected"),
                    e.partPanel.classList.add("hidden"));
                if (null == t)
                    i.get(this, Ft, "m", ti).call(this, 0);
                else {
                    let e;
                    switch (i.get(this, Jt, "f").environment) {
                    case TrackEnvironment.Summer:
                        e = TrackPartColorId.Summer;
                        break;
                    case TrackEnvironment.Winter:
                        e = TrackPartColorId.Winter;
                        break;
                    case TrackEnvironment.Desert:
                        e = TrackPartColorId.Desert
                    }
                    for (const n of i.get(this, xn, "f"))
                        if (n.category == t && null != n.id && !n.image.hasAttribute("src")) {
                            const t = i.get(this, Qt, "f").getPart(n.id).colors.get(e);
                            if (null == t)
                                throw new Error("Mesh is not loaded");
                            n.image.className = "loading",
                            Kt(t).then((t => {
                                n.image.src = t,
                                n.image.className = ""
                            }
                            ))
                        }
                    let n = i.get(this, Nn, "f").find((e => e.category == t))?.selectedIndex;
                    if (null == n && (n = i.get(this, xn, "f").findIndex((e => e.category == t)),
                    n < 0))
                        throw new Error("Empty category");
                    i.get(this, Ft, "m", ti).call(this, n)
                }
            }
        }
        ,
        ti = function(t) {
            null != t && (i.set(this, Mn, !1, "f"),
            i.set(this, En, !1, "f"),
            i.set(this, Cn, null, "f"),
            i.set(this, Ln, null, "f"));
            for (let e = 0; e < i.get(this, xn, "f").length; e++) {
                const {button: n, colorPanel: s} = i.get(this, xn, "f")[e];
                e == t ? (n.className = "selected",
                s?.classList.remove("hidden")) : (n.className = "",
                s?.classList.add("hidden"))
            }
            i.set(this, yn, t, "f");
            const e = i.get(this, Nn, "f").find((t => t.category == i.get(this, Sn, "f")));
            if (null != e && (e.selectedIndex = t),
            null != t) {
                if (t < 0 && t >= i.get(this, xn, "f").length)
                    throw new Error("Part index out of bounds");
                const e = i.get(this, xn, "f")[t];
                e.isCheckpoint ? i.get(this, we, "f").show() : i.get(this, we, "f").hide();
                const n = i.get(this, Ft, "m", Xn).call(this);
                if (null != e.id)
                    for (const [t,s,o] of e.colorButtons)
                        if (t == n ? s.classList.add("selected") : s.classList.remove("selected"),
                        !o.hasAttribute("src"))
                            if (t == TrackPartColorId.Default)
                                o.src = "images/empty.svg",
                                o.className = "";
                            else {
                                const n = i.get(this, Qt, "f").getPart(e.id).colors.get(t);
                                if (null == n)
                                    throw new Error("Mesh is not loaded");
                                o.className = "loading",
                                Kt(n).then((t => {
                                    o.src = t,
                                    o.className = ""
                                }
                                ))
                            }
            } else
                i.get(this, we, "f").hide();
            i.get(this, Ft, "m", Qn).call(this),
            i.get(this, Ft, "m", ii).call(this)
        }
        ,
        ei = function() {
            return Math.floor(i.get(this, Xe, "f").position.y / 5)
        }
        ,
        ni = function(t) {
            const e = i.get(this, Ft, "a", ei);
            i.get(this, Xe, "f").position.y = 5 * t,
            i.get(this, De, "f").position.y += 5 * (t - e),
            i.get(this, Oe, "f").target.y = 5 * t,
            i.get(this, ve, "f").refresh(t),
            i.get(this, Xe, "f").updateWorldMatrix(!0, !0),
            i.get(this, Oe, "f").update()
        }
        ,
        ii = function() {
            if (null != i.get(this, Ln, "f"))
                i.set(this, ln, 0, "f"),
                i.get(this, Ln, "f").tiles.rotated(i.get(this, cn, "f"), i.get(this, dn, "f")).forEach(( (t, e) => {
                    i.set(this, ln, Math.max(i.get(this, ln, "f"), -e), "f")
                }
                ));
            else if (null != i.get(this, yn, "f") && i.get(this, yn, "f") >= 0 && i.get(this, yn, "f") < i.get(this, xn, "f").length) {
                const t = i.get(this, xn, "f")[i.get(this, yn, "f")];
                i.set(this, ln, 0, "f"),
                t.tiles.rotated(i.get(this, cn, "f"), i.get(this, dn, "f")).forEach(( (t, e) => {
                    i.set(this, ln, Math.max(i.get(this, ln, "f"), -e), "f")
                }
                ))
            } else
                i.set(this, ln, 0, "f")
        }
        ,
        si = function() {
            i.get(this, Jt, "f").generateMeshes(),
            i.get(this, Gn, "f")?.refresh(i.get(this, Jt, "f")),
            i.get(this, we, "f").setFromExistingCheckpoints(i.get(this, Jt, "f")),
            i.set(this, zn, null, "f"),
            i.set(this, wn, new Date, "f"),
            i.set(this, Ve, !1, "f")
        }
        ,
        oi = function() {
            const t = performance.now();
            if (t - i.get(this, Vt, "f") > 35) {
                const e = i.get(this, Yt, "f").getBuffer("editor_edit");
                if (null != e && null != i.get(this, Yt, "f").context && null != i.get(this, Yt, "f").destinationSfx) {
                    const t = i.get(this, Yt, "f").context.createBufferSource();
                    t.buffer = e,
                    t.playbackRate.value = .7;
                    const n = i.get(this, Yt, "f").context.createGain();
                    n.gain.value = .05,
                    t.connect(n),
                    n.connect(i.get(this, Yt, "f").destinationSfx),
                    t.start(0)
                }
                i.set(this, Vt, t, "f")
            }
        }
        ,
        ai = function() {
            let t;
            if (i.get(this, se, "f").touchEnabled)
                t = new THREE.Vector3(i.get(this, Oe, "f").target.x / Track.A.partSize,i.get(this, Oe, "f").target.y / Track.A.partSize,i.get(this, Oe, "f").target.z / Track.A.partSize);
            else {
                let e;
                if (null != i.get(this, on, "f") ? (i.get(this, Ze, "f").setFromCamera(i.get(this, on, "f"), i.get(this, Xt, "f").camera),
                e = i.get(this, Ze, "f").intersectObjects([i.get(this, Xe, "f")])) : e = [],
                e.length > 0) {
                    const n = e[0]
                      , s = 500 + 2 * i.get(this, Oe, "f").getDistance();
                    t = n.point.distanceToSquared(i.get(this, Oe, "f").target) <= s ** 2 ? new THREE.Vector3(Math.round(n.point.x / Track.A.partSize),Math.floor(i.get(this, Xe, "f").position.y / Track.A.partSize),Math.round(n.point.z / Track.A.partSize)) : null
                } else
                    t = null
            }
            if (null != t) {
                let e, n;
                e = i.get(this, gn, "f") ? 4 : 1,
                n = i.get(this, En, "f") || i.get(this, Mn, "f") || i.get(this, dn, "f") != TrackPartRotationAxis.XPositive && i.get(this, dn, "f") != TrackPartRotationAxis.XNegative ? Math.round(t.x / e) * e : Math.round(t.x);
                const s = Math.round(t.y) + i.get(this, ln, "f");
                let o;
                return o = i.get(this, En, "f") || i.get(this, Mn, "f") || i.get(this, dn, "f") != TrackPartRotationAxis.ZPositive && i.get(this, dn, "f") != TrackPartRotationAxis.ZNegative ? Math.round(t.z / e) * e : Math.round(t.z),
                new THREE.Vector3(n,s,o)
            }
            return null
        }
        ,
        ri = function(t, e) {
            const n = [];
            return e.rotated(i.get(this, cn, "f"), i.get(this, dn, "f")).forEach(( (e, s, o) => {
                const a = t.x + e
                  , r = t.y + s
                  , h = t.z + o
                  , l = i.get(this, Jt, "f").getPartsAt(a, r, h);
                l.length > 0 && n.push({
                    x: a,
                    y: r,
                    z: h,
                    parts: l
                })
            }
            )),
            n
        }
        ,
        hi = function(t, e) {
            return e.rotated(i.get(this, cn, "f"), i.get(this, dn, "f")).some(( (e, n, s) => {
                const o = t.x + e
                  , a = t.y + n
                  , r = t.z + s;
                return i.get(this, Jt, "f").getPartsAt(o, a, r).length > 0
            }
            ))
        }
        ,
        li = function(t, e) {
            let n = !1;
            for (const s of t)
                null != i.get(this, Jt, "f").deleteSpecificPart(s.id, s.x, s.y, s.z, s.rotation, s.rotationAxis) && (n = !0,
                e.push({
                    id: s.id,
                    x: s.x,
                    y: s.y,
                    z: s.z,
                    rotation: s.rotation,
                    rotationAxis: s.rotationAxis,
                    color: s.color,
                    checkpointOrder: s.checkpointOrder,
                    startOrder: s.startOrder
                }));
            n && (i.get(this, Ft, "m", oi).call(this),
            i.get(this, Ft, "m", si).call(this))
        }
        ,
        ci = function(t) {
            const e = 4 * i.get(this, Oe, "f").getDistance();
            if (i.get(this, re, "f") && i.get(this, Ft, "m", di).call(this)) {
                const n = new THREE.Vector3;
                if (i.get(this, Be, "f") && (n.z = -1),
                i.get(this, _e, "f") && (n.x = 1),
                i.get(this, Ue, "f") && (n.z = 1),
                i.get(this, Re, "f") && (n.x = -1),
                0 != n.x || 0 != n.z) {
                    const s = n.applyQuaternion(i.get(this, De, "f").quaternion)
                      , o = new THREE.Vector2(s.x,s.z).normalize()
                      , a = new THREE.Vector3(o.x,0,o.y).multiplyScalar(e * t);
                    i.get(this, De, "f").position.add(a),
                    i.get(this, Oe, "f").target.add(a)
                }
                let s = 0;
                i.get(this, He, "f") && (s += 1.5 * Math.PI * t),
                i.get(this, Ke, "f") && (s -= 1.5 * Math.PI * t);
                let o = 0;
                if (i.get(this, Fe, "f") && (o += 1.5 * Math.PI * t),
                i.get(this, Ye, "f") && (o -= 1.5 * Math.PI * t),
                0 != s || 0 != o) {
                    const t = new THREE.Vector2(i.get(this, De, "f").position.x,i.get(this, De, "f").position.z).distanceTo(new THREE.Vector2(i.get(this, Oe, "f").target.x,i.get(this, Oe, "f").target.z))
                      , e = i.get(this, De, "f").position.y - i.get(this, Oe, "f").target.y
                      , n = Math.sqrt(t * t + e * e)
                      , a = Math.atan2(i.get(this, De, "f").position.z - i.get(this, Oe, "f").target.z, i.get(this, De, "f").position.x - i.get(this, Oe, "f").target.x) + o;
                    let r = Math.asin(e / n) + s;
                    r = Math.max(-Math.PI / 2 + .001, Math.min(Math.PI / 2 - .001, r)),
                    i.get(this, De, "f").position.x = i.get(this, Oe, "f").target.x + Math.cos(r) * Math.cos(a) * n,
                    i.get(this, De, "f").position.y = i.get(this, Oe, "f").target.y + Math.sin(r) * n,
                    i.get(this, De, "f").position.z = i.get(this, Oe, "f").target.z + Math.cos(r) * Math.sin(a) * n,
                    i.get(this, Oe, "f").update()
                }
            }
        }
        ,
        di = function() {
            return !!i.get(this, re, "f") && (!i.get(this, Tn, "f") && (!i.get(this, ie, "f").isOpen && null == i.get(this, Ge, "f") && !i.get(this, be, "f").isOpen && null == i.get(this, ye, "f") && null == i.get(this, Ae, "f")))
        }
        ;
        const pi = class {
            constructor(t, e, n, s, o, a, r, h, l, c, d, g, f, p) {
                Ft.add(this),
                Yt.set(this, void 0),
                Vt.set(this, performance.now()),
                Zt.set(this, void 0),
                Xt.set(this, void 0),
                jt.set(this, void 0),
                Jt.set(this, void 0),
                Qt.set(this, void 0),
                $t.set(this, void 0),
                te.set(this, void 0),
                ee.set(this, void 0),
                ne.set(this, void 0),
                ie.set(this, void 0),
                se.set(this, void 0),
                oe.set(this, void 0),
                ae.set(this, null),
                re.set(this, !1),
                he.set(this, void 0),
                le.set(this, void 0),
                ce.set(this, void 0),
                de.set(this, null),
                ge.set(this, void 0),
                fe.set(this, void 0),
                pe.set(this, void 0),
                ue.set(this, void 0),
                me.set(this, void 0),
                ve.set(this, void 0),
                we.set(this, void 0),
                be.set(this, void 0),
                ke.set(this, null),
                Ge.set(this, null),
                xe.set(this, void 0),
                ye.set(this, null),
                Ae.set(this, null),
                Me.set(this, void 0),
                Ee.set(this, void 0),
                Ce.set(this, void 0),
                We.set(this, void 0),
                Le.set(this, void 0),
                Pe.set(this, void 0),
                ze.set(this, void 0),
                Ne.set(this, void 0),
                Se.set(this, void 0),
                Te.set(this, void 0),
                qe.set(this, void 0),
                De.set(this, void 0),
                Oe.set(this, void 0),
                Ie.set(this, !1),
                Be.set(this, !1),
                _e.set(this, !1),
                Ue.set(this, !1),
                Re.set(this, !1),
                He.set(this, !1),
                Ke.set(this, !1),
                Fe.set(this, !1),
                Ye.set(this, !1),
                Ve.set(this, !0),
                Ze.set(this, void 0),
                Xe.set(this, void 0),
                je.set(this, void 0),
                Je.set(this, void 0),
                Qe.set(this, []),
                $e.set(this, void 0),
                tn.set(this, void 0),
                en.set(this, null),
                nn.set(this, !1),
                sn.set(this, !1),
                on.set(this, null),
                an.set(this, null),
                rn.set(this, !1),
                hn.set(this, null),
                ln.set(this, 0),
                cn.set(this, 0),
                dn.set(this, TrackPartRotationAxis.YPositive),
                gn.set(this, !0),
                fn.set(this, !1),
                pn.set(this, null),
                un.set(this, null),
                mn.set(this, null),
                vn.set(this, void 0),
                wn.set(this, new Date),
                bn.set(this, []),
                kn.set(this, []),
                Gn.set(this, null),
                xn.set(this, []),
                yn.set(this, null),
                An.set(this, TrackPartColorId.Default),
                Mn.set(this, !1),
                En.set(this, !1),
                Cn.set(this, null),
                Wn.set(this, null),
                Ln.set(this, null),
                Pn.set(this, null),
                zn.set(this, null),
                Nn.set(this, []),
                Sn.set(this, null),
                Tn.set(this, !1),
                i.set(this, Zt, t, "f"),
                i.set(this, Yt, e, "f"),
                i.set(this, Xt, n, "f"),
                i.set(this, jt, s, "f"),
                i.set(this, Jt, o, "f"),
                i.set(this, Qt, a, "f"),
                i.set(this, ee, r, "f"),
                i.set(this, ne, h, "f"),
                i.set(this, $t, l, "f"),
                i.set(this, te, c, "f"),
                i.set(this, ie, d, "f"),
                i.set(this, se, g, "f"),
                i.set(this, oe, f, "f"),
                i.set(this, De, new THREE.PerspectiveCamera(70,1,.5,RenderManager.maxViewDistance), "f"),
                i.get(this, De, "f").position.set(40, 40, -40),
                n.scene.add(i.get(this, De, "f")),
                i.set(this, Oe, new k(i.get(this, De, "f"),n.canvas), "f"),
                i.get(this, Oe, "f").mouseButtons = {
                    MIDDLE: THREE.MOUSE.ROTATE,
                    RIGHT: THREE.MOUSE.PAN
                },
                i.get(this, Oe, "f").minDistance = 4,
                i.get(this, Oe, "f").maxDistance = 3e3,
                i.set(this, Ze, new THREE.Raycaster, "f"),
                i.set(this, vn, h.getCurrentUserProfile().nickname, "f"),
                i.set(this, Je, new THREE.MeshLambertMaterial({
                    transparent: !0,
                    opacity: .3,
                    polygonOffset: !0,
                    polygonOffsetFactor: -.3,
                    depthWrite: !1
                }), "f"),
                i.set(this, je, new THREE.Group, "f"),
                i.get(this, je, "f").visible = !1,
                n.scene.add(i.get(this, je, "f")),
                n.addMaterial(i.get(this, Je, "f")),
                i.set(this, tn, (new THREE.BufferGeometry).setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), new THREE.Vector3(1,0,1), new THREE.Vector3(1,0,1), new THREE.Vector3(1,0,1), new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,1,1), new THREE.Vector3(0,1,1), new THREE.Vector3(0,1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,1,0), new THREE.Vector3(1,1,0), new THREE.Vector3(1,1,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0), new THREE.Vector3(0,0,1), new THREE.Vector3(0,0,1), new THREE.Vector3(0,1,1), new THREE.Vector3(1,0,1), new THREE.Vector3(1,0,1), new THREE.Vector3(1,1,1), new THREE.Vector3(1,0,0), new THREE.Vector3(1,0,0), new THREE.Vector3(1,1,0)]).scale(Track.A.partSize, Track.A.partSize, Track.A.partSize), "f"),
                i.set(this, $e, new THREE.MeshBasicMaterial({
                    wireframe: !0
                }), "f"),
                i.set(this, Xe, new THREE.Mesh(new THREE.PlaneGeometry(1e6,1e6),new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide
                })), "f"),
                i.get(this, Xe, "f").rotation.x = -Math.PI / 2,
                i.get(this, Xe, "f").updateWorldMatrix(!0, !0),
                n.canvas.addEventListener("mousemove", i.set(this, Ee, (t => {
                    const e = t.clientX / window.innerWidth * 2 - 1
                      , n = -t.clientY / window.innerHeight * 2 + 1;
                    null == i.get(this, on, "f") ? i.set(this, on, new THREE.Vector2(e,n), "f") : i.get(this, on, "f").set(e, n)
                }
                ), "f")),
                n.canvas.addEventListener("mousedown", i.set(this, Ce, (t => {
                    0 == t.button && i.set(this, sn, !0, "f"),
                    1 == t.button && t.preventDefault()
                }
                ), "f")),
                window.addEventListener("mouseup", i.set(this, We, (t => {
                    0 == t.button && i.set(this, sn, !1, "f")
                }
                ), "f")),
                n.canvas.addEventListener("mouseout", i.set(this, Le, ( () => {
                    i.set(this, on, null, "f")
                }
                ), "f")),
                n.canvas.addEventListener("touchstart", i.set(this, Pe, ( () => {
                    i.get(this, se, "f").touchEnabled && i.set(this, an, Date.now(), "f")
                }
                ), "f")),
                n.canvas.addEventListener("click", i.set(this, ze, ( () => {
                    if (i.get(this, se, "f").touchEnabled && null != i.get(this, an, "f") && Date.now() - i.get(this, an, "f") < 200 && (i.set(this, an, null, "f"),
                    i.set(this, rn, !0, "f")),
                    i.get(this, Mn, "f") || i.get(this, En, "f")) {
                        const t = i.get(this, Ft, "m", ai).call(this);
                        null != t && (null == i.get(this, Cn, "f") ? i.set(this, Cn, {
                            x: t.x,
                            y: t.y,
                            z: t.z
                        }, "f") : (i.get(this, Ft, "m", Dn).call(this, Math.min(i.get(this, Cn, "f").x, t.x), Math.min(i.get(this, Cn, "f").y, t.y), Math.min(i.get(this, Cn, "f").z, t.z), Math.max(i.get(this, Cn, "f").x, t.x), Math.max(i.get(this, Cn, "f").y, t.y), Math.max(i.get(this, Cn, "f").z, t.z), i.get(this, En, "f")),
                        i.set(this, Mn, !1, "f"),
                        i.set(this, En, !1, "f"),
                        i.set(this, Cn, null, "f")))
                    } else
                        null != i.get(this, Ln, "f") && i.get(this, Ft, "m", In).call(this)
                }
                ), "f")),
                window.addEventListener("keydown", i.set(this, Ne, (t => {
                    i.get(this, Ft, "m", di).call(this) && ("Escape" == t.code && (i.get(this, Mn, "f") || i.get(this, En, "f") ? (i.set(this, Mn, !1, "f"),
                    i.set(this, En, !1, "f"),
                    i.set(this, Cn, null, "f")) : null != i.get(this, Ln, "f") ? (i.set(this, Ln, null, "f"),
                    i.get(this, Ft, "m", Qn).call(this)) : i.get(this, Ft, "m", Rn).call(this, p),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorHeightModifier) && (i.set(this, Ie, !0, "f"),
                    i.get(this, Oe, "f").enableZoom = !1,
                    t.preventDefault()),
                    t.ctrlKey ? ("KeyZ" == t.code && (t.shiftKey ? i.get(this, Ft, "m", Yn).call(this) : i.get(this, Ft, "m", Fn).call(this),
                    t.preventDefault()),
                    "KeyY" == t.code && (i.get(this, Ft, "m", Yn).call(this),
                    t.preventDefault()),
                    "KeyX" == t.code ? (i.set(this, Mn, !1, "f"),
                    i.set(this, En, !0, "f"),
                    i.set(this, Cn, null, "f"),
                    i.set(this, Ln, null, "f"),
                    i.get(this, Ft, "m", ti).call(this, null),
                    t.preventDefault()) : "KeyC" == t.code ? (i.set(this, Mn, !0, "f"),
                    i.set(this, En, !1, "f"),
                    i.set(this, Cn, null, "f"),
                    i.set(this, Ln, null, "f"),
                    i.get(this, Ft, "m", ti).call(this, null),
                    t.preventDefault()) : "KeyV" == t.code && (null != i.get(this, Ln, "f") ? i.get(this, Ft, "m", In).call(this) : null != i.get(this, Wn, "f") && i.get(this, Ft, "m", On).call(this),
                    i.get(this, Ft, "m", ti).call(this, null))) : (f.checkKeyBinding(t, KeyBind.EditorRotatePart) && (i.set(this, cn, (i.get(this, cn, "f") + 1) % 4, "f"),
                    i.get(this, xe, "f").rotation = i.get(this, cn, "f"),
                    i.get(this, Ft, "m", ii).call(this),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorDelete) && (i.set(this, nn, !0, "f"),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorMoveForwards) && (i.set(this, Be, !0, "f"),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorMoveRight) && (i.set(this, _e, !0, "f"),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorMoveBackwards) && (i.set(this, Ue, !0, "f"),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorMoveLeft) && (i.set(this, Re, !0, "f"),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorRotateViewUp) && (i.set(this, He, !0, "f"),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorRotateViewDown) && (i.set(this, Ke, !0, "f"),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorRotateViewLeft) && (i.set(this, Fe, !0, "f"),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorRotateViewRight) && (i.set(this, Ye, !0, "f"),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorMoveDown) && (i.set(this, Ft, Math.max(0, i.get(this, Ft, "a", ei) - 1), "a", ni),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorMoveUp) && (i.set(this, Ft, i.get(this, Ft, "a", ei) + 1, "a", ni),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorTest) && (i.get(this, Ft, "m", Hn).call(this),
                    t.preventDefault()),
                    f.checkKeyBinding(t, KeyBind.EditorPick) && (i.get(this, Ft, "m", Kn).call(this),
                    t.preventDefault())))
                }
                ), "f")),
                window.addEventListener("keyup", i.set(this, Se, (t => {
                    f.checkKeyBinding(t, KeyBind.EditorHeightModifier) && (i.set(this, Ie, !1, "f"),
                    i.get(this, Oe, "f").enableZoom = !0),
                    t.ctrlKey || (f.checkKeyBinding(t, KeyBind.EditorDelete) && i.set(this, nn, !1, "f"),
                    f.checkKeyBinding(t, KeyBind.EditorMoveForwards) && i.set(this, Be, !1, "f"),
                    f.checkKeyBinding(t, KeyBind.EditorMoveRight) && i.set(this, _e, !1, "f"),
                    f.checkKeyBinding(t, KeyBind.EditorMoveBackwards) && i.set(this, Ue, !1, "f"),
                    f.checkKeyBinding(t, KeyBind.EditorMoveLeft) && i.set(this, Re, !1, "f"),
                    f.checkKeyBinding(t, KeyBind.EditorRotateViewUp) && i.set(this, He, !1, "f"),
                    f.checkKeyBinding(t, KeyBind.EditorRotateViewDown) && i.set(this, Ke, !1, "f"),
                    f.checkKeyBinding(t, KeyBind.EditorRotateViewLeft) && i.set(this, Fe, !1, "f"),
                    f.checkKeyBinding(t, KeyBind.EditorRotateViewRight) && i.set(this, Ye, !1, "f"))
                }
                ), "f")),
                window.addEventListener("wheel", i.set(this, Te, (t => {
                    i.get(this, Ie, "f") && i.get(this, re, "f") && (t.deltaY > 0 ? i.set(this, Ft, i.get(this, Ft, "a", ei) + 1, "a", ni) : t.deltaY < 0 && i.set(this, Ft, Math.max(0, i.get(this, Ft, "a", ei) - 1), "a", ni))
                }
                ), "f")),
                window.addEventListener("beforeunload", i.set(this, qe, (t => !i.get(this, Ve, "f") && (t.preventDefault(),
                !0)), "f"));
                const u = document.getElementById("ui");
                if (null == u)
                    throw new Error("Failed to find UI element");
                i.set(this, he, document.createElement("div"), "f"),
                i.get(this, he, "f").className = "hidden",
                u.appendChild(i.get(this, he, "f"));
                const m = document.createElement("div");
                m.className = "safe-area-left",
                i.get(this, he, "f").appendChild(m);
                const v = document.createElement("div");
                v.className = "safe-area-right",
                i.get(this, he, "f").appendChild(v),
                i.set(this, le, document.createElement("div"), "f"),
                i.get(this, le, "f").className = "top",
                i.get(this, he, "f").appendChild(i.get(this, le, "f"));
                const b = document.createElement("div");
                b.className = "button-bar",
                i.get(this, le, "f").appendChild(b);
                const G = document.createElement("button");
                G.className = "button",
                G.innerHTML = '<img class="button-icon" src="images/quit.svg"> ',
                G.append(document.createTextNode(i.get(this, Zt, "f").get("Exit"))),
                G.addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick(),
                    i.get(this, Ft, "m", Rn).call(this, p)
                }
                )),
                b.appendChild(G);
                const x = document.createElement("button");
                x.className = "button",
                x.innerHTML = '<img class="button-icon" src="images/test.svg"> ',
                x.append(i.get(this, Zt, "f").get("Test")),
                x.addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick(),
                    i.get(this, Ft, "m", Hn).call(this)
                }
                )),
                b.appendChild(x);
                const y = document.createElement("button");
                y.className = "button",
                y.innerHTML = '<img class="button-icon" src="images/random.svg"> ',
                y.append(i.get(this, Zt, "f").get("Generate")),
                y.addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick();
                    const t = () => {
                        !function(t) {
                            let e;
                            t.clear();
                            do {
                                let n = 0
                                  , i = 0
                                  , s = 0
                                  , o = Math.floor(4 * Math.random());
                                Math.random() < .5 && (i = Math.floor(20 * Math.random()));
                                const a = new Map;
                                function r() {
                                    switch (o) {
                                    case 0:
                                        --s;
                                        break;
                                    case 1:
                                        --n;
                                        break;
                                    case 2:
                                        ++s;
                                        break;
                                    case 3:
                                        ++n
                                    }
                                }
                                function h() {
                                    switch (o) {
                                    case 0:
                                        ++s;
                                        break;
                                    case 1:
                                        ++n;
                                        break;
                                    case 2:
                                        --s;
                                        break;
                                    case 3:
                                        --n
                                    }
                                }
                                function l() {
                                    switch ((o + 1) % 4) {
                                    case 0:
                                        --s;
                                        break;
                                    case 1:
                                        --n;
                                        break;
                                    case 2:
                                        ++s;
                                        break;
                                    case 3:
                                        ++n
                                    }
                                }
                                function c() {
                                    switch (((o - 1) % 4 + 4) % 4) {
                                    case 0:
                                        --s;
                                        break;
                                    case 1:
                                        --n;
                                        break;
                                    case 2:
                                        ++s;
                                        break;
                                    case 3:
                                        ++n
                                    }
                                }
                                function d(t, n, i, s, o=0) {
                                    const r = t.toString() + "|" + n.toString() + "|" + i.toString();
                                    a.has(r) && (e = !0),
                                    a.set(r, {
                                        x: t,
                                        y: n,
                                        z: i,
                                        type: s,
                                        direction: (o % 4 + 4) % 4
                                    })
                                }
                                function g(t, e, n) {
                                    return !!a.has(t.toString() + "|" + e.toString() + "|" + n.toString())
                                }
                                function f() {
                                    let t = !1;
                                    for (let e = 0; e < i; ++e)
                                        if (g(n, e, s)) {
                                            t = !0;
                                            break
                                        }
                                    if (!t)
                                        for (let t = 0; t < i; ++t) {
                                            let e;
                                            e = 0 == t && t == i - 1 ? 22 : 0 == t ? 21 : t == i - 1 ? 19 : 20,
                                            d(n, t, s, e, 0)
                                        }
                                }
                                function p(t) {
                                    t > 0 ? (--t,
                                    Math.random() < .2 ? A(t) : Math.random() < .6 ? m(t) : Math.random() < .5 ? b(t, i < 2 || Math.random() < .5) : Math.random() < .5 ? v(t) : w(t)) : x()
                                }
                                function u(t) {
                                    t > 0 ? (--t,
                                    Math.random() < .1 ? M(t) : Math.random() < .6 ? E(t) : Math.random() < .5 ? L(t, i < 2 || Math.random() < .5) : Math.random() < .5 ? C(t) : W(t)) : M(t)
                                }
                                function m(t) {
                                    d(n, i, s, Part.Straight, o),
                                    f(),
                                    r(),
                                    p(t)
                                }
                                function v(t) {
                                    d(n, i, s, Part.TurnSharp, o - 1),
                                    f(),
                                    o = (o + 1) % 4,
                                    r(),
                                    t > 0 ? (--t,
                                    Math.random() < .4 ? m(t) : Math.random() < .5 ? v(t) : w(t)) : x()
                                }
                                function w(t) {
                                    d(n, i, s, Part.TurnSharp, o),
                                    f(),
                                    o = ((o - 1) % 4 + 4) % 4,
                                    r(),
                                    t > 0 ? (--t,
                                    Math.random() < .4 ? m(t) : Math.random() < .5 ? v(t) : w(t)) : x()
                                }
                                function b(t, e) {
                                    let a;
                                    a = e ? 2 : 3,
                                    e || --i,
                                    d(n, i + 1, s, null),
                                    d(n, i, s, a, o),
                                    r(),
                                    e && ++i,
                                    t > 0 ? (--t,
                                    Math.random() < .4 || i <= 3 ? k(t, e) : G(t, e)) : k(t, e)
                                }
                                function k(t, e) {
                                    let a;
                                    e || --i,
                                    d(n, i + 1, s, null),
                                    a = e ? 3 : 2,
                                    d(n, i, s, a, o + 2),
                                    r(),
                                    e && ++i,
                                    t > 0 ? p(--t) : x()
                                }
                                function G(t, e) {
                                    let a;
                                    e || (i -= 2),
                                    d(n, i + 1, s, null),
                                    d(n, i + 2, s, null),
                                    a = e ? o : o + 2,
                                    d(n, i, s, Part.Slope, a),
                                    r(),
                                    e && (i += 2),
                                    t > 0 ? (--t,
                                    Math.random() < .4 || i <= 3 ? k(t, e) : G(t, e)) : k(t, e)
                                }
                                function x() {
                                    d(n, i, s, Part.Finish, o)
                                }
                                function y(t) {
                                    d(n, i, s, Part.Start, o),
                                    f(),
                                    r(),
                                    p(t)
                                }
                                function A(t) {
                                    Math.random() < .5 ? (d(n, i, s, Part.ToWideLeft, o),
                                    f(),
                                    c(),
                                    d(n, i, s, Part.OuterCornerWide, o + 2),
                                    f(),
                                    r()) : (d(n, i, s, Part.ToWideRight, o),
                                    f(),
                                    l(),
                                    d(n, i, s, Part.OuterCornerWide, o + 1),
                                    f(),
                                    r(),
                                    c()),
                                    u(t)
                                }
                                function M(t) {
                                    Math.random() < .5 ? (d(n, i, s, Part.OuterCornerWide, o + 3),
                                    f(),
                                    l(),
                                    d(n, i, s, Part.ToWideRight, o + 2),
                                    f(),
                                    r()) : (d(n, i, s, Part.ToWideLeft, o + 2),
                                    f(),
                                    l(),
                                    d(n, i, s, Part.OuterCornerWide, o),
                                    f(),
                                    r(),
                                    c()),
                                    p(t)
                                }
                                function E(t) {
                                    d(n, i, s, Part.StraightWide, o),
                                    f(),
                                    l(),
                                    d(n, i, s, Part.StraightWide, o + 2),
                                    f(),
                                    c(),
                                    r(),
                                    u(t)
                                }
                                function C(t) {
                                    d(n, i, s, Part.StraightWide, o),
                                    f(),
                                    r(),
                                    d(n, i, s, Part.OuterCornerWide, o + 3),
                                    f(),
                                    l(),
                                    d(n, i, s, Part.StraightWide, o + 1),
                                    f(),
                                    h(),
                                    d(n, i, s, Part.InnerCornerWide, o + 3),
                                    f(),
                                    r(),
                                    o = (o + 1) % 4,
                                    r(),
                                    u(t)
                                }
                                function W(t) {
                                    d(n, i, s, Part.InnerCornerWide, o),
                                    f(),
                                    l(),
                                    d(n, i, s, Part.StraightWide, o + 2),
                                    f(),
                                    r(),
                                    d(n, i, s, Part.OuterCornerWide, o),
                                    f(),
                                    c(),
                                    d(n, i, s, Part.StraightWide, o + 1),
                                    f(),
                                    h(),
                                    o = ((o - 1) % 4 + 4) % 4,
                                    r(),
                                    u(t)
                                }
                                function L(t, e) {
                                    let a, h;
                                    e ? (a = Part.SlopeUpLeftWide,
                                    h = Part.SlopeUpRightWide) : (a = Part.SlopeDownLeftWide,
                                    h = Part.SlopeDownRightWide),
                                    e || --i,
                                    l(),
                                    d(n, i + 1, s, null),
                                    d(n, i, s, a, o),
                                    c(),
                                    d(n, i + 1, s, null),
                                    d(n, i, s, h, o),
                                    r(),
                                    e && ++i,
                                    t > 0 ? (--t,
                                    Math.random() < .4 || i <= 3 ? P(t, e) : z(t, e)) : P(t, e)
                                }
                                function P(t, e) {
                                    let a, h;
                                    e || --i,
                                    e ? (a = Part.SlopeDownRightWide,
                                    h = Part.SlopeDownLeftWide) : (a = Part.SlopeUpRightWide,
                                    h = Part.SlopeUpLeftWide),
                                    l(),
                                    d(n, i + 1, s, null),
                                    d(n, i, s, a, o + 2),
                                    c(),
                                    d(n, i + 1, s, null),
                                    d(n, i, s, h, o + 2),
                                    r(),
                                    e && ++i,
                                    u(t)
                                }
                                function z(t, e) {
                                    e || (i -= 2),
                                    e ? (l(),
                                    d(n, i + 1, s, null),
                                    d(n, i + 2, s, null),
                                    d(n, i, s, Part.SlopeLeftWide, o),
                                    c(),
                                    d(n, i + 1, s, null),
                                    d(n, i + 2, s, null),
                                    d(n, i, s, Part.SlopeRightWide, o)) : (l(),
                                    d(n, i + 1, s, null),
                                    d(n, i + 2, s, null),
                                    d(n, i, s, Part.SlopeRightWide, o + 2),
                                    c(),
                                    d(n, i + 1, s, null),
                                    d(n, i + 2, s, null),
                                    d(n, i, s, Part.SlopeLeftWide, o + 2)),
                                    r(),
                                    e && (i += 2),
                                    t > 0 ? (--t,
                                    Math.random() < .4 || i <= 3 ? P(t, e) : z(t, e)) : P(t, e)
                                }
                                if (e = !1,
                                y(50),
                                !e)
                                    for (const N of a.values())
                                        if (null != N.type) {
                                            let S = null;
                                            N.type == Part.Start && (S = 0),
                                            t.setPart(4 * N.x, N.y, 4 * N.z, N.type, N.direction, TrackPartRotationAxis.YPositive, TrackPartColorId.Default, null, S)
                                        }
                            } while (e)
                        }(i.get(this, Jt, "f")),
                        i.get(this, Ft, "m", si).call(this),
                        i.set(this, Ve, !0, "f"),
                        i.set(this, Mn, !1, "f"),
                        i.set(this, En, !1, "f"),
                        i.set(this, Cn, null, "f"),
                        i.get(this, bn, "f").length = 0,
                        i.get(this, kn, "f").length = 0,
                        i.get(this, fe, "f").disabled = !0,
                        i.get(this, pe, "f").disabled = !0
                    }
                    ;
                    i.get(this, Ve, "f") ? t() : (i.get(this, he, "f").inert = !0,
                    i.get(this, ie, "f").showConfirm(i.get(this, Zt, "f").get("Are you sure you want to generate a new track?\n\nYour current track will be lost!"), i.get(this, Zt, "f").get("Cancel"), i.get(this, Zt, "f").get("Confirm"), ( () => {
                        i.get(this, he, "f").inert = !1
                    }
                    ), ( () => {
                        t(),
                        i.get(this, he, "f").inert = !1
                    }
                    )))
                }
                )),
                b.appendChild(y),
                i.set(this, be, new ct.A(u,i.get(this, Zt, "f"),i.get(this, Yt, "f"),i.get(this, $t, "f"),i.get(this, te, "f"),i.get(this, ne, "f"),i.get(this, ie, "f"),i.get(this, ee, "f"),"cancel",!0,( () => {
                    i.get(this, he, "f").className = "editor-ui",
                    i.get(this, be, "f").hide()
                }
                ),( (t, e, n) => {
                    i.get(this, be, "f").hide(),
                    i.set(this, Tn, !0, "f"),
                    i.set(this, ke, new LoadingScreenUI(!0), "f"),
                    n().then((e => {
                        const n = i.get(this, Jt, "f").environment;
                        i.get(this, Jt, "f").loadTrackData(e),
                        i.get(this, Jt, "f").environment != n && i.get(this, Ft, "m", Jn).call(this),
                        i.get(this, Ft, "m", si).call(this),
                        i.set(this, Mn, !1, "f"),
                        i.set(this, En, !1, "f"),
                        i.set(this, Cn, null, "f"),
                        i.get(this, bn, "f").length = 0,
                        i.get(this, kn, "f").length = 0,
                        i.get(this, fe, "f").disabled = !0,
                        i.get(this, pe, "f").disabled = !0,
                        i.get(this, Ft, "m", Bn).call(this, t),
                        i.set(this, Ve, !0, "f");
                        const s = i.get(this, Jt, "f").getStart();
                        if (null != s)
                            this.resetView(s.x, s.y, s.z);
                        else {
                            const t = i.get(this, Jt, "f").getBounds();
                            this.resetView(t.min.x + Math.floor((t.max.x - t.min.x) / 2), 0, t.min.y + Math.floor((t.max.y - t.min.y) / 2))
                        }
                        i.get(this, he, "f").className = "editor-ui",
                        i.set(this, Tn, !1, "f")
                    }
                    )).catch((t => {
                        if (!(t instanceof gi.A))
                            throw t;
                        i.get(this, ie, "f").show(i.get(this, Zt, "f").get("Failed to load track"), i.get(this, Zt, "f").get("Ok"), ( () => {
                            i.set(this, Tn, !1, "f"),
                            i.get(this, be, "f").show()
                        }
                        ))
                    }
                    )).finally(( () => {
                        i.get(this, ke, "f")?.dispose(),
                        i.set(this, ke, null, "f")
                    }
                    ))
                }
                )), "f"),
                i.set(this, xe, new yt(i.get(this, he, "f"),i.get(this, Yt, "f"),i.get(this, se, "f"),(t => {
                    i.set(this, fn, t, "f")
                }
                ),(t => {
                    i.set(this, gn, t, "f"),
                    i.set(this, Mn, !1, "f"),
                    i.set(this, En, !1, "f"),
                    i.set(this, Cn, null, "f")
                }
                ),(t => {
                    i.set(this, dn, t, "f"),
                    i.get(this, xe, "f").rotationAxis = i.get(this, dn, "f"),
                    i.get(this, Ft, "m", ii).call(this)
                }
                ),( () => {
                    i.set(this, cn, (i.get(this, cn, "f") + 1) % 4, "f"),
                    i.get(this, xe, "f").rotation = i.get(this, cn, "f"),
                    i.get(this, Ft, "m", ii).call(this)
                }
                )), "f");
                const A = document.createElement("button");
                A.className = "button",
                A.innerHTML = '<img class="button-icon" src="images/load.svg"> ',
                A.append(document.createTextNode(i.get(this, Zt, "f").get("Load"))),
                A.addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick(),
                    i.get(this, Ve, "f") ? (i.get(this, be, "f").show(),
                    i.get(this, he, "f").className = "hidden") : (i.get(this, he, "f").inert = !0,
                    i.get(this, ie, "f").showConfirm(i.get(this, Zt, "f").get("Are you sure you want to load a new track?\n\nYour current track will be lost!"), i.get(this, Zt, "f").get("Cancel"), i.get(this, Zt, "f").get("Confirm"), ( () => {
                        i.get(this, he, "f").inert = !1
                    }
                    ), ( () => {
                        i.get(this, be, "f").show(),
                        i.get(this, he, "f").className = "hidden",
                        i.get(this, he, "f").inert = !1
                    }
                    )))
                }
                )),
                b.appendChild(A);
                const M = document.createElement("button");
                M.className = "button",
                M.innerHTML = '<img class="button-icon" src="images/save.svg"> ',
                M.append(document.createTextNode(i.get(this, Zt, "f").get("Save"))),
                M.addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick();
                    const t = t => {
                        const e = {
                            name: t,
                            author: i.get(this, vn, "f"),
                            lastModified: i.get(this, wn, "f")
                        }
                          , n = i.get(this, Jt, "f").getTrackData();
                        i.get(this, te, "f").saveCustomTrack(e, n) ? (i.get(this, Ft, "m", Vn).call(this, i.get(this, Zt, "f").get("Track saved!"), !0),
                        i.set(this, Ve, !0, "f")) : i.get(this, Ft, "m", Vn).call(this, i.get(this, Zt, "f").get("Failed to save!"), !1)
                    }
                      , e = i.get(this, mn, "f");
                    if (null == e)
                        i.get(this, he, "f").className = "hidden",
                        i.set(this, Ae, new It(i.get(this, Yt, "f"),i.get(this, Zt, "f"),i.get(this, mn, "f"),i.get(this, vn, "f"),i.get(this, Jt, "f"),(t => {
                            i.get(this, Ft, "m", jn).call(this, t)
                        }
                        ),( (t, e) => {
                            i.get(this, Ft, "m", _n).call(this, t),
                            i.get(this, Ft, "m", Un).call(this, e),
                            i.get(this, Ae, "f")?.dispose(),
                            i.set(this, Ae, null, "f"),
                            i.get(this, he, "f").className = "editor-ui"
                        }
                        ),( (e, n) => {
                            i.get(this, Ft, "m", _n).call(this, e),
                            i.get(this, Ft, "m", Un).call(this, n),
                            i.get(this, Ae, "f")?.dispose(),
                            i.set(this, Ae, null, "f"),
                            t(e),
                            i.get(this, he, "f").className = "editor-ui"
                        }
                        )), "f");
                    else {
                        i.get(this, te, "f").checkCustomTrackNameExists(e) ? (i.get(this, he, "f").inert = !0,
                        i.get(this, ie, "f").showConfirm(i.get(this, Zt, "f").get('Are you sure you want to overwrite "{0}"?', [e]), i.get(this, Zt, "f").get("Cancel"), i.get(this, Zt, "f").get("Confirm"), ( () => {
                            i.get(this, he, "f").inert = !1
                        }
                        ), ( () => {
                            t(e),
                            i.get(this, he, "f").inert = !1
                        }
                        ))) : t(e)
                    }
                }
                )),
                b.appendChild(M);
                const E = document.createElement("button");
                E.className = "button",
                E.innerHTML = '<img class="button-icon" src="images/export.svg"> ',
                E.append(document.createTextNode(i.get(this, Zt, "f").get("Export"))),
                E.addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick();
                    const t = i.get(this, mn, "f");
                    if (null == t)
                        i.get(this, he, "f").className = "hidden",
                        i.set(this, Ae, new It(i.get(this, Yt, "f"),i.get(this, Zt, "f"),i.get(this, mn, "f"),i.get(this, vn, "f"),i.get(this, Jt, "f"),(t => {
                            i.get(this, Ft, "m", jn).call(this, t)
                        }
                        ),( (t, e) => {
                            i.get(this, Ft, "m", _n).call(this, t),
                            i.get(this, Ft, "m", Un).call(this, e),
                            i.get(this, Ae, "f")?.dispose(),
                            i.set(this, Ae, null, "f"),
                            i.get(this, he, "f").className = "editor-ui"
                        }
                        ),( (t, e) => {
                            i.get(this, Ft, "m", _n).call(this, t),
                            i.get(this, Ft, "m", Un).call(this, e),
                            i.get(this, Ae, "f")?.dispose(),
                            i.set(this, Ae, null, "f");
                            const n = {
                                name: t,
                                author: i.get(this, vn, "f"),
                                lastModified: i.get(this, wn, "f")
                            }
                              , s = i.get(this, Jt, "f").getTrackData().toExportString(n);
                            i.set(this, Ge, new TrackExportUI(s,( () => {
                                i.get(this, Ge, "f")?.dispose(),
                                i.set(this, Ge, null, "f"),
                                i.get(this, he, "f").className = "editor-ui"
                            }
                            ),null,i.get(this, Zt, "f"),i.get(this, Yt, "f"),i.get(this, te, "f"),i.get(this, ie, "f")), "f")
                        }
                        )), "f");
                    else {
                        i.get(this, he, "f").className = "hidden";
                        const e = {
                            name: t,
                            author: i.get(this, vn, "f"),
                            lastModified: i.get(this, wn, "f")
                        }
                          , n = i.get(this, Jt, "f").getTrackData().toExportString(e);
                        i.set(this, Ge, new TrackExportUI(n,( () => {
                            i.get(this, Ge, "f")?.dispose(),
                            i.set(this, Ge, null, "f"),
                            i.get(this, he, "f").className = "editor-ui"
                        }
                        ),null,i.get(this, Zt, "f"),i.get(this, Yt, "f"),i.get(this, te, "f"),i.get(this, ie, "f")), "f")
                    }
                }
                )),
                b.appendChild(E);
                const C = document.createElement("button");
                C.className = "button",
                C.innerHTML = '<img class="button-icon" src="images/help.svg"> ',
                C.append(document.createTextNode(i.get(this, Zt, "f").get("Help"))),
                C.addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick();
                    const t = i.get(this, Qt, "f").getPart(Part.Start).colors.get(TrackPartColorId.Summer);
                    if (null == t)
                        throw new Error("Starting point mesh is null");
                    const e = Kt(t)
                      , n = i.get(this, Qt, "f").getPart(Part.Checkpoint).colors.get(TrackPartColorId.Summer);
                    if (null == n)
                        throw new Error("Checkpoint mesh is null");
                    const s = Kt(n)
                      , o = i.get(this, Qt, "f").getPart(Part.Finish).colors.get(TrackPartColorId.Summer);
                    if (null == o)
                        throw new Error("Finish line mesh is null");
                    const a = Kt(o);
                    i.get(this, he, "f").className = "hidden",
                    i.set(this, ye, new Lt(i.get(this, Yt, "f"),i.get(this, Zt, "f"),i.get(this, oe, "f"),i.get(this, se, "f"),e,s,a,( () => {
                        i.get(this, ye, "f")?.dispose(),
                        i.set(this, ye, null, "f"),
                        i.get(this, he, "f").className = "editor-ui"
                    }
                    )), "f")
                }
                )),
                b.appendChild(C);
                const W = document.createElement("div");
                W.className = "track-settings-container",
                i.get(this, le, "f").appendChild(W),
                i.set(this, Me, document.createElement("button"), "f"),
                i.get(this, Me, "f").className = "button",
                i.get(this, Me, "f").innerHTML = '<img class="button-icon" src="images/settings.svg"> ',
                i.get(this, Me, "f").append(document.createTextNode(i.get(this, mn, "f") ?? i.get(this, Zt, "f").get("Unnamed Track"))),
                i.get(this, Me, "f").addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick(),
                    i.get(this, he, "f").className = "hidden",
                    i.set(this, Ae, new It(i.get(this, Yt, "f"),i.get(this, Zt, "f"),i.get(this, mn, "f"),i.get(this, vn, "f"),i.get(this, Jt, "f"),(t => {
                        i.get(this, Ft, "m", jn).call(this, t)
                    }
                    ),( (t, e) => {
                        i.get(this, Ft, "m", _n).call(this, t),
                        i.get(this, Ft, "m", Un).call(this, e),
                        i.get(this, Ae, "f")?.dispose(),
                        i.set(this, Ae, null, "f"),
                        i.get(this, he, "f").className = "editor-ui"
                    }
                    ),null), "f")
                }
                )),
                W.appendChild(i.get(this, Me, "f")),
                i.set(this, ce, document.createElement("div"), "f"),
                i.get(this, ce, "f").className = "message",
                i.get(this, he, "f").appendChild(i.get(this, ce, "f"));
                const P = document.createElement("side");
                P.className = "side",
                i.get(this, he, "f").appendChild(P);
                const z = document.createElement("div");
                z.className = "container",
                P.appendChild(z);
                const N = document.createElement("div");
                N.className = "mini-toolbar-container",
                z.appendChild(N);
                const S = document.createElement("button");
                S.className = "button",
                S.innerHTML = '<img class="button-icon" src="images/cut.svg">',
                S.addEventListener("click", ( () => {
                    i.set(this, Mn, !1, "f"),
                    i.set(this, En, !0, "f"),
                    i.set(this, Cn, null, "f"),
                    i.set(this, Ln, null, "f"),
                    i.get(this, Ft, "m", ti).call(this, null)
                }
                )),
                N.appendChild(S);
                const T = document.createElement("button");
                T.className = "button",
                T.innerHTML = '<img class="button-icon" src="images/copy.svg">',
                T.addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick(),
                    i.set(this, Mn, !0, "f"),
                    i.set(this, En, !1, "f"),
                    i.set(this, Cn, null, "f"),
                    i.set(this, Ln, null, "f"),
                    i.get(this, Ft, "m", ti).call(this, null)
                }
                )),
                N.appendChild(T),
                i.set(this, ge, document.createElement("button"), "f"),
                i.get(this, ge, "f").className = "button",
                i.get(this, ge, "f").disabled = !0,
                i.get(this, ge, "f").innerHTML = '<img class="button-icon" src="images/paste.svg">',
                i.get(this, ge, "f").addEventListener("click", ( () => {
                    null != i.get(this, Ln, "f") ? i.get(this, Ft, "m", In).call(this) : null != i.get(this, Wn, "f") && i.get(this, Ft, "m", On).call(this),
                    i.get(this, Ft, "m", ti).call(this, null)
                }
                )),
                N.appendChild(i.get(this, ge, "f"));
                const q = document.createElement("div");
                q.className = "undo-container",
                N.appendChild(q),
                i.set(this, fe, document.createElement("button"), "f"),
                i.get(this, fe, "f").disabled = !0,
                i.get(this, fe, "f").className = "button",
                i.get(this, fe, "f").innerHTML = '<img class="button-icon" src="images/undo.svg">',
                i.get(this, fe, "f").addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick(),
                    i.get(this, Ft, "m", Fn).call(this)
                }
                )),
                q.appendChild(i.get(this, fe, "f")),
                i.set(this, pe, document.createElement("button"), "f"),
                i.get(this, pe, "f").disabled = !0,
                i.get(this, pe, "f").className = "button",
                i.get(this, pe, "f").innerHTML = '<img class="button-icon" src="images/redo.svg">',
                i.get(this, pe, "f").addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick(),
                    i.get(this, Ft, "m", Yn).call(this)
                }
                )),
                q.appendChild(i.get(this, pe, "f")),
                i.set(this, we, new F(z,i.get(this, Zt, "f"),i.get(this, Yt, "f"),i.get(this, se, "f")), "f"),
                i.set(this, ue, document.createElement("div"), "f"),
                i.get(this, ue, "f").className = "side-panel",
                P.appendChild(i.get(this, ue, "f")),
                i.set(this, me, document.createElement("div"), "f"),
                i.get(this, me, "f").className = "category-panel",
                i.get(this, ue, "f").appendChild(i.get(this, me, "f"));
                const D = document.createElement("button");
                D.addEventListener("click", ( () => {
                    i.get(this, Yt, "f").playUIClick(),
                    i.get(this, Ft, "m", $n).call(this, null)
                }
                )),
                i.get(this, me, "f").appendChild(D);
                const O = document.createElement("img");
                O.src = "images/erase.svg",
                D.appendChild(O),
                i.get(this, xn, "f").push({
                    id: null,
                    trackPartData: null,
                    button: D,
                    image: O,
                    colorPanel: null,
                    colorButtons: [],
                    tiles: new dt.A([[-2, 0, -2], [-1, 0, -2], [0, 0, -2], [1, 0, -2], [-2, 0, -1], [-1, 0, -1], [0, 0, -1], [1, 0, -1], [-2, 0, 0], [-1, 0, 0], [0, 0, 0], [1, 0, 0], [-2, 0, 1], [-1, 0, 1], [0, 0, 1], [1, 0, 1]]),
                    isCheckpoint: !1,
                    isStart: !1,
                    category: null
                }),
                i.set(this, ve, new it(i.get(this, he, "f"),i.get(this, Zt, "f"),i.get(this, se, "f"),( () => {
                    i.get(this, Yt, "f").playUIClick(),
                    i.set(this, Ft, i.get(this, Ft, "a", ei) + 1, "a", ni)
                }
                ),( () => {
                    i.get(this, Yt, "f").playUIClick(),
                    i.set(this, Ft, Math.max(0, i.get(this, Ft, "a", ei) - 1), "a", ni)
                }
                )), "f"),
                i.get(this, ve, "f").refresh(i.get(this, Ft, "a", ei))
            }
            dispose() {
                i.set(this, re, !1, "f"),
                i.get(this, Gn, "f")?.dispose(),
                i.get(this, ve, "f").dispose(),
                i.get(this, we, "f").dispose(),
                i.get(this, Ge, "f")?.dispose(),
                i.set(this, Ge, null, "f"),
                i.get(this, be, "f").dispose(),
                i.get(this, ke, "f")?.dispose(),
                i.set(this, ke, null, "f"),
                i.get(this, xe, "f").dispose(),
                i.get(this, ye, "f")?.dispose(),
                i.set(this, ye, null, "f");
                const t = document.getElementById("ui");
                if (null == t)
                    throw new Error("Failed to find UI element");
                t.removeChild(i.get(this, he, "f")),
                i.get(this, Xt, "f").scene.remove(i.get(this, De, "f")),
                i.get(this, Oe, "f").dispose(),
                i.get(this, Xt, "f").canvas.style.touchAction = "",
                i.get(this, Je, "f").dispose(),
                i.get(this, Xt, "f").removeMaterial(i.get(this, Je, "f"));
                for (const t of i.get(this, je, "f").children) {
                    if (!(t instanceof THREE.Mesh))
                        throw new Error("Object is not a mesh");
                    const e = t;
                    if (e.geometry.dispose(),
                    Array.isArray(e.material))
                        for (const t of e.material) {
                            if (!(t instanceof THREE.Material))
                                throw new Error("Material is not a THREE.Material");
                            t.dispose()
                        }
                    else
                        e.material.dispose()
                }
                if (i.get(this, Xt, "f").scene.remove(i.get(this, je, "f")),
                null != i.get(this, en, "f") && (i.get(this, Xt, "f").scene.remove(i.get(this, en, "f")),
                i.get(this, en, "f").dispose(),
                i.get(this, tn, "f").dispose(),
                i.get(this, $e, "f").dispose(),
                i.set(this, en, null, "f")),
                null != i.get(this, Pn, "f") && (i.get(this, Xt, "f").scene.remove(i.get(this, Pn, "f").fill),
                i.get(this, Pn, "f").fill.geometry.dispose(),
                i.get(this, Pn, "f").fill.material.dispose(),
                i.get(this, Xt, "f").scene.remove(i.get(this, Pn, "f").outline),
                i.get(this, Pn, "f").outline.geometry.dispose(),
                i.get(this, Pn, "f").outline.material.dispose(),
                i.set(this, Pn, null, "f")),
                i.get(this, Xe, "f").geometry.dispose(),
                Array.isArray(i.get(this, Xe, "f").material))
                    for (const t of i.get(this, Xe, "f").material) {
                        if (!(t instanceof THREE.Material))
                            throw new Error("Material is not a THREE.Material");
                        t.dispose()
                    }
                else
                    i.get(this, Xe, "f").material.dispose();
                i.set(this, Mn, !1, "f"),
                i.set(this, En, !1, "f"),
                i.set(this, Cn, null, "f"),
                i.set(this, Ln, null, "f"),
                i.get(this, Ft, "m", Qn).call(this),
                i.get(this, bn, "f").length = 0,
                i.get(this, kn, "f").length = 0,
                i.get(this, fe, "f").disabled = !0,
                i.get(this, pe, "f").disabled = !0,
                i.get(this, Xt, "f").canvas.removeEventListener("mousemove", i.get(this, Ee, "f")),
                i.get(this, Xt, "f").canvas.removeEventListener("mousedown", i.get(this, Ce, "f")),
                window.removeEventListener("mouseup", i.get(this, We, "f")),
                i.get(this, Xt, "f").canvas.removeEventListener("mouseout", i.get(this, Le, "f")),
                i.get(this, Xt, "f").canvas.removeEventListener("touchstart", i.get(this, Pe, "f")),
                i.get(this, Xt, "f").canvas.removeEventListener("click", i.get(this, ze, "f")),
                window.removeEventListener("keydown", i.get(this, Ne, "f")),
                window.removeEventListener("keyup", i.get(this, Se, "f")),
                window.removeEventListener("wheel", i.get(this, Te, "f")),
                window.removeEventListener("beforeunload", i.get(this, qe, "f"))
            }
            getTrackMetadata() {
                return {
                    name: i.get(this, mn, "f") ?? i.get(this, Zt, "f").get("Unnamed Track"),
                    author: i.get(this, vn, "f"),
                    lastModified: i.get(this, wn, "f")
                }
            }
            setTestCallback(t) {
                i.set(this, ae, t, "f")
            }
            enable() {
                i.set(this, re, !0, "f"),
                1 == i.get(this, xn, "f").length && i.get(this, Ft, "m", Zn).call(this),
                i.get(this, Gn, "f")?.dispose(),
                i.set(this, Gn, new N(i.get(this, Xt, "f")), "f"),
                i.get(this, Gn, "f").refresh(i.get(this, Jt, "f")),
                i.get(this, xe, "f").show(),
                i.get(this, he, "f").className = "editor-ui"
            }
            disable() {
                i.set(this, re, !1, "f"),
                i.get(this, je, "f").visible = !1,
                i.set(this, Mn, !1, "f"),
                i.set(this, En, !1, "f"),
                i.set(this, Cn, null, "f"),
                i.get(this, Ft, "m", qn).call(this),
                i.get(this, Gn, "f")?.dispose(),
                i.get(this, he, "f").className = "hidden",
                i.get(this, Ge, "f")?.dispose(),
                i.set(this, Ge, null, "f"),
                i.get(this, be, "f").hide(),
                i.get(this, xe, "f").hide(),
                i.get(this, ye, "f")?.dispose(),
                i.set(this, ye, null, "f")
            }
            isEnabled() {
                return i.get(this, re, "f")
            }
            resetView(t, e, n) {
                i.set(this, Ft, e, "a", ni);
                const s = new THREE.Vector3(t * Track.A.partSize,e * Track.A.partSize,n * Track.A.partSize);
                i.get(this, De, "f").position.copy(s).add(new THREE.Vector3(40,40,-40)),
                i.get(this, Oe, "f").target.copy(s),
                i.get(this, Oe, "f").update()
            }
            get camera() {
                return i.get(this, De, "f")
            }
            update(t) {
                if (i.get(this, Ft, "m", ci).call(this, t),
                i.get(this, Oe, "f").enabled = i.get(this, Ft, "m", di).call(this),
                i.get(this, re, "f")) {
                    if (i.get(this, De, "f").position.y < .499 && (i.get(this, De, "f").position.y = .5,
                    i.get(this, Oe, "f").update()),
                    i.get(this, Ft, "m", qn).call(this),
                    i.set(this, hn, i.get(this, Ft, "m", ai).call(this), "f"),
                    null != i.get(this, hn, "f")) {
                        const t = TrackPartTransform.rotationAndAxisToQuaternion(i.get(this, cn, "f"), i.get(this, dn, "f"))
                          , e = new THREE.Vector3(i.get(this, hn, "f").x * Track.A.partSize,i.get(this, hn, "f").y * Track.A.partSize,i.get(this, hn, "f").z * Track.A.partSize);
                        i.get(this, je, "f").position.copy(e),
                        i.get(this, je, "f").quaternion.copy(t),
                        i.get(this, je, "f").visible = !0
                    } else
                        i.get(this, je, "f").visible = !1;
                    const t = i.get(this, hn, "f");
                    if (null != t && null != i.get(this, Ln, "f")) {
                        if (null == i.get(this, zn, "f") || i.get(this, zn, "f").x != t.x || i.get(this, zn, "f").y != t.y || i.get(this, zn, "f").z != t.z) {
                            let e;
                            i.set(this, zn, t, "f"),
                            e = !i.get(this, fn, "f") && i.get(this, Ft, "m", hi).call(this, t, i.get(this, Ln, "f").tiles),
                            e ? (i.get(this, Je, "f").color.set(12303104),
                            i.get(this, $e, "f").color.set(12303104)) : (i.get(this, Je, "f").color.set(187),
                            i.get(this, $e, "f").color.set(187))
                        }
                    } else if (null != t && null != i.get(this, yn, "f")) {
                        const e = i.get(this, xn, "f")[i.get(this, yn, "f")]
                          , n = i.get(this, Ft, "m", ri).call(this, t, e.tiles);
                        if (null == e.id || i.get(this, nn, "f"))
                            n.length > 0 ? (i.get(this, Je, "f").color.set(12255232),
                            i.get(this, $e, "f").color.set(12255232)) : (i.get(this, Je, "f").color.set(12263970),
                            i.get(this, $e, "f").color.set(12263970));
                        else {
                            let s, o;
                            if (i.get(this, fn, "f"))
                                s = n.some(( ({parts: n}) => n.some((n => n.id == e.id && n.x == t.x && n.y == t.y && n.z == t.z && n.rotation == i.get(this, cn, "f") && n.rotationAxis == i.get(this, dn, "f"))))),
                                o = !1;
                            else {
                                s = !1;
                                for (const {parts: a} of n)
                                    for (const n of a) {
                                        if (!i.get(this, Qt, "f").isPartCombinationAllowed({
                                            id: e.id,
                                            x: t.x,
                                            y: t.y,
                                            z: t.z,
                                            rotation: i.get(this, cn, "f"),
                                            rotationAxis: i.get(this, dn, "f")
                                        }, {
                                            id: n.id,
                                            x: n.x,
                                            y: n.y,
                                            z: n.z,
                                            rotation: n.rotation,
                                            rotationAxis: n.rotationAxis
                                        })) {
                                            s = !0;
                                            break
                                        }
                                        o = !0
                                    }
                            }
                            s ? (i.get(this, Je, "f").color.set(12303104),
                            i.get(this, $e, "f").color.set(12303104)) : o ? (i.get(this, Je, "f").color.set(48059),
                            i.get(this, $e, "f").color.set(48059)) : (i.get(this, Je, "f").color.set(187),
                            i.get(this, $e, "f").color.set(187))
                        }
                        const s = []
                          , o = [];
                        if (i.get(this, nn, "f")) {
                            if (null == i.get(this, un, "f") || i.get(this, un, "f").x != t.x || i.get(this, un, "f").y != t.y || i.get(this, un, "f").z != t.z) {
                                let o = null;
                                for (const {parts: s} of n) {
                                    for (const n of s)
                                        if (n.id == e.id && n.x == t.x && n.y == t.y && n.z == t.z && n.rotation == i.get(this, cn, "f") && n.rotationAxis == i.get(this, dn, "f")) {
                                            o = [n];
                                            break
                                        }
                                    if (null != o)
                                        break
                                }
                                i.get(this, Ft, "m", li).call(this, o ?? n.flatMap(( ({parts: t}) => t)), s),
                                i.set(this, un, {
                                    x: t.x,
                                    y: t.y,
                                    z: t.z
                                }, "f")
                            }
                        } else if (i.get(this, sn, "f") || i.get(this, rn, "f")) {
                            if (null == e.id)
                                null != i.get(this, un, "f") && i.get(this, un, "f").x == t.x && i.get(this, un, "f").y == t.y && i.get(this, un, "f").z == t.z || (i.get(this, Ft, "m", li).call(this, n.flatMap(( ({parts: t}) => t)), s),
                                i.set(this, un, {
                                    x: t.x,
                                    y: t.y,
                                    z: t.z
                                }, "f"));
                            else if (null == i.get(this, pn, "f") || i.get(this, pn, "f").x != t.x || i.get(this, pn, "f").y != t.y || i.get(this, pn, "f").z != t.z || i.get(this, pn, "f").id != e.id || i.get(this, pn, "f").rotation != i.get(this, cn, "f") || i.get(this, pn, "f").rotationAxis != i.get(this, dn, "f")) {
                                if (i.get(this, fn, "f"))
                                    for (const {parts: o} of n) {
                                        const n = o.find((n => n.id == e.id && n.x == t.x && n.y == t.y && n.z == t.z && n.rotation == i.get(this, cn, "f") && n.rotationAxis == i.get(this, dn, "f")));
                                        null != n && null != i.get(this, Jt, "f").deleteSpecificPart(n.id, n.x, n.y, n.z, n.rotation, n.rotationAxis) && s.push({
                                            id: n.id,
                                            x: n.x,
                                            y: n.y,
                                            z: n.z,
                                            rotation: n.rotation,
                                            rotationAxis: n.rotationAxis,
                                            color: n.color,
                                            checkpointOrder: n.checkpointOrder,
                                            startOrder: n.startOrder
                                        })
                                    }
                                else
                                    for (const {parts: o} of n)
                                        for (const n of o)
                                            i.get(this, Qt, "f").isPartCombinationAllowed({
                                                id: e.id,
                                                x: t.x,
                                                y: t.y,
                                                z: t.z,
                                                rotation: i.get(this, cn, "f"),
                                                rotationAxis: i.get(this, dn, "f")
                                            }, {
                                                id: n.id,
                                                x: n.x,
                                                y: n.y,
                                                z: n.z,
                                                rotation: n.rotation,
                                                rotationAxis: n.rotationAxis
                                            }) || null != i.get(this, Jt, "f").deleteSpecificPart(n.id, n.x, n.y, n.z, n.rotation, n.rotationAxis) && s.push({
                                                id: n.id,
                                                x: n.x,
                                                y: n.y,
                                                z: n.z,
                                                rotation: n.rotation,
                                                rotationAxis: n.rotationAxis,
                                                color: n.color,
                                                checkpointOrder: n.checkpointOrder,
                                                startOrder: n.startOrder
                                            });
                                let a = null;
                                e.isCheckpoint && (a = i.get(this, we, "f").checkpointOrder);
                                let r = null;
                                e.isStart && (r = i.get(this, Jt, "f").getNextStartOrder()),
                                i.get(this, Jt, "f").setPart(t.x, t.y, t.z, e.id, i.get(this, cn, "f"), i.get(this, dn, "f"), i.get(this, Ft, "m", Xn).call(this), a, r),
                                i.get(this, Ft, "m", oi).call(this),
                                o.push({
                                    id: e.id,
                                    x: t.x,
                                    y: t.y,
                                    z: t.z,
                                    rotation: i.get(this, cn, "f"),
                                    rotationAxis: i.get(this, dn, "f"),
                                    color: i.get(this, Ft, "m", Xn).call(this),
                                    checkpointOrder: a,
                                    startOrder: r
                                }),
                                i.set(this, pn, {
                                    x: t.x,
                                    y: t.y,
                                    z: t.z,
                                    id: e.id,
                                    rotation: i.get(this, cn, "f"),
                                    rotationAxis: i.get(this, dn, "f")
                                }, "f"),
                                i.get(this, Ft, "m", si).call(this)
                            }
                            i.set(this, rn, !1, "f")
                        } else
                            i.set(this, pn, null, "f"),
                            i.set(this, un, null, "f");
                        (s.length > 0 || o.length > 0) && (i.get(this, bn, "f").push({
                            removed: s,
                            added: o
                        }),
                        i.get(this, kn, "f").length = 0,
                        i.get(this, fe, "f").disabled = 0 == i.get(this, bn, "f").length,
                        i.get(this, pe, "f").disabled = 0 == i.get(this, kn, "f").length),
                        i.get(this, je, "f").visible = !0
                    } else
                        i.get(this, je, "f").visible = !1,
                        i.set(this, pn, null, "f"),
                        i.set(this, un, null, "f")
                }
            }
        }
        ;
        var ui, mi, vi, wi, bi, ki, Gi = n(5387);
        ui = new WeakMap,
        mi = new WeakMap,
        vi = new WeakMap,
        wi = new WeakMap,
        bi = new WeakMap,
        ki = new WeakMap;
        const xi = class {
            constructor(t, e, n, s, o, a, r, h, l, c, d, g, f, p, u, m, v) {
                ui.set(this, void 0),
                mi.set(this, void 0),
                vi.set(this, void 0),
                wi.set(this, void 0),
                bi.set(this, void 0),
                ki.set(this, void 0),
                i.set(this, ui, t, "f"),
                i.set(this, mi, s, "f"),
                i.set(this, vi, o, "f"),
                i.set(this, wi, r, "f"),
                i.set(this, bi, h, "f"),
                i.set(this, ki, new pi(a,r,h,c,t,e,n,d,g,f,p,u,l,m), "f"),
                i.get(this, ki, "f").enable(),
                i.get(this, ui, "f").clear(),
                i.get(this, ui, "f").setPart(0, 0, 0, Part.Start, 0, TrackPartRotationAxis.YPositive, TrackPartColorId.Default, null, 0),
                i.get(this, ui, "f").generateMeshes(),
                h.setCamera(i.get(this, ki, "f").camera),
                i.get(this, ki, "f").setTestCallback(( () => {
                    i.get(this, ki, "f").disable();
                    const t = i.get(this, ki, "f").getTrackMetadata();
                    v(t, i.get(this, ui, "f").getTrackData(), ( () => {
                        i.get(this, ki, "f").enable(),
                        h.setCamera(i.get(this, ki, "f").camera)
                    }
                    ))
                }
                ))
            }
            dispose() {
                i.get(this, ki, "f").dispose(),
                i.get(this, ui, "f").clear()
            }
            update(t) {
                Gi.ip() || i.get(this, ki, "f").update(t),
                i.get(this, mi, "f").update(i.get(this, ui, "f")),
                i.get(this, vi, "f").update(t, i.get(this, bi, "f").camera, i.get(this, ui, "f").sunDirection),
                i.get(this, wi, "f").update(t, !1, i.get(this, bi, "f")),
                i.get(this, bi, "f").update(i.get(this, ui, "f").sunDirection)
            }
            static async initResources() {
                await N.initResources()
            }
        }
    }
    ,
    4512: (t, e, n) => {
        n.d(e, {
            A: () => r
        });
        var i = n(1601)
          , s = n.n(i)
          , o = n(6314)
          , a = n.n(o)()(s());
        a.push([t.id, '.editor-track-settings-ui > .background {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\tz-index: 1;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: rgba(20, 20, 30, 0.5);\n\tpointer-events: auto;\n}\n\n.editor-track-settings-ui > .container {\n\tposition: absolute;\n\tleft: calc(50% - 600px / 2);\n\ttop: 0;\n\tz-index: 2;\n\tdisplay: flex;\n\tflex-direction: column;\n\tbox-sizing: border-box;\n\twidth: 600px;\n\theight: 100%;\n\tbackground-color: var(--surface-color);\n}\n\n.editor-track-settings-ui > .container > h1 {\n\tmargin: 10px;\n\tpadding: 0;\n\tfont-weight: normal;\n\tfont-size: 38px;\n\ttext-align: center;\n\tcolor: var(--text-color);\n}\n\n.editor-track-settings-ui > .container > .content {\n\tflex-grow: 1;\n\tbackground-color: var(--surface-secondary-color);\n\toverflow-y: auto;\n\tpointer-events: auto;\n}\n\n.editor-track-settings-ui > .container > .content > .setting {\n\tmargin: 20px;\n\tpadding: 20px;\n\tbackground-color: var(--surface-color);\n\toutline: 2px solid transparent;\n\ttransition: outline 0.25s ease-in-out;\n}\n\n.editor-track-settings-ui > .container > .content > .setting.error {\n\toutline: 2px solid #e34c4c;\n}\n\n.editor-track-settings-ui > .container > .content > .setting > .title {\n\tdisplay: block;\n\tmargin: 0;\n\tpadding: 0;\n\tfont-size: 30px;\n\tcolor: var(--text-color);\n}\n.editor-track-settings-ui > .container > .content > .setting > input[type="text"] {\n\twidth: calc(100% - 20px);\n\tfont-weight: normal;\n\tfont-size: 30px;\n}\n\n.editor-track-settings-ui > .container > .content > .setting > .environment-button {\n\tdisplay: inline-block;\n\tmargin: 10px 0;\n\tpadding: 10px;\n\twidth: calc(100% / 3);\n\tcolor: var(--text-color);\n\tfont-size: 27px;\n}\n.editor-track-settings-ui > .container > .content > .setting > .environment-button.selected {\n\tbackground-color: var(--button-hover-color);\n}\n.editor-track-settings-ui > .container > .content > .setting > .environment-button > img {\n\tmargin: 0;\n\tpadding: 10px 30px;\n\twidth: calc(100% - 2 * 30px);\n\taspect-ratio: 1 / 1;\n\tpointer-events: none;\n}\n\n.editor-track-settings-ui > .container > .content > .setting > input[type="range"] {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 64px;\n\t-webkit-appearance: none;\n\tappearance: none;\n\tbackground: transparent;\n\tcursor: pointer;\n\taccent-color: var(--text-color);\n}\n.editor-track-settings-ui > .container > .content > .setting > input[type="range"]::-webkit-slider-runnable-track {\n\tbackground-color: var(--surface-tertiary-color);\n\theight: 10px;\n}\n.editor-track-settings-ui > .container > .content > .setting > input[type="range"]::-moz-range-track {\n\tbackground-color: var(--surface-tertiary-color);\n\theight: 10px;\n}\n.editor-track-settings-ui > .container > .content > .setting > input[type="range"]::-webkit-slider-thumb {\n\t-webkit-appearance: none;\n\tappearance: none;\n\tborder-radius: 0;\n\tbackground: var(--text-color);\n\twidth: 32px;\n\theight: 32px;\n\tmargin: -13px 0 0 0;\n\tborder: 4px solid var(--button-color);\n\toutline: 2px solid var(--text-color);\n}\n.editor-track-settings-ui > .container > .content > .setting > input[type="range"]::-webkit-slider-thumb:hover {\n\tborder: 4px solid var(--button-hover-color);\n}\n@media (hover: none) {\n\t.editor-track-settings-ui > .container > .content > .setting > input[type="range"]::-webkit-slider-thumb:hover {\n\t\tborder: 4px solid var(--button-color);\n\t}\n}\n.editor-track-settings-ui > .container > .content > .setting > input[type="range"]::-webkit-slider-thumb:active {\n\tborder: 4px solid var(--button-active-color);\n}\n.editor-track-settings-ui > .container > .content > .setting > input[type="range"]::-moz-range-thumb {\n\t-webkit-appearance: none;\n\tappearance: none;\n\tborder-radius: 0;\n\tbackground: var(--text-color);\n\twidth: 24px;\n\theight: 24px;\n\tborder: 4px solid var(--button-color);\n\toutline: 2px solid var(--text-color);\n}\n.editor-track-settings-ui > .container > .content > .setting > input[type="range"]::-moz-range-thumb:hover {\n\tborder: 4px solid var(--button-hover-color);\n}\n@media (hover: none) {\n\t.editor-track-settings-ui > .container > .content > .setting > input[type="range"]::-moz-range-thumb:hover {\n\t\tborder: 4px solid var(--button-color);\n\t}\n}\n.editor-track-settings-ui > .container > .content > .setting > input[type="range"]::-moz-range-thumb:active {\n\tborder: 4px solid var(--button-active-color);\n}\n\n\n.editor-track-settings-ui > .container > .button-wrapper > button {\n\tmargin: 10px;\n}\n\n.editor-track-settings-ui > .container > .button-wrapper > button:not(:first-child) {\n\tfloat: right;\n}\n', ""]);
        const r = a
    }
    ,
    5298: (t, e, n) => {
        n.d(e, {
            A: () => r
        });
        var i = n(1601)
          , s = n.n(i)
          , o = n(6314)
          , a = n.n(o)()(s());
        a.push([t.id, ".editor-height-selector-ui {\n\tposition: absolute;\n\tleft: var(--safe-area-left);\n\tbottom: 0;\n\tpointer-events: auto;\n}\n\n.editor-height-selector-ui > .buttons {\n\tdisplay: inline-block;\n\tvertical-align: bottom;\n}\n.editor-height-selector-ui > .buttons > button {\n\tdisplay: block;\n\tmargin: 0;\n\tpadding: 0;\n\tborder: none;\n\tbackground-color: var(--button-color);\n\tcursor: pointer;\n}\n.editor-height-selector-ui > .buttons > button:hover {\n\tbackground-color: var(--button-hover-color);\n}\n.editor-height-selector-ui > .buttons > button:active {\n\tbackground-color: var(--button-active-color);\n}\n@media (hover: none) {\n\t.editor-height-selector-ui > .buttons > button:hover {\n\t\tbackground-color: var(--button-color);\n\t}\n}\n\n.editor-height-selector-ui > .buttons > button > img { \n\tmargin: 0;\n\tpadding: 0 6px;\n\twidth: 20px;\n\theight: 20px;\n\tvertical-align: bottom;\n\tpointer-events: none;\n}\n.editor-height-selector-ui.touch > .buttons > button > img {\n\tpadding: 24px;\n\twidth: 40px;\n\theight: 40px;\n}\n\n.editor-height-selector-ui > p {\n\tmargin: 0;\n\tpadding: 0 10px;\n\tdisplay: inline-block;\n\tvertical-align: bottom;\n\tline-height: 40px;\n\tmin-width: 140px;\n\tfont-size: 26px;\n\ttext-align: center;\n\tbackground-color: var(--surface-transparent-color);\n\tcolor: var(--text-color);\n}\n.editor-height-selector-ui.touch > p {\n\tline-height: calc((40px + 2 * 24px) * 2);\n}\n", ""]);
        const r = a
    }
    ,
    6057: (t, e, n) => {
        n.d(e, {
            A: () => r
        });
        var i = n(1601)
          , s = n.n(i)
          , o = n(6314)
          , a = n.n(o)()(s());
        a.push([t.id, ".editor-ui {\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 100%;\n\theight: 100%;\n}\n\n.editor-ui > .safe-area-left {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: var(--safe-area-left);\n\theight: 100%;\n\tbackground-color: var(--surface-color);\n}\n\n.editor-ui > .safe-area-right {\n\tposition: absolute;\n\tright: 0;\n\ttop: 0;\n\twidth: var(--safe-area-right);\n\theight: 100%;\n\tbackground-color: var(--surface-color);\n}\n\n.editor-ui > .top {\n\tdisplay: block;\n\tmargin: 0;\n\tpadding: 0 var(--safe-area-right) 0 var(--safe-area-left);\n}\n\n.editor-ui > .top > .button-bar {\n\tdisplay: flex;\n\tmargin: 0;\n\tpadding: 0 8px;\n\theight: 68px;\n\tbackground-color: var(--surface-color);\n\twhite-space: nowrap;\n\tpointer-events: auto;\n}\n.editor-ui > .top > .button-bar > .button {\n\tmargin: 8px 0;\n\tmin-width: 0;\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n}\n\n.editor-ui > .top > .track-settings-container {\n\tdisplay: inline-block;\n\tmargin: -1px 0 0 0;\n\tpadding: 6px 7px;\n\tclip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);\n\tfont-size: 30px;\n\tcolor: var(--text-color);\n\tbackground: var(--surface-secondary-color);\n\tpointer-events: auto;\n}\n.editor-ui > .top > .track-settings-container > button {\n\ttext-align: left;\n\tmin-width: 150px;\n\tmax-width: 450px;\n\twhite-space: nowrap;\n\ttext-overflow: ellipsis;\n\toverflow: hidden;\n}\n\n.editor-ui > .side {\n\tposition: absolute;\n\ttop: 68px;\n\tright: 0;\n\tmargin: 0;\n\tpadding: 0 var(--safe-area-right) 0 0;\n\theight: calc(100% - 68px);\n\tdisplay: flex;\n\talign-items: end;\n}\n\n.editor-ui > .side > .container {\n\tdisplay: flex;\n\tflex-direction: column;\n\theight: 100%;\n\tjustify-content: space-between;\n\talign-items: end;\n}\n\n.editor-ui > .side > .container > .mini-toolbar-container {\n\tdisplay: flex;\n\tbackground-color: var(--surface-transparent-color);\n\tclip-path: polygon(0 0, 100% 0, 100% 100%, 10px 100%);\n\tpointer-events: auto;\n}\n.editor-ui > .side > .container > .mini-toolbar-container > button {\n\tmargin: 6px 0;\n\tclip-path: polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%);\n}\n.editor-ui > .side > .container > .mini-toolbar-container > button:first-of-type {\n\tmargin-left: 7px;\n}\n.editor-ui > .side > .container > .mini-toolbar-container > button:last-of-type {\n\tmargin-right: -2px;\n}\n\n.editor-ui > .side > .container > .mini-toolbar-container > .undo-container {\n\tmargin: 0;\n\tpadding: 6px 7px;\n\tclip-path: polygon(0 0, 100% 0, 100% 100%, 10px 100%);\n\tbackground: var(--surface-secondary-color);\n}\n\n.editor-ui > .side > .container > .mini-toolbar-container > .undo-container > button:first-of-type {\n\tmargin-right: 3px;\n\tclip-path: polygon(0 0, 100% 0, 100% 100%, 8px 100%);\n}\n.editor-ui > .side > .container > .mini-toolbar-container > .undo-container > button:last-of-type {\n\tmargin-left: 3px;\n\tclip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);\n}\n\n.editor-ui > .side > .side-panel {\n\theight: 100%;\n\tbackground-color: var(--surface-secondary-color);\n\tpointer-events: auto;\n}\n\n.editor-ui > .side > .side-panel > .category-panel, .editor-ui > .side > .side-panel > .part-panel, .editor-ui > .side > .side-panel > .color-panel {\n\tdisplay: inline-block;\n\tvertical-align: top;\n\tpadding: 2px 2px 0 2px;\n\theight: 100%;\n\tbox-sizing: border-box;\n\toverflow-x: hidden;\n\toverflow-y: scroll;\n\tscrollbar-width: thin;\n}\n.editor-ui > .side > .side-panel > .category-panel > button > img {\n\twidth: 96px;\n\theight: 96px;\n}\n.editor-ui > .side > .side-panel > .part-panel.hidden {\n\tdisplay: none;\n}\n.editor-ui > .side > .side-panel > .color-panel.hidden {\n\tdisplay: none;\n}\n\n.editor-ui > .side > .side-panel button {\n\tdisplay: block;\n\tmargin: 0 0 2px 0;\n\tpadding: 5px;\n\tbackground-color: var(--button-color);\n\tborder: 2px solid rgb(38, 31, 88);\n\tcursor: pointer;\n}\n.editor-ui > .side > .side-panel button:hover {\n\tbackground-color: var(--button-hover-color);\n}\n@media (hover: none) {\n\t.editor-ui > .side > .side-panel button:hover {\n\t\tbackground-color: var(--button-color);\n\t}\n}\n.editor-ui > .side > .side-panel button:active {\n\tbackground-color: var(--button-active-color);\n}\n.editor-ui > .side > .side-panel button.selected {\n\tbackground-color: var(--button-hover-color);\n\tbox-shadow: inset 0 0 5px #fff;\n\tborder: 2px solid #fff;\n}\n.editor-ui > .side > .side-panel button > img {\n\tdisplay: block;\n\tmargin: 0;\n\tpadding: 0;\n\twidth: 64px;\n\theight: 64px;\n\t-webkit-filter: drop-shadow(0 0 2px #000);\n\tfilter: drop-shadow(0 0 2px #000);\n\tpointer-events: none;\n\ttransition: opacity 0.25s ease-out;\n}\n.editor-ui > .side > .side-panel button > img.loading {\n\topacity: 0;\n\ttransition: none;\n}\n\n.editor-ui > .message {\n\tmargin: 10px 10px 10px calc(10px + var(--safe-area-left));\n\tpadding: 0;\n\tposition: absolute;\n\tfont-size: 30px;\n\tcolor: #ff9696;\n\ttext-shadow: 0 0 5px #000;\n\tpointer-events: none;\n\n\tleft: -10px;\n\topacity: 0;\n}\n.editor-ui > .message.green {\n\tcolor: #96ff96;\n}\n.editor-ui > .message.show {\n\tleft: 0;\n\topacity: 1;\n\ttransition: opacity 0.25s ease-in-out, left 0.25s ease-in-out;\n}\n.editor-ui > .message.hide {\n\tleft: 0;\n\topacity: 0;\n\ttransition: opacity 0.25s ease-in-out, left 0.25s ease-in-out;\n}\n", ""]);
        const r = a
    }
    ,
    7296: (t, e, n) => {
        n.d(e, {
            A: () => r
        });
        var i = n(1601)
          , s = n.n(i)
          , o = n(6314)
          , a = n.n(o)()(s());
        a.push([t.id, ".editor-checkpoint-order-ui {\n\tpointer-events: auto;\n}\n\n.editor-checkpoint-order-ui > .buttons {\n\tdisplay: inline-block;\n\tvertical-align: bottom;\n}\n.editor-checkpoint-order-ui > .buttons > button {\n\tdisplay: block;\n\tmargin: 0;\n\tpadding: 0;\n\tborder: none;\n\tbackground-color: var(--button-color);\n\tcursor: pointer;\n}\n.editor-checkpoint-order-ui > .buttons > button:hover {\n\tbackground-color: var(--button-hover-color);\n}\n.editor-checkpoint-order-ui > .buttons > button:active {\n\tbackground-color: var(--button-active-color);\n}\n@media (hover: none) {\n\t.editor-checkpoint-order-ui > .buttons > button:hover {\n\t\tbackground-color: var(--button-color);\n\t}\n}\n\n.editor-checkpoint-order-ui > .buttons > button > img {\n\tmargin: 0;\n\tpadding: 0 6px;\n\twidth: 20px;\n\theight: 20px;\n\tvertical-align: bottom;\n\tpointer-events: none;\n}\n.editor-checkpoint-order-ui.touch > .buttons > button > img {\n\tpadding: 24px;\n\twidth: 40px;\n\theight: 40px;\n}\n\n.editor-checkpoint-order-ui > p {\n\tmargin: 0;\n\tpadding: 0 10px;\n\tdisplay: inline-block;\n\tvertical-align: bottom;\n\tline-height: 40px;\n\tmin-width: 275px;\n\tfont-size: 26px;\n\ttext-align: center;\n\tbackground-color: var(--surface-transparent-color);\n\tcolor: var(--text-color);\n}\n.editor-checkpoint-order-ui.touch > p {\n\tline-height: calc((40px + 2 * 24px) * 2);\n}\n", ""]);
        const r = a
    }
    ,
    9242: (t, e, n) => {
        n.d(e, {
            A: () => r
        });
        var i = n(1601)
          , s = n.n(i)
          , o = n(6314)
          , a = n.n(o)()(s());
        a.push([t.id, ".editor-help-ui > .background {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\tz-index: 1;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: rgba(20, 20, 30, 0.5);\n\tpointer-events: auto;\n}\n\n.editor-help-ui > .container {\n\tposition: absolute;\n\tleft: calc(50% - 80% / 2);\n\ttop: 0;\n\tz-index: 2;\n\tdisplay: flex;\n\tflex-direction: column;\n\tbox-sizing: border-box;\n\twidth: 80%;\n\theight: 100%;\n\tbackground-color: var(--surface-color);\n}\n\n.editor-help-ui > .container > h1 {\n\tmargin: 10px;\n\tpadding: 0;\n\tfont-weight: normal;\n\tfont-size: 38px;\n\ttext-align: center;\n\tcolor: var(--text-color);\n}\n\n.editor-help-ui > .container > .content {\n\tflex-grow: 1;\n\tpadding: 40px;\n\tbackground-color: var(--surface-secondary-color);\n\toverflow-y: auto;\n\tpointer-events: auto;\n}\n\n.editor-help-ui > .container > .content > h2 {\n\tmargin: 32px 0 16px 0;\n\tpadding: 0;\n\tfont-weight: normal;\n\tfont-size: 30px;\n\tcolor: var(--text-color);\n\tborder-bottom: 2px solid var(--text-color);\n}\n.editor-help-ui > .container > .content > h2:first-of-type {\n\tmargin-top: 0;\n}\n\n.editor-help-ui > .container > .content > p {\n\tmargin: 0;\n\tpadding: 0;\n\tfont-size: 20px;\n\tcolor: var(--text-color);\n\twhite-space: pre-wrap;\n}\n\n.editor-help-ui > .container > .content > .part-images {\n\tdisplay: flex;\n\tjustify-content: space-around;\n}\n\n.editor-help-ui > .container > .content > .part-images > div {\n\tdisplay: flex;\n\tflex-direction: column;\n}\n\n.editor-help-ui > .container > .content > .part-images > div > img {\n\twidth: 128px;\n\theight: 128px;\n\tfilter: drop-shadow(0 4px 5px rgba(0, 0, 0, 0.4));\n\tpointer-events: none;\n\ttransition: opacity 0.25s ease-out;\n}\n.editor-help-ui > .container > .content > .part-images > div > img.loading {\n\topacity: 0;\n}\n\n.editor-help-ui > .container > .content > .part-images > div > span {\n\tmargin: 0;\n\tpadding: 0;\n\tfont-size: 20px;\n\tcolor: var(--text-color);\n\ttext-align: center;\n}\n\n.editor-help-ui > .container > .button-wrapper > button {\n\tmargin: 10px;\n}\n", ""]);
        const r = a
    }
}]);
