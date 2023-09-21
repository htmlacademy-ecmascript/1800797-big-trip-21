export default class OfferModel {
  constructor(service){
    this.service = service;
    this.offerModel = this.service.getOffers();
  }

  get(){
    return this.offerModel;
  }

  getByType(type) {
    return this.offerModel
      .find((offer) =>offer.type === type).offers;
  }

  getById(type, id) {
    return this.getByType(type)
      .find((offer) => offer.id === id);
  }
}
