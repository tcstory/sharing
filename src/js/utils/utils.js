/**
 * Created by tcstory on 2/9/16.
 */

function validate(name) {
    if (/\w{3,6}/g.test(name)) {
        return true;
    } else {
        return false;
    }
}
function clearUserData(instance) {
    instance.userName = '';
    instance.userId = -1;
    instance.userAvatar = '';
}

module.exports = {
    validate: validate,
    clearUserData: clearUserData
};

