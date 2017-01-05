const express   = require('express');
const morgan    = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('listening on 3000')
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});
