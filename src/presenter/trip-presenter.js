import {render} from '../render.js';
import SortView from '../view/trip/sort-view.js';
import ListView from '../view/trip/list-view.js';
import PointView from '../view/trip/point-view.js';
import FormEditView from '../view/trip/form-edit-view.js';

export default class TripPresenter {
  constructor({eventModel}) {
    console.log(eventModel.events);
    this.eventModel = eventModel.events;
  }

  tripSortComponent = new SortView();
  tripEventContainer = document.querySelector('.trip-events');
  listComponent = new ListView();
  formEditComponent = new FormEditView();

  init() {
    this.boardEvents = [...this.eventModel];
    console.log(this.boardEvents);
    render(this.tripSortComponent, this.tripEventContainer, 'afterbegin');
    render(this.listComponent, this.tripEventContainer);
    render(this.formEditComponent, this.listComponent.getElement());

    // for (let i = 0; i < 3; i++) {
    //   render(new EventView(), this.listComponent.getElement());
    // }

    for (let i = 0; i < this.boardEvents.length; i++) {
      render(new PointView({event: this.boardEvents[i]}), this.listComponent.getElement());
    }
  }
}
