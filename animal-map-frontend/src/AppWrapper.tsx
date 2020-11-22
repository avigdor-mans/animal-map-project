import React from "react";
import App from "./App";
import { CssBaseline } from "@material-ui/core";
import {
  makeStyles,
  StylesProvider,
  ThemeProvider,
} from "@material-ui/core/styles";
import { baseTheme } from "./theme/Theme";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

interface IProps {}

export const AppWrapper = React.memo<IProps>((props) => {
  return (
    <Router>
      <StylesProvider injectFirst>
        <ThemeProvider theme={baseTheme}>
          <App /> <CssBaseline />
        </ThemeProvider>
      </StylesProvider>
    </Router>
  );
});