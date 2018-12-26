const BaseRest = require('./rest.js');
const HttpCodes = require('../config/const.js').HttpCodes;
const ReadFile = require('fs-readfile-promise');
const TemplatePromise = ReadFile(__dirname+'/../resume-template/default.hbs');
module.exports = class extends BaseRest {
    async getAction() {

        if (this.isAjax()) {
            const userId = await this.session('user');

            if (userId) {
                const result = await this.modelInstance.where({
                    userId: userId
                }).select();
                return this.success(result);
            } else {
                return this.fail(HttpCodes.UNAUTHORIZED, "请重新登录");
            }
        } else {
            this.assign("template", await TemplatePromise);
            return this.display("resume");
        }
    }

    async put() {
        const model = this.post();
        return this.success();
    }

};