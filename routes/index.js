const bodyParser = require('body-parser');
const request = require('request');
var express = require('express');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Biketrack' });
});

router.post('/', function (req, res) {
  let station = req.body.station;
  let url = 'https://feeds.citibikenyc.com/stations/stations.json';
  request(url, function (err, response, body) {
    if (err) {
      res.render('index', {station: null, error: 'Error!'})
    } else {
      let stats = JSON.parse(body)
      let stationlist = stats.stationBeanList
      let selectedStation = stationlist.find(e => e.id == station);
    }
  })
  res.render('index');
})

module.exports = router;
