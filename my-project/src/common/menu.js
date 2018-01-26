import { isUrl } from '../utils/utils';

const menuData = [{
  name: '页面管理',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: '导航管理',
    path: 'analysis',
  }, {
    name: '专题管理',
    path: 'monitor',
  }, {
    name: '小满生活',
    path: 'workplace',
    // hideInMenu: true,
  }],
}, {
  name: '广告管理',
  icon: 'book',
  path: 'exception',
}, {
  name: '活动管理',
  icon: 'form',
  path: 'form',
  children: [{
    name: '抽奖活动管理',
    path: 'basic-form',
  }, {
    name: '促销活动管理',
    path: 'step-form',
  }, {
    name: '推广URL管理',
    authority: 'admin',
    path: 'step-form/result',
  }, {
    name: '皮肤管理',
    path: 'step-form/confirm',
  }],
}, {
  name: '消息推送管理',
  icon: 'book',
  path: 'exception',
}, {
  name: '用户管理',
  icon: 'book',
  path: '',
}, {
  name: '优惠券&红包',
  icon: 'table',
  path: 'list',
  children: [{
    name: '优惠券管理',
    path: 'basic-list',
  }, {
    name: '红包管理',
    path: 'table-list',
  }],
}, {
  name: '其他管理',
  icon: 'profile',
  path: 'profile',
  children: [{
    name: '运费模板管理',
    path: 'basic',
  }, {
    name: '帮助中心管理',
    path: 'advanced',
    authority: 'admin',
  }, {
    name: 'App发布管理',
    path: 'search',
  }, {
    name: '会员反馈信息',
    path: 'search/projects',
  }, {
    name: '缓存管理',
    path: 'card-list/articles',
  }, {
    name: '服务配置',
    path: 'search',
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
