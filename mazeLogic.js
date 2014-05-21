var _ = require('underscore');


var addDoorCount = function(room) {
  var doors = 0;
  
  if(room.east)  { doors++; }
  if(room.west)  { doors++; }
  if(room.north) { doors++; }
  if(room.south) { doors++; }

  room.doorCount = doors;
  return room;
};

module.exports.init = function(mazeFileName) {
	var mazeWithDoorCount = require(mazeFileName);
  var startRoom = '';
  var endRoom = '';

  var roomWithDoorCount = {};
  mazeWithDoorCount.rooms.forEach(function(room) {
    roomWithDoorCount = addDoorCount(room);
    if(room.entrance) {
      startRoom = room.name;
    }
    if(room.treasure) {
      endRoom = room.name;
    }
	});

  module.exports.maze = mazeWithDoorCount;
  module.exports.maze.startRoom = startRoom;
  module.exports.maze.endRoom = endRoom;
};

module.exports.start = function() {
  var startRoom = {};
  startRoom = _.find(exports.maze.rooms, function(obj) {
    return(obj.name === module.exports.maze.startRoom);
  });

  return startRoom;
};

module.exports.nextRoom = function(currentRoom, direction) {
  var newRoomLetter = currentRoom[direction];
  var newRoom = {};

  module.exports.maze.rooms.forEach(function(room) {
    if(room.name === newRoomLetter) {
      newRoom = room;
      addDoorCount(newRoom);
    }
  });

  if(_.isEmpty(newRoom)) {
    return undefined;
  } else {
    return newRoom;
  }
};