class WeekWeather {
  constructor(data) {
    this.daily_forecast = data.daily_forecast.map((item) => {
      return new DailyForecast(item);
    });;
  }
  static fromJson(data) {
    this.daily_forecast = data.daily_forecast.map((item) => {
      console.log()
      return new DailyForecast(item);
    });
  }
  static toJson() {
    let json = {};
    json['daily_forecast'] = this.daily_forecast;
    return json;
  }
}

class DailyForecast {
  constructor(data) {
    this.cond_code_d = data.cond_code_d,
    this.cond_code_n = data.cond_code_n,
    this.cond_txt_d = data.cond_txt_d,
    this.cond_txt_n = data.cond_txt_n,
    this.date = `${data.date}`.slice(5, 10),
    this.hum = data.hum,
    this.mr = data.mr,
    this.ms = data.ms,
    this.pcpn = data.pcpn,
    this.pop = data.pop,
    this.pres = data.pres,
    this.sr = data.sr,
    this.ss = data.ss,
    this.tmp_max = data.tmp_max,
    this.tmp_min = data.tmp_min,
    this.uv_index = data.uv_index,
    this.vis = data.vis,
    this.wind_deg = data.wind_deg,
    this.wind_dir = data.wind_dir.length >= 4 ? '无定向' : data.wind_dir,
    this.wind_sc = data.wind_sc,
    this.wind_spd = data.wind_spd
  }
}

export default WeekWeather;