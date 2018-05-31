// pages/mine/mywork/public/public.js
const util = require('../../../../utils/util.js');
const date = new Date();
Page({
  data: {
    date: '请选择任务最后期限',
    start: util.formatTime(date).substring(0, 10),
    orgNames:'请选择发布对象'
  },
  onLoad: function (options) {
    
  },
  onReady: function () {

  },
  onShow: function () {
    if (wx.getStorageSync('works')){
      let orgIDs = '',orgNames = '';
      wx.getStorageSync('works').map((item)=>{
        orgIDs += `${item.orgID},`
        orgNames += `${item.orgName};`
      })
      this.setData({
        orgIDs: orgIDs,
        orgNames: orgNames,
        orgID:wx.getStorageSync('userInfo').orgID
      })
    }
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  bindDateChange(e){
    this.setData({
      date:e.detail.value
    })
  },
  goLists() {
    wx.navigateTo({
      url: "/pages/mine/mywork/lists/lists"
    })
  },
  save(e){
    let data = e.detail.value;
    for (let i in data) {
      if (data[i] == '' || data[i] == null) {
        wx.showToast({
          title: '请确认信息是否填写完整',
          icon: 'none'
        });
        return;
      }
    };
    getApp().$ajax({
      title: '发布中',
      httpUrl: getApp().api.addWorkUrl,
      data: data
    }).then(({ data }) => {
      wx.showToast({
        title: '发布成功',
        icon: 'none',
        duration: 3000,
        success: () => {
          wx.removeStorageSync('works');
          setTimeout(() => {
            wx.redirectTo({
              url: "/pages/mine/mywork/mywork"
            })
          }, 2000)
        }
      })
    })
  },
  onShareAppMessage: function () {

  }
})