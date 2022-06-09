var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("vant-weapp/toast/toast")), a = wx.cloud.database();

Page({
    data: {
        myActivity: [],
        combine: [],
        show_edit: !1,
        dataID: null,
        itemID: null,
        openID: null,
        quantity: 1,
        weight: 0,
        itemName: "",
        userName: ""
    },
    onChange_quantity: function(t) {
        this.setData({
            quantity: t.detail
        });
    },
    onChange_weight: function(t) {
        this.setData({
            weight: t.detail
        });
    },
    onChange_itemName: function(t) {
        this.setData({
            itemName: t.detail
        });
    },
    onChange_userName: function(t) {
        this.setData({
            userName: t.detail
        });
    },
    onChange: function(t) {
        this.setData({
            activeNames: t.detail
        });
    },
    onClick_edit: function(t) {
        this.setData({
            show_edit: !0
        }), this.setData({
            dataID: t.currentTarget.id
        });
    },
    onClose_edit: function() {
        this.setData({
            show_edit: !1
        });
    },
    upload_Data: function() {
        var e = this;
        "" != this.data.itemName ? a.collection("bangdai_detail").add({
            data: {
                activityID: this.data.dataID,
                quantity: this.data.quantity,
                weight: this.data.weight,
                itemName: this.data.itemName,
                userName: this.data.userName
            },
            success: function(a) {
                console.log(a), e.setData({
                    activityID: "",
                    quantity: 1,
                    weight: 0,
                    itemName: "",
                    userName: ""
                }), (0, t.default)("物品信息创建成功，可以继续添加");
            },
            fail: function(t) {
                console.log(t);
            }
        }) : (0, t.default)("请输入物品名称");
    },
    jump_items: function(t) {
        wx.navigateTo({
            url: "../items/main?activityID=" + this.data.dataID
        });
    },
    delete_Data: function() {
        a.collection("bangdai_info").doc(this.data.dataID).remove({
            success: function(t) {
                console.log(t.data);
            }
        }), wx.cloud.callFunction({
            name: "delete",
            data: {
                id: this.data.dataID
            },
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {
                console.log(t);
            }
        }), this.setData({
            show_edit: !1
        }), this.onReady(), (0, t.default)("删除成功，请下拉以刷新");
    },
    onLoad: function(t) {
        var e = this;
        null == this.data.openID && wx.cloud.callFunction({
            name: "login"
        }).then(function(t) {
            e.setData({
                openID: t.result
            });
        }).catch(function(t) {
            console.log(t);
        }), a.collection("bangdai_info").where({
            _openid: this.data.openID
        }).orderBy("date_number", "asc").get().then(function(t) {
            e.setData({
                myActivity: t.data
            });
        });
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