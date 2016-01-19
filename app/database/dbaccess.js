// variables for database table maintenance
var exports = module.exports = {};

exports.DB_REAL = "REAL";
exports.DB_INTEGER = "INTEGER";
exports.DB_BLOB = "BLOB";
exports.DB_TEXT = "TEXT";
exports.DB_FLOAT = "FLOAT";
exports.DB_NUMERIC = "NUMERIC";

function Left(str, n) {
    // return a left part of a string
    var s = str + '';
    var iLen = s.length;
    if (n <= 0) {
        return "";
        } else if (n >= iLen) {
        return str;
        } else {
        return s.substr(0, n);
    }
}

function Len(str) {
    // return the length of a string
    if (typeof (str) === 'object') {
        return str.length;
    }
    str += '';
    return str.length;
}
//function SqlOpenDb(shortName, version, displayName, maxSize) {
exports.SqlOpenDb = function (shortName, version, displayName, maxSize) {

    // code to open the database and returns a variable, one can open different
    // databases, database size is 1MB, increase dbsize to <= 5
    var db, dbsize = 1;
    try {
        if (!window.openDatabase) {
            return 0;
            } else {
            if (typeof (shortName) === 'undefined') {
                return 0;
            }
            if (typeof (version) === 'undefined') version = "";
            if (typeof (displayName) === 'undefined') displayName = shortName;
            if (typeof (maxSize) === 'undefined') maxSize = dbsize * (1024 * 1024);
            db = openDatabase(shortName, version, displayName, maxSize);
        }
        } catch (e) {
        return 0;
    }
    return db;
}
//var db = SqlOpenDb("AddressBook");

//function SqlCreateTable(db, TableName, FieldsAndTypes, PrimaryKey, AutoIncrement) {
exports.SqlCreateTable = function(db, TableName, FieldsAndTypes, PrimaryKey, AutoIncrement) {
    // code to create a table in the websql database
    // fieldsandtypes is a json object
    // autoincrement is the field name to autoincrement
    var sb = "(";
    for (item in FieldsAndTypes) {
        sb += "[" + item + "] " + FieldsAndTypes[item];
        if (item == PrimaryKey) {
            sb += " NOT NULL PRIMARY KEY";
        }
        if (item == AutoIncrement) {
            sb += " AUTOINCREMENT";
        }
        sb += ", ";
    }
    sb = Left(sb, (Len(sb) - 2));
    sb += ")";
    sb = "CREATE TABLE IF NOT EXISTS [" + TableName + "] " + sb + ";";
    return Execute(db, sb);
}
//var FT = {};
//FT.FullName = DB_TEXT;
//FT.MobileNumber = DB_NUMERIC;
//SqlCreateTable(db, "Contacts", FT, "FullName", "");

function SqlInsertRecord(db, tblName, tblRecord) {
    // code to insert a record into the database
    // fields are passed as parameters
    var qry, flds = "", vals = "", avals = [];
    for (var key in tblRecord) {
        flds += "[" + key + "],";
        vals += "?,";
        avals.push(tblRecord[key]);
    }
    flds = Left(flds, Len(flds) - 1);
    vals = Left(vals, Len(vals) - 1);
    qry = "INSERT INTO [" + tblName + "] (" + flds + ") VALUES (" + vals + ");";
    return Execute(db, qry, avals);
}
//var tblRec = {};
//tblRec.FullName = "Anele Mbanga";
//tblRec.MobileNumber = 123456789
//SqlInsertRecord(db, "Contacts", tblRec);

function SqlGetRecordWhere(db, tblName, tblWhere) {
    // code to get a record from database using a where clause
    // tblWhere should be objects
    var qry = "", vals = "", avals = [];
    for (item in tblWhere) {
        vals += "[" + item + "] = ? AND ";
        avals.push(tblWhere[item]);
    }
    vals = Left(vals, Len(vals) - 5);
    qry = "SELECT * FROM [" + tblName + "] WHERE " + vals + ";";
    return Execute(db, qry, avals);
}
//var rWhere = {};
//rWhere.FullName = "Anele Mbanga";
//SqlGetRecordWhere(db, "Contacts", rWhere);



function SqlGetRecords(db, TableName, PrimaryKey) {
    // return all records from a table ordered by primary key
    var qry = "SELECT * FROM [" + TableName + "] ORDER BY [" + PrimaryKey +"]";
    return Execute(db, qry);
};
//SqlGetRecords(db, "Contacts", "FullName");

function SqlUpdateRecordWhere(db, tblName, tblRecord, tblWhere) {
    // code to update a record on a database
    // tblRecord and tblWhere should be objects
    var qry = "", vals = "", wvals = "", avals = [];
    for (item in tblRecord) {
        vals += "[" + item + "] = ?,";
        avals.push(tblRecord[item]);
    }
    for (item in tblWhere) {
        wvals += "[" + item + "] = ? AND ";
        avals.push(tblWhere[item]);
    }
    vals = Left(vals, Len(vals) - 1);
    wvals = Left(wvals, Len(wvals) - 5);
    qry = "UPDATE [" + tblName + "] SET " + vals + " WHERE " + wvals + ";";
    return Execute(db, qry, avals);
}
//var rM = {}, rW = {};
//rM.MobileNumber = 98765432
//rW.FullName = "Anele Mbanga";
//SqlUpdateRecordWhere(db, "Contacts", rM, rW);

function SqlDeleteRecordWhere(db, tblName, tblWhere) {
    // delete a record from a table using a where clause
    // pass the where fields as parameters
    var qry, wvals = "", avals = [];
    for (item in tblWhere) {
        wvals += "[" + item + "] = ? AND ";
        avals.push(tblWhere[item]);
    }
    // remove last ' AND '
    wvals = Left(wvals, Len(wvals) - 5);
    qry = "DELETE FROM [" + tblName + "] WHERE " + wvals + ";";
    return Execute(db, qry, avals);
};

//var dR = {};
//dR.FullName = "Anele Mbanga";
//SqlDeleteRecordWhere(db, "Contacts", dR);

function SqlGetDistinctField(db, TableName, FldName) {
    // return distinct records from a table
    var qry = "SELECT DISTINCT [" + FldName + "] FROM [" + TableName + "] ORDER BY [" + FldName +"]";
    return Execute(db, qry);
};

espera = function(funcao){
	return funcao;
};

function Execute(db, qry, args){
    // execute a query against the database using defer
    if (typeof (args) === 'undefined') args = [];
	
/*    var deferred = q.pending();
    deferred.resolve(db.transaction(function (tx) {
		tx.executeSql(qry, args, successWrapper(d), failureWrapper(d));
	}));
    return deferred.promise;	*/
	
   //return $.Deferred(function (d) {
        //db.transaction(function (tx) {
            //tx.executeSql(qry, args, successWrapper(d), failureWrapper(d));
        //});
    //});
	return espera(function (d) {
        db.transaction(function (tx) {
            tx.executeSql(qry, args, successWrapper(d), failureWrapper(d));
        });
    });	
};
/*The execute method gets passed the database object, the query string we want to execute and 
then an array that has the arguements that we want to process. This returns a JQuery Deferred 
object that is then processed with successWrapper and failureWrapper when our operation is successful or fails respecively.*/
function successWrapper(d) {
    // when sql query succeeds
    return (function (tx, data) {
        d.resolve(data) 
    })
};

function failureWrapper(d) {
    // when sql query fails
    return (function (tx, error) {
        d.reject(error)
    })
};

function ResultSetToJSON(results, PrimaryKey) {
    // process data returned by successWrapper;
    // return it as a json object using primary key as key
    var Records = {};
    var len = results.rows.length - 1, priKey, i, row;
    // loop through each row
    for (i = 0; i <= len; i++) {
        // get the row
        row = results.rows.item(i);
        // get the primary key
        priKey = row[PrimaryKey];
        // cleanse the primary key
        priKey = priKey.split(' ').join('-');
        // set row to object using primary key
        Records[priKey] = row;
    }
    return Records;
}

//var exports = module.exports = {SqlOpenDb};