class LifeStyle  {
  constructor(data) {
    this.hourly = data.HeWeather6.lifestyle.map((item) => {
      return new LifeStyleItem(item);
    })
  }
}

class LifeStyleItem {
  constructor(data) {
    this.type = data.type;
    this.brf = data.brf;
    this.txt = data.txt;
  }
  static fromJson(data) {
    type = data.type;
    brf = data.brf;
    txt = data.txt;
  }
  toJson() {
    return {
      type: this.type,
      brf: this.brf,
      txt: this.txt,
    }
  }
}