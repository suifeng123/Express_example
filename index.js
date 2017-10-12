var express = require('express'); //首先将express引进来
var app = new express(); //创建一个类，
/*
在后序的时间中我会继续研究express的源码设计原理
 */ 
//console.log(express);
//禁用Express的x-Powered-By的头信息
app.disable('x-powered-by');
app.get('/',function(req,res){
	res.send('Hello World!!!282231');
});
//请求头的信息
app.get('/headers',function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers)
    	s += name + ':' + req.headers[name]+'\n';
    res.send(s);
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
    	}
    })
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