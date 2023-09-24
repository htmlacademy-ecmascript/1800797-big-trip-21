import DestinationMock from '../mock/destination.js';
import OffersMock from '../mock/offers.js';
import { getRandomPoint } from '../mock/points';
import { TASK_COUNT } from '../constance.js';


export default class Service {
  destination = [];
  offers = [];
  points = [];

  constructor(){
    this.destination = this.generateDestination();
    this.offers = this.generateOffers();
    this.points = this.generatePoints();
  }

  getDestinations(){
    return this.destination;
  }

  generateDestination(){
    const destination = new DestinationMock();
    return destination.get();
  }

  getOffers(){
    return this.offers;
  }

  generateOffers(){
    const offers = new OffersMock();
    return offers.get();
  }

  getPoints(){
    return this.points;
  }

  generatePoints() {
    return Array.from({length: TASK_COUNT}, getRandomPoint);
  }
}
