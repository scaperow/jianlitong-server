// default config
module.exports = {
  workers: 1,
  errnoField: 'error', // errno field
  errmsgField: 'errorMessage', // errmsg field
  errorCodes: {
    // 验证错误
    validateError: 10010
  },
  mail: {
    service: '126',
    auth: {
      user: 'scaperow@126.com', // your account
      pass: 'admin1q2w3e4R' // authorization code, not the email password
    }
  },
  oss: {
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAIhblyx7yUoqn3',
    accessKeySecret: 'kYjmVQ2ueStviRz90GuF4zdBeVX9Ip',
    bucket: 'jianlitong-dev',
    domain: 'http://jianlitong-dev.oss-cn-beijing.aliyuncs.com'
  },
  variables: {
    productName: '简历通',
    productAuthor: '风景侠工作室'
  }
};