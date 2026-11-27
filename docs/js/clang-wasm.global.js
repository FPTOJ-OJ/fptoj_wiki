/*! @live-codes/clang-wasm - MIT. IIFE build, sets self.clangWasm.
 *  importScripts('clang-wasm.global.js') then self.clangWasm.createCompiler(id, { baseUrl }).
 *  Bundles @wasm-idle/llvm-core (MIT AND Apache-2.0 WITH LLVM-exception), @bjorn3/browser_wasi_shim (MIT OR Apache-2.0) and fflate (MIT). */
var clangWasm=(()=>{var t_=Object.defineProperty;var Zr=Object.getOwnPropertyDescriptor;var Qr=Object.getOwnPropertyNames;var es=Object.prototype.hasOwnProperty;var ts=(n,e)=>()=>(n&&(e=n(n=0)),e);var n_=(n,e)=>{for(var t in e)t_(n,t,{get:e[t],enumerable:!0})},ns=(n,e,t,_)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Qr(e))!es.call(n,r)&&r!==t&&t_(n,r,{get:()=>e[r],enumerable:!(_=Zr(e,r))||_.enumerable});return n};var _s=n=>ns(t_({},"__esModule",{value:!0}),n);var Pi={};n_(Pi,{AsyncCompress:()=>os,AsyncDecompress:()=>fs,AsyncDeflate:()=>bi,AsyncGunzip:()=>wi,AsyncGzip:()=>os,AsyncInflate:()=>A_,AsyncUnzipInflate:()=>Ns,AsyncUnzlib:()=>Li,AsyncZipDeflate:()=>Ts,AsyncZlib:()=>ds,Compress:()=>o_,DecodeUTF8:()=>ps,Decompress:()=>f_,Deflate:()=>Oe,EncodeUTF8:()=>hs,FlateErrorCode:()=>rs,Gunzip:()=>An,Gzip:()=>o_,Inflate:()=>xe,Unzip:()=>ys,UnzipInflate:()=>Is,UnzipPassThrough:()=>Gi,Unzlib:()=>Nn,Zip:()=>gs,ZipDeflate:()=>ms,ZipPassThrough:()=>kt,Zlib:()=>d_,compress:()=>as,compressSync:()=>a_,decompress:()=>cs,decompressSync:()=>us,deflate:()=>Ei,deflateSync:()=>Vt,gunzip:()=>Ri,gunzipSync:()=>In,gzip:()=>as,gzipSync:()=>a_,inflate:()=>I_,inflateSync:()=>Lt,strFromU8:()=>y_,strToU8:()=>Qe,unzip:()=>xs,unzipSync:()=>bs,unzlib:()=>Ci,unzlibSync:()=>yn,zip:()=>Ss,zipSync:()=>As,zlib:()=>ls,zlibSync:()=>l_});function st(n,e){return typeof n=="function"&&(e=n,n={}),this.ondata=e,n}function Ei(n,e,t){return t||(t=e,e={}),typeof t!="function"&&L(7),wt(n,e,[Et],function(_){return et(Vt(_.data[0],_.data[1]))},0,t)}function Vt(n,e){return rt(n,e||{},0,0)}function I_(n,e,t){return t||(t=e,e={}),typeof t!="function"&&L(7),wt(n,e,[bt],function(_){return et(Lt(_.data[0],p_(_.data[1])))},1,t)}function Lt(n,e){return Wt(n,{i:2},e&&e.out,e&&e.dictionary)}function as(n,e,t){return t||(t=e,e={}),typeof t!="function"&&L(7),wt(n,e,[Et,Ai,function(){return[a_]}],function(_){return et(a_(_.data[0],_.data[1]))},2,t)}function a_(n,e){e||(e={});var t=xt(),_=n.length;t.p(n);var r=rt(n,e,T_(e),8),i=r.length;return h_(r,e),j(r,i-8,t.d()),j(r,i-4,_),r}function Ri(n,e,t){return t||(t=e,e={}),typeof t!="function"&&L(7),wt(n,e,[bt,Ii,function(){return[In]}],function(_){return et(In(_.data[0],_.data[1]))},3,t)}function In(n,e){var t=m_(n);return t+8>n.length&&L(6,"invalid gzip data"),Wt(n.subarray(t,-8),{i:2},e&&e.out||new P(xi(n)),e&&e.dictionary)}function ls(n,e,t){return t||(t=e,e={}),typeof t!="function"&&L(7),wt(n,e,[Et,Ni,function(){return[l_]}],function(_){return et(l_(_.data[0],_.data[1]))},4,t)}function l_(n,e){e||(e={});var t=En();t.p(n);var _=rt(n,e,e.dictionary?6:2,4);return g_(_,e),j(_,_.length-4,t.d()),_}function Ci(n,e,t){return t||(t=e,e={}),typeof t!="function"&&L(7),wt(n,e,[bt,yi,function(){return[yn]}],function(_){return et(yn(_.data[0],p_(_.data[1])))},5,t)}function yn(n,e){return Wt(n.subarray(S_(n,e&&e.dictionary),-4),{i:2},e&&e.out,e&&e.dictionary)}function cs(n,e,t){return t||(t=e,e={}),typeof t!="function"&&L(7),n[0]==31&&n[1]==139&&n[2]==8?Ri(n,e,t):(n[0]&15)!=8||n[0]>>4>7||(n[0]<<8|n[1])%31?I_(n,e,t):Ci(n,e,t)}function us(n,e){return n[0]==31&&n[1]==139&&n[2]==8?In(n,e):(n[0]&15)!=8||n[0]>>4>7||(n[0]<<8|n[1])%31?Lt(n,e):yn(n,e)}function Qe(n,e){if(e){for(var t=new P(n.length),_=0;_<n.length;++_)t[_]=n.charCodeAt(_);return t}if(si)return si.encode(n);for(var r=n.length,i=new P(n.length+(n.length>>1)),s=0,o=function(l){i[s++]=l},_=0;_<r;++_){if(s+5>i.length){var a=new P(s+8+(r-_<<1));a.set(i),i=a}var d=n.charCodeAt(_);d<128||e?o(d):d<2048?(o(192|d>>6),o(128|d&63)):d>55295&&d<57344?(d=65536+(d&1047552)|n.charCodeAt(++_)&1023,o(240|d>>18),o(128|d>>12&63),o(128|d>>6&63),o(128|d&63)):(o(224|d>>12),o(128|d>>6&63),o(128|d&63))}return Ue(i,0,s)}function y_(n,e){if(e){for(var t="",_=0;_<n.length;_+=16384)t+=String.fromCharCode.apply(null,n.subarray(_,_+16384));return t}else{if(c_)return c_.decode(n);var r=Mi(n),i=r.s,t=r.r;return t.length&&L(8),i}}function Ss(n,e,t){t||(t=e,e={}),typeof t!="function"&&L(7);var _={};N_(n,"",_,e);var r=Object.keys(_),i=r.length,s=0,o=0,a=i,d=new Array(i),l=[],f=function(){for(var h=0;h<l.length;++h)l[h]()},u=function(h,I){xn(function(){t(h,I)})};xn(function(){u=t});var c=function(){var h=new P(o+22),I=s,b=o-s;o=0;for(var x=0;x<a;++x){var p=d[x];try{var g=p.c.length;At(h,o,p,p.f,p.u,g);var m=30+p.f.length+Ze(p.extra),N=o+m;h.set(p.c,N),At(h,s,p,p.f,p.u,g,o,p.m),s+=16+m+(p.m?p.m.length:0),o=N+g}catch(A){return u(A,null)}}x_(h,s,d.length,b,I),u(null,h)};i||c();for(var T=function(h){var I=r[h],b=_[I],x=b[0],p=b[1],g=xt(),m=x.length;g.p(x);var N=Qe(I),A=N.length,y=p.comment,R=y&&Qe(y),E=R&&R.length,V=Ze(p.extra),W=p.level==0?0:8,H=function(Z,v){if(Z)f(),u(Z,null);else{var U=v.length;d[h]=Bt(p,{size:m,crc:g.d(),c:v,f:N,m:R,u:A!=I.length||R&&y.length!=E,compression:W}),s+=30+A+V+U,o+=76+2*(A+V)+(E||0)+U,--i||c()}};if(A>65535&&H(L(11,0,1),null),!W)H(null,x);else if(m<16e4)try{H(null,Vt(x,p))}catch(Z){H(Z,null)}else l.push(Ei(x,p,H))},S=0;S<a;++S)T(S);return f}function As(n,e){e||(e={});var t={},_=[];N_(n,"",t,e);var r=0,i=0;for(var s in t){var o=t[s],a=o[0],d=o[1],l=d.level==0?0:8,f=Qe(s),u=f.length,c=d.comment,T=c&&Qe(c),S=T&&T.length,h=Ze(d.extra);u>65535&&L(11);var I=l?Vt(a,d):a,b=I.length,x=xt();x.p(a),_.push(Bt(d,{size:a.length,crc:x.d(),c:I,f,m:T,u:u!=s.length||T&&c.length!=S,o:r,compression:l})),r+=30+u+h+b,i+=76+2*(u+h)+(S||0)+b}for(var p=new P(i+22),g=r,m=i-r,N=0;N<_.length;++N){var f=_[N];At(p,f.o,f,f.f,f.u,f.c.length);var A=30+f.f.length+Ze(f.extra);p.set(f.c,f.o+A),At(p,r,f,f.f,f.u,f.c.length,f.o,f.m),r+=16+A+(f.m?f.m.length:0)}return x_(p,r,_.length,m,g),p}function xs(n,e,t){t||(t=e,e={}),typeof t!="function"&&L(7);var _=[],r=function(){for(var h=0;h<_.length;++h)_[h]()},i={},s=function(h,I){xn(function(){t(h,I)})};xn(function(){s=t});for(var o=n.length-22;ie(n,o)!=101010256;--o)if(!o||n.length-o>65558)return s(L(13,0,1),null),r;var a=Ne(n,o+8);if(a){var d=a,l=ie(n,o+16),f=ie(n,o-20)==117853008;if(f){var u=ie(n,o-12);f=ie(n,u)==101075792,f&&(d=a=ie(n,u+32),l=ie(n,u+48))}for(var c=e&&e.filter,T=function(h){var I=Oi(n,l,f),b=I[0],x=I[1],p=I[2],g=I[3],m=I[4],N=I[5],A=Ui(n,N);l=m;var y=function(E,V){E?(r(),s(E,null)):(V&&(i[g]=V),--a||s(null,i))};if(!c||c({name:g,size:x,originalSize:p,compression:b}))if(!b)y(null,Ue(n,A,A+x));else if(b==8){var R=n.subarray(A,A+x);if(p<524288||x>.8*p)try{y(null,Lt(R,{out:new P(p)}))}catch(E){y(E,null)}else _.push(I_(R,{size:p},y))}else y(L(14,"unknown compression type "+b,1),null);else y(null,null)},S=0;S<d;++S)T(S)}else s(null,{});return r}function bs(n,e){for(var t={},_=n.length-22;ie(n,_)!=101010256;--_)(!_||n.length-_>65558)&&L(13);var r=Ne(n,_+8);if(!r)return{};var i=ie(n,_+16),s=ie(n,_-20)==117853008;if(s){var o=ie(n,_-12);s=ie(n,o)==101075792,s&&(r=ie(n,o+32),i=ie(n,o+48))}for(var a=e&&e.filter,d=0;d<r;++d){var l=Oi(n,i,s),f=l[0],u=l[1],c=l[2],T=l[3],S=l[4],h=l[5],I=Ui(n,h);i=S,(!a||a({name:T,size:u,originalSize:c,compression:f}))&&(f?f==8?t[T]=Lt(n.subarray(I,I+u),{out:new P(c)}):L(14,"unknown compression type "+f):t[T]=Ue(n,I,I+u))}return t}var ii,is,P,ye,$t,It,Nt,Ht,oi,ai,u_,gn,di,li,i_,Xt,je,Y,De,Ye,Y,Y,Y,Y,St,Y,fi,ci,ui,pi,hn,Me,mn,yt,Ue,rs,hi,L,Wt,Xe,Tt,Tn,Sn,r_,gt,bn,s_,mi,ke,Ti,gi,xt,En,rt,Bt,ri,pn,ss,Si,bt,Et,Ai,Ii,Ni,yi,et,p_,wt,Fe,Rt,Ne,ie,__,j,h_,m_,xi,T_,g_,S_,Oe,bi,xe,A_,o_,os,An,wi,d_,ds,Nn,Li,f_,fs,N_,si,c_,vi,Mi,ps,hs,Di,Ui,Oi,Fi,Ze,At,x_,kt,ms,Ts,gs,Gi,Is,Ns,ys,xn,Hi=ts(()=>{ii={},is=(function(n,e,t,_,r){var i=new Worker(ii[e]||(ii[e]=URL.createObjectURL(new Blob([n+';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'],{type:"text/javascript"}))));return i.onmessage=function(s){var o=s.data,a=o.$e$;if(a){var d=new Error(a[0]);d.code=a[1],d.stack=a[2],r(d,null)}else r(null,o)},i.postMessage(t,_),i}),P=Uint8Array,ye=Uint16Array,$t=Int32Array,It=new P([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Nt=new P([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ht=new P([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),oi=function(n,e){for(var t=new ye(31),_=0;_<31;++_)t[_]=e+=1<<n[_-1];for(var r=new $t(t[30]),_=1;_<30;++_)for(var i=t[_];i<t[_+1];++i)r[i]=i-t[_]<<5|_;return{b:t,r}},ai=oi(It,2),u_=ai.b,gn=ai.r;u_[28]=258,gn[258]=28;di=oi(Nt,0),li=di.b,i_=di.r,Xt=new ye(32768);for(Y=0;Y<32768;++Y)je=(Y&43690)>>1|(Y&21845)<<1,je=(je&52428)>>2|(je&13107)<<2,je=(je&61680)>>4|(je&3855)<<4,Xt[Y]=((je&65280)>>8|(je&255)<<8)>>1;De=(function(n,e,t){for(var _=n.length,r=0,i=new ye(e);r<_;++r)n[r]&&++i[n[r]-1];var s=new ye(e);for(r=1;r<e;++r)s[r]=s[r-1]+i[r-1]<<1;var o;if(t){o=new ye(1<<e);var a=15-e;for(r=0;r<_;++r)if(n[r])for(var d=r<<4|n[r],l=e-n[r],f=s[n[r]-1]++<<l,u=f|(1<<l)-1;f<=u;++f)o[Xt[f]>>a]=d}else for(o=new ye(_),r=0;r<_;++r)n[r]&&(o[r]=Xt[s[n[r]-1]++]>>15-n[r]);return o}),Ye=new P(288);for(Y=0;Y<144;++Y)Ye[Y]=8;for(Y=144;Y<256;++Y)Ye[Y]=9;for(Y=256;Y<280;++Y)Ye[Y]=7;for(Y=280;Y<288;++Y)Ye[Y]=8;St=new P(32);for(Y=0;Y<32;++Y)St[Y]=5;fi=De(Ye,9,0),ci=De(Ye,9,1),ui=De(St,5,0),pi=De(St,5,1),hn=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},Me=function(n,e,t){var _=e/8|0;return(n[_]|n[_+1]<<8)>>(e&7)&t},mn=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},yt=function(n){return(n+7)/8|0},Ue=function(n,e,t){return(e==null||e<0)&&(e=0),(t==null||t>n.length)&&(t=n.length),new P(n.subarray(e,t))},rs={UnexpectedEOF:0,InvalidBlockType:1,InvalidLengthLiteral:2,InvalidDistance:3,StreamFinished:4,NoStreamHandler:5,InvalidHeader:6,NoCallback:7,InvalidUTF8:8,ExtraFieldTooLong:9,InvalidDate:10,FilenameTooLong:11,StreamFinishing:12,InvalidZipData:13,UnknownCompressionMethod:14},hi=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],L=function(n,e,t){var _=new Error(e||hi[n]);if(_.code=n,Error.captureStackTrace&&Error.captureStackTrace(_,L),!t)throw _;return _},Wt=function(n,e,t,_){var r=n.length,i=_?_.length:0;if(!r||e.f&&!e.l)return t||new P(0);var s=!t,o=s||e.i!=2,a=e.i;s&&(t=new P(r*3));var d=function(w){var Q=t.length;if(w>Q){var fe=new P(Math.max(Q*2,w));fe.set(t),t=fe}},l=e.f||0,f=e.p||0,u=e.b||0,c=e.l,T=e.d,S=e.m,h=e.n,I=r*8;do{if(!c){l=Me(n,f,1);var b=Me(n,f+1,3);if(f+=3,b)if(b==1)c=ci,T=pi,S=9,h=5;else if(b==2){var m=Me(n,f,31)+257,N=Me(n,f+10,15)+4,A=m+Me(n,f+5,31)+1;f+=14;for(var y=new P(A),R=new P(19),E=0;E<N;++E)R[Ht[E]]=Me(n,f+E*3,7);f+=N*3;for(var V=hn(R),W=(1<<V)-1,H=De(R,V,1),E=0;E<A;){var Z=H[Me(n,f,W)];f+=Z&15;var x=Z>>4;if(x<16)y[E++]=x;else{var v=0,U=0;for(x==16?(U=3+Me(n,f,3),f+=2,v=y[E-1]):x==17?(U=3+Me(n,f,7),f+=3):x==18&&(U=11+Me(n,f,127),f+=7);U--;)y[E++]=v}}var te=y.subarray(0,m),J=y.subarray(m);S=hn(te),h=hn(J),c=De(te,S,1),T=De(J,h,1)}else L(1);else{var x=yt(f)+4,p=n[x-4]|n[x-3]<<8,g=x+p;if(g>r){a&&L(0);break}o&&d(u+p),t.set(n.subarray(x,g),u),e.b=u+=p,e.p=f=g*8,e.f=l;continue}if(f>I){a&&L(0);break}}o&&d(u+131072);for(var Le=(1<<S)-1,ue=(1<<h)-1,Se=f;;Se=f){var v=c[mn(n,f)&Le],ne=v>>4;if(f+=v&15,f>I){a&&L(0);break}if(v||L(2),ne<256)t[u++]=ne;else if(ne==256){Se=f,c=null;break}else{var pe=ne-254;if(ne>264){var E=ne-257,G=It[E];pe=Me(n,f,(1<<G)-1)+u_[E],f+=G}var C=T[mn(n,f)&ue],D=C>>4;C||L(3),f+=C&15;var J=li[D];if(D>3){var G=Nt[D];J+=mn(n,f)&(1<<G)-1,f+=G}if(f>I){a&&L(0);break}o&&d(u+131072);var k=u+pe;if(u<J){var oe=i-J,be=Math.min(J,k);for(oe+u<0&&L(3);u<be;++u)t[u]=_[oe+u]}for(;u<k;++u)t[u]=t[u-J]}}e.l=c,e.p=Se,e.b=u,e.f=l,c&&(l=1,e.m=S,e.d=T,e.n=h)}while(!l);return u!=t.length&&s?Ue(t,0,u):t.subarray(0,u)},Xe=function(n,e,t){t<<=e&7;var _=e/8|0;n[_]|=t,n[_+1]|=t>>8},Tt=function(n,e,t){t<<=e&7;var _=e/8|0;n[_]|=t,n[_+1]|=t>>8,n[_+2]|=t>>16},Tn=function(n,e){for(var t=[],_=0;_<n.length;++_)n[_]&&t.push({s:_,f:n[_]});var r=t.length,i=t.slice();if(!r)return{t:ke,l:0};if(r==1){var s=new P(t[0].s+1);return s[t[0].s]=1,{t:s,l:1}}t.sort(function(g,m){return g.f-m.f}),t.push({s:-1,f:25001});var o=t[0],a=t[1],d=0,l=1,f=2;for(t[0]={s:-1,f:o.f+a.f,l:o,r:a};l!=r-1;)o=t[t[d].f<t[f].f?d++:f++],a=t[d!=l&&t[d].f<t[f].f?d++:f++],t[l++]={s:-1,f:o.f+a.f,l:o,r:a};for(var u=i[0].s,_=1;_<r;++_)i[_].s>u&&(u=i[_].s);var c=new ye(u+1),T=Sn(t[l-1],c,0);if(T>e){var _=0,S=0,h=T-e,I=1<<h;for(i.sort(function(m,N){return c[N.s]-c[m.s]||m.f-N.f});_<r;++_){var b=i[_].s;if(c[b]>e)S+=I-(1<<T-c[b]),c[b]=e;else break}for(S>>=h;S>0;){var x=i[_].s;c[x]<e?S-=1<<e-c[x]++-1:++_}for(;_>=0&&S;--_){var p=i[_].s;c[p]==e&&(--c[p],++S)}T=e}return{t:new P(c),l:T}},Sn=function(n,e,t){return n.s==-1?Math.max(Sn(n.l,e,t+1),Sn(n.r,e,t+1)):e[n.s]=t},r_=function(n){for(var e=n.length;e&&!n[--e];);for(var t=new ye(++e),_=0,r=n[0],i=1,s=function(a){t[_++]=a},o=1;o<=e;++o)if(n[o]==r&&o!=e)++i;else{if(!r&&i>2){for(;i>138;i-=138)s(32754);i>2&&(s(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(s(r),--i;i>6;i-=6)s(8304);i>2&&(s(i-3<<5|8208),i=0)}for(;i--;)s(r);i=1,r=n[o]}return{c:t.subarray(0,_),n:e}},gt=function(n,e){for(var t=0,_=0;_<e.length;++_)t+=n[_]*e[_];return t},bn=function(n,e,t){var _=t.length,r=yt(e+2);n[r]=_&255,n[r+1]=_>>8,n[r+2]=n[r]^255,n[r+3]=n[r+1]^255;for(var i=0;i<_;++i)n[r+i+4]=t[i];return(r+4+_)*8},s_=function(n,e,t,_,r,i,s,o,a,d,l){Xe(e,l++,t),++r[256];for(var f=Tn(r,15),u=f.t,c=f.l,T=Tn(i,15),S=T.t,h=T.l,I=r_(u),b=I.c,x=I.n,p=r_(S),g=p.c,m=p.n,N=new ye(19),A=0;A<b.length;++A)++N[b[A]&31];for(var A=0;A<g.length;++A)++N[g[A]&31];for(var y=Tn(N,7),R=y.t,E=y.l,V=19;V>4&&!R[Ht[V-1]];--V);var W=d+5<<3,H=gt(r,Ye)+gt(i,St)+s,Z=gt(r,u)+gt(i,S)+s+14+3*V+gt(N,R)+2*N[16]+3*N[17]+7*N[18];if(a>=0&&W<=H&&W<=Z)return bn(e,l,n.subarray(a,a+d));var v,U,te,J;if(Xe(e,l,1+(Z<H)),l+=2,Z<H){v=De(u,c,0),U=u,te=De(S,h,0),J=S;var Le=De(R,E,0);Xe(e,l,x-257),Xe(e,l+5,m-1),Xe(e,l+10,V-4),l+=14;for(var A=0;A<V;++A)Xe(e,l+3*A,R[Ht[A]]);l+=3*V;for(var ue=[b,g],Se=0;Se<2;++Se)for(var ne=ue[Se],A=0;A<ne.length;++A){var pe=ne[A]&31;Xe(e,l,Le[pe]),l+=R[pe],pe>15&&(Xe(e,l,ne[A]>>5&127),l+=ne[A]>>12)}}else v=fi,U=Ye,te=ui,J=St;for(var A=0;A<o;++A){var G=_[A];if(G>255){var pe=G>>18&31;Tt(e,l,v[pe+257]),l+=U[pe+257],pe>7&&(Xe(e,l,G>>23&31),l+=It[pe]);var C=G&31;Tt(e,l,te[C]),l+=J[C],C>3&&(Tt(e,l,G>>5&8191),l+=Nt[C])}else Tt(e,l,v[G]),l+=U[G]}return Tt(e,l,v[256]),l+U[256]},mi=new $t([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),ke=new P(0),Ti=function(n,e,t,_,r,i){var s=i.z||n.length,o=new P(_+s+5*(1+Math.ceil(s/7e3))+r),a=o.subarray(_,o.length-r),d=i.l,l=(i.r||0)&7;if(e){l&&(a[0]=i.r>>3);for(var f=mi[e-1],u=f>>13,c=f&8191,T=(1<<t)-1,S=i.p||new ye(32768),h=i.h||new ye(T+1),I=Math.ceil(t/3),b=2*I,x=function(ve){return(n[ve]^n[ve+1]<<I^n[ve+2]<<b)&T},p=new $t(25e3),g=new ye(288),m=new ye(32),N=0,A=0,y=i.i||0,R=0,E=i.w||0,V=0;y+2<s;++y){var W=x(y),H=y&32767,Z=h[W];if(S[H]=Z,h[W]=H,E<=y){var v=s-y;if((N>7e3||R>24576)&&(v>423||!d)){l=s_(n,a,0,p,g,m,A,R,V,y-V,l),R=N=A=0,V=y;for(var U=0;U<286;++U)g[U]=0;for(var U=0;U<30;++U)m[U]=0}var te=2,J=0,Le=c,ue=H-Z&32767;if(v>2&&W==x(y-ue))for(var Se=Math.min(u,v)-1,ne=Math.min(32767,y),pe=Math.min(258,v);ue<=ne&&--Le&&H!=Z;){if(n[y+te]==n[y+te-ue]){for(var G=0;G<pe&&n[y+G]==n[y+G-ue];++G);if(G>te){if(te=G,J=ue,G>Se)break;for(var C=Math.min(ue,G-2),D=0,U=0;U<C;++U){var k=y-ue+U&32767,oe=S[k],be=k-oe&32767;be>D&&(D=be,Z=k)}}}H=Z,Z=S[H],ue+=H-Z&32767}if(J){p[R++]=268435456|gn[te]<<18|i_[J];var w=gn[te]&31,Q=i_[J]&31;A+=It[w]+Nt[Q],++g[257+w],++m[Q],E=y+te,++N}else p[R++]=n[y],++g[n[y]]}}for(y=Math.max(y,E);y<s;++y)p[R++]=n[y],++g[n[y]];l=s_(n,a,d,p,g,m,A,R,V,y-V,l),d||(i.r=l&7|a[l/8|0]<<3,l-=7,i.h=h,i.p=S,i.i=y,i.w=E)}else{for(var y=i.w||0;y<s+d;y+=65535){var fe=y+65535;fe>=s&&(a[l/8|0]=d,fe=s),l=bn(a,l+1,n.subarray(y,fe))}i.i=s}return Ue(o,0,_+yt(l)+r)},gi=(function(){for(var n=new Int32Array(256),e=0;e<256;++e){for(var t=e,_=9;--_;)t=(t&1&&-306674912)^t>>>1;n[e]=t}return n})(),xt=function(){var n=-1;return{p:function(e){for(var t=n,_=0;_<e.length;++_)t=gi[t&255^e[_]]^t>>>8;n=t},d:function(){return~n}}},En=function(){var n=1,e=0;return{p:function(t){for(var _=n,r=e,i=t.length|0,s=0;s!=i;){for(var o=Math.min(s+2655,i);s<o;++s)r+=_+=t[s];_=(_&65535)+15*(_>>16),r=(r&65535)+15*(r>>16)}n=_,e=r},d:function(){return n%=65521,e%=65521,(n&255)<<24|(n&65280)<<8|(e&255)<<8|e>>8}}},rt=function(n,e,t,_,r){if(!r&&(r={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),s=new P(i.length+n.length);s.set(i),s.set(n,i.length),n=s,r.w=i.length}return Ti(n,e.level==null?6:e.level,e.mem==null?r.l?Math.ceil(Math.max(8,Math.min(13,Math.log(n.length)))*1.5):20:12+e.mem,t,_,r)},Bt=function(n,e){var t={};for(var _ in n)t[_]=n[_];for(var _ in e)t[_]=e[_];return t},ri=function(n,e,t){for(var _=n(),r=n.toString(),i=r.slice(r.indexOf("[")+1,r.lastIndexOf("]")).replace(/\s+/g,"").split(","),s=0;s<_.length;++s){var o=_[s],a=i[s];if(typeof o=="function"){e+=";"+a+"=";var d=o.toString();if(o.prototype)if(d.indexOf("[native code]")!=-1){var l=d.indexOf(" ",8)+1;e+=d.slice(l,d.indexOf("(",l))}else{e+=d;for(var f in o.prototype)e+=";"+a+".prototype."+f+"="+o.prototype[f].toString()}else e+=d}else t[a]=o}return e},pn=[],ss=function(n){var e=[];for(var t in n)n[t].buffer&&e.push((n[t]=new n[t].constructor(n[t])).buffer);return e},Si=function(n,e,t,_){if(!pn[t]){for(var r="",i={},s=n.length-1,o=0;o<s;++o)r=ri(n[o],r,i);pn[t]={c:ri(n[s],r,i),e:i}}var a=Bt({},pn[t].e);return is(pn[t].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+e.toString()+"}",t,a,ss(a),_)},bt=function(){return[P,ye,$t,It,Nt,Ht,u_,li,ci,pi,Xt,hi,De,hn,Me,mn,yt,Ue,L,Wt,Lt,et,p_]},Et=function(){return[P,ye,$t,It,Nt,Ht,gn,i_,fi,Ye,ui,St,Xt,mi,ke,De,Xe,Tt,Tn,Sn,r_,gt,bn,s_,yt,Ue,Ti,rt,Vt,et]},Ai=function(){return[h_,T_,j,xt,gi]},Ii=function(){return[m_,xi]},Ni=function(){return[g_,j,En]},yi=function(){return[S_]},et=function(n){return postMessage(n,[n.buffer])},p_=function(n){return n&&{out:n.size&&new P(n.size),dictionary:n.dictionary}},wt=function(n,e,t,_,r,i){var s=Si(t,_,r,function(o,a){s.terminate(),i(o,a)});return s.postMessage([n,e],e.consume?[n.buffer]:[]),function(){s.terminate()}},Fe=function(n){return n.ondata=function(e,t){return postMessage([e,t],[e.buffer])},function(e){e.data[0]?(n.push(e.data[0],e.data[1]),postMessage([e.data[0].length])):n.flush(e.data[1])}},Rt=function(n,e,t,_,r,i,s){var o,a=Si(n,_,r,function(d,l){d?(a.terminate(),e.ondata.call(e,d)):Array.isArray(l)?l.length==1?(e.queuedSize-=l[0],e.ondrain&&e.ondrain(l[0])):(l[1]&&a.terminate(),e.ondata.call(e,d,l[0],l[1])):s(l)});a.postMessage(t),e.queuedSize=0,e.push=function(d,l){e.ondata||L(5),o&&e.ondata(L(4,0,1),null,!!l),e.queuedSize+=d.length,a.postMessage([d,o=l],d.buffer instanceof ArrayBuffer?[d.buffer]:[])},e.terminate=function(){a.terminate()},i&&(e.flush=function(d){a.postMessage([0,d])})},Ne=function(n,e){return n[e]|n[e+1]<<8},ie=function(n,e){return(n[e]|n[e+1]<<8|n[e+2]<<16|n[e+3]<<24)>>>0},__=function(n,e){return ie(n,e)+ie(n,e+4)*4294967296},j=function(n,e,t){for(;t;++e)n[e]=t,t>>>=8},h_=function(n,e){var t=e.filename;if(n[0]=31,n[1]=139,n[2]=8,n[8]=e.level<2?4:e.level==9?2:0,n[9]=3,e.mtime!=0&&j(n,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),t){n[3]=8;for(var _=0;_<=t.length;++_)n[_+10]=t.charCodeAt(_)}},m_=function(n){(n[0]!=31||n[1]!=139||n[2]!=8)&&L(6,"invalid gzip data");var e=n[3],t=10;e&4&&(t+=(n[10]|n[11]<<8)+2);for(var _=(e>>3&1)+(e>>4&1);_>0;_-=!n[t++]);return t+(e&2)},xi=function(n){var e=n.length;return(n[e-4]|n[e-3]<<8|n[e-2]<<16|n[e-1]<<24)>>>0},T_=function(n){return 10+(n.filename?n.filename.length+1:0)},g_=function(n,e){var t=e.level,_=t==0?0:t<6?1:t==9?3:2;if(n[0]=120,n[1]=_<<6|(e.dictionary&&32),n[1]|=31-(n[0]<<8|n[1])%31,e.dictionary){var r=En();r.p(e.dictionary),j(n,2,r.d())}},S_=function(n,e){return((n[0]&15)!=8||n[0]>>4>7||(n[0]<<8|n[1])%31)&&L(6,"invalid zlib data"),(n[1]>>5&1)==+!e&&L(6,"invalid zlib data: "+(n[1]&32?"need":"unexpected")+" dictionary"),(n[1]>>3&4)+2};Oe=(function(){function n(e,t){if(typeof e=="function"&&(t=e,e={}),this.ondata=t,this.o=e||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new P(98304),this.o.dictionary){var _=this.o.dictionary.subarray(-32768);this.b.set(_,32768-_.length),this.s.i=32768-_.length}}return n.prototype.p=function(e,t){this.ondata(rt(e,this.o,0,0,this.s),t)},n.prototype.push=function(e,t){this.ondata||L(5),this.s.l&&L(4);var _=e.length+this.s.z;if(_>this.b.length){if(_>2*this.b.length-32768){var r=new P(_&-32768);r.set(this.b.subarray(0,this.s.z)),this.b=r}var i=this.b.length-this.s.z;this.b.set(e.subarray(0,i),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(e.subarray(i),32768),this.s.z=e.length-i+32768,this.s.i=32766,this.s.w=32768}else this.b.set(e,this.s.z),this.s.z+=e.length;this.s.l=t&1,(this.s.z>this.s.w+8191||t)&&(this.p(this.b,t||!1),this.s.w=this.s.i,this.s.i-=2),t&&(this.s=this.o={},this.b=ke)},n.prototype.flush=function(e){if(this.ondata||L(5),this.s.l&&L(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2,e){var t=new P(6);t[0]=this.s.r>>3;var _=bn(t,this.s.r,ke);this.s.r=0,this.ondata(t.subarray(0,_>>3),!1)}},n})(),bi=(function(){function n(e,t){Rt([Et,function(){return[Fe,Oe]}],this,st.call(this,e,t),function(_){var r=new Oe(_.data);onmessage=Fe(r)},6,1)}return n})();xe=(function(){function n(e,t){typeof e=="function"&&(t=e,e={}),this.ondata=t;var _=e&&e.dictionary&&e.dictionary.subarray(-32768);this.s={i:0,b:_?_.length:0},this.o=new P(32768),this.p=new P(0),_&&this.o.set(_)}return n.prototype.e=function(e){if(this.ondata||L(5),this.d&&L(4),!this.p.length)this.p=e;else if(e.length){var t=new P(this.p.length+e.length);t.set(this.p),t.set(e,this.p.length),this.p=t}},n.prototype.c=function(e){this.s.i=+(this.d=e||!1);var t=this.s.b,_=Wt(this.p,this.s,this.o);this.ondata(Ue(_,t,this.s.b),this.d),this.o=Ue(_,this.s.b-32768),this.s.b=this.o.length,this.p=Ue(this.p,this.s.p/8|0),this.s.p&=7},n.prototype.push=function(e,t){this.e(e),this.c(t)},n})(),A_=(function(){function n(e,t){Rt([bt,function(){return[Fe,xe]}],this,st.call(this,e,t),function(_){var r=new xe(_.data);onmessage=Fe(r)},7,0)}return n})();o_=(function(){function n(e,t){this.c=xt(),this.l=0,this.v=1,Oe.call(this,e,t)}return n.prototype.push=function(e,t){this.c.p(e),this.l+=e.length,Oe.prototype.push.call(this,e,t)},n.prototype.p=function(e,t){var _=rt(e,this.o,this.v&&T_(this.o),t&&8,this.s);this.v&&(h_(_,this.o),this.v=0),t&&(j(_,_.length-8,this.c.d()),j(_,_.length-4,this.l)),this.ondata(_,t)},n.prototype.flush=function(e){Oe.prototype.flush.call(this,e)},n})(),os=(function(){function n(e,t){Rt([Et,Ai,function(){return[Fe,Oe,o_]}],this,st.call(this,e,t),function(_){var r=new o_(_.data);onmessage=Fe(r)},8,1)}return n})();An=(function(){function n(e,t){this.v=1,this.r=0,xe.call(this,e,t)}return n.prototype.push=function(e,t){if(xe.prototype.e.call(this,e),this.r+=e.length,this.v){var _=this.p.subarray(this.v-1),r=_.length>3?m_(_):4;if(r>_.length){if(!t)return}else this.v>1&&this.onmember&&this.onmember(this.r-_.length);this.p=_.subarray(r),this.v=0}xe.prototype.c.call(this,0),this.s.f&&!this.s.l?(this.v=yt(this.s.p)+9,this.s={i:0},this.o=new P(0),this.push(new P(0),t)):t&&xe.prototype.c.call(this,t)},n})(),wi=(function(){function n(e,t){var _=this;Rt([bt,Ii,function(){return[Fe,xe,An]}],this,st.call(this,e,t),function(r){var i=new An(r.data);i.onmember=function(s){return postMessage(s)},onmessage=Fe(i)},9,0,function(r){return _.onmember&&_.onmember(r)})}return n})();d_=(function(){function n(e,t){this.c=En(),this.v=1,Oe.call(this,e,t)}return n.prototype.push=function(e,t){this.c.p(e),Oe.prototype.push.call(this,e,t)},n.prototype.p=function(e,t){var _=rt(e,this.o,this.v&&(this.o.dictionary?6:2),t&&4,this.s);this.v&&(g_(_,this.o),this.v=0),t&&j(_,_.length-4,this.c.d()),this.ondata(_,t)},n.prototype.flush=function(e){Oe.prototype.flush.call(this,e)},n})(),ds=(function(){function n(e,t){Rt([Et,Ni,function(){return[Fe,Oe,d_]}],this,st.call(this,e,t),function(_){var r=new d_(_.data);onmessage=Fe(r)},10,1)}return n})();Nn=(function(){function n(e,t){xe.call(this,e,t),this.v=e&&e.dictionary?2:1}return n.prototype.push=function(e,t){if(xe.prototype.e.call(this,e),this.v){if(this.p.length<6&&!t)return;this.p=this.p.subarray(S_(this.p,this.v-1)),this.v=0}t&&(this.p.length<4&&L(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),xe.prototype.c.call(this,t)},n})(),Li=(function(){function n(e,t){Rt([bt,yi,function(){return[Fe,xe,Nn]}],this,st.call(this,e,t),function(_){var r=new Nn(_.data);onmessage=Fe(r)},11,0)}return n})();f_=(function(){function n(e,t){this.o=st.call(this,e,t)||{},this.G=An,this.I=xe,this.Z=Nn}return n.prototype.i=function(){var e=this;this.s.ondata=function(t,_){e.ondata(t,_)}},n.prototype.push=function(e,t){if(this.ondata||L(5),this.s)this.s.push(e,t);else{if(this.p&&this.p.length){var _=new P(this.p.length+e.length);_.set(this.p),_.set(e,this.p.length)}else this.p=e;this.p.length>2&&(this.s=this.p[0]==31&&this.p[1]==139&&this.p[2]==8?new this.G(this.o):(this.p[0]&15)!=8||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(this.o):new this.Z(this.o),this.i(),this.s.push(this.p,t),this.p=null)}},n})(),fs=(function(){function n(e,t){f_.call(this,e,t),this.queuedSize=0,this.G=wi,this.I=A_,this.Z=Li}return n.prototype.i=function(){var e=this;this.s.ondata=function(t,_,r){e.ondata(t,_,r)},this.s.ondrain=function(t){e.queuedSize-=t,e.ondrain&&e.ondrain(t)}},n.prototype.push=function(e,t){this.queuedSize+=e.length,f_.prototype.push.call(this,e,t)},n})();N_=function(n,e,t,_){for(var r in n){var i=n[r],s=e+r,o=_;Array.isArray(i)&&(o=Bt(_,i[1]),i=i[0]),ArrayBuffer.isView(i)?t[s]=[i,o]:(t[s+="/"]=[new P(0),o],N_(i,s,t,_))}},si=typeof TextEncoder<"u"&&new TextEncoder,c_=typeof TextDecoder<"u"&&new TextDecoder,vi=0;try{c_.decode(ke,{stream:!0}),vi=1}catch{}Mi=function(n){for(var e="",t=0;;){var _=n[t++],r=(_>127)+(_>223)+(_>239);if(t+r>n.length)return{s:e,r:Ue(n,t-1)};r?r==3?(_=((_&15)<<18|(n[t++]&63)<<12|(n[t++]&63)<<6|n[t++]&63)-65536,e+=String.fromCharCode(55296|_>>10,56320|_&1023)):r&1?e+=String.fromCharCode((_&31)<<6|n[t++]&63):e+=String.fromCharCode((_&15)<<12|(n[t++]&63)<<6|n[t++]&63):e+=String.fromCharCode(_)}},ps=(function(){function n(e){this.ondata=e,vi?this.t=new TextDecoder:this.p=ke}return n.prototype.push=function(e,t){if(this.ondata||L(5),t=!!t,this.t){this.ondata(this.t.decode(e,{stream:!0}),t),t&&(this.t.decode().length&&L(8),this.t=null);return}this.p||L(4);var _=new P(this.p.length+e.length);_.set(this.p),_.set(e,this.p.length);var r=Mi(_),i=r.s,s=r.r;t?(s.length&&L(8),this.p=null):this.p=s,this.ondata(i,t)},n})(),hs=(function(){function n(e){this.ondata=e}return n.prototype.push=function(e,t){this.ondata||L(5),this.d&&L(4),this.ondata(Qe(e),this.d=t||!1)},n})();Di=function(n){return n==1?3:n<6?2:n==9?1:0},Ui=function(n,e){return e+30+Ne(n,e+26)+Ne(n,e+28)},Oi=function(n,e,t){var _=Ne(n,e+28),r=Ne(n,e+30),i=y_(n.subarray(e+46,e+46+_),!(Ne(n,e+8)&2048)),s=e+46+_,o=Fi(n,s,r,t,ie(n,e+20),ie(n,e+24),ie(n,e+42)),a=o[0],d=o[1],l=o[2];return[Ne(n,e+10),a,d,i,s+r+Ne(n,e+32),l]},Fi=function(n,e,t,_,r,i,s){var o=r==4294967295,a=i==4294967295,d=s==4294967295,l=e+t,f=o+a+d;if(_&&f){for(;e+4<l;e+=4+Ne(n,e+2))if(Ne(n,e)==1)return[o?__(n,e+4+8*a):r,a?__(n,e+4):i,d?__(n,e+4+8*(a+o)):s,1];_<2&&L(13)}return[r,i,s,0]},Ze=function(n){var e=0;if(n)for(var t in n){var _=n[t].length;_>65535&&L(9),e+=_+4}return e},At=function(n,e,t,_,r,i,s,o){var a=_.length,d=t.extra,l=o&&o.length,f=Ze(d);j(n,e,s!=null?33639248:67324752),e+=4,s!=null&&(n[e++]=20,n[e++]=t.os),n[e]=20,e+=2,n[e++]=t.flag<<1|(i<0&&8),n[e++]=r&&8,n[e++]=t.compression&255,n[e++]=t.compression>>8;var u=new Date(t.mtime==null?Date.now():t.mtime),c=u.getFullYear()-1980;if((c<0||c>119)&&L(10),j(n,e,c<<25|u.getMonth()+1<<21|u.getDate()<<16|u.getHours()<<11|u.getMinutes()<<5|u.getSeconds()>>1),e+=4,i!=-1&&(j(n,e,t.crc),j(n,e+4,i<0?-i-2:i),j(n,e+8,t.size)),j(n,e+12,a),j(n,e+14,f),e+=16,s!=null&&(j(n,e,l),j(n,e+6,t.attrs),j(n,e+10,s),e+=14),n.set(_,e),e+=a,f)for(var T in d){var S=d[T],h=S.length;j(n,e,+T),j(n,e+2,h),n.set(S,e+4),e+=4+h}return l&&(n.set(o,e),e+=l),e},x_=function(n,e,t,_,r){j(n,e,101010256),j(n,e+8,t),j(n,e+10,t),j(n,e+12,_),j(n,e+16,r)},kt=(function(){function n(e){this.filename=e,this.c=xt(),this.size=0,this.compression=0}return n.prototype.process=function(e,t){this.ondata(null,e,t)},n.prototype.push=function(e,t){this.ondata||L(5),this.c.p(e),this.size+=e.length,t&&(this.crc=this.c.d()),this.process(e,t||!1)},n})(),ms=(function(){function n(e,t){var _=this;t||(t={}),kt.call(this,e),this.d=new Oe(t,function(r,i){_.ondata(null,r,i)}),this.compression=8,this.flag=Di(t.level)}return n.prototype.process=function(e,t){try{this.d.push(e,t)}catch(_){this.ondata(_,null,t)}},n.prototype.push=function(e,t){kt.prototype.push.call(this,e,t)},n})(),Ts=(function(){function n(e,t){var _=this;t||(t={}),kt.call(this,e),this.d=new bi(t,function(r,i,s){_.ondata(r,i,s)}),this.compression=8,this.flag=Di(t.level),this.terminate=this.d.terminate}return n.prototype.process=function(e,t){this.d.push(e,t)},n.prototype.push=function(e,t){kt.prototype.push.call(this,e,t)},n})(),gs=(function(){function n(e){this.ondata=e,this.u=[],this.d=1}return n.prototype.add=function(e){var t=this;if(this.ondata||L(5),this.d&2)this.ondata(L(4+(this.d&1)*8,0,1),null,!1);else{var _=Qe(e.filename),r=_.length,i=e.comment,s=i&&Qe(i),o=r!=e.filename.length||s&&i.length!=s.length,a=r+Ze(e.extra)+30;r>65535&&this.ondata(L(11,0,1),null,!1);var d=new P(a);At(d,0,e,_,o,-1);var l=[d],f=function(){for(var h=0,I=l;h<I.length;h++){var b=I[h];t.ondata(null,b,!1)}l=[]},u=this.d;this.d=0;var c=this.u.length,T=Bt(e,{f:_,u:o,o:s,t:function(){e.terminate&&e.terminate()},r:function(){if(f(),u){var h=t.u[c+1];h?h.r():t.d=1}u=1}}),S=0;e.ondata=function(h,I,b){if(h)t.ondata(h,I,b),t.terminate();else if(S+=I.length,l.push(I),b){var x=new P(16);j(x,0,134695760),j(x,4,e.crc),j(x,8,S),j(x,12,e.size),l.push(x),T.c=S,T.b=a+S+16,T.crc=e.crc,T.size=e.size,u&&T.r(),u=1}else u&&f()},this.u.push(T)}},n.prototype.end=function(){var e=this;if(this.d&2){this.ondata(L(4+(this.d&1)*8,0,1),null,!0);return}this.d?this.e():this.u.push({r:function(){e.d&1&&(e.u.splice(-1,1),e.e())},t:function(){}}),this.d=3},n.prototype.e=function(){for(var e=0,t=0,_=0,r=0,i=this.u;r<i.length;r++){var s=i[r];_+=46+s.f.length+Ze(s.extra)+(s.o?s.o.length:0)}for(var o=new P(_+22),a=0,d=this.u;a<d.length;a++){var s=d[a];At(o,e,s,s.f,s.u,-s.c-2,t,s.o),e+=46+s.f.length+Ze(s.extra)+(s.o?s.o.length:0),t+=s.b}x_(o,e,this.u.length,_,t),this.ondata(null,o,!0),this.d=2},n.prototype.terminate=function(){for(var e=0,t=this.u;e<t.length;e++){var _=t[e];_.t()}this.d=2},n})();Gi=(function(){function n(){}return n.prototype.push=function(e,t){this.ondata(null,e,t)},n.compression=0,n})(),Is=(function(){function n(){var e=this;this.i=new xe(function(t,_){e.ondata(null,t,_)})}return n.prototype.push=function(e,t){try{this.i.push(e,t)}catch(_){this.ondata(_,null,t)}},n.compression=8,n})(),Ns=(function(){function n(e,t){var _=this;t<32e4?this.i=new xe(function(r,i){_.ondata(null,r,i)}):(this.i=new A_(function(r,i,s){_.ondata(r,i,s)}),this.terminate=this.i.terminate)}return n.prototype.push=function(e,t){this.i.terminate&&(e=Ue(e,0)),this.i.push(e,t)},n.compression=8,n})(),ys=(function(){function n(e){this.onfile=e,this.k=[],this.o={0:Gi},this.p=ke}return n.prototype.push=function(e,t){var _=this;if(this.onfile||L(5),this.p||L(4),this.c>0){var r=Math.min(this.c,e.length),i=e.subarray(0,r);if(this.c-=r,this.d?this.d.push(i,!this.c):this.k[0].push(i),e=e.subarray(r),e.length)return this.push(e,t)}else{var s=0,o=0,a=void 0,d=void 0;this.p.length?e.length?(d=new P(this.p.length+e.length),d.set(this.p),d.set(e,this.p.length)):d=this.p:d=e;for(var l=d.length,f=this.c,u=f&&this.d,c=function(){var I=ie(d,o);if(I==67324752){s=1,a=o,T.d=null,T.c=0;var b=Ne(d,o+6),x=Ne(d,o+8),p=b&2048,g=b&8,m=Ne(d,o+26),N=Ne(d,o+28);if(l>o+30+m+N){var A=[];T.k.unshift(A),s=2;var y=ie(d,o+18),R=ie(d,o+22),E=y_(d.subarray(o+30,o+=30+m),!p),V=Fi(d,o,N,2,y,R,0),W=V[0],H=V[1],Z=V[3];g&&(W=-1-Z),o+=N,T.c=W;var v,U={name:E,compression:x,start:function(){if(U.ondata||L(5),!W)U.ondata(null,ke,!0);else{var te=_.o[x];te||U.ondata(L(14,"unknown compression type "+x,1),null,!1),v=W<0?new te(E):new te(E,W,H),v.ondata=function(Se,ne,pe){U.ondata(Se,ne,pe)};for(var J=0,Le=A;J<Le.length;J++){var ue=Le[J];v.push(ue,!1)}_.k[0]==A&&_.c?_.d=v:v.push(ke,!0)}},terminate:function(){v&&v.terminate&&v.terminate()}};W>=0&&(U.size=W,U.originalSize=H),T.onfile(U)}return"break"}else if(f){if(I==134695760)return a=o+=12+(f==-2&&8),s=3,T.c=0,"break";if(I==33639248)return a=o-=4,s=3,T.c=0,"break"}},T=this;o<l-4;++o){var S=c();if(S==="break")break}if(this.p=ke,f<0){var h=s?d.subarray(0,a-12-(f==-2&&8)-(ie(d,a-16)==134695760&&4)):d.subarray(0,o);u?u.push(h,!!s):this.k[+(s==2)].push(h)}if(s&2)return this.push(d.subarray(o),t);this.p=d.subarray(o)}t&&(this.c&&L(13),this.p=null)},n.prototype.register=function(e){this.o[e.compression]=e},n})(),xn=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(n){n()}});var Pl={};n_(Pl,{LANGUAGE_IDS:()=>Fl,createCompiler:()=>Ol,standardsFor:()=>Gl});function _t(n){if(n.debugMode!==void 0){if(n.debugMode==="none"||n.debugMode==="trace"||n.debugMode==="lldb")return n.debugMode;throw new Error(`unsupported wasm-clang debug mode: ${String(n.debugMode)}`)}return n.debug?"trace":"none"}function ht(n,...e){let t={};for(let _ of e)t[_]=(n[_]||(()=>0)).bind(n);return t}function mt(n,e,t=-1){let _=t===-1?n.length:e+t,r="";for(let i=e;i<_&&n[i];++i)r+=String.fromCharCode(n[i]);return r}function ni(n,e,t=-1){let _=t===-1?n.length:e+t,r=[];for(let i=e;i<_&&n[i];++i)r.push(n[i]);return new TextDecoder().decode(Uint8Array.from(r))}function _i(n,e,t){return parseInt(mt(n,e,t),8)}var it=class{memory;view;buffer;u8;u32;constructor(e){this.memory=e,this.buffer=e.buffer,this.view=new DataView(this.buffer),this.u8=new Uint8Array(this.buffer),this.u32=new Uint32Array(this.buffer)}check(){this.buffer.byteLength===0&&(this.buffer=this.memory.buffer,this.view=new DataView(this.buffer),this.u8=new Uint8Array(this.buffer),this.u32=new Uint32Array(this.buffer))}read8(e){return this.u8[e]}read32(e){return this.u32[e>>2]}readInt32(e){return this.view.getInt32(e,!0)}readFloat32(e){return this.view.getFloat32(e,!0)}readFloat64(e){return this.view.getFloat64(e,!0)}readStr(e,t){return mt(this.u8,e,t)}readStrR(e,t){return ni(this.u8,e,t)}write8(e,t){this.u8[e]=t}write32(e,t){this.u32[e>>2]=t}write64(e,t,_=0){this.write32(e,t),this.write32(e+4,_)}writeStr(e,t){return e+=this.write(e,t),this.write8(e,0),t.length+1}writeUint8(e,t){return new Uint8Array(this.buffer,e,t.length).set(t),t.length}write(e,t){return t instanceof ArrayBuffer?this.writeUint8(e,new Uint8Array(t)):t instanceof SharedArrayBuffer?this.writeUint8(e,new Uint8Array(t)):typeof t=="string"?this.writeUint8(e,t.split("").map(_=>_.charCodeAt(0))):this.writeUint8(e,t)}};var wn=new Map,Rn=new Map,Es=n=>n.byteLength>=2&&n[0]===31&&n[1]===139,zt=128*1024*1024,Ln=4*1024*1024,Xi=64*1024;async function ki(n,e,t,_){let r=n.getReader(),i=_,s=!1;if(i?.aborted){s=!0;let T=de(i);try{Promise.resolve(r.cancel(T)).catch(()=>{})}catch{}try{r.releaseLock()}catch{}throw T}let o,a=i?new Promise((T,S)=>{o=()=>{if(s)return;s=!0;let h=de(i);try{Promise.resolve(r.cancel(h)).catch(()=>{})}catch{}S(h)},i.addEventListener("abort",o,{once:!0})}):void 0,d=new Uint8Array(Math.min(Xi,t)),l=0,f=!1,u,c;try{for(le(i);;){let T=r.read(),{done:S,value:h}=a?await Promise.race([T,a]):await T;if(le(i),S)break;if(!h)continue;let I=l+h.byteLength;if(I>t)throw new Error(`Runtime asset ${e} decompressed size exceeds the ${t} byte limit`);if(I>d.byteLength){let b=Math.min(t,Math.max(I,Math.max(d.byteLength*2,1))),x=new Uint8Array(b);x.set(d.subarray(0,l)),d=x}d.set(h,l),l=I}le(i),u=d.subarray(0,l),f=!0}catch(T){if(i?.aborted)throw de(i);if(!s){s=!0;try{Promise.resolve(r.cancel(T)).catch(()=>{})}catch{}}throw T}finally{o&&i?.removeEventListener("abort",o);try{r.releaseLock()}catch(T){f&&(c={error:T})}}if(c)throw c.error;return u}function $i(n){let e;try{e=new URL(n,typeof location<"u"?location.href:void 0)}catch{throw new Error("Runtime asset URL must be absolute outside a browser document")}if(e.protocol!=="http:"&&e.protocol!=="https:")throw new Error("Runtime assets must use HTTP(S)");if(e.username||e.password)throw new Error("Runtime asset URLs must not include credentials");if(e.hash)throw new Error("Runtime asset URLs must not include fragments");return e}function Wi(n){let e=n.headers.get("Content-Length");if(e===null)return 0;let t=Number(e);if(!/^\d+$/u.test(e)||!Number.isSafeInteger(t))throw new Error("Runtime asset has an invalid Content-Length");return t}function de(n){return n.reason??new DOMException("Runtime asset load aborted","AbortError")}function jt(n,e,t){return e?new Promise((_,r)=>{let i=!1,s=()=>{i||(i=!0,e.removeEventListener("abort",s),r(de(e)))};e.addEventListener("abort",s,{once:!0}),n.then(o=>{if(i){t&&Promise.resolve().then(()=>t(o,e.reason)).catch(()=>{});return}i=!0,e.removeEventListener("abort",s),_(o)},o=>{i||(i=!0,e.removeEventListener("abort",s),r(o))}),e.aborted&&s()}):n}function le(n){if(n?.aborted)throw de(n)}function Ae(n,e){try{n.body?.cancel(e).catch(()=>{})}catch{}}async function Bi(n,e,t,_,r){if(r?.aborted){let h=de(r);throw Ae(n,h),h}let i;try{i=Wi(n)}catch(h){throw Ae(n,h),h}if(i>t)throw Ae(n),new Error(`Runtime asset ${e} size exceeds the ${t} byte limit`);if(!n.body){let h=new Uint8Array(await jt(n.arrayBuffer(),r));if(r?.aborted)throw de(r);if(h.byteLength>t)throw new Error(`Runtime asset ${e} size exceeds the ${t} byte limit`);return _?.set?.(1),h}let s=r,o=n.body.getReader(),a=!1,d=h=>{if(!a){a=!0;try{Promise.resolve(o.cancel(h)).catch(()=>{})}catch{}}};if(s?.aborted){let h=de(s);d(h);try{o.releaseLock()}catch{}throw h}let l,f=s?new Promise((h,I)=>{l=()=>{let b=de(s);d(b),I(b)},s.addEventListener("abort",l,{once:!0})}):void 0,u,c=0,T,S;try{for(u=new Uint8Array(Math.min(t,i||Xi));;){le(s);let h=o.read(),{done:I,value:b}=f?await Promise.race([h,f]):await h;if(le(s),I)break;if(!b)continue;let x=c+b.byteLength;if(x>t){let p=new Error(`Runtime asset ${e} size exceeds the ${t} byte limit`);throw d(p),p}if(x>u.byteLength){let p=Math.min(t,Math.max(x,Math.max(u.byteLength*2,1))),g=new Uint8Array(p);g.set(u.subarray(0,c)),u=g}u.set(b,c),c=x,i>0&&_?.set?.(c/i)}le(s),T=u.subarray(0,c)}catch(h){if(s?.aborted){let I=de(s);throw d(I),I}throw d(h),h}finally{l&&s?.removeEventListener("abort",l);try{o.releaseLock()}catch(h){s?.aborted||(S={error:h})}}if(s?.aborted){let h=de(s);throw d(h),h}if(S)throw S.error;return T}async function Vi(n,e={}){let t=e.maxBytes??Ln;if(!Number.isSafeInteger(t)||t<=0)throw new Error("Runtime JSON byte limit must be a positive safe integer");let _=$i(n.toString()),r=e.label?.trim()||"runtime JSON",i=e.fetchImpl??globalThis.fetch?.bind(globalThis);if(!i)throw new Error(`Fetch is unavailable while loading ${r}`);if(e.signal?.aborted)throw de(e.signal);let s={cache:"no-store",credentials:"omit",redirect:"error",referrerPolicy:"no-referrer"};e.signal&&(s.signal=e.signal);let o=Promise.resolve(i(_.toString(),s)),a=await jt(o,e.signal,(f,u)=>{Ae(f,u)});if(e.signal?.aborted){let f=de(e.signal);throw Ae(a,f),f}if(a.url){let f;try{f=new URL(a.url)}catch{throw Ae(a),new Error(`${r} returned an invalid final URL`)}if(f.href!==_.href)throw Ae(a),new Error(`${r} returned an unexpected final URL`)}if(!a.ok)throw Ae(a),new Error(`Failed to load ${r} from ${_}: ${a.status}`);let d=await Bi(a,_,t,void 0,e.signal),l;try{l=new TextDecoder("utf-8",{fatal:!0}).decode(d)}catch(f){throw new Error(`${r} is not valid UTF-8`,{cause:f})}try{return JSON.parse(l)}catch(f){throw new Error(`${r} is not valid JSON`,{cause:f})}}async function ws(n,e="runtime asset",t=zt,_){if(!Number.isSafeInteger(t)||t<0)throw new Error("Runtime asset decompression limit must be a non-negative safe integer");if(le(_),!Es(n)){if(n.byteLength>t)throw new Error(`Runtime asset ${e} decompressed size exceeds the ${t} byte limit`);return n}if(typeof DecompressionStream!="function")throw new Error(`Failed to decompress runtime asset ${e}: DecompressionStream('gzip') is unavailable`);try{let r=Uint8Array.from(n),i=new ReadableStream({start(a){a.enqueue(r),a.close()}}),s=new DecompressionStream("gzip"),o=i.pipeThrough({readable:s.readable,writable:s.writable});return await ki(o,e,t,_)}catch(r){throw _?.aborted?de(_):new Error(`Failed to decompress runtime asset ${e}: ${r instanceof Error?r.message:String(r)}`)}}async function Rs(n,e,t,_,r){if(r?.aborted){let m=de(r);throw Ae(n,m),m}let i;try{i=Wi(n)}catch(m){throw Ae(n,m),m}if(i>t)throw Ae(n),new Error(`Runtime asset ${e} download size exceeds the ${t} byte limit`);if(!n.body){let m=new Uint8Array(await jt(n.arrayBuffer(),r));if(le(r),m.byteLength>t)throw new Error(`Runtime asset ${e} download size exceeds the ${t} byte limit`);let N=await ws(m,e,t,r);return le(r),_?.set?.(1),N}let s=n.body.getReader(),o=[],a=0,d=0,l=!1,f=!1,u=!1,c=()=>{f||(f=!0,s.releaseLock())},T=m=>{if(!(f||u)){u=!0;try{Promise.resolve(s.cancel(m)).catch(()=>{})}catch{}try{c()}catch{}}};if(r?.aborted){let m=de(r);throw T(m),m}let S,h=r?new Promise((m,N)=>{S=()=>{let A=de(r);T(A),N(A)},r.addEventListener("abort",S,{once:!0})}):void 0;try{for(le(r);a<2;){let m=s.read(),{done:N,value:A}=h?await Promise.race([m,h]):await m;if(le(r),N){l=!0,c();break}if(!A)continue;let y=d+A.byteLength;if(y>t){let R=new Error(`Runtime asset ${e} download size exceeds the ${t} byte limit`);throw T(R),R}o.push(A),a+=A.byteLength,d=y,i>0&&_?.set?.(Math.min(d/i,1))}le(r)}catch(m){throw T(m),r?.aborted?de(r):m}finally{S&&r?.removeEventListener("abort",S)}let I,b;for(let m of o){for(let N of m)if(I===void 0?I=N:b===void 0&&(b=N),b!==void 0)break;if(b!==void 0)break}let x=0,p=new ReadableStream({async pull(m){if(x<o.length){m.enqueue(o[x++]);return}if(l){m.close();return}try{let{done:N,value:A}=await s.read();if(le(r),N){l=!0,c(),m.close();return}if(!A)return;let y=d+A.byteLength;if(y>t){let R=new Error(`Runtime asset ${e} download size exceeds the ${t} byte limit`);T(R),m.error(R);return}d=y,i>0&&_?.set?.(Math.min(d/i,1)),m.enqueue(A)}catch(N){T(N),m.error(N)}},cancel(m){T(m)}}),g=p;if(I===31&&b===139){if(typeof DecompressionStream!="function"){let N=new Error(`Failed to decompress runtime asset ${e}: DecompressionStream('gzip') is unavailable`);throw T(N),N}let m=new DecompressionStream("gzip");g=p.pipeThrough({readable:m.readable,writable:m.writable})}try{let m=await ki(g,e,t,r);return _?.set?.(1),m}catch(m){throw T(m),r?.aborted?de(r):new Error(`Failed to decompress runtime asset ${e}: ${m instanceof Error?m.message:String(m)}`)}}async function Ls(n,e,t,_){le(_);let{unzipSync:r}=await Promise.resolve().then(()=>(Hi(),Pi));le(_);let i,s=r(n,{filter(o){if(o.name.endsWith("/")||i!==void 0)return!1;if(o.originalSize>t)throw new Error(`Runtime asset ${e} extracted size exceeds the ${t} byte limit`);return i=o.name,!0}});le(_);for(let[o,a]of Object.entries(s))if(!o.endsWith("/"))return a;throw new Error("No entry found")}var Cn=async(n,e,t=zt,_)=>{if(!Number.isSafeInteger(t)||t<0)throw new Error("Runtime asset byte limit must be a non-negative safe integer");le(_);let r=`${n}\0${t}`,i=_?void 0:Rn.get(r);i||(i=(async()=>{let o=$i(n),a={credentials:"omit",redirect:"error",referrerPolicy:"no-referrer"};_&&(a.signal=_);let d;try{let f=Promise.resolve(fetch(o,a));d=await jt(f,_,(u,c)=>{Ae(u,c)})}catch(f){throw _?.aborted?de(_):f}if(_?.aborted){let f=de(_);throw Ae(d,f),f}if(d.url){let f;try{f=new URL(d.url)}catch{throw Ae(d),new Error("Runtime asset returned an invalid final URL")}if(f.href!==o.href)throw Ae(d),new Error("Runtime asset returned an unexpected final URL")}if(!d.ok)throw Ae(d),new Error(`Failed to load runtime asset ${o}: ${d.status}`);if(o.pathname.endsWith(".gz"))return await Rs(d,o,t,e,_);let l=await Bi(d,o,t,e,_);return o.pathname.endsWith(".zip")?await Ls(l,o,t,_):l})(),_||(i=i.catch(o=>{throw Rn.get(r)===i&&Rn.delete(r),o}),Rn.set(r,i)));let s=await i;return le(_),e?.set?.(1),Uint8Array.from(s)};async function Ct(n,e,t,_=zt){le(t);let r=`${n}\0${_}`,i=t?void 0:wn.get(r);if(i)return i;let s=(async()=>{let o=await Cn(n,e,_,t);le(t);let a=await jt(WebAssembly.compile(o),t);return le(t),a})();return t||(s=s.catch(o=>{throw wn.get(r)===s&&wn.delete(r),o}),wn.set(r,s)),s}function zi(n,e){return WebAssembly.instantiate(n,e)}var Yt=class extends Error{code;constructor(e){super(`process exited with code ${e}.`),this.code=e}},Kt=class extends Error{constructor(e,t){super(`${e}.${t} not implemented.`)}},ot=class extends Error{constructor(e="abort"){super(e)}},b_=class extends Error{constructor(e){super(e)}};function E_(n){if(!n)throw new b_("assertion failed.")}var Cs=["&&","||","==","!=","<=",">=","+","-","*","/","%","<",">","!"],w_=n=>!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__debugExpressionKind==="array",ji=n=>!!n&&typeof n=="object"&&!Array.isArray(n)&&n.__debugExpressionKind==="object",R_=(n,e)=>{let t=n[e];if(t!=="'"&&t!=='"')throw new Error("expected quoted string");let _=e+1,r="";for(;_<n.length;){let i=n[_];if(!i)break;if(i==="\\"){let s=n[_+1];if(!s)throw new Error("unterminated string literal");s==="n"?r+=`
`:s==="r"?r+="\r":s==="t"?r+="	":r+=s,_+=2;continue}if(i===t)return{value:r,next:_+1};r+=i,_+=1}throw new Error("unterminated string literal")},vs=n=>{let e=[];for(let t=0;t<n.length;){let _=n[t];if(!_)break;if(/\s/.test(_)){t+=1;continue}if(_==="("||_===")"){e.push({type:"paren",value:_}),t+=1;continue}if(_==="["||_==="]"){e.push({type:"bracket",value:_}),t+=1;continue}if(_==="."){e.push({type:"dot"}),t+=1;continue}let r=Cs.find(o=>n.startsWith(o,t));if(r){e.push({type:"operator",value:r}),t+=r.length;continue}if(_==="'"||_==='"'){let o=R_(n,t);e.push({type:"string",value:o.value}),t=o.next;continue}let i=n.slice(t).match(/^\d+(?:\.\d+)?/);if(i?.[0]){e.push({type:"number",value:i[0]}),t+=i[0].length;continue}let s=n.slice(t).match(/^[A-Za-z_]\w*/);if(s?.[0]){s[0]==="true"||s[0]==="false"||s[0]==="True"||s[0]==="False"?e.push({type:"boolean",value:s[0]==="true"||s[0]==="True"}):s[0]==="null"||s[0]==="None"?e.push({type:"null"}):s[0]==="and"?e.push({type:"operator",value:"&&"}):s[0]==="or"?e.push({type:"operator",value:"||"}):s[0]==="not"?e.push({type:"operator",value:"!"}):e.push({type:"identifier",value:s[0]}),t+=s[0].length;continue}throw new Error(`unsupported token near "${n.slice(t)}"`)}return e},vn=(n,e=0)=>{let t=e;for(;/\s/.test(n[t]||"");)t+=1;let _=n[t];if(_==="["){t+=1;let i=[];for(;;){for(;/\s/.test(n[t]||"");)t+=1;if(n[t]==="]")return{value:i,next:t+1};if(n.startsWith("...",t)){for(i.truncated=!0,t+=3;/\s/.test(n[t]||"");)t+=1;if(n[t]==="]")return{value:i,next:t+1};throw new Error("unsupported array preview")}let s=vn(n,t);for(i.push(s.value),t=s.next;/\s/.test(n[t]||"");)t+=1;if(n[t]===","){t+=1;continue}if(n[t]==="]")return{value:i,next:t+1};throw new Error("unsupported array preview")}}if(_==="("){t+=1;let i=[];for(;;){for(;/\s/.test(n[t]||"");)t+=1;if(n[t]===")")return{value:i,next:t+1};if(n.startsWith("...",t)){for(i.truncated=!0,t+=3;/\s/.test(n[t]||"");)t+=1;if(n[t]===")")return{value:i,next:t+1};throw new Error("unsupported tuple preview")}let s=vn(n,t);for(i.push(s.value),t=s.next;/\s/.test(n[t]||"");)t+=1;if(n[t]===","){t+=1;continue}if(n[t]===")")return{value:i,next:t+1};throw new Error("unsupported tuple preview")}}if(_==="{"){t+=1;let i={};for(;;){for(;/\s/.test(n[t]||"");)t+=1;if(n[t]==="}")return{value:i,next:t+1};if(n.startsWith("...",t))throw new Error("unavailable");let s="";if(n[t]==="'"||n[t]==='"'){let a=R_(n,t);s=a.value,t=a.next}else{let a=n.slice(t).match(/^[A-Za-z_]\w*/)?.[0];if(!a)throw new Error("unsupported object preview");s=a,t+=a.length}for(;/\s/.test(n[t]||"");)t+=1;if(n[t]!==":")throw new Error("unsupported object preview");t+=1;let o=vn(n,t);for(i[s]=o.value,t=o.next;/\s/.test(n[t]||"");)t+=1;if(n[t]===","){t+=1;continue}if(n[t]==="}")return{value:i,next:t+1};throw new Error("unsupported object preview")}}if(_==="'"||_==='"')return R_(n,t);if(n.startsWith("true",t))return{value:!0,next:t+4};if(n.startsWith("false",t))return{value:!1,next:t+5};if(n.startsWith("True",t))return{value:!0,next:t+4};if(n.startsWith("False",t))return{value:!1,next:t+5};if(n.startsWith("null",t))return{value:null,next:t+4};if(n.startsWith("None",t))return{value:null,next:t+4};let r=n.slice(t).match(/^-?\d+(?:\.\d+)?/);if(r?.[0])return{value:Number(r[0]),next:t+r[0].length};throw new Error("unsupported preview")},Yi=n=>{let e=n.trim();if(!e||e==="?")throw new Error("unavailable");if(e==="true"||e==="false"||e==="True"||e==="False")return e==="true"||e==="True";if(e==="null"||e==="None")return null;let t=Number(e);if(!Number.isNaN(t))return t;if(e.startsWith("[")||e.startsWith("(")||e.startsWith("{")||e.startsWith("'")||e.startsWith('"')){let _=vn(e);if(e.slice(_.next).trim())throw new Error("unsupported preview");return _.value}throw new Error("unsupported preview")},Ms=n=>`'${n.replaceAll("\\","\\\\").replaceAll("'","\\'").replaceAll(`
`,"\\n").replaceAll("\r","\\r").replaceAll("	","\\t")}'`,qt=(n,e,t)=>{if(n===null)return"null";if(typeof n=="number"||typeof n=="boolean")return`${n}`;if(typeof n=="string")return e?Ms(n):n;if(t>=4)return"...";if(Array.isArray(n)){let s=Math.min(n.length,8);return`[${n.slice(0,s).map(a=>qt(a,!0,t+1)).join(", ")}${n.truncated||n.length>s?", ...":""}]`}if(w_(n)){let s=n.keys?.()||[],o=Math.min(s.length||n.length||0,8),a=[];for(let l=0;l<o;l+=1){let f=s[l]??l;a.push(qt(n.get(f),!0,t+1))}let d=n.truncated||n.length!=null&&n.length>o;return`[${a.join(", ")}${d?", ...":""}]`}if(ji(n)){let s=n.keys?.()||[],o=Math.min(s.length,8);return`{${s.slice(0,o).map(d=>`${d}: ${qt(n.get(d),!0,t+1)}`).join(", ")}${s.length>o?", ...":""}}`}let _=Object.keys(n),r=Math.min(_.length,8);return`{${_.slice(0,r).map(s=>`${s}: ${qt(n[s],!0,t+1)}`).join(", ")}${_.length>r?", ...":""}}`},Ds=n=>qt(n,!1,0),Ki=(n,e)=>{let t=n.trim();if(!t)throw new Error("empty expression");let _=vs(t),r=new Map,i=p=>{if(r.has(p))return r.get(p);let g=e(p);return r.set(p,g),g},s=(p,g)=>{if(!Number.isInteger(g))throw new Error("unsupported index access");if(Array.isArray(p)){if(g<0||g>=p.length)throw new Error("unavailable");return p[g]}if(w_(p)){if(p.length!=null&&(g<0||g>=p.length))throw new Error("unavailable");return p.get(g)}throw new Error("unsupported index access")},o=(p,g)=>{if(Array.isArray(p)||w_(p)||!p)throw new Error("unsupported member access");if(ji(p)){if(!p.has(g))throw new Error("unavailable");return p.get(g)}if(typeof p!="object"||!Object.hasOwn(p,g))throw new Error("unavailable");return p[g]},a=0,d=!0,l=p=>{let g=d;d=!1;try{return p()}finally{d=g}},f=()=>{let p=_[a];if(!p)throw new Error("unexpected end of expression");if(p.type==="number")return a+=1,Number(p.value);if(p.type==="boolean")return a+=1,p.value;if(p.type==="null")return a+=1,null;if(p.type==="string")return a+=1,p.value;if(p.type==="identifier"){a+=1;let g=d?i(p.value):null;for(;;){let m=_[a];if(m?.type==="bracket"&&m.value==="["){a+=1;let N=Number(b()),A=_[a];if(!A||A.type!=="bracket"||A.value!=="]")throw new Error("missing closing bracket");a+=1,g=d?s(g,N):null;continue}if(m?.type==="dot"){a+=1;let N=_[a];if(!N||N.type!=="identifier")throw new Error("missing property name");a+=1,g=d?o(g,N.value):null;continue}break}return g}if(p.type==="paren"&&p.value==="("){a+=1;let g=b(),m=_[a];if(!m||m.type!=="paren"||m.value!==")")throw new Error("missing closing parenthesis");return a+=1,g}throw new Error("expected value")},u=()=>{let p=_[a];return p?.type==="operator"&&p.value==="!"?(a+=1,!u()):p?.type==="operator"&&p.value==="-"?(a+=1,-Number(u())):p?.type==="operator"&&p.value==="+"?(a+=1,Number(u())):f()},c=()=>{let p=u();for(;;){let g=_[a];if(g?.type!=="operator"||!["*","/","%"].includes(g.value))return p;a+=1;let m=u();g.value==="*"&&(p=Number(p)*Number(m)),g.value==="/"&&(p=Number(p)/Number(m)),g.value==="%"&&(p=Number(p)%Number(m))}},T=()=>{let p=c();for(;;){let g=_[a];if(g?.type!=="operator"||!["+","-"].includes(g.value))return p;a+=1;let m=c();g.value==="+"&&(typeof p=="string"||typeof m=="string"?p=`${p??"null"}${m??"null"}`:p=Number(p)+Number(m)),g.value==="-"&&(p=Number(p)-Number(m))}},S=()=>{let p=T();for(;;){let g=_[a];if(g?.type!=="operator"||!["<","<=",">",">="].includes(g.value))return p;a+=1;let m=T(),N=typeof p=="string"&&typeof m=="string"?p:Number(p),A=typeof p=="string"&&typeof m=="string"?m:Number(m);g.value==="<"&&(p=N<A),g.value==="<="&&(p=N<=A),g.value===">"&&(p=N>A),g.value===">="&&(p=N>=A)}},h=()=>{let p=S();for(;;){let g=_[a];if(g?.type!=="operator"||!["==","!="].includes(g.value))return p;a+=1;let m=S();g.value==="=="&&(p=p===m),g.value==="!="&&(p=p!==m)}},I=()=>{let p=h();for(;;){let g=_[a];if(!g||g.type!=="operator"||g.value!=="&&")break;a+=1;let m=d&&p?h():l(h);d&&(p=!!p&&!!m)}return p},b=()=>{let p=I();for(;;){let g=_[a];if(!g||g.type!=="operator"||g.value!=="||")break;a+=1;let m=d&&!p?I():l(I);d&&(p=!!p||!!m)}return p},x=b();if(a!==_.length)throw new Error("unexpected trailing tokens");return Ds(x)};var qi=Int32Array.BYTES_PER_ELEMENT*2,Us=-1,L_=new TextEncoder,Os=new TextDecoder,Ji=n=>n instanceof Int32Array?n:new Int32Array(n),Zi=n=>new Uint8Array(n.buffer,n.byteOffset+qi,n.byteLength-qi),Fs=(n,e)=>{let t=L_.encode(n);if(t.length<=e)return{bytes:t,rest:""};let _=0,r=n.length;for(;_<r;){let s=Math.ceil((_+r)/2);L_.encode(n.slice(0,s)).length<=e?_=s:r=s-1}let i=n.slice(0,_);return{bytes:L_.encode(i),rest:n.slice(_)}},Qi=(n,e)=>{if(!n.length)return!1;let t=Ji(e),_=Zi(t),r=n[0]||"",{bytes:i,rest:s}=Fs(r,_.length);return _.fill(0),_.set(i),Atomics.store(t,1,i.length),Atomics.add(t,0,1),Atomics.notify(t,0),s?n[0]=s:n.shift(),!0},er=n=>{let e=Ji(n),t=Atomics.load(e,1);if(t===Us)return null;let _=Zi(e);return Os.decode(_.slice(0,t))};var M=0,C_=44,Mn=58,Dn=2,tr=4,Gs=16,nr=32,_r=64,ir=1<<21,Ps=1<<22,Hs=1,rr=8,sr=4,Xs=0,ks=1,$s=2,Ws=789514,Jt=class{ready;mem=null;memfs;instance=null;exports;trace=()=>{};debugSession;useJsReadOverlay=!1;useJsSourceReadOverlay=!1;argv;environ;handles=new Map;nextHandle=1024;syntheticFileHandles=new Set;nextSyntheticInode=1;syntheticInodes=new Map;readFileHandles=new Map;writeFileHandles=new Map;constructor(e,t,_,...r){let i=r.at(-1),s=i&&typeof i=="object"?r.pop():{},o=r;this.argv=[_,...o],this.environ={USER:"wasm-clang"},this.memfs=t,this.useJsReadOverlay=_==="wasm-ld"||_==="ld.lld"||_==="lld",this.useJsSourceReadOverlay=_==="clang"||_==="clang++"||_==="cobc";let a=ht(this,"__wasm_idle_debug_enter","__wasm_idle_debug_leave","__wasm_idle_debug_line","__wasm_idle_debug_value_num","__wasm_idle_debug_value_bool","__wasm_idle_debug_value_addr","__wasm_idle_debug_value_text"),d={...ht(this,"proc_exit","environ_sizes_get","environ_get","args_sizes_get","args_get","random_get","clock_time_get","poll_oneoff","fd_filestat_set_times","path_filestat_set_times","sock_accept","sock_recv","sock_send","sock_shutdown","path_link","path_rename"),...this.memfs.exports,...ht(this,"path_open","path_filestat_get","path_readlink","path_unlink_file","fd_fdstat_get","fd_fdstat_set_flags","fd_filestat_get","fd_filestat_set_size","fd_datasync","fd_read","fd_pread","fd_seek","fd_tell","fd_write","fd_close")},l=s.extraImports?.env||{};this.ready=zi(e,{...s.extraImports,wasi_unstable:d,wasi_snapshot_preview1:d,env:{...l,...a}}).then(f=>{this.instance=f,s.instanceRef&&(s.instanceRef.current=f),this.exports=this.instance.exports,this.mem=new it(this.exports.memory),this.memfs.hostMem=this.mem})}async run(){await this.ready,this.trace(`start(argv=${JSON.stringify(this.argv)}, exports=${JSON.stringify(Object.keys(this.exports||{}))})`);try{this.exports._start()}catch(e){let t=!0;if(e instanceof Yt){if(this.trace(`proc_exit(code=${e.code})`),e.code===Ws)return this.trace("allow_rAF_after_exit"),!0;if(this.trace(`disallow_rAF_after_exit(code=${e.code})`),e.code==0)return!1;t=!1}e instanceof Kt&&this.trace(`not_implemented(${e.message})`);let _=`\x1B[91mError: ${e.message}`;throw t&&(_=_+`
${e.stack}`),_+=`\x1B[0m
`,this.memfs.stdout(_),e}this.trace("start() returned without proc_exit")}proc_exit(e){throw this.trace(`proc_exit_throw(code=${e})`),new Yt(e)}toNumber(e){return typeof e=="bigint"?Number(e):e}writeU32(e,t){this.mem.view.setUint32(e,t>>>0,!0)}writeU64(e,t){let _=BigInt(t);this.mem.view.setUint32(e,Number(_&0xffffffffn),!0),this.mem.view.setUint32(e+4,Number(_>>32n&0xffffffffn),!0)}readMemfsFile(e){let t=[e,e.replace(/^\/+/,""),e.replace(/^\.\//,""),e.replace(/^\/+/,"").replace(/^\.\//,"")];for(let _ of t)if(this.memfs.hasFile(_))try{return Uint8Array.from(this.memfs.getFileContents(_))}catch{}return null}shouldUseJsReadForPath(e){return this.useJsReadOverlay?!0:this.useJsSourceReadOverlay}syntheticInodeForPath(e){let _=e.replace(/^\/+/,"").replace(/^\.\//,"")||e,r=this.syntheticInodes.get(_);return r||(r=this.nextSyntheticInode++,this.syntheticInodes.set(_,r)),r}copyFileToIovs(e,t,_,r,i){this.mem.check();let s=0;for(let o=0;o<r;o+=1){let a=this.mem.read32(_);_+=4;let d=this.mem.read32(_);if(_+=4,d<=0)continue;let l=Math.max(0,e.length-t),f=Math.min(d,l);if(f>0&&(this.mem.write(a,e.subarray(t,t+f)),t+=f,s+=f),f<d)break}return this.writeU32(i,s),{copied:s,position:t}}writeRegularFileStat(e,t,_){this.mem.check(),this.writeU64(e,1),this.writeU64(e+8,this.syntheticInodeForPath(_)),this.mem.write8(e+16,sr),this.writeU64(e+24,1),this.writeU64(e+32,t),this.writeU64(e+40,0),this.writeU64(e+48,0),this.writeU64(e+56,0)}seekPosition(e,t,_,r){let i=this.toNumber(_);return r===Xs?Math.max(0,i):r===ks?Math.max(0,e+i):r===$s?Math.max(0,t+i):null}ensureWriteCapacity(e,t){if(e.contents.length>=t)return;let _=Math.max(1024,e.contents.length);for(;_<t;)_*=2;let r=new Uint8Array(_);r.set(e.contents.subarray(0,e.size)),e.contents=r}atomicOutputTarget(e){let t=e.match(/^(.+)-[0-9a-f]+(\.[^.]+)\.tmp$/);return t?`${t[1]}${t[2]}`:null}storeFileContents(e,t){if(this.useJsReadOverlay||this.useJsSourceReadOverlay){this.memfs.setFile(e,t);return}this.memfs.addFile(e,t)}path_open(e,t,_,r,i,s,o,a,d){this.mem.check();let l=this.mem.readStr(_,r),f=this.toNumber(s),u=(f&_r)!==0||(i&(Hs|rr))!==0;this.trace(`path_open_request(path=${JSON.stringify(l)}, rights=${f}, oflags=${i}, write=${u})`);let c=!u&&this.shouldUseJsReadForPath(l)&&(f&Dn)!==0?this.readMemfsFile(l):null;if(!u&&this.shouldUseJsReadForPath(l)&&(f&Dn)!==0&&!c)return this.trace(`path_open_read_missing(path=${JSON.stringify(l)})`),C_;let T=M,S;if(this.useJsReadOverlay&&(u||c))S=this.nextHandle++,this.syntheticFileHandles.add(S),this.writeU32(d,S),this.trace(`path_open_overlay(fd=${S}, path=${JSON.stringify(l)})`);else{if(T=this.memfs.exports.path_open(e,t,_,r,i,s,o,a,d),T!==M)return T;S=this.mem.read32(d)}if(u){let I=(i&rr)===0?this.readMemfsFile(l):null,b=I?Uint8Array.from(I):new Uint8Array(0);return this.writeFileHandles.set(S,{path:l,contents:b,position:0,size:b.length}),this.readFileHandles.delete(S),this.trace(`path_open_write(fd=${S}, path=${JSON.stringify(l)}, size=${b.length})`),T}if(!this.shouldUseJsReadForPath(l)||(f&Dn)===0)return T;let h=c||this.readMemfsFile(l);return h&&(this.readFileHandles.set(S,{path:l,contents:h,position:0}),this.trace(`path_open_read(fd=${S}, path=${JSON.stringify(l)}, size=${h.length})`)),T}path_filestat_get(e,t,_,r,i){this.mem.check();let s=this.mem.readStr(_,r);if(!this.shouldUseJsReadForPath(s))return this.memfs.exports.path_filestat_get(e,t,_,r,i);let o=this.readMemfsFile(s);return o?(this.writeRegularFileStat(i,o.length,s),this.trace(`path_filestat_get(path=${JSON.stringify(s)}, size=${o.length})`),M):this.memfs.exports.path_filestat_get(e,t,_,r,i)}fd_fdstat_get(e,t){let _=this.readFileHandles.get(e)||this.writeFileHandles.get(e);if(!_)return this.memfs.exports.fd_fdstat_get(e,t);let r=this.writeFileHandles.has(e)?_r|tr|nr|Gs|ir|Ps:Dn|tr|nr|ir;return this.mem.check(),this.mem.write8(t,sr),this.mem.write8(t+1,0),this.mem.write8(t+2,0),this.mem.write8(t+3,0),this.writeU64(t+8,r),this.writeU64(t+16,0),this.trace(`fd_fdstat_get(fd=${e}, path=${JSON.stringify(_.path)})`),M}fd_filestat_get(e,t){let _=this.writeFileHandles.get(e),r=this.readFileHandles.get(e),i=_||r;if(!i)return this.memfs.exports.fd_filestat_get(e,t);let s=_?_.size:r?.contents.length||0;return this.writeRegularFileStat(t,s,i.path),this.trace(`fd_filestat_get(fd=${e}, path=${JSON.stringify(i.path)}, size=${s})`),M}fd_filestat_set_size(e,t){let _=this.writeFileHandles.get(e);if(!_)return this.memfs.exports.fd_filestat_set_size(e,t);let r=this.toNumber(t);return this.ensureWriteCapacity(_,r),r>_.size&&_.contents.fill(0,_.size,r),_.size=r,_.position>r&&(_.position=r),this.trace(`fd_filestat_set_size(fd=${e}, size=${r})`),M}fd_read(e,t,_,r){let i=this.readFileHandles.get(e);if(!i)return this.memfs.exports.fd_read(e,t,_,r);let s=this.copyFileToIovs(i.contents,i.position,t,_,r);return i.position=s.position,this.trace(`fd_read(fd=${e}, bytes=${s.copied})`),M}fd_pread(e,t,_,r,i){let s=this.readFileHandles.get(e);if(!s)return this.memfs.exports.fd_pread(e,t,_,r,i);let o=this.copyFileToIovs(s.contents,this.toNumber(r),t,_,i);return this.trace(`fd_pread(fd=${e}, offset=${this.toNumber(r)}, bytes=${o.copied})`),M}fd_seek(e,t,_,r){let i=this.writeFileHandles.get(e);if(i){let a=this.seekPosition(i.position,i.size,t,_);return a==null?this.memfs.exports.fd_seek(e,t,_,r):(i.position=a,this.mem.check(),this.writeU64(r,i.position),this.trace(`fd_seek_write(fd=${e}, offset=${this.toNumber(t)}, whence=${_})`),M)}let s=this.readFileHandles.get(e);if(!s)return this.memfs.exports.fd_seek(e,t,_,r);let o=this.seekPosition(s.position,s.contents.length,t,_);return o==null?this.memfs.exports.fd_seek(e,t,_,r):(s.position=o,this.mem.check(),this.writeU64(r,s.position),this.trace(`fd_seek(fd=${e}, offset=${this.toNumber(t)}, whence=${_})`),M)}fd_tell(e,t){let _=this.writeFileHandles.get(e)?.position??this.readFileHandles.get(e)?.position;if(_==null){let r=this.memfs.exports.fd_tell;return typeof r=="function"?r(e,t):C_}return this.mem.check(),this.writeU64(t,_),this.trace(`fd_tell(fd=${e}, offset=${_})`),M}fd_datasync(e){if(this.writeFileHandles.has(e)||this.readFileHandles.has(e))return M;let t=this.memfs.exports.fd_datasync;return typeof t=="function"?t(e):M}fd_fdstat_set_flags(e,t){if(this.writeFileHandles.has(e)||this.readFileHandles.has(e))return M;let _=this.memfs.exports.fd_fdstat_set_flags;return typeof _=="function"?_(e,t):M}path_readlink(e,t,_,r,i,s){return this.mem.check(),this.writeU32(s,0),this.trace(`path_readlink(path=${JSON.stringify(this.mem.readStr(t,_))})`),C_}path_unlink_file(e,t,_){this.mem.check();let r=this.mem.readStr(t,_);return this.trace(`path_unlink_file(path=${JSON.stringify(r)})`),M}fd_write(e,t,_,r){let i=this.writeFileHandles.get(e);if(!i)return this.memfs.exports.fd_write(e,t,_,r);this.mem.check();let s=0;for(let o=0;o<_;o+=1){let a=this.mem.read32(t);t+=4;let d=this.mem.read32(t);t+=4,!(d<=0)&&(this.ensureWriteCapacity(i,i.position+d),i.contents.set(new Uint8Array(this.mem.buffer,a,d),i.position),i.position+=d,i.size=Math.max(i.size,i.position),s+=d)}return this.writeU32(r,s),this.trace(`fd_write(fd=${e}, bytes=${s})`),M}fd_close(e){let t=this.syntheticFileHandles.delete(e);if(this.readFileHandles.has(e)){this.readFileHandles.delete(e);let r=t?M:this.memfs.exports.fd_close(e);return this.trace(`fd_close_read(fd=${e}, close=${r})`),r}let _=this.writeFileHandles.get(e);if(_){this.writeFileHandles.delete(e);let r=t?M:this.memfs.exports.fd_close(e),i=_.contents.subarray(0,_.size);this.storeFileContents(_.path,i);let s=this.atomicOutputTarget(_.path);return s&&this.storeFileContents(s,i),this.trace(`fd_close_write(fd=${e}, path=${JSON.stringify(_.path)}, size=${_.size}, close=${r}, target=${JSON.stringify(s)})`),M}return t?M:this.memfs.exports.fd_close(e)}debugEvaluate(e){let t=this.debugSession;if(!t)throw new Error("unavailable");let _=[...t.frames].reverse().find(o=>o.functionId===t.currentFunctionId),r=t.currentLine,i=[...t.variableMetadata[t.currentFunctionId]||[]].reverse().filter(o=>r>=o.fromLine&&r<=o.toLine),s=[...t.globalVariableMetadata||[]].reverse().filter(o=>r>=o.fromLine&&r<=o.toLine);return Ki(e,o=>{let a=(u,c)=>{let T=u.dimensions?.length?u.dimensions:u.length?[u.length]:[],S=Number(c);if(!Number.isFinite(S)||S<=0||!T.length||!u.elementKind&&!u.structFields?.length)throw new Error("unavailable");this.mem?.check?.();let h=u.structFields?.length&&u.structSize?u.structSize:u.elementKind==="double"?8:u.elementKind==="bool"||u.elementKind==="char"?1:4,I=(p,g)=>{if(p==="bool")return!!this.mem.read8(g);if(p==="char"){let m=this.mem.read8(g);return m>=32&&m<=126?String.fromCharCode(m):m}return p==="float"?this.mem.readFloat32(g):p==="double"?this.mem.readFloat64(g):this.mem.readInt32(g)},b=p=>({__debugExpressionKind:"object",has:g=>!!u.structFields?.some(m=>m.name===g),get:g=>{let m=u.structFields?.find(N=>N.name===g);if(!m)throw new Error("unavailable");return I(m.kind,p+m.offset)},keys:()=>u.structFields?.map(g=>g.name)||[]}),x=(p,g)=>({__debugExpressionKind:"array",length:g[0],truncated:g[0]>8,get:m=>{if(!Number.isInteger(m)||m<0||m>=g[0])throw new Error("unavailable");if(g.length>1){let N=g.slice(1).reduce((A,y)=>A*y,1)*h;return x(p+m*N,g.slice(1))}if(u.structFields?.length&&u.structSize)return b(p+m*u.structSize);if(!u.elementKind)throw new Error("unavailable");return I(u.elementKind,p+m*h)},keys:()=>Array.from({length:Math.min(g[0],8)},(m,N)=>N)});return x(S,T)},d=(u,c)=>{if(c==null||c==="?")throw new Error("unavailable");return u.kind==="array"?a(u,c):Yi(c)},l=i.find(u=>u.name===o);if(l)return d(l,_?.values.get(l.slot));let f=s.find(u=>u.name===o);if(f)return d(f,t.globalValues.get(f.slot));throw new Error("unavailable")})}pauseDebugSession(e,t,_,r){let i=e.buffer;if(!i)return M;e.currentFunctionId=t,e.currentLine=_;let s=[...e.frames].reverse().find(c=>c.functionId===t);s&&(s.line=_),e.pauseOnEntry=!1,e.stepArmed=!1,e.nextLineArmed=!1,e.nextLineDepth=0,e.stepOutArmed=!1,this.trace(`pause(function=${t}, line=${_}, reason=${r})`);let o=e.variableMetadata[t]?.flatMap(c=>{if(_<c.fromLine||_>c.toLine)return[];if(c.kind==="array"){this.mem?.check?.();let S=Number(s?.values.get(c.slot)??Number.NaN),h=c.dimensions?.length?c.dimensions:c.length?[c.length]:[];if(!Number.isFinite(S)||S<=0||!h.length||!c.elementKind&&!c.structFields?.length)return[{name:c.name,value:"?"}];if(c.structFields?.length&&c.structSize){let p=Math.min(h[0],8),g=[];for(let m=0;m<p;m+=1){let N=[];for(let A of c.structFields){let y=S+m*c.structSize+A.offset;if(A.kind==="bool"){N.push(`${A.name}: ${this.mem.read8(y)?"true":"false"}`);continue}if(A.kind==="char"){let R=this.mem.read8(y);N.push(`${A.name}: ${R>=32&&R<=126?`'${String.fromCharCode(R)}'`:`${R}`}`);continue}if(A.kind==="float"){N.push(`${A.name}: ${this.mem.readFloat32(y)}`);continue}if(A.kind==="double"){N.push(`${A.name}: ${this.mem.readFloat64(y)}`);continue}N.push(`${A.name}: ${this.mem.readInt32(y)}`)}g.push(`{${N.join(", ")}}`)}return[{name:c.name,value:`[${g.join(", ")}${h[0]>p?", ...":""}]`}]}if(!c.elementKind)return[{name:c.name,value:"?"}];let I=c.elementKind==="double"?8:c.elementKind==="bool"||c.elementKind==="char"?1:4;if(h.length===2){let p=Math.min(h[0],4),g=Math.min(h[1],8),m=[];for(let N=0;N<p;N+=1){let A=[];for(let y=0;y<g;y+=1){let R=S+(N*h[1]+y)*I;if(c.elementKind==="bool"){A.push(this.mem.read8(R)?"true":"false");continue}if(c.elementKind==="char"){let E=this.mem.read8(R);A.push(E>=32&&E<=126?`'${String.fromCharCode(E)}'`:`${E}`);continue}if(c.elementKind==="float"){A.push(`${this.mem.readFloat32(R)}`);continue}if(c.elementKind==="double"){A.push(`${this.mem.readFloat64(R)}`);continue}A.push(`${this.mem.readInt32(R)}`)}m.push(`[${A.join(", ")}${h[1]>g?", ...":""}]`)}return[{name:c.name,value:`[${m.join(", ")}${h[0]>p?", ...":""}]`}]}let b=Math.min(h[0],8),x=[];for(let p=0;p<b;p+=1){let g=S+p*I;if(c.elementKind==="bool"){x.push(this.mem.read8(g)?"true":"false");continue}if(c.elementKind==="char"){let m=this.mem.read8(g);x.push(m>=32&&m<=126?`'${String.fromCharCode(m)}'`:`${m}`);continue}if(c.elementKind==="float"){x.push(`${this.mem.readFloat32(g)}`);continue}if(c.elementKind==="double"){x.push(`${this.mem.readFloat64(g)}`);continue}x.push(`${this.mem.readInt32(g)}`)}return[{name:c.name,value:`[${x.join(", ")}${h[0]>b?", ...":""}]`}]}let T=s?.values.get(c.slot)??"?";return[{name:c.name,value:T}]})||[],a=new Set(o.map(c=>c.name)),d=(e.globalVariableMetadata||[]).flatMap(c=>{if(a.has(c.name))return[];if(_<c.fromLine||_>c.toLine)return[];if(c.kind==="array"){this.mem?.check?.();let S=Number(e.globalValues?.get(c.slot)??Number.NaN),h=c.dimensions?.length?c.dimensions:c.length?[c.length]:[];if(!Number.isFinite(S)||S<=0||!h.length||!c.elementKind&&!c.structFields?.length)return[{name:c.name,value:"?"}];if(c.structFields?.length&&c.structSize){let p=Math.min(h[0],8),g=[];for(let m=0;m<p;m+=1){let N=[];for(let A of c.structFields){let y=S+m*c.structSize+A.offset;if(A.kind==="bool"){N.push(`${A.name}: ${this.mem.read8(y)?"true":"false"}`);continue}if(A.kind==="char"){let R=this.mem.read8(y);N.push(`${A.name}: ${R>=32&&R<=126?`'${String.fromCharCode(R)}'`:`${R}`}`);continue}if(A.kind==="float"){N.push(`${A.name}: ${this.mem.readFloat32(y)}`);continue}if(A.kind==="double"){N.push(`${A.name}: ${this.mem.readFloat64(y)}`);continue}N.push(`${A.name}: ${this.mem.readInt32(y)}`)}g.push(`{${N.join(", ")}}`)}return[{name:c.name,value:`[${g.join(", ")}${h[0]>p?", ...":""}]`}]}if(!c.elementKind)return[{name:c.name,value:"?"}];let I=c.elementKind==="double"?8:c.elementKind==="bool"||c.elementKind==="char"?1:4;if(h.length===2){let p=Math.min(h[0],4),g=Math.min(h[1],8),m=[];for(let N=0;N<p;N+=1){let A=[];for(let y=0;y<g;y+=1){let R=S+(N*h[1]+y)*I;if(c.elementKind==="bool"){A.push(this.mem.read8(R)?"true":"false");continue}if(c.elementKind==="char"){let E=this.mem.read8(R);A.push(E>=32&&E<=126?`'${String.fromCharCode(E)}'`:`${E}`);continue}if(c.elementKind==="float"){A.push(`${this.mem.readFloat32(R)}`);continue}if(c.elementKind==="double"){A.push(`${this.mem.readFloat64(R)}`);continue}A.push(`${this.mem.readInt32(R)}`)}m.push(`[${A.join(", ")}${h[1]>g?", ...":""}]`)}return[{name:c.name,value:`[${m.join(", ")}${h[0]>p?", ...":""}]`}]}let b=Math.min(h[0],8),x=[];for(let p=0;p<b;p+=1){let g=S+p*I;if(c.elementKind==="bool"){x.push(this.mem.read8(g)?"true":"false");continue}if(c.elementKind==="char"){let m=this.mem.read8(g);x.push(m>=32&&m<=126?`'${String.fromCharCode(m)}'`:`${m}`);continue}if(c.elementKind==="float"){x.push(`${this.mem.readFloat32(g)}`);continue}if(c.elementKind==="double"){x.push(`${this.mem.readFloat64(g)}`);continue}x.push(`${this.mem.readInt32(g)}`)}return[{name:c.name,value:`[${x.join(", ")}${h[0]>b?", ...":""}]`}]}let T=e.globalValues?.get(c.slot)??"?";return[{name:c.name,value:T}]})||[],l=new Map(o.map(c=>[c.name,c])),f=new Map(d.map(c=>[c.name,c]));for(let c of l.keys())f.delete(c);e.onPause?.({type:"pause",line:_,reason:r,locals:[...l.values(),...f.values()],callStack:[...e.frames].reverse().map(c=>({functionName:c.functionName,line:c.line}))});let u=Atomics.load(i,0);for(;;){if(e.interruptBuffer?.[0]===2)throw new ot;if(Atomics.wait(i,0,u,100),e.interruptBuffer?.[0]===2)throw new ot;let c=Atomics.exchange(i,1,0);if(c===1)return e.resumeSkipActive=!0,e.resumeSkipFunctionId=e.currentFunctionId,e.resumeSkipLine=e.currentLine,M;if(c===2)return e.stepArmed=!0,e.resumeSkipActive=!0,e.resumeSkipFunctionId=e.currentFunctionId,e.resumeSkipLine=e.currentLine,M;if(c===3)return e.nextLineArmed=!0,e.nextLineFunctionId=e.currentFunctionId,e.nextLineLine=e.currentLine,e.nextLineDepth=e.callDepth,e.resumeSkipActive=!0,e.resumeSkipFunctionId=e.currentFunctionId,e.resumeSkipLine=e.currentLine,M;if(c===4)return e.stepOutArmed=!0,e.stepOutDepth=Math.max(0,e.callDepth-1),e.resumeSkipActive=!0,e.resumeSkipFunctionId=e.currentFunctionId,e.resumeSkipLine=e.currentLine,M;if(c===5){let T=e.watchBuffer?er(e.watchBuffer):"",S="?";try{S=T?this.debugEvaluate(T):"?"}catch(h){S=h instanceof Error&&h.message==="unavailable"?"?":"error"}e.watchResultBuffer&&Qi([S],e.watchResultBuffer)}}}__wasm_idle_debug_enter(e,t){let _=this.debugSession;return _?.buffer?(_.callDepth+=1,_.currentFunctionId=e,_.currentLine=t,_.frames.push({functionId:e,functionName:_.functionMetadata[e]||`fn_${e}`,line:t,values:new Map}),this.trace(`enter(function=${e}, line=${t}, depth=${_.callDepth})`),_.pauseOnEntry?this.pauseDebugSession(_,e,t,"entry"):_.stepArmed?this.pauseDebugSession(_,e,t,"step"):M):M}__wasm_idle_debug_leave(e){let t=this.debugSession;if(!t?.buffer)return M;this.trace(`leave(function=${e}, depth=${t.callDepth})`),t.nextLineArmed&&e===t.nextLineFunctionId&&t.callDepth<=(t.nextLineDepth??t.callDepth)&&(t.nextLineArmed=!1,t.nextLineDepth=0,t.stepArmed=!0),t.callDepth=Math.max(0,t.callDepth-1),t.currentFunctionId===e&&(t.currentFunctionId=0);for(let _=t.frames.length-1;_>=0;_-=1)if(t.frames[_]?.functionId===e){t.frames.splice(_,1);break}return M}__wasm_idle_debug_value_num(e,t,_){let r=this.debugSession;if(!r?.buffer)return M;if(e===0)return r.globalValues.set(t,Number.isInteger(_)?String(_):`${_}`),M;for(let i=r.frames.length-1;i>=0;i-=1){let s=r.frames[i];if(s?.functionId===e){s.values.set(t,Number.isInteger(_)?String(_):`${_}`);break}}return M}__wasm_idle_debug_value_bool(e,t,_){let r=this.debugSession;if(!r?.buffer)return M;if(e===0)return r.globalValues.set(t,_?"true":"false"),M;for(let i=r.frames.length-1;i>=0;i-=1){let s=r.frames[i];if(s?.functionId===e){s.values.set(t,_?"true":"false");break}}return M}__wasm_idle_debug_value_addr(e,t,_){let r=this.debugSession;if(!r?.buffer)return M;if(e===0)return r.globalValues.set(t,String(_>>>0)),M;for(let i=r.frames.length-1;i>=0;i-=1){let s=r.frames[i];if(s?.functionId===e){s.values.set(t,String(_>>>0));break}}return M}__wasm_idle_debug_value_text(e,t,_,r){let i=this.debugSession;if(!i?.buffer)return M;this.mem?.check?.();let s=this.mem?.readStr?this.mem.readStr(_,r):"?";if(e===0)return i.globalValues.set(t,s),M;for(let o=i.frames.length-1;o>=0;o-=1){let a=i.frames[o];if(a?.functionId===e){a.values.set(t,s);break}}return M}__wasm_idle_debug_line(e,t){let _=this.debugSession;if(!_?.buffer)return M;let r=Atomics.load(_.buffer,2);if(r!==_.breakpointVersion){let s=Math.max(0,Atomics.load(_.buffer,3)),o=new Set;for(let a=0;a<s&&a+4<_.buffer.length;a+=1){let d=Atomics.load(_.buffer,a+4);d>0&&o.add(d)}_.breakpoints=o,_.breakpointVersion=r}if(_.resumeSkipActive){if(e===_.resumeSkipFunctionId&&t===_.resumeSkipLine)return M;_.resumeSkipActive=!1,_.resumeSkipFunctionId=0,_.resumeSkipLine=0}let i="";return _.pauseOnEntry?i="entry":_.breakpoints.has(t)?i="breakpoint":_.stepArmed?i="step":_.nextLineArmed&&_.callDepth<=(_.nextLineDepth??_.callDepth)&&e===_.nextLineFunctionId&&t!==_.nextLineLine?i="nextLine":_.stepOutArmed&&_.callDepth<=_.stepOutDepth&&(i="stepOut"),i?this.pauseDebugSession(_,e,t,i):M}environ_sizes_get(e,t){this.mem.check();let _=0,r=Object.getOwnPropertyNames(this.environ);for(let i of r){let s=this.environ[i];_+=i.length+s.length+2}return this.mem.write32(e,r.length),this.mem.write32(t,_),this.trace(`environ_sizes_get(count=${r.length}, bytes=${_})`),M}environ_get(e,t){this.mem.check();let _=Object.getOwnPropertyNames(this.environ);this.trace(`environ_get(entries=${JSON.stringify(_)})`);for(let r of _)this.mem.write32(e,t),e+=4,t+=this.mem.writeStr(t,`${r}=${this.environ[r]}`);return M}args_sizes_get(e,t){this.mem.check();let _=0;for(let r of this.argv)_+=r.length+1;return this.mem.write32(e,this.argv.length),this.mem.write32(t,_),this.trace(`args_sizes_get(count=${this.argv.length}, bytes=${_})`),M}args_get(e,t){this.mem.check(),this.trace(`args_get(argv=${JSON.stringify(this.argv)})`);for(let _ of this.argv)this.mem.write32(e,t),e+=4,t+=this.mem.writeStr(t,_);return M}random_get(e,t){let _=new Uint8Array(this.mem.buffer,e,t);for(let r=0;r<t;++r)_[r]=Math.random()*256|0}clock_time_get(e,t,_){this.mem.check();let r=e===1&&typeof performance<"u"?performance.now():Date.now(),i=BigInt(Math.floor(r*1e6));return this.mem.view.setBigUint64(_,i,!0),this.trace(`clock_time_get(clock=${e}, ns=${i})`),M}poll_oneoff(){throw new Kt("wasi_unstable","poll_oneoff")}fd_filestat_set_times(){return this.trace("fd_filestat_set_times()"),M}path_filestat_set_times(){return this.trace("path_filestat_set_times()"),M}sock_accept(){return this.trace("sock_accept() unsupported"),Mn}sock_recv(){return this.trace("sock_recv() unsupported"),Mn}sock_send(){return this.trace("sock_send() unsupported"),Mn}sock_shutdown(){return this.trace("sock_shutdown() unsupported"),Mn}path_link(e,t,_,r,i,s,o){this.mem.check();let a=this.mem.readStr(_,r).replace(/^\/+/,""),d=this.mem.readStr(s,o).replace(/^\/+/,"");return this.trace(`path_link(source=${JSON.stringify(a)}, target=${JSON.stringify(d)})`),this.storeFileContents(d,new Uint8Array(this.memfs.getFileContents(a))),M}path_rename(e,t,_,r,i,s){this.mem.check();let o=this.mem.readStr(t,_).replace(/^\/+/,""),a=this.mem.readStr(i,s).replace(/^\/+/,"");return this.trace(`path_rename(source=${JSON.stringify(o)}, target=${JSON.stringify(a)})`),this.storeFileContents(a,new Uint8Array(this.memfs.getFileContents(o))),M}};var ar="wasm32-wasi",Un=["-fobjc-runtime=gnustep-2.0","-fblocks"];var Bs="-std=gnu++20",Vs="-std=gnu11";function dr(n){return(n||"").trim().toUpperCase().replaceAll(/\s+/g,"")}function zs(n){switch(dr(n)){case"03":case"CPP03":case"C++03":case"GNU++03":case"GNUC++03":return"-std=gnu++03";case"11":case"CPP11":case"C++11":case"GNU++11":case"GNUC++11":return"-std=gnu++11";case"14":case"CPP14":case"C++14":case"GNU++14":case"GNUC++14":return"-std=gnu++14";case"17":case"CPP17":case"C++17":case"GNU++17":case"GNUC++17":return"-std=gnu++17";case"20":case"CPP20":case"C++20":case"GNU++20":case"GNUC++20":return"-std=gnu++20";case"23":case"CPP23":case"C++23":case"GNU++23":case"GNUC++23":return"-std=gnu++23";case"26":case"CPP26":case"C++26":case"GNU++26":case"GNUC++26":return"-std=gnu++26";default:return Bs}}function or(n){switch(dr(n)){case"99":case"C99":case"GNU99":case"GNUC99":return"-std=gnu99";case"11":case"C11":case"GNU11":case"GNUC11":return"-std=gnu11";case"17":case"18":case"C17":case"C18":case"GNU17":case"GNU18":case"GNUC17":case"GNUC18":return"-std=gnu17";default:return Vs}}function lr(n,e){return n==="C"?{languageArg:"c",standardArg:or(e.cVersion)}:n==="OBJC"?{languageArg:"objective-c",standardArg:or(e.cVersion)}:{languageArg:"c++",standardArg:zs(e.cppVersion)}}function On(n,e="",t){return[...["CPP","OBJCXX"].includes(n)?[`${e}/include/c++/v1`,`${e}/include/wasm32-wasi/c++/v1`]:[],...t?[`${t.replace(/\/+$/,"")}/include`]:[],`${e}/include/wasm32-wasi`,`${e}/include`]}var js=String.raw`#ifndef WASM_CLANG_EXT_PB_DS_TREE_POLICY_HPP
#define WASM_CLANG_EXT_PB_DS_TREE_POLICY_HPP

#include <cstddef>

namespace __gnu_pbds {

struct null_type {};
struct rb_tree_tag {};
struct splay_tree_tag {};
struct ov_tree_tag {};

template <typename Node_CItr, typename Node_Itr, typename Cmp_Fn, typename Allocator>
class null_node_update {
public:
	typedef Node_CItr node_const_iterator;
	typedef Node_Itr node_iterator;
	typedef Cmp_Fn cmp_fn;
	typedef Allocator allocator_type;
};

template <typename Node_CItr, typename Node_Itr, typename Cmp_Fn, typename Allocator>
class tree_order_statistics_node_update {
public:
	typedef Node_CItr node_const_iterator;
	typedef Node_Itr node_iterator;
	typedef Cmp_Fn cmp_fn;
	typedef Allocator allocator_type;
};

} // namespace __gnu_pbds

#endif
`,Ys=String.raw`#ifndef WASM_CLANG_EXT_PB_DS_ASSOC_CONTAINER_HPP
#define WASM_CLANG_EXT_PB_DS_ASSOC_CONTAINER_HPP

#include <algorithm>
#include <cstddef>
#include <functional>
#include <iterator>
#include <map>
#include <memory>
#include <set>
#include <type_traits>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <ext/pb_ds/tree_policy.hpp>

namespace __gnu_pbds {

namespace detail {

template <typename Allocator, typename Value>
struct rebind_allocator {
	typedef typename std::allocator_traits<Allocator>::template rebind_alloc<Value> type;
};

template <typename Iterator>
Iterator advance_to_order(Iterator first, Iterator last, std::size_t order) {
	if (order >= static_cast<std::size_t>(std::distance(first, last))) return last;
	std::advance(
		first,
		static_cast<typename std::iterator_traits<Iterator>::difference_type>(order)
	);
	return first;
}

template <
	typename Key,
	typename Mapped,
	typename Hash_Fn,
	typename Eq_Fn,
	typename Allocator
>
struct hash_table_selector {
	typedef std::pair<const Key, Mapped> value_type;
	typedef typename rebind_allocator<Allocator, value_type>::type allocator_type;
	typedef std::unordered_map<Key, Mapped, Hash_Fn, Eq_Fn, allocator_type> type;
};

template <typename Key, typename Hash_Fn, typename Eq_Fn, typename Allocator>
struct hash_table_selector<Key, null_type, Hash_Fn, Eq_Fn, Allocator> {
	typedef typename rebind_allocator<Allocator, Key>::type allocator_type;
	typedef std::unordered_set<Key, Hash_Fn, Eq_Fn, allocator_type> type;
};

} // namespace detail

template <
	typename Key,
	typename Mapped,
	typename Cmp_Fn = std::less<Key>,
	typename Tag = rb_tree_tag,
	template <typename Node_CItr, typename Node_Itr, typename Cmp_Fn_, typename Allocator_>
	class Node_Update = null_node_update,
	typename Allocator = std::allocator<char>
>
class tree {
public:
	typedef Key key_type;
	typedef Mapped mapped_type;
	typedef std::pair<const Key, Mapped> value_type;
	typedef Cmp_Fn cmp_fn;
	typedef Tag container_category;
	typedef Allocator allocator_type;
	typedef std::size_t size_type;

private:
	typedef typename detail::rebind_allocator<Allocator, value_type>::type value_allocator_type;
	typedef std::map<Key, Mapped, Cmp_Fn, value_allocator_type> container_type;

public:
	typedef typename container_type::iterator iterator;
	typedef typename container_type::const_iterator const_iterator;
	typedef typename container_type::iterator point_iterator;
	typedef typename container_type::const_iterator const_point_iterator;
	typedef typename container_type::reverse_iterator reverse_iterator;
	typedef typename container_type::const_reverse_iterator const_reverse_iterator;

	tree() = default;
	explicit tree(const Cmp_Fn& compare) : values_(compare) {}

	template <typename InputIt>
	tree(InputIt first, InputIt last) : values_(first, last) {}

	bool empty() const { return values_.empty(); }
	size_type size() const { return values_.size(); }
	size_type max_size() const { return values_.max_size(); }

	iterator begin() { return values_.begin(); }
	const_iterator begin() const { return values_.begin(); }
	const_iterator cbegin() const { return values_.cbegin(); }
	iterator end() { return values_.end(); }
	const_iterator end() const { return values_.end(); }
	const_iterator cend() const { return values_.cend(); }
	reverse_iterator rbegin() { return values_.rbegin(); }
	const_reverse_iterator rbegin() const { return values_.rbegin(); }
	reverse_iterator rend() { return values_.rend(); }
	const_reverse_iterator rend() const { return values_.rend(); }

	std::pair<iterator, bool> insert(const value_type& value) { return values_.insert(value); }
	std::pair<iterator, bool> insert(value_type&& value) { return values_.insert(std::move(value)); }

	template <typename InputIt>
	void insert(InputIt first, InputIt last) {
		values_.insert(first, last);
	}

	mapped_type& operator[](const key_type& key) { return values_[key]; }
	mapped_type& at(const key_type& key) { return values_.at(key); }
	const mapped_type& at(const key_type& key) const { return values_.at(key); }

	iterator find(const key_type& key) { return values_.find(key); }
	const_iterator find(const key_type& key) const { return values_.find(key); }
	bool contains(const key_type& key) const { return values_.find(key) != values_.end(); }
	size_type count(const key_type& key) const { return values_.count(key); }

	iterator lower_bound(const key_type& key) { return values_.lower_bound(key); }
	const_iterator lower_bound(const key_type& key) const { return values_.lower_bound(key); }
	iterator upper_bound(const key_type& key) { return values_.upper_bound(key); }
	const_iterator upper_bound(const key_type& key) const { return values_.upper_bound(key); }

	size_type erase(const key_type& key) { return values_.erase(key); }
	iterator erase(const_iterator position) { return values_.erase(position); }
	iterator erase(const_iterator first, const_iterator last) { return values_.erase(first, last); }
	void clear() { values_.clear(); }
	void swap(tree& other) { values_.swap(other.values_); }

	iterator find_by_order(size_type order) {
		return detail::advance_to_order(values_.begin(), values_.end(), order);
	}

	const_iterator find_by_order(size_type order) const {
		return detail::advance_to_order(values_.begin(), values_.end(), order);
	}

	size_type order_of_key(const key_type& key) const {
		return static_cast<size_type>(std::distance(values_.begin(), values_.lower_bound(key)));
	}

	void join(tree& other) {
		values_.insert(other.values_.begin(), other.values_.end());
		other.values_.clear();
	}

	void split(const key_type& key, tree& other) {
		iterator first = values_.upper_bound(key);
		other.values_.insert(first, values_.end());
		values_.erase(first, values_.end());
	}

private:
	container_type values_;
};

template <
	typename Key,
	typename Cmp_Fn,
	typename Tag,
	template <typename Node_CItr, typename Node_Itr, typename Cmp_Fn_, typename Allocator_>
	class Node_Update,
	typename Allocator
>
class tree<Key, null_type, Cmp_Fn, Tag, Node_Update, Allocator> {
public:
	typedef Key key_type;
	typedef null_type mapped_type;
	typedef Key value_type;
	typedef Cmp_Fn cmp_fn;
	typedef Tag container_category;
	typedef Allocator allocator_type;
	typedef std::size_t size_type;

private:
	typedef typename detail::rebind_allocator<Allocator, value_type>::type value_allocator_type;
	typedef std::set<Key, Cmp_Fn, value_allocator_type> container_type;

public:
	typedef typename container_type::iterator iterator;
	typedef typename container_type::const_iterator const_iterator;
	typedef typename container_type::iterator point_iterator;
	typedef typename container_type::const_iterator const_point_iterator;
	typedef typename container_type::reverse_iterator reverse_iterator;
	typedef typename container_type::const_reverse_iterator const_reverse_iterator;

	tree() = default;
	explicit tree(const Cmp_Fn& compare) : values_(compare) {}

	template <typename InputIt>
	tree(InputIt first, InputIt last) : values_(first, last) {}

	bool empty() const { return values_.empty(); }
	size_type size() const { return values_.size(); }
	size_type max_size() const { return values_.max_size(); }

	iterator begin() { return values_.begin(); }
	const_iterator begin() const { return values_.begin(); }
	const_iterator cbegin() const { return values_.cbegin(); }
	iterator end() { return values_.end(); }
	const_iterator end() const { return values_.end(); }
	const_iterator cend() const { return values_.cend(); }
	reverse_iterator rbegin() { return values_.rbegin(); }
	const_reverse_iterator rbegin() const { return values_.rbegin(); }
	reverse_iterator rend() { return values_.rend(); }
	const_reverse_iterator rend() const { return values_.rend(); }

	std::pair<iterator, bool> insert(const value_type& value) { return values_.insert(value); }
	std::pair<iterator, bool> insert(value_type&& value) { return values_.insert(std::move(value)); }

	template <typename InputIt>
	void insert(InputIt first, InputIt last) {
		values_.insert(first, last);
	}

	iterator find(const key_type& key) { return values_.find(key); }
	const_iterator find(const key_type& key) const { return values_.find(key); }
	bool contains(const key_type& key) const { return values_.find(key) != values_.end(); }
	size_type count(const key_type& key) const { return values_.count(key); }

	iterator lower_bound(const key_type& key) { return values_.lower_bound(key); }
	const_iterator lower_bound(const key_type& key) const { return values_.lower_bound(key); }
	iterator upper_bound(const key_type& key) { return values_.upper_bound(key); }
	const_iterator upper_bound(const key_type& key) const { return values_.upper_bound(key); }

	size_type erase(const key_type& key) { return values_.erase(key); }
	iterator erase(const_iterator position) { return values_.erase(position); }
	iterator erase(const_iterator first, const_iterator last) { return values_.erase(first, last); }
	void clear() { values_.clear(); }
	void swap(tree& other) { values_.swap(other.values_); }

	iterator find_by_order(size_type order) {
		return detail::advance_to_order(values_.begin(), values_.end(), order);
	}

	const_iterator find_by_order(size_type order) const {
		return detail::advance_to_order(values_.begin(), values_.end(), order);
	}

	size_type order_of_key(const key_type& key) const {
		return static_cast<size_type>(std::distance(values_.begin(), values_.lower_bound(key)));
	}

	void join(tree& other) {
		values_.insert(other.values_.begin(), other.values_.end());
		other.values_.clear();
	}

	void split(const key_type& key, tree& other) {
		iterator first = values_.upper_bound(key);
		other.values_.insert(first, values_.end());
		values_.erase(first, values_.end());
	}

private:
	container_type values_;
};

template <
	typename Key,
	typename Mapped,
	typename Hash_Fn = std::hash<Key>,
	typename Eq_Fn = std::equal_to<Key>,
	typename Comb_Hash_Fn = void,
	typename Resize_Policy = void,
	bool Store_Hash = false,
	typename Allocator = std::allocator<char>
>
using gp_hash_table = typename detail::hash_table_selector<
	Key,
	Mapped,
	Hash_Fn,
	Eq_Fn,
	Allocator
>::type;

template <
	typename Key,
	typename Mapped,
	typename Hash_Fn = std::hash<Key>,
	typename Eq_Fn = std::equal_to<Key>,
	typename Comb_Hash_Fn = void,
	typename Resize_Policy = void,
	bool Store_Hash = false,
	typename Allocator = std::allocator<char>
>
using cc_hash_table = typename detail::hash_table_selector<
	Key,
	Mapped,
	Hash_Fn,
	Eq_Fn,
	Allocator
>::type;

} // namespace __gnu_pbds

#endif
`,Ks=String.raw`#ifndef WASM_CLANG_EXT_PB_DS_HASH_POLICY_HPP
#define WASM_CLANG_EXT_PB_DS_HASH_POLICY_HPP

#include <cstddef>

namespace __gnu_pbds {

template <typename Size_Type = std::size_t>
class direct_mask_range_hashing {
public:
	typedef Size_Type size_type;
};

template <typename Size_Type = std::size_t>
class direct_mod_range_hashing {
public:
	typedef Size_Type size_type;
};

template <typename Size_Type = std::size_t>
class linear_probe_fn {
public:
	typedef Size_Type size_type;
};

template <typename Size_Type = std::size_t>
class quadratic_probe_fn {
public:
	typedef Size_Type size_type;
};

class hash_exponential_size_policy {};
class hash_prime_size_policy {};

template <bool External_Load_Access = false, typename Size_Type = std::size_t>
class hash_load_check_resize_trigger {
public:
	typedef Size_Type size_type;
	explicit hash_load_check_resize_trigger(float = 0.125, float = 0.5) {}
};

template <bool External_Load_Access = false, typename Size_Type = std::size_t>
class cc_hash_max_collision_check_resize_trigger {
public:
	typedef Size_Type size_type;
	explicit cc_hash_max_collision_check_resize_trigger(float = 0.5) {}
};

template <
	typename Size_Policy = hash_exponential_size_policy,
	typename Trigger_Policy = hash_load_check_resize_trigger<>,
	bool External_Size_Access = false,
	typename Size_Type = std::size_t
>
class hash_standard_resize_policy {
public:
	typedef Size_Type size_type;
	hash_standard_resize_policy() = default;
	explicit hash_standard_resize_policy(const Size_Policy&) {}
	hash_standard_resize_policy(const Size_Policy&, const Trigger_Policy&) {}
};

} // namespace __gnu_pbds

#endif
`,qs=String.raw`#ifndef WASM_CLANG_EXT_PB_DS_PRIORITY_QUEUE_HPP
#define WASM_CLANG_EXT_PB_DS_PRIORITY_QUEUE_HPP

#include <algorithm>
#include <cstddef>
#include <functional>
#include <memory>
#include <queue>
#include <utility>
#include <vector>

namespace __gnu_pbds {

struct pairing_heap_tag {};
struct binary_heap_tag {};
struct binomial_heap_tag {};
struct rc_binomial_heap_tag {};
struct thin_heap_tag {};

namespace detail {

template <typename Allocator, typename Value>
struct priority_queue_rebind_allocator {
	typedef typename std::allocator_traits<Allocator>::template rebind_alloc<Value> type;
};

} // namespace detail

template <
	typename Value_Type,
	typename Cmp_Fn = std::less<Value_Type>,
	typename Tag = pairing_heap_tag,
	typename Allocator = std::allocator<char>
>
class priority_queue {
public:
	typedef Value_Type value_type;
	typedef Cmp_Fn cmp_fn;
	typedef Tag container_category;
	typedef Allocator allocator_type;
	typedef std::size_t size_type;
	typedef value_type& reference;
	typedef const value_type& const_reference;

private:
	typedef typename detail::priority_queue_rebind_allocator<Allocator, value_type>::type value_allocator_type;
	typedef std::vector<value_type, value_allocator_type> container_type;

public:
	typedef typename container_type::iterator point_iterator;
	typedef typename container_type::const_iterator const_point_iterator;

	priority_queue() : values_(), compare_() {
		std::make_heap(values_.begin(), values_.end(), compare_);
	}

	explicit priority_queue(const Cmp_Fn& compare) : values_(), compare_(compare) {
		std::make_heap(values_.begin(), values_.end(), compare_);
	}

	template <typename InputIt>
	priority_queue(InputIt first, InputIt last) : values_(first, last), compare_() {
		std::make_heap(values_.begin(), values_.end(), compare_);
	}

	bool empty() const { return values_.empty(); }
	size_type size() const { return values_.size(); }
	const_reference top() const { return values_.front(); }
	void clear() { values_.clear(); }
	void swap(priority_queue& other) {
		values_.swap(other.values_);
		std::swap(compare_, other.compare_);
	}

	point_iterator push(const_reference value) {
		values_.push_back(value);
		std::push_heap(values_.begin(), values_.end(), compare_);
		return values_.empty() ? values_.end() : values_.begin();
	}

	void pop() {
		std::pop_heap(values_.begin(), values_.end(), compare_);
		values_.pop_back();
	}

	void modify(point_iterator position, const_reference value) {
		if (position == values_.end()) return;
		*position = value;
		std::make_heap(values_.begin(), values_.end(), compare_);
	}

	void erase(point_iterator position) {
		if (position == values_.end()) return;
		values_.erase(position);
		std::make_heap(values_.begin(), values_.end(), compare_);
	}

	void join(priority_queue& other) {
		values_.insert(values_.end(), other.values_.begin(), other.values_.end());
		other.values_.clear();
		std::make_heap(values_.begin(), values_.end(), compare_);
	}

private:
	container_type values_;
	Cmp_Fn compare_;
};

} // namespace __gnu_pbds

#endif
`,Js=String.raw`#ifndef WASM_CLANG_EXT_ROPE
#define WASM_CLANG_EXT_ROPE

#include <algorithm>
#include <cstddef>
#include <iosfwd>
#include <iterator>
#include <memory>
#include <ostream>
#include <string>
#include <utility>

namespace __gnu_cxx {

template <typename CharT, typename Alloc = std::allocator<CharT>>
class rope {
public:
	typedef CharT value_type;
	typedef Alloc allocator_type;
	typedef std::basic_string<CharT, std::char_traits<CharT>, Alloc> string_type;
	typedef typename string_type::traits_type traits_type;
	typedef typename string_type::size_type size_type;
	typedef typename string_type::difference_type difference_type;
	typedef typename string_type::reference reference;
	typedef typename string_type::const_reference const_reference;
	typedef typename string_type::iterator iterator;
	typedef typename string_type::const_iterator const_iterator;

	static const size_type npos = string_type::npos;

	rope() = default;
	rope(const rope&) = default;
	rope(rope&&) = default;
	rope& operator=(const rope&) = default;
	rope& operator=(rope&&) = default;

	rope(const CharT* value) : data_(value ? value : empty_c_str()) {}
	rope(const CharT* value, size_type count) : data_(value, count) {}
	rope(size_type count, CharT value) : data_(count, value) {}
	rope(const string_type& value) : data_(value) {}
	rope(string_type&& value) : data_(std::move(value)) {}

	template <typename InputIt>
	rope(InputIt first, InputIt last) : data_(first, last) {}

	bool empty() const { return data_.empty(); }
	size_type size() const { return data_.size(); }
	size_type length() const { return data_.length(); }
	size_type max_size() const { return data_.max_size(); }
	void clear() { data_.clear(); }

	const CharT* c_str() const { return data_.c_str(); }
	const string_type& str() const { return data_; }

	iterator begin() { return data_.begin(); }
	const_iterator begin() const { return data_.begin(); }
	const_iterator cbegin() const { return data_.cbegin(); }
	iterator end() { return data_.end(); }
	const_iterator end() const { return data_.end(); }
	const_iterator cend() const { return data_.cend(); }

	reference operator[](size_type index) { return data_[index]; }
	const_reference operator[](size_type index) const { return data_[index]; }
	reference at(size_type index) { return data_.at(index); }
	const_reference at(size_type index) const { return data_.at(index); }
	reference mutable_reference_at(size_type index) { return data_.at(index); }

	void push_back(CharT value) { data_.push_back(value); }
	void pop_back() { data_.pop_back(); }

	rope& append(const rope& value) {
		data_.append(value.data_);
		return *this;
	}

	rope& append(const CharT* value) {
		data_.append(value ? value : empty_c_str());
		return *this;
	}

	rope& append(const CharT* value, size_type count) {
		data_.append(value, count);
		return *this;
	}

	rope& append(size_type count, CharT value) {
		data_.append(count, value);
		return *this;
	}

	rope& insert(size_type position, const rope& value) {
		data_.insert(position, value.data_);
		return *this;
	}

	rope& insert(size_type position, const CharT* value) {
		data_.insert(position, value ? value : empty_c_str());
		return *this;
	}

	rope& insert(size_type position, const CharT* value, size_type count) {
		data_.insert(position, value, count);
		return *this;
	}

	rope& insert(size_type position, size_type count, CharT value) {
		data_.insert(position, count, value);
		return *this;
	}

	rope& erase(size_type position = 0, size_type count = npos) {
		data_.erase(position, count);
		return *this;
	}

	rope& replace(size_type position, size_type count, const rope& value) {
		data_.replace(position, count, value.data_);
		return *this;
	}

	rope& replace(size_type position, size_type count, const CharT* value) {
		data_.replace(position, count, value ? value : empty_c_str());
		return *this;
	}

	rope substr(size_type position = 0, size_type count = npos) const {
		return rope(data_.substr(position, count));
	}

	size_type copy(size_type position, size_type count, CharT* target) const {
		if (position > data_.size()) return 0;
		const size_type copied = std::min(count, data_.size() - position);
		traits_type::copy(target, data_.data() + position, copied);
		return copied;
	}

	int compare(const rope& value) const { return data_.compare(value.data_); }

	rope& operator+=(const rope& value) { return append(value); }
	rope& operator+=(const CharT* value) { return append(value); }
	rope& operator+=(CharT value) {
		push_back(value);
		return *this;
	}

private:
	static const CharT* empty_c_str() {
		static const CharT empty[1] = {};
		return empty;
	}

	string_type data_;
};

template <typename CharT, typename Alloc>
rope<CharT, Alloc> operator+(rope<CharT, Alloc> left, const rope<CharT, Alloc>& right) {
	left += right;
	return left;
}

template <typename CharT, typename Alloc>
bool operator==(const rope<CharT, Alloc>& left, const rope<CharT, Alloc>& right) {
	return left.compare(right) == 0;
}

template <typename CharT, typename Alloc>
bool operator!=(const rope<CharT, Alloc>& left, const rope<CharT, Alloc>& right) {
	return !(left == right);
}

template <typename CharT, typename Alloc>
bool operator<(const rope<CharT, Alloc>& left, const rope<CharT, Alloc>& right) {
	return left.compare(right) < 0;
}

template <typename CharT, typename Alloc>
std::basic_ostream<CharT>& operator<<(
	std::basic_ostream<CharT>& output,
	const rope<CharT, Alloc>& value
) {
	return output << value.str();
}

typedef rope<char> crope;
typedef rope<wchar_t> wrope;

} // namespace __gnu_cxx

#endif
`,Zs=String.raw`#ifndef WASM_CLANG_SETJMP_H
#define WASM_CLANG_SETJMP_H

#ifdef __cplusplus
extern "C" {
#endif

typedef long jmp_buf[32];
int setjmp(jmp_buf);
__attribute__((noreturn)) void longjmp(jmp_buf, int);

#ifdef __cplusplus
}
#endif

#endif
`,Qs=String.raw`#ifndef WASM_CLANG_BITS_STDCPP_H
#define WASM_CLANG_BITS_STDCPP_H

#include <algorithm>
#include <array>
#include <bitset>
#include <cassert>
#include <cctype>
#include <cerrno>
#include <cfloat>
#include <climits>
#include <cmath>
#include <cstddef>
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <deque>
#include <functional>
#include <iomanip>
#include <iostream>
#include <iterator>
#include <limits>
#include <list>
#include <map>
#include <memory>
#include <numeric>
#include <queue>
#include <set>
#include <sstream>
#include <stack>
#include <string>
#include <string_view>
#include <tuple>
#include <type_traits>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>

#endif
`,eo=String.raw`#ifndef WASM_CLANG_BITS_EXTCXX_H
#define WASM_CLANG_BITS_EXTCXX_H

#include <bits/stdc++.h>
#include <ext/hash_map>
#include <ext/hash_set>
#include <ext/rope>
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/hash_policy.hpp>
#include <ext/pb_ds/priority_queue.hpp>
#include <ext/pb_ds/tree_policy.hpp>

#endif
`,to=[{path:"include/setjmp.h",contents:Zs},{path:"include/bits/stdc++.h",contents:Qs},{path:"include/bits/extc++.h",contents:eo},{path:"include/c++/v1/ext/rope",contents:Js},{path:"include/c++/v1/ext/pb_ds/tree_policy.hpp",contents:js},{path:"include/c++/v1/ext/pb_ds/assoc_container.hpp",contents:Ys},{path:"include/c++/v1/ext/pb_ds/hash_policy.hpp",contents:Ks},{path:"include/c++/v1/ext/pb_ds/priority_queue.hpp",contents:qs}];function fr(n){n.addDirectory("include/c++/v1/ext/pb_ds"),n.addDirectory("include/bits");for(let e of to)n.addFile(e.path,e.contents)}var cr=Object.freeze({"builtins.h":`/*===---- builtins.h - Standard header for extra builtins -----------------===*\\
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
\\*===----------------------------------------------------------------------===*/

/// Some legacy compilers have builtin definitions in a file named builtins.h.
/// This header file has been added to allow compatibility with code that was
/// written for those compilers. Code may have an include line for this file
/// and to avoid an error an empty file with this name is provided.
#ifndef __BUILTINS_H
#define __BUILTINS_H

#if defined(__MVS__) && __has_include_next(<builtins.h>)
#include_next <builtins.h>
#endif /* __MVS__ */
#endif /* __BUILTINS_H */
`,"float.h":`/*===---- float.h - Characteristics of floating point types ----------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#if defined(__MVS__) && __has_include_next(<float.h>)
#include <__float_header_macro.h>
#include_next <float.h>
#else

#if !defined(__need_infinity_nan)
#define __need_float_float
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L) ||              \\
    !defined(__STRICT_ANSI__)
#define __need_infinity_nan
#endif
#include <__float_header_macro.h>
#endif

#ifdef __need_float_float
/* If we're on MinGW, fall back to the system's float.h, which might have
 * additional definitions provided for Windows.
 * For more details see http://msdn.microsoft.com/en-us/library/y0ybw9fy.aspx
 *
 * Also fall back on AIX to allow additional definitions and
 * implementation-defined values.
 */
#if (defined(__MINGW32__) || defined(_MSC_VER) || defined(_AIX)) &&            \\
    __STDC_HOSTED__ && __has_include_next(<float.h>)

#  include_next <float.h>

#endif

#include <__float_float.h>
#undef __need_float_float
#endif

#ifdef __need_infinity_nan
#include <__float_infinity_nan.h>
#undef __need_infinity_nan
#endif

#endif /* __MVS__ */
`,"__float_float.h":`/*===---- __float_float.h --------------------------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __CLANG_FLOAT_FLOAT_H
#define __CLANG_FLOAT_FLOAT_H

#if (defined(__MINGW32__) || defined(_MSC_VER) || defined(_AIX)) &&            \\
    __STDC_HOSTED__

/* Undefine anything that we'll be redefining below. */
#  undef FLT_EVAL_METHOD
#  undef FLT_ROUNDS
#  undef FLT_RADIX
#  undef FLT_MANT_DIG
#  undef DBL_MANT_DIG
#  undef LDBL_MANT_DIG
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 199901L) ||              \\
    !defined(__STRICT_ANSI__) ||                                               \\
    (defined(__cplusplus) && __cplusplus >= 201103L) ||                        \\
    (__STDC_HOSTED__ && defined(_AIX) && defined(_ALL_SOURCE))
#    undef DECIMAL_DIG
#  endif
#  undef FLT_DIG
#  undef DBL_DIG
#  undef LDBL_DIG
#  undef FLT_MIN_EXP
#  undef DBL_MIN_EXP
#  undef LDBL_MIN_EXP
#  undef FLT_MIN_10_EXP
#  undef DBL_MIN_10_EXP
#  undef LDBL_MIN_10_EXP
#  undef FLT_MAX_EXP
#  undef DBL_MAX_EXP
#  undef LDBL_MAX_EXP
#  undef FLT_MAX_10_EXP
#  undef DBL_MAX_10_EXP
#  undef LDBL_MAX_10_EXP
#  undef FLT_MAX
#  undef DBL_MAX
#  undef LDBL_MAX
#  undef FLT_EPSILON
#  undef DBL_EPSILON
#  undef LDBL_EPSILON
#  undef FLT_MIN
#  undef DBL_MIN
#  undef LDBL_MIN
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 201112L) ||              \\
    !defined(__STRICT_ANSI__) ||                                               \\
    (defined(__cplusplus) && __cplusplus >= 201703L) ||                        \\
    (__STDC_HOSTED__ && defined(_AIX) && defined(_ALL_SOURCE))
#    undef FLT_TRUE_MIN
#    undef DBL_TRUE_MIN
#    undef LDBL_TRUE_MIN
#    undef FLT_DECIMAL_DIG
#    undef DBL_DECIMAL_DIG
#    undef LDBL_DECIMAL_DIG
#    undef FLT_HAS_SUBNORM
#    undef DBL_HAS_SUBNORM
#    undef LDBL_HAS_SUBNORM
#  endif
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L) ||              \\
    !defined(__STRICT_ANSI__)
#    undef FLT_NORM_MAX
#    undef DBL_NORM_MAX
#    undef LDBL_NORM_MAX
#endif
#endif

#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L) ||              \\
    !defined(__STRICT_ANSI__)
#  undef FLT_SNAN
#  undef DBL_SNAN
#  undef LDBL_SNAN
#endif

/* Characteristics of floating point types, C99 5.2.4.2.2 */

#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 199901L) ||              \\
    (defined(__cplusplus) && __cplusplus >= 201103L)
#define FLT_EVAL_METHOD __FLT_EVAL_METHOD__
#endif
#define FLT_ROUNDS (__builtin_flt_rounds())
#define FLT_RADIX __FLT_RADIX__

#define FLT_MANT_DIG __FLT_MANT_DIG__
#define DBL_MANT_DIG __DBL_MANT_DIG__
#define LDBL_MANT_DIG __LDBL_MANT_DIG__

#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 199901L) ||              \\
    !defined(__STRICT_ANSI__) ||                                               \\
    (defined(__cplusplus) && __cplusplus >= 201103L) ||                        \\
    (__STDC_HOSTED__ && defined(_AIX) && defined(_ALL_SOURCE))
#  define DECIMAL_DIG __DECIMAL_DIG__
#endif

#define FLT_DIG __FLT_DIG__
#define DBL_DIG __DBL_DIG__
#define LDBL_DIG __LDBL_DIG__

#define FLT_MIN_EXP __FLT_MIN_EXP__
#define DBL_MIN_EXP __DBL_MIN_EXP__
#define LDBL_MIN_EXP __LDBL_MIN_EXP__

#define FLT_MIN_10_EXP __FLT_MIN_10_EXP__
#define DBL_MIN_10_EXP __DBL_MIN_10_EXP__
#define LDBL_MIN_10_EXP __LDBL_MIN_10_EXP__

#define FLT_MAX_EXP __FLT_MAX_EXP__
#define DBL_MAX_EXP __DBL_MAX_EXP__
#define LDBL_MAX_EXP __LDBL_MAX_EXP__

#define FLT_MAX_10_EXP __FLT_MAX_10_EXP__
#define DBL_MAX_10_EXP __DBL_MAX_10_EXP__
#define LDBL_MAX_10_EXP __LDBL_MAX_10_EXP__

#define FLT_MAX __FLT_MAX__
#define DBL_MAX __DBL_MAX__
#define LDBL_MAX __LDBL_MAX__

#define FLT_EPSILON __FLT_EPSILON__
#define DBL_EPSILON __DBL_EPSILON__
#define LDBL_EPSILON __LDBL_EPSILON__

#define FLT_MIN __FLT_MIN__
#define DBL_MIN __DBL_MIN__
#define LDBL_MIN __LDBL_MIN__

#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 201112L) ||              \\
    !defined(__STRICT_ANSI__) ||                                               \\
    (defined(__cplusplus) && __cplusplus >= 201703L) ||                        \\
    (__STDC_HOSTED__ && defined(_AIX) && defined(_ALL_SOURCE))
#  define FLT_TRUE_MIN __FLT_DENORM_MIN__
#  define DBL_TRUE_MIN __DBL_DENORM_MIN__
#  define LDBL_TRUE_MIN __LDBL_DENORM_MIN__
#  define FLT_DECIMAL_DIG __FLT_DECIMAL_DIG__
#  define DBL_DECIMAL_DIG __DBL_DECIMAL_DIG__
#  define LDBL_DECIMAL_DIG __LDBL_DECIMAL_DIG__
#  define FLT_HAS_SUBNORM __FLT_HAS_DENORM__
#  define DBL_HAS_SUBNORM __DBL_HAS_DENORM__
#  define LDBL_HAS_SUBNORM __LDBL_HAS_DENORM__
#endif

#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L) ||              \\
    !defined(__STRICT_ANSI__)
   /* C23 5.2.5.3.2p28 */
#  define FLT_SNAN (__builtin_nansf(""))
#  define DBL_SNAN (__builtin_nans(""))
#  define LDBL_SNAN (__builtin_nansl(""))

   /* C23 5.2.5.3.3p32 */
#  define FLT_NORM_MAX __FLT_NORM_MAX__
#  define DBL_NORM_MAX __DBL_NORM_MAX__
#  define LDBL_NORM_MAX __LDBL_NORM_MAX__
#endif

#ifdef __STDC_WANT_IEC_60559_TYPES_EXT__
#  define FLT16_MANT_DIG    __FLT16_MANT_DIG__
#  define FLT16_DECIMAL_DIG __FLT16_DECIMAL_DIG__
#  define FLT16_DIG         __FLT16_DIG__
#  define FLT16_MIN_EXP     __FLT16_MIN_EXP__
#  define FLT16_MIN_10_EXP  __FLT16_MIN_10_EXP__
#  define FLT16_MAX_EXP     __FLT16_MAX_EXP__
#  define FLT16_MAX_10_EXP  __FLT16_MAX_10_EXP__
#  define FLT16_MAX         __FLT16_MAX__
#  define FLT16_EPSILON     __FLT16_EPSILON__
#  define FLT16_MIN         __FLT16_MIN__
#  define FLT16_TRUE_MIN    __FLT16_TRUE_MIN__
#endif /* __STDC_WANT_IEC_60559_TYPES_EXT__ */

#endif /* __CLANG_FLOAT_FLOAT_H */
`,"__float_header_macro.h":`/*===---- __float_header_macro.h -------------------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __CLANG_FLOAT_H
#define __CLANG_FLOAT_H
#endif /* __CLANG_FLOAT_H */
`,"__float_infinity_nan.h":`/*===---- __float_infinity_nan.h -------------------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __CLANG_FLOAT_INFINITY_NAN_H
#define __CLANG_FLOAT_INFINITY_NAN_H

/* C23 5.2.5.3.3p29-30 */
#undef INFINITY
#undef NAN

#define INFINITY (__builtin_inff())
#define NAN (__builtin_nanf(""))

#endif /* __CLANG_FLOAT_INFINITY_NAN_H */
`,"inttypes.h":`/*===---- inttypes.h - Standard header for integer printf macros ----------===*\\
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
\\*===----------------------------------------------------------------------===*/

#ifndef __CLANG_INTTYPES_H
// AIX system headers need inttypes.h to be re-enterable while _STD_TYPES_T
// is defined until an inclusion of it without _STD_TYPES_T occurs, in which
// case the header guard macro is defined.
#if !defined(_AIX) || !defined(_STD_TYPES_T)
#define __CLANG_INTTYPES_H
#endif
#if defined(__MVS__) && __has_include_next(<inttypes.h>)
#include_next <inttypes.h>
#else

#if defined(_MSC_VER) && _MSC_VER < 1800
#error MSVC does not have inttypes.h prior to Visual Studio 2013
#endif

#include_next <inttypes.h>

#if defined(_MSC_VER) && _MSC_VER < 1900
/* MSVC headers define int32_t as int, but PRIx32 as "lx" instead of "x".
 * This triggers format warnings, so fix it up here. */
#undef PRId32
#undef PRIdLEAST32
#undef PRIdFAST32
#undef PRIi32
#undef PRIiLEAST32
#undef PRIiFAST32
#undef PRIo32
#undef PRIoLEAST32
#undef PRIoFAST32
#undef PRIu32
#undef PRIuLEAST32
#undef PRIuFAST32
#undef PRIx32
#undef PRIxLEAST32
#undef PRIxFAST32
#undef PRIX32
#undef PRIXLEAST32
#undef PRIXFAST32

#undef SCNd32
#undef SCNdLEAST32
#undef SCNdFAST32
#undef SCNi32
#undef SCNiLEAST32
#undef SCNiFAST32
#undef SCNo32
#undef SCNoLEAST32
#undef SCNoFAST32
#undef SCNu32
#undef SCNuLEAST32
#undef SCNuFAST32
#undef SCNx32
#undef SCNxLEAST32
#undef SCNxFAST32

#define PRId32 "d"
#define PRIdLEAST32 "d"
#define PRIdFAST32 "d"
#define PRIi32 "i"
#define PRIiLEAST32 "i"
#define PRIiFAST32 "i"
#define PRIo32 "o"
#define PRIoLEAST32 "o"
#define PRIoFAST32 "o"
#define PRIu32 "u"
#define PRIuLEAST32 "u"
#define PRIuFAST32 "u"
#define PRIx32 "x"
#define PRIxLEAST32 "x"
#define PRIxFAST32 "x"
#define PRIX32 "X"
#define PRIXLEAST32 "X"
#define PRIXFAST32 "X"

#define SCNd32 "d"
#define SCNdLEAST32 "d"
#define SCNdFAST32 "d"
#define SCNi32 "i"
#define SCNiLEAST32 "i"
#define SCNiFAST32 "i"
#define SCNo32 "o"
#define SCNoLEAST32 "o"
#define SCNoFAST32 "o"
#define SCNu32 "u"
#define SCNuLEAST32 "u"
#define SCNuFAST32 "u"
#define SCNx32 "x"
#define SCNxLEAST32 "x"
#define SCNxFAST32 "x"
#endif

#endif /* __MVS__ */
#endif /* __CLANG_INTTYPES_H */
`,"iso646.h":`/*===---- iso646.h - Standard header for alternate spellings of operators---===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __ISO646_H
#define __ISO646_H
#if defined(__MVS__) && __has_include_next(<iso646.h>)
#include_next <iso646.h>
#else

#ifndef __cplusplus
#define and    &&
#define and_eq &=
#define bitand &
#define bitor  |
#define compl  ~
#define not    !
#define not_eq !=
#define or     ||
#define or_eq  |=
#define xor    ^
#define xor_eq ^=
#endif

#endif /* __MVS__ */
#endif /* __ISO646_H */
`,"limits.h":`/*===---- limits.h - Standard header for integer sizes --------------------===*\\
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
\\*===----------------------------------------------------------------------===*/

#ifndef __CLANG_LIMITS_H
#define __CLANG_LIMITS_H

#if defined(__MVS__) && __has_include_next(<limits.h>)
#include_next <limits.h>
#else

/* The system's limits.h may, in turn, try to #include_next GCC's limits.h.
   Avert this #include_next madness. */
#if defined __GNUC__ && !defined _GCC_LIMITS_H_
#define _GCC_LIMITS_H_
#endif

/* System headers include a number of constants from POSIX in <limits.h>.
   Include it if we're hosted. */
#if __STDC_HOSTED__ && __has_include_next(<limits.h>)
#include_next <limits.h>
#endif

/* Many system headers try to "help us out" by defining these.  No really, we
   know how big each datatype is. */
#undef  SCHAR_MIN
#undef  SCHAR_MAX
#undef  UCHAR_MAX
#undef  SHRT_MIN
#undef  SHRT_MAX
#undef  USHRT_MAX
#undef  INT_MIN
#undef  INT_MAX
#undef  UINT_MAX
#undef  LONG_MIN
#undef  LONG_MAX
#undef  ULONG_MAX

#undef  CHAR_BIT
#undef  CHAR_MIN
#undef  CHAR_MAX

/* C90/99 5.2.4.2.1 */
#define SCHAR_MAX __SCHAR_MAX__
#define SHRT_MAX  __SHRT_MAX__
#define INT_MAX   __INT_MAX__
#define LONG_MAX  __LONG_MAX__

#define SCHAR_MIN (-__SCHAR_MAX__-1)
#define SHRT_MIN  (-__SHRT_MAX__ -1)
#define INT_MIN   (-__INT_MAX__  -1)
#define LONG_MIN  (-__LONG_MAX__ -1L)

#define UCHAR_MAX (__SCHAR_MAX__*2  +1)
#if __SHRT_WIDTH__ < __INT_WIDTH__
#define USHRT_MAX (__SHRT_MAX__ * 2 + 1)
#else
#define USHRT_MAX (__SHRT_MAX__ * 2U + 1U)
#endif
#define UINT_MAX  (__INT_MAX__  *2U +1U)
#define ULONG_MAX (__LONG_MAX__ *2UL+1UL)

#ifndef MB_LEN_MAX
#define MB_LEN_MAX 1
#endif

#define CHAR_BIT  __CHAR_BIT__

/* C23 5.2.4.2.1 */
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
#define BOOL_WIDTH   __BOOL_WIDTH__
#define CHAR_WIDTH   CHAR_BIT
#define SCHAR_WIDTH  CHAR_BIT
#define UCHAR_WIDTH  CHAR_BIT
#define USHRT_WIDTH  __SHRT_WIDTH__
#define SHRT_WIDTH   __SHRT_WIDTH__
#define UINT_WIDTH   __INT_WIDTH__
#define INT_WIDTH    __INT_WIDTH__
#define ULONG_WIDTH  __LONG_WIDTH__
#define LONG_WIDTH   __LONG_WIDTH__
#define ULLONG_WIDTH __LLONG_WIDTH__
#define LLONG_WIDTH  __LLONG_WIDTH__

#define BITINT_MAXWIDTH __BITINT_MAXWIDTH__
#endif

#ifdef __CHAR_UNSIGNED__  /* -funsigned-char */
#define CHAR_MIN 0
#define CHAR_MAX UCHAR_MAX
#else
#define CHAR_MIN SCHAR_MIN
#define CHAR_MAX __SCHAR_MAX__
#endif

/* C99 5.2.4.2.1: Added long long.
   C++11 18.3.3.2: same contents as the Standard C Library header <limits.h>.
 */
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 199901L) ||              \\
    (defined(__cplusplus) && __cplusplus >= 201103L)

#undef  LLONG_MIN
#undef  LLONG_MAX
#undef  ULLONG_MAX

#define LLONG_MAX  __LONG_LONG_MAX__
#define LLONG_MIN  (-__LONG_LONG_MAX__-1LL)
#define ULLONG_MAX (__LONG_LONG_MAX__*2ULL+1ULL)
#endif

/* LONG_LONG_MIN/LONG_LONG_MAX/ULONG_LONG_MAX are a GNU extension. Android's
   bionic also defines them. It's too bad that we don't have something like
   #pragma poison that could be used to deprecate a macro - the code should just
   use LLONG_MAX and friends.
 */
#if (defined(__GNU_LIBRARY__) ? defined(__USE_GNU)                             \\
                              : !defined(__STRICT_ANSI__)) ||                  \\
    defined(__BIONIC__)

#undef   LONG_LONG_MIN
#undef   LONG_LONG_MAX
#undef   ULONG_LONG_MAX

#define LONG_LONG_MAX  __LONG_LONG_MAX__
#define LONG_LONG_MIN  (-__LONG_LONG_MAX__-1LL)
#define ULONG_LONG_MAX (__LONG_LONG_MAX__*2ULL+1ULL)
#endif

#endif /* __MVS__ */
#endif /* __CLANG_LIMITS_H */
`,"stdalign.h":`/*===---- stdalign.h - Standard header for alignment ------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDALIGN_H
#define __STDALIGN_H

#if defined(__cplusplus) ||                                                    \\
    (defined(__STDC_VERSION__) && __STDC_VERSION__ < 202311L)
#ifndef __cplusplus
#define alignas _Alignas
#define alignof _Alignof
#endif

#define __alignas_is_defined 1
#define __alignof_is_defined 1
#endif /* __STDC_VERSION__ */

#endif /* __STDALIGN_H */
`,"stdarg.h":`/*===---- stdarg.h - Variable argument handling ----------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * This header is designed to be included multiple times. If any of the __need_
 * macros are defined, then only that subset of interfaces are provided. This
 * can be useful for POSIX headers that need to not expose all of stdarg.h, but
 * need to use some of its interfaces. Otherwise this header provides all of
 * the expected interfaces.
 *
 * When clang modules are enabled, this header is a textual header to support
 * the multiple include behavior. As such, it doesn't directly declare anything
 * so that it doesn't add duplicate declarations to all of its includers'
 * modules.
 */
#if defined(__MVS__) && __has_include_next(<stdarg.h>)
#undef __need___va_list
#undef __need_va_list
#undef __need_va_arg
#undef __need___va_copy
#undef __need_va_copy
#include <__stdarg_header_macro.h>
#include_next <stdarg.h>

#else
#if !defined(__need___va_list) && !defined(__need_va_list) &&                  \\
    !defined(__need_va_arg) && !defined(__need___va_copy) &&                   \\
    !defined(__need_va_copy)
#define __need___va_list
#define __need_va_list
#define __need_va_arg
#define __need___va_copy
/* GCC always defines __va_copy, but does not define va_copy unless in c99 mode
 * or -ansi is not specified, since it was not part of C90.
 */
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 199901L) ||              \\
    (defined(__cplusplus) && __cplusplus >= 201103L) ||                        \\
    !defined(__STRICT_ANSI__)
#define __need_va_copy
#endif
#include <__stdarg_header_macro.h>
#endif

#ifdef __need___va_list
#include <__stdarg___gnuc_va_list.h>
#undef __need___va_list
#endif /* defined(__need___va_list) */

#ifdef __need_va_list
#include <__stdarg_va_list.h>
#undef __need_va_list
#endif /* defined(__need_va_list) */

#ifdef __need_va_arg
#include <__stdarg_va_arg.h>
#undef __need_va_arg
#endif /* defined(__need_va_arg) */

#ifdef __need___va_copy
#include <__stdarg___va_copy.h>
#undef __need___va_copy
#endif /* defined(__need___va_copy) */

#ifdef __need_va_copy
#include <__stdarg_va_copy.h>
#undef __need_va_copy
#endif /* defined(__need_va_copy) */

#endif /* __MVS__ */
`,"__stdarg___gnuc_va_list.h":`/*===---- __stdarg___gnuc_va_list.h - Definition of __gnuc_va_list ---------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __GNUC_VA_LIST
#define __GNUC_VA_LIST
typedef __builtin_va_list __gnuc_va_list;
#endif
`,"__stdarg___va_copy.h":`/*===---- __stdarg___va_copy.h - Definition of __va_copy -------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __va_copy
#define __va_copy(d, s) __builtin_va_copy(d, s)
#endif
`,"__stdarg_header_macro.h":`/*===---- __stdarg_header_macro.h ------------------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDARG_H
#define __STDARG_H
#endif
`,"__stdarg_va_arg.h":`/*===---- __stdarg_va_arg.h - Definitions of va_start, va_arg, va_end-------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef va_arg

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
/* C23 uses a special builtin. */
#define va_start(...) __builtin_c23_va_start(__VA_ARGS__)
#else
/* Versions before C23 do require the second parameter. */
#define va_start(ap, param) __builtin_va_start(ap, param)
#endif
#define va_end(ap) __builtin_va_end(ap)
#define va_arg(ap, type) __builtin_va_arg(ap, type)

#endif
`,"__stdarg_va_copy.h":`/*===---- __stdarg_va_copy.h - Definition of va_copy------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef va_copy
#define va_copy(dest, src) __builtin_va_copy(dest, src)
#endif
`,"__stdarg_va_list.h":`/*===---- __stdarg_va_list.h - Definition of va_list -----------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef _VA_LIST
#define _VA_LIST
typedef __builtin_va_list va_list;
#endif
`,"stdatomic.h":`/*===---- stdatomic.h - Standard header for atomic types and operations -----===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __CLANG_STDATOMIC_H
#define __CLANG_STDATOMIC_H

/* If we're hosted, fall back to the system's stdatomic.h. FreeBSD, for
 * example, already has a Clang-compatible stdatomic.h header.
 *
 * Exclude the MSVC path as well as the MSVC header as of the 14.31.30818
 * explicitly disallows \`stdatomic.h\` in the C mode via an \`#error\`.  Fallback
 * to the clang resource header until that is fully supported.  The
 * \`stdatomic.h\` header requires C++23 or newer.
 */
#if __STDC_HOSTED__ &&                                                         \\
    __has_include_next(<stdatomic.h>) &&                                       \\
    (!defined(_MSC_VER) || (defined(__cplusplus) && __cplusplus >= 202002L))
# include_next <stdatomic.h>
#else

#include <stddef.h>
#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

/* 7.17.1 Introduction */

#define ATOMIC_BOOL_LOCK_FREE       __CLANG_ATOMIC_BOOL_LOCK_FREE
#define ATOMIC_CHAR_LOCK_FREE       __CLANG_ATOMIC_CHAR_LOCK_FREE
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
#define ATOMIC_CHAR8_T_LOCK_FREE    __CLANG_ATOMIC_CHAR8_T_LOCK_FREE
#endif
#define ATOMIC_CHAR16_T_LOCK_FREE   __CLANG_ATOMIC_CHAR16_T_LOCK_FREE
#define ATOMIC_CHAR32_T_LOCK_FREE   __CLANG_ATOMIC_CHAR32_T_LOCK_FREE
#define ATOMIC_WCHAR_T_LOCK_FREE    __CLANG_ATOMIC_WCHAR_T_LOCK_FREE
#define ATOMIC_SHORT_LOCK_FREE      __CLANG_ATOMIC_SHORT_LOCK_FREE
#define ATOMIC_INT_LOCK_FREE        __CLANG_ATOMIC_INT_LOCK_FREE
#define ATOMIC_LONG_LOCK_FREE       __CLANG_ATOMIC_LONG_LOCK_FREE
#define ATOMIC_LLONG_LOCK_FREE      __CLANG_ATOMIC_LLONG_LOCK_FREE
#define ATOMIC_POINTER_LOCK_FREE    __CLANG_ATOMIC_POINTER_LOCK_FREE

/* 7.17.2 Initialization */
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ < 202311L) ||               \\
    defined(__cplusplus)
/* ATOMIC_VAR_INIT was removed in C23, but still remains in C++23. */
#define ATOMIC_VAR_INIT(value) (value)
#endif

#if ((defined(__STDC_VERSION__) && __STDC_VERSION__ >= 201710L &&              \\
      __STDC_VERSION__ < 202311L) ||                                           \\
     (defined(__cplusplus) && __cplusplus >= 202002L)) &&                      \\
    !defined(_CLANG_DISABLE_CRT_DEPRECATION_WARNINGS)
/* ATOMIC_VAR_INIT was deprecated in C17 and C++20. */
#pragma clang deprecated(ATOMIC_VAR_INIT)
#endif
#define atomic_init __c11_atomic_init

/* 7.17.3 Order and consistency */

typedef enum memory_order {
  memory_order_relaxed = __ATOMIC_RELAXED,
  memory_order_consume = __ATOMIC_CONSUME,
  memory_order_acquire = __ATOMIC_ACQUIRE,
  memory_order_release = __ATOMIC_RELEASE,
  memory_order_acq_rel = __ATOMIC_ACQ_REL,
  memory_order_seq_cst = __ATOMIC_SEQ_CST
} memory_order;

#define kill_dependency(y) (y)

/* 7.17.4 Fences */

/* These should be provided by the libc implementation. */
void atomic_thread_fence(memory_order);
void atomic_signal_fence(memory_order);

#define atomic_thread_fence(order) __c11_atomic_thread_fence(order)
#define atomic_signal_fence(order) __c11_atomic_signal_fence(order)

/* 7.17.5 Lock-free property */

#define atomic_is_lock_free(obj) __c11_atomic_is_lock_free(sizeof(*(obj)))

/* 7.17.6 Atomic integer types */

#ifdef __cplusplus
typedef _Atomic(bool)               atomic_bool;
#else
typedef _Atomic(_Bool)              atomic_bool;
#endif
typedef _Atomic(char)               atomic_char;
typedef _Atomic(signed char)        atomic_schar;
typedef _Atomic(unsigned char)      atomic_uchar;
typedef _Atomic(short)              atomic_short;
typedef _Atomic(unsigned short)     atomic_ushort;
typedef _Atomic(int)                atomic_int;
typedef _Atomic(unsigned int)       atomic_uint;
typedef _Atomic(long)               atomic_long;
typedef _Atomic(unsigned long)      atomic_ulong;
typedef _Atomic(long long)          atomic_llong;
typedef _Atomic(unsigned long long) atomic_ullong;
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
typedef _Atomic(unsigned char)      atomic_char8_t;
#endif
typedef _Atomic(uint_least16_t)     atomic_char16_t;
typedef _Atomic(uint_least32_t)     atomic_char32_t;
typedef _Atomic(wchar_t)            atomic_wchar_t;
typedef _Atomic(int_least8_t)       atomic_int_least8_t;
typedef _Atomic(uint_least8_t)      atomic_uint_least8_t;
typedef _Atomic(int_least16_t)      atomic_int_least16_t;
typedef _Atomic(uint_least16_t)     atomic_uint_least16_t;
typedef _Atomic(int_least32_t)      atomic_int_least32_t;
typedef _Atomic(uint_least32_t)     atomic_uint_least32_t;
typedef _Atomic(int_least64_t)      atomic_int_least64_t;
typedef _Atomic(uint_least64_t)     atomic_uint_least64_t;
typedef _Atomic(int_fast8_t)        atomic_int_fast8_t;
typedef _Atomic(uint_fast8_t)       atomic_uint_fast8_t;
typedef _Atomic(int_fast16_t)       atomic_int_fast16_t;
typedef _Atomic(uint_fast16_t)      atomic_uint_fast16_t;
typedef _Atomic(int_fast32_t)       atomic_int_fast32_t;
typedef _Atomic(uint_fast32_t)      atomic_uint_fast32_t;
typedef _Atomic(int_fast64_t)       atomic_int_fast64_t;
typedef _Atomic(uint_fast64_t)      atomic_uint_fast64_t;
typedef _Atomic(intptr_t)           atomic_intptr_t;
typedef _Atomic(uintptr_t)          atomic_uintptr_t;
typedef _Atomic(size_t)             atomic_size_t;
typedef _Atomic(ptrdiff_t)          atomic_ptrdiff_t;
typedef _Atomic(intmax_t)           atomic_intmax_t;
typedef _Atomic(uintmax_t)          atomic_uintmax_t;

/* 7.17.7 Operations on atomic types */

#define atomic_store(object, desired) __c11_atomic_store(object, desired, __ATOMIC_SEQ_CST)
#define atomic_store_explicit __c11_atomic_store

#define atomic_load(object) __c11_atomic_load(object, __ATOMIC_SEQ_CST)
#define atomic_load_explicit __c11_atomic_load

#define atomic_exchange(object, desired) __c11_atomic_exchange(object, desired, __ATOMIC_SEQ_CST)
#define atomic_exchange_explicit __c11_atomic_exchange

#define atomic_compare_exchange_strong(object, expected, desired) __c11_atomic_compare_exchange_strong(object, expected, desired, __ATOMIC_SEQ_CST, __ATOMIC_SEQ_CST)
#define atomic_compare_exchange_strong_explicit __c11_atomic_compare_exchange_strong

#define atomic_compare_exchange_weak(object, expected, desired) __c11_atomic_compare_exchange_weak(object, expected, desired, __ATOMIC_SEQ_CST, __ATOMIC_SEQ_CST)
#define atomic_compare_exchange_weak_explicit __c11_atomic_compare_exchange_weak

#define atomic_fetch_add(object, operand) __c11_atomic_fetch_add(object, operand, __ATOMIC_SEQ_CST)
#define atomic_fetch_add_explicit __c11_atomic_fetch_add

#define atomic_fetch_sub(object, operand) __c11_atomic_fetch_sub(object, operand, __ATOMIC_SEQ_CST)
#define atomic_fetch_sub_explicit __c11_atomic_fetch_sub

#define atomic_fetch_or(object, operand) __c11_atomic_fetch_or(object, operand, __ATOMIC_SEQ_CST)
#define atomic_fetch_or_explicit __c11_atomic_fetch_or

#define atomic_fetch_xor(object, operand) __c11_atomic_fetch_xor(object, operand, __ATOMIC_SEQ_CST)
#define atomic_fetch_xor_explicit __c11_atomic_fetch_xor

#define atomic_fetch_and(object, operand) __c11_atomic_fetch_and(object, operand, __ATOMIC_SEQ_CST)
#define atomic_fetch_and_explicit __c11_atomic_fetch_and

/* 7.17.8 Atomic flag type and operations */

typedef struct atomic_flag { atomic_bool _Value; } atomic_flag;

#ifdef __cplusplus
#define ATOMIC_FLAG_INIT {false}
#else
#define ATOMIC_FLAG_INIT { 0 }
#endif

/* These should be provided by the libc implementation. */
#ifdef __cplusplus
bool atomic_flag_test_and_set(volatile atomic_flag *);
bool atomic_flag_test_and_set_explicit(volatile atomic_flag *, memory_order);
#else
_Bool atomic_flag_test_and_set(volatile atomic_flag *);
_Bool atomic_flag_test_and_set_explicit(volatile atomic_flag *, memory_order);
#endif
void atomic_flag_clear(volatile atomic_flag *);
void atomic_flag_clear_explicit(volatile atomic_flag *, memory_order);

#define atomic_flag_test_and_set(object) __c11_atomic_exchange(&(object)->_Value, 1, __ATOMIC_SEQ_CST)
#define atomic_flag_test_and_set_explicit(object, order) __c11_atomic_exchange(&(object)->_Value, 1, order)

#define atomic_flag_clear(object) __c11_atomic_store(&(object)->_Value, 0, __ATOMIC_SEQ_CST)
#define atomic_flag_clear_explicit(object, order) __c11_atomic_store(&(object)->_Value, 0, order)

#ifdef __cplusplus
}
#endif

#endif /* __STDC_HOSTED__ */
#endif /* __CLANG_STDATOMIC_H */

`,"stdbool.h":`/*===---- stdbool.h - Standard header for booleans -------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDBOOL_H
#define __STDBOOL_H

#define __bool_true_false_are_defined 1

#if defined(__MVS__) && __has_include_next(<stdbool.h>)
#include_next <stdbool.h>
#else

#if defined(__STDC_VERSION__) && __STDC_VERSION__ > 201710L
/* FIXME: We should be issuing a deprecation warning here, but cannot yet due
 * to system headers which include this header file unconditionally.
 */
#elif !defined(__cplusplus)
#define bool _Bool
#define true 1
#define false 0
#elif defined(__GNUC__) && !defined(__STRICT_ANSI__)
/* Define _Bool as a GNU extension. */
#define _Bool bool
#if defined(__cplusplus) && __cplusplus < 201103L
/* For C++98, define bool, false, true as a GNU extension. */
#define bool bool
#define false false
#define true true
#endif
#endif

#endif /* __MVS__ */
#endif /* __STDBOOL_H */
`,"stdcountof.h":`/*===---- stdcountof.h - Standard header for countof -----------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDCOUNTOF_H
#define __STDCOUNTOF_H

#define countof _Countof

#endif /* __STDCOUNTOF_H */
`,"stdckdint.h":`/*===---- stdckdint.h - Standard header for checking integer----------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDCKDINT_H
#define __STDCKDINT_H

/* If we're hosted, fall back to the system's stdckdint.h. FreeBSD, for
 * example, already has a Clang-compatible stdckdint.h header.
 *
 * The \`stdckdint.h\` header requires C 23 or newer.
 */
#if __STDC_HOSTED__ && __has_include_next(<stdckdint.h>)
#include_next <stdckdint.h>
#else

/* C23 7.20.1 Defines several macros for performing checked integer arithmetic*/

#define __STDC_VERSION_STDCKDINT_H__ 202311L

// Both A and B shall be any integer type other than "plain" char, bool, a bit-
// precise integer type, or an enumerated type, and they need not be the same.

// R shall be a modifiable lvalue of any integer type other than "plain" char,
// bool, a bit-precise integer type, or an enumerated type. It shouldn't be
// short type, either. Otherwise, it may be unable to hold two the result of
// operating two 'int's.

// A diagnostic message will be produced if A or B are not suitable integer
// types, or if R is not a modifiable lvalue of a suitable integer type or R
// is short type.
#define ckd_add(R, A, B) __builtin_add_overflow((A), (B), (R))
#define ckd_sub(R, A, B) __builtin_sub_overflow((A), (B), (R))
#define ckd_mul(R, A, B) __builtin_mul_overflow((A), (B), (R))

#endif /* __STDC_HOSTED__ */
#endif /* __STDCKDINT_H */
`,"stddef.h":`/*===---- stddef.h - Basic type definitions --------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * This header is designed to be included multiple times. If any of the __need_
 * macros are defined, then only that subset of interfaces are provided. This
 * can be useful for POSIX headers that need to not expose all of stddef.h, but
 * need to use some of its interfaces. Otherwise this header provides all of
 * the expected interfaces.
 *
 * When clang modules are enabled, this header is a textual header to support
 * the multiple include behavior. As such, it doesn't directly declare anything
 * so that it doesn't add duplicate declarations to all of its includers'
 * modules.
 */
#if defined(__MVS__) && __has_include_next(<stddef.h>)
#undef __need_ptrdiff_t
#undef __need_size_t
#undef __need_rsize_t
#undef __need_wchar_t
#undef __need_NULL
#undef __need_nullptr_t
#undef __need_unreachable
#undef __need_max_align_t
#undef __need_offsetof
#undef __need_wint_t
#include <__stddef_header_macro.h>
#include_next <stddef.h>

#else

#if !defined(__need_ptrdiff_t) && !defined(__need_size_t) &&                   \\
    !defined(__need_rsize_t) && !defined(__need_wchar_t) &&                    \\
    !defined(__need_NULL) && !defined(__need_nullptr_t) &&                     \\
    !defined(__need_unreachable) && !defined(__need_max_align_t) &&            \\
    !defined(__need_offsetof) && !defined(__need_wint_t)
#define __need_ptrdiff_t
#define __need_size_t
/* ISO9899:2011 7.20 (C11 Annex K): Define rsize_t if __STDC_WANT_LIB_EXT1__ is
 * enabled. */
#if defined(__STDC_WANT_LIB_EXT1__) && __STDC_WANT_LIB_EXT1__ >= 1
#define __need_rsize_t
#endif
#define __need_wchar_t
#if !defined(__STDDEF_H) || __has_feature(modules)
/*
 * __stddef_null.h is special when building without modules: if __need_NULL is
 * set, then it will unconditionally redefine NULL. To avoid stepping on client
 * definitions of NULL, __need_NULL should only be set the first time this
 * header is included, that is when __STDDEF_H is not defined. However, when
 * building with modules, this header is a textual header and needs to
 * unconditionally include __stdef_null.h to support multiple submodules
 * exporting _Builtin_stddef.null. Take module SM with submodules A and B, whose
 * headers both include stddef.h When SM.A builds, __STDDEF_H will be defined.
 * When SM.B builds, the definition from SM.A will leak when building without
 * local submodule visibility. stddef.h wouldn't include __stddef_null.h, and
 * SM.B wouldn't import _Builtin_stddef.null, and SM.B's \`export *\` wouldn't
 * export NULL as expected. When building with modules, always include
 * __stddef_null.h so that everything works as expected.
 */
#define __need_NULL
#endif
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L) ||              \\
    defined(__cplusplus)
#define __need_nullptr_t
#endif
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
#define __need_unreachable
#endif
#if (defined(__STDC_VERSION__) && __STDC_VERSION__ >= 201112L) ||              \\
    (defined(__cplusplus) && __cplusplus >= 201103L)
#define __need_max_align_t
#endif
#define __need_offsetof
/* wint_t is provided by <wchar.h> and not <stddef.h>. It's here
 * for compatibility, but must be explicitly requested. Therefore
 * __need_wint_t is intentionally not defined here. */
#include <__stddef_header_macro.h>
#endif

#if defined(__need_ptrdiff_t)
#include <__stddef_ptrdiff_t.h>
#undef __need_ptrdiff_t
#endif /* defined(__need_ptrdiff_t) */

#if defined(__need_size_t)
#include <__stddef_size_t.h>
#undef __need_size_t
#endif /*defined(__need_size_t) */

#if defined(__need_rsize_t)
#include <__stddef_rsize_t.h>
#undef __need_rsize_t
#endif /* defined(__need_rsize_t) */

#if defined(__need_wchar_t)
#include <__stddef_wchar_t.h>
#undef __need_wchar_t
#endif /* defined(__need_wchar_t) */

#if defined(__need_NULL)
#include <__stddef_null.h>
#undef __need_NULL
#endif /* defined(__need_NULL) */

#if defined(__need_nullptr_t)
#include <__stddef_nullptr_t.h>
#undef __need_nullptr_t
#endif /* defined(__need_nullptr_t) */

#if defined(__need_unreachable)
#include <__stddef_unreachable.h>
#undef __need_unreachable
#endif /* defined(__need_unreachable) */

#if defined(__need_max_align_t)
#include <__stddef_max_align_t.h>
#undef __need_max_align_t
#endif /* defined(__need_max_align_t) */

#if defined(__need_offsetof)
#include <__stddef_offsetof.h>
#undef __need_offsetof
#endif /* defined(__need_offsetof) */

/* Some C libraries expect to see a wint_t here. Others (notably MinGW) will use
__WINT_TYPE__ directly; accommodate both by requiring __need_wint_t */
#if defined(__need_wint_t)
#include <__stddef_wint_t.h>
#undef __need_wint_t
#endif /* __need_wint_t */

#endif /* __MVS__ */
`,"stddefer.h":`/*===---- stddefer.h - Standard header for 'defer' -------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __CLANG_STDDEFER_H
#define __CLANG_STDDEFER_H

/* Provide 'defer' if '_Defer' is supported. */
#ifdef __STDC_DEFER_TS25755__
#define __STDC_VERSION_STDDEFER_H__ 202602L
#define defer _Defer
#endif

#endif /* __CLANG_STDDEFER_H */
`,"__stddef_header_macro.h":`/*===---- __stddef_header_macro.h ------------------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDDEF_H
#define __STDDEF_H
#endif
`,"__stddef_max_align_t.h":`/*===---- __stddef_max_align_t.h - Definition of max_align_t ---------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __CLANG_MAX_ALIGN_T_DEFINED
#define __CLANG_MAX_ALIGN_T_DEFINED

#if defined(_MSC_VER)
typedef double max_align_t;
#elif defined(__APPLE__)
typedef long double max_align_t;
#else
// Define 'max_align_t' to match the GCC definition.
typedef struct {
  long long __clang_max_align_nonce1
      __attribute__((__aligned__(__alignof__(long long))));
  long double __clang_max_align_nonce2
      __attribute__((__aligned__(__alignof__(long double))));
} max_align_t;
#endif

#endif
`,"__stddef_null.h":`/*===---- __stddef_null.h - Definition of NULL -----------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#if !defined(NULL) || !__building_module(_Builtin_stddef)

/* linux/stddef.h will define NULL to 0. glibc (and other) headers then define
 * __need_NULL and rely on stddef.h to redefine NULL to the correct value again.
 * Modules don't support redefining macros like that, but support that pattern
 * in the non-modules case.
 */
#undef NULL

#ifdef __cplusplus
#if !defined(__MINGW32__) && !defined(_MSC_VER)
#define NULL __null
#else
#define NULL 0
#endif
#else
#define NULL ((void*)0)
#endif

#endif
`,"__stddef_nullptr_t.h":`/*===---- __stddef_nullptr_t.h - Definition of nullptr_t -------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(_NULLPTR_T) ||                                                    \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define _NULLPTR_T

#ifdef __cplusplus
#if defined(_MSC_EXTENSIONS) && defined(_NATIVE_NULLPTR_SUPPORTED)
namespace std {
typedef decltype(nullptr) nullptr_t;
}
using ::std::nullptr_t;
#endif
#elif defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
typedef typeof(nullptr) nullptr_t;
#endif

#endif
`,"__stddef_offsetof.h":`/*===---- __stddef_offsetof.h - Definition of offsetof ---------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(offsetof) ||                                                      \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define offsetof(t, d) __builtin_offsetof(t, d)
#endif
`,"__stddef_ptrdiff_t.h":`/*===---- __stddef_ptrdiff_t.h - Definition of ptrdiff_t -------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(_PTRDIFF_T) ||                                                    \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define _PTRDIFF_T

typedef __PTRDIFF_TYPE__ ptrdiff_t;

#endif
`,"__stddef_rsize_t.h":`/*===---- __stddef_rsize_t.h - Definition of rsize_t -----------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(_RSIZE_T) ||                                                      \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define _RSIZE_T

typedef __SIZE_TYPE__ rsize_t;

#endif
`,"__stddef_size_t.h":`/*===---- __stddef_size_t.h - Definition of size_t -------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(_SIZE_T) ||                                                       \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define _SIZE_T

typedef __SIZE_TYPE__ size_t;

#endif
`,"__stddef_unreachable.h":`/*===---- __stddef_unreachable.h - Definition of unreachable ---------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __cplusplus

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(unreachable) ||                                                   \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define unreachable() __builtin_unreachable()
#endif

#endif
`,"__stddef_wchar_t.h":`/*===---- __stddef_wchar.h - Definition of wchar_t -------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#if !defined(__cplusplus) || (defined(_MSC_VER) && !_NATIVE_WCHAR_T_DEFINED)

/*
 * When -fbuiltin-headers-in-system-modules is set this is a non-modular header
 * and needs to behave as if it was textual.
 */
#if !defined(_WCHAR_T) ||                                                      \\
    (__has_feature(modules) && !__building_module(_Builtin_stddef))
#define _WCHAR_T

#ifdef _MSC_EXTENSIONS
#define _WCHAR_T_DEFINED
#endif

typedef __WCHAR_TYPE__ wchar_t;

#endif

#endif
`,"__stddef_wint_t.h":`/*===---- __stddef_wint.h - Definition of wint_t ---------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef _WINT_T
#define _WINT_T

typedef __WINT_TYPE__ wint_t;

#endif
`,"stdint.h":`/*===---- stdint.h - Standard header for sized integer types --------------===*\\
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
\\*===----------------------------------------------------------------------===*/

#ifndef __CLANG_STDINT_H
// AIX system headers need stdint.h to be re-enterable while _STD_TYPES_T
// is defined until an inclusion of it without _STD_TYPES_T occurs, in which
// case the header guard macro is defined.
#if !defined(_AIX) || !defined(_STD_TYPES_T) || !defined(__STDC_HOSTED__)
#define __CLANG_STDINT_H
#endif

#if defined(__MVS__) && __has_include_next(<stdint.h>)
#include_next <stdint.h>
#else

/* If we're hosted, fall back to the system's stdint.h, which might have
 * additional definitions.
 */
#if __STDC_HOSTED__ && __has_include_next(<stdint.h>)

// C99 7.18.3 Limits of other integer types
//
//  Footnote 219, 220: C++ implementations should define these macros only when
//  __STDC_LIMIT_MACROS is defined before <stdint.h> is included.
//
//  Footnote 222: C++ implementations should define these macros only when
//  __STDC_CONSTANT_MACROS is defined before <stdint.h> is included.
//
// C++11 [cstdint.syn]p2:
//
//  The macros defined by <cstdint> are provided unconditionally. In particular,
//  the symbols __STDC_LIMIT_MACROS and __STDC_CONSTANT_MACROS (mentioned in
//  footnotes 219, 220, and 222 in the C standard) play no role in C++.
//
// C11 removed the problematic footnotes.
//
// Work around this inconsistency by always defining those macros in C++ mode,
// so that a C library implementation which follows the C99 standard can be
// used in C++.
# ifdef __cplusplus
#  if !defined(__STDC_LIMIT_MACROS)
#   define __STDC_LIMIT_MACROS
#   define __STDC_LIMIT_MACROS_DEFINED_BY_CLANG
#  endif
#  if !defined(__STDC_CONSTANT_MACROS)
#   define __STDC_CONSTANT_MACROS
#   define __STDC_CONSTANT_MACROS_DEFINED_BY_CLANG
#  endif
# endif

# include_next <stdint.h>

# ifdef __STDC_LIMIT_MACROS_DEFINED_BY_CLANG
#  undef __STDC_LIMIT_MACROS
#  undef __STDC_LIMIT_MACROS_DEFINED_BY_CLANG
# endif
# ifdef __STDC_CONSTANT_MACROS_DEFINED_BY_CLANG
#  undef __STDC_CONSTANT_MACROS
#  undef __STDC_CONSTANT_MACROS_DEFINED_BY_CLANG
# endif

#else

/* C99 7.18.1.1 Exact-width integer types.
 * C99 7.18.1.2 Minimum-width integer types.
 * C99 7.18.1.3 Fastest minimum-width integer types.
 *
 * The standard requires that exact-width type be defined for 8-, 16-, 32-, and
 * 64-bit types if they are implemented. Other exact width types are optional.
 * This implementation defines an exact-width types for every integer width
 * that is represented in the standard integer types.
 *
 * The standard also requires minimum-width types be defined for 8-, 16-, 32-,
 * and 64-bit widths regardless of whether there are corresponding exact-width
 * types.
 *
 * To accommodate targets that are missing types that are exactly 8, 16, 32, or
 * 64 bits wide, this implementation takes an approach of cascading
 * redefinitions, redefining __int_leastN_t to successively smaller exact-width
 * types. It is therefore important that the types are defined in order of
 * descending widths.
 *
 * We currently assume that the minimum-width types and the fastest
 * minimum-width types are the same. This is allowed by the standard, but is
 * suboptimal.
 *
 * In violation of the standard, some targets do not implement a type that is
 * wide enough to represent all of the required widths (8-, 16-, 32-, 64-bit).
 * To accommodate these targets, a required minimum-width type is only
 * defined if there exists an exact-width type of equal or greater width.
 */

#ifdef __INT64_TYPE__
# ifndef __int8_t_defined /* glibc sys/types.h also defines int64_t*/
typedef __INT64_TYPE__ int64_t;
# endif /* __int8_t_defined */
typedef __UINT64_TYPE__ uint64_t;
# undef __int_least64_t
# define __int_least64_t int64_t
# undef __uint_least64_t
# define __uint_least64_t uint64_t
# undef __int_least32_t
# define __int_least32_t int64_t
# undef __uint_least32_t
# define __uint_least32_t uint64_t
# undef __int_least16_t
# define __int_least16_t int64_t
# undef __uint_least16_t
# define __uint_least16_t uint64_t
# undef __int_least8_t
# define __int_least8_t int64_t
# undef __uint_least8_t
# define __uint_least8_t uint64_t
#endif /* __INT64_TYPE__ */

#ifdef __int_least64_t
typedef __int_least64_t int_least64_t;
typedef __uint_least64_t uint_least64_t;
typedef __int_least64_t int_fast64_t;
typedef __uint_least64_t uint_fast64_t;
#endif /* __int_least64_t */

#ifdef __INT56_TYPE__
typedef __INT56_TYPE__ int56_t;
typedef __UINT56_TYPE__ uint56_t;
typedef int56_t int_least56_t;
typedef uint56_t uint_least56_t;
typedef int56_t int_fast56_t;
typedef uint56_t uint_fast56_t;
# undef __int_least32_t
# define __int_least32_t int56_t
# undef __uint_least32_t
# define __uint_least32_t uint56_t
# undef __int_least16_t
# define __int_least16_t int56_t
# undef __uint_least16_t
# define __uint_least16_t uint56_t
# undef __int_least8_t
# define __int_least8_t int56_t
# undef __uint_least8_t
# define __uint_least8_t uint56_t
#endif /* __INT56_TYPE__ */


#ifdef __INT48_TYPE__
typedef __INT48_TYPE__ int48_t;
typedef __UINT48_TYPE__ uint48_t;
typedef int48_t int_least48_t;
typedef uint48_t uint_least48_t;
typedef int48_t int_fast48_t;
typedef uint48_t uint_fast48_t;
# undef __int_least32_t
# define __int_least32_t int48_t
# undef __uint_least32_t
# define __uint_least32_t uint48_t
# undef __int_least16_t
# define __int_least16_t int48_t
# undef __uint_least16_t
# define __uint_least16_t uint48_t
# undef __int_least8_t
# define __int_least8_t int48_t
# undef __uint_least8_t
# define __uint_least8_t uint48_t
#endif /* __INT48_TYPE__ */


#ifdef __INT40_TYPE__
typedef __INT40_TYPE__ int40_t;
typedef __UINT40_TYPE__ uint40_t;
typedef int40_t int_least40_t;
typedef uint40_t uint_least40_t;
typedef int40_t int_fast40_t;
typedef uint40_t uint_fast40_t;
# undef __int_least32_t
# define __int_least32_t int40_t
# undef __uint_least32_t
# define __uint_least32_t uint40_t
# undef __int_least16_t
# define __int_least16_t int40_t
# undef __uint_least16_t
# define __uint_least16_t uint40_t
# undef __int_least8_t
# define __int_least8_t int40_t
# undef __uint_least8_t
# define __uint_least8_t uint40_t
#endif /* __INT40_TYPE__ */


#ifdef __INT32_TYPE__

# ifndef __int8_t_defined /* glibc sys/types.h also defines int32_t*/
typedef __INT32_TYPE__ int32_t;
# endif /* __int8_t_defined */

# ifndef __uint32_t_defined  /* more glibc compatibility */
# define __uint32_t_defined
typedef __UINT32_TYPE__ uint32_t;
# endif /* __uint32_t_defined */

# undef __int_least32_t
# define __int_least32_t int32_t
# undef __uint_least32_t
# define __uint_least32_t uint32_t
# undef __int_least16_t
# define __int_least16_t int32_t
# undef __uint_least16_t
# define __uint_least16_t uint32_t
# undef __int_least8_t
# define __int_least8_t int32_t
# undef __uint_least8_t
# define __uint_least8_t uint32_t
#endif /* __INT32_TYPE__ */

#ifdef __int_least32_t
typedef __int_least32_t int_least32_t;
typedef __uint_least32_t uint_least32_t;
typedef __int_least32_t int_fast32_t;
typedef __uint_least32_t uint_fast32_t;
#endif /* __int_least32_t */

#ifdef __INT24_TYPE__
typedef __INT24_TYPE__ int24_t;
typedef __UINT24_TYPE__ uint24_t;
typedef int24_t int_least24_t;
typedef uint24_t uint_least24_t;
typedef int24_t int_fast24_t;
typedef uint24_t uint_fast24_t;
# undef __int_least16_t
# define __int_least16_t int24_t
# undef __uint_least16_t
# define __uint_least16_t uint24_t
# undef __int_least8_t
# define __int_least8_t int24_t
# undef __uint_least8_t
# define __uint_least8_t uint24_t
#endif /* __INT24_TYPE__ */

#ifdef __INT16_TYPE__
#ifndef __int8_t_defined /* glibc sys/types.h also defines int16_t*/
typedef __INT16_TYPE__ int16_t;
#endif /* __int8_t_defined */
typedef __UINT16_TYPE__ uint16_t;
# undef __int_least16_t
# define __int_least16_t int16_t
# undef __uint_least16_t
# define __uint_least16_t uint16_t
# undef __int_least8_t
# define __int_least8_t int16_t
# undef __uint_least8_t
# define __uint_least8_t uint16_t
#endif /* __INT16_TYPE__ */

#ifdef __int_least16_t
typedef __int_least16_t int_least16_t;
typedef __uint_least16_t uint_least16_t;
typedef __int_least16_t int_fast16_t;
typedef __uint_least16_t uint_fast16_t;
#endif /* __int_least16_t */


#ifdef __INT8_TYPE__
#ifndef __int8_t_defined  /* glibc sys/types.h also defines int8_t*/
typedef __INT8_TYPE__ int8_t;
#endif /* __int8_t_defined */
typedef __UINT8_TYPE__ uint8_t;
# undef __int_least8_t
# define __int_least8_t int8_t
# undef __uint_least8_t
# define __uint_least8_t uint8_t
#endif /* __INT8_TYPE__ */

#ifdef __int_least8_t
typedef __int_least8_t int_least8_t;
typedef __uint_least8_t uint_least8_t;
typedef __int_least8_t int_fast8_t;
typedef __uint_least8_t uint_fast8_t;
#endif /* __int_least8_t */

/* prevent glibc sys/types.h from defining conflicting types */
#ifndef __int8_t_defined
# define __int8_t_defined
#endif /* __int8_t_defined */

/* C99 7.18.1.4 Integer types capable of holding object pointers.
 */
#define __stdint_join3(a,b,c) a ## b ## c

#ifndef _INTPTR_T
#ifndef __intptr_t_defined
typedef __INTPTR_TYPE__ intptr_t;
#define __intptr_t_defined
#define _INTPTR_T
#endif
#endif

#ifndef _UINTPTR_T
typedef __UINTPTR_TYPE__ uintptr_t;
#define _UINTPTR_T
#endif

/* C99 7.18.1.5 Greatest-width integer types.
 */
typedef __INTMAX_TYPE__  intmax_t;
typedef __UINTMAX_TYPE__ uintmax_t;

/* C99 7.18.4 Macros for minimum-width integer constants.
 *
 * The standard requires that integer constant macros be defined for all the
 * minimum-width types defined above. As 8-, 16-, 32-, and 64-bit minimum-width
 * types are required, the corresponding integer constant macros are defined
 * here. This implementation also defines minimum-width types for every other
 * integer width that the target implements, so corresponding macros are
 * defined below, too.
 *
 * Note that C++ should not check __STDC_CONSTANT_MACROS here, contrary to the
 * claims of the C standard (see C++ 18.3.1p2, [cstdint.syn]).
 */

#ifdef __int_least64_t
#define INT64_C(v) __INT64_C(v)
#define UINT64_C(v) __UINT64_C(v)
#endif /* __int_least64_t */


#ifdef __INT56_TYPE__
#define INT56_C(v) __INT56_C(v)
#define UINT56_C(v) __UINT56_C(v)
#endif /* __INT56_TYPE__ */


#ifdef __INT48_TYPE__
#define INT48_C(v) __INT48_C(v)
#define UINT48_C(v) __UINT48_C(v)
#endif /* __INT48_TYPE__ */


#ifdef __INT40_TYPE__
#define INT40_C(v) __INT40_C(v)
#define UINT40_C(v) __UINT40_C(v)
#endif /* __INT40_TYPE__ */


#ifdef __int_least32_t
#define INT32_C(v) __INT32_C(v)
#define UINT32_C(v) __UINT32_C(v)
#endif /* __int_least32_t */


#ifdef __INT24_TYPE__
#define INT24_C(v) __INT24_C(v)
#define UINT24_C(v) __UINT24_C(v)
#endif /* __INT24_TYPE__ */


#ifdef __int_least16_t
#define INT16_C(v) __INT16_C(v)
#define UINT16_C(v) __UINT16_C(v)
#endif /* __int_least16_t */


#ifdef __int_least8_t
#define INT8_C(v) __INT8_C(v)
#define UINT8_C(v) __UINT8_C(v)
#endif /* __int_least8_t */


/* C99 7.18.2.1 Limits of exact-width integer types.
 * C99 7.18.2.2 Limits of minimum-width integer types.
 * C99 7.18.2.3 Limits of fastest minimum-width integer types.
 *
 * The presence of limit macros are completely optional in C99.  This
 * implementation defines limits for all of the types (exact- and
 * minimum-width) that it defines above, using the limits of the minimum-width
 * type for any types that do not have exact-width representations.
 *
 * As in the type definitions, this section takes an approach of
 * successive-shrinking to determine which limits to use for the standard (8,
 * 16, 32, 64) bit widths when they don't have exact representations. It is
 * therefore important that the definitions be kept in order of decending
 * widths.
 *
 * Note that C++ should not check __STDC_LIMIT_MACROS here, contrary to the
 * claims of the C standard (see C++ 18.3.1p2, [cstdint.syn]).
 */

#ifdef __INT64_TYPE__
# define INT64_MAX           INT64_C( 9223372036854775807)
# define INT64_MIN         (-INT64_C( 9223372036854775807)-1)
# define UINT64_MAX         UINT64_C(18446744073709551615)

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT64_WIDTH         64
# define INT64_WIDTH          UINT64_WIDTH

# define __UINT_LEAST64_WIDTH UINT64_WIDTH
# undef __UINT_LEAST32_WIDTH
# define __UINT_LEAST32_WIDTH UINT64_WIDTH
# undef __UINT_LEAST16_WIDTH
# define __UINT_LEAST16_WIDTH UINT64_WIDTH
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX UINT64_MAX
#endif /* __STDC_VERSION__ */

# define __INT_LEAST64_MIN   INT64_MIN
# define __INT_LEAST64_MAX   INT64_MAX
# define __UINT_LEAST64_MAX UINT64_MAX
# undef __INT_LEAST32_MIN
# define __INT_LEAST32_MIN   INT64_MIN
# undef __INT_LEAST32_MAX
# define __INT_LEAST32_MAX   INT64_MAX
# undef __UINT_LEAST32_MAX
# define __UINT_LEAST32_MAX UINT64_MAX
# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT64_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT64_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT64_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT64_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT64_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT64_MAX
#endif /* __INT64_TYPE__ */

#ifdef __INT_LEAST64_MIN
# define INT_LEAST64_MIN   __INT_LEAST64_MIN
# define INT_LEAST64_MAX   __INT_LEAST64_MAX
# define UINT_LEAST64_MAX __UINT_LEAST64_MAX
# define INT_FAST64_MIN    __INT_LEAST64_MIN
# define INT_FAST64_MAX    __INT_LEAST64_MAX
# define UINT_FAST64_MAX  __UINT_LEAST64_MAX

#if defined(__STDC_VERSION__) &&  __STDC_VERSION__ >= 202311L
# define UINT_LEAST64_WIDTH __UINT_LEAST64_WIDTH
# define INT_LEAST64_WIDTH  UINT_LEAST64_WIDTH
# define UINT_FAST64_WIDTH  __UINT_LEAST64_WIDTH
# define INT_FAST64_WIDTH   UINT_FAST64_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT_LEAST64_MIN */


#ifdef __INT56_TYPE__
# define INT56_MAX           INT56_C(36028797018963967)
# define INT56_MIN         (-INT56_C(36028797018963967)-1)
# define UINT56_MAX         UINT56_C(72057594037927935)
# define INT_LEAST56_MIN     INT56_MIN
# define INT_LEAST56_MAX     INT56_MAX
# define UINT_LEAST56_MAX   UINT56_MAX
# define INT_FAST56_MIN      INT56_MIN
# define INT_FAST56_MAX      INT56_MAX
# define UINT_FAST56_MAX    UINT56_MAX

# undef __INT_LEAST32_MIN
# define __INT_LEAST32_MIN   INT56_MIN
# undef __INT_LEAST32_MAX
# define __INT_LEAST32_MAX   INT56_MAX
# undef __UINT_LEAST32_MAX
# define __UINT_LEAST32_MAX UINT56_MAX
# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT56_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT56_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT56_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT56_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT56_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT56_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT56_WIDTH         56
# define INT56_WIDTH          UINT56_WIDTH
# define UINT_LEAST56_WIDTH   UINT56_WIDTH
# define INT_LEAST56_WIDTH    UINT_LEAST56_WIDTH
# define UINT_FAST56_WIDTH    UINT56_WIDTH
# define INT_FAST56_WIDTH     UINT_FAST56_WIDTH
# undef __UINT_LEAST32_WIDTH
# define __UINT_LEAST32_WIDTH UINT56_WIDTH
# undef __UINT_LEAST16_WIDTH
# define __UINT_LEAST16_WIDTH UINT56_WIDTH
# undef __UINT_LEAST8_WIDTH
# define __UINT_LEAST8_WIDTH  UINT56_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT56_TYPE__ */


#ifdef __INT48_TYPE__
# define INT48_MAX           INT48_C(140737488355327)
# define INT48_MIN         (-INT48_C(140737488355327)-1)
# define UINT48_MAX         UINT48_C(281474976710655)
# define INT_LEAST48_MIN     INT48_MIN
# define INT_LEAST48_MAX     INT48_MAX
# define UINT_LEAST48_MAX   UINT48_MAX
# define INT_FAST48_MIN      INT48_MIN
# define INT_FAST48_MAX      INT48_MAX
# define UINT_FAST48_MAX    UINT48_MAX

# undef __INT_LEAST32_MIN
# define __INT_LEAST32_MIN   INT48_MIN
# undef __INT_LEAST32_MAX
# define __INT_LEAST32_MAX   INT48_MAX
# undef __UINT_LEAST32_MAX
# define __UINT_LEAST32_MAX UINT48_MAX
# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT48_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT48_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT48_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT48_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT48_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT48_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
#define UINT48_WIDTH         48
#define INT48_WIDTH          UINT48_WIDTH
#define UINT_LEAST48_WIDTH   UINT48_WIDTH
#define INT_LEAST48_WIDTH    UINT_LEAST48_WIDTH
#define UINT_FAST48_WIDTH    UINT48_WIDTH
#define INT_FAST48_WIDTH     UINT_FAST48_WIDTH
#undef __UINT_LEAST32_WIDTH
#define __UINT_LEAST32_WIDTH UINT48_WIDTH
# undef __UINT_LEAST16_WIDTH
#define __UINT_LEAST16_WIDTH UINT48_WIDTH
# undef __UINT_LEAST8_WIDTH
#define __UINT_LEAST8_WIDTH  UINT48_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT48_TYPE__ */


#ifdef __INT40_TYPE__
# define INT40_MAX           INT40_C(549755813887)
# define INT40_MIN         (-INT40_C(549755813887)-1)
# define UINT40_MAX         UINT40_C(1099511627775)
# define INT_LEAST40_MIN     INT40_MIN
# define INT_LEAST40_MAX     INT40_MAX
# define UINT_LEAST40_MAX   UINT40_MAX
# define INT_FAST40_MIN      INT40_MIN
# define INT_FAST40_MAX      INT40_MAX
# define UINT_FAST40_MAX    UINT40_MAX

# undef __INT_LEAST32_MIN
# define __INT_LEAST32_MIN   INT40_MIN
# undef __INT_LEAST32_MAX
# define __INT_LEAST32_MAX   INT40_MAX
# undef __UINT_LEAST32_MAX
# define __UINT_LEAST32_MAX UINT40_MAX
# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT40_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT40_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT40_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT40_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT40_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT40_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT40_WIDTH         40
# define INT40_WIDTH          UINT40_WIDTH
# define UINT_LEAST40_WIDTH   UINT40_WIDTH
# define INT_LEAST40_WIDTH    UINT_LEAST40_WIDTH
# define UINT_FAST40_WIDTH    UINT40_WIDTH
# define INT_FAST40_WIDTH     UINT_FAST40_WIDTH
# undef __UINT_LEAST32_WIDTH
# define __UINT_LEAST32_WIDTH UINT40_WIDTH
# undef __UINT_LEAST16_WIDTH
# define __UINT_LEAST16_WIDTH UINT40_WIDTH
# undef __UINT_LEAST8_WIDTH
# define __UINT_LEAST8_WIDTH  UINT40_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT40_TYPE__ */


#ifdef __INT32_TYPE__
# define INT32_MAX           INT32_C(2147483647)
# define INT32_MIN         (-INT32_C(2147483647)-1)
# define UINT32_MAX         UINT32_C(4294967295)

# undef __INT_LEAST32_MIN
# define __INT_LEAST32_MIN   INT32_MIN
# undef __INT_LEAST32_MAX
# define __INT_LEAST32_MAX   INT32_MAX
# undef __UINT_LEAST32_MAX
# define __UINT_LEAST32_MAX UINT32_MAX
# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT32_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT32_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT32_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT32_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT32_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT32_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT32_WIDTH         32
# define INT32_WIDTH          UINT32_WIDTH
# undef __UINT_LEAST32_WIDTH
# define __UINT_LEAST32_WIDTH UINT32_WIDTH
# undef __UINT_LEAST16_WIDTH
# define __UINT_LEAST16_WIDTH UINT32_WIDTH
# undef __UINT_LEAST8_WIDTH
# define __UINT_LEAST8_WIDTH  UINT32_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT32_TYPE__ */

#ifdef __INT_LEAST32_MIN
# define INT_LEAST32_MIN   __INT_LEAST32_MIN
# define INT_LEAST32_MAX   __INT_LEAST32_MAX
# define UINT_LEAST32_MAX __UINT_LEAST32_MAX
# define INT_FAST32_MIN    __INT_LEAST32_MIN
# define INT_FAST32_MAX    __INT_LEAST32_MAX
# define UINT_FAST32_MAX  __UINT_LEAST32_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT_LEAST32_WIDTH __UINT_LEAST32_WIDTH
# define INT_LEAST32_WIDTH  UINT_LEAST32_WIDTH
# define UINT_FAST32_WIDTH  __UINT_LEAST32_WIDTH
# define INT_FAST32_WIDTH   UINT_FAST32_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT_LEAST32_MIN */


#ifdef __INT24_TYPE__
# define INT24_MAX           INT24_C(8388607)
# define INT24_MIN         (-INT24_C(8388607)-1)
# define UINT24_MAX         UINT24_C(16777215)
# define INT_LEAST24_MIN     INT24_MIN
# define INT_LEAST24_MAX     INT24_MAX
# define UINT_LEAST24_MAX   UINT24_MAX
# define INT_FAST24_MIN      INT24_MIN
# define INT_FAST24_MAX      INT24_MAX
# define UINT_FAST24_MAX    UINT24_MAX

# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT24_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT24_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT24_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT24_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT24_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT24_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT24_WIDTH         24
# define INT24_WIDTH          UINT24_WIDTH
# define UINT_LEAST24_WIDTH   UINT24_WIDTH
# define INT_LEAST24_WIDTH    UINT_LEAST24_WIDTH
# define UINT_FAST24_WIDTH    UINT24_WIDTH
# define INT_FAST24_WIDTH     UINT_FAST24_WIDTH
# undef __UINT_LEAST16_WIDTH
# define __UINT_LEAST16_WIDTH UINT24_WIDTH
# undef __UINT_LEAST8_WIDTH
# define __UINT_LEAST8_WIDTH  UINT24_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT24_TYPE__ */


#ifdef __INT16_TYPE__
#define INT16_MAX            INT16_C(32767)
#define INT16_MIN          (-INT16_C(32767)-1)
#define UINT16_MAX          UINT16_C(65535)

# undef __INT_LEAST16_MIN
# define __INT_LEAST16_MIN   INT16_MIN
# undef __INT_LEAST16_MAX
# define __INT_LEAST16_MAX   INT16_MAX
# undef __UINT_LEAST16_MAX
# define __UINT_LEAST16_MAX UINT16_MAX
# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT16_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT16_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT16_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT16_WIDTH         16
# define INT16_WIDTH          UINT16_WIDTH
# undef __UINT_LEAST16_WIDTH
# define __UINT_LEAST16_WIDTH UINT16_WIDTH
# undef __UINT_LEAST8_WIDTH
# define __UINT_LEAST8_WIDTH  UINT16_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT16_TYPE__ */

#ifdef __INT_LEAST16_MIN
# define INT_LEAST16_MIN   __INT_LEAST16_MIN
# define INT_LEAST16_MAX   __INT_LEAST16_MAX
# define UINT_LEAST16_MAX __UINT_LEAST16_MAX
# define INT_FAST16_MIN    __INT_LEAST16_MIN
# define INT_FAST16_MAX    __INT_LEAST16_MAX
# define UINT_FAST16_MAX  __UINT_LEAST16_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT_LEAST16_WIDTH __UINT_LEAST16_WIDTH
# define INT_LEAST16_WIDTH  UINT_LEAST16_WIDTH
# define UINT_FAST16_WIDTH  __UINT_LEAST16_WIDTH
# define INT_FAST16_WIDTH   UINT_FAST16_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT_LEAST16_MIN */


#ifdef __INT8_TYPE__
# define INT8_MAX            INT8_C(127)
# define INT8_MIN          (-INT8_C(127)-1)
# define UINT8_MAX          UINT8_C(255)

# undef __INT_LEAST8_MIN
# define __INT_LEAST8_MIN    INT8_MIN
# undef __INT_LEAST8_MAX
# define __INT_LEAST8_MAX    INT8_MAX
# undef __UINT_LEAST8_MAX
# define __UINT_LEAST8_MAX  UINT8_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT8_WIDTH         8
# define INT8_WIDTH          UINT8_WIDTH
# undef __UINT_LEAST8_WIDTH
# define __UINT_LEAST8_WIDTH UINT8_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT8_TYPE__ */

#ifdef __INT_LEAST8_MIN
# define INT_LEAST8_MIN   __INT_LEAST8_MIN
# define INT_LEAST8_MAX   __INT_LEAST8_MAX
# define UINT_LEAST8_MAX __UINT_LEAST8_MAX
# define INT_FAST8_MIN    __INT_LEAST8_MIN
# define INT_FAST8_MAX    __INT_LEAST8_MAX
# define UINT_FAST8_MAX  __UINT_LEAST8_MAX

#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
# define UINT_LEAST8_WIDTH __UINT_LEAST8_WIDTH
# define INT_LEAST8_WIDTH  UINT_LEAST8_WIDTH
# define UINT_FAST8_WIDTH  __UINT_LEAST8_WIDTH
# define INT_FAST8_WIDTH   UINT_FAST8_WIDTH
#endif /* __STDC_VERSION__ */
#endif /* __INT_LEAST8_MIN */

/* Some utility macros */
#define  __INTN_MIN(n)  __stdint_join3( INT, n, _MIN)
#define  __INTN_MAX(n)  __stdint_join3( INT, n, _MAX)
#define __UINTN_MAX(n)  __stdint_join3(UINT, n, _MAX)
#define  __INTN_C(n, v) __stdint_join3( INT, n, _C(v))
#define __UINTN_C(n, v) __stdint_join3(UINT, n, _C(v))

/* C99 7.18.2.4 Limits of integer types capable of holding object pointers. */
/* C99 7.18.3 Limits of other integer types. */

#define  INTPTR_MIN  (-__INTPTR_MAX__-1)
#define  INTPTR_MAX    __INTPTR_MAX__
#define UINTPTR_MAX   __UINTPTR_MAX__
#define PTRDIFF_MIN (-__PTRDIFF_MAX__-1)
#define PTRDIFF_MAX   __PTRDIFF_MAX__
#define    SIZE_MAX      __SIZE_MAX__

/* C23 7.22.2.4 Width of integer types capable of holding object pointers. */
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
/* NB: The C standard requires that these be the same value, but the compiler
   exposes separate internal width macros. */
#define INTPTR_WIDTH  __INTPTR_WIDTH__
#define UINTPTR_WIDTH __UINTPTR_WIDTH__
#endif

/* ISO9899:2011 7.20 (C11 Annex K): Define RSIZE_MAX if __STDC_WANT_LIB_EXT1__
 * is enabled. */
#if defined(__STDC_WANT_LIB_EXT1__) && __STDC_WANT_LIB_EXT1__ >= 1
#define   RSIZE_MAX            (SIZE_MAX >> 1)
#endif

/* C99 7.18.2.5 Limits of greatest-width integer types. */
#define  INTMAX_MIN (-__INTMAX_MAX__-1)
#define  INTMAX_MAX   __INTMAX_MAX__
#define UINTMAX_MAX  __UINTMAX_MAX__

/* C23 7.22.2.5 Width of greatest-width integer types. */
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
/* NB: The C standard requires that these be the same value, but the compiler
   exposes separate internal width macros. */
#define INTMAX_WIDTH __INTMAX_WIDTH__
#define UINTMAX_WIDTH __UINTMAX_WIDTH__
#endif

/* C99 7.18.3 Limits of other integer types. */
#define SIG_ATOMIC_MIN __INTN_MIN(__SIG_ATOMIC_WIDTH__)
#define SIG_ATOMIC_MAX __INTN_MAX(__SIG_ATOMIC_WIDTH__)
#ifdef __WINT_UNSIGNED__
# define WINT_MIN       __UINTN_C(__WINT_WIDTH__, 0)
# define WINT_MAX       __UINTN_MAX(__WINT_WIDTH__)
#else
# define WINT_MIN       __INTN_MIN(__WINT_WIDTH__)
# define WINT_MAX       __INTN_MAX(__WINT_WIDTH__)
#endif

#ifndef WCHAR_MAX
# define WCHAR_MAX __WCHAR_MAX__
#endif
#ifndef WCHAR_MIN
# if __WCHAR_MAX__ == __INTN_MAX(__WCHAR_WIDTH__)
#  define WCHAR_MIN __INTN_MIN(__WCHAR_WIDTH__)
# else
#  define WCHAR_MIN __UINTN_C(__WCHAR_WIDTH__, 0)
# endif
#endif

/* 7.18.4.2 Macros for greatest-width integer constants. */
#define  INTMAX_C(v) __INTMAX_C(v)
#define UINTMAX_C(v) __UINTMAX_C(v)

/* C23 7.22.3.x Width of other integer types. */
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 202311L
#define PTRDIFF_WIDTH    __PTRDIFF_WIDTH__
#define SIG_ATOMIC_WIDTH __SIG_ATOMIC_WIDTH__
#define SIZE_WIDTH       __SIZE_WIDTH__
#define WCHAR_WIDTH      __WCHAR_WIDTH__
#define WINT_WIDTH       __WINT_WIDTH__
#endif

#endif /* __STDC_HOSTED__ */
#endif /* __MVS__ */
#endif /* __CLANG_STDINT_H */
`,"stdnoreturn.h":`/*===---- stdnoreturn.h - Standard header for noreturn macro ---------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef __STDNORETURN_H
#define __STDNORETURN_H

#if defined(__MVS__) && __has_include_next(<stdnoreturn.h>)
#include_next <stdnoreturn.h>
#else

#define noreturn _Noreturn
#define __noreturn_is_defined 1

#endif /* __MVS__ */

#if (defined(__STDC_VERSION__) && __STDC_VERSION__ > 201710L) &&               \\
    !defined(_CLANG_DISABLE_CRT_DEPRECATION_WARNINGS)
/* The noreturn macro is deprecated in C23. We do not mark it as such because
   including the header file in C23 is also deprecated and we do not want to
   issue a confusing diagnostic for code which includes <stdnoreturn.h>
   followed by code that writes [[noreturn]]. The issue with such code is not
   with the attribute, or the use of 'noreturn', but the inclusion of the
   header. */
/* FIXME: We should be issuing a deprecation warning here, but cannot yet due
 * to system headers which include this header file unconditionally.
 */
#endif

#endif /* __STDNORETURN_H */
`,"tgmath.h":`/*===---- tgmath.h - Standard header for type generic math ----------------===*\\
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
\\*===----------------------------------------------------------------------===*/

#ifndef __CLANG_TGMATH_H
#define __CLANG_TGMATH_H

/* C99 7.22 Type-generic math <tgmath.h>. */
#include <math.h>

/*
 * Allow additional definitions and implementation-defined values on Apple
 * platforms. This is done after #include <math.h> to avoid depcycle conflicts
 * between libcxx and darwin in C++ modules builds.
 */
#if defined(__APPLE__) && __STDC_HOSTED__ && __has_include_next(<tgmath.h>)
#  include_next <tgmath.h>
#else

/* C++ handles type genericity with overloading in math.h. */
#ifndef __cplusplus
#include <complex.h>

#define _TG_ATTRSp __attribute__((__overloadable__))
#define _TG_ATTRS __attribute__((__overloadable__, __always_inline__))

// promotion

typedef void _Argument_type_is_not_arithmetic;
static _Argument_type_is_not_arithmetic __tg_promote(...)
  __attribute__((__unavailable__,__overloadable__));
static double               _TG_ATTRSp __tg_promote(int);
static double               _TG_ATTRSp __tg_promote(unsigned int);
static double               _TG_ATTRSp __tg_promote(long);
static double               _TG_ATTRSp __tg_promote(unsigned long);
static double               _TG_ATTRSp __tg_promote(long long);
static double               _TG_ATTRSp __tg_promote(unsigned long long);
static float                _TG_ATTRSp __tg_promote(float);
static double               _TG_ATTRSp __tg_promote(double);
static long double          _TG_ATTRSp __tg_promote(long double);
static float _Complex       _TG_ATTRSp __tg_promote(float _Complex);
static double _Complex      _TG_ATTRSp __tg_promote(double _Complex);
static long double _Complex _TG_ATTRSp __tg_promote(long double _Complex);

#define __tg_promote1(__x)           (__typeof__(__tg_promote(__x)))
#define __tg_promote2(__x, __y)      (__typeof__(__tg_promote(__x) + \\
                                                 __tg_promote(__y)))
#define __tg_promote3(__x, __y, __z) (__typeof__(__tg_promote(__x) + \\
                                                 __tg_promote(__y) + \\
                                                 __tg_promote(__z)))

// acos

static float
    _TG_ATTRS
    __tg_acos(float __x) {return acosf(__x);}

static double
    _TG_ATTRS
    __tg_acos(double __x) {return acos(__x);}

static long double
    _TG_ATTRS
    __tg_acos(long double __x) {return acosl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_acos(float _Complex __x) {return cacosf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_acos(double _Complex __x) {return cacos(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_acos(long double _Complex __x) {return cacosl(__x);}

#undef acos
#define acos(__x) __tg_acos(__tg_promote1((__x))(__x))

// asin

static float
    _TG_ATTRS
    __tg_asin(float __x) {return asinf(__x);}

static double
    _TG_ATTRS
    __tg_asin(double __x) {return asin(__x);}

static long double
    _TG_ATTRS
    __tg_asin(long double __x) {return asinl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_asin(float _Complex __x) {return casinf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_asin(double _Complex __x) {return casin(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_asin(long double _Complex __x) {return casinl(__x);}

#undef asin
#define asin(__x) __tg_asin(__tg_promote1((__x))(__x))

// atan

static float
    _TG_ATTRS
    __tg_atan(float __x) {return atanf(__x);}

static double
    _TG_ATTRS
    __tg_atan(double __x) {return atan(__x);}

static long double
    _TG_ATTRS
    __tg_atan(long double __x) {return atanl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_atan(float _Complex __x) {return catanf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_atan(double _Complex __x) {return catan(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_atan(long double _Complex __x) {return catanl(__x);}

#undef atan
#define atan(__x) __tg_atan(__tg_promote1((__x))(__x))

// acosh

static float
    _TG_ATTRS
    __tg_acosh(float __x) {return acoshf(__x);}

static double
    _TG_ATTRS
    __tg_acosh(double __x) {return acosh(__x);}

static long double
    _TG_ATTRS
    __tg_acosh(long double __x) {return acoshl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_acosh(float _Complex __x) {return cacoshf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_acosh(double _Complex __x) {return cacosh(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_acosh(long double _Complex __x) {return cacoshl(__x);}

#undef acosh
#define acosh(__x) __tg_acosh(__tg_promote1((__x))(__x))

// asinh

static float
    _TG_ATTRS
    __tg_asinh(float __x) {return asinhf(__x);}

static double
    _TG_ATTRS
    __tg_asinh(double __x) {return asinh(__x);}

static long double
    _TG_ATTRS
    __tg_asinh(long double __x) {return asinhl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_asinh(float _Complex __x) {return casinhf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_asinh(double _Complex __x) {return casinh(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_asinh(long double _Complex __x) {return casinhl(__x);}

#undef asinh
#define asinh(__x) __tg_asinh(__tg_promote1((__x))(__x))

// atanh

static float
    _TG_ATTRS
    __tg_atanh(float __x) {return atanhf(__x);}

static double
    _TG_ATTRS
    __tg_atanh(double __x) {return atanh(__x);}

static long double
    _TG_ATTRS
    __tg_atanh(long double __x) {return atanhl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_atanh(float _Complex __x) {return catanhf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_atanh(double _Complex __x) {return catanh(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_atanh(long double _Complex __x) {return catanhl(__x);}

#undef atanh
#define atanh(__x) __tg_atanh(__tg_promote1((__x))(__x))

// cos

static float
    _TG_ATTRS
    __tg_cos(float __x) {return cosf(__x);}

static double
    _TG_ATTRS
    __tg_cos(double __x) {return cos(__x);}

static long double
    _TG_ATTRS
    __tg_cos(long double __x) {return cosl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_cos(float _Complex __x) {return ccosf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_cos(double _Complex __x) {return ccos(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_cos(long double _Complex __x) {return ccosl(__x);}

#undef cos
#define cos(__x) __tg_cos(__tg_promote1((__x))(__x))

// sin

static float
    _TG_ATTRS
    __tg_sin(float __x) {return sinf(__x);}

static double
    _TG_ATTRS
    __tg_sin(double __x) {return sin(__x);}

static long double
    _TG_ATTRS
    __tg_sin(long double __x) {return sinl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_sin(float _Complex __x) {return csinf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_sin(double _Complex __x) {return csin(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_sin(long double _Complex __x) {return csinl(__x);}

#undef sin
#define sin(__x) __tg_sin(__tg_promote1((__x))(__x))

// tan

static float
    _TG_ATTRS
    __tg_tan(float __x) {return tanf(__x);}

static double
    _TG_ATTRS
    __tg_tan(double __x) {return tan(__x);}

static long double
    _TG_ATTRS
    __tg_tan(long double __x) {return tanl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_tan(float _Complex __x) {return ctanf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_tan(double _Complex __x) {return ctan(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_tan(long double _Complex __x) {return ctanl(__x);}

#undef tan
#define tan(__x) __tg_tan(__tg_promote1((__x))(__x))

// cosh

static float
    _TG_ATTRS
    __tg_cosh(float __x) {return coshf(__x);}

static double
    _TG_ATTRS
    __tg_cosh(double __x) {return cosh(__x);}

static long double
    _TG_ATTRS
    __tg_cosh(long double __x) {return coshl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_cosh(float _Complex __x) {return ccoshf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_cosh(double _Complex __x) {return ccosh(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_cosh(long double _Complex __x) {return ccoshl(__x);}

#undef cosh
#define cosh(__x) __tg_cosh(__tg_promote1((__x))(__x))

// sinh

static float
    _TG_ATTRS
    __tg_sinh(float __x) {return sinhf(__x);}

static double
    _TG_ATTRS
    __tg_sinh(double __x) {return sinh(__x);}

static long double
    _TG_ATTRS
    __tg_sinh(long double __x) {return sinhl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_sinh(float _Complex __x) {return csinhf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_sinh(double _Complex __x) {return csinh(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_sinh(long double _Complex __x) {return csinhl(__x);}

#undef sinh
#define sinh(__x) __tg_sinh(__tg_promote1((__x))(__x))

// tanh

static float
    _TG_ATTRS
    __tg_tanh(float __x) {return tanhf(__x);}

static double
    _TG_ATTRS
    __tg_tanh(double __x) {return tanh(__x);}

static long double
    _TG_ATTRS
    __tg_tanh(long double __x) {return tanhl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_tanh(float _Complex __x) {return ctanhf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_tanh(double _Complex __x) {return ctanh(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_tanh(long double _Complex __x) {return ctanhl(__x);}

#undef tanh
#define tanh(__x) __tg_tanh(__tg_promote1((__x))(__x))

// exp

static float
    _TG_ATTRS
    __tg_exp(float __x) {return expf(__x);}

static double
    _TG_ATTRS
    __tg_exp(double __x) {return exp(__x);}

static long double
    _TG_ATTRS
    __tg_exp(long double __x) {return expl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_exp(float _Complex __x) {return cexpf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_exp(double _Complex __x) {return cexp(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_exp(long double _Complex __x) {return cexpl(__x);}

#undef exp
#define exp(__x) __tg_exp(__tg_promote1((__x))(__x))

// log

static float
    _TG_ATTRS
    __tg_log(float __x) {return logf(__x);}

static double
    _TG_ATTRS
    __tg_log(double __x) {return log(__x);}

static long double
    _TG_ATTRS
    __tg_log(long double __x) {return logl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_log(float _Complex __x) {return clogf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_log(double _Complex __x) {return clog(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_log(long double _Complex __x) {return clogl(__x);}

#undef log
#define log(__x) __tg_log(__tg_promote1((__x))(__x))

// pow

static float
    _TG_ATTRS
    __tg_pow(float __x, float __y) {return powf(__x, __y);}

static double
    _TG_ATTRS
    __tg_pow(double __x, double __y) {return pow(__x, __y);}

static long double
    _TG_ATTRS
    __tg_pow(long double __x, long double __y) {return powl(__x, __y);}

static float _Complex
    _TG_ATTRS
    __tg_pow(float _Complex __x, float _Complex __y) {return cpowf(__x, __y);}

static double _Complex
    _TG_ATTRS
    __tg_pow(double _Complex __x, double _Complex __y) {return cpow(__x, __y);}

static long double _Complex
    _TG_ATTRS
    __tg_pow(long double _Complex __x, long double _Complex __y)
    {return cpowl(__x, __y);}

#undef pow
#define pow(__x, __y) __tg_pow(__tg_promote2((__x), (__y))(__x), \\
                               __tg_promote2((__x), (__y))(__y))

// sqrt

static float
    _TG_ATTRS
    __tg_sqrt(float __x) {return sqrtf(__x);}

static double
    _TG_ATTRS
    __tg_sqrt(double __x) {return sqrt(__x);}

static long double
    _TG_ATTRS
    __tg_sqrt(long double __x) {return sqrtl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_sqrt(float _Complex __x) {return csqrtf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_sqrt(double _Complex __x) {return csqrt(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_sqrt(long double _Complex __x) {return csqrtl(__x);}

#undef sqrt
#define sqrt(__x) __tg_sqrt(__tg_promote1((__x))(__x))

// fabs

static float
    _TG_ATTRS
    __tg_fabs(float __x) {return fabsf(__x);}

static double
    _TG_ATTRS
    __tg_fabs(double __x) {return fabs(__x);}

static long double
    _TG_ATTRS
    __tg_fabs(long double __x) {return fabsl(__x);}

static float
    _TG_ATTRS
    __tg_fabs(float _Complex __x) {return cabsf(__x);}

static double
    _TG_ATTRS
    __tg_fabs(double _Complex __x) {return cabs(__x);}

static long double
    _TG_ATTRS
    __tg_fabs(long double _Complex __x) {return cabsl(__x);}

#undef fabs
#define fabs(__x) __tg_fabs(__tg_promote1((__x))(__x))

// atan2

static float
    _TG_ATTRS
    __tg_atan2(float __x, float __y) {return atan2f(__x, __y);}

static double
    _TG_ATTRS
    __tg_atan2(double __x, double __y) {return atan2(__x, __y);}

static long double
    _TG_ATTRS
    __tg_atan2(long double __x, long double __y) {return atan2l(__x, __y);}

#undef atan2
#define atan2(__x, __y) __tg_atan2(__tg_promote2((__x), (__y))(__x), \\
                                   __tg_promote2((__x), (__y))(__y))

// cbrt

static float
    _TG_ATTRS
    __tg_cbrt(float __x) {return cbrtf(__x);}

static double
    _TG_ATTRS
    __tg_cbrt(double __x) {return cbrt(__x);}

static long double
    _TG_ATTRS
    __tg_cbrt(long double __x) {return cbrtl(__x);}

#undef cbrt
#define cbrt(__x) __tg_cbrt(__tg_promote1((__x))(__x))

// ceil

static float
    _TG_ATTRS
    __tg_ceil(float __x) {return ceilf(__x);}

static double
    _TG_ATTRS
    __tg_ceil(double __x) {return ceil(__x);}

static long double
    _TG_ATTRS
    __tg_ceil(long double __x) {return ceill(__x);}

#undef ceil
#define ceil(__x) __tg_ceil(__tg_promote1((__x))(__x))

// copysign

static float
    _TG_ATTRS
    __tg_copysign(float __x, float __y) {return copysignf(__x, __y);}

static double
    _TG_ATTRS
    __tg_copysign(double __x, double __y) {return copysign(__x, __y);}

static long double
    _TG_ATTRS
    __tg_copysign(long double __x, long double __y) {return copysignl(__x, __y);}

#undef copysign
#define copysign(__x, __y) __tg_copysign(__tg_promote2((__x), (__y))(__x), \\
                                         __tg_promote2((__x), (__y))(__y))

// erf

static float
    _TG_ATTRS
    __tg_erf(float __x) {return erff(__x);}

static double
    _TG_ATTRS
    __tg_erf(double __x) {return erf(__x);}

static long double
    _TG_ATTRS
    __tg_erf(long double __x) {return erfl(__x);}

#undef erf
#define erf(__x) __tg_erf(__tg_promote1((__x))(__x))

// erfc

static float
    _TG_ATTRS
    __tg_erfc(float __x) {return erfcf(__x);}

static double
    _TG_ATTRS
    __tg_erfc(double __x) {return erfc(__x);}

static long double
    _TG_ATTRS
    __tg_erfc(long double __x) {return erfcl(__x);}

#undef erfc
#define erfc(__x) __tg_erfc(__tg_promote1((__x))(__x))

// exp2

static float
    _TG_ATTRS
    __tg_exp2(float __x) {return exp2f(__x);}

static double
    _TG_ATTRS
    __tg_exp2(double __x) {return exp2(__x);}

static long double
    _TG_ATTRS
    __tg_exp2(long double __x) {return exp2l(__x);}

#undef exp2
#define exp2(__x) __tg_exp2(__tg_promote1((__x))(__x))

// expm1

static float
    _TG_ATTRS
    __tg_expm1(float __x) {return expm1f(__x);}

static double
    _TG_ATTRS
    __tg_expm1(double __x) {return expm1(__x);}

static long double
    _TG_ATTRS
    __tg_expm1(long double __x) {return expm1l(__x);}

#undef expm1
#define expm1(__x) __tg_expm1(__tg_promote1((__x))(__x))

// fdim

static float
    _TG_ATTRS
    __tg_fdim(float __x, float __y) {return fdimf(__x, __y);}

static double
    _TG_ATTRS
    __tg_fdim(double __x, double __y) {return fdim(__x, __y);}

static long double
    _TG_ATTRS
    __tg_fdim(long double __x, long double __y) {return fdiml(__x, __y);}

#undef fdim
#define fdim(__x, __y) __tg_fdim(__tg_promote2((__x), (__y))(__x), \\
                                 __tg_promote2((__x), (__y))(__y))

// floor

static float
    _TG_ATTRS
    __tg_floor(float __x) {return floorf(__x);}

static double
    _TG_ATTRS
    __tg_floor(double __x) {return floor(__x);}

static long double
    _TG_ATTRS
    __tg_floor(long double __x) {return floorl(__x);}

#undef floor
#define floor(__x) __tg_floor(__tg_promote1((__x))(__x))

// fma

static float
    _TG_ATTRS
    __tg_fma(float __x, float __y, float __z)
    {return fmaf(__x, __y, __z);}

static double
    _TG_ATTRS
    __tg_fma(double __x, double __y, double __z)
    {return fma(__x, __y, __z);}

static long double
    _TG_ATTRS
    __tg_fma(long double __x,long double __y, long double __z)
    {return fmal(__x, __y, __z);}

#undef fma
#define fma(__x, __y, __z)                                \\
        __tg_fma(__tg_promote3((__x), (__y), (__z))(__x), \\
                 __tg_promote3((__x), (__y), (__z))(__y), \\
                 __tg_promote3((__x), (__y), (__z))(__z))

// fmax

static float
    _TG_ATTRS
    __tg_fmax(float __x, float __y) {return fmaxf(__x, __y);}

static double
    _TG_ATTRS
    __tg_fmax(double __x, double __y) {return fmax(__x, __y);}

static long double
    _TG_ATTRS
    __tg_fmax(long double __x, long double __y) {return fmaxl(__x, __y);}

#undef fmax
#define fmax(__x, __y) __tg_fmax(__tg_promote2((__x), (__y))(__x), \\
                                 __tg_promote2((__x), (__y))(__y))

// fmin

static float
    _TG_ATTRS
    __tg_fmin(float __x, float __y) {return fminf(__x, __y);}

static double
    _TG_ATTRS
    __tg_fmin(double __x, double __y) {return fmin(__x, __y);}

static long double
    _TG_ATTRS
    __tg_fmin(long double __x, long double __y) {return fminl(__x, __y);}

#undef fmin
#define fmin(__x, __y) __tg_fmin(__tg_promote2((__x), (__y))(__x), \\
                                 __tg_promote2((__x), (__y))(__y))

// fmod

static float
    _TG_ATTRS
    __tg_fmod(float __x, float __y) {return fmodf(__x, __y);}

static double
    _TG_ATTRS
    __tg_fmod(double __x, double __y) {return fmod(__x, __y);}

static long double
    _TG_ATTRS
    __tg_fmod(long double __x, long double __y) {return fmodl(__x, __y);}

#undef fmod
#define fmod(__x, __y) __tg_fmod(__tg_promote2((__x), (__y))(__x), \\
                                 __tg_promote2((__x), (__y))(__y))

// frexp

static float
    _TG_ATTRS
    __tg_frexp(float __x, int* __y) {return frexpf(__x, __y);}

static double
    _TG_ATTRS
    __tg_frexp(double __x, int* __y) {return frexp(__x, __y);}

static long double
    _TG_ATTRS
    __tg_frexp(long double __x, int* __y) {return frexpl(__x, __y);}

#undef frexp
#define frexp(__x, __y) __tg_frexp(__tg_promote1((__x))(__x), __y)

// hypot

static float
    _TG_ATTRS
    __tg_hypot(float __x, float __y) {return hypotf(__x, __y);}

static double
    _TG_ATTRS
    __tg_hypot(double __x, double __y) {return hypot(__x, __y);}

static long double
    _TG_ATTRS
    __tg_hypot(long double __x, long double __y) {return hypotl(__x, __y);}

#undef hypot
#define hypot(__x, __y) __tg_hypot(__tg_promote2((__x), (__y))(__x), \\
                                   __tg_promote2((__x), (__y))(__y))

// ilogb

static int
    _TG_ATTRS
    __tg_ilogb(float __x) {return ilogbf(__x);}

static int
    _TG_ATTRS
    __tg_ilogb(double __x) {return ilogb(__x);}

static int
    _TG_ATTRS
    __tg_ilogb(long double __x) {return ilogbl(__x);}

#undef ilogb
#define ilogb(__x) __tg_ilogb(__tg_promote1((__x))(__x))

// ldexp

static float
    _TG_ATTRS
    __tg_ldexp(float __x, int __y) {return ldexpf(__x, __y);}

static double
    _TG_ATTRS
    __tg_ldexp(double __x, int __y) {return ldexp(__x, __y);}

static long double
    _TG_ATTRS
    __tg_ldexp(long double __x, int __y) {return ldexpl(__x, __y);}

#undef ldexp
#define ldexp(__x, __y) __tg_ldexp(__tg_promote1((__x))(__x), __y)

// lgamma

static float
    _TG_ATTRS
    __tg_lgamma(float __x) {return lgammaf(__x);}

static double
    _TG_ATTRS
    __tg_lgamma(double __x) {return lgamma(__x);}

static long double
    _TG_ATTRS
    __tg_lgamma(long double __x) {return lgammal(__x);}

#undef lgamma
#define lgamma(__x) __tg_lgamma(__tg_promote1((__x))(__x))

// llrint

static long long
    _TG_ATTRS
    __tg_llrint(float __x) {return llrintf(__x);}

static long long
    _TG_ATTRS
    __tg_llrint(double __x) {return llrint(__x);}

static long long
    _TG_ATTRS
    __tg_llrint(long double __x) {return llrintl(__x);}

#undef llrint
#define llrint(__x) __tg_llrint(__tg_promote1((__x))(__x))

// llround

static long long
    _TG_ATTRS
    __tg_llround(float __x) {return llroundf(__x);}

static long long
    _TG_ATTRS
    __tg_llround(double __x) {return llround(__x);}

static long long
    _TG_ATTRS
    __tg_llround(long double __x) {return llroundl(__x);}

#undef llround
#define llround(__x) __tg_llround(__tg_promote1((__x))(__x))

// log10

static float
    _TG_ATTRS
    __tg_log10(float __x) {return log10f(__x);}

static double
    _TG_ATTRS
    __tg_log10(double __x) {return log10(__x);}

static long double
    _TG_ATTRS
    __tg_log10(long double __x) {return log10l(__x);}

#undef log10
#define log10(__x) __tg_log10(__tg_promote1((__x))(__x))

// log1p

static float
    _TG_ATTRS
    __tg_log1p(float __x) {return log1pf(__x);}

static double
    _TG_ATTRS
    __tg_log1p(double __x) {return log1p(__x);}

static long double
    _TG_ATTRS
    __tg_log1p(long double __x) {return log1pl(__x);}

#undef log1p
#define log1p(__x) __tg_log1p(__tg_promote1((__x))(__x))

// log2

static float
    _TG_ATTRS
    __tg_log2(float __x) {return log2f(__x);}

static double
    _TG_ATTRS
    __tg_log2(double __x) {return log2(__x);}

static long double
    _TG_ATTRS
    __tg_log2(long double __x) {return log2l(__x);}

#undef log2
#define log2(__x) __tg_log2(__tg_promote1((__x))(__x))

// logb

static float
    _TG_ATTRS
    __tg_logb(float __x) {return logbf(__x);}

static double
    _TG_ATTRS
    __tg_logb(double __x) {return logb(__x);}

static long double
    _TG_ATTRS
    __tg_logb(long double __x) {return logbl(__x);}

#undef logb
#define logb(__x) __tg_logb(__tg_promote1((__x))(__x))

// lrint

static long
    _TG_ATTRS
    __tg_lrint(float __x) {return lrintf(__x);}

static long
    _TG_ATTRS
    __tg_lrint(double __x) {return lrint(__x);}

static long
    _TG_ATTRS
    __tg_lrint(long double __x) {return lrintl(__x);}

#undef lrint
#define lrint(__x) __tg_lrint(__tg_promote1((__x))(__x))

// lround

static long
    _TG_ATTRS
    __tg_lround(float __x) {return lroundf(__x);}

static long
    _TG_ATTRS
    __tg_lround(double __x) {return lround(__x);}

static long
    _TG_ATTRS
    __tg_lround(long double __x) {return lroundl(__x);}

#undef lround
#define lround(__x) __tg_lround(__tg_promote1((__x))(__x))

// nearbyint

static float
    _TG_ATTRS
    __tg_nearbyint(float __x) {return nearbyintf(__x);}

static double
    _TG_ATTRS
    __tg_nearbyint(double __x) {return nearbyint(__x);}

static long double
    _TG_ATTRS
    __tg_nearbyint(long double __x) {return nearbyintl(__x);}

#undef nearbyint
#define nearbyint(__x) __tg_nearbyint(__tg_promote1((__x))(__x))

// nextafter

static float
    _TG_ATTRS
    __tg_nextafter(float __x, float __y) {return nextafterf(__x, __y);}

static double
    _TG_ATTRS
    __tg_nextafter(double __x, double __y) {return nextafter(__x, __y);}

static long double
    _TG_ATTRS
    __tg_nextafter(long double __x, long double __y) {return nextafterl(__x, __y);}

#undef nextafter
#define nextafter(__x, __y) __tg_nextafter(__tg_promote2((__x), (__y))(__x), \\
                                           __tg_promote2((__x), (__y))(__y))

// nexttoward

static float
    _TG_ATTRS
    __tg_nexttoward(float __x, long double __y) {return nexttowardf(__x, __y);}

static double
    _TG_ATTRS
    __tg_nexttoward(double __x, long double __y) {return nexttoward(__x, __y);}

static long double
    _TG_ATTRS
    __tg_nexttoward(long double __x, long double __y) {return nexttowardl(__x, __y);}

#undef nexttoward
#define nexttoward(__x, __y) __tg_nexttoward(__tg_promote1((__x))(__x), (__y))

// remainder

static float
    _TG_ATTRS
    __tg_remainder(float __x, float __y) {return remainderf(__x, __y);}

static double
    _TG_ATTRS
    __tg_remainder(double __x, double __y) {return remainder(__x, __y);}

static long double
    _TG_ATTRS
    __tg_remainder(long double __x, long double __y) {return remainderl(__x, __y);}

#undef remainder
#define remainder(__x, __y) __tg_remainder(__tg_promote2((__x), (__y))(__x), \\
                                           __tg_promote2((__x), (__y))(__y))

// remquo

static float
    _TG_ATTRS
    __tg_remquo(float __x, float __y, int* __z)
    {return remquof(__x, __y, __z);}

static double
    _TG_ATTRS
    __tg_remquo(double __x, double __y, int* __z)
    {return remquo(__x, __y, __z);}

static long double
    _TG_ATTRS
    __tg_remquo(long double __x,long double __y, int* __z)
    {return remquol(__x, __y, __z);}

#undef remquo
#define remquo(__x, __y, __z)                         \\
        __tg_remquo(__tg_promote2((__x), (__y))(__x), \\
                    __tg_promote2((__x), (__y))(__y), \\
                    (__z))

// rint

static float
    _TG_ATTRS
    __tg_rint(float __x) {return rintf(__x);}

static double
    _TG_ATTRS
    __tg_rint(double __x) {return rint(__x);}

static long double
    _TG_ATTRS
    __tg_rint(long double __x) {return rintl(__x);}

#undef rint
#define rint(__x) __tg_rint(__tg_promote1((__x))(__x))

// round

static float
    _TG_ATTRS
    __tg_round(float __x) {return roundf(__x);}

static double
    _TG_ATTRS
    __tg_round(double __x) {return round(__x);}

static long double
    _TG_ATTRS
    __tg_round(long double __x) {return roundl(__x);}

#undef round
#define round(__x) __tg_round(__tg_promote1((__x))(__x))

// scalbn

static float
    _TG_ATTRS
    __tg_scalbn(float __x, int __y) {return scalbnf(__x, __y);}

static double
    _TG_ATTRS
    __tg_scalbn(double __x, int __y) {return scalbn(__x, __y);}

static long double
    _TG_ATTRS
    __tg_scalbn(long double __x, int __y) {return scalbnl(__x, __y);}

#undef scalbn
#define scalbn(__x, __y) __tg_scalbn(__tg_promote1((__x))(__x), __y)

// scalbln

static float
    _TG_ATTRS
    __tg_scalbln(float __x, long __y) {return scalblnf(__x, __y);}

static double
    _TG_ATTRS
    __tg_scalbln(double __x, long __y) {return scalbln(__x, __y);}

static long double
    _TG_ATTRS
    __tg_scalbln(long double __x, long __y) {return scalblnl(__x, __y);}

#undef scalbln
#define scalbln(__x, __y) __tg_scalbln(__tg_promote1((__x))(__x), __y)

// tgamma

static float
    _TG_ATTRS
    __tg_tgamma(float __x) {return tgammaf(__x);}

static double
    _TG_ATTRS
    __tg_tgamma(double __x) {return tgamma(__x);}

static long double
    _TG_ATTRS
    __tg_tgamma(long double __x) {return tgammal(__x);}

#undef tgamma
#define tgamma(__x) __tg_tgamma(__tg_promote1((__x))(__x))

// trunc

static float
    _TG_ATTRS
    __tg_trunc(float __x) {return truncf(__x);}

static double
    _TG_ATTRS
    __tg_trunc(double __x) {return trunc(__x);}

static long double
    _TG_ATTRS
    __tg_trunc(long double __x) {return truncl(__x);}

#undef trunc
#define trunc(__x) __tg_trunc(__tg_promote1((__x))(__x))

// carg

static float
    _TG_ATTRS
    __tg_carg(float __x) {return atan2f(0.F, __x);}

static double
    _TG_ATTRS
    __tg_carg(double __x) {return atan2(0., __x);}

static long double
    _TG_ATTRS
    __tg_carg(long double __x) {return atan2l(0.L, __x);}

static float
    _TG_ATTRS
    __tg_carg(float _Complex __x) {return cargf(__x);}

static double
    _TG_ATTRS
    __tg_carg(double _Complex __x) {return carg(__x);}

static long double
    _TG_ATTRS
    __tg_carg(long double _Complex __x) {return cargl(__x);}

#undef carg
#define carg(__x) __tg_carg(__tg_promote1((__x))(__x))

// cimag

static float
    _TG_ATTRS
    __tg_cimag(float __x) {return 0;}

static double
    _TG_ATTRS
    __tg_cimag(double __x) {return 0;}

static long double
    _TG_ATTRS
    __tg_cimag(long double __x) {return 0;}

static float
    _TG_ATTRS
    __tg_cimag(float _Complex __x) {return cimagf(__x);}

static double
    _TG_ATTRS
    __tg_cimag(double _Complex __x) {return cimag(__x);}

static long double
    _TG_ATTRS
    __tg_cimag(long double _Complex __x) {return cimagl(__x);}

#undef cimag
#define cimag(__x) __tg_cimag(__tg_promote1((__x))(__x))

// conj

static float _Complex
    _TG_ATTRS
    __tg_conj(float __x) {return __x;}

static double _Complex
    _TG_ATTRS
    __tg_conj(double __x) {return __x;}

static long double _Complex
    _TG_ATTRS
    __tg_conj(long double __x) {return __x;}

static float _Complex
    _TG_ATTRS
    __tg_conj(float _Complex __x) {return conjf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_conj(double _Complex __x) {return conj(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_conj(long double _Complex __x) {return conjl(__x);}

#undef conj
#define conj(__x) __tg_conj(__tg_promote1((__x))(__x))

// cproj

static float _Complex
    _TG_ATTRS
    __tg_cproj(float __x) {return cprojf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_cproj(double __x) {return cproj(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_cproj(long double __x) {return cprojl(__x);}

static float _Complex
    _TG_ATTRS
    __tg_cproj(float _Complex __x) {return cprojf(__x);}

static double _Complex
    _TG_ATTRS
    __tg_cproj(double _Complex __x) {return cproj(__x);}

static long double _Complex
    _TG_ATTRS
    __tg_cproj(long double _Complex __x) {return cprojl(__x);}

#undef cproj
#define cproj(__x) __tg_cproj(__tg_promote1((__x))(__x))

// creal

static float
    _TG_ATTRS
    __tg_creal(float __x) {return __x;}

static double
    _TG_ATTRS
    __tg_creal(double __x) {return __x;}

static long double
    _TG_ATTRS
    __tg_creal(long double __x) {return __x;}

static float
    _TG_ATTRS
    __tg_creal(float _Complex __x) {return crealf(__x);}

static double
    _TG_ATTRS
    __tg_creal(double _Complex __x) {return creal(__x);}

static long double
    _TG_ATTRS
    __tg_creal(long double _Complex __x) {return creall(__x);}

#undef creal
#define creal(__x) __tg_creal(__tg_promote1((__x))(__x))

#undef _TG_ATTRSp
#undef _TG_ATTRS

#endif /* __cplusplus */
#endif /* __has_include_next */
#endif /* __CLANG_TGMATH_H */
`,"unwind.h":`/*===---- unwind.h - Stack unwinding ----------------------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

/* See "Data Definitions for libgcc_s" in the Linux Standard Base.*/

#ifndef __CLANG_UNWIND_H
#define __CLANG_UNWIND_H

#if defined(__APPLE__) && __has_include_next(<unwind.h>)
/* Darwin (from 11.x on) provide an unwind.h. If that's available,
 * use it. libunwind wraps some of its definitions in #ifdef _GNU_SOURCE,
 * so define that around the include.*/
# ifndef _GNU_SOURCE
#  define _SHOULD_UNDEFINE_GNU_SOURCE
#  define _GNU_SOURCE
# endif
// libunwind's unwind.h reflects the current visibility.  However, Mozilla
// builds with -fvisibility=hidden and relies on gcc's unwind.h to reset the
// visibility to default and export its contents.  gcc also allows users to
// override its override by #defining HIDE_EXPORTS (but note, this only obeys
// the user's -fvisibility setting; it doesn't hide any exports on its own).  We
// imitate gcc's header here:
# ifdef HIDE_EXPORTS
#  include_next <unwind.h>
# else
#  pragma GCC visibility push(default)
#  include_next <unwind.h>
#  pragma GCC visibility pop
# endif
# ifdef _SHOULD_UNDEFINE_GNU_SOURCE
#  undef _GNU_SOURCE
#  undef _SHOULD_UNDEFINE_GNU_SOURCE
# endif
#else

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif

/* It is a bit strange for a header to play with the visibility of the
   symbols it declares, but this matches gcc's behavior and some programs
   depend on it */
#ifndef HIDE_EXPORTS
#pragma GCC visibility push(default)
#endif

typedef uintptr_t _Unwind_Word __attribute__((__mode__(__unwind_word__)));
typedef intptr_t _Unwind_Sword __attribute__((__mode__(__unwind_word__)));
typedef uintptr_t _Unwind_Ptr;
typedef uintptr_t _Unwind_Internal_Ptr;
typedef uint64_t _Unwind_Exception_Class;

typedef intptr_t _sleb128_t;
typedef uintptr_t _uleb128_t;

struct _Unwind_Context;
#if defined(__arm__) && !(defined(__USING_SJLJ_EXCEPTIONS__) || \\
                          defined(__ARM_DWARF_EH__) || defined(__SEH__))
struct _Unwind_Control_Block;
typedef struct _Unwind_Control_Block _Unwind_Control_Block;
#define _Unwind_Exception _Unwind_Control_Block /* Alias */
#else
struct _Unwind_Exception;
typedef struct _Unwind_Exception _Unwind_Exception;
#endif
typedef enum {
  _URC_NO_REASON = 0,
#if defined(__arm__) && !defined(__USING_SJLJ_EXCEPTIONS__) && \\
    !defined(__ARM_DWARF_EH__) && !defined(__SEH__)
  _URC_OK = 0, /* used by ARM EHABI */
#endif
  _URC_FOREIGN_EXCEPTION_CAUGHT = 1,

  _URC_FATAL_PHASE2_ERROR = 2,
  _URC_FATAL_PHASE1_ERROR = 3,
  _URC_NORMAL_STOP = 4,

  _URC_END_OF_STACK = 5,
  _URC_HANDLER_FOUND = 6,
  _URC_INSTALL_CONTEXT = 7,
  _URC_CONTINUE_UNWIND = 8,
#if defined(__arm__) && !defined(__USING_SJLJ_EXCEPTIONS__) && \\
    !defined(__ARM_DWARF_EH__) && !defined(__SEH__)
  _URC_FAILURE = 9 /* used by ARM EHABI */
#endif
} _Unwind_Reason_Code;

typedef enum {
  _UA_SEARCH_PHASE = 1,
  _UA_CLEANUP_PHASE = 2,

  _UA_HANDLER_FRAME = 4,
  _UA_FORCE_UNWIND = 8,
  _UA_END_OF_STACK = 16 /* gcc extension to C++ ABI */
} _Unwind_Action;

typedef void (*_Unwind_Exception_Cleanup_Fn)(_Unwind_Reason_Code,
                                             _Unwind_Exception *);

#if defined(__arm__) && !(defined(__USING_SJLJ_EXCEPTIONS__) || \\
                          defined(__ARM_DWARF_EH__) || defined(__SEH__))
typedef struct _Unwind_Control_Block _Unwind_Control_Block;
typedef uint32_t _Unwind_EHT_Header;

struct _Unwind_Control_Block {
  uint64_t exception_class;
  void (*exception_cleanup)(_Unwind_Reason_Code, _Unwind_Control_Block *);
  /* unwinder cache (private fields for the unwinder's use) */
  struct {
    uint32_t reserved1; /* forced unwind stop function, 0 if not forced */
    uint32_t reserved2; /* personality routine */
    uint32_t reserved3; /* callsite */
    uint32_t reserved4; /* forced unwind stop argument */
    uint32_t reserved5;
  } unwinder_cache;
  /* propagation barrier cache (valid after phase 1) */
  struct {
    uint32_t sp;
    uint32_t bitpattern[5];
  } barrier_cache;
  /* cleanup cache (preserved over cleanup) */
  struct {
    uint32_t bitpattern[4];
  } cleanup_cache;
  /* personality cache (for personality's benefit) */
  struct {
    uint32_t fnstart;         /* function start address */
    _Unwind_EHT_Header *ehtp; /* pointer to EHT entry header word */
    uint32_t additional;      /* additional data */
    uint32_t reserved1;
  } pr_cache;
  long long int : 0; /* force alignment of next item to 8-byte boundary */
} __attribute__((__aligned__(8)));
#else
struct _Unwind_Exception {
  _Unwind_Exception_Class exception_class;
  _Unwind_Exception_Cleanup_Fn exception_cleanup;
#if !defined (__USING_SJLJ_EXCEPTIONS__) && defined (__SEH__)
  _Unwind_Word private_[6];
#else
  _Unwind_Word private_1;
  _Unwind_Word private_2;
#endif
  /* The Itanium ABI requires that _Unwind_Exception objects are "double-word
   * aligned".  GCC has interpreted this to mean "use the maximum useful
   * alignment for the target"; so do we. */
} __attribute__((__aligned__));
#endif

typedef _Unwind_Reason_Code (*_Unwind_Stop_Fn)(int, _Unwind_Action,
                                               _Unwind_Exception_Class,
                                               _Unwind_Exception *,
                                               struct _Unwind_Context *,
                                               void *);

typedef _Unwind_Reason_Code (*_Unwind_Personality_Fn)(int, _Unwind_Action,
                                                      _Unwind_Exception_Class,
                                                      _Unwind_Exception *,
                                                      struct _Unwind_Context *);
typedef _Unwind_Personality_Fn __personality_routine;

typedef _Unwind_Reason_Code (*_Unwind_Trace_Fn)(struct _Unwind_Context *,
                                                void *);

#if defined(__arm__) && !(defined(__USING_SJLJ_EXCEPTIONS__) ||                \\
                          defined(__ARM_DWARF_EH__) || defined(__SEH__))
typedef enum {
  _UVRSC_CORE = 0,        /* integer register */
  _UVRSC_VFP = 1,         /* vfp */
  _UVRSC_WMMXD = 3,       /* Intel WMMX data register */
  _UVRSC_WMMXC = 4,       /* Intel WMMX control register */
  _UVRSC_PSEUDO = 5       /* Special purpose pseudo register */
} _Unwind_VRS_RegClass;

typedef enum {
  _UVRSD_UINT32 = 0,
  _UVRSD_VFPX = 1,
  _UVRSD_UINT64 = 3,
  _UVRSD_FLOAT = 4,
  _UVRSD_DOUBLE = 5
} _Unwind_VRS_DataRepresentation;

typedef enum {
  _UVRSR_OK = 0,
  _UVRSR_NOT_IMPLEMENTED = 1,
  _UVRSR_FAILED = 2
} _Unwind_VRS_Result;

typedef uint32_t _Unwind_State;
#define _US_VIRTUAL_UNWIND_FRAME  ((_Unwind_State)0)
#define _US_UNWIND_FRAME_STARTING ((_Unwind_State)1)
#define _US_UNWIND_FRAME_RESUME   ((_Unwind_State)2)
#define _US_ACTION_MASK           ((_Unwind_State)3)
#define _US_FORCE_UNWIND          ((_Unwind_State)8)

_Unwind_VRS_Result _Unwind_VRS_Get(struct _Unwind_Context *__context,
  _Unwind_VRS_RegClass __regclass,
  uint32_t __regno,
  _Unwind_VRS_DataRepresentation __representation,
  void *__valuep);

_Unwind_VRS_Result _Unwind_VRS_Set(struct _Unwind_Context *__context,
  _Unwind_VRS_RegClass __regclass,
  uint32_t __regno,
  _Unwind_VRS_DataRepresentation __representation,
  void *__valuep);

static __inline__
_Unwind_Word _Unwind_GetGR(struct _Unwind_Context *__context, int __index) {
  _Unwind_Word __value;
  _Unwind_VRS_Get(__context, _UVRSC_CORE, __index, _UVRSD_UINT32, &__value);
  return __value;
}

static __inline__
void _Unwind_SetGR(struct _Unwind_Context *__context, int __index,
                   _Unwind_Word __value) {
  _Unwind_VRS_Set(__context, _UVRSC_CORE, __index, _UVRSD_UINT32, &__value);
}

static __inline__
_Unwind_Word _Unwind_GetIP(struct _Unwind_Context *__context) {
  _Unwind_Word __ip = _Unwind_GetGR(__context, 15);
  return __ip & ~(_Unwind_Word)(0x1); /* Remove thumb mode bit. */
}

static __inline__
void _Unwind_SetIP(struct _Unwind_Context *__context, _Unwind_Word __value) {
  _Unwind_Word __thumb_mode_bit = _Unwind_GetGR(__context, 15) & 0x1;
  _Unwind_SetGR(__context, 15, __value | __thumb_mode_bit);
}
#else
_Unwind_Word _Unwind_GetGR(struct _Unwind_Context *, int);
void _Unwind_SetGR(struct _Unwind_Context *, int, _Unwind_Word);

_Unwind_Word _Unwind_GetIP(struct _Unwind_Context *);
void _Unwind_SetIP(struct _Unwind_Context *, _Unwind_Word);
#endif


_Unwind_Word _Unwind_GetIPInfo(struct _Unwind_Context *, int *);

_Unwind_Word _Unwind_GetCFA(struct _Unwind_Context *);

_Unwind_Word _Unwind_GetBSP(struct _Unwind_Context *);

void *_Unwind_GetLanguageSpecificData(struct _Unwind_Context *);

_Unwind_Ptr _Unwind_GetRegionStart(struct _Unwind_Context *);

/* DWARF EH functions; currently not available on Darwin/ARM */
#if !defined(__APPLE__) || !defined(__arm__)
_Unwind_Reason_Code _Unwind_RaiseException(_Unwind_Exception *);
_Unwind_Reason_Code _Unwind_ForcedUnwind(_Unwind_Exception *, _Unwind_Stop_Fn,
                                         void *);
void _Unwind_DeleteException(_Unwind_Exception *);
void _Unwind_Resume(_Unwind_Exception *);
_Unwind_Reason_Code _Unwind_Resume_or_Rethrow(_Unwind_Exception *);

#endif

_Unwind_Reason_Code _Unwind_Backtrace(_Unwind_Trace_Fn, void *);

/* setjmp(3)/longjmp(3) stuff */
typedef struct SjLj_Function_Context *_Unwind_FunctionContext_t;

void _Unwind_SjLj_Register(_Unwind_FunctionContext_t);
void _Unwind_SjLj_Unregister(_Unwind_FunctionContext_t);
_Unwind_Reason_Code _Unwind_SjLj_RaiseException(_Unwind_Exception *);
_Unwind_Reason_Code _Unwind_SjLj_ForcedUnwind(_Unwind_Exception *,
                                              _Unwind_Stop_Fn, void *);
void _Unwind_SjLj_Resume(_Unwind_Exception *);
_Unwind_Reason_Code _Unwind_SjLj_Resume_or_Rethrow(_Unwind_Exception *);

void *_Unwind_FindEnclosingFunction(void *);

#ifdef __APPLE__

_Unwind_Ptr _Unwind_GetDataRelBase(struct _Unwind_Context *)
    __attribute__((__unavailable__));
_Unwind_Ptr _Unwind_GetTextRelBase(struct _Unwind_Context *)
    __attribute__((__unavailable__));

/* Darwin-specific functions */
void __register_frame(const void *);
void __deregister_frame(const void *);

struct dwarf_eh_bases {
  uintptr_t tbase;
  uintptr_t dbase;
  uintptr_t func;
};
void *_Unwind_Find_FDE(const void *, struct dwarf_eh_bases *);

void __register_frame_info_bases(const void *, void *, void *, void *)
  __attribute__((__unavailable__));
void __register_frame_info(const void *, void *) __attribute__((__unavailable__));
void __register_frame_info_table_bases(const void *, void*, void *, void *)
  __attribute__((__unavailable__));
void __register_frame_info_table(const void *, void *)
  __attribute__((__unavailable__));
void __register_frame_table(const void *) __attribute__((__unavailable__));
void __deregister_frame_info(const void *) __attribute__((__unavailable__));
void __deregister_frame_info_bases(const void *)__attribute__((__unavailable__));

#else

_Unwind_Ptr _Unwind_GetDataRelBase(struct _Unwind_Context *);
_Unwind_Ptr _Unwind_GetTextRelBase(struct _Unwind_Context *);

#endif


#ifndef HIDE_EXPORTS
#pragma GCC visibility pop
#endif

#ifdef __cplusplus
}
#endif

#endif

#endif /* __CLANG_UNWIND_H */
`,"varargs.h":`/*===---- varargs.h - Variable argument handling -------------------------------------===
*
* Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
* See https://llvm.org/LICENSE.txt for license information.
* SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
*
*===-----------------------------------------------------------------------===
*/
#ifndef __VARARGS_H
#define __VARARGS_H
#if defined(__MVS__) && __has_include_next(<varargs.h>)
#include_next <varargs.h>
#else
#error "Please use <stdarg.h> instead of <varargs.h>"
#endif /* __MVS__ */
#endif
`});var v_=Object.freeze({name:"clang",version:"22.1.8",revision:"ca7933e47d3a3451d81e72ac174dcb5aa28b59d1"}),no="/lib/clang/22";function ur(n,e,t){if(e?.name!==v_.name||e.version!==v_.version||e.revision!==v_.revision||t!==no)return!1;let _=new TextDecoder("utf-8",{fatal:!0}),r=[];for(let[s,o]of Object.entries(cr)){let a=`${t}/include/${s}`;try{let d=n.readFile(a);if(d!==null){if(_.decode(d)!==o)throw new Error(`Clang ${e.version} resource header differs from its pinned source: ${s}`)}else r.push([a,o])}catch(d){throw new Error(`Unable to inspect Clang ${e.version} resource header ${s}: ${d instanceof Error?d.message:String(d)}`,{cause:d})}}if(r.length)try{n.mkdirTree(`${t}/include`)}catch(s){throw new Error(`Unable to prepare Clang ${e.version} resource header directory: ${s instanceof Error?s.message:String(s)}`,{cause:s})}let i=new TextEncoder;for(let[s,o]of r)try{n.writeFile(s,i.encode(o))}catch(a){throw new Error(`Unable to install Clang ${e.version} resource header ${s.slice(s.lastIndexOf("/")+1)}: ${a instanceof Error?a.message:String(a)}`,{cause:a})}return!0}var pr=0,M_=n=>JSON.stringify(n.length>96?n.slice(0,93)+"...":n),Zt=class{ready;mem=null;hostMem_=null;stdinStr;stdin;stdout;trace;instance=null;exports;out=!0;filePaths=new Set;fileOverlays=new Map;directoryPaths=new Set;constructor(e){this.stdin=e.stdin,this.stdout=e.stdout,this.stdinStr=e.stdinStr||"",this.trace=e.trace||(()=>{});let t=ht(this,"abort","host_write","host_read","memfs_log","copy_in","copy_out");this.ready=(e.maxAssetBytes!==void 0?Ct(e.moduleUrl,e.progress,e.signal,e.maxAssetBytes):e.signal?Ct(e.moduleUrl,e.progress,e.signal):Ct(e.moduleUrl,e.progress)).then(_=>WebAssembly.instantiate(_,{env:t})).then(_=>{this.instance=_,this.exports=_.exports,this.mem=new it(this.exports.memory),this.exports.init()})}set hostMem(e){this.hostMem_=e}setStdinStr(e){this.stdinStr=e}addDirectory(e){let t=this.normalizePath(e);this.directoryPaths.has(t)||(this.mem.check(),this.mem.write(this.exports.GetPathBuf(),e),this.exports.AddDirectoryNode(e.length),this.directoryPaths.add(t))}addFile(e,t){let _=t instanceof ArrayBuffer?t.byteLength:t.length;this.mem.check(),this.mem.write(this.exports.GetPathBuf(),e);let r=this.exports.AddFileNode(e.length,_),i=this.exports.GetFileNodeAddress(r);this.mem.check(),this.mem.write(i,t),this.filePaths.add(this.normalizePath(e))}setFile(e,t){let _=this.normalizePath(e);this.filePaths.add(_),this.fileOverlays.set(_,Uint8Array.from(t))}hasFile(e){return this.filePaths.has(this.normalizePath(e))}normalizePath(e){return e.replaceAll("\\","/").replace(/^\.\//,"").replace(/^\/+/,"")}getFileContents(e){let t=this.fileOverlays.get(this.normalizePath(e));if(t)return t;this.mem.check(),this.mem.write(this.exports.GetPathBuf(),e);let _=this.exports.FindNode(e.length),r=this.exports.GetFileNodeAddress(_),i=this.exports.GetFileNodeSize(_);return new Uint8Array(this.mem.buffer,r,i)}abort(){throw this.trace("abort()"),new ot}host_write(e,t,_,r){this.hostMem_.check(),E_(e<=2);let i=0,s="";for(let o=0;o<_;++o){let a=this.hostMem_.read32(t);t+=4;let d=this.hostMem_.read32(t);t+=4,s+=this.hostMem_.readStrR(a,d),i+=d}return this.hostMem_.write32(r,i),this.trace(`host_write(fd=${e}, bytes=${i}, data=${M_(s)})`),this.out&&this.stdout(s),pr}host_read(e,t,_,r){this.hostMem_.check(),E_(e===0);let i=0;for(let s=0;s<_;++s){let o=this.hostMem_.read32(t);t+=4;let a=this.hostMem_.read32(t);t+=4,this.stdinStr.length||(this.stdinStr=this.stdin());let d=Math.min(a,this.stdinStr.length);if(d===0)break;let l=this.stdinStr.substring(0,d);if(this.hostMem_.write(o,this.stdinStr.substring(0,d)),this.stdinStr=this.stdinStr.substring(d),i+=d,this.trace(`host_read(fd=${e}, bytes=${d}, data=${M_(l)})`),d!==a)break}return this.hostMem_.write32(r,i),i===0&&this.trace(`host_read(fd=${e}, bytes=0)`),pr}memfs_log(e,t){this.mem.check();let _=this.mem.readStr(e,t);this.trace(`memfs_log(${M_(_)})`)}copy_out(e,t,_){this.hostMem_.check();let r=new Uint8Array(this.hostMem_.buffer,e,_);this.mem.check();let i=new Uint8Array(this.mem.buffer,t,_);r.set(i)}copy_in(e,t,_){this.mem.check();let r=new Uint8Array(this.mem.buffer,e,_);this.hostMem_.check();let i=new Uint8Array(this.hostMem_.buffer,t,_);r.set(i)}};function*_o(n){let e=n instanceof Uint8Array?n:new Uint8Array(n),t=0,_="",r=o=>(t+=o,mt(e,t-o,o)),i=o=>(t+=o,_i(e,t-o,o)),s=()=>t=t+511&-512;for(;t+512<=e.length;){let o={filename:r(100),mode:i(8),owner:i(8),group:i(8),size:i(12),mtime:i(12),checksum:i(8),type:r(1),linkname:r(100),ustar:r(8)};if(!o.ustar)return;let a={...o,ownerName:r(32),groupName:r(32),devMajor:r(8),devMinor:r(8),filenamePrefix:r(155)};if(s(),a.size>0||a.type==="0"||a.type===""||a.type==="L"){let d=e.subarray(t,t+a.size);a.contents=d,t+=a.size,s()}if(a.type==="L"){a.contents&&(_=mt(a.contents,0,a.size));continue}a.filename=_||(a.filenamePrefix?`${a.filenamePrefix}/${a.filename}`:a.filename),_="",yield a}}function D_(n,e){for(let t of _o(n))switch(t.type){case"":case"0":e.addFile(t.filename,t.contents);break;case"5":e.addDirectory(t.filename);break;default:throw new Error(`unsupported tar entry type: ${t.type}`)}}var U_="\x1B[92m",Fn="\x1B[0m",hr="\x1B[1;93m";var io=n=>Math.max(0,Math.min(1,Number.isFinite(n)?n:0));function mr(n){let e={clang:0,lld:0,memfs:0},t=()=>{n((e.clang+e.lld+e.memfs)/3)},_=r=>({set(i){e[r]=io(i),t()}});return{clang:_("clang"),lld:_("lld"),memfs:_("memfs")}}var O_=(n,e)=>{let t=n?.toString().trim();if(!t)throw new Error(`${e} is required`);let _;try{_=new URL(t,typeof location<"u"?location.href:void 0)}catch{throw new Error(`${e} must be an absolute HTTP(S) URL`)}if(_.protocol!=="http:"&&_.protocol!=="https:")throw new Error(`${e} must use HTTP(S)`);return _},Tr=n=>{let e=O_(n,"wasm-clang runtime base URL");return e.pathname.endsWith("/")||(e.pathname+="/"),e.hash="",e},tt=(n,e)=>new URL(e,Tr(n)).toString(),ro=(n,e)=>tt(n,e),vt=n=>Tr(n).toString();var Gn=n=>ro(n,"runtime-manifest.v1.json");function gr(n,e){let t=vt(n);return{manifest:Gn(t).toString(),memfs:tt(t,e?.compiler.memfs.asset||"bin/memfs.wasm.gz").toString(),clang:tt(t,e?.compiler.clang.asset||"bin/clang.wasm.gz").toString(),lld:tt(t,e?.compiler.lld.asset||"bin/lld.wasm.gz").toString(),sysroot:tt(t,e?.compiler.sysroot.asset||"bin/sysroot.tar.gz").toString(),clangdJs:tt(t,e?.clangd.js||"clangd/clangd.js").toString(),clangdWasm:tt(t,e?.clangd.wasm||"clangd/clangd.wasm.gz").toString()}}var $e=n=>n.replaceAll("\\","/").split("/").filter(e=>e&&e!=="."&&e!=="..").join("/"),Mt=n=>{let e=$e(n);return e.startsWith("workspace/")?e.slice(10):e};function Qt(n,e){let t=$e(e||""),_="main",r=t&&/\.[A-Za-z0-9_-]+$/.test(t)?t:`${t||_}.${n==="C"?"c":n==="OBJC"?"m":"cc"}`,i=(r.split("/").pop()||r).replace(/\.[^.]+$/,"")||_;return{input:r,obj:`${i}.o`,wasm:`${i}.wasm`}}async function Sr(n){let e=typeof n=="string"?new TextEncoder().encode(n):n instanceof Uint8Array?new Uint8Array(n):new Uint8Array(n),t=await globalThis.crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(t),_=>_.toString(16).padStart(2,"0")).join("")}async function Ar(n,e,t){if(!t)throw new Error("LLDB debug compilation requires compiler provenance in the wasm-clang runtime manifest");let _=n.language||"CPP",r=Mt(n.activePath||"")||Mt(n.fileName||"")||void 0,{input:i}=Qt(_,r),s=new Map;for(let a of n.workspaceFiles||[]){let d=Mt(a.path);d&&s.set(d,a.content)}s.set(i,n.code);let o=[...s.entries()].sort(([a],[d])=>a<d?-1:a>d?1:0);return{kind:"dwarf",sourceRoot:"/workspace",moduleSha256:await Sr(e),files:await Promise.all(o.map(async([a,d])=>({path:`/workspace/${a}`,contentSha256:await Sr(d)}))),compiler:t}}typeof globalThis.document>"u"&&(globalThis.document={querySelectorAll:(()=>[])});var so="/lib/clang/8.0.1",oo="lib/clang/8.0.1/lib/wasi",Ke="__wasm_idle_build",ao=/\.(?:c|cc|cpp|cxx)$/,lo=new Set(["-target","--target","-triple","-target-feature","-target-cpu","-target-abi","-mcpu","-march","-mattr","-mthread-model","-mllvm","-pthread","-fopenmp","-msimd128","-mno-simd128","-matomics","-mno-atomics","-mmemory64","-mno-memory64","-mshared-memory","-mno-shared-memory","-mmulti-memory","-mno-multi-memory"]),fo=["-target=","--target=","-triple=","-target-feature=","-target-cpu=","-target-abi=","-mcpu=","-march=","-mattr=","-mthread-model=","-mllvm="],Ir=n=>{let e=encodeURIComponent(n),t="";for(let _=0;_<e.length;){let r=e[_];if(_+=1,r=="%"){let i=e.substring(_,_+=2);i&&(t+=String.fromCharCode(parseInt(i,16)))}else t+=r}return t};function co(n,e){let t=[...n],_=e,r,i=!1;for(let s=0;s<n.length;s+=1){let o=n[s],a=n[s+1];if(_){t[s]=" ",o==="*"&&a==="/"&&(t[s+1]=" ",s+=1,_=!1);continue}if(r){t[s]=" ",i?i=!1:o==="\\"?i=!0:o===r&&(r=void 0);continue}if(o==="/"&&a==="*"){t[s]=" ",t[s+1]=" ",s+=1,_=!0;continue}if(o==="/"&&a==="/"){for(let d=s;d<n.length;d+=1)t[d]=" ";break}(o==='"'||o==="'")&&(t[s]=" ",r=o)}return{line:t.join(""),inBlockComment:_}}var F_=class{ready;memfs;stdout;moduleCache;showTiming;log;debug=!1;debugBreakpoints=new Set;debugPauseOnEntry=!1;debugBuffer;debugInterruptBuffer;debugWatchBuffer;debugWatchResultBuffer;onDebugEvent;debugVariableMetadata={};debugGlobalMetadata=[];debugFunctionMetadata={};lastBuildKey="";path;assetUrls;compilerConfig;wasm;lastArtifactPath="main.wasm";traceStartedAt=0;progress;maxAssetBytes;constructor(e){let t=e.maxAssetBytes??zt;if(!Number.isSafeInteger(t)||t<=0)throw new TypeError("Clang maxAssetBytes must be a positive safe integer");this.maxAssetBytes=t,this.moduleCache={},this.stdout=e.stdout||(()=>{}),this.showTiming=e.showTiming||!1,this.log=e.log||!1,this.path=e.runtimeBaseUrl.toString(),this.assetUrls=gr(this.path,e.manifest),this.compilerConfig=e.manifest?.compiler,this.onDebugEvent=e.onDebugEvent,this.progress=mr(s=>e.progress?.(s)),this.memfs=new Zt({stdout:this.stdout,stdin:e.stdin||(()=>""),moduleUrl:this.assetUrls.memfs,progress:this.progress.memfs,signal:e.signal,maxAssetBytes:t,trace:s=>this.trace(s)});let _=this.getModule(this.assetUrls.clang,this.progress.clang,e.signal),r=this.getModule(this.assetUrls.lld,this.progress.lld,e.signal),i=this.memfs.ready.then(async()=>{let s=e.signal?Cn(this.assetUrls.sysroot,void 0,t,e.signal):Cn(this.assetUrls.sysroot,void 0,t);await this.hostLogAsync(`Untarring ${this.assetUrls.sysroot}`,s.then(o=>D_(o,this.memfs))),ur({readFile:o=>this.memfs.hasFile(o)?this.memfs.getFileContents(o.replace(/^\/+/,"")):null,mkdirTree:o=>this.memfs.addDirectory(o.replace(/^\/+/,"")),writeFile:(o,a)=>this.memfs.addFile(o.replace(/^\/+/,""),a)},this.compilerConfig?.provenance,this.compilerConfig?.resourceDir),fr(this.memfs)});this.ready=Promise.all([_,r,i]).then(()=>{})}hostLog(e){if(!this.log)return;let t=`${hr}>${Fn} `;this.stdout(`${t}${e}`)}beginTrace(e){this.debug=e,this.traceStartedAt=Date.now()}trace(e){if(!this.debug||!this.log)return;let t=Date.now()-this.traceStartedAt;this.stdout(`\x1B[2m[debug +${t}ms] ${e}\x1B[0m
`)}async hostLogAsync(e,t){let _=+new Date;this.hostLog(`${e}...`);let r=await t,i=+new Date;return this.log&&this.stdout(" done."),this.showTiming&&this.stdout(` ${U_}(${i-_}ms)${Fn}
`),this.log&&this.stdout(`
`),r}async getModule(e,t,_){if(this.moduleCache[e])return this.moduleCache[e];let r=await this.hostLogAsync(`Fetching and compiling ${e}`,Ct(e,t,_,this.maxAssetBytes));return this.moduleCache[e]=r,r}addWorkspaceDirectories(e,t=new Set){let _=$e(e).split("/").slice(0,-1),r="";for(let i of _)r=r?`${r}/${i}`:i,t.has(r)||(this.memfs.addDirectory(r),t.add(r))}addWorkspaceFiles(e=[],t=""){let _=new Set,r=$e(t);for(let i of e){let s=$e(i.path);!s||s===r||(this.addWorkspaceDirectories(s,_),this.memfs.addFile(s,Ir(i.content)))}}async compile(e){let t=$e(e.input||"main.cc")||"main.cc",_=e.code,r=e.obj,i=e.language==="C"?"C":e.language==="OBJC"?"OBJC":"CPP",s=e.compileArgs??e.args??[],{languageArg:o,standardArg:a}=lr(i,e),d=_t(e),l=d==="trace",f=d==="lldb";if(f)for(let b of s){if(typeof b!="string")throw new TypeError("LLDB compile arguments must be strings");if(lo.has(b)||fo.some(x=>b.startsWith(x)))throw new Error(`LLDB compile argument ${JSON.stringify(b)} cannot change the WAMR debug target profile`)}let u=d==="none"?e.opt||"2":"0";if(l){let b=_.split(`
`),x=!1,p=b.map(C=>{let D=co(C,x);return x=D.inBlockComment,D.line}),g=C=>{if(/^(?:do|else)$/.test(C))return!0;if(!/^(?:else\s+)?(?:if|for|while)\s*\(/.test(C))return!1;let D=C.indexOf("("),k=0;for(let oe=D;oe<C.length;oe+=1)if(C[oe]==="("&&(k+=1),C[oe]===")"&&(k-=1,k===0))return C.slice(oe+1).trim()==="";return!1},m=new Set,N=!1,A=!1;for(let C=0;C<p.length;C+=1){let D=p[C].trim();if(!D)continue;let k=A,oe=k;k&&D.includes(";")&&(A=!1),N&&(N=!1,D!=="{"&&(oe=!0,!D.includes(";")&&!D.includes("{")&&!g(D)&&(A=!0))),/^while\s*\(.*\)\s*;$/.test(D)&&(oe=!0),oe&&m.add(C),g(D)&&(N=!0)}let y=0,R=0,E=0,V=1,W=1,H=new Map,Z=new Map,v=new Map,U,te=new Map,J="",Le=[],ue=!1;for(let C of b){let D=C;if(ue){let Q=D.indexOf("*/");if(Q===-1)continue;D=D.slice(Q+2),ue=!1}let k=D.indexOf("/*");if(k!==-1){let Q=D.indexOf("*/",k+2);Q===-1?(ue=!0,D=D.slice(0,k)):D=D.slice(0,k)+D.slice(Q+2)}let oe=D.indexOf("//");oe!==-1&&(D=D.slice(0,oe));let be=D.trim();if(!J){let Q=be.match(/^struct\s+([A-Za-z_]\w*)\s*\{$/);Q?.[1]&&(J=Q[1],Le=[]);continue}if(be==="};"){let Q=0,fe=1,ve=[];for(let ze of Le){let He=ze.kind==="double"?8:ze.kind==="bool"||ze.kind==="char"?1:4;Q%He!==0&&(Q+=He-Q%He),ve.push({name:ze.name,kind:ze.kind,offset:Q}),Q+=He,fe=Math.max(fe,He)}Q%fe!==0&&(Q+=fe-Q%fe),te.set(J,{fields:ve,size:Math.max(Q,1)}),J="",Le=[];continue}let w=be.match(/^(?:const\s+)?(?:(?:unsigned|signed)\s+)?(?:(?:short|long long|long)\s+)?(int|float|double|bool|char)\s+(.+);$/);if(w)for(let Q of w[2].split(",")){let fe=Q.split("=")[0]?.trim()||"";if(!fe||/[*&\[]/.test(fe))continue;let ve=fe.match(/([A-Za-z_]\w*)\s*$/)?.[1];ve&&Le.push({name:ve,kind:w[1]})}}this.debugVariableMetadata={},this.debugGlobalMetadata=[],this.debugFunctionMetadata={};let Se=[],ne=i==="CPP"?'extern "C" ':"",pe=[`${ne}__attribute__((import_module("env"), import_name("__wasm_idle_debug_enter"))) void __wasm_idle_debug_enter(int functionId, int line);`,`${ne}__attribute__((import_module("env"), import_name("__wasm_idle_debug_leave"))) void __wasm_idle_debug_leave(int functionId);`,`${ne}__attribute__((import_module("env"), import_name("__wasm_idle_debug_value_num"))) void __wasm_idle_debug_value_num(int functionId, int slot, double value);`,`${ne}__attribute__((import_module("env"), import_name("__wasm_idle_debug_value_bool"))) void __wasm_idle_debug_value_bool(int functionId, int slot, int value);`,`${ne}__attribute__((import_module("env"), import_name("__wasm_idle_debug_value_addr"))) void __wasm_idle_debug_value_addr(int functionId, int slot, int value);`,`${ne}__attribute__((import_module("env"), import_name("__wasm_idle_debug_value_text"))) void __wasm_idle_debug_value_text(int functionId, int slot, const char* ptr, int len);`,`${ne}__attribute__((import_module("env"), import_name("__wasm_idle_debug_line"))) void __wasm_idle_debug_line(int functionId, int line);`],G=i==="CPP"?["#include <cstdio>","#include <iostream>","#include <map>","#include <set>","#include <string>","#include <type_traits>","#include <vector>",...pe,"template <typename T>","static inline std::string __wasm_idle_debug_format_value(const T& value) {",'    if constexpr (std::is_same_v<T, bool>) return value ? "true" : "false";',`    else if constexpr (std::is_same_v<T, char>) return std::string("'") + value + "'";`,"    else if constexpr (std::is_same_v<T, signed char> || std::is_same_v<T, unsigned char>) return std::to_string((int)value);","    else if constexpr (std::is_integral_v<T> || std::is_floating_point_v<T>) return std::to_string(value);",'    else return "?";',"}","template <typename T>","static inline void __wasm_idle_debug_emit_vector(int functionId, int slot, const std::vector<T>& values) {",'    std::string text = "[";',"    int count = 0;","    for (const auto& value : values) {",'        if (count > 0) text += ", ";','        if (count >= 8) { text += "..."; break; }',"        text += __wasm_idle_debug_format_value(value);","        count += 1;","    }",'    text += "]";',"    __wasm_idle_debug_value_text(functionId, slot, text.c_str(), (int)text.size());","}","template <typename T>","static inline void __wasm_idle_debug_emit_set(int functionId, int slot, const std::set<T>& values) {",'    std::string text = "{";',"    int count = 0;","    for (const auto& value : values) {",'        if (count > 0) text += ", ";','        if (count >= 8) { text += "..."; break; }',"        text += __wasm_idle_debug_format_value(value);","        count += 1;","    }",'    text += "}";',"    __wasm_idle_debug_value_text(functionId, slot, text.c_str(), (int)text.size());","}","template <typename K, typename V>","static inline void __wasm_idle_debug_emit_map(int functionId, int slot, const std::map<K, V>& values) {",'    std::string text = "{";',"    int count = 0;","    for (const auto& entry : values) {",'        if (count > 0) text += ", ";','        if (count >= 8) { text += "..."; break; }',"        text += __wasm_idle_debug_format_value(entry.first);",'        text += ": ";',"        text += __wasm_idle_debug_format_value(entry.second);","        count += 1;","    }",'    text += "}";',"    __wasm_idle_debug_value_text(functionId, slot, text.c_str(), (int)text.size());","}"]:["#include <stdio.h>",...pe];for(let C=0;C<b.length;C+=1){let D=b[C],k=D.match(/^\s*/)?.[0]||"",oe=D,be=p[C],w=be.trim(),Q=m.has(C),fe=R>0&&y>=R,ve=R===0&&y===0&&!w.includes("(")&&!w.startsWith("#"),ze=/^(while|if|for)\s*\(/.test(w)&&!w.includes("{"),He=[],Je=[],Q_=new Set,Qn=ve&&w.match(/^(?:const\s+)?(?:(?:unsigned|signed)\s+)?(?:(?:short|long long|long)\s+)?(int|float|double|bool|char)\s+(.+);$/);if(Qn){let se=Qn[1]==="bool"?"bool":"number",he=[],Ie="",X=0;for(let F of Qn[2]){if(F===","&&X===0){Ie.trim()&&he.push(Ie.trim()),Ie="";continue}F==="{"&&(X+=1),F==="}"&&(X=Math.max(0,X-1)),Ie+=F}Ie.trim()&&he.push(Ie.trim());for(let F of he){let[$]=F.split("="),_e=$?.trim()||"";if(/[*&\[]/.test(_e))continue;let z=_e.match(/([A-Za-z_]\w*)\s*$/)?.[1];if(!z)continue;let ee=W++;Z.set(z,{slot:ee,kind:se,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}),this.debugGlobalMetadata=[...this.debugGlobalMetadata,{slot:ee,name:z,kind:se,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],Se.push(`${se==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(0, ${ee}, ${z});`)}}let ut=ve&&w.match(/^(?:const\s+)?([A-Za-z_]\w*)\s+([A-Za-z_]\w*)\s*\[(\d+)\]\s*(?:=.*)?;$/);if(ut){let se=te.get(ut[1]);if(se){let he=W++;this.debugGlobalMetadata=[...this.debugGlobalMetadata,{slot:he,name:ut[2],kind:"array",length:Number(ut[3]),dimensions:[Number(ut[3])],structFields:se.fields,structSize:se.size,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],Se.push(`__wasm_idle_debug_value_addr(0, ${he}, (int)((unsigned long long)(${ut[2]})));`)}}if(fe&&!Q&&w&&!w.startsWith("#")&&w!=="{"&&w!=="}"&&!w.startsWith("else")&&!w.startsWith("case ")&&w!=="case"&&!w.startsWith("default")&&!w.startsWith("catch")&&!/^(public|private|protected)\s*:/.test(w)&&!w.endsWith(":")&&!w.includes(" else ")){He.push(`${k}__wasm_idle_debug_line(${E}, ${C+1});`);let se=w.match(/^(?:const\s+)?(?:(?:unsigned|signed)\s+)?(?:(?:short|long long|long)\s+)?(int|float|double|bool|char)\s+(.+);$/),he=w.match(/^(?:const\s+)?(?:(?:std::)?(vector|set|map))\s*<(.+)>\s+([A-Za-z_]\w*)\s*(?:=.*)?;$/);if(he&&E){let X=W++,F=he[1],$=he[3];Q_.add($),v.set($,{slot:X,container:F,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}),this.debugVariableMetadata[E]=[...this.debugVariableMetadata[E]||[],{slot:X,name:$,kind:"text",fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],Je.push(`${k}__wasm_idle_debug_emit_${F}(${E}, ${X}, ${$});`)}if(se&&E){let X=se[1]==="bool"?"bool":"number",F=[],$="",_e=0,z=0;for(let ee of se[2]){if(ee===","&&_e===0&&z===0){$.trim()&&F.push($.trim()),$="";continue}ee==="("&&(_e+=1),ee===")"&&(_e=Math.max(0,_e-1)),ee==="{"&&(z+=1),ee==="}"&&(z=Math.max(0,z-1)),$+=ee}$.trim()&&F.push($.trim());for(let ee of F){let[ae]=ee.split("="),q=ae?.trim()||"",me=[];for(let ce of q.matchAll(/\[(\d+)\]/g))me.push(Number(ce[1]));let Te=q.match(/([A-Za-z_]\w*)\s*(?=\[\d+\])/);if(me.length&&Te){let ce=W++;this.debugVariableMetadata[E]=[...this.debugVariableMetadata[E]||[],{slot:ce,name:Te[1],kind:"array",elementKind:se[1],length:me[0],dimensions:me,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],Je.push(`${k}__wasm_idle_debug_value_addr(${E}, ${ce}, (int)((unsigned long long)(${Te[1]})));`);continue}if(/[*&]/.test(q))continue;let Ce=q.match(/([A-Za-z_]\w*)\s*(?:\[[^\]]*\])?$/)?.[1];if(Ce){if(!H.has(Ce)){let ce=W++;H.set(Ce,{slot:ce,kind:X,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}),this.debugVariableMetadata[E]=[...this.debugVariableMetadata[E]||[],{slot:ce,name:Ce,kind:X,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}]}if(ee.includes("=")){let ce=H.get(Ce);ce&&Je.push(`${k}${ce.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${E}, ${ce.slot}, ${Ce});`)}}}}let Ie=w.match(/^for\s*\(\s*(?:const\s+)?(?:(?:unsigned|signed)\s+)?(?:(?:short|long long|long)\s+)?(int|float|double|bool|char)\s+([A-Za-z_]\w*)\s*=/);if(Ie&&E){let X=Ie[1]==="bool"?"bool":"number",F=Ie[2];if(!H.has(F)){let $=W++;H.set(F,{slot:$,kind:X,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}),this.debugVariableMetadata[E]=[...this.debugVariableMetadata[E]||[],{slot:$,name:F,kind:X,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}]}}if(!ze){for(let[X,F]of v){if(Q_.has(X))continue;let $=X.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");new RegExp(`\\b${$}\\b`).test(w)&&Je.push(`${k}__wasm_idle_debug_emit_${F.container}(${E}, ${F.slot}, ${X});`)}for(let[X,F]of H){let $=X.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");w.startsWith("for")&&F.toLine===C+1||(new RegExp(`(?:^|[^\\w])(?:\\+\\+|--)\\s*${$}\\b`).test(w)||new RegExp(`\\b${$}\\s*(?:(?:<<|>>|[+\\-*/%&|^])?=|\\+\\+|--)`).test(w)||new RegExp(`&\\s*${$}\\b`).test(w)||new RegExp(`\\b(?:cin|std::cin)\\b[^;]*>>\\s*${$}\\b`).test(w))&&Je.push(`${k}${F.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${E}, ${F.slot}, ${X});`)}for(let[X,F]of Z){if(H.has(X)||v.has(X))continue;let $=X.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");(new RegExp(`(?:^|[^\\w])(?:\\+\\+|--)\\s*${$}\\b`).test(w)||new RegExp(`\\b${$}\\s*(?:(?:<<|>>|[+\\-*/%&|^])?=|\\+\\+|--)`).test(w)||new RegExp(`&\\s*${$}\\b`).test(w)||new RegExp(`\\b(?:cin|std::cin)\\b[^;]*>>\\s*${$}\\b`).test(w))&&Je.push(`${k}${F.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(0, ${F.slot}, ${X});`)}}/^return\b/.test(w)&&He.push(`${k}__wasm_idle_debug_leave(${E});`)}if(R>0&&y===R&&w==="}"&&He.push(`${k}__wasm_idle_debug_leave(${E});`),fe&&E&&(/^(while|if)\s*\(/.test(w)||/^for\s*\(/.test(w))){let he=w.match(/^(while|if|for)\b/)?.[1],Ie=D.indexOf(he||""),X=Ie>=0?D.indexOf("(",Ie):-1;if(X>=0){let F=-1,$=0;for(let _e=X;_e<D.length;_e+=1){let z=D[_e];if(z==="("&&($+=1),z===")"&&($-=1,$===0)){F=_e;break}for(let[ee,ae]of Z){if(H.has(ee)||v.has(ee))continue;let q=ee.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");!ze&&(new RegExp(`(?:^|[^\\w])(?:\\+\\+|--)\\s*${q}\\b`).test(w)||new RegExp(`\\b${q}\\s*(?:(?:<<|>>|[+\\-*/%&|^])?=|\\+\\+|--)`).test(w)||new RegExp(`&\\s*${q}\\b`).test(w))&&Je.push(`${k}${ae.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(0, ${ae.slot}, ${ee});`)}}if(F>X){let _e=D.slice(X+1,F);if(he==="for"){let z=[],ee="",ae=0;for(let q of _e){if(q===";"&&ae===0){z.push(ee),ee="";continue}q==="("&&(ae+=1),q===")"&&(ae=Math.max(0,ae-1)),ee+=q}if(z.push(ee),z.length===3&&z[1]?.trim()){let q=z[0].trim(),me=z[2].trim(),Te=[],Ce=[],ce=[],ei=/^(?:const\s+)?(?:(?:unsigned|signed)\s+)?(?:(?:short|long long|long)\s+)?(?:int|float|double|bool|char)\b/.test(q);for(let[un,pt]of H){let ti=un.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),e_=new RegExp(`(?:^|[^\\w])(?:\\+\\+|--)\\s*${ti}\\b|\\b${ti}\\s*(?:(?:<<|>>|[+\\-*/%&|^])?=|\\+\\+|--)`);!ei&&e_.test(q)&&Te.push(`${pt.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${E}, ${pt.slot}, ${un})`),ei&&e_.test(q)&&Ce.push(`${pt.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${E}, ${pt.slot}, ${un})`),e_.test(me)&&ce.push(`${pt.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${E}, ${pt.slot}, ${un})`)}let qr=Te.length&&q?`(${q}, ${Te.join(", ")})`:z[0],Jr=ce.length&&me?`(${me}, ${ce.join(", ")})`:z[2];oe=D.slice(0,X+1)+`${qr}; (${Ce.length?`${Ce.join(", ")}, `:""}__wasm_idle_debug_line(${E}, ${C+1}), (${z[1].trim()})); ${Jr}`+D.slice(F)}}else{let z=[];if(ze){for(let[ae,q]of H){let me=ae.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");new RegExp(`(?:^|[^\\w])(?:\\+\\+|--)\\s*${me}\\b|\\b${me}\\s*(?:(?:<<|>>|[+\\-*/%&|^])?=|\\+\\+|--)`).test(_e)&&z.push(`${q.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${E}, ${q.slot}, ${ae})`)}for(let[ae,q]of Z){if(H.has(ae)||v.has(ae))continue;let me=ae.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");new RegExp(`(?:^|[^\\w])(?:\\+\\+|--)\\s*${me}\\b|\\b${me}\\s*(?:(?:<<|>>|[+\\-*/%&|^])?=|\\+\\+|--)`).test(_e)&&z.push(`${q.kind==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(0, ${q.slot}, ${ae})`)}}let ee=z.length?`((${_e.trim()}) ? (${z.join(", ")}, 1) : (${z.join(", ")}, 0))`:`(${_e.trim()})`;oe=D.slice(0,X+1)+`(__wasm_idle_debug_line(${E}, ${C+1}), ${ee})`+D.slice(F)}}}}G.push(...He),G.push(oe),G.push(...Je);let cn=R===0&&w.includes("(")&&w.includes(")")&&w.includes("{")&&(be.match(/{/g)||[]).length>(be.match(/}/g)||[]).length&&!/^(if|for|while|switch|catch)\b/.test(w)&&!/^(class|struct|namespace|enum|union)\b/.test(w),Kr=R===0&&!!U&&w==="{";if(y+=(be.match(/{/g)||[]).length,y-=(be.match(/}/g)||[]).length,cn||Kr){R=y,E=V++;let se="anonymous",he=i==="OBJC"&&cn?w.match(/^([-+])\s*\([^)]*\)\s*([A-Za-z_]\w*)/):null;if(cn?(se=w.slice(0,w.indexOf("(")).trim().split(/\s+/).pop()||se,he&&(se=`${he[1]}${he[2]}`)):U&&(se=U.functionName||se),this.debugFunctionMetadata[E]=se,W=1,H=new Map,v=new Map,G.push(`${k}    __wasm_idle_debug_enter(${E}, ${C+1});`),se==="main"){i==="CPP"&&(G.push(`${k}    std::cout.setf(std::ios::unitbuf);`),G.push(`${k}    std::cerr.setf(std::ios::unitbuf);`));let X=i==="CPP"?"nullptr":"NULL";G.push(`${k}    setvbuf(stdout, ${X}, _IONBF, 0);`),G.push(`${k}    setvbuf(stderr, ${X}, _IONBF, 0);`)}let Ie=cn?he?"":w.slice(w.indexOf("(")+1,w.lastIndexOf(")")):U?.parameters||"";for(let X of Ie.split(",").map(F=>F.trim()).filter(Boolean)){let F=X.split("=")[0]?.trim()||"",$=F.match(/^(?:const\s+)?(?:(?:std::)?(vector|set|map)\s*<.+>)\s*&?\s*([A-Za-z_]\w*)\s*$/);if($){let Te=W++,Ce=$[1],ce=$[2];v.set(ce,{slot:Te,container:Ce,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}),this.debugVariableMetadata[E]=[...this.debugVariableMetadata[E]||[],{slot:Te,name:ce,kind:"text",fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],G.push(`${k}    __wasm_idle_debug_emit_${Ce}(${E}, ${Te}, ${ce});`);continue}let _e=[];for(let Te of F.matchAll(/\[(\d+)\]/g))_e.push(Number(Te[1]));let z=F.match(/([A-Za-z_]\w*)\s*(?=\[\d+\])/);if(_e.length&&z&&/\b(int|float|double|bool|char)\b/.test(F)){let Te=W++;this.debugVariableMetadata[E]=[...this.debugVariableMetadata[E]||[],{slot:Te,name:z[1],kind:"array",elementKind:F.match(/\b(int|float|double|bool|char)\b/)?.[1]||"int",length:_e[0],dimensions:_e,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],G.push(`${k}    __wasm_idle_debug_value_addr(${E}, ${Te}, (int)((unsigned long long)(${z[1]})));`);continue}if(/[*&\[]/.test(F))continue;let ee=F.match(/([A-Za-z_]\w*)\s*(?:\[[^\]]*\])?\s*$/);if(!ee)continue;let ae=ee[1],q=/\bbool\b/.test(F)?"bool":/\b(?:int|float|double|char|short|long)\b/.test(F)?"number":"";if(!q)continue;let me=W++;H.set(ae,{slot:me,kind:q,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}),this.debugVariableMetadata[E]=[...this.debugVariableMetadata[E]||[],{slot:me,name:ae,kind:q,fromLine:C+1,toLine:Number.MAX_SAFE_INTEGER}],G.push(`${k}    ${q==="bool"?"__wasm_idle_debug_value_bool":"__wasm_idle_debug_value_num"}(${E}, ${me}, ${ae});`)}U=void 0}else R===0&&w.includes("(")&&w.includes(")")&&!w.includes("{")&&!w.endsWith(";")&&!/^(if|for|while|switch|catch)\b/.test(w)&&!/^(class|struct|namespace|enum|union)\b/.test(w)?U={functionName:w.slice(0,w.indexOf("(")).trim().split(/\s+/).pop()||"anonymous",parameters:w.slice(w.indexOf("(")+1,w.lastIndexOf(")"))}:w&&w!=="{"&&(U=void 0);R>0&&y<R&&(R=0,E=0,H=new Map,v=new Map)}Se.length&&(i==="CPP"?(G.push("struct __wasm_idle_debug_globals_init {"),G.push("    __wasm_idle_debug_globals_init() {"),G.push(...Se.map(C=>`        ${C}`)),G.push("    }"),G.push("} __wasm_idle_debug_globals_init_instance;")):(G.push("__attribute__((constructor)) static void __wasm_idle_debug_globals_init(void) {"),G.push(...Se.map(C=>`    ${C}`)),G.push("}"))),_=G.join(`
`)}else this.debugVariableMetadata={},this.debugGlobalMetadata=[],this.debugFunctionMetadata={};typeof e.transformSource=="function"&&(_=e.transformSource(_));let c=Ir(_);await this.ready,e.sourceAlreadyMounted||(this.addWorkspaceFiles(e.workspaceFiles,t),this.addWorkspaceDirectories(t),this.memfs.addFile(t,c)),this.memfs.addFile(r,new Uint8Array(0));let T=await this.getModule(this.assetUrls.clang),S=this.compilerConfig?.resourceDir||so,h=On(i,"",S).flatMap(b=>["-internal-isystem",b]),I=["-cc1","-triple",ar,"-emit-obj","-disable-free","-isysroot","/","-resource-dir",S,...h,...i==="OBJC"?["-I."]:[],"-ferror-limit","19","-fcolor-diagnostics",...f?[]:["-O"+u],"-o",r,a,"-x",o,...i==="OBJC"?Un:[],t,...s,...f?["-O0","-debug-info-kind=standalone","-dwarf-version=4","-debugger-tuning=gdb","-fdebug-compilation-dir=/workspace"]:[]];this.trace(`compile ${t} -> ${r}`);try{return await this.run(T,!0,"clang",...I)}catch(b){if(Uint8Array.from(this.memfs.getFileContents(r)).length>0)return this.trace(`recover ${r} after clang output stream exit`),null;throw b}}async link(e,t,_="none"){let r=typeof e=="string"?[e]:[...e];if(r.length===0||r.some(f=>typeof f!="string"||f.length===0))throw new TypeError("At least one nonempty object file is required for linking");let i=typeof _=="boolean"?_t({debug:_}):_t({debugMode:_}),s=1024*1024,o="lib/wasm32-wasi",a=this.compilerConfig?.compilerRuntimeLibDir||oo,d=`${o}/crt1.o`;await this.ready;let l=await this.getModule(this.assetUrls.lld);return this.trace(`link ${r.join(", ")} -> ${t}`),await this.run(l,this.log,"wasm-ld","--export-dynamic",...i==="trace"?["--allow-undefined"]:[],"-z",`stack-size=${s}`,`-L${o}/noeh`,`-L${o}`,d,...r,"-lc","-lc++","-lc++abi","-lm",`-L${a}`,"-lclang_rt.builtins-wasm32","-o",t)}async run(e,t,..._){return this.runWithOptions(e,t,_)}async runWithOptions(e,t,_,r={},i,s){this.memfs.out=t,this.hostLog(`${_.join(" ")}
`),this.trace(`run ${_.join(" ")}`);let o=+new Date,a=new Jt(e,this.memfs,_[0],..._.slice(1),{extraImports:i,instanceRef:s});a.environ={...a.environ,...r},a.trace=u=>this.trace(u),a.debugSession={buffer:this.debugBuffer,interruptBuffer:this.debugInterruptBuffer,watchBuffer:this.debugWatchBuffer,watchResultBuffer:this.debugWatchResultBuffer,breakpoints:new Set(this.debugBreakpoints),breakpointVersion:0,pauseOnEntry:this.debugPauseOnEntry,stepArmed:this.debugPauseOnEntry,nextLineArmed:!1,stepOutArmed:!1,callDepth:0,stepOutDepth:0,currentFunctionId:0,currentLine:0,resumeSkipActive:!1,resumeSkipFunctionId:0,resumeSkipLine:0,nextLineFunctionId:0,nextLineLine:0,variableMetadata:this.debugVariableMetadata,globalVariableMetadata:this.debugGlobalMetadata,functionMetadata:this.debugFunctionMetadata,frames:[],globalValues:new Map,onPause:u=>this.onDebugEvent?.(u)};let d=+new Date,l=await a.run(),f=+new Date;return this.log&&this.stdout(`
`),this.showTiming&&this.stdout(`${U_}(${o-d}ms/${f-d}ms)${Fn}
`),l?a:null}async compileLink(e,t={}){let{language:_="CPP",fileName:r,activePath:i,workspaceFiles:s=[],args:o=[],compileArgs:a=o,debugMode:d,debug:l,breakpoints:f=[],pauseOnEntry:u=!1,cppVersion:c,cVersion:T,debugBuffer:S,interruptBuffer:h,watchBuffer:I,watchResultBuffer:b}=t,x=_t({debugMode:d,debug:l}),p=x==="lldb"?Mt:$e,g=s.map(v=>({...v,path:p(v.path)})),m=p(i||"")||p(r||"")||void 0,{input:N,obj:A,wasm:y}=Qt(_,m),R=new Map;for(let v of g)if(v.path){if(v.path===Ke||v.path.startsWith(`${Ke}/`))throw new Error(`Workspace path uses reserved build namespace ${JSON.stringify(Ke)}`);R.set(v.path,v)}if(N===Ke||N.startsWith(`${Ke}/`))throw new Error(`Active source path uses reserved build namespace ${JSON.stringify(Ke)}`);R.set(N,{path:N,content:e});let E=[...R.values()].sort((v,U)=>v.path<U.path?-1:v.path>U.path?1:0),V=E.filter(v=>v.path===N||ao.test(v.path)),W=x==="trace";if(W&&V.length>1)throw new Error("Trace debug mode does not support multiple C/C++ translation units");this.beginTrace(W),this.debugBreakpoints=new Set(W?f:[]),this.debugPauseOnEntry=W&&u,this.debugBuffer=S,this.debugInterruptBuffer=h,this.debugWatchBuffer=I,this.debugWatchResultBuffer=b,this.lastArtifactPath=y;let H=JSON.stringify({code:e,input:N,wasm:y,language:_,compileArgs:a,workspaceFiles:E,cppVersion:c,cVersion:T,debugMode:x});if(this.lastBuildKey===H)return this.trace(`reuse ${y}`),this.wasm;if(V.length===1)await this.compile({input:N,code:e,obj:A,language:_,compileArgs:a,workspaceFiles:g,cppVersion:c,cVersion:T,debugMode:x}),await this.link(A,y,x);else{await this.ready,this.addWorkspaceFiles(E),this.memfs.addDirectory(Ke),this.memfs.addDirectory(`${Ke}/objects`);let v=[];for(let[U,te]of V.entries()){let J=`${Ke}/objects/${U.toString().padStart(4,"0")}.o`;v.push(J),await this.compile({input:te.path,code:te.content,obj:J,language:te.path===N?_:te.path.endsWith(".c")?"C":"CPP",compileArgs:a,workspaceFiles:[],cppVersion:c,cVersion:T,debugMode:x,sourceAlreadyMounted:!0})}await this.link(v,y,x)}this.lastBuildKey=H;let Z=Uint8Array.from(this.memfs.getFileContents(y));return this.wasm=await this.hostLogAsync(`Compiling ${y}`,WebAssembly.compile(Z))}async compileArtifact(e,t={}){let _=_t(t),r=await this.compileLink(e,t),i=Uint8Array.from(this.memfs.getFileContents(this.lastArtifactPath)),s=t.language||"CPP",o={code:e,language:s,fileName:t.fileName,activePath:t.activePath,workspaceFiles:t.workspaceFiles,compileArgs:t.compileArgs,cppVersion:t.cppVersion,cVersion:t.cVersion,debugMode:_};return{bytes:i,wasm:r,target:"wasm32-wasi",format:"wasi-core-wasm",fileName:this.lastArtifactPath,language:s,..._==="trace"?{debugMetadata:{variableMetadata:this.debugVariableMetadata,globalVariableMetadata:this.debugGlobalMetadata,functionMetadata:this.debugFunctionMetadata}}:{},..._==="lldb"?{debug:await Ar(o,i,this.compilerConfig?.provenance)}:{}}}async compileLinkRun(e,t={}){let{language:_="CPP",fileName:r,activePath:i,workspaceFiles:s=[],args:o=[],compileArgs:a=o,programArgs:d=[],debugMode:l,debug:f,breakpoints:u=[],pauseOnEntry:c=!1,cppVersion:T,cVersion:S,debugBuffer:h,interruptBuffer:I,watchBuffer:b,watchResultBuffer:x}=t,p=_t({debugMode:l,debug:f});if(p==="lldb")throw new Error("compileLinkRun() cannot execute LLDB artifacts in the browser WebAssembly engine. Use compileArtifact() and @wasm-idle/llvm-core/debug instead.");this.debug=p==="trace";let g=$e(i||"")||$e(r||"")||void 0,{wasm:m}=Qt(_,g);return await this.run(await this.compileLink(e,{language:_,fileName:r,activePath:i,workspaceFiles:s,compileArgs:a,debugMode:p,breakpoints:u,pauseOnEntry:c,cppVersion:T,cVersion:S,debugBuffer:h,interruptBuffer:I,watchBuffer:b,watchResultBuffer:x}),!0,m,...d)}};var G_=F_;function we(n,e){if(!n||typeof n!="object"||Array.isArray(n))throw new Error(`invalid ${e} in wasm-clang runtime manifest`);return n}function Ee(n,e){if(typeof n!="string"||n.length===0)throw new Error(`invalid ${e} in wasm-clang runtime manifest`);return n}function uo(n,e){if(n!=="wasm32-wasi")throw new Error(`invalid ${e} in wasm-clang runtime manifest`);return n}function po(n){let e=we(n,"root.compiler.provenance");if(e.name!=="clang")throw new Error("invalid root.compiler.provenance.name in wasm-clang runtime manifest");return{name:"clang",version:Ee(e.version,"root.compiler.provenance.version"),revision:Ee(e.revision,"root.compiler.provenance.revision")}}function ho(n){let e=we(n,"root.compiler"),t=we(e.sysroot,"root.compiler.sysroot");return{memfs:{asset:Ee(we(e.memfs,"root.compiler.memfs").asset,"root.compiler.memfs.asset"),argv0:Ee(we(e.memfs,"root.compiler.memfs").argv0,"root.compiler.memfs.argv0")},clang:{asset:Ee(we(e.clang,"root.compiler.clang").asset,"root.compiler.clang.asset"),argv0:Ee(we(e.clang,"root.compiler.clang").argv0,"root.compiler.clang.argv0")},lld:{asset:Ee(we(e.lld,"root.compiler.lld").asset,"root.compiler.lld.asset"),argv0:Ee(we(e.lld,"root.compiler.lld").argv0,"root.compiler.lld.argv0")},sysroot:{asset:Ee(t.asset,"root.compiler.sysroot.asset"),...typeof t.runtimeRoot=="string"?{runtimeRoot:t.runtimeRoot}:{}},...e.resourceDir!==void 0?{resourceDir:Ee(e.resourceDir,"root.compiler.resourceDir")}:{},...e.compilerRuntimeLibDir!==void 0?{compilerRuntimeLibDir:Ee(e.compilerRuntimeLibDir,"root.compiler.compilerRuntimeLibDir")}:{},...typeof e.defaultCppStandard=="string"?{defaultCppStandard:e.defaultCppStandard}:{},...typeof e.defaultCStandard=="string"?{defaultCStandard:e.defaultCStandard}:{},...e.provenance!==void 0?{provenance:po(e.provenance)}:{}}}function mo(n){let e=we(n,"root.clangd");return{js:Ee(e.js,"root.clangd.js"),wasm:Ee(e.wasm,"root.clangd.wasm")}}function To(n,e){let t=we(n,e);if(we(t.execution,`${e}.execution`).kind!=="wasi-preview1")throw new Error(`invalid ${e}.execution.kind in wasm-clang runtime manifest`);if(t.artifactFormat!=="wasi-core-wasm")throw new Error(`invalid ${e}.artifactFormat in wasm-clang runtime manifest`);return{artifactFormat:"wasi-core-wasm",execution:{kind:"wasi-preview1"}}}function go(n){let e=we(n,"root.targets");return{"wasm32-wasi":To(e["wasm32-wasi"],"root.targets.wasm32-wasi")}}function Pn(n){let e=we(n,"root");if(e.manifestVersion!==1)throw new Error("invalid root.manifestVersion in wasm-clang runtime manifest");return{manifestVersion:1,version:Ee(e.version,"root.version"),defaultTarget:uo(e.defaultTarget,"root.defaultTarget"),compiler:ho(e.compiler),clangd:mo(e.clangd),targets:go(e.targets)}}async function P_(n,e=fetch,t,_=Ln){let r=O_(n,"wasm-clang runtime manifest URL");return Pn(await Vi(r,{fetchImpl:e,label:"wasm-clang runtime manifest",maxBytes:Math.min(_,Ln),signal:t}))}function H_(n){return Gn(n)}var re={};n_(re,{ADVICE_DONTNEED:()=>Td,ADVICE_NOREUSE:()=>gd,ADVICE_NORMAL:()=>ud,ADVICE_RANDOM:()=>hd,ADVICE_SEQUENTIAL:()=>pd,ADVICE_WILLNEED:()=>md,CLOCKID_MONOTONIC:()=>rn,CLOCKID_PROCESS_CPUTIME_ID:()=>No,CLOCKID_REALTIME:()=>_n,CLOCKID_THREAD_CPUTIME_ID:()=>yo,Ciovec:()=>Ut,Dirent:()=>at,ERRNO_2BIG:()=>xo,ERRNO_ACCES:()=>bo,ERRNO_ADDRINUSE:()=>Eo,ERRNO_ADDRNOTAVAIL:()=>wo,ERRNO_AFNOSUPPORT:()=>Ro,ERRNO_AGAIN:()=>Lo,ERRNO_ALREADY:()=>Co,ERRNO_BADF:()=>O,ERRNO_BADMSG:()=>vo,ERRNO_BUSY:()=>Mo,ERRNO_CANCELED:()=>Do,ERRNO_CHILD:()=>Uo,ERRNO_CONNABORTED:()=>Oo,ERRNO_CONNREFUSED:()=>Fo,ERRNO_CONNRESET:()=>Go,ERRNO_DEADLK:()=>Po,ERRNO_DESTADDRREQ:()=>Ho,ERRNO_DOM:()=>Xo,ERRNO_DQUOT:()=>ko,ERRNO_EXIST:()=>Ot,ERRNO_FAULT:()=>$o,ERRNO_FBIG:()=>Wo,ERRNO_HOSTUNREACH:()=>Bo,ERRNO_IDRM:()=>Vo,ERRNO_ILSEQ:()=>zo,ERRNO_INPROGRESS:()=>jo,ERRNO_INTR:()=>Yo,ERRNO_INVAL:()=>We,ERRNO_IO:()=>Ko,ERRNO_ISCONN:()=>qo,ERRNO_ISDIR:()=>Xn,ERRNO_LOOP:()=>Jo,ERRNO_MFILE:()=>Zo,ERRNO_MLINK:()=>Qo,ERRNO_MSGSIZE:()=>ea,ERRNO_MULTIHOP:()=>ta,ERRNO_NAMETOOLONG:()=>X_,ERRNO_NETDOWN:()=>na,ERRNO_NETRESET:()=>_a,ERRNO_NETUNREACH:()=>ia,ERRNO_NFILE:()=>ra,ERRNO_NOBUFS:()=>sa,ERRNO_NODEV:()=>oa,ERRNO_NOENT:()=>qe,ERRNO_NOEXEC:()=>aa,ERRNO_NOLCK:()=>da,ERRNO_NOLINK:()=>la,ERRNO_NOMEM:()=>fa,ERRNO_NOMSG:()=>ca,ERRNO_NOPROTOOPT:()=>ua,ERRNO_NOSPC:()=>pa,ERRNO_NOSYS:()=>k_,ERRNO_NOTCAPABLE:()=>$n,ERRNO_NOTCONN:()=>ha,ERRNO_NOTDIR:()=>Pe,ERRNO_NOTEMPTY:()=>kn,ERRNO_NOTRECOVERABLE:()=>ma,ERRNO_NOTSOCK:()=>Ta,ERRNO_NOTSUP:()=>K,ERRNO_NOTTY:()=>ga,ERRNO_NXIO:()=>Sa,ERRNO_OVERFLOW:()=>Aa,ERRNO_OWNERDEAD:()=>Ia,ERRNO_PERM:()=>Ft,ERRNO_PIPE:()=>Na,ERRNO_PROTO:()=>ya,ERRNO_PROTONOSUPPORT:()=>xa,ERRNO_PROTOTYPE:()=>ba,ERRNO_RANGE:()=>Ea,ERRNO_ROFS:()=>wa,ERRNO_SPIPE:()=>Ra,ERRNO_SRCH:()=>La,ERRNO_STALE:()=>Ca,ERRNO_SUCCESS:()=>B,ERRNO_TIMEDOUT:()=>va,ERRNO_TXTBSY:()=>Ma,ERRNO_XDEV:()=>Da,EVENTRWFLAGS_FD_READWRITE_HANGUP:()=>Ld,EVENTTYPE_CLOCK:()=>$_,EVENTTYPE_FD_READ:()=>wd,EVENTTYPE_FD_WRITE:()=>Rd,Event:()=>tn,FDFLAGS_APPEND:()=>Vn,FDFLAGS_DSYNC:()=>Sd,FDFLAGS_NONBLOCK:()=>Ad,FDFLAGS_RSYNC:()=>Id,FDFLAGS_SYNC:()=>Nd,FD_STDERR:()=>Io,FD_STDIN:()=>So,FD_STDOUT:()=>Ao,FILETYPE_BLOCK_DEVICE:()=>dd,FILETYPE_CHARACTER_DEVICE:()=>Nr,FILETYPE_DIRECTORY:()=>Re,FILETYPE_REGULAR_FILE:()=>ft,FILETYPE_SOCKET_DGRAM:()=>ld,FILETYPE_SOCKET_STREAM:()=>fd,FILETYPE_SYMBOLIC_LINK:()=>cd,FILETYPE_UNKNOWN:()=>ad,FSTFLAGS_ATIM:()=>yd,FSTFLAGS_ATIM_NOW:()=>xd,FSTFLAGS_MTIM:()=>bd,FSTFLAGS_MTIM_NOW:()=>Ed,Fdstat:()=>dt,Filestat:()=>lt,Iovec:()=>Dt,OFLAGS_CREAT:()=>an,OFLAGS_DIRECTORY:()=>ct,OFLAGS_EXCL:()=>zn,OFLAGS_TRUNC:()=>dn,PREOPENTYPE_DIR:()=>yr,Prestat:()=>nn,PrestatDir:()=>Hn,RIFLAGS_RECV_PEEK:()=>ol,RIFLAGS_RECV_WAITALL:()=>al,RIGHTS_FD_ADVISE:()=>Xa,RIGHTS_FD_ALLOCATE:()=>ka,RIGHTS_FD_DATASYNC:()=>Ua,RIGHTS_FD_FDSTAT_SET_FLAGS:()=>Ga,RIGHTS_FD_FILESTAT_GET:()=>ed,RIGHTS_FD_FILESTAT_SET_SIZE:()=>td,RIGHTS_FD_FILESTAT_SET_TIMES:()=>nd,RIGHTS_FD_READ:()=>Oa,RIGHTS_FD_READDIR:()=>ja,RIGHTS_FD_SEEK:()=>Fa,RIGHTS_FD_SYNC:()=>Pa,RIGHTS_FD_TELL:()=>Ha,RIGHTS_FD_WRITE:()=>sn,RIGHTS_PATH_CREATE_DIRECTORY:()=>$a,RIGHTS_PATH_CREATE_FILE:()=>Wa,RIGHTS_PATH_FILESTAT_GET:()=>Ja,RIGHTS_PATH_FILESTAT_SET_SIZE:()=>Za,RIGHTS_PATH_FILESTAT_SET_TIMES:()=>Qa,RIGHTS_PATH_LINK_SOURCE:()=>Ba,RIGHTS_PATH_LINK_TARGET:()=>Va,RIGHTS_PATH_OPEN:()=>za,RIGHTS_PATH_READLINK:()=>Ya,RIGHTS_PATH_REMOVE_DIRECTORY:()=>id,RIGHTS_PATH_RENAME_SOURCE:()=>Ka,RIGHTS_PATH_RENAME_TARGET:()=>qa,RIGHTS_PATH_SYMLINK:()=>_d,RIGHTS_PATH_UNLINK_FILE:()=>rd,RIGHTS_POLL_FD_READWRITE:()=>sd,RIGHTS_SOCK_SHUTDOWN:()=>od,ROFLAGS_RECV_DATA_TRUNCATED:()=>dl,SDFLAGS_RD:()=>ll,SDFLAGS_WR:()=>fl,SIGNAL_ABRT:()=>Fd,SIGNAL_ALRM:()=>Bd,SIGNAL_BUS:()=>Gd,SIGNAL_CHLD:()=>zd,SIGNAL_CONT:()=>jd,SIGNAL_FPE:()=>Pd,SIGNAL_HUP:()=>vd,SIGNAL_ILL:()=>Ud,SIGNAL_INT:()=>Md,SIGNAL_KILL:()=>Hd,SIGNAL_NONE:()=>Cd,SIGNAL_PIPE:()=>Wd,SIGNAL_POLL:()=>il,SIGNAL_PROF:()=>nl,SIGNAL_PWR:()=>rl,SIGNAL_QUIT:()=>Dd,SIGNAL_SEGV:()=>kd,SIGNAL_STOP:()=>Yd,SIGNAL_SYS:()=>sl,SIGNAL_TERM:()=>Vd,SIGNAL_TRAP:()=>Od,SIGNAL_TSTP:()=>Kd,SIGNAL_TTIN:()=>qd,SIGNAL_TTOU:()=>Jd,SIGNAL_URG:()=>Zd,SIGNAL_USR1:()=>Xd,SIGNAL_USR2:()=>$d,SIGNAL_VTALRM:()=>tl,SIGNAL_WINCH:()=>_l,SIGNAL_XCPU:()=>Qd,SIGNAL_XFSZ:()=>el,SUBCLOCKFLAGS_SUBSCRIPTION_CLOCK_ABSTIME:()=>W_,Subscription:()=>en,WHENCE_CUR:()=>Bn,WHENCE_END:()=>on,WHENCE_SET:()=>Wn});var So=0,Ao=1,Io=2,_n=0,rn=1,No=2,yo=3,B=0,xo=1,bo=2,Eo=3,wo=4,Ro=5,Lo=6,Co=7,O=8,vo=9,Mo=10,Do=11,Uo=12,Oo=13,Fo=14,Go=15,Po=16,Ho=17,Xo=18,ko=19,Ot=20,$o=21,Wo=22,Bo=23,Vo=24,zo=25,jo=26,Yo=27,We=28,Ko=29,qo=30,Xn=31,Jo=32,Zo=33,Qo=34,ea=35,ta=36,X_=37,na=38,_a=39,ia=40,ra=41,sa=42,oa=43,qe=44,aa=45,da=46,la=47,fa=48,ca=49,ua=50,pa=51,k_=52,ha=53,Pe=54,kn=55,ma=56,Ta=57,K=58,ga=59,Sa=60,Aa=61,Ia=62,Ft=63,Na=64,ya=65,xa=66,ba=67,Ea=68,wa=69,Ra=70,La=71,Ca=72,va=73,Ma=74,Da=75,$n=76,Ua=1,Oa=2,Fa=4,Ga=8,Pa=16,Ha=32,sn=64,Xa=128,ka=256,$a=512,Wa=1024,Ba=2048,Va=4096,za=8192,ja=16384,Ya=32768,Ka=65536,qa=131072,Ja=262144,Za=524288,Qa=1048576,ed=2097152,td=4194304,nd=8388608,_d=16777216,id=33554432,rd=67108864,sd=134217728,od=268435456,Dt=class n{static read_bytes(e,t){let _=new n;return _.buf=e.getUint32(t,!0),_.buf_len=e.getUint32(t+4,!0),_}static read_bytes_array(e,t,_){let r=[];for(let i=0;i<_;i++)r.push(n.read_bytes(e,t+8*i));return r}},Ut=class n{static read_bytes(e,t){let _=new n;return _.buf=e.getUint32(t,!0),_.buf_len=e.getUint32(t+4,!0),_}static read_bytes_array(e,t,_){let r=[];for(let i=0;i<_;i++)r.push(n.read_bytes(e,t+8*i));return r}},Wn=0,Bn=1,on=2,ad=0,dd=1,Nr=2,Re=3,ft=4,ld=5,fd=6,cd=7,at=class{head_length(){return 24}name_length(){return this.dir_name.byteLength}write_head_bytes(e,t){e.setBigUint64(t,this.d_next,!0),e.setBigUint64(t+8,this.d_ino,!0),e.setUint32(t+16,this.dir_name.length,!0),e.setUint8(t+20,this.d_type)}write_name_bytes(e,t,_){e.set(this.dir_name.slice(0,Math.min(this.dir_name.byteLength,_)),t)}constructor(e,t,_,r){let i=new TextEncoder().encode(_);this.d_next=e,this.d_ino=t,this.d_namlen=i.byteLength,this.d_type=r,this.dir_name=i}},ud=0,pd=1,hd=2,md=3,Td=4,gd=5,Vn=1,Sd=2,Ad=4,Id=8,Nd=16,dt=class{write_bytes(e,t){e.setUint8(t,this.fs_filetype),e.setUint16(t+2,this.fs_flags,!0),e.setBigUint64(t+8,this.fs_rights_base,!0),e.setBigUint64(t+16,this.fs_rights_inherited,!0)}constructor(e,t){this.fs_rights_base=0n,this.fs_rights_inherited=0n,this.fs_filetype=e,this.fs_flags=t}},yd=1,xd=2,bd=4,Ed=8,an=1,ct=2,zn=4,dn=8,lt=class{write_bytes(e,t){e.setBigUint64(t,this.dev,!0),e.setBigUint64(t+8,this.ino,!0),e.setUint8(t+16,this.filetype),e.setBigUint64(t+24,this.nlink,!0),e.setBigUint64(t+32,this.size,!0),e.setBigUint64(t+38,this.atim,!0),e.setBigUint64(t+46,this.mtim,!0),e.setBigUint64(t+52,this.ctim,!0)}constructor(e,t,_){this.dev=0n,this.nlink=0n,this.atim=0n,this.mtim=0n,this.ctim=0n,this.ino=e,this.filetype=t,this.size=_}},$_=0,wd=1,Rd=2,Ld=1,W_=1,en=class n{static read_bytes(e,t){return new n(e.getBigUint64(t,!0),e.getUint8(t+8),e.getUint32(t+16,!0),e.getBigUint64(t+24,!0),e.getUint16(t+36,!0))}constructor(e,t,_,r,i){this.userdata=e,this.eventtype=t,this.clockid=_,this.timeout=r,this.flags=i}},tn=class{write_bytes(e,t){e.setBigUint64(t,this.userdata,!0),e.setUint16(t+8,this.error,!0),e.setUint8(t+10,this.eventtype)}constructor(e,t,_){this.userdata=e,this.error=t,this.eventtype=_}},Cd=0,vd=1,Md=2,Dd=3,Ud=4,Od=5,Fd=6,Gd=7,Pd=8,Hd=9,Xd=10,kd=11,$d=12,Wd=13,Bd=14,Vd=15,zd=16,jd=17,Yd=18,Kd=19,qd=20,Jd=21,Zd=22,Qd=23,el=24,tl=25,nl=26,_l=27,il=28,rl=29,sl=30,ol=1,al=2,dl=1,ll=1,fl=2,yr=0,Hn=class{write_bytes(e,t){e.setUint32(t,this.pr_name.byteLength,!0)}constructor(e){this.pr_name=new TextEncoder().encode(e)}},nn=class n{static dir(e){let t=new n;return t.tag=yr,t.inner=new Hn(e),t}write_bytes(e,t){e.setUint32(t,this.tag,!0),this.inner.write_bytes(e,t+4)}};var cl=class{enable(e){this.log=ul(e===void 0?!0:e,this.prefix)}get enabled(){return this.isEnabled}constructor(e){this.isEnabled=e,this.prefix="wasi:",this.enable(e)}};function ul(n,e){return n?console.log.bind(console,"%c%s","color: #265BA0",e):()=>{}}var ge=new cl(!1);var ln=class extends Error{constructor(e){super("exit with exit code "+e),this.code=e}},B_=class{start(e){this.inst=e;try{return e.exports._start(),0}catch(t){if(t instanceof ln)return t.code;throw t}}initialize(e){this.inst=e,e.exports._initialize&&e.exports._initialize()}constructor(e,t,_,r={}){this.args=[],this.env=[],this.fds=[],ge.enable(r.debug),this.args=e,this.env=t,this.fds=_;let i=this;this.wasiImport={args_sizes_get(s,o){let a=new DataView(i.inst.exports.memory.buffer);a.setUint32(s,i.args.length,!0);let d=0;for(let l of i.args)d+=l.length+1;return a.setUint32(o,d,!0),ge.log(a.getUint32(s,!0),a.getUint32(o,!0)),0},args_get(s,o){let a=new DataView(i.inst.exports.memory.buffer),d=new Uint8Array(i.inst.exports.memory.buffer),l=o;for(let f=0;f<i.args.length;f++){a.setUint32(s,o,!0),s+=4;let u=new TextEncoder().encode(i.args[f]);d.set(u,o),a.setUint8(o+u.length,0),o+=u.length+1}return ge.enabled&&ge.log(new TextDecoder("utf-8").decode(d.slice(l,o))),0},environ_sizes_get(s,o){let a=new DataView(i.inst.exports.memory.buffer);a.setUint32(s,i.env.length,!0);let d=0;for(let l of i.env)d+=new TextEncoder().encode(l).length+1;return a.setUint32(o,d,!0),ge.log(a.getUint32(s,!0),a.getUint32(o,!0)),0},environ_get(s,o){let a=new DataView(i.inst.exports.memory.buffer),d=new Uint8Array(i.inst.exports.memory.buffer),l=o;for(let f=0;f<i.env.length;f++){a.setUint32(s,o,!0),s+=4;let u=new TextEncoder().encode(i.env[f]);d.set(u,o),a.setUint8(o+u.length,0),o+=u.length+1}return ge.enabled&&ge.log(new TextDecoder("utf-8").decode(d.slice(l,o))),0},clock_res_get(s,o){let a;switch(s){case 1:{a=5000n;break}case 0:{a=1000000n;break}default:return 52}return new DataView(i.inst.exports.memory.buffer).setBigUint64(o,a,!0),0},clock_time_get(s,o,a){let d=new DataView(i.inst.exports.memory.buffer);if(s===0)d.setBigUint64(a,BigInt(new Date().getTime())*1000000n,!0);else if(s==1){let l;try{l=BigInt(Math.round(performance.now()*1e6))}catch{l=0n}d.setBigUint64(a,l,!0)}else d.setBigUint64(a,0n,!0);return 0},fd_advise(s,o,a,d){return i.fds[s]!=null?0:8},fd_allocate(s,o,a){return i.fds[s]!=null?i.fds[s].fd_allocate(o,a):8},fd_close(s){if(i.fds[s]!=null){let o=i.fds[s].fd_close();return i.fds[s]=void 0,o}else return 8},fd_datasync(s){return i.fds[s]!=null?i.fds[s].fd_sync():8},fd_fdstat_get(s,o){if(i.fds[s]!=null){let{ret:a,fdstat:d}=i.fds[s].fd_fdstat_get();return d?.write_bytes(new DataView(i.inst.exports.memory.buffer),o),a}else return 8},fd_fdstat_set_flags(s,o){return i.fds[s]!=null?i.fds[s].fd_fdstat_set_flags(o):8},fd_fdstat_set_rights(s,o,a){return i.fds[s]!=null?i.fds[s].fd_fdstat_set_rights(o,a):8},fd_filestat_get(s,o){if(i.fds[s]!=null){let{ret:a,filestat:d}=i.fds[s].fd_filestat_get();return d?.write_bytes(new DataView(i.inst.exports.memory.buffer),o),a}else return 8},fd_filestat_set_size(s,o){return i.fds[s]!=null?i.fds[s].fd_filestat_set_size(o):8},fd_filestat_set_times(s,o,a,d){return i.fds[s]!=null?i.fds[s].fd_filestat_set_times(o,a,d):8},fd_pread(s,o,a,d,l){let f=new DataView(i.inst.exports.memory.buffer),u=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let c=Dt.read_bytes_array(f,o,a),T=0;for(let S of c){let{ret:h,data:I}=i.fds[s].fd_pread(S.buf_len,d);if(h!=0)return f.setUint32(l,T,!0),h;if(u.set(I,S.buf),T+=I.length,d+=BigInt(I.length),I.length!=S.buf_len)break}return f.setUint32(l,T,!0),0}else return 8},fd_prestat_get(s,o){let a=new DataView(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let{ret:d,prestat:l}=i.fds[s].fd_prestat_get();return l?.write_bytes(a,o),d}else return 8},fd_prestat_dir_name(s,o,a){if(i.fds[s]!=null){let{ret:d,prestat:l}=i.fds[s].fd_prestat_get();if(l==null)return d;let f=l.inner.pr_name;return new Uint8Array(i.inst.exports.memory.buffer).set(f.slice(0,a),o),f.byteLength>a?37:0}else return 8},fd_pwrite(s,o,a,d,l){let f=new DataView(i.inst.exports.memory.buffer),u=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let c=Ut.read_bytes_array(f,o,a),T=0;for(let S of c){let h=u.slice(S.buf,S.buf+S.buf_len),{ret:I,nwritten:b}=i.fds[s].fd_pwrite(h,d);if(I!=0)return f.setUint32(l,T,!0),I;if(T+=b,d+=BigInt(b),b!=h.byteLength)break}return f.setUint32(l,T,!0),0}else return 8},fd_read(s,o,a,d){let l=new DataView(i.inst.exports.memory.buffer),f=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let u=Dt.read_bytes_array(l,o,a),c=0;for(let T of u){let{ret:S,data:h}=i.fds[s].fd_read(T.buf_len);if(S!=0)return l.setUint32(d,c,!0),S;if(f.set(h,T.buf),c+=h.length,h.length!=T.buf_len)break}return l.setUint32(d,c,!0),0}else return 8},fd_readdir(s,o,a,d,l){let f=new DataView(i.inst.exports.memory.buffer),u=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let c=0;for(;;){let{ret:T,dirent:S}=i.fds[s].fd_readdir_single(d);if(T!=0)return f.setUint32(l,c,!0),T;if(S==null)break;if(a-c<S.head_length()){c=a;break}let h=new ArrayBuffer(S.head_length());if(S.write_head_bytes(new DataView(h),0),u.set(new Uint8Array(h).slice(0,Math.min(h.byteLength,a-c)),o),o+=S.head_length(),c+=S.head_length(),a-c<S.name_length()){c=a;break}S.write_name_bytes(u,o,a-c),o+=S.name_length(),c+=S.name_length(),d=S.d_next}return f.setUint32(l,c,!0),0}else return 8},fd_renumber(s,o){if(i.fds[s]!=null&&i.fds[o]!=null){let a=i.fds[o].fd_close();return a!=0?a:(i.fds[o]=i.fds[s],i.fds[s]=void 0,0)}else return 8},fd_seek(s,o,a,d){let l=new DataView(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let{ret:f,offset:u}=i.fds[s].fd_seek(o,a);return l.setBigInt64(d,u,!0),f}else return 8},fd_sync(s){return i.fds[s]!=null?i.fds[s].fd_sync():8},fd_tell(s,o){let a=new DataView(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let{ret:d,offset:l}=i.fds[s].fd_tell();return a.setBigUint64(o,l,!0),d}else return 8},fd_write(s,o,a,d){let l=new DataView(i.inst.exports.memory.buffer),f=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let u=Ut.read_bytes_array(l,o,a),c=0;for(let T of u){let S=f.slice(T.buf,T.buf+T.buf_len),{ret:h,nwritten:I}=i.fds[s].fd_write(S);if(h!=0)return l.setUint32(d,c,!0),h;if(c+=I,I!=S.byteLength)break}return l.setUint32(d,c,!0),0}else return 8},path_create_directory(s,o,a){let d=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let l=new TextDecoder("utf-8").decode(d.slice(o,o+a));return i.fds[s].path_create_directory(l)}else return 8},path_filestat_get(s,o,a,d,l){let f=new DataView(i.inst.exports.memory.buffer),u=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let c=new TextDecoder("utf-8").decode(u.slice(a,a+d)),{ret:T,filestat:S}=i.fds[s].path_filestat_get(o,c);return S?.write_bytes(f,l),T}else return 8},path_filestat_set_times(s,o,a,d,l,f,u){let c=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let T=new TextDecoder("utf-8").decode(c.slice(a,a+d));return i.fds[s].path_filestat_set_times(o,T,l,f,u)}else return 8},path_link(s,o,a,d,l,f,u){let c=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null&&i.fds[l]!=null){let T=new TextDecoder("utf-8").decode(c.slice(a,a+d)),S=new TextDecoder("utf-8").decode(c.slice(f,f+u)),{ret:h,inode_obj:I}=i.fds[s].path_lookup(T,o);return I==null?h:i.fds[l].path_link(S,I,!1)}else return 8},path_open(s,o,a,d,l,f,u,c,T){let S=new DataView(i.inst.exports.memory.buffer),h=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let I=new TextDecoder("utf-8").decode(h.slice(a,a+d));ge.log(I);let{ret:b,fd_obj:x}=i.fds[s].path_open(o,I,l,f,u,c);if(b!=0)return b;i.fds.push(x);let p=i.fds.length-1;return S.setUint32(T,p,!0),0}else return 8},path_readlink(s,o,a,d,l,f){let u=new DataView(i.inst.exports.memory.buffer),c=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let T=new TextDecoder("utf-8").decode(c.slice(o,o+a));ge.log(T);let{ret:S,data:h}=i.fds[s].path_readlink(T);if(h!=null){let I=new TextEncoder().encode(h);if(I.length>l)return u.setUint32(f,0,!0),8;c.set(I,d),u.setUint32(f,I.length,!0)}return S}else return 8},path_remove_directory(s,o,a){let d=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let l=new TextDecoder("utf-8").decode(d.slice(o,o+a));return i.fds[s].path_remove_directory(l)}else return 8},path_rename(s,o,a,d,l,f){let u=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null&&i.fds[d]!=null){let c=new TextDecoder("utf-8").decode(u.slice(o,o+a)),T=new TextDecoder("utf-8").decode(u.slice(l,l+f)),{ret:S,inode_obj:h}=i.fds[s].path_unlink(c);if(h==null)return S;if(S=i.fds[d].path_link(T,h,!0),S!=0&&i.fds[s].path_link(c,h,!0)!=0)throw"path_link should always return success when relinking an inode back to the original place";return S}else return 8},path_symlink(s,o,a,d,l){let f=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[a]!=null){let u=new TextDecoder("utf-8").decode(f.slice(s,s+o)),c=new TextDecoder("utf-8").decode(f.slice(d,d+l));return 58}else return 8},path_unlink_file(s,o,a){let d=new Uint8Array(i.inst.exports.memory.buffer);if(i.fds[s]!=null){let l=new TextDecoder("utf-8").decode(d.slice(o,o+a));return i.fds[s].path_unlink_file(l)}else return 8},poll_oneoff(s,o,a){if(a===0)return 28;if(a>1)return ge.log("poll_oneoff: only a single subscription is supported"),58;let d=new DataView(i.inst.exports.memory.buffer),l=en.read_bytes(d,s),f=l.eventtype,u=l.clockid,c=l.timeout;if(f!==$_)return ge.log("poll_oneoff: only clock subscriptions are supported"),58;let T;if(u===1)T=()=>BigInt(Math.round(performance.now()*1e6));else if(u===0)T=()=>BigInt(new Date().getTime())*1000000n;else return 28;let S=(l.flags&W_)!==0?c:T()+c;for(;S>T(););return new tn(l.userdata,0,f).write_bytes(d,o),0},proc_exit(s){throw new ln(s)},proc_raise(s){throw"raised signal "+s},sched_yield(){},random_get(s,o){let a=new Uint8Array(i.inst.exports.memory.buffer).subarray(s,s+o);if("crypto"in globalThis&&(typeof SharedArrayBuffer>"u"||!(i.inst.exports.memory.buffer instanceof SharedArrayBuffer)))for(let d=0;d<o;d+=65536)crypto.getRandomValues(a.subarray(d,d+65536));else for(let d=0;d<o;d++)a[d]=Math.random()*256|0},sock_recv(s,o,a){throw"sockets not supported"},sock_send(s,o,a){throw"sockets not supported"},sock_shutdown(s,o){throw"sockets not supported"},sock_accept(s,o){throw"sockets not supported"}}}};var Be=class{fd_allocate(e,t){return 58}fd_close(){return 0}fd_fdstat_get(){return{ret:58,fdstat:null}}fd_fdstat_set_flags(e){return 58}fd_fdstat_set_rights(e,t){return 58}fd_filestat_get(){return{ret:58,filestat:null}}fd_filestat_set_size(e){return 58}fd_filestat_set_times(e,t,_){return 58}fd_pread(e,t){return{ret:58,data:new Uint8Array}}fd_prestat_get(){return{ret:58,prestat:null}}fd_pwrite(e,t){return{ret:58,nwritten:0}}fd_read(e){return{ret:58,data:new Uint8Array}}fd_readdir_single(e){return{ret:58,dirent:null}}fd_seek(e,t){return{ret:58,offset:0n}}fd_sync(){return 0}fd_tell(){return{ret:58,offset:0n}}fd_write(e){return{ret:58,nwritten:0}}path_create_directory(e){return 58}path_filestat_get(e,t){return{ret:58,filestat:null}}path_filestat_set_times(e,t,_,r,i){return 58}path_link(e,t,_){return 58}path_unlink(e){return{ret:58,inode_obj:null}}path_lookup(e,t){return{ret:58,inode_obj:null}}path_open(e,t,_,r,i,s){return{ret:54,fd_obj:null}}path_readlink(e){return{ret:58,data:null}}path_remove_directory(e){return 58}path_rename(e,t,_){return 58}path_unlink_file(e){return 58}},Ge=class n{static issue_ino(){return n.next_ino++}static root_ino(){return 0n}constructor(){this.ino=n.issue_ino()}};Ge.next_ino=1n;var jn=class extends Be{fd_allocate(e,t){if(!(this.file.size>e+t)){let _=new Uint8Array(Number(e+t));_.set(this.file.data,0),this.file.data=_}return 0}fd_fdstat_get(){return{ret:0,fdstat:new dt(ft,0)}}fd_filestat_set_size(e){if(this.file.size>e)this.file.data=new Uint8Array(this.file.data.buffer.slice(0,Number(e)));else{let t=new Uint8Array(Number(e));t.set(this.file.data,0),this.file.data=t}return 0}fd_read(e){let t=this.file.data.slice(Number(this.file_pos),Number(this.file_pos+BigInt(e)));return this.file_pos+=BigInt(t.length),{ret:0,data:t}}fd_pread(e,t){return{ret:0,data:this.file.data.slice(Number(t),Number(t+BigInt(e)))}}fd_seek(e,t){let _;switch(t){case Wn:_=e;break;case Bn:_=this.file_pos+e;break;case on:_=BigInt(this.file.data.byteLength)+e;break;default:return{ret:28,offset:0n}}return _<0?{ret:28,offset:0n}:(this.file_pos=_,{ret:0,offset:this.file_pos})}fd_tell(){return{ret:0,offset:this.file_pos}}fd_write(e){if(this.file.readonly)return{ret:8,nwritten:0};if(this.file_pos+BigInt(e.byteLength)>this.file.size){let t=this.file.data;this.file.data=new Uint8Array(Number(this.file_pos+BigInt(e.byteLength))),this.file.data.set(t)}return this.file.data.set(e,Number(this.file_pos)),this.file_pos+=BigInt(e.byteLength),{ret:0,nwritten:e.byteLength}}fd_pwrite(e,t){if(this.file.readonly)return{ret:8,nwritten:0};if(t+BigInt(e.byteLength)>this.file.size){let _=this.file.data;this.file.data=new Uint8Array(Number(t+BigInt(e.byteLength))),this.file.data.set(_)}return this.file.data.set(e,Number(t)),{ret:0,nwritten:e.byteLength}}fd_filestat_get(){return{ret:0,filestat:this.file.stat()}}constructor(e){super(),this.file_pos=0n,this.file=e}},fn=class extends Be{fd_seek(e,t){return{ret:8,offset:0n}}fd_tell(){return{ret:8,offset:0n}}fd_allocate(e,t){return 8}fd_fdstat_get(){return{ret:0,fdstat:new dt(Re,0)}}fd_readdir_single(e){if(ge.enabled&&(ge.log("readdir_single",e),ge.log(e,this.dir.contents.keys())),e==0n)return{ret:0,dirent:new at(1n,this.dir.ino,".",Re)};if(e==1n)return{ret:0,dirent:new at(2n,this.dir.parent_ino(),"..",Re)};if(e>=BigInt(this.dir.contents.size)+2n)return{ret:0,dirent:null};let[t,_]=Array.from(this.dir.contents.entries())[Number(e-2n)];return{ret:0,dirent:new at(e+1n,_.ino,t,_.stat().filetype)}}path_filestat_get(e,t){let{ret:_,path:r}=nt.from(t);if(r==null)return{ret:_,filestat:null};let{ret:i,entry:s}=this.dir.get_entry_for_path(r);return s==null?{ret:i,filestat:null}:{ret:0,filestat:s.stat()}}path_lookup(e,t){let{ret:_,path:r}=nt.from(e);if(r==null)return{ret:_,inode_obj:null};let{ret:i,entry:s}=this.dir.get_entry_for_path(r);return s==null?{ret:i,inode_obj:null}:{ret:0,inode_obj:s}}path_open(e,t,_,r,i,s){let{ret:o,path:a}=nt.from(t);if(a==null)return{ret:o,fd_obj:null};let{ret:d,entry:l}=this.dir.get_entry_for_path(a);if(l==null){if(d!=44)return{ret:d,fd_obj:null};if((_&an)==an){let{ret:f,entry:u}=this.dir.create_entry_for_path(t,(_&ct)==ct);if(u==null)return{ret:f,fd_obj:null};l=u}else return{ret:44,fd_obj:null}}else if((_&zn)==zn)return{ret:20,fd_obj:null};return(_&ct)==ct&&l.stat().filetype!==Re?{ret:54,fd_obj:null}:l.path_open(_,r,s)}path_create_directory(e){return this.path_open(0,e,an|ct,0n,0n,0).ret}path_link(e,t,_){let{ret:r,path:i}=nt.from(e);if(i==null)return r;if(i.is_dir)return 44;let{ret:s,parent_entry:o,filename:a,entry:d}=this.dir.get_parent_dir_and_entry_for_path(i,!0);if(o==null||a==null)return s;if(d!=null){let l=t.stat().filetype==Re,f=d.stat().filetype==Re;if(l&&f)if(_&&d instanceof Ve){if(d.contents.size!=0)return 55}else return 20;else{if(l&&!f)return 54;if(!l&&f)return 31;if(!(t.stat().filetype==ft&&d.stat().filetype==ft))return 20}}return!_&&t.stat().filetype==Re?63:(o.contents.set(a,t),0)}path_unlink(e){let{ret:t,path:_}=nt.from(e);if(_==null)return{ret:t,inode_obj:null};let{ret:r,parent_entry:i,filename:s,entry:o}=this.dir.get_parent_dir_and_entry_for_path(_,!0);return i==null||s==null?{ret:r,inode_obj:null}:o==null?{ret:44,inode_obj:null}:(i.contents.delete(s),{ret:0,inode_obj:o})}path_unlink_file(e){let{ret:t,path:_}=nt.from(e);if(_==null)return t;let{ret:r,parent_entry:i,filename:s,entry:o}=this.dir.get_parent_dir_and_entry_for_path(_,!1);return i==null||s==null||o==null?r:o.stat().filetype===Re?31:(i.contents.delete(s),0)}path_remove_directory(e){let{ret:t,path:_}=nt.from(e);if(_==null)return t;let{ret:r,parent_entry:i,filename:s,entry:o}=this.dir.get_parent_dir_and_entry_for_path(_,!1);return i==null||s==null||o==null?r:!(o instanceof Ve)||o.stat().filetype!==Re?54:o.contents.size!==0?55:i.contents.delete(s)?0:44}fd_filestat_get(){return{ret:0,filestat:this.dir.stat()}}fd_filestat_set_size(e){return 8}fd_read(e){return{ret:8,data:new Uint8Array}}fd_pread(e,t){return{ret:8,data:new Uint8Array}}fd_write(e){return{ret:8,nwritten:0}}fd_pwrite(e,t){return{ret:8,nwritten:0}}constructor(e){super(),this.dir=e}},Gt=class extends fn{fd_prestat_get(){return{ret:0,prestat:nn.dir(this.prestat_name)}}constructor(e,t){super(new Ve(t)),this.prestat_name=e}},Pt=class extends Ge{path_open(e,t,_){if(this.readonly&&(t&BigInt(64))==BigInt(64))return{ret:63,fd_obj:null};if((e&dn)==dn){if(this.readonly)return{ret:63,fd_obj:null};this.data=new Uint8Array([])}let r=new jn(this);return _&Vn&&r.fd_seek(0n,on),{ret:0,fd_obj:r}}get size(){return BigInt(this.data.byteLength)}stat(){return new lt(this.ino,ft,this.size)}constructor(e,t){super(),this.data=new Uint8Array(e),this.readonly=!!t?.readonly}},nt=class xr{static from(e){let t=new xr;if(t.is_dir=e.endsWith("/"),e.startsWith("/"))return{ret:76,path:null};if(e.includes("\0"))return{ret:28,path:null};for(let _ of e.split("/"))if(!(_===""||_===".")){if(_===".."){if(t.parts.pop()==null)return{ret:76,path:null};continue}t.parts.push(_)}return{ret:0,path:t}}to_path_string(){let e=this.parts.join("/");return this.is_dir&&(e+="/"),e}constructor(){this.parts=[],this.is_dir=!1}},Ve=class n extends Ge{parent_ino(){return this.parent==null?Ge.root_ino():this.parent.ino}path_open(e,t,_){return{ret:0,fd_obj:new fn(this)}}stat(){return new lt(this.ino,Re,0n)}get_entry_for_path(e){let t=this;for(let _ of e.parts){if(!(t instanceof n))return{ret:54,entry:null};let r=t.contents.get(_);if(r!==void 0)t=r;else return ge.log(_),{ret:44,entry:null}}return e.is_dir&&t.stat().filetype!=Re?{ret:54,entry:null}:{ret:0,entry:t}}get_parent_dir_and_entry_for_path(e,t){let _=e.parts.pop();if(_===void 0)return{ret:28,parent_entry:null,filename:null,entry:null};let{ret:r,entry:i}=this.get_entry_for_path(e);if(i==null)return{ret:r,parent_entry:null,filename:null,entry:null};if(!(i instanceof n))return{ret:54,parent_entry:null,filename:null,entry:null};let s=i.contents.get(_);return s===void 0?t?{ret:0,parent_entry:i,filename:_,entry:null}:{ret:44,parent_entry:null,filename:null,entry:null}:e.is_dir&&s.stat().filetype!=Re?{ret:54,parent_entry:null,filename:null,entry:null}:{ret:0,parent_entry:i,filename:_,entry:s}}create_entry_for_path(e,t){let{ret:_,path:r}=nt.from(e);if(r==null)return{ret:_,entry:null};let{ret:i,parent_entry:s,filename:o,entry:a}=this.get_parent_dir_and_entry_for_path(r,!0);if(s==null||o==null)return{ret:i,entry:null};if(a!=null)return{ret:20,entry:null};ge.log("create",r);let d;return t?d=new n(new Map):d=new Pt(new ArrayBuffer(0)),s.contents.set(o,d),a=d,{ret:0,entry:a}}constructor(e){super(),this.parent=null,e instanceof Array?this.contents=new Map(e):this.contents=e;for(let t of this.contents.values())t instanceof n&&(t.parent=this)}};function pl(n){let e=n.replace(/\\/g,"/"),t=e.startsWith("/")?e:`/${e}`,_=[];for(let r of t.split("/"))if(!(!r||r===".")){if(r==="..")throw new Error(`wasm-clang does not allow guest path traversal: ${n}`);_.push(r)}return`/${_.join("/")}`}function br(n){return typeof n=="string"?new TextEncoder().encode(n):n instanceof Uint8Array?new Uint8Array(n):new Uint8Array(n)}var Yn=class extends Be{ino=Ge.issue_ino();decoder=new TextDecoder;chunks=[];output;constructor(e){super(),this.output=e}fd_filestat_get(){return{ret:re.ERRNO_SUCCESS,filestat:new re.Filestat(this.ino,re.FILETYPE_CHARACTER_DEVICE,0n)}}fd_fdstat_get(){let e=new re.Fdstat(re.FILETYPE_CHARACTER_DEVICE,0);return e.fs_rights_base=BigInt(re.RIGHTS_FD_WRITE),{ret:re.ERRNO_SUCCESS,fdstat:e}}fd_write(e){let t=this.decoder.decode(e,{stream:!0});return this.chunks.push(t),this.output?.(t),{ret:re.ERRNO_SUCCESS,nwritten:e.byteLength}}getText(){let e=this.decoder.decode();return e&&(this.chunks.push(e),this.output?.(e)),this.chunks.join("")}},V_=class{currentChunk=new Uint8Array(0);currentOffset=0;readInput;constructor(e){this.readInput=e}read(e){for(;this.currentOffset>=this.currentChunk.length;){let _=this.readInput?.();if(_==null)return new Uint8Array(0);this.currentChunk=br(_),this.currentOffset=0,this.currentChunk.byteLength}let t=this.currentChunk.slice(this.currentOffset,this.currentOffset+e);return this.currentOffset+=t.byteLength,t}},z_=class extends Be{ino=Ge.issue_ino();source;constructor(e){super(),this.source=e}fd_filestat_get(){return{ret:re.ERRNO_SUCCESS,filestat:new re.Filestat(this.ino,re.FILETYPE_CHARACTER_DEVICE,0n)}}fd_fdstat_get(){let e=new re.Fdstat(re.FILETYPE_CHARACTER_DEVICE,0);return e.fs_rights_base=BigInt(re.RIGHTS_FD_READ),{ret:re.ERRNO_SUCCESS,fdstat:e}}fd_read(e){return{ret:re.ERRNO_SUCCESS,data:this.source.read(e)}}};function Er(n={}){let e=new Ve(new Map);for(let s of n.files||[]){let a=pl(s.path).slice(1).split("/"),d=e;for(let l of a.slice(0,-1)){let f=d.contents.get(l);if(f instanceof Ve){d=f;continue}let u=new Ve(new Map);d.contents.set(l,u),d=u}d.contents.set(a.at(-1),new Pt(br(s.contents)))}let t=new V_(n.stdin),_=new Yn(n.stdout),r=new Yn(n.stderr),i=new Map([["PWD","/"]]);for(let[s,o]of Object.entries(n.env||{}))i.set(s,o);return{args:[n.programName||"main.wasm",...n.args||[]],envEntries:Array.from(i.entries()).map(([s,o])=>`${s}=${o}`),rootDirectory:e,stdout:_,stderr:r,fds:[new z_(t),_,r,new Gt("/tmp",new Map),new Gt("/",e.contents)]}}async function j_(n,e={}){if(n.target!=="wasm32-wasi"||n.format!=="wasi-core-wasm")throw new Error("wasm-clang currently executes only wasm32-wasi preview1 core wasm artifacts.");let t=Er({...e,programName:e.programName||n.fileName}),_=new B_(t.args,t.envEntries,t.fds,{debug:!1}),r=n.bytes instanceof Uint8Array?new Uint8Array(n.bytes):new Uint8Array(n.bytes),i=n.wasm||await WebAssembly.compile(r),s={current:null},o=typeof e.extraImports=="function"?await e.extraImports({host:t,module:i,instance:s}):e.extraImports||{},a=await WebAssembly.instantiate(i,{...o,wasi_unstable:_.wasiImport,wasi_snapshot_preview1:_.wasiImport});return s.current=a,{exitCode:_.start(a),stdout:t.stdout.getText(),stderr:t.stderr.getText()}}var wr=Object.freeze({"runtime-manifest.v1.json":Object.freeze({bytes:876,sha256:"1420808d0391ff2d8a2fdf2a9f6bbce8f728e06b1ed1651029ed80b226101444"}),"bin/memfs.wasm.gz":Object.freeze({bytes:38702,sha256:"cbca9e27ceafbca840603a39fc71e4f83bfb085237c8eab84fd0401ac76806c7"}),"bin/clang.wasm.gz":Object.freeze({bytes:15721977,sha256:"b1174438d9a67b7ff11e623541b9a0572c024a9e798084b9b021dd9da2da0874"}),"bin/lld.wasm.gz":Object.freeze({bytes:7837837,sha256:"f842a9b5df3c6d326f0260bfd313c11c2e22bc8b8ae0387deede9a4af55779cd"}),"bin/sysroot.tar.gz":Object.freeze({bytes:5401380,sha256:"195e8083bace1baf86014f134a210db354cd77825988eaac7d262161cf496c4f"}),"objective-c/libobjc.a":Object.freeze({bytes:190272,sha256:"1dde20d4ce78eed271ab725062ef25f1923b20d51384943c9b8f7177eb1fc2d9"}),"objective-c/headers.json":Object.freeze({bytes:83231,sha256:"64bf5a09feffa612e6f82cfc52f3d6a9c5e4fc3064c3824c24aeea59cb544d8e"})});var Kn="https://clang-wasm-assets.invalid/";function Lr(n,e){if(n.baseUrl!=null&&n.baseUrl!=="")return hl(n);if(!e)throw new Error("baseUrl is required here. The assets that ship in this package can only be read where there is a filesystem, and a browser cannot reach a file inside an npm package - copy them somewhere your page can fetch with `npx --package @live-codes/clang-wasm clang-wasm-copy-assets <dir>` and pass that directory as baseUrl.");return ml(e)}function hl(n){let e;try{e=vt(n.baseUrl)}catch(_){throw new Error(`baseUrl must be an absolute http(s) URL, or relative to the page in a browser: ${_.message}`,{cause:_})}let t=n.objectiveCBaseUrl?vt(n.objectiveCBaseUrl):new URL("objective-c/",e).href;return{kind:"hosted",key:`${e}\0${t}`,baseUrl:e,objectiveCBaseUrl:t,description:e,async loadManifest(){return P_(H_(e))},readAsset:_=>gl(new URL(_,e),_),installFetch(){}}}function ml(n){let e={kind:"packaged",key:`packaged\0${n.root.href}`,baseUrl:Kn,objectiveCBaseUrl:new URL("objective-c/",Kn).href,description:`the assets packaged with this library (${n.root.href})`,readAsset:t=>Sl(n,t),async loadManifest(){let t=await e.readAsset("runtime-manifest.v1.json");return Pn(JSON.parse(new TextDecoder("utf-8",{fatal:!0}).decode(t)))},installFetch:()=>Tl(e)};return e}var Rr=null;function Tl(n){if(Rr===n)return;let e=globalThis.fetch;globalThis.fetch=(t,_)=>{let r=typeof t=="string"?t:t instanceof URL?t.href:t?.url??"";return r.startsWith(Kn)?n.readAsset(r.slice(Kn.length)).then(i=>new Response(i)):e.call(globalThis,t,_)},Rr=n}async function gl(n,e){let t=await fetch(n);if(!t.ok){let r=await fetch(`${n}.gz`);if(!r.ok)throw new Error(`Failed to load the runtime asset ${n}: ${t.status}`);t=r}let _=new Uint8Array(await t.arrayBuffer());return Cr(e,Al(_)?await Il(_,e):_)}async function Sl(n,e){let t;try{t=await n.readFile(e)}catch(_){throw new Error(`Failed to read the packaged asset ${e} from ${n.root.href}: ${_.message}`,{cause:_})}return Cr(e,t)}async function Cr(n,e){let t=wr[n];if(!t)throw new Error(`No pinned receipt for the runtime asset ${n}`);if(e.byteLength!==t.bytes)throw new Error(`The runtime asset ${n} is ${e.byteLength} bytes, expected ${t.bytes}`);let _=await Nl(e);if(_!==t.sha256)throw new Error(`The runtime asset ${n} failed SHA-256 verification: expected ${t.sha256}, got ${_}`);return e}var Al=n=>n.byteLength>2&&n[0]===31&&n[1]===139;async function Il(n,e){if(typeof DecompressionStream!="function")throw new Error(`Inflating the runtime asset ${e} needs DecompressionStream`);let t=new Blob([n]).stream().pipeThrough(new DecompressionStream("gzip"));return new Uint8Array(await new Response(t).arrayBuffer())}async function Nl(n){let e=globalThis.crypto?.subtle;if(!e)throw new Error("Verifying the runtime assets needs crypto.subtle: a secure context in the browser, or Node 20 and later.");let t=await e.digest("SHA-256",n);return[...new Uint8Array(t)].map(_=>_.toString(16).padStart(2,"0")).join("")}var Y_=Object.freeze(["-fgnuc-version=4.2.1"]);var yl=/\u001b\[[0-9;]*[A-Za-z]/g,vr=n=>String(n??"").replace(yl,""),xl=/^\s*>|^\s*done\.?\s*$/,Mr=n=>vr(n).split(/\r?\n/).map(e=>e.replace(/\s+$/,"")).filter(e=>e&&!xl.test(e)),qn=n=>vr(n),Dr=n=>{if(n==null||n.length===0)return()=>null;let e=!1;return()=>e?null:(e=!0,n)};var bl=128*1024*1024,Jn=new Map;async function Ur(n,e={}){let t=Jn.get(n.key);t||(t=wl(n,e).catch(r=>{throw Jn.delete(n.key),r}),Jn.set(n.key,t));let _=await t;return _.references+=1,e.onProgress&&_.progressSinks.add(e.onProgress),_}function Or(n,e){e&&n.progressSinks.delete(e),n.references-=1,n.references<=0&&Jn.delete(n.key)}async function Fr(n,e){let t=n.queue,_;n.queue=new Promise(r=>{_=r}),await t;try{return await e()}finally{_()}}async function K_(n,e){let{runtime:t}=n,_=t.log,r=n.compilerOutput,i=[];t.log=!0,n.compilerOutput=a=>i.push(a);let s,o=null;try{s=await e()}catch(a){o=a}finally{n.compilerOutput=r,t.log=_}return{result:s,raw:i.join(""),error:o}}function El(){typeof globalThis.SharedArrayBuffer>"u"&&(globalThis.SharedArrayBuffer=class{})}async function wl(n,e){El();let t={key:n.key,source:n,references:0,queue:Promise.resolve(),progressSinks:new Set,runtime:null,objectiveCRuntime:{pending:null,builds:0},compilerOutput:()=>{}},_;try{_=await n.loadManifest()}catch(i){throw new Error(`Failed to load the runtime manifest from ${n.description}: ${i.message}`,{cause:i})}n.installFetch();let r=new G_({runtimeBaseUrl:n.baseUrl,manifest:_,stdin:()=>"",stdout:i=>t.compilerOutput(i),progress:i=>{for(let s of t.progressSinks)s(i)},maxAssetBytes:e.maxAssetBytes??bl});return await r.ready,t.runtime=r,t}async function Gr(n){return n.objectiveCRuntime.pending||(n.objectiveCRuntime.pending=Rl(n).catch(e=>{throw n.objectiveCRuntime.pending=null,e})),n.objectiveCRuntime.pending}async function Rl(n){let[e,t]=await Promise.all([n.source.readAsset("objective-c/libobjc.a"),n.source.readAsset("objective-c/headers.json")]);for(let[_,r]of Ll(t))Zn(n.runtime,_,r);n.runtime.memfs.addFile("libobjc.a",e)}function Ll(n){let e;try{e=JSON.parse(new TextDecoder("utf-8",{fatal:!0}).decode(n))}catch(_){throw new Error("The Objective-C headers asset is not valid UTF-8 JSON",{cause:_})}if(!e||typeof e!="object"||Array.isArray(e))throw new Error("The Objective-C headers asset is not an object");let t=[];for(let[_,r]of Object.entries(e)){if(typeof r!="string")throw new Error(`The Objective-C headers asset has a non-string source for ${_}`);if(!Cl(_))throw new Error(`The Objective-C headers asset has an unsafe path: ${_}`);t.push([_,r])}return t}var Cl=n=>n.length>0&&!n.startsWith("/")&&!n.includes("\\")&&!/^[A-Za-z]:/.test(n)&&n.split("/").every(e=>e&&e!=="."&&e!==".."),Zn=(n,e,t)=>{let _=e.split("/").slice(0,-1),r="";for(let i of _){r=r?`${r}/${i}`:i;try{n.memfs.addDirectory(r)}catch{}}n.memfs.addFile(e,t)};var vl=`extern void __wasm_idle_objc_load(void) __asm__(".objcv2_load_function") __attribute__((weak));

__attribute__((constructor))
static void __wasm_idle_objc_ctor(void)
{
    if (__wasm_idle_objc_load) __wasm_idle_objc_load();
}
`,Ml=/@\s*(?:interface|implementation|protocol)\b/;async function Hr(n,e){let{runtime:t}=n,{code:_,fileName:r,compileArgs:i,args:s,input:o,language:a}=e,d=performance.now(),l=await K_(n,()=>t.compileArtifact(_,{language:a.compilerLanguage,fileName:r,compileArgs:[...Y_,...i]})),f=Math.round(performance.now()-d);return l.error?$r(l.raw,l.error,f):{...await kr(l.result,e),errors:[],compileMs:f}}async function Xr(n,e){let{runtime:t}=n,{code:_,fileName:r,compileArgs:i,std:s,language:o}=e;await Gr(n);let a=`objc_${++n.objectiveCRuntime.builds}`,d=`${a}/${r}`;Zn(t,d,_);let l=[];if(Ml.test(_)){let b=`${a}/objc_ctor.c`;Zn(t,b,vl),l.push(`${a}/objc_ctor.o`)}let f=`${a}/main.o`,u=`${a}/main.wasm`,c=performance.now(),T=await K_(n,async()=>{l.length&&await Pr(t,{language:"c",input:`${a}/objc_ctor.c`,objectPath:l[0],std:null,compileArgs:[]}),await Pr(t,{language:o.compilerLanguage,input:d,objectPath:f,std:s,compileArgs:i}),await Dl(t,{objects:[...l,f],wasmPath:u})}),S=Math.round(performance.now()-c);if(T.error)return $r(T.raw,T.error,S);let h=Uint8Array.from(t.memfs.getFileContents(u));return{...await kr({bytes:h,target:"wasm32-wasi",format:"wasi-core-wasm",fileName:u},e),errors:[],compileMs:S}}async function kr(n,{args:e,input:t}){let _=[],r=[],i=[],s=performance.now(),o=await j_(n,{args:e,stdin:Dr(t),stdout:d=>{_.push(d),r.push(d)},stderr:d=>{_.push(d),i.push(d)}}),a=Math.round(performance.now()-s);return{stdout:qn(r.join("")),stderr:qn(i.join("")),output:qn(_.join("")),exitCode:o.exitCode,runMs:a}}function $r(n,e,t){let _=Mr(n);return _.length||_.push(String(e?.message??e)),{stdout:"",stderr:"",output:"",errors:_,exitCode:null,compileMs:t,runMs:null}}async function Pr(n,{language:e,input:t,objectPath:_,std:r,compileArgs:i}){let s=n.compilerConfig?.resourceDir||"/lib/clang/8.0.1",o=On(e==="objective-c++"?"OBJCXX":e==="c"?"C":"OBJC","",s),a=await n.getModule(n.assetUrls.clang);await n.run(a,!0,"clang","-cc1","-triple","wasm32-wasi","-emit-obj","-disable-free",...Y_,"-isysroot","/","-resource-dir",s,...o.flatMap(d=>["-internal-isystem",d]),"-I.","-ferror-limit","20","-O2","-o",_,...r?[`-std=${r}`]:[],"-x",e,...e==="c"?[]:Un,t,...i)}async function Dl(n,{objects:e,wasmPath:t}){let _="lib/wasm32-wasi",r=n.compilerConfig?.compilerRuntimeLibDir||"lib/clang/8.0.1/lib/wasi",i=await n.getModule(n.assetUrls.lld);await n.run(i,n.log,"wasm-ld","--export-dynamic","--gc-sections","-z","stack-size=1048576",`-L${_}/noeh`,`-L${_}`,`${_}/crt1.o`,...e,"libobjc.a","-lwasi-emulated-mman","-lc","-lc++","-lc++abi","-lm",`-L${r}`,"-lclang_rt.builtins-wasm32","-o",t)}var Wr=Object.freeze(["gnu11","gnu17","gnu23"]),Br=Object.freeze(["gnu++11","gnu++14","gnu++17","gnu++20","gnu++23"]),Vr={c:{fileName:"main.c",compilerLanguage:"C",objectiveC:!1,standards:Wr,defaultStandard:"gnu23"},cpp:{fileName:"main.cpp",compilerLanguage:"CPP",objectiveC:!1,standards:Br,defaultStandard:"gnu++23"},objc:{fileName:"main.m",compilerLanguage:"objective-c",objectiveC:!0,standards:Wr,defaultStandard:"gnu23"},objcpp:{fileName:"main.mm",compilerLanguage:"objective-c++",objectiveC:!0,standards:Br,defaultStandard:"gnu++23"}},Ul=new Map([["c","c"],["cpp","cpp"],["c++","cpp"],["cc","cpp"],["cxx","cpp"],["objc","objc"],["objective-c","objc"],["objectivec","objc"],["objcpp","objcpp"],["objc++","objcpp"],["objective-c++","objcpp"],["objectivec++","objcpp"]]),q_=Object.freeze(Object.keys(Vr));function J_(n){let e=Ul.get(String(n??"").trim().toLowerCase());if(!e)throw new Error(`Unknown language ${JSON.stringify(n)}. Expected one of: ${q_.join(", ")}.`);return Object.freeze({id:e,...Vr[e]})}var zr=n=>[...J_(n).standards];function Z_(n,e){if(e==null)return null;if(!n.standards.includes(e))throw new Error(`std must be null or one of ${n.standards.join(", ")} for ${n.id} (got ${JSON.stringify(e)}). Pass a different -std= through compileArgs if you need one.`);return e}function jr({packaged:n}){async function e(t,_={}){let r=J_(t),i=Z_(r,"std"in _?_.std:r.defaultStandard),s=Lr(_,n),o=await Ur(s,_),a={compileArgs:_.compileArgs??[],args:_.args??[],fileName:_.fileName??r.fileName},d=!1;return{language:r.id,std:i,standards:[...r.standards],async run(l,f,u={}){if(d)throw new Error("This compiler has been disposed.");if(typeof l!="string")throw new Error("run() needs the program source as its first argument.");let c=Z_(r,"std"in u?u.std:i),T={code:l,input:f??"",language:r,fileName:u.fileName??a.fileName,args:u.args??a.args,std:c,compileArgs:[...c?[`-std=${c}`]:[],...a.compileArgs,...u.compileArgs??[]]};return Fr(o,()=>r.objectiveC?Xr(o,T):Hr(o,T))},dispose(){d||(d=!0,Or(o,_.onProgress))}}}return{createCompiler:e,LANGUAGE_IDS:q_,standardsFor:zr}}var Yr=jr({packaged:null}),Ol=Yr.createCompiler,{LANGUAGE_IDS:Fl,standardsFor:Gl}=Yr;return _s(Pl);})();
