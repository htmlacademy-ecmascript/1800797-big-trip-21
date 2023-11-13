import { createElement } from '../../render.js';
import AbstractView from '../../framework/view/abstract-view.js';
import PointOfferView from './points/point-offer-view.js';

function createPointViewTemplate(event, dest, offer) {
  return `
  <li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${event.date_from}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${event.type} ${dest.getById(event.destination).name}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
      </p>
      <p class="event__duration">30M</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${event.base_price}</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${event.offers.length
    ? event.offers.map((offerId) => new PointOfferView(offer.getById(event.type, offerId)).template).join('')
    : ''
}
    </ul >
    <button class="event__favorite-btn ${event.is_favorite ? 'event__favorite-btn--active' : ''}" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div >
</li > `;
}

export default class PointView extends AbstractView {
  constructor({event, dest, offer, openEditForm, onSetFavourite}) {
    super();
    this.event = event;
    this.dest = dest;
    this.offer = offer;
    this.openEditForm = openEditForm;
    this.onSetFavourite = onSetFavourite;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onRollUpButtonClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#onFavouriteButtonClick);
  }

  get template() {
    return createPointViewTemplate(this.event, this.dest, this.offer);
  }

  #onRollUpButtonClick = (evt) => {
    evt.preventDefault();
    this.openEditForm();
    console.log('openEdit');
  };

  #onFavouriteButtonClick = (evt) => {
    evt.preventDefault();
    this.onSetFavourite();
    console.log('SetFavouriteFromPointView');
  };
}


