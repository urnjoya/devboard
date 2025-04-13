function clearCacheAndRefresh(){
    caches.keys().then(names=>{
        names.forEach(name=> caches.delete(name));
    }).then(()=>{
        location.reload(true);
    });
}
