# 🎯 Atomic Edits - Real Examples

## ❌ **BAD: Overreach Examples**

### Example 1: Button Color Change
**User Request**: "Make the submit button blue"

**BAD AI Response**:
```css
/* Changes ALL buttons in the app */
button {
  background-color: blue;
  color: white;
}
```

**GOOD AI Response**:
```css
/* Targets ONLY the specific button */
#contact-form .submit-btn {
  background-color: blue;
  color: white;
}
```

### Example 2: Form Validation
**User Request**: "Add validation to the contact form"

**BAD AI Response**:
```javascript
// Adds validation to ALL forms
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', validateForm);
});
```

**GOOD AI Response**:
```javascript
// Targets ONLY the contact form
document.getElementById('contact-form').addEventListener('submit', validateContactForm);
```

### Example 3: API Integration
**User Request**: "Add user authentication"

**BAD AI Response**:
```javascript
// Adds auth to entire app, changes multiple files
// - Modifies App.js
// - Creates AuthContext.js
// - Updates all components
// - Changes routing
```

**GOOD AI Response**:
```javascript
// Creates isolated auth component
// - Only creates LoginForm.js
// - Only modifies App.js to include LoginForm
// - No other files touched
```

## ✅ **GOOD: Surgical Precision Examples**

### Example 1: Text Change
**User Request**: "Change the heading to 'Welcome Back'"

**GOOD AI Response**:
```html
<!-- Before -->
<h1>Welcome</h1>

<!-- After - ONLY this line changes -->
<h1>Welcome Back</h1>
```

### Example 2: Function Addition
**User Request**: "Add a function to calculate total price"

**GOOD AI Response**:
```javascript
// Only adds this function, doesn't modify existing code
function calculateTotalPrice(items) {
  return items.reduce((total, item) => total + item.price, 0);
}
```

### Example 3: Style Update
**User Request**: "Make the error message red"

**GOOD AI Response**:
```css
/* Only targets error messages */
.error-message {
  color: red;
}
```

## 🚨 **Enforcement Rules**

### Rule 1: File-Level Granularity
- **Before making ANY change**, identify the exact file and line numbers
- **Document the scope**: "This change affects only `src/components/ContactForm.jsx` lines 15-20"

### Rule 2: CSS Selector Specificity
- **Never use generic selectors** like `button`, `form`, `div`
- **Always use specific selectors** like `#contact-form .submit-btn`, `.error-message`

### Rule 3: Function Isolation
- **Never modify existing functions** unless explicitly requested
- **Always create new functions** for new functionality
- **Use descriptive names** that match the user's request

### Rule 4: Component Boundaries
- **Never modify parent components** unless the child component is the target
- **Keep changes within the specified component's scope** 