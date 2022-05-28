var express = require('express');
var cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer({ dest: "./public/files"});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
}))
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {

  let name = req.file.originalname;
  let type = req.file.mimetype;
  let size = req.file.size;

 let returnObj = { name, type, size};

res.json(returnObj);
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
