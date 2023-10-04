import PointView from '../view/trip/point-view.js';
import FormEditView from '../view/trip/form-edit-view.js';
import { render, replace, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #point = null;
  #destination = null;
  #listComponent = null;
  #offer = null;
  #setFavourite = null;
  #formEditComponent = null;
  #pointComponent = null;
  #mode = Mode.DEFAULT;

  constructor({ list, dest, offer, setFavourite }) {
    this.#destination = dest;
    this.#listComponent = list;
    this.#offer = offer;
    this.#setFavourite = setFavourite;
  }

  init(point) {
    this.#point = point;
    this.#renderPoint(this.#point);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#formEditComponent);
  }

  #renderPoint(pointEvent) {
    const prevPointComponent = this.#pointComponent;
    const prevFormEditComponent = this.#formEditComponent;

    this.#pointComponent = new PointView({
      event: pointEvent,
      dest: this.#destination,
      offer: this.#offer,
      openEditForm: () => {
        this.#replaceCardToForm();
      },
      onSetFavourite: () => {
        this.#changeFavourite();
      }
    });

    this.#formEditComponent = new FormEditView({
      point: pointEvent,
      destinations: this.#destination,
      offers: this.#offer,
      closeEditForm: () => {
        this.#replaceFormToCard();
      }
    });
    if (prevPointComponent === null || prevFormEditComponent === null) {
      render(this.#pointComponent, this.#listComponent.element);
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }
    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  #changeFavourite() {
    this.#setFavourite(this.#point);
  }

  #replaceCardToForm() {
    replace(this.#formEditComponent, this.#pointComponent);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#formEditComponent);
  }
}
