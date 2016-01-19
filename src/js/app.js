/**
 * Created by tcstory on 1/15/16.
 */
"use strict";

require('../css/app.css');
require('../css/font-awesome/css/font-awesome.css');
var Vue = require('./vendor/vue/vue.js');
Vue.use(require('vue-resource'));
var v = new Vue({
    el: 'body',
    data: {
        userName: '',
        userAvatar: ''
    },
    methods: {
        handleUserSignOut: function () {
            console.log('signout')
        },
        handleUserSignIn: function () {
            this.$broadcast('handlesignin');
        },
        handleUserSignUp: function () {
            this.$broadcast('handlesignup');
        },
        handleSignInSuccess: function (data) {
            this.userName = data.userName;
            this.userAvatar = data.userAvatar;
            this.$broadcast('userhadlogined');
        }
    },
    components: {
        'user-bar': require('../components/user-bar.vue'),
        'login-window': require('../components/login-window.vue')
    }
});