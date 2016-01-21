'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('pessoas', pessoasSchema);