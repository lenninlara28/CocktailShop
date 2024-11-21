import { SnackbarProvider } from "notistack";
import { AppRouter } from "./routes";
import { useUserStore } from "@stores";

const App = () => {
  useUserStore.persist.rehydrate();

  return (
    <SnackbarProvider
      style={{ borderRadius: "16px" }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={1500}
      maxSnack={3}
    >
      <AppRouter />
    </SnackbarProvider>
  );
};

export default App;
