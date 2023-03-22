import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import theme from "styles/theme";
import { BasePage, Home, Property, Login, Signup } from "pages";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
/**
 * Add error handling if user does CRUD via front-end and are not authorized (throw error for 401 status code)
 * Rating is missing from server response and database
 * Comments have their own API and are not associated with the corresponding Post
 *  - Can't update homepage comment amount
 *  - need to update ORM
 * Refine search function and remove window reloads/reduce API calls
 *  - set two lists: filteredPosts and Posts only work with filteredPosts after initial retrival
 * Add feature to allow comments to have comments
 * Return toast messages for CRUD actions on the page
 * Everything is return 201 - created
 * Saving user information on the file shows delete / edit btns when user is logged out
 * How to get new post a generated ID?
 */
root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <BasePage>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property" element={<Property />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BasePage>
    </BrowserRouter>
  </ChakraProvider>
);
