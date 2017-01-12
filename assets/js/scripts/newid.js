let lastId = 0

module.exports = function(prefix='id') {
  lastId++
  return `${prefix}${lastId}`
}
