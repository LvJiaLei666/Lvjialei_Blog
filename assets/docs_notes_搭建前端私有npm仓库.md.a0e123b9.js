import{_ as s,o as a,c as n,O as l}from"./chunks/framework.bdcb0ee1.js";const e="/assets/verdaccio.b58e3b44.png",o="/assets/img.fbb1d51a.png",D=JSON.parse('{"title":"搭建前端私有npm仓库","description":"","frontmatter":{},"headers":[],"relativePath":"docs/notes/搭建前端私有npm仓库.md","filePath":"docs/notes/搭建前端私有npm仓库.md"}'),p={name:"docs/notes/搭建前端私有npm仓库.md"},c=l('<h1 id="搭建前端私有npm仓库" tabindex="-1">搭建前端私有npm仓库 <a class="header-anchor" href="#搭建前端私有npm仓库" aria-label="Permalink to &quot;搭建前端私有npm仓库&quot;">​</a></h1><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>随着公司前端项目越来越多，出现了很多可复用的业务组件和逻辑。为了提升开发效率和方便维护，避免每次都要在项目之间复制粘贴相同的逻辑，我们可以把可复用的组件和逻辑封装成npm包，通过npm包的形式来引入，但又由于是公司内部的业务，所以一般不希望发布到全球公共的 <code>www.npmjs.com</code> 仓库中，此时就需要搭建属于我们自己的 <code>私有npm仓库</code>。</p><h2 id="verdaccio-介绍" tabindex="-1">Verdaccio 介绍 <a class="header-anchor" href="#verdaccio-介绍" aria-label="Permalink to &quot;Verdaccio 介绍&quot;">​</a></h2><img src="'+e+'" alt="Verdaccio" style="margin:32px auto;"><p>Verdaccio 是一款轻量级的私有 npm 仓库管理器，支持在本地搭建一个私有 npm 仓库并管理自己的 Node.js 包。它可以让开发人员和团队在内部使用自己的 npm 包，而不必将这些包发布到公共 npm 仓库上。</p><p>Verdaccio 基于 Node.js 和 JavaScript 编写，并提供了多种配置选项以满足不同场景下的需求。它支持常见的 npm 命令（如 install、publish 等），并具有与公共 npm registry 相同的 API。</p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><blockquote><p>nodejs 版本需要大于16.0</p></blockquote><p>使用 <code>npm</code></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">instasll</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--location=global</span><span style="color:#A6ACCD;">  </span><span style="color:#C3E88D;">verdaccio@6-next</span></span></code></pre></div><p>使用 <code>yarn</code></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">yarn</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">global</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">verdaccio@6-next</span></span></code></pre></div><p>使用 <code>pnpm</code></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">verdaccio@6-next</span></span></code></pre></div><p>或者使用 <code>docker</code></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">pull</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">verdaccio/verdaccio:nightly-master</span></span></code></pre></div><h3 id="启动verdaccio" tabindex="-1">启动verdaccio <a class="header-anchor" href="#启动verdaccio" aria-label="Permalink to &quot;启动verdaccio&quot;">​</a></h3><p>安装好后 我们需要先进入安装路径，/verdaccio/config.yaml 将文件中的 <code>listen: localhost:4873</code> 修改为 <code>listen: 0.0.0.0:4873</code> ,不然不能通过外网访问。 PS：如果使用本地可以不修改。</p><p>然后启动 verdaccio</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">$</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">verdaccio</span></span></code></pre></div><p>启动好后就可以通过ip+端口号访问了。PS：本地通过localhost访问,如果在服务器上启动后，访问不了，需要检查端口是否开放。</p><p><img src="'+o+`" alt="img.png"></p><h3 id="使用pm2守护进程" tabindex="-1">使用PM2守护进程 <a class="header-anchor" href="#使用pm2守护进程" aria-label="Permalink to &quot;使用PM2守护进程&quot;">​</a></h3><p>这里有个问题：在启动verdaccio后，关闭窗口后verdaccio就会停止。但是我们不可能一直开着窗口。所以这里需要使用 <code>pm2</code> 来 进行进程守护。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">#pm2 建立软链</span></span>
<span class="line"><span style="color:#FFCB6B;">ln</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-s</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">/usr/app/nodejs/bin/pm2</span><span style="color:#A6ACCD;">   </span><span style="color:#C3E88D;">/usr/local/bin/</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># pm2 启动verdaccio</span></span>
<span class="line"><span style="color:#FFCB6B;">pm2</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">start</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">verdaccio</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#停止verdaccio</span></span>
<span class="line"><span style="color:#FFCB6B;">pm2</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">stop</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">verdaccio</span></span></code></pre></div><h3 id="发布npm包" tabindex="-1">发布npm包 <a class="header-anchor" href="#发布npm包" aria-label="Permalink to &quot;发布npm包&quot;">​</a></h3><p>这里推荐使用 <code>nrm</code> 来管理仓库地址。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 设置新的仓库</span></span>
<span class="line"><span style="color:#FFCB6B;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">http://xxx</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#查看列表</span></span>
<span class="line"><span style="color:#FFCB6B;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ls</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#使用新的仓库</span></span>
<span class="line"><span style="color:#FFCB6B;">nrm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">use</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">private</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#发布新的包</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">publish</span></span></code></pre></div><h3 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h3><ol><li>默认端口号：verdaccio使用 <code>4873</code> 作为其默认端口号。</li><li>默认所有用户都可以访问，并且进行包的操作。如需生产使用，还需要配置权限。</li><li>需要相应的修改 <code>CI/CD</code> 流程中的包地址。</li><li>verdaccio支持 <code>webhooks</code>，如有需要可以接入钉钉/企业微信机器人，发布包时候将会通知。</li></ol>`,31),t=[c];function r(i,d,C,y,h,m){return a(),n("div",null,t)}const u=s(p,[["render",r]]);export{D as __pageData,u as default};
