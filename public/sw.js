if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,a)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const o=e=>n(e,i),r={module:{uri:i},exports:c,require:o};s[i]=Promise.all(t.map((e=>r[e]||o(e)))).then((e=>(a(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"b4a634396120e543298b8000321f16ff"},{url:"/_next/static/chunks/173-b398e0bf8de5adf2.js",revision:"ocLNb1Lcsx_8t4iKrIaj4"},{url:"/_next/static/chunks/23-5ecd8e105a0a770c.js",revision:"ocLNb1Lcsx_8t4iKrIaj4"},{url:"/_next/static/chunks/app/_not-found/page-4a0204e068aa695f.js",revision:"ocLNb1Lcsx_8t4iKrIaj4"},{url:"/_next/static/chunks/app/layout-46d23af0a54992fa.js",revision:"ocLNb1Lcsx_8t4iKrIaj4"},{url:"/_next/static/chunks/app/page-24cacbe393ac9236.js",revision:"ocLNb1Lcsx_8t4iKrIaj4"},{url:"/_next/static/chunks/fd9d1056-dfc0d8741092951e.js",revision:"ocLNb1Lcsx_8t4iKrIaj4"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"ocLNb1Lcsx_8t4iKrIaj4"},{url:"/_next/static/chunks/main-9b317adf9cbe07d5.js",revision:"ocLNb1Lcsx_8t4iKrIaj4"},{url:"/_next/static/chunks/main-app-ca4d089848a75775.js",revision:"ocLNb1Lcsx_8t4iKrIaj4"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"ocLNb1Lcsx_8t4iKrIaj4"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"ocLNb1Lcsx_8t4iKrIaj4"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-cb86a99cd2f791d1.js",revision:"ocLNb1Lcsx_8t4iKrIaj4"},{url:"/_next/static/css/59508a86b8a3be5d.css",revision:"59508a86b8a3be5d"},{url:"/_next/static/ocLNb1Lcsx_8t4iKrIaj4/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/ocLNb1Lcsx_8t4iKrIaj4/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/dinner_bot_logo.png",revision:"aab086371eae698635822f11b883d654"},{url:"/icons/icon-192x192.png",revision:"1f63e22a671f705c6b90ce16464f27d3"},{url:"/manifest.json",revision:"ede88c78cb48f31e506e5532664ed378"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
