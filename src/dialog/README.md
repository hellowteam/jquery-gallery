dialog
===================

页面弹层组件，基于jQuery。可配置属性和绑定回调事件。

* 版本：1.0.0
* 教程：
* DEMO：

### 快速使用

    // 初始化组件实例，配置弹框属性
    var demoDialog = JQ.dialog({
            title: 'dialog1',
            content: '弹框内容',
            onOpen: function () {alert('open...');},
            onClose: function () {alert('close...');},
            buttons: [
                {
                    text: '确定',
                    clazz: 'btn-ok',
                    click: function () {alert(1);}
                },
                {
                    text: '取消'
                }
            ]
        });

    // 页面上弹出弹框
    demoDialog.open();

### 参数配置
* `title`,      {String} 标题
* `content`,    {String} 弹框内容
* `buttons`,    {Array} 弹框确认按钮
* `width`,      {Number} 弹框宽度
* `clazz`,      {String} 自定义class
* `backdrop`,   {Boolean | 'static'} 是否显示背景，'static'表示点击背景不关闭弹框
* `escape`,     {Boolean} 按Esc关闭弹框
* `onClose`,    {Function} 关闭弹框回调事件
* `onOpen`,     {Function} 打开弹框回调事件
* * `remote`,     {URL} 通过$.load()方法异步加载弹框内容。(TODO)


### 方法
* `open()`, 显示页面弹框
* `close()`, 关闭页面弹框
* `set()`, 重新配置置弹框属性
* `onOpen()`, 绑定打开弹框回调事件
* `onClose()`, 绑定关闭弹框回调事件

### Dialog渲染出的HTML结构

    <div class="dialog-popup" tabindex="0">
        <div class="dialog-body">
            <div class="dialog-header">
                <button type="button" data-dismiss="true" class="close">&times;</button>
                <h4 class="dialog-title">{{title}}</h4>
            </div>
            <div class="dialog-content">{{content}}</div>
            <div class="dialog-buttons">{{buttons}}</div>
        </div><!-- .dialog-body -->
        <div class="dialog-overlay"></div>
    </div>