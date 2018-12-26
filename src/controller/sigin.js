const BaseRest = require('./rest.js');
const _ = require('lodash');
const HttpCodes = require('../config/const.js').HttpCodes;

module.exports = class extends BaseRest {
    async postAction() {
        let model = this.ctx.post();

        const users = this.ctx.model('user');
        const user = await users.where({
            name: model.name,
            password: think.md5(model.password)
        }).find();

        if (_.isEmpty(user)) {
            return this.fail(HttpCodes.UNAUTHORIZED, "用户名或密码不对");
        }

        if (user.status < 0) {
            return this.fail(HttpCodes.UNAUTHORIZED, "用户已被禁用");
        }

        const token = await this.session('user', user.id);

        this.success({
            token: token,
            id: user.id,
            name: user.name,
            mail: user.mail
        });
    }
};