var debug = require('debug')('AuthToken');
var cookies = require('cookies-js');
var jwtDecode = require('jwt-decode');


module.exports = exports = function parse(){
  var cookie = cookies.get('auth-token');

  if (!cookie) {
    debug('no token found');
    return;
  }

  try {
    // decode jwt
    var jwt = jwtDecode(cookie);
  } catch (e) {}


  if (!jwt) {
    debug('could not parse token');
    return;
  }

  if (!jwt.user_id) {
    debug('token has no user_id');
    return;
  }

  if (!jwt.expires) {
    debug('token has no expirey');
    return;
  }

  jwt.expires_at = new Date(jwt.expires);

  if (jwt.expires_at < new Date) {
    debug('token already expired');
    return;
  }

  jwt.token = cookie;
  return jwt;
};
