const BaseRest = require('./rest.js');
const _ = require('lodash');
const OSS = require('ali-oss');
const HttpCodes = require('../config/const.js').HttpCodes;
const client = new OSS(think.config('oss'));

module.exports = class extends BaseRest {
    async postAction() {
        let model = this.ctx.post();
        const userId = await this.session('user');
        const timestamp = new Date().getTime();
        const key = `${userId}_${timestamp}`;
        let result = null;
        let uri = null;
        switch (model.name) {
            case 'avatar':
                // avatar
                try {
                    //https://jianlitong-dev.oss-cn-beijing.aliyuncs.com/avatar/4%231539248753030.png
                    uri = `avatar/${key}.png`;
                    result = await client.multipartUpload(uri, this.ctx.request.body.file.avatar.path);
                    console.log(result);
                } catch (error) {
                    think.logger.error(error);
                }
                break;
        }

        if (result && result.res.status === 200) {
            this.success({
                uri: `${think.config('oss').domain}/${uri}`
            });
        } else {
            this.fail(HttpCodes.ERROR, '上传图片时发生了错误，请重新尝试');
        }
    }
};