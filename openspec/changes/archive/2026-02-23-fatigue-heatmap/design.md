## Context

The `stats.service.ts` already has a `getMuscleDistribution` method that counts sets per muscle group. We will extend this or create a similar method that specifically looks at the last 7 days and provides an intensity score rather than just a percentage.

## Design

### 1. Data Service Addition
Create `getMuscleFatigueData(userId: string)` in `stats.service.ts`:
- Fetch logs from `subDays(new Date(), 7)`.
- Output an object: `{ [muscleGroup: string]: number (setCount) }`.

### 2. Frontend Component: `FatigueHeatmap.tsx`
This component will use an SVG-based human silhouette or a sophisticated `CSS Grid` layout where each cell represents a muscle group.

- **Component Structure**:
    - `FatigueHeatmapContainer`: Fetches data from the service.
    - `MuscleSilhouette`: Renders the SVG with dynamic `fill` colors based on the `setCount`.
    - `IntensityLegend`: Explains the color scale.

### 3. Body Mapping
Map specific SVG `id`s or class names to the `muscleGroup` enums used in the database:
- `chest` -> `SVGPath#chest`
- `legs` -> `SVGPath#quads`, `SVGPath#hamstrings`
- `back` -> `SVGPath#lats`, `SVGPath#traps`

## Risks / Trade-offs

- **Visual Complexity**: Creating a high-quality SVG silhouette that is responsive can be complex. A grid-based "Muscle Matrix" is a safer alternative if the silhouette becomes too unwieldy.
- **Data Normalization**: 10 sets of isolation work might be "less fatiguing" than 10 sets of heavy squats. For this phase, we will treat all sets equally for simplicity.
