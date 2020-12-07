const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  } else {
    return null;
  }
};

// Doesn't belong here but I think it will be useful
const changeForeignKeyName = (object, oldFKName, newFKName) => {
  object = object.toJSON();
  object[newFKName] = object[oldFKName];
  delete object[oldFKName];
  return object;
};

module.exports = getTokenFrom;
