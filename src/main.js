import HeaderPresenter from './presenter/header-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventModel from './model/event-model.js';
import Service from './service/service.js';
import DestinationsModel from './model/destinations-model.js';
import OfferModel from './model/offer-model.js';
import PointsModel from './model/points-model.js';

const eventModel = new EventModel();

const mockService = new Service();

const destinationModel = new DestinationsModel(mockService);
const offerModel = new OfferModel(mockService);
const pointModel = new PointsModel(mockService);

const headerPresenter = new HeaderPresenter();
headerPresenter.init();

const tripPresenter = new TripPresenter(eventModel, destinationModel, offerModel, pointModel);
tripPresenter.init();
