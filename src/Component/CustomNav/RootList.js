// 所有权限
let arr = [
  {
    icon:'mail',
    name:'首页',
    path:'/home',
    id:'0'
  },
  {
    icon:'setting',
    name:'数据统计',
    path:'/dataCount',
    id:'1',
    children: [
      {
        name:'数据分析',
        path:'/dataCount/one',
        id:'1-0',
      },
      {
        name:'折线图',
        path:'/dataCount/two',
        id:'1-1'
      }
    ]
  },
  {
    name:'商品管理',
    id:'2',
    icon:'',
    children: [
      {
        name:'商品添加',
        path:'/food/add',
        id:'2-0'
      },
      {
        name:'商品列表',
        path:'/food/list',
        id:'2-1'
      },
      {
        name:'分类管理',
        path:'/food/classify',
        id:'2-2'
      }
      
    ]
  },
  {
    name:'订单管理',
    id:'3',
    icon:'',
    children: [
      {
        name:'订单列表',
        path:'/order/list',
        id:'3-0'
      }
    ]
  },
  {
    name:'用户管理',
    id:'4',
    icon:'',
    children: [
      {
        name:'用户列表',
        path:'/user/list',
        id:'4-0'
      }
    ]
  },
  {
    name:'管理员管理',
    id:'5',
    icon:'',
    children: [
      {
        name:'管理员信息',
        path:'/user/classify',
        id:'4-0'
      },
      {
        name:'权限分类',
        path:'/user/classify',
        id:'4-1'
      },{
        name: '权限管理',
        path:'/user/manage',
        id:'4-2'
      }
    ]
  }
]
export default arr