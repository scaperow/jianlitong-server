const schema = require('async-validator');
const _ = require('lodash');
const Validator = require('../validator/register_user');
const HttpCodes = require('../config/const').HttpCodes;

const rules = {
    name: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
        },
        {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur"
        },
        {
            pattern: /^[a-zA-Z0-9_-\u4E00-\u9FA5]+$/,
            message: "只能输入数字，字母，下划线，减号",
            trigger: "blur"
        }
    ],
    mail: [{
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
        },
        {
            min: 3,
            max: 50,
            message: "长度在 6 到 50 个字符",
            trigger: "blur"
        },
        {
            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message: "格式不正确",
            trigger: "blur"
        }
    ],
    password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
        },
        {
            min: 3,
            max: 25,
            message: "长度在 6 到 25 个字符",
            trigger: "blur"
        },
        {
            pattern: /^[a-zA-Z0-9_-\u4E00-\u9FA5]+$/,
            message: "只能输入数字，字母，下划线，减号",
            trigger: "blur"
        }
    ],
    retryPassword: [{
            required: true,
            message: "请再次输入密码",
            trigger: "blur"
        },
        {
            min: 3,
            max: 25,
            message: "长度在 6 到 25 个字符",
            trigger: "blur"
        },
        {
            pattern: /^[a-zA-Z0-9_-\u4E00-\u9FA5]+$/,
            message: "只能输入数字，字母，下划线，减号",
            trigger: "blur"
        },
        {
            validator: (rule, value, callback, source) => {
                if (value !== source.password) {
                    callback(new Error("两次输入密码不一致"));
                } else {
                    callback();
                }
            }
        }
    ],
    code: [{
            required: true,
            message: "请输入验证码",
            trigger: "blur"
        },
        {
            pattern: /^\d+$/,
            message: "只能输入数字",
            trigger: "blur"
        },
        {
            min: 6,
            max: 6,
            message: "请输入六位数字",
            trigger: "blur"
        }
    ]
};

module.exports = class extends think.Logic {
    async postAction() {

        const body = this.post();

        try {
            await Validator.validateModel(body, this.ctx);
        } catch (error) {
            return this.fail(HttpCodes.BAD_REQUEST, null, error);
        }

        const validator = new schema(rules);
        try {
            await (() => {
                return new Promise((resolve, reject) => {
                    validator.validate(body, (error) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                });
            })();
        } catch (error) {
            return this.fail(HttpCodes.BAD_REQUEST, null, error);
        }
    }
};