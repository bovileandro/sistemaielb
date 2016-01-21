'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('congregacao', congregacaoSchema);