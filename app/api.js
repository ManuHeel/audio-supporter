module.exports = function (app, pgPool) {
  /* Retrieve user information */
  app.get('/api/user/:userName', function (req, res) {
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
          res.json({})
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
          res.json({
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

  /* Autocomplete tag names */
  app.get('/api/autocomplete/:tag', function (req, res) {
    var tag = req.params.tag.toLowerCase()
    pgPool.connect(function (err, client, done) {
      if (err) {
        console.log('Error while connecting to the database :', err)
        res.status(500)
      }
      client.query('SELECT name, description FROM tag WHERE name LIKE \'%' + tag + '%\';', [], function (err, result) {
        done()
        if (err) {
          console.log('Error while autocompleting tag :', err)
          res.status(500)
          return
        }
        if (result.rowCount === 0) {
          res.json({})
        } else {
          var rawData = result.rows
          var data = []
          for (var i = 0; i < rawData.length; i++) {
            data[i] = {
              id: rawData[i].name,
              text: rawData[i].name,
              description: rawData[i].description
            }
          }
          res.json(data)
        }
      })
    })
  })
}
