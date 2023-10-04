import {createElement} from '../../render.js';
import AbstractView from '../../framework/view/abstract-view.js';

function createListViewTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListView extends AbstractView{
  get template() {
    return createListViewTemplate();
  }

  // getElement() {
  //   if (!this.element) {
  //     this.element = createElement(this.getTemplate());
  //   }

  //   return this.element;
  // }

  // removeElement() {
  //   this.element = null;
  // }
}
