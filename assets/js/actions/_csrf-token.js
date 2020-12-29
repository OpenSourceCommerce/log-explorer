const CsrfToken = {
    getToken() {
        return $('meta[name=custom]').attr('content');
    }
};

export default CsrfToken;
