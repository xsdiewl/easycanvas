(function t(e, s) {
    if (typeof exports === "object" && typeof module === "object") module.exports = s(); else if (typeof define === "function" && define.amd) define([], s); else {
        var a = s();
        for (var i in a) (typeof exports === "object" ? exports : e)[i] = a[i];
    }
})(this, function() {
    return function(t) {
        var e = {};
        function s(a) {
            if (e[a]) return e[a].exports;
            var i = e[a] = {
                exports: {},
                id: a,
                loaded: false
            };
            t[a].call(i.exports, i, i.exports, s);
            i.loaded = true;
            return i.exports;
        }
        s.m = t;
        s.c = e;
        s.p = "";
        return s(0);
    }({
        0: function(t, e, s) {
            t.exports = s(89);
        },
        89: function(t, e) {
            "use strict";
            var s = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJkSURBVHjaxJeJbusgEEW94S1L//83X18M2MSuLd2pbqc4wZGqRLrKBsyZhQHny7Jk73xVL8xpVhWrcmiB5lX+6GJ5YgQ2owbAm8oIwH1VgKZUmGcRqKGGPgtEQQAzGR8hQ59fAmhJHSAagigJ4E7GPWRXOYC6owAd1JM6wDQPADyMWUqZRMqmAojHp1Vn6EQQEgUNMJLnUjMyJsM49wygBkAPw9dVFwXRkncCIIW3GRgoTQUZn6HxCMAFEFd8TwEQ78X4rHbILoAUmeT+RFG4UhQ6MiIAE4W/UsYFjuVjAIa2nIY4q1R0GFtQWG3E84lqw2GO2QOoCKBVu0BAPgDSU0eUDjjQenNkV/AW/pWChhpMTelo1a64AOKM30vk18GzTHXCNtI/Knz3DFBgsUqBGIjTInXRY1yA9xkVoqW5tVq3pDR9A0hfF5BSARmVnh7RMDCaIdcNgbPBkgzn1Bu+SfIEFSpSBmkxyrMicb0fAEuCZrWnN89veA/4XcakrPcjBWzkTuLjlbfTQPOlBhz+HwkqqPXmPQDdrQItxE1moGof1S74j/8txk8EHhTQrAE8qlwfqS5yukm1x/rAJ9Jiaa6nyATqD78aUVBhFo8b1V4DdTXdCW+IxA1zB4JhiOhZMEWO1HqnvdoHZ4FAMIhV9REF8FiUm0jsYPEJx/Fm/N8OhH90HI9YRHesWbXXZwAShU8qThe7H8YAuJmw5yOd989uRINKRTJAhoF8jbqrHKfeCYdIISZfSq26bk/K+yO3YvfKrVgiwQBHnwt8ynPB25+M8hceTt/ybPhnryJ78+tLgAEAuCFyiQgQB30AAAAASUVORK5CYII=";
            var a = new Image();
            a.src = s;
            var i;
            var r = {
                drip: function t(e, s, r) {
                    var l = e.subtype || 1;
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.globalCompositeOperation = "source-over";
                    s.globalAlpha = 1;
                    l === 1 && s.drawImage(a, (this.style.tw >> 1) - (this.style.tw >> 1) * e.progress * 2, (this.style.th >> 1) - (this.style.th >> 1) * e.progress * 2, this.style.tw * e.progress * 2, this.style.th * e.progress * 2);
                    l !== 1 && s.drawImage(a, (this.style.tw >> 1) - (this.style.tw >> 1) * (1 - e.progress) * 2, (this.style.th >> 1) - (this.style.th >> 1) * (1 - e.progress) * 2, this.style.tw * (1 - e.progress) * 2, this.style.th * (1 - e.progress) * 2);
                    s.globalCompositeOperation = l === 1 ? "source-out" : "source-in";
                    s.globalAlpha = Math.max(1 - e.progress, 0);
                    s.drawImage(i.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
                },
                door: function t(e, s, a) {
                    var r = e.subtype || 1;
                    var l = 0, h = 0;
                    if (r === 1) {
                        l = this.style.tw / 2;
                    } else if (r === 2) {
                        l = this.style.tw;
                        h = this.style.th / 2;
                    } else if (r === 3) {
                        l = this.style.tw / 2;
                        h = this.style.th;
                    } else if (r === 4) {
                        h = this.style.th / 2;
                    }
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.save();
                    s.translate(l, h);
                    s.rotate((r < 3 ? 1 : -1) * 90 * 3.14 / 180 * e.progress);
                    s.translate(-l, -h);
                    s.drawImage(i.funcOrValue(this.$fade.originImg, this), 0, 0, l || this.style.tw, this.style.th - h || h, 0, 0, l || this.style.tw, this.style.th - h || h);
                    s.restore();
                    s.save();
                    s.translate(l, h);
                    s.rotate((r < 3 ? -1 : 1) * 90 * 3.14 / 180 * e.progress);
                    s.translate(-l, -h);
                    s.drawImage(i.funcOrValue(this.$fade.originImg, this), r < 4 ? this.style.tw - l : 0, r < 3 ? h : r < 4 ? 0 : h, this.style.tw - l || l, this.style.th - h || h, r < 4 ? this.style.tw - l : 0, r < 3 ? h : r < 4 ? 0 : h, this.style.tw - l || l, this.style.th - h || h);
                    s.restore();
                },
                rotate: function t(e, s, a) {
                    var r = e.subtype || 1;
                    var l = 0, h = 0;
                    if (r === 1) {
                        l = this.style.tw;
                    } else if (r === 2) {
                        l = this.style.tw;
                        h = this.style.th;
                    } else if (r === 3) {
                        h = this.style.th;
                    }
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.save();
                    s.translate(l, h);
                    s.rotate(90 * 3.14 / 180 * e.progress);
                    s.translate(-l, -h);
                    s.drawImage(i.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
                    s.restore();
                },
                print: function t(e, s, a) {
                    s.drawImage(i.funcOrValue(this.$fade.originImg, this), 0, 0);
                    var r = e.subtype || 1;
                    r === 1 && s.clearRect(0, 0, this.style.tw, e.progress * this.style.th);
                    r === 2 && s.clearRect(0, 0, e.progress * this.style.tw, this.style.th);
                    r === 3 && s.clearRect(0, (1 - e.progress) * this.style.th, this.style.tw, this.style.th);
                    r === 4 && s.clearRect((1 - e.progress) * this.style.tw, 0, this.style.tw, this.style.th);
                },
                switch: function t(e, s, a) {
                    var r = e.progress * 1.3;
                    if (r === 0) {
                        a.fillStyle = "rgba(0, 0, 0, 1)";
                        a.globalAlpha = .2;
                    }
                    var l = e.subtype || 1;
                    l === 1 && a.fillRect(0, 0, this.style.tw, r * this.style.th);
                    l === 2 && a.fillRect(0, 0, r * this.style.tw, this.style.th);
                    l === 3 && a.fillRect(0, (1 - r) * this.style.th, this.style.tw, this.style.th);
                    l === 4 && a.fillRect((1 - r) * this.style.tw, 0, this.style.tw, this.style.th);
                    s.globalCompositeOperation = "source-over";
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.drawImage(a.$canvas, 0, 0);
                    s.globalCompositeOperation = "source-out";
                    s.drawImage(i.funcOrValue(this.$fade.originImg, this), 0, 0);
                },
                sweep: function t(e, s, r) {
                    if (!e.particleData.length) {
                        var l = e.subtype || 1;
                        var h = this.style.th / this.style.tw;
                        for (var o = 0; o < this.style.tw / 50; o++) {
                            l === 1 && e.particleData.push({
                                x: 50 * o + Math.random() * this.style.tw / 5 / 2 - this.style.tw / 5,
                                y: 50 * h * o + Math.random() * this.style.th / 5 / 2 - this.style.th / 5,
                                size: 100 - o
                            });
                            l === 2 && e.particleData.push({
                                x: this.style.tw - (50 * o + Math.random() * this.style.tw / 5 / 2 - this.style.tw / 5),
                                y: 50 * h * o + Math.random() * this.style.th / 5 / 2 - this.style.th / 5,
                                size: 100 - o
                            });
                            l === 3 && e.particleData.push({
                                x: this.style.tw / 2,
                                y: 50 * h * o + Math.random() * this.style.th / 5 / 2 - this.style.th / 5,
                                size: 100 - o
                            });
                            l === 4 && e.particleData.push({
                                x: 50 * h * o + Math.random() * this.style.tw / 5 / 2 - this.style.tw / 5,
                                y: this.style.th / 2,
                                size: 100 - o
                            });
                        }
                    }
                    r.fillStyle = "rgba(0, 0, 0, 0.005)";
                    r.fillRect(0, 0, this.style.tw, this.style.th);
                    r.globalAlpha = e.progress * e.progress;
                    e.particleData.forEach(function(t, s) {
                        if (t.size > e.size + e.minsize) return;
                        r.drawImage(a, t.x - t.size / 2, t.y - t.size / 2, t.size, t.size);
                        t.size = e.progress * e.size * 1.3;
                    });
                    s.globalCompositeOperation = "source-over";
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.drawImage(r.$canvas, 0, 0);
                    s.globalCompositeOperation = "source-out";
                    s.drawImage(i.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
                },
                flow: function t(e, s, r) {
                    var l = this;
                    if (!e.particleData.length) {
                        for (var h = 0; h < this.style.tw / 50; h++) {
                            e.particleData.push({
                                x: -100 + h * 50 + Math.random() * 40 - 20,
                                y: -Math.random() * 200 - 300,
                                extra: Math.random() * 20
                            });
                        }
                    }
                    r.fillStyle = "rgba(0, 0, 0, 0.01)";
                    r.fillRect(0, 0, this.style.tw, this.style.th);
                    e.particleData.forEach(function(t) {
                        r.drawImage(a, t.x, t.y, 200, 200);
                        t.y += 1 / e.ticks * l.style.th + t.extra;
                    });
                    s.globalCompositeOperation = "source-over";
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.drawImage(r.$canvas, 0, 0);
                    s.globalCompositeOperation = "source-out";
                    s.drawImage(i.funcOrValue(this.$fade.originImg, this), 0, 0, this.style.tw, this.style.th);
                },
                spiral: function t(e, s, a) {
                    var r = e.subtype || 1;
                    a.translate(this.style.tw / 2, this.style.th / 2);
                    a.rotate(360 / e.ticks * 3 * 3.14 / 180 * e.progress);
                    a.translate(-this.style.tw / 2, -this.style.th / 2);
                    a.globalAlpha = e.progress * e.progress;
                    a.fillStyle = "rgba(0, 0, 0, 1)";
                    a.fillRect(this.style.tw / 2 - e.size * e.progress / 2, this.style.th / 2 - e.size * e.progress / 2, e.size * e.progress, e.size * e.progress);
                    s.globalCompositeOperation = "source-over";
                    s.clearRect(0, 0, this.style.tw, this.style.th);
                    s.drawImage(a.$canvas, 0, 0);
                    s.globalCompositeOperation = "source-out";
                    s.drawImage(i.funcOrValue(this.$fade.originImg, this), 0, 0);
                }
            };
            var l = function t(e) {
                i = e.utils;
                e.class.sprite.prototype.fade = function(t) {
                    var e = t.type, s = t.ticks, a = t.subtype;
                    var l = this;
                    if (!l.$fade) {
                        l.$fade = {
                            originImg: l.content.img,
                            filterCanvas: document.createElement("canvas"),
                            middlewareCanvas: document.createElement("canvas")
                        };
                        l.$fade.filterCanvas.width = l.$fade.middlewareCanvas.width = l.style.tw;
                        l.$fade.filterCanvas.height = l.$fade.middlewareCanvas.height = l.style.th;
                        l.$fade.filterCxt = l.$fade.filterCanvas.getContext("2d");
                        l.$fade.middlewareCxt = l.$fade.middlewareCanvas.getContext("2d");
                        l.$fade.filterCxt.$canvas = l.$fade.filterCanvas;
                        l.$fade.middlewareCxt.$canvas = l.$fade.middlewareCanvas;
                    }
                    var h = {
                        ticks: 0,
                        progress: 0,
                        callback: false,
                        particleData: []
                    };
                    h.ticks = s || 60;
                    h.subtype = a;
                    h.size = Math.max(l.style.tw, l.style.th);
                    h.minsize = Math.min(l.style.tw, l.style.th);
                    {
                        var o = document.createElement("canvas");
                        o.width = i.funcOrValue(l.style.tw, l);
                        o.height = i.funcOrValue(l.style.th, l);
                        var n = o.getContext("2d");
                        n.drawImage(l.$canvas.$dom, l.$props.tx, l.$props.ty, l.$props.tw, l.$props.th, 0, 0, l.$props.tw, l.$props.th);
                        l.$fade.originImg = o;
                        l.children = [];
                    }
                    l.content.img = l.$fade.filterCanvas;
                    l.on("beforeTick", function t() {
                        if (!l.$fade) {
                            return;
                        }
                        r[e || "drip"].call(l, h, l.$fade.filterCxt, l.$fade.middlewareCxt);
                        if (h.progress > 1) {
                            l.off("beforeTick", t);
                            l.style.opacity = 0;
                            delete l.$fade;
                            if (h.callback) {
                                l.$canvas.nextTick(function() {
                                    h.callback.call(l);
                                });
                            }
                            return;
                        }
                        h.progress += 1 / (s || 100);
                    });
                    return {
                        then: function t(e) {
                            h.callback = e;
                        }
                    };
                };
                e.class.sprite.prototype.fade.types = [];
                for (var s in r) {
                    e.class.sprite.prototype.fade.types.push(s);
                }
            };
            t.exports = l;
        }
    });
});

