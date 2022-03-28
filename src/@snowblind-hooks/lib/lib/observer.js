const isProxy = Symbol("");
class Observer {
    constructor(value, callback = () => { }) {
        const _Handler = {
            get(target, key) {
                if (key === isProxy)
                    return true;
                const prop = target[key];
                if (typeof prop == 'undefined') {
                    return;
                }
                if (prop !== null) {
                    var constructor = prop.constructor;
                    if (!prop[isProxy] && constructor && ((constructor === ({}).constructor) || (constructor === ([]).constructor))) {
                        target[key] = new Proxy(prop, _Handler);
                    }
                }
                return target[key];
            },
            set: (x, y, z) => {
                x[y] = z;
                if (this.boundRender) {
                    if (this.debounce) {
                        window.cancelAnimationFrame(this.debounce);
                    }
                    this.debounce = window.requestAnimationFrame(() => {
                        this.boundRender.Render();
                    });
                }
                callback(x, y, z);
                return true;
            }
        };
        this._value = new Proxy(value, _Handler);
    }
}
export { Observer };
//# sourceMappingURL=observer.js.map
