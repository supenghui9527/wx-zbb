// pages/index/publish/publish.js
const util = require('../../../utils/util.js');
const date = new Date();
Page({
  data: {
    active: 2,
    signCount: 0,
    date: '请选择会议日期',//util.formatTime(date).substring(0, 10)
    time: '请选择会议时间',//util.formatTime(date).substring(10)
    tempFilePaths: [],
    actType: [{ text: '党员大会', index: 2 }, { text: '支委会', index: 1 }, { text: '党小组会', index: 3 }, { text: '党课', index: 0 }]
  },
  onLoad: function (options) {
    this.setData({
      cType: options.cType,
      orgID: wx.getStorageSync('userInfo').orgID
    });
    this.leaveSave(0);
  },
  onReady: function () {

  },
  onShow: function () {
    
  },
  onHide: function () {
  },
  getPreside(e) {
    this.setData({
      preside: e.detail.value
    })
  },
  getShouldAttendance(e) {
    this.setData({
      shouldAttendance: e.detail.value
    })
  },
  getTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  getContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  getAddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  onUnload: function () {
    const meetingTime = '';
    if (this.data.date == '请选择会议日期' && this.data.time == '请选择会议时间') {

    }
    this.leaveSave(1);
  },
  // 临时保存
  leaveSave(isOut) {
    getApp().$ajax({
      httpUrl: getApp().api.hideAddUrl,
      isShowLoading: false,
      hideLoading: false,
      data: {
        isOut: isOut,
        orgID: this.data.orgID,
        cType: this.data.cType,
        meetingTime: util.formatTime(date),
        meetingType: this.data.active,
        isPublic: 2,
        title: this.data.title || '',
        content: this.data.content || '',
        shouldAttendance: this.data.shouldAttendance || '',
        preside: this.data.preside || '',
        meetingLocation: this.data.address || ''
      }
    }).then(({ data }) => {
      let name = data.data.signUserNames;
      let signNames = '';
      let arr = [];
      if (name != ''&&name!=null) {
        if (name.indexOf(',') != -1) {
          signNames = name.split(',')
        } else {
          arr.push(name);
          signNames = arr;
        }
      }
      this.setData({
        cID: data.data.cID,
        signNames: signNames,
        title: data.data.title,
        oldSignName: name,
        meetingLocation: data.data.meetingLocation,
        active:data.data.meetingType,
        preside: data.data.preside,
        shouldAttendance: data.data.shouldAttendance,
        content: data.data.content
      });
    })
  },
  bindDateChange(e) {
    this.setData({ date: e.detail.value })
  },
  bindTimeChange(e) {
    this.setData({ time: e.detail.value })
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
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
        else {
          this.getData(tempFilePaths, successUp, failUp, i, length, this.data.cID);
        }
      },
    })
  },
  //发布帖子
  save(e) {
    let successUp = 0, //成功个数
      failUp = 0, //失败个数
      length = this.data.tempFilePaths.length, //总共个数
      i = 0, //第几个
      data = e.detail.value;
    for (let i in data) {
      if (data[i] == '' || data[i].indexOf('请') != -1) {
        if (i == 'isPublic') {
          if (data.isPublic.length == 0) {
            data.isPublic = 0;
          }
          continue;
        }
        wx.showToast({
          title: '请确认信息是否填写完整',
          icon: 'none'
        });
        return;
      }
    };
    getApp().$ajax({
      hideLoading: false,
      httpUrl: getApp().api.pushPostingsUrl,
      data: data
    }).then((res) => {
      if (length) {
        this.getData(this.data.tempFilePaths, successUp, failUp, i, length, this.data.cID);
      } else {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
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
        getApp().$ajax({
          httpUrl: getApp().api.actSignUrl,
          data: {
            userID: JSON.parse(res.result).userID, // JSON.parse(res.result).userID
            cID: this.data.cID
          }
        }).then(({ data, message }) => {
          
          this.setData({
            oldSignName: data.signNames.toString(),
            signNames: data.signNames,
            signCount: data.countSign
          })
          console.log(data)
          wx.showToast({
            title: message,
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