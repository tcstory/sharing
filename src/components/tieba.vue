<template>
    <div class="post-wrapper" v-show="curLabel === 'forum'">
        <div class="post" v-for="post in posts">
            <div class="user-avatar" v-bind:style="{backgroundImage: 'url('+ post.authorAvatar + ')'}"></div>
            <div class="wrapper">
                <header class="post-title" v-on:click.stop="openThisPost(post.postId)" v-text="post.postTitle"></header>
                <p><span v-text="post.authorName" class="author-name"></span><span v-text="post.postTime"></span></p>
            </div>
        </div>
        <article class="post-window" v-show="showPostWindow">
            <button v-on:click.stop="handleGoback" class="goback-btn"><i class="fa fa-reply"></i></button>
            <header v-text="curPost.postTitle"></header>
            <div class="post-content">
                <div class="row">
                    <div class="user-avatar"v-bind:style="{backgroundImage: 'url('+ curPost.authorAvatar + ')'}"></div>
                    <div class="wrapper">
                        <span class="user-name" v-text="curPost.authorName"></span>
                        <span class="post-time">a day ago</span>
                        <div class="content" v-text="curPost.content">
                        </div>
                    </div>
                </div>
                <div class="quick-btns">
                    <button class="quick-replay-btn" v-on:click.stop="handleQuickReplay">回复</button>
                </div>
            </div>
            <div class="post-replay" v-for="item in curPost.replay">
                <div class="user-avatar" v-bind:style="{backgroundImage: 'url('+ item.userAvatar + ')'}"></div>
                <div class="wrapper">
                    <span class="user-name" v-text="item.userName"></span>
                    <span class="post-time" v-text="item.replayTime"></span>
                    <div class="content" v-text="item.content">
                    </div>
                </div>
            </div>
            <div class="post-replay-input">
                <textarea class="post-replay-area"></textarea>
                <button class="replay-post-btn">回复</button>
            </div>
        </article>
    </div>
</template>

<style>
    .post-wrapper {
        -webkit-flex: 1;
        flex: 1;
        padding: 3rem;
        overflow-y: scroll;
    }

    .post {
        height: 4.25rem;
        margin-right: 2rem;
        border-right: solid 4px #FF3333;
        margin-bottom: .5rem;
    }
    .post .wrapper {
        display: inline-block;
    }
    .post .author-name {
        color: #333;
        font-size: 14px;
    }

    .user-avatar {
        /*background-image: url('http://7qn8rp.com1.z0.glb.clouddn.com/dog.jpg');*/
        width: 3rem;
        height: 3rem;
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: .25rem;
        display: inline-block;
        vertical-align: top;
        margin-right: 1rem;
    }

    .post-title {
        font-size: 1.125rem;
        color: #337ab7;
        cursor: pointer;
    }

    .post-window {
        position: absolute;
        width: 100%;
        height: 100%;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        background-color: white;
        z-index: 100;
        -webkit-transition: all 450ms;
        transition: all 450ms;
        box-shadow: 0 0 4px 4px hsl(14, 100%, 57%);
        border-radius: 1rem;
        padding: 1rem 2rem 2rem;
        overflow-y: scroll;
    }

    .post-window header {
        font-size: 1.375rem;
        text-align: center;
        color: #2196F3;
        font-weight: bold;
        margin-bottom: 2rem;
    }

    .post-window .content {
        margin-top: .25rem;
    }

    .post-window .user-name {
        color: #337ab7;
        font-size: .875rem;
        font-weight: bold;
    }

    .post-window .post-time {
        color: #777;
        text-decoration: underline;
        font-size: .75rem;
    }

    .post-window .wrapper {
        display: inline-block;
    }

    .post-content {
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(153, 153, 153, 0.45);
    }

    .post-window .post-content .row {
        margin-top: .5rem;
    }

    .quick-btns {
        margin-top: 2rem;
        height: 2rem;
    }

    .quick-replay-btn {
        color: #fff;
        background-color: #337ab7;
        border-color: #2e6da4;
        width: 5rem;
        height: 2rem;
        outline: none;
        float: right;
        cursor: pointer;
    }
    .post-replay {
        padding-bottom: 1rem;
        padding-top: 1rem;
        border-bottom: 1px solid rgba(153, 153, 153, 0.45);
    }
    .post-replay-input {
        width: 100%;
        height: 8rem;
        margin-top: 2rem;
        position: relative;
    }
    .post-replay-area {
        border: 1px solid rgba(153, 153, 153, 0.45);
        width: 100%;
        height: 100%;
        resize: none;
        padding: .5rem;
        box-shadow: 0 0 2px 2px #8bc34a;
        border-radius: .5rem;
    }
    .replay-post-btn {
        width: 80px;
        height: 32px;
        position: absolute;
        right: .25rem;
        bottom: .25rem;
        background-color: #8BC34A;
        border: none;
        border-radius: .5rem;
        color: white;
        font-size: 1.125rem;
    }
    .goback-btn {
        outline: none;
        border: none;
        width: 48px;
        height: 48px;
        font-size: 2rem;
        background-color: transparent;
        color: #9C27B0;
        cursor: pointer;
    }
</style>

<script>
    module.exports = {
        props:['curLabel'],
        data: function () {
            return {
                showPostWindow: false,
                posts: [],
                curPost: {}
            }
        },
        methods: {
            handleQuickReplay: function () {
                scrollToTextArea();
            },
            openThisPost: function (curPostId) {
                var len = this.posts.length;
                for (var i = 0; i < len; i++) {
                    if (this.posts[i].postId === curPostId) {
                        this.curPost = this.posts[i];
                        this.showPostWindow = true;
                        break;
                    }
                }
            },
            handleGoback: function () {
                this.showPostWindow = false;
            }
        },
        events: {
            'getpostlist': function (posts) {
                this.posts = posts;
            }
        }
    };
    function scrollToTextArea() {
        document.querySelector('.post-replay-area').scrollIntoView()
    }
</script>