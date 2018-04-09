axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios(Object.assign({
    transformRequest: [function (data) {
        return qs.stringify(data);
    }],

}, config));
