// pages/mine/parties/parties.js
const util = require('../../../utils/util.js');
const date = new Date();
Page({
  data: {
    date: util.formatTime(date)
  },
  onLoad: function (options) {
    let userinfo = wx.getStorageSync('members');
    this.setData({
      userName: userinfo.username,
      uid: `${userinfo.idNumber.substring(0, 3)}*************${userinfo.idNumber.substring(16)}`,
      userID: userinfo.userID
    })
  },
  onReady: function () {

  },
  toPay(e) {
    let formData = e.detail.value;
    for (let i in formData) {
      if (formData[i]==''){
        wx.showToast({
          title: '请确认信息是否完整',
          icon:'none'
        })
        return;
      }
    }
    getApp().$ajax({
      httpUrl: getApp().api.partyDeusPayUrl,
      data: e.detail.value
    }).then(({ data }) => {
      wx.showToast({
        title: '缴费成功',
        duration: 2000,
        icon:'none',
        success:()=>{
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      })
    })
  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  }
})