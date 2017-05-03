module.exports = {
  list,
  read,
};

/* Given a list of projects, create a table */
function list(cars){
  var table = $('<table>').addClass('table');
  var head = $('<tr>').append('<th>Name</th>').appendTo(table);
  cars.forEach(function(car) {
    var row = $('<tr>').append(
      $('<td>').text(cars.name)
    ).appendTo(table);
  });
  return table;
}

function read(id) {
	var table = $('<table>').addClass('table');
  var head = $('<tr>').append('<th>Name of the car</th>').appendTo(table);
  cars.forEach(function(car) {
    var row = $('<tr>').append(
      $('<td>').text(cars.name)
    ).appendTo(table);
  });
  return table;
}

