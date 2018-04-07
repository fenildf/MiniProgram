//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
<<<<<<< HEAD
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    longitude: 116.404185, // 中间点坐标
    latitude: 39.91491,
    markers: [
      {
        id: 0,
        latitude: 39.91491,
        longitude: 116.404185,
      }
    ],
    controls: [
      {
        id: 0,
        iconPath: '/resources/icons/refresh.png',
        position: {
          left: 10,
          top: 500 - 80,
          width: 30,
          height: 30
        },
        clickable: true
      },
      {
      id: 1,
      iconPath: '/resources/icons/location.png',
      position: {
        left: 10,
        top: 500-30,
        width: 30,
        height: 30
      },
      clickable: true
    }]
=======
    canIUse: wx.canIUse('button.open-type.getUserInfo')
>>>>>>> 0f43eebf3e2b277b29395779dc02a264a5dad86a
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function() {
    return {
      title: '自定义标题',
      path: '/pages/index',
    }
<<<<<<< HEAD
  },

  controltap: function(e) {
    console.log('controltap')
  },
  markertap: function(e) {
    console.log('markertap')
  },
  regionchange: function(e) {
    console.log('regionchange');
  },

  scantap: function(e) {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: function() {
        console.log('scan success')
      },
      fail: function() {
        console.log('scan fail')
      },
      complete: function() {
        console.log('scan complete')
      }
    })
  },
  personaltap: function(e) {
    wx.navigateTo({
      url: '../me/me',
    })
=======
>>>>>>> 0f43eebf3e2b277b29395779dc02a264a5dad86a
  }
})
