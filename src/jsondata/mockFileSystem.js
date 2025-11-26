export const initialFileSystem = {
  id: 'root',
  name: 'root',
  type: 'folder',
  children: [
    {
      id: '1',
      name: 'Documents',
      type: 'folder',
      children: [
        { 
          id: '1-1', 
          name: 'resume.pdf', 
          type: 'file', 
          content: 'John Doe\nSoftware Engineer\n\nExperience:\n- React Developer at ABC Corp\n- Frontend Engineer at XYZ Inc' 
        },
        { 
          id: '1-2', 
          name: 'cover-letter.docx', 
          type: 'file', 
          content: 'Dear Hiring Manager,\n\nI am writing to express my interest in the position...' 
        },
        {
          id: '1-3',
          name: 'Projects',
          type: 'folder',
          children: [
            { 
              id: '1-3-1', 
              name: 'project-proposal.pdf', 
              type: 'file', 
              content: 'Project Proposal\n\nObjective: Create a file explorer application\nTimeline: 2 weeks' 
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Development',
      type: 'folder',
      children: [
        {
          id: '2-1',
          name: 'react-app',
          type: 'folder',
          children: [
            { 
              id: '2-1-1', 
              name: 'package.json', 
              type: 'file', 
              content: '{\n  "name": "react-app",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.2.0"\n  }\n}' 
            },
            { 
              id: '2-1-2', 
              name: 'App.js', 
              type: 'file', 
              content: 'import React from "react";\n\nfunction App() {\n  return (\n    <div className="App">\n      <h1>Hello World</h1>\n    </div>\n  );\n}\n\nexport default App;' 
            },
            { 
              id: '2-1-3', 
              name: 'index.html', 
              type: 'file', 
              content: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>React App</title>\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>' 
            }
          ]
        },
        { 
          id: '2-2', 
          name: 'notes.txt', 
          type: 'file', 
          content: 'Development Notes:\n\n1. Setup React project\n2. Install dependencies\n3. Create components\n4. Test functionality' 
        }
      ]
    },
    {
      id: '3',
      name: 'Images',
      type: 'folder',
      children: [
        { 
          id: '3-1', 
          name: 'vacation.jpg', 
          type: 'file', 
          content: '[Binary Image Data - JPEG Format]\nImage: Beach vacation photo\nSize: 2.4 MB\nDimensions: 1920x1080' 
        },
        { 
          id: '3-2', 
          name: 'profile.png', 
          type: 'file', 
          content: '[Binary Image Data - PNG Format]\nImage: Profile picture\nSize: 856 KB\nDimensions: 512x512' 
        }
      ]
    },
    {
      id: '4',
      name: 'Music',
      type: 'folder',
      children: [
        { 
          id: '4-1', 
          name: 'playlist.mp3', 
          type: 'file', 
          content: '[Audio File - MP3 Format]\nTitle: Favorite Playlist\nDuration: 3:45\nArtist: Various' 
        }
      ]
    }
  ]
};