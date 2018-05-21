// pages/mine/mymessage/mymessage.js
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
    getApp().$ajax({
      httpUrl: getApp().api.getMessageUrl,
      data: {
        orgID: wx.getStorageSync('userInfo').orgID
      }
    }).then(({ data }) => {
      data.map(item=>{
        item.creataTime = item.creataTime.substring(0, 10);
      });
      this.setData({
        lists: data
      })
    })
  },
  onHide: function () {

  },
  onUnload: function () {
  
  }
})