// pages/common/publish/publish.js
const util = require('../../../utils/util.js');
const date = new Date();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    date: '请选择会议日期',//util.formatTime(date).substring(0, 10)
    time: '请选择会议时间',//util.formatTime(date).substring(10)
    tempFilePaths: [],
    actType: ['党员大会', '支委会', '党小组会', '党课']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeNav(e) {
      this.setData({
        active: e.currentTarget.dataset.index
      })
    }
  }
})
