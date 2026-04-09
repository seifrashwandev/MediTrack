# MediTrack - System Documentation & Setup Log

## 1. System Architecture Overview
MediTrack is a full-stack healthcare management system built using a monorepo structure.
- **Web App:** React (Vite)
- **Mobile App:** React Native (Expo)
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (Neon Cloud) via Prisma ORM v6

## 2. Daily Setup & Startup Routine
To start working on the system daily, simply run the `start_dev.bat` file located in the root directory. This batch script automatically opens three separate terminal instances and starts the local development servers for the Web, Mobile, and prepares the Backend environment.

## 3. Progress Log

### Day 1: System Initialization
**Completed Tasks:**
- Set up a Git Monorepo architecture (`web`, `mobile`, `backend`).
- Initialized React/Vite frontend for the web application.
- Initialized React Native/Expo frontend for the mobile application.
- Initialized Node.js backend environment.
- Configured Prisma ORM (v6 for stability).
- Drafted Database Schema (Users, Patients, Appointments, Prescriptions, LabResults) using UUIDs and JSONB.
- Successfully migrated and synced the schema to a remote Neon PostgreSQL database.
- Created local DX startup scripts (`start_dev.bat`).