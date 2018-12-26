const BaseRest = require('./rest.js');
const _ = require('lodash');

module.exports = class extends BaseRest {


  async postAction() {
    let model = this.ctx.post();
    const tokens = this.ctx.model('token');
    const existsToken = await tokens.where({
      code: model.code,
      type: 1,
      mail: model.mail
    }).find();

    if (_.isEmpty(existsToken)) {
      return this.fail("验证码不存在");
    }

    const expireDifferrence = 60 * 1000 * 10;
    if (new Date() - new Date(existsToken.createTime) > expireDifferrence) {
      return this.fail("验证码已过期");
    }

    const users = this.ctx.model('user');
    const userId = await users.add({
      name: model.name,
      password: think.md5(model.password),
      mail: model.mail
    });

    if (!userId) {
      this.fail("发生了未知错误，请稍后重试");
    }

    this.success();

  }
};