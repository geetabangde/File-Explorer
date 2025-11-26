import React from "react";
import Sidebar from "./components/Sidebar";
import ContentArea from "./components/ContentArea";
import ErrorMessage from "./components/ErrorMessage";
import { useFileSystem } from "./hooks/useFileSystem";
import { useSearch } from "./hooks/useSearch";
import { initialFileSystem } from "./jsondata/mockFileSystem";
import "./App.css";

/**
 * Main App Component
 * File Explorer Application with tree structure and file operations
 */
function App() {
  // File system state and operations
  const {
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
  } = useFileSystem(initialFileSystem);

  // Search functionality
  const { searchQuery, setSearchQuery, filteredFileSystem, clearSearch } =
    useSearch(fileSystem);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <Sidebar
        fileSystem={filteredFileSystem}
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
        onDelete={deleteItem}
        onRename={renameItem}
        onCreateFolder={createFolder}
        onCreateFile={createFile}
        expandedFolders={expandedFolders}
        toggleFolder={toggleFolder}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchClear={clearSearch}
      />

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Error Message */}
        <ErrorMessage message={error} onDismiss={() => showError("")} />

        {/* Content Display */}
        <ContentArea selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default App;
