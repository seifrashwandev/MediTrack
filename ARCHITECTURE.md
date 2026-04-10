# MediTrack - System Architecture & Roadmap

This document provides a visual overview of the MediTrack system architecture, database schema, and project development roadmap.

## 1. System Architecture (Polyrepo & Local DB)

We utilize a Polyrepo approach to decouple the mobile application lifecycle from the core web and backend services. We follow a **UI-Driven Development** approach using Figma and Google Stitch AI to establish requirements before building backend logic.

```mermaid
graph TD
    subgraph Core Repository [MediTrack Core Repo]
        Web[Web Frontend<br/>React / Vite / Tailwind v4]
        Backend[Backend API<br/>Node.js / Express]
    end

    subgraph Mobile Repository [MediTrack Mobile Repo]
        Mobile[Mobile App<br/>React Native / Expo]
    end

    subgraph Local Infrastructure
        DB[(PostgreSQL DB<br/>Local Environment)]
    end

    subgraph Design & Prototyping
        Stitch[Google Stitch AI<br/>UI Generation]
        Figma[Figma<br/>UI/UX Preservation]
    end

    Stitch -->|Exports UI/Code| Figma
    Figma -->|Guides Implementation| Web
    Web <-->|REST API| Backend
    Mobile <-->|REST API| Backend
    Backend <-->|Prisma ORM| DB
```

## 2. Database Entity Relationship Diagram (ERD)

The core data model utilizing PostgreSQL features like JSONB and UUIDs.

```mermaid
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
```

## 3. Development Roadmap (UI-Driven Approach)

```mermaid
gantt
    title MediTrack Development Roadmap
    dateFormat  YYYY-MM-DD
    axisFormat  %j
    
    section Phase 1: Init & Data
    System Setup & Architecture  :done, p1, 2026-04-10, 1d
    Local PostgreSQL Setup       :done, p2, 2026-04-10, 1d
    Polyrepo Extraction          :done, p3, 2026-04-10, 1d
    
    section Phase 2: Web UI (Current)
    Tailwind v4 Setup            :done, p4, 2026-04-10, 1d
    Stitch AI Design Generation  :active, p5, 2026-04-10, 2d
    Doctor/Admin Dashboards      :p6, after p5, 3d
    
    section Phase 3: Backend
    Auth & JWT Implementation    :p7, after p6, 2d
    Core CRUD REST APIs          :p8, after p7, 3d
    
    section Phase 4: Mobile UI
    Patient Portal UI Components :p9, after p8, 3d
    API Integration              :p10, after p9, 3d
```