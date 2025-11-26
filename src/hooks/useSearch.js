import { useState, useMemo } from 'react';
import { searchInTree } from '../utils/fileSystemHelpers';

export const useSearch = (fileSystem) => {
  const [searchQuery, setSearchQuery] = useState('');
 
  const filteredFileSystem = useMemo(() => {
    if (!searchQuery.trim()) {
      return fileSystem;
    }

    const results = searchInTree(fileSystem, searchQuery);
    return {
      ...fileSystem,
      children: results
    };
  }, [fileSystem, searchQuery]);

  const clearSearch = () => setSearchQuery('');

  return {
    searchQuery,
    setSearchQuery,
    filteredFileSystem,
    clearSearch,
    hasActiveSearch: searchQuery.trim().length > 0
  };
};