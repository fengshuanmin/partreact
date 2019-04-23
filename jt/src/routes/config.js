export default {

    menus:[

        {
            key: '/app/smartquotation', title: '智能报价',icon: 'rocket',
            subs:[
                {key: '/app/smartquotation', title: '智能报价', component:'Smartquotation'},
            ]
        },

        {
            key: '/app/goodsmanage', title: '商品管理', icon: 'bars',
            subs:[
                {key: '/app/goodsmanage', title: '商品管理', component:'GoodsManage'},
                {key: '/app/goodsaddition', title: '批量添加', component:'Goodsaddition'},
            ]

        },
        {
            key: '/app/stocklist', title: '库存共享管理', icon: 'bars',
            subs:[
                {key: '/app/stocklist', title: '对外共享', component:'Stocklist'},
                {key: '/app/mystock', title: '向我共享', component:'Mystock'},

            ]

        },
        {
            key: '/app/offerlist', title: '报价记录', icon: 'bars',
            subs:[
                {key: '/app/offerlist', title: '报价记录', component:'Offerlist'},
            ]
        },

        {
            key: '/app/ordersmanage', title: '订单管理', icon: 'appstore',
            subs:[
                {key: '/app/ordersmanage', title: '订单管理', component:'OrdersManage',},
                // {key: '/app/orderdetail', title: '订单详情', component:'OrderDetail',},
            ]
        },

        {

            key: '/app/user/person', title: '我的账户', icon: 'user',
            subs: [
                { key: '/app/user/person', title: '个人设置', component: 'PersonSetting'},
                { key: '/app/user/company', title: '公司设置', component: 'CompanySetting'},
                // { key: '/app/user/account', title: '账户续费', component: 'AccountSetting'},
                { key: '/app/user/pwd', title: '密码修改', component: 'PwdSetting'},
            ],
        }/*,
        { key: '/app/test', title: '测试', icon: 'mobile', component: 'TEST' },
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },

        {
            key: '/app/ui', title: 'UI', icon: 'scan',
            subs: [
                { key: '/app/ui/buttons', title: '按钮', component: 'Buttons'},
                { key: '/app/ui/icons', title: '图标', component: 'Icons'},
                { key: '/app/ui/spins', title: '加载中', component: 'Spins'},
                { key: '/app/ui/modals', title: '对话框', component: 'Modals'},
                { key: '/app/ui/notifications', title: '通知提醒框', component: 'Notifications'},
                { key: '/app/ui/tabs', title: '标签页', component: 'Tabs'},
                { key: '/app/ui/banners', title: '轮播图', component: 'Banners'},
                { key: '/app/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle'},
                { key: '/app/ui/drags', title: '拖拽', component: 'Drags'},
                { key: '/app/ui/gallery', title: '画廊', component: 'Gallery'},
                { key: '/app/ui/map', title: '地图', component: 'MapUi'},
            ],
        },
        {
            key: '/app/animation', title: '动画', icon: 'rocket',
            subs: [
                { key: '/app/animation/basicAnimations', title: '基础动画', component: 'BasicAnimations'},
                { key: '/app/animation/exampleAnimations', title: '动画案例', component: 'ExampleAnimations'},
            ],
        },
        {
            key: '/app/table', title: '表格', icon: 'copy',
            subs: [
                { key: '/app/table/basicTable', title: '基础表格', component: 'BasicTable'},
                { key: '/app/table/advancedTable', title: '高级表格', component: 'AdvancedTable'},
                { key: '/app/table/asynchronousTable', title: '异步表格', component: 'AsynchronousTable'},
            ],
        },
        {
            key: '/app/form', title: '表单', icon: 'edit',
            subs: [
                { key: '/app/form/basicForm', title: '基础表单', component: 'BasicForm'},
            ],
        },
        {
            key: '/app/chart', title: '图表', icon: 'area-chart',
            subs: [
                { key: '/app/chart/echarts', title: 'echarts', component: 'Echarts' },
                { key: '/app/chart/recharts', title: 'recharts', component: 'Recharts' },
            ],
        },
        {
            key: '/subs4', title: '页面', icon: 'switcher',
            subs: [
                { key: '/login', title: '登录' },
                { key: '/404', title: '404' },
            ],
        },
        {
            key: '/app/auth', title: '权限管理', icon: 'safety',
            subs: [
                { key: '/app/auth/basic', title: '基础演示', component: 'AuthBasic' },
                { key: '/app/auth/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage' },
            ],
        },
        {
            key: '/app/cssModule', title: 'cssModule', icon: 'star', component: 'Cssmodule'
        },
        {
            key: '/app/extension', title: '功能扩展', icon: 'bars',
            subs: [
                { key: '/app/extension/queryParams', title: '问号形式参数', component: 'QueryParams', query: '?param1=1&param2=2' },
            ],
        },*/
    ],


    menus1: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/app/ui', title: 'UI', icon: 'scan',
            subs: [
                { key: '/app/ui/buttons', title: '按钮', component: 'Buttons'},
                { key: '/app/ui/icons', title: '图标', component: 'Icons'},
                { key: '/app/ui/spins', title: '加载中', component: 'Spins'},
                { key: '/app/ui/modals', title: '对话框', component: 'Modals'},
                { key: '/app/ui/notifications', title: '通知提醒框', component: 'Notifications'},
                { key: '/app/ui/tabs', title: '标签页', component: 'Tabs'},
                { key: '/app/ui/banners', title: '轮播图', component: 'Banners'},
                { key: '/app/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle'},
                { key: '/app/ui/drags', title: '拖拽', component: 'Drags'},
                { key: '/app/ui/gallery', title: '画廊', component: 'Gallery'},
                { key: '/app/ui/map', title: '地图', component: 'MapUi'},
            ],
        },
        {
            key: '/app/animation', title: '动画', icon: 'rocket',
            subs: [
                { key: '/app/animation/basicAnimations', title: '基础动画', component: 'BasicAnimations'},
                { key: '/app/animation/exampleAnimations', title: '动画案例', component: 'ExampleAnimations'},
            ],
        },
        {
            key: '/app/table', title: '表格', icon: 'copy',
            subs: [
                { key: '/app/table/basicTable', title: '基础表格', component: 'BasicTable'},
                { key: '/app/table/advancedTable', title: '高级表格', component: 'AdvancedTable'},
                { key: '/app/table/asynchronousTable', title: '异步表格', component: 'AsynchronousTable'},
            ],
        },
        {
            key: '/app/form', title: '表单', icon: 'edit',
            subs: [
                { key: '/app/form/basicForm', title: '基础表单', component: 'BasicForm'},
            ],
        },
        {
            key: '/app/chart', title: '图表', icon: 'area-chart',
            subs: [
                { key: '/app/chart/echarts', title: 'echarts', component: 'Echarts' },
                { key: '/app/chart/recharts', title: 'recharts', component: 'Recharts' },
            ],
        },
        {
            key: '/subs4', title: '页面', icon: 'switcher',
            subs: [
                { key: '/login', title: '登录' },
                { key: '/404', title: '404' },
            ],
        },
        {
            key: '/app/auth', title: '权限管理', icon: 'safety',
            subs: [
                { key: '/app/auth/basic', title: '基础演示', component: 'AuthBasic' },
                { key: '/app/auth/routerEnter', title: '路由拦截', component: 'RouterEnter', auth: 'auth/testPage' },
            ],
        },
        {
            key: '/app/cssModule', title: 'cssModule', icon: 'star', component: 'Cssmodule'
        },
        {
            key: '/app/extension', title: '功能扩展', icon: 'bars',
            subs: [
                { key: '/app/extension/queryParams', title: '问号形式参数', component: 'QueryParams', query: '?param1=1&param2=2' },
            ],
        },
    ],
    others: [
        {key: '/app/goodsupdate', title: '商品添加', component:'Goodupdate'},
        {key: '/app/orderdetail', title: '订单详情', component:'OrderDetail'},
        {key: '/app/offerdetail', title: '报价详情', component:'Offerdetail'},
        {key: '/app/addgoods', title: '商品添加', component:'AddGoods'},
    ] // 非菜单相关路由
}