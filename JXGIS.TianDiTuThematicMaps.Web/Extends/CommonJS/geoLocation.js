(function () {
    jxgis = typeof (jxgis) == 'undefined' ? {} : jxgis;

    var isSupport = support();
    var notSupportMessage = 'browser is not support';
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1000
    };

    function setOptions(opts) {
        dojo.mixin(options, opts);
    }

    function support() {
        return navigator.geolocation ? true : false;
    }

    function onError(error) {
        switch (error.code) {
            case 1:
                return {
                    error: error,
                    code: 1,
                    message: '位置服务被拒绝'
                };
            case 2:
                return {
                    code: 2,
                    message: '暂时获取不到位置信息'
                };
            case 3:
                return {
                    error: error,
                    code: 3,
                    message: '获取信息超时'
                };
            case 4:
                return {
                    error: error,
                    code: 4,
                    message: '未知错误'
                };
        }
    }

    function get(successFun, errorFun) {
        if (isSupport) {
            return navigator.geolocation.getCurrentPosition(successFun, function (error) {
                var er = onError(error);
                if (errorFun) {
                    errorFun(er);
                } else {
                    console.error(er.message);
                }
            }, options);
        } else {
            console.error(notSupportMessage);
        }
    }

    function watch(successFun, errorFun) {
        if (isSupport) {
            return navigator.geolocation.watchPosition(successFun, function (error) {
                var er = onError(error);
                if (errorFun) {
                    errorFun(er);
                } else {
                    console.error(er.message);
                }
            }, options);
        } else {
            console.error(notSupportMessage);
        }
    }

    function clearWatch(watchId) {
        if (isSupport) {
            navigator.geolocation.clear(watchId);
        } else {
            console.error(notSupportMessage);
        }
    }

    jxgis.geolocation = {
        isSupport: isSupport,
        setOptions: setOptions,
        get: get,
        watch: watch,
        clearWatch: clearWatch
    };
})();