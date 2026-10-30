const C='experto-arandano-v2';
const FILES=['./','index.html','data.js','guias.js','manifest.json','icon-192.png','icon-512.png',
'img/racimo2.jpg','img/racimo.jpg','img/floracion.jpg','img/plantacion.jpg','img/huerto-verde.jpg','img/huerto-otono.jpg','img/cosecheros.jpg','img/mano-cosecha.jpg','img/bolsas-sustrato.jpg','img/cultivo-cubierto.jpg','img/calidad-fresco.jpg','img/poda-duke.jpg','img/yema.jpg','img/ins-trips.jpg','img/bayas.jpg','img/cosecha-hileras.jpg','img/arbusto.jpg','img/mercado.jpg','img/huerto.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  // red primero para la app y los datos, así siempre llega lo más nuevo; caché si no hay señal
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
});
