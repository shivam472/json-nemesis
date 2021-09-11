import "./App.css";

import UsersTable from "./components/UsersTable";
import FormContextProvider from "./components/context/FormContextProvider";

function App() {
  return (
    <FormContextProvider>
      <h1 style={{ color: "white" }}>Json Users</h1>
      <UsersTable />
    </FormContextProvider>
  );
}

export default App;
