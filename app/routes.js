module.exports = function (app, pgPool) {
  /* Main page */
  app.get('/', function (req, res) {
    res.render('home')
  })

  /* Administration page */
  app.get('/admin', function (req, res) {
    // TODO authenticate the user if not, then authorize only if supporter
    res.render('admin')
  })

  /* Sound page */
  app.get('/sound/:soundId', function (req, res) {
    // TODO search for sounds in the DB
    var id = req.params.soundId
    var url = '/files/' + id + '.wav'
    var name = 'Test name'
    var author = 'Test author'
    var duration = 43
    var description = 'This is a very good description of a sound hosted on this server. This description is a potato of a potato from potatoland where potato gets some potato.'
    var tags = [
      'tag1',
      'tag2',
      'tag3',
      'tag4'
    ]
    var collections = [
      {
        id: '1',
        name: 'collection1'
      },
      {
        id: '2',
        name: 'collection2'
      },
      {
        id: '3',
        name: 'collection3'
      }
    ]
    res.render('sound', {
      id: id,
      name: name,
      author: author,
      duration: duration,
      description: description,
      url: url,
      tags: tags,
      collections: collections
    })
  })

  /* User page */
  app.get('/user/:userName', function (req, res) {
    var userName = req.params.userName

    pgPool.connect(function (err, client, done) {
      if (err) {
        console.log('Error while connecting to the database :', err)
        res.status(500)
      }
      client.query('SELECT full_name, description, is_supporter FROM "user" WHERE username = \'' + userName + '\';', [], function (err, result) {
        done()
        if (err) {
          console.log('Error while retrieving user :', err)
          res.status(500)
          return
        }
        if (result.rowCount === 0) {
          res.status(404)
          res.render('404')
        } else {
          var fullName = result.rows[0].full_name
          var description = result.rows[0].description
          var isSupporter = result.rows[0].is_supporter
          var collections = [
            {
              id: '1',
              name: 'collection1'
            },
            {
              id: '2',
              name: 'collection2'
            },
            {
              id: '3',
              name: 'collection3'
            }
          ]
          var sounds = [
            {
              id: '1',
              name: 'sound1'
            },
            {
              id: '2',
              name: 'sound2'
            },
            {
              id: '3',
              name: 'sound3'
            }
          ]
          res.render('user', {
            userName: userName,
            fullName: fullName,
            description: description,
            isSupporter: isSupporter,
            collections: collections,
            sounds: sounds
          })
        }
      })
    })
  })

  /* Collection page */
  app.get('/collection/:collectionId', function (req, res) {
    // TODO search for collections in the DB
    var id = req.params.collectionId
    var name = 'Test name'
    var author = 'Test author'
    var description = 'This is a very good description of a collection hosted on this server. This description is a potato of a potato from potatoland where potato gets some potato.'
    var tags = [
      'tag1',
      'tag2',
      'tag3',
      'tag4'
    ]
    var sounds = [
      {
        id: '1',
        name: 'sound1'
      },
      {
        id: '2',
        name: 'sound2'
      },
      {
        id: '3',
        name: 'sound3'
      }
    ]
    res.render('collection', {
      id: id,
      name: name,
      author: author,
      description: description,
      tags: tags,
      sounds: sounds
    })
  })

  /* Search page */
  app.get('/search', function (req, res) {
    // TODO search for files according to the tags and name
    var tags = req.body.tags
    var sounds = [
      {
        id: '1',
        name: 'sound1'
      },
      {
        id: '2',
        name: 'sound2'
      },
      {
        id: '3',
        name: 'sound3'
      }
    ]
    res.render('search', {
      sounds: sounds
    })
  })

  /* 404 fallback page */
  app.get('*', function (req, res) {
    res.status(404)
    res.render('404')
  })
}
