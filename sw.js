/* service worker מינימלי: מאפשר התקנה למסך הבית. לא שומר עותקים, תמיד טוען את הגרסה העדכנית מהרשת */
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
  var html=e.request.mode==='navigate'||/\.html(\?|$)|\/$/.test(new URL(e.request.url).pathname);
  e.respondWith(html?fetch(e.request,{cache:'no-store'}).catch(function(){return fetch(e.request)}):fetch(e.request))});
