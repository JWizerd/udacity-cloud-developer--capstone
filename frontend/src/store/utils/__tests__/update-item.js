import { updateItem } from "../update-item";

describe('updateItem', () => {
  it('should return the same array unaltered if the index of the item to be updated is NOT found', () => {
    const collection = {
      items: [
        {
          id: 1,
          value: '1',
        },
        {
          id: 2,
          value: '2',
        },
        {
          id: 3,
          value: '2',
        },
      ]
    }

    const result = updateItem(collection, 10, { id: 2, value: 'test' });

    expect(result).toEqual(collection);
  });

  it('should return an updated array of items if the index of the item is found', () => {
    const collection = {
      items: [
        {
          id: 1,
          value: '1',
        },
        {
          id: 2,
          value: '2',
        },
        {
          id: 3,
          value: '2',
        },
      ]
    }

    const result = updateItem(collection, 2, { id: 2, value: 'test' });

    expect(result).toEqual({
      items: [
        {
          id: 1,
          value: '1',
        },
        {
          id: 2,
          value: 'test',
        },
        {
          id: 3,
          value: '2',
        },
      ]
    });
  });
});