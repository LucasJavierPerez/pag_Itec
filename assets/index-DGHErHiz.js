(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,s=1007,c=1008,l=1009,u=1010,d=1011,f=1012,p=1013,m=1014,h=1015,g=1016,_=1017,v=1018,y=1020,b=35902,x=35899,S=1021,C=1022,w=1023,T=1026,E=1027,D=1028,ee=1029,O=1030,k=1031,te=1033,A=33776,ne=33777,j=33778,re=33779,M=35840,ie=35841,ae=35842,oe=35843,se=36196,ce=37492,le=37496,ue=37488,N=37489,de=37490,fe=37491,pe=37808,me=37809,he=37810,ge=37811,_e=37812,ve=37813,ye=37814,be=37815,xe=37816,Se=37817,Ce=37818,we=37819,Te=37820,Ee=37821,De=36492,Oe=36494,ke=36495,Ae=36283,je=36284,Me=36285,Ne=36286,Pe=2300,P=2301,Fe=2302,Ie=2303,Le=2400,F=2401,Re=2402,I=3200,ze=3201,Be=`srgb`,Ve=`srgb-linear`,He=`linear`,Ue=`srgb`,We=7680,Ge=35044,Ke=2e3;function qe(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Je(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ye(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Xe(){let e=Ye(`canvas`);return e.style.display=`block`,e}var Ze={};function Qe(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function $e(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function L(...e){e=$e(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function R(...e){e=$e(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function et(...e){let t=e.join(` `);t in Ze||(Ze[t]=!0,L(...e))}function tt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var nt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},rt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},it=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),at=1234567,ot=Math.PI/180,st=180/Math.PI;function ct(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(it[e&255]+it[e>>8&255]+it[e>>16&255]+it[e>>24&255]+`-`+it[t&255]+it[t>>8&255]+`-`+it[t>>16&15|64]+it[t>>24&255]+`-`+it[n&63|128]+it[n>>8&255]+`-`+it[n>>16&255]+it[n>>24&255]+it[r&255]+it[r>>8&255]+it[r>>16&255]+it[r>>24&255]).toLowerCase()}function z(e,t,n){return Math.max(t,Math.min(n,e))}function lt(e,t){return(e%t+t)%t}function ut(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function dt(e,t,n){return e===t?0:(n-e)/(t-e)}function ft(e,t,n){return(1-n)*e+n*t}function pt(e,t,n,r){return ft(e,t,1-Math.exp(-n*r))}function mt(e,t=1){return t-Math.abs(lt(e,t*2)-t)}function ht(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function gt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function _t(e,t){return e+Math.floor(Math.random()*(t-e+1))}function vt(e,t){return e+Math.random()*(t-e)}function yt(e){return e*(.5-Math.random())}function bt(e){e!==void 0&&(at=e);let t=at+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xt(e){return e*ot}function St(e){return e*st}function Ct(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function wt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Tt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Et(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:L(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Dt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Ot(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var kt={DEG2RAD:ot,RAD2DEG:st,generateUUID:ct,clamp:z,euclideanModulo:lt,mapLinear:ut,inverseLerp:dt,lerp:ft,damp:pt,pingpong:mt,smoothstep:ht,smootherstep:gt,randInt:_t,randFloat:vt,randFloatSpread:yt,seededRandom:bt,degToRad:xt,radToDeg:St,isPowerOfTwo:Ct,ceilPowerOfTwo:wt,floorPowerOfTwo:Tt,setQuaternionFromProperEuler:Et,normalize:Ot,denormalize:Dt},B=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=z(this.x,e.x,t.x),this.y=z(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=z(this.x,e,t),this.y=z(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(z(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},At=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:L(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(z(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},V=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Mt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Mt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=z(this.x,e.x,t.x),this.y=z(this.y,e.y,t.y),this.z=z(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=z(this.x,e,t),this.y=z(this.y,e,t),this.z=z(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return jt.copy(this).projectOnVector(e),this.sub(jt)}reflect(e){return this.sub(jt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(z(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},jt=new V,Mt=new At,H=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return et(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Nt.makeScale(e,t)),this}rotate(e){return et(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Nt.makeRotation(-e)),this}translate(e,t){return et(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Nt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Nt=new H,Pt=new H().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ft=new H().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function It(){let e={enabled:!0,workingColorSpace:Ve,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Rt(e.r),e.g=Rt(e.g),e.b=Rt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=zt(e.r),e.g=zt(e.g),e.b=zt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?He:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return et(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return et(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Ve]:{primaries:t,whitePoint:r,transfer:He,toXYZ:Pt,fromXYZ:Ft,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Be},outputColorSpaceConfig:{drawingBufferColorSpace:Be}},[Be]:{primaries:t,whitePoint:r,transfer:Ue,toXYZ:Pt,fromXYZ:Ft,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Be}}}),e}var Lt=It();function Rt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function zt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Bt,Vt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Bt===void 0&&(Bt=Ye(`canvas`)),Bt.width=e.width,Bt.height=e.height;let t=Bt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Bt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ye(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Rt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Rt(t[e]/255)*255):t[e]=Rt(t[e]);return{data:t,width:e.width,height:e.height}}return L(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Ht=0,Ut=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ht++}),this.uuid=ct(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Wt(r[t].image)):e.push(Wt(r[t]))}else e=Wt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Wt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Vt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(L(`Texture: Unable to serialize Texture.`),{})}var Gt=0,Kt=new V,qt=class r extends rt{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,s=o,u=c,d=w,f=l,p=r.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gt++}),this.uuid=ct(),this.name=``,this.source=new Ut(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new B(0,0),this.repeat=new B(1,1),this.center=new B(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new H,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kt).x}get height(){return this.source.getSize(Kt).y}get depth(){return this.source.getSize(Kt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){L(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){L(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qt.DEFAULT_IMAGE=null,qt.DEFAULT_MAPPING=300,qt.DEFAULT_ANISOTROPY=1;var Jt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=z(this.x,e.x,t.x),this.y=z(this.y,e.y,t.y),this.z=z(this.z,e.z,t.z),this.w=z(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=z(this.x,e,t),this.y=z(this.y,e,t),this.z=z(this.z,e,t),this.w=z(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(z(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yt=class extends rt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Jt(0,0,e,t),this.scissorTest=!1,this.viewport=new Jt(0,0,e,t),this.textures=[];let r=new qt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ut(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Xt=class extends Yt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Zt=class extends qt{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Qt=class extends qt{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},$t=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/en.setFromMatrixColumn(e,0).length(),i=1/en.setFromMatrixColumn(e,1).length(),a=1/en.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(nn,e,rn)}lookAt(e,t,n){let r=this.elements;return sn.subVectors(e,t),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),an.crossVectors(n,sn),an.lengthSq()===0&&(Math.abs(n.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),an.crossVectors(n,sn)),an.normalize(),on.crossVectors(sn,an),r[0]=an.x,r[4]=on.x,r[8]=sn.x,r[1]=an.y,r[5]=on.y,r[9]=sn.y,r[2]=an.z,r[6]=on.z,r[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],ee=r[13],O=r[2],k=r[6],te=r[10],A=r[14],ne=r[3],j=r[7],re=r[11],M=r[15];return i[0]=a*x+o*T+s*O+c*ne,i[4]=a*S+o*E+s*k+c*j,i[8]=a*C+o*D+s*te+c*re,i[12]=a*w+o*ee+s*A+c*M,i[1]=l*x+u*T+d*O+f*ne,i[5]=l*S+u*E+d*k+f*j,i[9]=l*C+u*D+d*te+f*re,i[13]=l*w+u*ee+d*A+f*M,i[2]=p*x+m*T+h*O+g*ne,i[6]=p*S+m*E+h*k+g*j,i[10]=p*C+m*D+h*te+g*re,i[14]=p*w+m*ee+h*A+g*M,i[3]=_*x+v*T+y*O+b*ne,i[7]=_*S+v*E+y*k+b*j,i[11]=_*C+v*D+y*te+b*re,i[15]=_*w+v*ee+y*A+b*M,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,ee=d*g-f*h,O=_*ee-v*D+y*E+b*T-x*w+S*C;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/O;return e[0]=(o*ee-s*D+c*E)*k,e[1]=(r*D-n*ee-i*E)*k,e[2]=(m*S-h*x+g*b)*k,e[3]=(d*x-u*S-f*b)*k,e[4]=(s*T-a*ee-c*w)*k,e[5]=(t*ee-r*T+i*w)*k,e[6]=(h*y-p*S-g*v)*k,e[7]=(l*S-d*y+f*v)*k,e[8]=(a*D-o*T+c*C)*k,e[9]=(n*T-t*D-i*C)*k,e[10]=(p*x-m*y+g*_)*k,e[11]=(u*y-l*x-f*_)*k,e[12]=(o*w-a*E-s*C)*k,e[13]=(t*E-n*w+r*C)*k,e[14]=(m*v-p*b-h*_)*k,e[15]=(l*b-u*v+d*_)*k,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=en.set(r[0],r[1],r[2]).length(),o=en.set(r[4],r[5],r[6]).length(),s=en.set(r[8],r[9],r[10]).length();i<0&&(a=-a),tn.copy(this);let c=1/a,l=1/o,u=1/s;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=l,tn.elements[5]*=l,tn.elements[6]*=l,tn.elements[8]*=u,tn.elements[9]*=u,tn.elements[10]*=u,t.setFromRotationMatrix(tn),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ke,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ke,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},en=new V,tn=new $t,nn=new V(0,0,0),rn=new V(1,1,1),an=new V,on=new V,sn=new V,cn=new $t,ln=new At,un=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(z(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-z(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(z(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-z(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(z(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-z(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:L(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ln.setFromEuler(this),this.setFromQuaternion(ln,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};un.DEFAULT_ORDER=`XYZ`;var dn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},fn=0,pn=new V,mn=new At,hn=new $t,gn=new V,_n=new V,vn=new V,yn=new At,bn=new V(1,0,0),xn=new V(0,1,0),Sn=new V(0,0,1),Cn={type:`added`},wn={type:`removed`},Tn={type:`childadded`,child:null},En={type:`childremoved`,child:null},Dn=class e extends rt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fn++}),this.uuid=ct(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new V,n=new un,r=new At,i=new V(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $t},normalMatrix:{value:new H}}),this.matrix=new $t,this.matrixWorld=new $t,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new dn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mn.setFromAxisAngle(e,t),this.quaternion.multiply(mn),this}rotateOnWorldAxis(e,t){return mn.setFromAxisAngle(e,t),this.quaternion.premultiply(mn),this}rotateX(e){return this.rotateOnAxis(bn,e)}rotateY(e){return this.rotateOnAxis(xn,e)}rotateZ(e){return this.rotateOnAxis(Sn,e)}translateOnAxis(e,t){return pn.copy(e).applyQuaternion(this.quaternion),this.position.add(pn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(bn,e)}translateY(e){return this.translateOnAxis(xn,e)}translateZ(e){return this.translateOnAxis(Sn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gn.copy(e):gn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),_n.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hn.lookAt(_n,gn,this.up):hn.lookAt(gn,_n,this.up),this.quaternion.setFromRotationMatrix(hn),r&&(hn.extractRotation(r.matrixWorld),mn.setFromRotationMatrix(hn),this.quaternion.premultiply(mn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(R(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Cn),Tn.child=e,this.dispatchEvent(Tn),Tn.child=null):R(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(wn),En.child=e,this.dispatchEvent(En),En.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Cn),Tn.child=e,this.dispatchEvent(Tn),Tn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_n,e,vn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_n,yn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Dn.DEFAULT_UP=new V(0,1,0),Dn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var U=class extends Dn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},On={type:`move`},kn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new U,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new U,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new U,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(On)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new U;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},An={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},Mn={h:0,s:0,l:0};function Nn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var W=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Be){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Lt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Lt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Lt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Lt.workingColorSpace){if(e=lt(e,1),t=z(t,0,1),n=z(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Nn(i,r,e+1/3),this.g=Nn(i,r,e),this.b=Nn(i,r,e-1/3)}return Lt.colorSpaceToWorking(this,r),this}setStyle(e,t=Be){function n(t){t!==void 0&&parseFloat(t)<1&&L(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:L(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);L(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Be){let n=An[e.toLowerCase()];return n===void 0?L(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rt(e.r),this.g=Rt(e.g),this.b=Rt(e.b),this}copyLinearToSRGB(e){return this.r=zt(e.r),this.g=zt(e.g),this.b=zt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Be){return Lt.workingToColorSpace(Pn.copy(this),e),Math.round(z(Pn.r*255,0,255))*65536+Math.round(z(Pn.g*255,0,255))*256+Math.round(z(Pn.b*255,0,255))}getHexString(e=Be){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Lt.workingColorSpace){Lt.workingToColorSpace(Pn.copy(this),t);let n=Pn.r,r=Pn.g,i=Pn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Lt.workingColorSpace){return Lt.workingToColorSpace(Pn.copy(this),t),e.r=Pn.r,e.g=Pn.g,e.b=Pn.b,e}getStyle(e=Be){Lt.workingToColorSpace(Pn.copy(this),e);let t=Pn.r,n=Pn.g,r=Pn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(jn),this.setHSL(jn.h+e,jn.s+t,jn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(jn),e.getHSL(Mn);let n=ft(jn.h,Mn.h,t),r=ft(jn.s,Mn.s,t),i=ft(jn.l,Mn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pn=new W;W.NAMES=An;var Fn=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new W(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},In=class extends Dn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ln=new V,Rn=new V,zn=new V,Bn=new V,Vn=new V,Hn=new V,Un=new V,Wn=new V,Gn=new V,Kn=new V,qn=new Jt,Jn=new Jt,Yn=new Jt,Xn=class e{constructor(e=new V,t=new V,n=new V){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Ln.subVectors(e,t),r.cross(Ln);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Ln.subVectors(r,t),Rn.subVectors(n,t),zn.subVectors(e,t);let a=Ln.dot(Ln),o=Ln.dot(Rn),s=Ln.dot(zn),c=Rn.dot(Rn),l=Rn.dot(zn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Bn)!==null&&Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Bn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Bn.x),s.addScaledVector(a,Bn.y),s.addScaledVector(o,Bn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return qn.setScalar(0),Jn.setScalar(0),Yn.setScalar(0),qn.fromBufferAttribute(e,t),Jn.fromBufferAttribute(e,n),Yn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(qn,i.x),a.addScaledVector(Jn,i.y),a.addScaledVector(Yn,i.z),a}static isFrontFacing(e,t,n,r){return Ln.subVectors(n,t),Rn.subVectors(e,t),Ln.cross(Rn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ln.subVectors(this.c,this.b),Rn.subVectors(this.a,this.b),Ln.cross(Rn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Vn.subVectors(r,n),Hn.subVectors(i,n),Wn.subVectors(e,n);let s=Vn.dot(Wn),c=Hn.dot(Wn);if(s<=0&&c<=0)return t.copy(n);Gn.subVectors(e,r);let l=Vn.dot(Gn),u=Hn.dot(Gn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Vn,a);Kn.subVectors(e,i);let f=Vn.dot(Kn),p=Hn.dot(Kn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Hn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Un.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Un,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Vn,a).addScaledVector(Hn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Zn=class{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint($n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint($n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=$n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,$n):$n.fromBufferAttribute(r,t),$n.applyMatrix4(e.matrixWorld),this.expandByPoint($n);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),er.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),er.copy(e.boundingBox)),er.applyMatrix4(e.matrixWorld),this.union(er)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,$n),$n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(sr),cr.subVectors(this.max,sr),tr.subVectors(e.a,sr),nr.subVectors(e.b,sr),rr.subVectors(e.c,sr),ir.subVectors(nr,tr),ar.subVectors(rr,nr),or.subVectors(tr,rr);let t=[0,-ir.z,ir.y,0,-ar.z,ar.y,0,-or.z,or.y,ir.z,0,-ir.x,ar.z,0,-ar.x,or.z,0,-or.x,-ir.y,ir.x,0,-ar.y,ar.x,0,-or.y,or.x,0];return!dr(t,tr,nr,rr,cr)||(t=[1,0,0,0,1,0,0,0,1],!dr(t,tr,nr,rr,cr))?!1:(lr.crossVectors(ir,ar),t=[lr.x,lr.y,lr.z],dr(t,tr,nr,rr,cr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,$n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize($n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Qn=[new V,new V,new V,new V,new V,new V,new V,new V],$n=new V,er=new Zn,tr=new V,nr=new V,rr=new V,ir=new V,ar=new V,or=new V,sr=new V,cr=new V,lr=new V,ur=new V;function dr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){ur.fromArray(e,a);let o=i.x*Math.abs(ur.x)+i.y*Math.abs(ur.y)+i.z*Math.abs(ur.z),s=t.dot(ur),c=n.dot(ur),l=r.dot(ur);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var fr=new V,pr=new B,mr=0,hr=class extends rt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ge,this.updateRanges=[],this.gpuType=h,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)pr.fromBufferAttribute(this,t),pr.applyMatrix3(e),this.setXY(t,pr.x,pr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)fr.fromBufferAttribute(this,t),fr.applyMatrix3(e),this.setXYZ(t,fr.x,fr.y,fr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)fr.fromBufferAttribute(this,t),fr.applyMatrix4(e),this.setXYZ(t,fr.x,fr.y,fr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)fr.fromBufferAttribute(this,t),fr.applyNormalMatrix(e),this.setXYZ(t,fr.x,fr.y,fr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)fr.fromBufferAttribute(this,t),fr.transformDirection(e),this.setXYZ(t,fr.x,fr.y,fr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Dt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Dt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Dt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Dt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Dt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array),i=Ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},gr=class extends hr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},_r=class extends hr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},vr=class extends hr{constructor(e,t,n){super(new Float32Array(e),t,n)}},yr=new Zn,br=new V,xr=new V,Sr=class{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?yr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;br.subVectors(e,this.center);let t=br.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(br,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(xr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(br.copy(e.center).add(xr)),this.expandByPoint(br.copy(e.center).sub(xr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Cr=0,wr=new $t,Tr=new Dn,Er=new V,Dr=new Zn,Or=new Zn,kr=new V,Ar=class e extends rt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Cr++}),this.uuid=ct(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(qe(e)?_r:gr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new H().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return wr.makeRotationFromQuaternion(e),this.applyMatrix4(wr),this}rotateX(e){return wr.makeRotationX(e),this.applyMatrix4(wr),this}rotateY(e){return wr.makeRotationY(e),this.applyMatrix4(wr),this}rotateZ(e){return wr.makeRotationZ(e),this.applyMatrix4(wr),this}translate(e,t,n){return wr.makeTranslation(e,t,n),this.applyMatrix4(wr),this}scale(e,t,n){return wr.makeScale(e,t,n),this.applyMatrix4(wr),this}lookAt(e){return Tr.lookAt(e),Tr.updateMatrix(),this.applyMatrix4(Tr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Er).negate(),this.translate(Er.x,Er.y,Er.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new vr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&L(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){R(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Dr.setFromBufferAttribute(n),this.morphTargetsRelative?(kr.addVectors(this.boundingBox.min,Dr.min),this.boundingBox.expandByPoint(kr),kr.addVectors(this.boundingBox.max,Dr.max),this.boundingBox.expandByPoint(kr)):(this.boundingBox.expandByPoint(Dr.min),this.boundingBox.expandByPoint(Dr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&R(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){R(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new V,1/0);return}if(e){let n=this.boundingSphere.center;if(Dr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Or.setFromBufferAttribute(n),this.morphTargetsRelative?(kr.addVectors(Dr.min,Or.min),Dr.expandByPoint(kr),kr.addVectors(Dr.max,Or.max),Dr.expandByPoint(kr)):(Dr.expandByPoint(Or.min),Dr.expandByPoint(Or.max))}Dr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)kr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(kr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)kr.fromBufferAttribute(a,t),o&&(Er.fromBufferAttribute(e,t),kr.add(Er)),r=Math.max(r,n.distanceToSquared(kr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&R(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){R(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new hr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new V,s[e]=new V;let c=new V,l=new V,u=new V,d=new B,f=new B,p=new B,m=new V,h=new V;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new V,y=new V,b=new V,x=new V;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new hr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new V,i=new V,a=new V,o=new V,s=new V,c=new V,l=new V,u=new V;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)kr.fromBufferAttribute(e,t),kr.normalize(),e.setXYZ(t,kr.x,kr.y,kr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new hr(a,r,i)}if(this.index===null)return L(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},jr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ge,this.updateRanges=[],this.version=0,this.uuid=ct()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ct()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ct()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Mr=new V,Nr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Mr.fromBufferAttribute(this,t),Mr.applyMatrix4(e),this.setXYZ(t,Mr.x,Mr.y,Mr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Mr.fromBufferAttribute(this,t),Mr.applyNormalMatrix(e),this.setXYZ(t,Mr.x,Mr.y,Mr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Mr.fromBufferAttribute(this,t),Mr.transformDirection(e),this.setXYZ(t,Mr.x,Mr.y,Mr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Dt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Dt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Dt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Dt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Dt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ot(t,this.array),n=Ot(n,this.array),r=Ot(r,this.array),i=Ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Qe(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new hr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Qe(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Pr=new V,Fr=new V,Ir=new H,Lr=class{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Pr.subVectors(n,t).cross(Fr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Pr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Ir.getNormalMatrix(e),r=this.coplanarPoint(Pr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Rr=0,zr=class extends rt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rr++}),this.uuid=ct(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new W(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=We,this.stencilZFail=We,this.stencilZPass=We,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){L(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){L(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new W().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Lr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new B().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new B().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Br=class extends zr{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new W(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Vr,Hr=new V,Ur=new V,Wr=new V,Gr=new B,Kr=new B,qr=new $t,Jr=new V,Yr=new V,Xr=new V,Zr=new B,Qr=new B,$r=new B,ei=class extends Dn{constructor(e=new Br){if(super(),this.isSprite=!0,this.type=`Sprite`,Vr===void 0){Vr=new Ar;let e=new jr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Vr.setIndex([0,1,2,0,2,3]),Vr.setAttribute(`position`,new Nr(e,3,0,!1)),Vr.setAttribute(`uv`,new Nr(e,2,3,!1))}this.geometry=Vr,this.material=e,this.center=new B(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&R(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Ur.setFromMatrixScale(this.matrixWorld),qr.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Wr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ur.multiplyScalar(-Wr.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;ti(Jr.set(-.5,-.5,0),Wr,a,Ur,r,i),ti(Yr.set(.5,-.5,0),Wr,a,Ur,r,i),ti(Xr.set(.5,.5,0),Wr,a,Ur,r,i),Zr.set(0,0),Qr.set(1,0),$r.set(1,1);let o=e.ray.intersectTriangle(Jr,Yr,Xr,!1,Hr);if(o===null&&(ti(Yr.set(-.5,.5,0),Wr,a,Ur,r,i),Qr.set(0,1),o=e.ray.intersectTriangle(Jr,Xr,Yr,!1,Hr),o===null))return;let s=e.ray.origin.distanceTo(Hr);s<e.near||s>e.far||t.push({distance:s,point:Hr.clone(),uv:Xn.getInterpolation(Hr,Jr,Yr,Xr,Zr,Qr,$r,new B),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ti(e,t,n,r,i,a){Gr.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Kr.copy(Gr):(Kr.x=a*Gr.x-i*Gr.y,Kr.y=i*Gr.x+a*Gr.y),e.copy(t),e.x+=Kr.x,e.y+=Kr.y,e.applyMatrix4(qr)}var ni=new V,ri=new V,ii=new V,ai=new V,oi=class{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ni.copy(this.origin).addScaledVector(this.direction,t),ni.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ri.copy(e).add(t).multiplyScalar(.5),ii.copy(t).sub(e).normalize(),ai.copy(this.origin).sub(ri);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ii),o=ai.dot(this.direction),s=-ai.dot(ii),c=ai.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ri).addScaledVector(ii,d),f}intersectSphere(e,t){if(e.radius<0)return null;ni.subVectors(e.center,this.origin);let n=ni.dot(this.direction),r=ni.dot(ni)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ni)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,ee,O,k,te,A,ne;if(y>=b&&y>=x?(w=s,D=u,k=p,ne=g,s>=0?(S=c,C=l,T=d,E=f,ee=m,O=h,te=_,A=v):(S=l,C=c,T=f,E=d,ee=h,O=m,te=v,A=_)):b>=x?(w=c,D=d,k=m,ne=_,c>=0?(S=l,C=s,T=f,E=u,ee=h,O=p,te=v,A=g):(S=s,C=l,T=u,E=f,ee=p,O=h,te=g,A=v)):(w=l,D=f,k=h,ne=v,l>=0?(S=s,C=c,T=u,E=d,ee=p,O=m,te=g,A=_):(S=c,C=s,T=d,E=u,ee=m,O=p,te=_,A=g)),w===0)return null;let j=S/w,re=C/w,M=1/w,ie=T-j*D,ae=E-re*D,oe=ee-j*k,se=O-re*k,ce=te-j*ne,le=A-re*ne,ue=ce*se-le*oe,N=ie*le-ae*ce,de=oe*ae-se*ie;if(r){if(ue<0||N<0||de<0)return null}else if((ue<0||N<0||de<0)&&(ue>0||N>0||de>0))return null;let fe=ue+N+de;if(fe===0)return null;let pe=M*(ue*D+N*k+de*ne);return(fe>0?pe<0:pe>0)?null:this.at(pe/fe,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},si=class extends zr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ci=new $t,li=new oi,ui=new Sr,di=new V,fi=new V,pi=new V,mi=new V,hi=new V,gi=new V,_i=new V,vi=new V,G=class extends Dn{constructor(e=new Ar,t=new si){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){gi.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(hi.fromBufferAttribute(s,e),a?gi.addScaledVector(hi,r):gi.addScaledVector(hi.sub(t),r))}t.add(gi)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ui.copy(n.boundingSphere),ui.applyMatrix4(i),li.copy(e.ray).recast(e.near),!(ui.containsPoint(li.origin)===!1&&(li.intersectSphere(ui,di)===null||li.origin.distanceToSquared(di)>(e.far-e.near)**2))&&(ci.copy(i).invert(),li.copy(e.ray).applyMatrix4(ci),(n.boundingBox===null||li.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,li)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=bi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=bi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=bi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=bi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function yi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;vi.copy(s),vi.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(vi);return l<n.near||l>n.far?null:{distance:l,point:vi.clone(),object:e}}function bi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,fi),e.getVertexPosition(c,pi),e.getVertexPosition(l,mi);let u=yi(e,t,n,r,fi,pi,mi,_i);if(u){let e=new V;Xn.getBarycoord(_i,fi,pi,mi,e),i&&(u.uv=Xn.getInterpolatedAttribute(i,s,c,l,e,new B)),a&&(u.uv1=Xn.getInterpolatedAttribute(a,s,c,l,e,new B)),o&&(u.normal=Xn.getInterpolatedAttribute(o,s,c,l,e,new V),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new V,materialIndex:0};Xn.getNormal(fi,pi,mi,t.normal),u.face=t,u.barycoord=e}return u}var xi=class extends qt{constructor(e=null,t=1,n=1,i,a,o,s,c,l=r,u=r,d,f){super(null,o,s,c,l,u,i,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Si=new Sr,Ci=new B(.5,.5),wi=new V,Ti=class{constructor(e=new Lr,t=new Lr,n=new Lr,r=new Lr,i=new Lr,a=new Lr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ke,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Si.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Si.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Si)}intersectsSprite(e){return Si.center.set(0,0,0),Si.radius=.7071067811865476+Ci.distanceTo(e.center),Si.applyMatrix4(e.matrixWorld),this.intersectsSphere(Si)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(wi.x=r.normal.x>0?e.max.x:e.min.x,wi.y=r.normal.y>0?e.max.y:e.min.y,wi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(wi)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ei=class extends zr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new W(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Di=new $t,Oi=new oi,ki=new Sr,Ai=new V,ji=class extends Dn{constructor(e=new Ar,t=new Ei){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ki.copy(n.boundingSphere),ki.applyMatrix4(r),ki.radius+=i,e.ray.intersectsSphere(ki)===!1)return;Di.copy(r).invert(),Oi.copy(e.ray).applyMatrix4(Di);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Ai.fromBufferAttribute(l,n),Mi(Ai,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Ai.fromBufferAttribute(l,a),Mi(Ai,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Mi(e,t,n,r,i,a,o){let s=Oi.distanceSqToPoint(e);if(s<n){let n=new V;Oi.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ni=class extends qt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Pi=class extends qt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Fi=class extends qt{constructor(e,t,n=m,i,a,o,s=r,c=r,l,u=T,d=1){if(u!==1026&&u!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},i,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ut(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ii=class extends Fi{constructor(e,t=m,n=301,i,a,o=r,s=r,c,l=T){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,i,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Li=class extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},K=class e extends Ar{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new vr(c,3)),this.setAttribute(`normal`,new vr(l,3)),this.setAttribute(`uv`,new vr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new V;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Ri=class e extends Ar{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new V,l=new B;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new vr(a,3)),this.setAttribute(`normal`,new vr(o,3)),this.setAttribute(`uv`,new vr(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},zi=class e extends Ar{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new vr(u,3)),this.setAttribute(`normal`,new vr(d,3)),this.setAttribute(`uv`,new vr(f,2));function _(){let a=new V,_=new V,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new B,m=new V,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Bi=class e extends zi{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Vi=class e extends Ar{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new vr(i,3)),this.setAttribute(`normal`,new vr(i.slice(),3)),this.setAttribute(`uv`,new vr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new V,r=new V,i=new V;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new V;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new V;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new V,t=new V,n=new V,r=new V,o=new B,s=new B,c=new B;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Hi=class e extends Vi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Ui=class e extends Vi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Wi=class e extends Ar{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new vr(p,3)),this.setAttribute(`normal`,new vr(m,3)),this.setAttribute(`uv`,new vr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Gi=class e extends Ar{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new V,p=new B;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new vr(s,3)),this.setAttribute(`normal`,new vr(c,3)),this.setAttribute(`uv`,new vr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Ki=class e extends Ar{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new V,d=new V,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new vr(p,3)),this.setAttribute(`normal`,new vr(m,3)),this.setAttribute(`uv`,new vr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},qi=class e extends Ar{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new V,f=new V,p=new V;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new vr(c,3)),this.setAttribute(`normal`,new vr(l,3)),this.setAttribute(`uv`,new vr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function Ji(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Xi(i))i.isRenderTargetTexture?(L(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Xi(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Yi(e){let t={};for(let n=0;n<e.length;n++){let r=Ji(e[n]);for(let e in r)t[e]=r[e]}return t}function Xi(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Zi(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Qi(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Lt.workingColorSpace}var $i={clone:Ji,merge:Yi},ea=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ta=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,na=class extends zr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ea,this.fragmentShader=ta,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ji(e.uniforms),this.uniformsGroups=Zi(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new W().setHex(r.value);break;case`v2`:this.uniforms[n].value=new B().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new V().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Jt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new H().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new $t().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ra=class extends na{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},q=class extends zr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new W(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new B(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ia=class extends zr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new W(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new W(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new B(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},aa=class extends zr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=I,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},oa=class extends zr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function sa(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function ca(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var la=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ua=class extends la{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Le,endingEnd:Le}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case F:i=e,o=2*t-n;break;case Re:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case F:a=e,s=2*n-t;break;case Re:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},da=class extends la{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},fa=class extends la{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},pa=class extends la{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=ga(n,t,g,y,r);i[p]=ma(x,o,_,b,m)}return i}};function ma(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function ha(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function ga(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=ma(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=ha(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var _a=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=sa(t,this.TimeBufferType),this.values=sa(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:sa(e.times,Array),values:sa(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),ca(e.settings)&&(n.settings={inTangents:sa(e.settings.inTangents,Array),outTangents:sa(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new fa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new da(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ua(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new pa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Pe:t=this.InterpolantFactoryMethodDiscrete;break;case P:t=this.InterpolantFactoryMethodLinear;break;case Fe:t=this.InterpolantFactoryMethodSmooth;break;case Ie:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return L(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Pe;case this.InterpolantFactoryMethodLinear:return P;case this.InterpolantFactoryMethodSmooth:return Fe;case this.InterpolantFactoryMethodBezier:return Ie}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;ca(this.settings)&&(va(this.settings.inTangents,e),va(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(R(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(R(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){R(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){R(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Je(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){R(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Fe,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,ca(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function va(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}_a.prototype.ValueTypeName=``,_a.prototype.TimeBufferType=Float32Array,_a.prototype.ValueBufferType=Float32Array,_a.prototype.DefaultInterpolation=P;var ya=class extends _a{constructor(e,t,n){super(e,t,n)}};ya.prototype.ValueTypeName=`bool`,ya.prototype.ValueBufferType=Array,ya.prototype.DefaultInterpolation=Pe,ya.prototype.InterpolantFactoryMethodLinear=void 0,ya.prototype.InterpolantFactoryMethodSmooth=void 0;var ba=class extends _a{constructor(e,t,n,r){super(e,t,n,r)}};ba.prototype.ValueTypeName=`color`;var xa=class extends _a{constructor(e,t,n,r){super(e,t,n,r)}};xa.prototype.ValueTypeName=`number`;var Sa=class extends la{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)At.slerpFlat(i,0,a,c-o,a,c,s);return i}},Ca=class extends _a{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Sa(this.times,this.values,this.getValueSize(),e)}};Ca.prototype.ValueTypeName=`quaternion`,Ca.prototype.InterpolantFactoryMethodSmooth=void 0;var wa=class extends _a{constructor(e,t,n){super(e,t,n)}};wa.prototype.ValueTypeName=`string`,wa.prototype.ValueBufferType=Array,wa.prototype.DefaultInterpolation=Pe,wa.prototype.InterpolantFactoryMethodLinear=void 0,wa.prototype.InterpolantFactoryMethodSmooth=void 0;var Ta=class extends _a{constructor(e,t,n,r){super(e,t,n,r)}};Ta.prototype.ValueTypeName=`vector`;var Ea=class extends Dn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new W(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Da=class extends Ea{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new W(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Oa=new $t,ka=new V,Aa=new V,ja=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new B(512,512),this.mapType=l,this.map=null,this.mapPass=null,this.matrix=new $t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ti,this._frameExtents=new B(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ka.setFromMatrixPosition(e.matrixWorld),t.position.copy(ka),Aa.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Aa),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Oa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Oa,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Oa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ma=new V,Na=new At,Pa=new V,Fa=class extends Dn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new $t,this.projectionMatrix=new $t,this.projectionMatrixInverse=new $t,this.coordinateSystem=Ke,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ma,Na,Pa),Pa.x===1&&Pa.y===1&&Pa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,Na,Pa.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ma,Na,Pa),Pa.x===1&&Pa.y===1&&Pa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ma,Na,Pa.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ia=new V,La=new B,Ra=new B,za=class extends Fa{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=st*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ot*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return st*2*Math.atan(Math.tan(ot*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ia.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ia.x,Ia.y).multiplyScalar(-e/Ia.z),Ia.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ia.x,Ia.y).multiplyScalar(-e/Ia.z)}getViewSize(e,t){return this.getViewBounds(e,La,Ra),t.subVectors(Ra,La)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ot*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ba=class extends ja{constructor(){super(new za(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=st*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Va=class extends Ea{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.target=new Dn,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new Ba}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Ha=class extends ja{constructor(){super(new za(90,1,.5,500)),this.isPointLightShadow=!0}},Ua=class extends Ea{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Ha}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Wa=class extends Fa{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ga=class extends ja{constructor(){super(new Wa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ka=class extends Ea{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Dn.DEFAULT_UP),this.updateMatrix(),this.target=new Dn,this.shadow=new Ga}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},qa=class extends Ea{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Ja=-90,Ya=1,Xa=class extends Dn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new za(Ja,Ya,e,t);r.layers=this.layers,this.add(r);let i=new za(Ja,Ya,e,t);i.layers=this.layers,this.add(i);let a=new za(Ja,Ya,e,t);a.layers=this.layers,this.add(a);let o=new za(Ja,Ya,e,t);o.layers=this.layers,this.add(o);let s=new za(Ja,Ya,e,t);s.layers=this.layers,this.add(s);let c=new za(Ja,Ya,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Za=class extends za{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Qa=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=$a.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function $a(){this._document.hidden===!1&&this.reset()}var eo=`\\[\\]\\.:\\/`,to=RegExp(`[\\[\\]\\.:\\/]`,`g`),no=`[^\\[\\]\\.:\\/]`,ro=`[^`+eo.replace(`\\.`,``)+`]`,io=`((?:WC+[\\/:])*)`.replace(`WC`,no),ao=`(WCOD+)?`.replace(`WCOD`,ro),oo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,no),so=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,no),co=RegExp(`^`+io+ao+oo+so+`$`),lo=[`material`,`materials`,`bones`,`map`],uo=class{constructor(e,t,n){let r=n||fo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},fo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(to,``)}static parseTrackName(e){let t=co.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);lo.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){L(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){R(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){R(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){R(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){R(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){R(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){R(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){R(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;R(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){R(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){R(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};fo.Composite=uo,fo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},fo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},fo.prototype.GetterByBindingType=[fo.prototype._getValue_direct,fo.prototype._getValue_array,fo.prototype._getValue_arrayElement,fo.prototype._getValue_toArray],fo.prototype.SetterByBindingTypeAndVersioning=[[fo.prototype._setValue_direct,fo.prototype._setValue_direct_setNeedsUpdate,fo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[fo.prototype._setValue_array,fo.prototype._setValue_array_setNeedsUpdate,fo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[fo.prototype._setValue_arrayElement,fo.prototype._setValue_arrayElement_setNeedsUpdate,fo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[fo.prototype._setValue_fromArray,fo.prototype._setValue_fromArray_setNeedsUpdate,fo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function po(e,t,n,r){let i=mo(r);switch(n){case S:return e*t;case D:return e*t/i.components*i.byteLength;case ee:return e*t/i.components*i.byteLength;case O:return e*t*2/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case C:return e*t*3/i.components*i.byteLength;case w:return e*t*4/i.components*i.byteLength;case te:return e*t*4/i.components*i.byteLength;case A:case ne:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case j:case re:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ie:case oe:return Math.max(e,16)*Math.max(t,8)/4;case M:case ae:return Math.max(e,8)*Math.max(t,8)/2;case se:case ce:case ue:case N:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case le:case de:case fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case pe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case me:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case he:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ge:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case _e:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ve:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ye:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case be:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case xe:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Se:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Ce:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case we:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Te:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Ee:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case De:case Oe:case ke:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ae:case je:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Me:case Ne:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function mo(e){switch(e){case l:case u:return{byteLength:1,components:1};case f:case d:case g:return{byteLength:2,components:1};case _:case v:return{byteLength:2,components:4};case m:case p:case h:return{byteLength:4,components:1};case b:case x:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?L(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function ho(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function go(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var _o={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
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
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
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
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
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
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
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
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
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
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
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
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
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
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
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
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
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
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
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
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
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
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
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
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
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
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
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
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
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
vec3 CineonToneMapping( vec3 color ) {
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
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
	#include <morphinstance_vertex>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
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
	#include <morphinstance_vertex>
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
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
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
	#include <morphinstance_vertex>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,meshlambert_vert:`#define LAMBERT
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
	#include <morphinstance_vertex>
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
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,meshmatcap_vert:`#define MATCAP
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
	#include <morphinstance_vertex>
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
}`,meshmatcap_frag:`#define MATCAP
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,meshnormal_vert:`#define NORMAL
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
	#include <morphinstance_vertex>
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
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
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
	#include <morphinstance_vertex>
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
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,meshphysical_vert:`#define STANDARD
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
	#include <morphinstance_vertex>
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
}`,meshphysical_frag:`#define STANDARD
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
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,meshtoon_vert:`#define TOON
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
	#include <morphinstance_vertex>
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
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,points_vert:`uniform float size;
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
	#include <morphinstance_vertex>
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
}`,points_frag:`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
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
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,sprite_frag:`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
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
}`},J={common:{diffuse:{value:new W(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new H},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new H}},envmap:{envMap:{value:null},envMapRotation:{value:new H},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new H}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new H}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new H},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new H},normalScale:{value:new B(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new H},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new H}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new H}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new H}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new W(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new V},probesMax:{value:new V},probesResolution:{value:new V}},points:{diffuse:{value:new W(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0},uvTransform:{value:new H}},sprite:{diffuse:{value:new W(16777215)},opacity:{value:1},center:{value:new B(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new H},alphaMap:{value:null},alphaMapTransform:{value:new H},alphaTest:{value:0}}},vo={basic:{uniforms:Yi([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.fog]),vertexShader:_o.meshbasic_vert,fragmentShader:_o.meshbasic_frag},lambert:{uniforms:Yi([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.fog,J.lights,{emissive:{value:new W(0)},envMapIntensity:{value:1}}]),vertexShader:_o.meshlambert_vert,fragmentShader:_o.meshlambert_frag},phong:{uniforms:Yi([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.fog,J.lights,{emissive:{value:new W(0)},specular:{value:new W(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:_o.meshphong_vert,fragmentShader:_o.meshphong_frag},standard:{uniforms:Yi([J.common,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.roughnessmap,J.metalnessmap,J.fog,J.lights,{emissive:{value:new W(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_o.meshphysical_vert,fragmentShader:_o.meshphysical_frag},toon:{uniforms:Yi([J.common,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.gradientmap,J.fog,J.lights,{emissive:{value:new W(0)}}]),vertexShader:_o.meshtoon_vert,fragmentShader:_o.meshtoon_frag},matcap:{uniforms:Yi([J.common,J.bumpmap,J.normalmap,J.displacementmap,J.fog,{matcap:{value:null}}]),vertexShader:_o.meshmatcap_vert,fragmentShader:_o.meshmatcap_frag},points:{uniforms:Yi([J.points,J.fog]),vertexShader:_o.points_vert,fragmentShader:_o.points_frag},dashed:{uniforms:Yi([J.common,J.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_o.linedashed_vert,fragmentShader:_o.linedashed_frag},depth:{uniforms:Yi([J.common,J.displacementmap]),vertexShader:_o.depth_vert,fragmentShader:_o.depth_frag},normal:{uniforms:Yi([J.common,J.bumpmap,J.normalmap,J.displacementmap,{opacity:{value:1}}]),vertexShader:_o.meshnormal_vert,fragmentShader:_o.meshnormal_frag},sprite:{uniforms:Yi([J.sprite,J.fog]),vertexShader:_o.sprite_vert,fragmentShader:_o.sprite_frag},background:{uniforms:{uvTransform:{value:new H},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_o.background_vert,fragmentShader:_o.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new H}},vertexShader:_o.backgroundCube_vert,fragmentShader:_o.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_o.cube_vert,fragmentShader:_o.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_o.equirect_vert,fragmentShader:_o.equirect_frag},distance:{uniforms:Yi([J.common,J.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_o.distance_vert,fragmentShader:_o.distance_frag},shadow:{uniforms:Yi([J.lights,J.fog,{color:{value:new W(0)},opacity:{value:1}}]),vertexShader:_o.shadow_vert,fragmentShader:_o.shadow_frag}};vo.physical={uniforms:Yi([vo.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new H},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new H},clearcoatNormalScale:{value:new B(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new H},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new H},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new H},sheen:{value:0},sheenColor:{value:new W(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new H},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new H},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new H},transmissionSamplerSize:{value:new B},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new H},attenuationDistance:{value:0},attenuationColor:{value:new W(0)},specularColor:{value:new W(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new H},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new H},anisotropyVector:{value:new B},anisotropyMap:{value:null},anisotropyMapTransform:{value:new H}}]),vertexShader:_o.meshphysical_vert,fragmentShader:_o.meshphysical_frag};var yo={r:0,b:0,g:0},bo=new $t,xo=new H;xo.set(-1,0,0,0,1,0,0,0,1);function So(e,t,n,r,i,a){let o=new W(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new G(new K(1,1,1),new na({name:`BackgroundCubeMaterial`,uniforms:Ji(vo.backgroundCube.uniforms),vertexShader:vo.backgroundCube.vertexShader,fragmentShader:vo.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(bo.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(xo),l.material.toneMapped=Lt.getTransfer(i.colorSpace)!==Ue,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new G(new Wi(2,2),new na({name:`BackgroundMaterial`,uniforms:Ji(vo.background.uniforms),vertexShader:vo.background.vertexShader,fragmentShader:vo.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Lt.getTransfer(i.colorSpace)!==Ue,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(yo,Qi(e)),n.buffers.color.setClear(yo.r,yo.g,yo.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Co(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function wo(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function To(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(L(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&L(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Eo(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Lr,s=new H,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Do=4,Oo=6,ko=20,Ao=256,jo=new Wa,Mo=new W,No=null,Po=0,Fo=0,Io=!1,Lo=new V,Ro=new V,zo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Lo}=i;No=this._renderer.getRenderTarget(),Po=this._renderer.getActiveCubeFace(),Fo=this._renderer.getActiveMipmapLevel(),Io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ko(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Go(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(No,Po,Fo),this._renderer.xr.enabled=Io,e.scissorTest=!1,Ho(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),No=this._renderer.getRenderTarget(),Po=this._renderer.getActiveCubeFace(),Fo=this._renderer.getActiveMipmapLevel(),Io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:g,format:w,colorSpace:Ve,depthBuffer:!1},r=Vo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vo(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Bo(r)),this._blurMaterial=Wo(r,e,t),this._ggxMaterial=Uo(r,e,t)}return r}_compileMaterial(e){let t=new G(new Ar,e);this._renderer.compile(t,jo)}_sceneToCubeUV(e,t,n,r,i){let a=new za(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Mo),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new G(new K,new si({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Mo),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Ho(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ko()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Go());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Ho(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,jo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Do?n-d+Do:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Ho(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,jo),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Ho(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,jo)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Ho(t,3*l*(r>this._lodMax-Do?r-this._lodMax+Do:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,jo)}};function Bo(e){let t=[],n=[],r=e,i=e-Do+1+Oo;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Ro.set(1,r,n):e===1?Ro.set(-n,1,-r):e===2?Ro.set(-n,r,1):e===3?Ro.set(-1,r,-n):e===4?Ro.set(-n,-1,r):Ro.set(n,r,-1),Ro.toArray(l,(e*6+t)*3)}}let u=new Ar;u.setAttribute(`position`,new hr(c,3)),u.setAttribute(`outputDirection`,new hr(l,3)),n.push(new G(u,null)),r>Do&&r--}return{lodMeshes:n,sizeLods:t}}function Vo(e,t,n){let r=new Xt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Ho(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Uo(e,t,n){return new na({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Ao,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:qo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Wo(e,t,n){return new na({name:`SphericalGaussianBlur`,defines:{SAMPLES:ko,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:qo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Go(){return new na({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:qo(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ko(){return new na({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function qo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Jo=class extends Xt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ni(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new K(5,5,5),i=new na({name:`CubemapFromEquirect`,uniforms:Ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new G(r,i),s=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new Xa(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Yo(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Jo(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new zo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new zo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Xo(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&et(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Zo(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?_r:gr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Qo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function $o(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:R(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function es(e,t,n){let r=new WeakMap,i=new Jt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let g=new Float32Array(p*m*4*u),_=new Zt(g,p,m,u);_.type=h,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),g[d+s+0]=i.x,g[d+s+1]=i.y,g[d+s+2]=i.z,g[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),g[d+s+4]=i.x,g[d+s+5]=i.y,g[d+s+6]=i.z,g[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),g[d+s+8]=i.x,g[d+s+9]=i.y,g[d+s+10]=i.z,g[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new B(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function ts(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var ns={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function rs(e,t,n,r,i,a){let o=new Xt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Ar;l.setAttribute(`position`,new vr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new vr([0,2,0,0,2,0],2));let u=new ra({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new G(l,u),f=new Wa(-1,1,1,-1,0,1),p=null,m=null,h=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=o.width,n=o.height;y.length>0&&s===null&&(s=new Xt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}),c=new Xt(t,n,{type:g,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,h=!0;let n=o,r=s;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Lt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=ns[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(d,f),v=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var is=new qt,as=new Fi(1,1),os=new Zt,ss=new Qt,cs=new Ni,ls=[],us=[],ds=new Float32Array(16),fs=new Float32Array(9),ps=new Float32Array(4);function ms(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ls[i];if(a===void 0&&(a=new Float32Array(i),ls[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function hs(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function gs(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function _s(e,t){let n=us[t];n===void 0&&(n=new Int32Array(t),us[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function vs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function ys(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(hs(n,t))return;e.uniform2fv(this.addr,t),gs(n,t)}}function bs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(hs(n,t))return;e.uniform3fv(this.addr,t),gs(n,t)}}function xs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(hs(n,t))return;e.uniform4fv(this.addr,t),gs(n,t)}}function Ss(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(hs(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),gs(n,t)}else{if(hs(n,r))return;ps.set(r),e.uniformMatrix2fv(this.addr,!1,ps),gs(n,r)}}function Cs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(hs(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),gs(n,t)}else{if(hs(n,r))return;fs.set(r),e.uniformMatrix3fv(this.addr,!1,fs),gs(n,r)}}function ws(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(hs(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),gs(n,t)}else{if(hs(n,r))return;ds.set(r),e.uniformMatrix4fv(this.addr,!1,ds),gs(n,r)}}function Ts(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Es(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(hs(n,t))return;e.uniform2iv(this.addr,t),gs(n,t)}}function Ds(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(hs(n,t))return;e.uniform3iv(this.addr,t),gs(n,t)}}function Os(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(hs(n,t))return;e.uniform4iv(this.addr,t),gs(n,t)}}function ks(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function As(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(hs(n,t))return;e.uniform2uiv(this.addr,t),gs(n,t)}}function js(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(hs(n,t))return;e.uniform3uiv(this.addr,t),gs(n,t)}}function Ms(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(hs(n,t))return;e.uniform4uiv(this.addr,t),gs(n,t)}}function Ns(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(as.compareFunction=n.isReversedDepthBuffer()?518:515,a=as):a=is,n.setTexture2D(t||a,i)}function Ps(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ss,i)}function Fs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||cs,i)}function Is(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||os,i)}function Ls(e){switch(e){case 5126:return vs;case 35664:return ys;case 35665:return bs;case 35666:return xs;case 35674:return Ss;case 35675:return Cs;case 35676:return ws;case 5124:case 35670:return Ts;case 35667:case 35671:return Es;case 35668:case 35672:return Ds;case 35669:case 35673:return Os;case 5125:return ks;case 36294:return As;case 36295:return js;case 36296:return Ms;case 35678:case 36198:case 36298:case 36306:case 35682:return Ns;case 35679:case 36299:case 36307:return Ps;case 35680:case 36300:case 36308:case 36293:return Fs;case 36289:case 36303:case 36311:case 36292:return Is}}function Rs(e,t){e.uniform1fv(this.addr,t)}function zs(e,t){let n=ms(t,this.size,2);e.uniform2fv(this.addr,n)}function Bs(e,t){let n=ms(t,this.size,3);e.uniform3fv(this.addr,n)}function Vs(e,t){let n=ms(t,this.size,4);e.uniform4fv(this.addr,n)}function Hs(e,t){let n=ms(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Us(e,t){let n=ms(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Ws(e,t){let n=ms(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Gs(e,t){e.uniform1iv(this.addr,t)}function Ks(e,t){e.uniform2iv(this.addr,t)}function qs(e,t){e.uniform3iv(this.addr,t)}function Js(e,t){e.uniform4iv(this.addr,t)}function Ys(e,t){e.uniform1uiv(this.addr,t)}function Xs(e,t){e.uniform2uiv(this.addr,t)}function Zs(e,t){e.uniform3uiv(this.addr,t)}function Qs(e,t){e.uniform4uiv(this.addr,t)}function $s(e,t,n){let r=this.cache,i=t.length,a=_s(n,i);hs(r,a)||(e.uniform1iv(this.addr,a),gs(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?as:is;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function ec(e,t,n){let r=this.cache,i=t.length,a=_s(n,i);hs(r,a)||(e.uniform1iv(this.addr,a),gs(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ss,a[e])}function tc(e,t,n){let r=this.cache,i=t.length,a=_s(n,i);hs(r,a)||(e.uniform1iv(this.addr,a),gs(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||cs,a[e])}function nc(e,t,n){let r=this.cache,i=t.length,a=_s(n,i);hs(r,a)||(e.uniform1iv(this.addr,a),gs(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||os,a[e])}function rc(e){switch(e){case 5126:return Rs;case 35664:return zs;case 35665:return Bs;case 35666:return Vs;case 35674:return Hs;case 35675:return Us;case 35676:return Ws;case 5124:case 35670:return Gs;case 35667:case 35671:return Ks;case 35668:case 35672:return qs;case 35669:case 35673:return Js;case 5125:return Ys;case 36294:return Xs;case 36295:return Zs;case 36296:return Qs;case 35678:case 36198:case 36298:case 36306:case 35682:return $s;case 35679:case 36299:case 36307:return ec;case 35680:case 36300:case 36308:case 36293:return tc;case 36289:case 36303:case 36311:case 36292:return nc}}var ic=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ls(t.type)}},ac=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=rc(t.type)}},oc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},sc=/(\w+)(\])?(\[|\.)?/g;function cc(e,t){e.seq.push(t),e.map[t.id]=t}function lc(e,t,n){let r=e.name,i=r.length;for(sc.lastIndex=0;;){let a=sc.exec(r),o=sc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){cc(n,l===void 0?new ic(s,e,t):new ac(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new oc(s),cc(n,e)),n=e}}}var uc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);lc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function dc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var fc=37297,pc=0;function mc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var hc=new H;function gc(e){Lt._getMatrix(hc,Lt.workingColorSpace,e);let t=`mat3( ${hc.elements.map(e=>e.toFixed(4))} )`;switch(Lt.getTransfer(e)){case He:return[t,`LinearTransferOETF`];case Ue:return[t,`sRGBTransferOETF`];default:return L(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function _c(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+mc(e.getShaderSource(t),r)}return i}function vc(e,t){let n=gc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var yc={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function bc(e,t){let n=yc[t];return n===void 0?(L(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var xc=new V;function Sc(){return Lt.getLuminanceCoefficients(xc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${xc.x.toFixed(4)}, ${xc.y.toFixed(4)}, ${xc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Cc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Ec).join(`
`)}function wc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Tc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Ec(e){return e!==``}function Dc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Oc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var kc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ac(e){return e.replace(kc,Mc)}var jc=new Map;function Mc(e,t){let n=_o[t];if(n===void 0){let e=jc.get(t);if(e!==void 0)n=_o[e],L(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Ac(n)}var Nc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Pc(e){return e.replace(Nc,Fc)}function Fc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Ic(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Lc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Rc(e){return Lc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var zc={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Bc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:zc[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Vc={302:`ENVMAP_MODE_REFRACTION`};function Hc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Vc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Uc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Wc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Uc[e.combine]||`ENVMAP_BLENDING_NONE`}function Gc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Kc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Rc(n),l=Bc(n),u=Hc(n),d=Wc(n),f=Gc(n),p=Cc(n),m=wc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Ec).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Ec).join(`
`),_.length>0&&(_+=`
`)):(g=[Ic(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Ec).join(`
`),_=[Ic(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:_o.tonemapping_pars_fragment,n.toneMapping===0?``:bc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,_o.colorspace_pars_fragment,vc(`linearToOutputTexel`,n.outputColorSpace),Sc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Ec).join(`
`)),o=Ac(o),o=Dc(o,n),o=Oc(o,n),s=Ac(s),s=Dc(s,n),s=Oc(s,n),o=Pc(o),s=Pc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=dc(i,i.VERTEX_SHADER,y),S=dc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=_c(i,x,`vertex`),n=_c(i,S,`fragment`);R(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):L(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new uc(i,h),T=Tc(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,fc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=pc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var qc=0,Jc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Yc(e),t.set(e,n)),n}},Yc=class{constructor(e){this.id=qc++,this.code=e,this.usedTimes=0}};function Xc(e){return e===1030||e===37490||e===36285}function Zc(e,t,n,r,i,a){let o=new dn,s=new Jc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&L(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,ee,O,k;if(C){let e=vo[C];D=e.vertexShader,ee=e.fragmentShader}else{D=i.vertexShader,ee=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),O=e.id,k=t.id}let te=e.getRenderTarget(),A=e.state.buffers.depth.getReversed(),ne=h.isInstancedMesh===!0,j=h.isBatchedMesh===!0,re=!!i.map,M=!!i.matcap,ie=!!x,ae=!!i.aoMap,oe=!!i.lightMap,se=!!i.bumpMap&&i.wireframe===!1,ce=!!i.normalMap,le=!!i.displacementMap,ue=!!i.emissiveMap,N=!!i.metalnessMap,de=!!i.roughnessMap,fe=i.anisotropy>0,pe=i.clearcoat>0,me=i.dispersion>0,he=i.retroreflectivity>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=fe&&!!i.anisotropyMap,be=pe&&!!i.clearcoatMap,xe=pe&&!!i.clearcoatNormalMap,Se=pe&&!!i.clearcoatRoughnessMap,Ce=ge&&!!i.iridescenceMap,we=ge&&!!i.iridescenceThicknessMap,Te=_e&&!!i.sheenColorMap,Ee=_e&&!!i.sheenRoughnessMap,De=!!i.specularMap,Oe=!!i.specularColorMap,ke=!!i.specularIntensityMap,Ae=ve&&!!i.transmissionMap,je=ve&&!!i.thicknessMap,Me=!!i.gradientMap,Ne=!!i.alphaMap,Pe=i.alphaTest>0,P=!!i.alphaHash,Fe=!!i.extensions,Ie=0;i.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(Ie=e.toneMapping);let Le={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:ee,defines:i.defines,customVertexShaderID:O,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:j,batchingColor:j&&h._colorsTexture!==null,instancing:ne,instancingColor:ne&&h.instanceColor!==null,instancingMorph:ne&&h.morphTexture!==null,outputColorSpace:te===null?e.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Lt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:re,matcap:M,envMap:ie,envMapMode:ie&&x.mapping,envMapCubeUVHeight:S,aoMap:ae,lightMap:oe,bumpMap:se,normalMap:ce,displacementMap:le,emissiveMap:ue,normalMapObjectSpace:ce&&i.normalMapType===1,normalMapTangentSpace:ce&&i.normalMapType===0,packedNormalMap:ce&&i.normalMapType===0&&Xc(i.normalMap.format),metalnessMap:N,roughnessMap:de,anisotropy:fe,anisotropyMap:ye,clearcoat:pe,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,dispersion:me,retroreflection:he,iridescence:ge,iridescenceMap:Ce,iridescenceThicknessMap:we,sheen:_e,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:ke,transmission:ve,transmissionMap:Ae,thicknessMap:je,gradientMap:Me,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ne,alphaTest:Pe,alphaHash:P,combine:i.combine,mapUv:re&&m(i.map.channel),aoMapUv:ae&&m(i.aoMap.channel),lightMapUv:oe&&m(i.lightMap.channel),bumpMapUv:se&&m(i.bumpMap.channel),normalMapUv:ce&&m(i.normalMap.channel),displacementMapUv:le&&m(i.displacementMap.channel),emissiveMapUv:ue&&m(i.emissiveMap.channel),metalnessMapUv:N&&m(i.metalnessMap.channel),roughnessMapUv:de&&m(i.roughnessMap.channel),anisotropyMapUv:ye&&m(i.anisotropyMap.channel),clearcoatMapUv:be&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:we&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(i.sheenRoughnessMap.channel),specularMapUv:De&&m(i.specularMap.channel),specularColorMapUv:Oe&&m(i.specularColorMap.channel),specularIntensityMapUv:ke&&m(i.specularIntensityMap.channel),transmissionMapUv:Ae&&m(i.transmissionMap.channel),thicknessMapUv:je&&m(i.thicknessMap.channel),alphaMapUv:Ne&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(ce||fe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(re||Ne),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&ce===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:A,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ie,decodeVideoTexture:re&&i.map.isVideoTexture===!0&&Lt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ue&&i.emissiveMap.isVideoTexture===!0&&Lt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Fe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Fe&&i.extensions.multiDraw===!0||j)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Le.vertexUv1s=c.has(1),Le.vertexUv2s=c.has(2),Le.vertexUv3s=c.has(3),c.clear(),Le}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=vo[t];n=$i.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Kc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Qc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function $c(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function el(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function tl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||$c),r.length>1&&r.sort(t||el),i.length>1&&i.sort(t||el)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function nl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new tl,e.set(t,[i])):n>=r.length?(i=new tl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function rl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new V,color:new W};break;case`SpotLight`:n={position:new V,direction:new V,color:new W,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new V,color:new W,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new V,skyColor:new W,groundColor:new W};break;case`RectAreaLight`:n={color:new W,position:new V,halfWidth:new V,halfHeight:new V}}return e[t.id]=n,n}}}function il(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new B,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var al=0;function ol(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function sl(e){let t=new rl,n=il(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new V);let i=new V,a=new $t,o=new $t;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(ol);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=J.LTC_FLOAT_1,r.rectAreaLTC2=J.LTC_FLOAT_2):(r.rectAreaLTC1=J.LTC_HALF_1,r.rectAreaLTC2=J.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=al++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function cl(e){let t=new sl(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function ll(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new cl(e),t.set(n,[a])):r>=i.length?(a=new cl(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ul=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dl=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,fl=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],pl=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],ml=new $t,hl=new V,gl=new V;function _l(e,t,n){let i=new Ti,a=new B,s=new B,c=new Jt,l=new aa,u=new oa,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},_=new na({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new B},radius:{value:4}},vertexShader:ul,fragmentShader:dl}),v=_.clone();v.defines.HORIZONTAL_PASS=1;let y=new Ar;y.setAttribute(`position`,new hr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new G(y,_),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(L(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.state;_.setBlending(0),_.buffers.depth.getReversed()===!0?_.buffers.color.setClear(0,0,0,0):_.buffers.color.setClear(1,1,1,1),_.buffers.depth.setTest(!0),_.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){L(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),s.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/y.x),a.x=s.x*y.x,p.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/y.y),a.y=s.y*y.y,p.mapSize.y=s.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){L(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new Xt(a.x,a.y,{format:O,type:g,minFilter:o,magFilter:o,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new Fi(a.x,a.y,h),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=T,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r}else d.isPointLight?(p.map=new Jo(a.x),p.map.depthTexture=new Ii(a.x,m)):(p.map=new Xt(a.x,a.y),p.map.depthTexture=new Fi(a.x,a.y,m)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=T,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=o,p.map.depthTexture.magFilter=o):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=r,p.map.depthTexture.magFilter=r);p.camera.updateProjectionMatrix()}p.map.isWebGLCubeRenderTarget!==!0&&(p.map.width!==a.x||p.map.height!==a.y)&&p.map.setSize(a.x,a.y);let x=p.map.isWebGLCubeRenderTarget?6:p.getViewportCount();d.isPointLight!==!0&&p.updateMatrices(d,l);for(let t=0;t<x;t++){let r=p.getCamera(t);if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),hl.setFromMatrixPosition(d.matrixWorld),e.position.copy(hl),gl.copy(e.position),gl.add(fl[t]),e.up.copy(pl[t]),e.lookAt(gl),e.updateMatrixWorld(),n.makeTranslation(-hl.x,-hl.y,-hl.z),ml.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(ml,e.coordinateSystem,e.reversedDepth)}if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(s.x*n.x,s.y*n.y,s.x*n.z,s.y*n.w),_.viewport(c)}i=p.getFrustum(t),E(n,l,r,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);_.defines.VSM_SAMPLES!==n.blurSamples&&(_.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,_.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new Xt(a.x,a.y,{format:O,type:g}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),_.uniforms.shadow_pass.value=n.map.depthTexture,_.uniforms.resolution.value.set(n.map.width,n.map.height),_.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,_,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function E(n,r,a,o,s){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(i))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),c=n.material;if(Array.isArray(c)){let t=i.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,r,a,i,t,u),e.renderBufferDirect(a,null,i,t,n,u),n.onAfterShadow(e,n,r,a,i,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)E(c[e],r,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function vl(e,t){function n(){let t=!1,n=new Jt,r=null,i=new Jt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?N(e.DEPTH_TEST):de(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=nt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?N(e.STENCIL_TEST):de(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,ee=null,O=null,k=null,te=null,A=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ne=!1,j=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),ne=j>=2):(j=parseFloat(/^WebGL (\d)/.exec(re)[1]),ne=j>=1);let M=null,ie={},ae=e.getParameter(e.SCISSOR_BOX),oe=e.getParameter(e.VIEWPORT),se=new Jt().fromArray(ae),ce=new Jt().fromArray(oe);function le(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ue={};ue[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),N(e.DEPTH_TEST),o.setFunc(3),ye(!1),be(1),N(e.CULL_FACE),_e(0);function N(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function de(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function fe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function pe(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function me(t){return h!==t&&(e.useProgram(t),h=t,!0)}let he={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};he[103]=e.MIN,he[104]=e.MAX;let ge={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function _e(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(de(e.BLEND),g=!1);return}if(g===!1&&(N(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:R(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:R(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:R(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:R(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(he[n],he[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ge[r],ge[i],ge[o],ge[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ve(t,n){t.side===2?de(e.CULL_FACE):N(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ye(r),t.blending===1&&t.transparent===!1?_e(0):_e(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Se(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?N(e.SAMPLE_ALPHA_TO_COVERAGE):de(e.SAMPLE_ALPHA_TO_COVERAGE)}function ye(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function be(t){t===0?de(e.CULL_FACE):(N(e.CULL_FACE),t!==ee&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),ee=t}function xe(t){t!==O&&(ne&&e.lineWidth(t),O=t)}function Se(t,n,r){t?(N(e.POLYGON_OFFSET_FILL),(k!==n||te!==r)&&(k=n,te=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):de(e.POLYGON_OFFSET_FILL)}function Ce(t){t?N(e.SCISSOR_TEST):de(e.SCISSOR_TEST)}function we(t){t===void 0&&(t=e.TEXTURE0+A-1),M!==t&&(e.activeTexture(t),M=t)}function Te(t,n,r){r===void 0&&(r=M===null?e.TEXTURE0+A-1:M);let i=ie[r];i===void 0&&(i={type:void 0,texture:void 0},ie[r]=i),(i.type!==t||i.texture!==n)&&(M!==r&&(e.activeTexture(r),M=r),e.bindTexture(t,n||ue[t]),i.type=t,i.texture=n)}function Ee(){let t=ie[M];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function De(){try{e.compressedTexImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Oe(){try{e.compressedTexImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function ke(){try{e.texSubImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ae(){try{e.texSubImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function je(){try{e.compressedTexSubImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ne(){try{e.texStorage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Pe(){try{e.texStorage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function P(){try{e.texImage2D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Fe(){try{e.texImage3D(...arguments)}catch(e){R(`WebGLState:`,e)}}function Ie(t){return d[t]===void 0?e.getParameter(t):d[t]}function Le(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function F(t){se.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),se.copy(t))}function Re(t){ce.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ce.copy(t))}function I(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function ze(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Be(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},M=null,ie={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new W(0,0,0),T=0,E=!1,D=null,ee=null,O=null,k=null,te=null,se.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:N,disable:de,bindFramebuffer:fe,drawBuffers:pe,useProgram:me,setBlending:_e,setMaterial:ve,setFlipSided:ye,setCullFace:be,setLineWidth:xe,setPolygonOffset:Se,setScissorTest:Ce,activeTexture:we,bindTexture:Te,unbindTexture:Ee,compressedTexImage2D:De,compressedTexImage3D:Oe,texImage2D:P,texImage3D:Fe,pixelStorei:Le,getParameter:Ie,updateUBOMapping:I,uniformBlockBinding:ze,texStorage2D:Ne,texStorage3D:Pe,texSubImage2D:ke,texSubImage3D:Ae,compressedTexSubImage2D:je,compressedTexSubImage3D:Me,scissor:F,viewport:Re,reset:Be}}function yl(l,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new B,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Ye(`canvas`)}function T(e,t,n){let r=1,i=Ie(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),L(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&L(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function D(e){return e.generateMipmaps}function ee(e){l.generateMipmap(e)}function O(e){return e.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?l.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?l.TEXTURE_2D_ARRAY:l.TEXTURE_2D}function k(e,t,n,r,i,a=!1){if(e!==null){if(l[e]!==void 0)return l[e];L(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let o;r&&(o=u.get(`EXT_texture_norm16`),o||L(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let s=t;if(t===l.RED&&(n===l.FLOAT&&(s=l.R32F),n===l.HALF_FLOAT&&(s=l.R16F),n===l.UNSIGNED_BYTE&&(s=l.R8),n===l.UNSIGNED_SHORT&&o&&(s=o.R16_EXT),n===l.SHORT&&o&&(s=o.R16_SNORM_EXT)),t===l.RED_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.R8UI),n===l.UNSIGNED_SHORT&&(s=l.R16UI),n===l.UNSIGNED_INT&&(s=l.R32UI),n===l.BYTE&&(s=l.R8I),n===l.SHORT&&(s=l.R16I),n===l.INT&&(s=l.R32I)),t===l.RG&&(n===l.FLOAT&&(s=l.RG32F),n===l.HALF_FLOAT&&(s=l.RG16F),n===l.UNSIGNED_BYTE&&(s=l.RG8),n===l.UNSIGNED_SHORT&&o&&(s=o.RG16_EXT),n===l.SHORT&&o&&(s=o.RG16_SNORM_EXT)),t===l.RG_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RG8UI),n===l.UNSIGNED_SHORT&&(s=l.RG16UI),n===l.UNSIGNED_INT&&(s=l.RG32UI),n===l.BYTE&&(s=l.RG8I),n===l.SHORT&&(s=l.RG16I),n===l.INT&&(s=l.RG32I)),t===l.RGB_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGB8UI),n===l.UNSIGNED_SHORT&&(s=l.RGB16UI),n===l.UNSIGNED_INT&&(s=l.RGB32UI),n===l.BYTE&&(s=l.RGB8I),n===l.SHORT&&(s=l.RGB16I),n===l.INT&&(s=l.RGB32I)),t===l.RGBA_INTEGER&&(n===l.UNSIGNED_BYTE&&(s=l.RGBA8UI),n===l.UNSIGNED_SHORT&&(s=l.RGBA16UI),n===l.UNSIGNED_INT&&(s=l.RGBA32UI),n===l.BYTE&&(s=l.RGBA8I),n===l.SHORT&&(s=l.RGBA16I),n===l.INT&&(s=l.RGBA32I)),t===l.RGB&&(n===l.UNSIGNED_SHORT&&o&&(s=o.RGB16_EXT),n===l.SHORT&&o&&(s=o.RGB16_SNORM_EXT),n===l.UNSIGNED_INT_5_9_9_9_REV&&(s=l.RGB9_E5),n===l.UNSIGNED_INT_10F_11F_11F_REV&&(s=l.R11F_G11F_B10F)),t===l.RGBA){let e=a?He:Lt.getTransfer(i);n===l.FLOAT&&(s=l.RGBA32F),n===l.HALF_FLOAT&&(s=l.RGBA16F),n===l.UNSIGNED_BYTE&&(s=e===`srgb`?l.SRGB8_ALPHA8:l.RGBA8),n===l.UNSIGNED_SHORT&&o&&(s=o.RGBA16_EXT),n===l.SHORT&&o&&(s=o.RGBA16_SNORM_EXT),n===l.UNSIGNED_SHORT_4_4_4_4&&(s=l.RGBA4),n===l.UNSIGNED_SHORT_5_5_5_1&&(s=l.RGB5_A1)}return(s===l.R16F||s===l.R32F||s===l.RG16F||s===l.RG32F||s===l.RGBA16F||s===l.RGBA32F)&&u.get(`EXT_color_buffer_float`),s}function te(e,t){let n;return e?t===null||t===1014||t===1020?n=l.DEPTH24_STENCIL8:t===1015?n=l.DEPTH32F_STENCIL8:t===1012&&(n=l.DEPTH24_STENCIL8,L(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=l.DEPTH_COMPONENT24:t===1015?n=l.DEPTH_COMPONENT32F:t===1012&&(n=l.DEPTH_COMPONENT16),n}function A(e,t){return D(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function ne(e){let t=e.target;t.removeEventListener(`dispose`,ne),re(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function j(e){let t=e.target;t.removeEventListener(`dispose`,j),ie(t)}function re(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&M(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function M(e){let t=f.get(e);l.deleteTexture(t.__webglTexture);let n=e.source,r=S.get(n);delete r[t.__cacheKey],h.memory.textures--}function ie(e){let t=f.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),f.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)l.deleteFramebuffer(t.__webglFramebuffer[e][n]);else l.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)l.deleteFramebuffer(t.__webglFramebuffer[e]);else l.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&l.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&l.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&l.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&l.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=f.get(n[e]);t.__webglTexture&&(l.deleteTexture(t.__webglTexture),h.memory.textures--),f.remove(n[e])}f.remove(e)}let ae=0;function oe(){ae=0}function se(){return ae}function ce(e){ae=e}function le(){let e=ae;return e>=p.maxTextures&&L(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+p.maxTextures),ae+=1,e}function ue(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function N(e,t){let n=f.get(e);if(e.isVideoTexture&&P(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)L(`WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)L(`WebGLRenderer: Texture marked for update but image is incomplete`);else{xe(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);d.bindTexture(l.TEXTURE_2D,n.__webglTexture,l.TEXTURE0+t)}function de(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){xe(n,e,t);return}e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null),d.bindTexture(l.TEXTURE_2D_ARRAY,n.__webglTexture,l.TEXTURE0+t)}function fe(e,t){let n=f.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){xe(n,e,t);return}d.bindTexture(l.TEXTURE_3D,n.__webglTexture,l.TEXTURE0+t)}function pe(e,t){let n=f.get(e);if(e.isCubeDepthTexture!==!0&&e.version>0&&n.__version!==e.version){Se(n,e,t);return}d.bindTexture(l.TEXTURE_CUBE_MAP,n.__webglTexture,l.TEXTURE0+t)}let me={[e]:l.REPEAT,[t]:l.CLAMP_TO_EDGE,[n]:l.MIRRORED_REPEAT},he={[r]:l.NEAREST,[i]:l.NEAREST_MIPMAP_NEAREST,[a]:l.NEAREST_MIPMAP_LINEAR,[o]:l.LINEAR,[s]:l.LINEAR_MIPMAP_NEAREST,[c]:l.LINEAR_MIPMAP_LINEAR},ge={512:l.NEVER,519:l.ALWAYS,513:l.LESS,515:l.LEQUAL,514:l.EQUAL,518:l.GEQUAL,516:l.GREATER,517:l.NOTEQUAL};function _e(e,t){if(t.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&L(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),l.texParameteri(e,l.TEXTURE_WRAP_S,me[t.wrapS]),l.texParameteri(e,l.TEXTURE_WRAP_T,me[t.wrapT]),(e===l.TEXTURE_3D||e===l.TEXTURE_2D_ARRAY)&&l.texParameteri(e,l.TEXTURE_WRAP_R,me[t.wrapR]),l.texParameteri(e,l.TEXTURE_MAG_FILTER,he[t.magFilter]),l.texParameteri(e,l.TEXTURE_MIN_FILTER,he[t.minFilter]),t.compareFunction&&(l.texParameteri(e,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(e,l.TEXTURE_COMPARE_FUNC,ge[t.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||f.get(t).__currentAnisotropy){let n=u.get(`EXT_texture_filter_anisotropic`);l.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,p.getMaxAnisotropy())),f.get(t).__currentAnisotropy=t.anisotropy}}}function ve(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,ne));let r=t.source,i=S.get(r);i===void 0&&(i={},S.set(r,i));let a=ue(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:l.createTexture(),usedTimes:0},h.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&M(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function ye(e,t,n){return Math.floor(Math.floor(e/n)/t)}function be(e,t,n,r){let i=e.updateRanges;if(i.length===0)d.texSubImage2D(l.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,s=ye(r.start,t.width,4),c=ye(n.start,t.width,4);r.start<=o+1&&s===c&&ye(r.start+r.count-1,t.width,4)===s?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=d.getParameter(l.UNPACK_ROW_LENGTH),s=d.getParameter(l.UNPACK_SKIP_PIXELS),c=d.getParameter(l.UNPACK_SKIP_ROWS);d.pixelStorei(l.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),s=Math.ceil(a.count/4),c=o%t.width,u=Math.floor(o/t.width),f=s;d.pixelStorei(l.UNPACK_SKIP_PIXELS,c),d.pixelStorei(l.UNPACK_SKIP_ROWS,u),d.texSubImage2D(l.TEXTURE_2D,0,c,u,f,1,n,r,t.data)}e.clearUpdateRanges(),d.pixelStorei(l.UNPACK_ROW_LENGTH,o),d.pixelStorei(l.UNPACK_SKIP_PIXELS,s),d.pixelStorei(l.UNPACK_SKIP_ROWS,c)}}function xe(e,t,n){let r=l.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=l.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=l.TEXTURE_3D);let i=ve(e,t),a=t.source;d.bindTexture(r,e.__webglTexture,l.TEXTURE0+n);let o=f.get(a);if(a.version!==o.__version||i===!0){if(d.activeTexture(l.TEXTURE0+n),!(typeof ImageBitmap<`u`&&t.image instanceof ImageBitmap)){let e=Lt.getPrimaries(Lt.workingColorSpace),n=t.colorSpace===``?null:Lt.getPrimaries(t.colorSpace),r=t.colorSpace===``||e===n?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,r)}d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment);let e=T(t.image,!1,p.maxTextureSize);e=Fe(t,e);let s=m.convert(t.format,t.colorSpace),c=m.convert(t.type),u=k(t.internalFormat,s,c,t.normalized,t.colorSpace,t.isVideoTexture);_e(r,t);let f,h=t.mipmaps,g=t.isVideoTexture!==!0,_=o.__version===void 0||i===!0,v=a.dataReady,y=A(t,e);if(t.isDepthTexture)u=te(t.format===E,t.type),_&&(g?d.texStorage2D(l.TEXTURE_2D,1,u,e.width,e.height):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,null));else if(t.isDataTexture){if(h.length>0){g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data);t.generateMipmaps=!1}else g?(_&&d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height),v&&be(t,e,s,c)):d.texImage2D(l.TEXTURE_2D,0,u,e.width,e.height,0,s,c,e.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){g&&_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,e.depth);for(let n=0,r=h.length;n<r;n++)if(f=h[n],t.format!==1023){if(s!==null){if(g){if(v){if(t.layerUpdates.size>0){let e=po(f.width,f.height,t.format,t.type);for(let r of t.layerUpdates){let t=f.data.subarray(r*e/f.data.BYTES_PER_ELEMENT,(r+1)*e/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,r,f.width,f.height,1,s,t)}}else d.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,f.data)}}else d.compressedTexImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,f.data,0,0)}else L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else g?v&&d.texSubImage3D(l.TEXTURE_2D_ARRAY,n,0,0,0,f.width,f.height,e.depth,s,c,f.data):d.texImage3D(l.TEXTURE_2D_ARRAY,n,u,f.width,f.height,e.depth,0,s,c,f.data);t.layerUpdates.size>0&&t.clearLayerUpdates()}else{g&&_&&d.texStorage2D(l.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let e=0,n=h.length;e<n;e++)f=h[e],t.format===1023?g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,c,f.data):d.texImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,s,c,f.data):s===null?L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(l.TEXTURE_2D,e,0,0,f.width,f.height,s,f.data):d.compressedTexImage2D(l.TEXTURE_2D,e,u,f.width,f.height,0,f.data)}}else if(t.isDataArrayTexture){if(g){if(_&&d.texStorage3D(l.TEXTURE_2D_ARRAY,y,u,e.width,e.height,e.depth),v){if(t.layerUpdates.size>0){let n=po(e.width,e.height,t.format,t.type);for(let r of t.layerUpdates){let t=e.data.subarray(r*n/e.data.BYTES_PER_ELEMENT,(r+1)*n/e.data.BYTES_PER_ELEMENT);d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,r,e.width,e.height,1,s,c,t)}t.clearLayerUpdates()}else d.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)}}else d.texImage3D(l.TEXTURE_2D_ARRAY,0,u,e.width,e.height,e.depth,0,s,c,e.data)}else if(t.isData3DTexture)g?(_&&d.texStorage3D(l.TEXTURE_3D,y,u,e.width,e.height,e.depth),v&&d.texSubImage3D(l.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,s,c,e.data)):d.texImage3D(l.TEXTURE_3D,0,u,e.width,e.height,e.depth,0,s,c,e.data);else if(t.isFramebufferTexture){if(_){if(g)d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height);else{let t=e.width,n=e.height;for(let e=0;e<y;e++)d.texImage2D(l.TEXTURE_2D,e,u,t,n,0,s,c,null),t>>=1,n>>=1}}}else if(t.isHTMLTexture){if(`texElementImage2D`in l){let n=l.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),e.parentNode!==n){n.appendChild(e),b.add(t),n.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(l.texElementImage2D.length===3)l.texElementImage2D(l.TEXTURE_2D,l.RGBA8,e);else{let t=l.RGBA,n=l.RGBA,r=l.UNSIGNED_BYTE;l.texElementImage2D(l.TEXTURE_2D,0,t,n,r,e)}l.texParameteri(l.TEXTURE_2D,l.TEXTURE_MIN_FILTER,l.LINEAR),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(l.TEXTURE_2D,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let e=Ie(h[0]);d.texStorage2D(l.TEXTURE_2D,y,u,e.width,e.height)}for(let e=0,t=h.length;e<t;e++)f=h[e],g?v&&d.texSubImage2D(l.TEXTURE_2D,e,0,0,s,c,f):d.texImage2D(l.TEXTURE_2D,e,u,s,c,f);t.generateMipmaps=!1}else if(g){if(_){let t=Ie(e);d.texStorage2D(l.TEXTURE_2D,y,u,t.width,t.height)}v&&d.texSubImage2D(l.TEXTURE_2D,0,0,0,s,c,e)}else d.texImage2D(l.TEXTURE_2D,0,u,s,c,e);D(t)&&ee(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function Se(e,t,n){if(t.image.length!==6)return;let r=ve(e,t),i=t.source;d.bindTexture(l.TEXTURE_CUBE_MAP,e.__webglTexture,l.TEXTURE0+n);let a=f.get(i);if(i.version!==a.__version||r===!0){d.activeTexture(l.TEXTURE0+n);let e=Lt.getPrimaries(Lt.workingColorSpace),o=t.colorSpace===``?null:Lt.getPrimaries(t.colorSpace),s=t.colorSpace===``||e===o?l.NONE:l.BROWSER_DEFAULT_WEBGL;d.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,t.flipY),d.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),d.pixelStorei(l.UNPACK_ALIGNMENT,t.unpackAlignment),d.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let c=t.isCompressedTexture||t.image[0].isCompressedTexture,u=t.image[0]&&t.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!c&&!u?f[e]=T(t.image[e],!0,p.maxCubemapSize):f[e]=u?t.image[e].image:t.image[e],f[e]=Fe(t,f[e]);let h=f[0],g=m.convert(t.format,t.colorSpace),_=m.convert(t.type),v=k(t.internalFormat,g,_,t.normalized,t.colorSpace),y=t.isVideoTexture!==!0,b=a.__version===void 0||r===!0,x=i.dataReady,S=A(t,h);_e(l.TEXTURE_CUBE_MAP,t);let C;if(c){y&&b&&d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let e=0;e<6;e++){C=f[e].mipmaps;for(let n=0;n<C.length;n++){let r=C[n];t.format===1023?y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,_,r.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,g,_,r.data):g===null?L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,g,r.data):d.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,v,r.width,r.height,0,r.data)}}}else{if(C=t.mipmaps,y&&b){C.length>0&&S++;let e=Ie(f[0]);d.texStorage2D(l.TEXTURE_CUBE_MAP,S,v,e.width,e.height)}for(let e=0;e<6;e++)if(u){y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,f[e].width,f[e].height,g,_,f[e].data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,f[e].width,f[e].height,0,g,_,f[e].data);for(let t=0;t<C.length;t++){let n=C[t].image[e].image;y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,g,_,n.data):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,n.width,n.height,0,g,_,n.data)}}else{y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,g,_,f[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,v,g,_,f[e]);for(let t=0;t<C.length;t++){let n=C[t];y?x&&d.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,g,_,n.image[e]):d.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,v,g,_,n.image[e])}}}D(t)&&ee(l.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function Ce(e,t,n,r,i,a){let o=m.convert(n.format,n.colorSpace),s=m.convert(n.type),c=k(n.internalFormat,o,s,n.normalized,n.colorSpace),u=f.get(t),p=f.get(n);if(p.__renderTarget=t,!u.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===l.TEXTURE_3D||i===l.TEXTURE_2D_ARRAY?d.texImage3D(i,a,c,e,n,t.depth,0,o,s,null):d.texImage2D(i,a,c,e,n,0,o,s,null)}d.bindFramebuffer(l.FRAMEBUFFER,e),Pe(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,r,i,p.__webglTexture,0,Ne(t)):(i===l.TEXTURE_2D||i>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,r,i,p.__webglTexture,a),d.bindFramebuffer(l.FRAMEBUFFER,null)}function we(e,t,n){if(l.bindRenderbuffer(l.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=te(t.stencilBuffer,i),o=t.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;Pe(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Ne(t),a,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Ne(t),a,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,a,t.width,t.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,o,l.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=m.convert(i.format,i.colorSpace),o=m.convert(i.type),s=k(i.internalFormat,a,o,i.normalized,i.colorSpace);Pe(t)?g.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Ne(t),s,t.width,t.height):n?l.renderbufferStorageMultisample(l.RENDERBUFFER,Ne(t),s,t.width,t.height):l.renderbufferStorage(l.RENDERBUFFER,s,t.width,t.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function Te(e,t,n){let r=t.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(l.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let i=f.get(t.depthTexture);if(i.__renderTarget=t,(!i.__webglTexture||t.depthTexture.image.width!==t.width||t.depthTexture.image.height!==t.height)&&(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),r){if(i.__webglInit===void 0&&(i.__webglInit=!0,t.depthTexture.addEventListener(`dispose`,ne)),i.__webglTexture===void 0){i.__webglTexture=l.createTexture(),d.bindTexture(l.TEXTURE_CUBE_MAP,i.__webglTexture),_e(l.TEXTURE_CUBE_MAP,t.depthTexture);let e=m.convert(t.depthTexture.format),n=m.convert(t.depthTexture.type),r;t.depthTexture.format===1026?r=l.DEPTH_COMPONENT24:t.depthTexture.format===1027&&(r=l.DEPTH24_STENCIL8);for(let i=0;i<6;i++)l.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,r,t.width,t.height,0,e,n,null)}}else N(t.depthTexture,0);let a=i.__webglTexture,o=Ne(t),s=r?l.TEXTURE_CUBE_MAP_POSITIVE_X+n:l.TEXTURE_2D,c=t.depthTexture.format===1027?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;if(t.depthTexture.format===1026)Pe(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else if(t.depthTexture.format===1027)Pe(t)?g.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,c,s,a,0,o):l.framebufferTexture2D(l.FRAMEBUFFER,c,s,a,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ee(e){let t=f.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)for(let n=0;n<6;n++)Te(t.__webglFramebuffer[n],e,n);else{let n=e.texture.mipmaps;n&&n.length>0?Te(t.__webglFramebuffer[0],e,0):Te(t.__webglFramebuffer,e,0)}}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=l.createRenderbuffer(),we(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];l.bindRenderbuffer(l.RENDERBUFFER,i),l.framebufferRenderbuffer(l.FRAMEBUFFER,r,l.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer[0]):d.bindFramebuffer(l.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=l.createRenderbuffer(),we(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;l.bindRenderbuffer(l.RENDERBUFFER,r),l.framebufferRenderbuffer(l.FRAMEBUFFER,n,l.RENDERBUFFER,r)}}d.bindFramebuffer(l.FRAMEBUFFER,null)}function De(e,t,n){let r=f.get(e);t!==void 0&&Ce(r.__webglFramebuffer,e,e.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),n!==void 0&&Ee(e)}function Oe(e){let t=e.texture,n=f.get(e),r=f.get(t);e.addEventListener(`dispose`,j);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=l.createTexture()),r.__version=t.version,h.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=l.createFramebuffer()}else n.__webglFramebuffer[e]=l.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=l.createFramebuffer()}else n.__webglFramebuffer=l.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=f.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=l.createTexture(),h.memory.textures++)}if(e.samples>0&&Pe(e)===!1){n.__webglMultisampledFramebuffer=l.createFramebuffer(),n.__webglColorRenderbuffer=[],d.bindFramebuffer(l.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=m.convert(r.format,r.colorSpace),o=m.convert(r.type),s=k(r.internalFormat,a,o,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),c=Ne(e);l.renderbufferStorageMultisample(l.RENDERBUFFER,c,s,e.width,e.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+t,l.RENDERBUFFER,n.__webglColorRenderbuffer[t])}l.bindRenderbuffer(l.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=l.createRenderbuffer(),we(n.__webglDepthRenderbuffer,e,!0)),d.bindFramebuffer(l.FRAMEBUFFER,null)}}if(a){d.bindTexture(l.TEXTURE_CUBE_MAP,r.__webglTexture),_e(l.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)Ce(n.__webglFramebuffer[r][i],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else Ce(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);D(t)&&ee(l.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=f.get(r),o=l.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(o,a.__webglTexture),_e(o,r),Ce(n.__webglFramebuffer,e,r,l.COLOR_ATTACHMENT0+t,o,0),D(r)&&ee(o)}d.unbindTexture()}else{let i=l.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY),d.bindTexture(i,r.__webglTexture),_e(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)Ce(n.__webglFramebuffer[r],e,t,l.COLOR_ATTACHMENT0,i,r);else Ce(n.__webglFramebuffer,e,t,l.COLOR_ATTACHMENT0,i,0);D(t)&&ee(i),d.unbindTexture()}e.depthBuffer&&Ee(e)}function ke(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(D(r)){let t=O(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),ee(t),d.unbindTexture()}}}let Ae=[],je=[];function Me(e){if(e.samples>0){if(Pe(e)===!1){let t=e.textures,n=e.width,r=e.height,i=l.COLOR_BUFFER_BIT,a=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,o=f.get(e),s=t.length>1;if(s)for(let e=0;e<t.length;e++)d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,null),d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,null,0);d.bindFramebuffer(l.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer);let c=e.texture.mipmaps;c&&c.length>0?d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let c=0;c<t.length;c++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=l.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=l.STENCIL_BUFFER_BIT)),s){l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,o.__webglColorRenderbuffer[c]);let e=f.get(t[c]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,e,0)}l.blitFramebuffer(0,0,n,r,0,0,n,r,i,l.NEAREST),_===!0&&(Ae.length=0,je.length=0,Ae.push(l.COLOR_ATTACHMENT0+c),e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&(Ae.push(a),je.push(a),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,je)),l.invalidateFramebuffer(l.READ_FRAMEBUFFER,Ae))}if(d.bindFramebuffer(l.READ_FRAMEBUFFER,null),d.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),s)for(let e=0;e<t.length;e++){d.bindFramebuffer(l.FRAMEBUFFER,o.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=f.get(t[e]).__webglTexture;d.bindFramebuffer(l.FRAMEBUFFER,o.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+e,l.TEXTURE_2D,n,0)}d.bindFramebuffer(l.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&_){let t=e.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT;l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[t])}}}function Ne(e){return Math.min(p.maxSamples,e.samples)}function Pe(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function P(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function Fe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Lt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&L(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):R(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ie(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=le,this.resetTextureUnits=oe,this.getTextureUnits=se,this.setTextureUnits=ce,this.setTexture2D=N,this.setTexture2DArray=de,this.setTexture3D=fe,this.setTextureCube=pe,this.rebindTextures=De,this.setupRenderTarget=Oe,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=Ce,this.useMultisampledRTT=Pe,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function bl(e,t){function n(n,r=``){let i,a=Lt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var xl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sl=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Cl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Li(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new na({vertexShader:xl,fragmentShader:Sl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new G(new Wi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wl=class extends rt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,u=null,d=null,f=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new Cl,v={},b=t.getContextAttributes(),x=null,S=null,C=[],D=[],ee=new B,O=null,k=null,te=new za;te.viewport=new Jt;let A=new za;A.viewport=new Jt;let ne=[te,A],j=new Za,re=null,M=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new kn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new kn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new kn,C[e]=t),t.getHandSpace()};function ie(e){let t=D.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ae(){r.removeEventListener(`select`,ie),r.removeEventListener(`selectstart`,ie),r.removeEventListener(`selectend`,ie),r.removeEventListener(`squeeze`,ie),r.removeEventListener(`squeezestart`,ie),r.removeEventListener(`squeezeend`,ie),r.removeEventListener(`end`,ae),r.removeEventListener(`inputsourceschange`,oe);for(let e=0;e<C.length;e++){let t=D[e];t!==null&&(D[e]=null,C[e].disconnect(t))}re=null,M=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,pe.stop(),n.isPresenting=!1,e.setPixelRatio(O),e.setSize(ee.width,ee.height,!1),k!==null){let e=k.camera;e.fov=k.fov,e.zoom=k.zoom,e.updateProjectionMatrix(),k=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&L(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&L(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,ie),r.addEventListener(`selectstart`,ie),r.addEventListener(`selectend`,ie),r.addEventListener(`squeeze`,ie),r.addEventListener(`squeezestart`,ie),r.addEventListener(`squeezeend`,ie),r.addEventListener(`end`,ae),r.addEventListener(`inputsourceschange`,oe),b.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(ee),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?E:T,a=b.stencil?y:m);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new Xt(f.textureWidth,f.textureHeight,{format:w,type:l,depthTexture:new Fi(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Xt(p.framebufferWidth,p.framebufferHeight,{format:w,type:l,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),pe.setContext(r),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function oe(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=D.indexOf(n);r>=0&&(D[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=D.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=D.length){D.push(n),r=e;break}else if(D[e]===null){D[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let se=new V,ce=new V;function le(e,t,n){se.setFromMatrixPosition(t.matrixWorld),ce.setFromMatrixPosition(n.matrixWorld);let r=se.distanceTo(ce),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ue(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),j.near=A.near=te.near=t,j.far=A.far=te.far=n,(re!==j.near||M!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),re=j.near,M=j.far),j.layers.mask=e.layers.mask|6,te.layers.mask=j.layers.mask&-5,A.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;ue(j,i);for(let e=0;e<a.length;e++)ue(a[e],i);a.length===2?le(j,te,A):j.projectionMatrix.copy(te.projectionMatrix),k===null&&e.isPerspectiveCamera&&(k={camera:e,fov:e.fov,zoom:e.zoom}),N(e,j,i)};function N(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=st*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(f!==null||p!==null)return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(j)},this.getCameraTexture=function(e){return v[e]};let de=null;function fe(t,i){if(u=i.getViewerPose(c||a),h=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=ne[n];o===void 0&&(o=new za,o.layers.enable(n),o.viewport=new Jt,ne[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new Li,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=D[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}de&&de(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let pe=new ho;pe.setAnimationLoop(fe),this.setAnimationLoop=function(e){de=e},this.dispose=function(){}}},Tl=new $t,El=new H;El.set(-1,0,0,0,1,0,0,0,1);function Dl(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Qi(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Tl.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(El),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Ol(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return R(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?L(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):L(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var kl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Al=null;function jl(){return Al===null&&(Al=new xi(kl,16,16,O,g),Al.name=`DFG_LUT`,Al.minFilter=o,Al.magFilter=o,Al.wrapS=t,Al.wrapT=t,Al.generateMipmaps=!1,Al.needsUpdate=!0),Al}var Ml=class{constructor(e={}){let{canvas:t=Xe(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:h=!1,outputBufferType:b=l}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=b,C=new Set([te,k,ee]),w=new Set([l,m,f,y,_,v]),T=new Uint32Array(4),E=new Int32Array(4),D=new V,O=null,A=null,ne=[],j=[],re=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let M=this,ie=!1,ae=null,oe=null,se=null,ce=null;this._outputColorSpace=Be;let le=0,ue=0,N=null,de=-1,fe=null,pe=new Jt,me=new Jt,he=null,ge=new W(0),_e=0,ve=t.width,ye=t.height,be=1,xe=null,Se=null,Ce=new Jt(0,0,ve,ye),we=new Jt(0,0,ve,ye),Te=!1,Ee=new Ti,De=!1,Oe=!1,ke=new $t,Ae=new V,je=new Jt,Me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ne=!1;function Pe(){return N===null?be:1}let P=n;function Fe(e,n){return t.getContext(e,n)}let Ie,Le,F,Re,I,ze,Ve,He,Ue,We,Ge,qe,Je,Ye,Ze,$e,et,nt,rt,it,at,ot,st;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,lt,!1),t.addEventListener(`webglcontextrestored`,ut,!1),t.addEventListener(`webglcontextcreationerror`,dt,!1),P===null){let t=`webgl2`;if(P=Fe(t,e),P===null)throw Fe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}ct()}catch(e){throw t.removeEventListener(`webglcontextlost`,lt,!1),t.removeEventListener(`webglcontextrestored`,ut,!1),t.removeEventListener(`webglcontextcreationerror`,dt,!1),R(`WebGLRenderer: `+e.message),e}function ct(){Ie=new Xo(P),Ie.init(),at=new bl(P,Ie),Le=new To(P,Ie,e,at),F=new vl(P,Ie),Le.reversedDepthBuffer&&h&&F.buffers.depth.setReversed(!0),oe=P.createFramebuffer(),se=P.createFramebuffer(),ce=P.createFramebuffer(),Re=new $o(P),I=new Qc,ze=new yl(P,Ie,F,I,Le,at,Re),Ve=new Yo(M),He=new go(P),ot=new Co(P,He),Ue=new Zo(P,He,Re,ot),We=new ts(P,Ue,He,ot,Re),nt=new es(P,Le,ze),Ze=new Eo(I),Ge=new Zc(M,Ve,Ie,Le,ot,Ze),qe=new Dl(M,I),Je=new nl,Ye=new ll(Ie),et=new So(M,Ve,F,We,x,s),$e=new _l(M,We,Le),st=new Ol(P,Re,Le,F),rt=new wo(P,Ie,Re),it=new Qo(P,Ie,Re),Re.programs=Ge.programs,M.capabilities=Le,M.extensions=Ie,M.properties=I,M.renderLists=Je,M.shadowMap=$e,M.state=F,M.info=Re}S!==1009&&(re=new rs(S,t.width,t.height,o,r,i));let z=new wl(M,P);this.xr=z,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Ie.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return be},this.setPixelRatio=function(e){e!==void 0&&(be=e,this.setSize(ve,ye,!1))},this.getSize=function(e){return e.set(ve,ye)},this.setSize=function(e,n,r=!0){if(z.isPresenting){L(`WebGLRenderer: Can't change size while VR device is presenting.`);return}ve=e,ye=n,t.width=Math.floor(e*be),t.height=Math.floor(n*be),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),re!==null&&re.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ve*be,ye*be).floor()},this.setDrawingBufferSize=function(e,n,r){ve=e,ye=n,be=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009){R(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){L(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}re.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(pe)},this.getViewport=function(e){return e.copy(Ce)},this.setViewport=function(e,t,n,r){e.isVector4?Ce.set(e.x,e.y,e.z,e.w):Ce.set(e,t,n,r),F.viewport(pe.copy(Ce).multiplyScalar(be).round())},this.getScissor=function(e){return e.copy(we)},this.setScissor=function(e,t,n,r){e.isVector4?we.set(e.x,e.y,e.z,e.w):we.set(e,t,n,r),F.scissor(me.copy(we).multiplyScalar(be).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(e){F.setScissorTest(Te=e)},this.setOpaqueSort=function(e){xe=e},this.setTransparentSort=function(e){Se=e},this.getClearColor=function(e){return e.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor(...arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=C.has(t)}if(e){let e=N.texture.type,t=w.has(e),n=et.getClearColor(),r=et.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,P.clearBufferuiv(P.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,P.clearBufferiv(P.COLOR,0,E))}else r|=P.COLOR_BUFFER_BIT}t&&(r|=P.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&P.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),ae=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,lt,!1),t.removeEventListener(`webglcontextrestored`,ut,!1),t.removeEventListener(`webglcontextcreationerror`,dt,!1),et.dispose(),Je.dispose(),Ye.dispose(),I.dispose(),Ve.dispose(),We.dispose(),ot.dispose(),st.dispose(),Ge.dispose(),z.dispose(),z.removeEventListener(`sessionstart`,vt),z.removeEventListener(`sessionend`,yt),bt.stop()};function lt(e){e.preventDefault(),Qe(`WebGLRenderer: Context Lost.`),ie=!0}function ut(){Qe(`WebGLRenderer: Context Restored.`),ie=!1;let e=Re.autoReset,t=$e.enabled,n=$e.autoUpdate,r=$e.needsUpdate,i=$e.type;ct(),Re.autoReset=e,$e.enabled=t,$e.autoUpdate=n,$e.needsUpdate=r,$e.type=i}function dt(e){R(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ft(e){let t=e.target;t.removeEventListener(`dispose`,ft),pt(t)}function pt(e){mt(e),I.remove(e)}function mt(e){let t=I.get(e).programs;t!==void 0&&(t.forEach(function(e){Ge.releaseProgram(e)}),e.isShaderMaterial&&Ge.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Me);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=B(e,t,n,r,i);F.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ue.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;ot.setup(i,r,s,n,c);let h,g=rt;if(c!==null&&(h=He.get(c),g=it,g.setIndex(h)),i.isMesh)r.wireframe===!0?(F.setLineWidth(r.wireframeLinewidth*Pe()),g.setMode(P.LINES)):g.setMode(P.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),F.setLineWidth(e*Pe()),i.isLineSegments?g.setMode(P.LINES):i.isLineLoop?g.setMode(P.LINE_LOOP):g.setMode(P.LINE_STRIP)}else i.isPoints?g.setMode(P.POINTS):i.isSprite&&g.setMode(P.TRIANGLES);if(i.isBatchedMesh){if(Ie.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?He.get(c).bytesPerElement:1,o=I.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(P,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ht(e,t,n,r){ae!==null&&e.isNodeMaterial&&ae.setObject(r,e),De===!0&&Ze.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,Et(e,t,r),e.side=0,e.needsUpdate=!0,Et(e,t,r),e.side=2):Et(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),ae!==null&&ae.renderStart(e,t,n),A=Ye.get(n),A.init(t),j.push(A),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(A.pushLight(e),e.castShadow&&A.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(A.pushLight(e),e.castShadow&&A.pushShadow(e))}),A.setupLights(),ae!==null&&ae.updateLights(A.state.lightsArray),Oe=this.localClippingEnabled,De=Ze.init(this.clippingPlanes,Oe),De===!0&&Ze.setGlobalState(this.clippingPlanes,t),ae!==null&&$e.render(A.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ht(o,n,t,e),r.add(o)}else ht(i,n,t,e),r.add(i)}}),A=j.pop(),ae!==null&&ae.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=I.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Ie.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let gt=null;function _t(e){gt&&gt(e)}function vt(){bt.stop()}function yt(){bt.start()}let bt=new ho;bt.setAnimationLoop(_t),typeof self<`u`&&bt.setContext(self),this.setAnimationLoop=function(e){gt=e,z.setAnimationLoop(e),e===null?bt.stop():bt.start()},z.addEventListener(`sessionstart`,vt),z.addEventListener(`sessionend`,yt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){R(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ie===!0)return;ae!==null&&ae.renderStart(e,t);let n=z.enabled===!0&&z.isPresenting===!0,r=re!==null&&(N===null||n)&&re.begin(M,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),z.enabled===!0&&z.isPresenting===!0&&(re===null||re.isCompositing()===!1)&&(z.cameraAutoUpdate===!0&&z.updateCamera(t),t=z.getCamera()),e.isScene===!0&&e.onBeforeRender(M,e,t,N),A=Ye.get(e,j.length),A.init(t),A.state.textureUnits=ze.getTextureUnits(),j.push(A),ke.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Ee.setFromProjectionMatrix(ke,Ke,t.reversedDepth),Oe=this.localClippingEnabled,De=Ze.init(this.clippingPlanes,Oe),O=Je.get(e,ne.length),O.init(),ne.push(O),z.enabled===!0&&z.isPresenting===!0){let e=M.xr.getDepthSensingMesh();e!==null&&xt(e,t,-1/0,M.sortObjects)}xt(e,t,0,M.sortObjects),O.finish(),ae!==null&&ae.updateLights(A.state.lightsArray),M.sortObjects===!0&&O.sort(xe,Se),Ne=z.enabled===!1||z.isPresenting===!1||z.hasDepthSensing()===!1,Ne&&et.addToRenderList(O,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),De===!0&&Ze.beginShadows();let i=A.state.shadowsArray;if($e.render(i,e,t),De===!0&&Ze.endShadows(),(r&&re.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(A.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Ct(n,r,e,a)}Ne&&et.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];St(O,e,n,n.viewport)}}else r.length>0&&Ct(n,r,e,t),Ne&&et.render(e),St(O,e,t)}N!==null&&ue===0&&(ze.updateMultisampleRenderTarget(N),ze.updateRenderTargetMipmap(N)),r&&re.end(M),e.isScene===!0&&e.onAfterRender(M,e,t),ot.resetDefaultState(),de=-1,fe=null,j.pop(),j.length>0?(A=j[j.length-1],ze.setTextureUnits(A.state.textureUnits),De===!0&&Ze.setGlobalState(M.clippingPlanes,A.state.camera)):A=null,ne.pop(),O=ne.length>0?ne[ne.length-1]:null,ae!==null&&ae.renderEnd()};function xt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)A.pushLightProbeGrid(e);else if(e.isLight)A.pushLight(e),e.castShadow&&A.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Ee)){r&&je.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ke);let i=We.update(e),a=e.material;a.visible&&O.push(e,i,a,n,je.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Ee))){let i=We.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),je.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),je.copy(e.boundingSphere.center)),je.applyMatrix4(e.matrixWorld).applyMatrix4(ke)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&O.push(e,i,c,n,je.z,s,t)}}else a.visible&&O.push(e,i,a,n,je.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)xt(i[e],t,n,r)}function St(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;A.setupLightsView(n),De===!0&&Ze.setGlobalState(M.clippingPlanes,n),r&&F.viewport(pe.copy(r)),i.length>0&&wt(i,t,n),a.length>0&&wt(a,t,n),o.length>0&&wt(o,t,n),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function Ct(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[r.id]===void 0){let e=Ie.has(`EXT_color_buffer_half_float`)||Ie.has(`EXT_color_buffer_float`);A.state.transmissionRenderTarget[r.id]=new Xt(1,1,{generateMipmaps:!0,type:e?g:l,minFilter:c,samples:Math.max(4,Le.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Lt.workingColorSpace})}let a=A.state.transmissionRenderTarget[r.id],o=r.viewport||pe;a.setSize(o.z*M.transmissionResolutionScale,o.w*M.transmissionResolutionScale);let s=M.getRenderTarget(),u=M.getActiveCubeFace(),d=M.getActiveMipmapLevel();M.setRenderTarget(a),M.getClearColor(ge),_e=M.getClearAlpha(),_e<1&&M.setClearColor(16777215,.5),M.clear(),Ne&&et.render(n);let f=M.toneMapping;M.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),A.setupLightsView(r),De===!0&&Ze.setGlobalState(M.clippingPlanes,r),wt(e,n,r),ze.updateMultisampleRenderTarget(a),ze.updateRenderTargetMipmap(a),Ie.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Tt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(ze.updateMultisampleRenderTarget(a),ze.updateRenderTargetMipmap(a))}M.setRenderTarget(s,u,d),M.setClearColor(ge,_e),p!==void 0&&(r.viewport=p),M.toneMapping=f}function wt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Tt(o,t,n,s,l,c)}}function Tt(e,t,n,r,i,a){ae!==null&&i.isNodeMaterial&&ae.setObject(e,i),e.onBeforeRender(M,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(M,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,M.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,M.renderBufferDirect(n,t,r,i,e,a),i.side=2):M.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(M,t,n,r,i,a)}function Et(e,t,n){t.isScene!==!0&&(t=Me);let r=I.get(e),i=A.state.lights,a=A.state.shadowsArray,o=i.state.version,s=Ge.getParameters(e,i.state,a,t,n,A.state.lightProbeGridArray),c=Ge.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ve.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ft),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ot(e,s),d}else s.uniforms=Ge.getUniforms(e),ae!==null&&e.isNodeMaterial&&ae.build(e,n,s),e.onBeforeCompile(s,M),d=Ge.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ze.uniform),Ot(e,s),r.needsLights=jt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=A.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Dt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=uc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ot(e,t){let n=I.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function kt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function B(e,t,n,r,i){t.isScene!==!0&&(t=Me),ze.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?M.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Lt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ve.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=M.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=I.get(r),y=A.state.lights;if(De===!0&&(Oe===!0||e!==fe)){let t=e===fe&&r.id===de;Ze.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ze.numPlanes||v.numIntersection!==Ze.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=A.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=Et(r,t,i),ae&&r.isNodeMaterial&&ae.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(F.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==de&&(de=r.id,C=!0),v.needsLights){let e=kt(A.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||fe!==e){F.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(P,`projectionMatrix`,e.projectionMatrix),T.setValue(P,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(P,Ae.setFromMatrixPosition(e.matrixWorld)),Le.logarithmicDepthBuffer&&T.setValue(P,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(P,`isOrthographic`,e.isOrthographicCamera===!0),fe!==e&&(fe=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(P,`sunShadowMap`,y.state.sunShadowMap,ze),y.state.directionalShadowMap.length>0&&T.setValue(P,`directionalShadowMap`,y.state.directionalShadowMap,ze),y.state.spotShadowMap.length>0&&T.setValue(P,`spotShadowMap`,y.state.spotShadowMap,ze),y.state.pointShadowMap.length>0&&T.setValue(P,`pointShadowMap`,y.state.pointShadowMap,ze)),i.isSkinnedMesh){T.setOptional(P,i,`bindMatrix`),T.setOptional(P,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(P,`boneTexture`,e.boneTexture,ze))}i.isBatchedMesh&&(T.setOptional(P,i,`batchingTexture`),T.setValue(P,`batchingTexture`,i._matricesTexture,ze),T.setOptional(P,i,`batchingIdTexture`),T.setValue(P,`batchingIdTexture`,i._indirectTexture,ze),T.setOptional(P,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(P,`batchingColorTexture`,i._colorsTexture,ze));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&nt.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(P,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=jl()),C){if(T.setValue(P,`toneMappingExposure`,M.toneMappingExposure),v.needsLights&&At(E,w),a&&r.fog===!0&&qe.refreshFogUniforms(E,a),qe.refreshMaterialUniforms(E,r,be,ye,A.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}uc.upload(P,Dt(v),E,ze)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(uc.upload(P,Dt(v),E,ze),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(P,`center`,i.center),T.setValue(P,`modelViewMatrix`,i.modelViewMatrix),T.setValue(P,`normalMatrix`,i.normalMatrix),T.setValue(P,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];st.update(n,x),st.bind(n,x)}}return x}function At(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function jt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return le},this.getActiveMipmapLevel=function(){return ue},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=I.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),I.get(e.texture).__webglTexture=t,I.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=I.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,le=t,ue=n;let r=null,i=!1,a=!1;if(e){let o=I.get(e);if(o.__useDefaultFramebuffer!==void 0){F.bindFramebuffer(P.FRAMEBUFFER,o.__webglFramebuffer),pe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest,F.viewport(pe),F.scissor(me),F.setScissorTest(he),de=-1;return}if(o.__webglFramebuffer===void 0)ze.setupRenderTarget(e);else if(o.__hasExternalTextures)ze.rebindTextures(e,I.get(e.texture).__webglTexture,I.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&I.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);ze.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=I.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&ze.useMultisampledRTT(e)===!1?I.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,pe.copy(e.viewport),me.copy(e.scissor),he=e.scissorTest}else pe.copy(Ce).multiplyScalar(be).floor(),me.copy(we).multiplyScalar(be).floor(),he=Te;if(n!==0&&(r=oe),F.bindFramebuffer(P.FRAMEBUFFER,r)&&F.drawBuffers(e,r),F.viewport(pe),F.scissor(me),F.setScissorTest(he),i){let r=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=I.get(e.textures[t]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=I.get(e.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,t.__webglTexture,n)}de=-1};function Mt(e){let t=I.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Le.textureFormatReadable(e.format),t.__typeReadable=Le.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){F.bindFramebuffer(P.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let u=Mt(o);if(u.__formatReadable===!1){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){R(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&P.readPixels(t,n,r,i,at.convert(c),at.convert(l),a)}finally{let e=N===null?null:I.get(N).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=I.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){F.bindFramebuffer(P.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+s);let d=Mt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.bufferData(P.PIXEL_PACK_BUFFER,a.byteLength,P.STREAM_READ),P.readPixels(t,n,r,i,at.convert(l),at.convert(u),0),P.bindBuffer(P.PIXEL_PACK_BUFFER,null);let p=N===null?null:I.get(N).__webglFramebuffer;F.bindFramebuffer(P.FRAMEBUFFER,p);let m=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await tt(P,m,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,f),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,a),P.bindBuffer(P.PIXEL_PACK_BUFFER,null),P.deleteBuffer(f),P.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;ze.setTexture2D(e,0),P.copyTexSubImage2D(P.TEXTURE_2D,n,0,0,o,s,i,a),F.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=at.convert(t.format),_=at.convert(t.type),v;t.isData3DTexture?(ze.setTexture3D(t,0),v=P.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(ze.setTexture2DArray(t,0),v=P.TEXTURE_2D_ARRAY):(ze.setTexture2D(t,0),v=P.TEXTURE_2D),F.activeTexture(P.TEXTURE0),F.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,t.flipY),F.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),F.pixelStorei(P.UNPACK_ALIGNMENT,t.unpackAlignment);let y=F.getParameter(P.UNPACK_ROW_LENGTH),b=F.getParameter(P.UNPACK_IMAGE_HEIGHT),x=F.getParameter(P.UNPACK_SKIP_PIXELS),S=F.getParameter(P.UNPACK_SKIP_ROWS),C=F.getParameter(P.UNPACK_SKIP_IMAGES);F.pixelStorei(P.UNPACK_ROW_LENGTH,h.width),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,h.height),F.pixelStorei(P.UNPACK_SKIP_PIXELS,l),F.pixelStorei(P.UNPACK_SKIP_ROWS,u),F.pixelStorei(P.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=I.get(e),r=I.get(t),h=I.get(n.__renderTarget),g=I.get(r.__renderTarget);F.bindFramebuffer(P.READ_FRAMEBUFFER,h.__webglFramebuffer),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(e).__webglTexture,i,d+n),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,I.get(t).__webglTexture,a,m+n)),P.blitFramebuffer(l,u,o,s,f,p,o,s,P.DEPTH_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||I.has(e)){let n=I.get(e),r=I.get(t);F.bindFramebuffer(P.READ_FRAMEBUFFER,se),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,ce);for(let e=0;e<c;e++)w?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,n.__webglTexture,i),T?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,r.__webglTexture,a),i===0?T?P.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):P.copyTexSubImage2D(v,a,f,p,l,u,o,s):P.blitFramebuffer(l,u,o,s,f,p,o,s,P.COLOR_BUFFER_BIT,P.NEAREST);F.bindFramebuffer(P.READ_FRAMEBUFFER,null),F.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?P.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):P.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):P.texSubImage2D(P.TEXTURE_2D,a,f,p,o,s,g,_,h);F.pixelStorei(P.UNPACK_ROW_LENGTH,y),F.pixelStorei(P.UNPACK_IMAGE_HEIGHT,b),F.pixelStorei(P.UNPACK_SKIP_PIXELS,x),F.pixelStorei(P.UNPACK_SKIP_ROWS,S),F.pixelStorei(P.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&P.generateMipmap(v),F.unbindTexture()},this.initRenderTarget=function(e){I.get(e).__webglFramebuffer===void 0&&ze.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?ze.setTextureCube(e,0):e.isData3DTexture?ze.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?ze.setTexture2DArray(e,0):ze.setTexture2D(e,0),F.unbindTexture()},this.resetState=function(){le=0,ue=0,N=null,F.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ke}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Lt._getUnpackColorSpace()}},Nl=class extends EventTarget{width;height;pixelRatio;constructor(){super(),this.width=window.innerWidth,this.height=window.innerHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2),this._onResize=this._onResize.bind(this),window.addEventListener(`resize`,this._onResize)}_onResize(){this.width=window.innerWidth,this.height=window.innerHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2),this.dispatchEvent(new Event(`resize`))}destroy(){window.removeEventListener(`resize`,this._onResize)}},Pl=class extends EventTarget{elapsed;delta;_start;_current;_rafId;constructor(){super(),this._start=performance.now(),this._current=this._start,this.elapsed=0,this.delta=16,this._rafId=0,this._tick=this._tick.bind(this),this._rafId=requestAnimationFrame(this._tick)}_tick(e){this.delta=e-this._current,this._current=e,this.elapsed=e-this._start,this.dispatchEvent(new Event(`tick`)),this._rafId=requestAnimationFrame(this._tick)}destroy(){cancelAnimationFrame(this._rafId)}},Fl=2.5,Il=1,Ll=.1,Rl=45,zl=8,Bl=10,Vl=28,Hl=26,Ul=36,Wl=17,Gl=5,Kl=6,ql=.025,Jl=.012,Yl=4;function Xl(e){return e<.5?4*e*e*e:1-(-2*e+2)**3/2}var Zl=class{instance;_offset;_lookTarget;_desired;_forward;_initialized;_introWeight=0;_introHold=!1;_introTime=0;_introDuration=0;_introPlaying=!1;_snap=!1;_hasPrev=!1;_prevX=0;_prevZ=0;_prevHeading=0;_speed=0;_fovExtra=0;_roll=0;constructor(e,t){this.instance=new za(Rl,e.width/e.height,.5,200),this._offset=new V(0,zl,Bl),this._lookTarget=new V,this._desired=new V,this._forward=new V,this._initialized=!1,this.instance.position.set(0,zl,Bl),this.instance.lookAt(0,0,0),t.add(this.instance)}get introWeight(){return this._introWeight}resize(e){this.instance.aspect=e.width/e.height,this.instance.updateProjectionMatrix()}holdIntro(){this._introHold=!0,this._introPlaying=!1,this._introWeight=1,this._snap=!0}playIntro(e){if(e<=0){this._introHold=!1,this._introPlaying=!1,this._introWeight=0;return}this._introHold=!1,this._introPlaying=!0,this._introTime=0,this._introDuration=e,this._introWeight=1}update(e,t,n=1/60){let r=Math.min(Math.max(n,0),Ll);this._forward.set(0,0,1),t&&this._forward.applyQuaternion(t),this._forward.y=0,this._forward.lengthSq()>1e-6?this._forward.normalize():this._forward.set(0,0,-1),this._updateMotion(e,r),this._updateIntro(r),this._desired.set(e.x+this._forward.x*Fl,e.y+Il,e.z+this._forward.z*Fl),this._initialized?this._lookTarget.lerp(this._desired,1-Math.exp(-5*r)):(this._lookTarget.copy(this._desired),this._initialized=!0);let i=this._introWeight;this._desired.copy(e).add(this._offset),this._desired.x+=Vl*i,this._desired.y+=Hl*i,this._desired.z+=Ul*i,this._snap?(this.instance.position.copy(this._desired),this._snap=!1):this.instance.position.lerp(this._desired,1-Math.exp(-3.5*r)),this.instance.lookAt(this._lookTarget),Math.abs(this._roll)>1e-5&&this.instance.rotateZ(this._roll);let a=Rl+Wl*i+this._fovExtra;Math.abs(a-this.instance.fov)>.001&&(this.instance.fov=a,this.instance.updateProjectionMatrix())}_updateIntro(e){if(this._introHold){this._introWeight=1;return}if(!this._introPlaying)return;this._introTime+=e;let t=Math.min(this._introTime/this._introDuration,1);this._introWeight=1-Xl(t),t>=1&&(this._introPlaying=!1,this._introWeight=0)}_updateMotion(e,t){let n=Math.atan2(this._forward.x,this._forward.z),r=0,i=0;if(this._hasPrev&&t>1e-5){let a=e.x-this._prevX,o=e.z-this._prevZ,s=Math.sqrt(a*a+o*o);if(s<Yl){r=s/t;let e=n-this._prevHeading;e>Math.PI?e-=Math.PI*2:e<-Math.PI&&(e+=Math.PI*2),i=e/t}}this._hasPrev=!0,this._prevX=e.x,this._prevZ=e.z,this._prevHeading=n,this._speed+=(r-this._speed)*(1-Math.exp(-6*t));let a=Kl*Math.min(this._speed/Gl,1);this._fovExtra+=(a-this._fovExtra)*(1-Math.exp(-3*t));let o=Math.min(this._speed/2,1),s=-i*Jl*o;s=Math.max(-.025,Math.min(ql,s)),this._roll+=(s-this._roll)*(1-Math.exp(-4*t))}},Ql=class{instance;pixelRatio;_low=!1;constructor(e,t){this.instance=new Ml({canvas:e,antialias:!0,alpha:!1}),this.pixelRatio=Math.min(t.pixelRatio,2),this.instance.setSize(t.width,t.height),this.instance.setPixelRatio(this.pixelRatio),this.instance.outputColorSpace=Be,this.instance.toneMapping=0,this.instance.shadowMap.enabled=!0,this.instance.shadowMap.type=1}resize(e){this.pixelRatio=this._low?1:Math.min(e.pixelRatio,2),this.instance.setPixelRatio(this.pixelRatio),this.instance.setSize(e.width,e.height)}setLowQuality(e,t){this._low=e,this.resize(t)}update(e,t){this.instance.render(e,t)}destroy(){this.instance.dispose()}},$l={grass:.02,pad:.04,mirror:.06,room:.08,hallway:.1,branch:.12,marking:.14,circle:.16,ring:.19};function eu(e,t){return e.polygonOffset=!0,e.polygonOffsetFactor=-1,e.polygonOffsetUnits=-t,e}function tu(){let e=new U,t=[],n=new G(new Wi(100,100),new q({color:13944233,roughness:.9,metalness:0}));n.rotation.x=-Math.PI/2,n.receiveShadow=!0,e.add(n),t.push({position:{x:0,y:-.5,z:0},size:{x:100,y:1,z:100}});let r=new q({color:12103840,roughness:.95}),i=new G(new Wi(5,60),eu(r,2));i.rotation.x=-Math.PI/2,i.position.set(0,$l.pad,-5),i.receiveShadow=!0,e.add(i);let a=new q({color:8174143,roughness:.92}),o=new q({color:6990384,roughness:.92}),s=[{x:-35,z:-35,w:20,h:18,mat:a},{x:35,z:-35,w:20,h:18,mat:o},{x:-38,z:35,w:16,h:16,mat:a},{x:38,z:35,w:16,h:16,mat:o},{x:-40,z:10,w:10,h:12,mat:a},{x:40,z:-10,w:10,h:12,mat:o},{x:0,z:40,w:25,h:12,mat:a},{x:0,z:-42,w:20,h:8,mat:o}];for(let t of s){let n=new G(new Wi(t.w,t.h),eu(t.mat,1));n.rotation.x=-Math.PI/2,n.position.set(t.x,$l.grass,t.z),n.receiveShadow=!0,e.add(n)}let c=new q({color:13156264,roughness:.85});for(let t=-34;t<=20;t+=4){let n=new G(new K(.15,.01,1.5),eu(c,6));n.position.set(0,$l.marking-.005,t),n.receiveShadow=!0,e.add(n)}let l=new q({color:8359053,roughness:.8});for(let n of[{pos:[0,1,50],size:[100,2,1]},{pos:[0,1,-50],size:[100,2,1]},{pos:[50,1,0],size:[1,2,100]},{pos:[-50,1,0],size:[1,2,100]}]){let r=new G(new K(n.size[0],n.size[1],n.size[2]),l);r.position.set(n.pos[0],n.pos[1],n.pos[2]),r.castShadow=!0,r.receiveShadow=!0,e.add(r),t.push({position:{x:n.pos[0],y:n.pos[1],z:n.pos[2]},size:{x:n.size[0],y:n.size[1],z:n.size[2]}})}return{meshGroup:e,physicsBodies:t}}var nu=new V;function ru(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;nu.copy(t),nu[r]=0,nu.normalize();let l=.5*o/(o+s),u=1-nu.angleTo(e)/c;return Math.sign(nu[n])===1?u*l:s/(o+s)+l+l*(1-u)}var iu=class e extends K{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new V,c=new V,l=new V(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new V,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=ru(m,c,`z`,`y`,i,n),f[a+1]=1-ru(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-ru(m,c,`z`,`y`,i,n),f[a+1]=1-ru(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-ru(m,c,`x`,`z`,i,e),f[a+1]=ru(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-ru(m,c,`x`,`z`,i,e),f[a+1]=1-ru(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-ru(m,c,`x`,`y`,i,e),f[a+1]=1-ru(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=ru(m,c,`x`,`y`,i,e),f[a+1]=1-ru(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},au={height:.3,protrude:.08},ou={height:.25,protrude:.1},su={size:.4,capSize:.62,capHeight:.12},cu={width:1.3,height:1.4,centerY:2.3,frame:.1,depth:.1},lu={doorWidth:3,doorHeight:3.2,jamb:.35,lintelHeight:.4,plateHeight:.7,plateWidth:2.8,awningDepth:.95,awningTilt:.35,lampOffsetZ:2.4,lampHeight:1.9},uu={columnX:2.3,columnSize:.6,columnHeight:5.4,boardWidth:4.2,boardY0:4.2,boardHeight:1,boardDepth:.3,wallZ:20},du=4.5,fu=22.2,pu=21.5,mu={x:16,z:-20,poleHeight:3.3},hu=[-9,6],gu=class{parts=[];hulls=[];box(e,t,n,r,i,a,o,s,c={}){this.parts.push({role:e,tag:t,x:a,y:o,z:s,w:n,h:r,d:i,...c})}hull(e,t,n,r,i,a,o){this.hulls.push({tag:e,x:i,y:a,z:o,w:t,h:n,d:r})}};function _u(e,t,n,r,i,a,o,s,c){let l=e[0]===`+`?1:-1;return e[1]===`x`?{x:t+l*a,y:i,z:n+r,w:c,h:s,d:o}:{x:t+r,y:i,z:n+l*a,w:o,h:s,d:c}}function vu(e){let t=[],n=e.thick/2,{width:r,height:i,centerY:a,frame:o,depth:s}=cu,c=(n,r,i,a,o,s,c)=>{let l=_u(e.face,e.wallX,e.wallZ,r,i,a,o,s,c);t.push({role:n,tag:`window`,...l})},l=e.t;c(`glass`,l,a,n+.02,r,i,.04);let u=n+s/2;return c(`frame`,l-r/2,a,u,o,i+o,s),c(`frame`,l+r/2,a,u,o,i+o,s),c(`frame`,l,a,u-.02,r,o*.6,s-.04),c(`frame`,l,a,u-.02,o*.6,i,s-.04),c(`frame`,l,a-i/2-.08,n+.11,r+.5,.1,.22),c(`frame`,l,a+i/2+.1,n+.07,r+.3,.12,.14),t}function yu(e,t,n){let r=t.sx>=t.sz,i=r?t.sz:t.sx,a=r?t.sx:t.sz,o=2*au.protrude,s=2*ou.protrude,c=r?a:i+o,l=r?i+o:a;e.box(`plinth`,`plinth`,c,au.height,l,t.x,au.height/2,t.z);let u=r?a:i+s,d=r?i+s:a,f=n+ou.height/2;t.accent===void 0?e.box(`blue`,`cornice`,u,ou.height,d,t.x,f,t.z):e.box(`accent`,`cornice`,u,ou.height,d,t.x,f,t.z,{accent:t.accent}),e.hull(`wall`,t.sx,n,t.sz,t.x,n/2,t.z),e.hull(`cornice`,u,ou.height,d,t.x,f,t.z)}function bu(e,t,n,r,i){let a=n.sx>=n.sz,o=a?n.sz:n.sx,s=a?n.sx:n.sz,c=n.mid?Math.max(2,Math.round(s/4)):1,l=s/c,u=[];for(let e=0;e<=c;e++)u.push(-s/2+e*l);let d=r+ou.height;for(let t=0;t<u.length;t++){let r=u[t],o=t===0,s=t===u.length-1;if(o&&n.openEnds?.includes(`min`)||s&&n.openEnds?.includes(`max`))continue;let c=a?n.x+r:n.x,l=a?n.z:n.z+r,f=`${c.toFixed(2)},${l.toFixed(2)}`;i.has(f)||(i.add(f),e.box(`stone`,`pilaster`,su.size,d,su.size,c,d/2,l),e.box(`blue`,`cap`,su.capSize,su.capHeight,su.capSize,c,d+su.capHeight/2,l),e.hull(`pilaster`,su.size,d,su.size,c,d/2,l),e.hull(`cap`,su.capSize,su.capHeight,su.capSize,c,d+su.capHeight/2,l))}if(n.windows)for(let e=0;e<u.length-1;e++){let r=(u[e]+u[e+1])/2;for(let e of n.windows)t.push({face:e,wallX:n.x,wallZ:n.z,t:r,thick:o})}}function xu(e,t,n){let r=t.facing,i=t.color,{doorWidth:a,doorHeight:o,jamb:s}=lu,c=a/2+s/2;for(let r of[-1,1])e.box(`stone`,`jamb`,s,o,s,n,o/2,t.z+r*c),e.hull(`portal`,s,o,s,n,o/2,t.z+r*c);let l=a+2*s+.1,u=o+lu.lintelHeight/2;e.box(`accent`,`lintel`,.45,lu.lintelHeight,l,n,u,t.z,{accent:i}),e.hull(`portal`,.45,lu.lintelHeight,l,n,u,t.z);let d=o+lu.lintelHeight+.05+lu.plateHeight/2;e.box(`accent`,`plate-border`,.2,lu.plateHeight+.16,lu.plateWidth+.16,n,d,t.z,{accent:i}),e.box(`board`,`plate`,.28,lu.plateHeight,lu.plateWidth,n,d,t.z),e.hull(`portal`,.28,lu.plateHeight+.16,lu.plateWidth+.16,n,d,t.z);let f=d+lu.plateHeight/2+.28;e.box(`accent`,`awning`,lu.awningDepth,.08,l+.3,n+r*(lu.awningDepth/2-.05),f,t.z,{rotZ:-r*lu.awningTilt,accent:i,facing:r});for(let r of[-1,1]){let i=t.z+r*lu.lampOffsetZ;e.box(`metal`,`lamp-post`,.14,lu.lampHeight,.14,n,lu.lampHeight/2,i),e.box(`metal`,`lamp-arm`,.1,.1,.5,n,lu.lampHeight,i-r*.2),e.box(`bulb`,`lamp-bulb`,.26,.3,.26,n,lu.lampHeight-.05,i-r*.4),e.box(`metal`,`lamp-cap`,.34,.07,.34,n,lu.lampHeight+.14,i-r*.4)}}function Su(e){let t=uu.wallZ,n=[];for(let r of[-1,1]){let i=r*uu.columnX,a=uu.columnHeight;e.box(`stone`,`gate-column`,uu.columnSize,a,.7,i,a/2,t),e.box(`blue`,`gate-cap`,uu.columnSize+.2,.2,.9,i,a+.1,t),e.hull(`gate`,uu.columnSize,a,.7,i,a/2,t),e.hull(`gate`,uu.columnSize+.2,.2,.9,i,a+.1,t),n.push({x:i,y:3.2,z:t+.7})}let r=uu.boardY0+uu.boardHeight/2;e.box(`board`,`board`,uu.boardWidth,uu.boardHeight,uu.boardDepth,0,r,t),e.box(`blue`,`board-lintel`,uu.boardWidth,.14,uu.boardDepth+.1,0,uu.boardY0-.07,t),e.hull(`board`,uu.boardWidth,uu.boardHeight+.14,uu.boardDepth+.1,0,r-.07,t);for(let t of[-1,1]){let n=t*du;e.box(`pot`,`planter`,1.4,.55,.8,n,.275,fu),e.box(`metal`,`planter`,1.2,.04,.6,n,.56,fu),e.box(`bush`,`planter`,.55,.55,.55,n,.95,fu),e.box(`bush`,`planter`,.38,.38,.38,n+.42,.85,22.25);let r=t*8;e.box(`wood`,`bench`,2,.1,.55,r,.5,pu),e.box(`wood`,`bench`,2,.5,.08,r,.8,21.24),e.box(`metal`,`bench`,.1,.5,.5,r-.85,.25,pu),e.box(`metal`,`bench`,.1,.5,.5,r+.85,.25,pu)}return{x:0,y:r,z:t+uu.boardDepth/2+.01,w:uu.boardWidth-.2,h:uu.boardHeight,columns:n}}function Cu(e,t){let n=t+ou.height;for(let t of hu)e.box(`plinth`,`vent`,.7,.4,.45,t,n+.2,-20),e.box(`metal`,`vent`,.8,.08,.5,t,n+.44,-20),e.box(`metal`,`vent`,.5,.05,.05,t,n+.25,-19.76);let r=n+su.capHeight;e.box(`metal`,`flag`,.1,mu.poleHeight,.1,mu.x,r+mu.poleHeight/2,mu.z),e.box(`bulb`,`flag`,.2,.2,.2,mu.x,r+mu.poleHeight+.1,mu.z),e.box(`blue`,`flag`,1.2,.7,.04,mu.x-.65,r+mu.poleHeight-.45,mu.z),e.box(`white`,`flag`,.5,.12,.05,mu.x-.65,r+mu.poleHeight-.45,mu.z),e.hull(`flag`,.1,mu.poleHeight,.1,mu.x,r+mu.poleHeight/2,mu.z)}function wu(e){let t=new gu,n=[],r=e.wallHeight,i=new Set;for(let t of e.walls)t.accent!==void 0&&i.add(t.accent);for(let t of e.rooms)i.add(t.color);let a=new Set;for(let i of e.walls)yu(t,i,r),bu(t,n,i,r,a);for(let n of e.rooms)xu(t,n,n.x+n.facing*(e.roomDepth/2));let o=Su(t);return Cu(t,r),{parts:t.parts,hulls:t.hulls,windows:n,hero:o,accents:[...i],wallHeight:r}}function Tu(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Ar,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Eu(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Eu(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Eu(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new hr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Du=class{parts=new Map;hulls=[];_m=new $t;_q=new At;_e=new un;_p=new V;_s=new V(1,1,1);add(e,t,n,r,i,a=0){let o=t.index?t.toNonIndexed():t;o!==t&&t.dispose(),this._e.set(0,0,a),this._q.setFromEuler(this._e),this._m.compose(this._p.set(n,r,i),this._q,this._s),o.applyMatrix4(this._m);let s=this.parts.get(e);s||this.parts.set(e,s=[]),s.push(o)}box(e,t,n,r,i,a,o,s=0){this.add(e,new K(t,n,r),i,a,o,s)}hull(e,t){let n=e.y-e.h/2,r=e.y+e.h/2,i=n>.01?n-t:n,a=new K(e.w+2*t,r+t-i,e.d+2*t).toNonIndexed();a.deleteAttribute(`normal`),a.deleteAttribute(`uv`),a.translate(e.x,(r+t+i)/2,e.z),this.hulls.push(a)}buildKey(e,t,n){let r=this.parts.get(e);if(!r||r.length===0)return null;this.parts.delete(e);let i=Tu(r,!1);for(let e of r)e.dispose();let a=new G(i,t);return a.name=n,a}keys(){return[...this.parts.keys()]}buildOutline(e,t){if(this.hulls.length===0)return null;let n=Tu(this.hulls,!1);for(let e of this.hulls)e.dispose();this.hulls=[];let r=new G(n,e);return r.name=t,r}},Ou={background:`#12384f`,frameOuter:`#f4efe2`,frameInner:`#f1c40f`,title:`#ffffff`,subtitle:`#f1c40f`};function ku(e,t={}){let n=t.width??1344,i=Math.round(n*uu.boardHeight/(uu.boardWidth-.2)),a=n/1344,o=document.createElement(`canvas`);o.width=n,o.height=i;let s=o.getContext(`2d`);s.fillStyle=e.background,s.fillRect(0,0,n,i),s.strokeStyle=e.frameOuter,s.lineWidth=Math.max(1,12*a),s.strokeRect(14*a,14*a,n-28*a,i-28*a),s.strokeStyle=e.frameInner,s.lineWidth=Math.max(1,5*a),s.strokeRect(34*a,34*a,n-68*a,i-68*a),s.fillStyle=e.title,s.textAlign=`center`,s.textBaseline=`middle`,s.font=`900 ${Math.round(i*.5)}px Arial, Helvetica, sans-serif`,s.fillText(`ITEC`,n/2,i*.4),s.fillStyle=e.subtitle,s.font=`bold ${Math.round(i*.15)}px Arial, Helvetica, sans-serif`,s.fillText(`Instituto Tecnológico Río Cuarto`,n/2,i*.79);let c=new Pi(o);return c.colorSpace=Be,c.anisotropy=4,t.pixelated&&(c.magFilter=r,c.minFilter=r,c.generateMipmaps=!1),c}var Au=1780282,ju=.03,Mu=new Set([`wall`,`cornice`,`pilaster`,`cap`,`board`]),Nu={plinth:{color:10129280,roughness:.92},blue:{color:2056075,roughness:.55,metalness:.1},stone:{color:14998731,roughness:.85},glass:{color:3894164,roughness:.1,metalness:.35,emissive:860726,emissiveIntensity:.3},frame:{color:16052194,roughness:.7},board:{color:1194063,roughness:.6},metal:{color:3817288,roughness:.4,metalness:.6},bulb:{color:16769696,roughness:.3,emissive:16765562,emissiveIntensity:1},pot:{color:11559487,roughness:.8},bush:{color:5940821,roughness:.9},wood:{color:9132587,roughness:.65},white:{color:16250871,roughness:.7}},Pu=new Set([`pot`,`wood`,`board`]);function Fu(e){if(e.role===`bush`)return new Ki(e.w,16,12);if(e.role===`bulb`){let t=new Ki(e.w/2,14,10);return t.scale(1,e.h/e.w,e.d/e.w),t}return e.role===`metal`&&(e.tag===`lamp-post`||e.tag===`flag`&&e.h>1)?new zi(e.w/2,e.w/2,e.h,12):Pu.has(e.role)?new iu(e.w,e.h,e.d,2,Math.min(e.w,e.h,e.d)*.3):new K(e.w,e.h,e.d)}function Iu(e,t){let n=t.role===`accent`?`accent-${t.accent}`:t.role;e.add(n,Fu(t),t.x,t.y,t.z,t.rotZ??0)}function Lu(e){let t=new U;t.name=`original-building-details`;let n=new Du,r=wu(e);for(let e of r.parts)Iu(n,e);for(let e of r.windows)for(let t of vu(e))Iu(n,t);for(let e of r.hulls)Mu.has(e.tag)&&n.hull(e,ju);for(let e of n.keys()){let r;r=e.startsWith(`accent-`)?new q({color:Number(e.slice(7)),roughness:.55,metalness:.1}):new q(Nu[e]);let i=n.buildKey(e,r,`bld-${e}`);i&&(i.castShadow=e!==`bulb`,i.receiveShadow=!0,t.add(i))}let i=n.buildOutline(new si({color:Au,side:1}),`bld-outline`);i&&t.add(i);let a=ku(Ou),o=new G(new Wi(r.hero.w,r.hero.h),new q({map:a,emissive:16777215,emissiveMap:a,emissiveIntensity:.25,roughness:.6}));return o.position.set(r.hero.x,r.hero.y,r.hero.z),o.receiveShadow=!0,o.name=`bld-hero-face`,t.add(o),t}var Ru=[{name:`Desarrollo de Software`,color:2719929,x:-12,z:-16,facing:1},{name:`Mecatrónica`,color:15158332,x:-12,z:0,facing:1},{name:`Marketing Digital`,color:15105570,x:-12,z:16,facing:1},{name:`Inteligencia Artificial`,color:9323693,x:12,z:-8,facing:-1},{name:`Turismo y Hotelería`,color:2600544,x:12,z:8,facing:-1}],zu=4,Bu=.3,Vu=8,Hu=8;function Uu(e){let t=document.createElement(`canvas`);t.width=512,t.height=128;let n=t.getContext(`2d`);n.fillStyle=`rgba(0, 0, 0, 0)`,n.fillRect(0,0,512,128),n.font=`bold 48px Arial`,n.fillStyle=`#ffffff`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(e,256,64);let r=new ei(new Br({map:new Pi(t),transparent:!0,depthWrite:!1}));return r.scale.set(4,1,1),r}function Wu(e){let t=new U,n=new G(new K(3,$l.hallway,55),eu(new q({color:13421772,roughness:.85}),4));n.position.set(0,$l.hallway/2,-7.5),n.receiveShadow=!0,t.add(n);let r=new q({color:14540253,roughness:.85});for(let n of e){let e=n.x+n.facing*(Hu/2),i=Math.abs(e),a=e/2,o=new G(new K(i,$l.branch,2),eu(r,5));o.position.set(a,$l.branch/2,n.z),o.receiveShadow=!0,t.add(o);let s=new G(new Ri(.9,20),eu(new q({color:n.color,roughness:.5}),7));s.rotation.x=-Math.PI/2,s.position.set(e,$l.circle,n.z),s.receiveShadow=!0,t.add(s);let c=new G(new qi(1.1,.08,8,24),new q({color:n.color,emissive:n.color,emissiveIntensity:.4,roughness:.3}));c.rotation.x=-Math.PI/2,c.position.set(e,$l.ring,n.z),t.add(c)}return t}function Gu(e){let t=new U,n=new q({color:9139029,roughness:.7});for(let r of[-2,0,2]){let i=new G(new K(1.8,.08,.9),n),a=e.z+r,o=e.x-e.facing*1.5;i.position.set(o,.75,a),i.castShadow=!0,i.receiveShadow=!0,t.add(i);let s=new K(.08,.7,.08),c=new q({color:5592405,roughness:.8});for(let[e,n]of[[-.8,-.35],[.8,-.35],[-.8,.35],[.8,.35]]){let r=new G(s,c);r.position.set(o+e,.35,a+n),t.add(r)}}let r=e.x-e.facing*(Hu/2),i=new G(new K(.05,1.8,4),new q({color:16119285,roughness:.3,metalness:.05}));i.position.set(r+e.facing*.2,2.2,e.z),i.receiveShadow=!0,t.add(i);let a=new q({color:4473924,roughness:.6}),o=new G(new K(.06,.06,4.1),a);o.position.set(r+e.facing*.2,3.12,e.z),t.add(o);let s=new G(new K(.06,.06,4.1),a);return s.position.set(r+e.facing*.2,1.28,e.z),t.add(s),t}function Ku(e,t,n,r,i,a,o){let s=new G(new K(r.x,zu,r.z),i);s.position.set(n.x,zu/2,n.z),s.castShadow=!0,s.receiveShadow=!0,e.add(s),t.push({position:{x:n.x,y:zu/2,z:n.z},size:{x:r.x,y:zu,z:r.z}}),o.push({x:n.x,z:n.z,sx:r.x,sz:r.z,...a})}function qu(){let e=new U,t=[],n=[],r=[],i=new q({color:13421772,roughness:.8});for(let a of Ru){let o=new U,s=new q({color:a.color,roughness:.6,metalness:.1}),c=a.x-a.facing*(Hu/2),l=new G(new K(Bu,zu,Vu),s);l.position.set(c,zu/2,a.z),l.castShadow=!0,l.receiveShadow=!0,o.add(l),t.push({position:{x:c,y:zu/2,z:a.z},size:{x:Bu,y:zu,z:Vu}}),r.push({x:c,z:a.z,sx:Bu,sz:Vu,accent:a.color,mid:!1});let u=a.z-Vu/2,d=new K(Hu,zu,Bu),f=new G(d,i);f.position.set(a.x,zu/2,u),f.castShadow=!0,f.receiveShadow=!0,o.add(f),t.push({position:{x:a.x,y:zu/2,z:u},size:{x:Hu,y:zu,z:Bu}}),r.push({x:a.x,z:u,sx:Hu,sz:Bu,mid:!0});let p=a.z+Vu/2,m=new G(d,i);m.position.set(a.x,zu/2,p),m.castShadow=!0,m.receiveShadow=!0,o.add(m),t.push({position:{x:a.x,y:zu/2,z:p},size:{x:Hu,y:zu,z:Bu}}),r.push({x:a.x,z:p,sx:Hu,sz:Bu,mid:!0});let h=new Wi(7.5,7.5),g=new W(a.color);g.lerp(new W(16777215),.7);let _=new G(h,eu(new q({color:g,roughness:.85}),3));_.rotation.x=-Math.PI/2,_.position.set(a.x,$l.room,a.z),_.receiveShadow=!0,o.add(_);let v=Uu(a.name),y=a.x+a.facing*(Hu/2);v.position.set(y,5,a.z),o.add(v);let b=Gu(a);o.add(b),e.add(o);let x=a.x+a.facing*(Hu/2);n.push({name:a.name,position:{x,y:zu/2,z:a.z},size:{x:2,y:zu,z:Vu}})}let a=Bu,o=[`+x`],s=[`-x`];Ku(e,t,{x:-8,z:-8},{x:a,z:8},i,{mid:!0,windows:o},r),Ku(e,t,{x:-8,z:8},{x:a,z:8},i,{mid:!0,windows:o},r),Ku(e,t,{x:8,z:-16},{x:a,z:8},i,{mid:!0,windows:s},r),Ku(e,t,{x:8,z:0},{x:a,z:8},i,{mid:!0,windows:s},r),Ku(e,t,{x:8,z:16},{x:a,z:8},i,{mid:!0,windows:s},r),Ku(e,t,{x:-16,z:-8},{x:a,z:8},i,{mid:!0},r),Ku(e,t,{x:-16,z:8},{x:a,z:8},i,{mid:!0},r),Ku(e,t,{x:16,z:-16},{x:a,z:8},i,{mid:!0},r),Ku(e,t,{x:16,z:16},{x:a,z:8},i,{mid:!0},r),Ku(e,t,{x:0,z:-20},{x:32,z:a},i,{mid:!0,windows:[`+z`]},r),Ku(e,t,{x:-9,z:20},{x:14,z:a},i,{mid:!0,windows:[`+z`],openEnds:[`max`]},r),Ku(e,t,{x:9,z:20},{x:14,z:a},i,{mid:!0,windows:[`+z`],openEnds:[`min`]},r),e.add(Lu({walls:r,rooms:Ru,wallHeight:zu,roomDepth:Hu}));let c=Wu(Ru);return e.add(c),{meshGroup:e,physicsWalls:t,triggerZones:n}}function Ju(){return Ru.map(e=>({x:e.x,z:e.z}))}function Yu(){let e=new U,t=new q({color:15790320,roughness:.4,metalness:.1}),n=new q({color:2236962,roughness:.6,metalness:.3}),r=new q({color:3355443,roughness:.6,metalness:.3}),i=new q({color:8947848,roughness:.7,metalness:.2}),a=new q({color:3447003,emissive:3447003,emissiveIntensity:.9}),o=(t,n,r,i,a,o=!0)=>{let s=new G(t,n);return s.position.set(r,i,a),s.castShadow=o,e.add(s),s};o(new zi(.6,.65,.05,24),i,0,.025,0);for(let e of[-1,1]){let i=e*.2;o(new K(.22,.1,.38),r,i,.1,.05),o(new zi(.075,.09,.55,12),t,i,.42,0),o(new Ki(.1,12,12),n,i,.75,0),o(new zi(.1,.08,.45,12),t,i,.98,0),o(new Ki(.11,12,12),n,i,1.22,0)}o(new K(.5,.22,.3),r,0,1.3,0),o(new K(.7,.5,.36),t,0,1.66,0),o(new K(.72,.015,.38),n,0,1.5,0,!1),o(new K(.015,.5,.38),n,0,1.66,0,!1);let s=o(new qi(.11,.025,8,24),n,0,1.66,.19,!1);s.rotation.x=0,o(new Ki(.09,20,20),a,0,1.66,.19,!1);let c=new Ua(3447003,1,5);c.position.set(0,1.66,.35),e.add(c);for(let e of[-1,1]){let r=e*.47;o(new Ki(.11,12,12),n,r,1.85,0),o(new zi(.07,.06,.38,12),t,r,1.64,0),o(new Ki(.075,12,12),n,r,1.43,0),o(new zi(.06,.05,.34,12),t,r,1.24,0),o(new K(.08,.12,.1),t,r,1.03,0)}o(new zi(.05,.06,.12,12),n,0,1.97,0),o(new Ki(.2,24,24),t,0,2.08,0).scale.set(1,1.05,.95),o(new K(.41,.012,.01),n,0,2.15,.185,!1),o(new K(.012,.2,.01),n,0,2.1,.19,!1);let l=new Ki(.03,10,10);for(let e of[-1,1])o(l,a,e*.08,2.1,.18,!1);return{group:e,getBounceOffset:e=>Math.sin(e*2)*.03}}function Xu(e){for(let t of Object.values(e))t instanceof qt&&t.dispose();let t=e.uniforms;if(t)for(let e of Object.values(t))e.value instanceof qt&&e.value.dispose();e.dispose()}function Zu(e){e.traverse(e=>{let t=e;t.geometry&&t.geometry.dispose();let n=t.material;n&&(Array.isArray(n)?n.forEach(Xu):Xu(n))}),e.parent?.remove(e)}var Qu={x:5.2,y:0,z:31.6},$u=-.25,ed={width:2,height:1};function td(e,t={}){let n=t.width??512,i=n/2,a=n/512,o=document.createElement(`canvas`);o.width=n,o.height=i;let s=o.getContext(`2d`);s.fillStyle=e.background,s.fillRect(0,0,n,i),s.strokeStyle=e.accent,s.lineWidth=8*a,s.strokeRect(14*a,14*a,n-28*a,i-28*a);let c=96*a,l=112*a,u=38*a;s.fillStyle=e.accent,s.beginPath(),s.arc(c,l,u,Math.PI*.82,Math.PI*.18,!1),s.lineTo(c,l+u*2.1),s.closePath(),s.fill(),s.fillStyle=e.background,s.beginPath(),s.arc(c,l,u*.38,0,Math.PI*2),s.fill(),s.fillStyle=e.text,s.textAlign=`left`,s.textBaseline=`middle`,s.font=`bold ${58*a}px Arial`,s.fillText(`¿Cómo llegar?`,160*a,100*a,320*a),s.font=`${40*a}px Arial`,s.fillText(`ITEC Río Cuarto`,160*a,160*a,320*a);let d=new Pi(o);return d.colorSpace=Be,d.anisotropy=4,t.pixelated&&(d.magFilter=r,d.minFilter=r,d.generateMipmaps=!1),d}var nd=class{group;constructor(e){this.group=new U,this.createSkyDome(),this.createTrees(),this.createBushes(),this.createWelcomeArch(),this.createAddressSign(),e.add(this.group)}createSkyDome(){let e=new G(new Ki(150,32,32),new na({side:1,depthWrite:!1,uniforms:{topColor:{value:new W(8900331)},horizonColor:{value:new W(16113331)},bottomColor:{value:new W(15787731)}},vertexShader:`
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          vec3 color;
          if (h > 0.0) {
            color = mix(horizonColor, topColor, pow(h, 0.6));
          } else {
            color = mix(horizonColor, bottomColor, pow(-h, 0.4));
          }
          gl_FragColor = vec4(color, 1.0);
        }
      `}));this.group.add(e)}createTree(e,t,n){let r=new U,i=1.5*n,a=.15*n,o=new G(new zi(a*.7,a,i,6),new q({color:9136404,roughness:.9}));o.position.y=i/2,o.castShadow=!0,r.add(o);let s=[4881454,6064700,7052874,4025124],c=s[Math.floor(Math.random()*s.length)],l=2.5*n,u=1.2*n,d=new Bi(u,l,7),f=new q({color:c,roughness:.8,flatShading:!0}),p=new G(d,f);p.position.y=i+l*.4,p.castShadow=!0,p.receiveShadow=!0,r.add(p);let m=new G(new Bi(u*.65,l*.7,7),f);return m.position.y=i+l*.85,m.castShadow=!0,r.add(m),r.position.set(e,0,t),r}createTrees(){for(let[e,t,n]of[[-40,-30,1.2],[-38,-18,.9],[-42,-5,1.4],[-36,10,1],[-40,22,1.3],[-44,35,.8],[-35,40,1.1],[40,-28,1.3],[38,-12,.9],[42,5,1.1],[36,18,1.4],[40,30,1],[44,42,.8],[-25,-42,1.2],[0,-44,.9],[25,-42,1.1],[-28,42,1],[5,44,1.3],[28,42,.8],[-30,38,1.1]]){let r=this.createTree(e,t,n);this.group.add(r)}}createBushes(){let e=new q({color:5934908,roughness:.85,flatShading:!0}),t=new q({color:4880942,roughness:.85,flatShading:!0});for(let[n,r]of[[-32,-25],[-34,5],[32,-20],[34,15],[-20,-38],[20,-38],[-22,38],[22,38],[-30,30],[30,-30]]){let i=new U,a=Math.random()>.5?e:t,o=new G(new Hi(.6,0),a);o.position.y=.4,o.castShadow=!0,i.add(o);let s=new Hi(.45,0),c=new G(s,a);c.position.set(.5,.3,.2),c.castShadow=!0,i.add(c);let l=new G(s,a);l.position.set(-.4,.3,-.3),l.castShadow=!0,i.add(l),i.position.set(n,0,r),this.group.add(i)}}createWelcomeArch(){let e=new U,t=new q({color:1725046,roughness:.5,metalness:.3}),n=new K(.4,4,.4),r=new G(n,t);r.position.set(-3,2,0),r.castShadow=!0,e.add(r);let i=new G(n,t);i.position.set(3,2,0),i.castShadow=!0,e.add(i);let a=new G(new K(6.8,.5,.5),t);a.position.set(0,4.25,0),a.castShadow=!0,e.add(a);let o=document.createElement(`canvas`);o.width=512,o.height=128;let s=o.getContext(`2d`);s.fillStyle=`rgba(0, 0, 0, 0)`,s.fillRect(0,0,512,128),s.font=`bold 56px Arial`,s.fillStyle=`#ffffff`,s.textAlign=`center`,s.textBaseline=`middle`,s.fillText(`ITEC Río Cuarto`,256,64);let c=new ei(new Br({map:new Pi(o),transparent:!0,depthWrite:!1}));c.scale.set(6,1.5,1),c.position.set(0,5.5,0),e.add(c),e.position.set(0,0,31),this.group.add(e)}createAddressSign(){let e=new U,t=new q({color:7032634,roughness:.85}),n=new q({color:9136970,roughness:.75}),r=new G(new K(.6,.12,.6),t);r.position.y=.06,e.add(r);let i=new G(new K(.2,2.2,.2),t);i.position.y=1.1,i.castShadow=!0,e.add(i);let a=new G(new K(ed.width+.2,ed.height+.2,.1),n);a.position.set(0,1.95,.13),a.castShadow=!0,e.add(a);let o=new G(new Wi(ed.width,ed.height),new q({map:td({background:`#f3ead8`,text:`#1a5276`,accent:`#c0392b`}),roughness:.8}));o.position.set(0,1.95,.185),e.add(o),e.position.set(Qu.x,Qu.y,Qu.z),e.rotation.y=$u,this.group.add(e)}destroy(){Zu(this.group)}},rd=class{ambient;directional;hemisphere;interiorLights=[];scene;constructor(e,t){if(this.scene=e,this.ambient=new qa(16777215,.5),this.hemisphere=new Da(16772829,8939076,.3),this.directional=new Ka(16774630,1.4),this.directional.position.set(15,25,10),this.directional.target.position.set(0,0,0),this.directional.castShadow=!0,this.directional.shadow.mapSize.set(2048,2048),this.directional.shadow.camera.near=.5,this.directional.shadow.camera.far=80,this.directional.shadow.camera.left=-40,this.directional.shadow.camera.right=40,this.directional.shadow.camera.top=40,this.directional.shadow.camera.bottom=-40,this.directional.shadow.normalBias=.02,e.add(this.ambient),e.add(this.hemisphere),e.add(this.directional),e.add(this.directional.target),t)for(let n of t){let t=new Ua(16755268,.3,15);t.position.set(n.x,3,n.z),e.add(t),this.interiorLights.push(t)}}destroy(){this.scene.remove(this.ambient,this.hemisphere,this.directional,this.directional.target),this.ambient.dispose(),this.directional.dispose(),this.hemisphere.dispose();for(let e of this.interiorLights)this.scene.remove(e),e.dispose();this.interiorLights=[]}},id=.5,ad=2.4,od=2.5,sd=.2;function cd(){let e=new G(new Ki(id,32,24),new q({color:16777215,roughness:.45}));e.castShadow=!0;let t=new q({color:1118481,roughness:.5}),n=new Ki(id*1.003,5,2,0,Math.PI*2,0,.4),r=(1+Math.sqrt(5))/2,i=new V(0,1,0);for(let[a,o]of[[1,r],[1,-r],[-1,r],[-1,-r]])for(let r of[new V(0,a,o),new V(a,o,0),new V(o,0,a)]){let a=new G(n,t);a.quaternion.setFromUnitVectors(i,r.normalize()),e.add(a)}return e}function ld(){let e=new U,t=new q({color:16777215}),n=new si({color:16777215,transparent:!0,opacity:.25,side:2}),r=12+od,i=12+od/2,a=(t,n,r,i)=>{let a=new G(new K(...t),r);a.position.set(...n),a.castShadow=i,e.add(a)};for(let e of[-36.5,-31.5])a([sd,ad,sd],[12,ad/2,e],t,!0);a([sd,sd,5],[12,ad,-34],t,!0),a([.05,ad,5],[r,ad/2,-34],n,!1);for(let e of[-36.5,-31.5])a([od,ad,.05],[i,ad/2,e],n,!1);return e}var ud=`
  float sigHash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float sigNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = sigHash(i);
    float b = sigHash(i + vec2(1.0, 0.0));
    float c = sigHash(i + vec2(0.0, 1.0));
    float d = sigHash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float sigFbm(vec2 p) {
    return 0.6 * sigNoise(p) + 0.3 * sigNoise(p * 2.1 + 7.3) + 0.1 * sigNoise(p * 4.3 + 3.1);
  }
`;function dd(e=64){let t=document.createElement(`canvas`);t.width=e,t.height=e;let n=t.getContext(`2d`),r=n.createRadialGradient(e/2,e/2,0,e/2,e/2,e/2);r.addColorStop(0,`rgba(255,255,255,1)`),r.addColorStop(.35,`rgba(255,255,255,0.5)`),r.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=r,n.fillRect(0,0,e,e);let i=new Pi(t);return i.colorSpace=Be,i}function fd(e){e.parent?.remove(e),e.geometry.dispose();let t=e.material;t.map?.dispose(),t.dispose()}var pd=16767392,md=.16,hd=26,gd=new V(15,25,10),_d=1.1,vd=.18,yd=[[-4,29,4.5],[4.5,34,3.4],[0,39,6],[-26,2,5],[27,-6,4],[-23,-26,5.5],[25,22,3.8]],bd=3,xd=70,Sd=20,Cd=.16,wd=16767392,Td=[[0,34,9,7],[-27,4,6,20],[27,-2,6,20]],Ed=7,Dd=`
  uniform vec3 uCenter;
  uniform vec3 uAxis;
  uniform vec2 uSize;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Cylindrical billboard: the quad spins around its axis to face the camera
    vec3 side = normalize(cross(uAxis, cameraPosition - uCenter));
    vec3 wp = uCenter + side * position.x * uSize.x + uAxis * position.y * uSize.y;
    gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  }
`,Od=`
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uTime;
  uniform float uSeed;
  varying vec2 vUv;
  ${ud}
  void main() {
    // vUv.y: 0 at the sun end, 1 at the ground end
    float fadeTop = smoothstep(0.0, 0.18, vUv.y);
    float fadeFoot = 1.0 - smoothstep(0.55, 1.0, vUv.y);
    float edge = sin(3.14159265 * vUv.x);
    edge = edge * edge;
    float streak = sigFbm(vec2(vUv.x * 4.0 + uSeed, vUv.y * 1.6 - uTime * 0.05));
    float shimmer = 0.75 + 0.25 * sin(uTime * 0.5 + uSeed * 6.0);
    float a = uIntensity * fadeTop * fadeFoot * edge * mix(0.35, 1.2, streak) * shimmer;
    gl_FragColor = vec4(uColor * a, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,kd=class{depthExclude=[];_scene;_group=new U;_shaftGeo=new Wi(1,1);_shafts=[];_axis=new V;_motes;_moteBase;_movePhase;_moteColors;_moteCount=xd;constructor(e){this._scene=e.scene,this._axis.copy(gd).negate().normalize(),yd.forEach(([e,t,n],r)=>{let i=new na({uniforms:{uCenter:{value:new V},uAxis:{value:this._axis},uSize:{value:new B(n,hd)},uColor:{value:new W(pd)},uIntensity:{value:md},uTime:{value:0},uSeed:{value:r*3.7}},vertexShader:Dd,fragmentShader:Od,transparent:!0,blending:2,depthWrite:!1,side:2,fog:!1}),a=new G(this._shaftGeo,i);a.frustumCulled=!1,a.renderOrder=2,this._group.add(a),this._shafts.push({mesh:a,material:i,footX:e,footZ:t,phase:r*1.7}),this.depthExclude.push(a)});let t=new Ar;t.setAttribute(`position`,new hr(new Float32Array(210),3)),this._moteColors=new Float32Array(210),t.setAttribute(`color`,new hr(this._moteColors,3));let n=new Ei({size:Cd,map:dd(),color:wd,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,sizeAttenuation:!0,fog:!1});this._motes=new ji(t,n),this._motes.frustumCulled=!1,this._moteBase=new Float32Array(210),this._movePhase=new Float32Array(140);for(let e=0;e<xd;e++){let t=Td[e%Td.length];this._moteBase[e*3]=t[0]+(Math.random()*2-1)*t[2],this._moteBase[e*3+1]=.6+Math.random()*Ed,this._moteBase[e*3+2]=t[1]+(Math.random()*2-1)*t[3],this._movePhase[e*2]=Math.random()*6.28,this._movePhase[e*2+1]=.4+Math.random()*.8}this._group.add(this._motes),this.depthExclude.push(this._motes),this._scene.add(this._group),this.setQuality(e.quality)}setQuality(e){let t=e===`high`;for(let e=0;e<this._shafts.length;e++)this._shafts[e].mesh.visible=t||e<bd;this._moteCount=t?xd:Sd,this._motes.geometry.setDrawRange(0,this._moteCount)}update(e,t){let n=this._axis,r=hd/2;for(let e=0;e<this._shafts.length;e++){let i=this._shafts[e];if(!i.mesh.visible)continue;let a=i.material.uniforms,o=Math.sin(t*vd+i.phase)*_d,s=Math.cos(t*vd*.7+i.phase*1.3)*_d*.6;a.uCenter.value.set(i.footX+o-n.x*r,-n.y*r,i.footZ+s-n.z*r),a.uTime.value=t}let i=this._motes.geometry.getAttribute(`position`),a=i.array,o=this._moteColors;for(let e=0;e<this._moteCount;e++){let n=this._movePhase[e*2],r=t*this._movePhase[e*2+1]+n;a[e*3]=this._moteBase[e*3]+Math.sin(r*.7)*1.4+Math.sin(r*.21+n)*2.2,a[e*3+1]=this._moteBase[e*3+1]+Math.sin(r*.9+1.3)*.5,a[e*3+2]=this._moteBase[e*3+2]+Math.cos(r*.6)*1.4;let i=.35+.65*(.5+.5*Math.sin(r*1.7));o[e*3]=i,o[e*3+1]=i*.92,o[e*3+2]=i*.75}i.needsUpdate=!0,this._motes.geometry.getAttribute(`color`).needsUpdate=!0}destroy(){for(let e of this._shafts)e.material.dispose();this._shaftGeo.dispose(),fd(this._motes),this._scene.remove(this._group),this._shafts.length=0,this.depthExclude.length=0}};function Ad(e){return new kd(e)}var jd={id:`original`,label:`Original`,createFloor:tu,createClassrooms:qu,getClassroomPositions:Ju,createRobot:Yu,createEnvironment:e=>new nd(e),createLights:(e,t)=>new rd(e,t),createBallVisual:cd,createGoalVisual:ld,createSignature:Ad,accent:16101441,post:{bloom:{strength:.25,radius:.5,threshold:.92},vignette:{offset:.55,darkness:.28},grain:.03,aberration:.0015,dof:{aperture:3e-4,maxblur:.004},pixel:{size:1,levels:0}},scene:{background:15787731,fogColor:15787731,fogNear:60,fogFar:120},renderer:{toneMapping:4,toneMappingExposure:1.2,shadowMapType:2}};function Y(e,t={}){return new q({color:e,flatShading:!0,roughness:.9,metalness:0,...t})}function Md(e){let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function Nd(){let e=new U,t=[],n=new G(new Wi(100,100),Y(15259304));n.rotation.x=-Math.PI/2,n.receiveShadow=!0,e.add(n),t.push({position:{x:0,y:-.5,z:0},size:{x:100,y:1,z:100}});let r=Y(13617080),i=new G(new Wi(5,60),eu(r,2));i.rotation.x=-Math.PI/2,i.position.set(0,$l.pad,-5),i.receiveShadow=!0,e.add(i);let a=Y(9425231),o=Y(8110147),s=[{x:-35,z:-35,w:20,h:18,mat:a},{x:35,z:-35,w:20,h:18,mat:o},{x:-38,z:35,w:16,h:16,mat:a},{x:38,z:35,w:16,h:16,mat:o},{x:-40,z:10,w:10,h:12,mat:a},{x:40,z:-10,w:10,h:12,mat:o},{x:0,z:40,w:25,h:12,mat:a},{x:0,z:-42,w:20,h:8,mat:o}];for(let t of s){let n=new G(new Wi(t.w,t.h),eu(t.mat,1));n.rotation.x=-Math.PI/2,n.position.set(t.x,$l.grass,t.z),n.receiveShadow=!0,e.add(n)}let c=Y(14471086);for(let t=-34;t<=20;t+=4){let n=new G(new K(.15,.01,1.5),eu(c,6));n.position.set(0,$l.marking-.005,t),n.receiveShadow=!0,e.add(n)}let l=Y(10134950);for(let n of[{pos:[0,1,50],size:[100,2,1]},{pos:[0,1,-50],size:[100,2,1]},{pos:[50,1,0],size:[1,2,100]},{pos:[-50,1,0],size:[1,2,100]}]){let r=new G(new K(n.size[0],n.size[1],n.size[2]),l);r.position.set(n.pos[0],n.pos[1],n.pos[2]),r.castShadow=!0,r.receiveShadow=!0,e.add(r),t.push({position:{x:n.pos[0],y:n.pos[1],z:n.pos[2]},size:{x:n.size[0],y:n.size[1],z:n.size[2]}})}return{meshGroup:e,physicsBodies:t}}var Pd=1450028,Fd=.06,Id=1725046,Ld=9208180,Rd=14932675,zd=2051705,Bd=16052194,Vd=1194063,Hd=2830134,Ud=16765562,Wd=11559487,Gd=5217610,Kd=9132587,qd=16119285,Jd=new Set([`plinth`,`blue`,`stone`,`frame`,`board`,`wood`,`pot`]),Yd=class{parts=new Map;mats=new Map;hulls=[];_m=new $t;_q=new At;_e=new un;material(e,t){this.mats.has(e)||this.mats.set(e,t())}geo(e,t,n,r,i,a=0){let o=t.index?t.toNonIndexed():t;o!==t&&t.dispose(),this._e.set(0,0,a),this._q.setFromEuler(this._e),this._m.compose(new V(n,r,i),this._q,new V(1,1,1)),o.applyMatrix4(this._m);let s=this.parts.get(e);s||this.parts.set(e,s=[]),s.push(o)}hull(e){let t=Fd,n=e.y-e.h/2,r=e.y+e.h/2,i=n>.01?n-t:n,a=new K(e.w+2*t,r+t-i,e.d+2*t).toNonIndexed();a.deleteAttribute(`normal`),a.deleteAttribute(`uv`),a.translate(e.x,(r+t+i)/2,e.z),this.hulls.push(a)}build(e){for(let[t,n]of this.parts){let r=Tu(n,!1);for(let e of n)e.dispose();let i=new G(r,this.mats.get(t));i.name=`bld-${t}`,i.receiveShadow=Jd.has(t),e.add(i)}if(this.hulls.length>0){let t=Tu(this.hulls,!1);for(let e of this.hulls)e.dispose();let n=new G(t,new si({color:Pd,side:1}));n.name=`bld-outline`,e.add(n)}}};function Xd(e,t){let n=t.role===`accent`?`accent-${t.accent}`:t.role;t.role===`bush`?e.geo(n,new Ui(t.w,0),t.x,t.y,t.z):e.geo(n,new K(t.w,t.h,t.d),t.x,t.y,t.z,t.rotZ??0)}function Zd(e){let t=new U;t.name=`lowpoly-building-details`;let n=new Yd,r=wu(e);n.material(`plinth`,()=>Y(Ld)),n.material(`blue`,()=>Y(Id)),n.material(`stone`,()=>Y(Rd)),n.material(`glass`,()=>Y(zd,{emissive:zd,emissiveIntensity:.3,roughness:.4})),n.material(`frame`,()=>Y(Bd)),n.material(`board`,()=>Y(Vd)),n.material(`metal`,()=>Y(Hd)),n.material(`bulb`,()=>Y(Ud,{emissive:Ud,emissiveIntensity:1.2})),n.material(`pot`,()=>Y(Wd)),n.material(`bush`,()=>Y(Gd)),n.material(`wood`,()=>Y(Kd)),n.material(`white`,()=>Y(qd));for(let e of r.accents)n.material(`accent-${e}`,()=>Y(e));for(let e of r.parts)Xd(n,e);for(let e of r.windows)for(let t of vu(e))Xd(n,t);for(let e of r.hulls)n.hull(e);n.build(t);let i=new G(new Wi(r.hero.w,r.hero.h),new si({map:ku(Ou)}));return i.position.set(r.hero.x,r.hero.y,r.hero.z),i.name=`bld-hero-face`,t.add(i),t}var Qd=[{name:`Desarrollo de Software`,color:2719929,x:-12,z:-16,facing:1},{name:`Mecatrónica`,color:15158332,x:-12,z:0,facing:1},{name:`Marketing Digital`,color:15105570,x:-12,z:16,facing:1},{name:`Inteligencia Artificial`,color:9323693,x:12,z:-8,facing:-1},{name:`Turismo y Hotelería`,color:2600544,x:12,z:8,facing:-1}],$d=4,ef=.3,tf=8,nf=8;function rf(e){let t=document.createElement(`canvas`);t.width=512,t.height=128;let n=t.getContext(`2d`);n.fillStyle=`rgba(0, 0, 0, 0)`,n.fillRect(0,0,512,128),n.font=`bold 48px Arial`,n.fillStyle=`#ffffff`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(e,256,64);let r=new ei(new Br({map:new Pi(t),transparent:!0,depthWrite:!1}));return r.scale.set(4,1,1),r}function af(e){let t=new U,n=new G(new K(3,$l.hallway,55),eu(Y(13617080),4));n.position.set(0,$l.hallway/2,-7.5),n.receiveShadow=!0,t.add(n);let r=Y(15259304);for(let n of e){let e=n.x+n.facing*(nf/2),i=Math.abs(e),a=e/2,o=new G(new K(i,$l.branch,2),eu(r,5));o.position.set(a,$l.branch/2,n.z),o.receiveShadow=!0,t.add(o);let s=new G(new Ri(.9,8),eu(Y(n.color),7));s.rotation.x=-Math.PI/2,s.position.set(e,$l.circle,n.z),s.receiveShadow=!0,t.add(s);let c=new G(new qi(1.1,.08,6,10),Y(n.color,{emissive:n.color,emissiveIntensity:.4}));c.rotation.x=-Math.PI/2,c.position.set(e,$l.ring,n.z),t.add(c)}return t}function of(e){let t=new U,n=Y(9139029);for(let r of[-2,0,2]){let i=new G(new K(1.8,.08,.9),n),a=e.z+r,o=e.x-e.facing*1.5;i.position.set(o,.75,a),i.castShadow=!0,i.receiveShadow=!0,t.add(i);let s=new K(.08,.7,.08),c=Y(5592405);for(let[e,n]of[[-.8,-.35],[.8,-.35],[-.8,.35],[.8,.35]]){let r=new G(s,c);r.position.set(o+e,.35,a+n),t.add(r)}}let r=e.x-e.facing*(nf/2),i=new G(new K(.05,1.8,4),Y(16119285));i.position.set(r+e.facing*.2,2.2,e.z),i.receiveShadow=!0,t.add(i);let a=Y(4473924),o=new G(new K(.06,.06,4.1),a);o.position.set(r+e.facing*.2,3.12,e.z),t.add(o);let s=new G(new K(.06,.06,4.1),a);return s.position.set(r+e.facing*.2,1.28,e.z),t.add(s),t}function sf(e,t,n,r,i,a,o){let s=new G(new K(r.x,$d,r.z),i);s.position.set(n.x,$d/2,n.z),s.castShadow=!0,s.receiveShadow=!0,e.add(s),t.push({position:{x:n.x,y:$d/2,z:n.z},size:{x:r.x,y:$d,z:r.z}}),o.push({x:n.x,z:n.z,sx:r.x,sz:r.z,...a})}function cf(){let e=new U,t=[],n=[],r=[],i=Y(15919832);for(let a of Qd){let o=new U,s=Y(a.color),c=a.x-a.facing*(nf/2),l=new G(new K(ef,$d,tf),s);l.position.set(c,$d/2,a.z),l.castShadow=!0,l.receiveShadow=!0,o.add(l),t.push({position:{x:c,y:$d/2,z:a.z},size:{x:ef,y:$d,z:tf}}),r.push({x:c,z:a.z,sx:ef,sz:tf,accent:a.color,mid:!1});let u=a.z-tf/2,d=new K(nf,$d,ef),f=new G(d,i);f.position.set(a.x,$d/2,u),f.castShadow=!0,f.receiveShadow=!0,o.add(f),t.push({position:{x:a.x,y:$d/2,z:u},size:{x:nf,y:$d,z:ef}}),r.push({x:a.x,z:u,sx:nf,sz:ef,mid:!0});let p=a.z+tf/2,m=new G(d,i);m.position.set(a.x,$d/2,p),m.castShadow=!0,m.receiveShadow=!0,o.add(m),t.push({position:{x:a.x,y:$d/2,z:p},size:{x:nf,y:$d,z:ef}}),r.push({x:a.x,z:p,sx:nf,sz:ef,mid:!0});let h=new Wi(7.5,7.5),g=new W(a.color);g.lerp(new W(16777215),.7);let _=new G(h,eu(Y(g),3));_.rotation.x=-Math.PI/2,_.position.set(a.x,$l.room,a.z),_.receiveShadow=!0,o.add(_);let v=rf(a.name),y=a.x+a.facing*(nf/2);v.position.set(y,5,a.z),o.add(v);let b=of(a);o.add(b),e.add(o);let x=a.x+a.facing*(nf/2);n.push({name:a.name,position:{x,y:$d/2,z:a.z},size:{x:2,y:$d,z:tf}})}let a=ef,o=[`+x`],s=[`-x`];sf(e,t,{x:-8,z:-8},{x:a,z:8},i,{mid:!0,windows:o},r),sf(e,t,{x:-8,z:8},{x:a,z:8},i,{mid:!0,windows:o},r),sf(e,t,{x:8,z:-16},{x:a,z:8},i,{mid:!0,windows:s},r),sf(e,t,{x:8,z:0},{x:a,z:8},i,{mid:!0,windows:s},r),sf(e,t,{x:8,z:16},{x:a,z:8},i,{mid:!0,windows:s},r),sf(e,t,{x:-16,z:-8},{x:a,z:8},i,{mid:!0},r),sf(e,t,{x:-16,z:8},{x:a,z:8},i,{mid:!0},r),sf(e,t,{x:16,z:-16},{x:a,z:8},i,{mid:!0},r),sf(e,t,{x:16,z:16},{x:a,z:8},i,{mid:!0},r),sf(e,t,{x:0,z:-20},{x:32,z:a},i,{mid:!0,windows:[`+z`]},r),sf(e,t,{x:-9,z:20},{x:14,z:a},i,{mid:!0,windows:[`+z`],openEnds:[`max`]},r),sf(e,t,{x:9,z:20},{x:14,z:a},i,{mid:!0,windows:[`+z`],openEnds:[`min`]},r),e.add(Zd({walls:r,rooms:Qd,wallHeight:$d,roomDepth:nf}));let c=af(Qd);return e.add(c),{meshGroup:e,physicsWalls:t,triggerZones:n}}function lf(){return Qd.map(e=>({x:e.x,z:e.z}))}function uf(){let e=new U,t=Y(16053488,{roughness:.8}),n=Y(2236962,{roughness:.85}),r=Y(3815994,{roughness:.85}),i=Y(9079434,{roughness:.9}),a=Y(3447003,{emissive:3447003,emissiveIntensity:.9}),o=(t,n,r,i,a,o=!0)=>{let s=new G(t,n);return s.position.set(r,i,a),s.castShadow=o,e.add(s),s};o(new zi(.6,.65,.05,8),i,0,.025,0);for(let e of[-1,1]){let i=e*.2;o(new K(.22,.1,.38),r,i,.1,.05),o(new zi(.075,.09,.55,6),t,i,.42,0),o(new Ui(.11,0),n,i,.75,0),o(new zi(.1,.08,.45,6),t,i,.98,0),o(new Ui(.12,0),n,i,1.22,0)}o(new K(.5,.22,.3),r,0,1.3,0),o(new K(.7,.5,.36),t,0,1.66,0),o(new K(.72,.03,.38),n,0,1.5,0,!1),o(new K(.03,.5,.38),n,0,1.66,0,!1),o(new qi(.11,.03,6,10),n,0,1.66,.19,!1),o(new Ui(.09,0),a,0,1.66,.19,!1);let s=new Ua(3447003,1,5);s.position.set(0,1.66,.35),e.add(s);for(let e of[-1,1]){let r=e*.47;o(new Ui(.12,0),n,r,1.85,0),o(new zi(.07,.06,.38,6),t,r,1.64,0),o(new Ui(.08,0),n,r,1.43,0),o(new zi(.06,.05,.34,6),t,r,1.24,0),o(new K(.08,.12,.1),t,r,1.03,0)}o(new zi(.05,.06,.12,6),n,0,1.97,0),o(new Ki(.2,7,5),t,0,2.08,0).scale.set(1,1.05,.95),o(new K(.41,.015,.01),n,0,2.15,.185,!1),o(new K(.015,.2,.01),n,0,2.1,.19,!1);let c=new Ui(.035,0);for(let e of[-1,1])o(c,a,e*.08,2.1,.18,!1);return{group:e,getBounceOffset:e=>Math.sin(e*2)*.03}}var df=class{group;constructor(e){this.group=new U,this.createSkyDome(),this.createTrees(),this.createBushes(),this.createWelcomeArch(),this.createAddressSign(),this.createRocks(),this.createClouds(),this.createHills(),e.add(this.group)}createSkyDome(){let e=new G(new Ki(150,24,16),new na({side:1,depthWrite:!1,uniforms:{band0:{value:new W(16507842)},band1:{value:new W(16307129)},band2:{value:new W(14014954)},band3:{value:new W(11129070)},band4:{value:new W(8370664)}},vertexShader:`
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 band0;
        uniform vec3 band1;
        uniform vec3 band2;
        uniform vec3 band3;
        uniform vec3 band4;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          vec3 color = band0;
          if (h > 0.08) color = band1;
          if (h > 0.2) color = band2;
          if (h > 0.4) color = band3;
          if (h > 0.65) color = band4;
          gl_FragColor = vec4(color, 1.0);
          #include <colorspace_fragment>
        }
      `}));this.group.add(e)}createTree(e,t,n,r){let i=new U,a=1.5*n,o=.15*n,s=new G(new zi(o*.7,o,a,6),Y(9263675));s.position.y=a/2,s.castShadow=!0,i.add(s);let c=[3050327,3843949],l=Y(c[Math.floor(r()*c.length)]),u=2.5*n,d=1.2*n;for(let[e,t,n]of[[1,.7,.3],[.75,.6,.62],[.5,.5,.92]]){let r=new G(new Bi(d*e,u*t,6),l);r.position.y=a+u*n,r.castShadow=!0,r.receiveShadow=!0,i.add(r)}i.position.set(e,0,t),i.rotation.y=r()*Math.PI*2;let f=.9+r()*.25;return i.scale.set(f,.9+r()*.3,f),i}createTrees(){let e=[[-40,-30,1.2],[-38,-18,.9],[-42,-5,1.4],[-36,10,1],[-40,22,1.3],[-44,35,.8],[-35,40,1.1],[40,-28,1.3],[38,-12,.9],[42,5,1.1],[36,18,1.4],[40,30,1],[44,42,.8],[-25,-42,1.2],[0,-44,.9],[25,-42,1.1],[-28,42,1],[5,44,1.3],[28,42,.8],[-30,38,1.1]],t=Md(1234);for(let[n,r,i]of e){let e=this.createTree(n,r,i,t);this.group.add(e)}}createBushes(){let e=Y(5025616),t=Y(4431943);for(let[n,r]of[[-32,-25],[-34,5],[32,-20],[34,15],[-20,-38],[20,-38],[-22,38],[22,38],[-30,30],[30,-30]]){let i=new U,a=Math.random()>.5?e:t,o=new G(new Hi(.6,0),a);o.position.y=.4,o.castShadow=!0,i.add(o);let s=new Hi(.45,0),c=new G(s,a);c.position.set(.5,.3,.2),c.castShadow=!0,i.add(c);let l=new G(s,a);l.position.set(-.4,.3,-.3),l.castShadow=!0,i.add(l),i.position.set(n,0,r),this.group.add(i)}}createWelcomeArch(){let e=new U,t=Y(1725046),n=new K(.4,4,.4),r=new G(n,t);r.position.set(-3,2,0),r.castShadow=!0,e.add(r);let i=new G(n,t);i.position.set(3,2,0),i.castShadow=!0,e.add(i);let a=new G(new K(6.8,.5,.5),t);a.position.set(0,4.25,0),a.castShadow=!0,e.add(a);let o=document.createElement(`canvas`);o.width=512,o.height=128;let s=o.getContext(`2d`);s.fillStyle=`rgba(0, 0, 0, 0)`,s.fillRect(0,0,512,128),s.font=`bold 56px Arial`,s.fillStyle=`#ffffff`,s.textAlign=`center`,s.textBaseline=`middle`,s.fillText(`ITEC Río Cuarto`,256,64);let c=new ei(new Br({map:new Pi(o),transparent:!0,depthWrite:!1}));c.scale.set(6,1.5,1),c.position.set(0,5.5,0),e.add(c),e.position.set(0,0,31),this.group.add(e)}createRocks(){let e=Md(77),t=[[-24,-12],[-27,14],[24,-14],[27,12],[-22,28],[22,26],[-30,-34],[30,-36],[-20,-30],[18,-40],[10,36],[-12,36]],n=[10132118,9079950,11579046,8159106];for(let[r,i]of t){let t=.5+e()*.9,a=new G(e()>.5?new Hi(1,0):new Ui(1,0),Y(n[Math.floor(e()*n.length)]));a.scale.set(t*(.9+e()*.5),t*(.6+e()*.4),t*(.9+e()*.5)),a.position.set(r,t*.35,i),a.rotation.set(e()*.5,e()*Math.PI*2,e()*.5),a.castShadow=!0,a.receiveShadow=!0,this.group.add(a)}}createClouds(){let e=Md(9),t=Y(16777215,{emissive:16777215,emissiveIntensity:.75,fog:!1});for(let n=0;n<6;n++){let r=new U,i=3+Math.floor(e()*2);for(let n=0;n<i;n++){let a=new G(new Ui(3+e()*2.5,0),t);a.position.set(n*4-i*2+e()*1.5,e()*1.5,e()*3-1.5),a.scale.y=.65,r.add(a)}let a=n/6*Math.PI*2+e()*.5,o=45+e()*40;r.position.set(Math.cos(a)*o,38+e()*14,Math.sin(a)*o),r.rotation.y=e()*Math.PI,this.group.add(r)}}createHills(){let e=Md(31),t=[8110147,9425231,7319610];for(let[n,r]of[[-64,-30],[-66,20],[64,-20],[66,34],[-30,-64],[20,-66],[34,64],[-40,66],[-62,58],[62,-62]]){let i=8+e()*6,a=new G(new Ui(i,0),Y(t[Math.floor(e()*t.length)]));a.scale.set(1.2,.45+e()*.2,1.2),a.position.set(n,-i*.1,r),a.rotation.y=e()*Math.PI,a.receiveShadow=!0,this.group.add(a)}}createAddressSign(){let e=new U,t=Y(7032634),n=Y(9136970),r=new G(new K(.6,.12,.6),t);r.position.y=.06,e.add(r);let i=new G(new zi(.09,.12,2.2,6),t);i.position.y=1.1,i.castShadow=!0,e.add(i);let a=new G(new K(ed.width+.2,ed.height+.2,.1),n);a.position.set(0,1.95,.13),a.rotation.z=.07,a.castShadow=!0,e.add(a);let o=new G(new Wi(ed.width,ed.height),Y(16777215,{map:td({background:`#f6edd6`,text:`#1a5276`,accent:`#e67e22`})}));o.position.set(0,1.95,.185),o.rotation.z=.07,e.add(o),e.position.set(Qu.x,Qu.y,Qu.z),e.rotation.y=$u,this.group.add(e)}destroy(){Zu(this.group)}},ff=class{ambient;directional;hemisphere;interiorLights=[];scene;constructor(e,t){if(this.scene=e,this.ambient=new qa(16777215,.35),this.hemisphere=new Da(12376319,8022607,.4),this.directional=new Ka(16773584,2.2),this.directional.position.set(15,25,10),this.directional.target.position.set(0,0,0),this.directional.castShadow=!0,this.directional.shadow.mapSize.set(2048,2048),this.directional.shadow.camera.near=.5,this.directional.shadow.camera.far=80,this.directional.shadow.camera.left=-40,this.directional.shadow.camera.right=40,this.directional.shadow.camera.top=40,this.directional.shadow.camera.bottom=-40,this.directional.shadow.normalBias=.02,e.add(this.ambient),e.add(this.hemisphere),e.add(this.directional),e.add(this.directional.target),t)for(let n of t){let t=new Ua(16755268,.3,15);t.position.set(n.x,3,n.z),e.add(t),this.interiorLights.push(t)}}destroy(){this.scene.remove(this.ambient,this.hemisphere,this.directional,this.directional.target),this.ambient.dispose(),this.directional.dispose(),this.hemisphere.dispose();for(let e of this.interiorLights)this.scene.remove(e),e.dispose();this.interiorLights=[]}};function pf(){let e=new G(new Ui(id,1),Y(16777215,{roughness:.8}));e.castShadow=!0;let t=Y(1118481),n=new Ki(id*1.003,5,2,0,Math.PI*2,0,.4),r=(1+Math.sqrt(5))/2,i=new V(0,1,0);for(let[a,o]of[[1,r],[1,-r],[-1,r],[-1,-r]])for(let r of[new V(0,a,o),new V(a,o,0),new V(o,0,a)]){let a=new G(n,t);a.quaternion.setFromUnitVectors(i,r.normalize()),e.add(a)}return e}function mf(){let e=new U,t=Y(16777215),n=new si({color:16777215,transparent:!0,opacity:.25,side:2}),r=12+od,i=12+od/2,a=(t,n,r,i)=>{let a=new G(new K(...t),r);a.position.set(...n),a.castShadow=i,e.add(a)};for(let e of[-36.5,-31.5])a([sd,ad,sd],[12,ad/2,e],t,!0);a([sd,sd,5],[12,ad,-34],t,!0),a([.05,ad,5],[r,ad/2,-34],n,!1);for(let e of[-36.5,-31.5])a([od,ad,.05],[i,ad/2,e],n,!1);return e}var hf=-30,gf=22,_f=6.5,vf=.1,yf=.025,bf=1,xf=8177906,Sf=14,Cf=40,wf=.32,Tf=[[-30,.5,22,30,3,.07],[0,.7,40,42,4,.05],[31,.55,-6,34,3.5,.06],[-28,.8,-22,36,3,.05],[30,.45,26,32,3,.08],[0,.9,-42,44,4,.04]],Ef=2,Df=16773596,Of=.34,kf=1450028,Af=1.05,jf=new V(0,0,31),Mf=.1,Nf=[[.4,4,.4,-3,2,0],[.4,4,.4,3,2,0],[6.8,.5,.5,0,4.25,0]],Pf=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ff=`
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  uniform float uSeed;
  varying vec2 vUv;
  ${ud}
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float edge = 1.0 - smoothstep(0.3, 1.0, d);
    float n = sigFbm(vUv * 4.5 + vec2(uTime * 0.025 + uSeed, uTime * 0.012));
    float a = edge * smoothstep(0.3, 0.8, n) * uOpacity;
    gl_FragColor = vec4(uColor, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;function If(e,t,n,r){return yf*r*(Math.sin(e*.9+n*1.3)+Math.sin(t*1.1-n)+.6*Math.sin((e+t)*.6+n*1.7))}function Lf(e,t){e.updateWorldMatrix(!0,!0);let n=new $t().copy(e.matrixWorld).invert(),r=new $t,i=new $t().makeScale(t,t,t),a=[];if(e.traverse(e=>{let t=e;if(!t.isMesh||!t.visible||t.material.transparent)return;let o=t.geometry.index?t.geometry.toNonIndexed():t.geometry.clone();for(let e of Object.keys(o.attributes))e!==`position`&&o.deleteAttribute(e);r.multiplyMatrices(n,t.matrixWorld).multiply(i),o.applyMatrix4(r),a.push(o)}),a.length===0)return null;let o=Tu(a,!1);for(let e of a)e.dispose();return o}function Rf(){let e=Nf.map(([e,t,n,r,i,a])=>{let o=new K(e+Mf,t+Mf,n+Mf).toNonIndexed();return o.deleteAttribute(`normal`),o.deleteAttribute(`uv`),o.translate(r,i,a),o}),t=Tu(e,!1);for(let t of e)t.dispose();return t}var zf=class{_scene;_ctx;_group=new U;_waterGeo;_waterMesh;_waterXZ;_waterFade;_glints;_glintBase;_glintPhase;_glintColors;_pondParts=[];_mistGeo=new Wi(1,1).rotateX(-Math.PI/2);_mist=[];_outlineMat=new si({color:kf,side:1});_robotOutline=null;_archOutline=null;_robotRef=null;constructor(e){this._ctx=e,this._scene=e.scene,this._group.position.set(0,0,0);let t=Sf;this._waterGeo=new Wi(2,2,t,t).rotateX(-Math.PI/2);let n=this._waterGeo.getAttribute(`position`);this._waterXZ=new Float32Array(n.count*2),this._waterFade=new Float32Array(n.count);for(let e=0;e<n.count;e++){let t=n.getX(e),r=n.getZ(e),i=_f*t*Math.sqrt(1-r*r/2),a=_f*r*Math.sqrt(1-t*t/2);this._waterXZ[e*2]=i,this._waterXZ[e*2+1]=a;let o=Math.hypot(i,a)/_f;this._waterFade[e]=1-kt.smoothstep(o,.75,1),n.setXYZ(e,i,0,a)}let r=new q({color:xf,emissive:1920890,emissiveIntensity:.3,roughness:.28,metalness:.05,flatShading:!0,transparent:!0,opacity:.86});this._waterMesh=new G(this._waterGeo,r),this._waterMesh.position.set(hf,vf,gf),this._waterMesh.receiveShadow=!0,this._waterMesh.frustumCulled=!1,this._group.add(this._waterMesh);let i=new G(new Ri(_f*.98,20),Y(3108767,{roughness:1}));i.rotation.x=-Math.PI/2,i.position.set(hf,.04,gf),i.receiveShadow=!0;let a=new G(new Gi(6.05,7.4,20,1),Y(14271898,{roughness:1}));a.rotation.x=-Math.PI/2,a.position.set(hf,.06,gf),a.receiveShadow=!0,this._group.add(i,a),this._pondParts.push(i,a);let o=new Ar;o.setAttribute(`position`,new hr(new Float32Array(120),3)),this._glintColors=new Float32Array(120),o.setAttribute(`color`,new hr(this._glintColors,3)),this._glints=new ji(o,new Ei({size:wf,map:dd(),color:16777215,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,sizeAttenuation:!0})),this._glints.frustumCulled=!1,this._glintBase=new Float32Array(80),this._glintPhase=new Float32Array(80);for(let e=0;e<Cf;e++){let t=Math.random()*Math.PI*2,n=Math.sqrt(Math.random())*_f*.85;this._glintBase[e*2]=Math.cos(t)*n,this._glintBase[e*2+1]=Math.sin(t)*n,this._glintPhase[e*2]=Math.random()*6.28,this._glintPhase[e*2+1]=1.2+Math.random()*2.2}this._group.add(this._glints),Tf.forEach(([e,t,n,r,i,a],o)=>{let s=new na({uniforms:{uColor:{value:new W(Df)},uOpacity:{value:Of},uTime:{value:0},uSeed:{value:o*5.3}},vertexShader:Pf,fragmentShader:Ff,transparent:!0,depthWrite:!1,fog:!1}),c=new G(this._mistGeo,s);c.scale.set(r,1,r),c.position.set(e,t,n),c.renderOrder=1,c.frustumCulled=!1,this._group.add(c),this._mist.push({mesh:c,material:s,baseX:e,baseZ:n,amplitude:i,speed:a,phase:o*2.1})}),this._scene.add(this._group),this._applyWaves(0),this.setQuality(e.quality)}setQuality(e){let t=e===`high`;for(let e=0;e<this._mist.length;e++)this._mist[e].mesh.visible=t||e<Ef;this._setOutlines(t)}_setOutlines(e){if(e&&!this._robotOutline){let e=this._ctx.getRobot(),t=Lf(e,Af);t&&(this._robotOutline=new G(t,this._outlineMat),this._robotOutline.frustumCulled=!1,this._robotRef=e,this._scene.add(this._robotOutline)),this._archOutline=new G(Rf(),this._outlineMat),this._archOutline.position.copy(jf),this._scene.add(this._archOutline)}else if(!e){for(let e of[this._robotOutline,this._archOutline])e&&(e.parent?.remove(e),e.geometry.dispose());this._robotOutline=null,this._archOutline=null,this._robotRef=null}}_applyWaves(e){let t=e*bf,n=this._waterGeo.getAttribute(`position`),r=n.array;for(let e=0;e<n.count;e++){let n=this._waterXZ[e*2],i=this._waterXZ[e*2+1];r[e*3+1]=If(n,i,t,this._waterFade[e])}n.needsUpdate=!0;let i=this._glints.geometry.getAttribute(`position`),a=i.array;for(let n=0;n<Cf;n++){let r=this._glintBase[n*2],i=this._glintBase[n*2+1];a[n*3]=hf+r,a[n*3+1]=.15000000000000002+If(r,i,t,1),a[n*3+2]=gf+i;let o=Math.sin(e*this._glintPhase[n*2+1]+this._glintPhase[n*2]),s=Math.max(o,0)**6;this._glintColors[n*3]=s*.9,this._glintColors[n*3+1]=s,this._glintColors[n*3+2]=s}i.needsUpdate=!0,this._glints.geometry.getAttribute(`color`).needsUpdate=!0}update(e,t){this._applyWaves(t);for(let e=0;e<this._mist.length;e++){let n=this._mist[e];if(!n.mesh.visible)continue;let r=t*n.speed+n.phase;n.mesh.position.x=n.baseX+Math.sin(r)*n.amplitude,n.mesh.position.z=n.baseZ+Math.cos(r*.8)*n.amplitude*.7,n.material.uniforms.uTime.value=t}this._robotOutline&&this._robotRef&&(this._robotOutline.position.copy(this._robotRef.position),this._robotOutline.quaternion.copy(this._robotRef.quaternion))}destroy(){this._setOutlines(!1),this._outlineMat.dispose(),this._waterGeo.dispose(),this._waterMesh.material.dispose();for(let e of this._pondParts)e.geometry.dispose(),e.material.dispose();fd(this._glints);for(let e of this._mist)e.material.dispose();this._mistGeo.dispose(),this._scene.remove(this._group),this._mist.length=0}};function Bf(e){return new zf(e)}var Vf={id:`lowpoly`,label:`Low-Poly`,createFloor:Nd,createClassrooms:cf,getClassroomPositions:lf,createRobot:uf,createEnvironment:e=>new df(e),createLights:(e,t)=>new ff(e,t),createBallVisual:pf,createGoalVisual:mf,createSignature:Bf,accent:2719929,post:{bloom:{strength:.2,radius:.4,threshold:.95},vignette:{offset:.6,darkness:.2},grain:.015,aberration:8e-4,dof:{aperture:0,maxblur:0},pixel:{size:1,levels:0}},scene:{background:16507842,fogColor:16507842,fogNear:60,fogFar:120},renderer:{toneMapping:0,toneMappingExposure:1,shadowMapType:1}},Hf={value:1},Uf=1,Wf=.3,Gf=.3,Kf=.1,qf=14,Jf=55,Yf=.78,Xf=.45,Zf=`
  uniform float uBuild;
  attribute vec3 aVoxel;
  float bHash(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.x + p.y) * p.z);
  }
`,Qf=`
  #include <begin_vertex>
  if (uBuild < 0.9999) {
    // Cell of the voxel this vertex belongs to (its center is baked per vertex, so a voxel never tears)
    vec3 bCell = floor(aVoxel / ${Uf.toFixed(2)});
    float bDelay = ${Wf.toFixed(2)} * clamp(bCell.y / ${qf.toFixed(1)}, 0.0, 1.0)
                 + ${Gf.toFixed(2)} * clamp(length(bCell.xz) / ${Jf.toFixed(1)}, 0.0, 1.0)
                 + ${Kf.toFixed(2)} * bHash(bCell);
    float bT = clamp((uBuild - bDelay) / ${.29999999999999993.toFixed(2)}, 0.0, 1.0);
    float bFall = clamp(bT / ${Yf.toFixed(2)}, 0.0, 1.0);
    float bTb = clamp((bT - ${Yf.toFixed(2)}) / ${.21999999999999997.toFixed(2)}, 0.0, 1.0);
    // Gravity-like fall, then a small damped hop on landing
    transformed.y += ${26 .toFixed(1)} * (1.0 - bFall * bFall)
                   + ${Xf.toFixed(2)} * sin(3.14159265 * bTb) * (1.0 - 0.5 * bTb);
  }
`;function $f(e){return e.onBeforeCompile=e=>{e.uniforms.uBuild=Hf,e.vertexShader=Zf+e.vertexShader.replace(`#include <begin_vertex>`,Qf)},e.customProgramCacheKey=()=>`voxel-build-in`,e}var ep={PX:1,NX:2,PY:4,NY:8,PZ:16,NZ:32},tp=63&~ep.NY,np=ep.PY;function rp(e,t){let n=Math.min(255,Math.round((e>>16&255)*t)),r=Math.min(255,Math.round((e>>8&255)*t)),i=Math.min(255,Math.round((e&255)*t));return n<<16|r<<8|i}function ip(e,t,n){let r=e>>16&255,i=e>>8&255,a=e&255,o=t>>16&255,s=t>>8&255,c=t&255;return Math.round(r+(o-r)*n)<<16|Math.round(i+(s-i)*n)<<8|Math.round(a+(c-a)*n)}var ap=$f(new ia({vertexColors:!0})),op=new ia({vertexColors:!0});function sp(e={},t=!0){let n=new si({vertexColors:!0,...e});return t?$f(n):n}var cp=class{positions=[];normals=[];colors=[];centers=[];cur=[0,0,0];indices=[];vertexCount=0;rand;tmp=new W;jitter;constructor(e=1,t=.06){this.rand=Md(e),this.jitter=t}get isEmpty(){return this.vertexCount===0}box(e,t,n,r,i,a,o,s=tp){if(s===0)return this;this.cur=[e,t,n];let c=1+(this.rand()*2-1)*this.jitter;this.tmp.setHex(o);let l=this.tmp.r*c,u=this.tmp.g*c,d=this.tmp.b*c,f=e-r/2,p=e+r/2,m=t-i/2,h=t+i/2,g=n-a/2,_=n+a/2;return s&ep.PX&&this.quad([p,m,_],[p,m,g],[p,h,g],[p,h,_],1,0,0,l,u,d),s&ep.NX&&this.quad([f,m,g],[f,m,_],[f,h,_],[f,h,g],-1,0,0,l,u,d),s&ep.PY&&this.quad([f,h,_],[p,h,_],[p,h,g],[f,h,g],0,1,0,l,u,d),s&ep.NY&&this.quad([f,m,g],[p,m,g],[p,m,_],[f,m,_],0,-1,0,l,u,d),s&ep.PZ&&this.quad([f,m,_],[p,m,_],[p,h,_],[f,h,_],0,0,1,l,u,d),s&ep.NZ&&this.quad([p,m,g],[f,m,g],[f,h,g],[p,h,g],0,0,-1,l,u,d),this}fill(e,t,n,r,i,a,o,s,c={}){let[l,u,d]=typeof o==`number`?[o,o,o]:o,f=Math.max(1,Math.round(r/l)),p=Math.max(1,Math.round(i/u)),m=Math.max(1,Math.round(a/d)),h=r/f,g=i/p,_=a/m,v=c.faces??tp,y=c.inset??0,b=h-y,x=g-y,S=_-y;for(let o=0;o<f;o++)for(let c=0;c<p;c++)for(let l=0;l<m;l++){let u=0;if(y>0?u=63:(o===f-1&&(u|=ep.PX),o===0&&(u|=ep.NX),c===p-1&&(u|=ep.PY),c===0&&(u|=ep.NY),l===m-1&&(u|=ep.PZ),l===0&&(u|=ep.NZ)),u&=v,u===0)continue;let d=typeof s==`number`?s:s(o,c,l);this.box(e-r/2+h*(o+.5),t-i/2+g*(c+.5),n-a/2+_*(l+.5),b,x,S,d,u)}return this}random(){return this.rand()}build(e={}){let t=new Ar;t.setAttribute(`position`,new vr(this.positions,3)),t.setAttribute(`normal`,new vr(this.normals,3)),t.setAttribute(`color`,new vr(this.colors,3)),t.setAttribute(`aVoxel`,new vr(this.centers,3)),t.setIndex(this.vertexCount>65535?new _r(this.indices,1):new gr(this.indices,1)),t.computeBoundingSphere(),t.computeBoundingBox();let n=new G(t,e.material??ap);return n.castShadow=e.castShadow??!0,n.receiveShadow=e.receiveShadow??!0,n}quad(e,t,n,r,i,a,o,s,c,l){let u=this.vertexCount;for(let u of[e,t,n,r])this.positions.push(u[0],u[1],u[2]),this.normals.push(i,a,o),this.colors.push(s,c,l),this.centers.push(this.cur[0],this.cur[1],this.cur[2]);this.indices.push(u,u+1,u+2,u,u+2,u+3),this.vertexCount+=4}},lp=[15259304,14864285],up=[9425231,8702022],dp=[8110147,7518011],fp=[14209474,13485492],pp=[{x:-35,z:-35,w:20,h:18,tones:up},{x:35,z:-35,w:20,h:18,tones:dp},{x:-38,z:35,w:16,h:16,tones:up},{x:38,z:35,w:16,h:16,tones:dp},{x:-40,z:10,w:10,h:12,tones:up},{x:40,z:-10,w:10,h:12,tones:dp},{x:0,z:40,w:25,h:12,tones:up},{x:0,z:-42,w:20,h:8,tones:dp}];function mp(){let e=new U,t=[],n=new cp(11,.05),r=new cp(10,.05);r.box(0,-.3,0,100,.5,100,12166519),e.add(r.build({material:op,castShadow:!1,receiveShadow:!0}));let i=.94;for(let e=-49;e<=49;e++)for(let t=-49;t<=49;t++){let r=lp;for(let n of pp)if(Math.abs(e-n.x)<=n.w/2&&Math.abs(t-n.z)<=n.h/2){r=n.tones;break}Math.abs(e)<=2&&t>=-35&&t<=24&&(r=fp);let a=r[e+t&1?1:0];n.box(e,-.05,t,i,.1,i,a,np)}e.add(n.build({castShadow:!1,receiveShadow:!0})),t.push({position:{x:0,y:-.5,z:0},size:{x:100,y:1,z:100}});let a=10134950,o=[{pos:[0,1,50],size:[100,2,1]},{pos:[0,1,-50],size:[100,2,1]},{pos:[50,1,0],size:[1,2,100]},{pos:[-50,1,0],size:[1,2,100]}],s=new cp(12,.04);for(let e of o){let n=e.size[0]>e.size[2];s.fill(e.pos[0],e.pos[1],e.pos[2],e.size[0],e.size[1],e.size[2],1,(e,t,r)=>{let i=n?e:r;return t===1?i&1?a:11450553:i+t&1?8687505:a}),t.push({position:{x:e.pos[0],y:e.pos[1],z:e.pos[2]},size:{x:e.size[0],y:e.size[1],z:e.size[2]}})}return e.add(s.build()),{meshGroup:e,physicsBodies:t}}var X=.25,hp=.38,gp=2043712,_p=.125,vp=304,yp={plinth:10129280,blue:2056075,stone:15261640,glass:1784419,frame:16052194,board:1194063,metal:3817288,pot:11559487,wood:9132587,white:16119285},bp=16765562,xp=5217610,Sp=3811866,Cp=2906764;function wp(e,t){if(t<hp)return[Math.round(e/(X/2))*(X/2),X];let n=Math.round((e-t/2)/X)*X,r=Math.round((e+t/2)/X)*X;return r-n<X&&(r=n+X),[(n+r)/2,r-n]}function Tp(e){let[t,n]=wp(e.x,e.w),[r,i]=wp(e.y,e.h),[a,o]=wp(e.z,e.d);return{cx:t,cy:r,cz:a,sx:n,sy:i,sz:o}}function Ep(e){return e>=1?.5:X}function Dp(e,t,n){let r=rp(n,.94);e.fill(t.cx,t.cy,t.cz,t.sx,t.sy,t.sz,[Ep(t.sx),Ep(t.sy),Ep(t.sz)],(e,t,i)=>e+t+i&1?r:n)}function Op(e,t){let n=t.cy+t.sy/2;kp(e.solid,t.cx,n+_p/2,t.cz,t.sx,t.sz)}function kp(e,t,n,r,i,a){e.fill(t,n,r,i,_p,a,[Ep(i),_p,Ep(a)],gp)}function Ap(e,t){let n=t.face[0]===`+`?1:-1,r=t.face[1]===`x`,i=t.thick/2,a=(e,i,a,o,s,c,l,u)=>{let d=t.t+(i+a)/2,f=n*(c+l)/2,p=a-i,m=l-c,h=s-o,g=(o+s)/2,_=rp(u,.92),v=(e,t,n)=>e+t+n&1?_:u;r?e.fill(t.wallX+f,g,t.wallZ+d,m,h,p,X,v):e.fill(t.wallX+d,g,t.wallZ+f,p,h,m,X,v)};a(e.solid,-.5,.5,1.75,3,i-.2,i+.05,Cp),a(e.solid,-.5,.5,1.75,2.5,i-.2,i+.05,yp.glass);let o=yp.frame;a(e.solid,-.625,-.375,1.75,3,i-.05,i+.25,o),a(e.solid,.375,.625,1.75,3,i-.05,i+.25,o),a(e.solid,-.875,.875,3,3.25,i-.05,i+.25,o),a(e.solid,-.875,.875,1.5,1.75,i-.05,i+.3,o)}function jp(e,t){let n=t.facing??1,r=t.accent??2719929,i=t.x-n*(lu.awningDepth/2-.05),a=wp(t.y,.25)[0],[o,s]=wp(t.z,t.d);for(let t=0;t<4;t++){let c=i+n*(X/2+t*X),l=a-t*.125;Dp(e.solid,{cx:c,cy:l,cz:o,sx:X,sy:X,sz:s},t&1?r:ip(r,16777215,.12))}}function Mp(e,t,n){let r=Math.round(t.x/(X/2))*(X/2),i=Math.round(t.z/(X/2))*(X/2),a=Math.sign(n.z-t.z)||1,o=i+a*.5;Dp(e.solid,{cx:r,cy:1,cz:i,sx:X,sy:2,sz:X},yp.metal),Dp(e.solid,{cx:r,cy:2.125,cz:i+a*.25,sx:X,sy:X,sz:.75},yp.metal),e.glow.box(r,1.875,o,X,X,X,bp)}function Np(e,t){let n=t.w,r=Math.max(2,Math.round(n/.2)),i=Math.max(X,Math.round(2*n/X)*X),a=Math.round((t.y-n*.6)/X)*X;for(let n=0;n<r;n++){let r=Math.max(X,i-n*X);Dp(e.solid,{cx:t.x,cy:a+X/2+n*X,cz:t.z,sx:r,sy:X,sz:r},n&1?rp(xp,1.12):xp)}}function Pp(e,t){let n=Tp(t),r=e.solid;switch(t.tag){case`plinth`:case`cornice`:(n.sx>=n.sz?`x`:`z`)==`x`?n.sx+=.04:n.sz+=.04,Dp(r,n,t.role===`accent`?t.accent:yp[t.role]),t.tag===`cornice`&&Op(e,n);return;case`cap`:case`gate-cap`:Dp(r,n,yp.blue),Op(e,n);return;case`board`:Dp(r,n,yp.board),Op(e,n);return;case`lintel`:Dp(r,n,t.accent);return;case`plate`:{let[e,i]=wp(t.y,t.h);Dp(r,{cx:n.cx,cy:e,cz:n.cz,sx:.5,sy:i,sz:n.sz},yp.board);return}case`plate-border`:{let[e,i]=wp(t.y,t.h+.4),[a,o]=wp(t.z,t.d+.4);Dp(r,{cx:n.cx,cy:e,cz:a,sx:X,sy:i,sz:o},t.accent);return}case`planter`:if(t.role===`bush`)return Np(e,t);Dp(r,n,t.role===`metal`?Sp:yp.pot);return;case`flag`:t.role===`bulb`?e.glow.box(n.cx,n.cy,n.cz,X,X,X,bp):t.role===`white`?Dp(r,{...n,sz:n.sz+.06},yp.white):Dp(r,n,yp[t.role]);return;default:Dp(r,n,yp[t.role])}}function Fp(e){let t=new U;t.name=`voxel-building-details`;let n={solid:new cp(31,.05),glow:new cp(32,.03)},r=wu(e),i=null;for(let e of r.parts)e.role===`accent`&&e.tag===`cornice`?Pp(n,e):e.tag===`awning`?jp(n,e):e.tag===`lamp-post`?i=e:e.tag===`lamp-bulb`&&i?Mp(n,i,e):e.tag===`lamp-arm`||e.tag===`lamp-cap`||Pp(n,e);for(let e of r.windows)Ap(n,e);t.add(n.solid.build()),t.add(n.glow.build({material:sp(),castShadow:!1,receiveShadow:!1}));let a=r.parts.find(e=>e.tag===`board`&&e.w>3);if(a){let e=Tp(a),n=e.sx-.2,r=new Wi(n,n/4),i=[e.cx,e.cy,e.cz+e.sz/2+.01],o=new Float32Array(12);for(let e=0;e<4;e++)o.set(i,e*3);r.setAttribute(`aVoxel`,new hr(o,3));let s=new G(r,$f(new si({map:ku(Ou,{width:vp,pixelated:!0})})));s.position.set(i[0],i[1],i[2]),s.name=`bld-hero-face`,t.add(s)}return t}var Ip=[{name:`Desarrollo de Software`,color:2719929,x:-12,z:-16,facing:1},{name:`Mecatrónica`,color:15158332,x:-12,z:0,facing:1},{name:`Marketing Digital`,color:15105570,x:-12,z:16,facing:1},{name:`Inteligencia Artificial`,color:9323693,x:12,z:-8,facing:-1},{name:`Turismo y Hotelería`,color:2600544,x:12,z:8,facing:-1}],Lp=4,Rp=.3,zp=8,Bp=8;function Vp(e){let t=document.createElement(`canvas`);t.width=512,t.height=128;let n=t.getContext(`2d`);n.fillStyle=`rgba(0, 0, 0, 0)`,n.fillRect(0,0,512,128),n.font=`bold 48px Arial`,n.fillStyle=`#ffffff`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(e,256,64);let r=new ei(new Br({map:new Pi(t),transparent:!0,depthWrite:!1}));return r.scale.set(4,1,1),r}function Hp(e,t){let n=.08,r=.12,i=.16;e.solid.fill(0,n/2,-7.5,3,n,55,[1,n,1],(e,t,n)=>e+n&1?13617080:12827561);for(let n of t){let t=n.x+n.facing*(Bp/2),a=Math.abs(t),o=t/2;e.solid.fill(o,r/2,n.z,a,r,3,[1,r,1],(e,t,n)=>e+n&1?15259304:14469528);let s=ip(n.color,16777215,.18);e.solid.fill(t,i/2,n.z,3,i,3,[1,i,1],(e,t,r)=>e+r&1?n.color:s);let c=ip(n.color,16777215,.35),l=.5;for(let r=-4;r<=4;r++)for(let i=-4;i<=4;i++)(Math.abs(r)===4||Math.abs(i)===4)&&e.glow.box(t+r*l,.1,n.z+i*l,l,.2,l,c)}}function Up(e,t){for(let n of[-2,0,2]){let r=t.z+n,i=t.x-t.facing*1.5;e.solid.fill(i,.75,r,2,.5,1,.5,(e,t,n)=>e+n&1?9139029:10256994);for(let[t,n]of[[-.75,-.25],[.75,-.25],[-.75,.25],[.75,.25]])e.solid.box(i+t,.25,r+n,.5,.5,.5,5592405);e.solid.box(i,1.125,r,.5,.25,.5,7829367),e.solid.box(i-t.facing*.1,1.5,r,.1,.5,.75,2306367)}let n=t.x-t.facing*(Bp/2)+t.facing*.3;e.solid.fill(n,2.25,t.z,.25,1.5,4,.5,(e,t)=>e+t&1?16119285:15330026);let r=4473924;e.solid.fill(n,3.25,t.z,.3,.5,5,.5,r),e.solid.fill(n,1.25,t.z,.3,.5,5,.5,r);for(let i of[-2.25,2.25])e.solid.fill(n,2.25,t.z+i,.3,1.5,.5,.5,r);let i=n+t.facing*.14;e.solid.box(i,2.5,t.z-1.25,.06,.5,1.5,t.color),e.solid.box(i,2,t.z+.5,.06,.5,2.5,rp(t.color,.85))}function Wp(e,t,n,r,i,a,o,s){let c=r.x>r.z;e.solid.fill(n.x,Lp/2,n.z,r.x,Lp,r.z,1,(e,t,n)=>(c?e:n)+t&1?a:i),t.push({position:{x:n.x,y:Lp/2,z:n.z},size:{x:r.x,y:Lp,z:r.z}}),s.push({x:n.x,z:n.z,sx:r.x,sz:r.z,...o})}function Gp(){let e=new U,t=[],n=[],r=[],i={solid:new cp(21,.05),glow:new cp(22,.03)},a=15919832,o=15129796;for(let s of Ip){Wp(i,t,{x:s.x-s.facing*(Bp/2),z:s.z},{x:Rp,z:zp},s.color,rp(s.color,.88),{accent:s.color,mid:!1},r),Wp(i,t,{x:s.x,z:s.z-zp/2},{x:Bp,z:Rp},a,o,{mid:!0},r),Wp(i,t,{x:s.x,z:s.z+zp/2},{x:Bp,z:Rp},a,o,{mid:!0},r);let c=ip(s.color,16777215,.7),l=ip(s.color,16777215,.8);i.solid.fill(s.x,.02,s.z,7,.04,7,[1,.04,1],(e,t,n)=>e+n&1?c:l);let u=Vp(s.name),d=s.x+s.facing*(Bp/2);u.position.set(d,5,s.z),e.add(u),Up(i,s);let f=s.x+s.facing*(Bp/2);n.push({name:s.name,position:{x:f,y:Lp/2,z:s.z},size:{x:2,y:Lp,z:zp}})}let s=Rp,c=[`+x`],l=[`-x`],u=(e,n,s,c,l)=>Wp(i,t,{x:e,z:n},{x:s,z:c},a,o,l,r);return u(-8,-8,s,8,{mid:!0,windows:c}),u(-8,8,s,8,{mid:!0,windows:c}),u(8,-16,s,8,{mid:!0,windows:l}),u(8,0,s,8,{mid:!0,windows:l}),u(8,16,s,8,{mid:!0,windows:l}),u(-16,-8,s,8,{mid:!0}),u(-16,8,s,8,{mid:!0}),u(16,-16,s,8,{mid:!0}),u(16,16,s,8,{mid:!0}),u(0,-20,32,s,{mid:!0,windows:[`+z`]}),u(-9,20,14,s,{mid:!0,windows:[`+z`],openEnds:[`max`]}),u(9,20,14,s,{mid:!0,windows:[`+z`],openEnds:[`min`]}),e.add(Fp({walls:r,rooms:Ip,wallHeight:Lp,roomDepth:Bp})),Hp(i,Ip),e.add(i.solid.build()),e.add(i.glow.build({material:sp(),castShadow:!1,receiveShadow:!1})),{meshGroup:e,physicsWalls:t,triggerZones:n}}function Kp(){return Ip.map(e=>({x:e.x,z:e.z}))}var qp=.2,Jp=.1,Yp=16053488,Xp=2236962,Zp=3815994,Qp=9079434,$p=3447003;function em(){let e=new U,t=new cp(404,.03),n=new cp(405,0),r=(e,t,n,r,i,a,o,s)=>{e.box((t+i/2)*qp,Jp+(n+a/2)*qp,(r+o/2)*qp,i*qp,a*qp,o*qp,s,63)};t.box(0,Jp/2,0,6*qp,Jp,6*qp,Qp);for(let e of[-1,1]){let n=e===-1?-2:1;r(t,n,0,-1.5,1,1,4,Zp),r(t,n,1,-1,1,1,2,Yp),r(t,n,2,-1,1,1,2,Xp),r(t,n,3,-1,1,1,2,Yp)}r(t,-2,4,-1.5,4,1,3,Zp),r(t,-2,5,-1.5,4,3,3,Yp),r(t,-2,5,-1.5,4,.5,3.05,Xp),r(t,-.25,6,-1.55,.5,2,.05,Xp),r(t,-1.5,5.5,1.5,3,2.5,.25,Xp);for(let e of[-1,0])for(let t of[6,7])r(n,e,t-.25,1.5,1,1,.5,$p);for(let e of[-1,1]){let n=e===-1?-3:2;r(t,n,7,-.5,1,1,1,Xp),r(t,n,6,-.5,1,1,1,Yp),r(t,n,5,-.5,1,1,1,Xp),r(t,n,4,-.5,1,1,1,Yp),r(t,n,3,-.5,1,1,1,Yp)}r(t,-1,8,-1,2,1,2,Xp),r(t,-2,9,-2,4,2,4,Yp),r(t,-2,9.5,1.9,4,1,.15,Xp);for(let e of[-1.5,.5])r(n,e,9.5,2,1,1,.5,$p);let i=t.build({material:op,castShadow:!0,receiveShadow:!1});e.add(i);let a=n.build({material:sp({},!1),castShadow:!1,receiveShadow:!1});e.add(a);let o=new Ua(3447003,1,5);return o.position.set(0,1.4000000000000001,.6),e.add(o),{group:e,getBounceOffset:e=>Math.sin(e*2)*.03}}var tm=class{group;constructor(e){this.group=new U,this.createSkyDome(),this.createTrees(),this.createBushes(),this.createWelcomeArch(),this.createAddressSign(),this.createRocks(),this.createClouds(),this.createHills(),e.add(this.group)}createSkyDome(){let e=new G(new K(2,2,2),new na({side:1,depthWrite:!1,uniforms:{band0:{value:new W(14086143)},band1:{value:new W(12116735)},band2:{value:new W(9687803)},band3:{value:new W(7323123)},band4:{value:new W(4892392)}},vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = position;
          vec4 pos = projectionMatrix * mat4(mat3(viewMatrix)) * vec4(position, 1.0);
          gl_Position = pos.xyww;
        }
      `,fragmentShader:`
        uniform vec3 band0;
        uniform vec3 band1;
        uniform vec3 band2;
        uniform vec3 band3;
        uniform vec3 band4;
        varying vec3 vDir;
        void main() {
          float h = normalize(vDir).y;
          vec3 color = band0;
          if (h > 0.08) color = band1;
          if (h > 0.2) color = band2;
          if (h > 0.4) color = band3;
          if (h > 0.65) color = band4;
          gl_FragColor = vec4(color, 1.0);
          #include <colorspace_fragment>
        }
      `}));e.frustumCulled=!1,e.renderOrder=-1,this.group.add(e)}addTree(e,t,n,r,i){let a=.5,o=Math.round(t),s=Math.round(n),c=Math.max(2,Math.round(3*r))*a,l=[9263675,8212018];e.fill(o,c/2,s,1,c,1,a,(e,t)=>l[t&1]);let u=i()>.5?[3050327,3843949]:[3843949,5028479],d=2*Math.max(2,Math.round(2.4*r)),f=d>=6?[d,d-2,2]:[d,2],p=c-a;for(let t of f){let n=t*a;e.fill(o,p+.5,s,n,1,n,a,(e,t,n)=>u[e+t+n&1]),p+=1}}createTrees(){let e=[[-40,-30,1.2],[-38,-18,.9],[-42,-5,1.4],[-36,10,1],[-40,22,1.3],[-44,35,.8],[-35,40,1.1],[40,-28,1.3],[38,-12,.9],[42,5,1.1],[36,18,1.4],[40,30,1],[44,42,.8],[-25,-42,1.2],[0,-44,.9],[25,-42,1.1],[-28,42,1],[5,44,1.3],[28,42,.8],[-30,38,1.1]],t=Md(1234),n=new cp(1235,.07);for(let[r,i,a]of e)this.addTree(n,r,i,a,t);this.group.add(n.build())}createBushes(){let e=Md(555),t=new cp(556,.08),n=[5025616,4431943,5683546];for(let[r,i]of[[-32,-25],[-34,5],[32,-20],[34,15],[-20,-38],[20,-38],[-22,38],[22,38],[-30,30],[30,-30]]){let a=Math.round(r),o=Math.round(i);t.box(a,.5,o,1,1,1,n[Math.floor(e()*n.length)]);let s=1+Math.floor(e()*3),c=[[.75,.25,.25],[-.75,.25,-.25],[.25,.25,-.75],[-.25,.75,.25]];for(let r=0;r<s;r++){let[i,s,l]=c[(r+Math.floor(e()*4))%c.length];t.box(a+i,s,o+l,.5,.5,.5,n[Math.floor(e()*n.length)])}}this.group.add(t.build())}createWelcomeArch(){let e=new U,t=new cp(808,.05),n=(e,t,n)=>e+t+n&1?1725046:2388387;t.fill(-3,2,0,1,4,1,1,n),t.fill(3,2,0,1,4,1,1,n),t.fill(0,4.5,0,7,1,1,1,n),e.add(t.build());let r=document.createElement(`canvas`);r.width=512,r.height=128;let i=r.getContext(`2d`);i.fillStyle=`rgba(0, 0, 0, 0)`,i.fillRect(0,0,512,128),i.font=`bold 56px Arial`,i.fillStyle=`#ffffff`,i.textAlign=`center`,i.textBaseline=`middle`,i.fillText(`ITEC Río Cuarto`,256,64);let a=new ei(new Br({map:new Pi(r),transparent:!0,depthWrite:!1}));a.scale.set(6,1.5,1),a.position.set(0,5.5,0),e.add(a),e.position.set(0,0,31),this.group.add(e)}createRocks(){let e=Md(77),t=new cp(78,.07),n=[[-24,-12],[-27,14],[24,-14],[27,12],[-22,28],[22,26],[-30,-34],[30,-36],[-20,-30],[18,-40],[10,36],[-12,36]],r=[10132118,9079950,11579046,8159106];for(let[i,a]of n){let n=Math.round(i),o=Math.round(a),s=r[Math.floor(e()*r.length)];t.box(n,.25,o,1,.5,1,s),t.box(n+.75,.25,o+.25,.5,.5,.5,rp(s,.92)),e()>.4&&t.box(n-.75,.25,o-.25,.5,.5,.5,rp(s,1.06)),e()>.3&&t.box(n-.25,.75,o+.25,.5,.5,.5,rp(s,1.1))}this.group.add(t.build())}createClouds(){let e=Md(9),t=new cp(10,.03);for(let n=0;n<6;n++){let r=n/6*Math.PI*2+e()*.5,i=45+e()*40,a=Math.round(Math.cos(r)*i/2)*2,o=38+Math.round(e()*6)*2,s=Math.round(Math.sin(r)*i/2)*2,c=3+Math.floor(e()*2);for(let n=0;n<c;n++){let r=4+Math.floor(e()*2)*2,i=4+Math.floor(e()*2)*2,l=a+n*4-c*2,u=s+Math.round(e()*2-1)*2;t.box(l,o,u,r,2,i,14412279),t.box(l,o+2,u,r-2,2,i-2,16777215)}}this.group.add(t.build({material:sp({fog:!1},!1),castShadow:!1,receiveShadow:!1}))}createHills(){let e=Md(31),t=new cp(32,.06),n=[8110147,9425231,7319610];for(let[r,i,a]of[[-64,-30,6],[-66,20,8],[64,-20,7],[66,34,6],[-30,-64,6],[20,-66,8],[34,64,6],[-40,66,8],[-62,58,4],[62,-62,4]]){let o=n[Math.floor(e()*n.length)],s=Math.floor(a/2);for(let e=0;e<s;e++){let n=(a-e*2)*2;t.fill(r,2*e+1,i,n,2,n,2,(e,t,n)=>e+t+n&1?o:rp(o,.93))}}this.group.add(t.build({material:op,castShadow:!1}))}createAddressSign(){let e=new U,t=11109210,n=new cp(909,.05);n.fill(0,1,0,.25,2,.25,.25,(e,t)=>t&1?8018492:9399625),n.fill(0,1.95,.125,ed.width+.25,ed.height+.25,.25,.25,(e,n)=>e+n&1?t:rp(t,.93)),e.add(n.build());let r=new G(new Wi(ed.width,ed.height),new si({map:td({background:`#f4ecd2`,text:`#1a5276`,accent:`#c0392b`},{width:128,pixelated:!0})}));r.position.set(0,1.95,.27),e.add(r),e.position.set(Qu.x,Qu.y,Qu.z),e.rotation.y=$u,this.group.add(e)}destroy(){Zu(this.group)}},nm=class{ambient;directional;hemisphere;interiorLights=[];scene;constructor(e,t){if(this.scene=e,this.ambient=new qa(16777215,.5),this.hemisphere=new Da(13625087,9075290,.35),this.directional=new Ka(16774358,2.2),this.directional.position.set(15,25,10),this.directional.target.position.set(0,0,0),this.directional.castShadow=!0,this.directional.shadow.mapSize.set(4096,4096),this.directional.shadow.camera.near=.5,this.directional.shadow.camera.far=130,this.directional.shadow.camera.left=-62,this.directional.shadow.camera.right=62,this.directional.shadow.camera.top=62,this.directional.shadow.camera.bottom=-62,this.directional.shadow.normalBias=.03,e.add(this.ambient),e.add(this.hemisphere),e.add(this.directional),e.add(this.directional.target),t)for(let n of t){let t=new Ua(16755268,.3,15);t.position.set(n.x,3,n.z),e.add(t),this.interiorLights.push(t)}}destroy(){this.scene.remove(this.ambient,this.hemisphere,this.directional,this.directional.target),this.ambient.dispose(),this.directional.dispose(),this.hemisphere.dispose();for(let e of this.interiorLights)this.scene.remove(e),e.dispose();this.interiorLights=[]}};function rm(){let e=.2,t=[];for(let n=-2;n<=2;n++)for(let r=-2;r<=2;r++)for(let i=-2;i<=2;i++)Math.hypot(n,r,i)*e<=.5&&t.push([n,r,i]);let n=(1+Math.sqrt(5))/2,r=[];for(let[e,t]of[[1,n],[1,-n],[-1,n],[-1,-n]])r.push(new V(0,e,t),new V(e,t,0),new V(t,0,e));let i=new Set;for(let e of r){e.normalize();let n=t[0],r=-1/0;for(let i of t){let t=i[0]*e.x+i[1]*e.y+i[2]*e.z;t>r&&(r=t,n=i)}i.add(n.join(`,`))}let a=new cp(606,.03);for(let n of t){let t=i.has(n.join(`,`));a.box(n[0]*e,n[1]*e,n[2]*e,e,e,e,t?1118481:16777215,63)}return a.build({material:op,castShadow:!0,receiveShadow:!1})}function im(){let e=new U,t=12+od,n=12+od/2,r=new cp(707,.03),i=new cp(708,0),a=(e,t)=>{r.fill(t[0],t[1],t[2],e[0],e[1],e[2],sd,(e,t,n)=>e+t+n&1?16777215:15000804)},o=(e,t)=>{i.fill(t[0],t[1],t[2],e[0],e[1],e[2],.5,16777215,{inset:.06})};for(let e of[-36.5,-31.5])a([sd,ad,sd],[12,ad/2,e]);a([sd,sd,5],[12,ad,-34]),o([.1,ad,5],[t,ad/2,-34]);for(let e of[-36.5,-31.5])o([od,ad,.1],[n,ad/2,e]);return e.add(r.build({material:op,receiveShadow:!1})),e.add(i.build({material:sp({transparent:!0,opacity:.3,side:2,depthWrite:!1},!1),castShadow:!1,receiveShadow:!1})),e}var am=2.4,om=.15,sm=10,cm=48,lm=16,um=3.5,dm=16769126,fm=1.5,pm=.8,mm=[[-40,-30],[-38,-18],[-42,-5],[-36,10],[-40,22],[-44,35],[-35,40],[40,-28],[38,-12],[42,5],[36,18],[40,30],[44,42],[-25,-42],[0,-44],[25,-42],[-28,42],[5,44],[28,42],[-30,38]];function hm(e){return e<.5?2*e*e:1-(-2*e+2)**2/2}var gm=class{_scene;_phase;_clock=0;_fireflies;_anchor;_params;_colors;_count=cm;constructor(e){this._scene=e.scene,window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches?(this._phase=`done`,Hf.value=1):(this._phase=e.awaitReveal?`waiting`:`delay`,Hf.value=0);let t=new Ar;t.setAttribute(`position`,new hr(new Float32Array(144),3)),this._colors=new Float32Array(144),t.setAttribute(`color`,new hr(this._colors,3)),this._fireflies=new ji(t,new Ei({size:um,color:dm,vertexColors:!0,sizeAttenuation:!1,transparent:!0,blending:2,depthWrite:!1,fog:!1})),this._fireflies.frustumCulled=!1,this._anchor=new Float32Array(144),this._params=new Float32Array(288);for(let e=0;e<cm;e++){let t=mm[e%mm.length];this._anchor[e*3]=t[0],this._anchor[e*3+1]=pm+Math.random()*3.7,this._anchor[e*3+2]=t[1];let n=e*6;this._params[n]=fm+Math.random()*2.5,this._params[n+1]=(.1+Math.random()*.25)*(Math.random()<.5?-1:1),this._params[n+2]=Math.random()*Math.PI*2,this._params[n+3]=.4+Math.random()*.8,this._params[n+4]=.3+Math.random()*.5,this._params[n+5]=.8+Math.random()*1.6}this._scene.add(this._fireflies),this.setQuality(e.quality)}setQuality(e){this._count=e===`high`?cm:lm,this._fireflies.geometry.setDrawRange(0,this._count)}enter(){this._phase===`waiting`&&(this._phase=`delay`,this._clock=0)}update(e,t){let n=Math.min(e,.05);switch(this._phase){case`waiting`:this._clock+=n,this._clock>sm&&this.enter();break;case`delay`:this._clock+=n,this._clock>=om&&(this._phase=`playing`,this._clock=0);break;case`playing`:this._clock+=n,this._clock>=am?(Hf.value=1,this._phase=`done`):Hf.value=hm(this._clock/am)}let r=kt.smoothstep(Hf.value,.85,1),i=this._fireflies.geometry.getAttribute(`position`),a=i.array;for(let e=0;e<this._count;e++){let n=e*6,i=this._params[n+2]+t*this._params[n+1],o=this._params[n];a[e*3]=this._anchor[e*3]+Math.cos(i)*o,a[e*3+1]=this._anchor[e*3+1]+Math.sin(t*this._params[n+4]+this._params[n+2])*this._params[n+3],a[e*3+2]=this._anchor[e*3+2]+Math.sin(i*1.3)*o;let s=r*(.15+.85*(.5+.5*Math.sin(t*this._params[n+5]+this._params[n+2]*3))**2);this._colors[e*3]=s,this._colors[e*3+1]=s*.95,this._colors[e*3+2]=s*.45}i.needsUpdate=!0,this._fireflies.geometry.getAttribute(`color`).needsUpdate=!0}destroy(){Hf.value=1,fd(this._fireflies)}};function _m(e){return new gm(e)}var vm={id:`voxel`,label:`Voxel`,createFloor:mp,createClassrooms:Gp,getClassroomPositions:Kp,createRobot:em,createEnvironment:e=>new tm(e),createLights:(e,t)=>new nm(e,t),createBallVisual:rm,createGoalVisual:im,createSignature:_m,accent:16101441,post:{bloom:{strength:.35,radius:.3,threshold:.9},vignette:{offset:.6,darkness:.18},grain:.006,aberration:0,dof:{aperture:0,maxblur:0},pixel:{size:2,levels:28}},scene:{background:14086143,fogColor:14086143,fogNear:60,fogFar:120},renderer:{toneMapping:0,toneMappingExposure:1,shadowMapType:1}};function ym(){let e=new U,t=[],n=new G(new Wi(100,100),new q({color:1778227,roughness:.16,metalness:.32}));n.rotation.x=-Math.PI/2,n.receiveShadow=!0,e.add(n),t.push({position:{x:0,y:-.5,z:0},size:{x:100,y:1,z:100}});let r=new q({color:2304831,roughness:.2,metalness:.3}),i=new G(new Wi(5,60),eu(r,2));i.rotation.x=-Math.PI/2,i.position.set(0,$l.pad,-5),i.receiveShadow=!0,e.add(i);let a=new q({color:992288,roughness:.55,metalness:.1}),o=new q({color:924971,roughness:.55,metalness:.1}),s=[{x:-35,z:-35,w:20,h:18,mat:a},{x:35,z:-35,w:20,h:18,mat:o},{x:-38,z:35,w:16,h:16,mat:a},{x:38,z:35,w:16,h:16,mat:o},{x:-40,z:10,w:10,h:12,mat:a},{x:40,z:-10,w:10,h:12,mat:o},{x:0,z:40,w:25,h:12,mat:a},{x:0,z:-42,w:20,h:8,mat:o}];for(let t of s){let n=new G(new Wi(t.w,t.h),eu(t.mat,1));n.rotation.x=-Math.PI/2,n.position.set(t.x,$l.grass,t.z),n.receiveShadow=!0,e.add(n)}let c=new q({color:4876954,emissive:2775690,emissiveIntensity:.35,roughness:.4});for(let t=-34;t<=20;t+=4){let n=new G(new K(.15,.01,1.5),eu(c,6));n.position.set(0,$l.marking-.005,t),n.receiveShadow=!0,e.add(n)}let l=new q({color:2896967,roughness:.5,metalness:.1});for(let n of[{pos:[0,1,50],size:[100,2,1]},{pos:[0,1,-50],size:[100,2,1]},{pos:[50,1,0],size:[1,2,100]},{pos:[-50,1,0],size:[1,2,100]}]){let r=new G(new K(n.size[0],n.size[1],n.size[2]),l);r.position.set(n.pos[0],n.pos[1],n.pos[2]),r.castShadow=!0,r.receiveShadow=!0,e.add(r),t.push({position:{x:n.pos[0],y:n.pos[1],z:n.pos[2]},size:{x:n.size[0],y:n.size[1],z:n.size[2]}})}return{meshGroup:e,physicsBodies:t}}var bm=16761466,xm=.8,Sm=1.4,Cm=.05,wm=5030911,Tm={color:16761466,intensity:18,distance:8,decay:2},Em=.7,Dm={background:`#10213a`,frameOuter:`#4cc3ff`,frameInner:`#e8f4ff`,title:`#e8f4ff`,subtitle:`#4cc3ff`},Om={plinth:{color:1843760,roughness:.45,metalness:.75},blue:{color:1785180,roughness:.35,metalness:.7},stone:{color:5068653,roughness:.35,metalness:.7},glass:{color:1055272,roughness:.08,metalness:.2,emissive:bm,emissiveIntensity:xm},frame:{color:2765124,roughness:.3,metalness:.8},board:{color:726052,roughness:.35,metalness:.5},metal:{color:2831696,roughness:.35,metalness:.7},bulb:{color:16773328,roughness:.3,emissive:16767392,emissiveIntensity:2.2},pot:{color:3094087,roughness:.4,metalness:.5},bush:{color:1989180,roughness:.8,emissive:666136,emissiveIntensity:.3},wood:{color:5916214,roughness:.5,metalness:.1},white:{color:14477044,roughness:.5,emissive:9085120,emissiveIntensity:.25}},km=new Set([`plinth`,`blue`,`stone`,`frame`,`wood`,`pot`,`bush`,`board`,`metal`]),Am=new Set([`cornice`,`lintel`,`board-lintel`]),jm=new Set([`awning`,`plate-border`]);function Mm(e){return`glow-${e}`}function Nm(e,t){let n=t.role;t.role===`accent`&&(n=jm.has(t.tag)?Mm(t.accent):`blue`);let r=t.role===`bush`?new Ki(t.w,14,10):t.role===`bulb`?Pm(t):new K(t.w,t.h,t.d);if(e.add(n,r,t.x,t.y,t.z,t.rotZ??0),Am.has(t.tag)){let n=t.accent??wm;e.box(Mm(n),t.w+.03,Cm,t.d+.03,t.x,t.y,t.z)}}function Pm(e){let t=new Ki(e.w/2,12,8);return t.scale(1,e.h/e.w,e.d/e.w),t}function Fm(e){let t=new U;t.name=`cinematic-building-details`;let n=new Du,r=wu(e);for(let e of r.parts)Nm(n,e);for(let e of r.windows)for(let t of vu(e))Nm(n,t);for(let e of n.keys()){let r;if(e.startsWith(`glow-`)){let t=Number(e.slice(5));r=new q({color:t,emissive:t,emissiveIntensity:Sm,roughness:.3})}else r=new q(Om[e]);let i=n.buildKey(e,r,`bld-${e}`);i&&(i.castShadow=km.has(e),i.receiveShadow=!0,t.add(i))}let i=ku(Dm),a=new G(new Wi(r.hero.w,r.hero.h),new q({map:i,emissive:16777215,emissiveMap:i,emissiveIntensity:Em,roughness:.4,metalness:.1}));a.position.set(r.hero.x,r.hero.y,r.hero.z),a.name=`bld-hero-face`,t.add(a);for(let e of r.hero.columns){let n=new Ua(Tm.color,Tm.intensity,Tm.distance,Tm.decay);n.position.set(e.x,e.y,e.z),n.castShadow=!1,n.name=`bld-gate-light`,t.add(n)}return t}var Im=[{name:`Desarrollo de Software`,color:2719929,x:-12,z:-16,facing:1},{name:`Mecatrónica`,color:15158332,x:-12,z:0,facing:1},{name:`Marketing Digital`,color:15105570,x:-12,z:16,facing:1},{name:`Inteligencia Artificial`,color:9323693,x:12,z:-8,facing:-1},{name:`Turismo y Hotelería`,color:2600544,x:12,z:8,facing:-1}],Lm=4,Rm=.3,zm=8,Bm=8;function Vm(e){let t=document.createElement(`canvas`);t.width=512,t.height=128;let n=t.getContext(`2d`);n.fillStyle=`rgba(0, 0, 0, 0)`,n.fillRect(0,0,512,128),n.font=`bold 48px Arial`,n.fillStyle=`#ffffff`,n.textAlign=`center`,n.textBaseline=`middle`,n.fillText(e,256,64);let r=new ei(new Br({map:new Pi(t),transparent:!0,depthWrite:!1}));return r.scale.set(4,1,1),r}function Hm(e){let t=new U,n=new G(new K(3,$l.hallway,55),eu(new q({color:2765641,roughness:.25,metalness:.3}),4));n.position.set(0,$l.hallway/2,-7.5),n.receiveShadow=!0,t.add(n);let r=new q({color:3160658,roughness:.25,metalness:.3});for(let n of e){let e=n.x+n.facing*(Bm/2),i=Math.abs(e),a=e/2,o=new G(new K(i,$l.branch,2),eu(r,5));o.position.set(a,$l.branch/2,n.z),o.receiveShadow=!0,t.add(o);let s=new G(new Ri(.9,20),eu(new q({color:n.color,emissive:n.color,emissiveIntensity:.3,roughness:.4}),7));s.rotation.x=-Math.PI/2,s.position.set(e,$l.circle,n.z),s.receiveShadow=!0,t.add(s);let c=new G(new qi(1.1,.08,8,24),new q({color:n.color,emissive:n.color,emissiveIntensity:1.4,roughness:.3}));c.rotation.x=-Math.PI/2,c.position.set(e,$l.ring,n.z),t.add(c)}return t}function Um(e){let t=new U,n=new q({color:7035461,roughness:.5,metalness:.1});for(let r of[-2,0,2]){let i=new G(new K(1.8,.08,.9),n),a=e.z+r,o=e.x-e.facing*1.5;i.position.set(o,.75,a),i.castShadow=!0,i.receiveShadow=!0,t.add(i);let s=new K(.08,.7,.08),c=new q({color:6713480,roughness:.35,metalness:.7});for(let[e,n]of[[-.8,-.35],[.8,-.35],[-.8,.35],[.8,.35]]){let r=new G(s,c);r.position.set(o+e,.35,a+n),t.add(r)}}let r=e.x-e.facing*(Bm/2),i=new G(new K(.05,1.8,4),new q({color:14673648,emissive:6982320,emissiveIntensity:.25,roughness:.25,metalness:.05}));i.position.set(r+e.facing*.2,2.2,e.z),i.receiveShadow=!0,t.add(i);let a=new q({color:5923704,roughness:.35,metalness:.7}),o=new G(new K(.06,.06,4.1),a);o.position.set(r+e.facing*.2,3.12,e.z),t.add(o);let s=new G(new K(.06,.06,4.1),a);return s.position.set(r+e.facing*.2,1.28,e.z),t.add(s),t}function Wm(e,t,n,r,i,a,o){let s=new G(new K(r.x,Lm,r.z),i);s.position.set(n.x,Lm/2,n.z),s.castShadow=!0,s.receiveShadow=!0,e.add(s),t.push({position:{x:n.x,y:Lm/2,z:n.z},size:{x:r.x,y:Lm,z:r.z}}),o.push({x:n.x,z:n.z,sx:r.x,sz:r.z,...a})}function Gm(){let e=new U,t=[],n=[],r=[],i=new q({color:9081768,roughness:.5,metalness:.1});for(let a of Im){let o=new U,s=new q({color:a.color,roughness:.5,metalness:.1}),c=a.x-a.facing*(Bm/2),l=new G(new K(Rm,Lm,zm),s);l.position.set(c,Lm/2,a.z),l.castShadow=!0,l.receiveShadow=!0,o.add(l),t.push({position:{x:c,y:Lm/2,z:a.z},size:{x:Rm,y:Lm,z:zm}}),r.push({x:c,z:a.z,sx:Rm,sz:zm,accent:a.color,mid:!1});let u=a.z-zm/2,d=new K(Bm,Lm,Rm),f=new G(d,i);f.position.set(a.x,Lm/2,u),f.castShadow=!0,f.receiveShadow=!0,o.add(f),t.push({position:{x:a.x,y:Lm/2,z:u},size:{x:Bm,y:Lm,z:Rm}}),r.push({x:a.x,z:u,sx:Bm,sz:Rm,mid:!0});let p=a.z+zm/2,m=new G(d,i);m.position.set(a.x,Lm/2,p),m.castShadow=!0,m.receiveShadow=!0,o.add(m),t.push({position:{x:a.x,y:Lm/2,z:p},size:{x:Bm,y:Lm,z:Rm}}),r.push({x:a.x,z:p,sx:Bm,sz:Rm,mid:!0});let h=new Wi(7.5,7.5),g=new W(a.color);g.lerp(new W(1053727),.6);let _=new G(h,eu(new q({color:g,roughness:.3,metalness:.2}),3));_.rotation.x=-Math.PI/2,_.position.set(a.x,$l.room,a.z),_.receiveShadow=!0,o.add(_);let v=Vm(a.name),y=a.x+a.facing*(Bm/2);v.position.set(y,5,a.z),o.add(v);let b=Um(a);o.add(b),e.add(o);let x=a.x+a.facing*(Bm/2);n.push({name:a.name,position:{x,y:Lm/2,z:a.z},size:{x:2,y:Lm,z:zm}})}let a=Rm,o=[`+x`],s=[`-x`];Wm(e,t,{x:-8,z:-8},{x:a,z:8},i,{mid:!0,windows:o},r),Wm(e,t,{x:-8,z:8},{x:a,z:8},i,{mid:!0,windows:o},r),Wm(e,t,{x:8,z:-16},{x:a,z:8},i,{mid:!0,windows:s},r),Wm(e,t,{x:8,z:0},{x:a,z:8},i,{mid:!0,windows:s},r),Wm(e,t,{x:8,z:16},{x:a,z:8},i,{mid:!0,windows:s},r),Wm(e,t,{x:-16,z:-8},{x:a,z:8},i,{mid:!0},r),Wm(e,t,{x:-16,z:8},{x:a,z:8},i,{mid:!0},r),Wm(e,t,{x:16,z:-16},{x:a,z:8},i,{mid:!0},r),Wm(e,t,{x:16,z:16},{x:a,z:8},i,{mid:!0},r),Wm(e,t,{x:0,z:-20},{x:32,z:a},i,{mid:!0,windows:[`+z`]},r),Wm(e,t,{x:-9,z:20},{x:14,z:a},i,{mid:!0,windows:[`+z`],openEnds:[`max`]},r),Wm(e,t,{x:9,z:20},{x:14,z:a},i,{mid:!0,windows:[`+z`],openEnds:[`min`]},r),e.add(Fm({walls:r,rooms:Im,wallHeight:Lm,roomDepth:Bm}));let c=Hm(Im);return e.add(c),{meshGroup:e,physicsWalls:t,triggerZones:n}}function Km(){return Im.map(e=>e.color)}function qm(){return Im.map(e=>({x:e.x,z:e.z}))}function Jm(){let e=new U,t=new q({color:16054010,roughness:.18,metalness:0}),n=new q({color:1382172,roughness:.35,metalness:.9}),r=new q({color:2435119,roughness:.4,metalness:.85}),i=new q({color:8226196,roughness:.35,metalness:.75}),a=new q({color:4172287,emissive:4172287,emissiveIntensity:2.2,roughness:.3}),o=(t,n,r,i,a,o=!0)=>{let s=new G(t,n);return s.position.set(r,i,a),s.castShadow=o,e.add(s),s};o(new zi(.6,.65,.05,24),i,0,.025,0);for(let e of[-1,1]){let i=e*.2;o(new K(.22,.1,.38),r,i,.1,.05),o(new zi(.075,.09,.55,12),t,i,.42,0),o(new Ki(.1,12,12),n,i,.75,0),o(new zi(.1,.08,.45,12),t,i,.98,0),o(new Ki(.11,12,12),n,i,1.22,0)}o(new K(.5,.22,.3),r,0,1.3,0),o(new K(.7,.5,.36),t,0,1.66,0),o(new K(.72,.015,.38),n,0,1.5,0,!1),o(new K(.015,.5,.38),n,0,1.66,0,!1);let s=o(new qi(.11,.025,8,24),n,0,1.66,.19,!1);s.rotation.x=0,o(new Ki(.09,20,20),a,0,1.66,.19,!1);let c=new Ua(4172287,5,6);c.position.set(0,1.66,.35),e.add(c);for(let e of[-1,1]){let r=e*.47;o(new Ki(.11,12,12),n,r,1.85,0),o(new zi(.07,.06,.38,12),t,r,1.64,0),o(new Ki(.075,12,12),n,r,1.43,0),o(new zi(.06,.05,.34,12),t,r,1.24,0),o(new K(.08,.12,.1),t,r,1.03,0)}o(new zi(.05,.06,.12,12),n,0,1.97,0),o(new Ki(.2,24,24),t,0,2.08,0).scale.set(1,1.05,.95),o(new K(.41,.012,.01),n,0,2.15,.185,!1),o(new K(.012,.2,.01),n,0,2.1,.19,!1);let l=new Ki(.03,10,10);for(let e of[-1,1])o(l,a,e*.08,2.1,.18,!1);return{group:e,getBounceOffset:e=>Math.sin(e*2)*.03}}var Ym=class{group;constructor(e){this.group=new U,this.createStars(),this.createTrees(),this.createBushes(),this.createWelcomeArch(),this.createAddressSign(),e.add(this.group)}createStars(){let e=new Float32Array(600);for(let t=0;t<200;t++){let n=Math.random()*Math.PI*2,r=.14+Math.random()*.86,i=Math.sqrt(1-r*r);e[t*3]=Math.cos(n)*i*120,e[t*3+1]=r*120,e[t*3+2]=Math.sin(n)*i*120}let t=new Ar;t.setAttribute(`position`,new hr(e,3));let n=new ji(t,new Ei({color:13623551,size:1.1,sizeAttenuation:!0,transparent:!0,opacity:.85,depthWrite:!1,fog:!1}));n.frustumCulled=!1,this.group.add(n)}createTree(e,t,n){let r=new U,i=1.5*n,a=.15*n,o=new G(new zi(a*.7,a,i,6),new q({color:3812892,roughness:.7}));o.position.y=i/2,o.castShadow=!0,r.add(o);let s=[1915434,2311472,1717032,1454122],c=s[Math.floor(Math.random()*s.length)],l=2.5*n,u=1.2*n,d=new Bi(u,l,7),f=new q({color:c,roughness:.6}),p=new G(d,f);p.position.y=i+l*.4,p.castShadow=!0,p.receiveShadow=!0,r.add(p);let m=new G(new Bi(u*.65,l*.7,7),f);return m.position.y=i+l*.85,m.castShadow=!0,r.add(m),r.position.set(e,0,t),r}createTrees(){for(let[e,t,n]of[[-40,-30,1.2],[-38,-18,.9],[-42,-5,1.4],[-36,10,1],[-40,22,1.3],[-44,35,.8],[-35,40,1.1],[40,-28,1.3],[38,-12,.9],[42,5,1.1],[36,18,1.4],[40,30,1],[44,42,.8],[-25,-42,1.2],[0,-44,.9],[25,-42,1.1],[-28,42,1],[5,44,1.3],[28,42,.8],[-30,38,1.1]]){let r=this.createTree(e,t,n);this.group.add(r)}}createBushes(){let e=new q({color:2047276,roughness:.6}),t=new q({color:1651494,roughness:.6});for(let[n,r]of[[-32,-25],[-34,5],[32,-20],[34,15],[-20,-38],[20,-38],[-22,38],[22,38],[-30,30],[30,-30]]){let i=new U,a=Math.random()>.5?e:t,o=new G(new Hi(.6,0),a);o.position.y=.4,o.castShadow=!0,i.add(o);let s=new Hi(.45,0),c=new G(s,a);c.position.set(.5,.3,.2),c.castShadow=!0,i.add(c);let l=new G(s,a);l.position.set(-.4,.3,-.3),l.castShadow=!0,i.add(l),i.position.set(n,0,r),this.group.add(i)}}createWelcomeArch(){let e=new U,t=new q({color:1723e3,emissive:1727130,emissiveIntensity:.35,roughness:.3,metalness:.5}),n=new K(.4,4,.4),r=new G(n,t);r.position.set(-3,2,0),r.castShadow=!0,e.add(r);let i=new G(n,t);i.position.set(3,2,0),i.castShadow=!0,e.add(i);let a=new G(new K(6.8,.5,.5),t);a.position.set(0,4.25,0),a.castShadow=!0,e.add(a);let o=document.createElement(`canvas`);o.width=512,o.height=128;let s=o.getContext(`2d`);s.fillStyle=`rgba(0, 0, 0, 0)`,s.fillRect(0,0,512,128),s.font=`bold 56px Arial`,s.fillStyle=`#ffffff`,s.textAlign=`center`,s.textBaseline=`middle`,s.fillText(`ITEC Río Cuarto`,256,64);let c=new ei(new Br({map:new Pi(o),transparent:!0,depthWrite:!1}));c.scale.set(6,1.5,1),c.position.set(0,5.5,0),e.add(c),e.position.set(0,0,31),this.group.add(e)}createAddressSign(){let e=new U,t=new q({color:2831696,roughness:.35,metalness:.7}),n=new G(new zi(.32,.36,.1,20),t);n.position.y=.05,e.add(n);let r=new G(new zi(.07,.07,2.2,16),t);r.position.y=1.1,r.castShadow=!0,e.add(r);let i=new G(new K(ed.width+.16,ed.height+.16,.08),t);i.position.set(0,1.95,.1),i.castShadow=!0,e.add(i);let a=td({background:`#10213a`,text:`#e8f4ff`,accent:`#4cc3ff`}),o=new G(new Wi(ed.width,ed.height),new q({map:a,emissive:16777215,emissiveMap:a,emissiveIntensity:.55,roughness:.4,metalness:.1}));o.position.set(0,1.95,.145),e.add(o),e.position.set(Qu.x,Qu.y,Qu.z),e.rotation.y=$u,this.group.add(e)}destroy(){Zu(this.group)}},Xm=2e3,Zm=new V(0,14,5),Qm=60,$m=class{ambient;spot;spotTarget;interiorLights=[];scene;lastTime;snapped=!1;constructor(e,t){if(this.scene=e,this.lastTime=performance.now(),this.ambient=new qa(1714773,.3),this.spotTarget=new Dn,this.spot=new Va(16773336,Xm,0,.55,.6,2),this.spot.position.copy(Zm),this.spot.target=this.spotTarget,this.spot.castShadow=!0,this.spot.shadow.mapSize.set(2048,2048),this.spot.shadow.camera.near=4,this.spot.shadow.camera.far=40,this.spot.shadow.bias=-4e-4,this.spot.shadow.normalBias=.03,e.add(this.ambient,this.spot,this.spotTarget),t){let n=Km();t.forEach((t,r)=>{let i=new Ua(n[r]??16755268,Qm,14,2);i.position.set(t.x,3,t.z),e.add(i),this.interiorLights.push(i)})}}update(e){let t=performance.now(),n=Math.min((t-this.lastTime)/1e3,.1);this.lastTime=t;let r=this.snapped?1-Math.exp(-6*n):1;this.snapped=!0,this.spotTarget.position.lerp(e,r),this.spot.position.x+=(e.x+Zm.x-this.spot.position.x)*r,this.spot.position.y+=(e.y+Zm.y-this.spot.position.y)*r,this.spot.position.z+=(e.z+Zm.z-this.spot.position.z)*r}destroy(){this.scene.remove(this.ambient,this.spot,this.spotTarget),this.ambient.dispose(),this.spot.dispose();for(let e of this.interiorLights)this.scene.remove(e),e.dispose();this.interiorLights=[]}};function eh(){let e=new G(new Ki(id,32,24),new q({color:16777215,roughness:.25}));e.castShadow=!0;let t=new q({color:1118481,roughness:.5}),n=new Ki(id*1.003,5,2,0,Math.PI*2,0,.4),r=(1+Math.sqrt(5))/2,i=new V(0,1,0);for(let[a,o]of[[1,r],[1,-r],[-1,r],[-1,-r]])for(let r of[new V(0,a,o),new V(a,o,0),new V(o,0,a)]){let a=new G(n,t);a.quaternion.setFromUnitVectors(i,r.normalize()),e.add(a)}return e}function th(){let e=new U,t=new q({color:16777215,emissive:16777215,emissiveIntensity:.15,roughness:.3,metalness:.3}),n=new q({color:13625087,emissive:8370431,emissiveIntensity:.5,roughness:.6,transparent:!0,opacity:.25,depthWrite:!1,side:2}),r=12+od,i=12+od/2,a=(t,n,r,i)=>{let a=new G(new K(...t),r);a.position.set(...n),a.castShadow=i,e.add(a)};for(let e of[-36.5,-31.5])a([sd,ad,sd],[12,ad/2,e],t,!0);a([sd,sd,5],[12,ad,-34],t,!0),a([.05,ad,5],[r,ad/2,-34],n,!1);for(let e of[-36.5,-31.5])a([od,ad,.05],[i,ad/2,e],n,!1);return e}var nh=class e extends G{constructor(t,n={}){super(t),this.isReflector=!0,this.type=`Reflector`,this.forceUpdate=!1,this._reflectionCameras=new WeakMap;let r=this,i=n.color===void 0?new W(8355711):new W(n.color),a=n.textureWidth||512,o=n.textureHeight||512,s=n.clipBias||0,c=n.shader||e.ReflectorShader,l=n.multisample===void 0?4:n.multisample,u=new Lr,d=new V,f=new V,p=new V,m=new $t,h=new V(0,0,-1),_=new Jt,v=new V,y=new V,b=new Jt,x=new $t,S=new Xt(a,o,{samples:l,type:g}),C=new na({name:c.name===void 0?`unspecified`:c.name,uniforms:$i.clone(c.uniforms),fragmentShader:c.fragmentShader,vertexShader:c.vertexShader});C.uniforms.tDiffuse.value=S.texture,C.uniforms.color.value=i,C.uniforms.textureMatrix.value=x,this.material=C,this.onBeforeRender=function(e,t,n){let i=this.getReflectionCamera(n);if(f.setFromMatrixPosition(r.matrixWorld),p.setFromMatrixPosition(n.matrixWorld),m.extractRotation(r.matrixWorld),d.set(0,0,1),d.applyMatrix4(m),v.subVectors(f,p),v.dot(d)>0&&this.forceUpdate===!1)return;v.reflect(d).negate(),v.add(f),m.extractRotation(n.matrixWorld),h.set(0,0,-1),h.applyMatrix4(m),h.add(p),y.subVectors(f,h),y.reflect(d).negate(),y.add(f),i.position.copy(v),i.up.set(0,1,0),i.up.applyMatrix4(m),i.up.reflect(d),i.lookAt(y),i.far=n.far,i.updateMatrixWorld(),i.projectionMatrix.copy(n.projectionMatrix),x.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),x.multiply(i.projectionMatrix),x.multiply(i.matrixWorldInverse),x.multiply(r.matrixWorld),u.setFromNormalAndCoplanarPoint(d,f),u.applyMatrix4(i.matrixWorldInverse),_.set(u.normal.x,u.normal.y,u.normal.z,u.constant);let a=i.projectionMatrix;i.isOrthographicCamera?(b.x=(Math.sign(_.x)+a.elements[8])/a.elements[0],b.y=(Math.sign(_.y)+a.elements[9])/a.elements[5],b.z=-n.far,b.w=1):(b.x=(Math.sign(_.x)+a.elements[8])/a.elements[0],b.y=(Math.sign(_.y)+a.elements[9])/a.elements[5],b.z=-1,b.w=(1+a.elements[10])/a.elements[14]),_.multiplyScalar(2/_.dot(b)),a.elements[2]=_.x,a.elements[6]=_.y,i.isOrthographicCamera?(a.elements[10]=_.z-s,a.elements[14]=_.w-1):(a.elements[10]=_.z+1-s,a.elements[14]=_.w),r.visible=!1;let o=e.getRenderTarget(),c=e.xr.enabled,l=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(S),e.state.buffers.depth.setMask(!0),e.autoClear===!1&&e.clear(),e.render(t,i),e.xr.enabled=c,e.shadowMap.autoUpdate=l,e.setRenderTarget(o);let g=n.viewport;g!==void 0&&e.state.viewport(g),r.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return S},this.dispose=function(){S.dispose(),r.material.dispose()},this.getReflectionCamera=function(e){let t=this._reflectionCameras.get(e);return t===void 0&&(t=e.clone(),this._reflectionCameras.set(e,t)),t}}};nh.ReflectorShader={name:`ReflectorShader`,uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var rh=$l.mirror,ih=100,ah=.32,oh=512,sh=4,ch=.65,lh=16773336,uh=.14,dh=40,fh=.78,ph=.8,mh=220,hh=80,gh=12573951,_h=.09,vh=11,yh=16,bh=6,xh=.07,Sh={name:`MirrorFloorShader`,uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null},uAlpha:{value:ah},uMinFactor:{value:ch}},vertexShader:`
    uniform mat4 textureMatrix;
    varying vec4 vUv;
    varying vec3 vWorld;
    void main() {
      vUv = textureMatrix * vec4(position, 1.0);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,fragmentShader:`
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    uniform float uAlpha;
    uniform float uMinFactor;
    varying vec4 vUv;
    varying vec3 vWorld;
    void main() {
      vec3 refl = texture2DProj(tDiffuse, vUv).rgb * color;
      // Slightly stronger reflection at grazing angles (Fresnel-like)
      float up = clamp(normalize(cameraPosition - vWorld).y, 0.0, 1.0);
      float fres = pow(1.0 - up, 1.5);
      float a = uAlpha * mix(uMinFactor, 1.0, fres);
      gl_FragColor = vec4(refl, a);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `},Ch=`
  varying vec3 vN;
  varying vec3 vView;
  varying vec3 vLocal;
  void main() {
    vLocal = position;
    vN = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`,wh=`
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uTime;
  varying vec3 vN;
  varying vec3 vView;
  varying vec3 vLocal;
  ${ud}
  void main() {
    // Soft silhouette: bright where the surface faces the camera, fading to the cone edges
    float facing = abs(dot(normalize(vN), normalize(-vView)));
    float soft = pow(facing, 1.6);
    float len = vLocal.z; // 0 at the lamp, 1 at the floor
    float fadeLen = smoothstep(0.0, 0.14, len) * (1.0 - 0.55 * smoothstep(0.7, 1.0, len));
    float n = sigFbm(vLocal.xy * 3.0 + vec2(len * 3.0 - uTime * 0.25, uTime * 0.05));
    float a = uIntensity * soft * fadeLen * mix(0.55, 1.3, n);
    gl_FragColor = vec4(uColor * a, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,Th=class{_scene;_spot;_getRobotPosition;_mirror=null;_coneGeo=null;_coneMat=null;_cone=null;_rain=null;_rainSpeed=new Float32Array(mh);_rainColors=new Float32Array(660);_rainCount=mh;_axis=new V;constructor(e){if(this._scene=e.scene,this._spot=e.lights.spot??null,this._getRobotPosition=e.getRobotPosition,this._spot){this._coneGeo=new Bi(1,1,dh,1,!0).translate(0,-.5,0).rotateX(-Math.PI/2),this._coneMat=new na({uniforms:{uColor:{value:new W(lh)},uIntensity:{value:uh},uTime:{value:0}},vertexShader:Ch,fragmentShader:wh,transparent:!0,blending:2,depthWrite:!1,side:2,fog:!1}),this._cone=new G(this._coneGeo,this._coneMat),this._cone.frustumCulled=!1,this._cone.renderOrder=3,this._scene.add(this._cone);let e=new Ar,t=new Float32Array(660),n=this._getRobotPosition();for(let e=0;e<mh;e++)t[e*3]=n.x+(Math.random()*2-1)*vh,t[e*3+1]=Math.random()*yh,t[e*3+2]=n.z+(Math.random()*2-1)*vh,this._rainSpeed[e]=bh+Math.random()*4;e.setAttribute(`position`,new hr(t,3)),e.setAttribute(`color`,new hr(this._rainColors,3)),this._rain=new ji(e,new Ei({size:_h,map:dd(32),color:gh,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,sizeAttenuation:!0,fog:!1})),this._rain.frustumCulled=!1,this._scene.add(this._rain)}this.setQuality(e.quality)}setQuality(e){let t=e===`high`;this._setMirror(t),this._rainCount=t?mh:hh,this._rain?.geometry.setDrawRange(0,this._rainCount)}_setMirror(e){if(e&&!this._mirror){let e=new nh(new Wi(ih,ih),{color:16777215,textureWidth:oh,textureHeight:oh,clipBias:.003,multisample:sh,shader:Sh});e.rotation.x=-Math.PI/2,e.position.y=rh;let t=e.material;t.transparent=!0,t.depthWrite=!1,e.renderOrder=1,this._scene.add(e),this._mirror=e}else if(!e&&this._mirror){let e=this._mirror;this._scene.remove(e),e.dispose(),e.geometry.dispose(),this._mirror=null}}update(e,t){let n=this._spot;if(!n||!this._cone||!this._coneMat||!this._rain)return;let r=n.target.position,i=n.position.distanceTo(r)+ph,a=i*Math.tan(n.angle*fh);this._cone.position.copy(n.position),this._cone.lookAt(r),this._cone.scale.set(a,a,i),this._coneMat.uniforms.uTime.value=t;let o=this._getRobotPosition(),s=this._axis.subVectors(r,n.position).normalize(),c=Math.tan(n.angle*fh),l=n.position.x,u=n.position.y,d=n.position.z,f=this._rain.geometry.getAttribute(`position`),p=f.array,m=this._rainColors,h=vh;for(let t=0;t<this._rainCount;t++){let n=p[t*3],r=p[t*3+1]-this._rainSpeed[t]*e,i=p[t*3+2];r<0&&(r+=yh);let a=n-o.x;a>h?n-=22:a<-11&&(n+=22);let f=i-o.z;f>h?i-=22:f<-11&&(i+=22),p[t*3]=n,p[t*3+1]=r,p[t*3+2]=i;let g=n-l,_=r-u,v=i-d,y=g*s.x+_*s.y+v*s.z,b=0;if(y>.5){let e=g*g+_*_+v*v-y*y,t=y*c,n=Math.sqrt(Math.max(e,0))/t;b=1-kt.smoothstep(n,.6,1)}let x=Math.min(r/.6,(yh-r)/1.5,1),S=(xh+.9299999999999999*b)*x;m[t*3]=S*.85,m[t*3+1]=S*.93,m[t*3+2]=S}f.needsUpdate=!0,this._rain.geometry.getAttribute(`color`).needsUpdate=!0}destroy(){this._setMirror(!1),this._cone&&=(this._scene.remove(this._cone),this._coneGeo?.dispose(),this._coneMat?.dispose(),null),this._rain&&=(fd(this._rain),null)}};function Eh(e){return new Th(e)}var Dh={original:jd,lowpoly:Vf,voxel:vm,cinematic:{id:`cinematic`,label:`Cinemático`,createFloor:ym,createClassrooms:Gm,getClassroomPositions:qm,createRobot:Jm,createEnvironment:e=>new Ym(e),createLights:(e,t)=>new $m(e,t),createBallVisual:eh,createGoalVisual:th,createSignature:Eh,accent:5232895,post:{bloom:{strength:.6,radius:.8,threshold:.75},vignette:{offset:.4,darkness:.55},grain:.09,aberration:.003,dof:{aperture:0,maxblur:0},pixel:{size:1,levels:0}},scene:{background:329487,fogColor:329487,fogNear:30,fogFar:100},renderer:{toneMapping:4,toneMappingExposure:1,shadowMapType:2}}},Oh=[`original`,`lowpoly`,`voxel`,`cinematic`],kh=`voxel`;function Ah(e){return typeof e==`string`&&e in Dh}var jh=150,Mh=new V(-17,.2,-5),Nh=new V(-5,3.5,5),Ph=60,Fh=new V(-14,1,-2),Ih=-9,Lh=10,Rh=.6,zh=80,Bh=.7,Vh=1.2,Hh=.9,Uh=.12,Wh=.55;function Gh(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.4,`rgba(255,255,255,0.45)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,64,64);let r=new Pi(e);return r.colorSpace=Be,r}var Kh=class{_scene;_texture;_dust;_dustBase;_dustPhase;_dustSpeed;_sparks;_sparkVel;_sparkLife;_sparkMaxLife;_nextBurst;_trail;_trailVel;_trailLife;_trailCursor=0;_trailAccum=0;_trailEnabled=!0;_time=0;constructor(e){this._scene=e,this._texture=Gh();let t=Nh.x-Mh.x,n=Nh.y-Mh.y,r=Nh.z-Mh.z;this._dustBase=new Float32Array(450),this._dustPhase=new Float32Array(jh),this._dustSpeed=new Float32Array(jh);for(let e=0;e<jh;e++)this._dustBase[e*3]=Mh.x+Math.random()*t,this._dustBase[e*3+1]=Mh.y+Math.random()*n,this._dustBase[e*3+2]=Mh.z+Math.random()*r,this._dustPhase[e]=Math.random()*Math.PI*2,this._dustSpeed[e]=.03+Math.random()*.07;let i=new Ar;i.setAttribute(`position`,new hr(new Float32Array(this._dustBase),3));let a=new Ei({color:16773590,size:.09,map:this._texture,transparent:!0,opacity:.55,blending:2,depthWrite:!1,sizeAttenuation:!0});this._dust=new ji(i,a),this._dust.frustumCulled=!1,this._dust.renderOrder=2,this._sparkVel=new Float32Array(180),this._sparkLife=new Float32Array(Ph),this._sparkMaxLife=new Float32Array(Ph),this._nextBurst=.5;let o=new Ar;o.setAttribute(`position`,new hr(new Float32Array(180),3)),o.setAttribute(`color`,new hr(new Float32Array(180),3));let s=new Ei({size:.16,map:this._texture,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,sizeAttenuation:!0});this._sparks=new ji(o,s),this._sparks.frustumCulled=!1,this._sparks.renderOrder=3;let c=o.getAttribute(`position`);for(let e=0;e<Ph;e++)c.setXYZ(e,Fh.x,-100,Fh.z);this._trailVel=new Float32Array(240),this._trailLife=new Float32Array(zh);let l=new Ar,u=new hr(new Float32Array(240),3);for(let e=0;e<zh;e++)u.setXYZ(e,0,-100,0);l.setAttribute(`position`,u),l.setAttribute(`color`,new hr(new Float32Array(240),3));let d=new Ei({size:.5,map:this._texture,vertexColors:!0,transparent:!0,blending:2,depthWrite:!1,sizeAttenuation:!0});this._trail=new ji(l,d),this._trail.frustumCulled=!1,this._trail.renderOrder=2,e.add(this._dust,this._sparks,this._trail)}setTrailEnabled(e){this._trailEnabled=e,this._trail.visible=e,e||(this._trailLife.fill(0),this._trailAccum=0)}emitTrail(e,t,n,r){if(!this._trailEnabled||n<Vh){this._trailAccum=0;return}let i=Math.min((n-Vh)/3.8,1);this._trailAccum+=(8+52*i)*Math.min(r,.1);let a=this._trail.geometry.getAttribute(`position`).array,o=t.x,s=t.z;for(;this._trailAccum>=1;){--this._trailAccum;let t=this._trailCursor;this._trailCursor=(t+1)%zh;let r=t*3,i=Hh+Math.random()*.4,c=(Math.random()-.5)*.7;a[r]=e.x-o*i-s*c,a[r+1]=Uh+Math.random()*.08,a[r+2]=e.z-s*i+o*c,this._trailVel[r]=-o*.5*n*.2+(Math.random()-.5)*.3,this._trailVel[r+1]=.25+Math.random()*.35,this._trailVel[r+2]=-s*.5*n*.2+(Math.random()-.5)*.3,this._trailLife[t]=Bh}}_emitBurst(){let e=Lh+Math.floor(Math.random()*13),t=this._sparks.geometry.getAttribute(`position`).array,n=0;for(let r=0;r<Ph&&n<e;r++){if(this._sparkLife[r]>0)continue;let e=.5+Math.random()*.6;this._sparkLife[r]=e,this._sparkMaxLife[r]=e;let i=Math.random()*Math.PI*2,a=.3+Math.random()*.9,o=1.5+Math.random()*2.5;this._sparkVel[r*3]=Math.cos(i)*o,this._sparkVel[r*3+1]=a*o,this._sparkVel[r*3+2]=Math.sin(i)*o,t[r*3]=Fh.x,t[r*3+1]=Fh.y,t[r*3+2]=Fh.z,n++}}update(e){let t=Math.min(Math.max(e,0),.1);this._time+=t;let n=this._time,r=Nh.y-Mh.y,i=this._dust.geometry.getAttribute(`position`),a=i.array;for(let e=0;e<jh;e++){let i=e*3,o=this._dustBase[i+1]+this._dustSpeed[e]*t;o>Nh.y&&(o-=r),this._dustBase[i+1]=o;let s=this._dustPhase[e];a[i]=this._dustBase[i]+Math.sin(n*.4+s)*.35,a[i+1]=o+Math.sin(n*.6+s*1.7)*.08,a[i+2]=this._dustBase[i+2]+Math.cos(n*.33+s)*.35}i.needsUpdate=!0,this._nextBurst-=t,this._nextBurst<=0&&(this._emitBurst(),this._nextBurst=Rh+Math.random()*1.2000000000000002);let o=this._sparks.geometry.getAttribute(`position`),s=this._sparks.geometry.getAttribute(`color`),c=o.array,l=s.array;for(let e=0;e<Ph;e++){let n=e*3,r=this._sparkLife[e];if(r<=0){l[n]=0,l[n+1]=0,l[n+2]=0;continue}let i=r-t;if(i<=0){this._sparkLife[e]=0,l[n]=0,l[n+1]=0,l[n+2]=0;continue}this._sparkLife[e]=i,this._sparkVel[n+1]+=Ih*t,c[n]+=this._sparkVel[n]*t,c[n+1]+=this._sparkVel[n+1]*t,c[n+2]+=this._sparkVel[n+2]*t,c[n+1]<.02&&(c[n+1]=.02,this._sparkVel[n+1]*=-.3,this._sparkVel[n]*=.6,this._sparkVel[n+2]*=.6);let a=i/this._sparkMaxLife[e];l[n]=a,l[n+1]=a*(.35+.55*a),l[n+2]=a*a*.45}o.needsUpdate=!0,s.needsUpdate=!0,this._updateTrail(t)}_updateTrail(e){let t=this._trail.geometry.getAttribute(`position`),n=this._trail.geometry.getAttribute(`color`),r=t.array,i=n.array,a=!1;for(let t=0;t<zh;t++){let n=t*3,o=this._trailLife[t];if(o<=0){i[n]!==0&&(i[n]=0,i[n+1]=0,i[n+2]=0,a=!0);continue}a=!0;let s=o-e;if(s<=0){this._trailLife[t]=0,i[n]=0,i[n+1]=0,i[n+2]=0;continue}this._trailLife[t]=s;let c=Math.max(0,1-2.5*e);this._trailVel[n]*=c,this._trailVel[n+1]*=c,this._trailVel[n+2]*=c,r[n]+=this._trailVel[n]*e,r[n+1]+=this._trailVel[n+1]*e,r[n+2]+=this._trailVel[n+2]*e;let l=s/Bh,u=l*l*Wh;i[n]=u,i[n+1]=u*.92,i[n+2]=u*.76}a&&(t.needsUpdate=!0,n.needsUpdate=!0)}destroy(){this._scene.remove(this._dust,this._sparks,this._trail),this._dust.geometry.dispose(),this._dust.material.dispose(),this._sparks.geometry.dispose(),this._sparks.material.dispose(),this._trail.geometry.dispose(),this._trail.material.dispose(),this._texture.dispose()}},qh=[],Jh=class{robotMesh;physicsDescriptions;triggerDescriptions;styleId;_scene;_renderer;_camera;_signature=null;_quality;_revealed=!1;_lights;_particles;_lastUpdate;_environment;_floorGroup;_classroomsGroup;_robotBounce;_startTime;_ball=null;_hasPrev=!1;_prevX=0;_prevZ=0;_speed=0;_travelDir=new V(0,0,1);constructor(e,t,n,r,i){this._scene=e,this._renderer=t,this._camera=n,this._quality=i,this._startTime=performance.now()/1e3,this.styleId=r,this._lastUpdate=this._startTime,this._particles=new Kh(e);let a=Dh[r];this._applyStageSettings(a),this._environment=a.createEnvironment(e),this._lights=a.createLights(e,a.getClassroomPositions());let o=a.createFloor();e.add(o.meshGroup),this._floorGroup=o.meshGroup;let s=a.createClassrooms();e.add(s.meshGroup),this._classroomsGroup=s.meshGroup;let c=a.createRobot();this.robotMesh=c.group,this._robotBounce=c.getBounceOffset,this.robotMesh.position.set(0,0,0),e.add(this.robotMesh),this.physicsDescriptions=[...o.physicsBodies,...s.physicsWalls.map(e=>({position:e.position,size:e.size}))],this.triggerDescriptions=[...s.triggerZones,{name:`Cómo llegar`,position:{x:4.5,y:2,z:30},size:{x:10,y:4,z:6}}],this._signature=this._createSignature(a)}setQuality(e){this._quality=e,this._signature?.setQuality(e)}enterSignature(){this._revealed=!0,this._signature?.enter?.()}get depthExclude(){return this._signature?.depthExclude??qh}_createSignature(e){return e.createSignature?.({scene:this._scene,camera:this._camera,renderer:this._renderer,quality:this._quality,getRobotPosition:()=>this.robotMesh.position,getRobot:()=>this.robotMesh,lights:this._lights,awaitReveal:!this._revealed})??null}setTrailEnabled(e){this._particles.setTrailEnabled(e)}attachBall(e){this._ball=e,this._applyBallVisuals(Dh[this.styleId])}setStyle(e){if(e===this.styleId)return;let t=Dh[e],n=this.robotMesh.position.clone(),r=this.robotMesh.quaternion.clone();this._signature?.destroy(),this._signature=null,this._environment.destroy(),this._lights.destroy(),Zu(this._floorGroup),Zu(this._classroomsGroup),Zu(this.robotMesh),this._applyStageSettings(t),this._environment=t.createEnvironment(this._scene),this._lights=t.createLights(this._scene,t.getClassroomPositions()),this._lights.update?.(n);let i=t.createFloor();this._scene.add(i.meshGroup),this._floorGroup=i.meshGroup;let a=t.createClassrooms();this._scene.add(a.meshGroup),this._classroomsGroup=a.meshGroup;let o=t.createRobot();this.robotMesh=o.group,this._robotBounce=o.getBounceOffset,this.robotMesh.position.copy(n),this.robotMesh.quaternion.copy(r),this._scene.add(this.robotMesh),this._applyBallVisuals(t),this.styleId=e,this._signature=this._createSignature(t),window.dispatchEvent(new CustomEvent(`style-change`,{detail:{id:e}}))}_applyBallVisuals(e){this._ball?.setVisuals(e.createBallVisual(),e.createGoalVisual())}_applyStageSettings(e){let{scene:t,renderer:n}=e;this._scene.background=new W(t.background),this._scene.fog=new Fn(t.fogColor,t.fogNear,t.fogFar);let r=this._renderer,i=r.shadowMap.type!==n.shadowMapType;r.toneMapping=n.toneMapping,r.toneMappingExposure=n.toneMappingExposure,r.shadowMap.type=n.shadowMapType,i&&(r.shadowMap.needsUpdate=!0)}update(e,t){let n=performance.now()/1e3,r=n-this._lastUpdate;this._lastUpdate=n;let i=n-this._startTime,a=this._robotBounce(i);this.robotMesh.position.copy(e),this.robotMesh.position.y+=a,this.robotMesh.quaternion.copy(t),this._lights.update?.(e),this._updateTrail(e,r),this._particles.update(r),this._signature?.update(Math.min(r,.1),i)}_updateTrail(e,t){if(this._hasPrev&&t>1e-4){let n=e.x-this._prevX,r=e.z-this._prevZ,i=Math.sqrt(n*n+r*r);if(i<4){let e=i/t;this._speed+=(e-this._speed)*(1-Math.exp(-10*Math.min(t,.1))),i>1e-5&&this._travelDir.set(n/i,0,r/i)}else this._speed=0}this._hasPrev=!0,this._prevX=e.x,this._prevZ=e.z,this._particles.emitTrail(e,this._travelDir,this._speed,t)}destroy(){this._signature?.destroy(),this._signature=null,this._lights.destroy(),this._environment.destroy(),this._particles.destroy()}},Yh={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Xh=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Zh=new Wa(-1,1,1,-1,0,1),Qh=new class extends Ar{constructor(){super(),this.setAttribute(`position`,new vr([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new vr([0,2,0,0,2,0],2))}},$h=class{constructor(e){this._mesh=new G(Qh,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Zh)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},eg=class extends Xh{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof na?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=$i.clone(e.uniforms),this.material=new na({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new $h(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},tg=class extends Xh{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},ng=class extends Xh{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},rg=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new B);this._width=n.width,this._height=n.height,t=new Xt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:g}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new eg(Yh),this.copyPass.material.blending=0,this.timer=new Qa}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}tg!==void 0&&(r instanceof tg?n=!0:r instanceof ng&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new B);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},ig=class extends Xh{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new W}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},ag={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new W(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},og=class e extends Xh{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new B(256,256):new B(e.x,e.y),this.clearColor=new W(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Xt(i,a,{type:g,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Xt(i,a,{type:g,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Xt(i,a,{type:g,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=ag;this.highPassUniforms=$i.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new na({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new B(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new V(1,1,1),new V(1,1,1),new V(1,1,1),new V(1,1,1),new V(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=$i.clone(Yh.uniforms),this.blendMaterial=new na({uniforms:this.copyUniforms,vertexShader:Yh.vertexShader,fragmentShader:Yh.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new W,this._oldClearAlpha=1,this._basic=new si,this._fsQuad=new $h(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new B(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new na({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new B(.5,.5)},direction:{value:new B(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new na({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};og.BlurDirectionX=new B(1,0),og.BlurDirectionY=new B(0,1);var sg={name:`BokehShader`,defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`},cg=class extends Xh{constructor(e,t,n){super(),this.scene=e,this.camera=t;let i=n.focus===void 0?1:n.focus,a=n.aperture===void 0?.025:n.aperture,o=n.maxblur===void 0?1:n.maxblur;this._renderTargetDepth=new Xt(1,1,{minFilter:r,magFilter:r,type:g}),this._renderTargetDepth.texture.name=`BokehPass.depth`,this._materialDepth=new aa,this._materialDepth.depthPacking=ze,this._materialDepth.blending=0;let s=$i.clone(sg.uniforms);s.tDepth.value=this._renderTargetDepth.texture,s.focus.value=i,s.aspect.value=t.aspect,s.aperture.value=a,s.maxblur.value=o,s.nearClip.value=t.near,s.farClip.value=t.far,this.materialBokeh=new na({defines:Object.assign({},sg.defines),uniforms:s,vertexShader:sg.vertexShader,fragmentShader:sg.fragmentShader}),this.uniforms=s,this._fsQuad=new $h(this.materialBokeh),this._oldClearColor=new W}render(e,t,n){this.scene.overrideMaterial=this._materialDepth,e.getClearColor(this._oldClearColor);let r=e.getClearAlpha(),i=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this._renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=n.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this._fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(r),e.autoClear=i}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this._renderTargetDepth.setSize(e,t)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}},lg={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},ug=class extends Xh{constructor(){super(),this.isOutputPass=!0,this.uniforms=$i.clone(lg.uniforms),this.material=new ra({name:lg.name,uniforms:this.uniforms,vertexShader:lg.vertexShader,fragmentShader:lg.fragmentShader}),this._fsQuad=new $h(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Lt.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},dg={name:`FinalLookShader`,uniforms:{tDiffuse:{value:null},uTime:{value:0},uAspect:{value:1},uVignetteOffset:{value:.55},uVignetteDarkness:{value:.3},uGrain:{value:.03},uAberration:{value:.0015},uResolution:{value:new B(1,1)},uPixelSize:{value:1},uPosterStep:{value:0},uTransition:{value:0},uReveal:{value:0},uSeed:{value:0},uAccent:{value:new W(16777215)}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uAspect;
    uniform float uVignetteOffset;
    uniform float uVignetteDarkness;
    uniform float uGrain;
    uniform float uAberration;
    uniform vec2 uResolution;
    uniform float uPixelSize;
    uniform float uPosterStep;
    uniform float uTransition;
    uniform float uReveal;
    uniform float uSeed;
    uniform vec3 uAccent;
    varying vec2 vUv;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float vnoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float fbm(vec2 p) {
      return 0.6 * vnoise(p) + 0.3 * vnoise(p * 2.1 + 7.3) + 0.1 * vnoise(p * 4.3 + 3.1);
    }

    void main() {
      vec2 c = vUv - 0.5;
      float r2 = dot(c, c);

      // Pixelation: snap the sampling position to a coarse grid of render pixels
      vec2 suv = vUv;
      if (uPixelSize > 1.001) {
        vec2 cell = uResolution / uPixelSize;
        suv = (floor(vUv * cell) + 0.5) / cell;
      }

      // Chromatic aberration: grows with the squared distance from the center
      vec2 off = c * r2 * uAberration * 2.0;
      vec4 base = texture2D(tDiffuse, suv);
      vec3 col = vec3(
        texture2D(tDiffuse, suv + off).r,
        base.g,
        texture2D(tDiffuse, suv - off).b
      );

      // Palette reduction: quantize in gamma space so the steps look even after sRGB output
      if (uPosterStep > 0.0005) {
        vec3 g3 = pow(max(col, vec3(0.0)), vec3(1.0 / 2.2));
        g3 = floor(g3 / uPosterStep + 0.5) * uPosterStep;
        col = pow(g3, vec3(2.2));
      }

      // Vignette
      float d = length(c) * 1.4142;
      float vig = smoothstep(uVignetteOffset, uVignetteOffset + 0.65, d);
      col *= 1.0 - vig * uVignetteDarkness;

      // Film grain (multiplicative, ~24 fps)
      float frame = floor(uTime * 24.0);
      float g = hash(gl_FragCoord.xy + vec2(frame * 17.13, frame * 31.77)) - 0.5;
      col *= 1.0 + g * uGrain * 2.0;

      // Style-change wipe: noisy radial iris tinted with the target accent
      if (uTransition > 0.0) {
        vec2 q = c * vec2(uAspect, 1.0);
        float dist = length(q) / length(vec2(uAspect, 1.0) * 0.5);
        float n = fbm(vUv * vec2(uAspect, 1.0) * 5.0 + uSeed * 13.7);
        float t = dist * 0.8 + n * 0.4;          // 0 .. ~1.2
        t = mix(t, 1.2 - t, uReveal);            // reveal opens from the center
        float x = uTransition * 1.4;
        float m = smoothstep(t, t + 0.12, x);
        float rim = smoothstep(0.0, 0.5, m) * (1.0 - smoothstep(0.5, 1.0, m));
        vec3 cover = uAccent * (0.82 + 0.18 * n);
        col = mix(col, cover, m) + uAccent * rim * 0.8;
      }

      gl_FragColor = vec4(col, base.a);
    }
  `},fg=4,pg=.15,mg=.92,hg=5e-5,gg=class extends cg{exclude=null;render(...e){let t=this.exclude?this.exclude():null;if(t)for(let e=0;e<t.length;e++)t[e].visible=!1;if(super.render(...e),t)for(let e=0;e<t.length;e++)t[e].visible=!0}};function _g(e,t){return t.bloomStrength=e.bloom.strength,t.bloomRadius=e.bloom.radius,t.bloomThreshold=e.bloom.threshold,t.vignetteOffset=e.vignette.offset,t.vignetteDarkness=e.vignette.darkness,t.grain=e.grain,t.aberration=e.aberration,t.dofAperture=e.dof?.aperture??0,t.dofMaxblur=e.dof?.maxblur??0,t.pixelSize=e.pixel?.size??1,t.posterStep=e.pixel&&e.pixel.levels>0?1/e.pixel.levels:0,t}var vg=class{_renderer;_scene;_camera;_composer=null;_bloomPass=null;_finalPass=null;_passes=[];_dofPass=null;_target=null;_width=1;_height=1;_pixelRatio=1;_current;_goal;_intro=0;_time=0;_transition=0;_reveal=0;_seed=0;_accent=new W(16777215);_onStyleChange;_focusDir=new V;_focusDelta=new V;focusTarget=null;depthExclude=null;constructor(e,t,n,r){this._renderer=e,this._scene=t,this._camera=n;let i={bloomStrength:0,bloomRadius:0,bloomThreshold:1,vignetteOffset:.5,vignetteDarkness:0,grain:0,aberration:0,dofAperture:0,dofMaxblur:0,pixelSize:1,posterStep:0};this._current=_g(r,{...i}),this._goal=_g(r,{...i}),this._onStyleChange=e=>{let t=e.detail?.id;t&&Dh[t]&&this.setSettings(Dh[t].post)},window.addEventListener(`style-change`,this._onStyleChange)}get enabled(){return this._composer!==null}setEnabled(e){e!==this.enabled&&(e?this._build():this._teardown())}_build(){let e=new Xt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:g,samples:fg});e.texture.name=`Post.rt`;let t=new rg(this._renderer,e);t.setPixelRatio(this._pixelRatio),t.setSize(this._width,this._height);let n=new ig(this._scene,this._camera),r=new og(new B(this._width*this._pixelRatio,this._height*this._pixelRatio),this._current.bloomStrength,this._current.bloomRadius,this._current.bloomThreshold),i=new eg(dg),a=new ug;t.addPass(n),t.addPass(r),t.addPass(i),t.addPass(a),this._target=e,this._composer=t,this._bloomPass=r,this._finalPass=i,this._passes=[n,r,i,a]}_teardown(){for(let e of this._passes)e.dispose();this._composer?.dispose(),this._target?.dispose(),this._passes=[],this._dofPass=null,this._composer=null,this._bloomPass=null,this._finalPass=null,this._target=null}_syncDof(){let e=this._composer;if(!e)return;let t=this._current.dofMaxblur>hg||this._goal.dofMaxblur>hg;if(t&&!this._dofPass){let t=new gg(this._scene,this._camera,{focus:12,aperture:this._current.dofAperture,maxblur:this._current.dofMaxblur});t.exclude=()=>this.depthExclude?this.depthExclude():[],e.insertPass(t,1),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio),this._dofPass=t,this._passes.push(t)}else if(!t&&this._dofPass){let t=this._dofPass;e.removePass(t),this._passes.splice(this._passes.indexOf(t),1),t.dispose(),this._dofPass=null}}setSettings(e,t=!1){_g(e,this._goal),t&&Object.assign(this._current,this._goal)}setIntro(e){this._intro=Math.min(Math.max(e,0),1)}setTransition(e,t){this._transition=e,this._reveal=+!!t}setTransitionStyle(e,t){this._accent.set(e),this._seed=t}resize(e,t,n){this._width=e,this._height=t,this._pixelRatio=n,this._composer&&(this._composer.setPixelRatio(n),this._composer.setSize(e,t))}render(e){let t=this._composer;if(!t||!this._bloomPass||!this._finalPass)return;let n=Math.min(Math.max(e,0),.1);this._time=(this._time+n)%1e3;let r=1-Math.exp(-5*n),i=this._current,a=this._goal;i.bloomStrength+=(a.bloomStrength-i.bloomStrength)*r,i.bloomRadius+=(a.bloomRadius-i.bloomRadius)*r,i.bloomThreshold+=(a.bloomThreshold-i.bloomThreshold)*r,i.vignetteOffset+=(a.vignetteOffset-i.vignetteOffset)*r,i.vignetteDarkness+=(a.vignetteDarkness-i.vignetteDarkness)*r,i.grain+=(a.grain-i.grain)*r,i.aberration+=(a.aberration-i.aberration)*r,i.dofAperture+=(a.dofAperture-i.dofAperture)*r,i.dofMaxblur+=(a.dofMaxblur-i.dofMaxblur)*r,i.pixelSize+=(a.pixelSize-i.pixelSize)*r,i.posterStep+=(a.posterStep-i.posterStep)*r,Math.abs(a.pixelSize-i.pixelSize)<.01&&(i.pixelSize=a.pixelSize),Math.abs(a.posterStep-i.posterStep)<4e-4&&(i.posterStep=a.posterStep),a.dofMaxblur===0&&i.dofMaxblur<hg&&(i.dofMaxblur=0),this._syncDof();let o=this._dofPass;if(o){o.enabled=i.dofMaxblur>hg;let e=o.materialBokeh.uniforms;if(e.aperture.value=i.dofAperture,e.maxblur.value=i.dofMaxblur,this.focusTarget){let t=this._camera;t.getWorldDirection(this._focusDir),this._focusDelta.subVectors(this.focusTarget,t.position),e.focus.value=Math.max(this._focusDelta.dot(this._focusDir),t.near)}}let s=this._bloomPass;s.strength=i.bloomStrength,s.radius=i.bloomRadius,s.threshold=i.bloomThreshold;let c=this._finalPass.uniforms;c.uTime.value=this._time,c.uAspect.value=this._width/Math.max(this._height,1),c.uVignetteOffset.value=i.vignetteOffset+(pg-i.vignetteOffset)*this._intro,c.uVignetteDarkness.value=i.vignetteDarkness+(mg-i.vignetteDarkness)*this._intro,c.uGrain.value=i.grain,c.uAberration.value=i.aberration,c.uResolution.value.set(this._width*this._pixelRatio,this._height*this._pixelRatio),c.uPixelSize.value=i.pixelSize,c.uPosterStep.value=i.posterStep,c.uTransition.value=this._transition,c.uReveal.value=this._reveal,c.uSeed.value=this._seed,c.uAccent.value.copy(this._accent),t.render(n)}dispose(){window.removeEventListener(`style-change`,this._onStyleChange),this._teardown()}},yg=.35,bg=.55,xg=.05;function Sg(e){return e<.5?4*e*e*e:1-(-2*e+2)**3/2}var Cg=class{_post;_apply;_current;_target;_queued=null;_phase=`idle`;_t=0;constructor(e,t,n){this._post=e,this._current=t,this._target=t,this._apply=n}get busy(){return this._phase!==`idle`}request(e){if(this._phase!==`idle`){this._queued=e;return}if(e!==this._current){if(!this._post.enabled){this._swap(e);return}this._start(e)}}_start(e){this._target=e,this._phase=`covering`,this._t=0,this._post.setTransitionStyle(Dh[e].accent,Math.random()*100),this._post.setTransition(0,!1)}_swap(e){this._apply(e),this._current=e}update(e){if(this._phase===`idle`)return;let t=Math.min(Math.max(e,0),xg);switch(this._phase){case`covering`:this._t=Math.min(this._t+t/yg,1),this._post.setTransition(Sg(this._t),!1),this._t>=1&&(this._phase=`swap`);break;case`swap`:this._swap(this._target),this._phase=`revealing`,this._t=0,this._post.setTransition(1,!0);break;case`revealing`:if(this._t=Math.min(this._t+t/bg,1),this._post.setTransition(1-Sg(this._t),!0),this._t>=1){this._phase=`idle`,this._post.setTransition(0,!1);let e=this._queued;this._queued=null,e&&e!==this._current&&this.request(e)}}}destroy(){this._queued=null,this._phase=`idle`,this._post.setTransition(0,!1)}},wg=`itec-quality`,Tg=3,Eg=40,Dg=2,Og=2,kg=.25;function Ag(){try{let e=localStorage.getItem(wg);if(e===`high`||e===`low`)return e}catch{}return`high`}var jg=class extends EventTarget{level;constructor(){super(),this.level=Ag()}set(e){if(e!==this.level){this.level=e;try{localStorage.setItem(wg,e)}catch{}this.dispatchEvent(new Event(`change`))}}toggle(){this.set(this.level===`high`?`low`:`high`)}},Mg=class{_onLowFps;_elapsed=0;_windowTime=0;_frames=0;_strikes=0;constructor(e){this._onLowFps=e}reset(){this._windowTime=0,this._frames=0,this._strikes=0}update(e,t){if(this._elapsed+=e,t||e>kg||this._elapsed<Og){this.reset();return}if(this._windowTime+=e,this._frames++,this._windowTime<Tg)return;let n=this._frames/this._windowTime;this._windowTime=0,this._frames=0,this._strikes=n<Eg?this._strikes+1:0,this._strikes>=Dg&&(this._strikes=0,this._onLowFps())}},Ng=3.2,Pg=class{scene;sizes;time;camera;renderer;world;post;styleTransition;quality;_fps;_onQualityChange;_onResize;_onTick;_robotPosition;_robotQuaternion;constructor(e,t,n){this.scene=new In,this.sizes=new Nl,this.time=new Pl,this.camera=new Zl(this.sizes,this.scene),this.renderer=new Ql(e,this.sizes),this.quality=new jg,this.world=new Jh(this.scene,this.renderer.instance,this.camera.instance,t,this.quality.level),this.post=new vg(this.renderer.instance,this.scene,this.camera.instance,Dh[t].post),this.styleTransition=new Cg(this.post,t,n),this._fps=new Mg(()=>this.quality.set(`low`)),this.camera.holdIntro(),this._onQualityChange=()=>this._applyQuality(),this.quality.addEventListener(`change`,this._onQualityChange),this._applyQuality(),this._robotPosition=new V,this._robotQuaternion=new At,this.post.focusTarget=this._robotPosition,this.post.depthExclude=()=>this.world.depthExclude,this._onResize=()=>{this.camera.resize(this.sizes),this.renderer.resize(this.sizes),this.post.resize(this.sizes.width,this.sizes.height,this.renderer.pixelRatio)},this._onTick=()=>{let e=this.time.delta/1e3;this.camera.update(this._robotPosition,this._robotQuaternion,e),this.styleTransition.update(e),this._fps.update(e,this.styleTransition.busy),this.post.enabled?(this.post.setIntro(this.camera.introWeight),this.post.render(e)):this.renderer.update(this.scene,this.camera.instance)},this.sizes.addEventListener(`resize`,this._onResize),this.time.addEventListener(`tick`,this._onTick)}playIntro(){let e=window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;this.camera.playIntro(e?0:Ng),this.world.enterSignature()}_applyQuality(){let e=this.quality.level===`high`;this.renderer.setLowQuality(!e,this.sizes),this.post.resize(this.sizes.width,this.sizes.height,this.renderer.pixelRatio),this.post.setEnabled(e),this.world.setTrailEnabled(e),this.world.setQuality(this.quality.level),this._fps.reset()}update(e,t){this._robotPosition.copy(e),this._robotQuaternion.copy(t),this.world.update(e,t)}destroy(){this.sizes.removeEventListener(`resize`,this._onResize),this.time.removeEventListener(`tick`,this._onTick),this.quality.removeEventListener(`change`,this._onQualityChange),this.styleTransition.destroy(),this.post.dispose(),this.sizes.destroy(),this.time.destroy(),this.renderer.destroy(),this.world.destroy()}},Fg=class e{constructor(e){e===void 0&&(e=[0,0,0,0,0,0,0,0,0]),this.elements=e}identity(){let e=this.elements;e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1}setZero(){let e=this.elements;e[0]=0,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e[8]=0}setTrace(e){let t=this.elements;t[0]=e.x,t[4]=e.y,t[8]=e.z}getTrace(e){e===void 0&&(e=new Z);let t=this.elements;return e.x=t[0],e.y=t[4],e.z=t[8],e}vmult(e,t){t===void 0&&(t=new Z);let n=this.elements,r=e.x,i=e.y,a=e.z;return t.x=n[0]*r+n[1]*i+n[2]*a,t.y=n[3]*r+n[4]*i+n[5]*a,t.z=n[6]*r+n[7]*i+n[8]*a,t}smult(e){for(let t=0;t<this.elements.length;t++)this.elements[t]*=e}mmult(t,n){n===void 0&&(n=new e);let r=this.elements,i=t.elements,a=n.elements,o=r[0],s=r[1],c=r[2],l=r[3],u=r[4],d=r[5],f=r[6],p=r[7],m=r[8],h=i[0],g=i[1],_=i[2],v=i[3],y=i[4],b=i[5],x=i[6],S=i[7],C=i[8];return a[0]=o*h+s*v+c*x,a[1]=o*g+s*y+c*S,a[2]=o*_+s*b+c*C,a[3]=l*h+u*v+d*x,a[4]=l*g+u*y+d*S,a[5]=l*_+u*b+d*C,a[6]=f*h+p*v+m*x,a[7]=f*g+p*y+m*S,a[8]=f*_+p*b+m*C,n}scale(t,n){n===void 0&&(n=new e);let r=this.elements,i=n.elements;for(let e=0;e!==3;e++)i[3*e+0]=t.x*r[3*e+0],i[3*e+1]=t.y*r[3*e+1],i[3*e+2]=t.z*r[3*e+2];return n}solve(e,t){t===void 0&&(t=new Z);let n=[],r,i;for(r=0;r<12;r++)n.push(0);for(r=0;r<3;r++)for(i=0;i<3;i++)n[r+4*i]=this.elements[r+3*i];n[3]=e.x,n[7]=e.y,n[11]=e.z;let a=3,o=a,s,c;do{if(r=o-a,n[r+4*r]===0){for(i=r+1;i<o;i++)if(n[r+4*i]!==0){s=4;do c=4-s,n[c+4*r]+=n[c+4*i];while(--s);break}}if(n[r+4*r]!==0)for(i=r+1;i<o;i++){let e=n[r+4*i]/n[r+4*r];s=4;do c=4-s,n[c+4*i]=c<=r?0:n[c+4*i]-n[c+4*r]*e;while(--s)}}while(--a);if(t.z=n[11]/n[10],t.y=(n[7]-n[6]*t.z)/n[5],t.x=(n[3]-n[2]*t.z-n[1]*t.y)/n[0],isNaN(t.x)||isNaN(t.y)||isNaN(t.z)||t.x===1/0||t.y===1/0||t.z===1/0)throw`Could not solve equation! Got x=[${t.toString()}], b=[${e.toString()}], A=[${this.toString()}]`;return t}e(e,t,n){if(n===void 0)return this.elements[t+3*e];this.elements[t+3*e]=n}copy(e){for(let t=0;t<e.elements.length;t++)this.elements[t]=e.elements[t];return this}toString(){let e=``;for(let t=0;t<9;t++)e+=this.elements[t]+`,`;return e}reverse(t){t===void 0&&(t=new e);let n=Ig,r,i;for(r=0;r<3;r++)for(i=0;i<3;i++)n[r+6*i]=this.elements[r+3*i];n[3]=1,n[9]=0,n[15]=0,n[4]=0,n[10]=1,n[16]=0,n[5]=0,n[11]=0,n[17]=1;let a=3,o=a,s,c;do{if(r=o-a,n[r+6*r]===0){for(i=r+1;i<o;i++)if(n[r+6*i]!==0){s=6;do c=6-s,n[c+6*r]+=n[c+6*i];while(--s);break}}if(n[r+6*r]!==0)for(i=r+1;i<o;i++){let e=n[r+6*i]/n[r+6*r];s=6;do c=6-s,n[c+6*i]=c<=r?0:n[c+6*i]-n[c+6*r]*e;while(--s)}}while(--a);r=2;do{i=r-1;do{let e=n[r+6*i]/n[r+6*r];s=6;do c=6-s,n[c+6*i]=n[c+6*i]-n[c+6*r]*e;while(--s)}while(i--)}while(--r);r=2;do{let e=1/n[r+6*r];s=6;do c=6-s,n[c+6*r]=n[c+6*r]*e;while(--s)}while(r--);r=2;do{i=2;do{if(c=n[3+i+6*r],isNaN(c)||c===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(r,i,c)}while(i--)}while(r--);return t}setRotationFromQuaternion(e){let t=e.x,n=e.y,r=e.z,i=e.w,a=t+t,o=n+n,s=r+r,c=t*a,l=t*o,u=t*s,d=n*o,f=n*s,p=r*s,m=i*a,h=i*o,g=i*s,_=this.elements;return _[0]=1-(d+p),_[1]=l-g,_[2]=u+h,_[3]=l+g,_[4]=1-(c+p),_[5]=f-m,_[6]=u-h,_[7]=f+m,_[8]=1-(c+d),this}transpose(t){t===void 0&&(t=new e);let n=this.elements,r=t.elements,i;return r[0]=n[0],r[4]=n[4],r[8]=n[8],i=n[1],r[1]=n[3],r[3]=i,i=n[2],r[2]=n[6],r[6]=i,i=n[5],r[5]=n[7],r[7]=i,t}},Ig=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],Z=class e{constructor(e,t,n){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0),this.x=e,this.y=t,this.z=n}cross(t,n){n===void 0&&(n=new e);let r=t.x,i=t.y,a=t.z,o=this.x,s=this.y,c=this.z;return n.x=s*a-c*i,n.y=c*r-o*a,n.z=o*i-s*r,n}set(e,t,n){return this.x=e,this.y=t,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,n){if(n)n.x=t.x+this.x,n.y=t.y+this.y,n.z=t.z+this.z;else return new e(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,n){if(n)n.x=this.x-t.x,n.y=this.y-t.y,n.z=this.z-t.z;else return new e(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new Fg([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){let e=this.x,t=this.y,n=this.z,r=Math.sqrt(e*e+t*t+n*n);if(r>0){let e=1/r;this.x*=e,this.y*=e,this.z*=e}else this.x=0,this.y=0,this.z=0;return r}unit(t){t===void 0&&(t=new e);let n=this.x,r=this.y,i=this.z,a=Math.sqrt(n*n+r*r+i*i);return a>0?(a=1/a,t.x=n*a,t.y=r*a,t.z=i*a):(t.x=1,t.y=0,t.z=0),t}length(){let e=this.x,t=this.y,n=this.z;return Math.sqrt(e*e+t*t+n*n)}lengthSquared(){return this.dot(this)}distanceTo(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z;return Math.sqrt((i-t)*(i-t)+(a-n)*(a-n)+(o-r)*(o-r))}distanceSquared(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z;return(i-t)*(i-t)+(a-n)*(a-n)+(o-r)*(o-r)}scale(t,n){n===void 0&&(n=new e);let r=this.x,i=this.y,a=this.z;return n.x=t*r,n.y=t*i,n.z=t*a,n}vmul(t,n){return n===void 0&&(n=new e),n.x=t.x*this.x,n.y=t.y*this.y,n.z=t.z*this.z,n}addScaledVector(t,n,r){return r===void 0&&(r=new e),r.x=this.x+t*n.x,r.y=this.y+t*n.y,r.z=this.z+t*n.z,r}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new e),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(e,t){let n=this.length();if(n>0){let r=Lg,i=1/n;r.set(this.x*i,this.y*i,this.z*i);let a=Rg;Math.abs(r.x)<.9?(a.set(1,0,0),r.cross(a,e)):(a.set(0,1,0),r.cross(a,e)),r.cross(e,t)}else e.set(1,0,0),t.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}lerp(e,t,n){let r=this.x,i=this.y,a=this.z;n.x=r+(e.x-r)*t,n.y=i+(e.y-i)*t,n.z=a+(e.z-a)*t}almostEquals(e,t){return t===void 0&&(t=1e-6),!(Math.abs(this.x-e.x)>t||Math.abs(this.y-e.y)>t||Math.abs(this.z-e.z)>t)}almostZero(e){return e===void 0&&(e=1e-6),!(Math.abs(this.x)>e||Math.abs(this.y)>e||Math.abs(this.z)>e)}isAntiparallelTo(e,t){return this.negate(zg),zg.almostEquals(e,t)}clone(){return new e(this.x,this.y,this.z)}};Z.ZERO=new Z(0,0,0),Z.UNIT_X=new Z(1,0,0),Z.UNIT_Y=new Z(0,1,0),Z.UNIT_Z=new Z(0,0,1);var Lg=new Z,Rg=new Z,zg=new Z,Bg=class e{constructor(e){e===void 0&&(e={}),this.lowerBound=new Z,this.upperBound=new Z,e.lowerBound&&this.lowerBound.copy(e.lowerBound),e.upperBound&&this.upperBound.copy(e.upperBound)}setFromPoints(e,t,n,r){let i=this.lowerBound,a=this.upperBound,o=n;i.copy(e[0]),o&&o.vmult(i,i),a.copy(i);for(let t=1;t<e.length;t++){let n=e[t];o&&(o.vmult(n,Vg),n=Vg),n.x>a.x&&(a.x=n.x),n.x<i.x&&(i.x=n.x),n.y>a.y&&(a.y=n.y),n.y<i.y&&(i.y=n.y),n.z>a.z&&(a.z=n.z),n.z<i.z&&(i.z=n.z)}return t&&(t.vadd(i,i),t.vadd(a,a)),r&&(i.x-=r,i.y-=r,i.z-=r,a.x+=r,a.y+=r,a.z+=r),this}copy(e){return this.lowerBound.copy(e.lowerBound),this.upperBound.copy(e.upperBound),this}clone(){return new e().copy(this)}extend(e){this.lowerBound.x=Math.min(this.lowerBound.x,e.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,e.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,e.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,e.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,e.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,e.upperBound.z)}overlaps(e){let t=this.lowerBound,n=this.upperBound,r=e.lowerBound,i=e.upperBound,a=r.x<=n.x&&n.x<=i.x||t.x<=i.x&&i.x<=n.x,o=r.y<=n.y&&n.y<=i.y||t.y<=i.y&&i.y<=n.y,s=r.z<=n.z&&n.z<=i.z||t.z<=i.z&&i.z<=n.z;return a&&o&&s}volume(){let e=this.lowerBound,t=this.upperBound;return(t.x-e.x)*(t.y-e.y)*(t.z-e.z)}contains(e){let t=this.lowerBound,n=this.upperBound,r=e.lowerBound,i=e.upperBound;return t.x<=r.x&&n.x>=i.x&&t.y<=r.y&&n.y>=i.y&&t.z<=r.z&&n.z>=i.z}getCorners(e,t,n,r,i,a,o,s){let c=this.lowerBound,l=this.upperBound;e.copy(c),t.set(l.x,c.y,c.z),n.set(l.x,l.y,c.z),r.set(c.x,l.y,l.z),i.set(l.x,c.y,l.z),a.set(c.x,l.y,c.z),o.set(c.x,c.y,l.z),s.copy(l)}toLocalFrame(e,t){let n=Hg,r=n[0],i=n[1],a=n[2],o=n[3],s=n[4],c=n[5],l=n[6],u=n[7];this.getCorners(r,i,a,o,s,c,l,u);for(let t=0;t!==8;t++){let r=n[t];e.pointToLocal(r,r)}return t.setFromPoints(n)}toWorldFrame(e,t){let n=Hg,r=n[0],i=n[1],a=n[2],o=n[3],s=n[4],c=n[5],l=n[6],u=n[7];this.getCorners(r,i,a,o,s,c,l,u);for(let t=0;t!==8;t++){let r=n[t];e.pointToWorld(r,r)}return t.setFromPoints(n)}overlapsRay(e){let{direction:t,from:n}=e,r=1/t.x,i=1/t.y,a=1/t.z,o=(this.lowerBound.x-n.x)*r,s=(this.upperBound.x-n.x)*r,c=(this.lowerBound.y-n.y)*i,l=(this.upperBound.y-n.y)*i,u=(this.lowerBound.z-n.z)*a,d=(this.upperBound.z-n.z)*a,f=Math.max(Math.max(Math.min(o,s),Math.min(c,l)),Math.min(u,d)),p=Math.min(Math.min(Math.max(o,s),Math.max(c,l)),Math.max(u,d));return!(p<0||f>p)}},Vg=new Z,Hg=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],Ug=class{constructor(){this.matrix=[]}get(e,t){let{index:n}=e,{index:r}=t;if(r>n){let e=r;r=n,n=e}return this.matrix[(n*(n+1)>>1)+r-1]}set(e,t,n){let{index:r}=e,{index:i}=t;if(i>r){let e=i;i=r,r=e}this.matrix[(r*(r+1)>>1)+i-1]=+!!n}reset(){for(let e=0,t=this.matrix.length;e!==t;e++)this.matrix[e]=0}setNumObjects(e){this.matrix.length=e*(e-1)>>1}},Wg=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;return n[e]===void 0&&(n[e]=[]),n[e].includes(t)||n[e].push(t),this}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return!!(n[e]!==void 0&&n[e].includes(t))}hasAnyEventListener(e){return this._listeners!==void 0&&this._listeners[e]!==void 0}removeEventListener(e,t){if(this._listeners===void 0)return this;let n=this._listeners;if(n[e]===void 0)return this;let r=n[e].indexOf(t);return r!==-1&&n[e].splice(r,1),this}dispatchEvent(e){if(this._listeners===void 0)return this;let t=this._listeners[e.type];if(t!==void 0){e.target=this;for(let n=0,r=t.length;n<r;n++)t[n].call(this,e)}return this}},Gg=class e{constructor(e,t,n,r){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0),r===void 0&&(r=1),this.x=e,this.y=t,this.z=n,this.w=r}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(e,t){let n=Math.sin(t*.5);return this.x=e.x*n,this.y=e.y*n,this.z=e.z*n,this.w=Math.cos(t*.5),this}toAxisAngle(e){e===void 0&&(e=new Z),this.normalize();let t=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(e.x=this.x,e.y=this.y,e.z=this.z):(e.x=this.x/n,e.y=this.y/n,e.z=this.z/n),[e,t]}setFromVectors(e,t){if(e.isAntiparallelTo(t)){let t=Kg,n=qg;e.tangents(t,n),this.setFromAxisAngle(t,Math.PI)}else{let n=e.cross(t);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(e.length()**2*t.length()**2)+e.dot(t),this.normalize()}return this}mult(t,n){n===void 0&&(n=new e);let r=this.x,i=this.y,a=this.z,o=this.w,s=t.x,c=t.y,l=t.z,u=t.w;return n.x=r*u+o*s+i*l-a*c,n.y=i*u+o*c+a*s-r*l,n.z=a*u+o*l+r*c-i*s,n.w=o*u-r*s-i*c-a*l,n}inverse(t){t===void 0&&(t=new e);let n=this.x,r=this.y,i=this.z,a=this.w;this.conjugate(t);let o=1/(n*n+r*r+i*i+a*a);return t.x*=o,t.y*=o,t.z*=o,t.w*=o,t}conjugate(t){return t===void 0&&(t=new e),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(e=1/e,this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}normalizeFast(){let e=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}vmult(e,t){t===void 0&&(t=new Z);let n=e.x,r=e.y,i=e.z,a=this.x,o=this.y,s=this.z,c=this.w,l=c*n+o*i-s*r,u=c*r+s*n-a*i,d=c*i+a*r-o*n,f=-a*n-o*r-s*i;return t.x=l*c+f*-a+u*-s-d*-o,t.y=u*c+f*-o+d*-a-l*-s,t.z=d*c+f*-s+l*-o-u*-a,t}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w,this}toEuler(e,t){t===void 0&&(t=`YZX`);let n,r,i,a=this.x,o=this.y,s=this.z,c=this.w;switch(t){case`YZX`:let e=a*o+s*c;if(e>.499&&(n=2*Math.atan2(a,c),r=Math.PI/2,i=0),e<-.499&&(n=-2*Math.atan2(a,c),r=-Math.PI/2,i=0),n===void 0){let t=a*a,l=o*o,u=s*s;n=Math.atan2(2*o*c-2*a*s,1-2*l-2*u),r=Math.asin(2*e),i=Math.atan2(2*a*c-2*o*s,1-2*t-2*u)}break;default:throw Error(`Euler order ${t} not supported yet.`)}e.y=n,e.z=r,e.x=i}setFromEuler(e,t,n,r){r===void 0&&(r=`XYZ`);let i=Math.cos(e/2),a=Math.cos(t/2),o=Math.cos(n/2),s=Math.sin(e/2),c=Math.sin(t/2),l=Math.sin(n/2);return r===`XYZ`?(this.x=s*a*o+i*c*l,this.y=i*c*o-s*a*l,this.z=i*a*l+s*c*o,this.w=i*a*o-s*c*l):r===`YXZ`?(this.x=s*a*o+i*c*l,this.y=i*c*o-s*a*l,this.z=i*a*l-s*c*o,this.w=i*a*o+s*c*l):r===`ZXY`?(this.x=s*a*o-i*c*l,this.y=i*c*o+s*a*l,this.z=i*a*l+s*c*o,this.w=i*a*o-s*c*l):r===`ZYX`?(this.x=s*a*o-i*c*l,this.y=i*c*o+s*a*l,this.z=i*a*l-s*c*o,this.w=i*a*o+s*c*l):r===`YZX`?(this.x=s*a*o+i*c*l,this.y=i*c*o+s*a*l,this.z=i*a*l-s*c*o,this.w=i*a*o-s*c*l):r===`XZY`&&(this.x=s*a*o-i*c*l,this.y=i*c*o-s*a*l,this.z=i*a*l+s*c*o,this.w=i*a*o+s*c*l),this}clone(){return new e(this.x,this.y,this.z,this.w)}slerp(t,n,r){r===void 0&&(r=new e);let i=this.x,a=this.y,o=this.z,s=this.w,c=t.x,l=t.y,u=t.z,d=t.w,f,p,m,h,g;return p=i*c+a*l+o*u+s*d,p<0&&(p=-p,c=-c,l=-l,u=-u,d=-d),1-p>1e-6?(f=Math.acos(p),m=Math.sin(f),h=Math.sin((1-n)*f)/m,g=Math.sin(n*f)/m):(h=1-n,g=n),r.x=h*i+g*c,r.y=h*a+g*l,r.z=h*o+g*u,r.w=h*s+g*d,r}integrate(t,n,r,i){i===void 0&&(i=new e);let a=t.x*r.x,o=t.y*r.y,s=t.z*r.z,c=this.x,l=this.y,u=this.z,d=this.w,f=n*.5;return i.x+=f*(a*d+o*u-s*l),i.y+=f*(o*d+s*c-a*u),i.z+=f*(s*d+a*l-o*c),i.w+=f*(-a*c-o*l-s*u),i}},Kg=new Z,qg=new Z,Jg={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256},Q=class e{constructor(t){t===void 0&&(t={}),this.id=e.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=!t.collisionResponse||t.collisionResponse,this.collisionFilterGroup=t.collisionFilterGroup===void 0?1:t.collisionFilterGroup,this.collisionFilterMask=t.collisionFilterMask===void 0?-1:t.collisionFilterMask,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(e,t){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(e,t,n,r){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}};Q.idCounter=0,Q.types=Jg;var Yg=class e{constructor(e){e===void 0&&(e={}),this.position=new Z,this.quaternion=new Gg,e.position&&this.position.copy(e.position),e.quaternion&&this.quaternion.copy(e.quaternion)}pointToLocal(t,n){return e.pointToLocalFrame(this.position,this.quaternion,t,n)}pointToWorld(t,n){return e.pointToWorldFrame(this.position,this.quaternion,t,n)}vectorToWorldFrame(e,t){return t===void 0&&(t=new Z),this.quaternion.vmult(e,t),t}static pointToLocalFrame(e,t,n,r){return r===void 0&&(r=new Z),n.vsub(e,r),t.conjugate(Xg),Xg.vmult(r,r),r}static pointToWorldFrame(e,t,n,r){return r===void 0&&(r=new Z),t.vmult(n,r),r.vadd(e,r),r}static vectorToWorldFrame(e,t,n){return n===void 0&&(n=new Z),e.vmult(t,n),n}static vectorToLocalFrame(e,t,n,r){return r===void 0&&(r=new Z),t.w*=-1,t.vmult(n,r),t.w*=-1,r}},Xg=new Gg,Zg=class e extends Q{constructor(e){e===void 0&&(e={});let{vertices:t=[],faces:n=[],normals:r=[],axes:i,boundingSphereRadius:a}=e;super({type:Q.types.CONVEXPOLYHEDRON}),this.vertices=t,this.faces=n,this.faceNormals=r,this.faceNormals.length===0&&this.computeNormals(),a?this.boundingSphereRadius=a:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=i?i.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){let e=this.faces,t=this.vertices,n=this.uniqueEdges;n.length=0;let r=new Z;for(let i=0;i!==e.length;i++){let a=e[i],o=a.length;for(let e=0;e!==o;e++){let i=(e+1)%o;t[a[e]].vsub(t[a[i]],r),r.normalize();let s=!1;for(let e=0;e!==n.length;e++)if(n[e].almostEquals(r)||n[e].almostEquals(r)){s=!0;break}s||n.push(r.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let e=0;e<this.faces.length;e++){for(let t=0;t<this.faces[e].length;t++)if(!this.vertices[this.faces[e][t]])throw Error(`Vertex ${this.faces[e][t]} not found!`);let t=this.faceNormals[e]||new Z;this.getFaceNormal(e,t),t.negate(t),this.faceNormals[e]=t;let n=this.vertices[this.faces[e][0]];if(t.dot(n)<0){console.error(`.faceNormals[${e}] = Vec3(${t.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let t=0;t<this.faces[e].length;t++)console.warn(`.vertices[${this.faces[e][t]}] = Vec3(${this.vertices[this.faces[e][t]].toString()})`)}}}getFaceNormal(t,n){let r=this.faces[t],i=this.vertices[r[0]],a=this.vertices[r[1]],o=this.vertices[r[2]];e.computeNormal(i,a,o,n)}static computeNormal(e,t,n,r){let i=new Z,a=new Z;t.vsub(e,a),n.vsub(t,i),i.cross(a,r),r.isZero()||r.normalize()}clipAgainstHull(e,t,n,r,i,a,o,s,c){let l=new Z,u=-1,d=-Number.MAX_VALUE;for(let e=0;e<n.faces.length;e++){l.copy(n.faceNormals[e]),i.vmult(l,l);let t=l.dot(a);t>d&&(d=t,u=e)}let f=[];for(let e=0;e<n.faces[u].length;e++){let t=n.vertices[n.faces[u][e]],a=new Z;a.copy(t),i.vmult(a,a),r.vadd(a,a),f.push(a)}u>=0&&this.clipFaceAgainstHull(a,e,t,f,o,s,c)}findSeparatingAxis(e,t,n,r,i,a,o,s){let c=new Z,l=new Z,u=new Z,d=new Z,f=new Z,p=new Z,m=Number.MAX_VALUE,h=this;if(h.uniqueAxes)for(let o=0;o!==h.uniqueAxes.length;o++){n.vmult(h.uniqueAxes[o],c);let s=h.testSepAxis(c,e,t,n,r,i);if(s===!1)return!1;s<m&&(m=s,a.copy(c))}else{let s=o?o.length:h.faces.length;for(let l=0;l<s;l++){let s=o?o[l]:l;c.copy(h.faceNormals[s]),n.vmult(c,c);let u=h.testSepAxis(c,e,t,n,r,i);if(u===!1)return!1;u<m&&(m=u,a.copy(c))}}if(e.uniqueAxes)for(let o=0;o!==e.uniqueAxes.length;o++){i.vmult(e.uniqueAxes[o],l);let s=h.testSepAxis(l,e,t,n,r,i);if(s===!1)return!1;s<m&&(m=s,a.copy(l))}else{let o=s?s.length:e.faces.length;for(let c=0;c<o;c++){let o=s?s[c]:c;l.copy(e.faceNormals[o]),i.vmult(l,l);let u=h.testSepAxis(l,e,t,n,r,i);if(u===!1)return!1;u<m&&(m=u,a.copy(l))}}for(let o=0;o!==h.uniqueEdges.length;o++){n.vmult(h.uniqueEdges[o],d);for(let o=0;o!==e.uniqueEdges.length;o++)if(i.vmult(e.uniqueEdges[o],f),d.cross(f,p),!p.almostZero()){p.normalize();let o=h.testSepAxis(p,e,t,n,r,i);if(o===!1)return!1;o<m&&(m=o,a.copy(p))}}return r.vsub(t,u),u.dot(a)>0&&a.negate(a),!0}testSepAxis(t,n,r,i,a,o){let s=this;e.project(s,t,r,i,Qg),e.project(n,t,a,o,$g);let c=Qg[0],l=Qg[1],u=$g[0],d=$g[1];if(c<d||u<l)return!1;let f=c-d,p=u-l;return f<p?f:p}calculateLocalInertia(e,t){let n=new Z,r=new Z;this.computeLocalAABB(r,n);let i=n.x-r.x,a=n.y-r.y,o=n.z-r.z;t.x=1/12*e*(2*a*2*a+2*o*2*o),t.y=1/12*e*(2*i*2*i+2*o*2*o),t.z=1/12*e*(2*a*2*a+2*i*2*i)}getPlaneConstantOfFace(e){let t=this.faces[e],n=this.faceNormals[e],r=this.vertices[t[0]];return-n.dot(r)}clipFaceAgainstHull(e,t,n,r,i,a,o){let s=new Z,c=new Z,l=new Z,u=new Z,d=new Z,f=new Z,p=new Z,m=new Z,h=this,g=[],_=r,v=g,y=-1,b=Number.MAX_VALUE;for(let t=0;t<h.faces.length;t++){s.copy(h.faceNormals[t]),n.vmult(s,s);let r=s.dot(e);r<b&&(b=r,y=t)}if(y<0)return;let x=h.faces[y];x.connectedFaces=[];for(let e=0;e<h.faces.length;e++)for(let t=0;t<h.faces[e].length;t++)x.indexOf(h.faces[e][t])!==-1&&e!==y&&x.connectedFaces.indexOf(e)===-1&&x.connectedFaces.push(e);let S=x.length;for(let e=0;e<S;e++){let r=h.vertices[x[e]],i=h.vertices[x[(e+1)%S]];r.vsub(i,c),l.copy(c),n.vmult(l,l),t.vadd(l,l),u.copy(this.faceNormals[y]),n.vmult(u,u),t.vadd(u,u),l.cross(u,d),d.negate(d),f.copy(r),n.vmult(f,f),t.vadd(f,f);let a=x.connectedFaces[e];p.copy(this.faceNormals[a]);let o=this.getPlaneConstantOfFace(a);m.copy(p),n.vmult(m,m);let s=o-m.dot(t);for(this.clipFaceAgainstPlane(_,v,m,s);_.length;)_.shift();for(;v.length;)_.push(v.shift())}p.copy(this.faceNormals[y]);let C=this.getPlaneConstantOfFace(y);m.copy(p),n.vmult(m,m);let w=C-m.dot(t);for(let e=0;e<_.length;e++){let t=m.dot(_[e])+w;if(t<=i&&(console.log(`clamped: depth=${t} to minDist=${i}`),t=i),t<=a){let n=_[e];if(t<=1e-6){let e={point:n,normal:m,depth:t};o.push(e)}}}}clipFaceAgainstPlane(e,t,n,r){let i,a,o=e.length;if(o<2)return t;let s=e[e.length-1],c=e[0];i=n.dot(s)+r;for(let l=0;l<o;l++){if(c=e[l],a=n.dot(c)+r,i<0){if(a<0){let e=new Z;e.copy(c),t.push(e)}else{let e=new Z;s.lerp(c,i/(i-a),e),t.push(e)}}else if(a<0){let e=new Z;s.lerp(c,i/(i-a),e),t.push(e),t.push(c)}s=c,i=a}return t}computeWorldVertices(e,t){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new Z);let n=this.vertices,r=this.worldVertices;for(let i=0;i!==this.vertices.length;i++)t.vmult(n[i],r[i]),e.vadd(r[i],r[i]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(e,t){let n=this.vertices;e.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),t.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let r=0;r<this.vertices.length;r++){let i=n[r];i.x<e.x?e.x=i.x:i.x>t.x&&(t.x=i.x),i.y<e.y?e.y=i.y:i.y>t.y&&(t.y=i.y),i.z<e.z?e.z=i.z:i.z>t.z&&(t.z=i.z)}}computeWorldFaceNormals(e){let t=this.faceNormals.length;for(;this.worldFaceNormals.length<t;)this.worldFaceNormals.push(new Z);let n=this.faceNormals,r=this.worldFaceNormals;for(let i=0;i!==t;i++)e.vmult(n[i],r[i]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let e=0,t=this.vertices;for(let n=0;n!==t.length;n++){let r=t[n].lengthSquared();r>e&&(e=r)}this.boundingSphereRadius=Math.sqrt(e)}calculateWorldAABB(e,t,n,r){let i=this.vertices,a,o,s,c,l,u,d=new Z;for(let n=0;n<i.length;n++){d.copy(i[n]),t.vmult(d,d),e.vadd(d,d);let r=d;(a===void 0||r.x<a)&&(a=r.x),(c===void 0||r.x>c)&&(c=r.x),(o===void 0||r.y<o)&&(o=r.y),(l===void 0||r.y>l)&&(l=r.y),(s===void 0||r.z<s)&&(s=r.z),(u===void 0||r.z>u)&&(u=r.z)}n.set(a,o,s),r.set(c,l,u)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(e){e===void 0&&(e=new Z);let t=this.vertices;for(let n=0;n<t.length;n++)e.vadd(t[n],e);return e.scale(1/t.length,e),e}transformAllPoints(e,t){let n=this.vertices.length,r=this.vertices;if(t){for(let e=0;e<n;e++){let n=r[e];t.vmult(n,n)}for(let e=0;e<this.faceNormals.length;e++){let n=this.faceNormals[e];t.vmult(n,n)}}if(e)for(let t=0;t<n;t++){let n=r[t];n.vadd(e,n)}}pointIsInside(e){let t=this.vertices,n=this.faces,r=this.faceNormals,i=new Z;this.getAveragePointLocal(i);for(let a=0;a<this.faces.length;a++){let o=r[a],s=t[n[a][0]],c=new Z;e.vsub(s,c);let l=o.dot(c),u=new Z;i.vsub(s,u);let d=o.dot(u);if(l<0&&d>0||l>0&&d<0)return!1}return-1}static project(e,t,n,r,i){let a=e.vertices.length,o=e_,s=0,c=0,l=t_,u=e.vertices;l.setZero(),Yg.vectorToLocalFrame(n,r,t,o),Yg.pointToLocalFrame(n,r,l,l);let d=l.dot(o);c=s=u[0].dot(o);for(let e=1;e<a;e++){let t=u[e].dot(o);t>s&&(s=t),t<c&&(c=t)}if(c-=d,s-=d,c>s){let e=c;c=s,s=e}i[0]=s,i[1]=c}},Qg=[],$g=[];new Z;var e_=new Z,t_=new Z,n_=class e extends Q{constructor(e){super({type:Q.types.BOX}),this.halfExtents=e,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){let e=this.halfExtents.x,t=this.halfExtents.y,n=this.halfExtents.z,r=Z,i=new Zg({vertices:[new r(-e,-t,-n),new r(e,-t,-n),new r(e,t,-n),new r(-e,t,-n),new r(-e,-t,n),new r(e,-t,n),new r(e,t,n),new r(-e,t,n)],faces:[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],axes:[new r(0,0,1),new r(0,1,0),new r(1,0,0)]});this.convexPolyhedronRepresentation=i,i.material=this.material}calculateLocalInertia(t,n){return n===void 0&&(n=new Z),e.calculateInertia(this.halfExtents,t,n),n}static calculateInertia(e,t,n){let r=e;n.x=1/12*t*(2*r.y*2*r.y+2*r.z*2*r.z),n.y=1/12*t*(2*r.x*2*r.x+2*r.z*2*r.z),n.z=1/12*t*(2*r.y*2*r.y+2*r.x*2*r.x)}getSideNormals(e,t){let n=e,r=this.halfExtents;if(n[0].set(r.x,0,0),n[1].set(0,r.y,0),n[2].set(0,0,r.z),n[3].set(-r.x,0,0),n[4].set(0,-r.y,0),n[5].set(0,0,-r.z),t!==void 0)for(let e=0;e!==n.length;e++)t.vmult(n[e],n[e]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(e,t,n){let r=this.halfExtents,i=[[r.x,r.y,r.z],[-r.x,r.y,r.z],[-r.x,-r.y,r.z],[-r.x,-r.y,-r.z],[r.x,-r.y,-r.z],[r.x,r.y,-r.z],[-r.x,r.y,-r.z],[r.x,-r.y,r.z]];for(let r=0;r<i.length;r++)r_.set(i[r][0],i[r][1],i[r][2]),t.vmult(r_,r_),e.vadd(r_,r_),n(r_.x,r_.y,r_.z)}calculateWorldAABB(e,t,n,r){let i=this.halfExtents;i_[0].set(i.x,i.y,i.z),i_[1].set(-i.x,i.y,i.z),i_[2].set(-i.x,-i.y,i.z),i_[3].set(-i.x,-i.y,-i.z),i_[4].set(i.x,-i.y,-i.z),i_[5].set(i.x,i.y,-i.z),i_[6].set(-i.x,i.y,-i.z),i_[7].set(i.x,-i.y,i.z);let a=i_[0];t.vmult(a,a),e.vadd(a,a),r.copy(a),n.copy(a);for(let i=1;i<8;i++){let a=i_[i];t.vmult(a,a),e.vadd(a,a);let o=a.x,s=a.y,c=a.z;o>r.x&&(r.x=o),s>r.y&&(r.y=s),c>r.z&&(r.z=c),o<n.x&&(n.x=o),s<n.y&&(n.y=s),c<n.z&&(n.z=c)}}},r_=new Z,i_=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],a_={DYNAMIC:1,STATIC:2,KINEMATIC:4},o_={AWAKE:0,SLEEPY:1,SLEEPING:2},$=class e extends Wg{constructor(t){t===void 0&&(t={}),super(),this.id=e.idCounter++,this.index=-1,this.world=null,this.vlambda=new Z,this.collisionFilterGroup=typeof t.collisionFilterGroup==`number`?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask==`number`?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse!=`boolean`||t.collisionResponse,this.position=new Z,this.previousPosition=new Z,this.interpolatedPosition=new Z,this.initPosition=new Z,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new Z,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new Z,this.force=new Z;let n=typeof t.mass==`number`?t.mass:0;this.mass=n,this.invMass=n>0?1/n:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping==`number`?t.linearDamping:.01,this.type=n<=0?e.STATIC:e.DYNAMIC,typeof t.type==typeof e.STATIC&&(this.type=t.type),this.allowSleep=t.allowSleep===void 0||t.allowSleep,this.sleepState=e.AWAKE,this.sleepSpeedLimit=t.sleepSpeedLimit===void 0?.1:t.sleepSpeedLimit,this.sleepTimeLimit=t.sleepTimeLimit===void 0?1:t.sleepTimeLimit,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new Z,this.quaternion=new Gg,this.initQuaternion=new Gg,this.previousQuaternion=new Gg,this.interpolatedQuaternion=new Gg,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new Z,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new Z,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new Z,this.invInertia=new Z,this.invInertiaWorld=new Fg,this.invMassSolve=0,this.invInertiaSolve=new Z,this.invInertiaWorldSolve=new Fg,this.fixedRotation=t.fixedRotation!==void 0&&t.fixedRotation,this.angularDamping=t.angularDamping===void 0?.01:t.angularDamping,this.linearFactor=new Z(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new Z(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new Bg,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new Z,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){let t=this.sleepState;this.sleepState=e.AWAKE,this.wakeUpAfterNarrowphase=!1,t===e.SLEEPING&&this.dispatchEvent(e.wakeupEvent)}sleep(){this.sleepState=e.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){let n=this.sleepState,r=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;n===e.AWAKE&&r<i?(this.sleepState=e.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(e.sleepyEvent)):n===e.SLEEPY&&r>i?this.wakeUp():n===e.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(e.sleepEvent))}}updateSolveMassProperties(){this.sleepState===e.SLEEPING||this.type===e.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(e,t){return t===void 0&&(t=new Z),e.vsub(this.position,t),this.quaternion.conjugate().vmult(t,t),t}vectorToLocalFrame(e,t){return t===void 0&&(t=new Z),this.quaternion.conjugate().vmult(e,t),t}pointToWorldFrame(e,t){return t===void 0&&(t=new Z),this.quaternion.vmult(e,t),t.vadd(this.position,t),t}vectorToWorldFrame(e,t){return t===void 0&&(t=new Z),this.quaternion.vmult(e,t),t}addShape(e,t,n){let r=new Z,i=new Gg;return t&&r.copy(t),n&&i.copy(n),this.shapes.push(e),this.shapeOffsets.push(r),this.shapeOrientations.push(i),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=this,this}removeShape(e){let t=this.shapes.indexOf(e);return t===-1?(console.warn(`Shape does not belong to the body`),this):(this.shapes.splice(t,1),this.shapeOffsets.splice(t,1),this.shapeOrientations.splice(t,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=null,this)}updateBoundingRadius(){let e=this.shapes,t=this.shapeOffsets,n=e.length,r=0;for(let i=0;i!==n;i++){let n=e[i];n.updateBoundingSphereRadius();let a=t[i].length(),o=n.boundingSphereRadius;a+o>r&&(r=a+o)}this.boundingRadius=r}updateAABB(){let e=this.shapes,t=this.shapeOffsets,n=this.shapeOrientations,r=e.length,i=s_,a=c_,o=this.quaternion,s=this.aabb,c=l_;for(let l=0;l!==r;l++){let r=e[l];o.vmult(t[l],i),i.vadd(this.position,i),o.mult(n[l],a),r.calculateWorldAABB(i,a,c.lowerBound,c.upperBound),l===0?s.copy(c):s.extend(c)}this.aabbNeedsUpdate=!1}updateInertiaWorld(e){let t=this.invInertia;if(t.x!==t.y||t.y!==t.z||e){let e=u_,n=d_;e.setRotationFromQuaternion(this.quaternion),e.transpose(n),e.scale(t,e),e.mmult(n,this.invInertiaWorld)}}applyForce(t,n){if(n===void 0&&(n=new Z),this.type!==e.DYNAMIC)return;this.sleepState===e.SLEEPING&&this.wakeUp();let r=f_;n.cross(t,r),this.force.vadd(t,this.force),this.torque.vadd(r,this.torque)}applyLocalForce(t,n){if(n===void 0&&(n=new Z),this.type!==e.DYNAMIC)return;let r=p_,i=m_;this.vectorToWorldFrame(t,r),this.vectorToWorldFrame(n,i),this.applyForce(r,i)}applyTorque(t){this.type===e.DYNAMIC&&(this.sleepState===e.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,n){if(n===void 0&&(n=new Z),this.type!==e.DYNAMIC)return;this.sleepState===e.SLEEPING&&this.wakeUp();let r=n,i=h_;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);let a=g_;r.cross(t,a),this.invInertiaWorld.vmult(a,a),this.angularVelocity.vadd(a,this.angularVelocity)}applyLocalImpulse(t,n){if(n===void 0&&(n=new Z),this.type!==e.DYNAMIC)return;let r=__,i=v_;this.vectorToWorldFrame(t,r),this.vectorToWorldFrame(n,i),this.applyImpulse(r,i)}updateMassProperties(){let e=y_;this.invMass=this.mass>0?1/this.mass:0;let t=this.inertia,n=this.fixedRotation;this.updateAABB(),e.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),n_.calculateInertia(e,this.mass,t),this.invInertia.set(t.x>0&&!n?1/t.x:0,t.y>0&&!n?1/t.y:0,t.z>0&&!n?1/t.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(e,t){let n=new Z;return e.vsub(this.position,n),this.angularVelocity.cross(n,t),this.velocity.vadd(t,t),t}integrate(t,n,r){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),this.type!==e.DYNAMIC&&this.type!==e.KINEMATIC||this.sleepState===e.SLEEPING)return;let i=this.velocity,a=this.angularVelocity,o=this.position,s=this.force,c=this.torque,l=this.quaternion,u=this.invMass,d=this.invInertiaWorld,f=this.linearFactor,p=u*t;i.x+=s.x*p*f.x,i.y+=s.y*p*f.y,i.z+=s.z*p*f.z;let m=d.elements,h=this.angularFactor,g=c.x*h.x,_=c.y*h.y,v=c.z*h.z;a.x+=t*(m[0]*g+m[1]*_+m[2]*v),a.y+=t*(m[3]*g+m[4]*_+m[5]*v),a.z+=t*(m[6]*g+m[7]*_+m[8]*v),o.x+=i.x*t,o.y+=i.y*t,o.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),n&&(r?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}};$.idCounter=0,$.COLLIDE_EVENT_NAME=`collide`,$.DYNAMIC=a_.DYNAMIC,$.STATIC=a_.STATIC,$.KINEMATIC=a_.KINEMATIC,$.AWAKE=o_.AWAKE,$.SLEEPY=o_.SLEEPY,$.SLEEPING=o_.SLEEPING,$.wakeupEvent={type:`wakeup`},$.sleepyEvent={type:`sleepy`},$.sleepEvent={type:`sleep`};var s_=new Z,c_=new Gg,l_=new Bg,u_=new Fg,d_=new Fg;new Fg;var f_=new Z,p_=new Z,m_=new Z,h_=new Z,g_=new Z,__=new Z,v_=new Z,y_=new Z,b_=class{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(e,t,n){throw Error(`collisionPairs not implemented for this BroadPhase class!`)}needBroadphaseCollision(e,t){return(e.collisionFilterGroup&t.collisionFilterMask)!==0&&(t.collisionFilterGroup&e.collisionFilterMask)!==0&&((e.type&$.STATIC)===0&&e.sleepState!==$.SLEEPING||(t.type&$.STATIC)===0&&t.sleepState!==$.SLEEPING)}intersectionTest(e,t,n,r){this.useBoundingBoxes?this.doBoundingBoxBroadphase(e,t,n,r):this.doBoundingSphereBroadphase(e,t,n,r)}doBoundingSphereBroadphase(e,t,n,r){let i=x_;t.position.vsub(e.position,i);let a=(e.boundingRadius+t.boundingRadius)**2;i.lengthSquared()<a&&(n.push(e),r.push(t))}doBoundingBoxBroadphase(e,t,n,r){e.aabbNeedsUpdate&&e.updateAABB(),t.aabbNeedsUpdate&&t.updateAABB(),e.aabb.overlaps(t.aabb)&&(n.push(e),r.push(t))}makePairsUnique(e,t){let n=S_,r=C_,i=w_,a=e.length;for(let n=0;n!==a;n++)r[n]=e[n],i[n]=t[n];e.length=0,t.length=0;for(let e=0;e!==a;e++){let t=r[e].id,a=i[e].id,o=t<a?`${t},${a}`:`${a},${t}`;n[o]=e,n.keys.push(o)}for(let a=0;a!==n.keys.length;a++){let a=n.keys.pop(),o=n[a];e.push(r[o]),t.push(i[o]),delete n[a]}}setWorld(e){}static boundingSphereCheck(e,t){let n=new Z;e.position.vsub(t.position,n);let r=e.shapes[0],i=t.shapes[0];return(r.boundingSphereRadius+i.boundingSphereRadius)**2>n.lengthSquared()}aabbQuery(e,t,n){return console.warn(`.aabbQuery is not implemented in this Broadphase subclass.`),[]}},x_=new Z;new Z,new Gg,new Z;var S_={keys:[]},C_=[],w_=[];new Z,new Z,new Z;var T_=class extends b_{constructor(){super()}collisionPairs(e,t,n){let r=e.bodies,i=r.length,a,o;for(let e=0;e!==i;e++)for(let i=0;i!==e;i++)a=r[e],o=r[i],this.needBroadphaseCollision(a,o)&&this.intersectionTest(a,o,t,n)}aabbQuery(e,t,n){n===void 0&&(n=[]);for(let r=0;r<e.bodies.length;r++){let i=e.bodies[r];i.aabbNeedsUpdate&&i.updateAABB(),i.aabb.overlaps(t)&&n.push(i)}return n}},E_=class{constructor(){this.rayFromWorld=new Z,this.rayToWorld=new Z,this.hitNormalWorld=new Z,this.hitPointWorld=new Z,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(e,t,n,r,i,a,o){this.rayFromWorld.copy(e),this.rayToWorld.copy(t),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(r),this.shape=i,this.body=a,this.distance=o}},D_,O_,k_,A_,j_,M_,N_,P_={CLOSEST:1,ANY:2,ALL:4};D_=Q.types.SPHERE,O_=Q.types.PLANE,k_=Q.types.BOX,A_=Q.types.CYLINDER,j_=Q.types.CONVEXPOLYHEDRON,M_=Q.types.HEIGHTFIELD,N_=Q.types.TRIMESH;var F_=class e{get[D_](){return this._intersectSphere}get[O_](){return this._intersectPlane}get[k_](){return this._intersectBox}get[A_](){return this._intersectConvex}get[j_](){return this._intersectConvex}get[M_](){return this._intersectHeightfield}get[N_](){return this._intersectTrimesh}constructor(t,n){t===void 0&&(t=new Z),n===void 0&&(n=new Z),this.from=t.clone(),this.to=n.clone(),this.direction=new Z,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=e.ANY,this.result=new E_,this.hasHit=!1,this.callback=e=>{}}intersectWorld(t,n){return this.mode=n.mode||e.ANY,this.result=n.result||new E_,this.skipBackfaces=!!n.skipBackfaces,this.collisionFilterMask=n.collisionFilterMask===void 0?-1:n.collisionFilterMask,this.collisionFilterGroup=n.collisionFilterGroup===void 0?-1:n.collisionFilterGroup,this.checkCollisionResponse=n.checkCollisionResponse===void 0||n.checkCollisionResponse,n.from&&this.from.copy(n.from),n.to&&this.to.copy(n.to),this.callback=n.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(I_),L_.length=0,t.broadphase.aabbQuery(t,I_,L_),this.intersectBodies(L_),this.hasHit}intersectBody(e,t){t&&(this.result=t,this.updateDirection());let n=this.checkCollisionResponse;if(n&&!e.collisionResponse||(this.collisionFilterGroup&e.collisionFilterMask)===0||(e.collisionFilterGroup&this.collisionFilterMask)===0)return;let r=B_,i=V_;for(let t=0,a=e.shapes.length;t<a;t++){let a=e.shapes[t];if((!n||a.collisionResponse)&&(e.quaternion.mult(e.shapeOrientations[t],i),e.quaternion.vmult(e.shapeOffsets[t],r),r.vadd(e.position,r),this.intersectShape(a,i,r,e),this.result.shouldStop))break}}intersectBodies(e,t){t&&(this.result=t,this.updateDirection());for(let t=0,n=e.length;!this.result.shouldStop&&t<n;t++)this.intersectBody(e[t])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(e,t,n,r){let i=this.from;if(uv(i,this.direction,n)>e.boundingSphereRadius)return;let a=this[e.type];a&&a.call(this,e,t,n,r,e)}_intersectBox(e,t,n,r,i){return this._intersectConvex(e.convexPolyhedronRepresentation,t,n,r,i)}_intersectPlane(e,t,n,r,i){let a=this.from,o=this.to,s=this.direction,c=new Z(0,0,1);t.vmult(c,c);let l=new Z;a.vsub(n,l);let u=l.dot(c);if(o.vsub(n,l),u*l.dot(c)>0||a.distanceTo(o)<u)return;let d=c.dot(s);if(Math.abs(d)<this.precision)return;let f=new Z,p=new Z,m=new Z;a.vsub(n,f);let h=-c.dot(f)/d;s.scale(h,p),a.vadd(p,m),this.reportIntersection(c,m,i,r,-1)}getAABB(e){let{lowerBound:t,upperBound:n}=e,r=this.to,i=this.from;t.x=Math.min(r.x,i.x),t.y=Math.min(r.y,i.y),t.z=Math.min(r.z,i.z),n.x=Math.max(r.x,i.x),n.y=Math.max(r.y,i.y),n.z=Math.max(r.z,i.z)}_intersectHeightfield(e,t,n,r,i){e.data,e.elementSize;let a=J_;a.from.copy(this.from),a.to.copy(this.to),Yg.pointToLocalFrame(n,t,a.from,a.from),Yg.pointToLocalFrame(n,t,a.to,a.to),a.updateDirection();let o=Y_,s,c,l,u;s=c=0,l=u=e.data.length-1;let d=new Bg;a.getAABB(d),e.getIndexOfPosition(d.lowerBound.x,d.lowerBound.y,o,!0),s=Math.max(s,o[0]),c=Math.max(c,o[1]),e.getIndexOfPosition(d.upperBound.x,d.upperBound.y,o,!0),l=Math.min(l,o[0]+1),u=Math.min(u,o[1]+1);for(let o=s;o<l;o++)for(let s=c;s<u;s++){if(this.result.shouldStop)return;if(e.getAabbAtIndex(o,s,d),d.overlapsRay(a)){if(e.getConvexTrianglePillar(o,s,!1),Yg.pointToWorldFrame(n,t,e.pillarOffset,q_),this._intersectConvex(e.pillarConvex,t,q_,r,i,K_),this.result.shouldStop)return;e.getConvexTrianglePillar(o,s,!0),Yg.pointToWorldFrame(n,t,e.pillarOffset,q_),this._intersectConvex(e.pillarConvex,t,q_,r,i,K_)}}}_intersectSphere(e,t,n,r,i){let a=this.from,o=this.to,s=e.radius,c=(o.x-a.x)**2+(o.y-a.y)**2+(o.z-a.z)**2,l=2*((o.x-a.x)*(a.x-n.x)+(o.y-a.y)*(a.y-n.y)+(o.z-a.z)*(a.z-n.z)),u=(a.x-n.x)**2+(a.y-n.y)**2+(a.z-n.z)**2-s**2,d=l**2-4*c*u,f=X_,p=Z_;if(!(d<0)){if(d===0)a.lerp(o,d,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,i,r,-1);else{let e=(-l-Math.sqrt(d))/(2*c),t=(-l+Math.sqrt(d))/(2*c);if(e>=0&&e<=1&&(a.lerp(o,e,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,i,r,-1)),this.result.shouldStop)return;t>=0&&t<=1&&(a.lerp(o,t,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,i,r,-1))}}}_intersectConvex(t,n,r,i,a,o){let s=Q_,c=$_,l=o&&o.faceList||null,u=t.faces,d=t.vertices,f=t.faceNormals,p=this.direction,m=this.from,h=this.to,g=m.distanceTo(h),_=l?l.length:u.length,v=this.result;for(let t=0;!v.shouldStop&&t<_;t++){let o=l?l[t]:t,h=u[o],_=f[o],y=n,b=r;c.copy(d[h[0]]),y.vmult(c,c),c.vadd(b,c),c.vsub(m,c),y.vmult(_,s);let x=p.dot(s);if(Math.abs(x)<this.precision)continue;let S=s.dot(c)/x;if(!(S<0)){p.scale(S,H_),H_.vadd(m,H_),U_.copy(d[h[0]]),y.vmult(U_,U_),b.vadd(U_,U_);for(let t=1;!v.shouldStop&&t<h.length-1;t++){W_.copy(d[h[t]]),G_.copy(d[h[t+1]]),y.vmult(W_,W_),y.vmult(G_,G_),b.vadd(W_,W_),b.vadd(G_,G_);let n=H_.distanceTo(m);!(e.pointInTriangle(H_,U_,W_,G_)||e.pointInTriangle(H_,W_,U_,G_))||n>g||this.reportIntersection(s,H_,a,i,o)}}}}_intersectTrimesh(t,n,r,i,a,o){let s=ev,c=ov,l=sv,u=$_,d=tv,f=nv,p=rv,m=av,h=iv,g=t.indices;t.vertices;let _=this.from,v=this.to,y=this.direction;l.position.copy(r),l.quaternion.copy(n),Yg.vectorToLocalFrame(r,n,y,d),Yg.pointToLocalFrame(r,n,_,f),Yg.pointToLocalFrame(r,n,v,p),p.x*=t.scale.x,p.y*=t.scale.y,p.z*=t.scale.z,f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,p.vsub(f,d),d.normalize();let b=f.distanceSquared(p);t.tree.rayQuery(this,l,c);for(let o=0,l=c.length;!this.result.shouldStop&&o!==l;o++){let l=c[o];t.getNormal(l,s),t.getVertex(g[l*3],U_),U_.vsub(f,u);let p=d.dot(s),_=s.dot(u)/p;if(_<0)continue;d.scale(_,H_),H_.vadd(f,H_),t.getVertex(g[l*3+1],W_),t.getVertex(g[l*3+2],G_);let v=H_.distanceSquared(f);!(e.pointInTriangle(H_,W_,U_,G_)||e.pointInTriangle(H_,U_,W_,G_))||v>b||(Yg.vectorToWorldFrame(n,s,h),Yg.pointToWorldFrame(r,n,H_,m),this.reportIntersection(h,m,a,i,l))}c.length=0}reportIntersection(t,n,r,i,a){let o=this.from,s=this.to,c=o.distanceTo(n),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=a===void 0?-1:a,this.mode){case e.ALL:this.hasHit=!0,l.set(o,s,t,n,r,i,c),l.hasHit=!0,this.callback(l);break;case e.CLOSEST:(c<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(o,s,t,n,r,i,c));break;case e.ANY:this.hasHit=!0,l.hasHit=!0,l.set(o,s,t,n,r,i,c),l.shouldStop=!0}}static pointInTriangle(e,t,n,r){r.vsub(t,cv),n.vsub(t,R_),e.vsub(t,z_);let i=cv.dot(cv),a=cv.dot(R_),o=cv.dot(z_),s=R_.dot(R_),c=R_.dot(z_),l,u;return(l=s*o-a*c)>=0&&(u=i*c-a*o)>=0&&l+u<i*s-a*a}};F_.CLOSEST=P_.CLOSEST,F_.ANY=P_.ANY,F_.ALL=P_.ALL;var I_=new Bg,L_=[],R_=new Z,z_=new Z,B_=new Z,V_=new Gg,H_=new Z,U_=new Z,W_=new Z,G_=new Z;new Z,new E_;var K_={faceList:[0]},q_=new Z,J_=new F_,Y_=[],X_=new Z,Z_=new Z,Q_=new Z;new Z,new Z;var $_=new Z,ev=new Z,tv=new Z,nv=new Z,rv=new Z,iv=new Z,av=new Z;new Bg;var ov=[],sv=new Yg,cv=new Z,lv=new Z;function uv(e,t,n){n.vsub(e,cv);let r=cv.dot(t);return t.scale(r,lv),lv.vadd(e,lv),n.distanceTo(lv)}var dv=class{static defaults(e,t){e===void 0&&(e={});for(let n in t)n in e||(e[n]=t[n]);return e}},fv=class{constructor(){this.spatial=new Z,this.rotational=new Z}multiplyElement(e){return e.spatial.dot(this.spatial)+e.rotational.dot(this.rotational)}multiplyVectors(e,t){return e.dot(this.spatial)+t.dot(this.rotational)}},pv=class e{constructor(t,n,r,i){r===void 0&&(r=-1e6),i===void 0&&(i=1e6),this.id=e.idCounter++,this.minForce=r,this.maxForce=i,this.bi=t,this.bj=n,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new fv,this.jacobianElementB=new fv,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(e,t,n){let r=t,i=e,a=n;this.a=4/(a*(1+4*r)),this.b=4*r/(1+4*r),this.eps=4/(a*a*i*(1+4*r))}computeB(e,t,n){let r=this.computeGW(),i=this.computeGq(),a=this.computeGiMf();return-i*e-r*t-a*n}computeGq(){let e=this.jacobianElementA,t=this.jacobianElementB,n=this.bi,r=this.bj,i=n.position,a=r.position;return e.spatial.dot(i)+t.spatial.dot(a)}computeGW(){let e=this.jacobianElementA,t=this.jacobianElementB,n=this.bi,r=this.bj,i=n.velocity,a=r.velocity,o=n.angularVelocity,s=r.angularVelocity;return e.multiplyVectors(i,o)+t.multiplyVectors(a,s)}computeGWlambda(){let e=this.jacobianElementA,t=this.jacobianElementB,n=this.bi,r=this.bj,i=n.vlambda,a=r.vlambda,o=n.wlambda,s=r.wlambda;return e.multiplyVectors(i,o)+t.multiplyVectors(a,s)}computeGiMf(){let e=this.jacobianElementA,t=this.jacobianElementB,n=this.bi,r=this.bj,i=n.force,a=n.torque,o=r.force,s=r.torque,c=n.invMassSolve,l=r.invMassSolve;return i.scale(c,mv),o.scale(l,hv),n.invInertiaWorldSolve.vmult(a,gv),r.invInertiaWorldSolve.vmult(s,_v),e.multiplyVectors(mv,gv)+t.multiplyVectors(hv,_v)}computeGiMGt(){let e=this.jacobianElementA,t=this.jacobianElementB,n=this.bi,r=this.bj,i=n.invMassSolve,a=r.invMassSolve,o=n.invInertiaWorldSolve,s=r.invInertiaWorldSolve,c=i+a;return o.vmult(e.rotational,vv),c+=vv.dot(e.rotational),s.vmult(t.rotational,vv),c+=vv.dot(t.rotational),c}addToWlambda(e){let t=this.jacobianElementA,n=this.jacobianElementB,r=this.bi,i=this.bj,a=yv;r.vlambda.addScaledVector(r.invMassSolve*e,t.spatial,r.vlambda),i.vlambda.addScaledVector(i.invMassSolve*e,n.spatial,i.vlambda),r.invInertiaWorldSolve.vmult(t.rotational,a),r.wlambda.addScaledVector(e,a,r.wlambda),i.invInertiaWorldSolve.vmult(n.rotational,a),i.wlambda.addScaledVector(e,a,i.wlambda)}computeC(){return this.computeGiMGt()+this.eps}};pv.idCounter=0;var mv=new Z,hv=new Z,gv=new Z,_v=new Z,vv=new Z,yv=new Z,bv=class extends pv{constructor(e,t,n){n===void 0&&(n=1e6),super(e,t,0,n),this.restitution=0,this.ri=new Z,this.rj=new Z,this.ni=new Z}computeB(e){let t=this.a,n=this.b,r=this.bi,i=this.bj,a=this.ri,o=this.rj,s=xv,c=Sv,l=r.velocity,u=r.angularVelocity;r.force,r.torque;let d=i.velocity,f=i.angularVelocity;i.force,i.torque;let p=Cv,m=this.jacobianElementA,h=this.jacobianElementB,g=this.ni;a.cross(g,s),o.cross(g,c),g.negate(m.spatial),s.negate(m.rotational),h.spatial.copy(g),h.rotational.copy(c),p.copy(i.position),p.vadd(o,p),p.vsub(r.position,p),p.vsub(a,p);let _=g.dot(p),v=this.restitution+1,y=v*d.dot(g)-v*l.dot(g)+f.dot(c)-u.dot(s),b=this.computeGiMf();return-_*t-y*n-e*b}getImpactVelocityAlongNormal(){let e=wv,t=Tv,n=Ev,r=Dv,i=Ov;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,r),this.bi.getVelocityAtWorldPoint(n,e),this.bj.getVelocityAtWorldPoint(r,t),e.vsub(t,i),this.ni.dot(i)}},xv=new Z,Sv=new Z,Cv=new Z,wv=new Z,Tv=new Z,Ev=new Z,Dv=new Z,Ov=new Z;new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z;var kv=class extends pv{constructor(e,t,n){super(e,t,-n,n),this.ri=new Z,this.rj=new Z,this.t=new Z}computeB(e){this.a;let t=this.b;this.bi,this.bj;let n=this.ri,r=this.rj,i=Av,a=jv,o=this.t;n.cross(o,i),r.cross(o,a);let s=this.jacobianElementA,c=this.jacobianElementB;o.negate(s.spatial),i.negate(s.rotational),c.spatial.copy(o),c.rotational.copy(a);let l=this.computeGW(),u=this.computeGiMf();return-l*t-e*u}},Av=new Z,jv=new Z,Mv=class e{constructor(t,n,r){r=dv.defaults(r,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=e.idCounter++,this.materials=[t,n],this.friction=r.friction,this.restitution=r.restitution,this.contactEquationStiffness=r.contactEquationStiffness,this.contactEquationRelaxation=r.contactEquationRelaxation,this.frictionEquationStiffness=r.frictionEquationStiffness,this.frictionEquationRelaxation=r.frictionEquationRelaxation}};Mv.idCounter=0;var Nv=class e{constructor(t){t===void 0&&(t={});let n=``;typeof t==`string`&&(n=t,t={}),this.name=n,this.id=e.idCounter++,this.friction=t.friction===void 0?-1:t.friction,this.restitution=t.restitution===void 0?-1:t.restitution}};Nv.idCounter=0,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new F_,new Z,new Z,new Z,new Z(1,0,0),new Z(0,1,0),new Z(0,0,1),new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z;var Pv=class extends Q{constructor(e){if(super({type:Q.types.SPHERE}),this.radius=e===void 0?1:e,this.radius<0)throw Error(`The sphere radius cannot be negative.`);this.updateBoundingSphereRadius()}calculateLocalInertia(e,t){t===void 0&&(t=new Z);let n=2*e*this.radius*this.radius/5;return t.x=n,t.y=n,t.z=n,t}volume(){return 4*Math.PI*this.radius**3/3}updateBoundingSphereRadius(){this.boundingSphereRadius=this.radius}calculateWorldAABB(e,t,n,r){let i=this.radius,a=[`x`,`y`,`z`];for(let t=0;t<a.length;t++){let o=a[t];n[o]=e[o]-i,r[o]=e[o]+i}}};new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z;var Fv=class extends Q{constructor(){super({type:Q.types.PLANE}),this.worldNormal=new Z,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}computeWorldNormal(e){let t=this.worldNormal;t.set(0,0,1),e.vmult(t,t),this.worldNormalNeedsUpdate=!1}calculateLocalInertia(e,t){return t===void 0&&(t=new Z),t}volume(){return Number.MAX_VALUE}calculateWorldAABB(e,t,n,r){Iv.set(0,0,1),t.vmult(Iv,Iv);let i=Number.MAX_VALUE;n.set(-i,-i,-i),r.set(i,i,i),Iv.x===1?r.x=e.x:Iv.x===-1&&(n.x=e.x),Iv.y===1?r.y=e.y:Iv.y===-1&&(n.y=e.y),Iv.z===1?r.z=e.z:Iv.z===-1&&(n.z=e.z)}updateBoundingSphereRadius(){this.boundingSphereRadius=Number.MAX_VALUE}},Iv=new Z;new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Bg,new Z,new Bg,new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Bg,new Z,new Yg,new Bg;var Lv=class{constructor(){this.equations=[]}solve(e,t){return 0}addEquation(e){e.enabled&&!e.bi.isTrigger&&!e.bj.isTrigger&&this.equations.push(e)}removeEquation(e){let t=this.equations,n=t.indexOf(e);n!==-1&&t.splice(n,1)}removeAllEquations(){this.equations.length=0}},Rv=class extends Lv{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(e,t){let n=0,r=this.iterations,i=this.tolerance*this.tolerance,a=this.equations,o=a.length,s=t.bodies,c=s.length,l=e,u,d,f,p,m,h;if(o!==0)for(let e=0;e!==c;e++)s[e].updateSolveMassProperties();let g=Bv,_=Vv,v=zv;g.length=o,_.length=o,v.length=o;for(let e=0;e!==o;e++){let t=a[e];v[e]=0,_[e]=t.computeB(l),g[e]=1/t.computeC()}if(o!==0){for(let e=0;e!==c;e++){let t=s[e],n=t.vlambda,r=t.wlambda;n.set(0,0,0),r.set(0,0,0)}for(n=0;n!==r;n++){p=0;for(let e=0;e!==o;e++){let t=a[e];u=_[e],d=g[e],h=v[e],m=t.computeGWlambda(),f=d*(u-m-t.eps*h),h+f<t.minForce?f=t.minForce-h:h+f>t.maxForce&&(f=t.maxForce-h),v[e]+=f,p+=f>0?f:-f,t.addToWlambda(f)}if(p*p<i)break}for(let e=0;e!==c;e++){let t=s[e],n=t.velocity,r=t.angularVelocity;t.vlambda.vmul(t.linearFactor,t.vlambda),n.vadd(t.vlambda,n),t.wlambda.vmul(t.angularFactor,t.wlambda),r.vadd(t.wlambda,r)}let e=a.length,t=1/l;for(;e--;)a[e].multiplier=v[e]*t}return n}},zv=[],Bv=[],Vv=[];$.STATIC;var Hv=class{constructor(){this.objects=[],this.type=Object}release(){let e=arguments.length;for(let t=0;t!==e;t++)this.objects.push(t<0||arguments.length<=t?void 0:arguments[t]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw Error(`constructObject() not implemented in this Pool subclass yet!`)}resize(e){let t=this.objects;for(;t.length>e;)t.pop();for(;t.length<e;)t.push(this.constructObject());return this}},Uv=class extends Hv{constructor(){super(...arguments),this.type=Z}constructObject(){return new Z}},Wv={sphereSphere:Q.types.SPHERE,spherePlane:Q.types.SPHERE|Q.types.PLANE,boxBox:Q.types.BOX|Q.types.BOX,sphereBox:Q.types.SPHERE|Q.types.BOX,planeBox:Q.types.PLANE|Q.types.BOX,convexConvex:Q.types.CONVEXPOLYHEDRON,sphereConvex:Q.types.SPHERE|Q.types.CONVEXPOLYHEDRON,planeConvex:Q.types.PLANE|Q.types.CONVEXPOLYHEDRON,boxConvex:Q.types.BOX|Q.types.CONVEXPOLYHEDRON,sphereHeightfield:Q.types.SPHERE|Q.types.HEIGHTFIELD,boxHeightfield:Q.types.BOX|Q.types.HEIGHTFIELD,convexHeightfield:Q.types.CONVEXPOLYHEDRON|Q.types.HEIGHTFIELD,sphereParticle:Q.types.PARTICLE|Q.types.SPHERE,planeParticle:Q.types.PLANE|Q.types.PARTICLE,boxParticle:Q.types.BOX|Q.types.PARTICLE,convexParticle:Q.types.PARTICLE|Q.types.CONVEXPOLYHEDRON,cylinderCylinder:Q.types.CYLINDER,sphereCylinder:Q.types.SPHERE|Q.types.CYLINDER,planeCylinder:Q.types.PLANE|Q.types.CYLINDER,boxCylinder:Q.types.BOX|Q.types.CYLINDER,convexCylinder:Q.types.CONVEXPOLYHEDRON|Q.types.CYLINDER,heightfieldCylinder:Q.types.HEIGHTFIELD|Q.types.CYLINDER,particleCylinder:Q.types.PARTICLE|Q.types.CYLINDER,sphereTrimesh:Q.types.SPHERE|Q.types.TRIMESH,planeTrimesh:Q.types.PLANE|Q.types.TRIMESH},Gv=class{get[Wv.sphereSphere](){return this.sphereSphere}get[Wv.spherePlane](){return this.spherePlane}get[Wv.boxBox](){return this.boxBox}get[Wv.sphereBox](){return this.sphereBox}get[Wv.planeBox](){return this.planeBox}get[Wv.convexConvex](){return this.convexConvex}get[Wv.sphereConvex](){return this.sphereConvex}get[Wv.planeConvex](){return this.planeConvex}get[Wv.boxConvex](){return this.boxConvex}get[Wv.sphereHeightfield](){return this.sphereHeightfield}get[Wv.boxHeightfield](){return this.boxHeightfield}get[Wv.convexHeightfield](){return this.convexHeightfield}get[Wv.sphereParticle](){return this.sphereParticle}get[Wv.planeParticle](){return this.planeParticle}get[Wv.boxParticle](){return this.boxParticle}get[Wv.convexParticle](){return this.convexParticle}get[Wv.cylinderCylinder](){return this.convexConvex}get[Wv.sphereCylinder](){return this.sphereConvex}get[Wv.planeCylinder](){return this.planeConvex}get[Wv.boxCylinder](){return this.boxConvex}get[Wv.convexCylinder](){return this.convexConvex}get[Wv.heightfieldCylinder](){return this.heightfieldCylinder}get[Wv.particleCylinder](){return this.particleCylinder}get[Wv.sphereTrimesh](){return this.sphereTrimesh}get[Wv.planeTrimesh](){return this.planeTrimesh}constructor(e){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new Uv,this.world=e,this.currentContactMaterial=e.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(e,t,n,r,i,a){let o;this.contactPointPool.length?(o=this.contactPointPool.pop(),o.bi=e,o.bj=t):o=new bv(e,t),o.enabled=e.collisionResponse&&t.collisionResponse&&n.collisionResponse&&r.collisionResponse;let s=this.currentContactMaterial;o.restitution=s.restitution,o.setSpookParams(s.contactEquationStiffness,s.contactEquationRelaxation,this.world.dt);let c=n.material||e.material,l=r.material||t.material;return c&&l&&c.restitution>=0&&l.restitution>=0&&(o.restitution=c.restitution*l.restitution),o.si=i||n,o.sj=a||r,o}createFrictionEquationsFromContact(e,t){let n=e.bi,r=e.bj,i=e.si,a=e.sj,o=this.world,s=this.currentContactMaterial,c=s.friction,l=i.material||n.material,u=a.material||r.material;if(l&&u&&l.friction>=0&&u.friction>=0&&(c=l.friction*u.friction),c>0){let i=c*(o.frictionGravity||o.gravity).length(),a=n.invMass+r.invMass;a>0&&(a=1/a);let l=this.frictionEquationPool,u=l.length?l.pop():new kv(n,r,i*a),d=l.length?l.pop():new kv(n,r,i*a);return u.bi=d.bi=n,u.bj=d.bj=r,u.minForce=d.minForce=-i*a,u.maxForce=d.maxForce=i*a,u.ri.copy(e.ri),u.rj.copy(e.rj),d.ri.copy(e.ri),d.rj.copy(e.rj),e.ni.tangents(u.t,d.t),u.setSpookParams(s.frictionEquationStiffness,s.frictionEquationRelaxation,o.dt),d.setSpookParams(s.frictionEquationStiffness,s.frictionEquationRelaxation,o.dt),u.enabled=d.enabled=e.enabled,t.push(u,d),!0}return!1}createFrictionFromAverage(e){let t=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(t,this.frictionResult)||e===1)return;let n=this.frictionResult[this.frictionResult.length-2],r=this.frictionResult[this.frictionResult.length-1];Kv.setZero(),qv.setZero(),Jv.setZero();let i=t.bi;t.bj;for(let n=0;n!==e;n++)t=this.result[this.result.length-1-n],t.bi===i?(Kv.vsub(t.ni,Kv),qv.vadd(t.rj,qv),Jv.vadd(t.ri,Jv)):(Kv.vadd(t.ni,Kv),qv.vadd(t.ri,qv),Jv.vadd(t.rj,Jv));let a=1/e;qv.scale(a,n.ri),Jv.scale(a,n.rj),r.ri.copy(n.ri),r.rj.copy(n.rj),Kv.normalize(),Kv.tangents(n.t,r.t)}getContacts(e,t,n,r,i,a,o){this.contactPointPool=i,this.frictionEquationPool=o,this.result=r,this.frictionResult=a;let s=Zv,c=Qv,l=Yv,u=Xv;for(let r=0,i=e.length;r!==i;r++){let i=e[r],a=t[r],o=null;i.material&&a.material&&(o=n.getContactMaterial(i.material,a.material)||null);let d=i.type&$.KINEMATIC&&a.type&$.STATIC||i.type&$.STATIC&&a.type&$.KINEMATIC||i.type&$.KINEMATIC&&a.type&$.KINEMATIC;for(let e=0;e<i.shapes.length;e++){i.quaternion.mult(i.shapeOrientations[e],s),i.quaternion.vmult(i.shapeOffsets[e],l),l.vadd(i.position,l);let t=i.shapes[e];for(let e=0;e<a.shapes.length;e++){a.quaternion.mult(a.shapeOrientations[e],c),a.quaternion.vmult(a.shapeOffsets[e],u),u.vadd(a.position,u);let r=a.shapes[e];if(!(t.collisionFilterMask&r.collisionFilterGroup&&r.collisionFilterMask&t.collisionFilterGroup)||l.distanceTo(u)>t.boundingSphereRadius+r.boundingSphereRadius)continue;let f=null;t.material&&r.material&&(f=n.getContactMaterial(t.material,r.material)||null),this.currentContactMaterial=f||o||n.defaultContactMaterial;let p=t.type|r.type,m=this[p];if(m){let e=!1;e=t.type<r.type?m.call(this,t,r,l,u,s,c,i,a,t,r,d):m.call(this,r,t,u,l,c,s,a,i,t,r,d),e&&d&&(n.shapeOverlapKeeper.set(t.id,r.id),n.bodyOverlapKeeper.set(i.id,a.id))}}}}}sphereSphere(e,t,n,r,i,a,o,s,c,l,u){if(u)return n.distanceSquared(r)<(e.radius+t.radius)**2;let d=this.createContactEquation(o,s,e,t,c,l);r.vsub(n,d.ni),d.ni.normalize(),d.ri.copy(d.ni),d.rj.copy(d.ni),d.ri.scale(e.radius,d.ri),d.rj.scale(-t.radius,d.rj),d.ri.vadd(n,d.ri),d.ri.vsub(o.position,d.ri),d.rj.vadd(r,d.rj),d.rj.vsub(s.position,d.rj),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}spherePlane(e,t,n,r,i,a,o,s,c,l,u){let d=this.createContactEquation(o,s,e,t,c,l);if(d.ni.set(0,0,1),a.vmult(d.ni,d.ni),d.ni.negate(d.ni),d.ni.normalize(),d.ni.scale(e.radius,d.ri),n.vsub(r,_y),d.ni.scale(d.ni.dot(_y),vy),_y.vsub(vy,d.rj),-_y.dot(d.ni)<=e.radius){if(u)return!0;let e=d.ri,t=d.rj;e.vadd(n,e),e.vsub(o.position,e),t.vadd(r,t),t.vsub(s.position,t),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}}boxBox(e,t,n,r,i,a,o,s,c,l,u){return e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t.convexPolyhedronRepresentation,n,r,i,a,o,s,e,t,u)}sphereBox(e,t,n,r,i,a,o,s,c,l,u){let d=this.v3pool,f=Dy;n.vsub(r,Cy),t.getSideNormals(f,a);let p=e.radius,m=!1,h=ky,g=Ay,_=jy,v=null,y=0,b=0,x=0,S=null;for(let e=0,t=f.length;e!==t&&m===!1;e++){let t=wy;t.copy(f[e]);let n=t.length();t.normalize();let r=Cy.dot(t);if(r<n+p&&r>0){let i=Ty,a=Ey;i.copy(f[(e+1)%3]),a.copy(f[(e+2)%3]);let o=i.length(),s=a.length();i.normalize(),a.normalize();let c=Cy.dot(i),l=Cy.dot(a);if(c<o&&c>-o&&l<s&&l>-s){let e=Math.abs(r-n-p);if((S===null||e<S)&&(S=e,b=c,x=l,v=n,h.copy(t),g.copy(i),_.copy(a),y++,u))return!0}}}if(y){m=!0;let i=this.createContactEquation(o,s,e,t,c,l);h.scale(-p,i.ri),i.ni.copy(h),i.ni.negate(i.ni),h.scale(v,h),g.scale(b,g),h.vadd(g,h),_.scale(x,_),h.vadd(_,i.rj),i.ri.vadd(n,i.ri),i.ri.vsub(o.position,i.ri),i.rj.vadd(r,i.rj),i.rj.vsub(s.position,i.rj),this.result.push(i),this.createFrictionEquationsFromContact(i,this.frictionResult)}let C=d.get(),w=Oy;for(let i=0;i!==2&&!m;i++)for(let a=0;a!==2&&!m;a++)for(let d=0;d!==2&&!m;d++)if(C.set(0,0,0),i?C.vadd(f[0],C):C.vsub(f[0],C),a?C.vadd(f[1],C):C.vsub(f[1],C),d?C.vadd(f[2],C):C.vsub(f[2],C),r.vadd(C,w),w.vsub(n,w),w.lengthSquared()<p*p){if(u)return!0;m=!0;let i=this.createContactEquation(o,s,e,t,c,l);i.ri.copy(w),i.ri.normalize(),i.ni.copy(i.ri),i.ri.scale(p,i.ri),i.rj.copy(C),i.ri.vadd(n,i.ri),i.ri.vsub(o.position,i.ri),i.rj.vadd(r,i.rj),i.rj.vsub(s.position,i.rj),this.result.push(i),this.createFrictionEquationsFromContact(i,this.frictionResult)}d.release(C),C=null;let T=d.get(),E=d.get(),D=d.get(),ee=d.get(),O=d.get(),k=f.length;for(let i=0;i!==k&&!m;i++)for(let a=0;a!==k&&!m;a++)if(i%3!=a%3){f[a].cross(f[i],T),T.normalize(),f[i].vadd(f[a],E),D.copy(n),D.vsub(E,D),D.vsub(r,D);let d=D.dot(T);T.scale(d,ee);let h=0;for(;h===i%3||h===a%3;)h++;O.copy(n),O.vsub(ee,O),O.vsub(E,O),O.vsub(r,O);let g=Math.abs(d),_=O.length();if(g<f[h].length()&&_<p){if(u)return!0;m=!0;let i=this.createContactEquation(o,s,e,t,c,l);E.vadd(ee,i.rj),i.rj.copy(i.rj),O.negate(i.ni),i.ni.normalize(),i.ri.copy(i.rj),i.ri.vadd(r,i.ri),i.ri.vsub(n,i.ri),i.ri.normalize(),i.ri.scale(p,i.ri),i.ri.vadd(n,i.ri),i.ri.vsub(o.position,i.ri),i.rj.vadd(r,i.rj),i.rj.vsub(s.position,i.rj),this.result.push(i),this.createFrictionEquationsFromContact(i,this.frictionResult)}}d.release(T,E,D,ee,O)}planeBox(e,t,n,r,i,a,o,s,c,l,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,t.convexPolyhedronRepresentation.id=t.id,this.planeConvex(e,t.convexPolyhedronRepresentation,n,r,i,a,o,s,e,t,u)}convexConvex(e,t,n,r,i,a,o,s,c,l,u,d,f){let p=Ky;if(!(n.distanceTo(r)>e.boundingSphereRadius+t.boundingSphereRadius)&&e.findSeparatingAxis(t,n,i,r,a,p,d,f)){let d=[],f=qy;e.clipAgainstHull(n,i,t,r,a,p,-100,100,d);let m=0;for(let i=0;i!==d.length;i++){if(u)return!0;let a=this.createContactEquation(o,s,e,t,c,l),h=a.ri,g=a.rj;p.negate(a.ni),d[i].normal.negate(f),f.scale(d[i].depth,f),d[i].point.vadd(f,h),g.copy(d[i].point),h.vsub(n,h),g.vsub(r,g),h.vadd(n,h),h.vsub(o.position,h),g.vadd(r,g),g.vsub(s.position,g),this.result.push(a),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(a,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}}sphereConvex(e,t,n,r,i,a,o,s,c,l,u){let d=this.v3pool;n.vsub(r,My);let f=t.faceNormals,p=t.faces,m=t.vertices,h=e.radius,g=!1;for(let i=0;i!==m.length;i++){let d=m[i],f=Iy;a.vmult(d,f),r.vadd(f,f);let p=Fy;if(f.vsub(n,p),p.lengthSquared()<h*h){if(u)return!0;g=!0;let i=this.createContactEquation(o,s,e,t,c,l);i.ri.copy(p),i.ri.normalize(),i.ni.copy(i.ri),i.ri.scale(h,i.ri),f.vsub(r,i.rj),i.ri.vadd(n,i.ri),i.ri.vsub(o.position,i.ri),i.rj.vadd(r,i.rj),i.rj.vsub(s.position,i.rj),this.result.push(i),this.createFrictionEquationsFromContact(i,this.frictionResult);return}}for(let i=0,_=p.length;i!==_&&g===!1;i++){let _=f[i],v=p[i],y=Ly;a.vmult(_,y);let b=Ry;a.vmult(m[v[0]],b),b.vadd(r,b);let x=zy;y.scale(-h,x),n.vadd(x,x);let S=By;x.vsub(b,S);let C=S.dot(y),w=Vy;if(n.vsub(b,w),C<0&&w.dot(y)>0){let i=[];for(let e=0,t=v.length;e!==t;e++){let t=d.get();a.vmult(m[v[e]],t),r.vadd(t,t),i.push(t)}if(Sy(i,y,n)){if(u)return!0;g=!0;let a=this.createContactEquation(o,s,e,t,c,l);y.scale(-h,a.ri),y.negate(a.ni);let f=d.get();y.scale(-C,f);let p=d.get();y.scale(-h,p),n.vsub(r,a.rj),a.rj.vadd(p,a.rj),a.rj.vadd(f,a.rj),a.rj.vadd(r,a.rj),a.rj.vsub(s.position,a.rj),a.ri.vadd(n,a.ri),a.ri.vsub(o.position,a.ri),d.release(f),d.release(p),this.result.push(a),this.createFrictionEquationsFromContact(a,this.frictionResult);for(let e=0,t=i.length;e!==t;e++)d.release(i[e]);return}for(let f=0;f!==v.length;f++){let p=d.get(),g=d.get();a.vmult(m[v[(f+1)%v.length]],p),a.vmult(m[v[(f+2)%v.length]],g),r.vadd(p,p),r.vadd(g,g);let _=Ny;g.vsub(p,_);let y=Py;_.unit(y);let b=d.get(),x=d.get();n.vsub(p,x);let S=x.dot(y);y.scale(S,b),b.vadd(p,b);let C=d.get();if(b.vsub(n,C),S>0&&S*S<_.lengthSquared()&&C.lengthSquared()<h*h){if(u)return!0;let a=this.createContactEquation(o,s,e,t,c,l);b.vsub(r,a.rj),b.vsub(n,a.ni),a.ni.normalize(),a.ni.scale(h,a.ri),a.rj.vadd(r,a.rj),a.rj.vsub(s.position,a.rj),a.ri.vadd(n,a.ri),a.ri.vsub(o.position,a.ri),this.result.push(a),this.createFrictionEquationsFromContact(a,this.frictionResult);for(let e=0,t=i.length;e!==t;e++)d.release(i[e]);d.release(p),d.release(g),d.release(b),d.release(C),d.release(x);return}d.release(p),d.release(g),d.release(b),d.release(C),d.release(x)}for(let e=0,t=i.length;e!==t;e++)d.release(i[e])}}}planeConvex(e,t,n,r,i,a,o,s,c,l,u){let d=Hy,f=Uy;f.set(0,0,1),i.vmult(f,f);let p=0,m=Wy;for(let i=0;i!==t.vertices.length;i++)if(d.copy(t.vertices[i]),a.vmult(d,d),r.vadd(d,d),d.vsub(n,m),f.dot(m)<=0){if(u)return!0;let i=this.createContactEquation(o,s,e,t,c,l),a=Gy;f.scale(f.dot(m),a),d.vsub(a,a),a.vsub(n,i.ri),i.ni.copy(f),d.vsub(r,i.rj),i.ri.vadd(n,i.ri),i.ri.vsub(o.position,i.ri),i.rj.vadd(r,i.rj),i.rj.vsub(s.position,i.rj),this.result.push(i),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(i,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}boxConvex(e,t,n,r,i,a,o,s,c,l,u){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t,n,r,i,a,o,s,e,t,u)}sphereHeightfield(e,t,n,r,i,a,o,s,c,l,u){let d=t.data,f=e.radius,p=t.elementSize,m=sb,h=ob;Yg.pointToLocalFrame(r,a,n,h);let g=Math.floor((h.x-f)/p)-1,_=Math.ceil((h.x+f)/p)+1,v=Math.floor((h.y-f)/p)-1,y=Math.ceil((h.y+f)/p)+1;if(_<0||y<0||g>d.length||v>d[0].length)return;g<0&&(g=0),_<0&&(_=0),v<0&&(v=0),y<0&&(y=0),g>=d.length&&(g=d.length-1),_>=d.length&&(_=d.length-1),y>=d[0].length&&(y=d[0].length-1),v>=d[0].length&&(v=d[0].length-1);let b=[];t.getRectMinMax(g,v,_,y,b);let x=b[0],S=b[1];if(h.z-f>S||h.z+f<x)return;let C=this.result;for(let c=g;c<_;c++)for(let l=v;l<y;l++){let d=C.length,f=!1;if(t.getConvexTrianglePillar(c,l,!1),Yg.pointToWorldFrame(r,a,t.pillarOffset,m),n.distanceTo(m)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(f=this.sphereConvex(e,t.pillarConvex,n,m,i,a,o,s,e,t,u)),u&&f||(t.getConvexTrianglePillar(c,l,!0),Yg.pointToWorldFrame(r,a,t.pillarOffset,m),n.distanceTo(m)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(f=this.sphereConvex(e,t.pillarConvex,n,m,i,a,o,s,e,t,u)),u&&f))return!0;if(C.length-d>2)return}}boxHeightfield(e,t,n,r,i,a,o,s,c,l,u){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexHeightfield(e.convexPolyhedronRepresentation,t,n,r,i,a,o,s,e,t,u)}convexHeightfield(e,t,n,r,i,a,o,s,c,l,u){let d=t.data,f=t.elementSize,p=e.boundingSphereRadius,m=ib,h=ab,g=rb;Yg.pointToLocalFrame(r,a,n,g);let _=Math.floor((g.x-p)/f)-1,v=Math.ceil((g.x+p)/f)+1,y=Math.floor((g.y-p)/f)-1,b=Math.ceil((g.y+p)/f)+1;if(v<0||b<0||_>d.length||y>d[0].length)return;_<0&&(_=0),v<0&&(v=0),y<0&&(y=0),b<0&&(b=0),_>=d.length&&(_=d.length-1),v>=d.length&&(v=d.length-1),b>=d[0].length&&(b=d[0].length-1),y>=d[0].length&&(y=d[0].length-1);let x=[];t.getRectMinMax(_,y,v,b,x);let S=x[0],C=x[1];if(!(g.z-p>C||g.z+p<S))for(let c=_;c<v;c++)for(let l=y;l<b;l++){let d=!1;if(t.getConvexTrianglePillar(c,l,!1),Yg.pointToWorldFrame(r,a,t.pillarOffset,m),n.distanceTo(m)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(d=this.convexConvex(e,t.pillarConvex,n,m,i,a,o,s,null,null,u,h,null)),u&&d||(t.getConvexTrianglePillar(c,l,!0),Yg.pointToWorldFrame(r,a,t.pillarOffset,m),n.distanceTo(m)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(d=this.convexConvex(e,t.pillarConvex,n,m,i,a,o,s,null,null,u,h,null)),u&&d))return!0}}sphereParticle(e,t,n,r,i,a,o,s,c,l,u){let d=Zy;if(d.set(0,0,1),r.vsub(n,d),d.lengthSquared()<=e.radius*e.radius){if(u)return!0;let n=this.createContactEquation(s,o,t,e,c,l);d.normalize(),n.rj.copy(d),n.rj.scale(e.radius,n.rj),n.ni.copy(d),n.ni.negate(n.ni),n.ri.set(0,0,0),this.result.push(n),this.createFrictionEquationsFromContact(n,this.frictionResult)}}planeParticle(e,t,n,r,i,a,o,s,c,l,u){let d=Jy;d.set(0,0,1),o.quaternion.vmult(d,d);let f=Yy;if(r.vsub(o.position,f),d.dot(f)<=0){if(u)return!0;let n=this.createContactEquation(s,o,t,e,c,l);n.ni.copy(d),n.ni.negate(n.ni),n.ri.set(0,0,0);let i=Xy;d.scale(d.dot(r),i),r.vsub(i,i),n.rj.copy(i),this.result.push(n),this.createFrictionEquationsFromContact(n,this.frictionResult)}}boxParticle(e,t,n,r,i,a,o,s,c,l,u){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexParticle(e.convexPolyhedronRepresentation,t,n,r,i,a,o,s,e,t,u)}convexParticle(e,t,n,r,i,a,o,s,c,l,u){let d=-1,f=eb,p=nb,m=null,h=$y;if(h.copy(r),h.vsub(n,h),i.conjugate(Qy),Qy.vmult(h,h),e.pointIsInside(h)){e.worldVerticesNeedsUpdate&&e.computeWorldVertices(n,i),e.worldFaceNormalsNeedsUpdate&&e.computeWorldFaceNormals(i);for(let t=0,n=e.faces.length;t!==n;t++){let n=[e.worldVertices[e.faces[t][0]]],i=e.worldFaceNormals[t];r.vsub(n[0],tb);let a=-i.dot(tb);if(m===null||Math.abs(a)<Math.abs(m)){if(u)return!0;m=a,d=t,f.copy(i)}}if(d!==-1){let i=this.createContactEquation(s,o,t,e,c,l);f.scale(m,p),p.vadd(r,p),p.vsub(n,p),i.rj.copy(p),f.negate(i.ni),i.ri.set(0,0,0);let a=i.ri,u=i.rj;a.vadd(r,a),a.vsub(s.position,a),u.vadd(n,u),u.vsub(o.position,u),this.result.push(i),this.createFrictionEquationsFromContact(i,this.frictionResult)}else console.warn(`Point found inside convex, but did not find penetrating face!`)}}heightfieldCylinder(e,t,n,r,i,a,o,s,c,l,u){return this.convexHeightfield(t,e,r,n,a,i,s,o,c,l,u)}particleCylinder(e,t,n,r,i,a,o,s,c,l,u){return this.convexParticle(t,e,r,n,a,i,s,o,c,l,u)}sphereTrimesh(e,t,n,r,i,a,o,s,c,l,u){let d=oy,f=sy,p=cy,m=ly,h=uy,g=dy,_=hy,v=ay,y=ry,b=gy;Yg.pointToLocalFrame(r,a,n,h);let x=e.radius;_.lowerBound.set(h.x-x,h.y-x,h.z-x),_.upperBound.set(h.x+x,h.y+x,h.z+x),t.getTrianglesInAABB(_,b);let S=iy,C=e.radius*e.radius;for(let i=0;i<b.length;i++)for(let d=0;d<3;d++)if(t.getVertex(t.indices[b[i]*3+d],S),S.vsub(h,y),y.lengthSquared()<=C){if(v.copy(S),Yg.pointToWorldFrame(r,a,v,S),S.vsub(n,y),u)return!0;let i=this.createContactEquation(o,s,e,t,c,l);i.ni.copy(y),i.ni.normalize(),i.ri.copy(i.ni),i.ri.scale(e.radius,i.ri),i.ri.vadd(n,i.ri),i.ri.vsub(o.position,i.ri),i.rj.copy(S),i.rj.vsub(s.position,i.rj),this.result.push(i),this.createFrictionEquationsFromContact(i,this.frictionResult)}for(let i=0;i<b.length;i++)for(let _=0;_<3;_++){t.getVertex(t.indices[b[i]*3+_],d),t.getVertex(t.indices[b[i]*3+(_+1)%3],f),f.vsub(d,p),h.vsub(f,g);let v=g.dot(p);h.vsub(d,g);let y=g.dot(p);if(y>0&&v<0&&(h.vsub(d,g),m.copy(p),m.normalize(),y=g.dot(m),m.scale(y,g),g.vadd(d,g),g.distanceTo(h)<e.radius)){if(u)return!0;let i=this.createContactEquation(o,s,e,t,c,l);g.vsub(h,i.ni),i.ni.normalize(),i.ni.scale(e.radius,i.ri),i.ri.vadd(n,i.ri),i.ri.vsub(o.position,i.ri),Yg.pointToWorldFrame(r,a,g,g),g.vsub(s.position,i.rj),Yg.vectorToWorldFrame(a,i.ni,i.ni),Yg.vectorToWorldFrame(a,i.ri,i.ri),this.result.push(i),this.createFrictionEquationsFromContact(i,this.frictionResult)}}let w=fy,T=py,E=my,D=ny;for(let i=0,d=b.length;i!==d;i++){t.getTriangleVertices(b[i],w,T,E),t.getNormal(b[i],D),h.vsub(w,g);let d=g.dot(D);if(D.scale(d,g),h.vsub(g,g),d=g.distanceTo(h),F_.pointInTriangle(g,w,T,E)&&d<e.radius){if(u)return!0;let i=this.createContactEquation(o,s,e,t,c,l);g.vsub(h,i.ni),i.ni.normalize(),i.ni.scale(e.radius,i.ri),i.ri.vadd(n,i.ri),i.ri.vsub(o.position,i.ri),Yg.pointToWorldFrame(r,a,g,g),g.vsub(s.position,i.rj),Yg.vectorToWorldFrame(a,i.ni,i.ni),Yg.vectorToWorldFrame(a,i.ri,i.ri),this.result.push(i),this.createFrictionEquationsFromContact(i,this.frictionResult)}}b.length=0}planeTrimesh(e,t,n,r,i,a,o,s,c,l,u){let d=new Z,f=$v;f.set(0,0,1),i.vmult(f,f);for(let i=0;i<t.vertices.length/3;i++){t.getVertex(i,d);let p=new Z;p.copy(d),Yg.pointToWorldFrame(r,a,p,d);let m=ey;if(d.vsub(n,m),f.dot(m)<=0){if(u)return!0;let n=this.createContactEquation(o,s,e,t,c,l);n.ni.copy(f);let r=ty;f.scale(m.dot(f),r),d.vsub(r,r),n.ri.copy(r),n.ri.vsub(o.position,n.ri),n.rj.copy(d),n.rj.vsub(s.position,n.rj),this.result.push(n),this.createFrictionEquationsFromContact(n,this.frictionResult)}}}},Kv=new Z,qv=new Z,Jv=new Z,Yv=new Z,Xv=new Z,Zv=new Gg,Qv=new Gg,$v=new Z,ey=new Z,ty=new Z,ny=new Z,ry=new Z;new Z;var iy=new Z,ay=new Z,oy=new Z,sy=new Z,cy=new Z,ly=new Z,uy=new Z,dy=new Z,fy=new Z,py=new Z,my=new Z,hy=new Bg,gy=[],_y=new Z,vy=new Z,yy=new Z,by=new Z,xy=new Z;function Sy(e,t,n){let r=null,i=e.length;for(let a=0;a!==i;a++){let o=e[a],s=yy;e[(a+1)%i].vsub(o,s);let c=by;s.cross(t,c);let l=xy;n.vsub(o,l);let u=c.dot(l);if(r===null||u>0&&r===!0||u<=0&&r===!1){r===null&&(r=u>0);continue}return!1}return!0}var Cy=new Z,wy=new Z,Ty=new Z,Ey=new Z,Dy=[new Z,new Z,new Z,new Z,new Z,new Z],Oy=new Z,ky=new Z,Ay=new Z,jy=new Z,My=new Z,Ny=new Z,Py=new Z,Fy=new Z,Iy=new Z,Ly=new Z,Ry=new Z,zy=new Z,By=new Z,Vy=new Z;new Z,new Z;var Hy=new Z,Uy=new Z,Wy=new Z,Gy=new Z,Ky=new Z,qy=new Z,Jy=new Z,Yy=new Z,Xy=new Z,Zy=new Z,Qy=new Gg,$y=new Z;new Z;var eb=new Z,tb=new Z,nb=new Z,rb=new Z,ib=new Z,ab=[0],ob=new Z,sb=new Z,cb=class{constructor(){this.current=[],this.previous=[]}getKey(e,t){if(t<e){let n=t;t=e,e=n}return e<<16|t}set(e,t){let n=this.getKey(e,t),r=this.current,i=0;for(;n>r[i];)i++;if(n!==r[i]){for(let e=r.length-1;e>=i;e--)r[e+1]=r[e];r[i]=n}}tick(){let e=this.current;this.current=this.previous,this.previous=e,this.current.length=0}getDiff(e,t){let n=this.current,r=this.previous,i=n.length,a=r.length,o=0;for(let t=0;t<i;t++){let i=!1,a=n[t];for(;a>r[o];)o++;i=a===r[o],i||lb(e,a)}o=0;for(let e=0;e<a;e++){let i=!1,a=r[e];for(;a>n[o];)o++;i=n[o]===a,i||lb(t,a)}}};function lb(e,t){e.push((t&4294901760)>>16,t&65535)}var ub=(e,t)=>e<t?`${e}-${t}`:`${t}-${e}`,db=class{constructor(){this.data={keys:[]}}get(e,t){let n=ub(e,t);return this.data[n]}set(e,t,n){let r=ub(e,t);this.get(e,t)||this.data.keys.push(r),this.data[r]=n}delete(e,t){let n=ub(e,t),r=this.data.keys.indexOf(n);r!==-1&&this.data.keys.splice(r,1),delete this.data[n]}reset(){let e=this.data,t=e.keys;for(;t.length>0;){let n=t.pop();delete e[n]}}},fb=class extends Wg{constructor(e){e===void 0&&(e={}),super(),this.dt=-1,this.allowSleep=!!e.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=e.quatNormalizeSkip===void 0?0:e.quatNormalizeSkip,this.quatNormalizeFast=e.quatNormalizeFast!==void 0&&e.quatNormalizeFast,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new Z,e.gravity&&this.gravity.copy(e.gravity),e.frictionGravity&&(this.frictionGravity=new Z,this.frictionGravity.copy(e.frictionGravity)),this.broadphase=e.broadphase===void 0?new T_:e.broadphase,this.bodies=[],this.hasActiveBodies=!1,this.solver=e.solver===void 0?new Rv:e.solver,this.constraints=[],this.narrowphase=new Gv(this),this.collisionMatrix=new Ug,this.collisionMatrixPrevious=new Ug,this.bodyOverlapKeeper=new cb,this.shapeOverlapKeeper=new cb,this.contactmaterials=[],this.contactMaterialTable=new db,this.defaultMaterial=new Nv(`default`),this.defaultContactMaterial=new Mv(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:`addBody`,body:null},this.removeBodyEvent={type:`removeBody`,body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(e,t){return this.contactMaterialTable.get(e.id,t.id)}collisionMatrixTick(){let e=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=e,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(e){this.constraints.push(e)}removeConstraint(e){let t=this.constraints.indexOf(e);t!==-1&&this.constraints.splice(t,1)}rayTest(e,t,n){n instanceof E_?this.raycastClosest(e,t,{skipBackfaces:!0},n):this.raycastAll(e,t,{skipBackfaces:!0},n)}raycastAll(e,t,n,r){return n===void 0&&(n={}),n.mode=F_.ALL,n.from=e,n.to=t,n.callback=r,pb.intersectWorld(this,n)}raycastAny(e,t,n,r){return n===void 0&&(n={}),n.mode=F_.ANY,n.from=e,n.to=t,n.result=r,pb.intersectWorld(this,n)}raycastClosest(e,t,n,r){return n===void 0&&(n={}),n.mode=F_.CLOSEST,n.from=e,n.to=t,n.result=r,pb.intersectWorld(this,n)}addBody(e){this.bodies.includes(e)||(e.index=this.bodies.length,this.bodies.push(e),e.world=this,e.initPosition.copy(e.position),e.initVelocity.copy(e.velocity),e.timeLastSleepy=this.time,e instanceof $&&(e.initAngularVelocity.copy(e.angularVelocity),e.initQuaternion.copy(e.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=e,this.idToBodyMap[e.id]=e,this.dispatchEvent(this.addBodyEvent))}removeBody(e){e.world=null;let t=this.bodies.length-1,n=this.bodies,r=n.indexOf(e);if(r!==-1){n.splice(r,1);for(let e=0;e!==n.length;e++)n[e].index=e;this.collisionMatrix.setNumObjects(t),this.removeBodyEvent.body=e,delete this.idToBodyMap[e.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(e){return this.idToBodyMap[e]}getShapeById(e){let t=this.bodies;for(let n=0;n<t.length;n++){let r=t[n].shapes;for(let t=0;t<r.length;t++){let n=r[t];if(n.id===e)return n}}return null}addContactMaterial(e){this.contactmaterials.push(e),this.contactMaterialTable.set(e.materials[0].id,e.materials[1].id,e)}removeContactMaterial(e){let t=this.contactmaterials.indexOf(e);t!==-1&&(this.contactmaterials.splice(t,1),this.contactMaterialTable.delete(e.materials[0].id,e.materials[1].id))}fixedStep(e,t){e===void 0&&(e=1/60),t===void 0&&(t=10);let n=mb.now()/1e3;if(!this.lastCallTime)this.step(e,void 0,t);else{let r=n-this.lastCallTime;this.step(e,r,t)}this.lastCallTime=n}step(e,t,n){if(n===void 0&&(n=10),t===void 0)this.internalStep(e),this.time+=e;else{this.accumulator+=t;let r=mb.now(),i=0;for(;this.accumulator>=e&&i<n&&(this.internalStep(e),this.accumulator-=e,i++,!(mb.now()-r>e*1e3)););this.accumulator%=e;let a=this.accumulator/e;for(let e=0;e!==this.bodies.length;e++){let t=this.bodies[e];t.previousPosition.lerp(t.position,a,t.interpolatedPosition),t.previousQuaternion.slerp(t.quaternion,a,t.interpolatedQuaternion),t.previousQuaternion.normalize()}this.time+=t}}internalStep(e){this.dt=e;let t=this.contacts,n=bb,r=xb,i=this.bodies.length,a=this.bodies,o=this.solver,s=this.gravity,c=this.doProfiling,l=this.profile,u=$.DYNAMIC,d=-1/0,f=this.constraints,p=yb;s.length();let m=s.x,h=s.y,g=s.z,_=0;for(c&&(d=mb.now()),_=0;_!==i;_++){let e=a[_];if(e.type===u){let t=e.force,n=e.mass;t.x+=n*m,t.y+=n*h,t.z+=n*g}}for(let e=0,t=this.subsystems.length;e!==t;e++)this.subsystems[e].update();c&&(d=mb.now()),n.length=0,r.length=0,this.broadphase.collisionPairs(this,n,r),c&&(l.broadphase=mb.now()-d);let v=f.length;for(_=0;_!==v;_++){let e=f[_];if(!e.collideConnected)for(let t=n.length-1;t>=0;--t)(e.bodyA===n[t]&&e.bodyB===r[t]||e.bodyB===n[t]&&e.bodyA===r[t])&&(n.splice(t,1),r.splice(t,1))}this.collisionMatrixTick(),c&&(d=mb.now());let y=vb,b=t.length;for(_=0;_!==b;_++)y.push(t[_]);t.length=0;let x=this.frictionEquations.length;for(_=0;_!==x;_++)p.push(this.frictionEquations[_]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,r,this,t,y,this.frictionEquations,p),c&&(l.narrowphase=mb.now()-d),c&&(d=mb.now()),_=0;_<this.frictionEquations.length;_++)o.addEquation(this.frictionEquations[_]);let S=t.length;for(let e=0;e!==S;e++){let n=t[e],r=n.bi,i=n.bj,a=n.si,s=n.sj,c;c=r.material&&i.material&&this.getContactMaterial(r.material,i.material)||this.defaultContactMaterial,c.friction,r.material&&i.material&&(r.material.friction>=0&&i.material.friction>=0&&r.material.friction*i.material.friction,r.material.restitution>=0&&i.material.restitution>=0&&(n.restitution=r.material.restitution*i.material.restitution)),o.addEquation(n),r.allowSleep&&r.type===$.DYNAMIC&&r.sleepState===$.SLEEPING&&i.sleepState===$.AWAKE&&i.type!==$.STATIC&&i.velocity.lengthSquared()+i.angularVelocity.lengthSquared()>=i.sleepSpeedLimit**2*2&&(r.wakeUpAfterNarrowphase=!0),i.allowSleep&&i.type===$.DYNAMIC&&i.sleepState===$.SLEEPING&&r.sleepState===$.AWAKE&&r.type!==$.STATIC&&r.velocity.lengthSquared()+r.angularVelocity.lengthSquared()>=r.sleepSpeedLimit**2*2&&(i.wakeUpAfterNarrowphase=!0),this.collisionMatrix.set(r,i,!0),this.collisionMatrixPrevious.get(r,i)||(_b.body=i,_b.contact=n,r.dispatchEvent(_b),_b.body=r,i.dispatchEvent(_b)),this.bodyOverlapKeeper.set(r.id,i.id),this.shapeOverlapKeeper.set(a.id,s.id)}for(this.emitContactEvents(),c&&(l.makeContactConstraints=mb.now()-d,d=mb.now()),_=0;_!==i;_++){let e=a[_];e.wakeUpAfterNarrowphase&&=(e.wakeUp(),!1)}for(v=f.length,_=0;_!==v;_++){let e=f[_];e.update();for(let t=0,n=e.equations.length;t!==n;t++){let n=e.equations[t];o.addEquation(n)}}o.solve(e,this),c&&(l.solve=mb.now()-d),o.removeAllEquations();let C=Math.pow;for(_=0;_!==i;_++){let t=a[_];if(t.type&u){let n=C(1-t.linearDamping,e),r=t.velocity;r.scale(n,r);let i=t.angularVelocity;if(i){let n=C(1-t.angularDamping,e);i.scale(n,i)}}}this.dispatchEvent(gb),c&&(d=mb.now());let w=this.stepnumber%(this.quatNormalizeSkip+1)===0,T=this.quatNormalizeFast;for(_=0;_!==i;_++)a[_].integrate(e,w,T);this.clearForces(),this.broadphase.dirty=!0,c&&(l.integrate=mb.now()-d),this.stepnumber+=1,this.dispatchEvent(hb);let E=!0;if(this.allowSleep)for(E=!1,_=0;_!==i;_++){let e=a[_];e.sleepTick(this.time),e.sleepState!==$.SLEEPING&&(E=!0)}this.hasActiveBodies=E}emitContactEvents(){let e=this.hasAnyEventListener(`beginContact`),t=this.hasAnyEventListener(`endContact`);if((e||t)&&this.bodyOverlapKeeper.getDiff(Sb,Cb),e){for(let e=0,t=Sb.length;e<t;e+=2)wb.bodyA=this.getBodyById(Sb[e]),wb.bodyB=this.getBodyById(Sb[e+1]),this.dispatchEvent(wb);wb.bodyA=wb.bodyB=null}if(t){for(let e=0,t=Cb.length;e<t;e+=2)Tb.bodyA=this.getBodyById(Cb[e]),Tb.bodyB=this.getBodyById(Cb[e+1]),this.dispatchEvent(Tb);Tb.bodyA=Tb.bodyB=null}Sb.length=Cb.length=0;let n=this.hasAnyEventListener(`beginShapeContact`),r=this.hasAnyEventListener(`endShapeContact`);if((n||r)&&this.shapeOverlapKeeper.getDiff(Sb,Cb),n){for(let e=0,t=Sb.length;e<t;e+=2){let t=this.getShapeById(Sb[e]),n=this.getShapeById(Sb[e+1]);Eb.shapeA=t,Eb.shapeB=n,t&&(Eb.bodyA=t.body),n&&(Eb.bodyB=n.body),this.dispatchEvent(Eb)}Eb.bodyA=Eb.bodyB=Eb.shapeA=Eb.shapeB=null}if(r){for(let e=0,t=Cb.length;e<t;e+=2){let t=this.getShapeById(Cb[e]),n=this.getShapeById(Cb[e+1]);Db.shapeA=t,Db.shapeB=n,t&&(Db.bodyA=t.body),n&&(Db.bodyB=n.body),this.dispatchEvent(Db)}Db.bodyA=Db.bodyB=Db.shapeA=Db.shapeB=null}}clearForces(){let e=this.bodies,t=e.length;for(let n=0;n!==t;n++){let t=e[n];t.force,t.torque,t.force.set(0,0,0),t.torque.set(0,0,0)}}};new Bg;var pb=new F_,mb=globalThis.performance||{};if(!mb.now){let e=Date.now();mb.timing&&mb.timing.navigationStart&&(e=mb.timing.navigationStart),mb.now=()=>Date.now()-e}new Z;var hb={type:`postStep`},gb={type:`preStep`},_b={type:$.COLLIDE_EVENT_NAME,body:null,contact:null},vb=[],yb=[],bb=[],xb=[],Sb=[],Cb=[],wb={type:`beginContact`,bodyA:null,bodyB:null},Tb={type:`endContact`,bodyA:null,bodyB:null},Eb={type:`beginShapeContact`,bodyA:null,bodyB:null,shapeA:null,shapeB:null},Db={type:`endShapeContact`,bodyA:null,bodyB:null,shapeA:null,shapeB:null},Ob=class{world;constructor(){this.world=new fb,this.world.gravity.set(0,-9.82,0),this.world.broadphase=new T_,this.world.allowSleep=!0,this.createGround()}createGround(){let e=new $({type:$.STATIC,shape:new Fv});e.quaternion.setFromEuler(-Math.PI/2,0,0),this.world.addBody(e)}addStaticBox(e,t){let n=new Z(t[0]/2,t[1]/2,t[2]/2),r=new $({type:$.STATIC,shape:new n_(n)});return r.position.set(e[0],e[1],e[2]),this.world.addBody(r),r}step(e){this.world.step(1/60,e,3)}},kb=class{chassisBody;yaw=Math.PI;constructor(e){this.chassisBody=new $({mass:5}),this.chassisBody.addShape(new n_(new Z(.6,.4,.8))),this.chassisBody.position.set(0,1,35),this.chassisBody.linearDamping=.5,this.chassisBody.angularDamping=.99,this.chassisBody.allowSleep=!1,e.addBody(this.chassisBody)}applyMovement(e,t,n,r){if(n&&(this.yaw+=1/60*2),r&&(this.yaw-=1/60*2),this.chassisBody.quaternion.setFromEuler(0,this.yaw,0),this.chassisBody.angularVelocity.set(0,0,0),e||t){let t=new Z(0,0,1);this.chassisBody.quaternion.vmult(t,t);let n=e?5:-3;this.chassisBody.velocity.x=t.x*n,this.chassisBody.velocity.z=t.z*n}}reset(){this.chassisBody.position.set(0,1,35),this.yaw=Math.PI,this.chassisBody.quaternion.setFromEuler(0,this.yaw,0),this.chassisBody.velocity.setZero(),this.chassisBody.angularVelocity.setZero()}getChassisPosition(){return this.chassisBody.position}getChassisQuaternion(){return this.chassisBody.quaternion}},Ab=class{keys={forward:!1,backward:!1,left:!1,right:!1};onKeyDown;onKeyUp;constructor(){this.onKeyDown=e=>this.handleKey(e,!0),this.onKeyUp=e=>this.handleKey(e,!1),window.addEventListener(`keydown`,this.onKeyDown),window.addEventListener(`keyup`,this.onKeyUp)}handleKey(e,t){switch(e.code){case`KeyW`:case`ArrowUp`:this.keys.forward=t;break;case`KeyS`:case`ArrowDown`:this.keys.backward=t;break;case`KeyA`:case`ArrowLeft`:this.keys.left=t;break;case`KeyD`:case`ArrowRight`:this.keys.right=t;break;case`KeyR`:t&&window.dispatchEvent(new CustomEvent(`vehicle-reset`))}}update(e){e.applyMovement(this.keys.forward,this.keys.backward,this.keys.left,this.keys.right)}dispose(){window.removeEventListener(`keydown`,this.onKeyDown),window.removeEventListener(`keyup`,this.onKeyUp)}};function jb(e){return Array.isArray(e)?e:[e.x,e.y,e.z]}var Mb=class{triggers=[];activeZones=new Set;chassisBody;constructor(e,t,n){this.chassisBody=n;for(let n of e){let e=jb(n.position),r=jb(n.size),i=new Z(r[0]/2,r[1]/2,r[2]/2),a=new $({type:$.STATIC,shape:new n_(i),collisionResponse:!1});a.position.set(e[0],e[1],e[2]),t.addBody(a),this.triggers.push({name:n.name,body:a})}t.addEventListener(`beginContact`,e=>{this.handleContact(e.bodyA,e.bodyB,`enter`)}),t.addEventListener(`endContact`,e=>{this.handleContact(e.bodyA,e.bodyB,`leave`)})}handleContact(e,t,n){if(e!==this.chassisBody&&t!==this.chassisBody)return;let r=e===this.chassisBody?t:e,i=this.triggers.find(e=>e.body===r);if(i){if(n===`enter`){if(this.activeZones.has(i.name))return;this.activeZones.add(i.name),window.dispatchEvent(new CustomEvent(`classroom-enter`,{detail:{name:i.name}}))}else{if(!this.activeZones.has(i.name))return;this.activeZones.delete(i.name),window.dispatchEvent(new CustomEvent(`classroom-leave`,{detail:{name:i.name}}))}}}check(){}},Nb={"Desarrollo de Software":{title:`Desarrollo de Software`,subtitle:`Tecnicatura Superior`,duration:`Título Oficial · Presencial y Virtual`,description:`Formá parte del mundo tech. Diseñá y construí aplicaciones multiplataforma para Desktop, Tablets, Smartphones y Web. Dominá Python, JavaScript, React, Node.js, PHP, SQL y más.`,highlights:[`Python & JavaScript`,`React & Node.js`,`Apps Multiplataforma`,`Bases de Datos`],color:`#2980b9`,imageUrl:`https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72v4JX76rUvi9CkSpNDlkXNOA9DIvGFIk7EGymwr9WUNZwbMIPBwis0tkQTj27eqjfMIZv01ZG5jgVTYG2EKprfJKnFmI7DvKZpidufBhlK4e-QgZPcdbqvQbnpnh3h-CmjzowxlF8Sh-E5yNlgzWleAI2rVkNBxqy-d_OfR3k_BA8mLZ26B5jyVXRTzyC21edNQNi6v7ned-Gxe39zoP5QsJWtWFaxsXA=w600`},"Inteligencia Artificial":{title:`Inteligencia Artificial`,subtitle:`Tecnicatura Superior`,duration:`Título Oficial · Presencial y Virtual`,description:`Convertite en Data Scientist. Recopilá, preparé y analizá datos, construí modelos predictivos y comunicá hallazgos para fintech, healthtech y e-commerce.`,highlights:[`Data Science`,`Machine Learning`,`Modelos Predictivos`,`Análisis de Datos`],color:`#8e44ad`,imageUrl:`https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72vDVbt3hiBfGzcbFdci8K6HOEpUlRhzN4qAA_fydQyO9RFcKWFiWBI8YZS2ltsVCtMTu4Sp9yi7aAMg9Ya1lnNw7siDfl10-ytucbMv_tspYCU7JKjv1TbmKA_4TJEmKfDAKQeyyUT-T0FSa4Nppgpb8DFYeOxyyU6jy8C4ZCpuyetcd9Jrm1gOImLytWVJMjvjlOClbTds7A0mfM-NXToxLBdN53ZVL2_i=w600`},Mecatrónica:{title:`Mecatrónica`,subtitle:`Tecnicatura Superior`,duration:`Título Oficial · Presencial con Prácticas`,description:`Proyectá dispositivos, equipos y sistemas automatizados. Diseñá, instalá y mantené procesos de control de maquinarias para la industria.`,highlights:[`Robótica Industrial`,`Automatización`,`Electrónica`,`Diseño Mecánico`],color:`#e74c3c`,imageUrl:``},"Turismo y Hotelería":{title:`Turismo y Hotelería`,subtitle:`Tecnicatura Superior`,duration:`Título Oficial · Presencial con Prácticas`,description:`Trabajá en alojamiento, gastronomía, entretenimiento, transporte y logística turística. Prácticas profesionalizantes desde primer año.`,highlights:[`Hotelería`,`Gastronomía`,`Eventos`,`Gestión Turística`],color:`#27ae60`,imageUrl:``},"Marketing Digital":{title:`Marketing Digital`,subtitle:`Tecnicatura Superior`,duration:`Título Oficial · Presencial con Prácticas`,description:`Analizá tendencias de consumo, gestioná planes de marketing digital, desarrollá estrategias de e-commerce y construí posicionamiento de marca en redes sociales.`,highlights:[`Social Media`,`E-Commerce`,`Branding`,`Analítica Digital`],color:`#e67e22`,imageUrl:`https://lh7-us.googleusercontent.com/sitesv-images-rt/AMxu72vNhxSp_T3Dgo7ych2bdnxcxxUg5KaaMkd6I6GcPCNtSRFPk_CmlZMpBHhkbLXPL6M9Bgt-CqmHIpCyJ8u7YXvTEzx61_TNT-7kWPdxhF92hYwn97hlsBgqg46hxw7L1yETL5wlS6sZT1NdEEBsy3TnV9T1Ha2CYnabA_oMT_GaFWbqZywON2sX8MwaYrD7qVlP9948d6Kc8EmnfRgMsKx-5fqzsWHe4c8K=w600`},"Cómo llegar":{title:`Cómo llegar`,subtitle:`ITEC Río Cuarto — Instituto Tecnológico`,duration:`Dirección`,description:`Te esperamos en nuestras sedes de Río Cuarto, Córdoba.`,highlights:[`Campus: Tejerina Norte 783`,`Sede Centro: Constitución 716`,`informes@itecriocuarto.org.ar`],color:`#2980b9`,imageUrl:``}},Pb=class{panel;isVisible=!1;onEnter;onLeave;constructor(){this.panel=this.createPanel(),document.body.appendChild(this.panel),this.onEnter=e=>{let t=e.detail;this.show(t.name)},this.onLeave=()=>{this.hide()},window.addEventListener(`classroom-enter`,this.onEnter),window.addEventListener(`classroom-leave`,this.onLeave)}createPanel(){let e=document.createElement(`div`);return e.id=`info-panel`,e.innerHTML=`
      <div class="info-panel__card">
        <div class="info-panel__accent"></div>
        <button class="info-panel__close" aria-label="Cerrar">&times;</button>
        <div class="info-panel__image-container">
          <img class="info-panel__image" src="" alt="" />
        </div>
        <h2 class="info-panel__title"></h2>
        <p class="info-panel__subtitle"></p>
        <span class="info-panel__duration"></span>
        <p class="info-panel__description"></p>
        <div class="info-panel__highlights"></div>
        <a class="info-panel__link" href="https://www.itecriocuarto.org.ar" target="_blank" rel="noopener">
          Más info en itecriocuarto.org.ar →
        </a>
      </div>
    `,e.querySelector(`.info-panel__close`).addEventListener(`click`,()=>this.hide()),e}show(e){let t=Nb[e];if(!t)return;let n=this.panel.querySelector(`.info-panel__card`),r=n.querySelector(`.info-panel__accent`),i=n.querySelector(`.info-panel__title`),a=n.querySelector(`.info-panel__subtitle`),o=n.querySelector(`.info-panel__duration`),s=n.querySelector(`.info-panel__description`),c=n.querySelector(`.info-panel__highlights`),l=n.querySelector(`.info-panel__image-container`),u=n.querySelector(`.info-panel__image`);r.style.background=t.color,t.imageUrl?(u.src=t.imageUrl,u.alt=t.title,l.style.display=``):(u.src=``,l.style.display=`none`),i.textContent=t.title,a.textContent=t.subtitle,o.textContent=t.duration,s.textContent=t.description,c.innerHTML=``;for(let e of t.highlights){let n=document.createElement(`span`);n.className=`info-panel__chip`,n.style.background=t.color+`33`,n.style.borderColor=t.color+`80`,n.textContent=e,c.appendChild(n)}this.panel.classList.add(`info-panel--visible`),this.isVisible=!0}hide(){this.isVisible&&=(this.panel.classList.remove(`info-panel--visible`),!1)}dispose(){window.removeEventListener(`classroom-enter`,this.onEnter),window.removeEventListener(`classroom-leave`,this.onLeave),this.panel.remove()}},Fb=[`#2980b9`,`#e74c3c`,`#e67e22`,`#8e44ad`,`#27ae60`,`#f1c40f`],Ib=60,Lb=3e3,Rb=class{banner;hideTimer=null;confetti=new Set;onGoal=()=>this.celebrate();constructor(){this.banner=document.createElement(`div`),this.banner.className=`goal-banner`,this.banner.innerHTML=`<div class="goal-banner__title">¡GOOOL de ITEC!</div><div class="goal-banner__subtitle">Descubriste el easter egg del patio ⚽</div>`,document.body.appendChild(this.banner),window.addEventListener(`goal-scored`,this.onGoal)}celebrate(){this.banner.classList.add(`goal-banner--visible`),this.hideTimer!==null&&window.clearTimeout(this.hideTimer),this.hideTimer=window.setTimeout(()=>{this.banner.classList.remove(`goal-banner--visible`),this.hideTimer=null},Lb);for(let e=0;e<Ib;e++){let e=document.createElement(`div`);e.className=`goal-confetti`,e.style.left=`${Math.random()*100}vw`,e.style.backgroundColor=Fb[Math.floor(Math.random()*Fb.length)],e.style.animationDuration=`${2+Math.random()*1.5}s`,e.style.animationDelay=`${Math.random()*.6}s`,e.addEventListener(`animationend`,()=>{e.remove(),this.confetti.delete(e)}),this.confetti.add(e),document.body.appendChild(e)}}dispose(){window.removeEventListener(`goal-scored`,this.onGoal),this.hideTimer!==null&&window.clearTimeout(this.hideTimer),this.confetti.forEach(e=>e.remove()),this.confetti.clear(),this.banner.remove()}},zb=new V(-6,.5,-34),Bb=3.5,Vb=class{scene;world;body;ballVisual=null;goalVisual=null;scored=!1;resetTimer=0;onVehicleReset=()=>this.reset();constructor(e,t){this.scene=e,this.world=t,this.body=new $({mass:.4,shape:new Pv(id),linearDamping:.4,angularDamping:.4}),this.body.allowSleep=!1,this.body.position.set(zb.x,zb.y,zb.z),t.addBody(this.body),this.buildGoalPhysics(),window.addEventListener(`vehicle-reset`,this.onVehicleReset)}setVisuals(e,t){this.ballVisual&&Zu(this.ballVisual),this.goalVisual&&Zu(this.goalVisual),this.ballVisual=e,this.goalVisual=t,this.syncVisual(),this.scene.add(e),this.scene.add(t)}syncVisual(){if(!this.ballVisual)return;let e=this.body.position,t=this.body.quaternion;this.ballVisual.position.set(e.x,e.y,e.z),this.ballVisual.quaternion.set(t.x,t.y,t.z,t.w)}buildGoalPhysics(){let e=5/2,t=12+od,n=12+od/2,r=(e,t)=>{let n=new $({type:$.STATIC,shape:new n_(new Z(...e))});n.position.set(...t),this.world.addBody(n)};for(let e of[-36.5,-31.5])r([sd/2,ad/2,sd/2],[12,ad/2,e]);r([sd/2,sd/2,e],[12,ad,-34]),r([.1,ad/2,e],[t,ad/2,-34]);for(let e of[-36.5,-31.5])r([od/2,ad/2,.1],[n,ad/2,e])}update(e){let t=this.body.position;this.syncVisual(),this.scored?(this.resetTimer-=e,this.resetTimer<=0&&this.reset()):t.x>12.3&&Math.abs(t.z- -34)<2.2&&t.y<2.3?(this.scored=!0,this.resetTimer=Bb,window.dispatchEvent(new CustomEvent(`goal-scored`))):(t.y<-3||Math.abs(t.x)>48||Math.abs(t.z)>48)&&this.reset()}reset(){this.body.position.set(zb.x,zb.y,zb.z),this.body.velocity.setZero(),this.body.angularVelocity.setZero(),this.body.quaternion.set(0,0,0,1),this.scored=!1,this.resetTimer=0}dispose(){window.removeEventListener(`vehicle-reset`,this.onVehicleReset),this.ballVisual&&Zu(this.ballVisual),this.goalVisual&&Zu(this.goalVisual),this.ballVisual=null,this.goalVisual=null}},Hb=class{overlay;constructor(){this.overlay=document.createElement(`div`),this.overlay.id=`loading-screen`,this.overlay.innerHTML=`
      <div class="loading-screen__skyline" aria-hidden="true"></div>
      <div class="loading-screen__content">
        <h1 class="loading-screen__title">ITEC Rio Cuarto</h1>
        <p class="loading-screen__subtitle">Explorador 3D</p>
        <p class="loading-screen__motto">Educación para transformar</p>
        <p class="loading-screen__motto">EDUCACION PARA TRANSFORMAR</p>
        <div class="loading-screen__spinner"></div>
        <p class="loading-screen__hint">Usa WASD o flechas para explorar</p>
      </div>
    `,document.body.appendChild(this.overlay)}hide(){this.overlay.classList.add(`loading-screen--hidden`),this.overlay.addEventListener(`transitionend`,()=>{this.overlay.remove()},{once:!0})}},Ub=`:root{--itec-blue:#1a5276;--itec-blue-light:#2980b9;--itec-blue-dark:#0e2f44;--panel-bg:#0a0f1ed9;--text-primary:#fff;--text-secondary:#ffffffb3;--chip-bg:#1a527699;--chip-border:#2980b980}*,:before,:after{box-sizing:border-box;margin:0;padding:0}html,body{background:#000;width:100vw;height:100vh;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;overflow:hidden}#webgl{z-index:0;outline:none;width:100vw;height:100vh;position:fixed;top:0;left:0}#loading-screen{z-index:100;background:linear-gradient(135deg, var(--itec-blue-dark) 0%, var(--itec-blue) 100%);justify-content:center;align-items:center;width:100vw;height:100vh;transition:opacity .8s ease-out;display:flex;position:fixed;top:0;left:0}#loading-screen.loading-screen--hidden{opacity:0;pointer-events:none}.loading-screen__content{text-align:center;color:var(--text-primary)}.loading-screen__title{letter-spacing:2px;margin-bottom:.5rem;font-size:3rem;font-weight:700}.loading-screen__subtitle{color:var(--text-secondary);margin-bottom:.5rem;font-size:1.2rem}.loading-screen__motto{color:var(--itec-blue-light);letter-spacing:3px;margin-bottom:2rem;font-size:.85rem;font-weight:600}.loading-screen__spinner{border:4px solid #fff3;border-top-color:#fff;border-radius:50%;width:48px;height:48px;margin:0 auto 1rem;animation:.8s linear infinite spin}.loading-screen__hint{color:var(--text-secondary);font-size:.9rem}@keyframes spin{to{transform:rotate(360deg)}}#info-panel{z-index:50;pointer-events:none;width:380px;max-width:calc(100vw - 32px);transition:right .4s cubic-bezier(.22,1,.36,1);position:fixed;top:50%;right:-420px;transform:translateY(-50%)}#info-panel.info-panel--visible{pointer-events:auto;right:16px}.info-panel__card{background:var(--panel-bg);-webkit-backdrop-filter:blur(16px);color:var(--text-primary);border:1px solid #ffffff1a;border-radius:16px;padding:28px;position:relative}.info-panel__accent{border-radius:16px 16px 0 0;height:4px;margin:-28px -28px 20px}.info-panel__close{color:var(--text-secondary);cursor:pointer;background:0 0;border:none;font-size:1.5rem;line-height:1;transition:color .2s;position:absolute;top:12px;right:16px}.info-panel__close:hover{color:var(--text-primary)}.info-panel__image-container{background:#ffffff0d;border-radius:10px;width:100%;height:140px;margin-bottom:16px;overflow:hidden}.info-panel__image{object-fit:cover;width:100%;height:100%;display:block}.info-panel__image-container:empty,.info-panel__image[src=""]{display:none}.info-panel__title{color:var(--text-primary);margin-bottom:4px;font-size:1.5rem;font-weight:700}.info-panel__subtitle{color:var(--text-secondary);margin-bottom:12px;font-size:.95rem}.info-panel__duration{background:var(--itec-blue);color:#fff;border-radius:20px;margin-bottom:14px;padding:4px 12px;font-size:.8rem;font-weight:600;display:inline-block}.info-panel__description{color:var(--text-secondary);margin-bottom:16px;font-size:.95rem;line-height:1.5}.info-panel__highlights{flex-wrap:wrap;gap:8px;display:flex}.info-panel__chip{background:var(--chip-bg);border:1px solid var(--chip-border);color:var(--text-primary);border-radius:20px;padding:5px 14px;font-size:.8rem;font-weight:500;display:inline-block}.info-panel__link{color:var(--itec-blue-light);margin-top:16px;font-size:.85rem;font-weight:500;text-decoration:none;transition:color .2s;display:block}.info-panel__link:hover{color:#fff}#controls-hint{z-index:40;-webkit-backdrop-filter:blur(8px);color:var(--text-secondary);-webkit-user-select:none;user-select:none;background:#00000080;border-radius:10px;align-items:center;gap:6px;padding:8px 14px;font-size:.75rem;display:flex;position:fixed;bottom:20px;left:20px}.controls-hint__key{width:26px;height:26px;color:var(--text-primary);background:#ffffff26;border:1px solid #ffffff40;border-radius:5px;justify-content:center;align-items:center;font-size:.7rem;font-weight:600;display:inline-flex}.controls-hint__label{margin:0 2px}.controls-hint__separator{opacity:.4;margin:0 4px}.goal-banner{text-align:center;-webkit-backdrop-filter:blur(12px);opacity:0;pointer-events:none;z-index:60;background:#ffffffd9;border:1px solid #ffffff80;border-radius:20px;padding:24px 40px;transition:opacity .3s,transform .3s;position:fixed;top:40%;left:50%;transform:translate(-50%,-50%)scale(.8);box-shadow:0 8px 32px #00000026}.goal-banner--visible{opacity:1;transform:translate(-50%,-50%)scale(1)}.goal-banner__title{color:var(--itec-blue);font-size:3rem;font-weight:800}.goal-banner__subtitle{color:var(--text-primary);margin-top:8px;font-size:1.1rem}.goal-confetti{pointer-events:none;z-index:60;border-radius:2px;width:10px;height:14px;animation:3s linear forwards goal-confetti-fall;position:fixed;top:-20px}@keyframes goal-confetti-fall{to{transform:translateY(110vh)rotate(720deg)}}@media (width<=480px){#info-panel{width:calc(100vw - 32px)}#info-panel.info-panel--visible{right:16px}.info-panel__card{padding:20px}.loading-screen__title{font-size:2rem}.goal-banner{width:calc(100vw - 32px);padding:16px 20px}.goal-banner__title{font-size:2rem}.goal-banner__subtitle{font-size:.95rem}}.style-switcher{z-index:45;-webkit-user-select:none;user-select:none;flex-wrap:wrap;align-items:center;gap:6px;max-width:calc(100vw - 32px);display:flex;position:fixed;top:16px;left:16px}.style-switcher__button{cursor:pointer;font:inherit;-webkit-tap-highlight-color:transparent}.style-switcher{-webkit-backdrop-filter:blur(8px);background:#00000080;border:1px solid #ffffff2e;border-radius:12px;padding:8px 10px;font-size:.75rem}.style-switcher__label{color:var(--text-secondary);margin-right:4px;font-weight:600}.style-switcher__button{color:var(--text-primary);background:#ffffff1a;border:1px solid #ffffff40;border-radius:8px;padding:5px 12px;font-size:.75rem;font-weight:600;transition:background .2s,border-color .2s}.style-switcher__button:hover{background:#fff3}.style-switcher__button--active{background:var(--itec-blue-light);border-color:#fff9}.loading-screen__skyline{display:none}@media (width<=480px){.style-switcher{gap:4px;padding:6px 8px;top:10px;left:10px}.style-switcher__button{padding:4px 8px;font-size:.68rem}}.quality-toggle{z-index:41;cursor:pointer;font:inherit;color:var(--text-primary);-webkit-backdrop-filter:blur(8px);-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;background:#00000080;border:1px solid #ffffff2e;border-radius:10px;padding:8px 14px;font-size:.75rem;font-weight:600;transition:background .2s,border-color .2s;position:fixed;bottom:20px;right:20px}.quality-toggle:hover{background:#fff3}.quality-toggle[aria-pressed=true]{border-color:#ffffff80}.quality-toggle--low{color:var(--text-secondary)}@media (width<=480px){.quality-toggle{padding:6px 10px;font-size:.68rem;bottom:72px;right:10px}}`,Wb=`:root{--itec-blue:#1a5276;--itec-blue-light:#2980b9;--itec-blue-dark:#0e2f44;--panel-bg:#0e2f44;--cut:14px;--text-primary:#fff;--text-secondary:#ffffffb3;--chip-bg:#1a5276;--chip-border:#2980b9}*,:before,:after{box-sizing:border-box;margin:0;padding:0}html,body{background:#000;width:100vw;height:100vh;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;overflow:hidden}#webgl{z-index:0;outline:none;width:100vw;height:100vh;position:fixed;top:0;left:0}#loading-screen{z-index:100;background-color:var(--itec-blue);background-image:linear-gradient(135deg, var(--itec-blue-dark) 25%, transparent 25%), linear-gradient(225deg, var(--itec-blue-light) 25%, transparent 25%), linear-gradient(315deg, var(--itec-blue-dark) 25%, transparent 25%), linear-gradient(45deg, #15415e 25%, transparent 25%);background-size:120px 120px;justify-content:center;align-items:center;width:100vw;height:100vh;transition:opacity .8s ease-out;display:flex;position:fixed;top:0;left:0;overflow:hidden}#loading-screen.loading-screen--hidden{opacity:0;pointer-events:none}.loading-screen__content{text-align:center;color:var(--text-primary);background:var(--itec-blue-dark);clip-path:polygon(24px 0,100% 0,100% calc(100% - 24px),calc(100% - 24px) 100%,0 100%,0 24px);padding:40px 56px;position:relative}.loading-screen__title{letter-spacing:2px;margin-bottom:.5rem;font-size:3rem;font-weight:700}.loading-screen__subtitle{color:var(--text-secondary);margin-bottom:.5rem;font-size:1.2rem}.loading-screen__motto{color:var(--itec-blue-light);letter-spacing:3px;margin-bottom:2rem;font-size:.85rem;font-weight:600}.loading-screen__spinner{border:4px solid var(--itec-blue-light);clip-path:polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%);border-top-color:#fff;border-radius:0;width:48px;height:48px;margin:0 auto 1rem;animation:.8s steps(8,end) infinite spin}.loading-screen__hint{color:var(--text-secondary);font-size:.9rem}@keyframes spin{to{transform:rotate(360deg)}}#info-panel{z-index:50;pointer-events:none;width:380px;max-width:calc(100vw - 32px);transition:right .4s cubic-bezier(.22,1,.36,1);position:fixed;top:50%;right:-420px;transform:translateY(-50%)}#info-panel.info-panel--visible{pointer-events:auto;right:16px}.info-panel__card{background:var(--panel-bg);clip-path:polygon(var(--cut) 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut));color:var(--text-primary);border-radius:0;padding:28px;position:relative}.info-panel__accent{border-radius:0;height:6px;margin:-28px -28px 20px}.info-panel__close{color:var(--text-secondary);cursor:pointer;background:0 0;border:none;font-size:1.5rem;line-height:1;transition:color .2s;position:absolute;top:12px;right:16px}.info-panel__close:hover{color:var(--text-primary)}.info-panel__image-container{clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);background:var(--itec-blue);border-radius:0;width:100%;height:140px;margin-bottom:16px;overflow:hidden}.info-panel__image{object-fit:cover;width:100%;height:100%;display:block}.info-panel__image-container:empty,.info-panel__image[src=""]{display:none}.info-panel__title{color:var(--text-primary);margin-bottom:4px;font-size:1.5rem;font-weight:700}.info-panel__subtitle{color:var(--text-secondary);margin-bottom:12px;font-size:.95rem}.info-panel__duration{background:var(--itec-blue);color:#fff;clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);border-radius:0;margin-bottom:14px;padding:4px 14px;font-size:.8rem;font-weight:600;display:inline-block}.info-panel__description{color:var(--text-secondary);margin-bottom:16px;font-size:.95rem;line-height:1.5}.info-panel__highlights{flex-wrap:wrap;gap:8px;display:flex}.info-panel__chip{background:var(--chip-bg);border:1px solid var(--chip-border);color:var(--text-primary);clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%);border-radius:0;padding:5px 16px;font-size:.8rem;font-weight:500;display:inline-block}.info-panel__link{color:var(--itec-blue-light);margin-top:16px;font-size:.85rem;font-weight:500;text-decoration:none;transition:color .2s;display:block}.info-panel__link:hover{color:#fff}#controls-hint{z-index:40;background:var(--itec-blue-dark);clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);color:var(--text-secondary);-webkit-user-select:none;user-select:none;border-radius:0;align-items:center;gap:6px;padding:10px 20px;font-size:.75rem;display:flex;position:fixed;bottom:20px;left:20px}.controls-hint__key{background:var(--itec-blue-light);clip-path:polygon(5px 0,100% 0,100% calc(100% - 5px),calc(100% - 5px) 100%,0 100%,0 5px);width:26px;height:26px;color:var(--text-primary);border:0;border-radius:0;justify-content:center;align-items:center;font-size:.7rem;font-weight:600;display:inline-flex}.controls-hint__label{margin:0 2px}.controls-hint__separator{opacity:.4;margin:0 4px}.goal-banner{text-align:center;clip-path:polygon(20px 0,100% 0,100% calc(100% - 20px),calc(100% - 20px) 100%,0 100%,0 20px);opacity:0;pointer-events:none;z-index:60;background:#f2ead8;border-radius:0;padding:24px 40px;transition:opacity .3s,transform .3s;position:fixed;top:40%;left:50%;transform:translate(-50%,-50%)scale(.8)}.goal-banner--visible{opacity:1;transform:translate(-50%,-50%)scale(1)}.goal-banner__title{color:var(--itec-blue);font-size:3rem;font-weight:800}.goal-banner__subtitle{color:var(--itec-blue-dark);margin-top:8px;font-size:1.1rem}.goal-confetti{clip-path:polygon(50% 0,100% 100%,0 100%);pointer-events:none;z-index:60;border-radius:0;width:10px;height:14px;animation:3s linear forwards goal-confetti-fall;position:fixed;top:-20px}@keyframes goal-confetti-fall{to{transform:translateY(110vh)rotate(720deg)}}@media (width<=480px){#info-panel{width:calc(100vw - 32px)}#info-panel.info-panel--visible{right:16px}.info-panel__card{padding:20px}.loading-screen__title{font-size:2rem}.goal-banner{width:calc(100vw - 32px);padding:16px 20px}.goal-banner__title{font-size:2rem}.goal-banner__subtitle{font-size:.95rem}}.style-switcher{z-index:45;-webkit-user-select:none;user-select:none;flex-wrap:wrap;align-items:center;gap:6px;max-width:calc(100vw - 32px);display:flex;position:fixed;top:16px;left:16px}.style-switcher__button{cursor:pointer;font:inherit;-webkit-tap-highlight-color:transparent}.style-switcher{background:var(--itec-blue-dark);clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);border-radius:0;padding:8px 14px;font-size:.75rem}.style-switcher__label{color:var(--text-secondary);margin-right:4px;font-weight:600}.style-switcher__button{background:var(--itec-blue);clip-path:polygon(5px 0,100% 0,100% calc(100% - 5px),calc(100% - 5px) 100%,0 100%,0 5px);color:var(--text-primary);border:0;border-radius:0;padding:5px 12px;font-size:.75rem;font-weight:600}.style-switcher__button:hover{background:var(--itec-blue-light)}.style-switcher__button--active{color:#0e2f44;background:#f5b041}.loading-screen__skyline{display:none}@media (width<=480px){.style-switcher{gap:4px;padding:6px 10px;top:10px;left:10px}.style-switcher__button{padding:4px 8px;font-size:.68rem}}.quality-toggle{z-index:41;cursor:pointer;font:inherit;color:var(--text-primary);background:var(--itec-blue-dark);clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px);-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;border:0;border-radius:0;padding:8px 16px;font-size:.75rem;font-weight:600;position:fixed;bottom:20px;right:20px}.quality-toggle:hover{background:var(--itec-blue)}.quality-toggle[aria-pressed=true]{color:#0e2f44;background:#f5b041}.quality-toggle--low{background:var(--itec-blue-dark);color:var(--text-secondary)}@media (width<=480px){.quality-toggle{padding:6px 12px;font-size:.68rem;bottom:72px;right:10px}}`,Gb=`:root{--itec-blue:#1a5276;--itec-blue-light:#2980b9;--itec-blue-dark:#0e2f44;--panel-bg:#0e2f44;--px:4px;--ink:#081a28;--font-pixel:"Press Start 2P", ui-monospace, "Courier New", monospace;--font-body:system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;--pixel-frame:calc(var(--px) * -1) 0 0 0 var(--ink), var(--px) 0 0 0 var(--ink), 0 calc(var(--px) * -1) 0 0 var(--ink), 0 var(--px) 0 0 var(--ink), calc(var(--px) * 2) calc(var(--px) * 2) 0 0 var(--ink);--text-primary:#fff;--text-secondary:#ffffffb3;--chip-bg:#1a5276;--chip-border:#2980b9}*,:before,:after{box-sizing:border-box;margin:0;padding:0}html,body{background:#000;width:100vw;height:100vh;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;overflow:hidden}#webgl{z-index:0;outline:none;width:100vw;height:100vh;position:fixed;top:0;left:0}#loading-screen{z-index:100;background-color:var(--itec-blue);background-image:conic-gradient(#16486a 25%, var(--itec-blue) 0 50%, #16486a 0 75%, var(--itec-blue) 0);background-size:128px 128px;justify-content:center;align-items:center;width:100vw;height:100vh;transition:opacity .8s ease-out;display:flex;position:fixed;top:0;left:0;overflow:hidden}#loading-screen.loading-screen--hidden{opacity:0;pointer-events:none}.loading-screen__skyline{pointer-events:none;height:30vh;min-height:160px;position:absolute;bottom:0;left:0;right:0}.loading-screen__skyline:before,.loading-screen__skyline:after{content:"";clip-path:polygon(0 100%,0 80%,12.5% 80%,12.5% 60%,25% 60%,25% 40%,37.5% 40%,37.5% 20%,62.5% 20%,62.5% 40%,75% 40%,75% 60%,87.5% 60%,87.5% 80%,100% 80%,100% 100%);position:absolute;bottom:0}.loading-screen__skyline:before{background:#27ae60;width:min(48vw,520px);height:100%;left:4%}.loading-screen__skyline:after{background:#1e8449;width:min(34vw,360px);height:72%;right:4%}.loading-screen__content{z-index:1;text-align:center;color:var(--text-primary);background:var(--itec-blue-dark);max-width:calc(100vw - 48px);box-shadow:var(--pixel-frame);padding:40px 56px;position:relative}.loading-screen__title{font-family:var(--font-pixel);letter-spacing:0;text-shadow:var(--px) var(--px) 0 var(--ink);margin-bottom:1rem;font-size:clamp(1.1rem,4.2vw,2rem);font-weight:400;line-height:1.4}.loading-screen__subtitle{color:var(--text-secondary);margin-bottom:.5rem;font-size:1.2rem;font-weight:700}.loading-screen__motto{color:#7fc4f0;letter-spacing:3px;margin-bottom:2rem;font-size:.85rem;font-weight:700}.loading-screen__spinner{background:var(--itec-blue-light);border:8px solid var(--ink);border-top-color:#fff;border-radius:0;width:40px;height:40px;margin:0 auto 1.25rem;animation:.8s steps(4,end) infinite spin}.loading-screen__hint{font-family:var(--font-pixel);color:var(--text-secondary);font-size:.6rem;line-height:1.8}@keyframes spin{to{transform:rotate(360deg)}}#info-panel{z-index:50;pointer-events:none;width:380px;max-width:calc(100vw - 32px);transition:right .4s cubic-bezier(.22,1,.36,1);position:fixed;top:50%;right:-420px;transform:translateY(-50%)}#info-panel.info-panel--visible{pointer-events:auto;right:16px}.info-panel__card{background:var(--panel-bg);box-shadow:var(--pixel-frame);color:var(--text-primary);border-radius:0;padding:28px;position:relative}.info-panel__accent{border-bottom:var(--px) solid var(--ink);border-radius:0;height:8px;margin:-28px -28px 20px}.info-panel__close{color:var(--text-primary);font-family:var(--font-pixel);cursor:pointer;background:0 0;background:var(--ink);border:none;padding:6px 8px;font-size:1rem;line-height:1;transition:background .2s;position:absolute;top:12px;right:16px}.info-panel__close:hover{background:var(--itec-blue-light)}.info-panel__image-container{border:var(--px) solid var(--ink);background:var(--itec-blue);border-radius:0;width:100%;height:140px;margin-bottom:16px;overflow:hidden}.info-panel__image{object-fit:cover;width:100%;height:100%;display:block}.info-panel__image-container:empty,.info-panel__image[src=""]{display:none}.info-panel__title{font-family:var(--font-pixel);overflow-wrap:anywhere;color:var(--text-primary);margin-bottom:8px;padding-right:36px;font-size:1rem;font-weight:400;line-height:1.5}.info-panel__subtitle{color:var(--text-secondary);margin-bottom:12px;font-size:.95rem}.info-panel__duration{background:var(--itec-blue);color:#fff;border:var(--px) solid var(--ink);border-radius:0;margin-bottom:14px;padding:4px 12px;font-size:.8rem;font-weight:700;display:inline-block}.info-panel__description{color:var(--text-secondary);margin-bottom:16px;font-size:.95rem;line-height:1.5}.info-panel__highlights{flex-wrap:wrap;gap:8px;display:flex}.info-panel__chip{background:var(--chip-bg);color:var(--text-primary);border:var(--px) solid var(--ink);box-shadow:var(--px) var(--px) 0 0 var(--ink);border-radius:0;padding:3px 10px;font-size:.8rem;font-weight:600;display:inline-block}.info-panel__link{color:#7fc4f0;margin-top:16px;font-size:.85rem;font-weight:700;text-decoration:none;transition:color .2s;display:block}.info-panel__link:hover{color:#fff}#controls-hint{z-index:40;background:var(--itec-blue-dark);box-shadow:var(--pixel-frame);color:var(--text-secondary);font-family:var(--font-pixel);-webkit-user-select:none;user-select:none;border-radius:0;align-items:center;gap:6px;padding:10px 16px;font-size:.55rem;display:flex;position:fixed;bottom:20px;left:20px}.controls-hint__key{background:var(--itec-blue-light);width:28px;height:28px;box-shadow:inset 0 var(--px) 0 0 #ffffff59, inset 0 calc(var(--px) * -1) 0 0 #00000059;font-family:var(--font-pixel);color:var(--text-primary);border:0;border-radius:0;justify-content:center;align-items:center;font-size:.6rem;font-weight:400;display:inline-flex}.controls-hint__label{margin:0 2px}.controls-hint__separator{opacity:.4;margin:0 4px}.goal-banner{text-align:center;box-shadow:var(--pixel-frame);opacity:0;pointer-events:none;z-index:60;background:#f2ead8;border-radius:0;padding:24px 40px;transition:opacity .3s,transform .3s;position:fixed;top:40%;left:50%;transform:translate(-50%,-50%)scale(.8)}.goal-banner--visible{opacity:1;transform:translate(-50%,-50%)scale(1)}.goal-banner__title{font-family:var(--font-pixel);color:var(--itec-blue);text-shadow:var(--px) var(--px) 0 #081a2840;font-size:1.8rem;font-weight:400;line-height:1.4}.goal-banner__subtitle{color:var(--itec-blue-dark);margin-top:12px;font-size:1.1rem;font-weight:700}.goal-confetti{width:12px;height:12px;box-shadow:var(--px) var(--px) 0 0 #081a2859;pointer-events:none;z-index:60;border-radius:0;animation:3s linear forwards goal-confetti-fall;position:fixed;top:-20px}@keyframes goal-confetti-fall{to{transform:translateY(110vh)rotate(720deg)}}@media (width<=480px){#info-panel{width:calc(100vw - 32px)}#info-panel.info-panel--visible{right:16px}.info-panel__card{padding:20px}.loading-screen__content{padding:28px 24px}.goal-banner{width:calc(100vw - 48px);padding:16px 20px}.goal-banner__title{font-size:1.1rem}.goal-banner__subtitle{font-size:.95rem}}.style-switcher{z-index:45;-webkit-user-select:none;user-select:none;flex-wrap:wrap;align-items:center;gap:6px;max-width:calc(100vw - 32px);display:flex;position:fixed;top:16px;left:16px}.style-switcher__button{cursor:pointer;font:inherit;-webkit-tap-highlight-color:transparent}.style-switcher{background:var(--itec-blue-dark);box-shadow:var(--pixel-frame);font-family:var(--font-pixel);border-radius:0;padding:8px 10px;font-size:.55rem;top:20px;left:20px}.style-switcher__label{color:var(--text-secondary);margin-right:4px}.style-switcher__button{background:var(--itec-blue-light);box-shadow:inset 0 var(--px) 0 0 #ffffff59, inset 0 calc(var(--px) * -1) 0 0 #00000059;color:var(--text-primary);font-family:var(--font-pixel);border:0;border-radius:0;padding:7px 9px;font-size:.55rem}.style-switcher__button:hover{background:#3498db}.style-switcher__button:active{transform:translateY(2px)}.style-switcher__button--active{color:var(--ink);background:#f5b041}@media (width<=480px){.style-switcher{gap:4px;max-width:calc(100vw - 36px);padding:6px 8px;font-size:.45rem;top:14px;left:14px}.style-switcher__button{padding:6px;font-size:.45rem}}.quality-toggle{z-index:41;cursor:pointer;font-family:var(--font-pixel);color:var(--text-primary);background:var(--itec-blue-dark);box-shadow:var(--pixel-frame);-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;border:0;border-radius:0;padding:8px 10px;font-size:.55rem;position:fixed;bottom:24px;right:24px}.quality-toggle:hover{background:var(--itec-blue)}.quality-toggle:active{transform:translateY(2px)}.quality-toggle[aria-pressed=true]{color:var(--ink);background:#f5b041}.quality-toggle--low{background:var(--itec-blue-dark);color:var(--text-secondary)}@media (width<=480px){.quality-toggle{padding:6px 7px;font-size:.45rem;bottom:88px;right:18px}}`,Kb=`:root{--itec-blue:#123a5c;--itec-blue-light:#3fc8ff;--itec-blue-dark:#05070f;--cine-cyan:#4fd8ff;--cine-amber:#ffb84d;--panel-bg:#0a1024b8;--panel-border:#4fd8ff38;--text-primary:#eaf3ff;--text-secondary:#cde1ffb8;--chip-bg:#4fd8ff1a;--chip-border:#4fd8ff61}*,:before,:after{box-sizing:border-box;margin:0;padding:0}html,body{background:#05070f;width:100vw;height:100vh;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;overflow:hidden}#webgl{z-index:0;outline:none;width:100vw;height:100vh;position:fixed;top:0;left:0}#loading-screen{z-index:100;background:radial-gradient(at 50% 40%,#0f1a38 0%,#05070f 70%);justify-content:center;align-items:center;width:100vw;height:100vh;transition:opacity .8s ease-out;display:flex;position:fixed;top:0;left:0}#loading-screen.loading-screen--hidden{opacity:0;pointer-events:none}.loading-screen__content{text-align:center;color:var(--text-primary)}.loading-screen__title{letter-spacing:2px;text-shadow:0 0 24px #4fd8ff73;margin-bottom:.5rem;font-size:3rem;font-weight:700}.loading-screen__subtitle{color:var(--text-secondary);margin-bottom:.5rem;font-size:1.2rem}.loading-screen__motto{color:var(--itec-blue-light);letter-spacing:3px;margin-bottom:2rem;font-size:.85rem;font-weight:600}.loading-screen__spinner{border:4px solid #4fd8ff26;border-top-color:var(--cine-cyan);border-radius:50%;width:48px;height:48px;margin:0 auto 1rem;animation:.8s linear infinite spin;box-shadow:0 0 16px #4fd8ff59}.loading-screen__hint{color:var(--text-secondary);font-size:.9rem}@keyframes spin{to{transform:rotate(360deg)}}#info-panel{z-index:50;pointer-events:none;width:380px;max-width:calc(100vw - 32px);transition:right .4s cubic-bezier(.22,1,.36,1);position:fixed;top:50%;right:-420px;transform:translateY(-50%)}#info-panel.info-panel--visible{pointer-events:auto;right:16px}.info-panel__card{background:var(--panel-bg);-webkit-backdrop-filter:blur(18px)saturate(1.2);border:1px solid var(--panel-border);color:var(--text-primary);border-radius:18px;padding:28px;position:relative;box-shadow:0 8px 40px #00000080,0 0 28px #4fd8ff1f}.info-panel__accent{border-radius:18px 18px 0 0;height:4px;margin:-28px -28px 20px;box-shadow:0 0 14px}.info-panel__close{color:var(--text-secondary);cursor:pointer;background:0 0;border:none;font-size:1.5rem;line-height:1;transition:color .2s;position:absolute;top:12px;right:16px}.info-panel__close:hover{color:var(--text-primary)}.info-panel__image-container{background:#ffffff0d;border-radius:10px;width:100%;height:140px;margin-bottom:16px;overflow:hidden}.info-panel__image{object-fit:cover;width:100%;height:100%;display:block}.info-panel__image-container:empty,.info-panel__image[src=""]{display:none}.info-panel__title{color:var(--text-primary);margin-bottom:4px;font-size:1.5rem;font-weight:700}.info-panel__subtitle{color:var(--text-secondary);margin-bottom:12px;font-size:.95rem}.info-panel__duration{color:var(--cine-amber);background:#ffb84d24;border:1px solid #ffb84d80;border-radius:20px;margin-bottom:14px;padding:4px 12px;font-size:.8rem;font-weight:600;display:inline-block}.info-panel__description{color:var(--text-secondary);margin-bottom:16px;font-size:.95rem;line-height:1.5}.info-panel__highlights{flex-wrap:wrap;gap:8px;display:flex}.info-panel__chip{background:var(--chip-bg);border:1px solid var(--chip-border);color:var(--text-primary);border-radius:20px;padding:5px 14px;font-size:.8rem;font-weight:500;display:inline-block}.info-panel__link{color:var(--cine-cyan);margin-top:16px;font-size:.85rem;font-weight:500;text-decoration:none;transition:color .2s;display:block}.info-panel__link:hover{color:#fff}#controls-hint{z-index:40;-webkit-backdrop-filter:blur(10px);border:1px solid var(--panel-border);color:var(--text-secondary);-webkit-user-select:none;user-select:none;background:#0a102499;border-radius:12px;align-items:center;gap:6px;padding:8px 14px;font-size:.75rem;display:flex;position:fixed;bottom:20px;left:20px}.controls-hint__key{width:26px;height:26px;color:var(--text-primary);background:#4fd8ff1a;border:1px solid #4fd8ff66;border-radius:6px;justify-content:center;align-items:center;font-size:.7rem;font-weight:600;display:inline-flex}.controls-hint__label{margin:0 2px}.controls-hint__separator{opacity:.4;margin:0 4px}.goal-banner{text-align:center;-webkit-backdrop-filter:blur(14px);opacity:0;pointer-events:none;z-index:60;background:#0a1024cc;border:1px solid #ffb84d8c;border-radius:20px;padding:24px 40px;transition:opacity .3s,transform .3s;position:fixed;top:40%;left:50%;transform:translate(-50%,-50%)scale(.8);box-shadow:0 8px 40px #0000008c,0 0 36px #ffb84d4d}.goal-banner--visible{opacity:1;transform:translate(-50%,-50%)scale(1)}.goal-banner__title{color:var(--cine-amber);text-shadow:0 0 20px #ffb84d99;font-size:3rem;font-weight:800}.goal-banner__subtitle{color:var(--text-primary);margin-top:8px;font-size:1.1rem}.goal-confetti{pointer-events:none;z-index:60;border-radius:2px;width:10px;height:14px;animation:3s linear forwards goal-confetti-fall;position:fixed;top:-20px}@keyframes goal-confetti-fall{to{transform:translateY(110vh)rotate(720deg)}}@media (width<=480px){#info-panel{width:calc(100vw - 32px)}#info-panel.info-panel--visible{right:16px}.info-panel__card{padding:20px}.loading-screen__title{font-size:2rem}.goal-banner{width:calc(100vw - 32px);padding:16px 20px}.goal-banner__title{font-size:2rem}.goal-banner__subtitle{font-size:.95rem}}.style-switcher{z-index:45;-webkit-user-select:none;user-select:none;flex-wrap:wrap;align-items:center;gap:6px;max-width:calc(100vw - 32px);display:flex;position:fixed;top:16px;left:16px}.style-switcher__button{cursor:pointer;font:inherit;-webkit-tap-highlight-color:transparent}.style-switcher{-webkit-backdrop-filter:blur(10px);border:1px solid var(--panel-border);background:#0a1024a6;border-radius:12px;padding:8px 10px;font-size:.75rem;box-shadow:0 0 18px #4fd8ff1a}.style-switcher__label{color:var(--text-secondary);margin-right:4px;font-weight:600}.style-switcher__button{color:var(--text-primary);background:#4fd8ff12;border:1px solid #4fd8ff47;border-radius:8px;padding:5px 12px;font-size:.75rem;font-weight:600;transition:background .2s,border-color .2s}.style-switcher__button:hover{background:#4fd8ff2e}.style-switcher__button--active{border-color:var(--cine-cyan);color:#fff;background:#4fd8ff38;box-shadow:0 0 12px #4fd8ff73}.loading-screen__skyline{display:none}@media (width<=480px){.style-switcher{gap:4px;padding:6px 8px;top:10px;left:10px}.style-switcher__button{padding:4px 8px;font-size:.68rem}}.quality-toggle{z-index:41;cursor:pointer;font:inherit;color:var(--text-primary);-webkit-backdrop-filter:blur(10px);border:1px solid var(--panel-border);-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;background:#0a1024a6;border-radius:12px;padding:8px 14px;font-size:.75rem;font-weight:600;transition:background .2s,border-color .2s,box-shadow .2s;position:fixed;bottom:20px;right:20px;box-shadow:0 0 18px #4fd8ff1a}.quality-toggle:hover{background:#4fd8ff2e}.quality-toggle[aria-pressed=true]{border-color:var(--cine-cyan);box-shadow:0 0 12px #4fd8ff73}.quality-toggle--low{color:var(--text-secondary);border-color:#ffb84d73;box-shadow:0 0 12px #ffb84d33}@media (width<=480px){.quality-toggle{padding:6px 10px;font-size:.68rem;bottom:72px;right:10px}}`,qb=`itec-style`,Jb={original:Ub,lowpoly:Wb,voxel:Gb,cinematic:Kb};function Yb(){try{let e=localStorage.getItem(qb);if(Ah(e))return e}catch{}return kh}var Xb={apply(e){let t=document.getElementById(`theme-css`);t||(t=document.createElement(`style`),t.id=`theme-css`,document.head.appendChild(t)),t.textContent=Jb[e],document.documentElement.dataset.style=e;try{localStorage.setItem(qb,e)}catch{}}},Zb=class{root;buttons=new Map;constructor(e,t){this.root=document.createElement(`div`),this.root.className=`style-switcher`,this.root.setAttribute(`role`,`group`),this.root.setAttribute(`aria-label`,`Estilo visual`);let n=document.createElement(`span`);n.className=`style-switcher__label`,n.textContent=`Estilo`,this.root.appendChild(n);for(let e of Oh){let n=document.createElement(`button`);n.type=`button`,n.className=`style-switcher__button`,n.textContent=Dh[e].label,n.addEventListener(`click`,()=>{n.blur(),this.setActive(e),t.request(e)}),this.buttons.set(e,n),this.root.appendChild(n)}this.setActive(e),document.body.appendChild(this.root)}setActive(e){for(let[t,n]of this.buttons){let r=t===e;n.classList.toggle(`style-switcher__button--active`,r),n.setAttribute(`aria-pressed`,String(r))}}},Qb=class{_button;_quality;_onChange;_onClick;constructor(e){this._quality=e,this._button=document.createElement(`button`),this._button.type=`button`,this._button.className=`quality-toggle`,this._button.setAttribute(`aria-label`,`Calidad gráfica`),this._onClick=()=>{this._button.blur(),e.toggle()},this._onChange=()=>this._render(),this._button.addEventListener(`click`,this._onClick),e.addEventListener(`change`,this._onChange),this._render(),document.body.appendChild(this._button)}_render(){let e=this._quality.level===`high`;this._button.textContent=`Calidad: ${e?`Alta`:`Baja`}`,this._button.setAttribute(`aria-pressed`,String(e)),this._button.classList.toggle(`quality-toggle--low`,!e)}destroy(){this._button.removeEventListener(`click`,this._onClick),this._quality.removeEventListener(`change`,this._onChange),this._button.remove()}},$b=Yb();Xb.apply($b);var ex=new Hb,tx=new Pg(document.querySelector(`#webgl`),$b,e=>{Xb.apply(e),tx.world.setStyle(e)}),nx=new Ob;for(let e of tx.world.physicsDescriptions){let t=e.position,n=e.size;nx.addStaticBox([t.x,t.y,t.z],[n.x,n.y,n.z])}var rx=new kb(nx.world),ix=new Vb(tx.scene,nx.world);tx.world.attachBall(ix);var ax=new Ab,ox=new Mb(tx.world.triggerDescriptions,nx.world,rx.chassisBody);new Pb,new Rb,new Zb($b,tx.styleTransition),new Qb(tx.quality),window.addEventListener(`vehicle-reset`,()=>{rx.reset()}),setTimeout(()=>{ex.hide(),tx.playIntro()},1500);var sx=new V,cx=new At,lx=performance.now();function ux(){requestAnimationFrame(ux);let e=performance.now(),t=(e-lx)/1e3;lx=e;let n=Math.min(t,.1);ax.update(rx),nx.step(n),ix.update(n),ox.check();let r=rx.getChassisPosition(),i=rx.getChassisQuaternion();sx.set(r.x,r.y,r.z),cx.set(i.x,i.y,i.z,i.w),tx.update(sx,cx)}ux();