import { render, replace } from '../framework/render.js';
import SortView from '../view/trip/sort-view.js';
import ListView from '../view/trip/list-view.js';
import PointPresenter from './point-presenter.js';
import { sort } from '../utils/sort.js';
import { UpdateType, UserAction } from '../constance.js';
import NewPointPresenter from './new-point-presenter.js';


export default class TripPresenter {
  #presenters = new Map();
  #points = [];
  constructor(destinationModel, offerModel, pointModel) {
    this.destinationModel = destinationModel;
    this.offerModel = offerModel;
    this.pointModel = pointModel;
    this.pointModel.addObserver(this.#handlePointModelEvent);

    const newPointPresenter = new NewPointPresenter({
      destinationModel,
      offerModel,
      onDataAdd : this.#handleViewAction});
    newPointPresenter.init();
  }

  tripSortComponent = new SortView({
    onSortTypeChange: (sortType) => {
      this.#sortPoinList(sortType);
    }
  });

  tripEventContainer = document.querySelector('.trip-events');
  listComponent = new ListView();

  init() {
    // this.boardEvents = [...this.pointModel.get()];
    // this.#points = [...this.boardEvents];
    render(this.tripSortComponent, this.tripEventContainer, 'afterbegin');
    render(this.listComponent, this.tripEventContainer);
    this.#renderPoints();
  }

  #handlePointModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // наблюдатель, который будет реагировать на изменение модели
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)

    switch(updateType){
      case UpdateType.MINOR :
        console.log('data.id ', data.id);
        this.#clearPoints();
        this.#renderPoints();
        break;
      case UpdateType.PATCH :
        console.log('data.id ', data.id);
        this.#presenters.get(data.id).init(data);
        break;
      case UpdateType.INIT:
        // this.#isLoading = false;
        // remove(this.#loadingComponent);
        this.#renderPoints();
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);

    // обработчик любого пользовтельского действия.
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.pointModel.deletePoint(updateType, update);
        break;
    }


  };

  get points() {
    const points = this.pointModel.points;

    //filters

    return points;
  }

  #renderPoints = () => {
    this.points.forEach((item) => {
      const pointPresenter = new PointPresenter({
        list: this.listComponent,
        dest: this.destinationModel,
        offer: this.offerModel,
        setFavourite: this.#changeFavourite,
        onDataChange: this.#handleViewAction,
        onModeChange: this.#modeChangeHandle
      });
      pointPresenter.init(item);

      this.#presenters.set(item.id, pointPresenter);

    });
  };

  #modeChangeHandle = () => {
    this.#presenters.forEach((item) => {
      item.resetView();
    });
  };

  #sortPoinList(sortType){
    console.log('sortType ', sortType);
    this.#sortPoints(sortType);
    this.#clearPoints();
    this.#renderPoints();
  }


  #clearPoints = () => {
    this.#presenters.forEach((item) => {
      item.destroy();
    });
  };

  #sortPoints = (sortType) => {
    this.#points = sort(sortType, this.#points);
    console.log('WoW', this.#points);
  };

  #changeFavourite = (point) => {
    console.log('favourite changed');
    const updatedPointIndex = this.boardEvents.findIndex((item) => item.id === point.id);
    this.boardEvents[updatedPointIndex].is_favorite = !this.boardEvents[updatedPointIndex].is_favorite;
    this.#presenters.get(this.boardEvents[updatedPointIndex].id).init(this.boardEvents[updatedPointIndex]);
  };
}
