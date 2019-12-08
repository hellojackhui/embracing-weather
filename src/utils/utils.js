export const combineUrl = (url, params) => {
  let path = '';
  for (let key in params) {
    path += `&${key}=${params[key]}`
  }
  if (path == '') {
    url = `${url}`
  } else {
    path = path.replace(/(&)/, '');
    url = `${url}?${path}`;
  }
  return url;
}