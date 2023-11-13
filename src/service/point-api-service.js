import ApiService from '../framework/api-service.js';
import { EndPoints, Method } from '../constance.js';

export default class PointApiService extends ApiService {
  getPoints() {
    return this._load({ url: EndPoints.POINTS })
      .then(ApiService.parseResponse);
  }

  getDestinations() {
    return this._load({ url: EndPoints.DESTINATIONS })
      .then(ApiService.parseResponse);
  }

  getOffers() {
    return this._load({ url: EndPoints.OFFERS })
      .then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${EndPoints.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: `${EndPoints.POINTS}`,
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deletePoint(pointId) {
    const response = await this._load({
      url: `${EndPoints.POINTS}/${pointId}`,
      method: Method.DELETE,
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
