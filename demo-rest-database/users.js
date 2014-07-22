var db;

function initialize(app, injectedDb)
{
    //Order matters!
    app.get('/users/faculty', getFacultyUsers); // users/faculty routes to getFacultyUsers
    app.get('/users/:id', checkNumeric, getUserById); // users/___ routes to getUserById
    app.get('/users/search/:username', getUserByUsername);
    app.post('/users/', getUser);

    db = injectedDb;

    //set up actions
    var actions = app.get('actions');
    actions.push({route:'/users/{0}', dataType:['int'], name:'Get User By ID'});
    actions.push({route:'/users/search/{0}', dataType:['string'], name:'Search for User by Username'});
    actions.push({route:'/users/faculty', dataType:null, name:'Get Faculty Users'});
    app.set('actions');
}

function checkNumeric(req, res, next)
{
    if(req.params.id.match(/^[0-9]+$/))
    {
        next();
        return;
    }

    res.json({err: 'You must specify a numeric ID'});
}

function getUserById(req, res)
{
    var id = req.params.id;

    db.get("SELECT * FROM Users WHERE UserID = ?", id, function(err, row)
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

function getUserByUsername(req, res)
{
    var usernameSearch = '%' + req.params.username + '%';
    db.all("SELECT * FROM Users WHERE Username LIKE ?", usernameSearch, function(err, rows)
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

function getFacultyUsers(req, res)
{
    var id = req.params.id;
    db.all("SELECT * FROM Users WHERE IsFaculty = 1", id, function(err, rows)
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

module.exports = initialize;