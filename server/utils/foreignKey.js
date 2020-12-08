// This is here because of the naming collision stuff that happens
// with foreign keys/relationships.
const changeForeignKeyName = (object, oldFKName, newFKName) => {
  object[newFKName] = object[oldFKName];
  delete object[oldFKName];
  return object;
};

module.exports = changeForeignKeyName;
