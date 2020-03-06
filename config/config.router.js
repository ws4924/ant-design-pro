export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/DashboardWorkplace',
          },
          {
            name: 'DashboardWorkplace',
            icon: 'smile',
            path: '/DashboardWorkplace',
            component: './DashboardWorkplace',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
          },
          {
            path: '/account',
            name: 'account',
            icon: 'user',
            routes: [
              {
                path: '/account/center',
                name: 'center',
                icon: 'idcard',
                component: './account/center',
                authority: ['admin', 'user'],
              },
              {
                path: '/account/table',
                name: 'table',
                icon: 'user',
                component: './account/table',
                authority: ['admin', 'user'],
              },
              {
                path: '/account/table-tab',
                name: 'table-tab',
                icon: 'user',
                component: './account/table-tab',
                authority: ['admin', 'user'],
              },
              {
                path: '/account/modal',
                name: 'modal',
                icon: 'user',
                component: './account/modal',
                authority: ['admin', 'user'],
              },
              {
                path: '/account/account-message',
                name: 'account-message',
                icon: 'money-collect',
                component: './account/account-message',
                authority: ['admin', 'user'],
              },
              {
                path: '/account/change-phone-number',
                name: 'change-phone-number',
                icon: 'mobile',
                component: './account/change-phone-number',
                authority: ['admin', 'user'],
              },
              {
                path: '/account/change-password',
                name: 'change-password',
                icon: 'key',
                component: './account/change-password',
                authority: ['admin', 'user'],
              },
              {
                path: '/account/detail',
                component: './account/detail',
                hidden: true,
                //详情页不需要在menu上显示
                routes: [
                  {
                    name: '详情',
                    path: '/account/detail',
                    component: './account/detail',
                  },
                ],
              },
              {
                name: '查询表格',
                icon: 'smile',
                path: '/account/listtablelist',
                component: './account/ListTableList',
              },
              {
                component: './404',
              },
            ],
          },
          {
            path: '/partsOffer/partsOffer',
            name: 'partsOffer',
            icon: 'crown',
            component: './partsOffer/partsOffer',
            authority: ['admin'],
          },
          {
            path: '/example/example',
            name: 'example',
            icon: 'crown',
            component: './example/example',
            authority: ['admin'],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
