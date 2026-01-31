# PROCEDUREFLOW_LITE
# ProcureFlow Lite

ProcureFlow Lite is a backend-heavy procurement workflow system inspired by real-world enterprise procurement platforms.

## Problem Statement
Most procurement processes in companies rely on emails and spreadsheets, leading to inefficiencies, lack of traceability, and poor compliance.

## Solution
This project digitizes procurement workflows by introducing:
- Structured purchase requests
- Role-based approvals
- Automated RFQ creation
- Enterprise-grade audit logging

## Tech Stack
- Backend: Node.js, Express, MongoDB
- Frontend: React, JavaScript
- Auth: JWT
- CI/CD: GitHub Actions

## Core Features
- JWT-based authentication
- Role-based access control
- Purchase Request lifecycle (Draft → Submitted → Approved)
- Approval rules based on amount
- Audit logs for all critical actions
- Automatic RFQ creation after approval
- CI pipeline for build verification

## Architecture
- Controller-Service-Model pattern
- Stateless REST APIs
- Centralized authentication middleware

## Future Improvements
- Vendor onboarding & quotation submission
- Multi-level approvals
- Notifications & email triggers
- Database transactions for reliability

## Why This Project
This project was designed to simulate real-world enterprise backend systems with a strong focus on correctness, scalability, and maintainability.
