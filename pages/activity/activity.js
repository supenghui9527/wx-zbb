// pages/activity/activity.js
const util = require('../../utils/util.js');
Page({
  data: {
    showSelect: true,
    selectLists:[
      {
        text:'一周以内',
        index: 0
      },
      {
        text: '一个月内',
        index: 1
      },
      {
        text: '三个月内',
        index: 2
      },
      {
        text: '一年以内',
        index: 3
      },
      {
        text: '工委',
        index: 4
      },
      {
        text: '党委',
        index: 5
      },
      {
        text: '支部',
        index: 6
      }
    ]
  },
  onLoad (options) {
    // this.getData(20, 1, -1);
  },
  onShow () {
  
  },
  getLists() {

  },
  //获取数据方法
  getData(pageNub, cType, meetingType) {
    getApp().$ajax({
      httpUrl: getApp().api.getPostingsUrl,
      data: {
        pageNumber: pageNub,
        cType: cType,
        meetingType: meetingType
      }
    }).then(({ data }) => {
      wx.stopPullDownRefresh();
      for (let i = 0; i < data.community.length; i++) {
        data.community[i].type = ['党课', '支委会', '党员大会', '党小组会'];
      };
      this.setData({
        community: data.community,
        communityCount: data.communityCount,
        communityTop: data.communityTop
      });
    })
  },
  // 显示筛选
  showSelect() {
    this.setData({
      showSelect: !this.data.showSelect
    })
  },
  // 筛选
  goSelect(e){
    const index = e.currentTarget.dataset.index;
    this.setData({
      active: e.currentTarget.dataset.index
    })
    if (index==0){
      console.log(this.selectTime(7))
    }else if(index==1){
      console.log(this.selectTime(30))
    }else if (index == 2) {
      console.log(this.selectTime(90))
    }else if (index == 3) {
      console.log(this.selectTime(365))
    }else if (index == 4) {

    }else if (index == 5) {

    }else{

    }
  },
  // 计算筛选时间
  selectTime(nub) {
    const now = new Date();
    const time = Date.parse(now) - 1000 * 3600 * 24 * nub;
    return `${util.formatTime(new Date(time))},${util.formatTime(now)}`;
  },
  // 发布活动
  goPublish(e) {
    let posttype = e.currentTarget.dataset.posttype;
    wx.navigateTo({
      url: `/pages/index/publish/publish?shek=false`
    })
  },
  getData(pageNub, cType, meetingType) {
    getApp().$ajax({
      httpUrl: getApp().api.getPostingsUrl,
      data: {
        pageNumber: pageNub,
        cType: cType,
        meetingType: meetingType
      }
    }).then(({ data }) => {
      wx.stopPullDownRefresh();
      for (let i = 0; i < data.community.length; i++) {
        data.community[i].type = ['党课', '支委会', '党员大会', '党小组会'];
      };
      this.setData({
        community: data.community,
        communityCount: data.communityCount
      });
    })
  },
  onPullDownRefresh() {
  
  },
  onReachBottom() {
  
  },
  onShareAppMessage() {
  
  }
})