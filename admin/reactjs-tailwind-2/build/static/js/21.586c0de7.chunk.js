/*! For license information please see 21.586c0de7.chunk.js.LICENSE.txt */
(this["webpackJsonptuyendungvn-admin-frontend-reactjs"]=this["webpackJsonptuyendungvn-admin-frontend-reactjs"]||[]).push([[21],{594:function(e,t,n){"use strict";var a=n(10),o=n(0),c=n(600),i=n.n(c),r=n(601),l=n.n(r),s=n(893),u=n(603),d=n.n(u),b=n(63),f=n(3),j=function(e){var t=e.className,n=void 0===t?"":t,o=e.data,c=e.columns,r=e.headerElement,u=e.sizePerPage,j=void 0===u?10:u,m=e.onPageChange,p=e.page,h=void 0===p?1:p,v=e.isRemote,g=void 0!==v&&v,O=e.totalSize,x=void 0===O?0:O,y=e.loading,N=void 0===y||y,w=e.onClickRow,C=e.onTableChange,k=function(e,t){m&&m(t)},P=function(e,t){var n=t.page;t.sizePerPage;C&&C(n-1)},F={onClick:function(e){w&&w(e)}},T=Math.ceil(x/j);return N||0!==(null===o||void 0===o?void 0:o.length)?Object(f.jsx)("div",{className:"custom-table__container ".concat(n),children:Object(f.jsx)(i.a,{bootstrap4:!0,keyField:"id",data:o,columns:c,search:!0,children:function(e){return Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)("div",{children:r}),Object(f.jsx)(l.a,Object(a.a)(Object(a.a)({},e.baseProps),{},{bordered:!1,wrapperClasses:"table-responsive col-span-12 overflow-auto lg:overflow-visible font-sfpro",rowEvents:F,pagination:d()({hideSizePerPage:!0,sizePerPage:j,page:h,totalSize:x,custom:!0}),remote:g&&{pagination:!0,filter:!1,sort:!1},onTableChange:P})),0!==x&&Object(f.jsx)("div",{className:"flex justify-end mt-3 pagination-wrap",children:Object(f.jsx)(s.a,{page:h,count:T,onChange:k})})]})}})}):Object(f.jsx)("div",{className:"flex items-center justify-center w-full h-full mt-10 empty-data",children:Object(f.jsx)(b.a,{name:"common/empty-data"})})};t.a=Object(o.memo)(j)},595:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(24),o=n(0),c=n(38),i=function(e){var t=e?Number(e):1,n=Object(c.g)(),i=Object(o.useState)(Number(t)),r=Object(a.a)(i,2),l=r[0],s=r[1];return[l,Object(o.useCallback)((function(e){s(e),n.push("".concat(n.location.pathname,"?page=").concat(e))}),[])]}},596:function(e,t,n){"use strict";var a=n(24),o=n(0),c=n.n(o),i=n(114),r=n(547),l=n(542),s=n(543),u=n(609),d=n(608),b=n(125),f=n(3);t.a=function(e){var t=e.ButtonMenu,n=e.title,o=void 0===n?"":n,j=e.content,m=void 0===j?"":j,p=e.onConfirm,h=e.data,v=e.className,g=void 0===v?"":v,O=(e.note,c.a.useState(!1)),x=Object(a.a)(O,2),y=x[0],N=x[1],w=function(){N(!1)};return Object(f.jsxs)("div",{className:"".concat(g),children:[Object(f.jsx)("button",{type:"button",className:"block w-full",onClick:function(){N(!0)},children:t}),Object(f.jsxs)(r.a,{open:y,onClose:w,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",maxWidth:"sm",fullWidth:!0,PaperProps:{style:{backgroundColor:b.a.white,borderRadius:"0px",padding:"40px"}},children:[Object(f.jsx)(d.a,{className:"p-0 mb-2",id:"alert-dialog-title",children:Object(f.jsx)("h1",{className:"font-bold leading-none text-xxl font-sfpro",children:o})}),Object(f.jsx)(s.a,{className:"p-0 mb-3",children:Object(f.jsx)(u.a,{id:"alert-dialog-description",children:Object(f.jsx)("span",{className:"block text-lg leading-none text-black font-sfpro",children:m})})}),Object(f.jsxs)(l.a,{className:"flex flex-col w-full gap-2 p-0 phone:flex-row",children:[Object(f.jsx)(i.a,{className:"w-full phone:w-auto",innerClassName:"py-1 px-3.5 h-4 font-normal normal-case border-none",onClick:w,type:"button",children:"Hu\u1ef7 b\u1ecf"}),Object(f.jsx)(i.a,{className:"w-full phone:w-auto",primary:!0,innerClassName:"py-1 px-3.5 h-4 font-normal normal-case",onClick:function(e){p&&p(h),N(!1)},type:"submit",children:"\u0110\u1ed3ng \xfd"})]})]})]})}},597:function(e,t,n){"use strict";var a=n(2),o=n.n(a),c=n(9),i=n(24),r=n(0),l=n(535),s=n(599),u=n(63),d=n(3);t.a=function(e){var t=e.className,n=void 0===t?"":t,a=e.placeholder,l=void 0===a?"T\xecm ki\u1ebfm":a,f=e.onFetchData,j=b(),m=Object(r.useState)(""),p=Object(i.a)(m,2),h=p[0],v=p[1],g=Object(s.a)(f,300),O=function(){var e=Object(c.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.target.value,g(n),v(n);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(d.jsx)("div",{className:"search-form w-full phone:w-auto ".concat(n),children:Object(d.jsxs)("div",{className:"relative w-full laptop:w-25 max-w-full",children:[Object(d.jsx)("input",{name:"search",type:"text",placeholder:l,value:h,onChange:O,autoComplete:"off",className:"block w-full max-w-full pl-4 py-1.5 pr-1 text-sm leading-none font-sfpro text-body ".concat(j.input)}),Object(d.jsx)("span",{className:"absolute top-1/2 transform -translate-y-1/2 pl-1.5 block leading-none group",children:Object(d.jsx)(u.a,{name:"common/search",className:"w-2"})})]})})};var b=Object(l.a)((function(e){return{input:{border:"1px solid rgba(0,0,0,0.23)","&:hover, &:focus":{borderColor:"rgba(0,0,0,0.87)"}}}}))},598:function(e,t,n){"use strict";function a(e){return"function"===typeof e?e():e}function o(){var e={};return e.promise=new Promise((function(t,n){e.resolve=t,e.reject=n})),e}e.exports=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},c=void 0,i=void 0,r=void 0,l=[];return function(){var u=a(t),d=(new Date).getTime(),b=!c||d-c>u;c=d;for(var f=arguments.length,j=Array(f),m=0;m<f;m++)j[m]=arguments[m];if(b&&n.leading)return n.accumulate?Promise.resolve(e.call(this,[j])).then((function(e){return e[0]})):Promise.resolve(e.call.apply(e,[this].concat(j)));if(i?clearTimeout(r):i=o(),l.push(j),r=setTimeout(s.bind(this),u),n.accumulate){var p=l.length-1;return i.promise.then((function(e){return e[p]}))}return i.promise};function s(){var t=i;clearTimeout(r),Promise.resolve(n.accumulate?e.call(this,l):e.apply(this,l[l.length-1])).then(t.resolve,t.reject),l=[],i=null}}},599:function(e,t,n){"use strict";var a=n(598),o=n.n(a);function c(e){var t=null,n=null,a=new Promise((function(e,a){t=e,n=a}));return e&&e.then((function(e){t&&t(e)}),(function(e){n&&n(e)})),{promise:a,resolve:function(e){t&&t(e)},reject:function(e){n&&n(e)},cancel:function(){t=null,n=null}}}var i=function(){return i=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},i.apply(this,arguments)},r={key:function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return null},onlyResolvesLast:!0},l=function(){function e(e){this.config=e,this.debounceSingleton=null,this.debounceCache={}}return e.prototype._createDebouncedFunction=function(){var e=o()(this.config.func,this.config.wait,this.config.options);return this.config.options.onlyResolvesLast&&(e=function(e){var t=null;return function(){for(var n=[],a=0;a<arguments.length;a++)n[a]=arguments[a];t&&t();var o=c(e.apply(void 0,n)),i=o.promise,r=o.cancel;return t=r,i}}(e)),{func:e}},e.prototype.getDebouncedFunction=function(e){var t,n=(t=this.config.options).key.apply(t,e);return null===n||"undefined"===typeof n?(this.debounceSingleton||(this.debounceSingleton=this._createDebouncedFunction()),this.debounceSingleton):(this.debounceCache[n]||(this.debounceCache[n]=this._createDebouncedFunction()),this.debounceCache[n])},e}();t.a=function(e,t,n){var a=i({},r,n),o=new l({func:e,wait:t,options:a});return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=o.getDebouncedFunction(e).func;return n.apply(void 0,e)}}},605:function(e,t,n){"use strict";var a=n(10),o=n(24),c=n(43),i=n(0),r=n(102),l=n(279),s=n(86),u=n(7),d=n(582),b=n(535),f=n(125),j=Object(b.a)({inputFieldHidden:{opacity:0,position:"absolute"},formHelperText:{color:f.a.error}}),m=n(3),p=["className","label","name","value","onChange","required","helpInputText","errorMessage","placeholder"];t.a=function(e){var t=e.className,n=void 0===t?"":t,b=e.label,f=e.name,h=e.value,v=void 0===h?"":h,g=e.onChange,O=e.required,x=e.helpInputText,y=void 0===x?"":x,N=e.errorMessage,w=void 0===N?Object(u.b)("common.text-area-placeholder"):N,C=e.placeholder,k=void 0===C?Object(u.b)("common.text-area-placeholder"):C,P=Object(c.a)(e,p),F=O?["required"]:[],T=j(),M=Object(s.c)(),S=Object(i.useState)(v),D=Object(o.a)(S,2),E=D[0],z=D[1],R=Object(i.useState)(!1),B=Object(o.a)(R,2),_=B[0],q=B[1];Object(i.useEffect)((function(){z(v||"")}),[v]);return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{className:"text-validator-wrapper ".concat(n),children:[b&&Object(m.jsxs)("p",{className:"text-lg font-medium flex items-center mb-0.5",children:[b,O&&Object(m.jsx)("span",{className:"text-error",children:"*"}),y&&Object(m.jsx)("span",{className:"text-sm text-body ml-0.5 ",children:y})]}),Object(m.jsx)(l.a,Object(a.a)({placeholder:k,className:"bg-white",id:M,style:{width:"100%"},multiline:!0,rows:8,variant:"outlined",name:f,value:E,onChange:function(e){var t,n=(null===(t=e.target)||void 0===t?void 0:t.value)||"";f?g&&g(n,f):g&&g(n),z(n)}},P)),_&&Object(m.jsx)(d.a,{className:"font-sfpro",error:!0,variant:"outlined",children:w})]}),O&&Object(m.jsx)(r.TextValidator,{value:E,name:M,validators:F,errorMessages:[w],className:"".concat(T.inputFieldHidden," -z-1"),validatorListener:function(e){e?_&&q(!1):!_&&q(!0)}})]})}},608:function(e,t,n){"use strict";var a=n(4),o=n(11),c=n(0),i=(n(6),n(15)),r=n(21),l=n(586),s=c.forwardRef((function(e,t){var n=e.children,r=e.classes,s=e.className,u=e.disableTypography,d=void 0!==u&&u,b=Object(o.a)(e,["children","classes","className","disableTypography"]);return c.createElement("div",Object(a.a)({className:Object(i.a)(r.root,s),ref:t},b),d?n:c.createElement(l.a,{component:"h2",variant:"h6"},n))}));t.a=Object(r.a)({root:{margin:0,padding:"16px 24px",flex:"0 0 auto"}},{name:"MuiDialogTitle"})(s)},609:function(e,t,n){"use strict";var a=n(4),o=n(0),c=(n(6),n(21)),i=n(586),r=o.forwardRef((function(e,t){return o.createElement(i.a,Object(a.a)({component:"p",variant:"body1",color:"textSecondary",ref:t},e))}));t.a=Object(c.a)({root:{marginBottom:12}},{name:"MuiDialogContentText"})(r)},912:function(e,t,n){"use strict";n.r(t);var a=n(24),o=n(37),c=n(0),i=n(38),r=n(354),l=n(7),s=n(597),u=n(596),d=n(595),b=n(86),f=n(234),j=n(114),m=n(63),p=n(594),h=n(5),v=n(74),g=n(127),O=n(10),x=n(115),y=n(605),N=n(210),w=n(3),C=function(e){var t=Object(o.d)(),n=e.ButtonMenu,a=e.isEdit,i=e.editField,r=e.className,s=Object(c.useRef)(null).current;return Object(w.jsx)(N.b,{ButtonMenu:n,onConfirm:function(){var e,n,a={description:null===(e=s)||void 0===e?void 0:e.description,name:null===(n=s)||void 0===n?void 0:n.name};if(i){var o={id:(null===i||void 0===i?void 0:i._id)||"",tagInput:a};t(Object(g.o)(o))}else{var c={tagInput:a};t(Object(g.c)(c))}},onClose:function(){s=null},className:r,children:Object(w.jsxs)("div",{className:"w-full m-auto",children:[Object(w.jsx)(N.a,{className:"mb-3",children:a?Object(l.b)("blog.title-edit-tags"):Object(l.b)("blog.title-add-tags")}),Object(w.jsx)(x.a,{label:Object(l.b)("blog.title-tags"),value:null===i||void 0===i?void 0:i.name,placeholder:Object(l.b)("blog.enter-tag-name"),name:"title",onChange:function(e){return s=Object(O.a)(Object(O.a)({},s),{},{name:e})},validates:{required:{errorMessage:Object(l.b)("blog.error.tags.title")}}}),Object(w.jsx)(y.a,{className:"mt-4",placeholder:Object(l.b)("blog.tag-description"),label:Object(l.b)("blog.description"),value:null===i||void 0===i?void 0:i.description,onChange:function(e){s=Object(O.a)(Object(O.a)({},s),{},{description:e})},name:"description"})]})})};t.default=Object(i.h)((function(e){var t,n=e.location,i=Object(o.d)(),O=Object(d.a)(null===(t=Object(f.a)(n))||void 0===t?void 0:t.page),x=Object(a.a)(O,2),y=x[0],N=x[1],k=Object(o.e)((function(e){return e.blog})).allTag,P=k.results,F=k.totalCount,T=void 0===F?0:F,M=k.loading,S=void 0===M||M,D=Object(o.e)((function(e){return e.common})).actionSuccess,E=Object(c.useState)(""),z=Object(a.a)(E,2),R=z[0],B=z[1];Object(c.useEffect)((function(){_()}),[]),Object(c.useEffect)((function(){q()}),[y,R]),Object(c.useEffect)((function(){if(D){if(i(Object(h.b)()),Object(b.f)(y,T,10))return void N(y-1);setTimeout((function(){q()}),50)}}),[D]);var _=function(){i(Object(v.a)([{name:Object(l.b)("breadcrumb.tags")}]))},q=function(){var e={filterTag:{name:R||void 0},page:y-1,size:10};i(Object(g.k)(e))},H=Object(c.useCallback)((function(e){N(e)}),[]),I=function(e){return Object(w.jsxs)("div",{className:"flex justify-end",children:[Object(w.jsx)(u.a,{className:"ml-1 ",ButtonMenu:Object(w.jsx)(m.a,{name:"common/delete"}),title:Object(l.b)("blog.title-delete-tags"),content:Object(l.b)("blog.content-delete-tags"),onConfirm:function(){return function(e){var t={id:e._id};i(Object(g.f)(t))}(e)}}),Object(w.jsx)(C,{ButtonMenu:Object(w.jsx)(m.a,{name:"common/edit",className:"ml-1"}),isEdit:!0,editField:e})]})},L=Object(c.useMemo)((function(){return[{text:Object(l.b)("blog.title-tags"),dataField:"name"},{text:Object(l.b)("blog.description"),dataField:"description"},{text:Object(l.b)("blog.create-at"),dataField:"createdAt",formatter:function(e){return Object(w.jsx)("div",{children:Object(r.a)(new Date(e),"dd/MM/yyyy")})}},{text:Object(l.b)("blog.actions"),dataField:"actions",formatter:function(e,t){return I(t)}}]}),[l.a.language]);return Object(w.jsxs)("div",{className:"",children:[Object(w.jsx)("h1",{className:"mb-2 font-bold leading-none text-xxl font-sfpro",children:Object(l.b)("breadcrumb.tags")}),Object(w.jsxs)("div",{className:"flex flex-col items-center justify-between w-full max-w-full gap-2 pb-3 phone:flex-row",children:[Object(w.jsx)(s.a,{placeholder:Object(l.b)("blog.search"),onFetchData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";N(1),B(e)}}),Object(w.jsx)(C,{ButtonMenu:Object(w.jsx)(j.a,{primary:!0,innerClassName:"py-1.5 h-4 text-lg font-medium font-sfpro normal-case h-full",type:"submit",children:Object(l.b)("blog.title-add-tags")}),className:"w-full max-full phone:w-25"})]}),Object(w.jsx)(p.a,{data:P,columns:L,totalSize:T,page:y,loading:S,onPageChange:H,sizePerPage:10})]})}))}}]);
//# sourceMappingURL=21.586c0de7.chunk.js.map