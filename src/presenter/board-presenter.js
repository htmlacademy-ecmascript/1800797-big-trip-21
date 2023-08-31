import {render} from '../render.js';
import SortView from '../view/board/sort-view.js';
import ListView from '../view/board/list-view.js';
import EventView from '../view/board/event-view.js';
import EditView from '../view/board/edit-view.js';

export default class BoardPresenter {
  constructor({eventModel}) {
    console.log(eventModel.events);
    this.eventModel = eventModel.events;
  }

  tripSortComponent = new SortView();
  tripEventContainer = document.querySelector('.trip-events');
  listComponent = new ListView();
  editComponent = new EditView();

  init() {
    this.boardEvents = [...this.eventModel];
    console.log(this.boardEvents);
    render(this.tripSortComponent, this.tripEventContainer, 'afterbegin');
    render(this.listComponent, this.tripEventContainer);
    render(this.editComponent, this.listComponent.getElement());

    // for (let i = 0; i < 3; i++) {
    //   render(new EventView(), this.listComponent.getElement());
    // }

    for (let i = 0; i < this.boardEvents.length; i++) {
      render(new EventView({event: this.boardEvents[i]}), this.listComponent.getElement());
    }
  }
}
