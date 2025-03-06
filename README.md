## [vite](https://vitejs.dev/) + [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) Starter

This setup includes:

- [vite](https://vitejs.dev/)
- [eslint](https://eslint.org/), [typescript-eslint](https://typescript-eslint.io/), [eslint-airbnb-config](https://github.com/airbnb/javascript), [prettier](https://prettier.io/)
- [vitest](https://vitest.dev/), [jsdom](https://github.com/jsdom/jsdom), [@testing-library](https://testing-library.com/)
- [react-router v6](https://reactrouter.com/en/main)

# What does this Merge Request do?

## Queries

### 1. Fetching Currency Rates

We first fetch the currency rates using useGetCurrenciesRates, which makes an API call to retrieve the exchange rates for different currencies. These rates are cached by TanStack Query, avoiding unnecessary repeated requests.

### 2. Fetching and Transforming Transactions

Once the rates are available, useGetTransactions fetches the transaction data and applies a transformation to convert amounts using the fetched rates. The select option ensures the transformation happens before returning the data, and the enabled flag ensures transactions are only fetched after rates are loaded.

### Benefits of TanStack Query:

- Automatic Caching: Avoids refetching data that hasn't changed, improving performance and reducing redundant API calls.
- Background Fetching: Keeps data fresh by automatically refetching in the background when needed (e.g., when the component is re-mounted).
- Optimistic Updates: Supports optimistic UI updates for faster interactions.
- Declarative Data Fetching: Allows for easy integration of async logic, making code simpler and more maintainable.
- Error and Loading States: Automatically handles loading, error, and success states, reducing boilerplate code.

## Reasoning and Design Pattern

The TransactionsList component implements a generic table management system that displays a list of transactions, allowing for features like sorting and selection. The design pattern primarily used here is Container-Presenter.

- Container: The component handles the business logic of data fetching, state management (sorting, selection), and data transformation (sorting and preparing data for display).
- Presenter: The DataTable component acts as a presenter, responsible for rendering the table structure and passing user interactions (e.g., sorting, row selection) back to the container.

## Benefits of this Approach:

- Separation of Concerns: The business logic (sorting, selection) is separated from the presentation (table rendering), making the code easier to maintain and extend.
- Reusability: The DataTable component is designed generically, which can be reused for other data types by simply providing the appropriate columns and data.
- State Management: The Set for selected rows ensures an efficient and clean way to handle multiple selections without duplicates.
- Asynchronous Handling: By using isLoading and error, the component gracefully handles asynchronous data fetching, improving user experience.
