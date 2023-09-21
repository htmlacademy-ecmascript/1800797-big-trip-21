export default class DestinationsModel {
  constructor(service){
    this.service = service;
    this.destinationsModel = this.service.getDestinations();
  }

  get(){
    return this.destinationsModel;
  }

  getById(id) {
    console.log('!!!', id)
    return this.destinationsModel.find((destination) => destination.id === id);
  }
}
