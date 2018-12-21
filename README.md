# 项目介绍
## 业务逻辑
### 后台：
- FTP上传下载
- 分布式计算和存储

### 前台：
- 数据
    - 分类列表：输入（标准数据集）、输出、模型关联
    - 数据详情：可以预览和下载数据
    - 数据可视化列表页面
    - 数据可视化服务调用配置页面
    - 数据处理工具列表页面
    - 数据处理工具调用配置页面
    - 数据比较列表页面
    - 数据比较配置及结果页面
- 模型
    - 模型列表页面
    - 模型配置详情页面
- 计算
    - 计算记录列表页面
    - 计算记录配置详情页面
- 比较
    - 比较记录列表页面
    - 比较配置详情页面
        - 视角：配置过程、计算结果、计算耗费资源的统计
- 个人空间
    - 所有的个人资源列表

# 用户指南

# 开发者指南
## Install
启动之前要先启动后台服务
```
# 后台
#   start nginx
#   start geoserver

# 前台
npm install
npm run debug
```
如有端口冲突更改`package.json`中的`"start": "ng serve --port 8888 --proxy-config proxy.conf.json"`。

## TODO
type: optimization, feature, important, style
- [x] ~~L2: docking layout~~
- [x] ~~L3: 页面加载速度~~
- [x] ~~L2: 评论系统~~
- [x] ~~L2: 和bootstrap结合~~
- [x] ~~L3: 分割 common module ，打包后太大~~
- [ ] L3: echarts tree-shaking
- [x] ~~L3: zorro tree-shaking~~
- [x] ~~L3: custom material theme~~
- [ ] L3: remove slim-loading-bar, use mat-progress-bar
- [ ] L3: remove list-template, use mat-list
- [ ] L3: remove disabled-button, use snackbar to alert valid state
- [ ] L3: remove header, use mat-toolbar
- [ ] L3: remove custom card, use mat-card
- [x] ~~L1: remove ng-zorro-antd, 样式和组件冲突，首先移除 !!!~~
- [ ] L1: 首页重新设计，展现的元素尽量少，首页去除 ajax
- [ ] L3: 动态设置 title
- [ ] L3: primer style
    - [ ] colorful label/tag
    - [ ] navigation component/filter/menu
    - [ ] popover
    - [x] subhead with description
    - [ ] css-truncate
    - [ ] color plaette
    - [x] Typography
    - [ ] remove simplemde, use primer-markdown
    - [ ] comment markdown
- [ ] L2: calcu detail
    - [x] mat-tab: basic-info, data configuration, conversation
    - [ ] 结果打包下载
- [ ] L3: auth guard
- [x] L3: mongodb 大文档的查询效率
- [ ] L3: build-optimizer 入口代码被当做 dead code 删掉了？
- [ ] L3: lazy-loading:
    - [x] conversation
    - [ ] sider-section
- [ ] L2: 并行计算接入
    - [ ] 结算节点的注册
    - [ ] 模型调用接口相同，用户并不知道是否使用了并行，但同时要暴露并行调用的参数
    - [ ] 并行结果/效率的查看，转到并行服务管理器
- [x] L3: RESTful API
- [x] L3: 数据库重新设计，尽量使数据库操作最小化
- [ ] L3: angular universe, 服务端渲染
- [ ] L2: search
- [ ] L3: 后台数据库 patch 局部更新
- [ ] 路由复用：比如列表翻页的场景，当我在第三页找到想要的item，点到详情页后重新后退，发现回退到了第一页。两种解决方法，1) 把分页参数放在url中；2) 使用路由复用 RouteReuseStrategy
- [ ] datasets: 
    - [ ] 左侧栏分类筛选（观测数据集，模拟数据集，时间范围，空间范围，支持的模型，时间频率，实验的名字，变量的名字），右侧预览和下载
    - [x] 数据集的元数据描述：时间范围、空间范围、时间分辨率、空间分辨率、变量、维度
- [ ] solution: 
    - [x] cmpObj 的配置项更加简洁明了
    - [x] model input 非常细致的对比
    - [x] 把选择数据范围去掉。所有数据配置项都放在 task 的创建上
    - [ ] 统计信息的显示：半年内的热度、收藏数、关注者
    - [x] 对比方案以勾选的形式创建
- [ ] task: 
    - [ ] 统计信息：任务进度、执行耗时统计
    - [ ] 运行日志的显示
    - [x] 页面的层级结构设计
- [ ] model:
    - [ ] 调参，各种参数的详细暴露
    - [ ] 可选参数的配置
    - [x] mat-tab: wiki, data description, conversation
    - [x] sider-bar: topic, solution, notification
- [ ] user
    - [ ] 路由 RESTful 风格化：user/:username
    - [ ] 关注、收藏的 topic, sln, task
    - [ ] 消息订阅与通知：subscribeToggle 统一处理所有资源，而不是分别处理
    - [ ] 页面右下角加后台运行列表
    - [ ] 正在运行的任务
- [ ] linux 上的部署
- [ ] 标准变量表，对比方案、对比任务、
    - [x] 字段：name, long_name, unit, description, category, scale, offset, min, max, couldCMP
    - [ ] event 里加 scale, offset 字段
- [x] 将实验列表、介绍放在 wiki 中
- [x] 可以对比的 metric 需要满足两个条件：metric name 相同；event 的 time variable 和 lat variable, long variable 一致（时间上必须一致，空间上有重叠就行）
- [x] cmp-methods:
    - [x] taylor diagram
    - [x] 箱图
    - [x] 散点图

## Architecture

### business
页面相关业务，建议按前台路由或者导航栏目录来组织模块，将每个页面放在一个 module 中，通过懒加载降低首屏加载速度。

### shared
可重用的一些组件、指令、管道、主题、验证器放在这里

header-menu-layout: 导航栏在头部的布局
sider-menu-layout: 导航栏在侧部的布局

#### ngx-shared
angular自带的一些常用模块，一般大多数module中都要用，所以单独放在import中，并重新export。

#### 地图模块
- 标准图层库
- 图层树
    - 底图支持选择数据源
    - 添加图层，从图层库中选择
- 工具栏
- 编辑模式
- 样式调整
- 动画

### core
一些只加载一遍的核心模块，包括：
- 预加载器
    custom-preloading-strategy：自定义预加载策略，angular只支持全部热加载和全部懒加载，不支持部分热加载，需要自定义该策略。
- 拦截器
    在发出请求和收到响应之前拦截，对数据进行解析。
    其实用拦截器处理比较复杂，可以通过重写 `HttpClient` 的请求来实现拦截。具体见`http.client.service`
- ACL：访问控制列表
- 翻译器
- 通用服务
    - startup.service：加载配置文件，是服务的入口
    - settings.service：读取配置文件
    - http.client.service：重新封装HttpClient
    - menu.service：用于配置menu
    - colors.service：常用的颜色别名
    - themes.service：用于设置皮肤
    - dynamic-title.service：动态设置标题

## 开发者说明
**layout**

- grid: primer-grid-layout, refer [here](https://styleguide.github.com/primer/objects/grid#column-widths)
- flex

**How to use 3td party module**

优先通过 ES6 module 导入，可以享受到 tree-shaking，如果库不支持的话，在 angular.json 中将三方库整个引入。并在`typings.d.ts`中添加声明。
``` typescript
declare var jQuery: any;
```

**dynamic define title**

两种情况：
- 在路由中配置 Title。如下，注意data要放在叶节点的路由配置中，要不然太乱
``` typescript
{
    path: 'home',
    component: XXXComponent,
    data: {
        title: 'This is title'
    }
}
```
- 根据Ajax请求的数据动态设置Title。在组件内部通过 `this.title.setTitle(variable)`

**module preload**

``` typescript
{
    path: 'home',
    loadChildren: '...',
    data: {
        preload: true
    }
}
```

**responsive**

- nav 和 footer 不用管，响应式是写好的
- 中间的 rx-box 部分的响应式，在需要应用布局时，给 div 添加 .rx-box 类名或 rx-box 指令即可

``` css
@mixin layout($paddingHorizontal) {
    nav {
        padding: 0 $paddingHorizontal;
    }
    .rx-box {
        padding: 24px $paddingHorizontal;
    }
    footer {
        padding-left: $paddingHorizontal !important;
        padding-right: $paddingHorizontal !important;
    }
}
```

**代码风格**

- 文件和文件夹命名：烤串命名法
- 文件命名：feature.type.ts
