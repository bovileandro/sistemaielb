//'use strict';

var path = require('path');
var fs = require('fs');
var ini = require('ini');

var Paroquia = require(path.join(process.cwd(),'./app/models/paroquia.js'));
var Pessoa = require(path.join(process.cwd(),'./app/models/pessoas.js'));
var Congregacao = require(path.join(process.cwd(),'./app/models/congregacao.js'));
var Departamento = require(path.join(process.cwd(),'./app/models/departamentos.js'));
var PlanoConta = require(path.join(process.cwd(),'./app/models/planocontas.js'));
var Evento = require(path.join(process.cwd(),'./app/models/eventos.js'));
var Oferta = require(path.join(process.cwd(),'./app/models/ofertas.js'));

var funcoesgerais = require(path.join(process.cwd(),'./app/funcoes/gerais.js'));

app.controller('pessoalistarCtrl', function($rootScope, $location)
{
	$rootScope.activetab = $location.path();
	$rootScope.pessoas = [];
	
	Pessoa.find(function (err, result) {
		if (err) return console.error(err);
		$rootScope.pessoas = result;
		$rootScope.$apply();
	});
});
app.controller('pessoacadastrarCtrl', function($scope, $location, $routeParams)
{
	$scope.activetab = $location.path();
		
	$scope.salvar = function(pessoa) {
		if (pessoa.id != undefined){
			Pessoa.findById(pessoa.id, function(err, model) {
				model.set(pessoa);
				model.save(function(err,savemodel){
					if(err) funcoesgerais.msgErro(err);	else location.href = '#pessoalistar';
				});
			});		
		} else {
			var newPessoa = new Pessoa(pessoa);
			newPessoa.save(function(err){
				if(err) funcoesgerais.msgErro(err); else location.href = '#pessoalistar';
			});
		}
	}
	
	var carregar = function(id) {
		Pessoa.findById(id, function(err, model) {
			$scope.pessoa = model;
			$scope.$apply();
		});
	}
	
	if ($routeParams.id != undefined){
		carregar($routeParams.id);
	}
});

app.controller('congregacaolistarCtrl', function($rootScope, $location)
{
	$rootScope.activetab = $location.path();
	$rootScope.congregacao = [];
	
	Congregacao.find(function (err, result) {
		if (err) return console.error(err);
		$rootScope.congregacao = result;
		$rootScope.$apply();
	});
});
app.controller('congregacaocadastrarCtrl', function($scope, $location, $routeParams)
{
	console.log($routeParams);
	$scope.activetab = $location.path();
		
	$scope.salvar = function(congregacao) {
		console.log('1');
		if (congregacao.id != undefined){
			console.log('2');
			Congregacao.findById(congregacao.id, function(err, model) {
				console.log('3');
				model.set(congregacao);
				model.save(function(err,savemodel){
					console.log('4');
					if(err) funcoesgerais.msgErro(err);	else location.href = '#congregacaolistar';
				});
			});		
		} else {
			console.log('5');
			var newCongregacao = new Congregacao(congregacao);
			newCongregacao.save(function(err){
				console.log('6');
				if(err) funcoesgerais.msgErro(err); else location.href = '#congregacaolistar';
			});
		}
	}
	
	var carregar = function(id) {
		Congregacao.findById(id, function(err, model) {
			$scope.congregacao = model;
			$scope.$apply();
		});
	}
	
	if ($routeParams.id != undefined){
		carregar($routeParams.id);
	}
});
app.controller('departamentoslistarCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});
app.controller('eventoslistarCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});
app.controller('planocontaslistarCtrl', function($scope, $location)
{
	$scope.activetab = $location.path();
	$scope.planocontas = [];
	
	PlanoConta.find(function (err, result) {
		if (err) return console.error(err);
		$scope.planocontas = result;
		$scope.$apply();
	});
});

app.controller('planocontascadastrarCtrl', function($scope, $location, $routeParams)
{
	$scope.activetab = $location.path();
		
	$scope.salvar = function(planoconta) {
		if (planoconta.id != undefined){
			PlanoConta.findById(planoconta.id, function(err, model) {
				model.set(planoconta);
				model.save(function(err,savemodel){
					if(err) console.log(err); else location.href = '#planocontaslistar';
				});
			});		
		} else {
			var newPlanoConta = new PlanoConta(planoconta);
			newPlanoConta.save(function(err){
				if(err) console.log(err); else location.href = '#planocontaslistar';
			});
		}
	}
	
	var carregar = function(id) {
		PlanoConta.findById(id, function(err, model) {
			$scope.planoconta = model;
			$scope.$apply();
		});
	}
	
	if ($routeParams.id != undefined){
		carregar($routeParams.id);
	}
});





app.controller('sobreCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
});
app.controller('importardadosCtrl', function($rootScope, $location)
{
	$rootScope.activetab = $location.path();
   
	$rootScope.importardados = function() { 
		var execFile = require('child_process').execFile, child;

		child = execFile('C:/Windows/System32/calc.exe',//substituir pelo executável que fará a importação... procurar por funcao q retorna o diretorio nos outros arquivos.. com require
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
	};
});

app.controller('ofertaslistarCtrl', function($scope, $location)
{
	$scope.activetab = $location.path();
	$scope.ofertas = [];
	
	Oferta.find(function (err, result) {
		if (err) return console.error(err);
		$scope.ofertas = result;
		$scope.$apply();
	})
	.populate('_pessoa', 'nome')
	.populate('_planocontas', 'descricao');
});

app.controller('ofertascadastrarCtrl', function($scope, $location, $routeParams)
{
	$scope.activetab = $location.path();
	
	$scope.pessoas = [];
	Pessoa.find(function (err, result) {
		if (err) return console.error(err);
		$scope.pessoas = result;
		$scope.$apply();
	});	
	
	$scope.planocontasss = [];
	PlanoConta.find(function (err, result) {
		if (err) return console.error(err);
		$scope.planocontasss = result;
		$scope.$apply();
	});	
	
	$scope.salvar = function(oferta) {
		console.log($scope.pessoas);
		console.log(oferta._pessoa);
		if (oferta.id != undefined){
			Oferta.findById(oferta.id, function(err, model) {
			    model.set(oferta);
				model.save(function(err,savemodel){
					if(err) console.log(err); else location.href = '#ofertaslistar';
				});
			});		
		} else {
			var newOferta = new Oferta(oferta);
			newOferta.save(function(err){
				if(err) console.log(err); else location.href = '#ofertaslistar';
			});
		}
	}
	
	var carregar = function(id) {
		Oferta.findById(id)
		.populate('_pessoa')
		.populate('_planocontas')
		.exec(function(err, model) {
			console.log('pessoas');
			console.log($scope.pessoas);		
		
			console.log('carregando ofertas');
			console.log(model);
			
			$scope.oferta = model;
			$scope.$apply();
		});		
	}
	
	if ($routeParams.id != undefined){
		carregar($routeParams.id);
	}
});


app.controller('configuracoesCtrl', function($scope, $location, $routeParams)
{
	$scope.activetab = $location.path();
	
	//var config = ini.parse(fs.readFileSync('./app/cfg/config.ini', 'utf-8'));
	var config = ini.parse(fs.readFileSync(path.dirname(process.execPath)+'/config.ini', 'utf-8'));
	$scope.config = {};
	
	console.log('chegou');
	$scope.salvar = function(model) {
		config.mongo.exe = model.exe;
		config.mongo.host = model.host;
		config.mongo.port = model.port;
		config.mongo.db = model.db;
	
		fs.writeFileSync(path.dirname(process.execPath)+'/config.ini', ini.stringify(config))
	};
	
	
	var carregar = function(){
		$scope.config.exe = config.mongo.exe;
		$scope.config.host = config.mongo.host;
		$scope.config.port = config.mongo.port;
		$scope.config.db = config.mongo.db;
		
		$scope.$apply();
	};

	carregar();
});

app.controller('paroquiacadastrarCtrl', function($scope, $location, $routeParams)
{
	$scope.activetab = $location.path();
		
	$scope.salvar = function(paroquia) {
		console.log('começou salvar');
		Paroquia.find(function(err, model) {
				console.log(model);
				console.log(model.length);
				console.log(paroquia);
				//if (model != undefined){
				if (model.length != 0) {
					model[0].set(paroquia);
					console.log(':/')
					model[0].save(function(err,savemodel){
						console.log(savemodel);
						if(err) funcoesgerais.msgErro(err);	else location.href = '#';
					});
				} else {
					var newParoquia = new Paroquia(paroquia);
					newParoquia.save(function(err){
						if(err) funcoesgerais.msgErro(err); else location.href = '#';
					});

				}
			});
	};
	
	var carregar = function() {
		Paroquia.find(function(err, model) {
			$scope.paroquia = model[0];
			$scope.$apply();
		});
	}
	
	carregar();
	
});
