module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('home')
  })

  app.get('/admin', function (req, res) {
    res.render('admin')
  })

  app.get('/sound/:soundId', function (req, res) {
    var soundId = req.params.soundId
    var soundName = 'Test name'
    var soundAuthor = 'Test author'
    var soundDuration = 0
    var soundDescription = 'This is a very good description of a sound hosted on this server. This description is a potato of a potato from potatoland where potato gets some potato.'
    var soundTags = [
      'tag1',
      'tag2',
      'tag3',
      'tag4'
    ]
    var soundCollections = [
      'collection1',
      'collection2',
      'collection3',
      'collection4'
    ]
    res.render('sound', {
      soundId: soundId,
      soundName: soundName,
      soundAuthor: soundAuthor,
      soundDuration: soundDuration,
      soundDescription: soundDescription,
      soundTags: soundTags,
      soundCollections: soundCollections
    })
  })

  app.get('*', function (req, res) {
    res.status(404)
    res.render('404')
  })
}
