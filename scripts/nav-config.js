/**
 * 全站导航数据配置 —— 增/删/改 导航只需改这一个文件,然后运行:
 *     node build.js
 *
 * 数据分三块:
 *   1. menu   顶部导航菜单
 *   2. brands 品牌列表(自动出现在 顶部「产品中心」下拉 + 底部「产品中心」栏目)
 *   3. footer 底部页脚信息
 */

module.exports = {
  siteName: '广东勤微电子有限公司',
  logo: 'picture/logo/pc_logo.png',

  // ===== 顶部导航菜单 =====
  // section: 高亮栏目(值为 home/about/product/app/news/contact,对应各栏目页面的文件名归属)
  // children: 下拉子菜单;brands:true 表示下拉里放的是品牌列表
  menu: [
    { title: '首页', href: 'index.html', section: 'home' },

    {
      title: '关于我们',
      href: 'about.html',
      section: 'about',
      children: [
        { title: '关于我们', href: 'about.html' },
        { title: '团队风采', href: 'teamShowcase.html' },
        { title: '荣誉资质', href: 'template.html' },
        { title: '在线留言', href: 'template.html' },
      ],
    },

    { title: '产品中心', href: 'productCenter.html', section: 'product', brands: true },

    { title: '应用参考', href: 'application.html', section: 'app' },

    {
      title: '新闻中心',
      href: 'newsCenter.html',
      section: 'news',
      children: [
        { title: '行业新闻', href: 'newsCenter.html' },
        { title: '公司动态', href: 'template.html' },
        { title: '常见问题', href: 'template.html' },
      ],
    },

    { title: '联系我们', href: 'contactUs.html', section: 'contact' },
  ],

  // ===== 品牌列表 =====
  // 增品牌:加一行 { name: '品牌名', href: '品牌页.html' }
  // 删品牌:删掉对应那一行
  brands: [
    { name: '三菱', href: 'sanling01.html' },
    { name: '三垦', href: 'sanken01.html' },
    { name: '新洁能', href: 'xinjineng01.html' },
    { name: '龙腾', href: 'longteng01.html' },
    { name: '比亚迪', href: 'biyadi01.html' },
    { name: '丽隽PIP', href: 'pip01.html' },
    { name: '成启', href: 'chengqi01.html' },
    { name: '数明', href: 'shuming01.html' },
    { name: '亿塔', href: 'yita01.html' },
    { name: '杨杰', href: 'yangjie01.html' },
    { name: '优优', href: 'youyou01.html' },
  ],

  // ===== 底部页脚 =====
  footer: {
    aboutTitle: '公司简介',
    aboutLinks: [
      { title: '关于我们', href: 'about.html' },
      { title: '团队风采', href: 'teamShowcase.html' },
      { title: '荣誉资质', href: 'template.html' },
      { title: '在线留言', href: 'template.html' },
    ],

    newsTitle: '新闻资讯',
    newsLinks: [
      { title: '行业新闻', href: 'newsCenter.html' },
      { title: '公司动态', href: 'template.html' },
      { title: '常见问题', href: 'template.html' },
    ],

    contact: {
      name: '赵小姐 Carolyne',
      mobile: '13728165816',
      phone: '0769-89606526',
      email: 'chshxi@kinwill.com',
      address: '广东省东莞市虎门镇虎门长堤路62号1101室',
      wechat: 'Wechat：13728165816（赵小姐）',
      hours: '周一至周六:8:30~18:00',
    },

    copyright: 'Copyright © 广东勤微电子有限公司',
    qq: '2462485023',
  },
};
