import ApiService from '../framework/api-service.js';
import { EndPonts } from '../constance.js';

export default class PointApiService extends ApiService {
  getPoints() {
    return this._load({ url: EndPonts.POINTS })
      .then(ApiService.parseResponse);
  }

  getDestinations() {
    return this._load({ url: EndPonts.DESTINATIONS })
      .then(ApiService.parseResponse);
  }

  getOffers() {
    return this._load({ url: EndPonts.OFFERS })
      .then(ApiService.parseResponse);
  }
}
