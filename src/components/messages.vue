<template>
    <div class="message-wrapper">
        <div class="message">
            <div class="user-avatar"></div>
            <div class="message-content-wrapper">
                <div class="user-name">中华田园犬</div>
                <div class="message-content">这只是一个简单的测试而已</div>
            </div>
        </div>
        <div class="message">
            <div class="user-avatar"></div>
            <div class="message-content-wrapper">
                <div class="user-name">大兄弟<span class="message-time">12:30</span></div>
                <div class="message-content">我还有很多很多的话要我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的说的</div>
            </div>
        </div>
        <div class="message">
            <div class="user-avatar"></div>
            <div class="message-content-wrapper">
                <div class="user-name">大兄弟</div>
                <div class="message-content">我还有很多很多的话要我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的说的</div>
            </div>
        </div>
        <div class="message">
            <div class="user-avatar"></div>
            <div class="message-content-wrapper">
                <div class="user-name">大兄弟</div>
                <div class="message-content">我还有很多很多的话要我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的说的</div>
            </div>
        </div>
        <div class="message">
            <div class="user-avatar"></div>
            <div class="message-content-wrapper">
                <div class="user-name">大兄弟</div>
                <div class="message-content">我还有很多很多的话要我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的我还有很多很多的话要说的说的</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .message-wrapper {
        overflow-y: scroll;
        -webkit-flex-shrink: 1;
        flex-shrink: 1;
    }
    .message {
        /*display: -webkit-flex;*/
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
        /*-webkit-flex: 1 0 auto;*/
        /*flex: 1 0 auto;*/
        line-height: 1.4;
        color: hsl(0, 0%, 20%);
    }

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
</style>