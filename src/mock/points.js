/* eslint-disable camelcase */
import { getRandomArrayElement } from '../utils.js';

const mockTasks = [
  {
    id: '1',
    base_price: 1100,
    date_from: '2019-07-10T22:55:56.845Z',
    date_to: '2019-07-11T11:22:13.375Z',
    destination: '2',
    is_favorite: false,
    offers: [
      '1'
    ],
    type: 'taxi'
  },
  {
    id: '2',
    base_price: 2200,
    date_from: '2019-07-10T22:55:56.845Z',
    date_to: '2019-07-11T11:22:13.375Z',
    destination: '3',
    is_favorite: false,
    offers: [
      '2'
    ],
    type: 'plane'
  },
  {
    id: '3',
    base_price: 3300,
    date_from: '2019-07-10T22:55:56.845Z',
    date_to: '2019-07-11T11:22:13.375Z',
    destination: '4',
    is_favorite: false,
    offers: [
      '3'
    ],
    type: 'train'
  }
];

function getRandomEvent() {
  return getRandomArrayElement(mockTasks);
}

export {getRandomEvent};
