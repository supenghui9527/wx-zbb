// pages/mine/member/studyLists/studyLists.js
Page({
  data: {

  },
  onLoad: function (options) {
    getApp().$ajax({
      httpUrl: getApp().api.studyRecordtUrl,
      data: {
        userID: options.userID,
      }
    }).then(({ data }) => {
      this.setData({
        lists: data.studyList && getApp().recombinedData(data.studyList),
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