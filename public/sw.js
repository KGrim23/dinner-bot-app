if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>n(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"0fa5a9c1b9cf3f6e3b210a890a43cbed"},{url:"/_next/static/chunks/173-6bc51c061866ce51.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/23-a07edd13a7b12957.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/231-bce35d14a0d20a09.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/app/_not-found/page-0cc4858ce7ae42a0.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/app/favorites/page-0e46c4cc844191f8.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/app/layout-5e2ea6dad71ec4b3.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/app/page-8d03c8eecdb30218.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/app/privacy/page-a4836db9325dd2db.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/app/terms/page-d34eefc3f92e63db.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/fd9d1056-2737f78bfff3f6bf.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/main-9a92c844926ae953.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/main-app-ca4d089848a75775.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-cb86a99cd2f791d1.js",revision:"j0-4jwgLsVfms_jibNeuf"},{url:"/_next/static/css/bce47f33aa312968.css",revision:"bce47f33aa312968"},{url:"/_next/static/j0-4jwgLsVfms_jibNeuf/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/j0-4jwgLsVfms_jibNeuf/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/dinner_bot_2.png",revision:"bb7b8d89cd20d4e90a4c1ea46067d7b1"},{url:"/dinner_bot_logo.png",revision:"aab086371eae698635822f11b883d654"},{url:"/icons/icon-192.png",revision:"60969f4a657bc81416c1bf185d366c5c"},{url:"/icons/icon-192x192.png",revision:"1f63e22a671f705c6b90ce16464f27d3"},{url:"/manifest.json",revision:"650842567a55b4ee6c966ff409b28d8c"},{url:"/recipe_placeholder.webp",revision:"63bec195b9364f47983e6d05aea08b82"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
