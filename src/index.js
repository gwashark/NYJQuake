const int = new Map([
        ["0", 0],
        ["1", 1],
        ["2", 2],
        ["3", 3],
        ["4", 4],
        ["5-", 6],
        ["5+", 7],
        ["6-", 8],
        ["6+", 9],
        ["7", 10],
        [void 0, 0],
        ["\u2160", 1],
        ["\u2161", 2],
        ["\u2162", 3],
        ["\u2163", 4],
        ["\u2164", 5],
        ["\u2165", 6],
        ["\u2166", 7],
        ["\u2167", 8],
        ["\u2168", 9],
        ["\u2169", 10]
    ]),
    intColorList = ["#2A3342", "#2C39AA", "#2C7DAA", "#2CAA31", "#A7AA2C", "#AA7F2C", "#AA522C", "#AA2C2C", "#AA2C78", "#982CAA", "#542CAA"];
async function hexToRgb(a) {
    a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(a, c, d, e) {
        return c + c + d + d + e + e
    });
    var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
    return b ? [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)] : null
}
const color = ["match", ["get", "type"], "pWave", "#60a5cf", "#ff8481"];
let stnList = new Map,
    eewCircles = [],
    eewPoints = [];
const landColor = "#292929",
    landPaint = {
        "fill-color": "#292929"
    },
    landLinePaint = {
        "line-color": "#a8a8a8"
    },
    version = "0.2.7";

function createGeoJsonSource(a) {
    return {
        type: "geojson",
        data: "./res/" + a + ".json"
    }
}

function createFillLayer(a, b, c, d, e = !0) {
    return {
        id: a,
        source: b,
        type: "fill",
        filter: c,
        paint: d,
        layout: {
            visibility: e ? "visible" : "none"
        }
    }
}
const map = new maplibregl.Map({
        container: "map",
        projection: "mercator",
        style: {
            version: 8,
            sources: {
                world: createGeoJsonSource("world"),
                land: createGeoJsonSource("land"),
                tsu: createGeoJsonSource("tsu"),
                eqPoint: {
                    type: "geojson",
                    data: turf.point([0, 0])
                },
                eewCircles: {
                    type: "geojson",
                    data: turf.featureCollection(eewCircles)
                },
                eewPoints: {
                    type: "geojson",
                    data: turf.featureCollection(eewPoints)
                },
                jindoStn: {
                    type: "geojson",
                    data: turf.featureCollection([...stnList.values()])
                }
            },
            layers: [{
                id: "eewFillCircles",
                source: "eewCircles",
                type: "fill",
                filter: ["all", ["==", ["get", "type"], "sWave"]],
                paint: {
                    "fill-opacity": .1,
                    "fill-color": color
                },
                layout: {
                    visibility: "none"
                }
            }, {
                id: "worldFill",
                source: "world",
                type: "fill",
                paint: landPaint
            }, {
                id: "landFill",
                source: "land",
                type: "fill",
                paint: landPaint
            }, {
                id: "worldLine",
                source: "world",
                type: "line",
                paint: landLinePaint
            }, {
                id: "landLine",
                source: "land",
                type: "line",
                paint: landLinePaint
            }, {
                id: "warnLine",
                source: "land",
                type: "line",
                paint: {
                    "line-color": "#ff8481",
                    "line-width": 1
                },
                layout: {
                    visibility: "none"
                }
            }, {
                id: "tsuMajorLine",
                source: "tsu",
                type: "line",
                paint: {
                    "line-color": intColorList[10],
                    "line-width": 10,
                    "line-opacity-transition": {
                        duration: 500
                    }
                },
                layout: {
                    visibility: "none",
                    "line-join": "round"
                }
            }, {
                id: "tsuWarnLine",
                source: "tsu",
                type: "line",
                paint: {
                    "line-color": intColorList[7],
                    "line-width": 10,
                    "line-opacity-transition": {
                        duration: 500
                    }
                },
                layout: {
                    visibility: "none",
                    "line-join": "round"
                }
            }, {
                id: "tsuWatchLine",
                source: "tsu",
                type: "line",
                paint: {
                    "line-color": intColorList[4],
                    "line-width": 10,
                    "line-opacity-transition": {
                        duration: 500
                    }
                },
                layout: {
                    visibility: "none",
                    "line-join": "round"
                }
            }, {
                id: "tsuForeLine",
                source: "tsu",
                type: "line",
                paint: {
                    "line-color": intColorList[2],
                    "line-width": 10,
                    "line-opacity-transition": {
                        duration: 500
                    }
                },
                layout: {
                    visibility: "none",
                    "line-join": "round"
                }
            }, {
                id: "eqIcon",
                source: "eqPoint",
                type: "symbol",
                layout: {
                    "icon-ignore-placement": !0,
                    "icon-image": "eq",
                    "icon-size": 1,
                    visibility: "none"
                }
            }, {
                id: "jindoStnColor",
                source: "jindoStn",
                type: "circle",
                filter: ["all", ["has", "intensity"],
                    ["to-boolean", ["get", "intensity"]],
                    [">=", ["get", "intensity"], -3]
                ],
                paint: {
                    "circle-radius": ["interpolate", ["linear"],
                        ["zoom"], 1, 1, 22, 18
                    ],
                    "circle-color": ["interpolate", ["linear"],
                        ["get", "intensity"], 0, "#FFFFFF", .5, intColorList[0], 1.5, intColorList[1], 2.5, intColorList[2], 3.5, intColorList[3], 4, intColorList[4], 4.5, intColorList[6], 5, intColorList[7], 5.5, intColorList[8], 6, intColorList[9], 6.5, intColorList[10]
                    ],
                    "circle-opacity": ["interpolate", ["linear"],
                        ["get", "intensity"], -3, 0, 0, 1
                    ]
                }
            }, {
                id: "eewLineCircles",
                source: "eewCircles",
                type: "line",
                filter: ["any", ["==", ["get", "type"], "pWave"],
                    ["all", ["==", ["get", "type"], "sWave"],
                        ["==", ["get", "accuracy"], !0]
                    ]
                ],
                paint: {
                    "line-color": color,
                    "line-width": 2
                },
                layout: {
                    visibility: "none"
                }
            }, {
                id: "eewIcons",
                source: "eewPoints",
                type: "symbol",
                filter: ["all", ["has", "status"]],
                paint: {
                    "icon-opacity-transition": {
                        duration: 500
                    }
                },
                layout: {
                    "icon-ignore-placement": !0,
                    "icon-image": ["match", ["get", "status"], "level", "lev", "plum", "plum", "cancel", "cel", "eew"],
                    "icon-size": 1,
                    visibility: "none"
                }
            }]
        },
        center: [127, 34],
        zoom: 4.5,
        attributionControl: {
            compact: !1,
            customAttribution: ["NYJquake v" + version, "\uC9C0\uB3C4 \uB370\uC774\uD130: NaturalEarth geoservice JMA"]
        }
    }),
    mapload = new Promise(a => {
        map.once("load", async () => {
            await stnLoad(), a()
        })
    }),
    root = "./res/";
Promise.all([mapload, bboxLoad(), codeLoad()]).then(connect), map.once("load", async () => {
    const a = new maplibregl.Popup({
        closeButton: !1,
        closeOnClick: !1
    });
    map.resize().addControl(new maplibregl.ScaleControl, "bottom-right").on("mouseenter", "jindoStnColor", async b => {
        requestAnimationFrame(async () => {
            map.getCanvas().style.cursor = "pointer", a.setLngLat(b.lngLat).setHTML(`<table><tr><td>코드</td><td>${b.features[0].properties.code}</td></tr><tr><td>진도</td><td>${b.features[0].properties.intensity}</td></tr></table>`).addTo(map)
        })
    });
    map.on("mouseleave", "jindoStnColor", async () => {
        requestAnimationFrame(async () => {
            map.getCanvas().style.cursor = "", a.remove()
        })
    }), updateElementSize(), intColorList.forEach((a, b) => {
        const c = b - 1;
        map.addLayer({
            id: "int" + b + "Fill",
            source: "land",
            type: "fill",
            visibility: "none",
            paint: {
                "fill-color": a
            }
        }, (0 > c ? "land" : "int" + c) + "Fill")
    }), ["lev", "plum", "cel", "eew", "eq"].forEach(a => {
        map.loadImage("./img/" + a + ".webp").then(b => {
            map.addImage(a, b.data)
        })
    }), map.addControl(new maplibregl.NavigationControl, "top-right"), userLat && userLong && new maplibregl.Marker().setLngLat([userLong, userLat]).addTo(map)
});

function updateElementSize() {
    if (window.innerWidth / window.innerHeight < 9 / 16) {
        const a = window.innerWidth / 100;
        map.setPadding({
            bottom: 70 * a + 20,
            top: 10,
            left: 10,
            right: 10
        })
    } else {
        const a = .01 * Math.min(window.innerWidth, window.innerHeight);
        map.setPadding({
            bottom: 10,
            top: 10,
            left: 40 * a + 20,
            right: 10
        })
    }
}
window.addEventListener("resize", updateElementSize);
async function stnLoad() {
    return new Promise((a, b) => {
        fetch(root + "stn.json").then(a => a.json()).then(b => {
            b.forEach(a => {
                stnList.set(a.code, turf.point(a.coordinates, {
                    code: a.code,
                    intensity: null
                }))
            }), map.getSource("jindoStn").setData(turf.featureCollection([...stnList.values()])), a(!0)
        }).catch(b)
    })
}
async function stn(a) {
    const b = a.stn.map(async a => {
        const b = stnList.get(a.c);
        b !== void 0 && (b.properties.intensity = a.s, stnList.set(a.c, b))
    });
    Promise.allSettled(b).then(() => {})
}
let audios = {};
["eew", "warning", "continue", "final", "cancel", "eq", "tsunami"].forEach(async a => {
    audios[a] = new Howl({
        src: ["aud/" + a + ".mp3"]
    })
});
const params = new URLSearchParams(location.search),
    userLat = params.get("lat"),
    userLong = params.get("long"),
    sceneEew = params.get("eew"),
    sceneEq = params.get("eq"),
    timelb = document.getElementById("time");
let timeTick, offset = 0;
async function ntp(a) {
    offset = new Date - new Date(a.time), clearTimeout(timeTick), clockTick()
}

function getTime() {
    const a = new Date(new Date().getTime() - offset);
    return a
}

function getTimeText(a, b = "yyyy/MM/dd HH:mm:ss") {
    if (a == null) return null;
    if (b.includes("yyyy")) {
        const c = a.getFullYear();
        b = b.replace("yyyy", c)
    }
    if (b.includes("MM")) {
        const c = (a.getMonth() + 1 + "").padStart(2, "0");
        b = b.replace("MM", c)
    }
    if (b.includes("dd")) {
        const c = (a.getDate() + "").padStart(2, "0");
        b = b.replace("dd", c)
    }
    if (b.includes("HH")) {
        const c = (a.getHours() + "").padStart(2, "0");
        b = b.replace("HH", c)
    }
    if (b.includes("mm")) {
        const c = (a.getMinutes() + "").padStart(2, "0");
        b = b.replace("mm", c)
    }
    if (b.includes("ss")) {
        const c = (a.getSeconds() + "").padStart(2, "0");
        b = b.replace("ss", c)
    }
    return b
}
async function clockTick() {
    const a = getTime(),
        b = getTimeText(a);
    requestAnimationFrame(() => {
        timelb.innerText = b, map.getSource("jindoStn").setData(turf.featureCollection([...stnList.values()])), timeTick = setTimeout(clockTick, 1e3 - a % 1e3)
    })
}
clockTick();
const eventlist = document.getElementById("eventList");
let eewlist = {};
const codes = new Map;

function codeLoad() {
    return new Promise((a, b) => {
        fetch(root + "code.json").then(a => a.json()).then(b => {
            b.forEach(a => codes.set(a[0], a[1])), a(!0)
        }).catch(b)
    })
}
async function fillJindo(a, b) {
    console.time("fillJindo");
    let c = [];
    const d = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    let e = a.map(async a => {
        d.delete(a[0]), map.setLayoutProperty("int" + a[0] + "Fill", "visibility", "visible").setFilter("int" + a.shift() + "Fill", ["in", ["get", "id"], a.join(",")]), c.push(...a)
    });
    return await Promise.all(e), e = Array.from(d).map(async a => {
        map.setLayoutProperty("int" + a + "Fill", "visibility", "none")
    }), await Promise.all(e), map.setFilter("landFill", ["!", ["in", ["get", "id"], c.join(",")]]), null == b ? map.setLayoutProperty("warnLine", "visibility", "none").setFilter("landLine", null) : map.setLayoutProperty("warnLine", "visibility", "visible").setFilter("warnLine", ["in", ["get", "id"], b.join(",")]).setFilter("landLine", ["!", ["in", ["get", "id"], b.join(",")]]), console.timeEnd("fillJindo"), c
}
let eewBlinkTick;
const eewHideTick = 500,
    eewTick = 1e3;
async function eewBlink() {
    const a = getTime() % eewTick;
    a < eewHideTick ? requestAnimationFrame(() => {
        map.setPaintProperty("eewIcons", "icon-opacity", 1), eewBlinkTick = setTimeout(eewBlink, eewHideTick - a)
    }) : requestAnimationFrame(() => {
        map.setPaintProperty("eewIcons", "icon-opacity", 0), eewBlinkTick = setTimeout(eewBlink, eewTick - a)
    })
}
async function eewJindo() {
    let a = new Map,
        b = [];
    Object.values(eewlist).forEach(c => {
        null != c.area && Object.keys(c.area).forEach(d => {
            const e = int.get(d);
            Object.keys(c.area[d]).forEach(f => {
                const g = codes.get(f),
                    h = a.get(g);
                (null == h || h < e) && a.set(g, e), c.area[d][f] && 0 > b.indexOf(g) && b.push(g)
            })
        })
    });
    let c = new Map;
    return a.forEach((a, b) => {
        c.has(a) ? c.set(a, [...c.get(a), b]) : c.set(a, [a, b])
    }), a = null, [
        [...c.values()], b
    ]
}
async function fitJindo(a) {
    let b = [];
    a.forEach(a => {
        b.push(...a)
    });
    let c = [];
    return b.forEach(a => {
        bbox.has(a) && c.push(turf.bboxPolygon(bbox.get(a)))
    }), c
}
let eewAreas = [];
const bbox = new Map;

function bboxLoad() {
    return new Promise((a, b) => {
        fetch(root + "bbox.json").then(a => a.json()).then(b => {
            b.forEach(a => bbox.set(a[0], a[1])), a(!0)
        }).catch(b)
    })
}
async function flyToEEW() {
    if (1 > eewPoints.length) throw new Error("eew not found");
    const a = await fitJindo(eewAreas[0]),
        b = turf.bbox(turf.featureCollection([...eewPoints, ...eewCircles, ...a]));
    map.fitBounds(b, {
        maxZoom: 7,
        linear: !0
    })
}

function eewCircleStep() {
    const a = getTime();
    let b = [],
        c = [];
    const d = Object.values(eewlist);
    d.forEach(async (d, e) => {
        if (d.isCancel) return;
        const f = "normal" === d.accuracy,
            g = eewPoints[e].geometry.coordinates,
            h = (a - d.originTime) / 1e3,
            i = (d.depth ?? 0) ** 2;
        if (f) {
            const a = Math.sqrt((8 * h) ** 2 - i);
            0 < a && c.push((async () => {
                b.push(turf.circle(g, a, {
                    properties: {
                        type: "pWave"
                    }
                }))
            })())
        }
        const j = Math.sqrt((4.4 * h) ** 2 - i);
        0 < j && c.push((async () => {
            b.push(turf.circle(g, j, {
                properties: {
                    type: "sWave",
                    accuracy: f
                }
            }))
        })())
    }), Promise.allSettled(c).then(() => {
        eewCircles = b, map.getSource("eewCircles").setData(turf.featureCollection(eewCircles)), 0 < d.length && requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    eewCircleStep()
                })
            })
        })
    })
}
let eqMarker = {};
async function eew(a) {
    sceneEew && window.obsstudio.setCurrentScene(sceneEew);
    const b = new Date(a.publishTime) - getTime() + 180000;
    if (!(!1 == a.isCancel && 0 > b)) {
        if (!eewlist[a.id]) {
            async function b() {
                const c = document.getElementById(a.id + "sarrival");
                if (void 0 !== eewlist[a.id]) {
                    const d = getTime() - eewlist[a.id].originTime,
                        e = (eewlist[a.id].sarrival - d) / 1e3;
                    c.textContent = 1 > e ? "\uB3C4\uB2EC" : `${Math.floor(e/60)}:${(Math.floor(e%60)+"").padStart(2,"0")} 남음`, setTimeout(requestAnimationFrame(b), 1e3 * (e % 1))
                }
            }
            eewlist[a.id] = {}, audios.eew.play(), requestAnimationFrame(() => {
                map.setLayoutProperty("eewIcons", "visibility", "visible").setLayoutProperty("eewFillCircles", "visibility", "visible").setLayoutProperty("eewLineCircles", "visibility", "visible")
            }), void 0 !== eewBlinkTick && clearTimeout(eewBlinkTick), eewBlink(), requestAnimationFrame(async () => {
                const b = `<div id="${a.id}" class="alarm">
                <div id="${a.id}bar" class="top">
                    <span id="${a.id}title" class="title"></span>
                    <span id="${a.id}name" class="status"></span>
                </div>
                <div class="middle">
                    <div class="center">
                        <span id="${a.id}time" class="occ"></span>
                        <span id="${a.id}location" class="loc"></span>
                        <div id="${a.id}hypo" class="hypo">
                            <span id="${a.id}magnitude" class="mag"></span>
                            <span id="${a.id}depth" class="dep"></span>
                        </div>
                    </div>
                    <div id="${a.id}intensityBg" class="intensity">
                        <span class="maxIntLb">최대진도</span>
                        <span id="${a.id}intensity" class="maxInt"></span>
                    </div>
                </div>
                <div class="bottom">
                    <span id="${a.id}info" class="cmt"></span>
                    ${null!=userLat&&null!=userLong?`<div class="arrive">
                            <span id="${a.id}sarrival" class="left"></span>
                            <span id="${a.id}distance" class="dist"></span>
                        </div>`:""}
                </div>
            </div>`;
                eventlist.insertAdjacentHTML("afterbegin", b)
            }), userLat && userLong && requestAnimationFrame(b), eewPoints.push(turf.point([a.long, a.lat], {
                status: a.accuracy
            }, {
                id: a.id
            })), map.getSource("eewPoints").setData(turf.featureCollection(eewPoints)), 2 > Object.keys(eewlist).length && eewCircleStep()
        } else {
            audios.continue.play();
            let b = eewPoints.find(b => b.id === a.id);
            b.geometry.coordinates = [a.long ?? 0, a.lat ?? 0], b.properties.status = a.isCancel ? "cancel" : a.accuracy, map.getSource("eewPoints").setData(turf.featureCollection(eewPoints))
        }
        if (eewlist[a.id].isCancel = a.isCancel, eewlist[a.id].endtick && clearInterval(eewlist[a.id].endtick), eewlist[a.id].endtick = setTimeout(() => {
                requestAnimationFrame(() => {
                    const b = document.getElementById(a.id);
                    b.parentNode.removeChild(b);
                    const c = eewPoints.findIndex(b => b.id === a.id);
                    0 <= c && eewPoints.splice(c, 1), map.getSource("eewPoints").setData(turf.featureCollection(eewPoints)), null != eewlist[a.id].area && eewJindo().then(a => {
                        fillJindo(...a)
                    }), delete eewlist[a.id], 1 > Object.keys(eewlist).length ? (clearTimeout(eewBlinkTick), requestAnimationFrame(() => {
                        map.setLayoutProperty("eewIcons", "visibility", "visible").setLayoutProperty("eewFillCircles", "visibility", "visible").setLayoutProperty("eewLineCircles", "visibility", "visible"), eq(oldEq)
                    })) : requestAnimationFrame(flyToEEW)
                })
            }, a.isCancel ? 30000 : b), a.isCancel) audios.cancel.play(), requestAnimationFrame(async () => {
            const b = document.getElementById(a.id + "bar"),
                c = document.getElementById(a.id + "name"),
                d = document.getElementById(a.id + "info");
            c.innerText = "\uCDE8\uC18C", d.innerText = "\uC774\uBC88 \uC9C0\uC9C4\uC18D\uBCF4\uB294 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.", b.style.backgroundColor = "rgba(30, 151, 95, 0.5)"
        });
        else {
            if (eewlist[a.id].depth = a.depth, userLat && userLong) {
                const b = 1e3 * turf.distance([userLong, userLat], [a.long, a.lat]),
                    c = 1e3 * (a.depth ?? 10);
                eewlist[a.id].distance = b, eewlist[a.id].sarrival = Math.sqrt(b ** 2 + c ** 2) / 4.4
            }
            a.isWarn && !eewlist[a.id].isWarn && audios.warning.play(), a.isFinal && audios.final.play(), eewlist[a.id].accuracy = a.accuracy ?? "normal", eewlist[a.id].isWarn = a.isWarn;
            const b = new Date(a.originTime);
            eewlist[a.id].originTime = b, requestAnimationFrame(async () => {
                const c = document.getElementById(a.id + "name"),
                    d = document.getElementById(a.id + "info");
                map.setLayoutProperty("eqIcon", "visibility", "none"), document.getElementById(a.id + "title").innerText = a.title, d.innerText = a.comment ?? "", "level" === a.accuracy ? d.innerText = "\uC774\uBC88 \uC9C0\uC9C4\uC18D\uBCF4\uB294 \uC21C\uAC04\uC801\uC778 \uAC15\uD55C \uD754\uB4E4\uB9BC\uC73C\uB85C \uC778\uD574 \uBC1C\uD45C\uB418\uC5C8\uC2B5\uB2C8\uB2E4." : "plum" === a.accuracy && (d.innerText = "\uC774\uBC88 \uC9C0\uC9C4\uC18D\uBCF4\uB294 \uD754\uB4E4\uB9BC\uC744 \uAD00\uCE21\uD558\uB294 \uBC29\uBC95\uC73C\uB85C \uBC1C\uD45C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
                const e = document.getElementById(a.id + "bar");
                a.isWarn ? (c.innerText = "\uACBD\uBCF4", d.innerText += "\uAC15\uD55C \uD754\uB4E4\uB9BC\uC5D0 \uACBD\uACC4\uD558\uC138\uC694.", e.style.backgroundColor = "rgba(151, 30, 30, 0.5)") : (c.innerText = "\uC608\uBCF4", d.innerText += "\uC55E\uC73C\uB85C\uC758 \uC815\uBCF4\uC5D0 \uC720\uC758\uD558\uC138\uC694.", e.style.backgroundColor = "rgba(151, 99, 30, 0.5)"), c.innerText += a.isFinal ? "\uCD5C\uC885" : a.serial;
                const f = getTimeText(b, `dd일 HH:mm${0==b.getSeconds()?"\uBD84\uACBD":":ss\uCD08\uACBD"}`);
                document.getElementById(a.id + "time").innerText = f, document.getElementById(a.id + "location").innerText = a.location;
                const g = document.getElementById(a.id + "magnitude"),
                    h = null != a.magnitude;
                h ? (g.style.display = "initial", g.innerText = "M" + a.magnitude.toFixed(1)) : g.style.display = "none";
                const i = null != a.depth,
                    j = null != a.depthCondition,
                    k = i || j,
                    l = document.getElementById(a.id + "depth");
                k ? (l.style.display = "initial", l.innerText = j ? a.depthCondition : a.depth + "km") : l.style.display = "none";
                const m = document.getElementById(a.id + "hypo");
                m.style.display = h || k ? "flex" : "none";
                const n = document.getElementById(a.id + "intensityBg"),
                    o = document.getElementById(a.id + "intensity");
                o.innerText = a.intensity ?? "?", hexToRgb(intColorList[int.get(a.intensity)]).then(async a => {
                    n.style.backgroundColor = `rgba(${a.join(",")}, 0.5)`
                }), null != eewlist[a.id].distance && (document.getElementById(a.id + "distance").innerText = "\uAC70\uB9AC " + (0 | eewlist[a.id].distance / 1e3) + "km"), eewlist[a.id].area = a.area, eewAreas = await eewJindo(), fillJindo(...eewAreas), requestAnimationFrame(flyToEEW)
            })
        }
    }
}
let oldEq, lasttime;
async function eq(a) {
    const b = new Date(a.publishTime);
    lasttime < b && (sceneEq && window.obsstudio.setCurrentScene(sceneEq), audios.eq.play()), lasttime = b;
    let c = "";
    if (a.originTime) {
        const b = new Date(a.originTime);
        c = getTimeText(b, `dd일 HH:mm${0==b.getSeconds()?"\uBD84\uACBD":":ss\uCD08\uACBD"}`)
    }
    requestAnimationFrame(async () => {
        document.querySelectorAll("#eq").forEach(a => {
            a.parentNode.removeChild(a)
        });
        const b = null != a.magnitudeCondition,
            d = b || null != a.magnitude,
            e = null != a.depthCondition,
            f = e || null != a.depth,
            g = `<div id="eq" class="alarm">
      <div class="top">
        <span class="title">${a.title}</span>
      </div>
      <div class="middle">
        <div class="center">
            <span class="occ">${c}</span>
            <span class="loc">${a.location??"\uC9C4\uC6D0 \uD655\uC778\uC911"}</span>
            ${d||f?`<div class="hypo">
                ${d?`<span class="mag">${b?a.magnitudeCondition:"M"+a.magnitude.toFixed(1)}</span>`:""}
                ${f?`<span class="dep">깊이 ${e?a.depthCondition:a.depth+"km"}</span>`:""}
            </div>`:""}
        </div>
        <div class="intensity" style="background-color: rgba(${await hexToRgb(intColorList[int.get(a.intensity)]).then(async a=>a.join(","))}, 0.5);">
          <span class="maxIntLb">최대진도</span>
          <span class="maxInt">${a.intensity??"?"}</span>
        </div>
      </div>
      ${null==a.comment?"":`<div class="bottom">
        <span class="cmt">${a.comment}</span>
        </div>`}
    </div>`;
        eventlist.insertAdjacentHTML("afterbegin", g);
        const h = [a.long ?? 0, a.lat ?? 0];
        eqMarker = turf.point(h), map.getSource("eqPoint").setData(eqMarker);
        const i = null != a.lat && null != a.long;
        let j = [];
        if (Object.keys(a.area ?? []).forEach(b => {
                let c = [int.get(b)];
                a.area[b].forEach(a => {
                    c.push(codes.get(a))
                }), j.push(c)
            }), fillJindo(j), null != a.area) {
            let a = await fitJindo(j);
            i && a.push(eqMarker);
            let b = turf.featureCollection(a);
            const c = turf.bbox(b);
            b.features.push(turf.bboxPolygon(c)), map.fitBounds(c, {
                maxZoom: 7,
                linear: !0
            })
        } else i && map.easeTo({
            center: h,
            zoom: 5
        });
        i ? map.setLayoutProperty("eqIcon", "visibility", "visible") : map.setLayoutProperty("eqIcon", "visibility", "none")
    }), oldEq = a
}
let tsuBlinkTick;
const tsuHideTick = 2500,
    tsuTick = 3e3;
async function tsuBlink() {
    const a = getTime() % tsuTick;
    a < tsuHideTick ? requestAnimationFrame(() => {
        map.setPaintProperty("tsuMajorLine", "line-opacity", 1).setPaintProperty("tsuWarnLine", "line-opacity", 1).setPaintProperty("tsuWatchLine", "line-opacity", 1).setPaintProperty("tsuForeLine", "line-opacity", 1), tsuBlinkTick = setTimeout(tsuBlink, tsuHideTick - a)
    }) : requestAnimationFrame(() => {
        map.setPaintProperty("tsuMajorLine", "line-opacity", 0).setPaintProperty("tsuWarnLine", "line-opacity", 0).setPaintProperty("tsuWatchLine", "line-opacity", 0).setPaintProperty("tsuForeLine", "line-opacity", 0), tsuBlinkTick = setTimeout(tsuBlink, tsuTick - a)
    })
}

function setTsuArea(a, b) {
    if (0 < a.length) {
        let c = [],
            d = [];
        for (let b of a)
            if (b = "t" + b, codes.has(b)) {
                const a = codes.get(b);
                c.push(a), d.push(turf.bboxPolygon(bbox.get(a)))
            } return map.setLayoutProperty("tsu" + b + "Line", "visibility", "visible").setFilter("tsu" + b + "Line", ["in", ["get", "name"], c.join(",")]), turf.bboxPolygon(turf.bbox(turf.featureCollection(d)))
    }
    map.setLayoutProperty("tsu" + b + "Line", "visibility", "none")
}
let tsuTimeout;
async function tsu(a) {
    tsuBlinkTick !== void 0 && clearTimeout(tsuBlinkTick), tsuTimeout !== void 0 && clearTimeout(tsuTimeout), !0 !== a.isCancel && audios.tsunami.play(), requestAnimationFrame(() => {
        tsuBlink();
        let b = [];
        const c = setTsuArea(Object.keys(a.major ?? {}), "Major");
        c && b.push(c);
        const d = setTsuArea(Object.keys(a.warning ?? {}), "Warn");
        d && b.push(d);
        const e = setTsuArea(Object.keys(a.watch ?? {}), "Watch");
        e && b.push(e);
        const f = setTsuArea(Object.keys(a.forecast ?? {}), "Fore");
        f && b.push(f), map.fitBounds(turf.bbox(turf.featureCollection(b)))
    }), tsuTimeout = setTimeout(() => {
        clearTimeout(tsuBlink), requestAnimationFrame(() => {
            map.setLayoutProperty("tsuMajorLine", "visibility", "none").setLayoutProperty("tsuWarnLine", "visibility", "none").setLayoutProperty("tsuWatchLine", "visibility", "none").setLayoutProperty("tsuForeLine", "visibility", "none")
        })
    }, 86400000)
}
let ws;
async function connect() {
    ws = new WebSocket(window.location.origin.replace(/^http/, "ws") + "/.proxy"), console.log("\uC5F0\uACB0\uC911..");
    let a;
    ws.onopen = async () => {
        console.log("\uC5F0\uACB0\uB428!"), timelb.style.color = "#ffffff";
        const b = JSON.stringify({
            type: "connect",
            name: "NYJquake",
            version,
            kinds: ["stn", "eew", "eq", "tsu", "ntp", "nyjquake"]
        });
        ws.send(b);
        const c = JSON.stringify({
            type: "get",
            kind: "eqlist"
        });
        ws.send(c), a = setInterval(() => {
            console.time("Ping"), pingTime = new Date, ws.send(JSON.stringify({
                type: "ping"
            }))
        }, 180000)
    }, ws.onmessage = async a => {
        try {
            // Handle Blob data by converting to text first
            const messageData = a.data instanceof Blob 
                ? await a.data.text() 
                : a.data;
            switch (a = JSON.parse(messageData), a.type) {
                case "success":
                    console.log(a.message);
                    break;
                case "error":
                    console.error(a.message);
                    break;
                case "pong":
                    console.timeEnd("Ping");
                    break;
                case "data":
                    switch (a.kind) {
                        case "stn":
                            stn(a);
                            break;
                        case "eew":
                            eew(a);
                            break;
                        case "eq":
                            eq(a);
                            break;
                        case "tsu":
                            tsu(a);
                            break;
                        case "eqlist":
                            eq(a.data[0]);
                            break;
                        case "ntp":
                            ntp(a);
                            break;
                        case "nyjquake":
                            location.reload(!0);
                    }
            }
        } catch (a) {
            return void console.error(a)
        }
    }, ws.onclose = async () => {
        console.log("\uC5F0\uACB0 \uC885\uB8CC."), timelb.style.color = "#ff8481", a !== void 0 && clearInterval(a), setTimeout(async () => {
            connect()
        }, 1e3)
    }, ws.onerror = async a => {
        console.error(a), Socket.close()
    }
}
