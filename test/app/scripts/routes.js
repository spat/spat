
export default {
  '/groups/:id': {
    tag: 'page-groups-single',
  },
  '/modals': {
    tag: 'page-modals',
  },
  '/': {
    tag: 'page-index',
    useServerSideData: true,
    // ssr: false,
  },

  // debug
  '/debug': {
    tag: 'page-debug',
  },
  '/debug/redirect': {
    tag: 'page-debug-redirect',
  },
  // URL は変えずタグだけリダイレクトさせる
  '/debug/tagredirect': {
    tag: async ({req, res}) => {
      // ここで db の存在チェックとかしてなければ 404 に飛ばす
      res.status(404);
      return 'page-error';
    },
  },

};

