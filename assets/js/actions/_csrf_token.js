const CsrfToken = {
    getToken: function () {
        return $("meta[name=custom]").attr('content');
    }
}

export default CsrfToken
