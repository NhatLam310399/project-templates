/*! For license information please see 9.027c0dcb.chunk.js.LICENSE.txt */
(this["webpackJsonptuyendungvn-admin-frontend-reactjs"]=this["webpackJsonptuyendungvn-admin-frontend-reactjs"]||[]).push([[9],{594:function(e,t,n){"use strict";var a=n(10),r=n(0),c=n(600),i=n.n(c),o=n(601),s=n.n(o),l=n(893),u=n(603),d=n.n(u),b=n(63),j=n(3),f=function(e){var t=e.className,n=void 0===t?"":t,r=e.data,c=e.columns,o=e.headerElement,u=e.sizePerPage,f=void 0===u?10:u,m=e.onPageChange,p=e.page,v=void 0===p?1:p,h=e.isRemote,O=void 0!==h&&h,x=e.totalSize,g=void 0===x?0:x,y=e.loading,N=void 0===y||y,w=e.onClickRow,C=e.onTableChange,A=function(e,t){m&&m(t)},k=function(e,t){var n=t.page;t.sizePerPage;C&&C(n-1)},S={onClick:function(e){w&&w(e)}},L=Math.ceil(g/f);return N||0!==(null===r||void 0===r?void 0:r.length)?Object(j.jsx)("div",{className:"custom-table__container ".concat(n),children:Object(j.jsx)(i.a,{bootstrap4:!0,keyField:"id",data:r,columns:c,search:!0,children:function(e){return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("div",{children:o}),Object(j.jsx)(s.a,Object(a.a)(Object(a.a)({},e.baseProps),{},{bordered:!1,wrapperClasses:"table-responsive col-span-12 overflow-auto lg:overflow-visible font-sfpro",rowEvents:S,pagination:d()({hideSizePerPage:!0,sizePerPage:f,page:v,totalSize:g,custom:!0}),remote:O&&{pagination:!0,filter:!1,sort:!1},onTableChange:k})),0!==g&&Object(j.jsx)("div",{className:"flex justify-end mt-3 pagination-wrap",children:Object(j.jsx)(l.a,{page:v,count:L,onChange:A})})]})}})}):Object(j.jsx)("div",{className:"flex items-center justify-center w-full h-full mt-10 empty-data",children:Object(j.jsx)(b.a,{name:"common/empty-data"})})};t.a=Object(r.memo)(f)},595:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(24),r=n(0),c=n(38),i=function(e){var t=e?Number(e):1,n=Object(c.g)(),i=Object(r.useState)(Number(t)),o=Object(a.a)(i,2),s=o[0],l=o[1];return[s,Object(r.useCallback)((function(e){l(e),n.push("".concat(n.location.pathname,"?page=").concat(e))}),[])]}},596:function(e,t,n){"use strict";var a=n(24),r=n(0),c=n.n(r),i=n(114),o=n(547),s=n(542),l=n(543),u=n(609),d=n(608),b=n(125),j=n(3);t.a=function(e){var t=e.ButtonMenu,n=e.title,r=void 0===n?"":n,f=e.content,m=void 0===f?"":f,p=e.onConfirm,v=e.data,h=e.className,O=void 0===h?"":h,x=(e.note,c.a.useState(!1)),g=Object(a.a)(x,2),y=g[0],N=g[1],w=function(){N(!1)};return Object(j.jsxs)("div",{className:"".concat(O),children:[Object(j.jsx)("button",{type:"button",className:"block w-full",onClick:function(){N(!0)},children:t}),Object(j.jsxs)(o.a,{open:y,onClose:w,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",maxWidth:"sm",fullWidth:!0,PaperProps:{style:{backgroundColor:b.a.white,borderRadius:"0px",padding:"40px"}},children:[Object(j.jsx)(d.a,{className:"p-0 mb-2",id:"alert-dialog-title",children:Object(j.jsx)("h1",{className:"font-bold leading-none text-xxl font-sfpro",children:r})}),Object(j.jsx)(l.a,{className:"p-0 mb-3",children:Object(j.jsx)(u.a,{id:"alert-dialog-description",children:Object(j.jsx)("span",{className:"block text-lg leading-none text-black font-sfpro",children:m})})}),Object(j.jsxs)(s.a,{className:"flex flex-col w-full gap-2 p-0 phone:flex-row",children:[Object(j.jsx)(i.a,{className:"w-full phone:w-auto",innerClassName:"py-1 px-3.5 h-4 font-normal normal-case border-none",onClick:w,type:"button",children:"Hu\u1ef7 b\u1ecf"}),Object(j.jsx)(i.a,{className:"w-full phone:w-auto",primary:!0,innerClassName:"py-1 px-3.5 h-4 font-normal normal-case",onClick:function(e){p&&p(v),N(!1)},type:"submit",children:"\u0110\u1ed3ng \xfd"})]})]})]})}},597:function(e,t,n){"use strict";var a=n(2),r=n.n(a),c=n(9),i=n(24),o=n(0),s=n(535),l=n(599),u=n(63),d=n(3);t.a=function(e){var t=e.className,n=void 0===t?"":t,a=e.placeholder,s=void 0===a?"T\xecm ki\u1ebfm":a,j=e.onFetchData,f=b(),m=Object(o.useState)(""),p=Object(i.a)(m,2),v=p[0],h=p[1],O=Object(l.a)(j,300),x=function(){var e=Object(c.a)(r.a.mark((function e(t){var n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.target.value,O(n),h(n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsx)("div",{className:"search-form w-full phone:w-auto ".concat(n),children:Object(d.jsxs)("div",{className:"relative w-full laptop:w-25 max-w-full",children:[Object(d.jsx)("input",{name:"search",type:"text",placeholder:s,value:v,onChange:x,autoComplete:"off",className:"block w-full max-w-full pl-4 py-1.5 pr-1 text-sm leading-none font-sfpro text-body ".concat(f.input)}),Object(d.jsx)("span",{className:"absolute top-1/2 transform -translate-y-1/2 pl-1.5 block leading-none group",children:Object(d.jsx)(u.a,{name:"common/search",className:"w-2"})})]})})};var b=Object(s.a)((function(e){return{input:{border:"1px solid rgba(0,0,0,0.23)","&:hover, &:focus":{borderColor:"rgba(0,0,0,0.87)"}}}}))},598:function(e,t,n){"use strict";function a(e){return"function"===typeof e?e():e}function r(){var e={};return e.promise=new Promise((function(t,n){e.resolve=t,e.reject=n})),e}e.exports=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},c=void 0,i=void 0,o=void 0,s=[];return function(){var u=a(t),d=(new Date).getTime(),b=!c||d-c>u;c=d;for(var j=arguments.length,f=Array(j),m=0;m<j;m++)f[m]=arguments[m];if(b&&n.leading)return n.accumulate?Promise.resolve(e.call(this,[f])).then((function(e){return e[0]})):Promise.resolve(e.call.apply(e,[this].concat(f)));if(i?clearTimeout(o):i=r(),s.push(f),o=setTimeout(l.bind(this),u),n.accumulate){var p=s.length-1;return i.promise.then((function(e){return e[p]}))}return i.promise};function l(){var t=i;clearTimeout(o),Promise.resolve(n.accumulate?e.call(this,s):e.apply(this,s[s.length-1])).then(t.resolve,t.reject),s=[],i=null}}},599:function(e,t,n){"use strict";var a=n(598),r=n.n(a);function c(e){var t=null,n=null,a=new Promise((function(e,a){t=e,n=a}));return e&&e.then((function(e){t&&t(e)}),(function(e){n&&n(e)})),{promise:a,resolve:function(e){t&&t(e)},reject:function(e){n&&n(e)},cancel:function(){t=null,n=null}}}var i=function(){return i=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var r in t=arguments[n])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},i.apply(this,arguments)},o={key:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return null},onlyResolvesLast:!0},s=function(){function e(e){this.config=e,this.debounceSingleton=null,this.debounceCache={}}return e.prototype._createDebouncedFunction=function(){var e=r()(this.config.func,this.config.wait,this.config.options);return this.config.options.onlyResolvesLast&&(e=function(e){var t=null;return function(){for(var n=[],a=0;a<arguments.length;a++)n[a]=arguments[a];t&&t();var r=c(e.apply(void 0,n)),i=r.promise,o=r.cancel;return t=o,i}}(e)),{func:e}},e.prototype.getDebouncedFunction=function(e){var t,n=(t=this.config.options).key.apply(t,e);return null===n||"undefined"===typeof n?(this.debounceSingleton||(this.debounceSingleton=this._createDebouncedFunction()),this.debounceSingleton):(this.debounceCache[n]||(this.debounceCache[n]=this._createDebouncedFunction()),this.debounceCache[n])},e}();t.a=function(e,t,n){var a=i({},o,n),r=new s({func:e,wait:t,options:a});return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=r.getDebouncedFunction(e).func;return n.apply(void 0,e)}}},611:function(e,t,n){"use strict";var a=n(3);t.a=function(e){var t=e.active,n=e.children;return Object(a.jsx)("div",{className:"w-10 h-3 font-normal text-white leading-none  flex items-center justify-center ".concat(t?"bg-pink":"bg-body"),children:n})}},613:function(e,t,n){"use strict";n(0);var a=n(3);t.a=function(e){var t=e.className,n=void 0===t?"":t,r=e.src,c=void 0===r?"":r,i=e.isRound,o=void 0!==i&&i;return Object(a.jsx)("div",{className:"w-4 h-4 overflow-hidden ".concat(o?"rounded-full":"rounded-md"," ").concat(n),children:Object(a.jsx)("img",{src:c||"data:image/jpeg;base64,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",alt:"",className:"h-full"})})}},614:function(e,t,n){"use strict";var a=n(2),r=n.n(a),c=n(24),i=n(10),o=n(9),s=(n(0),n(624)),l=n.n(s),u=n(7),d=n(114),b=n(3);t.a=function(e){var t=e.onFetchApi,n=(e.fileName,function(){var e=Object(o.a)(r.a.mark((function e(){var n,a,o,s,u,d;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,null===t||void 0===t?void 0:t("");case 2:if((n=e.sent)&&!(n.length<1)){e.next=5;break}return e.abrupt("return");case 5:a=n[0].__typename?"".concat(n[0].__typename,"-data"):"data}",o=Object.keys(n[0]).flatMap((function(e){return[e]})),s=n.map((function(e){var t=Object(i.a)({},e);return Object.entries(e).forEach((function(e){var n=Object(c.a)(e,2),a=n[0],r=n[1];if("object"===typeof r){var i=JSON.stringify(r);t[a]=i}else t[a]=r})),t})),u=l.a.utils.json_to_sheet(s,{header:o}),d=l.a.utils.book_new(),l.a.utils.book_append_sheet(d,u,"Sheet"),l.a.writeFile(d,"".concat(a+".xlsx"),{bookType:"xlsx"});case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}());return Object(b.jsx)(d.a,{onClick:n,innerClassName:"normal-case text-lg font-medium hover:bg-line",className:"w-full",children:Object(u.b)("job.export-excel")})}},619:function(e,t){},625:function(e,t){},626:function(e,t){},905:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n.n(a),c=n(9),i=n(24),o=n(0),s=n(37),l=n(38),u=n(596),d=n(597),b=n(613),j=n(595),f=n(86),m=n(594),p=n(63),v=n(114),h=n(611),O=n(7),x=n(144),g=n(5),y=n(74),N=n(614),w=n(66),C=n(116),A=n(10),k=n(232),S=n(239),L=n(145),F=n(210),P=n(240),U=n(233),I=n(115),D=n(126),T=n(235),K=n(241),M=n(18),E=n(3),z=function(e){var t,n,a,l=e.ButtonMenu,u=e.editField,d=e.className,b=O.a.language,j=Object(s.d)(),f=Object(s.e)((function(e){return e.listUser})).users,m=f.results,p=void 0===m?[]:m,v=f.loading,h=void 0===v||v,g=Object(o.useMemo)((function(){return Object(S.a)()}),[b]),y=Object(o.useState)(),N=Object(i.a)(y,2),w=N[0],z=N[1],R=Object(o.useState)(""),V=Object(i.a)(R,2),B=V[0],G=V[1],H=Object(o.useState)([]),W=Object(i.a)(H,2),Q=W[0],q=W[1],X=Object(o.useState)({}),Y=Object(i.a)(X,2),Z=Y[0],_=Y[1];Object(o.useEffect)((function(){!h&&p.length>0&&setTimeout((function(){$()}),1e3)}),[p]);var $=function(){var e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,J();case 2:t=e.sent,q(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;t&&_(Object(A.a)(Object(A.a)({},Z),{},Object(C.a)({},t,e)))};return Object(E.jsxs)(F.b,{ButtonMenu:l,onConfirm:function(){var e=null===Q||void 0===Q?void 0:Q.map((function(e){return e.phoneNumber})),t=null===Q||void 0===Q?void 0:Q.map((function(e){return e.email})),n=null===Q||void 0===Q?void 0:Q.map((function(e){return e.identityCard}));if(Z.phoneNumber&&e.includes(String(Z.phoneNumber)))return void j(Object(M.a)({message:Object(O.b)("userList.phone-number-existed"),type:"error",title:Object(O.b)("userList.error")}));if(Z.email&&t.includes(String(Z.email)))return void j(Object(M.a)({message:Object(O.b)("userList.email-existed"),type:"error",title:Object(O.b)("userList.error")}));if(Z.identityCard&&n.includes(String(Z.identityCard)))return void j(Object(M.a)({message:Object(O.b)("userList.identity-card-existed"),type:"error",title:Object(O.b)("userList.error")}));if(u){var a,r={id:u._id,updateUserInput:Object(A.a)(Object(A.a)({},Z),{},{locationTypeInput:w,permission:"CANDIDATE"})};null===(a=r.updateUserInput)||void 0===a||delete a.password,j(Object(x.i)(r))}else{var c={createUserInput:Object(A.a)(Object(A.a)({},Z),{},{locationTypeInput:w,permission:"CANDIDATE"})};j(Object(x.a)(c))}},onClose:function(){_({}),u||G("")},className:d,size:"lg",children:[Object(E.jsx)(F.a,{className:"mb-3 text-black text-xxl",children:u?Object(O.b)("userList.edit-candidate"):Object(O.b)("userList.add-candidate")}),Object(E.jsxs)("div",{className:"grid grid-cols-1 gap-2 laptop:grid-cols-2",children:[Object(E.jsxs)("div",{className:"flex flex-col gap-2",children:[Object(E.jsx)(I.a,{placeholder:Object(O.b)("userList.enter-phone-number"),label:Object(O.b)("userList.phone-number"),value:null===u||void 0===u?void 0:u.phoneNumber,type:"number",name:"phoneNumber",onChange:ee,validates:{required:{errorMessage:Object(O.b)("common.validate-required")},matchRegexp:{regexp:L.b,errorMessage:Object(O.b)("common.validate-phone")}}}),!u&&Object(E.jsx)(I.a,{placeholder:Object(O.b)("userList.enter-password"),label:Object(O.b)("userList.password"),value:"",name:"password",onChange:ee,validates:{required:{errorMessage:Object(O.b)("common.validate-required")}}}),Object(E.jsx)(I.a,{placeholder:Object(O.b)("userList.enter-full-name"),label:Object(O.b)("userList.full-name"),value:null===u||void 0===u?void 0:u.displayName,name:"displayName",onChange:ee}),Object(E.jsx)(I.a,{placeholder:Object(O.b)("userList.enter-email"),label:"Email",value:null===u||void 0===u?void 0:u.email,name:"email",onChange:ee,validates:{required:{errorMessage:Object(O.b)("common.validate-required")},matchRegexp:{regexp:L.a,errorMessage:Object(O.b)("common.validate-email")}}}),Object(E.jsx)(K.a,{placeholder:Object(O.b)("userList.enter-birth-date"),value:null===u||void 0===u?void 0:u.birthday,label:Object(O.b)("userList.birthday"),name:"birthday",onChange:function(e){_((function(t){return Object(A.a)(Object(A.a)({},t),{},{birthday:e})}))},disableFuture:!0}),Object(E.jsx)(I.a,{placeholder:Object(O.b)("userList.enter-identification-number"),label:Object(O.b)("userList.identification-number"),value:null===u||void 0===u?void 0:u.identityCard,name:"identityCard",onChange:ee}),Object(E.jsx)(D.a,{placeholder:Object(O.b)("userList.enter-gender"),label:Object(O.b)("common.gender"),options:g,value:B,onSelectOption:function(e){G(e.name),_((function(t){return Object(A.a)(Object(A.a)({},t),{},{gender:e.gender})}))}})]}),Object(E.jsxs)("div",{className:"flex flex-col gap-2",children:[Object(E.jsxs)("div",{className:"",children:[Object(E.jsx)("p",{className:"text-lg font-medium text-black mb-0.5",children:Object(O.b)("userList.avatar")}),Object(E.jsx)(U.a,{image:(null===u||void 0===u||null===(t=u.urlAvt)||void 0===t?void 0:t.small)||(null===u||void 0===u||null===(n=u.urlAvt)||void 0===n?void 0:n.default),className:"row-span-2",name:"urlAvt",onChange:function(e){_((function(t){return Object(A.a)(Object(A.a)({},t),{},{urlAvt:e,customSizeForUploadImage:k.a})}))}})]}),Object(E.jsxs)("div",{className:"flex flex-col gap-2 mt-0.5",children:[Object(E.jsx)(P.a,{idStreet:null===u||void 0===u||null===(a=u.street)||void 0===a?void 0:a._id,onChange:function(e){var t=e.province,n=e.district,a=e.ward,r=e.street,c=void 0===r?"":r,i={provinceCode:null===t||void 0===t?void 0:t.code,districtCode:null===n||void 0===n?void 0:n.code,wardCode:null===a||void 0===a?void 0:a.code,streetName:c};z(i)},className:"grid grid-cols-1 gap-2",required:!1}),Object(E.jsx)("div",{className:"laptop:mt-3",children:Object(E.jsx)(T.a,{label:Object(O.b)("userList.status"),name:"enabled",isChecked:null===u||void 0===u?void 0:u.enabled,onChange:function(e){_((function(t){return Object(A.a)(Object(A.a)({},t),{},{enabled:e})}))}})})]})]})]})]})},J=function(){var e=Object(c.a)(r.a.mark((function e(){var t,n,a,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(w.d)({permissions:["EMPLOYER","ADMIN","CANDIDATE","MANAGER"]});case 2:return n=e.sent,a=(null===n||void 0===n||null===(t=n.data)||void 0===t?void 0:t.getAllUserHasPermissions)||{},c=a.results,e.abrupt("return",c);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),R=(t.default=function(e){var t,n=e.location,a=O.a.language,r=(Object(l.g)(),Object(s.d)()),c=Object(s.e)((function(e){return e.listUser})).users,w=c.results,C=c.totalCount,A=void 0===C?0:C,k=c.loading,S=void 0===k||k,L=Object(s.e)((function(e){return e.common})).actionSuccess,F=Object(o.useState)(!1),P=Object(i.a)(F,2),U=P[0],I=P[1],D=Object(j.a)(null===(t=Object(f.b)(n))||void 0===t?void 0:t.page),T=Object(i.a)(D,2),K=T[0],M=T[1],J=Object(o.useState)(""),V=Object(i.a)(J,2),B=V[0],G=V[1];Object(o.useEffect)((function(){H()}),[]),Object(o.useEffect)((function(){K&&W()}),[K,B]),Object(o.useEffect)((function(){if(L){if(r(Object(g.b)()),I(!1),U&&Object(f.f)(K,A,10))return void M(K-1);W()}}),[L]);var H=function(){r(Object(y.a)([{name:Object(O.b)("breadcrumb.job-seeker")}]))},W=function(){var e={filterUser:{displayName:B||void 0},permissions:["CANDIDATE"],page:K-1,size:10};r(Object(x.c)(e))},Q=Object(o.useCallback)((function(e){M(e)}),[]),q=function(e){return Object(E.jsxs)("div",{className:"flex justify-end space-x-1",children:[Object(E.jsx)(u.a,{ButtonMenu:Object(E.jsx)(p.a,{name:"common/delete",width:"20"}),title:"".concat(Object(O.b)("userList.title-delete")," ").concat(Object(O.b)("breadcrumb.job-seeker").toLowerCase()),content:"".concat(Object(O.b)("userList.content-delete"),"?"),note:Object(O.b)("userList.note-delete"),onConfirm:function(){return function(e){var t={id:e._id||""};r(Object(x.b)(t)),I(!0)}(e)}}),Object(E.jsx)(z,{ButtonMenu:Object(E.jsx)(p.a,{name:"common/edit",width:"20"}),editField:e})]})},X=Object(o.useMemo)((function(){return[{text:Object(O.b)("userList.avatar"),dataField:"urlAvt",headerStyle:function(){return{width:"130px"}},formatter:function(e){return Object(E.jsx)(b.a,{isRound:!0,src:(null===e||void 0===e?void 0:e.small)||""})}},{text:Object(O.b)("userList.code"),dataField:"code"},{text:Object(O.b)("userList.full-name"),dataField:"displayName"},{text:Object(O.b)("userList.phone-number"),dataField:"phoneNumber"},{text:Object(O.b)("userList.email"),dataField:"email"},{text:Object(O.b)("userList.status"),dataField:"enabled",formatter:function(e){return e?Object(E.jsxs)(h.a,{active:!0,children:[Object(O.b)("common.status-enable")," "]}):Object(E.jsx)(h.a,{active:!1,children:Object(O.b)("common.status-disable")})}},{text:Object(O.b)("userList.action"),dataField:"actions",formatter:function(e,t){return q(t)}}]}),[a]);return Object(E.jsxs)("div",{children:[Object(E.jsx)("h1",{className:"mb-2 font-bold leading-none text-xxl font-sfpro",children:Object(O.b)("breadcrumb.job-seeker")}),Object(E.jsxs)("div",{className:"flex flex-col justify-between gap-2 mb-3 laptop:flex-row",children:[Object(E.jsx)("div",{className:"w-full phone:w-25",children:Object(E.jsx)(d.a,{placeholder:Object(O.b)("userList.search"),onFetchData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";M(1),G(e)}})}),Object(E.jsxs)("div",{className:"flex laptop:justify-end flex-wrap w-full gap-2",children:[Object(E.jsx)("div",{className:"w-full phone:w-25",children:Object(E.jsx)(N.a,{onFetchApi:R})}),Object(E.jsx)("div",{className:"w-full phone:w-25",children:Object(E.jsx)(z,{ButtonMenu:Object(E.jsx)(v.a,{primary:!0,innerClassName:"py-1.5 h-4.5 text-lg font-medium font-sfpro normal-case h-full",type:"submit",children:Object(O.b)("userList.add-candidate")}),className:"w-full max-w-full phone:w-25 laptop:w-auto"})})]})]}),Object(E.jsx)(m.a,{isRemote:!0,data:w,columns:X,totalSize:A,sizePerPage:10,page:K,loading:S,onPageChange:Q})]})},function(){var e=Object(c.a)(r.a.mark((function e(){var t,n,a,c=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.length>0&&void 0!==c[0]?c[0]:"",e.next=3,Object(w.d)({permissions:["CANDIDATE"]});case 3:return t=e.sent,n=(null===t||void 0===t?void 0:t.data)||{},a=n.getAllUserHasPermissions,e.abrupt("return",null===a||void 0===a?void 0:a.results);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}())}}]);
//# sourceMappingURL=9.027c0dcb.chunk.js.map