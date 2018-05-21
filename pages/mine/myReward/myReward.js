// pages/mine/myReward/myReward.js
const util = require('../../../utils/util.js');
Page({
  data: {
    active: 1,
    tab: [
      {
        text:'奖励',
        index:1
      },
      {
        text: '惩罚',
        index: 0
      }
    ],
    lists: []
  },
  onLoad: function (options) {
  },
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index,
      lists:[]
    });
    this.getRewardLists(this.data.active);
  },
  onReady: function () {

  },
  onShow: function () {
    this.getRewardLists(this.data.active);
  },
  getRewardLists(pointType) {
    getApp().$ajax({
      httpUrl: getApp().api.getRewarListdUrl,
      data: {
        orgID: wx.getStorageSync('userInfo').orgID,
        pointType: pointType
      }
    }).then(({ data }) => {
      this.setData({
        lists: this.recombinedData(data)
      })
    })
  },
  // 组装数据
  recombinedData(data) {
    let yearArr = [];
    data.map(({ content, creataTime, point, meetingType }) => {
      let year = util.formatTime(new Date(creataTime)).substring(0, 4);
      let index = -1;
      let date = util.formatTime(new Date(creataTime)).substring(5, 10);
      yearArr.forEach((e, i) => {
        if (e.year === year) {
          index = i;
          return;
        }
      });
      if (index === -1) {
        yearArr.push({ year, month: [{ content, date, point, meetingType }] });
      } else {
        yearArr[index].month.push({ content, date, point, meetingType });
      }
    });
    return yearArr;
  },
  onHide: function () {

  },
  goPublish(){
    wx.navigateTo({
      url: "/pages/mine/myReward/addReward/addReward"
    })
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})