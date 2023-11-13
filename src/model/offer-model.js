import Observable from '../framework/observable.js';
import {UpdateType} from '../constance.js';

export default class OfferModel extends Observable {
  #offersModel = [];
  #pointsApiService = null;
  constructor(service){
    super();
    this.#pointsApiService = service;
  }

  async init() {
    try {
      const offers = await this.#pointsApiService.getOffers() ;
      this.#offersModel = offers;
      console.log(' this.#offersModel  ',  this.#offersModel)
    } catch(err) {
      this.#offersModel = [];
    }
    this._notify(UpdateType.INIT);
  }

  get(){
    return this.#offersModel;
  }

  getByType(type) {
    return this.#offersModel
      .find((offer) =>offer.type === type).offers;
  }

  getById(type, id) {
    return this.getByType(type)
      .find((offer) => offer.id === id);
  }
}
