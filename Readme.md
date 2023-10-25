# Finance Web Page Maker

Welcome to the Finance Web Page Maker, a powerful web application that allows you to easily create web pages by simply dragging and dropping elements onto the canvas. This project is divided into two main components: the client-side, built with React.js, and the server-side, built with Django.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Client (React.js)](./client)
- [Server (Django)](./server)
- [License](#license)

## Features

- Intuitive drag-and-drop interface for building web pages.
- A variety of pre-designed elements (e.g., text, images, buttons) to choose from.
- Real-time preview of the web page as you create it.
- Save and load web page projects.
- Export created web pages to HTML and CSS.

## Requirements

Before you get started, make sure you have the following software installed on your system:

- Node.js
- npm (Node Package Manager)
- Python
- Django

## Getting Started

To run the Drag and Drop Web Page Maker on your local machine, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/imdewan/finance-page-builder.git
   ```

2. Navigate to the project root directory:

   ```bash
   cd finance-page-builder
   ```

3. Set up the client (React.js) and server (Django) components as explained in the respective sections below.

4. Once the client and server are set up, you can start the development servers for both components.

5. Open your web browser and access the application at `http://localhost:3000`.

### Client (React.js)

The client folder contains the React.js code for the frontend of the application.

1. Navigate to the client folder:

   ```bash
   cd client
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. The client application should be accessible at `http://localhost:3000`.

### Server (Django)

The server folder contains the Django code for the backend of the application.

1. Navigate to the server folder:

   ```bash
   cd server
   ```

2. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

4. Apply database migrations:

   ```bash
   python manage.py migrate
   ```

5. Start the Django development server:

   ```bash
   python manage.py runserver
   ```

6. The server should be accessible at `http://localhost:8000`.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details. Feel free to modify and use this project for your own purposes.

Thank you for using the Drag and Drop Web Page Maker! If you have any questions or run into issues, please don't hesitate to [contact us](mailto:your-email@example.com).
