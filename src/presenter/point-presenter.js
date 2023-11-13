import PointView from '../view/trip/point-view.js';
import FormEditView from '../view/trip/form-edit-view.js';
import { render, replace, remove } from '../framework/render.js';
import {UpdateType, UserAction} from '../constance.js';

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
  #onDataChange = null;
  #onModeChange = null;

  constructor({ list, dest, offer, setFavourite, onDataChange, onModeChange }) {
    this.#destination = dest;
    this.#listComponent = list;
    this.#offer = offer;
    this.#setFavourite = setFavourite;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
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
      },
      updatePoint: (point) => {
        this.#updatePointHandler(point);
      },
      deletePoint: (point) => {
        this.#deletePointHandler(point);
      }

    });
    if (prevPointComponent === null || prevFormEditComponent === null) {
      render(this.#pointComponent, this.#listComponent.element);
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#formEditComponent, prevFormEditComponent);
    }
    remove(prevPointComponent);
    remove(prevFormEditComponent);
  }

  #updatePointHandler(point) {
    this.#onDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  #deletePointHandler(point) {
    this.#onDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #changeFavourite() {
    this.#setFavourite(this.#point);
  }


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm() {
    replace(this.#formEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#onModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }
}
