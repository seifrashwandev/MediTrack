@echo off
title MediTrack Dev Environment
echo ==========================================
echo Starting MediTrack Development Environment
echo ==========================================

:: Start Web App
echo Starting Web App (React/Vite)...
start "MediTrack Web" cmd /k "cd web && npm run dev"

:: Start Mobile App
echo Starting Mobile App (Expo)...
start "MediTrack Mobile" cmd /k "cd mobile && npm start"

:: Start Backend (We will set up the dev script soon)
echo Starting Backend...
start "MediTrack Backend" cmd /k "cd backend && echo Backend Terminal Ready. (Waiting for server code)"

echo All terminals opened successfully!
exit