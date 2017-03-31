// 常用变量
const _const_ = {
    atv: 'active',
    tgt: 'target',
    ept: ''
}

// 为类型扩展功能
function __extend__(dest) {
    var i, j, len, src;
    for (j = 1, len = arguments.length; j < len; j++) {
        src = arguments[j];
        for (i in src) {
            dest[i] = src[i];
        }
    }
    return dest;
}

// 事件机制对象
var __events__ = {
    on: function (types, fn, context) {
        var isArray = is.array(types);
        var isString = is.string(types);

        if (isArray || isString) {
            types = isString ? types.replace(/^\s+|\s+$/g, '').split(/\s+/) : types;
            for (var i = 0, len = types.length; i < len; i++) {
                this._on(types[i], fn, context);
            }
        } else {
            for (var type in types) {
                this._on(type, types[type], fn);
            }
        }
        return this;
    },
    off: function (types, fn, context) {
        if (!types) {
            delete this._events;
        } else if (typeof types === 'object') {
            for (var type in types) {
                this._off(type, types[type], fn);
            }
        } else {
            types = types.replace(/^\s+|\s+$/g, '').split(/\s+/);
            for (var i = 0, len = types.length; i < len; i++) {
                this._off(types[i], fn, context);
            }
        }
        return this;
    },
    _on: function (type, fn, context) {
        this._events = this._events || {};
        var typeListeners = this._events[type];
        if (!typeListeners) {
            typeListeners = {
                listeners: [],
                count: 0
            };
            this._events[type] = typeListeners;
        }
        if (context === this) {
            context = undefined;
        }
        var newListener = { fn: fn, ctx: context },
            listeners = typeListeners.listeners;
        for (var i = 0, len = listeners.length; i < len; i++) {
            if (listeners[i].fn === fn && listeners[i].ctx === context) {
                return;
            }
        }
        listeners.push(newListener);
        typeListeners.count++;
    },
    _off: function (type, fn, context) {
        var typeListeners,
            listeners,
            i,
            len;

        if (!this._events) { return; }
        typeListeners = this._events[type];
        if (!typeListeners) {
            return;
        }
        listeners = typeListeners.listeners;
        if (!fn) {
            for (i = 0, len = listeners.length; i < len; i++) {
                listeners[i].fn = L.Util.falseFn;
            }
            delete this._events[type];
            return;
        }
        if (context === this) {
            context = undefined;
        }
        if (listeners) {
            for (i = 0, len = listeners.length; i < len; i++) {
                var l = listeners[i];
                if (l.ctx !== context) { continue; }
                if (l.fn === fn) {
                    l.fn = function () { return false };
                    typeListeners.count--;

                    if (this._isFiring) {
                        listeners = listeners.slice();
                    }
                    listeners.splice(i, 1);
                    return;
                }
            }
        }
    },
    fire: function (type, data) {
        if (!this.listens(type)) { return this; }
        var event = { data: data, type: type, target: this };
        if (this._events) {
            var typeListeners = this._events[type];
            if (typeListeners) {
                this._isFiring = true;
                var listeners = typeListeners.listeners;
                for (var i = 0, len = listeners.length; i < len; i++) {
                    var l = listeners[i];
                    l.fn.call(l.ctx || this, event);
                }
                this._isFiring = false;
            }
        }
        return this;
    },
    listens: function (type) {
        var typeListeners = this._events && this._events[type];
        if (typeListeners && typeListeners.count) { return true; }
        return false;
    },
    once: function (types, fn, context) {
        if (typeof types === 'object') {
            for (var type in types) {
                this.once(type, types[type], fn);
            }
            return this;
        }
        var handler = function () {
            this
                .off(types, fn, context)
                .off(types, handler, context);
        }.bind(this);

        return this
            .on(types, fn, context)
            .on(types, handler, context);
    }
};

var __Events__ = function () { };
__extend__(__Events__.prototype, __events__);

/* 
React.Component 注册事件机制的方法
__extend__(React.Component.prototype, __events__);
*/

React && React.Component && React.Component.prototype && __extend__(React.Component.prototype, __events__);

/* 
其他类型添加事件机制
class A extends __Events__ {
    constructor() {
        super();
        this.age = 18;
        this.name = "chentao";
    }

    onClick() {
        this.fire('onClick', this);
    }
}

var a = new A();
a.on('onClick', function (e) { console.log(e); });
*/


// React 扩展方法
__ReactExtends__ = {
    // 函数绑定作用域
    _funsBind: function (funNames) {
        for (var i = 0, l = funNames.length; i < l ; i++) {
            var funName = funNames[i];
            if (this[funName]) {
                this[funName] = this[funName].bind(this);
            }
        }
    },
    // 获取更新函数
    _getUpdateStateFun: function (state) {
        return function (prevState, props) {
            return state;
        };
    },
    // 根据表达式返回常量 active 或者 空字符串
    _getClass: function (express) {
        if (typeof (express) === 'function') {
            return !!express() ? _const_.atv : _const_.ept;
        }
        else {
            return !!express ? _const_.atv : _const_.ept;
        }
    }
};

React && React.Component && React.Component.prototype && __extend__(React.Component.prototype, __ReactExtends__);

