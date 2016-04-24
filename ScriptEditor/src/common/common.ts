export interface Point {
    x: number;
    y: number;
}

declare var Symbol: any;
export function identity(target: any, propertyKey: string): any {
    const key = Symbol("identity." + propertyKey);
    var idCounter = 0;
    return {
        get: function () {
            return this[key] || (this[key] = ++idCounter);
        }
    };
}

const watcherRegisterKey = Symbol("watchable");
export interface Watcher { (args: any): void }
export interface IWatchable {
    watch: (propertyKey: string, watcher: Watcher) => (() => void);
}
export function watchable(target: Function): any {
    function ctor(...args: any[]) {
        var watchers: { [key: string]: Watcher[] } = {};
        this[watcherRegisterKey] = (propertyKey: string) => {
            return watchers[propertyKey] || (watchers[propertyKey] = []);
        };
        this.watch = (propertyKey: string, watcher: Watcher) => {
            var propWatchers = watchers[propertyKey] || (watchers[propertyKey] = []);
            propWatchers.push(watcher);
            var removed = false;
            return () => {
                if (!removed) {
                    removed = true;
                    var ix = propWatchers.indexOf(watcher);
                    if (ix != -1)
                        propWatchers.splice(ix, 1);
                }
            }
        };
        target.bind(this)(...args);
    }
    ctor.prototype = target.prototype;
    return ctor;
}
export function watch(target: any, propertyKey: string): any {
    const valueKey = Symbol("watch." + propertyKey);
    return {
        get: function () {
            return this[valueKey];
        },
        set: function (value: any) {
            if (this[valueKey] !== value) {
                this[valueKey] = value;
                var watchers: Watcher[] = this[watcherRegisterKey](propertyKey);
                watchers.forEach(w => w(value));
            }
        }
    };
}