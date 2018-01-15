const app = getApp();

Page({
    data: {
        note: {}
    },
    onLoad: function(options) {
        const _this = this;
        const id = options.id;
        // const id = 43924026;
        const url = app.globalData.doubanBase + app.globalData.book + 'annotation/' + id;
        
        wx.request({
            url: url,
            method: 'GET',
            header: {'content-type': 'json'},
            success: function(res) {
                const data = res.data;
                let contentData = data.content;
                if(contentData.includes('blocks')) {
                    const contentObj = JSON.parse(contentData);
                    contentData = contentObj.blocks[0].text;
                }
                
                _this.setData({
                    note: {
                        id: data.id,
                        page_no: data.page_no,
                        author_user: data.author_user,
                        time: data.time,
                        content: contentData
                    }
                })
            }

        })
    }
})