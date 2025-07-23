import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./components/Sidebar";
import { BrowserRouter } from "react-router-dom";

library.add(fas);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
    };
  }

  toggleTheme = () => {
    this.setState((prevState) => {
      const newTheme = prevState.theme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      return { theme: newTheme };
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Sidebar color={this.state.theme} toggleTheme={this.toggleTheme} />
      </BrowserRouter>
    );
  }
}
