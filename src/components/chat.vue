<template>
    <div class="chat-input-wrapper">
        <div class="user-avatar"></div>
        <textarea name="" placeholder="点击这里,然后聊天.支持markdown"></textarea>
    </div>
</template>

<style scoped>
    .user-avatar {
        background-image: url(http://7qn8rp.com1.z0.glb.clouddn.com/dog.jpg);
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