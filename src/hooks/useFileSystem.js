import { useState, useCallback } from 'react';
import {
  deleteFromTree,
  renameInTree,
  addToTree,
  validateName,
  generateId,
  findItemById
} from '../utils/fileSystemHelpers';

export const useFileSystem = (initialData) => {
  const [fileSystem, setFileSystem] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set(['root', '1', '2']));
  const [error, setError] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const showError = useCallback((message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  }, []);

  const toggleFolder = useCallback((id) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const deleteItem = useCallback((id) => {
    if (id === 'root') {
      showError('Cannot delete root folder');
      return;
    }

    const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
    deleteFromTree(newFileSystem, id);
    setFileSystem(newFileSystem);

    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  }, [fileSystem, selectedItem, showError]);

  const renameItem = useCallback((id, newName) => {
    const validation = validateName(newName);
    if (!validation.valid) {
      showError(validation.error);
      return false;
    }

    const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
    renameInTree(newFileSystem, id, newName);
    setFileSystem(newFileSystem);

    if (selectedItem?.id === id) {
      setSelectedItem({ ...selectedItem, name: newName });
    }
    return true;
  }, [fileSystem, selectedItem, showError]);

  const createFolder = useCallback((parentId) => {
    const parent = findItemById(fileSystem, parentId);
    if (!parent || parent.type !== 'folder') {
      showError('Cannot create folder here');
      return;
    }

    const newFolder = {
      id: generateId('folder'),
      name: 'New Folder',
      type: 'folder',
      children: []
    };

    const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
    addToTree(newFileSystem, parentId, newFolder);
    setFileSystem(newFileSystem);
    setExpandedFolders((prev) => new Set([...prev, parentId]));
  }, [fileSystem, showError]);

  const createFile = useCallback((parentId) => {
    const parent = findItemById(fileSystem, parentId);
    if (!parent || parent.type !== 'folder') {
      showError('Cannot create file here');
      return;
    }

    const newFile = {
      id: generateId('file'),
      name: 'new-file.txt',
      type: 'file',
      content: ''
    };

    const newFileSystem = JSON.parse(JSON.stringify(fileSystem));
    addToTree(newFileSystem, parentId, newFile);
    setFileSystem(newFileSystem);
    setExpandedFolders((prev) => new Set([...prev, parentId]));
  }, [fileSystem, showError]);


  const isDescendant = useCallback((parentItem, targetId) => {
    if (parentItem.id === targetId) return true;
    if (parentItem.children) {
      return parentItem.children.some(child => isDescendant(child, targetId));
    }
    return false;
  }, []);


  const removeItemFromTree = useCallback((tree, itemId) => {
    if (!tree.children) return tree;
    return {
      ...tree,
      children: tree.children
        .filter(child => child.id !== itemId)
        .map(child => removeItemFromTree(child, itemId))
    };
  }, []);


  const addItemToFolder = useCallback((tree, folderId, item) => {
    if (tree.id === folderId) {
      return {
        ...tree,
        children: [...(tree.children || []), item]
      };
    }
    if (tree.children) {
      return {
        ...tree,
        children: tree.children.map(child => addItemToFolder(child, folderId, item))
      };
    }
    return tree;
  }, []);


  const handleDragStart = useCallback((e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDropTarget(null);
  }, []);

  const handleDragOver = useCallback((e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem || draggedItem.id === item.id) return;

    if (item.type === 'folder') {
      setDropTarget(item.id);
      e.dataTransfer.dropEffect = 'move';
    }
  }, [draggedItem]);

  const handleDragLeave = useCallback(() => {
    setDropTarget(null);
  }, []);

  const handleDrop = useCallback((e, targetItem) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem || draggedItem.id === targetItem.id || targetItem.type !== 'folder') {
      setDropTarget(null);
      return;
    }

    if (isDescendant(draggedItem, targetItem.id)) {
      showError('Cannot move a folder into its own subfolder');
      setDropTarget(null);
      return;
    }
    let newFileSystem = JSON.parse(JSON.stringify(fileSystem));
    newFileSystem = removeItemFromTree(newFileSystem, draggedItem.id);
    newFileSystem = addItemToFolder(newFileSystem, targetItem.id, draggedItem);

    setFileSystem(newFileSystem);
    setExpandedFolders(prev => new Set([...prev, targetItem.id]));
    setDropTarget(null);
    setDraggedItem(null);
  }, [draggedItem, fileSystem, isDescendant, removeItemFromTree, addItemToFolder, showError]);

  return {
    fileSystem,
    selectedItem,
    setSelectedItem,
    expandedFolders,
    toggleFolder,
    deleteItem,
    renameItem,
    createFolder,
    createFile,
    error,
    showError,
    draggedItem,
    dropTarget,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};