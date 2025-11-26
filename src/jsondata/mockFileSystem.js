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
          name: 'Experience', 
          type: 'file',
          content: `Frontend Developer with 3+ years of experience in building scalable web applications using React.js and 
            Next.js. Strong in performance optimization, SEO-friendly development, and delivering user-centric solutions. 
            Proven ability to collaborate in agile teams and contribute to both frontend and API integration.`
        },
        { 
          id: '1-2', 
          name: 'cover-letter.docx', 
          type: 'file', 
          content: `Dear Hiring Manager,
            I am writing to express my interest in the Frontend Developer position at your organization. 
            With 3+ years of experience building scalable, user-friendly, and high-performance web applications 
            using React.js and Next.js, I am confident in my ability to contribute effectively to your team.

            In my previous roles, I have worked extensively on component-based architecture, API integrations, 
            state management (Redux, Context API), and performance optimization. I have also collaborated 
            with cross-functional teams in agile environments to deliver features on time with a focus on 
            quality and user experience.

            I specialize in SEO-friendly development, responsive UI, reusable component design, and enhancing 
            application speed through best coding practices. I enjoy working on challenging projects that push 
            me to grow and contribute meaningful solutions.

            I am excited about the opportunity to bring my skills to your organization and be a valuable part 
            of your development team. Thank you for considering my application. I look forward to the 
            opportunity to discuss how my experience aligns with your requirements.

            Sincerely,  
            Geeta Bangde
            ` 
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
              content: `LIMS Dashboard 
                       Description:
                      A fully functional Laboratory Information Management System dashboard 
                      built using React.js, React Router, Context API, and REST APIs.

                      Key Features:
                      - Dynamic tables using TanStack Table (sorting, filtering, pagination)
                      - User authentication using JWT tokens
                      - Protected routes + lazy loading for performance
                      - API-based forms for adding labs, instruments, calibration data
                      - Multi-select dropdowns (react-select)
                      - File upload, edit, delete, and update operations
                      - Reusable components for modals, forms, and validation

                      Tech Stack:
                      React.js, TanStack Table, React Router, Axios, Context API, Tailwind CSS
              ` 
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