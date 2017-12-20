/*global
	require, __dirname
 */

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.resolve(__dirname, './public')))
app.use('/dist/', express.static(path.resolve(__dirname, '../dist')));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

var port = 80;

app.listen(port, function () {
	console.log('Example app listening on port ' + port + '!');
})