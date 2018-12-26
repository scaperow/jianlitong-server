const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
    async deleteAction() {
        return false;
    }

    async putAction() {
        return false;
    }

    async postAction() {
        const mail =  this.ctx.post('mail');
        const password = this.ctx.post('password');
        const users = this.model('user');

        
    }
};