/* MiauSaude — service worker (app shell)
   - Precarrega a casca do app (HTML, icones, manifest) para uso offline.
   - HTML: network-first (sempre tenta a versao nova; cai no cache se offline).
   - Estaticos da casca: cache-first.
   - Audios (.m4a/.mp3): nunca cacheados aqui (arquivos grandes) — vao direto a rede. */
var CACHE = "miausaude-shell-v2";
var SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/icons/apple-touch-icon.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(SHELL); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);

  // Audios: deixa a rede tratar (nao intercepta) — evita cachear arquivos enormes.
  if (/\.(m4a|mp3)$/i.test(url.pathname)) return;

  // Navegacao / HTML: network-first.
  if (req.mode === "navigate" || (req.headers.get("accept")||"").indexOf("text/html") !== -1) {
    e.respondWith(
      fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); });
        return res;
      }).catch(function(){ return caches.match(req).then(function(m){ return m || caches.match("./index.html"); }); })
    );
    return;
  }

  // Demais estaticos da casca: cache-first.
  e.respondWith(
    caches.match(req).then(function(m){
      return m || fetch(req).then(function(res){
        if (res && res.status === 200 && res.type === "basic") {
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(req, copy); });
        }
        return res;
      });
    })
  );
});
