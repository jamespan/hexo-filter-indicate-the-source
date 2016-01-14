# hexo-filter-indicate-the-source

[![npm](https://img.shields.io/npm/v/hexo-filter-indicate-the-source.svg)](https://npmjs.org/package/hexo-filter-indicate-the-source)
[![npm](https://img.shields.io/npm/dm/hexo-filter-indicate-the-source.svg)](https://npmjs.org/package/hexo-filter-indicate-the-source)
[![npm](https://img.shields.io/npm/dt/hexo-filter-indicate-the-source.svg)](https://npmjs.org/package/hexo-filter-indicate-the-source)
[![NPM Dependencies](https://img.shields.io/david/JamesPan/hexo-filter-indicate-the-source.svg)](https://www.npmjs.com/package/hexo-filter-indicate-the-source)
![](https://img.shields.io/npm/l/hexo-filter-indicate-the-source.svg)


Insert "indicate the source" informations into blog posts.

## Instalation
To install `hexo-filter-indicate-the-source` run:

```
npm install hexo-filter-indicate-the-source --save
```

## Configure

### Default

```
indicate_the_source:
  enable: true
  pattern: indicate-the-source
  render_engine: ejs
  element_class: indicate
  domain_white_list:
    - localhost
  template: "<blockquote>Reproduced please indicate the <a href='<%- post.permalink %>'>source</a>!</blockquote>"
```

### The `post` Variable

Most of the time, we need to render our string template with some variables that related with each post. Hexo provide us a data object that holds meta data of each post, that's what the `post` variale is.

For more information, please visit https://hexo.io/docs/variables.html#Page_Variables

## Usage

### Common usage

We use "indicate-the-source" as the pattern for example.

Put `<!-- indicate-the-source -->` whereever you want to insert "indicate the source" information in your markdown post file.

That's all you need to do, than run `hexo server` or `hexo g` as usual，`<!-- indicate-the-source -->` will be replaced with a rendered template wrapped with the `span` tag.

### Usage of `domain_white_list`

If you don't want reader to see "indicate the source" information in your own blog, we can use the `domain_white_list` field.

Set domain list you don't want to show "indicate the source" information in `domain_white_list`, and the information will be removed automatically when web browser is rendering the page.

### Use template without rendering

Set `render_engine` to `none`, `render_engine: none`.

## Example

### Author's configuration(run on localhost)

```
indicate_the_source:
  pattern: indicate-the-source
  enable: true
  render_engine: ejs
  element_class: source
  domain_white_list:
    - blog.jamespan.me
    - jamespan.me
  template: "<blockquote><p>转载请注明出处：<%- post.permalink %></p><p>访问原文「<a href='<%- post.permalink %>'><%- post.title %></a>」获取最佳阅读体验并参与讨论</p></blockquote>"
```

![](http://i.imgur.com/24AUipE.png)
