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
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  draggedItem,
  dropTarget,
}) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const [showActions, setShowActions] = useState(false);
  const isExpanded = expandedFolders.has(item.id);
  const isFolder = item.type === "folder";
  const isDragging = draggedItem?.id === item.id;
  const isDropping = dropTarget === item.id;

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
        <div
          draggable={item.id !== "root"}
          onDragStart={(e) => {
            if (item.id !== "root") {
              onDragStart(e, item);
            }
          }}
          onDragEnd={onDragEnd}
          onDragOver={(e) => {
            if (isFolder) {
              onDragOver(e, item);
            }
          }}
          onDragLeave={onDragLeave}
          onDrop={(e) => {
            if (isFolder) {
              onDrop(e, item);
            }
          }}
          className={`flex items-center py-1 px-2 cursor-pointer hover:bg-gray-100 transition-colors ${
            selected === item.id ? "bg-blue-50 border-l-2 border-blue-500" : ""
          } ${isDropping ? "bg-green-100 border-2 border-green-500 border-dashed" : ""} ${
            isDragging ? "opacity-40" : ""
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
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

          <div
            onClick={() => {
              if (isFolder) {
                toggleFolder(item.id);
              }
              onSelect(item);
            }}
            className="flex items-center flex-1 min-w-0"
          >
            {isFolder ? (
              <Folder className="w-4 h-4 mr-2 text-yellow-600 flex-shrink-0" />
            ) : (
              <File className="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" />
            )}

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
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                draggedItem={draggedItem}
                dropTarget={dropTarget}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TreeItem;