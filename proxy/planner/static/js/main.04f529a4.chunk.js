(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{37:function(e){e.exports=JSON.parse('{"COURSE_CODE":["CMPT 120","CMPT 125","CMPT 225","CMPT 276","CMPT 295","CMPT 376","CMPT 300","CMPT 305","CMPT 307","CMPT 310","CMPT 318","CMPT 353","CMPT 354","CMPT 361","CMPT 363","CMPT 365","CMPT 371","CMPT 383","CMPT 405","CMPT 419","CMPT 461","CMPT 466","CMPT 431","CMPT 433","CMPT 454","CMPT 459","CMPT 473","CMPT 475","MACM 101","MACM 201","MACM 316","MATH 150","MATH 152","MATH 240","MATH 308","MATH 343","STAT 270"]}')},43:function(e,t){},44:function(e,t){},52:function(e,t,n){},53:function(e,t,n){},63:function(e,t){},67:function(e,t,n){"use strict";n.r(t);var c=n(4),s=n.n(c),r=n(45),a=n.n(r),i=(n(52),n(53),n(8)),o=n.n(i),u=n(24),l=n(13);function j(e,t,n,c){return d.apply(this,arguments)}function d(){return(d=Object(u.a)(o.a.mark((function e(t,n,c,s){var r,a,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="",e.prev=1,e.next=4,fetch("/courses/info/".concat(c.toUpperCase(),"/").concat(s.toUpperCase()));case 4:if(200!==(a=e.sent).status){e.next=10;break}return e.next=8,a.json();case 8:i=e.sent,r=i.prerequisite;case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.error(e.t0);case 15:return e.abrupt("return",r);case 16:case"end":return e.stop()}}),e,null,[[1,12]])})))).apply(this,arguments)}var b=n(47),p=n(37),h=n(0),O=function(){var e=Object(c.useState)("fall"),t=Object(l.a)(e,2),n=t[0],s=t[1],r=Object(c.useState)("2021"),a=Object(l.a)(r,2),i=a[0],d=a[1],O=Object(c.useState)("cmpt"),C=Object(l.a)(O,2),x=C[0],f=C[1],m=Object(c.useState)("300"),M=Object(l.a)(m,2),v=M[0],T=M[1],g=Object(c.useState)(""),P=Object(l.a)(g,2),N=P[0],w=P[1],S=Object(c.useState)(!0),k=Object(l.a)(S,2),A=k[0],E=k[1],L=Object(c.useState)(!1),y=Object(l.a)(L,2),U=y[0],F=y[1];function H(){return D.apply(this,arguments)}function D(){return(D=Object(u.a)(o.a.mark((function e(){var t,c,s,r,a,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return E(!0),t=[],c=[],s="",e.next=6,j(n,i,x,v);case 6:r=e.sent,p.COURSE_CODE.forEach((function(e){r.includes(e)&&(c.push(e),s+="".concat(x.toUpperCase()).concat(v.toUpperCase()," -> ").concat(e.replace(/\s/g,""),";\n"))})),t.push("".concat(x.toUpperCase()," ").concat(v.toUpperCase())),a=o.a.mark((function e(){var r,a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=c[0],e.next=3,j(n,i,r.split(" ")[0].toLowerCase(),r.split(" ")[1].toLowerCase());case 3:0===(a=e.sent).length?(F(!0),c=[]):(p.COURSE_CODE.forEach((function(e){a.includes(e)&&-1===t.indexOf(e)&&(c.push(e),s+="".concat(r.replace(/\s/g,"")," -> ").concat(e.replace(/\s/g,""),";\n"))})),t.push(r),c=c.filter((function(e){return e!==r})));case 5:case"end":return e.stop()}}),e)}));case 10:if(!c.length){e.next=14;break}return e.delegateYield(a(),"t0",12);case 12:e.next=10;break;case 14:U||(u="digraph {".concat(s,"}"),w(u)),E(!1);case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(c.useEffect)(Object(u.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:H();case 1:case"end":return e.stop()}}),e)}))),[]),Object(h.jsx)(h.Fragment,{children:Object(h.jsxs)("div",{children:[Object(h.jsxs)("div",{className:"ui two column stackable grid",children:[Object(h.jsx)("div",{className:"column",children:Object(h.jsxs)("div",{className:"ui center aligned container",children:[Object(h.jsxs)("p",{children:[Object(h.jsx)("b",{children:"Term: "}),Object(h.jsxs)("select",{className:"ui selection dropdown",value:n,onChange:function(e){return s(e.target.value.toLowerCase())},children:[Object(h.jsx)("option",{selected:!0,value:"spring",children:"spring"}),Object(h.jsx)("option",{value:"summer",children:"summer"}),Object(h.jsx)("option",{value:"fall",children:"fall"})]})]}),Object(h.jsxs)("p",{children:[Object(h.jsx)("b",{children:"Year: "}),Object(h.jsx)("div",{className:"ui input",children:Object(h.jsx)("input",{type:"text",value:i,onChange:function(e){return d(e.target.value.toLowerCase())},min:"2019",max:"2022",step:"1"})})]}),Object(h.jsxs)("p",{children:[Object(h.jsx)("b",{children:"Subject: "}),Object(h.jsxs)("select",{className:"ui selection dropdown",value:x,onChange:function(e){return f(e.target.value.toLowerCase())},children:[Object(h.jsx)("option",{selected:!0,value:"cmpt",children:"CMPT"}),Object(h.jsx)("option",{value:"macm",children:"MACM"})]})]}),Object(h.jsxs)("p",{children:[Object(h.jsx)("b",{children:"Course Number: "}),Object(h.jsx)("div",{className:"ui input",children:Object(h.jsx)("input",{className:"ui input",type:"text",value:v,onChange:function(e){return T(e.target.value.toLowerCase())}})})]}),Object(h.jsx)("button",{className:"ui inverted red button",onClick:function(e){H()},children:"Make a tree"})]})}),Object(h.jsx)("div",{className:"middle aligned column",children:A?"Loading...":U?Object(h.jsx)("div",{children:"This course is not in the system, try another one."}):Object(h.jsx)(b.a,{dot:N})})]}),Object(h.jsx)("div",{className:"ui vertical divider"})]})})};var C=function(){return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)("div",{className:"App-header",children:[Object(h.jsx)("a",{href:"/calendar",className:"ui button",children:"Calendar"}),Object(h.jsx)("a",{href:"/courses",className:"ui button",children:"All Courses"}),Object(h.jsx)("a",{href:"/planner/",className:"ui button",children:"Course Tree"}),Object(h.jsx)("a",{href:"/enrollment",className:"ui button",children:"Enrollment"}),Object(h.jsx)("a",{href:"/users/logout",className:"ui button",children:"Logout"})]}),Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)("h1",{children:"Course Tree"}),Object(h.jsx)("div",{className:"view",children:Object(h.jsx)(O,{})})]})]})},x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,71)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),c(e),s(e),r(e),a(e)}))};a.a.render(Object(h.jsx)(s.a.StrictMode,{children:Object(h.jsx)(C,{})}),document.getElementById("root")),x()}},[[67,1,2]]]);
//# sourceMappingURL=main.04f529a4.chunk.js.map