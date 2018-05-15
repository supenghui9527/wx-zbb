// pages/mine/member/parties/parties.js
Page({
  data: {
  
  },
  onLoad: function (options) {
    getApp().$ajax({
      httpUrl: getApp().api.PartyDeusrRecordUrl,
      data: {
        userID: options.userID,
      }
    }).then(({ data }) => {
      this.setData({
        lists: data&&getApp().recombinedData(data),
        userinfo: data
      })
    })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
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