'use strict';

var dialog = require('dialog'); //TODO: substituir por nw.gui

/*exports.contaObjetos = function(object) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};*/

exports.msgErro = function(object){
	var text = '';
	
	for (var i = 0; i < Object.keys(object.errors).length; i++) { 
		text += object.errors[Object.keys(object.errors)[i]].message + '\n\n';
    }
	
	dialog.info(text);
}