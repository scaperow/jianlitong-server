const BaseRest = require('./rest.js');
const _ = require('lodash');
const moment = require('moment');

module.exports = class extends BaseRest {

    async postAction() {
        let type = this.ctx.post('type');
        let mail = this.ctx.post('mail');
        const tokens = this.ctx.model('token');
        const code = _.random(100000, 999999);
        switch (parseInt(type)) {
            case 1:
                // for render page
                this.assign(Object.assign(this.config('variables'), {
                    validateCode: code
                }));

                this.sendEmail(this.config('mail'), {
                    from: 'scaperow@126.com',
                    to: mail,
                    subject: `${this.config('variables').productName}请您查收验证码`, // subject line
                    html: await this.render('template/email_token_validate'), // html content
                }).then(info => {
                    // delete tokens has been expired
                    tokens.where({
                        mail: mail,
                        type: 1
                    }).delete();

                    // store data
                    tokens.add({
                        mail: mail,
                        type: 1,
                        code: code
                    });

                }, err => {
                    console.log(err);
                });

                break;

            default:
                return false;
        }

    }

    async getAction() {
        return false;
    }

    async getAction() {
        return false;
    }

    async deleteAction() {
        return false;
    }
};