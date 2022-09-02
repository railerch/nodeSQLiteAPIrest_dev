const cors_config = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-REquested-With, Content-type, Accept, Access-Control-Allow-Request-Method");
    // res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    // res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
}

module.exports = cors_config;