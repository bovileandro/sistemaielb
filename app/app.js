var path = require('path');
var database = require('./app/database/conexao.js');

var app = angular.module('app',['ngRoute']);
 
app.config(function($routeProvider, $locationProvider)
{
   // remove o # da url
   //$locationProvider.html5Mode(true);
   
   $routeProvider
   .when('/paroquiacadastrar', {
      templateUrl : 'app/views/paroquiacadastrar.html',
      controller  : 'paroquiacadastrarCtrl'
   })       
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
   .when('/congregacaolistar', {
      templateUrl : 'app/views/congregacaolistar.html',
      controller  : 'congregacaolistarCtrl'
   })            
   .when('/congregacaocadastrar', {
      templateUrl : 'app/views/congregacaocadastrar.html',
      controller  : 'congregacaocadastrarCtrl'
   })      
   .when('/congregacaocadastrar/:id', {
      templateUrl : 'app/views/congregacaocadastrar.html',
      controller  : 'congregacaocadastrarCtrl'
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
	.when('/configuracoes', {
      templateUrl : 'app/views/configuracoes.html',
      controller  : 'configuracoesCtrl'
   })                        
   .otherwise ({ redirectTo: '/' });
});