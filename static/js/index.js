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

      getItems({ key: key.replace(/[\r\n]*/g, '') }, this)
        .then(res => {
					console.log(res.data.data[0].detail)
          this.list = res.data.data
        })
    },
    add() {
      const newItem = this.newForm;
			postItem(newItem, this);
      this.newForm = {
        title: '',
        detail: ''
      };
    }
  }
})
