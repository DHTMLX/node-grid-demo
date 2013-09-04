var express = require('express');
var path = require('path');

var db = require('mongoskin').db("localhost/testdb", { w: 0});
    db.bind('books');


var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());


app.get('/init', function(req, res){
	db.books.insert({ 
		sales:  1200, 
		author: "Jon Duckett",
		title:  "HTML and CSS: Design and Build Websites",
		price:  "16.70"
	});
	db.books.insert({ 
		sales:  -800, 
		author: "Steve Krug",
		title:  "Don't Make Me Think",
		price:  "40.00"
	});
	db.books.insert({ 
		sales:  1200, 
		author: "Douglas Crockford",
		title:  "JavaScript: The Good Parts",
		price:  "15.50"
	});
	db.books.insert({ 
		sales:  1200, 
		author: "John Resig",
		title:  " Secrets of the JavaScript Ninja",
		price:  "23.99"
	});

	res.send("Test data was added to the database");
});


app.get('/data', function(req, res){
	db.books.find().toArray(function(err, data){
		//set id property for all records
		for (var i = 0; i < data.length; i++)
			data[i].id = data[i]._id;
		
		//output response
		res.send(data);
	});
});


app.post('/data', function(req, res){
	var data = req.body;
	var mode = data["!nativeeditor_status"];
	var sid = data.gr_id;
	var tid = sid;

	delete data.id;
	delete data.gr_id;
	delete data["!nativeeditor_status"];


	function update_response(err, result){
		if (err)
			mode = "error";
		else if (mode == "inserted")
			tid = data._id;

		res.setHeader("Content-Type","text/xml");
		res.send("<data><action type='"+mode+"' sid='"+sid+"' tid='"+tid+"'/></data>");
	}

	if (mode == "updated")
		db.books.updateById( sid, data, update_response);
	else if (mode == "inserted")
		db.books.insert(data, update_response);
	else if (mode == "deleted")
		db.books.removeById( sid, update_response);
	else
		res.send("Not supported operation");
});

app.listen(3000);