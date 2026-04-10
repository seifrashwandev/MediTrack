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