import AddNewPointButtonView from '../view/header/add-new-point-button.js';
import { render, remove } from '../framework/render.js';
import FormEditView from '../view/trip/form-edit-view.js';
import { UserAction, UpdateType } from '../constance.js';

const newPoint = {
  base_price: 0,
  date_from: '2024-01-06T00:00:02.106Z',
  date_to: '2024-01-06T15:10:02.106Z',
  destination: null,
  is_favorite: false,
  offers: null,
  type: null
};


export default class NewPointPresenter {
  #formNewComponent = null;
  #destination = null;
  #offer = null;
  #onDataAdd = null;
  constructor({destinationModel, offerModel, onDataAdd}) {
    this.#destination = destinationModel;
    this.#offer = offerModel;
    this.#onDataAdd = onDataAdd;
  }

  addNewPointButton = new AddNewPointButtonView({
    onClick: () => {
      this.#addNewPointClickHandler();
    }
  });

  addNewButtonContainer = document.querySelector('.trip-main');
  init () {
    render(this.addNewPointButton, this.addNewButtonContainer, 'beforeend');
  }

  #addNewPointClickHandler() {
    console.log('addNewPoint');
    this.#formNewComponent = new FormEditView({
      point: newPoint,
      destinations: this.#destination,
      offers: this.#offer,
      closeEditForm: () => {
        this.#closeFormHandler();
      },
      updatePoint: (point) => {
        this.#addPointHandler(point);
      },
      newPoint: true
    });

    render(this.#formNewComponent, document.querySelector('.trip-events__list'),'beforebegin');

  }

  #closeFormHandler = () => {
    remove(this.#formNewComponent);
  };

  #addPointHandler = (point) => {
    this.#onDataAdd(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
    this.addNewPointButton.reset();

  };
}


