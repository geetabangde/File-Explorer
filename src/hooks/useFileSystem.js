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

  // Show error message with auto-dismiss
  const showError = useCallback((message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  }, []);

  // Toggle folder expand/collapse
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

  // Delete item
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

  // Rename item
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

  // Create folder
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

  // Create file
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
    showError
  };
};