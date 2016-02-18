'use strict';

var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var extend = require('mongoose-validator').extend;
var Schema = mongoose.Schema;

var paroquiaSchema = new Schema({
   nome: {type: String, required:true}, //required: 'A name is required',
   endereco:String,
   numero: String,
   bairro: String,
   complemento: String,
   cidade: String,
   cep: String,
   telefoneresidencial: String,
   telefonecelular: String,
   email: String
});

paroquiaSchema.path('nome').validate(
  validate({
    validator: 'isLength',
    arguments: [1, 80],
    message: 'Nome inválido'
  })
);

module.exports = mongoose.model('paroquia', paroquiaSchema);