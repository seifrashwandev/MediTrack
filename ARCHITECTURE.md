# MediTrack - System Architecture & Roadmap

This document provides a visual overview of the MediTrack system architecture, database schema, and project development roadmap.

## 1. System Architecture (Polyrepo)

We utilize a Polyrepo approach to decouple the mobile application lifecycle from the core web and backend services.

```mermaid
graph TD
    subgraph Core Repository [MediTrack Core Repo]
        Web[Web Frontend<br/>React / Vite]
        Backend[Backend API<br/>Node.js / Express]
    end

    subgraph Mobile Repository [MediTrack Mobile Repo]
        Mobile[Mobile App<br/>React Native / Expo]
    end

    subgraph Cloud Infrastructure
        DB[(PostgreSQL DB<br/>Neon Cloud)]
    end

    Web <-->|REST API| Backend
    Mobile <-->|REST API| Backend
    Backend <-->|Prisma ORM| DB
2. Database Entity Relationship Diagram (ERD)
The core data model utilizing PostgreSQL features like JSONB and UUIDs.

مقتطف الرمز
erDiagram
    User ||--o| Patient : "1:1 (If role=Patient)"
    User ||--o{ Appointment : "1:N (Doctor)"
    User ||--o{ Prescription : "1:N (Doctor)"
    
    Patient ||--o{ Appointment : "1:N"
    Patient ||--o{ Prescription : "1:N"
    Patient ||--o{ LabResult : "1:N"
    
    Appointment ||--o| Prescription : "1:1"

    User {
        UUID id PK
        String email
        String password_hash
        Enum role "Admin, Doctor, Patient"
    }

    Patient {
        UUID id PK
        UUID user_id FK
        String full_name
        JSONB medical_history
    }

    Appointment {
        UUID id PK
        UUID patient_id FK
        UUID doctor_id FK
        DateTime appointment_date
        Enum status "Scheduled, Completed, Canceled"
    }

    Prescription {
        UUID id PK
        UUID appointment_id FK
        JSONB medication_details
    }

    LabResult {
        UUID id PK
        UUID patient_id FK
        String file_url
    }
3. Development Roadmap
مقتطف الرمز
gantt
    title MediTrack Development Roadmap
    dateFormat  YYYY-MM-DD
    axisFormat  Phase %j
    
    section Phase 1: Init
    System Setup & Architecture  :done, p1, 2026-04-10, 1d
    Database Schema & Cloud Sync :done, p2, 2026-04-10, 1d
    Polyrepo Extraction          :done, p3, 2026-04-10, 1d
    
    section Phase 2: Backend
    Auth & JWT Implementation    :active, p4, 2026-04-11, 2d
    Core CRUD REST APIs          :p5, after p4, 3d
    
    section Phase 3: Web UI
    Tailwind Setup & Routing     :p6, after p5, 2d
    Doctor/Admin Dashboards      :p7, after p6, 4d
    
    section Phase 4: Mobile UI
    Patient Portal UI Components :p8, after p7, 3d
    API Integration              :p9, after p8, 3d