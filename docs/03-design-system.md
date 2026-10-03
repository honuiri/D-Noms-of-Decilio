# Design System

The D' Noms of Decilio (DND) design system defines the visual rules used throughout the application. It keeps the pages consistent while still allowing small adjustments for different screens and components.

## Colour

The main colour palette used throughout the application is:

| Name | Hex | Use |
| --- | --- | --- |
| Primary Red | `#bc1414` | Main headings, buttons, navigation, important text, and accents |
| Soft Yellow | `#ffeda2` | Secondary backgrounds and highlighted sections |
| Off White | `#fffcf6` | Main page background |
| Olive Green | `#a2a93e` | Accent elements, borders, and secondary controls |
| Muted Beige | `#d6d2a5` | Supporting accents and subtle visual elements |

Additional colours are used only where needed for interface states, such as form errors, placeholders, and shadows.

The main text and background combinations were chosen to keep the interface readable while maintaining the warm family-recipe theme.

## Typography

DND uses two main typefaces:

### Baskervville

Used for:
- Main page headings
- Recipe names
- Section headings
- Important display text

Baskervville gives the application a traditional and personal feeling that fits the family recipe theme.

### Instrument Sans

Used for:
- Navigation
- Buttons
- Form labels
- Form inputs
- Supporting text
- Interface elements

Instrument Sans is used for functional interface text because it is clean and easy to read.

### Type sizes

The application uses a small set of consistent type sizes rather than assigning a different size to every component.

| Name | Size | Main use |
| --- | --- | --- |
| Large Heading | `48px` | Main page/hero headings |
| Page Heading | `40px` | Page titles |
| Section Heading | `32px` | Section headings and important titles |
| Body | `16px` | Regular text and interface text |
| Small Text | `14px` | Supporting text and smaller interface details |

Some components use intermediate sizes when needed for responsive layouts.

## Spacing

DND follows a simple spacing scale based around multiples of `8px`.

| Name | Value |
| --- | ---: |
| Small | `8px` |
| Medium | `16px` |
| Large | `24px` |
| Extra Large | `32px` |

These values are reused for padding, margins, gaps, and spacing between interface elements.

Larger sections may use additional spacing when needed for layout and readability.

## Layout

The application uses a simple responsive layout.

The main recipe collection uses a grid layout on larger screens and changes to a single-column layout on smaller screens.

The main mobile breakpoint is:

```css
@media (max-width: 700px)
```

At this breakpoint:
- The desktop navigation changes to a hamburger menu.
- Recipe cards are displayed in one column.
- Content spacing is reduced where necessary.
- Buttons and controls are adjusted to fit smaller screens.
- The layout remains usable without horizontal scrolling.

## Components

### Header and Navigation

The header contains:
- DND logo
- Home navigation
- Recipes navigation
- Recipe category dropdown
- Add Recipe navigation
- Mobile hamburger menu

Navigation links have an active state to show the current page.

On smaller screens, the navigation is replaced with a hamburger menu to keep the header compact.

### Recipe Cards

Recipe cards are used to display recipes in the recipe collection.

They use:
- Rounded corners
- A simple card layout
- Recipe images
- Recipe name
- Recipe category or supporting information
- Consistent spacing

The final application uses bordered recipe cards on the Recipes page. This was a refinement from the initial mockup because the border made the cards easier to distinguish and improved the overall appearance of the recipe collection.

This change is visual only and does not change the recipe functionality.

### Buttons

Buttons use the DND colour palette and have rounded corners.

Button states include:
- Normal
- Hover
- Focus
- Disabled, when applicable

Buttons are designed to clearly communicate actions such as adding, editing, deleting, submitting, or navigating.

### Forms

Forms are used for login and adding/editing recipes.

Form inputs use:
- Consistent height
- Rounded corners
- Accent-coloured borders
- Instrument Sans
- Consistent spacing between fields

Focused inputs use a visible border and focus ring so that the active field is clear.

For example, the login form changes the input border colour and adds a subtle focus ring when the input is focused.

### Dropdowns

Dropdown controls are used for recipe categories.

They include:
- Closed state
- Open state
- Selected category state
- Hover/active interaction

The recipe navigation dropdown also changes between open and closed states on mobile.

## Component States

Reusable components use consistent interaction states.

### Normal

The component uses the standard DND colour palette and spacing.

### Hover

Interactive elements provide a visual change when the user moves the pointer over them.

### Focus

Keyboard-focusable elements have a visible focus indication.

The focus state is especially important for form inputs and navigation elements.

### Disabled

Disabled controls use a visually reduced appearance when an action is not available.

### Loading

While recipe data is being loaded, the Recipes page displays:

```text
Loading recipes...
```

### Empty

When there are no recipes matching the current search or category filter, the page displays:

```text
No recipes found.
```

### Error

If the recipe API cannot be reached, the page displays an error message:

```text
Unable to load recipes.
```

These states separate loading, empty, error, and successfully loaded recipe data instead of treating them as the same condition.

## Responsive Design

DND was designed for both desktop and mobile screens.

### Desktop

The desktop layout provides:
- Full navigation
- Multi-column recipe grid
- Larger content spacing
- Wider recipe cards and sections

### Mobile

The mobile layout provides:
- Hamburger navigation
- Single-column recipe grid
- Adjusted spacing and sizing
- Touch-friendly controls
- Responsive images and content

The goal is to keep the same functionality and visual identity across different screen sizes rather than creating a separate mobile version of the application.

## Implementation in Code

The design system is implemented directly through CSS.

The main design styles are stored in:

```text
client/src/styles.css
```

The CSS contains the reusable colour variables, typography, spacing, component styles, responsive rules, and interaction states used throughout the application.

The application uses CSS custom properties for the main design tokens so that the same colours can be reused consistently across components.

Example:

```css
:root {
  --color-primary: #bc1414;
  --color-secondary: #ffeda2;
  --color-background: #fffcf6;
  --color-accent-1: #a2a93e;
  --color-accent-2: #d6d2a5;
}
```

The design system is applied directly to the React components instead of using a separate component library or Tailwind configuration.

## Design Refinement

The design system is based on the original high-fidelity mockup, but some visual details were refined during implementation.

For example, the final Recipes page uses bordered recipe cards even though the initial design did not use the same border treatment. This was changed because the refined version made the individual recipes easier to distinguish and fit the overall interface better.

The functionality was not changed by this refinement. The recipe browsing, searching, filtering, viewing, and CRUD features remain the same.

The design may continue to receive small visual refinements while keeping the same colour palette, typography, spacing system, and overall visual identity.

[View the Design System PDF](assets/system-design.pdf)