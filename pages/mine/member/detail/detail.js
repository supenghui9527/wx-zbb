// pages/mine/member/detail/detail.js
Page({
  data: {

  },
  onLoad: function (options) {
    this.setData({
      firstName: options.username.substring(0, 1),
      username: options.username,
      gender: options.gender,
      joindate: options.joindate,
      idNum: options.idNum,
      tel: options.tel,
      position: options.position,
      userID: options.userID
    });
    this.getStudyAndpartypay();
  },
  onReady: function () {

  },
  historyLists() {
    wx.navigateTo({
      url: `/pages/mine/member/studyLists/studyLists?userID=${this.data.userID}`
    })
  },
  partiesLists(){
    wx.navigateTo({
      url: `/pages/mine/member/parties/parties?userID=${this.data.userID}`
    })
  },
  getStudyAndpartypay() {
    getApp().$ajax({
      httpUrl: getApp().api.studyAndPartyPayUrl,
      data: {
        userID: this.data.userID,
      }
    }).then(({ data }) => {
      this.setData({
        countStudy: data.countStudy,
        sumPartyPay: data.sumPartyPay
      })
    })
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