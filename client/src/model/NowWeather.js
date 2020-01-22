class NowWeather {
  constructor(data) {
    this.basic = new NowWeatherBasic(data.basic);
    this.now = new NowWeatherNow(data.now);
  }
  static fromJson(data) {
    this.basic = NowWeatherBasic.fromJson(data.basic);
    this.now = NowWeatherBasic.fromJson(data.now);
  }
  static toJson() {
    let json = {};
    json['basic'] = this.basic;
    json['now'] = this.now;
    return json;
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
  static fromJson(data) {
    this.cid = data.cid;
    this.location = data.location;
    this.parent_city = data.parent_city;
    this.admin_area = data.admin_area;
    this.cnty = data.cnty;
    this.lat = data.lat;
    this.lon = data.lon;
    this.tz = data.tz;
  }
  static toJson() {
    let json = {};
    json['cid'] = this.cid;
    json['location'] = this.location;
    json['parent_city'] = this.parent_city;
    json['admin_area'] = this.admin_area;
    json['cnty'] = this.cnty;
    json['lat'] = this.lat;
    json['lon'] = this.lon;
    json['tz'] = this.tz;
    return json;
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
  static fromJson(data) {
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
  static toJson() {
    let json = {};
    json['cloud'] = this.cloud;
    json['cond_code'] = this.cond_code;
    json['cond_txt'] = this.cond_txt;
    json['fl'] = this.fl;
    json['hum'] = this.hum;
    json['pcpn'] = this.pcpn;
    json['pres'] = this.pres;
    json['tmp'] = this.tmp;
    json['vis'] = this.vis;
    json['wind_deg'] = this.wind_deg;
    json['wind_dir'] = this.wind_dir;
    json['wind_sc'] = this.wind_sc;
    json['wind_spd'] = this.wind_spd;
    return json;
  }
}

export default NowWeather;