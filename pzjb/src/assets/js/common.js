let common = {
    refresh: function() {
        _this.$router.push({
            path: '/_empty',
        });
        _this.$router.go(-1);
    }
}
export {
    common
};