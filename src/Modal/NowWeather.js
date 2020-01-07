class NowWeather {
  constructor(data) {
    this.basic = new NowWeatherBasic(data.basic);
    this.now = new NowWeatherNow(data.now);
  }
}

class NowWeatherBasic {
  constructor(data) {
    this.cid = data.cid;
    this.location = data.location;
    this.parent_city = data.parent_city;
    this.admin_area = data.admin_area;
    this.cnty = data.cnty;
    this.lat = data.lat;
    this.lon = data.lon;
    this.tz = data.tz;
  }
}

class NowWeatherNow {
  constructor(data) {
    this.cloud = data.cloud;
    this.cond_code = data.cond_code;
    this.cond_txt = data.cond_txt;
    this.fl = data.fl;
    this.hum = data.hum;
    this.pcpn = data.pcpn;
    this.pres = data.pres;
    this.tmp = data.tmp;
    this.vis = data.vis;
    this.wind_deg = data.wind_deg;
    this.wind_dir = data.wind_dir;
    this.wind_sc = data.wind_sc;
    this.wind_spd = data.wind_spd;
  }
}