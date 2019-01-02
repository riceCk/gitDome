# 对util.js中方法的说明
## 优化动画
```bash
<div id="btn" style="width: 100px; height: 100px; position: relative; left: 0; background-color: red;"></div>
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
