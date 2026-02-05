# Spec: App Identity

## ADDED Requirements

### Requirement: Application Metadata

The application MUST present itself as "**Progressory**" to users and search engines to establish its unique brand identity.

#### Scenario: Browser Tab Title

- **WHEN** a user visits any page of the application
- **THEN** the browser tab title should start with "Progressory"
- **AND** the default title template should be used for child pages

#### Scenario: SEO Description

- **WHEN** a search engine or social media platform crawls the application
- **THEN** the description should be "A modern, full-stack workout tracking application built with Next.js 15, TypeScript, and PostgreSQL."
