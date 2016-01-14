'use strict';

var config = {
  'element_class': 'indicate',
  'domain_white_list': ['localhost'],
  'template': "<blockquote>Reproduced please indicate the <a href='<%- post.permalink %>'>source</a>!</blockquote>",
  'render_engine': 'ejs',
  'pattern': 'indicate-the-source'
}

if (hexo.config.indicate_the_source) {
  for (var key in config) {
    if (hexo.config.indicate_the_source[key]) {
      config[key] = hexo.config.indicate_the_source[key];
    }
  }
}

var wrapped_template = "<span class='" + config.element_class + "'>" + config.template + "</span>";
var regexp = new RegExp('<!-- ' + config.pattern + ' -->', 'g');
var script = 
"\n"
+ "<script type=\"text/javascript\">\n"
+ "(function() {\n"
+ "  Element.prototype.remove = function() {\n"
+ "    this.parentElement.removeChild(this);\n"
+ "  }\n"
+ "  NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {\n"
+ "    for(var i = this.length - 1; i >= 0; i--) {\n"
+ "        if(this[i] && this[i].parentElement) {\n"
+ "            this[i].parentElement.removeChild(this[i]);\n"
+ "        }\n"
+ "    }\n"
+ "  }\n"
+ "  var domain = document.domain;\n"
+ "  var white_list = ['" + config.domain_white_list.join("', '") + "'];\n"
+ "  if (white_list.indexOf(domain) >＝ 0) {\n"
+ "    var elements = document.getElementsByClassName('" + config.element_class + "');\n"
+ "    elements.remove();\n"
+ "  }\n"
+ "})()\n"
+ "</script>\n"
;

hexo.extend.filter.register('after_post_render', function(data) {
  if (hexo.config.indicate_the_source && !hexo.config.indicate_the_source.enable) {
    return data;
  }
  var content = data.content;
  if (content.search(regexp) < 0) {
    return data;
  }

  var rendered = wrapped_template;
  if (config.render_engine != 'none') {
    rendered = hexo.render.renderSync({text: wrapped_template, engine: config.render_engine}, {post: data});
  }
  content = content.replace(regexp, rendered + script);
  data.content = content;
  return data;
});
