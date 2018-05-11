// pages/index/publish/publish.js
const util = require('../../../utils/util.js');
const date = new Date();
Page({
  data: {
    active: 0,
    date: '请选择会议日期',//util.formatTime(date).substring(0, 10)
    time: '请选择会议时间',//util.formatTime(date).substring(10)
    tempFilePaths: [],
    actType: ['党员大会', '支委会', '党小组会', '党课']
  },
  onLoad: function (options) {
    this.setData({ cType: options.cType });
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
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

  },
  //选择本地相册中的图片
  upLoad() {
    wx.chooseImage({
      success: (res) => {
        let tempFilePaths = res.tempFilePaths;
        if (this.data.tempFilePaths == '') {
          this.setData({
            tempFilePaths: tempFilePaths
          })
        } else {
          this.setData({
            tempFilePaths: this.data.tempFilePaths.concat(tempFilePaths)
          })
        }
      }
    })
  },
  //上传图片方法
  getData: function (tempFilePaths, successUp, failUp, i, length, cid) {
    wx.uploadFile({
      url: getApp().api.upLoadPicUrl,
      header: { "Content-Type": "multipart/form-data" },
      filePath: tempFilePaths[i],
      name: 'picName',
      formData: {
        cID: cid
      },
      success: (resp) => {
        successUp++;
      },
      fail: (res) => {
        failUp++;
      },
      complete: () => {
        i++;
        if (i == length) {
          // console.log('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
          wx.hideLoading();
          wx.redirectTo({
            url: '/pages/home/home'
          })
        }
        else {
          this.getData(tempFilePaths, successUp, failUp, i, length, cid);
        }
      },
    })
  },
  //发布帖子
  save(e) {
    console.log(e.detail.value)
    let successUp = 0, //成功个数
      failUp = 0, //失败个数
      length = this.data.tempFilePaths.length, //总共个数
      i = 0, //第几个
      data = e.detail.value;
    for (let i in data) {
      if (data[i] == '') {
        if (i == 'location') continue;
        wx.showToast({
          title: '请确认信息是否填写完整',
          icon: 'none'
        });
        return;
      }
    };
    getApp().$ajax({
      isShowLoading: false,
      hideLoading: false,
      httpUrl: getApp().api.pushPostingsUrl,
      data: data
    }).then((res) => {
      if (length) {
        this.getData(this.data.tempFilePaths, successUp, failUp, i, length);
      } else {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
    // wx.request({
    //   url: getApp().api.pushPostingsUrl,
    //   method: 'post',
    //   header: { "Content-Type": "application/x-www-form-urlencoded" },
    //   data: data,
    //   success: (res) => {
    //     if (res.data.state == 1) {
    //       if (length) {
    //         this.getData(this.data.tempFilePaths, successUp, failUp, i, length, res.data.data);
    //       } else {
    //         wx.navigateTo({
    //           url: '/pages/home/home'
    //         })
    //       }
    //     } else {
    //     }
    //   }
    // })
  },
  //删除预览图片
  delPictrue(e) {
    let idx = e.currentTarget.dataset.index, tempFilePaths = this.data.tempFilePaths;
    tempFilePaths.splice(idx, 1);
    this.setData({
      tempFilePaths: tempFilePaths
    })
  },
  // 扫码签到
  sign() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        getApp().$ajax({
          httpUrl: getApp().api.actSignUrl,
          data: {
            userID: wx.getStorageSync('userInfo').orgID,
            cID: 2
          }
        }).then(({ data }) => {
          wx.showToast({
            title: '签到成功',
            icon: 'none'
          })
        })
      },
      fail: () => {
        console.log(1)
      }
    })
  }
})