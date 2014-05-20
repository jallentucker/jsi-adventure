module.exports = {};

var addDoorCount = function(room) {
  var doors = 0;
  for(var prop in room) {
    if((prop === 'east' || prop === 'north' ||
       prop === 'south' || prop === 'west') && 
       room[prop]) {
      doors++;
    }
  }

  room.doorCount = doors;
  return room;
};

module.exports.init = function(maze) {
	var roomWithDoorCount = {};
  maze.rooms.forEach(function(room) {
		if(room.entrance) {
      roomWithDoorCount = addDoorCount(room);
		}
	});
  return roomWithDoorCount;
};

module.exports.nextRoom = function(currentRoom, direction, maze) {
  var newRoomLetter = currentRoom[direction];
  var newRoom = {};

  maze.rooms.forEach(function(room) {
    if(room.name === newRoomLetter) {
      newRoom = room;
      addDoorCount(newRoom);
    }
  });
  return newRoom;
};