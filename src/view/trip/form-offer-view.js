// import { createElement } from '../../render.js';
import AbstractView from '../../framework/view/abstract-view.js';

function createFormOfferViewTemplate(offer, index, pointOffers) {
  return `
  <div class="event__offer-selector">
    <input
      class="event__offer-checkbox  visually-hidden"
      id="event-offer-luggage-${index}"
      type="checkbox"
      name="event-offer-luggage"
      ${pointOffers.includes(offer.id) ? 'checked' : ''}
      >
    <label class="event__offer-label" for="event-offer-luggage-${index}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
  </label>
  </div>
  `;
}

export default class FormOfferView extends AbstractView{
  constructor(offer, i, pointOffers) {
    super()
    this.offer = offer;
    this.index = i;
    this.pointOffers = pointOffers;
  }

  get template() {
    return createFormOfferViewTemplate(this.offer, this.index, this.pointOffers)
  }

}
