/**
 * 轮播图渲染器
 * 读取 window.BANNERS(见 static/config/banners.js),
 * 在页面底部 RevSlider 初始化之前,把图片渲染进各 .banner-ul。
 * 页面里用 <ul class="banner-ul" data-banner="key"></ul> 指定用哪组图,缺省用 default。
 */
(function () {
  var lists = (window.BANNERS && typeof window.BANNERS === 'object') ? window.BANNERS : {};
  var uls = document.querySelectorAll('.banner-ul');
  for (var i = 0; i < uls.length; i++) {
    var ul = uls[i];
    var key = ul.getAttribute('data-banner') || 'default';
    var imgs = lists[key] || lists['default'] || [];
    if (!imgs.length) continue;
    var html = '';
    for (var j = 0; j < imgs.length; j++) {
      var src = imgs[j];
      var n = j + 1;
      html += '<li data-transition="papercut" data-slotamount="random" data-masterspeed="600"'
            + ' data-thumb="' + src + '" data-saveperformance="on" data-title="" data-speed="5000">'
            + '<img src="' + src + '" alt="轮播图' + n + '" title="轮播图' + n + '"'
            + ' data-bgposition="center center" data-bgfit="cover" data-bgrepeat="no-repeat"'
            + ' data-height="0|0|0" class="cover-image editable-click" />'
            + '</li>';
    }
    ul.innerHTML = html;
  }
})();
