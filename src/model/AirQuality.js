class AirQuaity  {
    constructor(data) {
      this.air_now_city = new AirNowCity(data.air_now_city)
      this.air_now_station = data.air_now_station.map((item) => {
        return new AirNowStation(item);
      })
      this.air_location = data.air_location || '';
    }
  }

  class AirNowCity {
    constructor(data) {
      this.aqi = data.aqi;
      this.co = data.co;
      this.main = data.main;
      this.no2 = data.no2;
      this.o3 = data.o3;
      this.pm10 = data.pm10;
      this.pm25 = data.pm25;
      this.pub_time = data.pub_time;
      this.qlty = data.qlty;
      this.so2 = data.so2;
    }
    static fromJson(data) {
      aqi = data.aqi;
      asid = data.asid;
      co = data.co;
      main = data.main;
      no2 = data.no2;
      o3 = data.o3;
      pm10 = data.pm10;
      pm25 = data.pm25;
      pub_time = data.pub_time;
      qlty = data.qlty;
      so2 = data.so2;
    }
    toJson() {
      return {
        aqi: this.aqi,
        co: this.co,
        main: this.main,
        no2: this.no2,
        o3: this.o3,
        pm10: this.pm10,
        pm25: this.pm25,
        pub_time: this.pub_time,
        qlty: this.qlty,
        so2: this.so2,
      }
    }
  }
  
  class AirNowStation {
    constructor(data) {
      this.air_sta = data.air_sta;
      this.aqi = data.aqi;
      this.asid = data.asid;
      this.co = data.co;
      this.lat = data.lat;
      this.lon = data.lon;
      this.main = data.main;
      this.no2 = data.no2;
      this.o3 = data.o3;
      this.pm10 = data.pm10;
      this.pm25 = data.pm25;
      this.pub_time = data.pub_time;
      this.qlty = data.qlty;
      this.so2 = data.so2;
    }
    static fromJson(data) {
      air_sta = data.air_sta;
      aqi = data.aqi;
      asid = data.asid;
      co = data.co;
      lat = data.lat;
      lon = data.lon;
      main = data.main;
      no2 = data.no2;
      o3 = data.o3;
      pm10 = data.pm10;
      pm25 = data.pm25;
      pub_time = data.pub_time;
      qlty = data.qlty;
      so2 = data.so2;
    }
    toJson() {
      return {
        air_sta: this.air_sta,
        aqi: this.aqi,
        asid: this.asid,
        co: this.co,
        lat: this.lat,
        lon: this.lon,
        main: this.main,
        no2: this.no2,
        o3: this.o3,
        pm10: this.pm10,
        pm25: this.pm25,
        pub_time: this.pub_time,
        qlty: this.qlty,
        so2: this.so2,
      }
    }
  }

  export default AirQuaity;