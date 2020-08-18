// 节流(time)
// 解读：使用时间戳，当触发事件的时候 我们获取到当前的时间，然后减去之前的时间（一般初始化为0），如果差值大于设置的时间，那么就执行func函数 并且重置之前的时间为当前时间
// 会立即执行，停止触发后没办法再执行
function throttleDate(func, wait) {
    var context, args;
    var previous = 0;
    return function () {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    };
}

// 使用定时器
// 不会立即执行，停止触发后还会再执行一次事件
function throttleTimer(func, wait) {
    var context, args;
    var timeout;
    return function () {
        args = arguments;
        context = this;
        // 如果timeout不存在 那么就定义个定时器 到期执行
        if (!timeout) {
            timeout = setTimeout(() => {
                // 执行func函数并且将timeout标记置空
                timeout = null;
                func.apply(context, args);
            }, wait);
        }
    };
}

function throttle(func, wait) {
    var timeout, context, args;
    var previous = 0;

    var later = function () {
        previous = +new Date();
        timeout = null;
        func.apply(context, args);
    };

    var throttled = function () {
        var now = +new Date();
        // 距离下次执行的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
    };
    return throttled;
}
