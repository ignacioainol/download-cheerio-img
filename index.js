const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const request = require('request');

var itemsOk = [];
var images = [];

var download = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

axios.get('https://store.intcomex.com/es-XCL/Products/Brands')
    .then(response => {
        const $ = cheerio.load(response.data);
        const items = $('.details-content .thumbnail .brands').toArray()
            .map((item, index) => {

                const $item = $(item);
                download('https://store.intcomex.com' + $item.find('img').attr('src'), 'image' + index + '.jpg', function () {
                    console.log("done");
                });
            })
    })
