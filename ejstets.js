var ejs = require('ejs'),
    users = ['geddy', 'neil', 'alex'];

// 单个模板文件
var html = ejs.render('<?= users.join(" | "); ?>', {users: users},
    {delimiter: '?'});
// => 'geddy | neil | alex'
console.log(html);
// 全局
ejs.delimiter = '$';
ejs.render('<$= users.join(" | "); $>', {users: users});