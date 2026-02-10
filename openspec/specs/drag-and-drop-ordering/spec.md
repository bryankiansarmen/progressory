# drag-and-drop-ordering Specification

## Purpose
Define the core requirements for intuitive list reordering using drag-and-drop across the application.

## Requirements

### Requirement: Smooth Drag and Drop
The system SHALL provide a smooth, animated drag-and-drop experience for reordering list items.

#### Scenario: Dragging an item
- **WHEN** the user starts dragging an item by its handle
- **THEN** the item SHALL follow the cursor/touch point
- **AND** other items SHALL shift to create a gap for the dragged item.

### Requirement: Drag Handle
Sortable items SHALL have a clear visual drag handle (e.g., a "grip" icon) to indicate they can be moved.

#### Scenario: Visual Indication
- **WHEN** the user sees a list item in the builder
- **THEN** a grip icon SHALL be visible as the primary interaction point for dragging.
