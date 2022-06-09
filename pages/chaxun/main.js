function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("vant-weapp/toast/toast")), e = a(require("vant-weapp/notify/notify")), n = wx.cloud.database();

Page({
    data: {
        not_confirm: !0,
        allData: [],
        show_user: !1,
        show_feedback: !1,
        show_rules: !0,
        user_nickname: null,
        user_figure: null,
        user_id: null,
        my_nickname: "JJL",
        my_figure: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIIMLLYoYa3vlc4eiaHrQiab2UB7L2p0YZVy6iaoib6X2fu1ln2OoSNfmFSKdxzPMiamxiaPNoiaSHSe7Vwg/132",
        my_id: "ToBaBellwether"
    },
    onClick_feedback: function() {
        this.setData({
            show_feedback: !0
        });
    },
    onClose_feedback: function() {
        this.setData({
            show_feedback: !1
        });
    },
    onClick_confirm: function() {
        this.setData({
            show_rules: !1,
            not_confirm: !1
        });
    },
    onClick_cancel: function() {
        (0, e.default)("亲，接受共识才能使用哦~"), this.setData({
            show_rules: !0
        });
    },
    onClick_user: function(a) {
        var e = this;
        (0, t.default)("用户信息努力加载中。。。"), wx.cloud.database().collection("bangdai_info").doc(a.currentTarget.id).get({
            success: function(a) {
                e.setData({
                    user_figure: a.data.user_figure,
                    user_id: a.data.user_id,
                    user_nickname: a.data.user_nickname
                });
            }
        }), this.setData({
            show_user: !0
        });
    },
    onClose_user: function() {
        this.setData({
            show_user: !1
        });
    },
    copy_nickname: function(a) {
        wx.setClipboardData({
            data: this.data.user_nickname,
            success: function(a) {
                console.log(a.data);
            }
        });
    },
    copy_mynickname: function(a) {
        wx.setClipboardData({
            data: this.data.my_nickname,
            success: function(a) {
                console.log(a.data);
            }
        });
    },
    copy_id: function(a) {
        wx.setClipboardData({
            data: this.data.user_id,
            success: function(a) {
                console.log(a.data);
            }
        });
    },
    copy_myid: function(a) {
        wx.setClipboardData({
            data: this.data.my_id,
            success: function(a) {
                console.log(a.data);
            }
        });
    },
    onLoad: function(a) {},
    onReady: function() {
        var a = this;
        n.collection("bangdai_info").where({
            date_number: n.command.gte(new Date().getTime())
        }).orderBy("date_number", "asc").get({
            success: function(t) {
                a.setData({
                    allData: t.data
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onReady();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: "点击查看详细帮带信息"
        };
    }
});