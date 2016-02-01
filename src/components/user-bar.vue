<template>
    <nav class="user-menu" v-bind:class="{open: openUserMenu}">
        <div class="profile" v-show="isLogin">
            <div class="user-avatar" v-bind:style="{backgroundImage: 'url(' + userAvatar + ')'}"></div>
            <div class="user-name" v-text="userName"></div>
            <div class="arrow-down" v-on:click.stop="toggleUserMenu"><i class="fa fa-chevron-down"></i></div>
        </div>
        <div class="home user-menu-btn"><i class="fa fa-home"></i><span class="menu-text">主页</span></div>
        <div class="setting user-menu-btn"><i class="fa fa-cog"></i><span class="menu-text">设置</span></div>
        <div v-on:click.stop="signOut" class="logout user-menu-btn"><i class="fa fa-sign-out"></i><span class="menu-text">退出</span></div>
        <div class="sign-in-btn" v-show="!isLogin" v-on:click.stop="handleSignIn">登录</div>
        <div class="sign-up-btn" v-show="!isLogin" v-on:click.stop="handleSignUp">注册</div>
    </nav>
</template>

<style scoped>
    .profile .user-avatar {
        /*background-image: url(../assets/images/user-avatar.jpg);*/
        width: 1.875rem;
        background-size: cover;
        height: 1.875rem;
        border-radius: .25rem;
        background-repeat: no-repeat;
    }
    .profile .arrow-down {
        width: 3rem;
        height: 3rem;
        color: white;
        font-size: 1.2rem;
        text-align: center;
        line-height: 3rem;
        cursor: pointer;
    }
    .user-menu {
        background-color: rgb(42, 141, 96);
        min-height: 4rem;
    }
    .user-menu.open {
        padding-bottom: .5rem;
    }
    .user-menu .user-menu-btn {
        color: white;
        font-size: 1.5rem;
        padding: .125rem 0;
        margin: 0 1.5rem;
        cursor: pointer;
        transition: 300ms font-size;
        border-radius: .25rem;
        display: none;
    }
    .user-menu.open .user-menu-btn {
        display: block;
    }
    .user-menu .user-menu-btn:hover {
        background-color: hsla(0, 0%, 0%, 0.3);
    }
    .user-menu-btn .menu-text {
        font-size: 14px;
        margin-left: .25rem;
    }
    .user-menu-btn .fa {
        vertical-align: text-bottom;
    }
    .user-menu .profile {
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -webkit-align-items: center;
        align-items: center;
        width: 100%;
        height: 4rem;
        padding: .5rem 1.5rem;
    }
    .profile .user-name {
        width: 6.25rem;
        color: white;
    }
    .user-menu .sign-up-btn{
        height: 2rem;
        width: 5rem;
        border: 1px solid white;
        text-align: center;
        line-height: 2rem;
        color: white;
        cursor: pointer;
    }
    .user-menu .sign-in-btn {
        height: 2rem;
        width: 5rem;
        border: 1px solid white;
        text-align: center;
        line-height: 2rem;
        color: white;
        cursor: pointer;
    }
</style>

<script>
    "use strict";
    module.exports = {
        props:['userName', 'userAvatar','userId'],
        data: function () {
            return {
                openUserMenu: false
            }
        },
        computed: {
            isLogin: function () {
                if (this.userId !== -1) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            toggleUserMenu: function () {
                this.openUserMenu = !this.openUserMenu;
            },
            signOut: function () {
                this.$dispatch('signout');
            },
            handleSignIn: function () {
                this.$dispatch('signin')
            },
            handleSignUp: function () {
                this.$dispatch('signup')
            }
        },
        events: {
            'userhadlogined': function () {
            },
            'userhadsignout': function () {
                this.openUserMenu = false;
            }
        }
    }
</script>