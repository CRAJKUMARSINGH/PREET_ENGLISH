# ARIA Label Guidelines for PREET_ENGLISH

## Common Icon-Only Buttons and Their Labels

### Navigation
- `<ArrowLeft />` → `aria-label="Go back"` or `aria-label="Return to previous page"`
- `<ArrowRight />` → `aria-label="Go forward"` or `aria-label="Next"`
- `<Home />` → `aria-label="Go to home page"`
- `<X />` → `aria-label="Close"` or `aria-label="Close dialog"`

### Actions
- `<Settings />` → `aria-label="Open settings"`
- `<Share2 />` → `aria-label="Share"`
- `<Edit />` → `aria-label="Edit"`
- `<Trash />` → `aria-label="Delete"`
- `<Plus />` → `aria-label="Add"` or `aria-label="Create new"`

### Media
- `<Play />` → `aria-label="Play"`
- `<Pause />` → `aria-label="Pause"`
- `<Volume2 />` → `aria-label="Play audio"` or `aria-label="Listen"`
- `<Mic />` → `aria-label="Start recording"` or `aria-label="Speak"`

### Status
- `<CheckCircle />` → `aria-label="Completed"` or `aria-label="Success"`
- `<XCircle />` → `aria-label="Failed"` or `aria-label="Error"`
- `<AlertCircle />` → `aria-label="Warning"`

## Implementation Examples

### Before (Inaccessible)
```tsx
<button className="p-3 rounded-xl">
  <Settings className="h-5 w-5" />
</button>
```

### After (Accessible)
```tsx
<button 
  className="p-3 rounded-xl"
  aria-label="Open settings"
>
  <Settings className="h-5 w-5" aria-hidden="true" />
</button>
```

### With Text (Still needs aria-label for clarity)
```tsx
<button 
  className="flex items-center gap-2"
  aria-label="Return to lessons list"
>
  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
  <span>Back to Lessons</span>
</button>
```

## Rules
1. All interactive elements (buttons, links) must have accessible names
2. Icon-only buttons MUST have `aria-label`
3. Decorative icons should have `aria-hidden="true"`
4. Text + icon buttons should still have descriptive `aria-label`
5. Use context-specific labels (not just "button" or "icon")

## Priority Files to Fix
1. client/src/pages/Profile.tsx (Settings, Share buttons)
2. client/src/pages/LessonView.tsx (Navigation buttons)
3. client/src/pages/NewLanding.tsx (Close video button)
4. client/src/pages/LiteDashboard.tsx (Action buttons)
5. client/src/pages/Labs/*.tsx (Lab feature buttons)
