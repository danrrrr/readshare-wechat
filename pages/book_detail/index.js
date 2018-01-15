const app = getApp();

Page({
    data: {
        result: {},
        notes: {},
        showAll: false,
        stars: []
    },
    onLoad: function (options) {
        const _this = this;
        const id = options.id;
        // const id = 27010212;
        const bookUrl = app.globalData.doubanBase + app.globalData.book + id;
        const notesUrl = app.globalData.doubanBase + app.globalData.book + id + '/annotations';
        
        const notesArr = [];
        wx.request({
            url: bookUrl,
            method: 'GET',
            header: { 'content-type': 'json' },
            success: function (res) {
                const data = res.data;
                const ratingAverage = data.rating.average;
                _this.setData({
                    stars: _this.starCount(ratingAverage)
                })
                _this.setData({
                    result: {
                        id: data.id,
                        title: data.title,
                        author: data.author,
                        publisher: data.publisher,
                        pubdate: data.pubdate,
                        rating: ratingAverage,
                        ratingPeople: data.rating.numRaters,
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
                    const time = note.time.split(' ')[0];
                    const temp = {
                        id: note.id,
                        abstract: note.abstract,
                        author_user: note.author_user,
                        page_no: note.page_no,
                        time: time
                    }
                    notesArr.push(temp);
                }
                _this.setData({
                    notes: {subjects: notesArr}
                })
            }
        });

    },
    starCount: function(ratingStar) {
        ratingStar = Number(ratingStar);
        const stars = [];
        let i = 0;

        do{
            if(ratingStar >= 2) {
                stars[i] = 'full';
            }else if(ratingStar >= 1) {
                stars[i] = 'half';
            }else {
                stars[i] = 'no';
            }
            ratingStar -= 2;
            i++;
        }while(i < 5)
        return stars;
    },
    showAllSummary: function() {
        this.setData({
            showAll: !this.data.showAll
        })
    },
    gotToNoteDetail: function(e) {
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../note_detail/index?id=' + id
        })
    }
})