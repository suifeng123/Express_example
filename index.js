var express = require('express'); //首先将express引进来
var app = new express(); //创建一个类，
/*
在后序的时间中我会继续研究express的源码设计原理
 */ 
//console.log(express);
//禁用Express的x-Powered-By的头信息
app.disable('x-powered-by');
app.get('/',function(req,res){
	res.send('Hello World!!!');
});
//请求头的信息
app.get('/headers',function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers)
    	s += name + ':' + req.headers[name]+'\n';
    res.send(s);
});


var server = app.listen(3000,function(){
	//在回调函数中调用
//	console.log(server);
	var host = server.address().host;
	var port = server.address().port;


	console.log(`The app is listening at http://%s:%s`,host,port);
})