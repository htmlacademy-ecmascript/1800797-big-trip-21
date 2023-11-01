import HeaderPresenter from './presenter/header-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
// import EventModel from './model/event-model.js';
import Service from './service/service.js';
import DestinationsModel from './model/destinations-model.js';
import OfferModel from './model/offer-model.js';
import PointsModel from './model/points-model.js';
import PointApiService from './service/point-api-service.js';

const AUTHORIZATION = 'Basic hS22344rwegy5ey';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

// const eventModel = new EventModel();

// const mockService = new Service();

const pointApiService = new PointApiService(END_POINT, AUTHORIZATION)

const destinationModel = new DestinationsModel(pointApiService);
const offerModel = new OfferModel(pointApiService);
const pointModel = new PointsModel({
  service: pointApiService,
  destinationModel,
  offerModel
});

pointModel.init();

const headerPresenter = new HeaderPresenter();
headerPresenter.init();

const tripPresenter = new TripPresenter(destinationModel, offerModel, pointModel);
tripPresenter.init();
