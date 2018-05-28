// pages/mine/memberActivity/memberActivity.js
const util = require('../../../utils/util.js');
Page({
  data: {
    nameList: ['美国', '苏朋辉', '水水水', '日本'],
    typeList: ['党课', '支委会', '党员大会', '党小组会'],
    selectLists: ['一周以内','一个月以内','三个月以内','一年以内'],
    showSelect: true
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  bindNameChange: function (e) {
    this.setData({
      name: this.data.array[e.detail.value]
    })
  },
  bindTypeChange: function (e) {
    this.setData({
      actType: this.data.array[e.detail.value]
    })
  },
  goSelect(){
    this.setData({
      showSelect: !this.data.showSelect
    })
  },
  clickSelect(e){
    const index = e.currentTarget.dataset.index;
    this.setData({active: index});
    if (index == 0) {
      this.setData({ dateType: this.selectTime(7), showSelect: !this.data.showSelect });
    } else if (index == 1) {
      this.setData({ dateType: this.selectTime(30), showSelect: !this.data.showSelect });
    } else if (index == 2) {
      this.setData({ dateType: this.selectTime(90), showSelect: !this.data.showSelect });
    } else {
      this.setData({ dateType: this.selectTime(365), showSelect: !this.data.showSelect });
    }
    this.getLists(this.data.name, this.data.actType, this.data.dateType);
  },
  // 计算筛选时间
  selectTime(nub) {
    const now = new Date();
    const time = Date.parse(now) - 1000 * 3600 * 24 * nub;
    return `${util.formatTime(new Date(time))},${util.formatTime(now)}`;
  },
  getLists(){
    getApp().$ajax({
      httpUrl: getApp().api.userInfoUrl,
      data: {
        name: '',
        actType: '',
        timeType: ''
      }
    }).then(({ data }) => {
      
    })
  }
})