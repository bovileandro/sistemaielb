'use strict';

var q = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/ielb');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('conectou');
});

var pessoasSchema = new Schema({
   nome:String,
   endereco:String,
   numero: String,
   bairro: String,
   complemento: String,
   cidade: String,
   cep: String,
   telefoneresidencial: String,
   telefonecelular: String,
   email: String,
   datanascimento: Date,
   databatismo: Date,
   dataconfirmacao: Date
});
var Pessoa = mongoose.model('pessoas', pessoasSchema);

var congregacaoSchema = new Schema({
   nome:String,
   endereco:String,
   numero: String,
   bairro: String,
   complemento: String,
   cidade: String,
   cep: String,
   telefone: String,
   telefonecelular: String,
   email: String
});
var Congregacao = mongoose.model('congregacao', congregacaoSchema);

var departamentosSchema = new Schema({
   nome:String
});
var Departamento = mongoose.model('departamentos', departamentosSchema);

var planocontasSchema = new Schema({
   descricao:String
});
var PlanoConta = mongoose.model('planocontas', planocontasSchema);

var eventosSchema = new Schema({
   descricao:String
});
var Evento = mongoose.model('eventos', eventosSchema);

var ofertasSchema = new Schema({
	data:Date,
	valor: Number,
//	_pessoa : { type: Schema.Types.ObjectId, ref: 'pessoas' },
	_pessoa : { type: Number, ref: 'pessoas' },
	_planocontas : { type: Schema.Types.ObjectId, ref: 'planocontas' }
});
var Oferta = mongoose.model('ofertas', ofertasSchema);

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
					if(err) console.log(err); else location.href = '#pessoalistar';
				});
			});		
		} else {
			var newPessoa = new Pessoa(pessoa);
			newPessoa.save(function(err){
				if(err) console.log(err); else location.href = '#pessoalistar';
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
