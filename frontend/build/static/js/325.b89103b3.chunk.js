"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[325],{6325:function(e,n,s){s.r(n);var t=s(5861),r=s(885),c=s(7757),a=s.n(c),o=s(5812),i=s(2791),d=s(6030),u=s(8335),l=s(184),h=function(){var e=(0,i.useState)(""),n=(0,r.Z)(e,2),s=n[0],c=n[1],h=(0,i.useState)([]),f=(0,r.Z)(h,2),p=f[0],x=f[1],j=(0,d.I0)();return(0,i.useEffect)((function(){var e,n=function(){var e=(0,t.Z)(a().mark((function e(){var n,t;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat("https://podcast-backend-ck.herokuapp.com","/podcast/search"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({search:s})});case 2:return n=e.sent,e.next=5,n.json();case 5:t=e.sent,x(t.feeds);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return s.length>=3&&(e=setTimeout(n,700)),function(){return clearTimeout(e)}}),[s,j]),(0,l.jsxs)(o._i,{children:[(0,l.jsx)(o.Gu,{children:(0,l.jsxs)(o.sr,{color:"primary",className:"ion-text-center",children:[(0,l.jsx)(o.Sm,{slot:"start",children:(0,l.jsx)(o.fG,{})}),(0,l.jsx)(o.wd,{children:"Search Podcasts"})]})}),(0,l.jsx)(o.W2,{color:"secondary",children:(0,l.jsxs)(o.jY,{children:[(0,l.jsx)(o.Nd,{className:"ion-padding-top",children:(0,l.jsx)(o.wI,{sizeSm:"6",offsetSm:"3",children:(0,l.jsxs)(o.Ie,{children:[(0,l.jsx)(o.Q$,{color:"dark",position:"floating",children:"Search"}),(0,l.jsx)(o.pK,{minlength:3,autofocus:!0,value:s,onIonChange:function(e){return c(e.detail.value)}})]})})}),(0,l.jsx)(o.Nd,{children:p.map((function(e,n){return(0,l.jsx)(o.wI,{size:"6",sizeSm:"4",className:"ion-no-padding",children:(0,l.jsx)(u.Z,{podcast:e,clicker:!0,address:"/podcasts/".concat(e.id)})},n)}))})]})})]})};n.default=i.memo(h)}}]);
//# sourceMappingURL=325.b89103b3.chunk.js.map