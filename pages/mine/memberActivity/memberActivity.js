// pages/mine/memberActivity/memberActivity.js
const util = require('../../../utils/util.js');
Page({
  data: {
    nameList: [],
    idx:0,
    typeList: ['党课', '支委会', '党员大会', '党小组会'],
    selectLists: ['一周以内', '一个月以内', '三个月以内', '一年以内'],
    showSelect: true
  },
  onLoad: function (options) {
    getApp().$ajax({
      httpUrl: getApp().api.userListsUrl
    }).then(({ data }) => {
      this.setData({
        nameList:data
      })
    })
    this.getLists()
  },
  onReady: function () {

  },
  onShow: function () {

  },
  //筛选人名
  bindNameChange: function (e) {
    this.setData({
      userID: this.data.nameList[e.detail.value].userID
    });
    this.getLists(this.data.userID, this.data.actType, this.data.dateType);
  },
  //类型筛选
  bindTypeChange: function (e) {
    this.setData({
      actType: e.detail.value
    });
    this.getLists(this.data.userID, this.data.actType, this.data.dateType);
  },
  goSelect() {
    this.setData({
      showSelect: !this.data.showSelect
    })
  },
  clickSelect(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ active: index });
    if (index == 0) {
      this.setData({ dateType: this.selectTime(7), showSelect: !this.data.showSelect });
    } else if (index == 1) {
      this.setData({ dateType: this.selectTime(30), showSelect: !this.data.showSelect });
    } else if (index == 2) {
      this.setData({ dateType: this.selectTime(90), showSelect: !this.data.showSelect });
    } else {
      this.setData({ dateType: this.selectTime(365), showSelect: !this.data.showSelect });
    }
    this.getLists(this.data.userID, this.data.actType, this.data.dateType);
  },
  // 计算筛选时间
  selectTime(nub) {
    const now = new Date();
    const time = Date.parse(now) - 1000 * 3600 * 24 * nub;
    return `${util.formatTime(new Date(time))},${util.formatTime(now)}`;
  },
  // 获取列表
  getLists(userID, actType, dateType) {
    getApp().$ajax({
      httpUrl: getApp().api.emphasisUserUrl,
      data: {
        userID: userID || '',
        actType: actType || '-1',
        timeType: dateType || ''
      }
    }).then(({ data }) => {
      this.setData({
        lists: data
      })
    })
  },
  // 进入详情
  goDetail(e){
    wx.navigateTo({
      url: `/pages/mine/memberActivity/detail/detail?userID=${e.currentTarget.dataset.userid}`
    })
  }
})