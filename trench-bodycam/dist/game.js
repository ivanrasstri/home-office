(()=>{var Hl="160";var cp=0,su=1,lp=2;var Vf=1,kl=2,wi=3,Ln=0,ln=1,en=2;var Ki=0,Ji=1,ri=2,ru=3,ou=4,hp=5,gs=100,up=101,fp=102,au=103,cu=104,dp=200,pp=201,mp=202,gp=203,el=204,tl=205,xp=206,vp=207,_p=208,yp=209,Mp=210,Sp=211,Ep=212,bp=213,Tp=214,wp=0,Ap=1,Rp=2,ia=3,Cp=4,Pp=5,Lp=6,Ip=7,Gf=0,Dp=1,Up=2,si=0,Np=1,Fp=2,Op=3,zp=4,Bp=5,Hp=6,lu="attached",kp="detached",Wf=300,ir=301,sr=302,qr=303,nl=304,Na=306,Pi=1e3,pn=1001,Yr=1002,Ut=1003,sa=1004;var Br=1005;var bt=1006,Vl=1007;var qn=1008;var bn=1009,Vp=1010,Gp=1011,Gl=1012,Xf=1013,ii=1014,mn=1015,In=1016,qf=1017,Yf=1018,vs=1020,Wp=1021,vn=1023,Xp=1024,qp=1025,_s=1026,rr=1027,Wl=1028,Zf=1029,Yp=1030,Kf=1031,Jf=1033,vc=33776,_c=33777,yc=33778,Mc=33779,hu=35840,uu=35841,fu=35842,du=35843,$f=36196,pu=37492,mu=37496,gu=37808,xu=37809,vu=37810,_u=37811,yu=37812,Mu=37813,Su=37814,Eu=37815,bu=37816,Tu=37817,wu=37818,Au=37819,Ru=37820,Cu=37821,Sc=36492,Pu=36494,Lu=36495,Zp=36283,Iu=36284,Du=36285,Uu=36286,Kp=2200,Jp=2201,$p=2202,or=2300,Ms=2301,Ec=2302,Js=2400,$s=2401,ra=2402,Xl=2500,jp=2501,jf=0,Fa=1,ao=2,Qf=3e3,ys=3001,Qp=3200,em=3201,ed=0,tm=1,_n="",_t="srgb",Lt="srgb-linear",ql="display-p3",Oa="display-p3-linear",oa="linear",wt="srgb",aa="rec709",ca="p3";var Ds=7680;var Nu=519,nm=512,im=513,sm=514,td=515,rm=516,om=517,am=518,cm=519,il=35044,co=35048;var Fu="300 es",sl=1035,Ci=2e3,la=2001,Li=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let i=this._listeners[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ou=1234567,Hr=Math.PI/180,ar=180/Math.PI;function Xn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[s&255]+an[s>>8&255]+an[s>>16&255]+an[s>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function kt(s,e,t){return Math.max(e,Math.min(t,s))}function Yl(s,e){return(s%e+e)%e}function lm(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function hm(s,e,t){return s!==e?(t-s)/(e-s):0}function kr(s,e,t){return(1-t)*s+t*e}function um(s,e,t,n){return kr(s,e,1-Math.exp(-t*n))}function fm(s,e=1){return e-Math.abs(Yl(s,e*2)-e)}function dm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function pm(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function mm(s,e){return s+Math.floor(Math.random()*(e-s+1))}function gm(s,e){return s+Math.random()*(e-s)}function xm(s){return s*(.5-Math.random())}function vm(s){s!==void 0&&(Ou=s);let e=Ou+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function _m(s){return s*Hr}function ym(s){return s*ar}function rl(s){return(s&s-1)===0&&s!==0}function Mm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ha(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Sm(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),m=o((n-e)/2);switch(i){case"XYX":s.set(a*h,c*u,c*f,a*l);break;case"YZY":s.set(c*f,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*f,a*h,a*l);break;case"XZX":s.set(a*h,c*m,c*d,a*l);break;case"YXY":s.set(c*d,a*h,c*m,a*l);break;case"ZYZ":s.set(c*m,c*d,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function ni(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function gt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}var Ts={DEG2RAD:Hr,RAD2DEG:ar,generateUUID:Xn,clamp:kt,euclideanModulo:Yl,mapLinear:lm,inverseLerp:hm,lerp:kr,damp:um,pingpong:fm,smoothstep:dm,smootherstep:pm,randInt:mm,randFloat:gm,randFloatSpread:xm,seededRandom:vm,degToRad:_m,radToDeg:ym,isPowerOfTwo:rl,ceilPowerOfTwo:Mm,floorPowerOfTwo:ha,setQuaternionFromProperEuler:Sm,normalize:gt,denormalize:ni},oe=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},je=class s{constructor(e,t,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],x=i[0],g=i[3],p=i[6],_=i[1],v=i[4],M=i[7],C=i[2],b=i[5],R=i[8];return r[0]=o*x+a*_+c*C,r[3]=o*g+a*v+c*b,r[6]=o*p+a*M+c*R,r[1]=l*x+h*_+u*C,r[4]=l*g+h*v+u*b,r[7]=l*p+h*M+u*R,r[2]=f*x+d*_+m*C,r[5]=f*g+d*v+m*b,r[8]=f*p+d*M+m*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,m=t*u+n*f+i*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=u*x,e[1]=(i*l-h*n)*x,e[2]=(a*n-i*o)*x,e[3]=f*x,e[4]=(h*t-i*c)*x,e[5]=(i*r-a*t)*x,e[6]=d*x,e[7]=(n*c-l*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(bc.makeScale(e,t)),this}rotate(e){return this.premultiply(bc.makeRotation(-e)),this}translate(e,t){return this.premultiply(bc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},bc=new je;function nd(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Zr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Em(){let s=Zr("canvas");return s.style.display="block",s}var zu={};function Vr(s){s in zu||(zu[s]=!0,console.warn(s))}var Bu=new je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Hu=new je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ro={[Lt]:{transfer:oa,primaries:aa,toReference:s=>s,fromReference:s=>s},[_t]:{transfer:wt,primaries:aa,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Oa]:{transfer:oa,primaries:ca,toReference:s=>s.applyMatrix3(Hu),fromReference:s=>s.applyMatrix3(Bu)},[ql]:{transfer:wt,primaries:ca,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Hu),fromReference:s=>s.applyMatrix3(Bu).convertLinearToSRGB()}},bm=new Set([Lt,Oa]),at={enabled:!0,_workingColorSpace:Lt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!bm.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;let n=Ro[e].toReference,i=Ro[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return Ro[s].primaries},getTransfer:function(s){return s===_n?oa:Ro[s].transfer}};function tr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Tc(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var Us,ua=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Us===void 0&&(Us=Zr("canvas")),Us.width=e.width,Us.height=e.height;let n=Us.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Us}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Zr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=tr(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(tr(t[n]/255)*255):t[n]=tr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Tm=0,fa=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Xn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(wc(i[o].image)):r.push(wc(i[o]))}else r=wc(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function wc(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ua.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var wm=0,tn=class s extends Li{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=pn,i=pn,r=bt,o=qn,a=vn,c=bn,l=s.DEFAULT_ANISOTROPY,h=_n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wm++}),this.uuid=Xn(),this.name="",this.source=new fa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Vr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===ys?_t:_n),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Wf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Pi:e.x=e.x-Math.floor(e.x);break;case pn:e.x=e.x<0?0:1;break;case Yr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Pi:e.y=e.y-Math.floor(e.y);break;case pn:e.y=e.y<0?0:1;break;case Yr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Vr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===_t?ys:Qf}set encoding(e){Vr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ys?_t:_n}};tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=Wf;tn.DEFAULT_ANISOTROPY=1;var ft=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],m=c[9],x=c[2],g=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(l+1)/2,M=(d+1)/2,C=(p+1)/2,b=(h+f)/4,R=(u+x)/4,L=(m+g)/4;return v>M&&v>C?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=b/n,r=R/n):M>C?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=b/i,r=L/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=R/r,i=L/r),this.set(n,i,r,t),this}let _=Math.sqrt((g-m)*(g-m)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(g-m)/_,this.y=(u-x)/_,this.z=(f-h)/_,this.w=Math.acos((l+d+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ol=class extends Li{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ft(0,0,e,t),this.scissorTest=!1,this.viewport=new ft(0,0,e,t);let i={width:e,height:t,depth:1};n.encoding!==void 0&&(Vr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ys?_t:_n),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new tn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new fa(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yn=class extends ol{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},da=class extends tn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var al=class extends tn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Pt=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],f=r[o+0],d=r[o+1],m=r[o+2],x=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=m,e[t+3]=x;return}if(u!==x||c!==f||l!==d||h!==m){let g=1-a,p=c*f+l*d+h*m+u*x,_=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let C=Math.sqrt(v),b=Math.atan2(C,p*_);g=Math.sin(g*b)/C,a=Math.sin(a*b)/C}let M=a*_;if(c=c*g+f*M,l=l*g+d*M,h=h*g+m*M,u=u*g+x*M,g===1-a){let C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return e[t]=a*m+h*u+c*d-l*f,e[t+1]=c*m+h*f+l*u-a*d,e[t+2]=l*m+h*d+a*f-c*u,e[t+3]=h*m-a*u-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),f=c(n/2),d=c(i/2),m=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"YZX":this._x=f*h*u+l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u-f*d*m;break;case"XZY":this._x=f*h*u-l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-i)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(r+l)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(c+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-i)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(kt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},w=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ku.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ku.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ac.copy(this).projectOnVector(e),this.sub(Ac)}reflect(e){return this.sub(Ac.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ac=new w,ku=new Pt,gn=class{constructor(e=new w(1/0,1/0,1/0),t=new w(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Vn):Vn.fromBufferAttribute(r,o),Vn.applyMatrix4(e.matrixWorld),this.expandByPoint(Vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Co.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Co.copy(n.boundingBox)),Co.applyMatrix4(e.matrixWorld),this.union(Co)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Vn),Vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ir),Po.subVectors(this.max,Ir),Ns.subVectors(e.a,Ir),Fs.subVectors(e.b,Ir),Os.subVectors(e.c,Ir),Gi.subVectors(Fs,Ns),Wi.subVectors(Os,Fs),us.subVectors(Ns,Os);let t=[0,-Gi.z,Gi.y,0,-Wi.z,Wi.y,0,-us.z,us.y,Gi.z,0,-Gi.x,Wi.z,0,-Wi.x,us.z,0,-us.x,-Gi.y,Gi.x,0,-Wi.y,Wi.x,0,-us.y,us.x,0];return!Rc(t,Ns,Fs,Os,Po)||(t=[1,0,0,0,1,0,0,0,1],!Rc(t,Ns,Fs,Os,Po))?!1:(Lo.crossVectors(Gi,Wi),t=[Lo.x,Lo.y,Lo.z],Rc(t,Ns,Fs,Os,Po))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},yi=[new w,new w,new w,new w,new w,new w,new w,new w],Vn=new w,Co=new gn,Ns=new w,Fs=new w,Os=new w,Gi=new w,Wi=new w,us=new w,Ir=new w,Po=new w,Lo=new w,fs=new w;function Rc(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){fs.fromArray(s,r);let a=i.x*Math.abs(fs.x)+i.y*Math.abs(fs.y)+i.z*Math.abs(fs.z),c=e.dot(fs),l=t.dot(fs),h=n.dot(fs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Am=new gn,Dr=new w,Cc=new w,Tn=class{constructor(e=new w,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Am.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Dr.subVectors(e,this.center);let t=Dr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Dr,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Dr.copy(e.center).add(Cc)),this.expandByPoint(Dr.copy(e.center).sub(Cc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Mi=new w,Pc=new w,Io=new w,Xi=new w,Lc=new w,Do=new w,Ic=new w,cr=class{constructor(e=new w,t=new w(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Mi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mi.copy(this.origin).addScaledVector(this.direction,t),Mi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Pc.copy(e).add(t).multiplyScalar(.5),Io.copy(t).sub(e).normalize(),Xi.copy(this.origin).sub(Pc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Io),a=Xi.dot(this.direction),c=-Xi.dot(Io),l=Xi.lengthSq(),h=Math.abs(1-o*o),u,f,d,m;if(h>0)if(u=o*c-a,f=o*a-c,m=r*h,u>=0)if(f>=-m)if(f<=m){let x=1/h;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Pc).addScaledVector(Io,f),d}intersectSphere(e,t){Mi.subVectors(e.center,this.origin);let n=Mi.dot(this.direction),i=Mi.dot(Mi)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Mi)!==null}intersectTriangle(e,t,n,i,r){Lc.subVectors(t,e),Do.subVectors(n,e),Ic.crossVectors(Lc,Do);let o=this.direction.dot(Ic),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Xi.subVectors(this.origin,e);let c=a*this.direction.dot(Do.crossVectors(Xi,Do));if(c<0)return null;let l=a*this.direction.dot(Lc.cross(Xi));if(l<0||c+l>o)return null;let h=-a*Xi.dot(Ic);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Pe=class s{constructor(e,t,n,i,r,o,a,c,l,h,u,f,d,m,x,g){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,h,u,f,d,m,x,g)}set(e,t,n,i,r,o,a,c,l,h,u,f,d,m,x,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/zs.setFromMatrixColumn(e,0).length(),r=1/zs.setFromMatrixColumn(e,1).length(),o=1/zs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*h,d=o*u,m=a*h,x=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=d+m*l,t[5]=f-x*l,t[9]=-a*c,t[2]=x-f*l,t[6]=m+d*l,t[10]=o*c}else if(e.order==="YXZ"){let f=c*h,d=c*u,m=l*h,x=l*u;t[0]=f+x*a,t[4]=m*a-d,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=d*a-m,t[6]=x+f*a,t[10]=o*c}else if(e.order==="ZXY"){let f=c*h,d=c*u,m=l*h,x=l*u;t[0]=f-x*a,t[4]=-o*u,t[8]=m+d*a,t[1]=d+m*a,t[5]=o*h,t[9]=x-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let f=o*h,d=o*u,m=a*h,x=a*u;t[0]=c*h,t[4]=m*l-d,t[8]=f*l+x,t[1]=c*u,t[5]=x*l+f,t[9]=d*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let f=o*c,d=o*l,m=a*c,x=a*l;t[0]=c*h,t[4]=x-f*u,t[8]=m*u+d,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=d*u+m,t[10]=f-x*u}else if(e.order==="XZY"){let f=o*c,d=o*l,m=a*c,x=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+x,t[5]=o*h,t[9]=d*u-m,t[2]=m*u-d,t[6]=a*h,t[10]=x*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rm,e,Cm)}lookAt(e,t,n){let i=this.elements;return Sn.subVectors(e,t),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),qi.crossVectors(n,Sn),qi.lengthSq()===0&&(Math.abs(n.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),qi.crossVectors(n,Sn)),qi.normalize(),Uo.crossVectors(Sn,qi),i[0]=qi.x,i[4]=Uo.x,i[8]=Sn.x,i[1]=qi.y,i[5]=Uo.y,i[9]=Sn.y,i[2]=qi.z,i[6]=Uo.z,i[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],x=n[6],g=n[10],p=n[14],_=n[3],v=n[7],M=n[11],C=n[15],b=i[0],R=i[4],L=i[8],y=i[12],E=i[1],F=i[5],V=i[9],$=i[13],P=i[2],z=i[6],G=i[10],I=i[14],N=i[3],O=i[7],W=i[11],k=i[15];return r[0]=o*b+a*E+c*P+l*N,r[4]=o*R+a*F+c*z+l*O,r[8]=o*L+a*V+c*G+l*W,r[12]=o*y+a*$+c*I+l*k,r[1]=h*b+u*E+f*P+d*N,r[5]=h*R+u*F+f*z+d*O,r[9]=h*L+u*V+f*G+d*W,r[13]=h*y+u*$+f*I+d*k,r[2]=m*b+x*E+g*P+p*N,r[6]=m*R+x*F+g*z+p*O,r[10]=m*L+x*V+g*G+p*W,r[14]=m*y+x*$+g*I+p*k,r[3]=_*b+v*E+M*P+C*N,r[7]=_*R+v*F+M*z+C*O,r[11]=_*L+v*V+M*G+C*W,r[15]=_*y+v*$+M*I+C*k,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],m=e[3],x=e[7],g=e[11],p=e[15];return m*(+r*c*u-i*l*u-r*a*f+n*l*f+i*a*d-n*c*d)+x*(+t*c*d-t*l*f+r*o*f-i*o*d+i*l*h-r*c*h)+g*(+t*l*u-t*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-i*a*h-t*c*u+t*a*f+i*o*u-n*o*f+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],m=e[12],x=e[13],g=e[14],p=e[15],_=u*g*l-x*f*l+x*c*d-a*g*d-u*c*p+a*f*p,v=m*f*l-h*g*l-m*c*d+o*g*d+h*c*p-o*f*p,M=h*x*l-m*u*l+m*a*d-o*x*d-h*a*p+o*u*p,C=m*u*c-h*x*c-m*a*f+o*x*f+h*a*g-o*u*g,b=t*_+n*v+i*M+r*C;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/b;return e[0]=_*R,e[1]=(x*f*r-u*g*r-x*i*d+n*g*d+u*i*p-n*f*p)*R,e[2]=(a*g*r-x*c*r+x*i*l-n*g*l-a*i*p+n*c*p)*R,e[3]=(u*c*r-a*f*r-u*i*l+n*f*l+a*i*d-n*c*d)*R,e[4]=v*R,e[5]=(h*g*r-m*f*r+m*i*d-t*g*d-h*i*p+t*f*p)*R,e[6]=(m*c*r-o*g*r-m*i*l+t*g*l+o*i*p-t*c*p)*R,e[7]=(o*f*r-h*c*r+h*i*l-t*f*l-o*i*d+t*c*d)*R,e[8]=M*R,e[9]=(m*u*r-h*x*r-m*n*d+t*x*d+h*n*p-t*u*p)*R,e[10]=(o*x*r-m*a*r+m*n*l-t*x*l-o*n*p+t*a*p)*R,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*d-t*a*d)*R,e[12]=C*R,e[13]=(h*x*i-m*u*i+m*n*f-t*x*f-h*n*g+t*u*g)*R,e[14]=(m*a*i-o*x*i-m*n*c+t*x*c+o*n*g-t*a*g)*R,e[15]=(o*u*i-h*a*i+h*n*c-t*u*c-o*n*f+t*a*f)*R,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,m=r*u,x=o*h,g=o*u,p=a*u,_=c*l,v=c*h,M=c*u,C=n.x,b=n.y,R=n.z;return i[0]=(1-(x+p))*C,i[1]=(d+M)*C,i[2]=(m-v)*C,i[3]=0,i[4]=(d-M)*b,i[5]=(1-(f+p))*b,i[6]=(g+_)*b,i[7]=0,i[8]=(m+v)*R,i[9]=(g-_)*R,i[10]=(1-(f+x))*R,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=zs.set(i[0],i[1],i[2]).length(),o=zs.set(i[4],i[5],i[6]).length(),a=zs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Gn.copy(this);let l=1/r,h=1/o,u=1/a;return Gn.elements[0]*=l,Gn.elements[1]*=l,Gn.elements[2]*=l,Gn.elements[4]*=h,Gn.elements[5]*=h,Gn.elements[6]*=h,Gn.elements[8]*=u,Gn.elements[9]*=u,Gn.elements[10]*=u,t.setFromRotationMatrix(Gn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Ci){let c=this.elements,l=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),d,m;if(a===Ci)d=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===la)d=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Ci){let c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(o-r),f=(t+e)*l,d=(n+i)*h,m,x;if(a===Ci)m=(o+r)*u,x=-2*u;else if(a===la)m=r*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=x,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},zs=new w,Gn=new Pe,Rm=new w(0,0,0),Cm=new w(1,1,1),qi=new w,Uo=new w,Sn=new w,Vu=new Pe,Gu=new Pt,$i=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(kt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-kt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Vu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gu.setFromEuler(this),this.setFromQuaternion(Gu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};$i.DEFAULT_ORDER="XYZ";var pa=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Pm=0,Wu=new w,Bs=new Pt,Si=new Pe,No=new w,Ur=new w,Lm=new w,Im=new Pt,Xu=new w(1,0,0),qu=new w(0,1,0),Yu=new w(0,0,1),Dm={type:"added"},Um={type:"removed"},dt=class s extends Li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Pm++}),this.uuid=Xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new w,t=new $i,n=new Pt,i=new w(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pe},normalMatrix:{value:new je}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Bs.setFromAxisAngle(e,t),this.quaternion.multiply(Bs),this}rotateOnWorldAxis(e,t){return Bs.setFromAxisAngle(e,t),this.quaternion.premultiply(Bs),this}rotateX(e){return this.rotateOnAxis(Xu,e)}rotateY(e){return this.rotateOnAxis(qu,e)}rotateZ(e){return this.rotateOnAxis(Yu,e)}translateOnAxis(e,t){return Wu.copy(e).applyQuaternion(this.quaternion),this.position.add(Wu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xu,e)}translateY(e){return this.translateOnAxis(qu,e)}translateZ(e){return this.translateOnAxis(Yu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Si.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?No.copy(e):No.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ur.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Si.lookAt(Ur,No,this.up):Si.lookAt(No,Ur,this.up),this.quaternion.setFromRotationMatrix(Si),i&&(Si.extractRotation(i.matrixWorld),Bs.setFromRotationMatrix(Si),this.quaternion.premultiply(Bs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Dm)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Um)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Si.multiply(e.parent.matrixWorld)),e.applyMatrix4(Si),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ur,e,Lm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ur,Im,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++){let r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++){let a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};dt.DEFAULT_UP=new w(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Wn=new w,Ei=new w,Dc=new w,bi=new w,Hs=new w,ks=new w,Zu=new w,Uc=new w,Nc=new w,Fc=new w,Fo=!1,js=class s{constructor(e=new w,t=new w,n=new w){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Wn.subVectors(e,t),i.cross(Wn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Wn.subVectors(i,t),Ei.subVectors(n,t),Dc.subVectors(e,t);let o=Wn.dot(Wn),a=Wn.dot(Ei),c=Wn.dot(Dc),l=Ei.dot(Ei),h=Ei.dot(Dc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(l*c-a*h)*f,m=(o*h-a*c)*f;return r.set(1-d-m,m,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getUV(e,t,n,i,r,o,a,c){return Fo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Fo=!0),this.getInterpolation(e,t,n,i,r,o,a,c)}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,bi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,bi.x),c.addScaledVector(o,bi.y),c.addScaledVector(a,bi.z),c)}static isFrontFacing(e,t,n,i){return Wn.subVectors(n,t),Ei.subVectors(e,t),Wn.cross(Ei).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),Wn.cross(Ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return Fo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Fo=!0),s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;Hs.subVectors(i,n),ks.subVectors(r,n),Uc.subVectors(e,n);let c=Hs.dot(Uc),l=ks.dot(Uc);if(c<=0&&l<=0)return t.copy(n);Nc.subVectors(e,i);let h=Hs.dot(Nc),u=ks.dot(Nc);if(h>=0&&u<=h)return t.copy(i);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Hs,o);Fc.subVectors(e,r);let d=Hs.dot(Fc),m=ks.dot(Fc);if(m>=0&&d<=m)return t.copy(r);let x=d*l-c*m;if(x<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(ks,a);let g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return Zu.subVectors(r,i),a=(u-h)/(u-h+(d-m)),t.copy(i).addScaledVector(Zu,a);let p=1/(g+x+f);return o=x*p,a=f*p,t.copy(n).addScaledVector(Hs,o).addScaledVector(ks,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yi={h:0,s:0,l:0},Oo={h:0,s:0,l:0};function Oc(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var ge=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=_t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=at.workingColorSpace){if(e=Yl(e,1),t=kt(t,0,1),n=kt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Oc(o,r,e+1/3),this.g=Oc(o,r,e),this.b=Oc(o,r,e-1/3)}return at.toWorkingColorSpace(this,i),this}setStyle(e,t=_t){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=_t){let n=id[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=tr(e.r),this.g=tr(e.g),this.b=tr(e.b),this}copyLinearToSRGB(e){return this.r=Tc(e.r),this.g=Tc(e.g),this.b=Tc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=_t){return at.fromWorkingColorSpace(cn.copy(this),e),Math.round(kt(cn.r*255,0,255))*65536+Math.round(kt(cn.g*255,0,255))*256+Math.round(kt(cn.b*255,0,255))}getHexString(e=_t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.fromWorkingColorSpace(cn.copy(this),t);let n=cn.r,i=cn.g,r=cn.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=at.workingColorSpace){return at.fromWorkingColorSpace(cn.copy(this),t),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=_t){at.fromWorkingColorSpace(cn.copy(this),e);let t=cn.r,n=cn.g,i=cn.b;return e!==_t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Yi),this.setHSL(Yi.h+e,Yi.s+t,Yi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Yi),e.getHSL(Oo);let n=kr(Yi.h,Oo.h,t),i=kr(Yi.s,Oo.s,t),r=kr(Yi.l,Oo.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},cn=new ge;ge.NAMES=id;var Nm=0,wn=class extends Li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nm++}),this.uuid=Xn(),this.name="",this.type="Material",this.blending=Ji,this.side=Ln,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=el,this.blendDst=tl,this.blendEquation=gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ge(0,0,0),this.blendAlpha=0,this.depthFunc=ia,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ds,this.stencilZFail=Ds,this.stencilZPass=Ds,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ji&&(n.blending=this.blending),this.side!==Ln&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==el&&(n.blendSrc=this.blendSrc),this.blendDst!==tl&&(n.blendDst=this.blendDst),this.blendEquation!==gs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ia&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ds&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ds&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ds&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},zt=class extends wn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Gf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ri=Fm();function Fm(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[c|256]=32768,i[c]=24,i[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,i[c]=-l-1,i[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,i[c]=13,i[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,i[c]=24,i[c|256]=24):(n[c]=31744,n[c|256]=64512,i[c]=13,i[c|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;!(l&8388608);)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function Om(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=kt(s,-65504,65504),Ri.floatView[0]=s;let e=Ri.uint32View[0],t=e>>23&511;return Ri.baseTable[t]+((e&8388607)>>Ri.shiftTable[t])}function zm(s){let e=s>>10;return Ri.uint32View[0]=Ri.mantissaTable[Ri.offsetTable[e]+(s&1023)]+Ri.exponentTable[e],Ri.floatView[0]}var lo={toHalfFloat:Om,fromHalfFloat:zm},Ht=new w,zo=new oe,nt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=il,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)zo.fromBufferAttribute(this,t),zo.applyMatrix3(e),this.setXY(t,zo.x,zo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix3(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array),r=gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==il&&(e.usage=this.usage),e}};var ma=class extends nt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var ga=class extends nt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var it=class extends nt{constructor(e,t,n){super(new Float32Array(e),t,n)}};var Bm=0,Pn=new Pe,zc=new dt,Vs=new w,En=new gn,Nr=new gn,$t=new w,pt=class s extends Li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bm++}),this.uuid=Xn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(nd(e)?ga:ma)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new je().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Pn.makeRotationFromQuaternion(e),this.applyMatrix4(Pn),this}rotateX(e){return Pn.makeRotationX(e),this.applyMatrix4(Pn),this}rotateY(e){return Pn.makeRotationY(e),this.applyMatrix4(Pn),this}rotateZ(e){return Pn.makeRotationZ(e),this.applyMatrix4(Pn),this}translate(e,t,n){return Pn.makeTranslation(e,t,n),this.applyMatrix4(Pn),this}scale(e,t,n){return Pn.makeScale(e,t,n),this.applyMatrix4(Pn),this}lookAt(e){return zc.lookAt(e),zc.updateMatrix(),this.applyMatrix4(zc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vs).negate(),this.translate(Vs.x,Vs.y,Vs.z),this}setFromPoints(e){let t=[];for(let n=0,i=e.length;n<i;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new it(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new w(-1/0,-1/0,-1/0),new w(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];En.setFromBufferAttribute(r),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Tn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new w,1/0);return}if(e){let n=this.boundingSphere.center;if(En.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Nr.setFromBufferAttribute(a),this.morphTargetsRelative?($t.addVectors(En.min,Nr.min),En.expandByPoint($t),$t.addVectors(En.max,Nr.max),En.expandByPoint($t)):(En.expandByPoint(Nr.min),En.expandByPoint(Nr.max))}En.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)$t.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared($t));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)$t.fromBufferAttribute(a,l),c&&(Vs.fromBufferAttribute(e,l),$t.add(Vs)),i=Math.max(i,n.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.array,i=t.position.array,r=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new nt(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let E=0;E<a;E++)l[E]=new w,h[E]=new w;let u=new w,f=new w,d=new w,m=new oe,x=new oe,g=new oe,p=new w,_=new w;function v(E,F,V){u.fromArray(i,E*3),f.fromArray(i,F*3),d.fromArray(i,V*3),m.fromArray(o,E*2),x.fromArray(o,F*2),g.fromArray(o,V*2),f.sub(u),d.sub(u),x.sub(m),g.sub(m);let $=1/(x.x*g.y-g.x*x.y);isFinite($)&&(p.copy(f).multiplyScalar(g.y).addScaledVector(d,-x.y).multiplyScalar($),_.copy(d).multiplyScalar(x.x).addScaledVector(f,-g.x).multiplyScalar($),l[E].add(p),l[F].add(p),l[V].add(p),h[E].add(_),h[F].add(_),h[V].add(_))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let E=0,F=M.length;E<F;++E){let V=M[E],$=V.start,P=V.count;for(let z=$,G=$+P;z<G;z+=3)v(n[z+0],n[z+1],n[z+2])}let C=new w,b=new w,R=new w,L=new w;function y(E){R.fromArray(r,E*3),L.copy(R);let F=l[E];C.copy(F),C.sub(R.multiplyScalar(R.dot(F))).normalize(),b.crossVectors(L,F);let $=b.dot(h[E])<0?-1:1;c[E*4]=C.x,c[E*4+1]=C.y,c[E*4+2]=C.z,c[E*4+3]=$}for(let E=0,F=M.length;E<F;++E){let V=M[E],$=V.start,P=V.count;for(let z=$,G=$+P;z<G;z+=3)y(n[z+0]),y(n[z+1]),y(n[z+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new nt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let i=new w,r=new w,o=new w,a=new w,c=new w,l=new w,h=new w,u=new w;if(e)for(let f=0,d=e.count;f<d;f+=3){let m=e.getX(f+0),x=e.getX(f+1),g=e.getX(f+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),d=0,m=0;for(let x=0,g=c.length;x<g;x++){a.isInterleavedBufferAttribute?d=c[x]*a.data.stride+a.offset:d=c[x]*h;for(let p=0;p<h;p++)f[m++]=l[d++]}return new nt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ku=new Pe,ds=new cr,Bo=new Tn,Ju=new w,Gs=new w,Ws=new w,Xs=new w,Bc=new w,Ho=new w,ko=new oe,Vo=new oe,Go=new oe,$u=new w,ju=new w,Qu=new w,Wo=new w,Xo=new w,Ce=class extends dt{constructor(e=new pt,t=new zt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Ho.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(Bc.fromBufferAttribute(u,e),o?Ho.addScaledVector(Bc,h):Ho.addScaledVector(Bc.sub(t),h))}t.add(Ho)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Bo.copy(n.boundingSphere),Bo.applyMatrix4(r),ds.copy(e.ray).recast(e.near),!(Bo.containsPoint(ds.origin)===!1&&(ds.intersectSphere(Bo,Ju)===null||ds.origin.distanceToSquared(Ju)>(e.far-e.near)**2))&&(Ku.copy(r).invert(),ds.copy(e.ray).applyMatrix4(Ku),!(n.boundingBox!==null&&ds.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ds)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){let g=f[m],p=o[g.materialIndex],_=Math.max(g.start,d.start),v=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let M=_,C=v;M<C;M+=3){let b=a.getX(M),R=a.getX(M+1),L=a.getX(M+2);i=qo(this,p,e,n,l,h,u,b,R,L),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){let _=a.getX(g),v=a.getX(g+1),M=a.getX(g+2);i=qo(this,o,e,n,l,h,u,_,v,M),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){let g=f[m],p=o[g.materialIndex],_=Math.max(g.start,d.start),v=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let M=_,C=v;M<C;M+=3){let b=M,R=M+1,L=M+2;i=qo(this,p,e,n,l,h,u,b,R,L),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let g=m,p=x;g<p;g+=3){let _=g,v=g+1,M=g+2;i=qo(this,o,e,n,l,h,u,_,v,M),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function Hm(s,e,t,n,i,r,o,a){let c;if(e.side===ln?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Ln,a),c===null)return null;Xo.copy(a),Xo.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(Xo);return l<t.near||l>t.far?null:{distance:l,point:Xo.clone(),object:s}}function qo(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,Gs),s.getVertexPosition(c,Ws),s.getVertexPosition(l,Xs);let h=Hm(s,e,t,n,Gs,Ws,Xs,Wo);if(h){i&&(ko.fromBufferAttribute(i,a),Vo.fromBufferAttribute(i,c),Go.fromBufferAttribute(i,l),h.uv=js.getInterpolation(Wo,Gs,Ws,Xs,ko,Vo,Go,new oe)),r&&(ko.fromBufferAttribute(r,a),Vo.fromBufferAttribute(r,c),Go.fromBufferAttribute(r,l),h.uv1=js.getInterpolation(Wo,Gs,Ws,Xs,ko,Vo,Go,new oe),h.uv2=h.uv1),o&&($u.fromBufferAttribute(o,a),ju.fromBufferAttribute(o,c),Qu.fromBufferAttribute(o,l),h.normal=js.getInterpolation(Wo,Gs,Ws,Xs,$u,ju,Qu,new w),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new w,materialIndex:0};js.getNormal(Gs,Ws,Xs,u.normal),h.face=u}return h}var xn=class s extends pt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,d=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,i,o,2),m("x","z","y",1,-1,e,n,-t,i,o,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(h,3)),this.setAttribute("uv",new it(u,2));function m(x,g,p,_,v,M,C,b,R,L,y){let E=M/R,F=C/L,V=M/2,$=C/2,P=b/2,z=R+1,G=L+1,I=0,N=0,O=new w;for(let W=0;W<G;W++){let k=W*F-$;for(let J=0;J<z;J++){let U=J*E-V;O[x]=U*_,O[g]=k*v,O[p]=P,l.push(O.x,O.y,O.z),O[x]=0,O[g]=0,O[p]=b>0?1:-1,h.push(O.x,O.y,O.z),u.push(J/R),u.push(1-W/L),I+=1}}for(let W=0;W<L;W++)for(let k=0;k<R;k++){let J=f+k+z*W,U=f+k+z*(W+1),K=f+(k+1)+z*(W+1),ie=f+(k+1)+z*W;c.push(J,U,ie),c.push(U,K,ie),N+=6}a.addGroup(d,N,y),d+=N,f+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function lr(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function dn(s){let e={};for(let t=0;t<s.length;t++){let n=lr(s[t]);for(let i in n)e[i]=n[i]}return e}function km(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function sd(s){return s.getRenderTarget()===null?s.outputColorSpace:at.workingColorSpace}var Vm={clone:lr,merge:dn},Gm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,nn=class extends wn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gm,this.fragmentShader=Wm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lr(e.uniforms),this.uniformsGroups=km(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},xa=class extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=Ci}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Gt=class extends xa{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ar*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Hr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ar*2*Math.atan(Math.tan(Hr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Hr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},qs=-90,Ys=1,cl=class extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Gt(qs,Ys,e,t);i.layers=this.layers,this.add(i);let r=new Gt(qs,Ys,e,t);r.layers=this.layers,this.add(r);let o=new Gt(qs,Ys,e,t);o.layers=this.layers,this.add(o);let a=new Gt(qs,Ys,e,t);a.layers=this.layers,this.add(a);let c=new Gt(qs,Ys,e,t);c.layers=this.layers,this.add(c);let l=new Gt(qs,Ys,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Ci)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===la)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},va=class extends tn{constructor(e,t,n,i,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:ir,super(e,t,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ll=class extends Yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Vr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ys?_t:_n),this.texture=new va(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:bt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new xn(5,5,5),r=new nn({name:"CubemapFromEquirect",uniforms:lr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ln,blending:Ki});r.uniforms.tEquirect.value=t;let o=new Ce(i,r),a=t.minFilter;return t.minFilter===qn&&(t.minFilter=bt),new cl(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},Hc=new w,Xm=new w,qm=new je,Ai=class{constructor(e=new w(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Hc.subVectors(n,t).cross(Xm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Hc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||qm.getNormalMatrix(e),i=this.coplanarPoint(Hc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},ps=new Tn,Yo=new w,Kr=class{constructor(e=new Ai,t=new Ai,n=new Ai,i=new Ai,r=new Ai,o=new Ai){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ci){let n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],f=i[7],d=i[8],m=i[9],x=i[10],g=i[11],p=i[12],_=i[13],v=i[14],M=i[15];if(n[0].setComponents(c-r,f-l,g-d,M-p).normalize(),n[1].setComponents(c+r,f+l,g+d,M+p).normalize(),n[2].setComponents(c+o,f+h,g+m,M+_).normalize(),n[3].setComponents(c-o,f-h,g-m,M-_).normalize(),n[4].setComponents(c-a,f-u,g-x,M-v).normalize(),t===Ci)n[5].setComponents(c+a,f+u,g+x,M+v).normalize();else if(t===la)n[5].setComponents(a,u,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ps.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ps.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ps)}intersectsSprite(e){return ps.center.set(0,0,0),ps.radius=.7071067811865476,ps.applyMatrix4(e.matrixWorld),this.intersectsSphere(ps)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Yo.x=i.normal.x>0?e.max.x:e.min.x,Yo.y=i.normal.y>0?e.max.y:e.min.y,Yo.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Yo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function rd(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Ym(s,e){let t=e.isWebGL2,n=new WeakMap;function i(l,h){let u=l.array,f=l.usage,d=u.byteLength,m=s.createBuffer();s.bindBuffer(h,m),s.bufferData(h,u,f),l.onUploadCallback();let x;if(u instanceof Float32Array)x=s.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)x=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)x=s.SHORT;else if(u instanceof Uint32Array)x=s.UNSIGNED_INT;else if(u instanceof Int32Array)x=s.INT;else if(u instanceof Int8Array)x=s.BYTE;else if(u instanceof Uint8Array)x=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)x=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:x,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:d}}function r(l,h,u){let f=h.array,d=h._updateRange,m=h.updateRanges;if(s.bindBuffer(u,l),d.count===-1&&m.length===0&&s.bufferSubData(u,0,f),m.length!==0){for(let x=0,g=m.length;x<g;x++){let p=m[x];t?s.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f,p.start,p.count):s.bufferSubData(u,p.start*f.BYTES_PER_ELEMENT,f.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}d.count!==-1&&(t?s.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f,d.offset,d.count):s.bufferSubData(u,d.offset*f.BYTES_PER_ELEMENT,f.subarray(d.offset,d.offset+d.count)),d.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=n.get(l);h&&(s.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}var Zn=class s extends pt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,f=t/c,d=[],m=[],x=[],g=[];for(let p=0;p<h;p++){let _=p*f-o;for(let v=0;v<l;v++){let M=v*u-r;m.push(M,-_,0),x.push(0,0,1),g.push(v/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let _=0;_<a;_++){let v=_+l*p,M=_+l*(p+1),C=_+1+l*(p+1),b=_+1+l*p;d.push(v,M,b),d.push(M,C,b)}this.setIndex(d),this.setAttribute("position",new it(m,3)),this.setAttribute("normal",new it(x,3)),this.setAttribute("uv",new it(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Zm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Km=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$m=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,jm=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Qm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,e0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,t0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,n0=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,i0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,s0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,r0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,o0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,a0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,c0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,l0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,f0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,d0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,p0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,m0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,g0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,x0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,v0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,_0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,y0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,M0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,S0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,E0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,b0="gl_FragColor = linearToOutputTexel( gl_FragColor );",T0=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,w0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,A0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,R0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,C0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,P0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,L0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,I0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,D0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,U0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,N0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,F0=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,O0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,z0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,B0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,H0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,k0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,V0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,G0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,W0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,X0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,q0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Y0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Z0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,K0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,J0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,j0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,eg=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,tg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ng=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ig=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,og=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ag=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,lg=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,hg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,ug=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_g=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Eg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ag=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Pg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Lg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ig=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Dg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ug=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ng=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Og=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,kg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Vg=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Yg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$g=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ex=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,tx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,nx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ox=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ax=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ux=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,px=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_x=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Sx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ex=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Tx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:Zm,alphahash_pars_fragment:Km,alphamap_fragment:Jm,alphamap_pars_fragment:$m,alphatest_fragment:jm,alphatest_pars_fragment:Qm,aomap_fragment:e0,aomap_pars_fragment:t0,batching_pars_vertex:n0,batching_vertex:i0,begin_vertex:s0,beginnormal_vertex:r0,bsdfs:o0,iridescence_fragment:a0,bumpmap_pars_fragment:c0,clipping_planes_fragment:l0,clipping_planes_pars_fragment:h0,clipping_planes_pars_vertex:u0,clipping_planes_vertex:f0,color_fragment:d0,color_pars_fragment:p0,color_pars_vertex:m0,color_vertex:g0,common:x0,cube_uv_reflection_fragment:v0,defaultnormal_vertex:_0,displacementmap_pars_vertex:y0,displacementmap_vertex:M0,emissivemap_fragment:S0,emissivemap_pars_fragment:E0,colorspace_fragment:b0,colorspace_pars_fragment:T0,envmap_fragment:w0,envmap_common_pars_fragment:A0,envmap_pars_fragment:R0,envmap_pars_vertex:C0,envmap_physical_pars_fragment:k0,envmap_vertex:P0,fog_vertex:L0,fog_pars_vertex:I0,fog_fragment:D0,fog_pars_fragment:U0,gradientmap_pars_fragment:N0,lightmap_fragment:F0,lightmap_pars_fragment:O0,lights_lambert_fragment:z0,lights_lambert_pars_fragment:B0,lights_pars_begin:H0,lights_toon_fragment:V0,lights_toon_pars_fragment:G0,lights_phong_fragment:W0,lights_phong_pars_fragment:X0,lights_physical_fragment:q0,lights_physical_pars_fragment:Y0,lights_fragment_begin:Z0,lights_fragment_maps:K0,lights_fragment_end:J0,logdepthbuf_fragment:$0,logdepthbuf_pars_fragment:j0,logdepthbuf_pars_vertex:Q0,logdepthbuf_vertex:eg,map_fragment:tg,map_pars_fragment:ng,map_particle_fragment:ig,map_particle_pars_fragment:sg,metalnessmap_fragment:rg,metalnessmap_pars_fragment:og,morphcolor_vertex:ag,morphnormal_vertex:cg,morphtarget_pars_vertex:lg,morphtarget_vertex:hg,normal_fragment_begin:ug,normal_fragment_maps:fg,normal_pars_fragment:dg,normal_pars_vertex:pg,normal_vertex:mg,normalmap_pars_fragment:gg,clearcoat_normal_fragment_begin:xg,clearcoat_normal_fragment_maps:vg,clearcoat_pars_fragment:_g,iridescence_pars_fragment:yg,opaque_fragment:Mg,packing:Sg,premultiplied_alpha_fragment:Eg,project_vertex:bg,dithering_fragment:Tg,dithering_pars_fragment:wg,roughnessmap_fragment:Ag,roughnessmap_pars_fragment:Rg,shadowmap_pars_fragment:Cg,shadowmap_pars_vertex:Pg,shadowmap_vertex:Lg,shadowmask_pars_fragment:Ig,skinbase_vertex:Dg,skinning_pars_vertex:Ug,skinning_vertex:Ng,skinnormal_vertex:Fg,specularmap_fragment:Og,specularmap_pars_fragment:zg,tonemapping_fragment:Bg,tonemapping_pars_fragment:Hg,transmission_fragment:kg,transmission_pars_fragment:Vg,uv_pars_fragment:Gg,uv_pars_vertex:Wg,uv_vertex:Xg,worldpos_vertex:qg,background_vert:Yg,background_frag:Zg,backgroundCube_vert:Kg,backgroundCube_frag:Jg,cube_vert:$g,cube_frag:jg,depth_vert:Qg,depth_frag:ex,distanceRGBA_vert:tx,distanceRGBA_frag:nx,equirect_vert:ix,equirect_frag:sx,linedashed_vert:rx,linedashed_frag:ox,meshbasic_vert:ax,meshbasic_frag:cx,meshlambert_vert:lx,meshlambert_frag:hx,meshmatcap_vert:ux,meshmatcap_frag:fx,meshnormal_vert:dx,meshnormal_frag:px,meshphong_vert:mx,meshphong_frag:gx,meshphysical_vert:xx,meshphysical_frag:vx,meshtoon_vert:_x,meshtoon_frag:yx,points_vert:Mx,points_frag:Sx,shadow_vert:Ex,shadow_frag:bx,sprite_vert:Tx,sprite_frag:wx},ce={common:{diffuse:{value:new ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new ge(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},ti={basic:{uniforms:dn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:dn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new ge(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:dn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new ge(0)},specular:{value:new ge(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:dn([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:dn([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new ge(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:dn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:dn([ce.points,ce.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:dn([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:dn([ce.common,ce.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:dn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:dn([ce.sprite,ce.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:dn([ce.common,ce.displacementmap,{referencePosition:{value:new w},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:dn([ce.lights,ce.fog,{color:{value:new ge(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};ti.physical={uniforms:dn([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new ge(0)},specularColor:{value:new ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};var Zo={r:0,b:0,g:0};function Ax(s,e,t,n,i,r,o){let a=new ge(0),c=r===!0?0:1,l,h,u=null,f=0,d=null;function m(g,p){let _=!1,v=p.isScene===!0?p.background:null;v&&v.isTexture&&(v=(p.backgroundBlurriness>0?t:e).get(v)),v===null?x(a,c):v&&v.isColor&&(x(v,1),_=!0);let M=s.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||_)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Na)?(h===void 0&&(h=new Ce(new xn(1,1,1),new nn({name:"BackgroundCubeMaterial",uniforms:lr(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=at.getTransfer(v.colorSpace)!==wt,(u!==v||f!==v.version||d!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=s.toneMapping),h.layers.enableAll(),g.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Ce(new Zn(2,2),new nn({name:"BackgroundMaterial",uniforms:lr(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=at.getTransfer(v.colorSpace)!==wt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,u=v,f=v.version,d=s.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null))}function x(g,p){g.getRGB(Zo,sd(s)),n.buffers.color.setClear(Zo.r,Zo.g,Zo.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(g,p=1){a.set(g),c=p,x(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(g){c=g,x(a,c)},render:m}}function Rx(s,e,t,n){let i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=g(null),l=c,h=!1;function u(P,z,G,I,N){let O=!1;if(o){let W=x(I,G,z);l!==W&&(l=W,d(l.object)),O=p(P,I,G,N),O&&_(P,I,G,N)}else{let W=z.wireframe===!0;(l.geometry!==I.id||l.program!==G.id||l.wireframe!==W)&&(l.geometry=I.id,l.program=G.id,l.wireframe=W,O=!0)}N!==null&&t.update(N,s.ELEMENT_ARRAY_BUFFER),(O||h)&&(h=!1,L(P,z,G,I),N!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function f(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function d(P){return n.isWebGL2?s.bindVertexArray(P):r.bindVertexArrayOES(P)}function m(P){return n.isWebGL2?s.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function x(P,z,G){let I=G.wireframe===!0,N=a[P.id];N===void 0&&(N={},a[P.id]=N);let O=N[z.id];O===void 0&&(O={},N[z.id]=O);let W=O[I];return W===void 0&&(W=g(f()),O[I]=W),W}function g(P){let z=[],G=[],I=[];for(let N=0;N<i;N++)z[N]=0,G[N]=0,I[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:G,attributeDivisors:I,object:P,attributes:{},index:null}}function p(P,z,G,I){let N=l.attributes,O=z.attributes,W=0,k=G.getAttributes();for(let J in k)if(k[J].location>=0){let K=N[J],ie=O[J];if(ie===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(ie=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(ie=P.instanceColor)),K===void 0||K.attribute!==ie||ie&&K.data!==ie.data)return!0;W++}return l.attributesNum!==W||l.index!==I}function _(P,z,G,I){let N={},O=z.attributes,W=0,k=G.getAttributes();for(let J in k)if(k[J].location>=0){let K=O[J];K===void 0&&(J==="instanceMatrix"&&P.instanceMatrix&&(K=P.instanceMatrix),J==="instanceColor"&&P.instanceColor&&(K=P.instanceColor));let ie={};ie.attribute=K,K&&K.data&&(ie.data=K.data),N[J]=ie,W++}l.attributes=N,l.attributesNum=W,l.index=I}function v(){let P=l.newAttributes;for(let z=0,G=P.length;z<G;z++)P[z]=0}function M(P){C(P,0)}function C(P,z){let G=l.newAttributes,I=l.enabledAttributes,N=l.attributeDivisors;G[P]=1,I[P]===0&&(s.enableVertexAttribArray(P),I[P]=1),N[P]!==z&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,z),N[P]=z)}function b(){let P=l.newAttributes,z=l.enabledAttributes;for(let G=0,I=z.length;G<I;G++)z[G]!==P[G]&&(s.disableVertexAttribArray(G),z[G]=0)}function R(P,z,G,I,N,O,W){W===!0?s.vertexAttribIPointer(P,z,G,N,O):s.vertexAttribPointer(P,z,G,I,N,O)}function L(P,z,G,I){if(n.isWebGL2===!1&&(P.isInstancedMesh||I.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();let N=I.attributes,O=G.getAttributes(),W=z.defaultAttributeValues;for(let k in O){let J=O[k];if(J.location>=0){let U=N[k];if(U===void 0&&(k==="instanceMatrix"&&P.instanceMatrix&&(U=P.instanceMatrix),k==="instanceColor"&&P.instanceColor&&(U=P.instanceColor)),U!==void 0){let K=U.normalized,ie=U.itemSize,ue=t.get(U);if(ue===void 0)continue;let he=ue.buffer,we=ue.type,fe=ue.bytesPerElement,de=n.isWebGL2===!0&&(we===s.INT||we===s.UNSIGNED_INT||U.gpuType===Xf);if(U.isInterleavedBufferAttribute){let Se=U.data,B=Se.stride,ht=U.offset;if(Se.isInstancedInterleavedBuffer){for(let Ee=0;Ee<J.locationSize;Ee++)C(J.location+Ee,Se.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Se.meshPerAttribute*Se.count)}else for(let Ee=0;Ee<J.locationSize;Ee++)M(J.location+Ee);s.bindBuffer(s.ARRAY_BUFFER,he);for(let Ee=0;Ee<J.locationSize;Ee++)R(J.location+Ee,ie/J.locationSize,we,K,B*fe,(ht+ie/J.locationSize*Ee)*fe,de)}else{if(U.isInstancedBufferAttribute){for(let Se=0;Se<J.locationSize;Se++)C(J.location+Se,U.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=U.meshPerAttribute*U.count)}else for(let Se=0;Se<J.locationSize;Se++)M(J.location+Se);s.bindBuffer(s.ARRAY_BUFFER,he);for(let Se=0;Se<J.locationSize;Se++)R(J.location+Se,ie/J.locationSize,we,K,ie*fe,ie/J.locationSize*Se*fe,de)}}else if(W!==void 0){let K=W[k];if(K!==void 0)switch(K.length){case 2:s.vertexAttrib2fv(J.location,K);break;case 3:s.vertexAttrib3fv(J.location,K);break;case 4:s.vertexAttrib4fv(J.location,K);break;default:s.vertexAttrib1fv(J.location,K)}}}}b()}function y(){V();for(let P in a){let z=a[P];for(let G in z){let I=z[G];for(let N in I)m(I[N].object),delete I[N];delete z[G]}delete a[P]}}function E(P){if(a[P.id]===void 0)return;let z=a[P.id];for(let G in z){let I=z[G];for(let N in I)m(I[N].object),delete I[N];delete z[G]}delete a[P.id]}function F(P){for(let z in a){let G=a[z];if(G[P.id]===void 0)continue;let I=G[P.id];for(let N in I)m(I[N].object),delete I[N];delete G[P.id]}}function V(){$(),h=!0,l!==c&&(l=c,d(l.object))}function $(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:V,resetDefaultState:$,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfProgram:F,initAttributes:v,enableAttribute:M,disableUnusedAttributes:b}}function Cx(s,e,t,n){let i=n.isWebGL2,r;function o(h){r=h}function a(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,f){if(f===0)return;let d,m;if(i)d=s,m="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[m](r,h,u,f),t.update(u,r,f)}function l(h,u,f){if(f===0)return;let d=e.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<f;m++)this.render(h[m],u[m]);else{d.multiDrawArraysWEBGL(r,h,0,u,0,f);let m=0;for(let x=0;x<f;x++)m+=u[x];t.update(m,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function Px(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext",a=t.precision!==void 0?t.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),x=s.getParameter(s.MAX_VERTEX_ATTRIBS),g=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,M=o||e.has("OES_texture_float"),C=v&&M,b=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:d,maxCubemapSize:m,maxAttributes:x,maxVertexUniforms:g,maxVaryings:p,maxFragmentUniforms:_,vertexTextures:v,floatFragmentTextures:M,floatVertexTextures:C,maxSamples:b}}function Lx(s){let e=this,t=null,n=0,i=!1,r=!1,o=new Ai,a=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){let m=u.clippingPlanes,x=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||m===null||m.length===0||r&&!g)r?h(null):l();else{let _=r?0:n,v=_*4,M=p.clippingState||null;c.value=M,M=h(m,f,v,d);for(let C=0;C!==v;++C)M[C]=t[C];p.clippingState=M,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,m){let x=u!==null?u.length:0,g=null;if(x!==0){if(g=c.value,m!==!0||g===null){let p=d+x*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,M=d;v!==x;++v,M+=4)o.copy(u[v]).applyMatrix4(_,a),o.normal.toArray(g,M),g[M+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function Ix(s){let e=new WeakMap;function t(o,a){return a===qr?o.mapping=ir:a===nl&&(o.mapping=sr),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===qr||a===nl)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new ll(c.height/2);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var ji=class extends xa{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Qs=4,ef=[.125,.215,.35,.446,.526,.582],xs=20,kc=new ji,tf=new ge,Vc=null,Gc=0,Wc=0,ms=(1+Math.sqrt(5))/2,Zs=1/ms,nf=[new w(1,1,1),new w(-1,1,1),new w(1,1,-1),new w(-1,1,-1),new w(0,ms,Zs),new w(0,ms,-Zs),new w(Zs,0,ms),new w(-Zs,0,ms),new w(ms,Zs,0),new w(-ms,Zs,0)],hr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Vc=this._renderer.getRenderTarget(),Gc=this._renderer.getActiveCubeFace(),Wc=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=of(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Vc,Gc,Wc),e.scissorTest=!1,Ko(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ir||e.mapping===sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vc=this._renderer.getRenderTarget(),Gc=this._renderer.getActiveCubeFace(),Wc=this._renderer.getActiveMipmapLevel();let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bt,minFilter:bt,generateMipmaps:!1,type:In,format:vn,colorSpace:Lt,depthBuffer:!1},i=sf(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sf(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dx(r)),this._blurMaterial=Ux(r,e,t)}return i}_compileMaterial(e){let t=new Ce(this._lodPlanes[0],e);this._renderer.compile(t,kc)}_sceneToCubeUV(e,t,n,i){let a=new Gt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(tf),h.toneMapping=si,h.autoClear=!1;let d=new zt({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),m=new Ce(new xn,d),x=!1,g=e.background;g?g.isColor&&(d.color.copy(g),e.background=null,x=!0):(d.color.copy(tf),x=!0);for(let p=0;p<6;p++){let _=p%3;_===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):_===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));let v=this._cubeSize;Ko(i,_*v,p>2?v:0,v,v),h.setRenderTarget(i),x&&h.render(m,a),h.render(e,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===ir||e.mapping===sr;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=of()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rf());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new Ce(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Ko(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,kc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){let r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=nf[(i-1)%nf.length];this._blur(e,i-1,i,r,o)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Ce(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*xs-1),x=r/m,g=isFinite(r)?1+Math.floor(h*x):xs;g>xs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${xs}`);let p=[],_=0;for(let R=0;R<xs;++R){let L=R/x,y=Math.exp(-L*L/2);p.push(y),R===0?_+=y:R<g&&(_+=2*y)}for(let R=0;R<p.length;R++)p[R]=p[R]/_;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:v}=this;f.dTheta.value=m,f.mipInt.value=v-n;let M=this._sizeLods[i],C=3*M*(i>v-Qs?i-v+Qs:0),b=4*(this._cubeSize-M);Ko(t,C,b,3*M,2*M),c.setRenderTarget(t),c.render(u,kc)}};function Dx(s){let e=[],t=[],n=[],i=s,r=s-Qs+1+ef.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let c=1/a;o>s-Qs?c=ef[o-s+Qs-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,x=3,g=2,p=1,_=new Float32Array(x*m*d),v=new Float32Array(g*m*d),M=new Float32Array(p*m*d);for(let b=0;b<d;b++){let R=b%3*2/3-1,L=b>2?0:-1,y=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];_.set(y,x*m*b),v.set(f,g*m*b);let E=[b,b,b,b,b,b];M.set(E,p*m*b)}let C=new pt;C.setAttribute("position",new nt(_,x)),C.setAttribute("uv",new nt(v,g)),C.setAttribute("faceIndex",new nt(M,p)),e.push(C),i>Qs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function sf(s,e,t){let n=new Yn(s,e,t);return n.texture.mapping=Na,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ko(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Ux(s,e,t){let n=new Float32Array(xs),i=new w(0,1,0);return new nn({name:"SphericalGaussianBlur",defines:{n:xs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function rf(){return new nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function of(){return new nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ki,depthTest:!1,depthWrite:!1})}function Zl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Nx(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===qr||c===nl,h=c===ir||c===sr;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new hr(s)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{let u=a.image;if(l&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new hr(s));let f=l?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function i(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Fx(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){let i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Ox(s,e,t,n){let i={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&e.remove(f.index);for(let m in f.attributes)e.remove(f.attributes[m]);for(let m in f.morphAttributes){let x=f.morphAttributes[m];for(let g=0,p=x.length;g<p;g++)e.remove(x[g])}f.removeEventListener("dispose",o),delete i[f.id];let d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function c(u){let f=u.attributes;for(let m in f)e.update(f[m],s.ARRAY_BUFFER);let d=u.morphAttributes;for(let m in d){let x=d[m];for(let g=0,p=x.length;g<p;g++)e.update(x[g],s.ARRAY_BUFFER)}}function l(u){let f=[],d=u.index,m=u.attributes.position,x=0;if(d!==null){let _=d.array;x=d.version;for(let v=0,M=_.length;v<M;v+=3){let C=_[v+0],b=_[v+1],R=_[v+2];f.push(C,b,b,R,R,C)}}else if(m!==void 0){let _=m.array;x=m.version;for(let v=0,M=_.length/3-1;v<M;v+=3){let C=v+0,b=v+1,R=v+2;f.push(C,b,b,R,R,C)}}else return;let g=new(nd(f)?ga:ma)(f,1);g.version=x;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let f=r.get(u);if(f){let d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function zx(s,e,t,n){let i=n.isWebGL2,r;function o(d){r=d}let a,c;function l(d){a=d.type,c=d.bytesPerElement}function h(d,m){s.drawElements(r,m,a,d*c),t.update(m,r,1)}function u(d,m,x){if(x===0)return;let g,p;if(i)g=s,p="drawElementsInstanced";else if(g=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[p](r,m,a,d*c,x),t.update(m,r,x)}function f(d,m,x){if(x===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<x;p++)this.render(d[p]/c,m[p]);else{g.multiDrawElementsWEBGL(r,m,0,a,d,0,x);let p=0;for(let _=0;_<x;_++)p+=m[_];t.update(p,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function Bx(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Hx(s,e){return s[0]-e[0]}function kx(s,e){return Math.abs(e[1])-Math.abs(s[1])}function Vx(s,e,t){let n={},i=new Float32Array(8),r=new WeakMap,o=new ft,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){let f=l.morphTargetInfluences;if(e.isWebGL2===!0){let d=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,m=d!==void 0?d.length:0,x=r.get(h);if(x===void 0||x.count!==m){let P=function(){V.dispose(),r.delete(h),h.removeEventListener("dispose",P)};x!==void 0&&x.texture.dispose();let _=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,M=h.morphAttributes.color!==void 0,C=h.morphAttributes.position||[],b=h.morphAttributes.normal||[],R=h.morphAttributes.color||[],L=0;_===!0&&(L=1),v===!0&&(L=2),M===!0&&(L=3);let y=h.attributes.position.count*L,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let F=new Float32Array(y*E*4*m),V=new da(F,y,E,m);V.type=mn,V.needsUpdate=!0;let $=L*4;for(let z=0;z<m;z++){let G=C[z],I=b[z],N=R[z],O=y*E*4*z;for(let W=0;W<G.count;W++){let k=W*$;_===!0&&(o.fromBufferAttribute(G,W),F[O+k+0]=o.x,F[O+k+1]=o.y,F[O+k+2]=o.z,F[O+k+3]=0),v===!0&&(o.fromBufferAttribute(I,W),F[O+k+4]=o.x,F[O+k+5]=o.y,F[O+k+6]=o.z,F[O+k+7]=0),M===!0&&(o.fromBufferAttribute(N,W),F[O+k+8]=o.x,F[O+k+9]=o.y,F[O+k+10]=o.z,F[O+k+11]=N.itemSize===4?o.w:1)}}x={count:m,texture:V,size:new oe(y,E)},r.set(h,x),h.addEventListener("dispose",P)}let g=0;for(let _=0;_<f.length;_++)g+=f[_];let p=h.morphTargetsRelative?1:1-g;u.getUniforms().setValue(s,"morphTargetBaseInfluence",p),u.getUniforms().setValue(s,"morphTargetInfluences",f),u.getUniforms().setValue(s,"morphTargetsTexture",x.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}else{let d=f===void 0?0:f.length,m=n[h.id];if(m===void 0||m.length!==d){m=[];for(let v=0;v<d;v++)m[v]=[v,0];n[h.id]=m}for(let v=0;v<d;v++){let M=m[v];M[0]=v,M[1]=f[v]}m.sort(kx);for(let v=0;v<8;v++)v<d&&m[v][1]?(a[v][0]=m[v][0],a[v][1]=m[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(Hx);let x=h.morphAttributes.position,g=h.morphAttributes.normal,p=0;for(let v=0;v<8;v++){let M=a[v],C=M[0],b=M[1];C!==Number.MAX_SAFE_INTEGER&&b?(x&&h.getAttribute("morphTarget"+v)!==x[C]&&h.setAttribute("morphTarget"+v,x[C]),g&&h.getAttribute("morphNormal"+v)!==g[C]&&h.setAttribute("morphNormal"+v,g[C]),i[v]=b,p+=b):(x&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),g&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),i[v]=0)}let _=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(s,"morphTargetBaseInfluence",_),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function Gx(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return u}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}var ur=class extends tn{constructor(e,t,n,i,r,o,a,c,l,h){if(h=h!==void 0?h:_s,h!==_s&&h!==rr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===_s&&(n=ii),n===void 0&&h===rr&&(n=vs),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ut,this.minFilter=c!==void 0?c:Ut,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},od=new tn,ad=new ur(1,1);ad.compareFunction=td;var cd=new da,ld=new al,hd=new va,af=[],cf=[],lf=new Float32Array(16),hf=new Float32Array(9),uf=new Float32Array(4);function Mr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=af[i];if(r===void 0&&(r=new Float32Array(i),af[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Wt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Xt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function za(s,e){let t=cf[e];t===void 0&&(t=new Int32Array(e),cf[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Wx(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Xx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;s.uniform2fv(this.addr,e),Xt(t,e)}}function qx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;s.uniform3fv(this.addr,e),Xt(t,e)}}function Yx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;s.uniform4fv(this.addr,e),Xt(t,e)}}function Zx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;uf.set(n),s.uniformMatrix2fv(this.addr,!1,uf),Xt(t,n)}}function Kx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;hf.set(n),s.uniformMatrix3fv(this.addr,!1,hf),Xt(t,n)}}function Jx(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;lf.set(n),s.uniformMatrix4fv(this.addr,!1,lf),Xt(t,n)}}function $x(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function jx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;s.uniform2iv(this.addr,e),Xt(t,e)}}function Qx(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;s.uniform3iv(this.addr,e),Xt(t,e)}}function ev(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;s.uniform4iv(this.addr,e),Xt(t,e)}}function tv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function nv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;s.uniform2uiv(this.addr,e),Xt(t,e)}}function iv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;s.uniform3uiv(this.addr,e),Xt(t,e)}}function sv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;s.uniform4uiv(this.addr,e),Xt(t,e)}}function rv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r=this.type===s.SAMPLER_2D_SHADOW?ad:od;t.setTexture2D(e||r,i)}function ov(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||ld,i)}function av(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||hd,i)}function cv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||cd,i)}function lv(s){switch(s){case 5126:return Wx;case 35664:return Xx;case 35665:return qx;case 35666:return Yx;case 35674:return Zx;case 35675:return Kx;case 35676:return Jx;case 5124:case 35670:return $x;case 35667:case 35671:return jx;case 35668:case 35672:return Qx;case 35669:case 35673:return ev;case 5125:return tv;case 36294:return nv;case 36295:return iv;case 36296:return sv;case 35678:case 36198:case 36298:case 36306:case 35682:return rv;case 35679:case 36299:case 36307:return ov;case 35680:case 36300:case 36308:case 36293:return av;case 36289:case 36303:case 36311:case 36292:return cv}}function hv(s,e){s.uniform1fv(this.addr,e)}function uv(s,e){let t=Mr(e,this.size,2);s.uniform2fv(this.addr,t)}function fv(s,e){let t=Mr(e,this.size,3);s.uniform3fv(this.addr,t)}function dv(s,e){let t=Mr(e,this.size,4);s.uniform4fv(this.addr,t)}function pv(s,e){let t=Mr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function mv(s,e){let t=Mr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function gv(s,e){let t=Mr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function xv(s,e){s.uniform1iv(this.addr,e)}function vv(s,e){s.uniform2iv(this.addr,e)}function _v(s,e){s.uniform3iv(this.addr,e)}function yv(s,e){s.uniform4iv(this.addr,e)}function Mv(s,e){s.uniform1uiv(this.addr,e)}function Sv(s,e){s.uniform2uiv(this.addr,e)}function Ev(s,e){s.uniform3uiv(this.addr,e)}function bv(s,e){s.uniform4uiv(this.addr,e)}function Tv(s,e,t){let n=this.cache,i=e.length,r=za(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||od,r[o])}function wv(s,e,t){let n=this.cache,i=e.length,r=za(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||ld,r[o])}function Av(s,e,t){let n=this.cache,i=e.length,r=za(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||hd,r[o])}function Rv(s,e,t){let n=this.cache,i=e.length,r=za(t,i);Wt(n,r)||(s.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||cd,r[o])}function Cv(s){switch(s){case 5126:return hv;case 35664:return uv;case 35665:return fv;case 35666:return dv;case 35674:return pv;case 35675:return mv;case 35676:return gv;case 5124:case 35670:return xv;case 35667:case 35671:return vv;case 35668:case 35672:return _v;case 35669:case 35673:return yv;case 5125:return Mv;case 36294:return Sv;case 36295:return Ev;case 36296:return bv;case 35678:case 36198:case 36298:case 36306:case 35682:return Tv;case 35679:case 36299:case 36307:return wv;case 35680:case 36300:case 36308:case 36293:return Av;case 36289:case 36303:case 36311:case 36292:return Rv}}var hl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=lv(t.type)}},ul=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Cv(t.type)}},fl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},Xc=/(\w+)(\])?(\[|\.)?/g;function ff(s,e){s.seq.push(e),s.map[e.id]=e}function Pv(s,e,t){let n=s.name,i=n.length;for(Xc.lastIndex=0;;){let r=Xc.exec(n),o=Xc.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){ff(t,l===void 0?new hl(a,s,e):new ul(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new fl(a),ff(t,u)),t=u}}}var nr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);Pv(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function df(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var Lv=37297,Iv=0;function Dv(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Uv(s){let e=at.getPrimaries(at.workingColorSpace),t=at.getPrimaries(s),n;switch(e===t?n="":e===ca&&t===aa?n="LinearDisplayP3ToLinearSRGB":e===aa&&t===ca&&(n="LinearSRGBToLinearDisplayP3"),s){case Lt:case Oa:return[n,"LinearTransferOETF"];case _t:case ql:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function pf(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";let r=/ERROR: 0:(\d+)/.exec(i);if(r){let o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+Dv(s.getShaderSource(e),o)}else return i}function Nv(s,e){let t=Uv(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Fv(s,e){let t;switch(e){case Np:t="Linear";break;case Fp:t="Reinhard";break;case Op:t="OptimizedCineon";break;case zp:t="ACESFilmic";break;case Hp:t="AgX";break;case Bp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Ov(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(er).join(`
`)}function zv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(er).join(`
`)}function Bv(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Hv(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function er(s){return s!==""}function mf(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gf(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var kv=/^[ \t]*#include +<([\w\d./]+)>/gm;function dl(s){return s.replace(kv,Gv)}var Vv=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Gv(s,e){let t=Ge[e];if(t===void 0){let n=Vv.get(e);if(n!==void 0)t=Ge[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return dl(t)}var Wv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xf(s){return s.replace(Wv,Xv)}function Xv(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function vf(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function qv(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Vf?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===kl?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===wi&&(e="SHADOWMAP_TYPE_VSM"),e}function Yv(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ir:case sr:e="ENVMAP_TYPE_CUBE";break;case Na:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Zv(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case sr:e="ENVMAP_MODE_REFRACTION";break}return e}function Kv(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Gf:e="ENVMAP_BLENDING_MULTIPLY";break;case Dp:e="ENVMAP_BLENDING_MIX";break;case Up:e="ENVMAP_BLENDING_ADD";break}return e}function Jv(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function $v(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=qv(t),l=Yv(t),h=Zv(t),u=Kv(t),f=Jv(t),d=t.isWebGL2?"":Ov(t),m=zv(t),x=Bv(r),g=i.createProgram(),p,_,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(er).join(`
`),p.length>0&&(p+=`
`),_=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(er).join(`
`),_.length>0&&(_+=`
`)):(p=[vf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),_=[d,vf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==si?"#define TONE_MAPPING":"",t.toneMapping!==si?Ge.tonemapping_pars_fragment:"",t.toneMapping!==si?Fv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,Nv("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(er).join(`
`)),o=dl(o),o=mf(o,t),o=gf(o,t),a=dl(a),a=mf(a,t),a=gf(a,t),o=xf(o),a=xf(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[m,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,_=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Fu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let M=v+p+o,C=v+_+a,b=df(i,i.VERTEX_SHADER,M),R=df(i,i.FRAGMENT_SHADER,C);i.attachShader(g,b),i.attachShader(g,R),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function L(V){if(s.debug.checkShaderErrors){let $=i.getProgramInfoLog(g).trim(),P=i.getShaderInfoLog(b).trim(),z=i.getShaderInfoLog(R).trim(),G=!0,I=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(G=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,g,b,R);else{let N=pf(i,b,"vertex"),O=pf(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Program Info Log: `+$+`
`+N+`
`+O)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(P===""||z==="")&&(I=!1);I&&(V.diagnostics={runnable:G,programLog:$,vertexShader:{log:P,prefix:p},fragmentShader:{log:z,prefix:_}})}i.deleteShader(b),i.deleteShader(R),y=new nr(i,g),E=Hv(i,g)}let y;this.getUniforms=function(){return y===void 0&&L(this),y};let E;this.getAttributes=function(){return E===void 0&&L(this),E};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=i.getProgramParameter(g,Lv)),F},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Iv++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=R,this}var jv=0,pl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new ml(e),t.set(e,n)),n}},ml=class{constructor(e){this.id=jv++,this.code=e,this.usedTimes=0}};function Qv(s,e,t,n,i,r,o){let a=new pa,c=new pl,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,f=i.vertexTextures,d=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return y===0?"uv":`uv${y}`}function g(y,E,F,V,$){let P=V.fog,z=$.geometry,G=y.isMeshStandardMaterial?V.environment:null,I=(y.isMeshStandardMaterial?t:e).get(y.envMap||G),N=I&&I.mapping===Na?I.image.height:null,O=m[y.type];y.precision!==null&&(d=i.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));let W=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,k=W!==void 0?W.length:0,J=0;z.morphAttributes.position!==void 0&&(J=1),z.morphAttributes.normal!==void 0&&(J=2),z.morphAttributes.color!==void 0&&(J=3);let U,K,ie,ue;if(O){let hn=ti[O];U=hn.vertexShader,K=hn.fragmentShader}else U=y.vertexShader,K=y.fragmentShader,c.update(y),ie=c.getVertexShaderID(y),ue=c.getFragmentShaderID(y);let he=s.getRenderTarget(),we=$.isInstancedMesh===!0,fe=$.isBatchedMesh===!0,de=!!y.map,Se=!!y.matcap,B=!!I,ht=!!y.aoMap,Ee=!!y.lightMap,De=!!y.bumpMap,Me=!!y.normalMap,ot=!!y.displacementMap,ke=!!y.emissiveMap,A=!!y.metalnessMap,S=!!y.roughnessMap,q=y.anisotropy>0,se=y.clearcoat>0,ne=y.iridescence>0,re=y.sheen>0,Ae=y.transmission>0,xe=q&&!!y.anisotropyMap,be=se&&!!y.clearcoatMap,Ne=se&&!!y.clearcoatNormalMap,Ye=se&&!!y.clearcoatRoughnessMap,te=ne&&!!y.iridescenceMap,mt=ne&&!!y.iridescenceThicknessMap,Qe=re&&!!y.sheenColorMap,He=re&&!!y.sheenRoughnessMap,Le=!!y.specularMap,Te=!!y.specularColorMap,qe=!!y.specularIntensityMap,ut=Ae&&!!y.transmissionMap,It=Ae&&!!y.thicknessMap,Je=!!y.gradientMap,ae=!!y.alphaMap,D=y.alphaTest>0,pe=!!y.alphaHash,me=!!y.extensions,Fe=!!z.attributes.uv1,Ie=!!z.attributes.uv2,Mt=!!z.attributes.uv3,St=si;return y.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(St=s.toneMapping),{isWebGL2:h,shaderID:O,shaderType:y.type,shaderName:y.name,vertexShader:U,fragmentShader:K,defines:y.defines,customVertexShaderID:ie,customFragmentShaderID:ue,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:fe,instancing:we,instancingColor:we&&$.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:he===null?s.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Lt,map:de,matcap:Se,envMap:B,envMapMode:B&&I.mapping,envMapCubeUVHeight:N,aoMap:ht,lightMap:Ee,bumpMap:De,normalMap:Me,displacementMap:f&&ot,emissiveMap:ke,normalMapObjectSpace:Me&&y.normalMapType===tm,normalMapTangentSpace:Me&&y.normalMapType===ed,metalnessMap:A,roughnessMap:S,anisotropy:q,anisotropyMap:xe,clearcoat:se,clearcoatMap:be,clearcoatNormalMap:Ne,clearcoatRoughnessMap:Ye,iridescence:ne,iridescenceMap:te,iridescenceThicknessMap:mt,sheen:re,sheenColorMap:Qe,sheenRoughnessMap:He,specularMap:Le,specularColorMap:Te,specularIntensityMap:qe,transmission:Ae,transmissionMap:ut,thicknessMap:It,gradientMap:Je,opaque:y.transparent===!1&&y.blending===Ji,alphaMap:ae,alphaTest:D,alphaHash:pe,combine:y.combine,mapUv:de&&x(y.map.channel),aoMapUv:ht&&x(y.aoMap.channel),lightMapUv:Ee&&x(y.lightMap.channel),bumpMapUv:De&&x(y.bumpMap.channel),normalMapUv:Me&&x(y.normalMap.channel),displacementMapUv:ot&&x(y.displacementMap.channel),emissiveMapUv:ke&&x(y.emissiveMap.channel),metalnessMapUv:A&&x(y.metalnessMap.channel),roughnessMapUv:S&&x(y.roughnessMap.channel),anisotropyMapUv:xe&&x(y.anisotropyMap.channel),clearcoatMapUv:be&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:Ne&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ye&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:te&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:Qe&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:He&&x(y.sheenRoughnessMap.channel),specularMapUv:Le&&x(y.specularMap.channel),specularColorMapUv:Te&&x(y.specularColorMap.channel),specularIntensityMapUv:qe&&x(y.specularIntensityMap.channel),transmissionMapUv:ut&&x(y.transmissionMap.channel),thicknessMapUv:It&&x(y.thicknessMap.channel),alphaMapUv:ae&&x(y.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Me||q),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:Fe,vertexUv2s:Ie,vertexUv3s:Mt,pointsUvs:$.isPoints===!0&&!!z.attributes.uv&&(de||ae),fog:!!P,useFog:y.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:$.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:k,morphTextureStride:J,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&F.length>0,shadowMapType:s.shadowMap.type,toneMapping:St,useLegacyLights:s._useLegacyLights,decodeVideoTexture:de&&y.map.isVideoTexture===!0&&at.getTransfer(y.map.colorSpace)===wt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===en,flipSided:y.side===ln,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:me&&y.extensions.derivatives===!0,extensionFragDepth:me&&y.extensions.fragDepth===!0,extensionDrawBuffers:me&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:me&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:me&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){let E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(let F in y.defines)E.push(F),E.push(y.defines[F]);return y.isRawShaderMaterial===!1&&(_(E,y),v(E,y),E.push(s.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function _(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function v(y,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),y.push(a.mask)}function M(y){let E=m[y.type],F;if(E){let V=ti[E];F=Vm.clone(V.uniforms)}else F=y.uniforms;return F}function C(y,E){let F;for(let V=0,$=l.length;V<$;V++){let P=l[V];if(P.cacheKey===E){F=P,++F.usedTimes;break}}return F===void 0&&(F=new $v(s,E,y,r),l.push(F)),F}function b(y){if(--y.usedTimes===0){let E=l.indexOf(y);l[E]=l[l.length-1],l.pop(),y.destroy()}}function R(y){c.remove(y)}function L(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:M,acquireProgram:C,releaseProgram:b,releaseShaderCache:R,programs:l,dispose:L}}function e_(){let s=new WeakMap;function e(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function t(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function t_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function _f(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function yf(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,f,d,m,x,g){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:x,group:g},s[e]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=x,p.group=g),e++,p}function a(u,f,d,m,x,g){let p=o(u,f,d,m,x,g);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function c(u,f,d,m,x,g){let p=o(u,f,d,m,x,g);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function l(u,f){t.length>1&&t.sort(u||t_),n.length>1&&n.sort(f||_f),i.length>1&&i.sort(f||_f)}function h(){for(let u=e,f=s.length;u<f;u++){let d=s[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function n_(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new yf,s.set(n,[o])):i>=r.length?(o=new yf,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function i_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new w,color:new ge};break;case"SpotLight":t={position:new w,direction:new w,color:new ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new w,color:new ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new w,skyColor:new ge,groundColor:new ge};break;case"RectAreaLight":t={color:new ge,position:new w,halfWidth:new w,halfHeight:new w};break}return s[e.id]=t,t}}}function s_(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var r_=0;function o_(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function a_(s,e){let t=new i_,n=s_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new w);let r=new w,o=new Pe,a=new Pe;function c(h,u){let f=0,d=0,m=0;for(let V=0;V<9;V++)i.probe[V].set(0,0,0);let x=0,g=0,p=0,_=0,v=0,M=0,C=0,b=0,R=0,L=0,y=0;h.sort(o_);let E=u===!0?Math.PI:1;for(let V=0,$=h.length;V<$;V++){let P=h[V],z=P.color,G=P.intensity,I=P.distance,N=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)f+=z.r*G*E,d+=z.g*G*E,m+=z.b*G*E;else if(P.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(P.sh.coefficients[O],G);y++}else if(P.isDirectionalLight){let O=t.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity*E),P.castShadow){let W=P.shadow,k=n.get(P);k.shadowBias=W.bias,k.shadowNormalBias=W.normalBias,k.shadowRadius=W.radius,k.shadowMapSize=W.mapSize,i.directionalShadow[x]=k,i.directionalShadowMap[x]=N,i.directionalShadowMatrix[x]=P.shadow.matrix,M++}i.directional[x]=O,x++}else if(P.isSpotLight){let O=t.get(P);O.position.setFromMatrixPosition(P.matrixWorld),O.color.copy(z).multiplyScalar(G*E),O.distance=I,O.coneCos=Math.cos(P.angle),O.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),O.decay=P.decay,i.spot[p]=O;let W=P.shadow;if(P.map&&(i.spotLightMap[R]=P.map,R++,W.updateMatrices(P),P.castShadow&&L++),i.spotLightMatrix[p]=W.matrix,P.castShadow){let k=n.get(P);k.shadowBias=W.bias,k.shadowNormalBias=W.normalBias,k.shadowRadius=W.radius,k.shadowMapSize=W.mapSize,i.spotShadow[p]=k,i.spotShadowMap[p]=N,b++}p++}else if(P.isRectAreaLight){let O=t.get(P);O.color.copy(z).multiplyScalar(G),O.halfWidth.set(P.width*.5,0,0),O.halfHeight.set(0,P.height*.5,0),i.rectArea[_]=O,_++}else if(P.isPointLight){let O=t.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity*E),O.distance=P.distance,O.decay=P.decay,P.castShadow){let W=P.shadow,k=n.get(P);k.shadowBias=W.bias,k.shadowNormalBias=W.normalBias,k.shadowRadius=W.radius,k.shadowMapSize=W.mapSize,k.shadowCameraNear=W.camera.near,k.shadowCameraFar=W.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=N,i.pointShadowMatrix[g]=P.shadow.matrix,C++}i.point[g]=O,g++}else if(P.isHemisphereLight){let O=t.get(P);O.skyColor.copy(P.color).multiplyScalar(G*E),O.groundColor.copy(P.groundColor).multiplyScalar(G*E),i.hemi[v]=O,v++}}_>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=m;let F=i.hash;(F.directionalLength!==x||F.pointLength!==g||F.spotLength!==p||F.rectAreaLength!==_||F.hemiLength!==v||F.numDirectionalShadows!==M||F.numPointShadows!==C||F.numSpotShadows!==b||F.numSpotMaps!==R||F.numLightProbes!==y)&&(i.directional.length=x,i.spot.length=p,i.rectArea.length=_,i.point.length=g,i.hemi.length=v,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=b+R-L,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=y,F.directionalLength=x,F.pointLength=g,F.spotLength=p,F.rectAreaLength=_,F.hemiLength=v,F.numDirectionalShadows=M,F.numPointShadows=C,F.numSpotShadows=b,F.numSpotMaps=R,F.numLightProbes=y,i.version=r_++)}function l(h,u){let f=0,d=0,m=0,x=0,g=0,p=u.matrixWorldInverse;for(let _=0,v=h.length;_<v;_++){let M=h[_];if(M.isDirectionalLight){let C=i.directional[f];C.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(p),f++}else if(M.isSpotLight){let C=i.spot[m];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(p),C.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(p),m++}else if(M.isRectAreaLight){let C=i.rectArea[x];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(p),a.identity(),o.copy(M.matrixWorld),o.premultiply(p),a.extractRotation(o),C.halfWidth.set(M.width*.5,0,0),C.halfHeight.set(0,M.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),x++}else if(M.isPointLight){let C=i.point[d];C.position.setFromMatrixPosition(M.matrixWorld),C.position.applyMatrix4(p),d++}else if(M.isHemisphereLight){let C=i.hemi[g];C.direction.setFromMatrixPosition(M.matrixWorld),C.direction.transformDirection(p),g++}}}return{setup:c,setupView:l,state:i}}function Mf(s,e){let t=new a_(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function c_(s,e){let t=new WeakMap;function n(r,o=0){let a=t.get(r),c;return a===void 0?(c=new Mf(s,e),t.set(r,[c])):o>=a.length?(c=new Mf(s,e),a.push(c)):c=a[o],c}function i(){t=new WeakMap}return{get:n,dispose:i}}var gl=class extends wn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},xl=class extends wn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},l_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,h_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function u_(s,e,t){let n=new Kr,i=new oe,r=new oe,o=new ft,a=new gl({depthPacking:em}),c=new xl,l={},h=t.maxTextureSize,u={[Ln]:ln,[ln]:Ln,[en]:en},f=new nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:l_,fragmentShader:h_}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let m=new pt;m.setAttribute("position",new nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Ce(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vf;let p=this.type;this.render=function(b,R,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||b.length===0)return;let y=s.getRenderTarget(),E=s.getActiveCubeFace(),F=s.getActiveMipmapLevel(),V=s.state;V.setBlending(Ki),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let $=p!==wi&&this.type===wi,P=p===wi&&this.type!==wi;for(let z=0,G=b.length;z<G;z++){let I=b[z],N=I.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",I,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;i.copy(N.mapSize);let O=N.getFrameExtents();if(i.multiply(O),r.copy(N.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/O.x),i.x=r.x*O.x,N.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/O.y),i.y=r.y*O.y,N.mapSize.y=r.y)),N.map===null||$===!0||P===!0){let k=this.type!==wi?{minFilter:Ut,magFilter:Ut}:{};N.map!==null&&N.map.dispose(),N.map=new Yn(i.x,i.y,k),N.map.texture.name=I.name+".shadowMap",N.camera.updateProjectionMatrix()}s.setRenderTarget(N.map),s.clear();let W=N.getViewportCount();for(let k=0;k<W;k++){let J=N.getViewport(k);o.set(r.x*J.x,r.y*J.y,r.x*J.z,r.y*J.w),V.viewport(o),N.updateMatrices(I,k),n=N.getFrustum(),M(R,L,N.camera,I,this.type)}N.isPointLightShadow!==!0&&this.type===wi&&_(N,L),N.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(y,E,F)};function _(b,R){let L=e.update(x);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Yn(i.x,i.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,s.setRenderTarget(b.mapPass),s.clear(),s.renderBufferDirect(R,null,L,f,x,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,s.setRenderTarget(b.map),s.clear(),s.renderBufferDirect(R,null,L,d,x,null)}function v(b,R,L,y){let E=null,F=L.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(F!==void 0)E=F;else if(E=L.isPointLight===!0?c:a,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let V=E.uuid,$=R.uuid,P=l[V];P===void 0&&(P={},l[V]=P);let z=P[$];z===void 0&&(z=E.clone(),P[$]=z,R.addEventListener("dispose",C)),E=z}if(E.visible=R.visible,E.wireframe=R.wireframe,y===wi?E.side=R.shadowSide!==null?R.shadowSide:R.side:E.side=R.shadowSide!==null?R.shadowSide:u[R.side],E.alphaMap=R.alphaMap,E.alphaTest=R.alphaTest,E.map=R.map,E.clipShadows=R.clipShadows,E.clippingPlanes=R.clippingPlanes,E.clipIntersection=R.clipIntersection,E.displacementMap=R.displacementMap,E.displacementScale=R.displacementScale,E.displacementBias=R.displacementBias,E.wireframeLinewidth=R.wireframeLinewidth,E.linewidth=R.linewidth,L.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let V=s.properties.get(E);V.light=L}return E}function M(b,R,L,y,E){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&E===wi)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,b.matrixWorld);let $=e.update(b),P=b.material;if(Array.isArray(P)){let z=$.groups;for(let G=0,I=z.length;G<I;G++){let N=z[G],O=P[N.materialIndex];if(O&&O.visible){let W=v(b,O,y,E);b.onBeforeShadow(s,b,R,L,$,W,N),s.renderBufferDirect(L,null,$,W,b,N),b.onAfterShadow(s,b,R,L,$,W,N)}}}else if(P.visible){let z=v(b,P,y,E);b.onBeforeShadow(s,b,R,L,$,z,null),s.renderBufferDirect(L,null,$,z,b,null),b.onAfterShadow(s,b,R,L,$,z,null)}}let V=b.children;for(let $=0,P=V.length;$<P;$++)M(V[$],R,L,y,E)}function C(b){b.target.removeEventListener("dispose",C);for(let L in l){let y=l[L],E=b.target.uuid;E in y&&(y[E].dispose(),delete y[E])}}}function f_(s,e,t){let n=t.isWebGL2;function i(){let D=!1,pe=new ft,me=null,Fe=new ft(0,0,0,0);return{setMask:function(Ie){me!==Ie&&!D&&(s.colorMask(Ie,Ie,Ie,Ie),me=Ie)},setLocked:function(Ie){D=Ie},setClear:function(Ie,Mt,St,Kt,hn){hn===!0&&(Ie*=Kt,Mt*=Kt,St*=Kt),pe.set(Ie,Mt,St,Kt),Fe.equals(pe)===!1&&(s.clearColor(Ie,Mt,St,Kt),Fe.copy(pe))},reset:function(){D=!1,me=null,Fe.set(-1,0,0,0)}}}function r(){let D=!1,pe=null,me=null,Fe=null;return{setTest:function(Ie){Ie?fe(s.DEPTH_TEST):de(s.DEPTH_TEST)},setMask:function(Ie){pe!==Ie&&!D&&(s.depthMask(Ie),pe=Ie)},setFunc:function(Ie){if(me!==Ie){switch(Ie){case wp:s.depthFunc(s.NEVER);break;case Ap:s.depthFunc(s.ALWAYS);break;case Rp:s.depthFunc(s.LESS);break;case ia:s.depthFunc(s.LEQUAL);break;case Cp:s.depthFunc(s.EQUAL);break;case Pp:s.depthFunc(s.GEQUAL);break;case Lp:s.depthFunc(s.GREATER);break;case Ip:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}me=Ie}},setLocked:function(Ie){D=Ie},setClear:function(Ie){Fe!==Ie&&(s.clearDepth(Ie),Fe=Ie)},reset:function(){D=!1,pe=null,me=null,Fe=null}}}function o(){let D=!1,pe=null,me=null,Fe=null,Ie=null,Mt=null,St=null,Kt=null,hn=null;return{setTest:function(Et){D||(Et?fe(s.STENCIL_TEST):de(s.STENCIL_TEST))},setMask:function(Et){pe!==Et&&!D&&(s.stencilMask(Et),pe=Et)},setFunc:function(Et,un,ei){(me!==Et||Fe!==un||Ie!==ei)&&(s.stencilFunc(Et,un,ei),me=Et,Fe=un,Ie=ei)},setOp:function(Et,un,ei){(Mt!==Et||St!==un||Kt!==ei)&&(s.stencilOp(Et,un,ei),Mt=Et,St=un,Kt=ei)},setLocked:function(Et){D=Et},setClear:function(Et){hn!==Et&&(s.clearStencil(Et),hn=Et)},reset:function(){D=!1,pe=null,me=null,Fe=null,Ie=null,Mt=null,St=null,Kt=null,hn=null}}}let a=new i,c=new r,l=new o,h=new WeakMap,u=new WeakMap,f={},d={},m=new WeakMap,x=[],g=null,p=!1,_=null,v=null,M=null,C=null,b=null,R=null,L=null,y=new ge(0,0,0),E=0,F=!1,V=null,$=null,P=null,z=null,G=null,I=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,O=0,W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(W)[1]),N=O>=1):W.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),N=O>=2);let k=null,J={},U=s.getParameter(s.SCISSOR_BOX),K=s.getParameter(s.VIEWPORT),ie=new ft().fromArray(U),ue=new ft().fromArray(K);function he(D,pe,me,Fe){let Ie=new Uint8Array(4),Mt=s.createTexture();s.bindTexture(D,Mt),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let St=0;St<me;St++)n&&(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)?s.texImage3D(pe,0,s.RGBA,1,1,Fe,0,s.RGBA,s.UNSIGNED_BYTE,Ie):s.texImage2D(pe+St,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ie);return Mt}let we={};we[s.TEXTURE_2D]=he(s.TEXTURE_2D,s.TEXTURE_2D,1),we[s.TEXTURE_CUBE_MAP]=he(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(we[s.TEXTURE_2D_ARRAY]=he(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),we[s.TEXTURE_3D]=he(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),fe(s.DEPTH_TEST),c.setFunc(ia),ke(!1),A(su),fe(s.CULL_FACE),Me(Ki);function fe(D){f[D]!==!0&&(s.enable(D),f[D]=!0)}function de(D){f[D]!==!1&&(s.disable(D),f[D]=!1)}function Se(D,pe){return d[D]!==pe?(s.bindFramebuffer(D,pe),d[D]=pe,n&&(D===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=pe),D===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=pe)),!0):!1}function B(D,pe){let me=x,Fe=!1;if(D)if(me=m.get(pe),me===void 0&&(me=[],m.set(pe,me)),D.isWebGLMultipleRenderTargets){let Ie=D.texture;if(me.length!==Ie.length||me[0]!==s.COLOR_ATTACHMENT0){for(let Mt=0,St=Ie.length;Mt<St;Mt++)me[Mt]=s.COLOR_ATTACHMENT0+Mt;me.length=Ie.length,Fe=!0}}else me[0]!==s.COLOR_ATTACHMENT0&&(me[0]=s.COLOR_ATTACHMENT0,Fe=!0);else me[0]!==s.BACK&&(me[0]=s.BACK,Fe=!0);Fe&&(t.isWebGL2?s.drawBuffers(me):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(me))}function ht(D){return g!==D?(s.useProgram(D),g=D,!0):!1}let Ee={[gs]:s.FUNC_ADD,[up]:s.FUNC_SUBTRACT,[fp]:s.FUNC_REVERSE_SUBTRACT};if(n)Ee[au]=s.MIN,Ee[cu]=s.MAX;else{let D=e.get("EXT_blend_minmax");D!==null&&(Ee[au]=D.MIN_EXT,Ee[cu]=D.MAX_EXT)}let De={[dp]:s.ZERO,[pp]:s.ONE,[mp]:s.SRC_COLOR,[el]:s.SRC_ALPHA,[Mp]:s.SRC_ALPHA_SATURATE,[_p]:s.DST_COLOR,[xp]:s.DST_ALPHA,[gp]:s.ONE_MINUS_SRC_COLOR,[tl]:s.ONE_MINUS_SRC_ALPHA,[yp]:s.ONE_MINUS_DST_COLOR,[vp]:s.ONE_MINUS_DST_ALPHA,[Sp]:s.CONSTANT_COLOR,[Ep]:s.ONE_MINUS_CONSTANT_COLOR,[bp]:s.CONSTANT_ALPHA,[Tp]:s.ONE_MINUS_CONSTANT_ALPHA};function Me(D,pe,me,Fe,Ie,Mt,St,Kt,hn,Et){if(D===Ki){p===!0&&(de(s.BLEND),p=!1);return}if(p===!1&&(fe(s.BLEND),p=!0),D!==hp){if(D!==_||Et!==F){if((v!==gs||b!==gs)&&(s.blendEquation(s.FUNC_ADD),v=gs,b=gs),Et)switch(D){case Ji:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ri:s.blendFunc(s.ONE,s.ONE);break;case ru:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ou:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ji:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ri:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ru:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case ou:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}M=null,C=null,R=null,L=null,y.set(0,0,0),E=0,_=D,F=Et}return}Ie=Ie||pe,Mt=Mt||me,St=St||Fe,(pe!==v||Ie!==b)&&(s.blendEquationSeparate(Ee[pe],Ee[Ie]),v=pe,b=Ie),(me!==M||Fe!==C||Mt!==R||St!==L)&&(s.blendFuncSeparate(De[me],De[Fe],De[Mt],De[St]),M=me,C=Fe,R=Mt,L=St),(Kt.equals(y)===!1||hn!==E)&&(s.blendColor(Kt.r,Kt.g,Kt.b,hn),y.copy(Kt),E=hn),_=D,F=!1}function ot(D,pe){D.side===en?de(s.CULL_FACE):fe(s.CULL_FACE);let me=D.side===ln;pe&&(me=!me),ke(me),D.blending===Ji&&D.transparent===!1?Me(Ki):Me(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),c.setFunc(D.depthFunc),c.setTest(D.depthTest),c.setMask(D.depthWrite),a.setMask(D.colorWrite);let Fe=D.stencilWrite;l.setTest(Fe),Fe&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),q(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?fe(s.SAMPLE_ALPHA_TO_COVERAGE):de(s.SAMPLE_ALPHA_TO_COVERAGE)}function ke(D){V!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),V=D)}function A(D){D!==cp?(fe(s.CULL_FACE),D!==$&&(D===su?s.cullFace(s.BACK):D===lp?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):de(s.CULL_FACE),$=D}function S(D){D!==P&&(N&&s.lineWidth(D),P=D)}function q(D,pe,me){D?(fe(s.POLYGON_OFFSET_FILL),(z!==pe||G!==me)&&(s.polygonOffset(pe,me),z=pe,G=me)):de(s.POLYGON_OFFSET_FILL)}function se(D){D?fe(s.SCISSOR_TEST):de(s.SCISSOR_TEST)}function ne(D){D===void 0&&(D=s.TEXTURE0+I-1),k!==D&&(s.activeTexture(D),k=D)}function re(D,pe,me){me===void 0&&(k===null?me=s.TEXTURE0+I-1:me=k);let Fe=J[me];Fe===void 0&&(Fe={type:void 0,texture:void 0},J[me]=Fe),(Fe.type!==D||Fe.texture!==pe)&&(k!==me&&(s.activeTexture(me),k=me),s.bindTexture(D,pe||we[D]),Fe.type=D,Fe.texture=pe)}function Ae(){let D=J[k];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function xe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function be(){try{s.compressedTexImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ne(){try{s.texSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ye(){try{s.texSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function te(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function mt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Qe(){try{s.texStorage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function He(){try{s.texStorage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Le(){try{s.texImage2D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Te(){try{s.texImage3D.apply(s,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function qe(D){ie.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),ie.copy(D))}function ut(D){ue.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),ue.copy(D))}function It(D,pe){let me=u.get(pe);me===void 0&&(me=new WeakMap,u.set(pe,me));let Fe=me.get(D);Fe===void 0&&(Fe=s.getUniformBlockIndex(pe,D.name),me.set(D,Fe))}function Je(D,pe){let Fe=u.get(pe).get(D);h.get(pe)!==Fe&&(s.uniformBlockBinding(pe,Fe,D.__bindingPointIndex),h.set(pe,Fe))}function ae(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},k=null,J={},d={},m=new WeakMap,x=[],g=null,p=!1,_=null,v=null,M=null,C=null,b=null,R=null,L=null,y=new ge(0,0,0),E=0,F=!1,V=null,$=null,P=null,z=null,G=null,ie.set(0,0,s.canvas.width,s.canvas.height),ue.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:fe,disable:de,bindFramebuffer:Se,drawBuffers:B,useProgram:ht,setBlending:Me,setMaterial:ot,setFlipSided:ke,setCullFace:A,setLineWidth:S,setPolygonOffset:q,setScissorTest:se,activeTexture:ne,bindTexture:re,unbindTexture:Ae,compressedTexImage2D:xe,compressedTexImage3D:be,texImage2D:Le,texImage3D:Te,updateUBOMapping:It,uniformBlockBinding:Je,texStorage2D:Qe,texStorage3D:He,texSubImage2D:Ne,texSubImage3D:Ye,compressedTexSubImage2D:te,compressedTexSubImage3D:mt,scissor:qe,viewport:ut,reset:ae}}function d_(s,e,t,n,i,r,o){let a=i.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,f=new WeakMap,d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,S){return d?new OffscreenCanvas(A,S):Zr("canvas")}function x(A,S,q,se){let ne=1;if((A.width>se||A.height>se)&&(ne=se/Math.max(A.width,A.height)),ne<1||S===!0)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){let re=S?ha:Math.floor,Ae=re(ne*A.width),xe=re(ne*A.height);u===void 0&&(u=m(Ae,xe));let be=q?m(Ae,xe):u;return be.width=Ae,be.height=xe,be.getContext("2d").drawImage(A,0,0,Ae,xe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+Ae+"x"+xe+")."),be}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function g(A){return rl(A.width)&&rl(A.height)}function p(A){return a?!1:A.wrapS!==pn||A.wrapT!==pn||A.minFilter!==Ut&&A.minFilter!==bt}function _(A,S){return A.generateMipmaps&&S&&A.minFilter!==Ut&&A.minFilter!==bt}function v(A){s.generateMipmap(A)}function M(A,S,q,se,ne=!1){if(a===!1)return S;if(A!==null){if(s[A]!==void 0)return s[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let re=S;if(S===s.RED&&(q===s.FLOAT&&(re=s.R32F),q===s.HALF_FLOAT&&(re=s.R16F),q===s.UNSIGNED_BYTE&&(re=s.R8)),S===s.RED_INTEGER&&(q===s.UNSIGNED_BYTE&&(re=s.R8UI),q===s.UNSIGNED_SHORT&&(re=s.R16UI),q===s.UNSIGNED_INT&&(re=s.R32UI),q===s.BYTE&&(re=s.R8I),q===s.SHORT&&(re=s.R16I),q===s.INT&&(re=s.R32I)),S===s.RG&&(q===s.FLOAT&&(re=s.RG32F),q===s.HALF_FLOAT&&(re=s.RG16F),q===s.UNSIGNED_BYTE&&(re=s.RG8)),S===s.RGBA){let Ae=ne?oa:at.getTransfer(se);q===s.FLOAT&&(re=s.RGBA32F),q===s.HALF_FLOAT&&(re=s.RGBA16F),q===s.UNSIGNED_BYTE&&(re=Ae===wt?s.SRGB8_ALPHA8:s.RGBA8),q===s.UNSIGNED_SHORT_4_4_4_4&&(re=s.RGBA4),q===s.UNSIGNED_SHORT_5_5_5_1&&(re=s.RGB5_A1)}return(re===s.R16F||re===s.R32F||re===s.RG16F||re===s.RG32F||re===s.RGBA16F||re===s.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function C(A,S,q){return _(A,q)===!0||A.isFramebufferTexture&&A.minFilter!==Ut&&A.minFilter!==bt?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function b(A){return A===Ut||A===sa||A===Br?s.NEAREST:s.LINEAR}function R(A){let S=A.target;S.removeEventListener("dispose",R),y(S),S.isVideoTexture&&h.delete(S)}function L(A){let S=A.target;S.removeEventListener("dispose",L),F(S)}function y(A){let S=n.get(A);if(S.__webglInit===void 0)return;let q=A.source,se=f.get(q);if(se){let ne=se[S.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&E(A),Object.keys(se).length===0&&f.delete(q)}n.remove(A)}function E(A){let S=n.get(A);s.deleteTexture(S.__webglTexture);let q=A.source,se=f.get(q);delete se[S.__cacheKey],o.memory.textures--}function F(A){let S=A.texture,q=n.get(A),se=n.get(S);if(se.__webglTexture!==void 0&&(s.deleteTexture(se.__webglTexture),o.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(q.__webglFramebuffer[ne]))for(let re=0;re<q.__webglFramebuffer[ne].length;re++)s.deleteFramebuffer(q.__webglFramebuffer[ne][re]);else s.deleteFramebuffer(q.__webglFramebuffer[ne]);q.__webglDepthbuffer&&s.deleteRenderbuffer(q.__webglDepthbuffer[ne])}else{if(Array.isArray(q.__webglFramebuffer))for(let ne=0;ne<q.__webglFramebuffer.length;ne++)s.deleteFramebuffer(q.__webglFramebuffer[ne]);else s.deleteFramebuffer(q.__webglFramebuffer);if(q.__webglDepthbuffer&&s.deleteRenderbuffer(q.__webglDepthbuffer),q.__webglMultisampledFramebuffer&&s.deleteFramebuffer(q.__webglMultisampledFramebuffer),q.__webglColorRenderbuffer)for(let ne=0;ne<q.__webglColorRenderbuffer.length;ne++)q.__webglColorRenderbuffer[ne]&&s.deleteRenderbuffer(q.__webglColorRenderbuffer[ne]);q.__webglDepthRenderbuffer&&s.deleteRenderbuffer(q.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let ne=0,re=S.length;ne<re;ne++){let Ae=n.get(S[ne]);Ae.__webglTexture&&(s.deleteTexture(Ae.__webglTexture),o.memory.textures--),n.remove(S[ne])}n.remove(S),n.remove(A)}let V=0;function $(){V=0}function P(){let A=V;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),V+=1,A}function z(A){let S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function G(A,S){let q=n.get(A);if(A.isVideoTexture&&ot(A),A.isRenderTargetTexture===!1&&A.version>0&&q.__version!==A.version){let se=A.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ie(q,A,S);return}}t.bindTexture(s.TEXTURE_2D,q.__webglTexture,s.TEXTURE0+S)}function I(A,S){let q=n.get(A);if(A.version>0&&q.__version!==A.version){ie(q,A,S);return}t.bindTexture(s.TEXTURE_2D_ARRAY,q.__webglTexture,s.TEXTURE0+S)}function N(A,S){let q=n.get(A);if(A.version>0&&q.__version!==A.version){ie(q,A,S);return}t.bindTexture(s.TEXTURE_3D,q.__webglTexture,s.TEXTURE0+S)}function O(A,S){let q=n.get(A);if(A.version>0&&q.__version!==A.version){ue(q,A,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture,s.TEXTURE0+S)}let W={[Pi]:s.REPEAT,[pn]:s.CLAMP_TO_EDGE,[Yr]:s.MIRRORED_REPEAT},k={[Ut]:s.NEAREST,[sa]:s.NEAREST_MIPMAP_NEAREST,[Br]:s.NEAREST_MIPMAP_LINEAR,[bt]:s.LINEAR,[Vl]:s.LINEAR_MIPMAP_NEAREST,[qn]:s.LINEAR_MIPMAP_LINEAR},J={[nm]:s.NEVER,[cm]:s.ALWAYS,[im]:s.LESS,[td]:s.LEQUAL,[sm]:s.EQUAL,[am]:s.GEQUAL,[rm]:s.GREATER,[om]:s.NOTEQUAL};function U(A,S,q){if(q?(s.texParameteri(A,s.TEXTURE_WRAP_S,W[S.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,W[S.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,W[S.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,k[S.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,k[S.minFilter])):(s.texParameteri(A,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(A,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(S.wrapS!==pn||S.wrapT!==pn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(A,s.TEXTURE_MAG_FILTER,b(S.magFilter)),s.texParameteri(A,s.TEXTURE_MIN_FILTER,b(S.minFilter)),S.minFilter!==Ut&&S.minFilter!==bt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,J[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){let se=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===Ut||S.minFilter!==Br&&S.minFilter!==qn||S.type===mn&&e.has("OES_texture_float_linear")===!1||a===!1&&S.type===In&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(s.texParameterf(A,se.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function K(A,S){let q=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",R));let se=S.source,ne=f.get(se);ne===void 0&&(ne={},f.set(se,ne));let re=z(S);if(re!==A.__cacheKey){ne[re]===void 0&&(ne[re]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,q=!0),ne[re].usedTimes++;let Ae=ne[A.__cacheKey];Ae!==void 0&&(ne[A.__cacheKey].usedTimes--,Ae.usedTimes===0&&E(S)),A.__cacheKey=re,A.__webglTexture=ne[re].texture}return q}function ie(A,S,q){let se=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(se=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(se=s.TEXTURE_3D);let ne=K(A,S),re=S.source;t.bindTexture(se,A.__webglTexture,s.TEXTURE0+q);let Ae=n.get(re);if(re.version!==Ae.__version||ne===!0){t.activeTexture(s.TEXTURE0+q);let xe=at.getPrimaries(at.workingColorSpace),be=S.colorSpace===_n?null:at.getPrimaries(S.colorSpace),Ne=S.colorSpace===_n||xe===be?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let Ye=p(S)&&g(S.image)===!1,te=x(S.image,Ye,!1,i.maxTextureSize);te=ke(S,te);let mt=g(te)||a,Qe=r.convert(S.format,S.colorSpace),He=r.convert(S.type),Le=M(S.internalFormat,Qe,He,S.colorSpace,S.isVideoTexture);U(se,S,mt);let Te,qe=S.mipmaps,ut=a&&S.isVideoTexture!==!0&&Le!==$f,It=Ae.__version===void 0||ne===!0,Je=C(S,te,mt);if(S.isDepthTexture)Le=s.DEPTH_COMPONENT,a?S.type===mn?Le=s.DEPTH_COMPONENT32F:S.type===ii?Le=s.DEPTH_COMPONENT24:S.type===vs?Le=s.DEPTH24_STENCIL8:Le=s.DEPTH_COMPONENT16:S.type===mn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===_s&&Le===s.DEPTH_COMPONENT&&S.type!==Gl&&S.type!==ii&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=ii,He=r.convert(S.type)),S.format===rr&&Le===s.DEPTH_COMPONENT&&(Le=s.DEPTH_STENCIL,S.type!==vs&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=vs,He=r.convert(S.type))),It&&(ut?t.texStorage2D(s.TEXTURE_2D,1,Le,te.width,te.height):t.texImage2D(s.TEXTURE_2D,0,Le,te.width,te.height,0,Qe,He,null));else if(S.isDataTexture)if(qe.length>0&&mt){ut&&It&&t.texStorage2D(s.TEXTURE_2D,Je,Le,qe[0].width,qe[0].height);for(let ae=0,D=qe.length;ae<D;ae++)Te=qe[ae],ut?t.texSubImage2D(s.TEXTURE_2D,ae,0,0,Te.width,Te.height,Qe,He,Te.data):t.texImage2D(s.TEXTURE_2D,ae,Le,Te.width,Te.height,0,Qe,He,Te.data);S.generateMipmaps=!1}else ut?(It&&t.texStorage2D(s.TEXTURE_2D,Je,Le,te.width,te.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,te.width,te.height,Qe,He,te.data)):t.texImage2D(s.TEXTURE_2D,0,Le,te.width,te.height,0,Qe,He,te.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ut&&It&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Je,Le,qe[0].width,qe[0].height,te.depth);for(let ae=0,D=qe.length;ae<D;ae++)Te=qe[ae],S.format!==vn?Qe!==null?ut?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,0,Te.width,Te.height,te.depth,Qe,Te.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ae,Le,Te.width,Te.height,te.depth,0,Te.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ut?t.texSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,0,Te.width,Te.height,te.depth,Qe,He,Te.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ae,Le,Te.width,Te.height,te.depth,0,Qe,He,Te.data)}else{ut&&It&&t.texStorage2D(s.TEXTURE_2D,Je,Le,qe[0].width,qe[0].height);for(let ae=0,D=qe.length;ae<D;ae++)Te=qe[ae],S.format!==vn?Qe!==null?ut?t.compressedTexSubImage2D(s.TEXTURE_2D,ae,0,0,Te.width,Te.height,Qe,Te.data):t.compressedTexImage2D(s.TEXTURE_2D,ae,Le,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ut?t.texSubImage2D(s.TEXTURE_2D,ae,0,0,Te.width,Te.height,Qe,He,Te.data):t.texImage2D(s.TEXTURE_2D,ae,Le,Te.width,Te.height,0,Qe,He,Te.data)}else if(S.isDataArrayTexture)ut?(It&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Je,Le,te.width,te.height,te.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,Qe,He,te.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Le,te.width,te.height,te.depth,0,Qe,He,te.data);else if(S.isData3DTexture)ut?(It&&t.texStorage3D(s.TEXTURE_3D,Je,Le,te.width,te.height,te.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,Qe,He,te.data)):t.texImage3D(s.TEXTURE_3D,0,Le,te.width,te.height,te.depth,0,Qe,He,te.data);else if(S.isFramebufferTexture){if(It)if(ut)t.texStorage2D(s.TEXTURE_2D,Je,Le,te.width,te.height);else{let ae=te.width,D=te.height;for(let pe=0;pe<Je;pe++)t.texImage2D(s.TEXTURE_2D,pe,Le,ae,D,0,Qe,He,null),ae>>=1,D>>=1}}else if(qe.length>0&&mt){ut&&It&&t.texStorage2D(s.TEXTURE_2D,Je,Le,qe[0].width,qe[0].height);for(let ae=0,D=qe.length;ae<D;ae++)Te=qe[ae],ut?t.texSubImage2D(s.TEXTURE_2D,ae,0,0,Qe,He,Te):t.texImage2D(s.TEXTURE_2D,ae,Le,Qe,He,Te);S.generateMipmaps=!1}else ut?(It&&t.texStorage2D(s.TEXTURE_2D,Je,Le,te.width,te.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Qe,He,te)):t.texImage2D(s.TEXTURE_2D,0,Le,Qe,He,te);_(S,mt)&&v(se),Ae.__version=re.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function ue(A,S,q){if(S.image.length!==6)return;let se=K(A,S),ne=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+q);let re=n.get(ne);if(ne.version!==re.__version||se===!0){t.activeTexture(s.TEXTURE0+q);let Ae=at.getPrimaries(at.workingColorSpace),xe=S.colorSpace===_n?null:at.getPrimaries(S.colorSpace),be=S.colorSpace===_n||Ae===xe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);let Ne=S.isCompressedTexture||S.image[0].isCompressedTexture,Ye=S.image[0]&&S.image[0].isDataTexture,te=[];for(let ae=0;ae<6;ae++)!Ne&&!Ye?te[ae]=x(S.image[ae],!1,!0,i.maxCubemapSize):te[ae]=Ye?S.image[ae].image:S.image[ae],te[ae]=ke(S,te[ae]);let mt=te[0],Qe=g(mt)||a,He=r.convert(S.format,S.colorSpace),Le=r.convert(S.type),Te=M(S.internalFormat,He,Le,S.colorSpace),qe=a&&S.isVideoTexture!==!0,ut=re.__version===void 0||se===!0,It=C(S,mt,Qe);U(s.TEXTURE_CUBE_MAP,S,Qe);let Je;if(Ne){qe&&ut&&t.texStorage2D(s.TEXTURE_CUBE_MAP,It,Te,mt.width,mt.height);for(let ae=0;ae<6;ae++){Je=te[ae].mipmaps;for(let D=0;D<Je.length;D++){let pe=Je[D];S.format!==vn?He!==null?qe?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D,0,0,pe.width,pe.height,He,pe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D,Te,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):qe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D,0,0,pe.width,pe.height,He,Le,pe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D,Te,pe.width,pe.height,0,He,Le,pe.data)}}}else{Je=S.mipmaps,qe&&ut&&(Je.length>0&&It++,t.texStorage2D(s.TEXTURE_CUBE_MAP,It,Te,te[0].width,te[0].height));for(let ae=0;ae<6;ae++)if(Ye){qe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,te[ae].width,te[ae].height,He,Le,te[ae].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Te,te[ae].width,te[ae].height,0,He,Le,te[ae].data);for(let D=0;D<Je.length;D++){let me=Je[D].image[ae].image;qe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D+1,0,0,me.width,me.height,He,Le,me.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D+1,Te,me.width,me.height,0,He,Le,me.data)}}else{qe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,He,Le,te[ae]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Te,He,Le,te[ae]);for(let D=0;D<Je.length;D++){let pe=Je[D];qe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D+1,0,0,He,Le,pe.image[ae]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ae,D+1,Te,He,Le,pe.image[ae])}}}_(S,Qe)&&v(s.TEXTURE_CUBE_MAP),re.__version=ne.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function he(A,S,q,se,ne,re){let Ae=r.convert(q.format,q.colorSpace),xe=r.convert(q.type),be=M(q.internalFormat,Ae,xe,q.colorSpace);if(!n.get(S).__hasExternalTextures){let Ye=Math.max(1,S.width>>re),te=Math.max(1,S.height>>re);ne===s.TEXTURE_3D||ne===s.TEXTURE_2D_ARRAY?t.texImage3D(ne,re,be,Ye,te,S.depth,0,Ae,xe,null):t.texImage2D(ne,re,be,Ye,te,0,Ae,xe,null)}t.bindFramebuffer(s.FRAMEBUFFER,A),Me(S)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,se,ne,n.get(q).__webglTexture,0,De(S)):(ne===s.TEXTURE_2D||ne>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,se,ne,n.get(q).__webglTexture,re),t.bindFramebuffer(s.FRAMEBUFFER,null)}function we(A,S,q){if(s.bindRenderbuffer(s.RENDERBUFFER,A),S.depthBuffer&&!S.stencilBuffer){let se=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(q||Me(S)){let ne=S.depthTexture;ne&&ne.isDepthTexture&&(ne.type===mn?se=s.DEPTH_COMPONENT32F:ne.type===ii&&(se=s.DEPTH_COMPONENT24));let re=De(S);Me(S)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,re,se,S.width,S.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,re,se,S.width,S.height)}else s.renderbufferStorage(s.RENDERBUFFER,se,S.width,S.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,A)}else if(S.depthBuffer&&S.stencilBuffer){let se=De(S);q&&Me(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,se,s.DEPTH24_STENCIL8,S.width,S.height):Me(S)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,se,s.DEPTH24_STENCIL8,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,A)}else{let se=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let ne=0;ne<se.length;ne++){let re=se[ne],Ae=r.convert(re.format,re.colorSpace),xe=r.convert(re.type),be=M(re.internalFormat,Ae,xe,re.colorSpace),Ne=De(S);q&&Me(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ne,be,S.width,S.height):Me(S)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ne,be,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,be,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function fe(A,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),G(S.depthTexture,0);let se=n.get(S.depthTexture).__webglTexture,ne=De(S);if(S.depthTexture.format===_s)Me(S)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0,ne):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,se,0);else if(S.depthTexture.format===rr)Me(S)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0,ne):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function de(A){let S=n.get(A),q=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!S.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");fe(S.__webglFramebuffer,A)}else if(q){S.__webglDepthbuffer=[];for(let se=0;se<6;se++)t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[se]),S.__webglDepthbuffer[se]=s.createRenderbuffer(),we(S.__webglDepthbuffer[se],A,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=s.createRenderbuffer(),we(S.__webglDepthbuffer,A,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Se(A,S,q){let se=n.get(A);S!==void 0&&he(se.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),q!==void 0&&de(A)}function B(A){let S=A.texture,q=n.get(A),se=n.get(S);A.addEventListener("dispose",L),A.isWebGLMultipleRenderTargets!==!0&&(se.__webglTexture===void 0&&(se.__webglTexture=s.createTexture()),se.__version=S.version,o.memory.textures++);let ne=A.isWebGLCubeRenderTarget===!0,re=A.isWebGLMultipleRenderTargets===!0,Ae=g(A)||a;if(ne){q.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(a&&S.mipmaps&&S.mipmaps.length>0){q.__webglFramebuffer[xe]=[];for(let be=0;be<S.mipmaps.length;be++)q.__webglFramebuffer[xe][be]=s.createFramebuffer()}else q.__webglFramebuffer[xe]=s.createFramebuffer()}else{if(a&&S.mipmaps&&S.mipmaps.length>0){q.__webglFramebuffer=[];for(let xe=0;xe<S.mipmaps.length;xe++)q.__webglFramebuffer[xe]=s.createFramebuffer()}else q.__webglFramebuffer=s.createFramebuffer();if(re)if(i.drawBuffers){let xe=A.texture;for(let be=0,Ne=xe.length;be<Ne;be++){let Ye=n.get(xe[be]);Ye.__webglTexture===void 0&&(Ye.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&A.samples>0&&Me(A)===!1){let xe=re?S:[S];q.__webglMultisampledFramebuffer=s.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let be=0;be<xe.length;be++){let Ne=xe[be];q.__webglColorRenderbuffer[be]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,q.__webglColorRenderbuffer[be]);let Ye=r.convert(Ne.format,Ne.colorSpace),te=r.convert(Ne.type),mt=M(Ne.internalFormat,Ye,te,Ne.colorSpace,A.isXRRenderTarget===!0),Qe=De(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,Qe,mt,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.RENDERBUFFER,q.__webglColorRenderbuffer[be])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(q.__webglDepthRenderbuffer=s.createRenderbuffer(),we(q.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ne){t.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture),U(s.TEXTURE_CUBE_MAP,S,Ae);for(let xe=0;xe<6;xe++)if(a&&S.mipmaps&&S.mipmaps.length>0)for(let be=0;be<S.mipmaps.length;be++)he(q.__webglFramebuffer[xe][be],A,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,be);else he(q.__webglFramebuffer[xe],A,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);_(S,Ae)&&v(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){let xe=A.texture;for(let be=0,Ne=xe.length;be<Ne;be++){let Ye=xe[be],te=n.get(Ye);t.bindTexture(s.TEXTURE_2D,te.__webglTexture),U(s.TEXTURE_2D,Ye,Ae),he(q.__webglFramebuffer,A,Ye,s.COLOR_ATTACHMENT0+be,s.TEXTURE_2D,0),_(Ye,Ae)&&v(s.TEXTURE_2D)}t.unbindTexture()}else{let xe=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(a?xe=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(xe,se.__webglTexture),U(xe,S,Ae),a&&S.mipmaps&&S.mipmaps.length>0)for(let be=0;be<S.mipmaps.length;be++)he(q.__webglFramebuffer[be],A,S,s.COLOR_ATTACHMENT0,xe,be);else he(q.__webglFramebuffer,A,S,s.COLOR_ATTACHMENT0,xe,0);_(S,Ae)&&v(xe),t.unbindTexture()}A.depthBuffer&&de(A)}function ht(A){let S=g(A)||a,q=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let se=0,ne=q.length;se<ne;se++){let re=q[se];if(_(re,S)){let Ae=A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,xe=n.get(re).__webglTexture;t.bindTexture(Ae,xe),v(Ae),t.unbindTexture()}}}function Ee(A){if(a&&A.samples>0&&Me(A)===!1){let S=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],q=A.width,se=A.height,ne=s.COLOR_BUFFER_BIT,re=[],Ae=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xe=n.get(A),be=A.isWebGLMultipleRenderTargets===!0;if(be)for(let Ne=0;Ne<S.length;Ne++)t.bindFramebuffer(s.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,xe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,xe.__webglFramebuffer);for(let Ne=0;Ne<S.length;Ne++){re.push(s.COLOR_ATTACHMENT0+Ne),A.depthBuffer&&re.push(Ae);let Ye=xe.__ignoreDepthValues!==void 0?xe.__ignoreDepthValues:!1;if(Ye===!1&&(A.depthBuffer&&(ne|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&(ne|=s.STENCIL_BUFFER_BIT)),be&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,xe.__webglColorRenderbuffer[Ne]),Ye===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Ae]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Ae])),be){let te=n.get(S[Ne]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,te,0)}s.blitFramebuffer(0,0,q,se,0,0,q,se,ne,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,re)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),be)for(let Ne=0;Ne<S.length;Ne++){t.bindFramebuffer(s.FRAMEBUFFER,xe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.RENDERBUFFER,xe.__webglColorRenderbuffer[Ne]);let Ye=n.get(S[Ne]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,xe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ne,s.TEXTURE_2D,Ye,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,xe.__webglMultisampledFramebuffer)}}function De(A){return Math.min(i.maxSamples,A.samples)}function Me(A){let S=n.get(A);return a&&A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ot(A){let S=o.render.frame;h.get(A)!==S&&(h.set(A,S),A.update())}function ke(A,S){let q=A.colorSpace,se=A.format,ne=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===sl||q!==Lt&&q!==_n&&(at.getTransfer(q)===wt?a===!1?e.has("EXT_sRGB")===!0&&se===vn?(A.format=sl,A.minFilter=bt,A.generateMipmaps=!1):S=ua.sRGBToLinear(S):(se!==vn||ne!==bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),S}this.allocateTextureUnit=P,this.resetTextureUnits=$,this.setTexture2D=G,this.setTexture2DArray=I,this.setTexture3D=N,this.setTextureCube=O,this.rebindTextures=Se,this.setupRenderTarget=B,this.updateRenderTargetMipmap=ht,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=he,this.useMultisampledRTT=Me}function p_(s,e,t){let n=t.isWebGL2;function i(r,o=_n){let a,c=at.getTransfer(o);if(r===bn)return s.UNSIGNED_BYTE;if(r===qf)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Yf)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Vp)return s.BYTE;if(r===Gp)return s.SHORT;if(r===Gl)return s.UNSIGNED_SHORT;if(r===Xf)return s.INT;if(r===ii)return s.UNSIGNED_INT;if(r===mn)return s.FLOAT;if(r===In)return n?s.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Wp)return s.ALPHA;if(r===vn)return s.RGBA;if(r===Xp)return s.LUMINANCE;if(r===qp)return s.LUMINANCE_ALPHA;if(r===_s)return s.DEPTH_COMPONENT;if(r===rr)return s.DEPTH_STENCIL;if(r===sl)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Wl)return s.RED;if(r===Zf)return s.RED_INTEGER;if(r===Yp)return s.RG;if(r===Kf)return s.RG_INTEGER;if(r===Jf)return s.RGBA_INTEGER;if(r===vc||r===_c||r===yc||r===Mc)if(c===wt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===vc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===_c)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===yc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Mc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===vc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===_c)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===yc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Mc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===hu||r===uu||r===fu||r===du)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===hu)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===uu)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===fu)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===du)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===$f)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===pu||r===mu)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(r===pu)return c===wt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===mu)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===gu||r===xu||r===vu||r===_u||r===yu||r===Mu||r===Su||r===Eu||r===bu||r===Tu||r===wu||r===Au||r===Ru||r===Cu)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(r===gu)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===xu)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===vu)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===_u)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===yu)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Mu)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Su)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Eu)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===bu)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Tu)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===wu)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Au)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Ru)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Cu)return c===wt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Sc||r===Pu||r===Lu)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(r===Sc)return c===wt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Pu)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Lu)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Zp||r===Iu||r===Du||r===Uu)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(r===Sc)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Iu)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Du)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Uu)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===vs?n?s.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}var vl=class extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},At=class extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}},m_={type:"move"},Gr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new At,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new At,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new w,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new w),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new At,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new w,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new w),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),p=this._getHandJoint(l,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;l.inputState.pinching&&f>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(m_)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new At;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},_l=class extends Li{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,m=null,x=t.getContextAttributes(),g=null,p=null,_=[],v=[],M=new oe,C=null,b=new Gt;b.layers.enable(1),b.viewport=new ft;let R=new Gt;R.layers.enable(2),R.viewport=new ft;let L=[b,R],y=new vl;y.layers.enable(1),y.layers.enable(2);let E=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(U){let K=_[U];return K===void 0&&(K=new Gr,_[U]=K),K.getTargetRaySpace()},this.getControllerGrip=function(U){let K=_[U];return K===void 0&&(K=new Gr,_[U]=K),K.getGripSpace()},this.getHand=function(U){let K=_[U];return K===void 0&&(K=new Gr,_[U]=K),K.getHandSpace()};function V(U){let K=v.indexOf(U.inputSource);if(K===-1)return;let ie=_[K];ie!==void 0&&(ie.update(U.inputSource,U.frame,l||o),ie.dispatchEvent({type:U.type,data:U.inputSource}))}function $(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",$),i.removeEventListener("inputsourceschange",P);for(let U=0;U<_.length;U++){let K=v[U];K!==null&&(v[U]=null,_[U].disconnect(K))}E=null,F=null,e.setRenderTarget(g),d=null,f=null,u=null,i=null,p=null,J.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(U){r=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(U){a=U,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(U){l=U},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(U){if(i=U,i!==null){if(g=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",$),i.addEventListener("inputsourceschange",P),x.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(M),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){let K={antialias:i.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(i,t,K),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),p=new Yn(d.framebufferWidth,d.framebufferHeight,{format:vn,type:bn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let K=null,ie=null,ue=null;x.depth&&(ue=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=x.stencil?rr:_s,ie=x.stencil?vs:ii);let he={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:r};u=new XRWebGLBinding(i,t),f=u.createProjectionLayer(he),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),p=new Yn(f.textureWidth,f.textureHeight,{format:vn,type:bn,depthTexture:new ur(f.textureWidth,f.textureHeight,ie,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});let we=e.properties.get(p);we.__ignoreDepthValues=f.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),J.setContext(i),J.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function P(U){for(let K=0;K<U.removed.length;K++){let ie=U.removed[K],ue=v.indexOf(ie);ue>=0&&(v[ue]=null,_[ue].disconnect(ie))}for(let K=0;K<U.added.length;K++){let ie=U.added[K],ue=v.indexOf(ie);if(ue===-1){for(let we=0;we<_.length;we++)if(we>=v.length){v.push(ie),ue=we;break}else if(v[we]===null){v[we]=ie,ue=we;break}if(ue===-1)break}let he=_[ue];he&&he.connect(ie)}}let z=new w,G=new w;function I(U,K,ie){z.setFromMatrixPosition(K.matrixWorld),G.setFromMatrixPosition(ie.matrixWorld);let ue=z.distanceTo(G),he=K.projectionMatrix.elements,we=ie.projectionMatrix.elements,fe=he[14]/(he[10]-1),de=he[14]/(he[10]+1),Se=(he[9]+1)/he[5],B=(he[9]-1)/he[5],ht=(he[8]-1)/he[0],Ee=(we[8]+1)/we[0],De=fe*ht,Me=fe*Ee,ot=ue/(-ht+Ee),ke=ot*-ht;K.matrixWorld.decompose(U.position,U.quaternion,U.scale),U.translateX(ke),U.translateZ(ot),U.matrixWorld.compose(U.position,U.quaternion,U.scale),U.matrixWorldInverse.copy(U.matrixWorld).invert();let A=fe+ot,S=de+ot,q=De-ke,se=Me+(ue-ke),ne=Se*de/S*A,re=B*de/S*A;U.projectionMatrix.makePerspective(q,se,ne,re,A,S),U.projectionMatrixInverse.copy(U.projectionMatrix).invert()}function N(U,K){K===null?U.matrixWorld.copy(U.matrix):U.matrixWorld.multiplyMatrices(K.matrixWorld,U.matrix),U.matrixWorldInverse.copy(U.matrixWorld).invert()}this.updateCamera=function(U){if(i===null)return;y.near=R.near=b.near=U.near,y.far=R.far=b.far=U.far,(E!==y.near||F!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),E=y.near,F=y.far);let K=U.parent,ie=y.cameras;N(y,K);for(let ue=0;ue<ie.length;ue++)N(ie[ue],K);ie.length===2?I(y,b,R):y.projectionMatrix.copy(b.projectionMatrix),O(U,y,K)};function O(U,K,ie){ie===null?U.matrix.copy(K.matrixWorld):(U.matrix.copy(ie.matrixWorld),U.matrix.invert(),U.matrix.multiply(K.matrixWorld)),U.matrix.decompose(U.position,U.quaternion,U.scale),U.updateMatrixWorld(!0),U.projectionMatrix.copy(K.projectionMatrix),U.projectionMatrixInverse.copy(K.projectionMatrixInverse),U.isPerspectiveCamera&&(U.fov=ar*2*Math.atan(1/U.projectionMatrix.elements[5]),U.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(U){c=U,f!==null&&(f.fixedFoveation=U),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=U)};let W=null;function k(U,K){if(h=K.getViewerPose(l||o),m=K,h!==null){let ie=h.views;d!==null&&(e.setRenderTargetFramebuffer(p,d.framebuffer),e.setRenderTarget(p));let ue=!1;ie.length!==y.cameras.length&&(y.cameras.length=0,ue=!0);for(let he=0;he<ie.length;he++){let we=ie[he],fe=null;if(d!==null)fe=d.getViewport(we);else{let Se=u.getViewSubImage(f,we);fe=Se.viewport,he===0&&(e.setRenderTargetTextures(p,Se.colorTexture,f.ignoreDepthValues?void 0:Se.depthStencilTexture),e.setRenderTarget(p))}let de=L[he];de===void 0&&(de=new Gt,de.layers.enable(he),de.viewport=new ft,L[he]=de),de.matrix.fromArray(we.transform.matrix),de.matrix.decompose(de.position,de.quaternion,de.scale),de.projectionMatrix.fromArray(we.projectionMatrix),de.projectionMatrixInverse.copy(de.projectionMatrix).invert(),de.viewport.set(fe.x,fe.y,fe.width,fe.height),he===0&&(y.matrix.copy(de.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ue===!0&&y.cameras.push(de)}}for(let ie=0;ie<_.length;ie++){let ue=v[ie],he=_[ie];ue!==null&&he!==void 0&&he.update(ue,K,l||o)}W&&W(U,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),m=null}let J=new rd;J.setAnimationLoop(k),this.setAnimationLoop=function(U){W=U},this.dispose=function(){}}};function g_(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,sd(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,_,v,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,M)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,_,v):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===ln&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===ln&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let _=e.get(p).envMap;if(_&&(g.envMap.value=_,g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap){g.lightMap.value=p.lightMap;let v=s._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=p.lightMapIntensity*v,t(p.lightMap,g.lightMapTransform)}p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,_,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*_,g.scale.value=v*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),e.get(p).envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,_){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ln&&g.clearcoatNormalScale.value.negate())),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let _=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function x_(s,e,t,n){let i={},r={},o=[],a=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(_,v){let M=v.program;n.uniformBlockBinding(_,M)}function l(_,v){let M=i[_.id];M===void 0&&(m(_),M=h(_),i[_.id]=M,_.addEventListener("dispose",g));let C=v.program;n.updateUBOMapping(_,C);let b=e.render.frame;r[_.id]!==b&&(f(_),r[_.id]=b)}function h(_){let v=u();_.__bindingPointIndex=v;let M=s.createBuffer(),C=_.__size,b=_.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,C,b),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,M),M}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){let v=i[_.id],M=_.uniforms,C=_.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let b=0,R=M.length;b<R;b++){let L=Array.isArray(M[b])?M[b]:[M[b]];for(let y=0,E=L.length;y<E;y++){let F=L[y];if(d(F,b,y,C)===!0){let V=F.__offset,$=Array.isArray(F.value)?F.value:[F.value],P=0;for(let z=0;z<$.length;z++){let G=$[z],I=x(G);typeof G=="number"||typeof G=="boolean"?(F.__data[0]=G,s.bufferSubData(s.UNIFORM_BUFFER,V+P,F.__data)):G.isMatrix3?(F.__data[0]=G.elements[0],F.__data[1]=G.elements[1],F.__data[2]=G.elements[2],F.__data[3]=0,F.__data[4]=G.elements[3],F.__data[5]=G.elements[4],F.__data[6]=G.elements[5],F.__data[7]=0,F.__data[8]=G.elements[6],F.__data[9]=G.elements[7],F.__data[10]=G.elements[8],F.__data[11]=0):(G.toArray(F.__data,P),P+=I.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,V,F.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(_,v,M,C){let b=_.value,R=v+"_"+M;if(C[R]===void 0)return typeof b=="number"||typeof b=="boolean"?C[R]=b:C[R]=b.clone(),!0;{let L=C[R];if(typeof b=="number"||typeof b=="boolean"){if(L!==b)return C[R]=b,!0}else if(L.equals(b)===!1)return L.copy(b),!0}return!1}function m(_){let v=_.uniforms,M=0,C=16;for(let R=0,L=v.length;R<L;R++){let y=Array.isArray(v[R])?v[R]:[v[R]];for(let E=0,F=y.length;E<F;E++){let V=y[E],$=Array.isArray(V.value)?V.value:[V.value];for(let P=0,z=$.length;P<z;P++){let G=$[P],I=x(G),N=M%C;N!==0&&C-N<I.boundary&&(M+=C-N),V.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=M,M+=I.storage}}}let b=M%C;return b>0&&(M+=C-b),_.__size=M,_.__cache={},this}function x(_){let v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function g(_){let v=_.target;v.removeEventListener("dispose",g);let M=o.indexOf(v.__bindingPointIndex);o.splice(M,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function p(){for(let _ in i)s.deleteBuffer(i[_]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}var Jr=class{constructor(e={}){let{canvas:t=Em(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=o;let d=new Uint32Array(4),m=new Int32Array(4),x=null,g=null,p=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=_t,this._useLegacyLights=!1,this.toneMapping=si,this.toneMappingExposure=1;let v=this,M=!1,C=0,b=0,R=null,L=-1,y=null,E=new ft,F=new ft,V=null,$=new ge(0),P=0,z=t.width,G=t.height,I=1,N=null,O=null,W=new ft(0,0,z,G),k=new ft(0,0,z,G),J=!1,U=new Kr,K=!1,ie=!1,ue=null,he=new Pe,we=new oe,fe=new w,de={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Se(){return R===null?I:1}let B=n;function ht(T,H){for(let Y=0;Y<T.length;Y++){let Z=T[Y],X=t.getContext(Z,H);if(X!==null)return X}return null}try{let T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Hl}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",pe,!1),B===null){let H=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&H.shift(),B=ht(H,T),B===null)throw ht(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&B instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ee,De,Me,ot,ke,A,S,q,se,ne,re,Ae,xe,be,Ne,Ye,te,mt,Qe,He,Le,Te,qe,ut;function It(){Ee=new Fx(B),De=new Px(B,Ee,e),Ee.init(De),Te=new p_(B,Ee,De),Me=new f_(B,Ee,De),ot=new Bx(B),ke=new e_,A=new d_(B,Ee,Me,ke,De,Te,ot),S=new Ix(v),q=new Nx(v),se=new Ym(B,De),qe=new Rx(B,Ee,se,De),ne=new Ox(B,se,ot,qe),re=new Gx(B,ne,se,ot),Qe=new Vx(B,De,A),Ye=new Lx(ke),Ae=new Qv(v,S,q,Ee,De,qe,Ye),xe=new g_(v,ke),be=new n_,Ne=new c_(Ee,De),mt=new Ax(v,S,q,Me,re,f,c),te=new u_(v,re,De),ut=new x_(B,ot,De,Me),He=new Cx(B,Ee,ot,De),Le=new zx(B,Ee,ot,De),ot.programs=Ae.programs,v.capabilities=De,v.extensions=Ee,v.properties=ke,v.renderLists=be,v.shadowMap=te,v.state=Me,v.info=ot}It();let Je=new _l(v,B);this.xr=Je,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let T=Ee.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=Ee.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(T){T!==void 0&&(I=T,this.setSize(z,G,!1))},this.getSize=function(T){return T.set(z,G)},this.setSize=function(T,H,Y=!0){if(Je.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=T,G=H,t.width=Math.floor(T*I),t.height=Math.floor(H*I),Y===!0&&(t.style.width=T+"px",t.style.height=H+"px"),this.setViewport(0,0,T,H)},this.getDrawingBufferSize=function(T){return T.set(z*I,G*I).floor()},this.setDrawingBufferSize=function(T,H,Y){z=T,G=H,I=Y,t.width=Math.floor(T*Y),t.height=Math.floor(H*Y),this.setViewport(0,0,T,H)},this.getCurrentViewport=function(T){return T.copy(E)},this.getViewport=function(T){return T.copy(W)},this.setViewport=function(T,H,Y,Z){T.isVector4?W.set(T.x,T.y,T.z,T.w):W.set(T,H,Y,Z),Me.viewport(E.copy(W).multiplyScalar(I).floor())},this.getScissor=function(T){return T.copy(k)},this.setScissor=function(T,H,Y,Z){T.isVector4?k.set(T.x,T.y,T.z,T.w):k.set(T,H,Y,Z),Me.scissor(F.copy(k).multiplyScalar(I).floor())},this.getScissorTest=function(){return J},this.setScissorTest=function(T){Me.setScissorTest(J=T)},this.setOpaqueSort=function(T){N=T},this.setTransparentSort=function(T){O=T},this.getClearColor=function(T){return T.copy(mt.getClearColor())},this.setClearColor=function(){mt.setClearColor.apply(mt,arguments)},this.getClearAlpha=function(){return mt.getClearAlpha()},this.setClearAlpha=function(){mt.setClearAlpha.apply(mt,arguments)},this.clear=function(T=!0,H=!0,Y=!0){let Z=0;if(T){let X=!1;if(R!==null){let ye=R.texture.format;X=ye===Jf||ye===Kf||ye===Zf}if(X){let ye=R.texture.type,Re=ye===bn||ye===ii||ye===Gl||ye===vs||ye===qf||ye===Yf,Ue=mt.getClearColor(),Oe=mt.getClearAlpha(),Ze=Ue.r,Ve=Ue.g,Xe=Ue.b;Re?(d[0]=Ze,d[1]=Ve,d[2]=Xe,d[3]=Oe,B.clearBufferuiv(B.COLOR,0,d)):(m[0]=Ze,m[1]=Ve,m[2]=Xe,m[3]=Oe,B.clearBufferiv(B.COLOR,0,m))}else Z|=B.COLOR_BUFFER_BIT}H&&(Z|=B.DEPTH_BUFFER_BIT),Y&&(Z|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",pe,!1),be.dispose(),Ne.dispose(),ke.dispose(),S.dispose(),q.dispose(),re.dispose(),qe.dispose(),ut.dispose(),Ae.dispose(),Je.dispose(),Je.removeEventListener("sessionstart",hn),Je.removeEventListener("sessionend",Et),ue&&(ue.dispose(),ue=null),un.stop()};function ae(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let T=ot.autoReset,H=te.enabled,Y=te.autoUpdate,Z=te.needsUpdate,X=te.type;It(),ot.autoReset=T,te.enabled=H,te.autoUpdate=Y,te.needsUpdate=Z,te.type=X}function pe(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function me(T){let H=T.target;H.removeEventListener("dispose",me),Fe(H)}function Fe(T){Ie(T),ke.remove(T)}function Ie(T){let H=ke.get(T).programs;H!==void 0&&(H.forEach(function(Y){Ae.releaseProgram(Y)}),T.isShaderMaterial&&Ae.releaseShaderCache(T))}this.renderBufferDirect=function(T,H,Y,Z,X,ye){H===null&&(H=de);let Re=X.isMesh&&X.matrixWorld.determinant()<0,Ue=sp(T,H,Y,Z,X);Me.setMaterial(Z,Re);let Oe=Y.index,Ze=1;if(Z.wireframe===!0){if(Oe=ne.getWireframeAttribute(Y),Oe===void 0)return;Ze=2}let Ve=Y.drawRange,Xe=Y.attributes.position,Ot=Ve.start*Ze,Mn=(Ve.start+Ve.count)*Ze;ye!==null&&(Ot=Math.max(Ot,ye.start*Ze),Mn=Math.min(Mn,(ye.start+ye.count)*Ze)),Oe!==null?(Ot=Math.max(Ot,0),Mn=Math.min(Mn,Oe.count)):Xe!=null&&(Ot=Math.max(Ot,0),Mn=Math.min(Mn,Xe.count));let Jt=Mn-Ot;if(Jt<0||Jt===1/0)return;qe.setup(X,Z,Ue,Y,Oe);let _i,Ct=He;if(Oe!==null&&(_i=se.get(Oe),Ct=Le,Ct.setIndex(_i)),X.isMesh)Z.wireframe===!0?(Me.setLineWidth(Z.wireframeLinewidth*Se()),Ct.setMode(B.LINES)):Ct.setMode(B.TRIANGLES);else if(X.isLine){let $e=Z.linewidth;$e===void 0&&($e=1),Me.setLineWidth($e*Se()),X.isLineSegments?Ct.setMode(B.LINES):X.isLineLoop?Ct.setMode(B.LINE_LOOP):Ct.setMode(B.LINE_STRIP)}else X.isPoints?Ct.setMode(B.POINTS):X.isSprite&&Ct.setMode(B.TRIANGLES);if(X.isBatchedMesh)Ct.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else if(X.isInstancedMesh)Ct.renderInstances(Ot,Jt,X.count);else if(Y.isInstancedBufferGeometry){let $e=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,pc=Math.min(Y.instanceCount,$e);Ct.renderInstances(Ot,Jt,pc)}else Ct.render(Ot,Jt)};function Mt(T,H,Y){T.transparent===!0&&T.side===en&&T.forceSinglePass===!1?(T.side=ln,T.needsUpdate=!0,Ao(T,H,Y),T.side=Ln,T.needsUpdate=!0,Ao(T,H,Y),T.side=en):Ao(T,H,Y)}this.compile=function(T,H,Y=null){Y===null&&(Y=T),g=Ne.get(Y),g.init(),_.push(g),Y.traverseVisible(function(X){X.isLight&&X.layers.test(H.layers)&&(g.pushLight(X),X.castShadow&&g.pushShadow(X))}),T!==Y&&T.traverseVisible(function(X){X.isLight&&X.layers.test(H.layers)&&(g.pushLight(X),X.castShadow&&g.pushShadow(X))}),g.setupLights(v._useLegacyLights);let Z=new Set;return T.traverse(function(X){let ye=X.material;if(ye)if(Array.isArray(ye))for(let Re=0;Re<ye.length;Re++){let Ue=ye[Re];Mt(Ue,Y,X),Z.add(Ue)}else Mt(ye,Y,X),Z.add(ye)}),_.pop(),g=null,Z},this.compileAsync=function(T,H,Y=null){let Z=this.compile(T,H,Y);return new Promise(X=>{function ye(){if(Z.forEach(function(Re){ke.get(Re).currentProgram.isReady()&&Z.delete(Re)}),Z.size===0){X(T);return}setTimeout(ye,10)}Ee.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let St=null;function Kt(T){St&&St(T)}function hn(){un.stop()}function Et(){un.start()}let un=new rd;un.setAnimationLoop(Kt),typeof self<"u"&&un.setContext(self),this.setAnimationLoop=function(T){St=T,Je.setAnimationLoop(T),T===null?un.stop():un.start()},Je.addEventListener("sessionstart",hn),Je.addEventListener("sessionend",Et),this.render=function(T,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Je.enabled===!0&&Je.isPresenting===!0&&(Je.cameraAutoUpdate===!0&&Je.updateCamera(H),H=Je.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,H,R),g=Ne.get(T,_.length),g.init(),_.push(g),he.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),U.setFromProjectionMatrix(he),ie=this.localClippingEnabled,K=Ye.init(this.clippingPlanes,ie),x=be.get(T,p.length),x.init(),p.push(x),ei(T,H,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(N,O),this.info.render.frame++,K===!0&&Ye.beginShadows();let Y=g.state.shadowsArray;if(te.render(Y,T,H),K===!0&&Ye.endShadows(),this.info.autoReset===!0&&this.info.reset(),mt.render(x,T),g.setupLights(v._useLegacyLights),H.isArrayCamera){let Z=H.cameras;for(let X=0,ye=Z.length;X<ye;X++){let Re=Z[X];jh(x,T,Re,Re.viewport)}}else jh(x,T,H);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(v,T,H),qe.resetDefaultState(),L=-1,y=null,_.pop(),_.length>0?g=_[_.length-1]:g=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function ei(T,H,Y,Z){if(T.visible===!1)return;if(T.layers.test(H.layers)){if(T.isGroup)Y=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(H);else if(T.isLight)g.pushLight(T),T.castShadow&&g.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||U.intersectsSprite(T)){Z&&fe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(he);let Re=re.update(T),Ue=T.material;Ue.visible&&x.push(T,Re,Ue,Y,fe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||U.intersectsObject(T))){let Re=re.update(T),Ue=T.material;if(Z&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),fe.copy(T.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),fe.copy(Re.boundingSphere.center)),fe.applyMatrix4(T.matrixWorld).applyMatrix4(he)),Array.isArray(Ue)){let Oe=Re.groups;for(let Ze=0,Ve=Oe.length;Ze<Ve;Ze++){let Xe=Oe[Ze],Ot=Ue[Xe.materialIndex];Ot&&Ot.visible&&x.push(T,Re,Ot,Y,fe.z,Xe)}}else Ue.visible&&x.push(T,Re,Ue,Y,fe.z,null)}}let ye=T.children;for(let Re=0,Ue=ye.length;Re<Ue;Re++)ei(ye[Re],H,Y,Z)}function jh(T,H,Y,Z){let X=T.opaque,ye=T.transmissive,Re=T.transparent;g.setupLightsView(Y),K===!0&&Ye.setGlobalState(v.clippingPlanes,Y),ye.length>0&&ip(X,ye,H,Y),Z&&Me.viewport(E.copy(Z)),X.length>0&&wo(X,H,Y),ye.length>0&&wo(ye,H,Y),Re.length>0&&wo(Re,H,Y),Me.buffers.depth.setTest(!0),Me.buffers.depth.setMask(!0),Me.buffers.color.setMask(!0),Me.setPolygonOffset(!1)}function ip(T,H,Y,Z){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;let ye=De.isWebGL2;ue===null&&(ue=new Yn(1,1,{generateMipmaps:!0,type:Ee.has("EXT_color_buffer_half_float")?In:bn,minFilter:qn,samples:ye?4:0})),v.getDrawingBufferSize(we),ye?ue.setSize(we.x,we.y):ue.setSize(ha(we.x),ha(we.y));let Re=v.getRenderTarget();v.setRenderTarget(ue),v.getClearColor($),P=v.getClearAlpha(),P<1&&v.setClearColor(16777215,.5),v.clear();let Ue=v.toneMapping;v.toneMapping=si,wo(T,Y,Z),A.updateMultisampleRenderTarget(ue),A.updateRenderTargetMipmap(ue);let Oe=!1;for(let Ze=0,Ve=H.length;Ze<Ve;Ze++){let Xe=H[Ze],Ot=Xe.object,Mn=Xe.geometry,Jt=Xe.material,_i=Xe.group;if(Jt.side===en&&Ot.layers.test(Z.layers)){let Ct=Jt.side;Jt.side=ln,Jt.needsUpdate=!0,Qh(Ot,Y,Z,Mn,Jt,_i),Jt.side=Ct,Jt.needsUpdate=!0,Oe=!0}}Oe===!0&&(A.updateMultisampleRenderTarget(ue),A.updateRenderTargetMipmap(ue)),v.setRenderTarget(Re),v.setClearColor($,P),v.toneMapping=Ue}function wo(T,H,Y){let Z=H.isScene===!0?H.overrideMaterial:null;for(let X=0,ye=T.length;X<ye;X++){let Re=T[X],Ue=Re.object,Oe=Re.geometry,Ze=Z===null?Re.material:Z,Ve=Re.group;Ue.layers.test(Y.layers)&&Qh(Ue,H,Y,Oe,Ze,Ve)}}function Qh(T,H,Y,Z,X,ye){T.onBeforeRender(v,H,Y,Z,X,ye),T.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),X.onBeforeRender(v,H,Y,Z,T,ye),X.transparent===!0&&X.side===en&&X.forceSinglePass===!1?(X.side=ln,X.needsUpdate=!0,v.renderBufferDirect(Y,H,Z,X,T,ye),X.side=Ln,X.needsUpdate=!0,v.renderBufferDirect(Y,H,Z,X,T,ye),X.side=en):v.renderBufferDirect(Y,H,Z,X,T,ye),T.onAfterRender(v,H,Y,Z,X,ye)}function Ao(T,H,Y){H.isScene!==!0&&(H=de);let Z=ke.get(T),X=g.state.lights,ye=g.state.shadowsArray,Re=X.state.version,Ue=Ae.getParameters(T,X.state,ye,H,Y),Oe=Ae.getProgramCacheKey(Ue),Ze=Z.programs;Z.environment=T.isMeshStandardMaterial?H.environment:null,Z.fog=H.fog,Z.envMap=(T.isMeshStandardMaterial?q:S).get(T.envMap||Z.environment),Ze===void 0&&(T.addEventListener("dispose",me),Ze=new Map,Z.programs=Ze);let Ve=Ze.get(Oe);if(Ve!==void 0){if(Z.currentProgram===Ve&&Z.lightsStateVersion===Re)return tu(T,Ue),Ve}else Ue.uniforms=Ae.getUniforms(T),T.onBuild(Y,Ue,v),T.onBeforeCompile(Ue,v),Ve=Ae.acquireProgram(Ue,Oe),Ze.set(Oe,Ve),Z.uniforms=Ue.uniforms;let Xe=Z.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Xe.clippingPlanes=Ye.uniform),tu(T,Ue),Z.needsLights=op(T),Z.lightsStateVersion=Re,Z.needsLights&&(Xe.ambientLightColor.value=X.state.ambient,Xe.lightProbe.value=X.state.probe,Xe.directionalLights.value=X.state.directional,Xe.directionalLightShadows.value=X.state.directionalShadow,Xe.spotLights.value=X.state.spot,Xe.spotLightShadows.value=X.state.spotShadow,Xe.rectAreaLights.value=X.state.rectArea,Xe.ltc_1.value=X.state.rectAreaLTC1,Xe.ltc_2.value=X.state.rectAreaLTC2,Xe.pointLights.value=X.state.point,Xe.pointLightShadows.value=X.state.pointShadow,Xe.hemisphereLights.value=X.state.hemi,Xe.directionalShadowMap.value=X.state.directionalShadowMap,Xe.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Xe.spotShadowMap.value=X.state.spotShadowMap,Xe.spotLightMatrix.value=X.state.spotLightMatrix,Xe.spotLightMap.value=X.state.spotLightMap,Xe.pointShadowMap.value=X.state.pointShadowMap,Xe.pointShadowMatrix.value=X.state.pointShadowMatrix),Z.currentProgram=Ve,Z.uniformsList=null,Ve}function eu(T){if(T.uniformsList===null){let H=T.currentProgram.getUniforms();T.uniformsList=nr.seqWithValue(H.seq,T.uniforms)}return T.uniformsList}function tu(T,H){let Y=ke.get(T);Y.outputColorSpace=H.outputColorSpace,Y.batching=H.batching,Y.instancing=H.instancing,Y.instancingColor=H.instancingColor,Y.skinning=H.skinning,Y.morphTargets=H.morphTargets,Y.morphNormals=H.morphNormals,Y.morphColors=H.morphColors,Y.morphTargetsCount=H.morphTargetsCount,Y.numClippingPlanes=H.numClippingPlanes,Y.numIntersection=H.numClipIntersection,Y.vertexAlphas=H.vertexAlphas,Y.vertexTangents=H.vertexTangents,Y.toneMapping=H.toneMapping}function sp(T,H,Y,Z,X){H.isScene!==!0&&(H=de),A.resetTextureUnits();let ye=H.fog,Re=Z.isMeshStandardMaterial?H.environment:null,Ue=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Lt,Oe=(Z.isMeshStandardMaterial?q:S).get(Z.envMap||Re),Ze=Z.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ve=!!Y.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Xe=!!Y.morphAttributes.position,Ot=!!Y.morphAttributes.normal,Mn=!!Y.morphAttributes.color,Jt=si;Z.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Jt=v.toneMapping);let _i=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Ct=_i!==void 0?_i.length:0,$e=ke.get(Z),pc=g.state.lights;if(K===!0&&(ie===!0||T!==y)){let Cn=T===y&&Z.id===L;Ye.setState(Z,T,Cn)}let Dt=!1;Z.version===$e.__version?($e.needsLights&&$e.lightsStateVersion!==pc.state.version||$e.outputColorSpace!==Ue||X.isBatchedMesh&&$e.batching===!1||!X.isBatchedMesh&&$e.batching===!0||X.isInstancedMesh&&$e.instancing===!1||!X.isInstancedMesh&&$e.instancing===!0||X.isSkinnedMesh&&$e.skinning===!1||!X.isSkinnedMesh&&$e.skinning===!0||X.isInstancedMesh&&$e.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&$e.instancingColor===!1&&X.instanceColor!==null||$e.envMap!==Oe||Z.fog===!0&&$e.fog!==ye||$e.numClippingPlanes!==void 0&&($e.numClippingPlanes!==Ye.numPlanes||$e.numIntersection!==Ye.numIntersection)||$e.vertexAlphas!==Ze||$e.vertexTangents!==Ve||$e.morphTargets!==Xe||$e.morphNormals!==Ot||$e.morphColors!==Mn||$e.toneMapping!==Jt||De.isWebGL2===!0&&$e.morphTargetsCount!==Ct)&&(Dt=!0):(Dt=!0,$e.__version=Z.version);let ls=$e.currentProgram;Dt===!0&&(ls=Ao(Z,H,X));let nu=!1,Lr=!1,mc=!1,on=ls.getUniforms(),hs=$e.uniforms;if(Me.useProgram(ls.program)&&(nu=!0,Lr=!0,mc=!0),Z.id!==L&&(L=Z.id,Lr=!0),nu||y!==T){on.setValue(B,"projectionMatrix",T.projectionMatrix),on.setValue(B,"viewMatrix",T.matrixWorldInverse);let Cn=on.map.cameraPosition;Cn!==void 0&&Cn.setValue(B,fe.setFromMatrixPosition(T.matrixWorld)),De.logarithmicDepthBuffer&&on.setValue(B,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&on.setValue(B,"isOrthographic",T.isOrthographicCamera===!0),y!==T&&(y=T,Lr=!0,mc=!0)}if(X.isSkinnedMesh){on.setOptional(B,X,"bindMatrix"),on.setOptional(B,X,"bindMatrixInverse");let Cn=X.skeleton;Cn&&(De.floatVertexTextures?(Cn.boneTexture===null&&Cn.computeBoneTexture(),on.setValue(B,"boneTexture",Cn.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}X.isBatchedMesh&&(on.setOptional(B,X,"batchingTexture"),on.setValue(B,"batchingTexture",X._matricesTexture,A));let gc=Y.morphAttributes;if((gc.position!==void 0||gc.normal!==void 0||gc.color!==void 0&&De.isWebGL2===!0)&&Qe.update(X,Y,ls),(Lr||$e.receiveShadow!==X.receiveShadow)&&($e.receiveShadow=X.receiveShadow,on.setValue(B,"receiveShadow",X.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(hs.envMap.value=Oe,hs.flipEnvMap.value=Oe.isCubeTexture&&Oe.isRenderTargetTexture===!1?-1:1),Lr&&(on.setValue(B,"toneMappingExposure",v.toneMappingExposure),$e.needsLights&&rp(hs,mc),ye&&Z.fog===!0&&xe.refreshFogUniforms(hs,ye),xe.refreshMaterialUniforms(hs,Z,I,G,ue),nr.upload(B,eu($e),hs,A)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(nr.upload(B,eu($e),hs,A),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&on.setValue(B,"center",X.center),on.setValue(B,"modelViewMatrix",X.modelViewMatrix),on.setValue(B,"normalMatrix",X.normalMatrix),on.setValue(B,"modelMatrix",X.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){let Cn=Z.uniformsGroups;for(let xc=0,ap=Cn.length;xc<ap;xc++)if(De.isWebGL2){let iu=Cn[xc];ut.update(iu,ls),ut.bind(iu,ls)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ls}function rp(T,H){T.ambientLightColor.needsUpdate=H,T.lightProbe.needsUpdate=H,T.directionalLights.needsUpdate=H,T.directionalLightShadows.needsUpdate=H,T.pointLights.needsUpdate=H,T.pointLightShadows.needsUpdate=H,T.spotLights.needsUpdate=H,T.spotLightShadows.needsUpdate=H,T.rectAreaLights.needsUpdate=H,T.hemisphereLights.needsUpdate=H}function op(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,H,Y){ke.get(T.texture).__webglTexture=H,ke.get(T.depthTexture).__webglTexture=Y;let Z=ke.get(T);Z.__hasExternalTextures=!0,Z.__hasExternalTextures&&(Z.__autoAllocateDepthBuffer=Y===void 0,Z.__autoAllocateDepthBuffer||Ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,H){let Y=ke.get(T);Y.__webglFramebuffer=H,Y.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(T,H=0,Y=0){R=T,C=H,b=Y;let Z=!0,X=null,ye=!1,Re=!1;if(T){let Oe=ke.get(T);Oe.__useDefaultFramebuffer!==void 0?(Me.bindFramebuffer(B.FRAMEBUFFER,null),Z=!1):Oe.__webglFramebuffer===void 0?A.setupRenderTarget(T):Oe.__hasExternalTextures&&A.rebindTextures(T,ke.get(T.texture).__webglTexture,ke.get(T.depthTexture).__webglTexture);let Ze=T.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(Re=!0);let Ve=ke.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ve[H])?X=Ve[H][Y]:X=Ve[H],ye=!0):De.isWebGL2&&T.samples>0&&A.useMultisampledRTT(T)===!1?X=ke.get(T).__webglMultisampledFramebuffer:Array.isArray(Ve)?X=Ve[Y]:X=Ve,E.copy(T.viewport),F.copy(T.scissor),V=T.scissorTest}else E.copy(W).multiplyScalar(I).floor(),F.copy(k).multiplyScalar(I).floor(),V=J;if(Me.bindFramebuffer(B.FRAMEBUFFER,X)&&De.drawBuffers&&Z&&Me.drawBuffers(T,X),Me.viewport(E),Me.scissor(F),Me.setScissorTest(V),ye){let Oe=ke.get(T.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+H,Oe.__webglTexture,Y)}else if(Re){let Oe=ke.get(T.texture),Ze=H||0;B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,Oe.__webglTexture,Y||0,Ze)}L=-1},this.readRenderTargetPixels=function(T,H,Y,Z,X,ye,Re){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=ke.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Re!==void 0&&(Ue=Ue[Re]),Ue){Me.bindFramebuffer(B.FRAMEBUFFER,Ue);try{let Oe=T.texture,Ze=Oe.format,Ve=Oe.type;if(Ze!==vn&&Te.convert(Ze)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Xe=Ve===In&&(Ee.has("EXT_color_buffer_half_float")||De.isWebGL2&&Ee.has("EXT_color_buffer_float"));if(Ve!==bn&&Te.convert(Ve)!==B.getParameter(B.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ve===mn&&(De.isWebGL2||Ee.has("OES_texture_float")||Ee.has("WEBGL_color_buffer_float")))&&!Xe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=T.width-Z&&Y>=0&&Y<=T.height-X&&B.readPixels(H,Y,Z,X,Te.convert(Ze),Te.convert(Ve),ye)}finally{let Oe=R!==null?ke.get(R).__webglFramebuffer:null;Me.bindFramebuffer(B.FRAMEBUFFER,Oe)}}},this.copyFramebufferToTexture=function(T,H,Y=0){let Z=Math.pow(2,-Y),X=Math.floor(H.image.width*Z),ye=Math.floor(H.image.height*Z);A.setTexture2D(H,0),B.copyTexSubImage2D(B.TEXTURE_2D,Y,0,0,T.x,T.y,X,ye),Me.unbindTexture()},this.copyTextureToTexture=function(T,H,Y,Z=0){let X=H.image.width,ye=H.image.height,Re=Te.convert(Y.format),Ue=Te.convert(Y.type);A.setTexture2D(Y,0),B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,Y.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,Y.unpackAlignment),H.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Z,T.x,T.y,X,ye,Re,Ue,H.image.data):H.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Z,T.x,T.y,H.mipmaps[0].width,H.mipmaps[0].height,Re,H.mipmaps[0].data):B.texSubImage2D(B.TEXTURE_2D,Z,T.x,T.y,Re,Ue,H.image),Z===0&&Y.generateMipmaps&&B.generateMipmap(B.TEXTURE_2D),Me.unbindTexture()},this.copyTextureToTexture3D=function(T,H,Y,Z,X=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let ye=T.max.x-T.min.x+1,Re=T.max.y-T.min.y+1,Ue=T.max.z-T.min.z+1,Oe=Te.convert(Z.format),Ze=Te.convert(Z.type),Ve;if(Z.isData3DTexture)A.setTexture3D(Z,0),Ve=B.TEXTURE_3D;else if(Z.isDataArrayTexture||Z.isCompressedArrayTexture)A.setTexture2DArray(Z,0),Ve=B.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,Z.flipY),B.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),B.pixelStorei(B.UNPACK_ALIGNMENT,Z.unpackAlignment);let Xe=B.getParameter(B.UNPACK_ROW_LENGTH),Ot=B.getParameter(B.UNPACK_IMAGE_HEIGHT),Mn=B.getParameter(B.UNPACK_SKIP_PIXELS),Jt=B.getParameter(B.UNPACK_SKIP_ROWS),_i=B.getParameter(B.UNPACK_SKIP_IMAGES),Ct=Y.isCompressedTexture?Y.mipmaps[X]:Y.image;B.pixelStorei(B.UNPACK_ROW_LENGTH,Ct.width),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ct.height),B.pixelStorei(B.UNPACK_SKIP_PIXELS,T.min.x),B.pixelStorei(B.UNPACK_SKIP_ROWS,T.min.y),B.pixelStorei(B.UNPACK_SKIP_IMAGES,T.min.z),Y.isDataTexture||Y.isData3DTexture?B.texSubImage3D(Ve,X,H.x,H.y,H.z,ye,Re,Ue,Oe,Ze,Ct.data):Y.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),B.compressedTexSubImage3D(Ve,X,H.x,H.y,H.z,ye,Re,Ue,Oe,Ct.data)):B.texSubImage3D(Ve,X,H.x,H.y,H.z,ye,Re,Ue,Oe,Ze,Ct),B.pixelStorei(B.UNPACK_ROW_LENGTH,Xe),B.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Ot),B.pixelStorei(B.UNPACK_SKIP_PIXELS,Mn),B.pixelStorei(B.UNPACK_SKIP_ROWS,Jt),B.pixelStorei(B.UNPACK_SKIP_IMAGES,_i),X===0&&Z.generateMipmaps&&B.generateMipmap(Ve),Me.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?A.setTextureCube(T,0):T.isData3DTexture?A.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?A.setTexture2DArray(T,0):A.setTexture2D(T,0),Me.unbindTexture()},this.resetState=function(){C=0,b=0,R=null,Me.reset(),qe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=e===ql?"display-p3":"srgb",t.unpackColorSpace=at.workingColorSpace===Oa?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===_t?ys:Qf}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ys?_t:Lt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}},yl=class extends Jr{};yl.prototype.isWebGL1Renderer=!0;var fr=class extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}},$r=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=il,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Xn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},fn=new w,jr=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.applyMatrix4(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.applyNormalMatrix(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.transformDirection(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ni(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ni(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ni(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ni(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array),r=gt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new nt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Sf=new w,Ef=new ft,bf=new ft,v_=new w,Tf=new Pe,Jo=new w,qc=new Tn,wf=new Pe,Yc=new cr,_a=class extends Ce{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=lu,this.bindMatrix=new Pe,this.bindMatrixInverse=new Pe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new gn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Jo),this.boundingBox.expandByPoint(Jo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Tn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Jo),this.boundingSphere.expandByPoint(Jo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qc.copy(this.boundingSphere),qc.applyMatrix4(i),e.ray.intersectsSphere(qc)!==!1&&(wf.copy(i).invert(),Yc.copy(e.ray).applyMatrix4(wf),!(this.boundingBox!==null&&Yc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Yc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new ft,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===lu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===kp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Ef.fromBufferAttribute(i.attributes.skinIndex,e),bf.fromBufferAttribute(i.attributes.skinWeight,e),Sf.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=bf.getComponent(r);if(o!==0){let a=Ef.getComponent(r);Tf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(v_.copy(Sf).applyMatrix4(Tf),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}},Qr=class extends dt{constructor(){super(),this.isBone=!0,this.type="Bone"}},dr=class extends tn{constructor(e=null,t=1,n=1,i,r,o,a,c,l=Ut,h=Ut,u,f){super(null,o,a,c,l,h,i,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Af=new Pe,__=new Pe,ya=class s{constructor(e=[],t=[]){this.uuid=Xn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Pe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Pe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:__;Af.multiplyMatrices(a,t[r]),Af.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new dr(t,e,e,vn,mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Qr),this.bones.push(o),this.boneInverses.push(new Pe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},Ii=class extends nt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ks=new Pe,Rf=new Pe,$o=[],Cf=new gn,y_=new Pe,Fr=new Ce,Or=new Tn,Di=class extends Ce{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ii(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,y_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new gn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ks),Cf.copy(e.boundingBox).applyMatrix4(Ks),this.boundingBox.union(Cf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Tn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ks),Or.copy(e.boundingSphere).applyMatrix4(Ks),this.boundingSphere.union(Or)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Fr.geometry=this.geometry,Fr.material=this.material,Fr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Or.copy(this.boundingSphere),Or.applyMatrix4(n),e.ray.intersectsSphere(Or)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ks),Rf.multiplyMatrices(n,Ks),Fr.matrixWorld=Rf,Fr.raycast(e,$o);for(let o=0,a=$o.length;o<a;o++){let c=$o[o];c.instanceId=r,c.object=this,t.push(c)}$o.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ii(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Ss=class extends wn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Pf=new w,Lf=new w,If=new Pe,Zc=new cr,jo=new Tn,pr=class extends dt{constructor(e=new pt,t=new Ss){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Pf.fromBufferAttribute(t,i-1),Lf.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Pf.distanceTo(Lf);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jo.copy(n.boundingSphere),jo.applyMatrix4(i),jo.radius+=r,e.ray.intersectsSphere(jo)===!1)return;If.copy(i).invert(),Zc.copy(e.ray).applyMatrix4(If);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new w,h=new w,u=new w,f=new w,d=this.isLineSegments?2:1,m=n.index,g=n.attributes.position;if(m!==null){let p=Math.max(0,o.start),_=Math.min(m.count,o.start+o.count);for(let v=p,M=_-1;v<M;v+=d){let C=m.getX(v),b=m.getX(v+1);if(l.fromBufferAttribute(g,C),h.fromBufferAttribute(g,b),Zc.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let L=e.ray.origin.distanceTo(f);L<e.near||L>e.far||t.push({distance:L,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{let p=Math.max(0,o.start),_=Math.min(g.count,o.start+o.count);for(let v=p,M=_-1;v<M;v+=d){if(l.fromBufferAttribute(g,v),h.fromBufferAttribute(g,v+1),Zc.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let b=e.ray.origin.distanceTo(f);b<e.near||b>e.far||t.push({distance:b,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},Df=new w,Uf=new w,Qi=class extends pr{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Df.fromBufferAttribute(t,i),Uf.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Df.distanceTo(Uf);e.setAttribute("lineDistance",new it(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Ma=class extends pr{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},eo=class extends wn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Nf=new Pe,Ml=new cr,Qo=new Tn,ea=new w,Es=class extends dt{constructor(e=new pt,t=new eo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qo.copy(n.boundingSphere),Qo.applyMatrix4(i),Qo.radius+=r,e.ray.intersectsSphere(Qo)===!1)return;Nf.copy(i).invert(),Ml.copy(e.ray).applyMatrix4(Nf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let m=f,x=d;m<x;m++){let g=l.getX(m);ea.fromBufferAttribute(u,g),Ff(ea,g,c,i,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let m=f,x=d;m<x;m++)ea.fromBufferAttribute(u,m),Ff(ea,m,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ff(s,e,t,n,i,r,o){let a=Ml.distanceSqToPoint(s);if(a<t){let c=new w;Ml.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,object:o})}}var es=class extends tn{constructor(e,t,n,i,r,o,a,c,l){super(e,t,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Dn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);let h=n[i],f=n[i+1]-h,d=(o-h)/f;return(i+d)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),c=t||(o.isVector2?new oe:new w);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new w,i=[],r=[],o=[],a=new w,c=new Pe;for(let d=0;d<=e;d++){let m=d/e;i[d]=this.getTangentAt(m,new w)}r[0]=new w,o[0]=new w;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(kt(i[d-1].dot(i[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,m))}o[d].crossVectors(i[d],r[d])}if(t===!0){let d=Math.acos(kt(r[0].dot(r[e]),-1,1));d/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(i[m],d*m)),o[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},to=class extends Dn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t){let n=t||new oe,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Sl=class extends to{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Kl(){let s=0,e=0,t=0,n=0;function i(r,o,a,c){s=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,i(o,a,f,d)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var ta=new w,Kc=new Kl,Jc=new Kl,$c=new Kl,no=class extends Dn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new w){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%r]:(ta.subVectors(i[0],i[1]).add(i[0]),l=ta);let u=i[a%r],f=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(ta.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=ta),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(u),d),x=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),Kc.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,m,x,g),Jc.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,m,x,g),$c.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&(Kc.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Jc.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),$c.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(Kc.calc(c),Jc.calc(c),$c.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new w().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Of(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,c=s*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*s+t}function M_(s,e){let t=1-s;return t*t*e}function S_(s,e){return 2*(1-s)*s*e}function E_(s,e){return s*s*e}function Wr(s,e,t,n){return M_(s,e)+S_(s,t)+E_(s,n)}function b_(s,e){let t=1-s;return t*t*t*e}function T_(s,e){let t=1-s;return 3*t*t*s*e}function w_(s,e){return 3*(1-s)*s*s*e}function A_(s,e){return s*s*s*e}function Xr(s,e,t,n,i){return b_(s,e)+T_(s,t)+w_(s,n)+A_(s,i)}var Sa=class extends Dn{constructor(e=new oe,t=new oe,n=new oe,i=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new oe){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Xr(e,i.x,r.x,o.x,a.x),Xr(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},El=class extends Dn{constructor(e=new w,t=new w,n=new w,i=new w){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new w){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Xr(e,i.x,r.x,o.x,a.x),Xr(e,i.y,r.y,o.y,a.y),Xr(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ea=class extends Dn{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},bl=class extends Dn{constructor(e=new w,t=new w){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new w){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new w){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ba=class extends Dn{constructor(e=new oe,t=new oe,n=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new oe){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Wr(e,i.x,r.x,o.x),Wr(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ta=class extends Dn{constructor(e=new w,t=new w,n=new w){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new w){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(Wr(e,i.x,r.x,o.x),Wr(e,i.y,r.y,o.y),Wr(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wa=class extends Dn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Of(a,c.x,l.x,h.x,u.x),Of(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new oe().fromArray(i))}return this}},Tl=Object.freeze({__proto__:null,ArcCurve:Sl,CatmullRomCurve3:no,CubicBezierCurve:Sa,CubicBezierCurve3:El,EllipseCurve:to,LineCurve:Ea,LineCurve3:bl,QuadraticBezierCurve:ba,QuadraticBezierCurve3:Ta,SplineCurve:wa}),wl=class extends Dn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Tl[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Tl[i.type]().fromJSON(i))}return this}},Al=class extends wl{constructor(e){super(),this.type="Path",this.currentPoint=new oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ea(this.currentPoint.clone(),new oe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new ba(this.currentPoint.clone(),new oe(e,t),new oe(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new Sa(this.currentPoint.clone(),new oe(e,t),new oe(n,i),new oe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new wa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,r,o,a,c),this}absellipse(e,t,n,i,r,o,a,c){let l=new to(e,t,n,i,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},mr=class s extends pt{constructor(e=[new oe(0,-.5),new oe(.5,0),new oe(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=kt(i,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/t,u=new w,f=new oe,d=new w,m=new w,x=new w,g=0,p=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:g=e[_+1].x-e[_].x,p=e[_+1].y-e[_].y,d.x=p*1,d.y=-g,d.z=p*0,x.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:c.push(x.x,x.y,x.z);break;default:g=e[_+1].x-e[_].x,p=e[_+1].y-e[_].y,d.x=p*1,d.y=-g,d.z=p*0,m.copy(d),d.x+=x.x,d.y+=x.y,d.z+=x.z,d.normalize(),c.push(d.x,d.y,d.z),x.copy(m)}for(let _=0;_<=t;_++){let v=n+_*h*i,M=Math.sin(v),C=Math.cos(v);for(let b=0;b<=e.length-1;b++){u.x=e[b].x*M,u.y=e[b].y,u.z=e[b].x*C,o.push(u.x,u.y,u.z),f.x=_/t,f.y=b/(e.length-1),a.push(f.x,f.y);let R=c[3*b+0]*M,L=c[3*b+1],y=c[3*b+0]*C;l.push(R,L,y)}}for(let _=0;_<t;_++)for(let v=0;v<e.length-1;v++){let M=v+_*e.length,C=M,b=M+e.length,R=M+e.length+1,L=M+1;r.push(C,b,L),r.push(R,L,b)}this.setIndex(r),this.setAttribute("position",new it(o,3)),this.setAttribute("uv",new it(a,2)),this.setAttribute("normal",new it(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},io=class s extends mr{constructor(e=1,t=1,n=4,i=8){let r=new Al;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new s(e.radius,e.length,e.capSegments,e.radialSegments)}},Aa=class s extends pt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new w,h=new oe;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){let d=n+u/t*i;l.x=e*Math.cos(d),l.y=e*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new it(o,3)),this.setAttribute("normal",new it(a,3)),this.setAttribute("uv",new it(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},sn=class s extends pt{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],f=[],d=[],m=0,x=[],g=n/2,p=0;_(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new it(u,3)),this.setAttribute("normal",new it(f,3)),this.setAttribute("uv",new it(d,2));function _(){let M=new w,C=new w,b=0,R=(t-e)/n;for(let L=0;L<=r;L++){let y=[],E=L/r,F=E*(t-e)+e;for(let V=0;V<=i;V++){let $=V/i,P=$*c+a,z=Math.sin(P),G=Math.cos(P);C.x=F*z,C.y=-E*n+g,C.z=F*G,u.push(C.x,C.y,C.z),M.set(z,R,G).normalize(),f.push(M.x,M.y,M.z),d.push($,1-E),y.push(m++)}x.push(y)}for(let L=0;L<i;L++)for(let y=0;y<r;y++){let E=x[y][L],F=x[y+1][L],V=x[y+1][L+1],$=x[y][L+1];h.push(E,F,$),h.push(F,V,$),b+=6}l.addGroup(p,b,0),p+=b}function v(M){let C=m,b=new oe,R=new w,L=0,y=M===!0?e:t,E=M===!0?1:-1;for(let V=1;V<=i;V++)u.push(0,g*E,0),f.push(0,E,0),d.push(.5,.5),m++;let F=m;for(let V=0;V<=i;V++){let P=V/i*c+a,z=Math.cos(P),G=Math.sin(P);R.x=y*G,R.y=g*E,R.z=y*z,u.push(R.x,R.y,R.z),f.push(0,E,0),b.x=z*.5+.5,b.y=G*.5*E+.5,d.push(b.x,b.y),m++}for(let V=0;V<i;V++){let $=C+V,P=F+V;M===!0?h.push(P,P+1,$):h.push(P+1,P,$),L+=3}l.addGroup(p,L,M===!0?1:2),p+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},so=class s extends sn{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Un=class s extends pt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new w,f=new w,d=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){let _=[],v=p/n,M=0;p===0&&o===0?M=.5/t:p===n&&c===Math.PI&&(M=-.5/t);for(let C=0;C<=t;C++){let b=C/t;u.x=-e*Math.cos(i+b*r)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(i+b*r)*Math.sin(o+v*a),m.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),g.push(b+M,1-v),_.push(l++)}h.push(_)}for(let p=0;p<n;p++)for(let _=0;_<t;_++){let v=h[p][_+1],M=h[p][_],C=h[p+1][_],b=h[p+1][_+1];(p!==0||o>0)&&d.push(v,M,b),(p!==n-1||c<Math.PI)&&d.push(M,C,b)}this.setIndex(d),this.setAttribute("position",new it(m,3)),this.setAttribute("normal",new it(x,3)),this.setAttribute("uv",new it(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var ro=class s extends pt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],c=[],l=[],h=new w,u=new w,f=new w;for(let d=0;d<=n;d++)for(let m=0;m<=i;m++){let x=m/i*r,g=d/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(x),u.y=(e+t*Math.cos(g))*Math.sin(x),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(m/i),l.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=i;m++){let x=(i+1)*d+m-1,g=(i+1)*(d-1)+m-1,p=(i+1)*(d-1)+m,_=(i+1)*d+m;o.push(x,g,_),o.push(g,p,_)}this.setIndex(o),this.setAttribute("position",new it(a,3)),this.setAttribute("normal",new it(c,3)),this.setAttribute("uv",new it(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}};var Ra=class s extends pt{constructor(e=new Ta(new w(-1,-1,0),new w(-1,1,0),new w(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new w,c=new w,l=new oe,h=new w,u=[],f=[],d=[],m=[];x(),this.setIndex(m),this.setAttribute("position",new it(u,3)),this.setAttribute("normal",new it(f,3)),this.setAttribute("uv",new it(d,2));function x(){for(let v=0;v<t;v++)g(v);g(r===!1?t:0),_(),p()}function g(v){h=e.getPointAt(v/t,h);let M=o.normals[v],C=o.binormals[v];for(let b=0;b<=i;b++){let R=b/i*Math.PI*2,L=Math.sin(R),y=-Math.cos(R);c.x=y*M.x+L*C.x,c.y=y*M.y+L*C.y,c.z=y*M.z+L*C.z,c.normalize(),f.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function p(){for(let v=1;v<=t;v++)for(let M=1;M<=i;M++){let C=(i+1)*(v-1)+(M-1),b=(i+1)*v+(M-1),R=(i+1)*v+M,L=(i+1)*(v-1)+M;m.push(C,b,L),m.push(b,R,L)}}function _(){for(let v=0;v<=t;v++)for(let M=0;M<=i;M++)l.x=v/t,l.y=M/i,d.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Tl[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};var Bt=class extends wn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ed,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Nn=class extends Bt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return kt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};function na(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function R_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function C_(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function zf(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function ud(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}var ts=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Rl=class extends ts{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Js,endingEnd:Js}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case $s:r=e,a=2*t-n;break;case ra:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case $s:o=e,c=2*n-t;break;case ra:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,m=(n-t)/(i-t),x=m*m,g=x*m,p=-f*g+2*f*x-f*m,_=(1+f)*g+(-1.5-2*f)*x+(-.5+f)*m+1,v=(-1-d)*g+(1.5+d)*x+.5*m,M=d*g-d*x;for(let C=0;C!==a;++C)r[C]=p*o[h+C]+_*o[l+C]+v*o[c+C]+M*o[u+C];return r}},Ca=class extends ts{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},Cl=class extends ts{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Fn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=na(t,this.TimeBufferType),this.values=na(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:na(e.times,Array),values:na(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Cl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ca(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Rl(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case or:t=this.InterpolantFactoryMethodDiscrete;break;case Ms:t=this.InterpolantFactoryMethodLinear;break;case Ec:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return or;case this.InterpolantFactoryMethodLinear:return Ms;case this.InterpolantFactoryMethodSmooth:return Ec}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&R_(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Ec,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{let u=a*n,f=u-n,d=u+n;for(let m=0;m!==n;++m){let x=t[u+m];if(x!==t[f+m]||x!==t[d+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Fn.prototype.TimeBufferType=Float32Array;Fn.prototype.ValueBufferType=Float32Array;Fn.prototype.DefaultInterpolation=Ms;var ns=class extends Fn{};ns.prototype.ValueTypeName="bool";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=or;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;var Pa=class extends Fn{};Pa.prototype.ValueTypeName="color";var Ui=class extends Fn{};Ui.prototype.ValueTypeName="number";var Pl=class extends ts{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t),l=e*a;for(let h=l+a;l!==h;l+=4)Pt.slerpFlat(r,0,o,l-a,o,l,c);return r}},oi=class extends Fn{InterpolantFactoryMethodLinear(e){return new Pl(this.times,this.values,this.getValueSize(),e)}};oi.prototype.ValueTypeName="quaternion";oi.prototype.DefaultInterpolation=Ms;oi.prototype.InterpolantFactoryMethodSmooth=void 0;var is=class extends Fn{};is.prototype.ValueTypeName="string";is.prototype.ValueBufferType=Array;is.prototype.DefaultInterpolation=or;is.prototype.InterpolantFactoryMethodLinear=void 0;is.prototype.InterpolantFactoryMethodSmooth=void 0;var Ni=class extends Fn{};Ni.prototype.ValueTypeName="vector";var gr=class{constructor(e,t=-1,n,i=Xl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Xn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(L_(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(Fn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=C_(c);c=zf(c,1,h),l=zf(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Ui(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],f=i[u];f||(i[u]=f=[]),f.push(l)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,f,d,m,x){if(d.length!==0){let g=[],p=[];ud(d,g,p,m),g.length!==0&&x.push(new u(f,g,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let f=l[u].keys;if(!(!f||f.length===0))if(f[0].morphTargets){let d={},m;for(m=0;m<f.length;m++)if(f[m].morphTargets)for(let x=0;x<f[m].morphTargets.length;x++)d[f[m].morphTargets[x]]=-1;for(let x in d){let g=[],p=[];for(let _=0;_!==f[m].morphTargets.length;++_){let v=f[m];g.push(v.time),p.push(v.morphTarget===x?1:0)}i.push(new Ui(".morphTargetInfluence["+x+"]",g,p))}c=d.length*o}else{let d=".bones["+t[u].name+"]";n(Ni,d+".position",f,"pos",i),n(oi,d+".quaternion",f,"rot",i),n(Ni,d+".scale",f,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function P_(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ui;case"vector":case"vector2":case"vector3":case"vector4":return Ni;case"color":return Pa;case"quaternion":return oi;case"bool":case"boolean":return ns;case"string":return is}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function L_(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=P_(s.type);if(s.times===void 0){let t=[],n=[];ud(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}var Zi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},Ll=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let d=l[u],m=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return m}return null}}},I_=new Ll,ai=class{constructor(e){this.manager=e!==void 0?e:I_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};ai.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ti={},Il=class extends Error{constructor(e,t){super(e),this.response=t}},xr=class extends ai{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Zi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Ti[e]!==void 0){Ti[e].push({onLoad:t,onProgress:n,onError:i});return}Ti[e]=[],Ti[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=Ti[e],u=l.body.getReader(),f=l.headers.get("Content-Length")||l.headers.get("X-File-Size"),d=f?parseInt(f):0,m=d!==0,x=0,g=new ReadableStream({start(p){_();function _(){u.read().then(({done:v,value:M})=>{if(v)p.close();else{x+=M.byteLength;let C=new ProgressEvent("progress",{lengthComputable:m,loaded:x,total:d});for(let b=0,R=h.length;b<R;b++){let L=h[b];L.onProgress&&L.onProgress(C)}p.enqueue(M),_()}})}}});return new Response(g)}else throw new Il(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(m=>d.decode(m))}}}).then(l=>{Zi.add(e,l);let h=Ti[e];delete Ti[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(l)}}).catch(l=>{let h=Ti[e];if(h===void 0)throw this.manager.itemError(e),l;delete Ti[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Dl=class extends ai{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Zi.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;let a=Zr("img");function c(){h(),Zi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}};var La=class extends ai{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new dr,a=new xr(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:pn,o.wrapT=l.wrapT!==void 0?l.wrapT:pn,o.magFilter=l.magFilter!==void 0?l.magFilter:bt,o.minFilter=l.minFilter!==void 0?l.minFilter:bt,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0?o.colorSpace=l.colorSpace:l.encoding!==void 0&&(o.encoding=l.encoding),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=qn),l.mipmapCount===1&&(o.minFilter=bt),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,t&&t(o,l)},n,i),o}},bs=class extends ai{constructor(e){super(e)}load(e,t,n,i){let r=new tn,o=new Dl(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},vr=class extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}},Ia=class extends vr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ge(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},jc=new Pe,Bf=new w,Hf=new w,oo=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Kr,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Bf.setFromMatrixPosition(e.matrixWorld),t.position.copy(Bf),Hf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Hf),t.updateMatrixWorld(),jc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(jc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ul=class extends oo{constructor(){super(new Gt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=ar*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},_r=class extends vr{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Ul}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},kf=new Pe,zr=new w,Qc=new w,Nl=class extends oo{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new oe(4,2),this._viewportCount=6,this._viewports=[new ft(2,1,1,1),new ft(0,1,1,1),new ft(3,1,1,1),new ft(1,1,1,1),new ft(3,0,1,1),new ft(1,0,1,1)],this._cubeDirections=[new w(1,0,0),new w(-1,0,0),new w(0,0,1),new w(0,0,-1),new w(0,1,0),new w(0,-1,0)],this._cubeUps=[new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,1,0),new w(0,0,1),new w(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),zr.setFromMatrixPosition(e.matrixWorld),n.position.copy(zr),Qc.copy(n.position),Qc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Qc),n.updateMatrixWorld(),i.makeTranslation(-zr.x,-zr.y,-zr.z),kf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(kf)}},Fi=class extends vr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Nl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Fl=class extends oo{constructor(){super(new ji(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},yr=class extends vr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new Fl}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var ss=class{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var Da=class extends ai{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Zi.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Zi.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Zi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Zi.add(e,c),r.manager.itemStart(e)}};var Ol=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){Pt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let o=this._workIndex*r;Pt.multiplyQuaternionsFlat(e,o,e,t,e,n),Pt.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){let o=1-i;for(let a=0;a!==r;++a){let c=t+a;e[c]=e[c]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*i}}},Jl="\\[\\]\\.:\\/",D_=new RegExp("["+Jl+"]","g"),$l="[^"+Jl+"]",U_="[^"+Jl.replace("\\.","")+"]",N_=/((?:WC+[\/:])*)/.source.replace("WC",$l),F_=/(WCOD+)?/.source.replace("WCOD",U_),O_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$l),z_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$l),B_=new RegExp("^"+N_+F_+O_+z_+"$"),H_=["material","materials","bones","map"],zl=class{constructor(e,t,n){let i=n||vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},vt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(D_,"")}static parseTrackName(e){let t=B_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);H_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[i];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};vt.Composite=zl;vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};vt.prototype.GetterByBindingType=[vt.prototype._getValue_direct,vt.prototype._getValue_array,vt.prototype._getValue_arrayElement,vt.prototype._getValue_toArray];vt.prototype.SetterByBindingTypeAndVersioning=[[vt.prototype._setValue_direct,vt.prototype._setValue_direct_setNeedsUpdate,vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_array,vt.prototype._setValue_array_setNeedsUpdate,vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_arrayElement,vt.prototype._setValue_arrayElement_setNeedsUpdate,vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_fromArray,vt.prototype._setValue_fromArray_setNeedsUpdate,vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Bl=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,o=r.length,a=new Array(o),c={endingStart:Js,endingEnd:Js};for(let l=0;l!==o;++l){let h=r[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Jp,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){let i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);let c=a.parameterPositions,l=a.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case jp:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case Xl:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,o=n===$p;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===Kp){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){let a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=$s,i.endingEnd=$s):(e?i.endingStart=this.zeroSlopeAtStart?$s:Js:i.endingStart=ra,t?i.endingEnd=this.zeroSlopeAtEnd?$s:Js:i.endingEnd=ra)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,c=o.sampleValues;return a[0]=r,c[0]=t,a[1]=r+e,c[1]=n,this}},k_=new Float32Array(1),Ua=class extends Li{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let f=i[u],d=f.name,m=h[d];if(m!==void 0)++m.referenceCount,o[u]=m;else{if(m=o[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,c,d));continue}let x=t&&t._propertyBindings[u].binding.parsedPath;m=new Ol(vt.create(n,d,x),f.ValueTypeName,f.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,c,d),o[u]=m}a[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],c=a.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],c.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Ca(new Float32Array(2),new Float32Array(2),1,k_),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,o=typeof e=="string"?gr.findByName(i,e):e,a=o!==null?o.uuid:e,c=this._actionsByClip[a],l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Xl),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;let h=new Bl(this,o,t,n);return this._bindAction(h,l),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?gr.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,r,o);let a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let o=r.knownActions;for(let a=0,c=o.length;a!==c;++a){let l=o[a];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hl);var jl={low:{label:"\u041D\u0438\u0437\u043A\u043E\u0435",scale:.6,terrainRes:.25,msaa:0,shadowSize:512,flareShadow:!1,moonShadow:!1,ao:!1,volSteps:10,lanterns:3,rain:2500,ssr:!1,bloom:!0},medium:{label:"\u0421\u0440\u0435\u0434\u043D\u0435\u0435",scale:.8,terrainRes:.18,msaa:0,shadowSize:1024,flareShadow:!1,moonShadow:!0,ao:!0,volSteps:16,lanterns:4,rain:4e3,ssr:!0,bloom:!0},high:{label:"\u0412\u044B\u0441\u043E\u043A\u043E\u0435",scale:1,terrainRes:.14,msaa:4,shadowSize:1024,flareShadow:!0,moonShadow:!0,ao:!0,volSteps:24,lanterns:6,rain:6e3,ssr:!0,bloom:!0},ultra:{label:"\u0423\u043B\u044C\u0442\u0440\u0430",scale:1,terrainRes:.11,msaa:4,shadowSize:2048,flareShadow:!0,moonShadow:!0,ao:!0,volSteps:32,lanterns:6,rain:9e3,ssr:!0,bloom:!0,hiDpi:!0}},Ba={loyal:{unit:"\u041D\u0410\u0422\u0415\u041B\u042C\u041D\u0410\u042F \u041A\u0410\u041C\u0415\u0420\u0410 07",squad:"\u041F\u0418\u041B\u0418\u0413\u0420\u0418\u041C\u042B \u041E\u041A\u041E\u041F\u041E\u0412 \xB7 \u041D\u041E\u0412\u042B\u0419 \u0410\u041D\u0422\u0418\u041E\u0425",intro:"\u0414\u0435\u0440\u0436\u0438\u0442\u0435 \u043E\u043A\u043E\u043F",introSub:"\u0410\u0434 \u0438\u0434\u0451\u0442 \u0432\u043E\u043B\u043D\u0430\u043C\u0438. \u0420\u0430\u0441\u0441\u0432\u0435\u0442 \u043D\u0435 \u043E\u0431\u0435\u0449\u0430\u043D.",sleeve:[.3,.28,.2],glove:[.16,.11,.08],rusher:{model:"ghoul",name:"\u0413\u0443\u043B\u044C",hp:120,speed:4.6,dmg:20},shooter:{model:"legion",name:"\u041B\u0435\u0433\u0438\u043E\u043D\u0435\u0440",hp:90,speed:2.4,dmg:24}},heretic:{unit:"\u041D\u0410\u0422\u0415\u041B\u042C\u041D\u0410\u042F \u041A\u0410\u041C\u0415\u0420\u0410 13",squad:"\u041B\u0415\u0413\u0418\u041E\u041D \u0415\u0420\u0415\u0422\u0418\u041A\u041E\u0412 \xB7 \u041B\u0415\u0422\u0423\u0427\u0418\u0419 \u041E\u0422\u0420\u042F\u0414",intro:"\u0412\u043E\u0437\u044C\u043C\u0438\u0442\u0435 \u043E\u043A\u043E\u043F",introSub:"\u0410\u043D\u0442\u0438\u043E\u0445 \u0448\u043B\u0451\u0442 \u0441\u0432\u043E\u0438\u0445 \u0444\u0430\u043D\u0430\u0442\u0438\u043A\u043E\u0432. \u041F\u0443\u0441\u0442\u044C \u0438\u0434\u0443\u0442.",sleeve:[.08,.07,.07],glove:[.05,.04,.04],rusher:{model:"penitent",name:"\u041A\u0430\u044E\u0449\u0438\u0439\u0441\u044F",hp:150,speed:4,dmg:22},shooter:{model:"antioch",name:"\u0421\u0442\u0440\u0435\u043B\u043E\u043A \u0410\u043D\u0442\u0438\u043E\u0445\u0430",hp:90,speed:2.4,dmg:24}}};var ze=(s,e,t)=>s<e?e:s>t?t:s,ve=(s,e,t)=>s+(e-s)*t,j=(s,e)=>s+Math.random()*(e-s),Rt=(s,e)=>1-Math.exp(-s*e),Ql=(s,e,t)=>{let n=ze((t-s)/(e-s),0,1);return n*n*(3-2*n)},Be=s=>document.getElementById(s);function ho(s){return function(){s|=0,s=s+1831565813|0;let e=Math.imul(s^s>>>15,1|s);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function uo(s=1){let e=ho(s),t=new Uint8Array(512),n=Array.from({length:256},(l,h)=>h);for(let l=255;l>0;l--){let h=Math.floor(e()*(l+1));[n[l],n[h]]=[n[h],n[l]]}for(let l=0;l<512;l++)t[l]=n[l&255];let i=new Float32Array(256),r=new Float32Array(256);for(let l=0;l<256;l++){let h=e()*Math.PI*2;i[l]=Math.cos(h),r[l]=Math.sin(h)}let o=l=>l*l*l*(l*(l*6-15)+10);function a(l,h){let u=Math.floor(l),f=Math.floor(h),d=l-u,m=h-f,x=u&255,g=f&255,p=t[x+t[g]],_=t[x+1+t[g]],v=t[x+t[g+1]],M=t[x+1+t[g+1]],C=i[p]*d+r[p]*m,b=i[_]*(d-1)+r[_]*m,R=i[v]*d+r[v]*(m-1),L=i[M]*(d-1)+r[M]*(m-1),y=o(d),E=o(m);return ve(ve(C,b,y),ve(R,L,y),E)*1.41}function c(l,h,u=4){let f=0,d=.5,m=1,x=0;for(let g=0;g<u;g++)f+=a(l*m,h*m)*d,x+=d,d*=.5,m*=2.03;return f/x}return{noise2:a,fbm:c}}var li={get(s,e){try{let t=localStorage.getItem("trenchcam2."+s);return t===null?e:JSON.parse(t)}catch{return e}},set(s,e){try{localStorage.setItem("trenchcam2."+s,JSON.stringify(e))}catch{}}};var fo=new Uint8Array(44*30),An=(s,e)=>e*44+s,st=(s,e)=>s<0||e<0||s>=44||e>=30||fo[An(s,e)]===1,ui=s=>Math.floor(s/2),ct=s=>(s+.5)*2,rn=[[1,0],[-1,0],[0,1],[0,-1]],Er=new Uint8Array(44*30*4),We={rooms:[],bays:[],saps:[],dugouts:[],spawn:[22,14],craters:[],lines:{},seed:1},Jn=uo(1);function md(s){We.seed=s,Jn=uo(s);let e=ho(s);fo.fill(1);let t=(m,x)=>{m>0&&x>0&&m<43&&x<29&&(fo[An(m,x)]=0)},n=6,i=14,r=22;We.lines={zF:n,zS:i,zR:r},We.bays=[],We.rooms=[],We.saps=[],We.dugouts=[];for(let m=3;m<=36;m+=6){for(let x=m;x<=m+3;x++)t(x,n);We.bays.push({x0:m,x1:m+3,z:n});for(let x=m+3;x<=m+6;x++)t(x,n+1);t(m+6,n)}let o=i;for(let m=3;m<=40;m++)if(t(m,o),(m-3)%5===4&&m<40){let x=o===i?i+1:i;t(m,x),o=x}o=r;for(let m=4;m<=39;m++)if(t(m,o),e()<.12&&m<38){let x=ze(o+(e()<.5?-1:1),r-1,r+1);t(m,x),o=x}let a=[6,15,24,33,40].map(m=>ze(m+Math.floor(e()*3)-1,4,39));for(let m of a){let x=m;for(let g=n+1;g<=r;g++)if(t(x,g),(g-n)%3===0&&g<r-1){let p=ze(x+(e()<.5?-1:1),3,40);t(p,g),x=p}}let c=3;for(let m=0;m<c;m++){let g=We.bays[1+Math.floor(e()*(We.bays.length-2))].x0+1+Math.floor(e()*2);for(let p=n-1;p>=3;p--)t(g,p);t(g+1,2),t(g,2),t(g+1,3),We.saps.push({x:g,z:2})}let l=[],h=(m,x,g,p)=>{for(let _=0;_<p;_++)for(let v=0;v<g;v++)if(m+v<=0||x+_<=0||m+v>=43||x+_>=29)return!1;for(let _=0;_<p;_++)for(let v=0;v<g;v++)t(m+v,x+_);return l.push({x:m,z:x,w:g,h:p,cx:(m+g/2)*2,cz:(x+p/2)*2}),!0};for(let m=0;m<4;m++)h(5+m*9+Math.floor(e()*3),i+2,2,2);for(let m=0;m<3;m++)h(8+m*12+Math.floor(e()*3),r+1,2+(m===1?1:0),2);We.rooms=l;for(let m=10;m<=18;m++)t(m,10);for(let m=10;m<=11;m++)t(18,m);for(We.spawn=[Math.floor(44/2),i];st(We.spawn[0],We.spawn[1]);)We.spawn[0]++;ka(ct(We.spawn[0]),ct(We.spawn[1]));for(let m=0;m<44*30;m++)fo[m]===0&&hi[m]<0&&(fo[m]=1);Er.fill(0);let u=(m,x)=>{let g=Jn.noise2(m*.21+3.1,x*.21-1.7);return g>.28?4:g>-.05?2:g>-.35?3:1};for(let m=0;m<30;m++)for(let x=0;x<44;x++)if(!st(x,m))for(let g=0;g<4;g++){let[p,_]=rn[g];if(!st(x+p,m+_))continue;let v=u(x,m);e()<.08&&(v=1),Er[An(x,m)*4+g]=v}We.craters=[];let f=44*2,d=30*2;V_();for(let m=0;m<260&&We.craters.length<110;m++){let x=ve(-60,f+60,e()),g=ve(-60,d+40,e()),p=ve(1,3.6,Math.pow(e(),1.6));if(br(x,g)<p+1.4||We.craters.some(v=>Math.hypot(v.x-x,v.z-g)<(v.r+p)*.8))continue;let _=g<We.lines.zF*2?1:.45;e()>_||We.craters.push({x,z:g,r:p,d:p*ve(.28,.42,e())})}return G_(),We}var rs=.1,Vt=Math.round(44*2/rs),Kn=Math.round(30*2/rs),po=new Float32Array(Vt*Kn);function fd(s,e,t,n,i){let r=0;n[0]=0,i[0]=-1e20,i[1]=1e20;for(let o=1;o<e;o++){let a=(s[o]+o*o-(s[n[r]]+n[r]*n[r]))/(2*o-2*n[r]);for(;a<=i[r];)r--,a=(s[o]+o*o-(s[n[r]]+n[r]*n[r]))/(2*o-2*n[r]);r++,n[r]=o,i[r]=a,i[r+1]=1e20}r=0;for(let o=0;o<e;o++){for(;i[r+1]<o;)r++;t[o]=(o-n[r])*(o-n[r])+s[n[r]]}}function dd(s){let e=Math.max(Vt,Kn),t=new Float64Array(e),n=new Float64Array(e),i=new Int32Array(e),r=new Float64Array(e+1);for(let o=0;o<Vt;o++){for(let a=0;a<Kn;a++)t[a]=s[a*Vt+o];fd(t,Kn,n,i,r);for(let a=0;a<Kn;a++)s[a*Vt+o]=n[a]}for(let o=0;o<Kn;o++){for(let a=0;a<Vt;a++)t[a]=s[o*Vt+a];fd(t,Vt,n,i,r);for(let a=0;a<Vt;a++)s[o*Vt+a]=n[a]}}function V_(){let s=new Float64Array(Vt*Kn),e=new Float64Array(Vt*Kn);for(let t=0;t<Kn;t++)for(let n=0;n<Vt;n++){let i=!st(Math.floor(n*rs/2),Math.floor(t*rs/2));s[t*Vt+n]=i?0:1e20,e[t*Vt+n]=i?1e20:0}dd(s),dd(e);for(let t=0;t<Vt*Kn;t++){let n=Math.sqrt(s[t]),i=Math.sqrt(e[t]);po[t]=(n>0?n-.5:-(i-.5))*rs}}function br(s,e){let t=s/rs-.5,n=e/rs-.5,i=ze(t,0,Vt-1.001),r=ze(n,0,Kn-1.001),o=Math.floor(i),a=Math.floor(r),c=i-o,l=r-a,h=a*Vt+o,u=ve(ve(po[h],po[h+1],c),ve(po[h+Vt],po[h+Vt+1],c),l),f=Math.hypot(Math.max(0,Math.abs(t-i)),Math.max(0,Math.abs(n-r)))*rs;return u+f}var mo=new Map,Sr=10;function G_(){mo=new Map;for(let s of We.craters){let e=s.r*1.6;for(let t=Math.floor((s.x-e)/Sr);t<=Math.floor((s.x+e)/Sr);t++)for(let n=Math.floor((s.z-e)/Sr);n<=Math.floor((s.z+e)/Sr);n++){let i=t*1e3+n;mo.has(i)||mo.set(i,[]),mo.get(i).push(s)}}}function W_(s,e){let t=mo.get(Math.floor(s/Sr)*1e3+Math.floor(e/Sr));if(!t)return 0;let n=0;for(let i of t){let r=Math.hypot(s-i.x,e-i.z)/i.r;r>1.6||(r<1&&(n-=i.d*Math.pow(1-r*r,1.3)),n+=i.d*.32*Math.exp(-(((r-1)/.28)**2)))}return n}var X_=.38;function pd(s,e,t){let n=-.035+Jn.noise2(s*.55,e*.55)*.03+Jn.noise2(s*2.1+5,e*2.1)*.012;return n-=Math.min(.045,-t*.05),n}function q_(s,e,t){let n=2.55;return n+=.42*Math.exp(-(((t-1.25)/.8)**2))*(.65+.35*Jn.noise2(s*.4,e*.4)),n+=Jn.fbm(s*.045,e*.045,3)*.9*Ql(2,10,t),n+=Jn.fbm(s*.35+11,e*.35,3)*.16+Jn.noise2(s*2.2,e*2.2)*.035,n+=W_(s,e)*Ql(.6,2,t),n}function rt(s,e){let t=br(s,e),n=Jn.noise2(s*.85,e*.85)*.5+.5,i=Jn.noise2(s*3.3+7,e*3.3)*.5+.5,r=t-(.03+n*.12+i*.04);if(r<=0)return pd(s,e,r);let o=X_*(.75+.55*i),a=q_(s,e,t);if(r>=o)return a;let c=r/o,l=.5-.5*Math.cos(Math.PI*c);return ve(pd(s,e,0),a,l)+Jn.noise2(s*5.5,e*5.5+13)*.035*Math.sin(Math.PI*c)}function th(s,e,t,n,i,r,o){let a=ui(s),c=ui(t),l=n>0?1:-1,h=r>0?1:-1,u=Math.abs(n),f=Math.abs(r),d=u<1e-9?1/0:2/u,m=f<1e-9?1/0:2/f,x=u<1e-9?1/0:(n>0?(a+1)*2-s:s-a*2)/u,g=f<1e-9?1/0:(r>0?(c+1)*2-t:t-c*2)/f,p=0,_=(v,M)=>{for(let b=Math.max(0,v);b<=M;b+=.03){let R=s+n*b,L=e+i*b,y=t+r*b;if(L<rt(R,y)){let E=b-.03,F=b;for(let V=0;V<6;V++){let $=(E+F)/2;e+i*$<rt(s+n*$,t+r*$)?F=$:E=$}return F}}return-1};for(let v=0;v<200;v++){let M,C;if(x<g?(M=x,x+=d,C=l>0?0:1):(M=g,g+=m,C=h>0?2:3),i<0){let y=(e-0)/-i;if(y<Math.min(M,o)+.3&&y>p-.3){let E=_(y-.35,Math.min(M,o)+.05);if(E>0)return{t:E,hit:!0,kind:"floor"}}}if(M>o)break;let b=a+rn[C][0],R=c+rn[C][1],L=e+i*M;if(!st(a,c)&&st(b,R)&&L<2.55+.6){let y=Er[An(ze(a,0,43),ze(c,0,29))*4+C],E=y===4?1.9:2.4;if(y>=2&&L>0&&L<E)return{t:M,hit:!0,kind:"wall",mat:y,nx:-rn[C][0],nz:-rn[C][1]};let F=_(M-.05,M+1.4);if(F>0)return{t:F,hit:!0,kind:"wall",mat:1,nx:-rn[C][0],nz:-rn[C][1]}}if(a<-3||c<-3||a>46||c>32)break;a=b,c=R,p=M}return{t:o,hit:!1}}function Ha(s,e,t,n,i=1.4){let r=t-s,o=n-e,a=Math.hypot(r,o);if(a<.01)return!0;let c=ui(s),l=ui(e),h=r/a,u=o/a,f=h>0?1:-1,d=u>0?1:-1,m=Math.abs(h)<1e-9?1/0:2/Math.abs(h),x=Math.abs(u)<1e-9?1/0:2/Math.abs(u),g=Math.abs(h)<1e-9?1/0:(h>0?(c+1)*2-s:s-c*2)/Math.abs(h),p=Math.abs(u)<1e-9?1/0:(u>0?(l+1)*2-e:e-l*2)/Math.abs(u);for(let _=0;_<200;_++){let v;if(g<p?(v=g,g+=m,c+=f):(v=p,p+=x,l+=d),v>=a)return!0;if(st(c,l))return!1}return!0}function go(s,e){for(let t=0;t<2;t++){let n=ui(s.x),i=ui(s.z);for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++){let a=n+o,c=i+r;if(!st(a,c))continue;let l=a*2,h=l+2,u=c*2,f=u+2,d=ze(s.x,l,h),m=ze(s.z,u,f),x=s.x-d,g=s.z-m,p=Math.hypot(x,g);p<e&&(p>1e-5?(s.x+=x/p*(e-p),s.z+=g/p*(e-p)):(s.x=ct(n),s.z=ct(i)))}}}var hi=new Int16Array(44*30),eh=new Int32Array(44*30);function ka(s,e){hi.fill(-1);let t=ze(ui(s),0,43),n=ze(ui(e),0,29);if(st(t,n))return;let i=0,r=0,o=An(t,n);for(hi[o]=0,eh[r++]=o;i<r;){let a=eh[i++],c=a%44,l=a/44|0;for(let h=0;h<4;h++){let u=c+rn[h][0],f=l+rn[h][1];if(st(u,f))continue;let d=An(u,f);hi[d]<0&&(hi[d]=hi[a]+1,eh[r++]=d)}}}function nh(s,e){let t=ze(ui(s),0,43),n=ze(ui(e),0,29),i=hi[An(t,n)],r=t,o=n;for(let[h,u]of rn){let f=t+h,d=n+u;if(st(f,d))continue;let m=hi[An(f,d)];m>=0&&(i<0||m<i)&&(i=m,r=f,o=d)}let a=ct(r)-s,c=ct(o)-e,l=Math.hypot(a,c)||1;return[a/l,c/l]}function ws(s,e=!1){let t=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,c=new pt,l=0;for(let h=0;h<s.length;++h){let u=s[h],f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let d in u.morphAttributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(e){let d;if(t)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(t){let h=0,u=[];for(let f=0;f<s.length;++f){let d=s[f].index;for(let m=0;m<d.count;++m)u.push(d.getX(m)+h);h+=s[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=gd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let x=0;x<o[h].length;++x)d.push(o[h][x][f]);let m=gd(d);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(m)}}return c}function gd(s){let e,t,n,i=-1,r=0;for(let l=0;l<s.length;++l){let h=s[l];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.array.length}let o=new e(r),a=0;for(let l=0;l<s.length;++l)o.set(s[l].array,a),a+=s[l].array.length;let c=new nt(o,t,n);return i!==void 0&&(c.gpuType=i),c}function ih(s,e){if(e===jf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ao||e===Fa){let t=s.getIndex();if(t===null){let o=[],a=s.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}let n=t.count-2,i=[];if(e===ao)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}var Va=class extends ai{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new hh(t)}),this.register(function(t){return new _h(t)}),this.register(function(t){return new yh(t)}),this.register(function(t){return new Mh(t)}),this.register(function(t){return new fh(t)}),this.register(function(t){return new dh(t)}),this.register(function(t){return new ph(t)}),this.register(function(t){return new mh(t)}),this.register(function(t){return new lh(t)}),this.register(function(t){return new gh(t)}),this.register(function(t){return new uh(t)}),this.register(function(t){return new vh(t)}),this.register(function(t){return new xh(t)}),this.register(function(t){return new ah(t)}),this.register(function(t){return new Sh(t)}),this.register(function(t){return new Eh(t)})}load(e,t,n,i){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let l=ss.extractUrlBase(e);o=ss.resolveURL(l,this.path)}else o=ss.extractUrlBase(e);this.manager.itemStart(e);let a=function(l){i?i(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new xr(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r,o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Md){try{o[et.KHR_BINARY_GLTF]=new bh(e)}catch(u){i&&i(u);return}r=JSON.parse(o[et.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Lh(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case et.KHR_MATERIALS_UNLIT:o[u]=new ch;break;case et.KHR_DRACO_MESH_COMPRESSION:o[u]=new Th(r,this.dracoLoader);break;case et.KHR_TEXTURE_TRANSFORM:o[u]=new wh;break;case et.KHR_MESH_QUANTIZATION:o[u]=new Ah;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}};function Y_(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}var et={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},ah=class{constructor(e){this.parser=e,this.name=et.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new ge(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Lt);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new yr(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Fi(h),l.distance=u;break;case"spot":l=new _r(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,as(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}},ch=class{constructor(){this.name=et.KHR_MATERIALS_UNLIT}getMaterialType(){return zt}extendParams(e,t,n){let i=[];e.color=new ge(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Lt),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,_t))}return Promise.all(i)}},lh=class{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},hh=class{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){let a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new oe(a,a)}return Promise.all(r)}},uh=class{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}},fh=class{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new ge(0,0,0),t.sheenRoughness=0,t.sheen=1;let o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){let a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Lt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,_t)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}},dh=class{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}},ph=class{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;let a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ge().setRGB(a[0],a[1],a[2],Lt),Promise.all(r)}},mh=class{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},gh=class{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));let a=o.specularColorFactor||[1,1,1];return t.specularColor=new ge().setRGB(a[0],a[1],a[2],Lt),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,_t)),Promise.all(r)}},xh=class{constructor(e){this.parser=e,this.name=et.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}},vh=class{constructor(e){this.parser=e,this.name=et.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Nn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}},_h=class{constructor(e){this.parser=e,this.name=et.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},yh=class{constructor(e){this.parser=e,this.name=et.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Mh=class{constructor(e){this.parser=e,this.name=et.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=i.images[o.source],c=n.textureLoader;if(a.uri){let l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Sh=class{constructor(e){this.name=et.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,i.mode,i.filter),d})})}else return null}},Eh=class{constructor(e){this.name=et.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let l of i.primitives)if(l.mode!==On.TRIANGLES&&l.mode!==On.TRIANGLE_STRIP&&l.mode!==On.TRIANGLE_FAN&&l.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],c={};for(let l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,d=[];for(let m of u){let x=new Pe,g=new w,p=new Pt,_=new w(1,1,1),v=new Di(m.geometry,m.material,f);for(let M=0;M<f;M++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,M),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,M),c.SCALE&&_.fromBufferAttribute(c.SCALE,M),v.setMatrixAt(M,x.compose(g,p,_));for(let M in c)if(M==="_COLOR_0"){let C=c[M];v.instanceColor=new Ii(C.array,C.itemSize,C.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&m.geometry.setAttribute(M,c[M]);dt.prototype.copy.call(v,m),this.parser.assignFinalMaterial(v),d.push(v)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},Md="glTF",xo=12,xd={JSON:1313821514,BIN:5130562},bh=class{constructor(e){this.name=et.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,xo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Md)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-xo,r=new DataView(e,xo),o=0;for(;o<i;){let a=r.getUint32(o,!0);o+=4;let c=r.getUint32(o,!0);if(o+=4,c===xd.JSON){let l=new Uint8Array(e,xo+o,a);this.content=n.decode(l)}else if(c===xd.BIN){let l=xo+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Th=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=et.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(let h in o){let u=Ch[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=Ch[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[e.attributes[h]],d=Tr[f.componentType];l[u]=d.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){i.decodeDracoFile(h,function(d){for(let m in d.attributes){let x=d.attributes[m],g=c[m];g!==void 0&&(x.normalized=g)}u(d)},a,l,Lt,f)})})}},wh=class{constructor(){this.name=et.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Ah=class{constructor(){this.name=et.KHR_MESH_QUANTIZATION}},Ga=class extends ts{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-t,u=(n-t)/h,f=u*u,d=f*u,m=e*l,x=m-l,g=-2*d+3*f,p=d-f,_=1-g,v=p-f+u;for(let M=0;M!==a;M++){let C=o[x+M+a],b=o[x+M+c]*h,R=o[m+M+a],L=o[m+M]*h;r[M]=_*C+v*b+g*R+p*L}return r}},Z_=new Pt,Rh=class extends Ga{interpolate_(e,t,n,i){let r=super.interpolate_(e,t,n,i);return Z_.fromArray(r).normalize().toArray(r),r}},On={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Tr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},vd={9728:Ut,9729:bt,9984:sa,9985:Vl,9986:Br,9987:qn},_d={33071:pn,33648:Yr,10497:Pi},sh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ch={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},os={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},K_={CUBICSPLINE:void 0,LINEAR:Ms,STEP:or},rh={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function J_(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Bt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Ln})),s.DefaultMaterial}function As(s,e,t){for(let n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function as(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function $_(s,e,t){let n=!1,i=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);let o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(f)}if(i){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],f=l[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=f),s.morphTargetsRelative=!0,s})}function j_(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Q_(s){let e,t=s.extensions&&s.extensions[et.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+oh(t.attributes):e=s.indices+":"+oh(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+oh(s.targets[n]);return e}function oh(s){let e="",t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Ph(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ey(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}var ty=new Pe,Lh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Y_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&r<98?this.textureLoader=new bs(this.options.manager):this.textureLoader=new Da(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new xr(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return As(r,a,i),as(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){let o=t[i].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),r=(o,a)=>{let c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(let[l,h]of o.children.entries())r(h,a.children[l])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[et.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,o){n.load(ss.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let o=sh[i.type],a=Tr[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new nt(l,o,c))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],c=sh[i.type],l=Tr[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0,x,g;if(d&&d!==u){let p=Math.floor(f/d),_="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count,v=t.cache.get(_);v||(x=new l(a,p*d,i.count*d/h),v=new $r(x,d/h),t.cache.add(_,v)),g=new jr(v,c,f%d/h,m)}else a===null?x=new l(i.count*c):x=new l(a,f,i.count*c),g=new nt(x,c,m);if(i.sparse!==void 0){let p=sh.SCALAR,_=Tr[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,C=new _(o[1],v,i.sparse.count*p),b=new l(o[2],M,i.sparse.count*c);a!==null&&(g=new nt(g.array.slice(),g.itemSize,g.normalized));for(let R=0,L=C.length;R<L;R++){let y=C[R];if(g.setX(y,b[R*c]),c>=2&&g.setY(y,b[R*c+1]),c>=3&&g.setZ(y,b[R*c+2]),c>=4&&g.setW(y,b[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return g})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let i=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=vd[f.magFilter]||bt,h.minFilter=vd[f.minFilter]||qn,h.wrapS=_d[f.wrapS]||Pi,h.wrapT=_d[f.wrapT]||Pi,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let o=i.images[e],a=self.URL||self.webkitURL,c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;let f=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(c).then(function(u){return new Promise(function(f,d){let m=f;t.isImageBitmapLoader===!0&&(m=function(x){let g=new tn(x);g.needsUpdate=!0,f(g)}),t.load(ss.resolveURL(u,r.path),m,void 0,d)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),u.userData.mimeType=o.mimeType||ey(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[et.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[et.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let c=r.associations.get(o);o=r.extensions[et.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new eo,wn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,c=this.cache.get(a);c||(c=new Ss,wn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Bt}loadMaterial(e){let t=this,n=this.json,i=this.extensions,r=n.materials[e],o,a={},c=r.extensions||{},l=[];if(c[et.KHR_MATERIALS_UNLIT]){let u=i[et.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new ge(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Lt),a.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,_t)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=en);let h=r.alphaMode||rh.OPAQUE;if(h===rh.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===rh.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==zt&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new oe(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==zt&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==zt){let u=r.emissiveFactor;a.emissive=new ge().setRGB(u[0],u[1],u[2],Lt)}return r.emissiveTexture!==void 0&&o!==zt&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,_t)),Promise.all(l).then(function(){let u=new o(a);return r.name&&(u.name=r.name),as(u,r),t.associations.set(u,{materials:e}),r.extensions&&As(i,u,r),u})}createUniqueName(e){let t=vt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[et.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return yd(c,a,t)})}let o=[];for(let a=0,c=e.length;a<c;a++){let l=e[a],h=Q_(l),u=i[h];if(u)o.push(u.promise);else{let f;l.extensions&&l.extensions[et.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=yd(new pt,l,t),i[h]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){let h=o[c].material===void 0?J_(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let d=0,m=h.length;d<m;d++){let x=h[d],g=o[d],p,_=l[d];if(g.mode===On.TRIANGLES||g.mode===On.TRIANGLE_STRIP||g.mode===On.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new _a(x,_):new Ce(x,_),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===On.TRIANGLE_STRIP?p.geometry=ih(p.geometry,Fa):g.mode===On.TRIANGLE_FAN&&(p.geometry=ih(p.geometry,ao));else if(g.mode===On.LINES)p=new Qi(x,_);else if(g.mode===On.LINE_STRIP)p=new pr(x,_);else if(g.mode===On.LINE_LOOP)p=new Ma(x,_);else if(g.mode===On.POINTS)p=new Es(x,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&j_(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),as(p,r),g.extensions&&As(i,p,g),t.assignFinalMaterial(p),u.push(p)}for(let d=0,m=u.length;d<m;d++)t.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return r.extensions&&As(i,u[0],r),u[0];let f=new At;r.extensions&&As(i,f,r),t.associations.set(f,{meshes:e});for(let d=0,m=u.length;d<m;d++)f.add(u[d]);return f})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Gt(Ts.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new ji(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),as(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){let u=o[l];if(u){a.push(u);let f=new Pe;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new ya(a,c)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,f=i.channels.length;u<f;u++){let d=i.channels[u],m=i.samplers[d.sampler],x=d.target,g=x.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,_=i.parameters!==void 0?i.parameters[m.output]:m.output;x.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",_)),l.push(m),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let f=u[0],d=u[1],m=u[2],x=u[3],g=u[4],p=[];for(let _=0,v=f.length;_<v;_++){let M=f[_],C=d[_],b=m[_],R=x[_],L=g[_];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();let y=n._createAnimationTracks(M,C,b,R,L);if(y)for(let E=0;E<y.length;E++)p.push(y[E])}return new gr(r,void 0,p)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));let c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){let h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,ty)});for(let d=0,m=u.length;d<m;d++)h.add(u[d]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(l){return i._getNodeRef(i.cameraCache,r.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Qr:l.length>1?h=new At:l.length===1?h=l[0]:h=new dt,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),as(h,r),r.extensions&&As(n,h,r),r.matrix!==void 0){let u=new Pe;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,r=new At;n.name&&(r.name=i.createUniqueName(n.name)),as(r,n),n.extensions&&As(t,r,n);let o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);let l=h=>{let u=new Map;for(let[f,d]of i.associations)(f instanceof wn||f instanceof tn)&&u.set(f,d);return h.traverse(f=>{let d=i.associations.get(f);d!=null&&u.set(f,d)}),u};return i.associations=l(r),r})}_createAnimationTracks(e,t,n,i,r){let o=[],a=e.name?e.name:e.uuid,c=[];os[r.path]===os.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(a);let l;switch(os[r.path]){case os.weights:l=Ui;break;case os.rotation:l=oi;break;case os.position:case os.scale:l=Ni;break;default:switch(n.itemSize){case 1:l=Ui;break;case 2:case 3:default:l=Ni;break}break}let h=i.interpolation!==void 0?K_[i.interpolation]:Ms,u=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){let m=new l(c[f]+"."+os[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),o.push(m)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Ph(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof oi?Rh:Ga;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function ny(s,e,t){let n=e.attributes,i=new gn;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new w(c[0],c[1],c[2]),new w(l[0],l[1],l[2])),a.normalized){let h=Ph(Tr[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new w,c=new w;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],d=f.min,m=f.max;if(d!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(m[2]))),f.normalized){let x=Ph(Tr[f.componentType]);c.multiplyScalar(x)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;let o=new Tn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function yd(s,e,t){let n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){s.setAttribute(a,c)})}for(let o in n){let a=Ch[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){let o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return at.workingColorSpace!==Lt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${at.workingColorSpace}" not supported.`),as(s,e),ny(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?$_(s,e.targets,t):s})}var Wa=class extends La{constructor(e){super(e),this.type=In}parse(e){let o=function(L,y){switch(L){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(y||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(y||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(y||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(y||""))}},h=`
`,u=function(L,y,E){y=y||1024;let V=L.pos,$=-1,P=0,z="",G=String.fromCharCode.apply(null,new Uint16Array(L.subarray(V,V+128)));for(;0>($=G.indexOf(h))&&P<y&&V<L.byteLength;)z+=G,P+=G.length,V+=128,G+=String.fromCharCode.apply(null,new Uint16Array(L.subarray(V,V+128)));return-1<$?(E!==!1&&(L.pos+=P+$+1),z+G.slice(0,$)):!1},f=function(L){let y=/^#\?(\S+)/,E=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,F=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,V=/^\s*FORMAT=(\S+)\s*$/,$=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,P={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},z,G;for((L.pos>=L.byteLength||!(z=u(L)))&&o(1,"no header found"),(G=z.match(y))||o(3,"bad initial token"),P.valid|=1,P.programtype=G[1],P.string+=z+`
`;z=u(L),z!==!1;){if(P.string+=z+`
`,z.charAt(0)==="#"){P.comments+=z+`
`;continue}if((G=z.match(E))&&(P.gamma=parseFloat(G[1])),(G=z.match(F))&&(P.exposure=parseFloat(G[1])),(G=z.match(V))&&(P.valid|=2,P.format=G[1]),(G=z.match($))&&(P.valid|=4,P.height=parseInt(G[1],10),P.width=parseInt(G[2],10)),P.valid&2&&P.valid&4)break}return P.valid&2||o(3,"missing format specifier"),P.valid&4||o(3,"missing image size specifier"),P},d=function(L,y,E){let F=y;if(F<8||F>32767||L[0]!==2||L[1]!==2||L[2]&128)return new Uint8Array(L);F!==(L[2]<<8|L[3])&&o(3,"wrong scanline width");let V=new Uint8Array(4*y*E);V.length||o(4,"unable to allocate buffer space");let $=0,P=0,z=4*F,G=new Uint8Array(4),I=new Uint8Array(z),N=E;for(;N>0&&P<L.byteLength;){P+4>L.byteLength&&o(1),G[0]=L[P++],G[1]=L[P++],G[2]=L[P++],G[3]=L[P++],(G[0]!=2||G[1]!=2||(G[2]<<8|G[3])!=F)&&o(3,"bad rgbe scanline format");let O=0,W;for(;O<z&&P<L.byteLength;){W=L[P++];let J=W>128;if(J&&(W-=128),(W===0||O+W>z)&&o(3,"bad scanline data"),J){let U=L[P++];for(let K=0;K<W;K++)I[O++]=U}else I.set(L.subarray(P,P+W),O),O+=W,P+=W}let k=F;for(let J=0;J<k;J++){let U=0;V[$]=I[J+U],U+=F,V[$+1]=I[J+U],U+=F,V[$+2]=I[J+U],U+=F,V[$+3]=I[J+U],$+=4}N--}return V},m=function(L,y,E,F){let V=L[y+3],$=Math.pow(2,V-128)/255;E[F+0]=L[y+0]*$,E[F+1]=L[y+1]*$,E[F+2]=L[y+2]*$,E[F+3]=1},x=function(L,y,E,F){let V=L[y+3],$=Math.pow(2,V-128)/255;E[F+0]=lo.toHalfFloat(Math.min(L[y+0]*$,65504)),E[F+1]=lo.toHalfFloat(Math.min(L[y+1]*$,65504)),E[F+2]=lo.toHalfFloat(Math.min(L[y+2]*$,65504)),E[F+3]=lo.toHalfFloat(1)},g=new Uint8Array(e);g.pos=0;let p=f(g),_=p.width,v=p.height,M=d(g.subarray(g.pos),_,v),C,b,R;switch(this.type){case mn:R=M.length/4;let L=new Float32Array(R*4);for(let E=0;E<R;E++)m(M,E*4,L,E*4);C=L,b=mn;break;case In:R=M.length/4;let y=new Uint16Array(R*4);for(let E=0;E<R;E++)x(M,E*4,y,E*4);C=y,b=In;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:_,height:v,data:C,header:p.string,gamma:p.gamma,exposure:p.exposure,type:b}}setDataType(e){return this.type=e,this}load(e,t,n,i){function r(o,a){switch(o.type){case mn:case In:o.colorSpace=Lt,o.minFilter=bt,o.magFilter=bt,o.generateMipmaps=!1,o.flipY=!0;break}t&&t(o,a)}return super.load(e,r,n,i)}};var Ih=window.TRENCH_ASSET_BASE||"assets/",jt={},$n={},Xa={hdr:null,pmrem:null},Sd=["mud","earth","scorched","planks","boards","iron","hessian","wool","leather","helmet","rust","bark"],Ed=["rifle","gasmask","crate_mil","ammo_box","lantern","spade","dead_tree","log","stump","barrel","bucket","can","root","rock","rat","stove","crate","branches","grenade","soldier","xbot"];async function bd(s,e){let t=Sd.length*3+Ed.length+1,n=0,i=h=>{n++,e&&e(n/t,h)},r=Math.min(8,s.capabilities.getMaxAnisotropy()),o=new bs,a=new Va;a.register(h=>(h.textureLoader=new bs(h.options.manager),{name:"TRENCH_img_textures"}));let c=h=>new Promise((u,f)=>o.load(h,u,void 0,f)),l=[];for(let h of Sd){jt[h]={};for(let u of["d","n","arm"])l.push(c(`${Ih}tex/${h}_${u}.webp`).then(f=>{f.wrapS=f.wrapT=Pi,f.anisotropy=r,f.colorSpace=u==="d"?_t:_n,jt[h][u]=f,i(h)}))}for(let h of Ed)l.push(a.loadAsync(`${Ih}models/${h}.glb`).then(u=>{u.scene.traverse(f=>{f.isMesh&&f.material&&(f.material.envMapIntensity=.6,f.material.map&&(f.material.map.anisotropy=r))}),$n[h]=u,i(h)}));l.push(new Wa().loadAsync(`${Ih}hdri/night.hdr`).then(h=>{h.mapping=qr,Xa.hdr=h;let u=new hr(s);Xa.pmrem=u.fromEquirectangular(h).texture,u.dispose(),i("hdri")})),await Promise.all(l)}function jn(s,e,t){return s.userData.patches=s.userData.patches||[],s.userData.patches.push([e,t]),s.onBeforeCompile=(n,i)=>{for(let[,r]of s.userData.patches)r(n,i)},s.customProgramCacheKey=()=>s.userData.patches.map(n=>n[0]).join("|"),s.needsUpdate=!0,s}function Td(s){return jn(s,"instuv",e=>{e.vertexShader=e.vertexShader.replace("#include <uv_pars_vertex>",`#include <uv_pars_vertex>
attribute vec2 instUv;`).replace("#include <uv_vertex>",`#define uv (uv + instUv)
#include <uv_vertex>
#undef uv`)})}function Uh(s){return jn(s,"vm",e=>{e.vertexShader=e.vertexShader.replace("#include <project_vertex>",`#include <project_vertex>
gl_Position.z = -gl_Position.w + (gl_Position.z + gl_Position.w) * 0.04;`)})}function Rs(s,e=.6,t=.6){return jn(s,"wet"+e+t,n=>{n.vertexShader=n.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vWPosW;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
vWPosW = (modelMatrix * vec4(transformed, 1.0)).xyz;
#ifdef USE_INSTANCING
vWPosW = (modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
#endif`),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vWPosW;`).replace("#include <roughnessmap_fragment>",`#include <roughnessmap_fragment>
        float wetK = ${e.toFixed(3)} * (1.0 - smoothstep(0.0, ${t.toFixed(3)}, vWPosW.y)) + ${(e*.35).toFixed(3)};
        roughnessFactor = mix(roughnessFactor, 0.12, wetK * 0.8);
        diffuseColor.rgb *= 1.0 - wetK * 0.45;`)})}var Dh=new Map;function vo(s,e,t){if(e===1&&t===1)return s;let n=s.uuid+e+","+t;if(!Dh.has(n)){let i=s.clone();i.repeat.set(e,t),i.needsUpdate=!0,Dh.set(n,i)}return Dh.get(n)}function qt(s,e={}){let t=jt[s],n=e.repeat?e.repeat[0]:1,i=e.repeat?e.repeat[1]:1,r=new Bt({map:vo(t.d,n,i),normalMap:e.noNormal?null:vo(t.n,n,i),roughnessMap:vo(t.arm,n,i),aoMap:vo(t.arm,n,i),metalnessMap:e.metal?vo(t.arm,n,i):null,metalness:e.metal?1:0,roughness:e.roughness??1,color:e.color!==void 0?new ge(e.color):new ge(1,1,1),envMapIntensity:e.env??.5,side:e.side??Ln});return e.normalScale&&r.normalScale.set(e.normalScale,e.normalScale),r.aoMapIntensity=e.ao??1,r}function zn(s,{cast:e=!0,receive:t=!0,patch:n}={}){let r=$n[s].scene.clone(!0);return r.traverse(o=>{o.isMesh&&(o.castShadow=e,o.receiveShadow=t,n&&(o.material=o.material.clone(),n(o.material,o)))}),r}var qa={uTime:{value:0},uRain:{value:1}},Ad=`
varying vec3 vTPos;
varying vec3 vTNrm;
uniform float uTime;
uniform float uRain;
float tPuddle;
vec3 tAlbedo; vec3 tNormalW; float tRough; float tAO;
float th12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float tvn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3. - 2. * f);
  return mix(mix(th12(i), th12(i + vec2(1, 0)), u.x), mix(th12(i + vec2(0, 1)), th12(i + vec2(1, 1)), u.x), u.y); }
vec3 tUnpack(vec4 t){ return t.xyz * 2.0 - 1.0; }
// \u043A\u0440\u0443\u0433\u0438 \u043E\u0442 \u043A\u0430\u043F\u0435\u043B\u044C \u0434\u043E\u0436\u0434\u044F \u043D\u0430 \u0432\u043E\u0434\u0435
vec2 tRipples(vec2 p, float t) {
  vec2 n = vec2(0.0);
  for (int i = 0; i < 3; i++) {
    vec2 q = p * 2.8 + float(i) * 7.31;
    vec2 id = floor(q); vec2 f = fract(q) - 0.5;
    float h = th12(id + float(i) * 3.1);
    f -= (vec2(th12(id + 1.7), th12(id + 5.3)) - 0.5) * 0.5;
    float ph = fract(t * (0.7 + h * 0.6) + h);
    float rad = ph * 0.48;
    float r = length(f);
    float ring = sin((r - rad) * 60.0) * smoothstep(rad + 0.05, rad, r) * smoothstep(rad - 0.14, rad, r) * (1.0 - ph);
    n += f / max(r, 1e-3) * ring;
  }
  return n * 0.3;
}
`,iy=`
uniform sampler2D tMudD, tMudN, tMudA, tEarD, tEarN, tEarA, tTopD, tTopN, tTopA;
vec3 tBlendW(vec3 n){ vec3 b = pow(abs(n), vec3(4.0)); return b / (b.x + b.y + b.z); }
void tTri(sampler2D D, sampler2D N, sampler2D A, vec3 p, vec3 nrm, float sc, out vec3 alb, out vec3 wn, out vec3 arm) {
  vec3 bw = tBlendW(nrm);
  vec3 s = sign(nrm);
  vec2 uvX = p.zy * sc; vec2 uvY = p.xz * sc; vec2 uvZ = p.xy * sc;
  uvX.x *= s.x; uvY.x *= s.y; uvZ.x *= -s.z;
  alb = texture2D(D, uvX).rgb * bw.x + texture2D(D, uvY).rgb * bw.y + texture2D(D, uvZ).rgb * bw.z;
  arm = texture2D(A, uvX).rgb * bw.x + texture2D(A, uvY).rgb * bw.y + texture2D(A, uvZ).rgb * bw.z;
  vec3 nX = tUnpack(texture2D(N, uvX)), nY = tUnpack(texture2D(N, uvY)), nZ = tUnpack(texture2D(N, uvZ));
  nX.x *= s.x; nY.x *= s.y; nZ.x *= -s.z;
  nX = vec3(nX.xy + nrm.zy, abs(nX.z) * nrm.x);
  nY = vec3(nY.xy + nrm.xz, abs(nY.z) * nrm.y);
  nZ = vec3(nZ.xy + nrm.xy, abs(nZ.z) * nrm.z);
  wn = normalize(nX.zyx * bw.x + nY.xzy * bw.y + nZ.xyz * bw.z);
}
void tTop(sampler2D D, sampler2D N, sampler2D A, vec2 uv, vec3 nrm, out vec3 alb, out vec3 wn, out vec3 arm) {
  alb = texture2D(D, uv).rgb; arm = texture2D(A, uv).rgb;
  vec3 tn = tUnpack(texture2D(N, uv));
  tn = vec3(tn.xy + nrm.xz, abs(tn.z) * nrm.y);
  wn = normalize(tn.xzy);
}
void terrainSample() {
  vec3 p = vTPos; vec3 g = normalize(vTNrm);
  float h = p.y;
  // \u0434\u043D\u043E: \u0433\u0440\u044F\u0437\u044C, \u0434\u0432\u0435 \u0448\u043A\u0430\u043B\u044B \u043F\u0440\u043E\u0442\u0438\u0432 \u043F\u043E\u0432\u0442\u043E\u0440\u043E\u0432
  vec3 aF, nF, mF, aF2, nF2, mF2;
  tTop(tMudD, tMudN, tMudA, p.xz * 0.6, g, aF, nF, mF);
  tTop(tMudD, tMudN, tMudA, mat2(0.8, -0.6, 0.6, 0.8) * p.xz * 0.27 + 0.37, g, aF2, nF2, mF2);
  float ab = smoothstep(0.3, 0.7, tvn(p.xz * 0.3));
  aF = mix(aF, aF2, ab); nF = normalize(mix(nF, nF2, ab)); mF = mix(mF, mF2, ab);
  // \u0441\u0442\u0435\u043D\u043A\u0438: \u0437\u0435\u043C\u043B\u044F triplanar
  vec3 aW, nW, mW;
  tTri(tEarD, tEarN, tEarA, p, g, 0.55, aW, nW, mW);
  // \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u044C: \u0432\u044B\u0436\u0436\u0435\u043D\u043D\u0430\u044F \u0437\u0435\u043C\u043B\u044F
  vec3 aT, nT, mT;
  tTop(tTopD, tTopN, tTopA, p.xz * 0.3, g, aT, nT, mT);
  vec3 aT2, nT2, mT2;
  tTop(tTopD, tTopN, tTopA, mat2(0.6, 0.8, -0.8, 0.6) * p.xz * 0.11, g, aT2, nT2, mT2);
  float tb = smoothstep(0.35, 0.65, tvn(p.xz * 0.08 + 3.0));
  aT = mix(aT, aT2, tb); nT = normalize(mix(nT, nT2, tb)); mT = mix(mT, mT2, tb);
  aT *= vec3(0.42, 0.37, 0.32);   // \u043F\u0435\u043F\u0435\u043B + \u0433\u0440\u044F\u0437\u044C: \u0442\u0435\u043C\u043D\u0435\u0435 \u0438 \u0442\u0435\u043F\u043B\u0435\u0435, \u0438\u043D\u0430\u0447\u0435 \u0432 \u043B\u0443\u043D\u043D\u043E\u043C \u0441\u0432\u0435\u0442\u0435 \u043F\u043E\u0445\u043E\u0436\u0435 \u043D\u0430 \u0438\u043D\u0435\u0439
  // \u0432\u0435\u0441\u0430 \u0441\u043B\u043E\u0451\u0432 \u0441 \u0443\u0447\u0451\u0442\u043E\u043C \xAB\u0432\u044B\u0441\u043E\u0442\u044B\xBB \u0442\u0435\u043A\u0441\u0442\u0443\u0440\u044B
  float hn = (mW.r - 0.5) * 0.25;
  float wF = 1.0 - smoothstep(0.06, 0.32, h + hn);
  float wT = smoothstep(${(2.55-.45).toFixed(2)}, ${(2.55-.1).toFixed(2)}, h - hn) * smoothstep(0.4, 0.75, g.y);
  wT = max(wT, smoothstep(${(2.55+.3).toFixed(2)}, ${(2.55+.6).toFixed(2)}, h));
  float wWall = clamp(1.0 - wF - wT, 0.0, 1.0);
  float sum = wF + wT + wWall;
  wF /= sum; wT /= sum; wWall /= sum;
  vec3 alb = aF * wF + aW * wWall + aT * wT;
  vec3 wn = normalize(nF * wF + nW * wWall + nT * wT);
  vec3 arm = mF * wF + mW * wWall + mT * wT;
  // \u043A\u0440\u0443\u043F\u043D\u044B\u0435 \u043F\u044F\u0442\u043D\u0430 \u0446\u0432\u0435\u0442\u0430 \u0438 \u0441\u044B\u0440\u043E\u0441\u0442\u0438
  float macro = tvn(p.xz * 0.12) * 0.6 + tvn(p.xz * 0.5) * 0.4;
  alb *= mix(0.78, 1.12, macro);
  float wet = clamp(wF * 0.85 + (1.0 - smoothstep(0.0, 1.4, h)) * 0.45 + 0.22 * uRain + (macro - 0.5) * 0.3, 0.0, 1.0);
  wet *= 1.0 - smoothstep(${(2.55+.2).toFixed(2)}, ${(2.55+1.5).toFixed(2)}, h) * 0.6;
  // \u043B\u0443\u0436\u0438 \u0432 \u043D\u0438\u0437\u0438\u043D\u0430\u0445 \u0434\u043D\u0430
  float pud = wF * smoothstep(0.052, 0.07, -h + (mF.r - 0.6) * 0.03 + (tvn(p.xz * 0.7) - 0.5) * 0.03);
  alb *= mix(1.0, 0.58, wet);
  alb = mix(alb, alb * 0.22 + vec3(0.006, 0.005, 0.004), pud);
  float rough = mix(arm.g, arm.g * 0.42 + 0.08, wet);
  rough = mix(rough, 0.03, pud);
  vec2 rip = tRipples(p.xz, uTime) * uRain;
  vec3 wN = normalize(vec3(rip.x, 1.0, rip.y));
  tNormalW = normalize(mix(wn, wN, pud));
  tAlbedo = alb;
  tRough = clamp(rough, 0.02, 1.0);
  tAO = mix(arm.r, 1.0, pud);
  tPuddle = pud;
}
`;function sy(s){return jn(s,"terrain",e=>{Object.assign(e.uniforms,qa,{tMudD:{value:jt.mud.d},tMudN:{value:jt.mud.n},tMudA:{value:jt.mud.arm},tEarD:{value:jt.earth.d},tEarN:{value:jt.earth.n},tEarA:{value:jt.earth.arm},tTopD:{value:jt.scorched.d},tTopN:{value:jt.scorched.n},tTopA:{value:jt.scorched.arm}}),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vTPos;
varying vec3 vTNrm;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
vTPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
vTNrm = normalize(mat3(modelMatrix) * objectNormal);`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
`+Ad+iy).replace("#include <map_fragment>",`terrainSample();
diffuseColor.rgb *= tAlbedo;`).replace("#include <roughnessmap_fragment>","float roughnessFactor = tRough;").replace("#include <metalnessmap_fragment>","float metalnessFactor = 0.0;").replace("#include <normal_fragment_maps>","normal = normalize((viewMatrix * vec4(tNormalW, 0.0)).xyz);").replace("#include <aomap_fragment>",`reflectedLight.indirectDiffuse *= tAO;
reflectedLight.indirectSpecular *= mix(tAO, 1.0, 0.4);`).replace("#include <opaque_fragment>","gl_FragColor = vec4(outgoingLight, 1.0 - tPuddle * 0.85);")})}function ry(){let s=new Bt({color:1511948,roughness:.04,metalness:0,envMapIntensity:1});return jn(s,"water",e=>{Object.assign(e.uniforms,qa),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vTPos;
varying vec3 vTNrm;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
vTPos = (modelMatrix * vec4(transformed, 1.0)).xyz;
vTNrm = vec3(0.0, 1.0, 0.0);`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
`+Ad).replace("#include <normal_fragment_maps>",`vec2 rip = tRipples(vTPos.xz, uTime) * uRain;
normal = normalize((viewMatrix * vec4(normalize(vec3(rip.x, 1.0, rip.y)), 0.0)).xyz);`).replace("#include <opaque_fragment>","gl_FragColor = vec4(outgoingLight, 0.12);")})}function wd(s,e,t,n,i,r,o){let a=Math.ceil((t-s)/i)+1,c=Math.ceil((n-e)/i)+1,l=(t-s)/(a-1),h=(n-e)/(c-1),u=new Float32Array(a*c);for(let g=0;g<c;g++)for(let p=0;p<a;p++)u[g*a+p]=o(s+p*l,e+g*h);let f=new Float32Array(a*c*3),d=new Float32Array(a*c*3);for(let g=0;g<c;g++)for(let p=0;p<a;p++){let _=g*a+p;f[_*3]=s+p*l,f[_*3+1]=u[_],f[_*3+2]=e+g*h;let v=u[g*a+Math.max(0,p-1)],M=u[g*a+Math.min(a-1,p+1)],C=u[Math.max(0,g-1)*a+p],b=u[Math.min(c-1,g+1)*a+p],R=(M-v)/(2*l),L=(b-C)/(2*h),y=Math.hypot(R,1,L);d[_*3]=-R/y,d[_*3+1]=1/y,d[_*3+2]=-L/y}let m=[];for(let g=0;g<c-1;g++)for(let p=0;p<a-1;p++){let _=s+(p+.5)*l,v=e+(g+.5)*h;if(r&&r(_,v))continue;let M=g*a+p,C=M+1,b=M+a,R=b+1;Math.abs(u[M]-u[R])<Math.abs(u[C]-u[b])?m.push(M,b,R,M,R,C):m.push(M,b,C,C,b,R)}let x=new pt;return x.setAttribute("position",new nt(f,3)),x.setAttribute("normal",new nt(d,3)),x.setIndex(new nt(a*c>65535?new Uint32Array(m):new Uint16Array(m),1)),x.computeBoundingSphere(),x.computeBoundingBox(),x}function Rd(s,e){let t=44*2,n=30*2,i=sy(new Bt({color:16777215,roughness:1,metalness:0,envMapIntensity:.35})),r=-4,o=-4,a=t+4,c=n+4,l=new Ce(wd(r,o,a,c,e.terrainRes,null,rt),i);l.receiveShadow=!0,l.castShadow=!0,s.add(l);let h=i.clone();h.onBeforeCompile=i.onBeforeCompile,h.customProgramCacheKey=i.customProgramCacheKey,h.userData=i.userData,h.polygonOffset=!0,h.polygonOffsetFactor=2,h.polygonOffsetUnits=2;let u=new Ce(wd(-110,-120,t+110,n+90,1,(m,x)=>m>r+.6&&m<a-.6&&x>o+.6&&x<c-.6,rt),h);u.receiveShadow=!0,s.add(u);let f=ry(),d=new Aa(1,28);d.rotateX(-Math.PI/2);for(let m of We.craters){if(m.d<.55)continue;let x=rt(m.x,m.z),g=new Ce(d,f),p=m.r*.62;g.scale.set(p,1,p),g.position.set(m.x,x+m.d*.28,m.z),g.receiveShadow=!0,s.add(g)}return{inner:l,outer:u,mat:i}}function Cd(){let s=44*2,e=30*2,t=384,n=288,i=-8,r=-8,o=s+8,a=e+8,c=new Float32Array(t*n);for(let h=0;h<n;h++)for(let u=0;u<t;u++)c[h*t+u]=rt(i+(u+.5)/t*(o-i),r+(h+.5)/n*(a-r));let l=new dr(c,t,n,Wl,mn);return l.minFilter=l.magFilter=bt,l.needsUpdate=!0,{texture:l,bounds:new ft(i,r,o-i,a-r)}}var Yt={lanterns:[],crates:[],colliders:[],fires:[],rats:[]},fi=new Pe,di=new Pt,pi=new w,mi=new w,gi=new $i,Nh=new Map;function Ya(s){if(!Nh.has(s)){let e=new gn().setFromObject($n[s].scene);Nh.set(s,-e.min.y)}return Nh.get(s)}function Fh(s,e,t,n,i,r,o,a){let c=new Zn(s,e,t,n);c.translate(0,e/2,0);let l=c.attributes.position,h=c.attributes.uv,u=a(),f=a();for(let d=0;d<l.count;d++){let m=l.getX(d),x=l.getY(d);l.setZ(d,Math.sin((m/s+.5)*Math.PI)*o*(.6+.4*Math.sin(x*2.1+u*6))+(a()-.5)*.006),h.setXY(d,m/i+u,x/r+f)}return c.computeVertexNormals(),c}function Cs(s,e,t,n,i,r=0,o=0){return gi.set(r,i,o,"YXZ"),di.setFromEuler(gi),mi.set(e,t,n),pi.set(1,1,1),fi.compose(mi,di,pi),s.applyMatrix4(fi)}function oy(){let s=new Un(.5,10,7),e=s.attributes.position;for(let n=0;n<e.count;n++){let i=e.getX(n),r=e.getY(n),o=e.getZ(n);r=Math.sign(r)*Math.min(Math.abs(r),.33)*1.2;let a=Math.hypot(i,o),c=1+.06*Math.sin(i*9)*Math.cos(o*7)+.04*Math.sin(r*12);e.setXYZ(n,i*.62*c,r*.3,o*.34*c*(1-.08*Math.abs(r)))}s.computeVertexNormals();let t=s.attributes.uv;for(let n=0;n<t.count;n++)t.setXY(n,t.getX(n)*3,t.getY(n)*1.5);return s}function Pd(s,e){let t=ho(We.seed*31+7),n=(I,N)=>ve(I,N,t()),i=[],r=[],o=[],a=new Map,c=[],l=[];for(let I=0;I<30;I++)for(let N=0;N<44;N++)if(!st(N,I))for(let O=0;O<4;O++){let W=Er[An(N,I)*4+O];if(!W)continue;let[k,J]=rn[O],U=ct(N)+k*2/2,K=ct(I)+J*2/2,ie=Math.atan2(-k,-J),ue=-J,he=k,we=.02,fe=U-k*we,de=K-J*we;if(W===2){let Se=t()<.15?n(1.3,1.9):n(2.15,2.45),B=Fh(2+.06,Se,6,4,2,2,n(.01,.05),t);i.push(Cs(B,fe,-.12,de,ie,-n(.02,.08),n(-.015,.015))),Se>2&&o.push(Cs(new sn(.05,.055,2+.25,7).rotateZ(Math.PI/2),fe+k*0-k*.06,Se-.25,de-J*.06,ie)),t()<.35&&l.push({x:U-k*.14+ue*n(-.5,.5),z:K-J*.14+he*n(-.5,.5),yaw:ie,cx:N,cz:I})}else if(W===3){for(let Se=-1;Se<=1;Se+=2){let B=n(2,2.45),ht=Fh(1.08,B,4,3,1.6,1.6,n(.015,.06),t);Cs(ht,fe+ue*Se*.48-k*(Se>0?.012:0),-.12,de+he*Se*.48-J*(Se>0?.012:0),ie+n(-.04,.04),-n(.02,.1),n(-.03,.03)),r.push(ht)}t()<.25&&l.push({x:U-k*.14,z:K-J*.14,yaw:ie,cx:N,cz:I})}else if(W===4){let Se=Math.floor(n(9,13));for(let B=0;B<Se;B++){let ht=-.02+B*.155,Ee=B*.018,De=B%2*.32;for(let Me=0;Me<4;Me++){let ot=-2/2+De+Me*.66-.05;ot>2/2+.05||ot<-2/2-.25||c.push([U-k*(.2-Ee)+ue*ot,ht+.07,K-J*(.2-Ee)+he*ot,ie+n(-.08,.08),n(.92,1.08),n(.9,1.1),n(.9,1.08),t(),!1])}}}if(W===2||W===3)for(let Se of[-1,1]){let B=U+ue*Se*2/2-k*.07,ht=K+he*Se*2/2-J*.07,Ee=Math.round(B*10)+","+Math.round(ht*10);a.has(Ee)||a.set(Ee,[B,ht,n(-.06,.06),n(-.06,.03),n(2.5,3)])}if(t()<.8){let Se=br(U+k*.5,K+J*.5),B=rt(U+k*.55,K+J*.55);if(Se>0&&B>2.55-.3){let ht=O===3?2:1;for(let Ee=0;Ee<ht+(t()<.3?1:0);Ee++)for(let De=0;De<3;De++){let Me=-2/2+.36+De*.66+Ee%2*.3+n(-.05,.05),ot=U+k*(.45+Ee*.04)+ue*Me,ke=K+J*(.45+Ee*.04)+he*Me;c.push([ot,rt(ot,ke)+.07+Ee*.15,ke,ie+n(-.12,.12),n(.92,1.1),n(.9,1.15),n(.9,1.1),t(),!0])}}}}let h=Rs(qt("planks",{env:.25}),.55,.9),u=Rs(qt("iron",{metal:!0,env:.35,color:new ge(.3,.33,.36)}),.45,.9);if(i.length){let I=new Ce(ws(i),h);I.receiveShadow=!0,s.add(I)}if(r.length){let I=new Ce(ws(r),u);I.receiveShadow=!0,s.add(I)}let f=Rs(qt("bark",{env:.2}),.5,.8);if(o.length){let I=new Ce(ws(o),f);I.receiveShadow=!0,I.castShadow=!0,s.add(I)}let d=new sn(.06,.075,1,7);d.translate(0,.5,0);let m=new Di(d,f,a.size),x=0;for(let[I,N,O,W,k]of a.values())gi.set(W,0,O),di.setFromEuler(gi),mi.set(I,-.25,N),pi.set(1,k,1),fi.compose(mi,di,pi),m.setMatrixAt(x++,fi);m.castShadow=!0,m.receiveShadow=!0,s.add(m);let g=new xn(.64,.032,.1);{let I=g.attributes.uv;for(let N=0;N<I.count;N++)I.setXY(N,I.getX(N)*.35,I.getY(N)*.08)}let p=new xn(.07,.07,2*.98),_=[],v=[];for(let I=0;I<30;I++)for(let N=0;N<44;N++){if(st(N,I)||t()<.12)continue;let O=!st(N+1,I)||!st(N-1,I),W=!st(N,I+1)||!st(N,I-1);if((!st(N+1,I)&&!st(N,I+1)&&!st(N+1,I+1)||!st(N-1,I)&&!st(N,I-1)&&!st(N-1,I-1))&&t()<.6)continue;let J=O&&!W?!0:W&&!O?!1:t()<.5,U=J?Math.PI/2:0,K=ct(N)+n(-.1,.1),ie=ct(I)+n(-.1,.1),ue=rt(K,ie)+.02,he=n(-.03,.03),we=n(-.03,.03);for(let fe of[-.27,.27]){let de=J?0:fe,Se=J?fe:0;v.push([K+de,ue+.035+he,ie+Se,U,we])}for(let fe=-4.5;fe<=4.5;fe++){if(t()<.08)continue;let de=fe*.2+n(-.015,.015),Se=J?de:0,B=J?0:de;_.push([K+Se,ue+.085+he+n(-.008,.008),ie+B,U+n(-.05,.05),we+n(-.04,.04)])}}let M=Rs(Td(qt("boards",{env:.25})),.9,.3),C=(I,N,O,W)=>{let k=new Di(I,N,O.length),J=new Float32Array(O.length*2);return O.forEach((U,K)=>{gi.set(U[4],U[3],0,"YXZ"),di.setFromEuler(gi),mi.set(U[0],U[1],U[2]),pi.set(1,1,1),fi.compose(mi,di,pi),k.setMatrixAt(K,fi),J[K*2]=t(),J[K*2+1]=t()}),I.setAttribute("instUv",new Ii(J,2)),k.receiveShadow=!0,k};s.add(C(g,M,_)),s.add(C(p,M,v));let b=[];for(let I of We.bays){if(t()<.35)continue;let N=ct(I.x0+1+Math.floor(t()*2))+n(-.4,.4),O=I.z*2,W=.2,k=3.15,J=O+.6,U=new xn(.055,k,.045);for(let K of[-.22,.22])b.push(Cs(U.clone().translate(0,k/2,0),N+K,-.05,J,0,-W));for(let K=.3;K<k-.1;K+=.32){let ie=new sn(.018,.018,.46,6).rotateZ(Math.PI/2).translate(0,K,0);b.push(Cs(ie,N,-.05,J,0,-W))}}if(b.length){let I=new Ce(ws(b),Rs(qt("boards",{env:.2,repeat:[.3,2]}),.4,.6));I.castShadow=!0,I.receiveShadow=!0,s.add(I)}let R=[],L=[];if(We.rooms.forEach((I,N)=>{let O=I.x*2,W=I.z*2,k=I.w*2,J=I.h*2,U=2.55-.12,K=.72,ie=W+J*K;for(let fe=W+.3;fe<ie;fe+=.9)L.push(Cs(new sn(.075,.085,k+.5,8).rotateZ(Math.PI/2),O+k/2,U-.08,fe,0));for(let fe=O-.1;fe<O+k;fe+=1){let de=Fh(1.06,J*K+.2,3,3,1,1.2,.02,t);de.rotateX(Math.PI/2),Cs(de,fe+.5,U,W-.1,0,0,0),R.push(de)}for(let fe=O+.3;fe<O+k;fe+=.66)for(let de=W+.3;de<ie;de+=.38)t()<.25||c.push([fe+n(-.05,.05),U+.09,de,n(-.1,.1),1,1,1,t(),!0]);let ue=O+k-.55,he=W+.5,we=zn("crate_mil");if(we.position.set(ue,rt(ue,he)+.02+Ya("crate_mil"),he),we.rotation.y=n(-.2,.2),s.add(we),Yt.crates.push({obj:we,x:ue,z:he,cd:0}),Yt.colliders.push({x:ue,z:he,r:.55}),l.push({x:O+k/2,z:W+.5,hang:U-.1,yaw:0,forced:!0}),N===1||N===4){let fe=O+.6,de=W+J-.7,Se=zn("stove");Se.position.set(fe,rt(fe,de)+Ya("stove"),de),s.add(Se),Yt.fires.push({x:fe,y:rt(fe,de)+.9,z:de}),Yt.colliders.push({x:fe,z:de,r:.42})}for(let fe=0;fe<3;fe++){let de=["barrel","crate","bucket","can"][Math.floor(t()*4)],Se=ve(O+.5,O+k-.5,t()),B=ve(W+J*.4,W+J-.4,t()),ht=zn(de);ht.position.set(Se,rt(Se,B)+Ya(de),B),ht.rotation.y=t()*6,s.add(ht),de!=="can"&&Yt.colliders.push({x:Se,z:B,r:de==="crate"?.42:.3})}}),R.length){let I=new Ce(ws(R),u.clone());I.material.side=en,I.castShadow=!0,I.receiveShadow=!0,s.add(I)}if(L.length){let I=new Ce(ws(L),f);I.castShadow=!0,I.receiveShadow=!0,s.add(I)}let y=oy(),E=Rs(qt("hessian",{color:10984064,env:.2,normalScale:1.2}),.7,1.2);for(let I of[!1,!0]){let N=c.filter(k=>k[8]===I);if(!N.length)continue;let O=new Di(y,E,N.length),W=new ge;N.forEach((k,J)=>{gi.set(0,k[3],0),di.setFromEuler(gi),mi.set(k[0],k[1],k[2]),pi.set(k[4],k[5],k[6]),fi.compose(mi,di,pi),O.setMatrixAt(J,fi);let U=k[7];W.setRGB(ve(.45,1,U),ve(.4,.92,U),ve(.32,.8,U)),O.setColorAt(J,W)}),O.castShadow=I,O.receiveShadow=!0,s.add(O)}let F=l.filter(I=>I.forced).concat(l.filter(I=>!I.forced).sort(()=>t()-.5).slice(0,12));for(let I of F){let N=zn("lantern",{cast:!1}),O=I.hang??1.85;N.position.set(I.x,O-.15,I.z),N.rotation.y=I.yaw+n(-.3,.3),N.scale.setScalar(1.15);let W=new Ce(new Un(.035,8,6),new zt({color:new ge(6,3.2,1.2)}));W.position.set(0,.11,0),N.add(W),s.add(N),Yt.lanterns.push({x:I.x,y:O-.02,z:I.z,obj:N,glow:W,ph:t()*10})}let V=["spade","barrel","crate","bucket","can","can","grenade","ammo_box","rock","crate_mil"];for(let I=0;I<30;I++)for(let N=0;N<44;N++){if(st(N,I)||t()>.13||Math.abs(N-We.spawn[0])+Math.abs(I-We.spawn[1])<2)continue;let O=rn.map((we,fe)=>fe).filter(we=>st(N+rn[we][0],I+rn[we][1]));if(!O.length)continue;let W=O[Math.floor(t()*O.length)],[k,J]=rn[W],U=V[Math.floor(t()*V.length)],K=n(-.6,.6),ie=ct(N)+k*(2/2-.32)+-J*K,ue=ct(I)+J*(2/2-.32)+k*K,he=zn(U,{cast:!["can","grenade","ammo_box","rock"].includes(U)});he.position.set(ie,rt(ie,ue)+.01+Ya(U),ue),he.rotation.y=U.startsWith("crate")||U==="barrel"?Math.atan2(-k,-J)+n(-.15,.15):t()*6,U==="spade"&&(he.position.set(ct(N)+k*(2/2-.12)-J*K,rt(ie,ue)-.05,ct(I)+J*(2/2-.12)+k*K),he.rotation.set(0,Math.atan2(k,J),0),he.rotateX(.2)),(U==="grenade"||U==="can")&&(he.rotation.z=Math.PI/2*(t()<.6?1:0)),s.add(he),["barrel","crate","crate_mil"].includes(U)&&Yt.colliders.push({x:ie,z:ue,r:U==="crate_mil"?.5:.36})}let $=0;for(let I=0;I<30&&$<18;I++)for(let N=0;N<44&&$<18;N++)if(!st(N,I))for(let O=0;O<4;O++){if(Er[An(N,I)*4+O]!==1||t()>.3)continue;let[W,k]=rn[O],J=zn("root",{cast:!0}),U=n(-.7,.7);J.position.set(ct(N)+W*(2/2+.05)-k*U,n(1.2,2.3),ct(I)+k*(2/2+.05)+W*U),J.rotation.set(n(-.6,.6),Math.atan2(-W,-k)+n(-.5,.5),n(1.2,1.9)),J.scale.setScalar(n(.6,1)),s.add(J),$++}let P=44*2,z=30*2,G=[["dead_tree",14],["stump",10],["log",10],["branches",16],["rock",18]];for(let[I,N]of G)for(let O=0,W=0;O<N&&W<400;W++){let k=n(-50,P+50),J=n(-55,z+30);if(br(k,J)<(I==="dead_tree"?3:1.6))continue;let U=zn(I,{patch:ue=>{ue.color.multiplyScalar(I==="rock"?.6:.4),ue.envMapIntensity=.2}}),K=I==="dead_tree"?n(.9,1.6):n(.8,1.3);U.scale.setScalar(K),U.rotation.y=t()*6,I==="dead_tree"&&(U.rotation.set(0,t()*6,0),U.rotateZ(Math.PI/2+n(-.2,.2))),U.position.set(k,0,J),U.updateMatrixWorld(!0);let ie=new gn().setFromObject(U);U.position.y=rt(k,J)-ie.min.y-(I==="dead_tree"?.25:.06),s.add(U),O++}ay(s,t,n);for(let I=0;I<4;I++){let N=zn("rat",{cast:!1});N.visible=!1,s.add(N),Yt.rats.push({obj:N,t:n(3,12),active:!1})}return Yt}function ay(s,e,t){let n=44*2,i=We.lines.zF*2,r=[],o=[],a=We.saps.map(f=>(f.x+.5)*2);for(let f of[i-7,i-13]){let d=null;for(let m=-10;m<n+10;m+=t(2.2,3)){let x=f+t(-.6,.6);if(a.some(v=>Math.abs(v-m)<1.6)){d=null;continue}let g=rt(m,x),p=t(1,1.35),_=t(-.12,.12);if(o.push([m,g,x,p,_]),d){for(let v of[.2,.5,.8,1.05]){let M=[d[0]+d[4]*v,d[1]+Math.min(v,d[3]),d[2]],C=[m+_*v,g+Math.min(v,p),x],b=8;for(let R=0;R<b;R++){let L=R/b,y=(R+1)/b,E=P=>-Math.sin(P*Math.PI)*.08;r.push(ve(M[0],C[0],L),ve(M[1],C[1],L)+E(L),ve(M[2],C[2],L)),r.push(ve(M[0],C[0],y),ve(M[1],C[1],y)+E(y),ve(M[2],C[2],y));let F=ve(M[0],C[0],L+.5/b),V=ve(M[1],C[1],L+.5/b)+E(L+.5/b),$=ve(M[2],C[2],L+.5/b);r.push(F,V-.025,$-.02,F,V+.025,$+.02)}}r.push(d[0],d[1]+d[3],d[2],m,g+.15,x),r.push(d[0],d[1]+.15,d[2],m,g+p,x)}d=[m,g,x,p,_]}}for(let f=0;f<14;f++){let d=t(-5,n+5),m=i-t(3,18);if(br(d,m)<1.5)continue;let x=rt(d,m),g=t(2,5),p=t(.35,.5),_=g/.25,v=null;for(let M=0;M<=_*10;M++){let C=M/10,b=C*Math.PI*2,R=[d+(C/_-.5)*g,x+p+Math.sin(b)*p,m+Math.cos(b)*p];v&&r.push(...v,...R),v=R}}let c=new pt;c.setAttribute("position",new it(r,3));let l=new Qi(c,new Ss({color:1840142}));s.add(l);let h=new sn(.012,.016,1,5);h.translate(0,.5,0);let u=new Di(h,qt("rust",{metal:!0,env:.4}),o.length);o.forEach(([f,d,m,x,g],p)=>{gi.set(0,0,-g),di.setFromEuler(gi),mi.set(f,d-.2,m),pi.set(1,x+.2,1),fi.compose(mi,di,pi),u.setMatrixAt(p,fi)}),u.castShadow=!0,s.add(u)}function Ld(s,e){for(let t of Yt.rats){if(!t.active){if(t.t-=s,t.t<=0){let o=Math.random()*Math.PI*2,a=4+Math.random()*6,c=e.x+Math.cos(o)*a,l=e.z+Math.sin(o)*a,h=[Math.floor(c/2),Math.floor(l/2)];if(st(h[0],h[1])){t.t=1;continue}let u=Math.random()*Math.PI*2;t.x=c,t.z=l,t.dir=u,t.life=1.2+Math.random()*1.5,t.active=!0,t.obj.visible=!0}continue}t.life-=s;let n=2.6,i=t.x+Math.cos(t.dir)*n*s,r=t.z+Math.sin(t.dir)*n*s;st(Math.floor(i/2),Math.floor(r/2))&&(t.dir+=Math.PI*(.5+Math.random()),i=t.x,r=t.z),t.x=i,t.z=r,t.obj.position.set(t.x,rt(t.x,t.z)+.09,t.z),t.obj.rotation.y=-t.dir+Math.PI/2,t.life<=0&&(t.active=!1,t.obj.visible=!1,t.t=6+Math.random()*14)}}var Oi={uTime:{value:0},uFlash:{value:0},uFlashDir:{value:new w(0,0,-1)},uFlare:{value:0},uFlareDir:{value:new w(0,1,0)}};function Id(s){let e=new nn({uniforms:Oi,vertexShader:`
      varying vec3 vDir;
      void main(){ vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`,fragmentShader:`
      varying vec3 vDir;
      uniform float uTime, uFlash, uFlare; uniform vec3 uFlashDir, uFlareDir;
      float h12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
      float vn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.-2.*f);
        return mix(mix(h12(i), h12(i+vec2(1,0)), u.x), mix(h12(i+vec2(0,1)), h12(i+vec2(1,1)), u.x), u.y); }
      float fbm(vec2 p){ float s = 0., a = .5; for (int i = 0; i < 5; i++){ s += vn(p) * a; p = mat2(1.6, 1.2, -1.2, 1.6) * p; a *= .5; } return s; }
      void main(){
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 col = mix(vec3(0.022, 0.020, 0.024), vec3(0.003, 0.004, 0.008), smoothstep(-0.05, 0.55, h));
        float north = max(0.0, -d.z);
        float hor = pow(1.0 - clamp(h, 0.0, 1.0), 7.0);
        col += vec3(0.16, 0.035, 0.010) * hor * (0.25 + 0.75 * north * north);
        if (h > -0.02) {
          vec2 cuv = d.xz / (max(h, 0.0) + 0.09) * 0.55 + uTime * vec2(0.006, 0.002);
          float c = smoothstep(0.38, 0.78, fbm(cuv * 1.1));
          float c2 = fbm(cuv * 3.1 + 4.0);
          float dens = clamp(c * (0.65 + 0.5 * c2), 0.0, 1.0);
          vec3 cl = vec3(0.010, 0.011, 0.015) * (0.6 + c2);
          cl += vec3(0.07, 0.018, 0.006) * north * north * (1.0 - clamp(h * 2.0, 0.0, 1.0));
          cl += uFlash * vec3(0.55, 0.32, 0.16) * pow(max(dot(d, uFlashDir), 0.0), 5.0);
          cl += uFlare * vec3(0.22, 0.26, 0.21) * (0.25 + pow(max(dot(d, uFlareDir), 0.0), 3.0));
          // \u0437\u0432\u0451\u0437\u0434\u044B \u0432 \u0440\u0430\u0437\u0440\u044B\u0432\u0430\u0445 \u0442\u0443\u0447
          vec2 sg = floor(d.xz / (h + 0.3) * 220.0);
          float star = step(0.9965, h12(sg)) * smoothstep(0.1, 0.4, h) * (0.6 + 0.4 * sin(uTime * 3.0 + h12(sg + 7.) * 40.));
          col += vec3(0.5, 0.55, 0.65) * star * (1.0 - dens) * 0.6;
          col = mix(col, cl, dens * smoothstep(-0.02, 0.12, h));
        }
        col += uFlash * vec3(0.9, 0.45, 0.2) * pow(max(dot(d, uFlashDir), 0.0), 12.0) * smoothstep(0.3, 0.0, h);
        col += uFlare * vec3(0.05, 0.06, 0.05) * smoothstep(0.4, 0.0, abs(h));
        gl_FragColor = vec4(col, 1.0);
      }`,side:ln,depthWrite:!1,depthTest:!0}),t=new Ce(new Un(450,48,24),e);t.frustumCulled=!1,t.renderOrder=-10,s.add(t);let n=720,i=300,r=uo(77),o=[],a=h=>{let u=4+r.fbm(Math.cos(h)*3+10,Math.sin(h)*3,4)*14,f=Math.floor(h/(Math.PI*2)*900),d=Math.abs(Math.sin(f*91.7)*43758.5%1),m=r.noise2(Math.cos(h)*9,Math.sin(h)*9);return m>.35&&d>.5&&(u+=(m-.35)*18*(.4+d)),d<.012&&(u+=9+d*900),u};for(let h=0;h<n;h++){let u=h/n*Math.PI*2,f=(h+1)/n*Math.PI*2,d=a(u),m=a(f),x=[Math.cos(u)*i,Math.sin(u)*i],g=[Math.cos(f)*i,Math.sin(f)*i];o.push(x[0],-40,x[1],g[0],-40,g[1],g[0],m,g[1]),o.push(x[0],-40,x[1],g[0],m,g[1],x[0],d,x[1])}let c=new pt;c.setAttribute("position",new it(o,3));let l=new Ce(c,new zt({color:new ge(.006,.006,.007),side:en,fog:!1}));return l.frustumCulled=!1,l.renderOrder=-9,s.add(l),{sky:t,ring:l}}var ee={};function cy(){let s=document.createElement("canvas");s.width=s.height=256;let e=s.getContext("2d");e.fillStyle="#000",e.fillRect(0,0,256,256);let t=e.createRadialGradient(128,128,0,128,128,128);t.addColorStop(0,"#ffffff"),t.addColorStop(.12,"#f4f0e8"),t.addColorStop(.2,"#9a968e"),t.addColorStop(.32,"#b8b2a8"),t.addColorStop(.42,"#6a665e"),t.addColorStop(.7,"#2c2a26"),t.addColorStop(.95,"#0b0a09"),t.addColorStop(1,"#000"),e.fillStyle=t,e.fillRect(0,0,256,256),e.globalCompositeOperation="multiply";for(let i=0;i<6;i++)e.strokeStyle=`rgba(0,0,0,${.08+Math.random()*.1})`,e.lineWidth=2+Math.random()*4,e.beginPath(),e.arc(128+Math.random()*4-2,128+Math.random()*4-2,30+i*14+Math.random()*6,0,7),e.stroke();for(let i=0;i<40;i++)e.fillStyle=`rgba(0,0,0,${Math.random()*.25})`,e.beginPath(),e.arc(Math.random()*256,Math.random()*256,Math.random()*6,0,7),e.fill();let n=new es(s);return n.colorSpace=_t,n}function Dd(s,e,t){if(s.environment=Xa.pmrem,ee.hemi=new Ia(8228013,2760728,.22),s.add(ee.hemi),ee.moon=new yr(10466008,.5),ee.moonDir=new w(-.45,.62,.35).normalize(),t.moonShadow){ee.moon.castShadow=!0,ee.moon.shadow.mapSize.set(t.shadowSize*2,t.shadowSize*2);let n=ee.moon.shadow.camera;n.left=-28,n.right=28,n.top=28,n.bottom=-28,n.near=1,n.far=220,ee.moon.shadow.bias=-4e-4,ee.moon.shadow.normalBias=.04,ee.moon.shadow.autoUpdate=!1}s.add(ee.moon),s.add(ee.moon.target),ee.torch=new _r(16773340,38,40,.56,.5,2),ee.torch.castShadow=!0,ee.torch.shadow.mapSize.set(t.shadowSize,t.shadowSize),ee.torch.shadow.camera.near=.15,ee.torch.shadow.camera.far=40,ee.torch.shadow.bias=-3e-4,ee.torch.shadow.normalBias=.02,ee.torch.map=cy(),ee.torch.position.set(.16,-.14,.02),e.add(ee.torch),ee.torch.target.position.set(.06,-.12,-2),e.add(ee.torch.target),ee.torchOn=!0,ee.flare=new Fi(15400930,0,0,2),t.flareShadow&&(ee.flare.castShadow=!0,ee.flare.shadow.mapSize.set(512,512),ee.flare.shadow.camera.near=.5,ee.flare.shadow.camera.far=160,ee.flare.shadow.bias=-.003,ee.flare.shadow.autoUpdate=!1),s.add(ee.flare),ee.flareSprite=new Ce(new Un(.12,8,6),new zt({color:new ge(60,70,60)})),ee.flareSprite.visible=!1,s.add(ee.flareSprite),ee.pool=[];for(let n=0;n<t.lanterns;n++){let i=new Fi(16751176,0,11,2);s.add(i),ee.pool.push(i)}return ee.muzzle=new Fi(16757864,0,20,2),s.add(ee.muzzle),ee.enemyMuzzle=new Fi(16754776,0,20,2),s.add(ee.enemyMuzzle),ee.state={poolT:0,flareT:7,flare:null,artT:3,artFlash:0,enemyFlashT:0,sources:[],frame:0,moonAt:new w(1e9,0,0)},ee}function Ud(){return ee.torchOn=!ee.torchOn,ee.torch.intensity=ee.torchOn?38:0,ee.torchOn}function Nd(s,e,t){let n=ee.state;if(n.frame++,(Math.hypot(e.x-n.moonAt.x,e.z-n.moonAt.z)>1.5||n.frame%30===0)&&(n.moonAt.set(e.x,0,e.z),ee.moon.target.position.set(e.x,0,e.z),ee.moon.position.set(e.x+ee.moonDir.x*90,ee.moonDir.y*90,e.z+ee.moonDir.z*90),ee.moon.shadow.needsUpdate=!0),ee.flare.castShadow&&ee.flare.intensity>0&&n.frame%2===0&&(ee.flare.shadow.needsUpdate=!0),n.poolT-=s,n.poolT<=0){n.poolT=.3;let o=Yt.lanterns.map(a=>({l:a,fire:!1,d:Math.hypot(a.x-e.x,a.z-e.z)})).concat(Yt.fires.map(a=>({l:a,fire:!0,d:Math.hypot(a.x-e.x,a.z-e.z)})));o.sort((a,c)=>a.d-c.d),n.sources=o.slice(0,ee.pool.length),n.sources.forEach((a,c)=>{let l=ee.pool[c];l.position.set(a.l.x,a.l.y,a.l.z),l.color.set(a.fire?16742954:16752716),l.distance=a.fire?9:11,l.userData.base=a.fire?9:5.5,l.userData.fire=a.fire,l.userData.ph=a.l.ph||0});for(let a=n.sources.length;a<ee.pool.length;a++)ee.pool[a].intensity=0}let i=performance.now()/1e3;if(n.sources.forEach((o,a)=>{let c=ee.pool[a],l=c.userData.fire?.75+Math.sin(i*13+a)*.1+Math.sin(i*27.3)*.08+Math.random()*.12:.92+Math.sin(i*9+c.userData.ph)*.03+Math.sin(i*23.7+a)*.03+(Math.random()<.015?-.35:0);c.intensity=c.userData.base*l}),n.flareT-=s,n.flareT<=0&&!n.flare){n.flareT=j(16,30);let o=j(-2.6,-.5),a=j(10,32);n.flare={x:e.x+Math.cos(o)*a,z:e.z+Math.sin(o)*a,y:2.55+1.5,vy:20,t:0,life:j(13,18),dx:j(-.5,.5),dz:j(-.4,.4)},t&&t.flareLaunch(n.flare.x,n.flare.z)}if(n.flare){let o=n.flare;o.t+=s,o.vy>0?(o.y+=o.vy*s,o.vy-=10*s):(o.y-=.75*s,o.x+=Math.sin(o.t*.7)*.35*s+o.dx*s,o.z+=o.dz*s);let c=ze((o.t-1.6)/.6,0,1)*ze((o.life-o.t)/2.5,0,1),l=.82+Math.random()*.22+Math.sin(o.t*31)*.05;ee.flare.position.set(o.x,o.y,o.z),ee.flare.intensity=2600*c*l,ee.flareSprite.visible=c>.01,ee.flareSprite.position.copy(ee.flare.position),ee.flareSprite.material.color.setRGB(60*c*l,70*c*l,60*c*l),Oi.uFlare.value=c*l,Oi.uFlareDir.value.set(o.x-e.x,o.y-1.5,o.z-e.z).normalize(),o.t>o.life&&(n.flare=null,ee.flare.intensity=0,ee.flareSprite.visible=!1,Oi.uFlare.value=0)}if(n.artT-=s,n.artT<=0){n.artT=j(4,13);let o=j(-Math.PI*.95,-Math.PI*.05);Oi.uFlashDir.value.set(Math.cos(o),.05,Math.sin(o)).normalize(),n.artFlash=j(.6,1.3);let a=j(400,2500);t&&setTimeout(()=>t.artillery(a),Math.min(4e3,a/340*1e3*.35))}n.artFlash=Math.max(0,n.artFlash-s*2.2);let r=n.artFlash*(.55+Math.random()*.45);Oi.uFlash.value=r,ee.hemi.intensity=.22+r*.5+Oi.uFlare.value*.25,ee.muzzle.intensity=Math.max(0,ee.muzzle.intensity-s*9e3),n.enemyFlashT>0&&(n.enemyFlashT-=s,n.enemyFlashT<=0&&(ee.enemyMuzzle.intensity=0)),Oi.uTime.value=i}function Oh(s,e=!1){e?(ee.enemyMuzzle.position.copy(s),ee.enemyMuzzle.intensity=400,ee.state.enemyFlashT=.05):(ee.muzzle.position.copy(s),ee.muzzle.intensity=450)}var Qt={uAmb:{value:new w(.02,.022,.03)},uTorchPos:{value:new w},uTorchDir:{value:new w(0,0,-1)},uTorchCol:{value:new w},uTorchCos:{value:.88},uTorchCosIn:{value:.95},uLanPos:{value:Array.from({length:6},()=>new w(0,-100,0))},uLanCol:{value:Array.from({length:6},()=>new w)},uFlarePos:{value:new w},uFlareCol:{value:new w},uMuzPos:{value:new w},uMuzCol:{value:new w}},zh=`
uniform vec3 uAmb, uTorchPos, uTorchDir, uTorchCol, uFlarePos, uFlareCol, uMuzPos, uMuzCol;
uniform float uTorchCos, uTorchCosIn;
uniform vec3 uLanPos[6]; uniform vec3 uLanCol[6];
vec3 simpleLight(vec3 p){
  vec3 L = uAmb;
  vec3 tl = p - uTorchPos; float tlen = max(length(tl), 0.05);
  L += uTorchCol * smoothstep(uTorchCos, uTorchCosIn, dot(tl / tlen, uTorchDir)) / (tlen * tlen + 0.3);
  vec3 fl = uFlarePos - p; L += uFlareCol / (dot(fl, fl) + 4.0);
  for (int k = 0; k < 6; k++) { vec3 ll = uLanPos[k] - p; L += uLanCol[k] / (dot(ll, ll) + 0.2); }
  vec3 ml = uMuzPos - p; L += uMuzCol / (dot(ml, ml) + 0.15);
  return L;
}`,Za=class{constructor(e,t,n){this.max=t,this.n=0,this.pos=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.col=new Float32Array(t*3),this.size=new Float32Array(t),this.alpha=new Float32Array(t),this.life=new Float32Array(t),this.life0=new Float32Array(t),this.grav=new Float32Array(t),this.drag=new Float32Array(t),this.grow=new Float32Array(t),this.a0=new Float32Array(t);let i=new pt;i.setAttribute("position",new nt(this.pos,3).setUsage(co)),i.setAttribute("color",new nt(this.col,3).setUsage(co)),i.setAttribute("size",new nt(this.size,1).setUsage(co)),i.setAttribute("alpha",new nt(this.alpha,1).setUsage(co)),this.geo=i;let r=new nn({uniforms:Object.assign({uScale:{value:600}},Qt),vertexShader:zh+`
        attribute float size; attribute float alpha; varying vec3 vCol; varying float vA;
        uniform float uScale;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = size * uScale / max(-mv.z, 0.05);
          ${n?"vCol = color;":"vCol = color * simpleLight(position);"}
          vA = alpha;
        }`,fragmentShader:`
        varying vec3 vCol; varying float vA;
        void main(){
          vec2 q = gl_PointCoord - 0.5; float r = dot(q, q) * 4.0;
          float a = exp(-r * 2.5) * vA;
          if (a < 0.003) discard;
          gl_FragColor = vec4(vCol, a);
        }`,vertexColors:!0,transparent:!0,depthWrite:!1,blending:n?ri:Ji});this.mat=r,this.points=new Es(i,r),this.points.frustumCulled=!1,this.points.renderOrder=5,e.add(this.points)}emit(e,t,n,i,r,o,a,c,l,h,u,f={}){if(this.n>=this.max)return;let d=this.n++;this.pos[d*3]=e,this.pos[d*3+1]=t,this.pos[d*3+2]=n,this.vel[d*3]=i,this.vel[d*3+1]=r,this.vel[d*3+2]=o,this.col[d*3]=a,this.col[d*3+1]=c,this.col[d*3+2]=l,this.size[d]=h,this.life[d]=this.life0[d]=u,this.grav[d]=f.grav??9.8,this.drag[d]=f.drag??.5,this.grow[d]=f.grow??0,this.a0[d]=f.alpha??1,this.alpha[d]=this.a0[d]}update(e,t){for(let n=0;n<this.n;n++){if(this.life[n]-=e,this.life[n]<=0){let a=--this.n;for(let c=0;c<3;c++)this.pos[n*3+c]=this.pos[a*3+c],this.vel[n*3+c]=this.vel[a*3+c],this.col[n*3+c]=this.col[a*3+c];this.size[n]=this.size[a],this.life[n]=this.life[a],this.life0[n]=this.life0[a],this.grav[n]=this.grav[a],this.drag[n]=this.drag[a],this.grow[n]=this.grow[a],this.a0[n]=this.a0[a],n--;continue}let i=Math.exp(-this.drag[n]*e);this.vel[n*3]*=i,this.vel[n*3+2]*=i,this.vel[n*3+1]=this.vel[n*3+1]*i-this.grav[n]*e,this.pos[n*3]+=this.vel[n*3]*e,this.pos[n*3+1]+=this.vel[n*3+1]*e,this.pos[n*3+2]+=this.vel[n*3+2]*e;let r=t(this.pos[n*3],this.pos[n*3+2])+.01;this.pos[n*3+1]<r&&(this.pos[n*3+1]=r,this.vel[n*3]*=.2,this.vel[n*3+1]=0,this.vel[n*3+2]*=.2),this.size[n]+=this.grow[n]*e;let o=this.life[n]/this.life0[n];this.alpha[n]=this.a0[n]*Math.min(1,o*3)*(this.grow[n]>0?Math.min(1,(1-o)*8):1)}this.geo.setDrawRange(0,this.n);for(let n of["position","color","size","alpha"])this.geo.attributes[n].needsUpdate=!0}clear(){this.n=0}};function ly(s,e,t){let n=new Float32Array(e*2*3),i=new Float32Array(e*2);for(let l=0;l<e;l++){let h=[Math.random(),Math.random(),Math.random()];for(let u=0;u<2;u++)n.set(h,(l*2+u)*3),i[l*2+u]=u}let r=new pt;r.setAttribute("position",new nt(new Float32Array(e*2*3),3)),r.setAttribute("seed",new nt(n,3)),r.setAttribute("tip",new nt(i,1));let o=Object.assign({uCam:{value:new w},uTime:{value:0},tHeight:{value:t.texture},uHB:{value:t.bounds},uIntensity:{value:1}},Qt),a=new nn({uniforms:o,vertexShader:zh+`
      uniform vec3 uCam; uniform float uTime; uniform sampler2D tHeight; uniform vec4 uHB; uniform float uIntensity;
      attribute vec3 seed; attribute float tip; varying float vA; varying vec3 vC;
      void main(){
        const float B = 13.0; const float HH = 16.0;
        float speed = 8.5 + seed.z * 2.5;
        vec3 wind = vec3(1.1, 0.0, 0.45);
        float xw = seed.x * 2.0 * B, zw = fract(seed.z * 7.31 + seed.x * 3.7) * 2.0 * B;
        vec3 p;
        p.x = xw + 2.0 * B * floor((uCam.x - xw) / (2.0 * B) + 0.5);
        p.z = zw + 2.0 * B * floor((uCam.z - zw) / (2.0 * B) + 0.5);
        float fall = mod(seed.y * HH - uTime * speed, HH);
        p.y = uCam.y - 5.0 + fall;
        p.xz += wind.xz * (fall / speed);
        vec3 v = vec3(-wind.x, -speed, -wind.z);
        vec3 pos = p + v * tip * 0.024;
        float ground = texture2D(tHeight, (pos.xz - uHB.xy) / uHB.zw).r;
        float vis = step(ground, pos.y) * step(ground, p.y);
        vec3 L = simpleLight(pos);
        float br = dot(L, vec3(0.3, 0.5, 0.2));
        vA = vis * clamp(br * 0.32, 0.0, 0.7) * uIntensity * (0.4 + 0.6 * tip);
        vC = mix(vec3(0.75, 0.82, 0.95), L / max(br, 1e-3) * 0.6, 0.35);
        gl_Position = projectionMatrix * viewMatrix * vec4(pos, 1.0);
      }`,fragmentShader:"varying float vA; varying vec3 vC; void main(){ if (vA < 0.004) discard; gl_FragColor = vec4(vC * vA, vA); }",transparent:!0,depthWrite:!1,blending:ri}),c=new Qi(r,a);return c.frustumCulled=!1,c.renderOrder=6,s.add(c),{lines:c,uniforms:o}}function hy(s,e,t){let n=new Float32Array(e*3);for(let c=0;c<e*3;c++)n[c]=Math.random();let i=new pt;i.setAttribute("position",new nt(new Float32Array(e*3),3)),i.setAttribute("seed",new nt(n,3));let r=Object.assign({uCam:{value:new w},uTime:{value:0},tHeight:{value:t.texture},uHB:{value:t.bounds},uScale:{value:600}},Qt),o=new nn({uniforms:r,vertexShader:zh+`
      uniform vec3 uCam; uniform float uTime; uniform sampler2D tHeight; uniform vec4 uHB; uniform float uScale;
      attribute vec3 seed; varying float vA; varying vec3 vC;
      float h11(float n){ return fract(sin(n) * 43758.5453); }
      void main(){
        float per = 0.35 + seed.z * 0.3;
        float cyc = floor(uTime / per + seed.y * 13.0);
        float ph = fract(uTime / per + seed.y * 13.0);
        vec3 p = vec3(uCam.x + (h11(cyc * 1.7 + seed.x * 91.0) - 0.5) * 18.0, 0.0, uCam.z + (h11(cyc * 2.3 + seed.z * 57.0) - 0.5) * 18.0);
        p.y = texture2D(tHeight, (p.xz - uHB.xy) / uHB.zw).r + 0.02 + ph * 0.05;
        vec4 mv = viewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (0.02 + ph * 0.05) * uScale / max(-mv.z, 0.1);
        vec3 L = simpleLight(p);
        vA = (1.0 - ph) * clamp(dot(L, vec3(0.33)) * 0.8, 0.0, 0.8);
        vC = vec3(0.85, 0.9, 1.0);
      }`,fragmentShader:"varying float vA; varying vec3 vC; void main(){ vec2 q = gl_PointCoord - 0.5; float r = length(q) * 2.0; float a = smoothstep(1.0, 0.6, r) * smoothstep(0.2, 0.6, r) * vA; if (a < 0.003) discard; gl_FragColor = vec4(vC * a, a); }",transparent:!0,depthWrite:!1,blending:ri}),a=new Es(i,o);return a.frustumCulled=!1,s.add(a),{pts:a,uniforms:r}}function Fd(s){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d");if(t.fillStyle="#000",t.fillRect(0,0,128,128),s==="blood"){t.fillStyle="#fff";for(let i=0;i<26;i++){let r=Math.random()*7,o=Math.pow(Math.random(),1.6)*52,a=j(2,16)*(1-o/70);t.beginPath(),t.arc(64+Math.cos(r)*o,64+Math.sin(r)*o,Math.max(1,a),0,7),t.fill()}}else{let i=t.createRadialGradient(64,64,0,64,64,60);i.addColorStop(0,"#fff"),i.addColorStop(.18,"#fff"),i.addColorStop(.32,"#777"),i.addColorStop(1,"#000"),t.fillStyle=i,t.fillRect(0,0,128,128)}return new es(e)}var Ka=class{constructor(e,t,n){this.scene=e,this.lit=new Za(e,1400,!1),this.glow=new Za(e,400,!0),this.rain=ly(e,t.rain,n),this.splash=hy(e,Math.round(t.rain/8),n),this.decals=[],this.decalGeo=new Zn(1,1),this.bloodMat=new Bt({color:1966594,alphaMap:Fd("blood"),transparent:!0,roughness:.18,metalness:0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,envMapIntensity:.6}),this.holeMat=new Bt({color:328707,alphaMap:Fd("hole"),transparent:!0,roughness:.9,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4})}setScale(e){this.lit.mat.uniforms.uScale.value=e,this.glow.mat.uniforms.uScale.value=e,this.splash.uniforms.uScale.value=e}decal(e,t,n,i,r,o,a,c){let l=new Ce(this.decalGeo,e==="blood"?this.bloodMat:this.holeMat);l.position.set(t+r*.01,n+o*.01,i+a*.01),l.lookAt(t+r,n+o,i+a),l.rotateZ(Math.random()*6.28),l.scale.set(c,c,1),l.receiveShadow=!0,this.scene.add(l),this.decals.push(l),this.decals.length>120&&this.scene.remove(this.decals.shift())}impact(e,t,n,i,r,o,a){let c=a===3?6:14,l=a===2?[.16,.11,.07]:a===4?[.2,.17,.12]:[.07,.05,.035];for(let h=0;h<c;h++){let u=j(1.5,4.5);this.lit.emit(e,t,n,i*u+j(-1.2,1.2),r*u+j(.5,2.5),o*u+j(-1.2,1.2),l[0],l[1],l[2],j(.012,.03),j(.4,.9),{grav:9.8,drag:.3})}for(let h=0;h<5;h++)this.lit.emit(e+i*.05,t+r*.05,n+o*.05,i*j(.2,.8)+j(-.3,.3),j(.1,.5),o*j(.2,.8)+j(-.3,.3),l[0]*1.6,l[1]*1.6,l[2]*1.6,j(.1,.25),j(.8,1.8),{grav:-.15,drag:1.5,grow:.5,alpha:.35});if(a===3)for(let h=0;h<8;h++)this.glow.emit(e,t,n,i*j(1,4)+j(-2,2),j(.5,3),o*j(1,4)+j(-2,2),8,4.5,1.6,j(.006,.012),j(.08,.25),{grav:9.8,drag:.2});this.decal("hole",e,t,n,i,r,o,a===4?j(.05,.08):j(.04,.07))}blood(e,t,n,i,r,o){for(let a=0;a<(o?30:16);a++){let c=j(1,4);this.lit.emit(e,t,n,i*c+j(-.8,.8),j(-.2,1.8),r*c+j(-.8,.8),j(.1,.16),.006,.004,j(.01,.03),j(.4,.9),{grav:9.8,drag:.4})}for(let a=0;a<4;a++)this.lit.emit(e,t,n,i*j(.3,1),j(-.1,.3),r*j(.3,1),.1,.008,.005,j(.08,.18),j(.3,.6),{grav:.5,drag:2,grow:.4,alpha:.5})}muzzleSmoke(e,t,n=1){for(let i=0;i<10*n;i++){let r=j(.3,2.5);this.lit.emit(e.x+t.x*.05,e.y,e.z+t.z*.05,t.x*r+j(-.25,.25),t.y*r+j(.05,.4),t.z*r+j(-.25,.25),.55,.55,.56,j(.06,.14),j(1.2,2.8),{grav:-.12,drag:1.4,grow:j(.25,.6),alpha:.22})}for(let i=0;i<6;i++)this.glow.emit(e.x,e.y,e.z,t.x*j(4,12)+j(-1.5,1.5),t.y*j(4,12)+j(-1,1.5),t.z*j(4,12)+j(-1.5,1.5),9,5,1.8,j(.005,.012),j(.04,.14),{grav:4,drag:.5})}update(e,t,n,i){this.lit.update(e,i),this.glow.update(e,i),this.rain.uniforms.uCam.value.copy(n),this.rain.uniforms.uTime.value=t,this.splash.uniforms.uCam.value.copy(n),this.splash.uniforms.uTime.value=t}clear(){this.lit.clear(),this.glow.clear();for(let e of this.decals)this.scene.remove(e);this.decals.length=0}};var Tt={ctx:null,master:null,rev:null,noise:null,vol:li.get("vol",.8),listener:{x:0,z:0,yaw:0},init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}let s=window.AudioContext||window.webkitAudioContext;if(!s)return;let e=this.ctx=new s,t=e.createDynamicsCompressor();t.threshold.value=-24,t.knee.value=8,t.ratio.value=12,t.attack.value=.002,t.release.value=.25;let n=e.createWaveShaper(),i=new Float32Array(1024);for(let f=0;f<1024;f++){let d=f/512-1;i[f]=Math.tanh(d*2)/Math.tanh(2)}n.curve=i;let r=e.createBiquadFilter();r.type="highpass",r.frequency.value=110;let o=e.createBiquadFilter();o.type="lowpass",o.frequency.value=9500,this.master=e.createGain(),this.master.gain.value=this.vol,this.master.connect(t),t.connect(n),n.connect(r),r.connect(o),o.connect(e.destination);let a=e.sampleRate*2,c=e.createBuffer(1,a,e.sampleRate),l=c.getChannelData(0);for(let f=0;f<a;f++)l[f]=Math.random()*2-1;this.noise=c;let h=e.createBuffer(2,e.sampleRate*2.2,e.sampleRate);for(let f=0;f<2;f++){let d=h.getChannelData(f);for(let m=0;m<d.length;m++)d[m]=(Math.random()*2-1)*Math.pow(1-m/d.length,3.5)*.7;for(let m of[.011,.019,.027,.041]){let x=Math.floor(m*e.sampleRate*(1+f*.07));d[x]+=.9}}this.rev=e.createConvolver(),this.rev.buffer=h;let u=e.createGain();u.gain.value=.42,this.rev.connect(u),u.connect(this.master),this.ambient()},setVol(s){this.vol=s,this.master&&(this.master.gain.value=s)},panOf(s,e){let t=this.listener,n=s-t.x,i=e-t.z,r=Math.hypot(n,i)||1;return ze((n*Math.cos(t.yaw)-i*Math.sin(t.yaw))/r,-1,1)*.85},distOf(s,e){return Math.hypot(s-this.listener.x,e-this.listener.z)},out(s,e){let t=this.ctx,n=t.createGain();if(t.createStereoPanner){let i=t.createStereoPanner();if(i.pan.value=ze(s||0,-1,1),n.connect(i),i.connect(this.master),e){let r=t.createGain();r.gain.value=e,i.connect(r),r.connect(this.rev)}}else n.connect(this.master);return n},noiseB({dur:s=.2,type:e="lowpass",f:t=1e3,f1:n=0,q:i=.7,vol:r=.5,pan:o=0,rev:a=.15,attack:c=.002,delay:l=0}){let h=this.ctx;if(!h||r<5e-4)return;let u=h.currentTime+l,f=h.createBufferSource();f.buffer=this.noise,f.loop=!0;let d=h.createBiquadFilter();d.type=e,d.frequency.setValueAtTime(t,u),n&&d.frequency.exponentialRampToValueAtTime(n,u+s),d.Q.value=i;let m=h.createGain();m.gain.setValueAtTime(1e-4,u),m.gain.exponentialRampToValueAtTime(r,u+c),m.gain.exponentialRampToValueAtTime(1e-4,u+s),f.connect(d),d.connect(m),m.connect(this.out(o,a)),f.start(u,Math.random()*1.5),f.stop(u+s+.05)},tone({type:s="sine",f:e=200,f1:t=0,dur:n=.2,vol:i=.3,pan:r=0,rev:o=.1,delay:a=0,attack:c=.004,lp:l=0}){let h=this.ctx;if(!h||i<5e-4)return;let u=h.currentTime+a,f=h.createOscillator();f.type=s,f.frequency.setValueAtTime(e,u),t&&f.frequency.exponentialRampToValueAtTime(t,u+n);let d=h.createGain();d.gain.setValueAtTime(1e-4,u),d.gain.exponentialRampToValueAtTime(i,u+c),d.gain.exponentialRampToValueAtTime(1e-4,u+n);let m=f;if(l){let x=h.createBiquadFilter();x.type="lowpass",x.frequency.value=l,f.connect(x),m=x}m.connect(d),d.connect(this.out(r,o)),f.start(u),f.stop(u+n+.05)},ambient(){let s=this.ctx,e=(r,o,a,c,l)=>{let h=s.createBufferSource();h.buffer=this.noise,h.loop=!0;let u=s.createBiquadFilter();u.type=r,u.frequency.value=o,u.Q.value=a;let f=s.createGain();return f.gain.value=c,h.connect(u),u.connect(f),f.connect(this.master),h.start(0,l),f},t=e("lowpass",360,.7,.06,.1),n=s.createOscillator();n.frequency.value=.08;let i=s.createGain();i.gain.value=.04,n.connect(i),i.connect(t.gain),n.start(),e("highpass",6e3,.7,.012,.7),e("bandpass",2600,.35,.035,1.1),e("bandpass",900,.5,.02,.4)},shot(){this.noiseB({dur:.55,f:8e3,f1:400,vol:1,rev:1.2}),this.noiseB({dur:.05,type:"highpass",f:2600,vol:.95,rev:.4}),this.tone({f:160,f1:30,dur:.38,vol:1}),this.tone({f:60,f1:25,dur:.6,vol:.6,rev:.4})},enemyShot(s,e){let t=this.distOf(s,e),n=this.panOf(s,e),i=.9/(1+t*.1),r=5e3/(1+t*.06);this.noiseB({dur:.55,f:r,f1:r*.2,vol:i,pan:n,rev:1.4}),this.tone({f:110,f1:28,dur:.35,vol:i*.7,pan:n})},crack(s){this.noiseB({dur:.03,type:"highpass",f:3500,vol:.55,pan:s}),this.noiseB({dur:.12,type:"bandpass",f:1800,f1:600,q:2,vol:.18,pan:s,delay:.02})},click(){this.noiseB({dur:.035,type:"bandpass",f:3200,q:4,vol:.25,rev:0})},bolt(s=0){this.noiseB({dur:.06,type:"bandpass",f:2200,q:3,vol:.35,delay:s,rev:.05}),this.noiseB({dur:.05,type:"bandpass",f:1500,q:3,vol:.28,delay:s+.13}),this.noiseB({dur:.07,type:"bandpass",f:1900,q:3,vol:.32,delay:s+.32}),this.noiseB({dur:.05,type:"bandpass",f:2700,q:3,vol:.34,delay:s+.47}),this.tone({f:4200,f1:3e3,dur:.18,vol:.02,delay:s+.2}),this.noiseB({dur:.08,type:"bandpass",f:3800,q:6,vol:.06,delay:s+.75})},roundIn(s=0){this.noiseB({dur:.05,type:"bandpass",f:2800,q:5,vol:.22,delay:s}),this.tone({f:2400,f1:1800,dur:.05,vol:.03,delay:s})},step(s=1,e=1){this.noiseB({dur:.15,f:j(240,480),vol:.13*s,rev:.05}),e&&this.noiseB({dur:.12,type:"bandpass",f:j(650,1050),q:2.2,vol:.07*s*e,delay:.03})},boardStep(s=1){this.noiseB({dur:.07,type:"bandpass",f:j(300,500),q:3,vol:.12*s}),this.tone({f:j(160,220),f1:120,dur:.08,vol:.05*s})},growl(s,e,t=1){let n=this.panOf(s,e),i=this.distOf(s,e),r=t*.7/(1+i*.08),o=j(55,85);this.tone({type:"sawtooth",f:o,f1:o*.55,dur:j(.7,1.3),vol:r*.5,pan:n,rev:.7,lp:650,attack:.08}),this.tone({type:"sawtooth",f:o*1.51,f1:o*.8,dur:.9,vol:r*.25,pan:n,rev:.7,lp:900,attack:.1}),this.noiseB({dur:.8,type:"bandpass",f:500,q:2,vol:r*.3,pan:n,attack:.1})},chant(s,e,t=1){let n=this.panOf(s,e),i=this.distOf(s,e),r=t*.7/(1+i*.08),o=j(105,150);this.tone({type:"triangle",f:o,f1:o*.98,dur:1.5,vol:r*.35,pan:n,rev:1.1,attack:.2,lp:1200}),this.tone({type:"triangle",f:o*1.5,dur:1.3,vol:r*.2,pan:n,rev:1.1,attack:.25,lp:1200})},shout(s,e,t=1){let n=this.panOf(s,e),i=this.distOf(s,e),r=t*.6/(1+i*.08);this.tone({type:"sawtooth",f:j(150,220),f1:j(110,150),dur:.5,vol:r*.35,pan:n,rev:.7,lp:1400,attack:.03})},scream(s,e,t=1){let n=this.panOf(s,e),i=this.distOf(s,e),r=t*.7/(1+i*.06);this.tone({type:"sawtooth",f:j(380,520),f1:90,dur:.75,vol:r*.45,pan:n,rev:.8,lp:1600,attack:.02})},swing(){this.noiseB({dur:.22,type:"bandpass",f:1400,f1:300,q:1.5,vol:.35})},flesh(s,e,t=.5){let n=this.panOf(s,e);this.noiseB({dur:.1,type:"bandpass",f:700,q:1.5,vol:t,pan:n}),this.tone({f:120,f1:60,dur:.1,vol:t*.5,pan:n})},hit(s,e,t,n=.4){let i=this.panOf(s,e);t===3?(this.tone({type:"square",f:j(900,1400),f1:500,dur:.25,vol:n*.25,pan:i,rev:.6,lp:3e3}),this.noiseB({dur:.06,type:"highpass",f:2e3,vol:n*.6,pan:i})):t===2?(this.noiseB({dur:.08,type:"bandpass",f:900,q:2,vol:n,pan:i}),this.tone({f:300,f1:150,dur:.08,vol:n*.4,pan:i})):this.noiseB({dur:.14,f:1200,f1:180,vol:n,pan:i,rev:.25})},hurt(s){this.tone({f:70,f1:38,dur:.3,vol:.9}),this.noiseB({dur:.25,f:500,vol:.6}),s&&this.tone({f:3300,dur:2.6,vol:.05,attack:.05})},heartbeat(){this.tone({f:58,f1:40,dur:.14,vol:.55,rev:0}),this.tone({f:52,f1:38,dur:.14,vol:.4,delay:.2,rev:0})},artillery(s){let e=.65/(1+s*.0015);this.tone({f:46,f1:20,dur:2.6,vol:e,rev:.7,attack:.03}),this.noiseB({dur:3,f:200,f1:45,vol:e,rev:.9,attack:.03})},flareLaunch(s,e){let t=this.panOf(s,e);this.noiseB({dur:.15,type:"bandpass",f:800,q:2,vol:.3,pan:t}),this.noiseB({dur:1.4,type:"bandpass",f:2600,f1:900,q:1.5,vol:.12,pan:t,rev:.8,delay:.05}),this.noiseB({dur:.25,f:1500,vol:.15,pan:t,delay:1.6,rev:1})},pickup(){this.noiseB({dur:.08,type:"bandpass",f:2e3,q:3,vol:.25}),this.noiseB({dur:.08,type:"bandpass",f:2600,q:3,vol:.2,delay:.1})}};var _o=new w;function Bn(s,e,t,n,i,r){let o=2*Math.PI*i/4,a=Math.max(r-2*i,0),c=Math.PI/4;_o.copy(e),_o[n]=0,_o.normalize();let l=.5*o/(o+a),h=1-_o.angleTo(s)/c;return Math.sign(_o[t])===1?h*l:a/(o+a)+l+l*(1-h)}var Ja=class extends xn{constructor(e=1,t=1,n=1,i=2,r=.1){if(i=i*2+1,r=Math.min(e/2,t/2,n/2,r),super(1,1,1,i,i,i),i===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new w,c=new w,l=new w(e,t,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,d=h.length/6,m=new w,x=.5/i;for(let g=0,p=0;g<h.length;g+=3,p+=2)switch(a.fromArray(h,g),c.copy(a),c.x-=Math.sign(c.x)*x,c.y-=Math.sign(c.y)*x,c.z-=Math.sign(c.z)*x,c.normalize(),h[g+0]=l.x*Math.sign(a.x)+c.x*r,h[g+1]=l.y*Math.sign(a.y)+c.y*r,h[g+2]=l.z*Math.sign(a.z)+c.z*r,u[g+0]=c.x,u[g+1]=c.y,u[g+2]=c.z,Math.floor(g/d)){case 0:m.set(1,0,0),f[p+0]=Bn(m,c,"z","y",r,n),f[p+1]=1-Bn(m,c,"y","z",r,t);break;case 1:m.set(-1,0,0),f[p+0]=1-Bn(m,c,"z","y",r,n),f[p+1]=1-Bn(m,c,"y","z",r,t);break;case 2:m.set(0,1,0),f[p+0]=1-Bn(m,c,"x","z",r,e),f[p+1]=Bn(m,c,"z","x",r,n);break;case 3:m.set(0,-1,0),f[p+0]=1-Bn(m,c,"x","z",r,e),f[p+1]=1-Bn(m,c,"z","x",r,n);break;case 4:m.set(0,0,1),f[p+0]=1-Bn(m,c,"x","y",r,e),f[p+1]=1-Bn(m,c,"y","x",r,t);break;case 5:m.set(0,0,-1),f[p+0]=Bn(m,c,"x","y",r,e),f[p+1]=1-Bn(m,c,"y","x",r,t);break}}};var uy=new w(.53-.564,.1335-.0596,.0095),fy=new w(1.14-.564,.131-.0596,.0095);function $a(s){return s=s.clone(),Uh(s),jn(s,"vmspot",e=>{e.fragmentShader=e.fragmentShader.replace("#include <lights_fragment_begin>",Ge.lights_fragment_begin.replace("getSpotLightInfo( spotLight, geometryPosition, directLight );","getSpotLightInfo( spotLight, geometryPosition, directLight ); directLight.color *= 0.14;"))}),s.envMapIntensity=.12,s}var ja=class{constructor(e,t){this.root=new At,this.gun=new At,this.root.add(this.gun),e.add(this.root);let n=$n.rifle.scene.clone(!0);n.traverse(p=>{p.name==="bolt_action_rifle_7_62_scope"&&(p.visible=!1),p.isMesh&&(p.material=$a(p.material),p.castShadow=!1,p.receiveShadow=!0,p.frustumCulled=!1)}),n.rotation.y=Math.PI/2,this.gun.add(n),this.rifle=n;let i=p=>new w(p.z,p.y,-p.x);this.rear=i(uy),this.front=i(fy),this.muzzle=new dt,this.muzzle.position.set(this.front.x,this.front.y-.026,this.front.z-.03),this.gun.add(this.muzzle);let r=$a(new Bt({color:3816253,metalness:1,roughness:.35})),o=new Ce(new sn(6e-4,.0075,.43,4),r);o.rotation.x=-Math.PI/2,o.position.set(this.front.x+.014,this.front.y-.03,this.front.z-.23),o.frustumCulled=!1,this.gun.add(o);let a=new Ce(new sn(.011,.011,.07,10),r);a.rotation.x=Math.PI/2,a.position.set(this.front.x+.006,this.front.y-.03,this.front.z+.02),a.frustumCulled=!1,this.gun.add(a);let c=t,l=$a(qt("wool",{color:new ge(...c.sleeve),env:.2,repeat:[3,3]})),h=$a(qt("leather",{color:new ge(...c.glove),env:.4,repeat:[2,2]})),u=(p,_)=>{let v=new Ce(p,_);return v.castShadow=!1,v.receiveShadow=!0,v.frustumCulled=!1,v},f=p=>{let _=new At;_.add(u(new Ja(.085,.045,.1,3,.018),h));for(let C=0;C<4;C++){let b=u(new io(.0095,.045,3,6),h);b.position.set(p*.03,-.028,-.034+C*.022),b.rotation.set(0,0,p*.9),_.add(b)}let v=u(new io(.011,.04,3,6),h);v.position.set(-p*.035,.018,-.03),v.rotation.set(.6,0,-p*.5),_.add(v);let M=u(new sn(.042,.045,.06,12),h);return M.rotation.x=Math.PI/2,M.position.set(0,.005,.07),_.add(M),_},d=(p,_,v,M)=>{let C=new w().subVectors(_,p),b=C.length(),R=new sn(M,v,b,14,4),L=R.attributes.position;for(let E=0;E<L.count;E++){let F=L.getY(E),V=1+Math.sin(F*38+L.getX(E)*20)*.04;L.setX(E,L.getX(E)*V),L.setZ(E,L.getZ(E)*V)}R.computeVertexNormals();let y=u(R,l);return y.position.copy(p).addScaledVector(C,.5),y.quaternion.setFromUnitVectors(new w(0,1,0),C.normalize()),y},m=f(-1);m.position.set(-.004,.015,-.05),m.rotation.set(0,0,-.25),this.gun.add(m);let x=f(1);x.position.set(.018,.005,.4),x.rotation.set(.2,0,.35),this.gun.add(x),this.gun.add(d(new w(-.01,0,.03),new w(-.3,-.42,.42),.058,.05)),this.gun.add(d(new w(.03,-.01,.47),new w(.28,-.4,.62),.062,.052)),this.lh=m,this.rh=x;let g=new zt({color:new ge(28,15,6),transparent:!0,depthWrite:!1,blending:ri,map:dy()});Uh(g),this.flash=new At;for(let p=0;p<3;p++){let _=new Ce(new Zn(p===0?.22:.09,p===0?.22:.42),g);p>0&&(_.rotation.x=Math.PI/2,_.rotation.y=p===2?Math.PI/2:0,_.position.z=-.16),_.frustumCulled=!1,this.flash.add(_)}this.flash.position.copy(this.muzzle.position),this.flash.visible=!1,this.gun.add(this.flash),this.state={ads:0,recoil:0,kick:0,sway:new oe,spr:0,cycle:0,reload:0,reloadTotal:1,melee:0,flashT:0,bob:0}}dispose(e){e.remove(this.root)}fire(){let e=this.state;e.recoil=1,e.kick=1,e.flashT=.045,this.flash.visible=!0,this.flash.rotation.z=Math.random()*6.28;let t=.8+Math.random()*.5;this.flash.scale.set(t,t,t)}muzzleWorld(e){return this.muzzle.getWorldPosition(e)}update(e,t){let n=this.state;n.ads=t.ads,n.recoil=Math.max(0,n.recoil-e*6),n.kick=Math.max(0,n.kick-e*10),n.flashT>0&&(n.flashT-=e,n.flashT<=0&&(this.flash.visible=!1)),n.sway.x=ve(n.sway.x,ze(t.dyaw,-.25,.25),Rt(9,e)),n.sway.y=ve(n.sway.y,ze(t.dpitch,-.25,.25),Rt(9,e)),n.spr=ve(n.spr,t.sprint?1:0,Rt(7,e));let i=n.ads,r=new w(-this.rear.x,-this.rear.y-.012,-.42-this.rear.z),o=new w(.175,-.25,-.26),a=t.bob*(1-i*.85),c=ve(o.x,r.x,i)+Math.cos(t.stepPh)*.012*a-n.sway.x*.1,l=ve(o.y,r.y,i)-Math.abs(Math.sin(t.stepPh))*.014*a+n.sway.y*.08,h=ve(o.z,r.z,i)+n.kick*.075,u=n.recoil*.13*(1-i*.4)+n.sway.y*.35+ve(-.13,0,i),f=n.sway.x*.45+ve(.1,0,i),d=Math.cos(t.stepPh)*.02*a+ve(-.04,0,i);if(c-=n.spr*.06,l-=n.spr*.05,u-=n.spr*.3,f+=n.spr*.75,d+=n.spr*.45,t.reload>0){let m=ze(Math.min(t.reloadTotal-t.reload,t.reload)/.3,0,1);d+=m*.6,u+=m*.22,l-=m*.035,c-=m*.04,h+=m*.03,this.rh.position.y=.005+Math.max(0,Math.sin(t.time*15))*.03*m,this.rh.position.z=.4-m*.32}else if(t.cycle>0){let m=ze((.95-t.cycle)/.75,0,1),x=m>.12&&m<.92?Math.sin((m-.12)/.8*Math.PI):0;d+=x*.22*(1-i*.5),l-=x*.02,f-=x*.05,this.rh.position.z=.4-x*.33,this.rh.position.y=.005+x*.05,this.rh.position.x=.018+x*.05}else this.rh.position.set(ve(this.rh.position.x,.018,Rt(12,e)),ve(this.rh.position.y,.005,Rt(12,e)),ve(this.rh.position.z,.4,Rt(12,e)));if(t.melee>0){let m=1-t.melee/.55,x=m<.3?m/.3:1-(m-.3)/.7;h-=x*.38,l+=x*.03,c-=x*.08,f-=x*.12,u-=x*.05}this.gun.position.set(c,l,h),this.gun.rotation.set(u,f,d)}};function dy(){let s=document.createElement("canvas");s.width=s.height=128;let e=s.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.25,"rgba(255,220,160,0.8)"),t.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=t,e.save(),e.translate(64,64);for(let n=0;n<7;n++)e.rotate(Math.PI*2/7+Math.random()*.3),e.beginPath(),e.moveTo(-6,0),e.lineTo(0,-62*(.5+Math.random()*.5)),e.lineTo(6,0),e.fill();return e.restore(),e.beginPath(),e.arc(64,64,26,0,7),e.fill(),new es(s)}function Od(s){let e=new Map,t=new Map,n=s.clone();return zd(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;let r=i,o=e.get(i),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function zd(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)zd(s.children[n],e.children[n],t)}var xt=()=>new w,Nt=xt(),xi=xt(),yo=xt(),Mo=xt(),Bh=xt(),kh=xt(),wr=xt(),So=xt(),Eo=new Pt,Ar=new Pt,ec=new Pt,my=new Pt,gy=new w(0,1,0),xy=0;function Bd(s,e,t,n=1){e.lengthSq()<1e-10||t.lengthSq()<1e-10||(Eo.setFromUnitVectors(e.normalize(),t.normalize()),n<1&&Eo.slerp(my.identity(),1-n),s.getWorldQuaternion(Ar),s.parent.getWorldQuaternion(ec),Ar.premultiply(Eo),s.quaternion.copy(ec.invert().multiply(Ar)),s.updateMatrixWorld(!0))}function zi(s,e,t){Eo.setFromAxisAngle(e,t),s.getWorldQuaternion(Ar),s.parent.getWorldQuaternion(ec),Ar.premultiply(Eo),s.quaternion.copy(ec.invert().multiply(Ar)),s.updateMatrixWorld(!0)}function Hh(s,e,t,n,i,r=1){s.getWorldPosition(Nt),e.getWorldPosition(xi),t.getWorldPosition(yo);let o=Nt.distanceTo(xi),a=xi.distanceTo(yo);Mo.copy(n);let c=Nt.distanceTo(Mo),l=ze(c,Math.abs(o-a)+1e-4,o+a-1e-4);wr.subVectors(Mo,Nt).normalize(),Mo.copy(Nt).addScaledVector(wr,l);let h=ze((o*o+l*l-a*a)/(2*o*l),-1,1),u=Math.acos(h);kh.subVectors(i,Nt).cross(wr).normalize(),So.crossVectors(wr,kh).normalize(),So.dot(Bh.subVectors(i,Nt))<0&&So.negate(),Bh.copy(Nt).addScaledVector(wr,Math.cos(u)*o).addScaledVector(So,Math.sin(u)*o),Bd(s,yo.subVectors(xi,Nt),wr.subVectors(Bh,Nt),r),e.getWorldPosition(xi),t.getWorldPosition(yo),Bd(e,Nt.subVectors(yo,xi),So.subVectors(Mo,xi),r)}function vy(s){let e={};return s.traverse(t=>{t.isBone&&(e[t.name.replace("mixamorig","")]=t)}),e}var Hd=new Pe,kd=new Pe;function Ps(s,e,t,n=[0,0,0],i=[0,0,0],r=1){t.updateMatrixWorld(!0);let o=t.getWorldQuaternion(new Pt),a=s.getWorldPosition(xt()).add(xt().set(...n).applyQuaternion(o)),c=o.clone().multiply(new Pt().setFromEuler(new $i(i[0],i[1],i[2],"YXZ")));return Hd.compose(a,c,xt().set(r,r,r)),kd.copy(s.matrixWorld).invert().multiply(Hd),kd.decompose(e.position,e.quaternion,e.scale),s.add(e),e}function _y(s,e){let t=new Bt({map:s.map,normalMap:s.normalMap,roughness:1,metalness:1,envMapIntensity:.7});return t.userData.skinned=!0,jn(t,"armor"+e.key,n=>{Object.assign(n.uniforms,{tMetD:{value:jt.helmet.d},tMetA:{value:jt.helmet.arm},tWoolD:{value:jt.wool.d},tLeaD:{value:jt.leather.d},uMet:{value:new ge(...e.metal)},uCloth:{value:new ge(...e.cloth)},uLea:{value:new ge(...e.leather)}}),n.fragmentShader=n.fragmentShader.replace("#include <common>",`#include <common>
uniform sampler2D tMetD, tMetA, tWoolD, tLeaD; uniform vec3 uMet, uCloth, uLea; float aMetal; float aRough;`).replace("#include <map_fragment>",`
        vec3 o = texture2D(map, vMapUv).rgb;
        float lum = dot(o, vec3(0.3, 0.59, 0.11));
        float plate = smoothstep(0.08, 0.16, lum) * smoothstep(0.02, 0.08, o.r - o.b);
        float strap = 1.0 - smoothstep(0.012, 0.03, lum);
        float cloth = clamp(1.0 - plate - strap, 0.0, 1.0);
        vec2 duv = vMapUv * 7.0;
        vec3 mt = texture2D(tMetD, duv).rgb;
        float ml = dot(mt, vec3(0.3, 0.59, 0.11));
        vec3 met = mix(vec3(ml), mt, 0.18) * uMet * 1.5;
        vec3 arm = texture2D(tMetA, duv).rgb;
        vec3 wool = vec3(dot(texture2D(tWoolD, duv * 1.5).rgb, vec3(0.33))) * uCloth * 1.4;
        vec3 lea = vec3(dot(texture2D(tLeaD, duv).rgb, vec3(0.33))) * uLea * 1.3;
        float shade = 0.65 + 0.7 * clamp(lum / 0.25, 0.0, 1.0);
        diffuseColor.rgb = (met * plate + wool * cloth + lea * strap) * mix(1.0, shade, 0.5);
        aMetal = plate * 0.65;
        aRough = mix(mix(0.9, 0.55, strap), arm.g, plate);`).replace("#include <roughnessmap_fragment>","float roughnessFactor = aRough;").replace("#include <metalnessmap_fragment>","float metalnessFactor = aMetal;")})}function Vd(s){if(s==="ghoul"){let e=qt("leather",{color:new ge(.16,.045,.03),env:.35,repeat:[4,4],normalScale:1.6});return e.roughness=.55,jn(e,"ghoulskin",t=>{t.fragmentShader=t.fragmentShader.replace("#include <emissivemap_fragment>",`#include <emissivemap_fragment>
        float vein = smoothstep(0.62, 0.7, fract(sin(dot(floor(vMapUv * 40.0), vec2(12.9898, 78.233))) * 43758.5453));
        totalEmissiveRadiance += vec3(0.35, 0.06, 0.0) * vein * 0.0;`)})}return qt("hessian",{color:new ge(.36,.3,.24),env:.2,repeat:[6,6]})}var yy={legion:{key:"L",metal:[.11,.095,.09],cloth:[.07,.035,.03],leather:[.05,.035,.03]},antioch:{key:"A",metal:[.17,.17,.12],cloth:[.21,.18,.12],leather:[.12,.08,.05]}},Rr={};function My(){if(!Rr.brodie){let s=[[0,.115],[.06,.112],[.105,.09],[.13,.05],[.14,.012],[.175,0],[.19,-.008],[.188,-.014],[.17,-.006],[0,-.006]].map(e=>new oe(e[0],e[1]));Rr.brodie=new mr(s,24)}return Rr.brodie}function Sy(){if(!Rr.spiked){let s=[[0,.14],[.05,.135],[.1,.11],[.125,.06],[.132,0],[.14,-.06],[.155,-.1],[.15,-.105],[0,-.1]].map(e=>new oe(e[0],e[1]));Rr.spiked=new mr(s,20)}return Rr.spiked}var Qa=null;function Ey(){Qa||(Qa=$n.rifle.scene.clone(!0),Qa.traverse(e=>{e.name==="bolt_action_rifle_7_62_scope"&&(e.visible=!1)}));let s=Qa.clone(!0);return s.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),s}function by(s){let e=s==="legion"||s==="antioch"?$n.soldier:$n.xbot,t=Od(e.scene),n=vy(t),i=new At;i.add(t),t.traverse(l=>{(l.isSkinnedMesh||l.isMesh)&&(l.castShadow=!0,l.receiveShadow=!0,l.frustumCulled=!1,l.name.includes("visor")&&(l.visible=!1))}),e===$n.soldier&&(t.rotation.y=Math.PI);let r=new Ua(t),o=l=>e.animations.find(h=>l.test(h.name)),a={};for(let[l,h]of[["idle",/^idle$/i],["walk",/^walk$/i],["run",/^run$/i]]){let u=o(h);if(u){let f=r.clipAction(u);f.play(),f.setEffectiveWeight(l==="idle"?1:0),a[l]=f}}r.update(0),i.updateMatrixWorld(!0);let c={B:n,extras:{}};if(s==="legion"||s==="antioch"){t.traverse(m=>{m.isSkinnedMesh&&m.visible&&(m.material=_y(m.material,yy[s]))});let l=zn("gasmask"),h=new At;h.add(l),l.position.set(0,-.99,0),Ps(n.Head,h,i,[0,.07,.1],[0,xy,0],1.05);let u=new Ce(s==="antioch"?My():Sy(),s==="antioch"?qt("helmet",{color:new ge(.55,.58,.45),metal:!0,env:.8}):qt("rust",{color:new ge(.25,.2,.2),metal:!0,env:.8}));u.castShadow=!0;let f=new At;if(f.add(u),u.position.set(0,s==="antioch"?.17:.14,0),s==="legion"){let m=new Ce(new so(.02,.2,6),u.material);m.position.set(0,.36,0),f.add(m);for(let x of[-1,1]){let g=new Ce(new so(.015,.13,5),u.material);g.position.set(x*.12,.25,-.02),g.rotation.z=-x*.9,f.add(g)}}Ps(n.Head,f,i,[0,0,0],[0,0,0],1),c.rifle=Ey(),c.rifle.rotation.set(0,-Math.PI/2,0);let d=new At;d.add(c.rifle),i.add(d),c.rifleHolder=d,c.muzzle=new dt,c.muzzle.position.set(0,.045,.64),d.add(c.muzzle),c.grip=new dt,c.grip.position.set(0,-.01,-.42),d.add(c.grip),c.fore=new dt,c.fore.position.set(0,.03,.1),d.add(c.fore)}else if(s==="ghoul"){let l=Vd("ghoul");t.traverse(f=>{f.isSkinnedMesh&&(f.material=f.material.name.includes("Joint")?new Bt({color:1180676,roughness:.6}):l)});for(let f of["LeftArm","RightArm","LeftForeArm","RightForeArm"])n[f]&&n[f].scale.set(.82,1.22,.82);for(let f of["LeftHand","RightHand"])n[f]&&n[f].scale.set(1.3,1.5,1.3);n.Neck&&n.Neck.scale.set(.9,1.25,.9);let h=new Bt({color:1708560,roughness:.45}),u=new At;for(let f of[-1,1]){let d=new no([xt().set(f*.06,.12,.02),xt().set(f*.13,.2,-.04),xt().set(f*.15,.3,-.14),xt().set(f*.1,.36,-.25)]),m=new Ra(d,12,.028,6),x=m.attributes.position,g=new Ce(m,h);g.castShadow=!0,u.add(g);let p=new Ce(new Un(.016,8,6),new zt({color:new ge(9,2.2,.4)}));p.position.set(f*.045,.06,.1),u.add(p)}Ps(n.Head,u,i,[0,0,0],[0,0,0],1),c.hunch=.5}else if(s==="penitent"){let l=Vd("penitent");t.traverse(b=>{b.isSkinnedMesh&&(b.material=b.material.name.includes("Joint")?new Bt({color:1709586,roughness:.9}):l)});let h=new Ce(new sn(.2,.36,.78,14,3,!0),qt("hessian",{color:new ge(.26,.19,.15),env:.2,repeat:[3,2],side:en}));h.castShadow=!0;let u=new At;u.add(h),h.position.y=-.36,Ps(n.Hips,u,i,[0,0,0],[0,0,0],1),c.robe=u;let f=qt("rust",{color:new ge(.35,.33,.32),metal:!0,env:.9}),d=new At,m=new Ce(new xn(.16,.2,.03),f);m.position.set(0,.07,.105),d.add(m);let x=new Ce(new xn(.14,.016,.04),new zt({color:0}));x.position.set(0,.1,.115),d.add(x);let g=new Ce(new xn(.018,.16,.03),f);g.position.set(0,.06,.122),d.add(g),Ps(n.Head,d,i,[0,0,0],[0,0,0],1);let p=new Ce(new ro(.2,.015,6,20),f),_=new At;_.add(p),p.rotation.set(1.3,0,.4),Ps(n.Spine2||n.Spine1,_,i,[0,0,0],[0,0,0],1);let v=new At,M=new Ce(new sn(.018,.02,.5,6),qt("bark",{env:.2}));M.position.y=0,v.add(M);let C=new Ce(new Un(.07,10,8),f);C.position.set(0,-.42,.05),v.add(C);for(let b=1;b<5;b++){let R=new Ce(new ro(.015,.005,4,8),f);R.position.set(0,-.25-b*.035,.01*b),R.rotation.y=b*1.4,v.add(R)}v.traverse(b=>{b.isMesh&&(b.castShadow=!0)}),Ps(n.RightHand,v,i,[0,-.08,.02],[0,0,0],1),c.hunch=.18}return{group:i,root:t,B:n,mixer:r,actions:a,parts:c}}var tc=class{constructor(e,t){this.scene=e,this.ctx=t,this.list=[],this.drops=[]}spawn(e,t,n){let i=this.ctx.factionData[e],r=by(i.model),o={kind:e,fc:i,m:r,x:ct(t)+j(-.4,.4),z:ct(n)+j(-.4,.4),yaw:0,hp:i.hp*(1+this.ctx.wave()*.04),alive:!0,deadT:0,speed:i.speed*j(.9,1.1),curSpeed:0,atkCd:j(.5,1.5),aimT:0,aimW:0,attackT:0,alert:!1,voiceT:j(1,5),knock:xt(),hitT:0,strafe:Math.random()<.5?1:-1,strafeT:j(1,3),animPh:Math.random()};return r.group.position.set(o.x,rt(o.x,o.z),o.z),r.mixer.update(Math.random()*2),this.scene.add(r.group),r.group.updateMatrixWorld(!0),this.list.push(o),o}clear(){for(let e of this.list)this.scene.remove(e.m.group);for(let e of this.drops)this.scene.remove(e.obj);this.list.length=0,this.drops.length=0}alive(){return this.list.filter(e=>e.alive).length}hitboxes(e){let t=e.m.B,n=[],i=(r,o,a,c,l)=>{r&&(r.getWorldPosition(Nt),l&&(l.getWorldPosition(xi),Nt.lerp(xi,.5)),n.push([Nt.x,Nt.y,Nt.z,o,a,c]))};return i(t.Head,.13,2.6,"head",t.HeadTop_End),i(t.Neck,.08,2,"head"),i(t.Spine2,.2,1.1,"body"),i(t.Spine1,.19,1,"body"),i(t.Spine,.19,1,"body"),i(t.Hips,.18,.9,"body"),i(t.LeftUpLeg,.11,.6,"leg",t.LeftLeg),i(t.RightUpLeg,.11,.6,"leg",t.RightLeg),i(t.LeftLeg,.08,.5,"leg",t.LeftFoot),i(t.RightLeg,.08,.5,"leg",t.RightFoot),i(t.LeftArm,.07,.5,"arm",t.LeftForeArm),i(t.RightArm,.07,.5,"arm",t.RightForeArm),i(t.LeftForeArm,.06,.5,"arm",t.LeftHand),i(t.RightForeArm,.06,.5,"arm",t.RightHand),n}raycast(e,t,n,i,r,o,a){let c=a,l=null,h=null;for(let u of this.list){if(!u.alive)continue;let f=u.x-e,d=u.z-n,m=f*i+d*o;if(!(m<-1||m>c+1)&&!(Math.abs(f*o-d*i)>1.2))for(let x of this.hitboxes(u)){let g=x[0]-e,p=x[1]-t,_=x[2]-n,v=g*i+p*r+_*o;if(v<0)continue;let M=g*g+p*p+_*_-v*v;if(M>x[3]*x[3])continue;let C=v-Math.sqrt(x[3]*x[3]-M);C>0&&C<c&&(c=C,l=u,h=x)}}return l?{e:l,t:c,hb:h}:null}damage(e,t,n,i,r,o,a,c){if(!e.alive)return;let{audio:l,fx:h}=this.ctx;e.hp-=t,e.alert=!0,e.hitT=.35,e.knock.x+=o*(c==="head"?1.2:2.2),e.knock.z+=a*(c==="head"?1.2:2.2),l.flesh(e.x,e.z,.5),h.blood(n,i,r,o,a,c==="head"),h.decal("blood",n+o*j(.4,1.4),rt(n+o,r+a)+.005,r+a*j(.4,1.4),0,1,0,j(.4,.9)),this.ctx.onHit&&this.ctx.onHit(e,c),e.hp<=0?(e.alive=!1,e.deadT=0,e.fall={dir:Math.random()<.5?1:-1,side:j(-.4,.4),spin:j(-.6,.6),fwd:o*Math.sin(e.yaw)+a*Math.cos(e.yaw)>0?1:-1},e.m.mixer.stopAllAction(),e.snap=[],e.m.root.traverse(u=>{u.isBone&&e.snap.push([u,u.quaternion.clone()])}),Math.random()<.75&&l.scream(e.x,e.z,.7),this.ctx.onKill&&this.ctx.onKill(e),Math.random()<(e.kind==="shooter"?.65:.35)&&this.spawnDrop(e.x,e.z)):Math.random()<.4&&(e.fc.model==="ghoul"?l.growl(e.x,e.z,.8):l.shout(e.x,e.z,.7))}spawnDrop(e,t){let n=zn("ammo_box");n.position.set(e+j(-.3,.3),rt(e,t)+.02,t+j(-.3,.3)),n.rotation.set(0,Math.random()*6,Math.PI/2),this.scene.add(n),this.drops.push({obj:n,x:n.position.x,z:n.position.z,t:0})}update(e,t){for(let n of this.list)this.updateOne(n,e,t);for(let n=this.list.length-1;n>=0;n--){let i=this.list[n];!i.alive&&i.deadT>40&&(this.scene.remove(i.m.group),this.list.splice(n,1))}if(this.list.length>30){let n=this.list.findIndex(i=>!i.alive);n>=0&&(this.scene.remove(this.list[n].m.group),this.list.splice(n,1))}}updateOne(e,t,n){let{audio:i}=this.ctx,r=e.m;if(!e.alive){this.updateDeath(e,t);return}let o=n.x-e.x,a=n.z-e.z,c=Math.hypot(o,a),l=c<50&&Ha(e.x,e.z,n.x,n.z);l&&(e.alert=!0),e.atkCd-=t,e.voiceT-=t,e.hitT-=t;let h=0,u=0,f=o,d=a,m=!1;e.kind==="rusher"?(c<1.5&&n.hp>0?e.atkCd<=0&&(e.atkCd=1.1,e.attackT=.45,i.swing(),setTimeout(()=>{e.alive&&Math.hypot(n.x-e.x,n.z-e.z)<1.9&&this.ctx.onPlayerHit(e.fc.dmg,e.x,e.z,"melee")},220)):l&&c<9?(h=o/c,u=a/c):([h,u]=nh(e.x,e.z),f=h,d=u),e.voiceT<=0&&c<32&&(e.voiceT=j(2.5,6),e.fc.model==="ghoul"?i.growl(e.x,e.z):i.chant(e.x,e.z))):(l&&c<36?(m=!0,e.aimT+=t,e.strafeT-=t,e.strafeT<0&&(e.strafe*=-1,e.strafeT=j(1,2.5)),c>15?(h=o/c*.55,u=a/c*.55):c<6?(h=-o/c*.5,u=-a/c*.5):(h=-a/c*e.strafe*.3,u=o/c*e.strafe*.3),e.aimT>1&&e.atkCd<=0&&e.aimW>.8&&(this.shoot(e,c,n),e.aimT=0,e.atkCd=j(1.9,3))):(e.aimT=Math.max(0,e.aimT-t),(e.alert||c<70)&&([h,u]=nh(e.x,e.z),f=h,d=u)),e.voiceT<=0&&l&&c<30&&(e.voiceT=j(4,9),i.shout(e.x,e.z,.6)));for(let L of this.list){if(L===e||!L.alive)continue;let y=e.x-L.x,E=e.z-L.z,F=Math.hypot(y,E);F<.7&&F>.001&&(h+=y/F*.6,u+=E/F*.6)}let x=Math.hypot(h,u),g=e.speed*(e.hitT>0?.3:1)*Math.min(1,x);x>.001&&(h/=x,u/=x),e.curSpeed=ve(e.curSpeed,g,Rt(6,t)),e.x+=(h*e.curSpeed+e.knock.x)*t,e.z+=(u*e.curSpeed+e.knock.z)*t,e.knock.multiplyScalar(Math.pow(.02,t)),go(e,.3);for(let L of Yt.colliders){let y=e.x-L.x,E=e.z-L.z,F=Math.hypot(y,E),V=L.r+.28;F<V&&F>1e-4&&(e.x=L.x+y/F*V,e.z=L.z+E/F*V)}let _=Math.atan2(f,d)-e.yaw;for(;_>Math.PI;)_-=Math.PI*2;for(;_<-Math.PI;)_+=Math.PI*2;e.yaw+=_*Rt(m?10:7,t),r.group.position.set(e.x,rt(e.x,e.z),e.z),r.group.rotation.y=e.yaw;let v=e.curSpeed,M=r.actions,C=ze(1-v/.8,0,1),b=ze((v-2.6)/1.4,0,1),R=ze(1-C-b,0,1);M.idle&&M.idle.setEffectiveWeight(C),M.walk&&(M.walk.setEffectiveWeight(R),M.walk.timeScale=ze(v/1.5,.6,1.6)),M.run&&(M.run.setEffectiveWeight(b),M.run.timeScale=ze(v/3.8,.8,1.5)),r.mixer.update(t),r.group.updateMatrixWorld(!0),e.aimW=ve(e.aimW,m?1:0,Rt(5,t)),this.pose(e,t,n,c)}pose(e,t,n,i){let r=e.m,o=r.B,a=r.parts,c=kh.set(Math.sin(e.yaw),0,Math.cos(e.yaw)),l=xt().set(-Math.cos(e.yaw),0,Math.sin(e.yaw));if(a.hunch&&o.Spine&&(zi(o.Spine,l,-a.hunch*.5),o.Spine1&&zi(o.Spine1,l,-a.hunch*.35),o.Neck&&zi(o.Neck,l,a.hunch*.55)),e.hitT>0&&o.Spine1&&zi(o.Spine1,l,Math.sin(e.hitT/.35*Math.PI)*.35),a.rifleHolder){let h=o.Spine2.getWorldPosition(xt()),u=Math.atan2(n.eyeY-1.45,Math.max(i,1)),f=a.rifleHolder,d=e.aimW,m=h.y-r.group.position.y;f.position.set(ve(-.08,-.16,d),ve(m-.32,m+.12,d),ve(.34,.46,d)),f.rotation.set(ve(-.5,-u,d),ve(.8,0,d),ve(.5,0,d),"YXZ"),f.updateMatrixWorld(!0);let x=a.grip.getWorldPosition(xt()),g=a.fore.getWorldPosition(xt()),p=h.clone().addScaledVector(l,.7).add(xt().set(0,-.6,0)).addScaledVector(c,-.2),_=h.clone().addScaledVector(l,-.6).add(xt().set(0,-.7,0)).addScaledVector(c,.3);Hh(o.RightArm,o.RightForeArm,o.RightHand,x,p,1),Hh(o.LeftArm,o.LeftForeArm,o.LeftHand,g,_,1)}else if(e.kind==="rusher"){let h=o.RightArm.getWorldPosition(xt()),u=ze(1-(i-1.2)/6,0,1)*(e.fc.model==="ghoul"?1:.5),f=e.attackT>0?1-e.attackT/.45:-1;e.attackT>0&&(e.attackT-=t);for(let d of[-1,1]){let m=d>0?o.RightArm:o.LeftArm,x=d>0?o.RightForeArm:o.LeftForeArm,g=d>0?o.RightHand:o.LeftHand,p=m.getWorldPosition(xt()),_=p.clone().addScaledVector(c,.55+u*.25).addScaledVector(l,d*.12).add(xt().set(0,-.05+Math.sin(performance.now()/160+d)*.06,0));if(f>=0&&d>0){let C=ve(-1.2,1.5,f);_.copy(p).addScaledVector(c,.35+Math.sin(f*Math.PI)*.4).add(xt().set(0,Math.cos(C)*.55*(f<.4?1:.6),0)).addScaledVector(l,.1)}let v=p.clone().addScaledVector(l,d*.5).add(xt().set(0,-.6,0)).addScaledVector(c,-.3),M=e.fc.model==="ghoul"?u*.8+(f>=0&&d>0?1:0):f>=0&&d>0?1:0;M>.01&&Hh(m,x,g,_,v,ze(M,0,1))}}}shoot(e,t,n){let{audio:i,fx:r,lights:o}=this.ctx;e.m.parts.muzzle.getWorldPosition(Nt),o.muzzleFlash(Nt,!0),i.enemyShot(e.x,e.z);let a=xi.set(n.x-Nt.x,n.eyeY-Nt.y,n.z-Nt.z).normalize();r.muzzleSmoke(Nt,a,1);let c=Math.hypot(n.vx,n.vz),l=.72-t*.014-(c>2?.22:c>.5?.08:0)-n.crouch*.12;if(l=ze(l,.1,.8),Math.random()<l)this.ctx.onPlayerHit(e.fc.dmg*j(.85,1.15),e.x,e.z,"bullet");else if(i.crack(-i.panOf(e.x,e.z)),Math.random()<.6){let h=n.x+j(-1.2,1.2),u=n.z+j(-1.2,1.2);r.impact(h,rt(h,u)+.01,u,0,1,0,1)}}updateDeath(e,t){let n=e.m,i=n.B,r=e.fall;if(e.deadT+=t,e.deadT>1.2&&e.settled)return;for(let[h,u]of e.snap)h.quaternion.copy(u);let o=ze(e.deadT/.75,0,1),a=o*o;n.group.rotation.set(r.fwd*a*1.45,e.yaw+r.spin*a,r.side*a,"YXZ"),e.x+=e.knock.x*t,e.z+=e.knock.z*t,e.knock.multiplyScalar(Math.pow(.05,t)),go(e,.3),n.group.position.set(e.x,rt(e.x,e.z)+.02-a*.08,e.z),n.group.updateMatrixWorld(!0);let c=xt().set(-Math.cos(e.yaw),0,Math.sin(e.yaw)).applyAxisAngle(gy,r.spin*a),l=Math.min(1,e.deadT/.5);i.Spine1&&zi(i.Spine1,c,-r.fwd*.45*l),i.LeftLeg&&zi(i.LeftLeg,c,.9*l),i.RightLeg&&zi(i.RightLeg,c,.55*l),i.LeftArm&&zi(i.LeftArm,c,-.6*l*r.dir),i.Head&&zi(i.Head,c,-.5*l*r.fwd),e.deadT>1.2&&(e.settled=!0)}};var Ty="varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",wy=`
varying vec2 vUv;
float hash12(vec2 p){ vec3 p3 = fract(vec3(p.xyx) * .1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
vec3 viewPosFromDepth(vec2 uv, float depth, mat4 projInv){ vec4 v = projInv * vec4(uv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0); return v.xyz / v.w; }
`;function Qn(s,e,t={}){let n=new Yn(Math.max(1,s),Math.max(1,e),{type:t.type??In,format:vn,minFilter:t.mip?qn:t.nearest?Ut:bt,magFilter:t.nearest?Ut:bt,depthBuffer:!!t.depth,generateMipmaps:!!t.mip,samples:t.samples||0});return t.depthTexture&&(n.depthTexture=new ur(s,e),n.depthTexture.type=ii),n}function vi(s,e,t={}){return new nn({vertexShader:Ty,fragmentShader:wy+s,uniforms:e,defines:t,depthTest:!1,depthWrite:!1})}var Ay=`
uniform sampler2D tDepth; uniform mat4 uProj, uProjInv; uniform vec3 uKernel[12]; uniform float uRadius, uTime;
void main(){
  float d = texture2D(tDepth, vUv).x;
  if (d >= 0.99999) { gl_FragColor = vec4(1.0); return; }
  vec3 P = viewPosFromDepth(vUv, d, uProjInv);
  if (-P.z < 0.08) { gl_FragColor = vec4(1.0); return; }
  vec3 N = normalize(cross(dFdx(P), dFdy(P)));
  float a = hash12(gl_FragCoord.xy) * 6.2831;
  vec3 rv = vec3(cos(a), sin(a), 0.0);
  vec3 T = normalize(rv - N * dot(rv, N)); vec3 B = cross(N, T);
  mat3 tbn = mat3(T, B, N);
  float occ = 0.0;
  float rad = uRadius;
  for (int i = 0; i < 12; i++) {
    vec3 S = P + tbn * uKernel[i] * rad;
    vec4 c = uProj * vec4(S, 1.0); vec2 suv = c.xy / c.w * 0.5 + 0.5;
    float sd = texture2D(tDepth, suv).x;
    vec3 SP = viewPosFromDepth(suv, sd, uProjInv);
    float range = smoothstep(0.0, 1.0, rad / abs(P.z - SP.z));
    occ += (SP.z >= S.z + 0.02 ? 1.0 : 0.0) * range;
  }
  float ao = clamp(1.0 - occ / 12.0, 0.0, 1.0);
  gl_FragColor = vec4(pow(ao, 1.5), 0.0, 0.0, 1.0);
}`,Ry=`
uniform sampler2D tAO, tDepth; uniform vec2 uTexel; uniform mat4 uProjInv;
void main(){
  float d0 = texture2D(tDepth, vUv).x;
  float z0 = viewPosFromDepth(vUv, d0, uProjInv).z;
  float s = 0.0, w = 0.0;
  for (int y = -2; y <= 2; y++) for (int x = -2; x <= 2; x++) {
    vec2 o = vec2(float(x), float(y)) * uTexel;
    float z = viewPosFromDepth(vUv + o, texture2D(tDepth, vUv + o).x, uProjInv).z;
    float k = exp(-abs(z - z0) / (0.06 * abs(z0) + 0.02));
    s += texture2D(tAO, vUv + o).r * k; w += k;
  }
  gl_FragColor = vec4(s / max(w, 1e-4), 0.0, 0.0, 1.0);
}`,Cy=`
#include <packing>
uniform sampler2D tDepth; uniform mat4 uProjInv, uViewInv; uniform vec3 uCamPos; uniform float uTime, uDensity, uMaxDist;
uniform vec3 uAmb;
uniform vec3 uTorchPos, uTorchDir, uTorchCol; uniform float uTorchCos, uTorchCosIn;
uniform sampler2D uTorchShadow; uniform mat4 uTorchShadowMat; uniform float uTorchHasShadow;
uniform vec3 uFlarePos, uFlareCol;
uniform vec3 uLanPos[6]; uniform vec3 uLanCol[6];
uniform vec3 uMuzPos, uMuzCol;
float h13(vec3 p){ p = fract(p * 0.1031); p += dot(p, p.zyx + 31.32); return fract((p.x + p.y) * p.z); }
float vn3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(mix(h13(i), h13(i+vec3(1,0,0)), f.x), mix(h13(i+vec3(0,1,0)), h13(i+vec3(1,1,0)), f.x), f.y),
             mix(mix(h13(i+vec3(0,0,1)), h13(i+vec3(1,0,1)), f.x), mix(h13(i+vec3(0,1,1)), h13(i+vec3(1,1,1)), f.x), f.y), f.z); }
float torchShadow(vec3 p){
  if (uTorchHasShadow < 0.5) return 1.0;
  vec4 sc = uTorchShadowMat * vec4(p, 1.0); sc.xyz /= sc.w;
  if (sc.x < 0.0 || sc.x > 1.0 || sc.y < 0.0 || sc.y > 1.0 || sc.z > 1.0) return 1.0;
  return step(sc.z - 0.003, unpackRGBAToDepth(texture2D(uTorchShadow, sc.xy)));
}
void main(){
  float d = texture2D(tDepth, vUv).x;
  vec3 vp = viewPosFromDepth(vUv, min(d, 0.99999), uProjInv);
  float dist = d >= 0.99999 ? 1e4 : length(vp);
  vec3 dirW = normalize((uViewInv * vec4(normalize(vp), 0.0)).xyz);
  float len = min(dist, uMaxDist);
  float stepL = len / float(STEPS);
  float j = fract(hash12(gl_FragCoord.xy) + uTime * 0.618);
  vec3 scat = vec3(0.0); float T = 1.0;
  for (int i = 0; i < STEPS; i++) {
    float t = (float(i) + j) * stepL;
    vec3 p = uCamPos + dirW * t;
    float n = vn3(p * 0.22 + vec3(uTime * 0.18, uTime * 0.03, uTime * 0.07)) * 0.65 + vn3(p * 0.7 - uTime * 0.1) * 0.35;
    float dens = uDensity * (exp(-max(p.y - 0.3, 0.0) * 0.55) + 0.12) * (0.35 + 1.3 * n);
    vec3 Li = uAmb;
    vec3 tl = p - uTorchPos; float tlen = max(length(tl), 0.05); vec3 td = tl / tlen;
    float cone = smoothstep(uTorchCos, uTorchCosIn, dot(td, uTorchDir));
    cone *= smoothstep(0.5, 3.0, tlen);   // \u0443 \u0441\u0430\u043C\u043E\u0433\u043E \u0444\u043E\u043D\u0430\u0440\u044F \u0440\u0430\u0441\u0441\u0435\u044F\u043D\u0438\u0435 \u043D\u0435 \u0441\u0447\u0438\u0442\u0430\u0435\u043C: \u0438\u043D\u0430\u0447\u0435 \u043F\u0435\u043B\u0435\u043D\u0430 \u043D\u0430 \u0432\u0435\u0441\u044C \u043A\u0430\u0434\u0440
    if (cone > 0.001) Li += uTorchCol * cone * torchShadow(p) / (tlen * tlen + 0.25) * (0.6 + 0.4 * dot(td, dirW));
    vec3 fl = uFlarePos - p; Li += uFlareCol / (dot(fl, fl) + 4.0);
    for (int k = 0; k < 6; k++) { vec3 ll = uLanPos[k] - p; Li += uLanCol[k] / (dot(ll, ll) * 2.5 + 0.12); }
    vec3 ml = uMuzPos - p; Li += uMuzCol / (dot(ml, ml) * 2.0 + 0.1);
    float ext = dens * stepL;
    scat += T * Li * ext;
    T *= exp(-ext);
  }
  gl_FragColor = vec4(scat, T);
}`,Py=`
uniform sampler2D tScene, tDepth, tAO, tVol; uniform mat4 uProj, uProjInv, uView; uniform float uAO, uSSR, uTime; uniform vec3 uSkyRefl;
void main(){
  vec4 sc = texture2D(tScene, vUv);
  vec3 col = sc.rgb;
  float d = texture2D(tDepth, vUv).x;
  col *= mix(1.0, texture2D(tAO, vUv).r, uAO);
  float pud = clamp((1.0 - sc.a) * 1.15, 0.0, 1.0);
  if (uSSR > 0.5 && pud > 0.02 && d < 0.99999) {
    vec3 P = viewPosFromDepth(vUv, d, uProjInv);
    vec3 V = normalize(P);
    vec2 jn = vec2(hash12(vUv * 913.1 + uTime), hash12(vUv * 517.3 - uTime)) - 0.5;
    vec3 N = normalize((uView * vec4(jn.x * 0.06, 1.0, jn.y * 0.06, 0.0)).xyz);
    vec3 R = reflect(V, N);
    vec3 hit = uSkyRefl; float found = 0.0;
    vec3 Q = P; float st = 0.06;
    for (int i = 0; i < 30; i++) {
      Q += R * st; st *= 1.16;
      vec4 c = uProj * vec4(Q, 1.0); vec2 suv = c.xy / c.w * 0.5 + 0.5;
      if (suv.x < 0.0 || suv.x > 1.0 || suv.y < 0.0 || suv.y > 1.0) break;
      float sd = texture2D(tDepth, suv).x;
      if (sd >= 0.99999) { if (i > 3) { hit = texture2D(tScene, suv).rgb; found = 1.0; break; } continue; }
      vec3 SP = viewPosFromDepth(suv, sd, uProjInv);
      float diff = SP.z - Q.z;
      if (diff > 0.0 && diff < 0.35 + st) {
        float edge = smoothstep(0.0, 0.08, min(min(suv.x, 1.0 - suv.x), min(suv.y, 1.0 - suv.y)));
        hit = mix(uSkyRefl, texture2D(tScene, suv).rgb, edge); found = 1.0; break;
      }
    }
    float F = 0.02 + 0.98 * pow(1.0 - max(dot(-V, N), 0.0), 5.0);
    col += hit * F * pud * 0.9;
  }
  vec4 vol = texture2D(tVol, vUv);
  col = col * vol.a + vol.rgb;
  gl_FragColor = vec4(col, 1.0);
}`,Ly=`
uniform sampler2D tSrc; uniform vec2 uTexel; uniform float uPrefilter; uniform sampler2D tExp; uniform float uThreshold;
vec3 S(vec2 o){ return texture2D(tSrc, vUv + o * uTexel).rgb; }
void main(){
  vec3 a = S(vec2(-2,-2)), b = S(vec2(0,-2)), c = S(vec2(2,-2)), d = S(vec2(-1,-1)), e = S(vec2(1,-1)), f = S(vec2(-2,0)), g = S(vec2(0,0)),
       h = S(vec2(2,0)), i = S(vec2(-1,1)), j = S(vec2(1,1)), k = S(vec2(-2,2)), l = S(vec2(0,2)), m = S(vec2(2,2));
  vec3 col = (d + e + i + j) * 0.125 + (a + b + f + g) * 0.03125 + (b + c + g + h) * 0.03125 + (f + g + k + l) * 0.03125 + (g + h + l + m) * 0.03125;
  if (uPrefilter > 0.5) {
    float ex = texture2D(tExp, vec2(0.5)).r;
    vec3 ce = col * ex;
    float br = max(ce.r, max(ce.g, ce.b));
    float soft = clamp(br - uThreshold + 0.5, 0.0, 1.0); soft = soft * soft * 0.5;
    float w = max(soft, br - uThreshold) / max(br, 1e-4);
    col *= max(w, 0.0);
    col = min(col, vec3(64.0 / max(ex, 1e-3)));
  }
  gl_FragColor = vec4(col, 1.0);
}`,Iy=`
uniform sampler2D tSrc; uniform vec2 uTexel; uniform float uScatter;
void main(){
  vec3 s = texture2D(tSrc, vUv + vec2(-1,-1) * uTexel).rgb + texture2D(tSrc, vUv + vec2(1,-1) * uTexel).rgb
         + texture2D(tSrc, vUv + vec2(-1,1) * uTexel).rgb + texture2D(tSrc, vUv + vec2(1,1) * uTexel).rgb
         + 2.0 * (texture2D(tSrc, vUv + vec2(0,-1) * uTexel).rgb + texture2D(tSrc, vUv + vec2(0,1) * uTexel).rgb
         + texture2D(tSrc, vUv + vec2(-1,0) * uTexel).rgb + texture2D(tSrc, vUv + vec2(1,0) * uTexel).rgb)
         + 4.0 * texture2D(tSrc, vUv).rgb;
  gl_FragColor = vec4(s / 16.0 * uScatter, 1.0);
}`,Dy=`
uniform sampler2D tSrc;
void main(){
  vec3 c = texture2D(tSrc, vUv).rgb;
  float l = max(dot(c, vec3(0.2126, 0.7152, 0.0722)), 0.004);
  vec2 q = vUv - 0.5;
  float w = exp(-dot(q, q) * 6.0) + 0.15;   // \u0446\u0435\u043D\u0442\u0440\u043E\u0432\u0437\u0432\u0435\u0448\u0435\u043D\u043D\u044B\u0439 \u0437\u0430\u043C\u0435\u0440, \u043A\u0430\u043A \u0443 \u043D\u043E\u0441\u0438\u043C\u044B\u0445 \u043A\u0430\u043C\u0435\u0440
  gl_FragColor = vec4(log2(l + 1e-4) * w, w, 0.0, 1.0);
}`,Uy=`
uniform sampler2D tLum, tPrev; uniform float uDt, uKey, uMin, uMax, uUp, uDown, uReset;
void main(){
  vec4 a = textureLod(tLum, vec2(0.5), 10.0);
  float avg = exp2(a.r / max(a.g, 1e-4));
  float target = clamp(uKey / max(avg, 1e-5), uMin, uMax);
  float prev = texture2D(tPrev, vec2(0.5)).r;
  if (uReset > 0.5 || prev <= 0.0) prev = target;
  float sp = target > prev ? uUp : uDown;
  float e = prev + (target - prev) * (1.0 - exp(-uDt * sp));
  gl_FragColor = vec4(e, avg, 0.0, 1.0);
}`,Ny=`
uniform sampler2D tComp, tBloom, tExp, tPrev; uniform vec2 uRes; uniform float uTime;
uniform vec2 uVel; uniform float uDist, uCA, uDmg, uGlitch, uFlash, uDead, uLowHP, uBloom, uHist, uRain;
vec3 aces(vec3 x){ return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0); }
vec2 barrel(vec2 uv){ vec2 c = uv * 2.0 - 1.0; float r2 = dot(c, c); c *= (1.0 + uDist * r2 + uDist * 0.35 * r2 * r2) / (1.0 + uDist * 1.25); return c * 0.5 + 0.5; }
vec3 hdr(vec2 uv){ return texture2D(tComp, uv).rgb; }
// \u043A\u0430\u043F\u043B\u0438 \u043D\u0430 \u043E\u0431\u044A\u0435\u043A\u0442\u0438\u0432\u0435
vec3 drops(vec2 uv, float t){
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  vec2 off = vec2(0.0); float rim = 0.0;
  for (int L = 0; L < 2; L++) {
    vec2 g = uv * asp * (L == 0 ? 7.0 : 13.0);
    vec2 id = floor(g); vec2 f = fract(g) - 0.5;
    float h = hash12(id + float(L) * 17.0);
    if (h > 0.83) {
      float life = fract(t * 0.05 + h * 7.0);
      vec2 c = (vec2(hash12(id + 3.1), hash12(id + 7.7)) - 0.5) * 0.6;
      c.y -= life * life * 0.35 * step(0.93, h);       // \u043A\u0440\u0443\u043F\u043D\u044B\u0435 \u0441\u043F\u043E\u043B\u0437\u0430\u044E\u0442
      float r = (L == 0 ? 0.18 : 0.12) * (0.6 + 0.4 * h);
      vec2 q = f - c; q.y *= 1.15;
      float dd = length(q);
      float m = smoothstep(r, r * 0.6, dd) * smoothstep(1.0, 0.7, life);
      off += q * m * (L == 0 ? 0.045 : 0.025);
      rim += smoothstep(r * 0.95, r * 0.8, dd) * smoothstep(r * 0.4, r * 0.85, dd) * m;
    }
  }
  return vec3(off, rim);
}
void main(){
  float ex = texture2D(tExp, vec2(0.5)).r;
  vec2 uv = vUv;
  uv.x += (uv.y - 0.5) * uVel.x * 0.4;                          // rolling shutter
  float g = uGlitch + uDead;
  if (g > 0.0) {
    float line = floor(uv.y * 64.0);
    float n = hash12(vec2(line, floor(uTime * 20.0)));
    if (n < g * 0.55) uv.x += (hash12(vec2(line, floor(uTime * 37.0))) - 0.5) * 0.1 * g;
  }
  vec3 dr = drops(uv, uTime) * uRain;
  uv += dr.xy;
  vec2 d = barrel(uv);
  vec2 c = d - 0.5;
  float ca = uCA * (0.3 + dot(c, c) * 4.0) * (1.0 + g * 4.0);
  vec3 col = vec3(0.0);
  for (int i = 0; i < 8; i++) {
    vec2 o = uVel * (float(i) / 7.0 - 0.5);
    vec2 p = d + o;
    col += vec3(hdr(p + c * ca).r, hdr(p).g, hdr(p - c * ca).b);
  }
  col /= 8.0;
  // \u0441\u0432\u0435\u0447\u0435\u043D\u0438\u0435 \u0438 \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \xAB\u0437\u0430\u0441\u0432\u0435\u0442\u044B\xBB \u0441\u0435\u043D\u0441\u043E\u0440\u0430
  vec3 bl = texture2D(tBloom, d).rgb;
  vec3 streak = (texture2D(tBloom, d + vec2(0.03, 0.0)).rgb + texture2D(tBloom, d - vec2(0.03, 0.0)).rgb
               + texture2D(tBloom, d + vec2(0.08, 0.0)).rgb + texture2D(tBloom, d - vec2(0.08, 0.0)).rgb) * 0.25;
  col += (bl * 0.45 + streak * vec3(0.2, 0.24, 0.3)) * uBloom;
  col *= ex * (1.0 + uFlash * 0.6);
  // \u0440\u0435\u0437\u043A\u043E\u0441\u0442\u044C (\u0442\u0438\u043F\u0438\u0447\u043D\u044B\u0439 \xAB\u043F\u0435\u0440\u0435\u0448\u0430\u0440\u043F\xBB \u043D\u043E\u0441\u0438\u043C\u044B\u0445 \u043A\u0430\u043C\u0435\u0440)
  vec2 px = 1.0 / uRes;
  float lc = dot(aces(hdr(d) * ex), vec3(0.299, 0.587, 0.114));
  float ln = dot(aces(hdr(d + vec2(px.x, 0.0)) * ex) + aces(hdr(d - vec2(px.x, 0.0)) * ex) + aces(hdr(d + vec2(0.0, px.y)) * ex) + aces(hdr(d - vec2(0.0, px.y)) * ex), vec3(0.299, 0.587, 0.114)) * 0.25;
  col = aces(col * 1.1);
  col += (lc - ln) * 0.9;
  col = pow(max(col, 0.0), vec3(1.0 / 2.2));
  // \u0446\u0432\u0435\u0442: \u043E\u0431\u0435\u0441\u0446\u0432\u0435\u0447\u0435\u043D\u043E, \u0445\u043E\u043B\u043E\u0434\u043D\u044B\u0435 \u0442\u0435\u043D\u0438, \u0436\u0451\u0441\u0442\u043A\u0438\u0435 \u0447\u0451\u0440\u043D\u044B\u0435
  float l = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(l), col, 0.72 - uLowHP * 0.45);
  col = mix(col * vec3(0.93, 1.0, 1.05), col * vec3(1.04, 1.0, 0.94), smoothstep(0.25, 0.75, l));
  col = max((col - 0.025) * 1.08, 0.0);
  // \u043A\u043E\u043C\u043F\u0440\u0435\u0441\u0441\u0438\u044F: \u043C\u0430\u043A\u0440\u043E\u0431\u043B\u043E\u043A\u0438 \u0432 \u0442\u0451\u043C\u043D\u044B\u0445 \u043F\u043B\u043E\u0441\u043A\u0438\u0445 \u0443\u0447\u0430\u0441\u0442\u043A\u0430\u0445
  vec2 bc = (floor(gl_FragCoord.xy / 8.0) * 8.0 + 4.0) / uRes;
  vec3 blk = pow(aces(hdr(barrel(bc)) * ex * 1.1), vec3(1.0 / 2.2));
  float dark = 1.0 - smoothstep(0.04, 0.22, l);
  col = mix(col, blk, dark * 0.35);
  // \u0448\u0443\u043C \u0441\u0435\u043D\u0441\u043E\u0440\u0430: \u0441\u0438\u043B\u044C\u043D\u0435\u0435, \u043A\u043E\u0433\u0434\u0430 \u043A\u0430\u043C\u0435\u0440\u0430 \u0432\u044B\u0442\u044F\u0433\u0438\u0432\u0430\u0435\u0442 \u0442\u0435\u043C\u043D\u043E\u0442\u0443
  float gain = clamp(log2(max(ex, 1.0)) / 9.0, 0.0, 1.0);
  float n = hash12(gl_FragCoord.xy + fract(uTime * 13.7) * 977.0) - 0.5;
  vec3 cn = vec3(hash12(gl_FragCoord.xy * 1.3 + uTime), hash12(gl_FragCoord.xy * 0.7 - uTime), hash12(gl_FragCoord.xy + 31.0 + uTime)) - 0.5;
  float nAmt = (0.03 + gain * 0.07) * (1.0 - l * 0.6) + g * 0.2;
  col += n * nAmt + cn * nAmt * 0.45;
  // \u043A\u0430\u043F\u043B\u0438: \u0441\u0432\u0435\u0442\u043B\u044B\u0439 \u043E\u0431\u043E\u0434\u043E\u043A
  col += dr.z * 0.06 * (0.3 + l);
  if (d.x < 0.0 || d.x > 1.0 || d.y < 0.0 || d.y > 1.0) col = vec3(0.0);
  float r = length((vUv - 0.5) * vec2(1.1, 1.0));
  col *= mix(0.3, 1.0, smoothstep(0.8, 0.28, r));
  col = mix(col, col * vec3(1.4, 0.3, 0.25) + vec3(0.12, 0.0, 0.0), clamp(uDmg, 0.0, 1.0) * smoothstep(0.15, 0.7, r + uDmg * 0.2));
  if (uDead > 0.0) col = mix(col, vec3(hash12(gl_FragCoord.xy + uTime * 60.0)) * 0.6, uDead * 0.75);
  vec3 prev = texture2D(tPrev, vUv).rgb;
  col = mix(clamp(col, 0.0, 1.0), prev, uHist * dark);
  gl_FragColor = vec4(col, 1.0);
}`,Fy="uniform sampler2D tSrc; void main(){ gl_FragColor = texture2D(tSrc, vUv); }",nc=class{constructor(e,t){this.r=e,this.q=t,this.scale=t.scale,this.quad=new Ce(new Zn(2,2)),this.quad.frustumCulled=!1,this.qs=new fr,this.qs.add(this.quad),this.qc=new ji(-1,1,1,-1,0,1);let n=[];for(let r=0;r<12;r++){let o=new w(Math.random()*2-1,Math.random()*2-1,Math.random()*.85+.15).normalize(),a=r/12;o.multiplyScalar(Ts.lerp(.15,1,a*a)*(.5+Math.random()*.5)),n.push(o)}this.mSSAO=vi(Ay,{tDepth:{value:null},uProj:{value:new Pe},uProjInv:{value:new Pe},uKernel:{value:n},uRadius:{value:.55},uTime:{value:0}}),this.mBlurAO=vi(Ry,{tAO:{value:null},tDepth:{value:null},uTexel:{value:new oe},uProjInv:{value:new Pe}});let i=()=>({value:new w});this.mVol=vi(Cy,{tDepth:{value:null},uProjInv:{value:new Pe},uViewInv:{value:new Pe},uCamPos:i(),uTime:{value:0},uDensity:{value:.07},uMaxDist:{value:55},uAmb:i(),uTorchPos:i(),uTorchDir:i(),uTorchCol:i(),uTorchCos:{value:.88},uTorchCosIn:{value:.95},uTorchShadow:{value:null},uTorchShadowMat:{value:new Pe},uTorchHasShadow:{value:0},uFlarePos:i(),uFlareCol:i(),uLanPos:{value:Array.from({length:6},()=>new w(0,-100,0))},uLanCol:{value:Array.from({length:6},()=>new w)},uMuzPos:i(),uMuzCol:i()},{STEPS:t.volSteps}),this.mComp=vi(Py,{tScene:{value:null},tDepth:{value:null},tAO:{value:null},tVol:{value:null},uProj:{value:new Pe},uProjInv:{value:new Pe},uView:{value:new Pe},uAO:{value:t.ao?.75:0},uSSR:{value:t.ssr?1:0},uTime:{value:0},uSkyRefl:{value:new w(.004,.005,.008)}}),this.mDown=vi(Ly,{tSrc:{value:null},uTexel:{value:new oe},uPrefilter:{value:0},tExp:{value:null},uThreshold:{value:1.3}}),this.mUp=vi(Iy,{tSrc:{value:null},uTexel:{value:new oe},uScatter:{value:.75}}),this.mUp.blending=ri,this.mLum=vi(Dy,{tSrc:{value:null}}),this.mExp=vi(Uy,{tLum:{value:null},tPrev:{value:null},uDt:{value:.016},uKey:{value:.085},uMin:{value:.5},uMax:{value:180},uUp:{value:1.6},uDown:{value:3.5},uReset:{value:1}}),this.mFinal=vi(Ny,{tComp:{value:null},tBloom:{value:null},tExp:{value:null},tPrev:{value:null},uRes:{value:new oe},uTime:{value:0},uVel:{value:new oe},uDist:{value:.32},uCA:{value:.005},uDmg:{value:0},uGlitch:{value:0},uFlash:{value:0},uDead:{value:0},uLowHP:{value:0},uBloom:{value:t.bloom?1:0},uHist:{value:.18},uRain:{value:1}}),this.mCopy=vi(Fy,{tSrc:{value:null}}),this.rtLum=Qn(128,128,{mip:!0}),this.rtExp=[Qn(1,1,{nearest:!0}),Qn(1,1,{nearest:!0})],this.expIdx=0,this.outIdx=0,this.prevView=new Pe,this.size=new oe(1,1)}setQuality(e){this.q=e,this.scale=e.scale,this.mVol.defines.STEPS=e.volSteps,this.mVol.needsUpdate=!0,this.mComp.uniforms.uAO.value=e.ao?.75:0,this.mComp.uniforms.uSSR.value=e.ssr?1:0,this.mFinal.uniforms.uBloom.value=e.bloom?1:0,this.resize(this.cssW,this.cssH,this.dpr)}resize(e,t,n){this.cssW=e,this.cssH=t,this.dpr=n;let i=Math.min(n,this.q.hiDpi?2:1)*this.scale,r=Math.max(16,Math.round(e*i)),o=Math.max(16,Math.round(t*i));if(this.w===r&&this.h===o)return;this.w=r,this.h=o;let a=f=>f&&f.dispose();[this.rtScene,this.rtAO,this.rtAO2,this.rtVol,this.rtComp,...this.rtOut||[],...this.bloom||[]].forEach(a),this.rtScene=Qn(r,o,{depth:!0,depthTexture:!0,samples:this.q.msaa});let c=Math.ceil(r/2),l=Math.ceil(o/2);this.rtAO=Qn(c,l,{type:bn}),this.rtAO2=Qn(c,l,{type:bn}),this.rtVol=Qn(c,l),this.rtComp=Qn(r,o),this.rtOut=[Qn(r,o,{type:bn}),Qn(r,o,{type:bn})],this.bloom=[];let h=c,u=l;for(let f=0;f<6;f++)this.bloom.push(Qn(h,u)),h=Math.max(1,Math.ceil(h/2)),u=Math.max(1,Math.ceil(u/2));this.mFinal.uniforms.uRes.value.set(r,o),this.r.setSize(e,t,!1),this.r.setPixelRatio(1),this.r.domElement.style.width=e+"px",this.r.domElement.style.height=t+"px",this.r.setSize(e,t,!1)}pass(e,t,n=!0){this.quad.material=e,this.r.setRenderTarget(t),n&&this.r.clear(),this.r.render(this.qs,this.qc)}render(e,t,n){let i=this.r;i.autoClear=!1,i.setRenderTarget(this.rtScene),i.setClearColor(0,1),i.clear(!0,!0,!0),i.render(e,t);let r=this.rtScene.depthTexture,o=t.projectionMatrixInverse;if(this.q.ao){let c=this.mSSAO.uniforms;c.tDepth.value=r,c.uProj.value.copy(t.projectionMatrix),c.uProjInv.value.copy(o),c.uTime.value=n.time,this.pass(this.mSSAO,this.rtAO);let l=this.mBlurAO.uniforms;l.tAO.value=this.rtAO.texture,l.tDepth.value=r,l.uProjInv.value.copy(o),l.uTexel.value.set(1/this.rtAO.width,1/this.rtAO.height),this.pass(this.mBlurAO,this.rtAO2)}else this.aoCleared||(i.setRenderTarget(this.rtAO2),i.setClearColor(16777215,1),i.clear(),i.setClearColor(0,1),this.aoCleared=!0);{let c=this.mVol.uniforms;c.tDepth.value=r,c.uProjInv.value.copy(o),c.uViewInv.value.copy(t.matrixWorld),c.uCamPos.value.setFromMatrixPosition(t.matrixWorld),c.uTime.value=n.time,c.uDensity.value=n.fogDensity,c.uAmb.value.copy(n.fogAmb);let l=n.torch;c.uTorchPos.value.copy(l.pos),c.uTorchDir.value.copy(l.dir),c.uTorchCol.value.copy(l.col),c.uTorchCos.value=l.cosOut,c.uTorchCosIn.value=l.cosIn,l.shadowMap?(c.uTorchShadow.value=l.shadowMap,c.uTorchShadowMat.value.copy(l.shadowMatrix),c.uTorchHasShadow.value=1):c.uTorchHasShadow.value=0,c.uFlarePos.value.copy(n.flare.pos),c.uFlareCol.value.copy(n.flare.col);for(let h=0;h<6;h++){let u=n.lanterns[h];u?(c.uLanPos.value[h].copy(u.pos),c.uLanCol.value[h].copy(u.col)):(c.uLanPos.value[h].set(0,-100,0),c.uLanCol.value[h].set(0,0,0))}c.uMuzPos.value.copy(n.muzzle.pos),c.uMuzCol.value.copy(n.muzzle.col),this.pass(this.mVol,this.rtVol)}{let c=this.mComp.uniforms;c.tScene.value=this.rtScene.texture,c.tDepth.value=r,c.tAO.value=this.rtAO2.texture,c.tVol.value=this.rtVol.texture,c.uProj.value.copy(t.projectionMatrix),c.uProjInv.value.copy(o),c.uView.value.copy(t.matrixWorldInverse),c.uTime.value=n.time,this.pass(this.mComp,this.rtComp)}{this.mLum.uniforms.tSrc.value=this.rtComp.texture,this.pass(this.mLum,this.rtLum);let c=this.rtExp[this.expIdx],l=this.rtExp[1-this.expIdx],h=this.mExp.uniforms;h.tLum.value=this.rtLum.texture,h.tPrev.value=c.texture,h.uDt.value=n.dt,h.uReset.value=this.resetExp?1:0,this.resetExp=!1,this.pass(this.mExp,l),this.expIdx=1-this.expIdx}let a=this.rtExp[this.expIdx].texture;if(this.q.bloom){let c=this.rtComp;for(let l=0;l<this.bloom.length;l++){let h=this.mDown.uniforms;h.tSrc.value=c.texture,h.uTexel.value.set(1/c.width,1/c.height),h.uPrefilter.value=l===0?1:0,h.tExp.value=a,this.pass(this.mDown,this.bloom[l]),c=this.bloom[l]}for(let l=this.bloom.length-1;l>0;l--){let h=this.mUp.uniforms;h.tSrc.value=this.bloom[l].texture,h.uTexel.value.set(1/this.bloom[l].width,1/this.bloom[l].height),this.pass(this.mUp,this.bloom[l-1],!1)}}{let c=this.mFinal.uniforms,l=this.rtOut[this.outIdx],h=this.rtOut[1-this.outIdx];c.tComp.value=this.rtComp.texture,c.tBloom.value=this.bloom[0].texture,c.tExp.value=a,c.tPrev.value=h.texture,c.uTime.value=n.time,c.uVel.value.copy(n.vel),c.uDmg.value=n.dmg,c.uGlitch.value=n.glitch,c.uFlash.value=n.flash,c.uDead.value=n.dead,c.uLowHP.value=n.lowhp,c.uRain.value=n.rain,this.pass(this.mFinal,l),this.mCopy.uniforms.tSrc.value=l.texture,this.pass(this.mCopy,null),this.outIdx=1-this.outIdx}}};function By(){try{let s=document.createElement("canvas").getContext("webgl2"),e=s&&s.getExtension("WEBGL_debug_renderer_info"),t=e?String(s.getParameter(e.UNMASKED_RENDERER_WEBGL)):"";if(/swiftshader|llvmpipe|software/i.test(t))return"low";if(/intel|mali|adreno|powervr|apple gpu/i.test(t))return"medium"}catch{}return"high"}var Kd=li.get("quality",null)||By(),Hi=jl[Kd]||jl.high,bo=Be("c"),Vi=new Jr({canvas:bo,antialias:!1,powerPreference:"high-performance",stencil:!1});Vi.shadowMap.enabled=!0;Vi.shadowMap.type=kl;Vi.toneMapping=si;Vi.outputColorSpace=Lt;var Hn=new fr,lt=new Gt(88,1,.04,600);lt.rotation.order="YXZ";Hn.add(lt);var ki=new nc(Vi,Hi),le={mode:"loading",faction:"loyal",wave:0,kills:0,queue:[],spawnT:0,breakT:0,time:0,clock:4*3600+13*60+27,deadT:0,shots:0,hits:0,survived:0},Q={x:0,z:0,vx:0,vz:0,yaw:0,pitch:0,camYaw:0,camPitch:0,hp:100,lastHurt:-99,stamina:1,crouch:0,ads:0,ammo:5,reserve:40,cycleT:0,reloadT:0,reloadTotal:1,reloadLoaded:0,meleeT:0,meleeHit:!1,bobAmt:0,stepPh:0,shake:0,eyeY:1.42,roll:0,lastBeat:0,sprinting:!1,prevYaw:0,prevPitch:0},kn={},Pr=!1,To=!1,cc=!1,Ls=!1,lc=li.get("sens",1),hc=li.get("showdot",!1),Ft={dmg:0,glitch:0,flash:0,hit:0},fc=null,cs=null,Zt=null,Rn=null;async function Hy(){Be("q-label").textContent=Hi.label;let s=Be("load-bar"),e=Be("load-txt");try{await bd(Vi,(r,o)=>{s.style.width=Math.round(r*100)+"%",e.textContent=`\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0444\u043E\u0442\u043E\u0441\u043A\u0430\u043D\u043E\u0432: ${Math.round(r*100)}%`})}catch(r){e.textContent="\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0430\u0441\u0441\u0435\u0442\u044B. \u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0438\u0433\u0440\u0443 \u0447\u0435\u0440\u0435\u0437 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0435\u0440\u0432\u0435\u0440 (play.bat / play.sh) \u0438\u043B\u0438 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435.",console.error(r);return}e.textContent="\u041A\u043E\u043F\u0430\u0435\u043C \u043E\u043A\u043E\u043F\u044B\u2026",await new Promise(r=>setTimeout(r,30));let t=+new URLSearchParams(location.search).get("seed")||Math.floor(Math.random()*1e6);md(t),Rd(Hn,Hi),Pd(Hn,Hi);let n=Id(Hn);n.ring.position.set(44*2/2,0,30*2/2),fc={sky:n},Dd(Hn,lt,Hi);let i=Cd();cs=new Ka(Hn,Hi,i),Zt=new tc(Hn,{factionData:Ba.loyal,wave:()=>le.wave,audio:Tt,fx:cs,lights:{muzzleFlash:Oh},onPlayerHit:ky,onKill:()=>{le.kills++},onHit:()=>{Ft.hit=.12}}),Q.x=ct(We.spawn[0]),Q.z=ct(We.spawn[1]),ka(Q.x,Q.z),$h(),Vi.compile(Hn,lt),le.mode="menu",Be("loading").hidden=!0,Be("menu").hidden=!1}function ky(s,e,t,n){if(Q.hp<=0||le.mode!=="playing")return;Q.hp-=s,Q.lastHurt=le.time,Ft.dmg=Math.min(1,Ft.dmg+s/40),Ft.glitch=Math.min(1,Ft.glitch+s/45),Q.shake=Math.min(1,Q.shake+s/28);let i=Math.atan2(e-Q.x,t-Q.z);Q.yaw+=Math.sin(i-Q.camYaw)*.03,Q.pitch+=j(.01,.04),Tt.hurt(s>19),Q.hp<=0&&Ky()}var Vh=new w,Wd=new w;function Jd(){let s=Q;if(s.cycleT>0||s.meleeT>0||s.hp<=0)return;if(s.reloadT>0)if(s.ammo>0)s.reloadT=0;else return;if(s.ammo<=0){Tt.click(),s.cycleT=.25,uc("R \u2014 \u043F\u0435\u0440\u0435\u0437\u0430\u0440\u044F\u0434\u043A\u0430",1.2);return}s.ammo--,le.shots++,s.cycleT=.95,Rn.fire(),Rn.muzzleWorld(Vh),Oh(Vh),Ft.flash=1,Tt.shot(),Tt.bolt(.38);let e=ve(.032,.002,s.ads)*(1+Math.hypot(s.vx,s.vz)*.25)*(1-s.crouch*.3),t=s.camYaw+j(-1,1)*e,n=s.camPitch+j(-1,1)*e,i=-Math.sin(t)*Math.cos(n),r=Math.sin(n),o=-Math.cos(t)*Math.cos(n);Wd.set(i,r,o),cs.muzzleSmoke(Vh,Wd,1.4);let a=lt.position.x,c=lt.position.y,l=lt.position.z,h=th(a,c,l,i,r,o,150),u=Zt.raycast(a,c,l,i,r,o,h.t);if(u){le.hits++;let f=a+i*u.t,d=c+r*u.t,m=l+o*u.t;Zt.damage(u.e,110*u.hb[4]*j(.9,1.1),f,d,m,i,o,u.hb[5])}else if(h.hit){let f=a+i*h.t,d=c+r*h.t,m=l+o*h.t,x=0,g=1,p=0;h.kind==="wall"&&(x=h.nx,g=.15,p=h.nz),cs.impact(f,d,m,x,g,p,h.mat||1),Tt.hit(f,m,h.mat||1,.4/(1+h.t*.08))}s.pitch+=j(.045,.062)*(1-s.ads*.35),s.yaw+=j(-.014,.014),s.shake=Math.min(1,s.shake+.28)}function $d(){let s=Q;s.reloadT>0||s.ammo>=5||s.reserve<=0||s.meleeT>0||s.hp<=0||(s.reloadT=.6+Math.min(5-s.ammo,s.reserve)*.42,s.reloadLoaded=0,s.reloadTotal=s.reloadT,Tt.bolt(0),ep())}function jd(){Q.meleeT>0||Q.hp<=0||(Q.reloadT=0,Q.meleeT=.55,Q.meleeHit=!1,Tt.swing())}function Vy(){let s=Q;if(s.meleeHit||s.meleeT>.38||s.meleeT<=0)return;s.meleeHit=!0;let e=-Math.sin(s.camYaw),t=-Math.cos(s.camYaw),n=null,i=2.4;for(let r of Zt.list){if(!r.alive)continue;let o=r.x-s.x,a=r.z-s.z,c=Math.hypot(o,a);c>i||(o*e+a*t)/c<.65||(n=r,i=c)}if(n){let r=Zt.hitboxes(n)[2];Zt.damage(n,70,r[0],r[1],r[2],e,t,"body"),n.knock.x+=e*4,n.knock.z+=t*4,n.hitT=.7,s.shake=Math.min(1,s.shake+.3)}}function Xd(s){let e=Q;if(e.hp<=0){e.eyeY=ve(e.eyeY,.3,Rt(3,s)),e.roll=ve(e.roll,1.2,Rt(2,s));return}let t=kn.KeyC||kn.ControlLeft;e.crouch=ve(e.crouch,t?1:0,Rt(10,s));let n=To&&e.reloadT<=0&&e.meleeT<=0;e.ads=ve(e.ads,n?1:0,Rt(11,s));let i=0,r=0;kn.KeyW&&(r-=1),kn.KeyS&&(r+=1),kn.KeyA&&(i-=1),kn.KeyD&&(i+=1);let o=Math.hypot(i,r);o>0&&(i/=o,r/=o);let a=kn.ShiftLeft&&r<0&&e.stamina>.05&&!t&&e.ads<.3;a&&o>0?e.stamina=Math.max(0,e.stamina-s/6):e.stamina=Math.min(1,e.stamina+s/4);let c=a?5:t?1.5:n?1.8:2.9,l=Math.sin(e.yaw),h=Math.cos(e.yaw),u=(i*h+r*l)*c,f=(-i*l+r*h)*c;e.vx=ve(e.vx,u,Rt(o>0?8:10,s)),e.vz=ve(e.vz,f,Rt(o>0?8:10,s)),e.x+=e.vx*s,e.z+=e.vz*s,go(e,.3);for(let g of Yt.colliders){let p=e.x-g.x,_=e.z-g.z,v=Math.hypot(p,_),M=g.r+.3;v<M&&v>1e-4&&(e.x=g.x+p/v*M,e.z=g.z+_/v*M)}for(let g of Zt.list){if(!g.alive)continue;let p=e.x-g.x,_=e.z-g.z,v=Math.hypot(p,_);v<.6&&v>.001&&(e.x+=p/v*(.6-v),e.z+=_/v*(.6-v))}let d=Math.hypot(e.vx,e.vz);e.sprinting=a&&d>3.4,e.bobAmt=ve(e.bobAmt,Math.min(1.4,d/2.9),Rt(6,s));let m=e.stepPh;e.stepPh+=s*(d>.3?a?11.5:t?6:8.4:0),Math.floor(m/Math.PI)!==Math.floor(e.stepPh/Math.PI)&&d>.5&&((Math.floor(e.x*1.7)+Math.floor(e.z*1.3)&3)!==0?Tt.boardStep(a?1.3:t?.4:.9):Tt.step(a?1.4:t?.4:.9,1));let x=Rt(ve(12,20,e.ads),s);if(e.camYaw=ve(e.camYaw,e.yaw,x),e.camPitch=ve(e.camPitch,e.pitch,x),e.eyeY=rt(e.x,e.z)+ve(1.42,.92,e.crouch),e.cycleT>0&&(e.cycleT-=s),e.meleeT>0&&(e.meleeT-=s,Vy()),e.reloadT>0){e.reloadT-=s;let g=Math.min(5-e.ammo+e.reloadLoaded,e.reserve+e.reloadLoaded),p=Math.floor(ze((e.reloadTotal-e.reloadT-.3)/.42,0,g));for(;e.reloadLoaded<p&&e.ammo<5&&e.reserve>0;)e.ammo++,e.reserve--,e.reloadLoaded++,Tt.roundIn();e.reloadT<=0&&(e.reloadT=0,Tt.bolt(0))}Pr&&e.cycleT<=0&&!e.sprinting&&(Jd(),Pr=!1),le.time-e.lastHurt>5&&e.hp<100&&(e.hp=Math.min(100,e.hp+s*7)),e.hp<35&&le.time-e.lastBeat>.95&&(e.lastBeat=le.time,Tt.heartbeat());for(let g=Zt.drops.length-1;g>=0;g--){let p=Zt.drops[g];p.t+=s,Math.hypot(p.x-e.x,p.z-e.z)<1?(e.reserve+=5,Hn.remove(p.obj),Zt.drops.splice(g,1),Tt.pickup(),uc("+5 \u043F\u0430\u0442\u0440\u043E\u043D\u043E\u0432",1)):p.t>70&&(Hn.remove(p.obj),Zt.drops.splice(g,1))}for(let g of Yt.crates)g.cd-=s,g.cd<=0&&Math.hypot(g.x-e.x,g.z-e.z)<1.4&&(e.reserve+=15,g.cd=40,Tt.pickup(),uc("\u042F\u0449\u0438\u043A \u0441 \u043F\u0430\u0442\u0440\u043E\u043D\u0430\u043C\u0438: +15",1.5))}function Gy(s){let e=Q,t=e.bobAmt*(1-e.ads*.6),n=e.stepPh,i=Math.abs(Math.sin(n))*.05*t-.025*t,r=Math.cos(n)*.045*t,o=Math.cos(n)*.02*t;e.shake=Math.max(0,e.shake-s*2.2);let a=e.shake*e.shake,c=le.time,l=Math.sin(c*1.3)*.004+Math.sin(c*.71)*.003,h=Math.sin(e.camYaw),u=Math.cos(e.camYaw);lt.position.set(e.x+u*r,e.eyeY+i+l*2,e.z-h*r);let f=e.vx*u-e.vz*h;e.hp>0&&(e.roll=ve(e.roll,-f*.012,Rt(5,s))),lt.rotation.set(e.camPitch+Math.sin(n*2)*.008*t+j(-1,1)*a*.03+l,e.camYaw+j(-1,1)*a*.03,e.roll+o+j(-1,1)*a*.02);let d=ve(88,66,e.ads)+(e.sprinting?4:0);Math.abs(lt.fov-d)>.05&&(lt.fov=ve(lt.fov,d,Rt(10,s)),lt.updateProjectionMatrix())}function Qd(){let s=[];for(let e=0;e<30;e++)for(let t=0;t<44;t++){if(st(t,e))continue;let n=hi[An(t,e)];n<12||n>45||Ha(ct(t),ct(e),Q.x,Q.z)||s.push([t,e])}return s.length?s[Math.floor(Math.random()*s.length)]:null}function Wy(){le.wave++;let s=le.wave;le.queue=[];for(let e=0;e<2+Math.ceil(s*1.3);e++)le.queue.push("rusher");for(let e=0;e<Math.floor(s*.8)+(s>1?1:0);e++)le.queue.push("shooter");le.queue.sort(()=>Math.random()-.5),le.spawnT=1,Zh(`\u0412\u043E\u043B\u043D\u0430 ${s}`,s===1?Ba[le.faction].introSub:`${le.queue.length} \u0432\u0440\u0430\u0433\u043E\u0432 \u0432 \u0442\u0443\u043C\u0430\u043D\u0435`,3),Be("wave").textContent="\u0412\u041E\u041B\u041D\u0410 "+s}function Xy(s){if(le.breakT>0){le.breakT-=s,le.breakT<=0&&Wy();return}let e=Zt.alive();if(le.queue.length){if(le.spawnT-=s,le.spawnT<=0&&e<8){let t=Qd();t?(Zt.spawn(le.queue.pop(),t[0],t[1]),le.spawnT=j(1.2,2.4)):le.spawnT=.5}}else e===0&&le.wave>0&&(le.breakT=9,Zh("\u0412\u043E\u043B\u043D\u0430 \u043E\u0442\u0431\u0438\u0442\u0430","\u041F\u0435\u0440\u0435\u0437\u0430\u0440\u044F\u0434\u0438\u0442\u0435\u0441\u044C. \u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0447\u0435\u0440\u0435\u0437 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434.",3))}var sc=0,Cr=0,Gh=0;function Zh(s,e,t){let n=Be("center-msg");if(n.textContent=s,e){let i=document.createElement("small");i.textContent=e,n.append(i)}n.style.opacity=1,sc=t}function uc(s,e){let t=Be("prompt");t.textContent=s,t.style.opacity=1,Cr=e}function ep(){Be("prompt").style.opacity=0,Cr=0}function qy(s){if(sc>0&&(sc-=s,sc<=0&&(Be("center-msg").style.opacity=0)),Cr>0&&(Cr-=s,Cr<=0&&ep()),Be("hitmark").style.opacity=Ft.hit>0?1:0,Gh+=s,Gh<.1)return;Gh=0;let e=Math.floor(le.clock),t=String(Math.floor(e/3600)%24).padStart(2,"0"),n=String(Math.floor(e/60)%60).padStart(2,"0"),i=String(e%60).padStart(2,"0");Be("time").textContent=`25.11.1914 ${t}:${n}:${i}`,Be("rec").classList.toggle("off",Math.floor(le.time*1.4)%2===1),Be("kills").textContent="\u0423\u0411\u0418\u0422\u041E "+le.kills;let r="";for(let o=0;o<5;o++)r+=`<span class="rnd${o<Q.ammo?"":" empty"}"></span>`;Be("ammo").innerHTML=r,Be("reserve").textContent=" / "+Q.reserve,Be("torch-ind").textContent=ee.torchOn?"\u0424\u041E\u041D\u0410\u0420\u042C \u0412\u041A\u041B \xB7 F":"\u0424\u041E\u041D\u0410\u0420\u042C \u0412\u042B\u041A\u041B \xB7 F",Q.ammo===0&&Q.reloadT<=0&&Cr<=0&&uc(Q.reserve>0?"R \u2014 \u043F\u0435\u0440\u0435\u0437\u0430\u0440\u044F\u0434\u043A\u0430":"\u041F\u0430\u0442\u0440\u043E\u043D\u044B \u043A\u043E\u043D\u0447\u0438\u043B\u0438\u0441\u044C: V \u2014 \u0448\u0442\u044B\u043A, \u044F\u0449\u0438\u043A\u0438 \u0432 \u0431\u043B\u0438\u043D\u0434\u0430\u0436\u0430\u0445",.5)}function Yy(){Zt.clear(),cs.clear(),Object.assign(Q,{x:ct(We.spawn[0]),z:ct(We.spawn[1]),vx:0,vz:0,hp:100,ammo:5,reserve:40,cycleT:0,reloadT:0,meleeT:0,stamina:1,crouch:0,ads:0,roll:0,lastHurt:-99,shake:0});let s=0,e=-1;for(let[t,n,i]of[[0,0,-1],[Math.PI,0,1],[Math.PI/2,-1,0],[-Math.PI/2,1,0]]){let r=th(Q.x,1.4,Q.z,n,0,i,60);r.t>e&&(e=r.t,s=t)}Q.yaw=Q.camYaw=Q.prevYaw=s,Q.pitch=Q.camPitch=Q.prevPitch=0,Q.wYaw=Q.wPitch=0;for(let t of Yt.crates)t.cd=0;Object.assign(le,{wave:0,kills:0,queue:[],breakT:4,time:0,deadT:0,shots:0,hits:0,clock:4*3600+13*60+27}),Object.assign(Ft,{dmg:0,glitch:.7,flash:0,hit:0}),ki.resetExp=!0}function dc(s){le.faction=s;let e=Ba[s];Zt.ctx.factionData=e,Be("unit").textContent=e.unit,Be("squad").textContent=e.squad,Rn&&Rn.dispose(lt),Rn=new ja(lt,e),Yy(),Tt.init(),le.mode="playing",Be("menu").hidden=!0,Be("dead").hidden=!0,Be("pause").hidden=!0,Be("hud").hidden=!1,Be("dot").style.display=hc?"block":"none",Zh(e.intro,"\u041F\u0435\u0440\u0432\u0430\u044F \u0432\u043E\u043B\u043D\u0430 \u0447\u0435\u0440\u0435\u0437 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0435\u043A\u0443\u043D\u0434",3.5),Kh()}function Kh(){if(!Ls)try{let s=bo.requestPointerLock();s&&s.catch&&s.catch(()=>{Ls=!0})}catch{Ls=!0}}function Jh(){if(le.mode==="playing"){le.mode="paused",Be("pause").hidden=!1,Pr=!1,To=!1;for(let s in kn)kn[s]=!1}}function Zy(){le.mode="playing",Be("pause").hidden=!0,Tt.init(),Kh()}function tp(){le.mode="menu",Be("pause").hidden=!0,Be("dead").hidden=!0,Be("hud").hidden=!0,Be("menu").hidden=!1,document.pointerLockElement&&document.exitPointerLock(),Zt.clear(),Rn&&(Rn.dispose(lt),Rn=null)}function Ky(){le.mode="dying",le.deadT=0,le.survived=le.time,Tt.scream(Q.x,Q.z,.3),setTimeout(()=>{le.mode="dead",document.pointerLockElement&&document.exitPointerLock();let s=le.shots?Math.round(le.hits/le.shots*100):0,e=Math.floor(le.survived);Be("stats").innerHTML=`\u0412\u043E\u043B\u043D\u0430: ${le.wave}<br>\u0423\u0431\u0438\u0442\u043E: ${le.kills}<br>\u0422\u043E\u0447\u043D\u043E\u0441\u0442\u044C: ${s}%<br>\u041F\u0440\u043E\u0434\u0435\u0440\u0436\u0430\u043B\u0438\u0441\u044C: ${Math.floor(e/60)} \u043C\u0438\u043D ${e%60} \u0441`,Be("dead").hidden=!1,Be("hud").hidden=!0},2300)}document.addEventListener("keydown",s=>{if(s.code==="Escape"&&Ls&&le.mode==="playing"){Jh();return}le.mode==="playing"&&(kn[s.code]=!0,s.code==="KeyR"&&$d(),s.code==="KeyV"&&jd(),s.code==="KeyF"&&(Ud(),Tt.click()),["Space","ArrowUp","ArrowDown"].includes(s.code)&&s.preventDefault())});document.addEventListener("keyup",s=>{kn[s.code]=!1});bo.addEventListener("mousedown",s=>{if(le.mode==="playing"){if(!cc&&!Ls){Kh();return}s.button===0&&(Pr=!0),s.button===2&&(To=!0)}});document.addEventListener("mouseup",s=>{s.button===0&&(Pr=!1),s.button===2&&(To=!1)});bo.addEventListener("contextmenu",s=>s.preventDefault());document.addEventListener("mousemove",s=>{if(le.mode!=="playing"||!cc&&!Ls)return;let e=.0022*lc*ve(1,.6,Q.ads);Q.yaw-=s.movementX*e,Q.pitch-=s.movementY*e,Q.pitch=ze(Q.pitch,-1.35,1.35)});document.addEventListener("pointerlockchange",()=>{cc=document.pointerLockElement===bo,!cc&&le.mode==="playing"&&Jh()});document.addEventListener("pointerlockerror",()=>{Ls=!0});window.addEventListener("blur",()=>{le.mode==="playing"&&Jh()});Be("pick-loyal").addEventListener("click",()=>dc("loyal"));Be("pick-heretic").addEventListener("click",()=>dc("heretic"));Be("resume").addEventListener("click",Zy);Be("quit").addEventListener("click",tp);Be("again").addEventListener("click",()=>dc(le.faction));Be("tomenu").addEventListener("click",tp);var Wh=Be("sens"),rc=Be("vol"),Xh=Be("showdot"),qh=Be("quality");Wh.value=lc;rc.value=Tt.vol;Xh.checked=hc;qh.value=Kd;Wh.addEventListener("input",()=>{lc=+Wh.value,li.set("sens",lc)});rc.addEventListener("input",()=>{Tt.setVol(+rc.value),li.set("vol",+rc.value)});Xh.addEventListener("change",()=>{hc=Xh.checked,li.set("showdot",hc)});qh.addEventListener("change",()=>{li.set("quality",qh.value),location.reload()});var tt={time:0,dt:.016,fogDensity:.055,fogAmb:new w,vel:new oe,dmg:0,glitch:0,flash:0,dead:0,lowhp:0,rain:1,torch:{pos:new w,dir:new w,col:new w,cosOut:.88,cosIn:.95,shadowMap:null,shadowMatrix:null},flare:{pos:new w,col:new w},lanterns:Array.from({length:6},()=>({pos:new w,col:new w})),muzzle:{pos:new w,col:new w}},qd=new w;function Jy(){let n=ee.torch;n.getWorldPosition(tt.torch.pos),n.target.getWorldPosition(qd),tt.torch.dir.subVectors(qd,tt.torch.pos).normalize();let i=ee.torchOn?n.intensity:0;tt.torch.col.set(n.color.r,n.color.g,n.color.b).multiplyScalar(i*.018),tt.torch.cosOut=Math.cos(n.angle),tt.torch.cosIn=Math.cos(n.angle*(1-n.penumbra)),tt.torch.shadowMap=n.shadow.map?n.shadow.map.texture:null,tt.torch.shadowMatrix=n.shadow.matrix,tt.flare.pos.copy(ee.flare.position),tt.flare.col.set(ee.flare.color.r,ee.flare.color.g,ee.flare.color.b).multiplyScalar(ee.flare.intensity*.08*.6);let r=[];for(let l=0;l<6;l++){let h=ee.pool[l];h&&h.intensity>0&&(tt.lanterns[l].pos.copy(h.position),tt.lanterns[l].col.set(h.color.r,h.color.g,h.color.b).multiplyScalar(h.intensity*.08*.5),r.push(tt.lanterns[l]))}tt.lanternList=r;let o=ee.muzzle.intensity>ee.enemyMuzzle.intensity?ee.muzzle:ee.enemyMuzzle;tt.muzzle.pos.copy(o.position),tt.muzzle.col.set(o.color.r,o.color.g,o.color.b).multiplyScalar(o.intensity*.08*.3);let a=ee.state.artFlash,c=ee.flare.intensity/2600;tt.fogAmb.set(.0035,.0042,.006).multiplyScalar(1+a*3+c*4),Qt.uTorchPos.value.copy(tt.torch.pos),Qt.uTorchDir.value.copy(tt.torch.dir),Qt.uTorchCol.value.copy(tt.torch.col).multiplyScalar(.25/.018),Qt.uTorchCos.value=tt.torch.cosOut,Qt.uTorchCosIn.value=tt.torch.cosIn,Qt.uFlarePos.value.copy(tt.flare.pos),Qt.uFlareCol.value.copy(tt.flare.col).multiplyScalar(.25/.08);for(let l=0;l<6;l++){let h=r[l];h?(Qt.uLanPos.value[l].copy(h.pos),Qt.uLanCol.value[l].copy(h.col).multiplyScalar(.25/.08)):(Qt.uLanPos.value[l].set(0,-100,0),Qt.uLanCol.value[l].set(0,0,0))}Qt.uMuzPos.value.copy(tt.muzzle.pos),Qt.uMuzCol.value.copy(tt.muzzle.col).multiplyScalar(.25/.08),Qt.uAmb.value.set(.012,.014,.02).multiplyScalar(1+a*2+c*6)}var Yd=performance.now(),ic=0,$y=new URLSearchParams(location.search).has("manual"),Bi={acc:0,n:0,t:0,scale:Hi.scale};function $h(){ki.resize(window.innerWidth,window.innerHeight,window.devicePixelRatio||1),lt.aspect=window.innerWidth/window.innerHeight,lt.updateProjectionMatrix(),cs&&cs.setScale(ki.h/(2*Math.tan(Ts.degToRad(lt.fov)/2)))}window.addEventListener("resize",$h);function jy(s){if(Bi.acc+=s,Bi.n++,Bi.t+=s,Bi.t<2.5)return;let e=Bi.acc/Bi.n;Bi.acc=0,Bi.n=0,Bi.t=0;let t=ki.scale;e>.024&&t>.5?t=Math.max(.5,t-.1):e<.013&&t<Hi.scale&&(t=Math.min(Hi.scale,t+.1)),t!==ki.scale&&(ki.scale=t,ki.w=0,$h())}function oc(s){le.mode==="playing"||le.mode==="dying"?(le.time+=s,le.clock+=s,le.mode==="playing"?(Xd(s),Math.floor(le.time*4)!==Math.floor((le.time-s)*4)&&ka(Q.x,Q.z),Zt.update(s,Q),Xy(s)):(le.deadT+=s,Xd(s),Zt.update(s*.5,Q)),Gy(s),Q.wYaw=ve(Q.wYaw||0,(Q.camYaw-Q.prevYaw)/s,Rt(20,s)),Q.wPitch=ve(Q.wPitch||0,(Q.camPitch-Q.prevPitch)/s,Rt(20,s)),Q.prevYaw=Q.camYaw,Q.prevPitch=Q.camPitch,Rn&&Rn.update(s,{ads:Q.ads,dyaw:Q.yaw-Q.camYaw,dpitch:Q.pitch-Q.camPitch,sprint:Q.sprinting,stepPh:Q.stepPh,bob:Q.bobAmt,reload:Q.reloadT,reloadTotal:Q.reloadTotal,cycle:Q.cycleT,melee:Q.meleeT,time:le.time})):(le.mode==="menu"||le.mode==="loading")&&(ic+=s,Q.x=ct(We.spawn[0]),Q.z=ct(We.spawn[1]),Q.eyeY=rt(Q.x,Q.z)+1.42,lt.position.set(Q.x,Q.eyeY,Q.z),Q.camYaw=ic*.05,Q.camPitch=.08+Math.sin(ic*.2)*.05,lt.rotation.set(Q.camPitch,Q.camYaw,Math.sin(ic*.3)*.01)),le.mode!=="paused"&&fc&&(Tt.listener.x=Q.x,Tt.listener.z=Q.z,Tt.listener.yaw=Q.camYaw,Nd(s,Q,Tt),Ld(s,Q),qa.uTime.value=performance.now()/1e3),Ft.dmg=Math.max(0,Ft.dmg-s*.9),Ft.flash=Math.max(0,Ft.flash-s*14),Ft.glitch=Math.max(0,Ft.glitch-s*1.5),Ft.hit=Math.max(0,Ft.hit-s),qy(s)}function np(s){requestAnimationFrame(np);let e=Math.min(.05,(s-Yd)/1e3);Yd=s,!(!fc||$y)&&(oc(e),ac(e),le.mode==="playing"&&jy(e))}function ac(s){fc.sky.sky.position.copy(lt.position),lt.updateMatrixWorld(),Jy(),cs.update(s,performance.now()/1e3,lt.position,rt);let e=Ts.degToRad(lt.fov),t=2*Math.atan(Math.tan(e/2)*lt.aspect);tt.vel.set(ze(-Q.wYaw/60/t,-.05,.05),ze(Q.wPitch/60/e,-.05,.05)),tt.time=performance.now()/1e3,tt.dt=s,tt.dmg=Ft.dmg+(Q.hp<35&&le.mode==="playing"?(1-Q.hp/35)*.35*(.8+Math.sin(le.time*6.5)*.2):0),tt.glitch=Ft.glitch,tt.flash=Ft.flash,tt.dead=le.mode==="dying"?ze((le.deadT-1.2)/1,0,1):0,tt.lowhp=le.mode==="playing"?ze(1-Q.hp/50,0,1):0,ki.render(Hn,lt,tt)}Hy();requestAnimationFrame(np);window.__game={state:le,player:Q,keys:kn,camera:lt,scene:Hn,post:ki,get enemies(){return Zt},get vm(){return Rn},startGame:dc,step:oc,render:ac,fire:Jd,reload:$d,melee:jd,map:We,L:ee,setMouse(s){Pr=s},setAim(s){To=s},chooseSpawnCell:Qd,solid:st,cellCenter:ct,CELL:2,clean(){Ft.glitch=0,Ft.dmg=0,Ft.flash=0,Rn&&(Rn.root.visible=!1)},look(s,e,t,n,i,r){le.mode="paused",lt.position.set(s,e,t),lt.lookAt(n,i,r),lt.updateMatrixWorld(),ac(1/30),Vi.getContext().finish()},frame(s=1/30,e=1){for(let t=0;t<e;t++)oc(s);ac(s),Vi.getContext().finish()},sim(s,e){for(let t=0;t<e;t++)oc(s)}};})();
