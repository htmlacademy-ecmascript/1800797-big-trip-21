import { createElement } from '../../render.js';
import FormOfferView from './form-offer-view.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

function getOffers(type, offers) {
  console.log(offers.get().find((item) => item.type === type).offers);
  return offers.get().find((item) => item.type === type).offers;
}

function createFormEditViewTemplate({state, destinations, offers}) {
  return `
  <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${state.point.type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${state.point.type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinations.getById(state.point.destination).name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                    ${destinations.get().map((item) => `<option value="${item.name}"></option>`).join('')}

                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${state.point.base_price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${getOffers(state.point.type, offers).map((item, i) => new FormOfferView(item, i, state.point.offers).template).join('')}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinations.getById(state.point.destination).description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${destinations.getById(state.point.destination).pictures.map((item) =>
    `<img class="event__photo" src="${item.src}" alt="${item.description}">`
  ).join('')}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`;
}

export default class FormEditView extends AbstractStatefulView {
  #updatePoint;
  constructor({point, destinations, offers, closeEditForm, updatePoint}) {
    super();
    this.offers = offers;
    // this.point = point;
    this.destinations = destinations;
    this.closeEditForm = closeEditForm;
    this._setState(FormEditView.parsePointToState(point));
    this._restoreHandlers();
    this.#updatePoint = updatePoint;
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#onSubmit);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#chooseTypeHandler);
    this.element.querySelector('.event__input').addEventListener('change', this.#chooseDestinationHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#changePriceHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#pickOffersHandler);

  }

  #pickOffersHandler = (evt) => {
    console.log(evt.target.dataset.id);
    const checkedOffers = Array.from(document.querySelectorAll('.event__offer-checkbox'))
      .filter((item) => item.checked)
      .map((item) => item.dataset.id);
    console.log(checkedOffers);
    this._setState({
      point: {
        ...this._state.point,
        offers: [...checkedOffers]
      }
    });
  };

  #changePriceHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        // eslint-disable-next-line camelcase
        base_price: evt.target.value
      }
    });
  };

  #chooseTypeHandler = (evt) => {
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      }
    });
  };

  #chooseDestinationHandler = (evt) => {
    console.log(evt.target.value);
    this.updateElement({
      point: {
        ...this._state.point,
        destination: this.destinations.getByName(evt.target.value).id
      }
    });
  };

  get template() {
    return createFormEditViewTemplate({state: this._state, destinations: this.destinations, offers: this.offers});
  }

  static parsePointToState = (point) =>({point});

  static parseStateToPoint = (state) => state.point;

  #onSubmit = (evt) => {
    evt.preventDefault();
    this.#updatePoint(this._state.point);
    this.closeEditForm();
    console.log('CloseForm');
  };
}
