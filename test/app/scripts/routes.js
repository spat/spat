
export default {
  '/groups/:id': {
    tag: 'page-groups-single',
  },
  '/nav': {
    tag: 'page-nav',
  },
  '/modals': {
    tag: 'page-modals',
  },
  '/': {
    tag: 'page-index',
    // ssr: false,
  },

  // debug
  '/debug': {
    tag: 'page-debug',
  },
  '/debug/redirect': {
    tag: 'page-debug-redirect',
  },

};

