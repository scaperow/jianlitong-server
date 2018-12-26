const Base = require('./base.js');
const _ = require('lodash');
const ValidateRegister = require('../validator/register_user');
const HttpCodes = require('../config/const').HttpCodes;

module.exports = class extends Base {
    async getAction() {
        var params = this.get();
        switch (params.form) {
            case "register_user":
                try {
                    await ValidateRegister.validateModel(params, this.ctx);
                } catch (error) {
                    return this.fail(HttpCodes.BAD_REQUEST, null, error);
                }

                return this.success();

            default:
                return this.fail(HttpCodes.BAD_REQUEST, '验证失败，表单不存在');
        }
    }
};