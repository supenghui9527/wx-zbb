// pages/index/publish/publish.js
const util = require('../../../utils/util.js');
const date = new Date();
Page({
  data: {
    active: 2,
    signCount: 0,
    date: util.formatTime(date).substring(0, 10),
    time: util.formatTime(date).substring(10),
    tempFilePaths: [],
    actType: [{ text: '党员大会', index: 2 }, { text: '支委会', index: 1 }, { text: '党小组会', index: 3 }, { text: '党课', index: 0 }]
  },
  onLoad: function (options) {
    options.workID && this.setData({ workID: options.workID });
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
        meetingTime: `${this.data.date} ${this.data.time}`,
        meetingType: this.data.active,
        isPublic: 2,
        title: this.data.title || '',
        content: this.data.content || '',
        shouldAttendance: this.data.shouldAttendance || '',
        preside: this.data.preside || '',
        meetingLocation: this.data.address || ''
      }
    }).then(({ data }) => {
      if (this.data.cType==0){
        this.setData({
          meetingLocation: data.data.meetingLocation,
        })
      }else{
        this.setData({
          geo: data.data.meetingLocation,
        })
      }
      this.setData({
        cID: data.data.cID,
        signNames: data.data.signUserNamesList,
        title: data.data.title,
        oldSignName: JSON.stringify(data.data.signUserNamesList),
        active: data.data.meetingType,
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
    this.setData({ time: `  ${e.detail.value}` })
  },
  //选择本地相册中的图片
  upLoad() {
    wx.chooseImage({
      count: 6,
      success: (res) => {
        let tempFilePaths = res.tempFilePaths;
        if (this.data.tempFilePaths == '') {
          this.setData({
            tempFilePaths: tempFilePaths
          })
        } else {
          if (this.data.tempFilePaths.concat(tempFilePaths).length <= 6) {
            this.setData({
              tempFilePaths: this.data.tempFilePaths.concat(tempFilePaths)
            })
          } else {
            wx.showToast({
              title: '图片最多为6张',
              icon: 'none'
            })
          }
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
          console.log(this.data.cType)
          if(this.data.cType==0){
            wx.setStorageSync('isReload', 1);
            wx.switchTab({
              url: `/pages/index/index`
            })
          }else{
            wx.switchTab({
              url: '/pages/activity/activity'
            })
          }
        }
        else {
          this.getData(tempFilePaths, successUp, failUp, i, length, this.data.cID);
        }
      },
    })
  },
  //发布帖子
  save(e) {
    if (wx.getStorageSync('userInfo').orgNumber == 'visitor') return false;
    let successUp = 0, //成功个数
      failUp = 0, //失败个数
      length = this.data.tempFilePaths.length, //总共个数
      i = 0, //第几个
      data = e.detail.value;
      console.log(data);
    // console.log(data.signUserNames);
    let signUserNames = JSON.parse(data.signUserNames);
    let signUserNamesStr = '';
    signUserNames.map(item=>{
      signUserNamesStr += item.username+';'
    })
    data.signUserNames = signUserNamesStr;
    if (data.content.length<100){
      wx.showToast({
        title: '发布内容必须大于100字',
        icon: 'none'
      });
      return;
    }
    for (let i in data) {
      if (data[i] == '') {
        if (i == 'isPublic' || i == 'workID') {
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
    if (length == 0) {
      wx.showToast({
        title: '请必须上传图片',
        icon: 'none'
      });
      return;
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
  // 通过url地址截取参数
  resetUrl(url) {
    let i = url.indexOf('?') + 1;
    let str = url.substring(i);
    let arr = str.split('&');
    let userinfo = {};
    arr.map(item => {
      let key = item.substring(0, item.indexOf('='));
      userinfo[key] = item.substring(item.indexOf('=') + 1);
    })
    return userinfo;
  },
  // 扫码签到
  sign() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        getApp().$ajax({
          httpUrl: getApp().api.actSignUrl,
          data: {
            userID: this.resetUrl(res.result).userID, // JSON.parse(res.result).userID
            cID: this.data.cID,
            signType:1
          }
        }).then(({ data, message }) => {
          this.setData({
            oldSignName: JSON.stringify(data.signNames),
            signNames: data.signNames,
            signCount: data.countSign
          })
          console.log(this.data.signNames)
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
  },
  //删除签到
  delSignName(e){
    console.log(e.currentTarget.dataset.idx)
    getApp().$ajax({
      httpUrl: getApp().api.actSignUrl,
      data: {
        userID: e.currentTarget.dataset.userid, // JSON.parse(res.result).userID
        cID: this.data.cID,
        signType: 0
      }
    }).then(({ data, message }) => {
      let signNames = this.data.signNames;
      signNames.splice(e.currentTarget.dataset.idx, 1);
      this.setData({
        oldSignName: JSON.stringify(signNames),
        signNames: signNames
      })
      console.log(this.data.oldSignName)
      wx.showToast({
        title: message,
        icon: 'none'
      })
    })
  }
})