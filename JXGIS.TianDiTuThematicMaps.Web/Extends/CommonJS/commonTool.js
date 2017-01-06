var commonTool = {
    urlArgs: (function () {
        var url = location.search.toLowerCase();
        var queryArgs = {};
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                queryArgs[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
            }
        }
        return queryArgs;
    })(),
    getQueryString:function (argName) {
        return CommonTool.queryString[argName.toLowerCase()];
    },
    info: {
        showError: function (msg) {
            toastr.error(msg);
        },
        showSuccess: function (msg) {
            toastr.success(msg);
        },
        showInfo: function (msg) {
            toastr.info(msg);
        },
        showWarning: function (msg) {
            toastr.warning(msg);
        }
    }
};

var jxgis = typeof (jxgis) === "undefined" ? {} : jxgis;
jxgis.com = commonTool;