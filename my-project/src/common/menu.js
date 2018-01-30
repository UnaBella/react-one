import { isUrl } from '../utils/utils';

const menuData = [{
  name: '页面管理',
  icon: 'switcher',
  path: 'document',
  children: [{
    name: '导航管理',
    path: 'nav',
  }, {
    name: '专题管理',
    path: 'sub',
  }, {
    name: '小满生活',
    path: 'life',
    // hideInMenu: true,
  }],
}, {
  name: '广告管理',
  icon: 'form',
  path: 'adv',
}, {
  name: '活动管理',
  icon: 'skin',
  path: 'act',
  authority: 'admin',
  children: [{
    name: '抽奖活动管理',
    path: 'lottery',
  }, {
    name: '促销活动管理',
    path: 'promotion',
  }, {
    name: '推广URL管理',
    authority: 'admin',
    path: 'url',
  }, {
    name: '皮肤管理',
    path: 'skin',
  }],
}, {
  name: '消息推送管理',
  icon: 'message',
  path: 'message',
}, {
  name: '用户管理',
  icon: 'user',
  path: 'users',
}, {
  name: '优惠券&红包',
  icon: 'red-envelope',
  path: 'coupon',
  children: [{
    name: '优惠券管理',
    path: 'discount',
  }, {
    name: '红包管理',
    path: 'money',
    authority: 'admin',
  }],
}, {
  name: '其他管理',
  icon: 'appstore-o',
  path: 'other',
  children: [{
    name: '运费模板管理',
    path: 'freight',
  }, {
    name: '帮助中心管理',
    path: 'help',
  }, {
    name: 'App发布管理',
    path: 'app',
  }, {
    name: '会员反馈信息',
    path: 'feedback',
  }, {
    name: '缓存管理',
    path: 'cache',
  }, {
    name: '服务配置',
    path: 'config',
  }],
}];

function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
