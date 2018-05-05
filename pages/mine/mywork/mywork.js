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
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})