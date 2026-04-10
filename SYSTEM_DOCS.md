# MediTrack - System Documentation & Setup Log

## 1. System Architecture Overview
MediTrack follows a **Polyrepo** architecture to optimize CI/CD and deployments. 
This main repository contains the Core System (Web + Backend). The Mobile App is maintained in a standalone repository.

- **Web App:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (Neon Cloud) via Prisma ORM v6
- **Mobile App:** React Native (Expo) - *Maintained in the standalone `MediTrack-Mobile` repository*

## 2. Daily Setup & Startup Routine
To start working on the core system daily, run the `start_dev.bat` file in the root directory. This automatically launches the terminals and local development servers for both the Web and Backend.

## 3. Progress Log

### Day 1: System Initialization & Restructuring
**Completed Tasks:**
- Initialized React/Vite frontend for the web application.
- Initialized Node.js backend environment.
- Configured Prisma ORM (v6 for stability) and successfully migrated the schema to a remote Neon PostgreSQL database.
- Created local DX startup scripts (`start_dev.bat`).
- **Architectural Update:** Extracted the React Native Mobile app into a standalone repository (`MediTrack-Mobile`) to streamline store deployments and separate the release cycles.