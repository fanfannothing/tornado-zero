require.config({
    urlArgs: 'bust=1'
});

define([
    'views/demo'
    , 'views/auth'
    , 'views/login'
    , 'views/dashboard'
], function(
    DemoView
    , AuthView
    , LoginView
    , DashboardView
){
    var AppRouter = Backbone.Router.extend({
        routes: {
            'demo':'demo'
            , 'auth':'auth'
            , 'login':'login'
            , 'dashboard':'dashboard'
            , 'logout':'logout'
            , '*other':'defaultRoute'
        }
        ,initialize: function(){
        }
        ,demo: function(){
            //ga('send', 'pageview', '/demo');
            this.view = new DemoView();
            this.render();
        }
        , auth: function() {
            this.view = new AuthView();
            this.view.router = this;
            this.render();
        }
        , login: function() {
            this.view = new LoginView();
            this.view.router = this;
            this.render();
        }
        , dashboard: function() {
            this.view = new DashboardView();
            this.view.router = this;
            this.render();
        }
        , logout: function() {
            var me = this;
            $.post('/api/user/logout').done(function(){
                me.navigate('demo', true);
            });
        }
        ,defaultRoute: function(other){
        }
        , render: function() {
            $('#container').html(this.view.render().el);
            if (this.view.afterRendered) {
                this.view.afterRendered();
            }
            return this;
        }
    });

    Backbone.history.start();
    var router = new AppRouter();
    router.navigate('demo', true);
});
