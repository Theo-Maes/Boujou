if(!self.define){let e,a={};const i=(i,s)=>(i=new URL(i+".js",s).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let d={};const r=e=>i(e,n),t={module:{uri:n},exports:d,require:r};a[n]=Promise.all(s.map((e=>t[e]||r(e)))).then((e=>(c(...e),d)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/ChartPie.svg",revision:"366af3ba2d76e1c5f64707596f5c607c"},{url:"/_next/static/c0DV6dih1akVsHavURv6n/_buildManifest.js",revision:"3e2d62a10f4d6bf0b92e14aecf7836f4"},{url:"/_next/static/c0DV6dih1akVsHavURv6n/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1718-d4b87c08ec232658.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/1782-6ef3ca63037663e9.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/1870-87a6d43bd11b6fa3.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/231-5d073f249d1de2d4.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/306-a7e81c6e7f601de3.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/4399-08409967c5f78fdf.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/4537-a62800b13f010974.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/4717-d00b3f0e4341135f.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/4918-17321c53ccd2b7ca.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/5190-cd068f9ec3ca1086.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/5234-3b3ba9d783910d19.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/6648-18ed6fe4e9e019d5.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/6827-feac2f1830dedfc1.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/717-28219d0e28f98ba2.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/7465-df9c9d0ff4613906.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/7909-9098777d9e2129f5.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/7988-ef47d36fd7de0b66.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/8535-41aeeaf1f5a35b09.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/881-27647ed7d7a255dc.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/8837-9c8ba49aa3e8033e.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/9740-9234cbed3a5aaab0.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/_not-found/page-9b496999294fe31e.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/about/page-41261c18f0e84916.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/admin/events/%5Bid%5D/page-0acca8d510e27558.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/admin/events/page-8b3517b0216b29d2.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/admin/page-4e2953c71a0abe88.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/admin/users/page-5e262a6549166710.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/api/auth/error/page-69310dadd75b4459.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/error/page-baaa580473763d06.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/event/%5Bid%5D/page-c7fa1ef5a1e527d5.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/layout-b5c93729c0f92636.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/loading-2d214fc2bce57224.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/not-found-a659f4423181a823.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/page-8d1a4113b390b72e.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/signin/page-a400f27bef092ec1.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/signup/page-c800d22c350d81c7.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/app/todo/page-87eeb72d4947b7ea.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/c16f53c3-57f45dec89c39bac.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/ca377847-c206ebe995e11f8c.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/f8e4659f-39827fb72fd09615.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/fd9d1056-8833f0c782bab988.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/framework-8e0e0f4a6b83a956.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/main-app-c16324a8c5f9d85b.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/main-d65994dd1d13d0fc.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-ff8ca91414459900.js",revision:"c0DV6dih1akVsHavURv6n"},{url:"/_next/static/css/77fa22cab144df96.css",revision:"77fa22cab144df96"},{url:"/_next/static/css/88e30c7e83092eda.css",revision:"88e30c7e83092eda"},{url:"/_next/static/media/02205c9944024f15-s.p.woff2",revision:"4cf1e387b8e1c64a73ef01c8d1e14681"},{url:"/_next/static/media/0e4fe491bf84089c-s.p.woff2",revision:"5e22a46c04d947a36ea0cad07afcc9e1"},{url:"/_next/static/media/1c57ca6f5208a29b-s.woff2",revision:"491a7a9678c3cfd4f86c092c68480f23"},{url:"/_next/static/media/3511fdf6750b518d-s.woff2",revision:"e85775fd86060618bd4125d14654c36e"},{url:"/_next/static/media/37b0c0a51409261e-s.woff2",revision:"5ce748f413aee42a8d4723df0d18830b"},{url:"/_next/static/media/3d8af05b1dbb5df8-s.woff2",revision:"94a5fb88423f24f3981739bfbf345680"},{url:"/_next/static/media/3dbd163d3bb09d47-s.woff2",revision:"93dcb0c222437699e9dd591d8b5a6b85"},{url:"/_next/static/media/42d52f46a26971a3-s.woff2",revision:"b44d0dd122f9146504d444f290252d88"},{url:"/_next/static/media/44c3f6d12248be7f-s.woff2",revision:"705e5297b1a92dac3b13b2705b7156a7"},{url:"/_next/static/media/46c894be853ec49f-s.woff2",revision:"47891b6adb3a947dd3c594bd5196850e"},{url:"/_next/static/media/4a8324e71b197806-s.woff2",revision:"5fba57b10417c946c556545c9f348bbd"},{url:"/_next/static/media/506bd11311670951-s.woff2",revision:"7976a92314c8770252603e7813da9f67"},{url:"/_next/static/media/5647e4c23315a2d2-s.woff2",revision:"e64969a373d0acf2586d1fd4224abb90"},{url:"/_next/static/media/627622453ef56b0d-s.p.woff2",revision:"e7df3d0942815909add8f9d0c40d00d9"},{url:"/_next/static/media/71ba03c5176fbd9c-s.woff2",revision:"2effa1fe2d0dff3e7b8c35ee120e0d05"},{url:"/_next/static/media/7be645d133f3ee22-s.woff2",revision:"3ba6fb27a0ea92c2f1513add6dbddf37"},{url:"/_next/static/media/7c53f7419436e04b-s.woff2",revision:"fd4ff709e3581e3f62e40e90260a1ad7"},{url:"/_next/static/media/7d8c9b0ca4a64a5a-s.p.woff2",revision:"0772a436bbaaaf4381e9d87bab168217"},{url:"/_next/static/media/80a2a8cc25a3c264-s.woff2",revision:"2d3d8a78ef164ab6c1c62a3e57c2727b"},{url:"/_next/static/media/83e4d81063b4b659-s.woff2",revision:"bd30db6b297b76f3a3a76f8d8ec5aac9"},{url:"/_next/static/media/8db47a8bf03b7d2f-s.p.woff2",revision:"49003e0ff09f1efb8323cf35b836ba8f"},{url:"/_next/static/media/8fb72f69fba4e3d2-s.woff2",revision:"7a2e2eae214e49b4333030f789100720"},{url:"/_next/static/media/912a9cfe43c928d9-s.woff2",revision:"376ffe2ca0b038d08d5e582ec13a310f"},{url:"/_next/static/media/934c4b7cb736f2a3-s.p.woff2",revision:"1f6d3cf6d38f25d83d95f5a800b8cac3"},{url:"/_next/static/media/94300924a0693016-s.woff2",revision:"105927314bd3f089b99c0dda456171ed"},{url:"/_next/static/media/9e48537b1b020091-s.woff2",revision:"4b52fd954ca934c204d73ddbc640e5d4"},{url:"/_next/static/media/ChartPie.b5c6d058.svg",revision:"366af3ba2d76e1c5f64707596f5c607c"},{url:"/_next/static/media/a50efca067c45ff7-s.woff2",revision:"0ea6e3886fc7639170a8e69463f4113e"},{url:"/_next/static/media/a5b77b63ef20339c-s.woff2",revision:"96e992d510ed36aa573ab75df8698b42"},{url:"/_next/static/media/a6d330d7873e7320-s.woff2",revision:"f7ec4e2d6c9f82076c56a871d1d23a2d"},{url:"/_next/static/media/af961b7eb9a15f7e-s.woff2",revision:"2bbd1a9c77461a3bfbff4c9b3a43a89e"},{url:"/_next/static/media/baf12dd90520ae41-s.woff2",revision:"8096f9b1a15c26638179b6c9499ff260"},{url:"/_next/static/media/bbdb6f0234009aba-s.woff2",revision:"5756151c819325914806c6be65088b13"},{url:"/_next/static/media/bd976642b4f7fd99-s.woff2",revision:"cc0ffafe16e997fe75c32c5c6837e781"},{url:"/_next/static/media/c0058a8df935bb33-s.woff2",revision:"815d6a78ad78085bd8593051c2631f4a"},{url:"/_next/static/media/cff529cd86cc0276-s.woff2",revision:"c2b2c28b98016afb2cb7e029c23f1f9f"},{url:"/_next/static/media/d117eea74e01de14-s.woff2",revision:"4d1e5298f2c7e19ba39a6ac8d88e91bd"},{url:"/_next/static/media/dbe242b5c3b9d8cb-s.woff2",revision:"29445a64b7a514e94024e97416f26ecd"},{url:"/_next/static/media/de9eb3a9f0fa9e10-s.woff2",revision:"7155c037c22abdc74e4e6be351c0593c"},{url:"/_next/static/media/dfa8b99978df7bbc-s.woff2",revision:"7a500aa24dccfcf0cc60f781072614f5"},{url:"/_next/static/media/e25729ca87cc7df9-s.woff2",revision:"9a74bbc5f0d651f8f5b6df4fb3c5c755"},{url:"/_next/static/media/eb52b768f62eeeb4-s.woff2",revision:"90687dc5a4b6b6271c9f1c1d4986ca10"},{url:"/_next/static/media/f06116e890b3dadb-s.woff2",revision:"2855f7c90916c37fe4e6bd36205a26a8"},{url:"/apple.svg",revision:"72d85d37f355b7bd09677f38dc6c350a"},{url:"/authjs.webp",revision:"30a1699e50a7a7d43a51ce88217bc7a7"},{url:"/avatar/1719065803911aaaaaaa.png",revision:"330741cff5eebdefb85f5a6d18e6e3fe"},{url:"/avatar/1719073545931arez.png",revision:"59e0a4a5160235577505217ea8e04c82"},{url:"/avatar/1719086918913arez.png",revision:"59e0a4a5160235577505217ea8e04c82"},{url:"/avatar/1719298882402compte-a-rebours.png",revision:"a8899f8ee8bda1e0b2719587f4a798c9"},{url:"/avatar/1719321970900compte-a-rebours.png",revision:"a8899f8ee8bda1e0b2719587f4a798c9"},{url:"/avatar/1719322281008compte-a-rebours.png",revision:"a8899f8ee8bda1e0b2719587f4a798c9"},{url:"/avatar/1719322443859compte-a-rebours.png",revision:"a8899f8ee8bda1e0b2719587f4a798c9"},{url:"/avatar/1719520131110compte-a-rebours.png",revision:"fe9c950b44dd303cfc0cdf2ed350b516"},{url:"/avatar/1719556783259Avatar1.png",revision:"cbc3d4773b41c5701de634ea0d244c01"},{url:"/avatar/defaultAvatar.webp",revision:"d89a1c2ed92679496f362ac509168d95"},{url:"/bg.png",revision:"44c52e89cc9a2aec2c5ded695cde2988"},{url:"/calendar.svg",revision:"dba0b562f840a0081134698c0ab60bf1"},{url:"/chevron-right.svg",revision:"8e985365b1905dff853fb74093bff5f5"},{url:"/euro.svg",revision:"c42fe85d27532e7b396335e5a12bf2fd"},{url:"/event/1719065221220aaaaaaa.png",revision:"330741cff5eebdefb85f5a6d18e6e3fe"},{url:"/event/1719076337212aaaaaaa.png",revision:"330741cff5eebdefb85f5a6d18e6e3fe"},{url:"/event/1719086916938aaaaaaa.png",revision:"330741cff5eebdefb85f5a6d18e6e3fe"},{url:"/event/1719086917233arez.png",revision:"59e0a4a5160235577505217ea8e04c82"},{url:"/event/1719348226518OIP_(2).jpg",revision:"19dcb55cfeddf3cf3641105d8d452b36"},{url:"/event/1719348533964440017425.png",revision:"b5dd181d04cbabb32c968bd2a52f1841"},{url:"/event/1719348687148OIP_(2).jpg",revision:"19dcb55cfeddf3cf3641105d8d452b36"},{url:"/event/1719349349259beauregard.jpeg",revision:"45aa4e2e245eea369f009f79bd1968a9"},{url:"/event/1719355828465440017425.png",revision:"c91d3c76ea014f81bba130db4a8bac01"},{url:"/event/1719355966352OIP_(2).jpg",revision:"af291374d9d458544f19d52cdd04a36d"},{url:"/event/1719356213128beauregard.jpeg",revision:"ad15c84872a210fa2d219ffb6e04888c"},{url:"/event/1719356681980bayeux.png",revision:"5a48429fce3d0c065d2ee2d567c2f30b"},{url:"/event/1719357017640Fetedelamer.jpg",revision:"f3aec1730533d5e68fad6890015fa8ef"},{url:"/event/1719357149699jazzznbaie.jpg",revision:"6c4ca31cda4bc3b6bf4465bbd4854152"},{url:"/event/1719357255308festival-film-am.jpg",revision:"d5a53fbeaded3229b26be76bff12cdd5"},{url:"/event/1719357328574salon-art-deco.jpg",revision:"89746476674d723067f24c13e55418c1"},{url:"/event/1719357484398431120673.jpg",revision:"44d09929c9cf4f575accb445284bec3a"},{url:"/event/1719357591800rencontres.jpg",revision:"23449f842209f46ef16ee44574199425"},{url:"/event/1719357713311Festival_du Cirque de Rouen 2024.jpg",revision:"fdc090f146e88320a842fecfe437cf39"},{url:"/event/1719358028162festival-voiles-travail-2023.jpg",revision:"22b48cc2c7439fe24b3248d53d57ec8b"},{url:"/event/1719358104399nuits_electro.jpg",revision:"0e0a9e0325be4c825c3bfefe3c0f526d"},{url:"/event/1719465612335th.jpg",revision:"261dcb56e9cb5c1760c946c6519bac54"},{url:"/event/1719472006150th.jpg",revision:"261dcb56e9cb5c1760c946c6519bac54"},{url:"/event/1719473456054th.jpg",revision:"261dcb56e9cb5c1760c946c6519bac54"},{url:"/event/1719477497042431120673.jpg",revision:"7c7cddeb22865ada0ce575473ed9d1d0"},{url:"/event/1719478830728th.jpg",revision:"261dcb56e9cb5c1760c946c6519bac54"},{url:"/event/1719479051956th.jpg",revision:"261dcb56e9cb5c1760c946c6519bac54"},{url:"/event/171948162945663.png",revision:"56fb5aee5f17e8813d1a7a5a1d8994d3"},{url:"/favicon.ico",revision:"2d513e9f518de2f43ddafe7390f730e3"},{url:"/github.svg",revision:"fbad4e64cb7b4c17cd4dccfcf721186f"},{url:"/google.svg",revision:"ce1464e200a092e14133e94e3a3bc9ea"},{url:"/group.svg",revision:"8a47e063eab14429d97b6371bcd9bed9"},{url:"/hero-card.jpeg",revision:"efa24d0682423b6f048425eb42760e51"},{url:"/icons/form/arrows.png",revision:"65d5296604f7d5698c5835462a2296f5"},{url:"/icons/form/calendar.png",revision:"ffd2181587f67facbbfc7f41593fe25d"},{url:"/icons/form/calendar.svg",revision:"dba0b562f840a0081134698c0ab60bf1"},{url:"/icons/form/car.png",revision:"37fc4b6a4c9cf0e7a822720c01c952b9"},{url:"/icons/form/checked.png",revision:"3ea9e54dbf6805262214099eb09922da"},{url:"/icons/form/dollars.png",revision:"aa8afbcece7d38caaabecc2bfd53b857"},{url:"/icons/form/euro.png",revision:"c1b82f7967f38f2e09e45a86080d13ee"},{url:"/icons/form/location.png",revision:"36188410a8744c63414bfe175d019811"},{url:"/icons/icon-192x192.png",revision:"6820d81dd9b2d5049459333e8c63308b"},{url:"/icons/icon-384x384.png",revision:"c92b8f41b07778ca65b41a5e8b99ee3f"},{url:"/icons/icon-512x512.png",revision:"37ee3b6b2fef6a678c794f3eac632cde"},{url:"/icons/icon-72x72.png",revision:"86101579bcdc36fe722aad9495b15de6"},{url:"/information.svg",revision:"a50221126c1203e0a6aabcfe6eb9cbc5"},{url:"/location.svg",revision:"d976a1e5bf5c3420d6ef895a09b64382"},{url:"/logo-dark.png",revision:"1b8226c36427f1d6fbe5e2b66bf33823"},{url:"/logo-light.png",revision:"1a5d85b81c2b1f9854f55b046071d7e5"},{url:"/logo.png",revision:"db702ebbb8124f59f01e82a99eb89964"},{url:"/logo.svg",revision:"3146e4cb02ce77ff9c60d24e7e2eddfe"},{url:"/manifest.json",revision:"b19d194325b39a524104e2b7d3e5173a"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/user-1.jpg",revision:"97df5902e67881da4fdd34e8965565ac"},{url:"/user-1.png",revision:"33e287aa03128b7a9ecd32e4c359ea0f"},{url:"/user-1.webp",revision:"3d1533f776b5edbce3dee9baa994dd17"},{url:"/user-2.png",revision:"e67e358c72e30a5ec593534154b91ea6"},{url:"/user-2.webp",revision:"c83cf710bc188c4b56a87423ed352af4"},{url:"/user-3.png",revision:"1a0ecb26fbeaf039ea83975f1c3c20c7"},{url:"/user.svg",revision:"6e2445a86438d41400a0059c517ee5ae"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:i})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&i&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:i})=>"1"===e.headers.get("RSC")&&i&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
