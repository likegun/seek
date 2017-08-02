const server = 'http://localhost:3000';

const post = (url, params, data, { vue = null } = {}) => {
	let user = sessionStorage.getItem('user');
	if(user) {
		user = JSON.parse(user);
		params.Token = user.Token;
	}

	return axios.post(`${server}${url}`, data, {params})
		.then(res => {
			if(res.data && res.data.code === 200)
				return res;

			if(vue) {
				vue.$message(res.data && res.data.msg);
			}
			throw new Error('无法获取日志');
		});
};

const put = (url, params, data, { vue = null } = {}) => {
	let user = sessionStorage.getItem('user');
	if(user) {
		user = JSON.parse(user);
		params.Token = user.Token;
	}

	return axios.put(`${server}${url}`, data, {params})
		.then(res => {
			if(res.data && res.data.code === 200)
				return res;

			if(vue) {
				vue.$message(res.data && res.data.msg);
			}
			throw new Error('无法获取日志');
		});
};

const get = (url, params, { vue = null } = {}) => {
	return axios.get(`${server}${url}`, { params })
		.then(res => {
			if(res.data && res.data.code === 200)
				return res;

			if(vue) {
				vue.$message(res.data && res.data.msg);
			}
      else {
        console.log(res.data && res.data.msg);
      }
		});
};

const getItems = (params, vue) => {
  return get('/items', params, { vue });
}

const postItem = (item, vue) => {
	return post('/item', {}, item, { vue });
}
