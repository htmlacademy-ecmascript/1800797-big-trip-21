import {render} from '../render.js';
import TripInfoView from '../view/header/trip-info.js';
import FilterView from '../view/header/filter.js';

export default class HeaderPresenter {
  tripInfoComponent = new TripInfoView();
  tripMainContainer = document.querySelector('.trip-main');

  filterComponent = new FilterView();
  filterContainer = document.querySelector('.trip-controls__filters');


  init() {
    render(this.tripInfoComponent, this.tripMainContainer, 'afterbegin');
    render(this.filterComponent, this.filterContainer, 'beforeend');
  }
}
