const app = getApp();

Page({
    data: {
        result: {},
        notes: {}
    },
    onLoad: function (options) {
        const _this = this;
        const id = options.id;
        const bookUrl = app.globalData.doubanBase + app.globalData.book + id;
        const notesUrl = app.globalData.doubanBase + app.globalData.book + id + '/annotations';
        const notesArr = [];
        wx.request({
            url: bookUrl,
            method: 'GET',
            header: { 'content-type': 'json' },
            success: function (res) {
                const data = res.data;
                _this.setData({
                    result: {
                        id: data.id,
                        title: data.title,
                        author: data.author,
                        publisher: data.publisher,
                        pubdate: data.pubdate,
                        summary: data.summary,
                        images: data.images,

                    }
                })
            }
        });
        wx.request({
            url: notesUrl,
            method: 'GET',
            header: { 'content-type': 'json' },
            success: function (res) {
                const notes = res.data;
                for(let idx in notes.annotations) {
                    const note = notes.annotations[idx];
                    const temp = {
                        abstract: note.abstract,
                        author_user: note.author_user,
                        page_no: note.page_no,
                        time: note.time
                    }
                    notesArr.push(temp);
                }
                _this.setData({
                    notes: {subjects: notesArr}
                })
            }
        })
    }
})