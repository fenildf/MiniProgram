//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    longitude: 116.404185, // 中间点坐标
    latitude: 39.91491,
    markers: [],
    controls: [
      // {
      //   id: 0,
      //   iconPath: '/resources/icons/refresh.png',
      //   position: {
      //     left: 10,
      //     top: 80,
      //     width: 30,
      //     height: 30
      //   },
      //   clickable: true
      // }
    ],
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  onLoad: function () {
    var that = this;
    // 定位当前位置
    wx.getLocation({
      success: function (res) {
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
        })
      },
    })

    // 请求电站数据
    wx.request({
      url: 'https://www.mayew.com/chargingpileservice/api/stations',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log('request station info succeed.');
        if (res.statusCode == 200) {
          console.log(res.data);
          that.setData({
            markers: res.data.map((item, index) =>
              Object.assign({}, {
                id: item.id,
                longitude: item.longitude,
                latitude: item.latitude,
                callout: {
                  content: item.name,
                  display: 'BYCLICK',
                  textAlign: 'center',
                  bgColor: '#009fde',
                  color: '#fff',
                  padding: 5,
                  borderRadius: 2,
                }
              })),
          });
          console.log(that.data);
        }
      },
      fail: function (res) {
        console.log('request failed.')
        console.log(res);
      }
    })

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'EV堡--最好用的电动汽车充电APP',
      path: '/pages/index',
    }
  },

  controltap: function (e) {
    console.log('controltap')
  },
  markertap: function (e) {
    console.log('markertap')
  },
  regionchange: function (e) {
    console.log('regionchange');
  },

  scantap: function (e) {
    var that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: function (res) {
        console.log('scan succeed')
        /*var sn = res.result;
        var userId = '49a1384a-e0ae-4e17-ad13-f3c1bd9f6234';
        var cType = 0;
        wx.request({
          url: 'https://www.mayew.com/chargingpileservice/api/charging/start',
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          data: {
            sn,
            userId,
            cType
          },
          success: function(res) {
            console.log('request succeed.')
            if (res.statusCode == 200) {
              var result = res.data.result;
              if (result) {
                console.log('启动充电成功！')
              } else {
                console.log('启动充电失败！')
                console.log(res.data.message);
              }
            }
          },
          fail: function(res) {
            console.log('request failed.')
          },
          complete: function(res) {
            console.log(res);
          }
        })
        */
      },
      fail: function (res) {
        console.log('scan failed')
      },
      complete: function (res) {
        console.log('scan completed')
        console.log(res)
      }
    })
  },
  personaltap: function (e) {
    wx.navigateTo({
      url: '../me/me',
    })

    console.log('personal');
  }
})
