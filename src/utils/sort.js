import { SortTypes } from '../constance.js';

export const sort = (type, points) => {
  switch (type) {
    case SortTypes.DAY: {
      // return points.sort()
    }
    case SortTypes.EVENT: {
      throw new Error(`Sort by ${SortTypes.EVENT} is not emplemented`);
    }
    case SortTypes.OFFER: {
      throw new Error(`Sort by ${SortTypes.OFFER} is not emplemented`);
    }
    case SortTypes.PRICE: {
      console.log('!!!ready   ', points.sort((pointA, pointB) => pointA.base_price - pointB.base_price));
      return [...points].sort((pointA, pointB) => pointA.base_price - pointB.base_price);
    }
    case SortTypes.TIME: {
      return points.sort();
    }
  }
};
