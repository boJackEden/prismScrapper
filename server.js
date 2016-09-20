var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/scrapper.html'));
});

app.get('/scrape', function(req, res) {
    url = 'http://prism.com/about';
    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var createArr = function (elements1, elements2) {
              var arr = [];
              for(var i=0; i<elements1.length; i++){
                var person = {
                  name: $(elements1[i]).text(),
                  title: $(elements2[i]).text()
                };
                arr.push(person);
              }
              return arr;
            };
            var data = {
              people: createArr($('.img-container li .bold'), $('.img-container li .lead'))
            };
            res.send(data);
            res.end();
        }
    });
});


var port = Number(process.env.PORT || 3000);

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
