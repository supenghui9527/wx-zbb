// pages/detail/detail.js
Page({
  data: {
    active: 1,
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  changeTab(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  onUnload: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})