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

export const weatherIcons = function(type) {
  let map = {
    '100': require('../assets/icons/weather/sunny.png'),
    '101': require('../assets/icons/weather/cloudy.png'),
    '102': require('../assets/icons/weather/more-cloud.png'),
    '103': require('../assets/icons/weather/sun-cloud.png'),
    '104': require('../assets/icons/weather/overcast.png'),

    '200': require('../assets/icons/weather/wind.png'),
    '201': require('../assets/icons/weather/wind.png'),
    '202': require('../assets/icons/weather/wind.png'),
    '203': require('../assets/icons/weather/wind.png'),
    '204': require('../assets/icons/weather/wind.png'),
    '205': require('../assets/icons/weather/big-wind.png'),
    '206': require('../assets/icons/weather/big-wind.png'),
    '207': require('../assets/icons/weather/big-wind.png'),
    '208': require('../assets/icons/weather/big-wind.png'),
    '209': require('../assets/icons/weather/hurricane.png'),
    '210': require('../assets/icons/weather/hurricane.png'),
    '211': require('../assets/icons/weather/hurricane.png'),
    '212': require('../assets/icons/weather/storm.png'),
    '213': require('../assets/icons/weather/tropical-storm.png'),

    '300': require('../assets/icons/weather/shower-rain.png'),
    '301': require('../assets/icons/weather/heavy-shower-rain.png'),
    '302': require('../assets/icons/weather/thunder-rain.png'),
    '303': require('../assets/icons/weather/heavy-thunder-storm.png'),
    '304': require('../assets/icons/weather/rain-ice.png'),
    '305': require('../assets/icons/weather/rainy.png'),
    '306': require('../assets/icons/weather/mid-rain.png'),
    '307': require('../assets/icons/weather/big-rain.png'),
    '308': require('../assets/icons/weather/bigger-rain.png'),
    '309': require('../assets/icons/weather/drizzle-rain.png'),
    '310': require('../assets/icons/weather/heavy-rain.png'),
    '311': require('../assets/icons/weather/heavy-rain.png'),
    '312': require('../assets/icons/weather/heavy-rain.png'),
    '313': require('../assets/icons/weather/tropical-storm.png'),
    '314': require('../assets/icons/weather/rainy.png'),
    '315': require('../assets/icons/weather/mid-rain.png'),
    '316': require('../assets/icons/weather/big-rain.png'),
    '317': require('../assets/icons/weather/storm-to-heavy-rain.png'),
    '318': require('../assets/icons/weather/bigger-to-heavy-rain.png'),
    '399': require('../assets/icons/weather/rain.png'),

    '400': require('../assets/icons/weather/light-snow.png'),
    '401': require('../assets/icons/weather/moderate-snow.png'),
    '402': require('../assets/icons/weather/heavy-snow.png'),
    '403': require('../assets/icons/weather/snowstorm.png'),
    '404': require('../assets/icons/weather/sleet.png'),
    '405': require('../assets/icons/weather/rain-snow.png'),
    '406': require('../assets/icons/weather/mid-rain.png'),
    '407': require('../assets/icons/weather/show-flurry.png'),
    '408': require('../assets/icons/weather/bigger-rain.png'),
    '409': require('../assets/icons/weather/drizzle-rain.png'),
    '410': require('../assets/icons/weather/heavy-rain.png'),
    '499': require('../assets/icons/weather/rain.png'),

    '500': require('../assets/icons/weather/foggy.png'),
    '501': require('../assets/icons/weather/foggy.png'),
    '502': require('../assets/icons/weather/haze.png'),
    '503': require('../assets/icons/weather/sand.png'),
    '504': require('../assets/icons/weather/dust.png'),
    '507': require('../assets/icons/weather/sandstorm.png'),
    '508': require('../assets/icons/weather/sandstorm.png'),
    '509': require('../assets/icons/weather/foggy.png'),
    '510': require('../assets/icons/weather/foggy.png'),
    '511': require('../assets/icons/weather/haze.png'),
    '512': require('../assets/icons/weather/haze.png'),
    '513': require('../assets/icons/weather/haze.png'),
    '514': require('../assets/icons/weather/deep-foggy.png'),
    '515': require('../assets/icons/weather/deep-foggy.png'),

    '900': require('../assets/icons/weather/hot.png'),
    '901': require('../assets/icons/weather/cold.png'),
    '999': require('../assets/icons/weather/unknown.png'),
  }
  return map[type];
}