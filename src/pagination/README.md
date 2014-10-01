jquery-gallery
===================

基于jQuery的分页组件，根据服务端返回数据，配置参数，前端渲染分页。

可监听切换分页事件。

### 快速使用

    // 初始化组件实例
    // 分页容器为 id 或 $(dom);
    var pagination = gg.pagination('pagination-wrap-id', {
            currentPage: 1, // 当前页
            totalPage: 100, // 总页数
            goToPage: true  // 是否显示页面跳转
        });

    // 监听分页事件
    pagination.onSwitch(function (page) {
        console.log('当前：'+ page);
        // do something ...
    });

### 参数配置
* `currentPage`, {Number} 当前页
* `totalPage`, {Number} 总页数
* `goToPage`, {Boolean} 是否显示页面跳转

### 方法
* `onSwitch()`, 切换分页时触发

### 分页渲染出的HTML结构

    <div id="comment-page" class="nav-page">
        <!-- 分页跳转 -->
        <div class="goto-page">
            <form>
                Go to Page
                <input type="text" value="" maxlength="6" class="form-control input-sm">
                <button type="submit" class="btn btn-default btn-sm">Go</button>
            </form>
        </div>
        <!--/-->

        <!-- 页码 -->
        <ul class="pagination">
            <li data-page="2"><a>«</a></li>
            <li data-page="1"><a>1</a></li>
            <li data-page="2"><a>2</a></li>
            <li class="active" data-page="3"><a>3</a>
            <li><span>...</span></li>
            <li data-page="99"><a>99</a></li>
            <li data-page="100"><a>100</a></li>
            <li data-page="4"><a>»</a></li>
        </ul>
    </div>