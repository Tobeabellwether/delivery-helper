var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("vant-weapp/toast/toast")), t = wx.cloud.database();

Page({
    data: {
        direction: "",
        shared_direction: "",
        date: new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日",
        date_number: new Date().getTime(),
        shared_date: new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日",
        show_direction: !1,
        show_date: !1,
        columns: [ "中->德", "德->中", "德国内" ],
        currentDate: new Date().getTime(),
        minDate: new Date().getTime(),
        formatter: function(e, t) {
            return "year" === e ? t + "年" : "month" === e ? t + "月" : t;
        },
        maxDate: new Date().getTime() + 31536e6,
        user_id: null,
        user_nickname: null,
        user_figure: null,
        remark: "",
        canIUse: wx.canIUse("button.open-type.getUserInfo")
    },
    onChange_id: function(e) {
        this.setData({
            user_id: e.detail
        });
    },
    onChange_remark: function(e) {
        this.setData({
            remark: e.detail
        });
    },
    onClick_direction: function() {
        this.setData({
            show_direction: !0
        });
    },
    onClick_date: function() {
        this.setData({
            show_date: !0
        });
    },
    onConfirm_direction: function(e) {
        var t = e.detail, a = (t.picker, t.value);
        t.index;
        this.setData({
            direction: a,
            shared_direction: a
        }), this.setData({
            show_direction: !1
        });
    },
    onClose_direction: function() {
        this.setData({
            show_direction: !1
        });
    },
    onConfirm_date: function(e) {
        var t = new Date(e.detail).getFullYear(), a = new Date(e.detail).getMonth() + 1, n = new Date(e.detail).getDate();
        this.setData({
            date: t + "年" + a + "月" + n + "日",
            shared_date: t + "年" + a + "月" + n + "日"
        }), this.setData({
            show_date: !1
        }), this.setData({
            date_number: e.detail
        });
    },
    onClose_date: function() {
        this.setData({
            show_date: !1
        });
    },
    onChange: function(t) {
        var a = t.detail, n = (a.picker, a.value), i = a.index;
        (0, e.default)("当前值：" + n + ", 当前索引：" + i);
    },
    onCancel_direction: function() {
        this.setData({
            show_direction: !1
        });
    },
    onInput: function(e) {
        this.setData({
            currentDate: e.detail
        });
    },
    onCancel_date: function() {
        this.setData({
            show_date: !1
        });
    },
    onLoad: function(e) {
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        console.log(e.userInfo);
                    }
                });
            }
        });
    },
    bindGetUserInfo: function(a) {
        "" != this.data.direction ? (console.log(a.detail.userInfo), this.setData({
            user_nickname: a.detail.userInfo.nickName
        }), this.setData({
            user_figure: a.detail.userInfo.avatarUrl
        }), t.collection("bangdai_info").add({
            data: {
                direction: this.data.direction,
                date: this.data.date,
                date_number: this.data.date_number,
                user_id: this.data.user_id,
                user_nickname: this.data.user_nickname,
                user_figure: this.data.user_figure,
                remark: this.data.remark
            },
            success: function(e) {
                console.log(e);
            },
            fail: function(e) {
                console.log(e);
            }
        }), this.setData({
            direction: "",
            date: new Date().getFullYear() + "年\n        " + (new Date().getMonth() + 1) + "月\n        " + new Date().getDate() + "日",
            date_number: new Date().getTime()
        }), (0, e.default)("创建成功，亲请分享到群里让更多人知道哦~")) : (0, e.default)("请选择类型");
    },
    onReady: function() {},
    onShow_directio: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var e = "[" + this.data.shared_direction + "]  " + this.data.shared_date;
        return "中->德" == this.data.shared_direction || "德->中" == this.data.shared_direction ? {
            title: e,
            path: "/pages/chaxun/main",
            imageUrl: "/images/Airplane.png"
        } : "德国内" == this.data.shared_direction ? {
            title: e,
            path: "/pages/chaxun/main",
            imageUrl: "/images/Car.png"
        } : void 0;
    }
});