export default [
  // user
  {
    path: '/none',
    component: '../layouts/UserLayout',
  },
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/login/:id',exact:true, component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/home/index' },
      {
        path: '/home',
        name: '系统整体信息',
        icon: 'home',
        routes: [
          {
            path: '/home/index',

            name: '首页',
            component: './Monitor/Analysis',
          },
          ]
      },

      {
        path: '/monitor',
        name: '设备信息',

        icon: 'dashboard',
        routes: [
          {
            path: '/monitor/devices',
            name: '设备管理',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/monitor/devices',
                name: '设备管理',
                redirect: '/monitor/devices/list',
              },
              {
                path: '/monitor/devices/list',
                name: '设备列表',
                component: './Device/TableList',
              },
              {
                path: '/monitor/devices/info',
                name: '设备实时数据',
                component: './Device/DeviceInfo',
              },
              {
                path: '/monitor/devices/setting',
                name: '设备配置',
                component: './Device/DeviceInfo2',
              },
              {
                path: '/monitor/devices/history',
                name: '设备历史数据',
                component: './Device/DeviceInfo3',
              },
            ],
          },
          // {
          //   path: '/monitor/map',
          //   name: '地图信息',
          //   component: './Monitor/Monitor',
          // },
          // {
          //   path: '/monitor/workplace',
          //   name: '视频监控',
          //   component: './Monitor/Workplace',
          // },
        ],
      },
      /* {
        path: '/form',
        icon: 'form',
        name: 'form',
        routes: [
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                name: 'stepform',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },*/
      // list
      /*  {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },

        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },*/
      {
        name: '账号管理',
        icon: 'user',
        path: '/account',
        routes: [
          /*  {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },*/
          {
            path: '/account/settings',
            name: '个人中心',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
