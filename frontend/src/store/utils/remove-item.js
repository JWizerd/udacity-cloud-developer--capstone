export const removeItem = (paginatedCollection, id, key = 'id') => {
  const collection = { ...paginatedCollection };
  const index = collection.items.findIndex(m => m[key] === id);
  if (index !== -1) collection.items.splice(index, 1);
  return collection;
}