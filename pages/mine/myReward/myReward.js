// pages/mine/myReward/myReward.js
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    tab: ['奖励', '惩罚'],
    lists: [
      {
        content:"张三获得红旗手称号",
        create_date_time: 1523932550000,
        title: "张三获得红旗手称号"
      },
      {
        content: "张三获得红旗手称号",
        create_date_time: 1523932550000,
        title: "张三获得红旗手称号"
      },
      {
        content: "张三获得红旗手称号",
        create_date_time: 1523932550000,
        title: "张三获得红旗手称号"
      },
    ]
  },
  onLoad: function (options) {
    this.setData({
      lists: this.recombinedData(this.data.lists)
    })
  },
  changeNav(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  // 组装数据
  recombinedData(data) {
    let yearArr = [];
    data.map(({ content, create_date_time }) => {
      let year = util.formatTime(new Date(create_date_time)).substring(0, 4);
      let index = -1;
      let date = util.formatTime(new Date(create_date_time)).substring(5, 10);
      yearArr.forEach((e, i) => {
        if (e.year === year) {
          index = i;
          return;
        }
      });
      if (index === -1) {
        yearArr.push({ year, month: [{ content, date }] });
      } else {
        yearArr[index].month.push({ content, date });
      }
    });
    return yearArr;
  },
  onHide: function () {

  },
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})