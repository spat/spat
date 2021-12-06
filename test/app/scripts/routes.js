
export default {
  '/groups/:id': {
    tag: 'page-groups-single',
    cache({req}) {
      return req.query.cache !== 'false';
    }
  },
  '/modals': {
    tag: 'page-modals',
  },
  '/': {
    tag: 'page-index',
    useServerSideData: true,
    revalidate: 10,
    // ssr: false,
  },

  // debug
  '/debug': {
    tag: 'page-debug',
    cache: false,
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

