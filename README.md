# Serene Story Sphere

Serene Story Sphere is a modern blogging platform designed to bring your ideas to life. It combines a sleek frontend built with React and TailwindCSS with a robust backend powered by Django REST Framework.

## Features

- **Rich Text Editor**: Write and format your blogs with ease using the Markdown-supported editor.
- **User Authentication**: Secure login and signup functionality.
- **Blog Management**: Create, edit, and delete blogs with a user-friendly interface.
- **Responsive Design**: Optimized for all devices, from desktops to mobile phones.
- **Pagination**: Efficiently browse through blogs with pagination support.
- **Related Posts**: Discover similar blogs to keep readers engaged.

## Tech Stack

### Frontend
- React
- TailwindCSS
- Vite
- TypeScript

### Backend
- Django
- Django REST Framework
- SQLite (default database)

## Getting Started

### Prerequisites
- Node.js and npm
- Python 3.9+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dineshthokala/fullstack-blog-app.git
   cd fullstack-blog-app
   ```

2. Set up the backend:
   ```bash
   cd blog_backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. Set up the frontend:
   ```bash
   cd blog-frontend
   npm install
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` for the frontend and `http://127.0.0.1:8000` for the backend.

## Folder Structure

- `blog-frontend/`: Contains the React-based frontend.
- `blog_backend/`: Contains the Django-based backend.
- `db.sqlite3`: SQLite database file.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

