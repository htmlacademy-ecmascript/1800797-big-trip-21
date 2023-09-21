import {render} from '../render.js';
import SortView from '../view/trip/sort-view.js';
import ListView from '../view/trip/list-view.js';
import PointView from '../view/trip/point-view.js';
import FormEditView from '../view/trip/form-edit-view.js';
import PointOfferView from '../view/trip/points/point-offer-view.js';

export default class TripPresenter {
  constructor(eventModel, destinationModel, offerModel, pointModel){
    console.log(eventModel.events);
    this.eventModel = eventModel.events;
    this.destinationModel = destinationModel;
    this.offerModel = offerModel;
    this.pointModel = pointModel;
  }

  tripSortComponent = new SortView();
  tripEventContainer = document.querySelector('.trip-events');
  listComponent = new ListView();

  init() {
    this.boardEvents = [...this.pointModel.get()];
    const formEditComponent = new FormEditView(this.boardEvents[0], this.destinationModel);
    console.log(this.boardEvents);
    render(this.tripSortComponent, this.tripEventContainer, 'afterbegin');
    render(this.listComponent, this.tripEventContainer);
    render(formEditComponent, this.listComponent.getElement());

    // for (let i = 0; i < 3; i++) {
    //   render(new EventView(), this.listComponent.getElement());
    // }

    for (let i = 0; i < this.boardEvents.length; i++) {
      const point = new PointView({event: this.boardEvents[i], dest: this.destinationModel});
      render(point, this.listComponent.getElement());
      if (this.boardEvents[i].offers.length) {
        this.boardEvents[i].offers.forEach((offerId) => {
          render(new PointOfferView(this.offerModel.getById(this.boardEvents[i].type, offerId)), point.getElement().querySelector('.event__selected-offers'));
        });
      }


    }
  }
}
