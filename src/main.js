import HeaderPresenter from './presenter/header-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventModel from './model/event-model.js';

const eventModel = new EventModel();

const headerPresenter = new HeaderPresenter();
headerPresenter.init();

const tripPresenter = new TripPresenter({eventModel});
tripPresenter.init();
