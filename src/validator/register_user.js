const _ = require('lodash');

module.exports = {
    async validateModel(model, context, callback) {
        const users = context.model('user');

        if (_.has(model, 'name')) {
            const existsUser = await users.where({
                name: model.name,
                status: 0
            }).find();

            if (_.isEmpty(existsUser)) {
                return Promise.resolve();
            } else {
                return Promise.reject([{
                    field: 'name',
                    message: '用户名已被抢占，重新起一个吧'
                }]);
            }
        }

        if (_.has(model, 'mail')) {
            const existsUser = await users.where({
                mail: model.mail,
                status: 0
            }).find();

            if (_.isEmpty(existsUser)) {
                return Promise.resolve();
            } else {
                return Promise.reject([{
                    field: 'name',
                    message: '邮箱已被注册'
                }]);
            }
        }


    }
}