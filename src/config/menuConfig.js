const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '数据统计',
    key: '/charts',
    icon: 'area-chart',
    children: [
      {
        title: '数据分析',
        key: '/charts/bar',
        icon: 'bar-chart'
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'line-chart'
      }
    ]
  },

  {
    title: '商品管理',
    key: '/products',
    icon: 'appstore',
    children: [ // 子菜单列表
      {
        title: '商品列表',
        key: '/food/list',
        icon: 'bars'
      },
      {
        title: '商品分类',
        key: '/food/classify',
        icon: 'tool'
      },
      {
        title: '商品添加',
        key: '/food/add',
        icon: 'bars'
      },
      {
        title: '商品删除',
        key: '/food/del',
        icon: 'tool'
      }
    ]
  },
  {
    title: '订单管理',
    key: '/order',
    icon: 'windows',
    children: [
      {
        title: '订单列表',
        key: '/order/list',
        icon: 'bar-chart'
      },
      {
        title: '订单添加',
        key: '/order/add',
        icon: 'line-chart'
      },
      {
        title: '订单删除',
        key: '/order/del',
        icon: 'pie-chart'
      },
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: 'user',
    children: [
      {
        title: '用户列表',
        key: '/user/list',
        icon: 'bar-chart'
      },
      {
        title: '用户添加',
        key: '/user/add',
        icon: 'line-chart'
      },
      {
        title: '用户删除',
        key: '/user/del',
        icon: 'pie-chart'
      },
    ]
  },
  {
    title: '管理员管理',
    key: '/role',
    icon: 'safety',
  },

  
  
]

export default menuList