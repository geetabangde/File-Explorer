import React from "react";
import { Folder, FolderPlus, FilePlus } from "lucide-react";
import TreeItem from "./TreeItem";
import SearchBar from "./SearchBar";

const Sidebar = ({
  fileSystem,
  selectedItem,
  onSelect,
  onDelete,
  onRename,
  onCreateFolder,
  onCreateFile,
  expandedFolders,
  toggleFolder,
  searchQuery,
  onSearchChange,
  onSearchClear,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  draggedItem,
  dropTarget,
}) => {
  return (
    <>
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold mb-3 flex items-center">
            <Folder className="w-5 h-5 mr-2 text-blue-600" />
            File Explorer
          </h1>
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onClear={onSearchClear}
          />
        </div>
        <div className="flex-1 overflow-auto">
          <TreeItem
            item={fileSystem}
            level={0}
            onSelect={onSelect}
            selected={selectedItem?.id}
            onDelete={onDelete}
            onRename={onRename}
            onCreateFolder={onCreateFolder}
            onCreateFile={onCreateFile}
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            draggedItem={draggedItem}
            dropTarget={dropTarget}
          />
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => onCreateFolder("root")}
            className="w-full mb-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center transition-colors shadow-sm"
            aria-label="Create new folder in root"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </button>
          <button
            onClick={() => onCreateFile("root")}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center justify-center transition-colors shadow-sm"
            aria-label="Create new file in root"
          >
            <FilePlus className="w-4 h-4 mr-2" />
            New File
          </button>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
