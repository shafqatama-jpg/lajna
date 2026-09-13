/* Lajna coach lists — offline shell */
var CACHE = 'lajna-v1';
var JSPDF = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
var SHELL = ['./', './index.html', './manifest.webmanifest',
             './icon-192.png', './icon-512.png', './icon-maskable.png', JSPDF];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      // add one at a time so a single failure doesn't abort the install
      return Promise.all(SHELL.map(function(u){
        return c.add(new Request(u, {cache:'reload', mode: u===JSPDF ? 'cors' : 'same-origin'}))
                .catch(function(){});
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return k===CACHE ? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if(req.method !== 'GET') return;

  var url = new URL(req.url);
  var sameOrigin = url.origin === self.location.origin;

  // App pages: try the network so an updated upload is picked up, fall back to cache offline.
  if(req.mode === 'navigate' || (sameOrigin && url.pathname.endsWith('.html'))){
    e.respondWith(
      fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); });
        return res;
      }).catch(function(){
        return caches.match(req).then(function(hit){ return hit || caches.match('./index.html'); });
      })
    );
    return;
  }

  // Everything else (icons, the PDF library): cache first, refresh quietly in the background.
  e.respondWith(
    caches.match(req).then(function(hit){
      var net = fetch(req).then(function(res){
        if(res && (res.ok || res.type === 'opaque')){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
        }
        return res;
      }).catch(function(){ return hit; });
      return hit || net;
    })
  );
});
