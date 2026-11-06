# 勤微电子官网 · 站点维护手册

静态 HTML 站点,部署在 GitHub Pages。轮播图和导航都已「数据驱动」,日常改内容不用碰页面 HTML。

## 目录结构(维护相关)

| 文件 | 作用 | 类型 |
|------|------|------|
| `static/config/banners.js` | 轮播图数据 | 浏览器运行时(改完直接生效) |
| `static/site/pc/js/banner-loader.js` | 轮播图渲染 | 浏览器运行时 |
| `scripts/nav-config.js` | 导航数据(菜单 / 品牌 / 页脚) | 构建时(改完要跑脚本) |
| `scripts/nav-loader.js` | 导航构建脚本 | 构建时 |

---

## 一、改轮播图(不用跑脚本)

编辑 `static/config/banners.js` 里的数组:

```js
window.BANNERS = {
  default: [
    "static/image/新图1.jpg",   // 换图 = 改路径
    "static/image/新图2.jpg",   // 加图 = 加一行
    // "static/image/旧图.jpg", // 删图 = 注释或删掉这行
  ]
};
```

改完保存即可,浏览器加载时 JS 直接读取,**无需跑任何脚本**。

---

## 二、改导航 / 品牌 / 联系方式(要跑一次脚本)

所有导航相关内容都在 `scripts/nav-config.js`。改完后,在站点根目录执行:

```bash
node scripts/nav-loader.js
```

脚本会把顶部导航 + 底部页脚重新生成到全部页面。

### ① 加 / 删品牌

```js
brands: [
  { name: '三菱', href: 'sanling01.html' },
  { name: '某微电子', href: 'mouwei01.html' },   // 加品牌:加一行
],
```

删品牌 = 删掉对应那一行。**品牌会自动同步到两处**:顶部「产品中心」下拉 + 底部「产品中心」栏目,无需手动改两处。

### ② 改菜单文字 / 链接

改 `menu` 里对应项的 `title` / `href`。

### ③ 改联系方式 / 版权

改 `footer` 块里的 `contact`、`copyright`、`qq` 等。

---

## 三、新增菜单(带「当前栏目高亮」)完整示例

假设要加一个「解决方案」栏目,对应页面 `solution.html`,并且进入该页时菜单高亮。

### 步骤 1:改 `scripts/nav-config.js`,在 `menu` 里加一项

```js
menu: [
  { title: '首页', href: 'index.html', section: 'home' },
  // ...其他菜单...
  { title: '解决方案', href: 'solution.html', section: 'solution' },  // ← 新增,注意 section 值
],
```

### 步骤 2:改 `scripts/nav-loader.js` 的 `sectionOf()`

```js
function sectionOf(filename) {
  if (filename === 'index.html') return 'home';
  if (filename === 'about.html' || filename.startsWith('teamShowcase')) return 'about';
  if (filename === 'application.html') return 'app';
  if (filename === 'contactUs.html') return 'contact';
  if (filename.startsWith('news')) return 'news';
  if (filename === 'solution.html' || filename.startsWith('solution')) return 'solution'; // ← 新增
  if (filename === 'template.html' || filename === 'test.html') return 'none';
  return 'product';
}
```

### 步骤 3:跑脚本

```bash
node scripts/nav-loader.js
```

### 原理(为什么改这两处)

`sectionOf()` 根据当前页面的文件名判断它属于哪个栏目,返回一个字符串(如 `'solution'`)。`nav-config.js` 里菜单项的 `section` 字段也是这个字符串。**两者完全一致时**,该菜单项就会被加上 `active` 高亮。

所以关键点就一条:`nav-config.js` 里的 `section` 值,和 `sectionOf()` 里 `return` 的字符串,**必须一模一样**。

> 补充:如果新菜单不需要高亮,可以不给 `section` 字段(或给一个 `sectionOf()` 永远不会返回的值),步骤 2 可跳过。

---

## 四、提交发布

```bash
git add -A
git commit -m "更新内容"
git push origin main
```

---

## 五、两种文件的区别(重要)

| | 轮播图 | 导航 |
|---|---|---|
| 数据文件 | `static/config/banners.js` | `scripts/nav-config.js` |
| 改完是否跑脚本 | ❌ 不用 | ✅ 必须 `node scripts/nav-loader.js` |
| 为什么不同 | 图片是装饰,JS 运行时渲染即可 | 导航链接是 SEO 核心,必须生成到静态 HTML 里 |

**最容易忘的一步:改完导航一定要跑 `node scripts/nav-loader.js`**,否则只有配置变了、页面没更新。
