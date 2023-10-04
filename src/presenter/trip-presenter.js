import { render, replace } from '../framework/render.js';
import SortView from '../view/trip/sort-view.js';
import ListView from '../view/trip/list-view.js';
import PointPresenter from './point-presenter.js';
import { sort } from '../utils/sort.js';


export default class TripPresenter {
  #presenters = new Map();
  #points = [];
  constructor(eventModel, destinationModel, offerModel, pointModel) {
    this.eventModel = eventModel.events;
    this.destinationModel = destinationModel;
    this.offerModel = offerModel;
    this.pointModel = pointModel;
  }

  tripSortComponent = new SortView({
    onSortTypeChange: (sortType) => {
      this.#sortPoinList(sortType)
    }
  });

  tripEventContainer = document.querySelector('.trip-events');
  listComponent = new ListView();

  init() {
    this.boardEvents = [...this.pointModel.get()];
    this.#points = [...this.boardEvents]
    render(this.tripSortComponent, this.tripEventContainer, 'afterbegin');
    render(this.listComponent, this.tripEventContainer);
    this.#renderPoints();
  }

  #renderPoints = () => {
    this.#points.forEach((item) => {
      const pointPresenter = new PointPresenter({
        list: this.listComponent,
        dest: this.destinationModel,
        offer: this.offerModel,
        setFavourite: this.#changeFavourite
      });
      pointPresenter.init(item);

      this.#presenters.set(item.id, pointPresenter);

    });
  };

  #sortPoinList(sortType){
    console.log('sortType ', sortType);
    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  }


  #clearPoints = () => {
    this.#presenters.forEach((item) => {
      item.destroy()})
  }

  #sortPoints = (sortType) => {
    this.#points = sort(sortType, this.#points);
    console.log('WoW', this.#points);
  }

  #changeFavourite = (point) => {
    console.log('favourite changed');
    const updatedPointIndex = this.boardEvents.findIndex((item) => item.id === point.id);
    this.boardEvents[updatedPointIndex].is_favorite = !this.boardEvents[updatedPointIndex].is_favorite;
    this.#presenters.get(this.boardEvents[updatedPointIndex].id).init(this.boardEvents[updatedPointIndex]);
  }
}
