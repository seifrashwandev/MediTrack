@echo off
title MediTrack Core Environment
echo ==========================================
echo Starting MediTrack Core Environment (Web & Backend)
echo ==========================================

:: Start Web App
echo Starting Web App (React/Vite)...
start "MediTrack Web" cmd /k "cd web && npm run dev"

:: Start Backend
echo Starting Backend...
start "MediTrack Backend" cmd /k "cd backend && echo Backend Terminal Ready. (Waiting for API code)"

echo All terminals opened successfully!
exit