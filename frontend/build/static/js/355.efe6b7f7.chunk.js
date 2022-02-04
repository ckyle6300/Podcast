"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[355],{2376:function(n,e,r){var t=r(2791),s=r(5812),i=r(2926),o=r(3540),c=r(2059),d=r(184),l=function(n){var e=n.isOpen,r=n.setIsOpen,t=n.buttonHandler,l=n.modalInfo;if(!l)return(0,d.jsx)(d.Fragment,{});var a=l.epi,u=l.idx,h=l.podTitle;return(0,d.jsxs)(s.ki,{isOpen:e,onDidDismiss:function(){return r(!1)},children:[(0,d.jsx)(s.Gu,{children:(0,d.jsxs)(s.sr,{color:"primary",children:[(0,d.jsx)(s.wd,{children:null===a||void 0===a?void 0:a.title}),(0,d.jsx)(s.Sm,{slot:"end",children:(0,d.jsxs)(s.YG,{fill:"clear",color:"dark",onClick:function(){return r(!1)},children:["close",(0,d.jsx)(s.gu,{slot:"end",icon:i.fID})]})})]})}),(0,d.jsx)(s.W2,{color:"secondary",children:(0,d.jsxs)(s.jY,{children:[(0,d.jsx)(s.Nd,{children:(0,d.jsx)(s.wI,{children:(0,d.jsxs)(s.Ie,{color:"dark",children:[(0,d.jsx)(s.BJ,{slot:"start",children:(0,d.jsx)(s.Xz,{src:a.feedImage})}),(0,d.jsxs)(s.Q$,{className:"ion-text-wrap",children:[(0,d.jsx)("p",{children:h}),(0,d.jsx)("h2",{children:null===a||void 0===a?void 0:a.title}),(0,d.jsx)("h3",{children:null===a||void 0===a?void 0:a.datePublishedPretty}),(null===a||void 0===a?void 0:a.duration)>0&&(0,d.jsx)("p",{children:(0,c.h)(null===a||void 0===a?void 0:a.duration)})]}),(0,d.jsx)(s.gu,{slot:"end",button:!0,icon:i.AO3,onClick:function(){return t(u)}})]})})}),(0,d.jsx)(s.Nd,{className:"ion-padding ",children:(0,d.jsx)(s.wI,{children:(0,o.ZP)(null===a||void 0===a?void 0:a.description)})})]})})]})};e.Z=t.memo(l)},2059:function(n,e,r){r.d(e,{h:function(){return c}});var t=r(2791),s=r(5812),i=r(2926),o=r(184);function c(n){var e=n/3600,r=Math.floor(e),t=r>9?r:"0"+r,s=60*(e-r),i=Math.floor(s),o=i>9?i:"0"+i,c=60*(s-i),d=Math.floor(c);return t+":"+o+":"+(d>9?d:"0"+d)}var d=function(n){var e=n.epi,r=n.buttonHandler,t=n.idx,d=n.clickHandler;return e?(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(s.Ie,{color:"dark",button:!0,children:[(0,o.jsx)(s.BJ,{slot:"start",children:(0,o.jsx)(s.Xz,{src:e.feedImage,alt:"podcast photo"})}),(0,o.jsxs)(s.Q$,{className:"ion-text-wrap",onClick:function(){return d(e,t)},children:[(0,o.jsx)("h2",{children:e.title}),(0,o.jsx)("h3",{children:e.datePublishedPretty}),e.duration>0&&(0,o.jsx)("p",{children:c(e.duration)})]}),(0,o.jsx)(s.gu,{slot:"end",button:!0,icon:i.AO3,onClick:function(){return r(t)}})]})}):(0,o.jsx)(o.Fragment,{})};e.Z=t.memo(d)},8355:function(n,e,r){r.r(e);var t=r(5861),s=r(885),i=r(7757),o=r.n(i),c=r(5812),d=r(2791),l=r(6030),a=r(2376),u=r(2059),h=r(4234),x=r(4443),f=r(184);e.default=function(){var n=(0,d.useState)(!1),e=(0,s.Z)(n,2),r=e[0],i=e[1],j=(0,d.useState)(!0),p=(0,s.Z)(j,2),v=p[0],m=p[1],k=(0,d.useState)(!1),b=(0,s.Z)(k,2),I=b[0],w=b[1],g=(0,l.v9)((function(n){return n.localStore.podcastsRdx})),Z=(0,l.v9)((function(n){return n.podcastInfo})),y=(0,l.v9)((function(n){return n.selected.recentEpisodes})),N=(0,d.useRef)(),O=(0,l.I0)();(0,d.useEffect)((function(){var n=function(){var n=(0,t.Z)(o().mark((function n(){var e;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:n.prev=0,e=Object.keys(g),n.next=9;break;case 4:return n.prev=4,n.t0=n.catch(0),w(!0),m(!1),n.abrupt("return");case 9:return n.next=11,O((0,x.Z5)(e));case 11:m(!1);case 12:case"end":return n.stop()}}),n,null,[[0,4]])})));return function(){return n.apply(this,arguments)}}();return n(),function(){w(!1),m(!0)}}),[g]);var S=function(){var n=(0,t.Z)(o().mark((function n(e){var r,t;return o().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:r=y[e],t=g[r.feedId],O((0,h.uT)(t,r,Z.count));case 3:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),C=function(n,e){var r=y[e],t=g[r.feedId];i((function(n){return!n})),N.current={epi:n,idx:e,podTitle:t.title}};return(0,f.jsxs)(c._i,{children:[(0,f.jsx)(c.Gu,{children:(0,f.jsxs)(c.sr,{color:"primary",className:"ion-text-center",children:[(0,f.jsx)(c.Sm,{slot:"start",children:(0,f.jsx)(c.fG,{})}),(0,f.jsx)(c.wd,{children:"Recent Podcasts"})]})}),(0,f.jsxs)(c.W2,{color:"secondary",children:[v&&(0,f.jsx)(c.wh,{isOpen:v,onDidDismiss:function(){return m(!1)},message:"Loading...",duration:5e3}),!v&&(I||void 0==y)&&(0,f.jsx)("div",{className:"ion-text-center ion-padding top",children:(0,f.jsx)("h2",{children:"Subscribe to a podcast to see recent episodes."})}),!v&&!I&&void 0!==y&&(0,f.jsx)(c.jY,{children:(0,f.jsx)(c.Nd,{children:(0,f.jsx)(c.wI,{sizeSm:"10",offsetSm:"1",children:(0,f.jsxs)(c.q_,{className:"ion-no-padding",children:[(0,f.jsx)(c.yh,{color:"dark",children:(0,f.jsx)("h1",{children:"Recent Episodes"})}),y&&y.map((function(n,e){return(0,f.jsx)(u.Z,{epi:n,buttonHandler:S,clickHandler:C,idx:e},e)}))]})})})}),(0,f.jsx)(a.Z,{isOpen:r,modalInfo:N.current,setIsOpen:i,buttonHandler:S})]})]})}}}]);
//# sourceMappingURL=355.efe6b7f7.chunk.js.map