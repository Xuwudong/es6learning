var express = require('express');
var api = require('./routes/api');
var path = require('path');

// var route = require("routes");
var hbs = require('hbs');
var blog = require('./blog')
var app = express();
var bodyParser = express('bodyParser');
// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 3000);

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

//run hbs
// app.engine('html', hbs.__express);

// app.use(bodyParser());

app.use(express.static(path.join(__dirname, 'public')));


var v1 = express.Router();
v1.get('/', function (req, res,next){
    console.log("test");
    res.render('index',{ title: " 最近文章 " ,entries:blog.getBlogEntries()});
});


var v2 = express.Router();
v2.get('/', function (req, res){
    console.log("about");
    res.render('about',{ title: " 最近文章 " ,entries:blog.getBlogEntries()});
});

app.use(v2,v1);

/*
app.get('/about', function(req, res) {
    res.render('about',{ title: "自我介绍"} );
});

app.get('/article/:id', function(req, res) {
    var entry = blog.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});

app.get('/api',api.index);
*/


app.listen(app.get('port'));
