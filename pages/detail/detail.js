// pages/detail/detail.js
Page({
  data: {
    active: 1,
  },
  onLoad: function (options) {
    this.setData({
      cType: options.cType
    })
    this.getDetail(options.cid);
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  getDetail(cID){
    //查询帖子详情
    getApp().$ajax({
      httpUrl: getApp().api.postingsDetailUrl,
      data: {
        cID: cID
      }
    }).then(({ data }) => {
      data.isDetail = false;
      data.userID = wx.getStorageSync('userInfo').orgID;
      data.type = ['党课', '支委会', '党员大会', '党小组会'];
      this.setData({
        item: data
      })
    });
  },
  changeTab(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  //点击图片预览
  showBigPic(e) {
    getApp().showBigPic(e);
  },
  onUnload: function () {
  
  },
  onShareAppMessage: function (res) {
    let ctx = this, actId = res.target.dataset.actid;
    return {
      title: '鼓楼党建e生活',
      path: `/pages/index/detail/detail?cid=${actId}`,
      success: function (res) {
        getApp().$ajax({
          httpUrl: getApp().api.shareUrl,
          data: {
            orgID:wx.getStorageSync('userInfo').orgID,
            cID: actId
          }
        }).then(({ data }) => {
          data.isDetail = false;
          data.userID = wx.getStorageSync('userInfo').orgID;
          data.type = ['党课', '支委会', '党员大会', '党小组会'];
          this.setData({
            item: data
          })
        });
      },
      fail: function (res) {
      }
    }
  },
})