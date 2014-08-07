var _ = require('underscore');
var util = require('util');

var db;
var searchFields = ['ScoredUserID', 'GraderUserID', 'CourseID'];

function initialize(app, injectedDb)
{
  app.get('/scores/search', searchScores);
  db = injectedDb;
}

function getActions()
{
  return _.map(searchFields, function(searchField) {
    return {
      url: util.format('/scores/search?%s={0}', searchField),
      dataType:'number',
      name: 'Scores for ' + searchField,
      id:'scoresFor' + searchField
    };
  });
}

//Middleware to validate that ID that you pass in is actually numeric
function isNumeric(value)
{
  return value.match(/^[0-9]+$/);
}

function searchScores(req, res)
{
  var wheres = [];

  searchFields.forEach(function(searchField) {
    var value = req.query[searchField];
    if (value == null || !isNumeric(value)) {
      return;
    }
    wheres.push(util.format('%s = %d', searchField, value));
  });

  var sql = util.format('SELECT * FROM Grades %s %s',
                        wheres.length == 0 ? '' : 'WHERE',
                        wheres.join(' AND '));

  db.get(sql, function(err, rows)
  {
    if(err)
    {
      console.log(err);
      res.send(err);
      return;
    }

    if(rows)
    {
      res.json({result:rows});
      return;
    }

    res.json({result:null});
  });
}

//don't forget your module.exports
module.exports.init = initialize;
module.exports.getActions = getActions;