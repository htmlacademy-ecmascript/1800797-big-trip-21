import { createElement } from '../../../render.js';

function createPointOfferViewTemplate(title, price) {
  return `
  <li class="event__offer">
  <span class="event__offer-title">${title}</span>
  &plus;&euro;&nbsp;
  <span class="event__offer-price">${price}</span>
  </li>
  `;
}

export default class PointOfferView {
  constructor({ title, price }) {
    this.offerTitle = title;
    this.offerPrice = price;
  }

  getTemplate() {
    return createPointOfferViewTemplate(this.offerTitle, this.offerPrice);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}


