//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    active: 0,
    nav:[
      {
        item: '全部',
        index: 0
      },
      {
        item: '党员大会',
        index: 0
      },
      {
        item: '支委会',
        index: 0
      },
      {
        item: '党小组会',
        index: 0
      },
      {
        item: '党课',
        index: 0
      }
    ]
  },
  onLoad: function () {

  },
  changeNav(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
