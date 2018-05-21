// pages/mine/myintegral/detail/detail.js
const util = require('../../../../utils/util.js');
Page({
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().$ajax({
      isShowLoading: false,
      httpUrl: getApp().api.rankDetailUrl,
      data: {
        orgID: wx.getStorageSync('userInfo').orgID
      }
    }).then(({ data }) => {
      this.setData({
        lists: this.recombinedData(data)
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
  // 组装数据
  recombinedData(data) {
    let yearArr = [];
    data.map(({ content, creataTime, beOrgName, point, masType, meetingType }) => {
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
        yearArr.push({ year, month: [{ content, date, beOrgName, point, masType, meetingType }] });
      } else {
        yearArr[index].month.push({ content, date, beOrgName, point, masType, meetingType });
      }
    });
    return yearArr;
  },
})