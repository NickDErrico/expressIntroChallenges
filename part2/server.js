let express = require('express');
let app = express();
let port = process.env.PORT || 8000;
let fs = require('fs');

app.post('/create/:name/:age', function(req, res) {
  let nameAgeObj = {
    name: req.params.name,
    age: req.params.age
  }
  let currOutput = fs.readFileSync('./storage.json');
  currOutput += JSON.stringify(nameAgeObj);
  fs.writeFileSync('./storage.json', currOutput, function(err) {
    if (err) {
      throw err;
    }
  })
  res.send();
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/storage.json');
});

app.get('/:name', function(req, res) {
  let obj = fs.readFileSync('./storage.json', 'utf-8')
  let parseObj = JSON.parse(obj);

  function nameMatch(arr, name) {
    arr.filter((curr, item) => {
      return item.name == name ? item : curr
    }, res.sendStatus(400))[0]
  }
  res.send(nameMatch(parseObj, 'nick'))
  res.end()
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});