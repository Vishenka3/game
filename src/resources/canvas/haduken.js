export function haduken(canvasDiv) {
    let FPS, Hadouken, PI_2, SQRT_3, w, Trail, World, canvas, context, range, windowResizeHandler,
        __slice = [].slice;

    FPS = 30;

    PI_2 = 2 * Math.PI;

    SQRT_3 = Math.sqrt(3);

    canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvasLightning');
    canvasDiv.appendChild(canvas);

    context = document.getElementById('canvasLightning').getContext("2d");

    windowResizeHandler = function() {
        canvas.width = window.innerWidth;
        return canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", windowResizeHandler, false);

    window.onload = function() {
        return setTimeout(windowResizeHandler, 0);
    };

    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(cb) {
            return window.setTimeout(cb, 1000 / FPS);
        };
    })();

    range = function(a, b) {
        return (b - a) * Math.random() + a;
    };

    Trail = (function() {
        function Trail(x, y, r) {
            let rs, yd;
            this.opacity = 1;
            this.xOrig = x + r - 5;
            this.yOrig = y;
            this.rOrig = r;
            rs = r * 0.4;
            this.y = range(y - rs, y + rs);
            yd = Math.abs(this.y - y) / rs;
            this.x = this.xOrig - (rs * yd / SQRT_3) + range(-1, 8);
            this.ystep = range(-1, 1);
            this.xstep = range(-r / 4 * (1 - yd), 0);
            this.r = range(1, 8);
        }

        Trail.prototype.step = function() {
            if (this.opacity < 0.6) {
                this.opacity -= 0.06;
            } else {
                this.opacity -= 0.09;
            }
            if (this.opacity <= 0) {
                return false;
            }
            this.x += this.xstep;
            this.y += this.ystep;
            return true;
        };

        Trail.prototype.draw = function() {
            let r, style;
            r = this.r * this.opacity * 3;
            style = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
            if (this.opacity < 0.6) {
                style.addColorStop(0, "rgba(0,90,255," + this.opacity + ")");
                style.addColorStop(1, "rgba(0,90,255,0)");
            } else {
                style.addColorStop(0, "rgba(0,255,255,0.5)");
                style.addColorStop(1, "rgba(0,120,255,0)");
            }
            context.beginPath();
            context.arc(this.x, this.y, this.r * 2, 0, PI_2, true);
            context.fillStyle = style;
            return context.fill();
        };

        return Trail;

    })();

    Hadouken = (function() {
        function Hadouken() {
            this.x = -50;
            this.xstep = 6;
            this.r = 25;
            this.r2 = 2 * this.r;
            this.priority = 2;
        }

        Hadouken.prototype.destructor = function() {
            return w.addEntity(Hadouken);
        };

        Hadouken.prototype.step = function() {
            this.x += this.xstep;
            this.y = canvas.height / 2;
            return this.x < canvas.width && this.y < canvas.height;
        };

        Hadouken.prototype.draw = function() {
            let i, _i, _results;
            context.beginPath();
            context.arc(this.x + 3, this.y, this.r2, 0, PI_2, true);
            context.fillStyle = (function(_this) {
                return function() {
                    let g;
                    g = context.createRadialGradient(_this.x + _this.r2, _this.y, 0, _this.x + 3, _this.y, _this.r2);
                    g.addColorStop(0, "rgba(0,255,255,0.6)");
                    g.addColorStop(1, "rgba(0,0,255,0)");
                    return g;
                };
            })(this)();
            context.fill();
            context.beginPath();
            context.arc(this.x + this.r - 3 + range(-3, 3), this.y + range(-4, 4), this.r, 0, PI_2, true);
            context.fillStyle = (function(_this) {
                return function() {
                    let g;
                    g = context.createRadialGradient(_this.x + _this.r2, _this.y, 0, _this.x + _this.r, _this.y, _this.r);
                    g.addColorStop(0, "rgba(255,255,255,0.8)");
                    g.addColorStop(1, "rgba(255,255,255,0)");
                    return g;
                };
            })(this)();
            context.fill();
            _results = [];
            for (i = _i = 1; _i <= 15; i = ++_i) {
                _results.push(w.addEntity(Trail, this.x, this.y, this.r2));
            }
            return _results;
        };

        return Hadouken;

    })();

    World = (function() {
        function World() {
            this.entities = {};
            this.i = 0;
            this.loop();
        }

        World.prototype.addEntity = function() {
            let args, klass;
            klass = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
            this.entities[this.i] = (function(func, args, ctor) {
                ctor.prototype = func.prototype;
                let child = new ctor, result = func.apply(child, args);
                return Object(result) === result ? result : child;
            })(klass, args, function(){});
            return this.i++;
        };

        World.prototype.loop = function() {
            let entity, ids, k, _i, _len, _ref, _results;
            requestAnimationFrame((function(_this) {
                return function() {
                    return _this.loop();
                };
            })(this));
            context.clearRect(0, 0, canvas.width, canvas.height);
            ids = [];
            _ref = this.entities;
            for (k in _ref) {
                entity = _ref[k];
                if (entity.priority === 1) {
                    ids.push(k);
                    continue;
                }
                if (!entity.step()) {
                    delete this.entities[k];
                    continue;
                }
                entity.draw();
            }
            _results = [];
            for (_i = 0, _len = ids.length; _i < _len; _i++) {
                k = ids[_i];
                entity = this.entities[k];
                if (!entity.step()) {
                    entity.destructor();
                    delete this.entities[k];
                    continue;
                }
                _results.push(entity.draw());
            }
            return _results;
        };

        return World;

    })();

    w = new World;

    w.addEntity(Hadouken);

}