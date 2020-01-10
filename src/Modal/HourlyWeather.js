class HoulyWeather  {
  constructor(data) {
    this.hourly = data.HeWeather6.hourly.map((item) => {
      return new Hourly(item);
    })
  }
}

class Hourly {
  constructor(data) {
    this.cloud = data.cloud;
    this.cond_code = data.cond_code;
    this.cond_txt = data.cond_txt;
    this.dew = data.dew;
    this.hum = data.hum;
    this.pop = data.pop;
    this.pres = data.pres;
    this.time = data.time;
    this.tmp = data.tmp;
    this.wind_deg = data.wind_deg;
    this.wind_dir = data.wind_dir;
    this.wind_sc = data.wind_sc;
    this.wind_spd = data.wind_spd;
  }
  static fromJson(data) {
    cloud = data.cloud;
    cond_code = data.cond_code;
    cond_txt = data.cond_txt;
    dew = data.dew;
    hum = data.hum;
    pop = data.pop;
    pres = data.pres;
    time = data.time;
    tmp = data.tmp;
    wind_deg = data.wind_deg;
    wind_dir = data.wind_dir;
    wind_sc = data.wind_sc;
    wind_spd = data.wind_spd;
  }
  toJson() {
    return {
      cloud: data.cloud,
      cond_code: data.cond_code,
      cond_txt: data.cond_txt,
      dew: data.dew,
      hum: data.hum,
      pop: data.pop,
      pres: data.pres,
      time: data.time,
      tmp: data.tmp,
      wind_deg: data.wind_deg,
      wind_dir: data.wind_dir,
      wind_sc: data.wind_sc,
      wind_spd: data.wind_spd,
    }
  }
}