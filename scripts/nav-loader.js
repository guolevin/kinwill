/**
 * 导航构建脚本 —— 从 nav-config.js 生成顶部/底部导航,写回所有页面
 *
 * 用法: 在站点根目录运行  node scripts/nav-loader.js
 * 数据都在 scripts/nav-config.js 里,改完跑一次即可。
 */
const fs = require('fs');
const path = require('path');
const config = require('./nav-config.js');

// 站点根目录(nav-loader.js 位于 scripts/ 下,往上 1 级到站点根)
const ROOT = path.join(__dirname, '..');

const { siteName, logo, menu, brands, footer } = config;
const c = footer.contact;

// ================= 顶部 header 生成 =================

function renderDropdownChildren(items) {
  return items
    .map(
      (it) =>
        `                  <a href="${it.href}" target="_self" title="${it.title}"\n                    class="dropdown-item navlist-2 "><span>${it.title}</span></a>`
    )
    .join('\n');
}

function renderMenuItems(section) {
  return menu
    .map((item) => {
      const activeCls = section === item.section ? ' active' : '';
      if (item.brands || item.children) {
        const children = item.brands
          ? brands.map((b) => ({ title: b.name, href: b.href }))
          : item.children;
        return `              <li class="nav-item  dropdown m-l-0 ">
                <a href="${item.href}" title="${item.title}" data-title="${item.title}" class="nav-link${activeCls} dropdown-toggle dropdown"
                  data-toggle="dropdown" data-hover="dropdown" target="_self"><span>${item.title}</span></a>

                <div class="dropdown-menu dropdown-menu-right dropdown-menu-bullet secondmenu">
${renderDropdownChildren(children)}
                </div>
              </li>`;
      }
      return `              <li class="nav-item ">
                <a href="${item.href}" title="${item.title}" data-title="${item.title}" class="nav-link${activeCls}"
                  target="_self"><span>${item.title}</span></a>
              </li>`;
    })
    .join('\n');
}

function renderHeader(section) {
  return `<header class="met-head navbar-fixed-top" p-id="57416" m-type="head_nav" met-imgmask="">
    <nav class="head_nav navbar navbar-default box-shadow-none head_nav_qilin_16_1_57416">
      <div class="container">
        <div class="row">
          <!-- logo -->
          <div class="navbar-header pull-xs-left">
            <div class="vertical-align-middle">
              <a href="index.html">
                <img src="${logo}" alt="${siteName}" style="max-height:50px;height:auto;width:auto;" />
              </a>
            </div>
          </div>
          <!-- logo -->
          <button type="button"
            class="navbar-toggler hamburger hamburger-close collapsed p-x-5 head_nav_qilin_16_1_57416-toggler"
            data-target="#head_nav_qilin_16_1_57416-collapse" data-toggle="collapse"> <span class="sr-only"></span>
            <span class="hamburger-bar"></span> </button>
          <!-- 导航 -->
          <div class="collapse navbar-collapse navbar-collapse-toolbar pull-md-right p-0"
            id="head_nav_qilin_16_1_57416-collapse">
            <ul class="nav navbar-nav navlist">
${renderMenuItems(section)}
            </ul>
          </div>
          <!-- 导航 -->
        </div>
      </div>
    </nav>
  </header>`;
}

// ================= 底部 footer 生成 =================

function renderFootLinks(items) {
  return items
    .map((l) => `            <li> <a href="${l.href}" title="${l.title}" target="_self">${l.title}</a> </li>`)
    .join('\n');
}

function renderBrandCol(list) {
  return list
    .map((b) => `            <li> <a href="${b.href}" title="${b.name}" target="_self">${b.name}</a> </li>`)
    .join('\n');
}

function renderFooter() {
  const mid = Math.ceil(brands.length / 2);
  const col1 = brands.slice(0, mid);
  const col2 = brands.slice(mid);

  return `<!--foot_begin-->
  <div class="foot_nav_qilin_11_2_57413 border-top1 text-xs-center" p-id="57413" m-type="foot_nav">
    <div class="container">
      <div class="col-lg-8 col-md-12 nav-list">

        <div class="col-md-2 col-sm-12 list">
          <h4 class="m-t-0">
            <a href="about.html" title="${footer.aboutTitle}" class="btn-collapse" target="_self">${footer.aboutTitle}</a>
            <i class="fa fa-chevron-down"></i>
          </h4>
          <ul class="ulstyle  m-b-0" id="list-41273">
${renderFootLinks(footer.aboutLinks)}
          </ul>
        </div>

        <div class="col-md-2 col-sm-12 list">
          <h4 class="m-t-0">
            <a href="productCenter.html" title="产品中心" class="btn-collapse" target="_self">产品中心</a>
            <i class="fa fa-chevron-down"></i>
          </h4>
          <ul class="ulstyle  m-b-0" id="list-41273">
${renderBrandCol(col1)}
          </ul>
        </div>

        <div class="col-md-2 col-sm-12 list">
          <h4 class="m-t-0">
            <a href="productCenter.html" title="产品中心" class="btn-collapse" target="_self">产品中心</a>
            <i class="fa fa-chevron-down"></i>
          </h4>
          <ul class="ulstyle  m-b-0" id="list-41273">
${renderBrandCol(col2)}
          </ul>
        </div>
        <div class="col-md-2 col-sm-12 list">
          <h4 class="m-t-0">
            <a href="newsCenter.html" title="${footer.newsTitle}" class="btn-collapse" target="_self">${footer.newsTitle}</a>
            <i class="fa fa-chevron-down"></i>
          </h4>
          <ul class="ulstyle  m-b-0" id="list-41273">
${renderFootLinks(footer.newsLinks)}
          </ul>
        </div>

        <div class="col-md-3 col-sm-12 list">
          <h4 class="m-t-0"> <a title="关注我们" class="btn-collapse" style="text-align: left;">关注我们</a> <i
              class="fa fa-chevron-down"></i> </h4>
          <ul id="list-social">

            <!-- <li>
              <i class="fa fa-user"></i>
              <span>Carolyne（赵小姐）</span>
            </li> -->

            <li>
              <i class="fa fa-mobile"></i>
              <span>${c.mobile}</span>
            </li>

            <li>
              <i class="fa fa-phone"></i>
              <span>${c.phone}</span>
            </li>

            <li>
              <i class="fa fa-envelope"></i>
              <span>${c.email}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-4 col-md-12 col-ms-12 col-xs-12 info">
        <a class="foot-tel">${c.wechat}</a>
        <p>${c.hours}</p>
        <a href="contactUs.html" class="btn-message" title="联系我们"> <i class="fa fa-question-circle"></i> 联系我们
        </a>
      </div>
    </div>
  </div>
  <footer class="foot_info_qilin_11_2_57414" p-id="57414" m-type="foot">
    <div class="container text-xs-center  p-y-20 p-x-0">
      <div class="info text-xs-left">
        <p>
          <span>${footer.copyright} &nbsp;&nbsp;
          </span>

        </p>
      </div>
    </div>
  </footer>
  <div class="foot_info_qilin_11_2_57414_bottom text-xs-center " p-id="57414" data-bg="#3e8378|#f43c48|1"
    data-ifbotc="#3e8378" style="background: rgb(62, 131, 120);">
    <div class="main">
      <div class="">
        <a href="tel:${c.mobile}" class="item" target="_blank"> <i class="fa fa-phone"></i> <span q-id="895919"
            q-table="ui_config" q-field="uip_value" class="editable-click">电话咨询</span> </a>
      </div>
      <div class="">
        <a href="/product/" class="item" target="_blank"> <i class="fa fa-shopping-cart"></i>
          <span q-id="895920" q-table="ui_config" q-field="uip_value" class="editable-click">产品中心</span> </a>
      </div>
      <div class="">
        <a href="/news/" class="item" target="_blank"> <i class="fa fa-paste"></i> <span q-id="895921"
            q-table="ui_config" q-field="uip_value" class="editable-click">新闻资讯</span> </a>
      </div>
      <div class="">
        <a href="mqqwpa://im/chat?chat_type=wpa&amp;uin=${footer.qq}&amp;version=1&amp;src_type=web"
          class="item" target="_blank"> <i class="fa fa-qq"></i> <span q-id="${footer.qq}" q-table="ui_config"
            q-field="uip_value" class="editable-click">QQ客服</span> </a>
      </div>
    </div>
  </div>
  <a href="#" class="cd-is-visible cd-fade-out back_top_qilin_36_1_57415 cd-top" hidden="" p-id="57415"
    m-type="nocontent "> <i class="fa fa-angle-up" aria-hidden="true"></i> </a>

  <div id="onlinebox" class="onlinebox min" m-type="online" m-id="noset"
    style="position: absolute; top: 100px; bottom: auto; right: 10px; left: auto;">
    <div class="onlinebox-open" id="onlinebox-open" style="background:#46b0ab;">
      <i class="fa fa-comments-o"></i>
    </div>
    <div class="onlinebox-box font-size-14">
      <div class="onlinebox-top" style="background:#46b0ab;">
        <div class="onlinebox-top-btn">
          <a href="javascript:;" class="onlinebox-close" title="">x</a>
          <a href="javascript:;" class="onlinebox-min">-</a>
        </div>
        <h4 class="h5">在线交流</h4>
      </div>
      <div class="onlinebox-center list-group">

        <li class="list-group-item border-none">
          <p class="met_qq list-group-item-text mb-0">
            ${c.name} ${c.mobile} </p>
        </li>
        <li class="list-group-item border-none">
          <p class="met_qq list-group-item-text mb-0">
            电话：<br /><a href="tel:${c.phone}">${c.phone}</a>
          </p>
        </li>
        <li class="list-group-item border-none">
          <p class="met_qq list-group-item-text mb-0">
            Email：<br /><a href="mailto:${c.email}">${c.email}</a>
          </p>
        </li>
        <li class="list-group-item border-none">
          <p class="met_qq list-group-item-text mb-0">
            地址：<br />${c.address} </p>
        </li>

      </div>
    </div>
  </div>

  <script>
    function count_User(userAgent) {
      var data = {
        get: location.href,
        os: undefined,
        browser: undefined
      };
      var terminal = {
        'windows nt 10': 'Windows 10',
        'windows nt 6.3': 'Windows 8.1',
        'windows nt 6.2': 'Windows 8',
        'windows nt 6.1': 'Windows 7',
        'windows nt 6.0': 'Windows Vista',
        'windows nt 5.2': 'Windows Server 2003XP x64',
        'windows nt 5.1': 'Windows XP',
        'windows xp': 'Windows XP',
        'windows nt 5.0': 'Windows 2000',
        'windows me': 'Windows ME',
        'win98': 'Windows 98',
        'win95': 'Windows 95',
        'win16': 'Windows 3.11',
        'macintosh|mac os x': 'Mac OS X',
        'mac_powerpc': 'Mac OS 9',
        'linux': 'Linux',
        'ubuntu': 'Ubuntu',
        'phone': 'iPhone',
        'pod': 'iPod',
        'pad': 'iPad',
        'android': 'Android',
        'blackberry': 'BlackBerry',
        'webos': 'Mobile',
        'freebsd': 'FreeBSD',
        'sunos': 'Solaris'
      };


      Object.keys(terminal).forEach(function (key) {
        if (new RegExp(key).test(userAgent.toLowerCase())) {
          data.os = terminal[key];
          return true;
        }
      });

      if (regs = userAgent.match(/MSIE\\s(\\d+)\\..*/)) {
        data.browser = 'IE ' + regs['1'];
      } else if (regs = userAgent.match(/Firefox\\/(\\d+)\\..*/)) {
        data.browser = 'FIREFOX';
      } else if (regs = userAgent.match(/Opera[\\s|\\/](\\d+)\\..*/)) {
        data.browser = 'OPERA';
      } else if (regs = userAgent.match(/Chrome\\/(\\d+)\\..*/)) {
        data.browser = 'CHROME';
      } else if (regs = userAgent.match(/Safari\\/(\\d+)\\..*$/)) {
        data.browser = 'SAFARI';
      } else if (regs = userAgent.match(/rv:(\\d+)\\..*/)) {
        data.browser = 'IE ' + regs['1'];
      }

      $.ajax({
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        url: "/visitorlog",
        dataType: 'json',
        async: true,
        data: {
          data: data,
          csrf_token: "94879124a5a22b127c5408af7b6f80f1",
        },
        error: function (err) {
          console.log('出错了！请联系管理员');
          return true;
        },
        success: function (msg) {
          if (msg.code) {
          } else {
            console.log('出错了！请联系管理员');
          };
        }
      });

    }

    count_User(navigator.userAgent);
  </script><!-- foot_end -->

  <script src="static/site/pc/js/basic.js"></script>
  <script src="static/site/pc/js/index.js"></script>
  <script src="static/site/pc/js/lang_json_cn.js"></script>
</body>

</html>`;
}

// ================= 栏目高亮映射 =================

const SECTIONS = ['home', 'about', 'product', 'app', 'news', 'contact'];

function sectionOf(filename) {
  if (filename === 'index.html') return 'home';
  if (filename === 'about.html' || filename.startsWith('teamShowcase')) return 'about';
  if (filename === 'application.html') return 'app';
  if (filename === 'contactUs.html') return 'contact';
  if (filename.startsWith('news')) return 'news';
  if (filename === 'template.html' || filename === 'test.html') return 'none';
  return 'product';
}

// ================= 主流程 =================

// Windows 下偶发文件被占用，写入失败时短暂等待重试
function writeFileRetry(file, content) {
  for (let attempt = 1; ; attempt++) {
    try {
      fs.writeFileSync(file, content, 'utf8');
      return;
    } catch (e) {
      if (attempt >= 3) throw e;
      const waitUntil = Date.now() + 200 * attempt;
      while (Date.now() < waitUntil) {}
    }
  }
}

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
const footerHtml = renderFooter();
let changed = 0;
let skipped = 0;

for (const f of files) {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  if (!src.includes('<header') || !src.includes('<!--foot_begin-->')) {
    skipped++;
    continue;
  }
  let out = src.replace(/<header[\s\S]*?<\/header>/, renderHeader(sectionOf(f)));
  out = out.replace(/<!--foot_begin-->[\s\S]*$/, footerHtml);
  writeFileRetry(path.join(ROOT, f), out);
  changed++;
}

console.log(`done. changed=${changed} skipped=${skipped}`);
