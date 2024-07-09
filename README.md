# [Figma Link](https://www.figma.com/file/737CkzNGX8pu6TtpGM21Uu/Legocy---new?type=design&node-id=0-1&mode=design&t=D8gAHV340msKoYzw-0)

# Frontend LEGOcy Application

This documentation provides an overview of the frontend LEGOcy application's project structure, components, routing, state management, interactions, styling and tips for extending the project.

### Project Structure Overview

The project structure includes configuration files for linting, README, Tailwind and TypeScript configurations and Vite, React, TS + SWC initialization.

### Data

The application uses a JSON file containing data about countries and cities.

### Deployment

Deployment includes a Docker file with npm installation, building the application, and exposing web server engine.

### Source Folder

In the main `src` folder, the `main.tsx` file initializes routes, the QB config for QuickBlox chats, and the environmentals loading file.

### Routing

The `routes` section includes history properties, main routes with page paths, sub-paths, and private routes for hiding pages from unauthorized users.

### Pages

The `pages` section contains authorization, collections, Wikipedia, and other pages organized into sections.

### State Management

State management involves gates, effects, functions for stores and APIs, and mapping  to stores or state units.

### App-End Interactions

Services are stored in `services` folder with interfaces for various functionalities, error handlers, and utilities for application handling.

### Extending the Project

To extend the project, create shared UI components, adapters, libraries for handling UI elements in `shared`, pages  with recording their paths into routes and common utilities in `services/utils.ts`.

### Assets and Styling

`assets` include fonts, icons, images, and global styling for the application.

### Static Components

Static components include `entities` used in specific sections like FAQs, Privacy Policy and About Us.

### Services

`services` follow an interfaces for methods to return promise values for CRUD operations.

### Component Folders

The `components` folder contains components  styling, and complex designs like headers, cells, charts, and modals.

Create complex designed components in `components`, create new `.tsx` files for shared components in `shared`, and organize section components within ```entities```.

By following these guidelines, you can effectively manage and extend the frontend LEGOcy application.

# Install

### 1. Create `.env` file

Create a .env file and change it accordingly.

```
# Base URL for requests
VITE_API_ENDPOINT=

# Base URL for chats microservice
VITE_CHATS_API_ENDPOINT=

# API Header Key
VITE_X_API_KEY=

# QB Creds
VITE_QB_APPLICATION_ID=
VITE_QB_AUTH_SECRET=
VITE_QB_ACCOUNT_KEY=

# Social Creds
VITE_GG_APP_ID=
VITE_FB_APP_ID=

# Hashing word
VITE_FB_SALT=
```

### 2. Build via Docker

LEGOcy frontend app can now be started via:

```
cd /deployment
sudo docker build -t "frontend:Dockerfile" .
```

You can debug on your local machine without building via:

```
sudo vite
```