(this["webpackJsonptuyendungvn-admin-frontend-reactjs"]=this["webpackJsonptuyendungvn-admin-frontend-reactjs"]||[]).push([[25],{594:function(e,t,n){"use strict";var a=n(10),c=n(0),o=n(600),i=n.n(o),l=n(601),r=n.n(l),s=n(893),d=n(603),u=n.n(d),b=n(63),j=n(3),f=function(e){var t=e.className,n=void 0===t?"":t,c=e.data,o=e.columns,l=e.headerElement,d=e.sizePerPage,f=void 0===d?10:d,m=e.onPageChange,O=e.page,v=void 0===O?1:O,p=e.isRemote,g=void 0!==p&&p,x=e.totalSize,h=void 0===x?0:x,y=e.loading,N=void 0===y||y,w=e.onClickRow,C=e.onTableChange,S=function(e,t){m&&m(t)},A=function(e,t){var n=t.page;t.sizePerPage;C&&C(n-1)},_={onClick:function(e){w&&w(e)}},k=Math.ceil(h/f);return N||0!==(null===c||void 0===c?void 0:c.length)?Object(j.jsx)("div",{className:"custom-table__container ".concat(n),children:Object(j.jsx)(i.a,{bootstrap4:!0,keyField:"id",data:c,columns:o,search:!0,children:function(e){return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("div",{children:l}),Object(j.jsx)(r.a,Object(a.a)(Object(a.a)({},e.baseProps),{},{bordered:!1,wrapperClasses:"table-responsive col-span-12 overflow-auto lg:overflow-visible font-sfpro",rowEvents:_,pagination:u()({hideSizePerPage:!0,sizePerPage:f,page:v,totalSize:h,custom:!0}),remote:g&&{pagination:!0,filter:!1,sort:!1},onTableChange:A})),0!==h&&Object(j.jsx)("div",{className:"flex justify-end mt-3 pagination-wrap",children:Object(j.jsx)(s.a,{page:v,count:k,onChange:S})})]})}})}):Object(j.jsx)("div",{className:"flex items-center justify-center w-full h-full mt-10 empty-data",children:Object(j.jsx)(b.a,{name:"common/empty-data"})})};t.a=Object(c.memo)(f)},595:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(24),c=n(0),o=n(38),i=function(e){var t=e?Number(e):1,n=Object(o.g)(),i=Object(c.useState)(Number(t)),l=Object(a.a)(i,2),r=l[0],s=l[1];return[r,Object(c.useCallback)((function(e){s(e),n.push("".concat(n.location.pathname,"?page=").concat(e))}),[])]}},596:function(e,t,n){"use strict";var a=n(24),c=n(0),o=n.n(c),i=n(114),l=n(547),r=n(542),s=n(543),d=n(609),u=n(608),b=n(125),j=n(3);t.a=function(e){var t=e.ButtonMenu,n=e.title,c=void 0===n?"":n,f=e.content,m=void 0===f?"":f,O=e.onConfirm,v=e.data,p=e.className,g=void 0===p?"":p,x=(e.note,o.a.useState(!1)),h=Object(a.a)(x,2),y=h[0],N=h[1],w=function(){N(!1)};return Object(j.jsxs)("div",{className:"".concat(g),children:[Object(j.jsx)("button",{type:"button",className:"block w-full",onClick:function(){N(!0)},children:t}),Object(j.jsxs)(l.a,{open:y,onClose:w,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",maxWidth:"sm",fullWidth:!0,PaperProps:{style:{backgroundColor:b.a.white,borderRadius:"0px",padding:"40px"}},children:[Object(j.jsx)(u.a,{className:"p-0 mb-2",id:"alert-dialog-title",children:Object(j.jsx)("h1",{className:"font-bold leading-none text-xxl font-sfpro",children:c})}),Object(j.jsx)(s.a,{className:"p-0 mb-3",children:Object(j.jsx)(d.a,{id:"alert-dialog-description",children:Object(j.jsx)("span",{className:"block text-lg leading-none text-black font-sfpro",children:m})})}),Object(j.jsxs)(r.a,{className:"flex flex-col w-full gap-2 p-0 phone:flex-row",children:[Object(j.jsx)(i.a,{className:"w-full phone:w-auto",innerClassName:"py-1 px-3.5 h-4 font-normal normal-case border-none",onClick:w,type:"button",children:"Hu\u1ef7 b\u1ecf"}),Object(j.jsx)(i.a,{className:"w-full phone:w-auto",primary:!0,innerClassName:"py-1 px-3.5 h-4 font-normal normal-case",onClick:function(e){O&&O(v),N(!1)},type:"submit",children:"\u0110\u1ed3ng \xfd"})]})]})]})}},605:function(e,t,n){"use strict";var a=n(10),c=n(24),o=n(43),i=n(0),l=n(102),r=n(279),s=n(86),d=n(7),u=n(582),b=n(535),j=n(125),f=Object(b.a)({inputFieldHidden:{opacity:0,position:"absolute"},formHelperText:{color:j.a.error}}),m=n(3),O=["className","label","name","value","onChange","required","helpInputText","errorMessage","placeholder"];t.a=function(e){var t=e.className,n=void 0===t?"":t,b=e.label,j=e.name,v=e.value,p=void 0===v?"":v,g=e.onChange,x=e.required,h=e.helpInputText,y=void 0===h?"":h,N=e.errorMessage,w=void 0===N?Object(d.b)("common.text-area-placeholder"):N,C=e.placeholder,S=void 0===C?Object(d.b)("common.text-area-placeholder"):C,A=Object(o.a)(e,O),_=x?["required"]:[],k=f(),E=Object(s.c)(),M=Object(i.useState)(p),P=Object(c.a)(M,2),T=P[0],F=P[1],B=Object(i.useState)(!1),z=Object(c.a)(B,2),q=z[0],D=z[1];Object(i.useEffect)((function(){F(p||"")}),[p]);return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{className:"text-validator-wrapper ".concat(n),children:[b&&Object(m.jsxs)("p",{className:"text-lg font-medium flex items-center mb-0.5",children:[b,x&&Object(m.jsx)("span",{className:"text-error",children:"*"}),y&&Object(m.jsx)("span",{className:"text-sm text-body ml-0.5 ",children:y})]}),Object(m.jsx)(r.a,Object(a.a)({placeholder:S,className:"bg-white",id:E,style:{width:"100%"},multiline:!0,rows:8,variant:"outlined",name:j,value:T,onChange:function(e){var t,n=(null===(t=e.target)||void 0===t?void 0:t.value)||"";j?g&&g(n,j):g&&g(n),F(n)}},A)),q&&Object(m.jsx)(u.a,{className:"font-sfpro",error:!0,variant:"outlined",children:w})]}),x&&Object(m.jsx)(l.TextValidator,{value:T,name:E,validators:_,errorMessages:[w],className:"".concat(k.inputFieldHidden," -z-1"),validatorListener:function(e){e?q&&D(!1):!q&&D(!0)}})]})}},608:function(e,t,n){"use strict";var a=n(4),c=n(11),o=n(0),i=(n(6),n(15)),l=n(21),r=n(586),s=o.forwardRef((function(e,t){var n=e.children,l=e.classes,s=e.className,d=e.disableTypography,u=void 0!==d&&d,b=Object(c.a)(e,["children","classes","className","disableTypography"]);return o.createElement("div",Object(a.a)({className:Object(i.a)(l.root,s),ref:t},b),u?n:o.createElement(r.a,{component:"h2",variant:"h6"},n))}));t.a=Object(l.a)({root:{margin:0,padding:"16px 24px",flex:"0 0 auto"}},{name:"MuiDialogTitle"})(s)},609:function(e,t,n){"use strict";var a=n(4),c=n(0),o=(n(6),n(21)),i=n(586),l=c.forwardRef((function(e,t){return c.createElement(i.a,Object(a.a)({component:"p",variant:"body1",color:"textSecondary",ref:t},e))}));t.a=Object(o.a)({root:{marginBottom:12}},{name:"MuiDialogContentText"})(l)},633:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(167);function c(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=Object(a.a)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var c=0,o=function(){};return{s:o,n:function(){return c>=e.length?{done:!0}:{done:!1,value:e[c++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,l=!0,r=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return l=e.done,e},e:function(e){r=!0,i=e},f:function(){try{l||null==n.return||n.return()}finally{if(r)throw i}}}}},634:function(e,t,n){"use strict";n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return o}));var a="STATIC_PAGE",c="ADS_BY_IMAGE",o="ADS_BY_CODE"},916:function(e,t,n){"use strict";n.r(t);var a=n(633),c=n(24),o=n(0),i=n(37),l=n(594),r=n(63),s=n(7),d=n(596),u=n(74),b=n(38),j=n(595),f=n(234),m=n(166),O=n(5),v=n(86),p=n(114),g=n(116),x=n(10),h=n(210),y=n(115),N=n(126),w=n(238),C=n(634),S=n(605),A=n(3),_=function(e){var t=Object(i.d)(),n=Object(i.e)((function(e){return e.types})).listTypes,a=void 0===n?[]:n,l=e.ButtonMenu,r=e.isEdit,d=e.editField,u=e.className,b=Object(o.useState)({}),j=Object(c.a)(b,2),f=j[0],O=j[1],v=Object(o.useState)(),p=Object(c.a)(v,2),_=p[0],k=p[1];Object(o.useEffect)((function(){t(Object(w.a)({code:C.a}))}),[]),Object(o.useEffect)((function(){d&&k(null===d||void 0===d?void 0:d.displayLocation)}),[d]);var E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;t&&O(Object(x.a)(Object(x.a)({},f),{},Object(g.a)({},t,e)))};return Object(A.jsx)(h.b,{ButtonMenu:l,onConfirm:function(){var e=Object(x.a)({},f);if(r){var n={id:(null===d||void 0===d?void 0:d._id)||null,fieldsToUpdate:e};t(Object(m.f)(n))}else{var a={createAdsInput:e};t(Object(m.a)(a))}},onClose:function(){O({}),d||k(void 0)},className:u,children:Object(A.jsxs)("div",{className:"w-full m-auto",children:[Object(A.jsx)(h.a,{className:"text-xxl mb-3",children:r?Object(s.b)("configAds.title-edit"):Object(s.b)("configAds.title-add")}),Object(A.jsx)(S.a,{className:"mb-2",label:Object(s.b)("configAds.ads_code"),value:null===d||void 0===d?void 0:d.code,name:"code",onChange:function(e){O((function(t){return Object(x.a)(Object(x.a)({},t),{},{code:e})}))},required:!0,errorMessage:Object(s.b)("generalSetting.null.code")}),Object(A.jsx)(y.a,{className:"my-2",label:Object(s.b)("configAds.ads_name"),value:null===d||void 0===d?void 0:d.name,name:"name",onChange:E,validates:{required:{errorMessage:Object(s.b)("generalSetting.null.ads-name")}}}),Object(A.jsx)(N.a,{label:Object(s.b)("configAds.ads_position"),value:null===_||void 0===_?void 0:_.name,options:a,className:"mb-2",required:!0,errorMessage:Object(s.b)("generalSetting.null.select-position"),onSelectOption:function(e){k(e),O((function(t){return Object(x.a)(Object(x.a)({},t),{},{displayLocation:e._id})}))}}),Object(A.jsx)(y.a,{className:"mb-2",label:Object(s.b)("configAds.ads_link"),value:null===d||void 0===d?void 0:d.link,name:"link",onChange:E,validates:{required:{errorMessage:Object(s.b)("generalSetting.null.link")}}})]})})};t.default=Object(b.h)((function(e){var t,n=e.location,b=Object(i.d)(),g=Object(j.a)(null===(t=Object(f.a)(n))||void 0===t?void 0:t.page),x=Object(c.a)(g,2),h=x[0],y=x[1],N=Object(o.useState)(!1),w=Object(c.a)(N,2),C=w[0],S=w[1],k=Object(i.e)((function(e){return e.ads})),E=k.allAds,M=void 0===E?[]:E,P=k.loading,T=void 0===P||P,F=Object(i.e)((function(e){return e.common})).actionSuccess,B=Object(o.useState)([]),z=Object(c.a)(B,2),q=z[0],D=z[1];Object(o.useEffect)((function(){I()}),[h]);var I=function(){b(Object(u.a)([{name:Object(s.b)("breadcrumb.ads_by_code")}]))};Object(o.useEffect)((function(){R()}),[]),Object(o.useEffect)((function(){L()}),[M]),Object(o.useEffect)((function(){F&&(C&&Object(v.f)(h,M.length,10)&&y(h-1),b(Object(O.b)()),S(!1),R())}),[F]);var L=function(){var e,t=[],n=Object(a.a)(M);try{for(n.s();!(e=n.n()).done;){var c,o=e.value;"ADS_BY_CODE"===(null===(c=o.displayLocation)||void 0===c?void 0:c.code)&&t.push(o)}}catch(i){n.e(i)}finally{n.f()}D(t)},R=function(){b(Object(m.b)({filterAds:{}}))},H=Object(o.useCallback)((function(e){y(e)}),[]),Y=function(e){return Object(A.jsxs)("div",{className:"flex justify-end",children:[Object(A.jsx)(d.a,{className:"ml-1 ",ButtonMenu:Object(A.jsx)(r.a,{name:"common/delete"}),title:Object(s.b)("configAds.title-delete"),content:Object(s.b)("configAds.content-delete"),onConfirm:function(){return function(e){b(Object(m.e)({id:e._id})),S(!0)}(e)}}),Object(A.jsx)(_,{ButtonMenu:Object(A.jsx)(r.a,{name:"common/edit",className:"ml-1"}),isEdit:!0,editField:e})]})},G=Object(o.useMemo)((function(){return[{text:Object(s.b)("configAds.ads_name"),dataField:"name"},{text:Object(s.b)("configAds.ads_type"),dataField:"displayLocation",formatter:function(e){return Object(A.jsx)("div",{children:null===e||void 0===e?void 0:e.name})}},{text:Object(s.b)("configAds.ads_link"),dataField:"link"},{text:Object(s.b)("configAds.ads_code"),dataField:"code"},{text:Object(s.b)("configAds.action"),dataField:"actions",formatter:function(e,t){return Y(t)}}]}),[s.a.language]);return Object(A.jsxs)("div",{className:"",children:[Object(A.jsx)("h1",{className:"mb-2 font-bold leading-none text-xxl font-sfpro",children:Object(s.b)("breadcrumb.ads_by_code")}),Object(A.jsx)("div",{className:"flex flex-col items-center justify-end w-full max-w-full gap-2 pb-3 phone:flex-row",children:Object(A.jsx)(_,{ButtonMenu:Object(A.jsx)(p.a,{primary:!0,innerClassName:"py-1.5 h-4 text-lg font-medium font-sfpro normal-case h-full",type:"submit",children:Object(s.b)("configAds.title-add")}),className:"w-full max-w-full phone:w-25"})}),Object(A.jsx)(l.a,{data:q,columns:G,totalSize:M.length,page:h,loading:T,onPageChange:H,sizePerPage:10})]})}))}}]);
//# sourceMappingURL=25.c2099c5f.chunk.js.map