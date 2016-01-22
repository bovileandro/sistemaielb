//'use strict';

var path = require('path');

var Pessoa = require(path.join(process.cwd(),'./app/models/pessoas.js'));
var Congregacao = require(path.join(process.cwd(),'./app/models/congregacao.js'));
var Departamento = require(path.join(process.cwd(),'./app/models/departamentos.js'));
var PlanoConta = require(path.join(process.cwd(),'./app/models/planocontas.js'));
var Evento = require(path.join(process.cwd(),'./app/models/eventos.js'));
var Oferta = require(path.join(process.cwd(),'./app/models/ofertas.js'));

var funcoesgerais = require(path.join(process.cwd(),'./app/funcoes/gerais.js'));

app.controller('pessoalistarCtrl', function($scope, $location)
{
	$scope.activetab = $location.path();
	$scope.pessoas = [];
	
	Pessoa.find(function (err, result) {
		if (err) return console.error(err);
		$scope.pessoas = result;
		$scope.$apply();
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
   
	$rootScope.toggle = function() {
		console.log('clicou');
	};
});
app.controller('congregacaocadastrarCtrl', function($rootScope, $location)
{
   $rootScope.activetab = $location.path();
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
