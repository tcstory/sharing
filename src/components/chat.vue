<template>
    <div class="chat-input-wrapper">
        <div class="user-avatar" v-bind:style="{backgroundImage: 'url(' + userAvatar + ')' }"></div>
        <textarea name="" placeholder="点击这里,然后聊天.支持markdown" v-model="userInputMsg" v-on:keydown.enter.stop.prevent="sendMsg"></textarea>
    </div>
</template>

<style scoped>
    .user-avatar {
        margin: .25rem;
        margin-right:1rem;
        width: 1.875rem;
        background-size: cover;
        height: 1.875rem;
        border-radius: .25rem;
        background-repeat: no-repeat;
        cursor: pointer;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
    }
    .chat-input-wrapper {
        border-top: 1px solid rgba(0,0,0,.05);
        display: -webkit-flex;
        display: flex;
        padding: .5rem;
        padding-left: 3rem;
        min-height: 4.375rem;
    }
    .chat-input-wrapper textarea {
        border: none;
        resize: none;
        width: 100%;
        height: 100%;
        outline: none;
        line-height: 1.38em;
        font-size: 1rem;
        color: black;
    }
</style>

<script>
    module.exports = {
        data: function () {
            return {
                userName: '',
                userAvatar: '',
                userId: -1,
                userInputMsg: ''
            }
        },
        methods: {
            sendMsg: function () {
                if (String.prototype.trim.call(this.userInputMsg).length != 0) {
                    window.socket.emit('chat message', this.userInputMsg);
                    this.userInputMsg = '';
                } else {
                    return false;
                }
            }
        },
        events: {
            'userhadsignedin': function (data) {
                this.userName = data.userName;
                this.userAvatar = data.userAvatar;
                this.userId = data.userId;
            },
            'userhadsignedout': function () {
                Utils.clearUserData(this);
            },
            'anonymoususer': function (data) {
                this.userName = data.userName;
                this.userAvatar = data.userAvatar;
                this.userId = data.userId;
            }
        }
    }
</script>