// pages/mine/myintegral/myintegral.js
const util = require('../../../utils/util.js');
const date = new Date();
let sortFlag = true;
Page({
  data: {
    startTime: util.formatTime(date).substring(0, 10),
    endTime: util.formatTime(date).substring(0, 10),
    rankType:1
  },
  onLoad: function (options) {
    this.setData({
      avatar: wx.getStorageSync('userInfo').headThumb,
      orgName: wx.getStorageSync('userInfo').orgName,
      pointDetail: wx.getStorageSync('pointDetail')
    });
    this.getPointList(this.data.rankType, '', '');
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  select(e){
    this.setData({
      rankType: e.currentTarget.dataset.index
    })
    this.getPointList(this.data.rankType, this.data.startTime, this.data.endTime)
  },
  getPointList(rankType, startTime, endTime){
    getApp().$ajax({
      httpUrl: getApp().api.slectRankUrl,
      data: {
        rankType: rankType,
        startTime: startTime,
        endTime: endTime
      }
    }).then(({ data }) => {
      this.setData({
        lists: data,
        oldLists:data
      })
    })
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  },
  bindStartChange(e){
    this.setData({
      startTime:e.detail.value
    })
    if (Date.parse(this.data.startTime) >= Date.parse(this.data.endTime)){
      wx.showToast({
        title: '开始时间不能大于或等于结束时间',
        icon:'none'
      })
    }else{
      this.getPointList(this.data.rankType, this.data.startTime, this.data.endTime)
    }
  },
  bindEndChange(e) {
    this.setData({
      endTime: e.detail.value
    })
    if (Date.parse(this.data.endTime) <= Date.parse(this.data.startTime)) {
      wx.showToast({
        title: '结束时间不能小于或等于开始时间',
        icon: 'none'
      })
    } else {
      this.getPointList(this.data.rankType, this.data.startTime, this.data.endTime)
    }
  },
  changeGift(){
    wx.navigateTo({
      url: '/pages/mine/myintegral/gift/gift',
    })
  },
  //排序方法
  sortBy(attr, rev) {
    //第二个参数没有传递 默认升序排列
    if (rev == undefined) {
      rev = 1;
    } else {
      rev = (rev) ? 1 : -1;
    }
    return function (a, b) {
      a = a[attr];
      b = b[attr];
      if (a < b) {
        return rev * -1;
      }
      if (a > b) {
        return rev * 1;
      }
      return 0;
    }
  },
  //点击对下面排行榜进行排序
  toSort() {
    if (sortFlag) {
      this.setData({
        lists: this.data.lists.sort(this.sortBy('point'))
      })
      sortFlag = false;
    } else {
      this.setData({
        lists: this.data.oldLists
      });
      sortFlag = true;
    }
  }
})