export default class PointsModel {
  constructor(service){
    this.service = service;
    this.pointsModel = this.service.getPoints();
  }

  get(){
    return this.pointsModel;
  }
}
