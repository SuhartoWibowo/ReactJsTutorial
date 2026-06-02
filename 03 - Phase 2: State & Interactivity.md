In Phase 1, you learned how to build a static layout. But in a professional app like **Facebook** or **Instagram**, the page doesn't just sit there—it changes. Users click buttons, type text, and toggle menus.

In React, this is handled by **State**. Phase 2 is about making your application **alive**.

---

### Phase 2: State & Interactivity

#### 1. What is "State"?
In Vanilla JS, if you want to change text on a screen, you find the element and manually update its `innerText`. In React, you **update the State**, and React automatically updates the UI.

**The Rule:** If data changes over time and needs to be reflected on the screen, it belongs in **State**.

#### 2. The `useState` Hook
This is the most important tool for interactivity. It allows functional components to "remember" things.

**Real-World Case: A Professional "Add to Cart" Button**
Imagine you are building for an e-commerce site like **Amazon**. You need to keep track of how many items the user is buying.

```jsx
import { useState } from 'react';

const ProductActions = () => {
  // 1. Define state: [currentValue, functionToUpdate]
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <button onClick={decrement}>-</button>
      <span>{quantity}</span>
      <button onClick={increment}>+</button>
      <p>Total Items: {quantity}</p>
    </div>
  );
};
```
*   **Pro Tip:** Never change state directly (e.g., `quantity = 5`). Always use the setter function (`setQuantity(5)`). This tells React: "Hey, something changed! Re-render the UI!"

---

#### 3. Event Handling
React events are named in camelCase (e.g., `onClick`, `onChange`, `onSubmit`) instead of lowercase.

**Professional Case: Search Bar Input**
At a company like **Netflix**, as you type, the app needs to capture every keystroke.

```jsx
const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    // Capture the value from the real DOM input
    setQuery(event.target.value);
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search movies..." 
        value={query} // Controlled Component
        onChange={handleInputChange} 
      />
      <p>Searching for: {query}</p>
    </div>
  );
};
```

---

#### 4. Controlled Components (Handling Forms)
In a professional React app, **React is the "Single Source of Truth."** This means we don't let the HTML input hold its own value; we force it to get its value from React state.

**Professional Case: A Login Form**
```jsx
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Stop page reload (The Professional Way)
    console.log("Submit to API:", { email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <button type="submit">Login</button>
    </form>
  );
};
```

---

#### 5. Lifting State Up
This is the moment a "Newbie" becomes a "Junior Developer." Sometimes, two sibling components need to share the same data. Since data only flows **down**, you must move the state to their common **Parent**.

**Real-World Example:**
1.  **Component A:** A Search Input.
2.  **Component B:** A List of Products.
*   *Problem:* Component B needs to know what was typed in Component A to filter the list.
*   *Solution:* Put the `searchQuery` state in the **Parent** and pass it down as props.

---

#### 6. Updating State with Objects and Arrays
Since state is **immutable** (cannot be changed, only replaced), you must use the **Spread Operator** (`...`) you learned in Phase 0.

**Professional Case: Updating a Profile**
```jsx
const [user, setUser] = useState({ name: "John", age: 25 });

const updateName = () => {
  // Correct Way: Copy everything, then overwrite name
  setUser({ ...user, name: "Jane" });
};
```

---

### Phase 2 Summary Checklist:
1.  **State vs Props**: Do I understand that Props are "Arguments" (read-only) and State is "Internal Memory" (changeable)?
2.  **useState**: Can I use the `useState` hook to toggle a menu or count items?
3.  **Controlled Inputs**: Do I understand why `value={state}` and `onChange` are used together?
4.  **Forms**: Do I remember to use `e.preventDefault()` on form submission?

---

### Project 2: The Professional Task Manager
**Goal:** Build a "To-Do" app, but make it professional.
*   **Feature 1:** Add a task (Input + Submit).
*   **Feature 2:** Mark a task as "Complete" (Clicking the task toggles a CSS class).
*   **Feature 3:** Delete a task (Using `.filter()` to update the state array).
*   **Feature 4:** Filter tasks (Show "All", "Completed", or "Pending").

**Once you can manage data moving around your app, you are ready for Phase 3: Side Effects & Hooks (The Mid-Level stage). Ready to proceed?**
