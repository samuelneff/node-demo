var express = require('express');
var socketio = require('socket.io');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var logger = require('./lib/logger');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var GITHUB_CLIENT_ID = "";
var GITHUB_CLIENT_SECRET = "";

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://sambline.ngrok.com/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

var app = express();

app.use(logger);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride());
app.use(session({ secret: 'keyboard cat' }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req, res) {
  ensureAuthenticated(req, res, function() {
    res.sendfile('public/index.html');
  });
});

app.get('/index.html', function(req, res) {
  ensureAuthenticated(req, res, function(req, res) {
    res.sendfile('public/index.html');
  });
});

app.use(express.static('public'));

app.get('/login', function(req, res) {
  res.sendfile('public/login.html');
});
app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.use(ensureAuthenticated);

app.get('/poll/:id', function(req, res) {
	res.sendfile(__dirname + '/public/poll.html');
});


var server = app.listen(process.env.PORT || 3000, function() {
	console.log ("Server started at %d", server.address().port);
});


var io = socketio.listen(server);
io.on('connection', function(socket){

	console.log('client connected');
	socket.broadcast.emit('server ready', { 'okay' : 'ready' });

});

var pollsApi = require('./lib/polls')(io);

// API
app.post('/api/poll', pollsApi.createPoll);
app.get('/api/polls', pollsApi.listPolls);
app.get('/api/poll/:id', pollsApi.getPoll);
app.put('/api/poll/:id', pollsApi.updatePoll);
