'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var planocontasSchema = new Schema({
   descricao:String
});

module.exports = mongoose.model('planocontas', planocontasSchema);