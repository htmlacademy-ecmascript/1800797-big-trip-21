export default class DestinationsModel {
  constructor(service){
    this.service = service;
    this.destinationsModel = this.service.getDestinations();
  }

  get(){
    return this.destinationsModel;
  }

  getById(id) {
    return this.destinationsModel.find((destination) => destination.id === id);
  }

  getByName(name) {
    return this.destinationsModel.find((destination) => destination.name.toLowerCase() === name.toLowerCase());
  }
}
