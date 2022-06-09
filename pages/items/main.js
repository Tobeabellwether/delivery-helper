var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("vant-weapp/toast/toast")), a = wx.cloud.database();

Page({
    data: {
        myDetail: [],
        activityID: "",
        show_delete: !1,
        total_weight: 0,
        nickName: ""
    },
    onClick_delete: function(t) {
        this.setData({
            show_delete: !0
        }), this.setData({
            itemID: t.currentTarget.id
        });
    },
    onClose_delete: function() {
        this.setData({
            show_delete: !1
        });
    },
    copy_Nickname: function(t) {
        var e = this;
        a.collection("bangdai_detail").doc(this.data.itemID).get({
            success: function(t) {
                e.setData({
                    nickName: t.data.userName
                }), wx.setClipboardData({
                    data: e.data.nickName,
                    success: function(t) {
                        console.log(t.data);
                    }
                });
            }
        });
    },
    delete_Item: function() {
        a.collection("bangdai_detail").doc(this.data.itemID).remove({
            success: function(t) {
                console.log(t.data);
            }
        }), this.setData({
            show_delete: !1
        }), (0, t.default)("删除成功");
    },
    onLoad: function(e) {
        var i = this;
        "" == this.data.activityID && this.setData({
            activityID: e.activityID
        }), a.collection("bangdai_detail").where({
            activityID: this.data.activityID
        }).get().then(function(t) {
            i.setData({
                myDetail: t.data
            });
        });
        for (var n = 0, o = 0; o < this.data.myDetail.length; o++) n += this.data.myDetail[o].weight * this.data.myDetail[o].quantity;
        this.setData({
            total_weight: n
        }), (0, t.default)("下拉以更新数据");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.onLoad();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});