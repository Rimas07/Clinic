import React from "react";
import { Box } from "./screens/box";
import { I18nProvider } from "./lib/i18n";

function App() {
  return (
    <I18nProvider>
      <Box />
    </I18nProvider>
  );
}

export default App;
