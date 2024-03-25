  export function registerSW() {
    navigator.serviceWorker.register('/sw.js', {
        // scope: '/' // /api 경로 제외
      }).then(function(registration) {
        console.log('Service Worker 등록 성공:', registration.scope);
      }).catch(function(error) {
        console.log('Service Worker 등록 실패:', error);
      });
  }