// import { createElement } from '../../render.js';

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

export default class FormOfferView {
  constructor(offer, i, pointOffers) {
    this.offer = offer;
    this.index = i;
    this.pointOffers = pointOffers;
  }

  getTemplate() {
    return createFormOfferViewTemplate(this.offer, this.index, this.pointOffers)
  }

}
