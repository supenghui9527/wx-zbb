// pages/activity/activity.js
const util = require('../../utils/util.js');
Page({
  data: {
    showSelect: true,
    selectLists: [{ text: '一周以内', index: 0 }, { text: '一个月内', index: 1 }, { text: '三个月内', index: 2 }, { text: '一年以内', index: 3 }, { text: '党工委', index: 4 }, { text: '党委', index: 5 }, { text: '党支部', index: 6 }],
    count: null,
    pageIndex: 2,
    pageCount: '',
    pageNub: 20,
    orderType: 0,
    dateType: '',
    orgType: '',
    active1: 7 // 综合评论点赞
  },
  // orderType,dateType,orgType:工委，党委，支部
  onLoad(options) {
    this.getData({ orderType: this.data.orderType, dateType: this.data.dateType, orgType: this.data.orgType });
  },
  onShow() {

  },
  getLists() {

  },
  onPullDownRefresh(){
    this.getData({ orderType: this.data.orderType, dateType: this.data.dateType, orgType: this.data.orgType });
  },
  //获取数据方法
  getData({ orderType, dateType, orgType }) {
    getApp().$ajax({
      httpUrl: getApp().api.getPartyLists,
      data: {
        orgID: wx.getStorageSync('userInfo').orgID,
        pageNumber: 20,
        orderType: orderType,
        dateType: dateType,
        orgType: orgType
      }
    }).then(({ data }) => {
      wx.stopPullDownRefresh();
      this.setData({
        community: data.community,
        count: data.communityCount
      });
    })
  },
  // 显示筛选
  showSelect() {
    this.setData({ showSelect: !this.data.showSelect })
  },
  // 筛选
  goSelect(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({ active: index });
    if (index == 0) {
      this.setData({ dateType: this.selectTime(7), showSelect: !this.data.showSelect });
    } else if (index == 1) {
      this.setData({ dateType: this.selectTime(30), showSelect: !this.data.showSelect });
    } else if (index == 2) {
      this.setData({ dateType: this.selectTime(90), showSelect: !this.data.showSelect });
    } else if (index == 3) {
      this.setData({ dateType: this.selectTime(365), showSelect: !this.data.showSelect });
    } else if (index == 4) {
      this.setData({ orgType: '党工委', showSelect: !this.data.showSelect });
    } else if (index == 5) {
      this.setData({ orgType: '党委', showSelect: !this.data.showSelect });
    } else if (index == 6) {
      this.setData({ orgType: '党支部', showSelect: !this.data.showSelect });
    } else if (index == 7) {
      this.setData({ orderType: 0, active: 7 });
    } else if (index == 8) {
      this.setData({ orderType: 1, active: 8 });
    } else if (index == 9) {
      this.setData({ orderType: 2, active: 9 });
    }
    this.getData({ orderType: this.data.orderType, dateType: this.data.dateType, orgType: this.data.orgType });
  },
  // 计算筛选时间
  selectTime(nub) {
    const now = new Date();
    const time = Date.parse(now) - 1000 * 3600 * 24 * nub;
    return `${util.formatTime(new Date(time))},${util.formatTime(now)}`;
  },
  // 发布活动
  goPublish(e) {
    wx.navigateTo({
      url: `/pages/index/publish/publish?cType=1`
    })
  },
  // 点赞
  clickLikes(e) {
    let cID = e.currentTarget.dataset.actid;
    getApp().$ajax({
      httpUrl: getApp().api.likesUrl,
      data: {
        cID: cID,
        orgID: wx.getStorageSync('userInfo').orgID
      }
    }).then(({ data }) => {
      this.getData({ orderType: 0, dateType: '', orgType: '' });
    })
  },
  onPullDownRefresh() {

  },
  loadMoreList(pageIndex, orderType, dateType, orgType) {
    getApp().$ajax({
      httpUrl: getApp().api.getMorePartyUrl,
      data: {
        orgID: wx.getStorageSync('userInfo').orgID,
        pageNumber: 20,
        pageIndex: pageIndex,
        orderType: orderType,
        dateType: dateType,
        orgType: orgType
      }
    }).then(({ data }) => {
      if (this.data.pageIndex > 1) {
        var publishs = [...this.data.community, ...data.community];
      }
      this.data.pageIndex++;
      this.setData({
        community: publishs ? publishs : data.community
      })
    });
  },
  // 下拉加载更多
  onReachBottom: function () {
    const pageCount = this.data.count / 20;
    this.data.count % 20 != 0 ? this.setData({ pageCount: Math.ceil(pageCount) }) : this.setData({ pageCount: pageCount });
    //判断页码总数减去当前页码是否还存在下一页
    if (this.data.pageCount - this.data.pageIndex >= 0) {
      this.loadMoreList(this.data.pageIndex, this.data.orderType, this.data.dateType, this.data.orgType);
    }
  },
  onShareAppMessage() {

  },
  // 点击进入详情
  goDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?cid=${e.currentTarget.dataset.actid}&cType=1`
    })
  },
  // 搜索
  goSearch() {
    wx.navigateTo({
      url: '/pages/index/search/search?cType=1'
    })
  }
})