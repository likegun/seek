const items = [
  {
    title: 'nightmare iframe',
    detail: 'nightmare-iframe-manager https://github.com/rosshinkley/nightmare-iframe-manager'
  },
  {
    title: 'nightmare tab window 多标签页',
    detail: 'nightmare-window-manager https://github.com/rosshinkley/nightmare-window-manager'
  }
];

new Vue({
  el: '#app',
  data: function() {
    return {
      //新建表单
      newForm: {
        title: '',
        detail: ''
      },
      //搜索表单
      searchForm: {
        key: ''
      },
      //搜索结果
      list: []
    }
  },
  methods: {
    //搜索
    search() {
      const key = this.searchForm.key;

      if(key === '')
        return this.list = [];

      this.list = items.filter(e => e.title.includes(key) || e.detail.includes('key'));
    },
    add() {
      const newItem = this.newForm;
      items.push(newItem);
      this.newForm = {
        title: '',
        detail: ''
      };
    }
  }
})
