
export const findItemById = (node, id) => {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findItemById(child, id);
      if (found) return found;
    }
  }
  return null;
};

export const findParentById = (node, id, parent = null) => {
  if (node.id === id) return parent;
  if (node.children) {
    for (const child of node.children) {
      const found = findParentById(child, id, node);
      if (found) return found;
    }
  }
  return null;
};


export const searchInTree = (node, query) => {
  const results = [];
  const lowerQuery = query.toLowerCase();

  const search = (n) => {
    if (n.name.toLowerCase().includes(lowerQuery)) {
      results.push(n);
    }
    if (n.children) {
      n.children.forEach(search);
    }
  };

  search(node);
  return results;
};


export const deleteFromTree = (node, id) => {
  if (node.children) {
    node.children = node.children.filter((child) => {
      if (child.id === id) return false;
      deleteFromTree(child, id);
      return true;
    });
  }
};

export const renameInTree = (node, id, newName) => {
  if (node.id === id) {
    node.name = newName;
    return true;
  }
  if (node.children) {
    for (const child of node.children) {
      if (renameInTree(child, id, newName)) return true;
    }
  }
  return false;
};


export const addToTree = (node, parentId, newItem) => {
  if (node.id === parentId) {
    if (!node.children) node.children = [];
    node.children.push(newItem);
    return true;
  }
  if (node.children) {
    for (const child of node.children) {
      if (addToTree(child, parentId, newItem)) return true;
    }
  }
  return false;
};


export const validateName = (name) => {
  if (!name || !name.trim()) {
    return { valid: false, error: 'Name cannot be empty' };
  }
  if (name.length > 255) {
    return { valid: false, error: 'Name is too long (max 255 characters)' };
  }
  const invalidChars = /[<>:"/\\|?*]/;
  if (invalidChars.test(name)) {
    return { valid: false, error: 'Name contains invalid characters' };
  }
  return { valid: true };
};


export const generateId = (type) => {
  return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};