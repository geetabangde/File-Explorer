import React from "react";
import { Folder, File } from "lucide-react";

/**
 * ContentArea component - Right panel for displaying file content
 */
const ContentArea = ({ selectedItem }) => {
  // No item selected
  if (!selectedItem) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 bg-gray-50">
        <div className="text-center">
          <File className="w-20 h-20 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">Select a file or folder to view</p>
          <p className="text-sm mt-2">Click on any item in the sidebar</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 p-6 bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center">
              {selectedItem.type === "folder" ? (
                <Folder className="w-6 h-6 mr-3 text-yellow-600" />
              ) : (
                <File className="w-6 h-6 mr-3 text-gray-600" />
              )}
              <div>
                <h2 className="text-xl font-semibold">{selectedItem.name}</h2>
                <p className="text-sm text-gray-500 capitalize">
                  {selectedItem.type}
                </p>
              </div>
            </div>
          </div>

          {/* File Content */}
          {selectedItem.type === "file" && (
            <div className="flex-1 p-4 overflow-auto">
              <div className="bg-gray-50 p-4 rounded border border-gray-200 font-mono text-sm whitespace-pre-wrap">
                {selectedItem.content || "(Empty file)"}
              </div>
            </div>
          )}

          {/* Folder Info */}
          {selectedItem.type === "folder" && (
            <div className="flex-1 p-4 flex items-center justify-center">
              <div className="text-gray-500 text-center">
                <Folder className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Folder Contents</p>
                <p className="text-sm mt-2">
                  {selectedItem.children?.length || 0} item(s) inside
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ContentArea;
