/**
 * @desc 策略模式
 */
validator = {
  // 所有可用的检查
  types: {},
  // 在当前验证绘画中的错误消息
  messages: [],
  // 当前验证配置
  // 名称： 验证类型
  config: {},
  // 接口方法
  validate: function (data) {
    let i, msg, type, checker, result_ok;
    this.messages = [];
    for (i in data) {
      if (data.hasOwnProperty(i)) {
        type = this.config[i];
        checker = this.types[type];
        if (!type) {
          continue;
        }
        if (!checker) {
          throw {
            name: 'ValidationError',
            message: 'No hander to validate type' + type 
          }
        }
        result_ok = checker.validate(data[i]);
        if (!result_ok) {
          msg = "Invalid value for *" + i + "*," + checker.instructions;
          this.messages.push(msg);
        }
      }
    }
    return this.hasErrors()
  },
  hasErrors: function () {
    return this.messages.length === 0;
  }
}
// 设置匹配条件 非空值的检查
validator.types.isNonEmpty = {
  validate: function(value) {
    return value !== '';
  },
  instruction: 'haohaohao'
}
// 定义参数
let data = {
  first_name: ''
}
// 定义尝试匹配的类型
validator.config = {
  first_name: 'isNonEmpty'
}
validator.validate(data) // ture