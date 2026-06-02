Phase 3 is where you move from building "UI Widgets" to building **"Data-Driven Applications."** In a professional setting, apps need to talk to servers, handle complex logic, and optimize performance so the website doesn't feel "laggy."

---

### Phase 3: Side Effects & Hooks (Mid-Level)

#### 1. The `useEffect` Hook (The Lifecycle Manager)
In React, a "Side Effect" is anything that happens *outside* the component’s return (HTML). Examples: fetching data from an API, setting up a timer, or manually changing the page title.

**The Rule:** Use `useEffect` to synchronize your component with an external system.

**Professional Case: Fetching Data on Page Load (e.g., Netflix Home)**
When you open Netflix, the app immediately fetches "Trending Movies." It only does this **once** when the component starts.

```jsx
import { useState, useEffect } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // This code runs when the component "Mounts" (appears)
    const loadMovies = async () => {
      const response = await fetch("https://api.example.com/trending");
      const data = await response.json();
      setMovies(data);
    };

    loadMovies();
  }, []); // 👈 Empty dependency array means "Run only once"

  return (
    <div>
      {movies.map(movie => <p key={movie.id}>{movie.title}</p>)}
    </div>
  );
};
```

---

#### 2. Advanced Data Fetching (Handling "Loading" & "Error" States)
Professional apps don't just fetch data; they handle the **User Experience (UX)** while the data is traveling over the internet.

**Professional Case: A Financial Dashboard (e.g., Stripe/PayPal)**
Users need to know if data is loading or if the internet failed.

```jsx
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/balance")
      .then(res => res.json())
      .then(result => {
        setData(result);
        setIsLoading(false);
      })
      .catch(err => {
        setError("Failed to load balance. Please refresh.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading your finances...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return <div>Balance: ${data.amount}</div>;
};
```

---

#### 3. `useRef` (Accessing the DOM directly)
Sometimes you need to "touch" the HTML directly, which React usually avoids. `useRef` is like a "Backdoor" to the DOM.

**Professional Case: Auto-focusing a Search Input**
When a user clicks a "Search" icon, you want the cursor to automatically appear in the input box.

```jsx
import { useRef } from 'react';

const SearchBox = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    // inputRef.current is the actual <input> element in the browser
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Click to Search</button>
    </>
  );
};
```

---

#### 4. Optimization: `useMemo` & `useCallback`
In large apps, React can sometimes re-render components too often, making the app slow.
*   **`useMemo`**: Remembers the **result** of a heavy calculation.
*   **`useCallback`**: Remembers a **function** so it isn't recreated every time.

**Professional Case: Filtering 5,000 Rows of Data**
You don't want to re-filter 5,000 rows every time a user clicks a "Like" button elsewhere on the page.

```jsx
import { useMemo } from 'react';

const UserList = ({ users, searchQuery }) => {
  // Only re-calculates if 'users' or 'searchQuery' changes
  const filteredUsers = useMemo(() => {
    console.log("Expensive filtering happening...");
    return users.filter(u => u.name.includes(searchQuery));
  }, [users, searchQuery]);

  return <div>{/* Render filteredUsers */}</div>;
};
```

---

#### 5. Custom Hooks (Code Reusability Expert)
In a professional company, we follow the **DRY** principle (**D**on't **R**epeat **Y**ourself). If you fetch data in 10 different components, you don't write `useEffect` 10 times. You create a **Custom Hook**.

**Professional Case: `useFetch` Hook**
```jsx
// src/hooks/useFetch.js
export function useFetch(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData);
  }, [url]);
  return data;
}

// In your component:
const Profile = () => {
  const user = useFetch("/api/user/1"); // Clean and professional!
  return <div>{user?.name}</div>;
};
```

---

#### 6. `useReducer` (Managing Complex State)
When your state becomes complex (e.g., a Shopping Cart with `add`, `remove`, `clear`, `applyDiscount`), `useState` becomes messy. `useReducer` is the professional alternative.

---

### Phase 3 Summary Checklist:
1.  **useEffect Dependencies**: Do I understand that `[props]` means "Run when this prop changes" and `[]` means "Run once"?
2.  **API Integration**: Can I fetch data and handle the "Loading..." state properly?
3.  **Cleanup Functions**: Do I know how to stop a timer or an API call if a user leaves the page? (To prevent memory leaks).
4.  **Custom Hooks**: Can I move logic out of a component into a reusable function?

---

### Project 3: The Recipe Explorer (API Project)
**Goal:** Build an app that connects to a real API (like **Edamam** or **TheMealDB**).
*   **Feature 1:** Fetch recipes based on a search keyword (e.g., "Chicken").
*   **Feature 2:** Use a "Loading Spinner" while data is being fetched.
*   **Feature 3:** Build a Custom Hook `useLocalStorage` to save "Favorite Recipes" so they stay there even if the user refreshes the page.
*   **Feature 4:** Use `useRef` to create a "Back to Top" button that scrolls the page.

**Once you can connect your app to the "Outside World" (APIs) and optimize it, you are ready for Phase 4: Scaling the App (Routing and Global State). Shall we proceed?**
