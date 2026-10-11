# PROFESSIONAL WEB DEVELOPMENT — MASTER INSTRUCTIONS

## Purpose

This README is a reusable master instruction file for AI-assisted website development.

Before writing, modifying, or generating any website code, **READ THIS FILE COMPLETELY** and follow its rules together with the project's specific requirements.

The goal is not to make a website look "AI-generated." The goal is to produce a website that feels intentionally designed and engineered by an experienced product designer, UX engineer, and senior full-stack developer.

---

# 1. FIRST: UNDERSTAND BEFORE BUILDING

Before writing code:

1. Read this README completely.
2. Read the user's project requirements completely.
3. Identify:
   - Product purpose
   - Target users
   - Primary user journeys
   - Required pages/routes
   - Core features
   - Content hierarchy
   - Technical requirements
   - Authentication/authorization requirements
   - Data requirements
   - Responsive requirements
4. Do not start coding immediately if the requirements are ambiguous.
5. Resolve contradictions using the most explicit and recent requirement.
6. Do not invent major product functionality that was not requested.
7. Make reasonable small UX decisions when necessary, but keep them consistent throughout the product.

---

# 2. DESIGN LIKE A REAL PRODUCT, NOT AN AI TEMPLATE

Avoid generic AI-generated website patterns.

Do NOT automatically use:

- The same hero layout on every page
- Excessive rounded cards
- Excessive glassmorphism
- Random gradients
- Huge glowing text
- Unnecessary shadows
- Excessive pills
- Every section inside a card
- Repeated three-card/four-card grids
- Random illustrations
- Generic stock imagery
- Decorative elements without purpose
- Excessive animations
- Fake statistics
- Placeholder content presented as real content
- Random icons just to fill empty space

A professional interface should feel intentional.

Every visual element must have a reason to exist.

Use a mixture of appropriate layout patterns:

- Editorial layouts
- Grid systems
- Full-width sections
- Split layouts
- Tables
- Lists
- Dense information layouts
- Open whitespace
- Borders/dividers
- Typography-led sections
- Media-led sections
- Cards only when cards genuinely improve comprehension

**Cards are a component, not a design philosophy.**

---

# 3. VISUAL DESIGN PRINCIPLES

Prioritize:

1. Information hierarchy
2. Readability
3. Spacing
4. Alignment
5. Consistency
6. Content clarity
7. Accessibility
8. Responsive behavior
9. Visual rhythm
10. Brand identity

Do not add visual complexity merely to make the interface look impressive.

Prefer:

**clarity > decoration**

**purpose > trend**

**consistency > novelty**

**quality > quantity**

---

# 4. TYPOGRAPHY SYSTEM

Do not randomly choose font sizes for individual elements.

Create a coherent typography scale.

Recommended starting point — adapt according to the product:

### Desktop

- Display: 56–72px
- H1: 48–64px
- H2: 36–48px
- H3: 28–36px
- H4: 22–28px
- Body Large: 18px
- Body: 16px
- Small: 14px
- Caption: 12–13px

### Mobile

- Display: 40–48px
- H1: 36–44px
- H2: 30–36px
- H3: 24–30px
- H4: 20–24px
- Body: 16px
- Small: 14px
- Caption: 12–13px

These are guidelines, NOT mandatory values.

Use responsive typography where appropriate.

Example:

```css
font-size: clamp(2.25rem, 5vw, 4.5rem);
```

### Line Height

Generally use:

- Large headings: 0.95–1.15
- Normal headings: 1.1–1.3
- Body text: 1.5–1.75
- UI labels: approximately 1.2–1.4

Do not make paragraphs unnecessarily wide.

For long-form content, target approximately 60–80 characters per line where practical.

---

# 5. FONT SELECTION

Do not default to the same font pairing on every project.

Select typography according to the product's personality.

Possible categories:

- Modern grotesk
- Humanist sans
- Neo-grotesk
- Geometric sans
- Serif/editorial
- Monospace for technical contexts
- Variable fonts when useful

Use a maximum of a small number of font families unless the design genuinely requires more.

Define:

- Primary font
- Secondary font if needed
- Weight system
- Heading treatment
- Body treatment
- Numeric treatment if relevant
- Letter spacing

Do not use unusual fonts simply to appear different.

Typography should improve the product, not distract from it.

---

# 6. SPACING SYSTEM

Do not manually invent random margins and paddings everywhere.

Use a consistent spacing scale.

A reasonable starting system:

```text
4
8
12
16
20
24
32
40
48
64
80
96
120
160
```

Adapt it to the design.

Maintain consistent:

- Section spacing
- Component padding
- Grid gaps
- Text spacing
- Form spacing
- Navigation spacing

Use whitespace intentionally.

---

# 7. LAYOUT AND GRID

Establish a clear layout system.

Typical starting values:

- Main content max-width: 1200–1440px
- Comfortable reading width: approximately 640–800px
- Desktop side padding: 32–64px
- Tablet side padding: 24–40px
- Mobile side padding: 16–24px

Do not blindly use these numbers.

Choose values according to the content and visual density.

Ensure:

- Consistent alignment
- Strong vertical rhythm
- Clear content hierarchy
- Balanced whitespace
- Predictable responsive behavior

---

# 8. NAVIGATION

Navigation must be designed intentionally.

Consider:

- Primary navigation
- Secondary navigation
- Breadcrumbs
- Sidebar navigation
- Tabs
- Mobile navigation
- Contextual navigation
- Back navigation

Do not overload navigation.

Important actions should be visually clear.

Avoid unnecessary dropdowns.

Do not create navigation elements that lead nowhere.

Every link/button should have a meaningful destination or action.

---

# 9. IMAGES AND VISUAL ASSETS

Never use random images just to fill space.

Every image should have:

- A purpose
- Appropriate aspect ratio
- Appropriate resolution
- Consistent visual style
- Proper cropping
- Proper alt text where applicable

If real assets are unavailable:

1. Use an appropriate placeholder only when necessary.
2. Make it obvious in development that it is temporary.
3. Do not present fake imagery as real product content.
4. Prefer simple intentional placeholders over random stock images.

Do not repeatedly reuse the same image in unrelated sections.

Avoid irrelevant stock photography.

If the project has brand assets, use them consistently.

---

# 10. ICONS

Use one coherent icon system.

Do not mix unrelated icon styles.

Icons should:

- Have consistent stroke/fill style
- Have appropriate sizing
- Align correctly with text
- Include accessible labels where necessary
- Never replace text when the icon alone is ambiguous

Do not use icons as decoration everywhere.

---

# 11. COLOR SYSTEM

Do not randomly assign colors to individual components.

Define a design token system.

For example:

```text
Primary
Secondary
Background
Surface
Foreground
Muted
Border
Success
Warning
Error
Info
```

Use semantic colors.

Maintain sufficient contrast.

Do not use gradients everywhere.

Do not introduce a new color simply because a section looks empty.

---

# 12. COMPONENT DESIGN

Build reusable components.

Examples:

```text
Button
Input
Select
Modal
Dialog
Dropdown
Tabs
Tooltip
Card
Table
Badge
Avatar
Navbar
Sidebar
Footer
Pagination
EmptyState
LoadingState
ErrorState
```

Do not create a separate component for every tiny HTML element.

Do not create giant components containing an entire application.

Use sensible component boundaries.

Components should have clear responsibilities.

---

# 13. CODE QUALITY

Code must be readable and maintainable.

Never intentionally compress large amounts of code into one line.

Avoid:

```text
huge components
deeply nested JSX
duplicated logic
magic numbers everywhere
unnecessary abstractions
unused imports
unused variables
dead code
commented-out old code
console spam
temporary hacks
```

Prefer:

```text
clear naming
small focused components
reusable utilities
logical folder structure
typed data
semantic HTML
predictable state management
clean imports
consistent formatting
```

Use meaningful names.

Bad:

```text
x
temp
data1
abc
thing
handleStuff
```

Better:

```text
userProfile
assignmentStatus
handleTaskSubmission
navigationItems
formatCurrency
```

---

# 14. FILE AND FOLDER STRUCTURE

Organize code according to responsibility.

Example:

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   └── features/
├── lib/
├── hooks/
├── services/
├── types/
├── utils/
├── constants/
└── styles/
```

Adapt the structure to the framework.

Do not create unnecessary folders.

Keep related files close together when that improves maintainability.

---

# 15. FRAMEWORK-SPECIFIC PRACTICES

Follow the official conventions of the selected framework.

For Next.js:

- Use App Router appropriately.
- Use Server Components by default where suitable.
- Add `"use client"` only when client-side behavior is required.
- Use route-level loading/error handling where appropriate.
- Use proper metadata.
- Optimize images.
- Avoid unnecessary client-side JavaScript.
- Keep server/client boundaries intentional.
- Use reusable components.
- Keep data fetching organized.

For React:

- Keep components focused.
- Avoid unnecessary effects.
- Avoid unnecessary global state.
- Use keys correctly.
- Keep derived state derived instead of duplicating it.

For any framework:

**Follow current official best practices instead of outdated patterns.**

---

# 16. RESPONSIVE DESIGN

Do not design desktop first and simply shrink everything.

Consider the actual experience at:

- Large desktop
- Desktop
- Tablet
- Mobile
- Small mobile

Check:

- Navigation
- Typography
- Buttons
- Forms
- Tables
- Images
- Modals
- Cards
- Grids
- Spacing
- Overflow
- Touch targets

Never allow:

- Horizontal overflow without a deliberate reason
- Tiny unreadable text
- Buttons becoming impossible to tap
- Broken layouts
- Cropped important content
- Overlapping elements

---

# 17. ACCESSIBILITY

Build accessibility into the interface.

Use:

- Semantic HTML
- Proper heading hierarchy
- Labels for form controls
- Keyboard navigation
- Visible focus states
- Appropriate contrast
- Accessible buttons
- Alt text for meaningful images
- ARIA only when necessary

Do not use ARIA as a replacement for semantic HTML.

---

# 18. FORMS

Forms should feel professional and predictable.

Each form should consider:

- Labels
- Placeholder usage
- Required fields
- Validation
- Error messages
- Loading state
- Success state
- Disabled state
- Keyboard navigation
- Mobile usability

Never rely only on placeholder text as a label.

Error messages should explain:

**what went wrong + how to fix it**

---

# 19. BUTTONS AND INTERACTIONS

Buttons should clearly communicate actions.

Use meaningful labels:

Bad:

```text
Click Here
Submit
Go
```

Better:

```text
Create Assignment
Save Changes
Publish Project
Continue to Payment
```

Every interactive element should provide appropriate feedback.

Consider:

- Hover
- Focus
- Active
- Disabled
- Loading
- Success
- Error

Do not add animations to every interaction.

---

# 20. ANIMATION AND MOTION

Motion should support usability.

Use animation for:

- State transitions
- Navigation
- Feedback
- Hierarchy
- Progressive disclosure

Avoid:

- Constant floating animations
- Excessive parallax
- Random bouncing elements
- Long transitions
- Animation that delays user interaction

Keep motion subtle and intentional.

Respect reduced-motion preferences.

---

# 21. CONTENT QUALITY

Do not fill a professional website with meaningless placeholder copy.

Avoid excessive:

```text
Lorem ipsum
Amazing solution for everyone
Revolutionary platform
The future of everything
```

Write content that matches the actual product.

If information is unknown, use clearly marked placeholders during development.

Never invent:

- Customer numbers
- Revenue
- Awards
- Testimonials
- Partners
- Reviews
- Certifications
- User counts
- Performance claims

unless explicitly provided.

---

# 22. UX STATES

Every important feature should consider:

### Loading

What does the user see while data is loading?

### Empty

What does the user see when there is no data?

### Error

What happens when something fails?

### Success

What happens after completion?

### Disabled

What happens when an action is unavailable?

### Permission

What happens when the user lacks access?

### Offline/network failure

What happens when the network fails?

Do not design only the happy path.

---

# 23. DATA AND BACKEND

Separate UI concerns from business logic.

Use appropriate layers for:

```text
UI
API
Business Logic
Database
Authentication
Authorization
Validation
Utilities
```

Never trust client-side validation alone.

Validate important data on the server.

Never expose:

- Secrets
- API keys
- Private credentials
- Database credentials
- Server-only environment variables

Use environment variables correctly.

---

# 24. DATABASE

Use the database specified by the project requirements.

Before implementing database features, understand:

- Entities
- Relationships
- Required fields
- Optional fields
- Indexes
- Constraints
- Ownership
- Authorization
- Lifecycle/status fields
- Audit requirements where appropriate

Do not create unnecessary collections/tables.

Do not store duplicate data without a reason.

---

# 25. SECURITY

Treat security as a first-class requirement.

Consider:

- Authentication
- Authorization
- Input validation
- Rate limiting where appropriate
- Secure cookies
- CSRF protection where applicable
- XSS prevention
- Injection prevention
- File upload validation
- Access control
- Sensitive data handling
- Secure environment variables

Never put secrets in frontend code.

Never bypass authorization merely because the UI hides a button.

---

# 26. SEO

For public websites, consider:

- Page title
- Meta description
- Canonical URL where appropriate
- Open Graph metadata
- Twitter/X metadata where appropriate
- Semantic headings
- Descriptive URLs
- Structured data when useful
- Sitemap
- Robots configuration

Do not stuff keywords unnaturally.

---

# 27. PERFORMANCE

Optimize based on actual needs.

Avoid:

- Unnecessary dependencies
- Huge images
- Unnecessary JavaScript
- Excessive client components
- Repeated API requests
- Duplicate data fetching
- Blocking operations

Prefer:

- Image optimization
- Lazy loading where appropriate
- Code splitting
- Caching where appropriate
- Efficient queries
- Pagination for large datasets
- Debouncing for expensive interactions

Do not prematurely optimize everything.

---

# 28. TESTING

Testing is part of implementation, not an afterthought.

After implementing a feature, verify:

- Build
- Type checking
- Linting
- Main user flow
- Form validation
- Navigation
- Responsive behavior
- Error states
- Loading states
- Authentication/authorization where applicable

Use the project's existing test framework if one exists.

If temporary test files, scripts, mock data, debug routes, screenshots, or diagnostic files are created only for development/testing:

1. Use them.
2. Verify the result.
3. Remove them after testing if they are not part of the actual product.
4. Do not delete legitimate project tests or required fixtures.

Do not leave:

```text
test-temp.*
debug.*
temp.*
sample.*
unused screenshots
temporary API routes
temporary database records
```

unless they are intentionally part of the project.

---

# 29. BEFORE FINISHING

Perform a final review.

### UI REVIEW

Check:

- Typography
- Spacing
- Alignment
- Colors
- Contrast
- Responsive layout
- Navigation
- Images
- Icons
- Empty states
- Error states
- Loading states
- Forms
- Buttons

### CODE REVIEW

Check:

- Readability
- Component structure
- Naming
- Duplication
- Unused code
- Imports
- Types
- Error handling
- Security
- Performance

### PRODUCT REVIEW

Ask:

- Is the primary user journey obvious?
- Can users understand what to do?
- Is anything unnecessary?
- Are important actions easy to find?
- Does the UI feel consistent?
- Does the design look intentional rather than generated?

---

# 30. DO NOT OVER-ENGINEER

Professional does NOT mean complicated.

Do not add:

- Unnecessary libraries
- Unnecessary animations
- Unnecessary abstractions
- Unnecessary state management
- Unnecessary microservices
- Unnecessary components
- Unnecessary dependencies

Use the simplest architecture that properly solves the problem.

---

# 31. IMPLEMENTATION WORKFLOW

Follow this sequence:

```text
1. Read requirements
2. Read this README
3. Understand product
4. Define information architecture
5. Define routes
6. Define user flows
7. Define design system
8. Define data model
9. Define component architecture
10. Implement one meaningful UI/feature at a time
11. Test
12. Fix
13. Continue
14. Final QA
15. Remove temporary artifacts
```

Do not attempt to generate an entire complex product blindly in one giant implementation step if the project requires iterative development.

---

# 32. WHEN REQUIREMENTS CHANGE

When the user asks for a change:

1. Understand the requested change.
2. Identify affected components.
3. Preserve unrelated functionality.
4. Avoid breaking existing flows.
5. Update reusable components when appropriate.
6. Test the affected areas.
7. Do not rewrite the entire project unnecessarily.

---

# 33. DESIGN DIFFERENTIATION

A professional website does not need to look radically unusual.

Differentiate through:

- Typography
- Layout
- Content hierarchy
- Spacing
- Visual rhythm
- Brand identity
- Interaction details
- Information density
- Component composition

Do not chase novelty at the expense of usability.

Avoid blindly copying popular websites.

Use references for understanding patterns, not for cloning designs.

---

# 34. AI-SPECIFIC RULE

Do not make design decisions merely because they are common in AI-generated websites.

Before using a common pattern, ask:

> "Does this pattern solve a real UX problem in this product?"

If yes, use it.

If no, choose a more appropriate pattern.

Do not automatically produce:

```text
hero + gradient + 3 cards + testimonials + pricing + CTA
```

unless the product actually requires those sections.

---

# 35. CODE FORMATTING

All generated code must be properly formatted.

Use the project's formatter when available.

Prefer:

```text
consistent indentation
reasonable line length
logical grouping
clear imports
clear component boundaries
readable JSX/HTML
readable CSS
```

Never intentionally create unreadable one-line code.

---

# 36. COMMENTS

Comments should explain **why**, not obvious **what**.

Bad:

```js
// Set count to 1
count = 1;
```

Better:

```js
// Reset pagination after changing the active filter.
setPage(1);
```

Remove obsolete comments.

---

# 37. DEPENDENCY DISCIPLINE

Before installing a package:

1. Check whether the framework already provides the functionality.
2. Check whether an existing project dependency can solve it.
3. Install a new package only when it provides meaningful value.
4. Avoid dependency duplication.

Do not install five libraries to solve one small problem.

---

# 38. PLACEHOLDER AND MOCK DATA

Mock data is acceptable during development when necessary.

But:

- Clearly separate mock data from production data.
- Do not hard-code fake production claims.
- Do not accidentally ship test accounts.
- Remove temporary mock infrastructure when no longer needed.

---

# 39. FINAL STANDARD

The final result should satisfy this principle:

> Build like a senior engineer and design like a senior product designer.

That means:

- Intentional design
- Strong hierarchy
- Excellent typography
- Consistent spacing
- Clean architecture
- Readable code
- Reusable components
- Responsive behavior
- Accessibility
- Security
- Performance
- Realistic content
- Complete UX states
- Proper testing

Do not optimize for "looking AI-generated."

Optimize for:

**clarity, usability, maintainability, performance, and product quality.**

---

# 40. INSTRUCTION FOR THE AI

When this README is provided with a project request:

**READ THIS README FIRST.**

Then:

1. Understand the project's actual requirements.
2. Apply these rules where relevant.
3. Do not blindly apply every rule if it conflicts with the project's legitimate requirements.
4. Do not invent unnecessary features.
5. Make deliberate design decisions.
6. Keep code clean and readable.
7. Test your implementation.
8. Remove temporary testing artifacts after verification.
9. Perform a final UI, UX, code, accessibility, security, and responsive review before considering the task complete.

## PRIMARY PRINCIPLE

**Do not make the website look like an AI-generated template. Build a coherent product with deliberate design and engineering decisions.**
