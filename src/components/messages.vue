<template>
    <div class="message-wrapper">
        <div class="message" v-for="message in messages" >
            <div class="user-avatar" v-bind:style="{backgroundImage: 'url('+ message.userAvatar + ')'}"></div>
            <div class="message-content-wrapper">
                <div class="user-name">{{message.userName}}<span class="message-time" v-text="message.timestamp | timestamp"></span></div>
                <div class="message-content" v-text="message.content"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .message-wrapper {
        overflow-y: scroll;
        -webkit-flex: 1 1 auto;
        flex: 1 1 auto;
    }
    .message {
        display: -webkit-flex;
        display: flex;
        padding: .5rem 1.5rem .5rem 3rem;
    }

    .message-time {
        color: hsl(0, 0%, 67%);
        font-weight: 400;
        float: right;
    }
    .avatar-wrapper {
    }
    .user-name {
        color: hsl(0, 0%, 60%);
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: .5rem;
    }

    .message-content-wrapper {
        word-wrap: break-word;
        word-break: break-all;
        line-height: 1.4;
        color: hsl(0, 0%, 20%);
        -webkit-flex:1;
        flex:1;
    }

    .user-avatar {
        /*background-image: url(http://7qn8rp.com1.z0.glb.clouddn.com/dog.jpg);*/
        margin: .25rem;
        margin-right:1rem;
        width: 1.875rem;
        height: 1.875rem;
        border-radius: .25rem;
        background-repeat: no-repeat;
        cursor: pointer;
        -webkit-flex-shrink: 0;
        flex-shrink: 0;
        background-size: 100%;
    }
</style>

<script>
    module.exports = {
        props: ['messages'],
        watch: {
            messages: function () {
                this.$el.scrollTop = this.$el.scrollHeight;
            }
        },
        filters: {
            'timestamp': function (value) {
                return new Date(value).toLocaleTimeString("chinese", {hour12:false}).split(' ')[0];
            }
        }
    }
</script>