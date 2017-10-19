var express = require('express'); //首先将express引进来
var app = new express(); //创建一个类，
//将密匙引进来
var credentials = require('./credentials.js');
/*
在后序的时间中我会继续研究express的源码设计原理
 */ 
//console.log(express);
//禁用Express的x-Powered-By的头信息
app.disable('x-powered-by');
app.get('/',function(req,res){
	res.send('Hello World!!!282231');
});
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());
req.session.userName = "Anoymous";
var colorScheme = req.session.colorScheme || 'dark';
res.cookie('monster','nom nom');
res.cookie('signed_monster','nom nom',{singned:true});

app.use(function(req, res, next){
// 如果有即显消息，把它传到上下文中，然后清除它
res.locals.flash = req.session.flash;
delete req.session.flash;
next();
});



//获取cookie
var monster = req.cookie.monster;
var signedMonster = req.signedCookies.monster;
//请求头的信息
app.get('/headers',function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers)
    	s += name + ':' + req.headers[name]+'\n';
    res.send(s);
});

app.post('/newsletter', function(req, res){
var name = req.body.name || '', email = req.body.email || '';
// 输入验证
if(!email.match(VALID_EMAIL_REGEX)) {
if(req.xhr) return res.json({ error: 'Invalid name email address.' });
req.session.flash = {
type: 'danger',
intro: 'Validation error!',
message: 'The email address you entered was not valid.',
};
return res.redirect(303, '/newsletter/archive');
}
new NewsletterSignup({ name: name, email: email }).save(function(err){
if(err) {
if(req.xhr) return res.json({ error: 'Database error.' });
req.session.flash = {
type: 'danger',
intro: 'Database error!',
message: 'There was a database error; please try again later.',
}
return res.redirect(303, '/newsletter/archive');
}
if(req.xhr) return res.json({ success: true });
req.session.flash = {
type: 'success',
intro: 'Thank you!',
message: 'You have now been signed up for the newsletter.',
};
return res.redirect(303, '/newsletter/archive');
});
});
//写一个测试页 基本用法这个测试选项有点问题
app.get('/test',function(req,res){
	res.type('text/plain');
	res.send('this is a test');

});

//写一个错误页的测试选项
app.get('/error',function(req,res){
   res.status(500);
   res.render('error'); //这里的问题是没有提供view层的处理
});
//基本的表单处理
app.post('/process-contact',function(req,res){
	console.log('Received contact from '+req.body.name +
		'<'+req.body.email + '>');
	
    try{
        //保存到数据库
        return res.xhr ? res.sender({success:true}) : res.redirect(303,'/thank-you');
    }catch(ex){
    	return res.xhr ? res.json({error:'Database error.'}) : res.redirect(303,'/database-error');
    }
});
//提供一个API
var tours = [
    {id: 0,name:'Hood River',price:99.99},
    {id: 1,name:'Oregon Coast',price:149.99},
];

app.get('/api/tours',function(req,res){
    var toursxml = '<?xml version="1.0"?><tours>'+
                   products.map(function(p){
                   	  return '<tour price"'+ p.price +
                   	  '"id="' + p.id +'">' + p.name+'</tour>';
                   }).join('')+'</tours>';
    var toursText = tours.map(function(p){
    	return p.id + ":"+ p.name + "(" + p.price + ')';
    }).join('\n');

    res.format({
    	'application/json': function(){
    		res.json(tours);
    	},
    	'application/xml': function(){
    		res.type('application/xml');
    		res.send(toursxml);
    	},
    	'text/xml': function(){
    		res.type('text/xml');
    		res.send(toursxml);
    	},
    	'text/plain': () =>{
    		res.type('text/plain');
    		res.send(toursxml);
    	}
    });
});









app.get('/about',function(req,res){
	res.render('about');
})


var server = app.listen(3000,function(){
	//在回调函数中调用
//	console.log(server);
	var host = server.address().host;
	var port = server.address().port;


	console.log(`The app is listening at http://%s:%s`,host,port);
})