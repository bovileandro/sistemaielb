'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventosSchema = new Schema({
   descricao:String
});

module.exports = mongoose.model('eventos', eventosSchema);