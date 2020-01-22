const cloud = require('wx-server-sdk')

cloud.init({
  env: "hellojackhui-nje5k",
});

const cityQuery = async (db, data) => {
  const {value} = data;
  const collection = db.collection('cityList');
  let result = await collection.where({
    City_CN: {
      $regex: value,
      $options: '1',
    }
  }).get();
  return {
    code: '0000',
    data: result
  };
}

exports.main = async (event, context) => {
  let db = cloud.database();
  let {func, data} = event;
  let res;
  if (func === "cityQuery") {
    res = await cityQuery(db, data)
  }
  return {
    data: res,
  }
}


