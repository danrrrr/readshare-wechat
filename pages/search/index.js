const app = getApp();
let historyArr = [];
Page({
  data: {
    result: {},
    searchValue: '',
    historyStorage: {},
    showHistory: true,
    showSearchResults: true,
    searchFocus: true
  },
  onLoad: function(){
    const storageHistory = wx.getStorageSync('historyStorage');
    if(storageHistory) {
      this.setData({
        historyStorage: {items: storageHistory}
      })
    }
  },
  searchInput: function(e) {
    let value = e.detail.value;
    if(historyArr.length >= 3) {
      historyArr.pop();
    }
    if(value && historyArr.indexOf(value) === -1) {
      historyArr.unshift(value);
    }
    wx.setStorageSync('historyStorage', historyArr);
    this.setData({
      searchValue: value,
      historyStorage: {items: historyArr}
    })
    console.log(this.data.historyStorage);
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
      result: {subjects: results},
      showHistory: false,
      showSearchResults: true

    });
  },
  backHome: function() {
    wx.navigateTo({
      url: '../home/index'
    })
  },
  goToBookDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../book_detail/index?id=' + id
    });
  },
  clearSearch: function() {
    this.setData({
      searchValue: '',
      showHistory: true,
      showSearchResults: false,
      searchFocus: true
    })
  },
  clearHistory: function() {
    historyArr = [];
    this.setData({
      historyStorage: {items: historyArr}
    });
    wx.setStorageSync('historyStorage');
  },
  setSearchInputValue: function(e) {
    this.setData({
      searchValue: e.currentTarget.dataset.value,
      searchFocus: true
    })
  },
  bindSearchInput: function() {
    this.setData({
      showHistory: false
    })
  }
})