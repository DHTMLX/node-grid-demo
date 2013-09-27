var express = require('express');
var path = require('path');

var mysql      = require('mysql');
var db = mysql.createConnection({
  host     : '192.168.3.251',
  user     : 'sampleDB',
  password : 'sampleDB',
  database : 'sampleDB'
});


var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

app.get('/data', function(req, res){
	db.query("SELECT * FROM books", function(err, rows){
		if (err) console.log(err);
		
		res.send(rows);
	});
});


app.post('/data', function(req, res){
	var data = req.body;
	var mode = data["!nativeeditor_status"];
	var sid = data.gr_id;
	var tid = sid;

	var sales  = data.sales;
	var author = data.author;
	var title  = data.title;
	var price  = data.price;

	function update_response(err, result){
		if (err){
			console.log(err);
			mode = "error";
		}

		else if (mode == "inserted")
			tid = result.insertId;

		res.setHeader("Content-Type","text/xml");
		res.send("<data><action type='"+mode+"' sid='"+sid+"' tid='"+tid+"'/></data>");
	}

	if (mode == "updated")
		db.query("UPDATE books SET sales = ?, author = ?, title = ?, price = ? WHERE id = ?",
			[sales, author, title, price, sid],
			update_response);
	else if (mode == "inserted")
		db.query("INSERT INTO books(sales, author, title, price) VALUES (?,?,?,?)",
			[sales, author, title, price],
			update_response);
	else if (mode == "deleted")
		db.query("DELETE FROM books WHERE id = ?", [sid], update_response);
	else
		res.send("Not supported operation");
});

app.listen(3000);