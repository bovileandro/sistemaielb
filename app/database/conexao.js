'use strict';

var fs = require('fs');
var ini = require('ini');
var path = require('path');  
var config = ini.parse(fs.readFileSync(path.dirname(process.execPath)+'/config.ini', 'utf-8'));

var execFile = require('child_process').execFile, child;
child = execFile(config.mongo.exe,
	function(error,stdout,stderr) { 
		if (error) {
			console.log(error.stack); 
			console.log('Error code: '+ error.code); 
			console.log('Signal received: '+ 
			error.signal);
		} 
		console.log('Child Process stdout: '+ stdout);
		console.log('Child Process stderr: '+ stderr);
	}); 
child.on('exit', function (code) { 
	console.log('Child process exited with exit code '+ code);
});
//child.stdout.on('data', function (data) { });

setTimeout(function(){
	var mongoose = require('mongoose');
	console.log('mongodb://'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.db);
	mongoose.connect('mongodb://'+config.mongo.host+':'+config.mongo.port+'/'+config.mongo.db);
	var db = mongoose.connection;
	
	db.on('error', console.error.bind(console, 'connection error:'));
	
	db.once('open', function() {
	console.log('conectou');
	});
	
	exports.mongoose = mongoose;
	exports.db = db;
},8000);