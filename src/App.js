import React from "react";
import Sidebar from "./components/Sidebar";
import ContentArea from "./components/ContentArea";
import ErrorMessage from "./components/ErrorMessage";
import { useFileSystem } from "./hooks/useFileSystem";
import { useSearch } from "./hooks/useSearch";
import { initialFileSystem } from "./jsondata/mockFileSystem";
import "./App.css";

function App() {
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
    draggedItem,
    dropTarget,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useFileSystem(initialFileSystem);

  const { searchQuery, setSearchQuery, filteredFileSystem, clearSearch } =
    useSearch(fileSystem);

  return (
    <div className="flex h-screen bg-gray-50">
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
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        draggedItem={draggedItem}
        dropTarget={dropTarget}
      />

      <div className="flex-1 flex flex-col">
        <ErrorMessage message={error} onDismiss={() => showError("")} />
        <ContentArea selectedItem={selectedItem} />
      </div>
    </div>
  );
}

export default App;