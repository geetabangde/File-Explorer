import React, { useState } from "react";
import {
  Folder,
  File,
  ChevronRight,
  ChevronDown,
  Trash2,
  Edit2,
  FolderPlus,
  FilePlus,
} from "lucide-react";

const TreeItem = ({
  item,
  level,
  onSelect,
  selected,
  onDelete,
  onRename,
  onCreateFolder,
  onCreateFile,
  expandedFolders,
  toggleFolder,
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [showActions, setShowActions] = useState(false);

  const isExpanded = expandedFolders.has(item.id);
  const isFolder = item.type === "folder";

  // Handle rename submission
  const handleRename = () => {
    if (newName.trim() && newName !== item.name) {
      const success = onRename(item.id, newName.trim());
      if (success) {
        setIsRenaming(false);
      }
    } else {
      setNewName(item.name);
      setIsRenaming(false);
    }
  };

  // Handle keyboard events for renaming
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRename();
    } else if (e.key === "Escape") {
      setNewName(item.name);
      setIsRenaming(false);
    }
  };

  return (
    <>
      <div>
        {/* Tree Item Row */}
        <div
          className={`flex items-center py-1 px-2 cursor-pointer hover:bg-gray-100 transition-colors ${
            selected === item.id ? "bg-blue-50 border-l-2 border-blue-500" : ""
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          {/* Expand/Collapse Button */}
          {isFolder && (
            <button
              onClick={() => toggleFolder(item.id)}
              className="p-0 mr-1 hover:bg-gray-200 rounded transition-colors"
              aria-label={isExpanded ? "Collapse folder" : "Expand folder"}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Item Content */}
          <div
            onClick={() => {
              if (isFolder) {
                toggleFolder(item.id);
              }
              onSelect(item);
            }}
            className="flex items-center flex-1 min-w-0"
          >
            {/* Icon */}
            {isFolder ? (
              <Folder className="w-4 h-4 mr-2 text-yellow-600 flex-shrink-0" />
            ) : (
              <File className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" />
            )}

            {/* Name or Input */}
            {isRenaming ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={handleRename}
                onKeyDown={handleKeyDown}
                className="px-1 py-0 border border-blue-500 rounded text-sm flex-1 min-w-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                autoFocus
                onClick={(e) => e.stopPropagation()}
                aria-label="Rename item"
              />
            ) : (
              <span className="text-sm truncate" title={item.name}>
                {item.name}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          {showActions && !isRenaming && item.id !== "root" && (
            <div className="flex items-center gap-1 ml-2">
              {isFolder && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCreateFolder(item.id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="New Folder"
                    aria-label="Create new folder"
                  >
                    <FolderPlus className="w-3 h-3 text-gray-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCreateFile(item.id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                    title="New File"
                    aria-label="Create new file"
                  >
                    <FilePlus className="w-3 h-3 text-gray-600" />
                  </button>
                </>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRenaming(true);
                }}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title="Rename"
                aria-label="Rename item"
              >
                <Edit2 className="w-3 h-3 text-gray-600" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title="Delete"
                aria-label="Delete item"
              >
                <Trash2 className="w-3 h-3 text-red-600" />
              </button>
            </div>
          )}
        </div>

        {/* Children (Recursive) */}
        {isFolder && isExpanded && item.children && (
          <div>
            {item.children.map((child) => (
              <TreeItem
                key={child.id}
                item={child}
                level={level + 1}
                onSelect={onSelect}
                selected={selected}
                onDelete={onDelete}
                onRename={onRename}
                onCreateFolder={onCreateFolder}
                onCreateFile={onCreateFile}
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TreeItem;
