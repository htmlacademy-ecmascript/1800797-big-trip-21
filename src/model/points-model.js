import Observable from '../framework/observable.js';
import { UpdateType } from '../constance.js';

export default class PointsModel extends Observable {
  #pointsModel = []
  #pointsApiService = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({ service, destinationModel, offerModel }) {
    super();
    this.#pointsApiService = service;
    this.#destinationsModel = destinationModel;
    this.#offersModel = offerModel;
  }

  get points() {
    return this.#pointsModel;
  }

  get() {
    return this.#pointsModel;
  }

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init()
      ])
      const points = await this.#pointsApiService.getPoints();
      this.#pointsModel = points;
    } catch (err) {
      this.#pointsModel = [];
    }
    this._notify(UpdateType.INIT);
  }

  updatePoint(updateType, update) {
    const index = this.#pointsModel.findIndex((item) => item.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#pointsModel = [
      ...this.#pointsModel.slice(0, index),
      update,
      ...this.#pointsModel.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
