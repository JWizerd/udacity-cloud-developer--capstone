import { removeItem } from "../remove-item";
describe('removeItem', () => {
  it('should return an empty array if items length is 1, and item is found in collection', () => {
    const collection = {
      items: [{
        id: 1
      }]
    }

    const result = removeItem(collection, 1);

    expect(result).toEqual({ items: [] });
  });

  it('should return the same array of items if item is not found in collection', () => {
    const collection = {
      items: [
        {
          id: 1
        },
        {
          id: 3
        }
      ]
    }

    const result = removeItem(collection, 2);

    expect(result).toEqual(collection);
  });

    it('should return remove the item from the collection if found', () => {
    const collection = {
      items: [
        {
          id: 1
        },
        {
          id: 3
        },
        {
          id: 5
        },
      ]
    }

    const result = removeItem(collection, 3);

    expect(result).toEqual({
      items: [
        {
          id: 1,
        },
        {
          id: 5,
        }
      ]
    });
  });
});