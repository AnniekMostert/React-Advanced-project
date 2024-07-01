import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { EventsPage, loader as eventsLoader } from "./pages/EventsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { AddEvent, loader as addEventLoader } from "./pages/AddEvent";
import { inputTheme } from "./theming/inputTheme";
import { buttonTheme } from "./theming/buttonTheme";
import { checkboxTheme } from "./theming/checkboxTheme";
// import { dividerTheme } from "./theming/dividerTheme";

export const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "red.700",
        width: "100%",
      },
    },
  },
  components: {
    Input: inputTheme,
    Button: buttonTheme,
    Checkbox: checkboxTheme,
    // Divider: dividerTheme,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventLoader,
      },
      {
        path: "/add-event",
        element: <AddEvent />,
        loader: addEventLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
