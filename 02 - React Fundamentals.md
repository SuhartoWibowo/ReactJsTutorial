Welcome to **Phase 1: React Fundamentals**. This is where we stop writing "scripts" and start building **User Interfaces (UI)** using the **Component-Based Architecture** used by companies like **Facebook, Instagram, and Discord.**

---

### Phase 1: React Fundamentals

#### 1. Project Setup with Vite
In a professional environment, speed is everything. We no longer use *Create React App* (it's too slow). We use **Vite**. Vite provides a lightning-fast development server.

**Professional Command:**
```bash
npm create vite@latest my-pro-app -- --template react
cd my-pro-app
npm install
npm run dev
```

#### 2. JSX (JavaScript XML)
JSX allows us to write HTML-like code inside JavaScript. But remember: **JSX is not HTML.** It is a syntax sugar that gets converted into JavaScript objects.

**Professional Rules:**
*   **className**: Since `class` is a reserved word in JS, we use `className`.
*   **Single Root**: A component must return a single parent element (or a fragment `<>...</>`).
*   **CamelCase**: Attributes are camelCase (e.g., `onClick`, `tabIndex`).

---

#### 3. Functional Components (Atomic Design)
In a professional company, we don't build "pages." We build **Components**. Think of them as LEGO blocks. 
*   **Atom**: A Button.
*   **Molecule**: A Search Bar (Input + Button).
*   **Organism**: A Navigation Header.

**Real-World Case: A Professional Button Component**
A company like **Airbnb** has one Button component used in 1,000 different places.

```jsx
// src/components/PrimaryButton.jsx

const PrimaryButton = () => {
  const handleClick = () => {
    console.log("System: Action initiated.");
  };

  return (
    <button 
      className="btn-primary" 
      onClick={handleClick}
      style={{ padding: '10px 20px', borderRadius: '5px' }}
    >
      Confirm Booking
    </button>
  );
};

export default PrimaryButton;
```

---

#### 4. Props (Communication)
"Props" (short for properties) are how we pass data from a Parent component to a Child component. Props are **read-only** (Immutable).

**Real-World Case: Product Card for an E-commerce Site (e.g., Amazon)**
Instead of writing 100 HTML files for 100 products, we write **one** Component and pass different data via Props.

```jsx
// Child Component
const ProductCard = ({ title, price, isOnSale }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>Price: ${price}</p>
      {/* Conditional Rendering below */}
      {isOnSale && <span className="badge">Discount!</span>}
    </div>
  );
};

// Parent Component
const ProductList = () => {
  return (
    <section>
      <ProductCard title="iPhone 15" price={999} isOnSale={true} />
      <ProductCard title="Case" price={29} isOnSale={false} />
    </section>
  );
};
```

---

#### 5. Lists and Keys
When we have an array of data (from a database), we use `.map()` to render them. In React, every item in a list **must** have a unique `key` prop. This allows React to know exactly which item changed, making the app much faster.

**Professional Case (Rendering an Employee Directory):**
```jsx
const employees = [
  { id: 'emp_1', name: 'Sarah', role: 'Engineer' },
  { id: 'emp_2', name: 'Mike', role: 'Designer' },
];

const Directory = () => {
  return (
    <ul>
      {employees.map((person) => (
        // The 'key' must be a unique ID from your data
        <li key={person.id}>
          {person.name} - {person.role}
        </li>
      ))}
    </ul>
  );
};
```

---

#### 6. Conditional Rendering
Professionals don't show everything at once. We show content based on certain conditions (e.g., Is the user logged in? Is the data loading?).

*   **Ternary Operator (`? :`)**: Use for "Either/Or" logic.
*   **Logical AND (`&&`)**: Use for "Show if True" logic.

**Professional Case (Auth Status):**
```jsx
const Navbar = ({ isLoggedIn, userName }) => {
  return (
    <nav>
      {isLoggedIn ? (
        <span>Welcome back, {userName}</span>
      ) : (
        <button>Login</button>
      )}
    </nav>
  );
};
```

---

### Phase 1 Summary Checklist:
1.  **Thinking in Components**: Can I break a website screenshot into small boxes (components)?
2.  **Props Flow**: Do I understand that data flows **Down** (Parent to Child)?
3.  **JSX Mastery**: Do I know that `{}` is used to write JS logic inside HTML?
4.  **The Key Prop**: Do I remember to always add a unique `key` when using `.map()`?

---

### Project 1: The Professional Portfolio
**Goal:** Build a personal portfolio site using Vite.
*   **Requirement 1**: Create a `Header`, `ProjectList`, `ProjectCard`, and `Footer` component.
*   **Requirement 2**: Store your projects in an array of objects and use `.map()` to display them.
*   **Requirement 3**: Use Props to pass project titles and images to the `ProjectCard`.

**When you have built a basic component and passed data through Props, you are ready for Phase 2: State & Interactivity. Shall we continue?**
