import { getRandomPoint, getPoints } from '../mock/points.js';

const TASK_COUNT = 10;

export default class EventModel {
  // events = Array.from({length: TASK_COUNT}, getRandomPoint);
  events = getPoints(TASK_COUNT);

  getEvents() {
    return this.events;
  }
}
