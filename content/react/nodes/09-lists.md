---
title: "Rendering lists"
icon: "📋"
branch: "rendering"
requires: ["conditional-rendering", "children"]
summary: "Transform data into elements with map and filter."
---
**Recipe: turn an array of data into a list on screen.**

**Ingredients:**

```jsx
const recipes = [
  { id: 1, name: "Pancakes", minutes: 20, vegan: false },
  { id: 2, name: "Chili", minutes: 45, vegan: true },
  { id: 3, name: "Salad", minutes: 10, vegan: true },
];
```

**Step 1: `map` each item to an element.** Arrays of elements render one after another:

```jsx
function RecipeList() {
  return (
    <ul>
      {recipes.map(recipe => (
        <li key={recipe.id}>
          {recipe.name}, {recipe.minutes} min
        </li>
      ))}
    </ul>
  );
}
```

Don't worry about `key` yet; it gets [its own lesson](node:keys). For now: each item needs one, and it's usually the item's id.

**Step 2: `filter` first, to show a subset.**

```jsx
const quick = recipes.filter(recipe => recipe.minutes <= 20);
```

**Step 3: sort a copy.** `sort` changes the array in place, which you don't want to do to data you were given. Copy it first, or use `toSorted`:

```jsx
const byTime = recipes.toSorted((a, b) => a.minutes - b.minutes);
```

**Step 4: give each item its own component**, once the markup grows:

```jsx
{byTime.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
```

Note that the `key` goes on the outermost element **inside** the `map`, which is `RecipeCard` here.

**Serve with an empty state:**

```jsx
if (quick.length === 0) return <p>Nothing quick today.</p>;
```

## Kitchen accident: the vanishing list

```jsx
{recipes.map(recipe => { <li>{recipe.name}</li>; })}
```

Nothing shows. The curly braces after `=>` start a function **body**, and a body needs `return`. Either add `return`, or use parentheses, `recipe => ( <li>...</li> )`, which return the value directly.

```compare javascript
// The same map, building HTML strings instead:
list.innerHTML = recipes.map(r => `<li>${r.name}</li>`).join("");
```

```exercise
goal: "The callback has a body in braces, but no `return`, so nothing is shown. Add `return`."
lang: jsx
code: |
  export default function Names() {
    return <ul>{["Ada", "Grace"].map(name => { <li key={name}>{name}</li>; })}</ul>;
  }
checks:
  - match: 'name\s+=>\s+\{\s+return\s+<li'
    message: "Add return inside the braced callback."
hint: The return goes right before the li element.
solution: |
  export default function Names() {
    return <ul>{["Ada", "Grace"].map(name => { return <li key={name}>{name}</li>; })}</ul>;
  }
```

```quiz
question: "Why use `toSorted` (or a copy) instead of `sort` on an array from props?"
options:
  - sort is slower.
  - sort changes the original array, which belongs to someone else.
  - sort doesn't work on objects.
answer: 1
explain: Changing data you received leads to confusing bugs. toSorted returns a new array.
```
