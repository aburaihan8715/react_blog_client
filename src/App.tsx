import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { ContextProvider } from "./context/Context.js";

const App = () => {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
};

export default App;
