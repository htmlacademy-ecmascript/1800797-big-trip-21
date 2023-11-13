import Observable from '../framework/observable.js';
import {UpdateType} from '../constance.js';

export default class DestinationsModel extends Observable {
  #destinationsModel = [];
  #pointsApiService = null;
  constructor(service){
    super();
    this.#pointsApiService = service;
  }

  async init() {
    try {
      const destinations = await this.#pointsApiService.getDestinations() ;
      this.#destinationsModel = destinations;
      console.log(' this.#destinationsModel  ',  this.#destinationsModel)
    } catch(err) {
      this.#destinationsModel = [];
    }
    this._notify(UpdateType.INIT);
  }

  get(){
    return this.#destinationsModel;
  }

  getById(id) {
    return this.#destinationsModel.find((destination) => destination.id === id);
  }

  getByName(name) {
    return this.#destinationsModel.find((destination) => destination.name.toLowerCase() === name.toLowerCase());
  }
}
