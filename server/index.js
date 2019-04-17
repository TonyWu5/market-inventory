const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const { inventoryAllItems } = require('./database/countInventory.js');

app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(bodyParser.urlencoded());
app.get('/getInventory', (req, res) => {
  let date = req._parsedOriginalUrl.query;
  inventoryAllItems(date, (totalCount) => {
    res.send(totalCount.toString());
  });
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });
