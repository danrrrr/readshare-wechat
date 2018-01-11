const app = getApp();

Page({
  data: {
    result: {},
    searchValue: ''
  },
  searchInput: function(e) {
    let value = e.detail.value;
    this.handleSearchData(value);
  },
  handleSearchData: function(value) {
    const _this = this;
    const url = app.globalData.doubanBase + app.globalData.search + value + "&&start=0&&count=10";
    wx.request({
      url: url,
      method: 'GET',
      header: {'content-type': 'json'},
      success: function(res) {
        const data = res.data;
        _this.processSearchData(data);
      },
      fail: function() {
        //fail
      }
    })
  },
  processSearchData: function(res) {
    const results = [];
    for(let idx in res.books) {
      const book = res.books[idx];
      let temp = {
        id: book.id,
        title: book.title,
        author: book.author,
        image: book.image,
        pubdata: book.pubdata,
        publisher: book.publisher,
        rating: book.rating.average,
        summary: book.summary
      };
      results.push(temp);
    }
    this.setData({
      result: {subjects: results}
    });
    console.log(this.data.result);
  },
  backHome: function() {
    wx.navigateTo({
      url: '../home/index'
    })
    console.log('xxx');
  },
  goToBookDetail: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../bookdetail/index?id=' + id
    });
  }
})