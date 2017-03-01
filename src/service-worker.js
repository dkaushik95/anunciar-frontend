var cacheName = 'v3';
var cacheFiles = [
    './',
    './index.html',
    './main.min.js',
    './manifest.json',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500'
];

self.addEventListener('install', function(e){
    console.log('[SERVICEWORKER] Installed!');
    e.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log("[SERVICEWORKER] caching cache files");
            return cache.addAll(cacheFiles);
        })
    )
})

self.addEventListener('activate', function(e){
    console.log('[SERVICEWORKER] Installed!');
    e.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(cacheNames.map(function(thisCacheName){
                if(thisCacheName != cacheName){
                    console.log('[SERVICEWORKER] removing cached files from ' + thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }))
        })
    )
})

self.addEventListener('periodicSync', function(event){
    if (event.registration.tag == 'get-latest-announcement') {
        event.waitUntil(function(){
            // ajax call !!
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
              if (this.readyState === 4) {
                //Add response here !
                var globalCount = JSON.parse(this.responseText).length
                var localCount = JSON.parse(localStorage.getItem('announcements')).length
                if(globalCount > localCount){
                    console.log('[SERVICEWORKER] [BACKGROUNDSYNC] New announcements !!!')
                      var options = {
                          body: "You have " + (globalCount - localCount) + " new announcements!"
                      }
                      var n = new Notification("New notification from Anunciar",options);
                      n.onshow = function(){
                        console.log("Notification was shown")
                      }
                }
                else{
                    console.warn('[SERVICEWORKER] [BACKGROUNDSYNC] No new announcements!!!')
                }
                console.log(this.responseText);
              }
            });

            xhr.open("GET", "http://anunciar-backend.herokuapp.com/v1/announcements");
            xhr.setRequestHeader("authorization", JSON.parse(localStorage.getItem('user')).access_token);

            xhr.send();
        });
    }
    else {
        event.registration.unregister();
    }
});

self.addEventListener('fetch', function(e){
    console.log('[SERVICEWORKER] fetching!', e.request.url);

    const request = e.request;
    const url = new URL(e.request.url)
    if(url.origin !== location.origin) {
        console.warn('[SERVICEWORKER] not caching because not from origin')
        return;
    }

    e.respondWith(
        caches.match(e.request).then(function(response){
            if(response){
                console.log('[SERVICEWORKER] found in cache', e.request.url);
                return response;
            }
            var requestClone = e.request.clone();

            return fetch(requestClone).then(function(response){
                if(!response){
                    console.log('[SERVICEWORKER] no response from fetch');
                    return response;
                }

                var responseClone = response.clone();
                caches.open(cacheName).then(function(cache){
                    cache.put(e.request, responseClone);
                    return response;
                });
            })
            .catch(function(err){
                console.log('[SERVICEWORKER] error in fetching and caching', err)
            })
        })
    )
})