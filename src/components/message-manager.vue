<template>
    <div class="message-window" v-bind:class="message.type" v-show="showMsg" transition="showingmsg">
        <div class="close-window-btn" v-on:click.stop="removeMessage"><i class="fa fa-times "></i></div>
        <header class="message-title" v-text="message.title"></header>
        <p class="message-content" v-text="message.content"></p>
    </div>
</template>

<style scoped>
    .message-window {
        width: 15rem;
        min-height: 4rem;
        border-radius: .5rem;
        padding: 1em 1.5em;
        position: fixed;
        right: 1rem;
        z-index: 200;
    }

    .message-window.error {
        box-shadow: 0 0 0 1px hsl(0, 42%, 79%) inset, 0 0 0 0 hsla(0, 0%, 0%, 0);
        color: hsl(1, 48%, 42%);
        background-color: hsl(0, 100%, 98%);
    }
    .message-window.success {
        background-color: hsl(69, 78%, 96%);
        color: hsl(79, 72%, 43%);
        box-shadow: 0 0 0 1px hsla(210, 6%, 14%, 0.22) inset,0 0 0 0 hsla(0, 0%, 0%, 0);
    }
    .showingmsg-enter {
        animation: 450ms showingmsg-in;
    }
    .showingmsg-leave {
        animation: 450ms showingmsg-out;
    }
    .showingmsg-transition {
        transform: translateY(1rem);
    }
    @keyframes showingmsg-in {
        0% {
            transform: translateY(0);
            visibility: hidden;
            opacity: 0;
        }
        100% {
            transform: translateY(1rem);
            visibility: visible;
            opacity: 1;
        }
    }

    @keyframes showingmsg-out {
        from {
            transform: translateY(1rem);
            visibility: visible;
            opacity: 1;
        }
        to {
            transform: translateY(0);
            visibility: hidden;
            opacity: 0;
        }
    }

    .message-title {
        font-size: 1rem;
        font-weight: bold;
    }

    .message-content {
        opacity: .85;
        font-size: .875rem;
    }

    .close-window-btn {
        position: absolute;
        right: 1rem;
        cursor: pointer;
    }

</style>

<script>
    "use strict";
    var configMap = {
        maxMessageNumber: 3
    };
    module.exports = {
        data: function () {
            return {
                message: {
                    title: '',
                    content: '',
                    type: ''
                },
                showMsg: false
            }
        },
        methods: {
            removeMessage: function () {
//                this.message.title = '';
//                this.message.content = '';
//                this.message.type = '';
                this.showMsg = false;
            }
        },
        events: {
            'showmessagewindow': function (msg) {
                var _myself = this;
                _myself.showMsg = true;
                _myself.message.type = msg.type;
                _myself.message.title = msg.title;
                _myself.message.content = msg.content;
                setTimeout(function () {
                    _myself.showMsg = false;
                }, 1500);
            }
        }
    }
</script>