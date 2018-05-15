// pages/mine/mywork/mywork.js
Page({
  data: {
    active: 0,
    tab: ['待完成', '已完成'],
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  changeNav(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  onHide: function () {
  
  },
  goPublish(e) {
    wx.navigateTo({
      url: `/pages/index/publish/publish?cType=0`
    })
  },
  publicWork(){

  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})