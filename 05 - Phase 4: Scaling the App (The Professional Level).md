Phase 4 is where you stop building "apps" and start building **"Products."** In a professional company, apps have multiple pages (Routing), complex global data (Global State), and sophisticated styling systems.

This phase is about **Architecture**—how to organize a large codebase so that 50 developers can work on it without breaking everything.

---

### Phase 4: Scaling the App (The Professional Level)

#### 1. React Router v6+ (Client-Side Navigation)
React creates **Single Page Applications (SPA)**. This means the browser never actually "reloads"—React just swaps components based on the URL.

**Professional Case: An E-commerce App (e.g., Amazon or eBay)**
You need a Home page, a Product Detail page, and a Protected Checkout page.

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar /> {/* Stays visible on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Dynamic Routing: :id can be any product ID */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        {/* Redirect if page not found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
```
*   **Key Hook (`useParams`):** Inside the `ProductDetail` component, you use `useParams()` to grab the ID from the URL and fetch the specific product from your API.

---

#### 2. Global State Management (Solving "Prop Drilling")
In Phase 2, you "lifted state up." But if you need the "User Login Info" in 15 different components, passing it through 15 layers of props is a nightmare (**Prop Drilling**). 

**Professional Solution 1: Context API (Built-in)**
Best for "Static" global data like Themes (Dark/Light) or User Authentication.

```jsx
// src/context/AuthContext.js
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Alex", role: "Premium" });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Professional Solution 2: Zustand (Modern Industry Favorite)**
For "Dynamic" data like a Shopping Cart, companies now prefer **Zustand** because it is faster and easier than Redux.

```javascript
// src/store/useCartStore.js
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => set((state) => ({ items: [...state.items, product] })),
  clearCart: () => set({ items: [] }),
}));
```

---

#### 3. Professional Styling with Tailwind CSS
In a big company, you don't write thousands of lines of raw CSS. You use a utility-first framework like **Tailwind CSS**. It ensures consistency across the whole team.

**Professional Case: A Standardized Card Component**
```jsx
const Card = ({ title, description }) => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 border border-slate-200 hover:scale-105 transition-transform">
      <div>
        <div className="text-xl font-medium text-black">{title}</div>
        <p className="text-slate-500">{description}</p>
      </div>
    </div>
  );
};
```

---

#### 4. Advanced Form Management (React Hook Form)
Managing a form with 20 fields using `useState` is slow and causes unnecessary re-renders. Professionals use **React Hook Form**.

**Professional Case: User Registration with Validation**
```jsx
import { useForm } from 'react-hook-form';

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log("Clean Data:", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: "Email is required" })} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input type="password" {...register("password", { minLength: 8 })} />
      <button type="submit">Create Account</button>
    </form>
  );
};
```

---

#### 5. Folder Structure (Project Organization)
A professional React project doesn't put everything in one folder. It follows a structure like this:
```text
src/
  components/    # Reusable UI (Buttons, Cards)
  pages/         # Full pages (Home, Profile)
  hooks/         # Custom hooks
  context/       # Global state providers
  services/      # API call logic (Axios instances)
  assets/        # Images and global CSS
```

---

### Phase 4 Summary Checklist:
1.  **Multi-Page Logic**: Can I move between pages without the browser reloading?
2.  **Protected Routes**: Can I block a user from seeing the `/dashboard` if they aren't logged in?
3.  **State Logic**: Do I know when to use `useState` (local) vs `Context/Zustand` (global)?
4.  **Utility Styling**: Can I build a responsive layout quickly using Tailwind?

---

### Project 4: The Mini E-Commerce Platform
**Goal:** Build a functional store.
*   **Page 1 (Home):** Fetch all products and show them in a grid.
*   **Page 2 (Product Detail):** Click a product to see its specific details (using `useParams`).
*   **Page 3 (Cart):** Use **Zustand** to manage items added to the cart.
*   **Page 4 (Checkout):** A form with validation (using **React Hook Form**) to "buy" the items.
*   **Styling:** Use **Tailwind CSS** to make it look like a modern startup.

**When you can build a multi-page app with global data, you have reached the "Professional Junior/Mid" level. Ready for Phase 5: Advanced Patterns & Optimization?**
