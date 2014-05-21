var mazeObject = {};

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
  var roomMapping = {};
  var arrCounter = 0;

  var roomWithDoorCount = {};
  mazeWithDoorCount.rooms.forEach(function(room) {
    roomWithDoorCount = addDoorCount(room);
    roomMapping[room.name] = arrCounter;
    arrCounter++; 
    if(room.entrance) {
      startRoom = room.name;
    }
    if(room.treasure) {
      endRoom = room.name;
    }
  });

  mazeObject = mazeWithDoorCount;
  mazeObject.startRoom = startRoom;
  mazeObject.endRoom = endRoom;
  mazeObject.roomPositions = roomMapping;
};

module.exports.start = function() {
  return mazeObject.rooms[mazeObject.roomPositions[mazeObject.startRoom]];
};

module.exports.nextRoom = function(currentRoom, direction) {
  var newRoomLetter = currentRoom[direction];
  var newRoom = mazeObject.rooms[mazeObject.roomPositions[newRoomLetter]];
  
  return newRoom;
};