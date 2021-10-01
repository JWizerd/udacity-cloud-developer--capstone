export const updateItem = (paginatedCollection, id, item, key = 'id') => {
  const collection = { ...paginatedCollection };
  const index = collection.items.findIndex(m => m[key] === id);
  if (index !== -1) collection.items.splice(index, 1, { ...item });
  return collection;
}