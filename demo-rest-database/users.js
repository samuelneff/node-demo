function initialize(app)
{
    app.get('/users/id', getUserById);
    app.get('/users/username', getUserById);
    app.get('/users/username', getUserById);
    app.get('/users/', getUserById);
}