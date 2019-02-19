# :book: 对util.js中方法的说明
```bash
| - getCurDate 任意时间Date置换成字符串
| - add_mounth 获取几月之后的时间
| - getScrollOffset 封装滚动条
| - getStyle 标签属性
| - regular 正则匹配
| - throttle 节流（处理按钮疯狂点击）
| - dragEvent 物体拖拽方法
| - requestAnimFrame 优化动画
  - cancelAnimFrame
| - addHandler ie兼容事件绑定或消除延迟加载
  - removeHandler
| - cacheFunc 缓存储存
| - inherit 原型继承
| - extendDeep 深度克隆
| - memorize 缓存机制，函数记忆
```
## 优化动画
```bash
<div id="btn" 
    style="width: 100px; height: 100px; 
            position: relative; left: 0; 
            background-color: red;"
    >
</div>
------------------------------------------
<script src="util.js"></script>
<script>
    let req;
    function move() {
        let btn = document.getElementById('btn');
        btn.style.left = btn.offsetLeft + 10 + 'px';
        if (btn.offsetLeft >= 300) {
            cancelAnimationFrame(req);
            btn.style.left = '300px'
        } else {
            req = requestAnimationFrame(move);
        }
    }
    move();
</script>
```

## 函数缓存记忆`
用于递归函数
```bash
let factorial = utils.memorize(function (n) {
    return (n <= 1) ? 1 : n * factorial(n - 1)
})
factorial(5)
```