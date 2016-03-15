<template>
    <div class="post-wrapper" v-show="curLabel === 'forum'">
        <div class="post" v-for="post in posts">
            <div class="user-avatar" v-bind:style="{backgroundImage: 'url('+ post.authorAvatar + ')'}"></div>
            <div class="wrapper">
                <header class="post-title" v-on:click.stop="openThisPost(post.postId)" v-text="post.postTitle"></header>
                <p><span v-text="post.authorName" class="author-name"></span><span v-text="post.postTime | timestamp"
                                                                                   class="post-time"></span></p>
            </div>
        </div>
        <article class="post-window" v-show="showPostWindow">
            <button v-on:click.stop="handleGoback" class="goback-btn"><i class="fa fa-reply"></i></button>
            <header v-text="curPost.postTitle"></header>
            <div class="post-content">
                <div class="row">
                    <div class="user-avatar" v-bind:style="{backgroundImage: 'url('+ curPost.authorAvatar + ')'}"></div>
                    <div class="wrapper">
                        <span class="user-name" v-text="curPost.authorName"></span>
                        <span class="post-time" v-text="curPost.postTime | timestamp"></span>
                        <div class="content">{{{curPost.content}}}</div>
                    </div>
                </div>
                <div class="quick-btns">
                    <button class="quick-replay-btn" v-on:click.stop="handleQuickReplay" v-show="userId[0] !== 'v'">回复
                    </button>
                </div>
            </div>
            <div class="post-replay" v-for="item in curPost.replay">
                <div class="user-avatar" v-bind:style="{backgroundImage: 'url('+ item.userAvatar + ')'}"></div>
                <div class="wrapper">
                    <span class="user-name" v-text="item.userName"></span>
                    <span class="post-time" v-text="item.replayTime | timestamp2"></span>
                    <div class="content" v-text="item.content">
                    </div>
                </div>
            </div>
            <div class="post-replay-input" v-show="userId[0] !== 'v'">
                <textarea class="post-replay-area" v-model="replayContent"></textarea>
                <button class="replay-post-btn" v-on:click.stop="confirmReplayPost">回复</button>
            </div>
        </article>
        <article class="edit-post-window" v-show="editPost">
            <button v-on:click.stop="handleCancelPost" class="cancel-post-btn"><i class="fa fa-reply"></i></button>
            <header class="post-title-wrapper"><input v-model="newPostTitle" type="text" placeholder="请输入帖子的标题"
                                                      class="post-title-input"></header>
            <div class="post-editor-wrapper">
                <input type="file" v-on:change="handleUploadingImage" style="display: none;" accept="image/*"
                       v-el:upload-image>
                <div class="post-toolbar"><i class="fa fa-picture-o upload-image-btn"
                                             v-on:click.stop="handleUploadImage"></i></div>
                <div class="post-text-area" contenteditable="true" v-el:post-text-area></div>
                <button class="confirm-create-post" v-on:click.stop="confirmCreatePost">发布</button>
            </div>
        </article>
        <button class="create-post-btn" v-on:click.stop="handleCreatePost" v-show="userId[0] !== 'v'">发帖</button>
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
        margin-bottom: .5rem;
    }

    .post .wrapper {
        display: inline-block;
    }

    .post .author-name {
        color: #333;
        font-size: .875rem;
    }

    .post .post-time {
        color: #FF9800;
        font-size: .875rem;
        margin-left: 1rem;
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
        border: 1px solid #e4e4e4;
        border-radius: 1rem;
        padding: 1rem 2rem 2rem;
        overflow-y: scroll;
    }

    .post-window .post-time {
        color: #FF9800;
        font-size: .875rem;
        margin-left: 1rem;
    }

    .edit-post-window {
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
        border: 1px solid #e4e4e4;
        border-radius: 1rem;
        padding: 1rem 2rem 2rem;
        overflow-y: scroll;
    }

    .edit-post-window .post-title-wrapper {
        text-align: center;
    }

    .edit-post-window .post-title-input {
        height: 2.5rem;
        font-size: 1.125rem;
        padding: .25rem;
        width: 320px;
        border: none;
        border-bottom: 1px solid #9E9E9E;
        text-align: center;
        outline: none;
    }

    .edit-post-window .post-editor-wrapper {
        width: 40rem;
        min-height: 20rem;
        margin: 6rem auto;
        position: relative;
    }

    .post-editor-wrapper .post-text-area {
        width: 100%;
        min-height: 20rem;
        padding: 1rem;
        outline: none;
        border-radius: .25rem;
        font-size: 1.25rem;
        resize: none;
        border: 1px solid #9E9E9E;
    }
    .post-editor-wrapper .post-text-area img {
        max-width: 33.75rem;
    }
    .post-editor-wrapper .post-toolbar {
        width: 100%;
        background-color: #8BC34A;
        height: 2rem;
        margin-bottom: .25rem;
        border-radius: .25rem;
    }

    .post-editor-wrapper .post-toolbar .upload-image-btn {
        font-size: 2rem;
        margin-left: .25rem;
        color: white;
        cursor: pointer;
    }

    .post-editor-wrapper .confirm-create-post {
        width: 64px;
        height: 64px;
        border: none;
        outline: none;
        background-color: #8BC34A;
        color: white;
        font-size: 1.25rem;
        border-radius: 50%;
        cursor: pointer;
        position: absolute;
        right: .5rem;
        bottom: .5rem;
    }

    .edit-post-window .cancel-post-btn {
        outline: none;
        border: none;
        width: 48px;
        height: 48px;
        font-size: 2rem;
        background-color: transparent;
        color: #E91E63;;
        cursor: pointer;
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

    .post-window .content img {
        max-width: 33.75rem;
    }

    .post-window .user-name {
        color: #337ab7;
        font-size: .875rem;
        font-weight: bold;
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

    .create-post-btn {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        width: 100px;
        height: 32px;
        border: none;
        color: white;
        background-color: #00BCD4;
        font-size: 1.125rem;
        border-radius: .5rem;
        cursor: pointer;

    }
</style>

<script>
    module.exports = {
        props: ['curLabel', 'userId'],
        data: function () {
            return {
                showPostWindow: false,
                editPost: false,
                posts: [],
                curPost: {},
                newPostTitle: '',
                replayContent: ''
            }
        },
        methods: {
            handleQuickReplay: function () {
                scrollToTextArea();
            },
            openThisPost: function (curPostId) {
                getPostDetails(this, curPostId)
            },
            handleGoback: function () {
                this.showPostWindow = false;
            },
            handleCreatePost: function () {
                this.editPost = !this.editPost;
            },
            handleCancelPost: function () {
                this.editPost = false;
            },
            confirmCreatePost: function () {
                var _myself = this;
                if (_myself.newPostTitle === '') {
                    var msg = {
                        type: 'error',
                        title: '错误',
                        content: '帖子的标题不能为空'
                    };
                    _myself.$dispatch('handleshowmessagewindow', msg);
                    return;
                } else if (_myself.newPostContent === '') {
                    var msg = {
                        type: 'error',
                        title: '错误',
                        content: '帖子的内容不能为空'
                    };
                    _myself.$dispatch('handleshowmessagewindow', msg);
                    return;
                }
                var xhr = new XMLHttpRequest();
                xhr.open('post', '/serv/post/create-post');
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
                    if (response.code === 200) {
                        var msg = response.msg;
                        msg.type = 'success';
                        _myself.$dispatch('handleshowmessagewindow', msg);
                        _myself.$dispatch('handleupdatepostlist', msg);
                        _myself.newPostTitle = '';
                        _myself.newPostContent = '';
                        _myself.$els.postTextArea.innerHTML = '';
                        _myself.editPost = false;
                    }
                };
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    title: _myself.newPostTitle,
                    content: _myself.$els.postTextArea.innerHTML
                }));
            },
            confirmReplayPost: function () {
                var _myself = this;
                if (_myself.replayContent === '') {
                    var msg = {
                        type: 'error',
                        title: '错误',
                        content: '回复的内容不能为空'
                    };
                    _myself.$dispatch('handleshowmessagewindow', msg);
                    return;
                }
                var xhr = new XMLHttpRequest();
                xhr.open('post', '/serv/post/replay-post');
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
                    if (response.code === 200) {
                        _myself.replayContent = '';
                        getPostDetails(_myself, _myself.curPost.postId);
                    }
                };
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    content: _myself.replayContent,
                    postId: _myself.curPost.postId
                }));
            },
            handleUploadImage: function () {
                var _myself = this;
                _myself.$els.uploadImage.click();
            },
            handleUploadingImage: function () {
                var _myself = this;
                var xhr = new XMLHttpRequest();
                xhr.open('post', '/serv/post/upload-post-image');
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
                    if (response.code === 200) {
                        _myself.$els.postTextArea.focus();
                        document.execCommand('insertImage', false, response.imageUrl);
                        _myself.$els.uploadImage.value = '';
                    }
                };
                var d = new FormData();
                d.append('postImage', _myself.$els.uploadImage.files[0]);
                xhr.send(d);
            }
        },
        filters: {
            'timestamp': function (value) {
                return new Date(value).toLocaleDateString("chinese");
            },
            'timestamp2': function (value) {
                return new Date(value).toLocaleString("chinese");
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
    function getPostDetails(vm, curPostId) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/serv/post/get-post-details?postId=' + curPostId);
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);
            if (response.code === 200) {
                vm.curPost = response.post;
                vm.showPostWindow = true;

            }
        };
        xhr.send();
    }
</script>