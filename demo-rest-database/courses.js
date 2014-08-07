var db;

function initialize(app, injectedDb)
{
  //Order matters!
  app.get('/courses', getCourses); // courses/faculty routes to getFacultyCourses
  app.get('/courses/active', getCoursesActive);
  app.get('/courses/:id', checkNumeric, getCourseById); // courses/___ routes to getCourseById, checked first by checkNumeric

  db = injectedDb;

}

function getActions()
{
  //set up actions that will automatically turn into buttons
  var courseActions = [];
  courseActions.push({url:'/courses', dataType:null, name:'Get Courses', id:'getCourses'});
  courseActions.push({url:'/courses/active', dataType:null, name:'Get Active Courses', id:'getActiveCourses'});
  courseActions.push({url:'/courses/{0}', dataType:'number', name:'Get Course By ID', id:'searchCourseId'});

  return courseActions;
}

//Middleware to validate that ID that you pass in is actually numeric
function checkNumeric(req, res, next)
{
  //RegEx explanation:
  // ^: From the start of the line
  // [0-9]: there must be a character that is a digit 0-9
  // +: repeated one or more times
  // $: until the end of the line
  if(req.params.id.match(/^[0-9]+$/))
  {
    next();
    return;
  }

  res.json({err: 'You must specify a numeric ID'});
}

function getCourseById(req, res)
{
  var id = req.params.id;

  db.get("SELECT * FROM Courses WHERE CourseID = ?", id, function(err, row)
  {
    if(err)
    {
      console.log(err);
      res.send(err);
      return;
    }

    if(row)
    {
      res.json({result:row});
      return;
    }

    res.json({result:null});
  });
}

function getCoursesActive(req, res)
{
  db.all("SELECT * FROM Courses WHERE Active ", function(err, rows)
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

function getCourses(req, res)
{
  db.all("SELECT * FROM Courses", function(err, rows)
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