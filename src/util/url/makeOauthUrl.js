function makeOauthUrl(destiny, clientId) {
  const url = `${destiny.oauthConfig.url}?client_id=${clientId}&response_type=code`;

  return url;
}

module.exports = makeOauthUrl;
