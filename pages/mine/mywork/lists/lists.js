// pages/mine/myReward/lists/lists.js
Page({
  data: {

  },
  onLoad: function (options) {
    this.setData({
      orgName: wx.getStorageSync('userInfo').orgName
    })
  },
  onReady: function () {

  },
  onShow: function () {
    getApp().$ajax({
      isShowLoading: false,
      httpUrl: getApp().api.getDownOrgUrl,
      data: {
        orgID: wx.getStorageSync('userInfo').orgID,
      }
    }).then(({ data }) => {
      data.map((item) => {
        item.isSelect = false;
      })
      this.setData({
        lists: data
      })
    })
  },
  select(e) {
    let data = this.data.lists, index = e.currentTarget.dataset.index;
    data[index].isSelect = !data[index].isSelect;
    this.setData({
      lists: data
    })
  },
  sure() {
    let data = this.data.lists, arr = [];
    data.map((item) => {
      if (item.isSelect == true) {
        arr.push({ orgID: item.orgID, orgName: item.orgName })
      }
    })
    wx.setStorageSync('works', arr);
    wx.navigateBack({
      delta: 1
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