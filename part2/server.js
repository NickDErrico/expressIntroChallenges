let express = require('express');
let app = express();
let port = process.env.PORT || 8000;
let fs = require('fs');

app.post('/create/:name/:age', function(req, res) {
  let nameAgeObj = {
    name: req.params.name,
    age: parseInt(req.params.age)
  }
  fs.readFile('./storage.json', 'utf-8', function(err, data) {
    let dataAsArr = JSON.parse(data);

    dataAsArr.push(nameAgeObj);
    fs.writeFile('./storage.json', JSON.stringify(dataAsArr), function(err) {
      res.sendStatus(200);
    });
  })
});

app.get('/', function(req, res) {
  fs.readFile('./storage.json', 'utf-8', function(err) {
    res.json(JSON.parse(data));
  })
});

app.get('/:name', function(req, res) {
  fs.readFile('./storage.json', 'utf-8', function(err) {
    let parsedData = JSON.parse(data);
    let matchedUser = parsedData.filter((item) => {
      return item.name == req.params.name;
    });

    if (matchedUser.length >= 1) {
      res.json(matchedUser[0]);
    } else {
      res.sendStatus(400);
    }
  })
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});