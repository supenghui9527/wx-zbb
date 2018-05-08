// pages/detail/detail.js
Page({
  data: {
    active: 1,
  },
  onLoad: function (options) {
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
  onShareAppMessage: function () {
  
  }
})