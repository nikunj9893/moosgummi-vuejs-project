export default function beforeEnter(store) {
  return function(to, from, next) {
    const isLoggedIn = store.getters.getTokenFromCookies;

    if (!isLoggedIn) {
      next();
      return;
    }

    next({ path: '/' });
  }
};
