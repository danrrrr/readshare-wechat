const app = getApp();

Page({
    data: {
        imgUrls: [],
        navBars: [
          {nav: '我关注的', url: '../focus/index'},
          {nav: '排行榜', url:'../focus/index'},
          {nav: '写作', url: '../write/index'},
          {nav: '消息', url: '../message/index'},
          {nav: '我的', url: '../user/index'}
        ],
        x: 0,
        y: 0,
    },
    onLoad: function() {
      const _this = this;
      const imgArr = ['1084336', '27010212', '25862578'];
      const baseUrl = app.globalData.doubanBase + app.globalData.book;
      imgArr.forEach(ele => {
        const url = baseUrl + ele;
        wx.request({
          url: url,
          method: 'GET',
          header: {'content-type': 'json'},
          success: function(res) {
            const data = res.data.image;
            const arr = _this.data.imgUrls;
            arr.push({url: data, id: ele})
            _this.setData({
              imgUrls:  arr
            })
          }
        })
      })
    },
    toNavbarLink: function(e) {

    },
    tap: function(e) {
      this.setData({
        x: 30,
        y: 30
      });
    },
    goToSearch: function() {
      wx.navigateTo({
        url: '../search/index'
      })
    },
    goToBookDetail: function(e) {
      const id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../book_detail/index?id=' + id
      })
    }
})