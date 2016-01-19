// Retrieve
//var MongoClient = require('mongodb').MongoClient;

var app = angular.module('app',['ngRoute']);
//require('./teste.js');
//path = require('path');
//var cc = require(path.join(process.cwd(),"./app/teste.js"));



 
app.config(function($routeProvider, $locationProvider)
{
   // remove o # da url
   //$locationProvider.html5Mode(true);
   
   $routeProvider
   .when('/pessoalistar', {
      templateUrl : 'app/views/pessoalistar.html',
      controller  : 'pessoalistarCtrl'
   })       
   .when('/pessoacadastrar', {
      templateUrl : 'app/views/pessoacadastrar.html',
      controller  : 'pessoacadastrarCtrl'
   })    
   .when('/pessoacadastrar/:id', {
      templateUrl : 'app/views/pessoacadastrar.html',
      controller  : 'pessoacadastrarCtrl'
   })       
   .when('/ofertaslistar', {
      templateUrl : 'app/views/ofertaslistar.html',
      controller  : 'ofertaslistarCtrl'
   })       
   .when('/ofertascadastrar', {
      templateUrl : 'app/views/ofertascadastrar.html',
      controller  : 'ofertascadastrarCtrl'
   })    
   .when('/ofertascadastrar/:id', {
      templateUrl : 'app/views/ofertascadastrar.html',
      controller  : 'ofertascadastrarCtrl'
   })       
   
   
   
   
	.when('/congregacaolistar', {
      templateUrl : 'app/views/congregacaolistar.html',
      controller  : 'congregacaolistarCtrl'
   })            
   .when('/congregacaocadastrar', {
      templateUrl : 'app/views/congregacaocadastrar.html',
      controller  : 'congregacaocadastrarCtrl'
   })      
   
   .when('/departamentoslistar', {
      templateUrl : 'app/views/departamentoslistar.html',
      controller  : 'departamentoslistarCtrl'
   })      
   .when('/departamentoscadastrar', {
      templateUrl : 'app/views/departamentoscadastrar.html',
      controller  : 'departamentoscadastrarCtrl'
   })         
   .when('/eventoslistar', {
      templateUrl : 'app/views/eventoslistar.html',
      controller  : 'eventoslistarCtrl'
   })         
   .when('/eventoscadastrar', {
      templateUrl : 'app/views/eventoscadastrar.html',
      controller  : 'eventoscadastrarCtrl'
   })            
	.when('/planocontaslistar', {
      templateUrl : 'app/views/planocontaslistar.html',
      controller  : 'planocontaslistarCtrl'
   })            
	.when('/planocontascadastrar', {
      templateUrl : 'app/views/planocontascadastrar.html',
      controller  : 'planocontascadastrarCtrl'
   })
	.when('/planocontascadastrar/:id', {
      templateUrl : 'app/views/planocontascadastrar.html',
      controller  : 'planocontascadastrarCtrl'
   })   
	.when('/sobre', {
      templateUrl : 'app/views/sobre.html',
      controller  : 'sobreCtrl'
   })                  
	.when('/importardados', {
      templateUrl : 'app/views/importardados.html',
      controller  : 'importardadosCtrl'
   })                     
   .otherwise ({ redirectTo: '/' });
   
//console.log($routeProvider.templateUrl);
	  //console.log($locationProvider);   
});