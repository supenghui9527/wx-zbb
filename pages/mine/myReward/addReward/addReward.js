// pages/mine/myReward/addReward/addReward.js
Page({
  data: {
    array: ['惩罚', '奖励'],
    rewards: '请选择通报性质'
  },
  onLoad: function (options) {
  },
  onReady: function () {

  },
  bindPickerChange: function (e) {
    this.setData({
      rewards: this.data.array[e.detail.value]
    })
  },
  onShow: function () {
    wx.getStorageSync('rewardsID') && this.setData({ orgName: wx.getStorageSync('rewardsID').orgName, beOrgID: wx.getStorageSync('rewardsID').orgID, orgID: wx.getStorageSync('userInfo').orgID });
  },
  goLists() {
    wx.navigateTo({
      url: "/pages/mine/myReward/lists/lists"
    })
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  saveRewards(e) {
    let data = e.detail.value;
    for (let i in data) {
      if (data[i] == '' || data[i] == null) {
        if (i == 'isPublic') {
          if (data.isPublic.length == 0) {
            data.isPublic = 0;
          }
          continue;
        }
        wx.showToast({
          title: '请确认信息是否填写完整',
          icon: 'none'
        });
        return;
      }
    };
    getApp().$ajax({
      title: '发布中',
      httpUrl: getApp().api.saveRewardsUrl,
      data: data
    }).then(({ data }) => {
      wx.showToast({
        title: '发布成功',
        icon: 'none',
        duration: 2000,
        success: () => {
          wx.wx.removeStorageSync('rewardsID');
          setTimeout(() => {
            wx.redirectTo({
              url: "/pages/mine/myReward/myReward"
            })
          }, 2000)
        }
      })
    })
  }
})