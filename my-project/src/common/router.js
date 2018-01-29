import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) => (
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  }));

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach((model) => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return (props) => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () => models.filter(
      model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)
    ),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then((raw) => {
        const Component = raw.default || raw;
        return props => createElement(Component, {
          ...props,
          routerData: routerDataCache,
        });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach((item) => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = (app) => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    // 页面管理-导航管理
    '/document/nav': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 页面管理-专题管理
    '/document/sub': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 页面管理-小满生活
    '/document/life': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
      // hideInBreadcrumb: true,
      // name: '页面管理',
      // authority: 'admin',
    },
    // 广告管理
    '/adv': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 活动管理-抽奖活动管理
    '/act/lottery': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 活动管理-促销活动管理
    '/act/promotion': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 活动管理-推广URL管理
    '/act/url': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 活动管理-皮肤管理
    '/act/skin': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 消息推送管理
    '/message': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 用户管理
    '/users': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 优惠券 & 红包 - 优惠券管理
    '/coupon/discount': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 优惠券 & 红包 - 红包管理

    '/coupon/money': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/coupon/discount')),
    },
    // 其他管理 - 运费模板管理
    '/other/freight': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 其他管理 - 帮助中心管理
    '/other/help': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 其他管理 - App发布管理
    '/other/app': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 其他管理 - 会员反馈信息
    '/other/feedback': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 其他管理 - 缓存管理
    '/other/cache': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    // 其他管理 - 服务配置
    '/other/config': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () => import('../routes/Exception/triggerException')),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach((path) => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`/${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
    };
    routerData[path] = router;
  });
  return routerData;
};
