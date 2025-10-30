# Copilot Instructions for Housing App

## Architecture Overview

This is an Angular 20 housing directory app with a unique component-centric architecture:

- **No NgModules**: Uses standalone components throughout (`imports: [...]` in component decorators)
- **Flat service injection**: Services use `inject()` function instead of constructor DI
- **JSON Server backend**: External data served from `db.json` at `http://localhost:3000/locations`

## Key Components & Data Flow

```
App (root) → Home (list) → HousingLocation (card) 
                     ↓
                  Details (form)
```

- `Home`: Manages housing list, search filtering, and favorites state using localStorage
- `HousingLocation`: Reusable card component with favorite toggle functionality  
- `Details`: Route-aware component for viewing/applying to individual properties
- `HousingService`: Handles API calls to JSON server using native fetch()

## Development Patterns

### Component Structure
- **Inline templates**: All components use `template:` instead of separate HTML files (except Home/Details)
- **Input/Output signals**: Use `input.required<T>()` and `output<T>()` for component communication
- **CSS co-location**: Each component has its own `.css` file in same directory

### Service Patterns
```typescript
// Standard service injection
housingService: HousingService = inject(HousingService);

// Async data fetching with native fetch
async getAllHousingLocations(): Promise<HousingLocationInfo[]> {
  const data = await fetch(this.url);
  return (await data.json()) ?? [];
}
```

### State Management
- **Favorites**: Stored in localStorage as `housing-favorites` JSON array
- **Filtering**: Client-side filtering by city name (case-insensitive)
- **No global state**: Component-level state management only

## Development Workflow

### Running the App
1. Start JSON server: `json-server --watch db.json` (port 3000)
2. Start Angular dev server: `ng serve` (port 4200)

### Project Configuration
- **No tests**: `skipTests: true` in angular.json for all schematics
- **Inline styles**: Components default to inline templates/styles
- **Build target**: Uses new `@angular/build:application` builder

### Code Conventions
- **Interface naming**: `HousingLocationInfo` (not `HousingLocation` - that's the component)
- **Route params**: Always parse with `parseInt(this.route.snapshot.params['id'], 10)`
- **Form handling**: Use `ReactiveFormsModule` with `FormGroup`/`FormControl`
- **Conditional rendering**: Use `@if`/`@else` control flow syntax (Angular 17+)

## Key Files
- `src/app/routes.ts`: Route configuration (default export)
- `db.json`: Mock API data (start with json-server)
- `src/main.ts`: Bootstrap with `provideRouter(routeConfig)`
- `src/app/housinglocation.ts`: Core data interface