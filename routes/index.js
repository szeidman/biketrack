const bodyParser = require('body-parser');
const request = require('request');
var express = require('express');
var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

/* GET home page. */
router.get('/', function(req, res, next) {
  let url = 'https://feeds.citibikenyc.com/stations/stations.json';
  request(url, function (err, response, body){
    if(err){
      res.render('index', {brokenSummary: null, error: 'Error loading station info'})
    } else {
      let data = JSON.parse(body)
      let stationList = data.stationBeanList
      let broken = stationList.sort((a, b) => (b.totalDocks - b.availableBikes - b.availableDocks) - (a.totalDocks - a.availableBikes - a.availableDocks))
      let tenMostBroken = broken.slice(0, 10)
      let brokenSummary = tenMostBroken.map(s => {
        let brokeTotal = s.totalDocks - s.availableBikes - s.availableDocks;
        return {
          stationName: s.stationName,
          brokeTotal: brokeTotal,
          totalDocks: s.totalDocks,
          availableBikes: s.availableBikes,
          availableDocks: s.availableDocks
        }
      })
      res.render('index', { brokenSummary: brokenSummary });
    }
  })
});

router.post('/', function (req, res) {
  let station = req.body.station;
  let url = 'https://feeds.citibikenyc.com/stations/stations.json';
  request(url, function (err, response, body) {
    if (err) {
      res.render('index', {station: null, error: 'Error!'})
    } else {
      let stats = JSON.parse(body)
      let stationList = stats.stationBeanList
      let selectedStation = stationList.find(e => e.id == station);
      let mostBroken = stationList.sort((a, b) => (b.totalDocks - b.availableBikes - b.availableDocks) - (a.totalDocks - a.availableBikes - a.availableDocks))
      let tenMostBroken = mostBroken.slice(0, 10)
      res.render('index', {station: selectedStation});
    }
  })

})

module.exports = router;
