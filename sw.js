/* service worker מינימלי: מאפשר התקנה למסך הבית. לא שומר עותקים, תמיד טוען את הגרסה העדכנית מהרשת */
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
  var html=e.request.mode==='navigate'||/\.html(\?|$)|\/$/.test(new URL(e.request.url).pathname);
  e.respondWith(html?fetch(e.request,{cache:'no-store'}).catch(function(){return fetch(e.request)}):fetch(e.request))});

/* ======= Push notifications ======= */
self.addEventListener('push', function(e) {
  var data = {};
  try { data = e.data ? e.data.json() : {}; } catch(err) {}
  var title = data.title || 'הודעה חדשה';
  var body  = data.body  || 'המאמן שלך שלח הודעה';
  e.waitUntil(self.registration.showNotification(title, {
    body: body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    dir: 'rtl',
    lang: 'he',
    tag: 'rs-msg',
    renotify: true
  }));
});

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window', includeUncontrolled:true}).then(function(list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].url.indexOf('t.html') !== -1) { list[i].focus(); return; }
    }
    return clients.openWindow('https://restrength.github.io/restrength-app/t.html');
  }));
});
