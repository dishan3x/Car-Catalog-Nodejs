/* Main entry point */

var car = require('./car');

$.get('/cars', function(cars){
  $('body').html(car.list(cars));
});
