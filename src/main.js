import HeaderPresenter from './presenter/header-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import EventModel from './model/event-model.js';

const eventModel = new EventModel();

const headerPresenter = new HeaderPresenter();
headerPresenter.init();

const boardPresenter = new BoardPresenter({eventModel});
boardPresenter.init();
