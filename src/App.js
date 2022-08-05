import "./App.css";
import React, { Component } from "react";
import Navbar from "./Component/Navbar/Navbar";
import News from "./Component/News/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 8;

  state = { progress: 0 };
  
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <Router>
        <LoadingBar height={3} color="#000" progress={this.state.progress} />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <News setProgress={this.setProgress} key="home" pageSize={this.pageSize} />
          </Route>
          <Route exact path="/general">
            <News setProgress={this.setProgress} key="general" pageSize={this.pageSize} category="general" />
          </Route>
          <Route exact path="/health">
            <News setProgress={this.setProgress} key="health" pageSize={this.pageSize} category="health" />
          </Route>
          <Route exact path="/science">
            <News setProgress={this.setProgress} key="science" pageSize={this.pageSize} category="science" />
          </Route>
          <Route exact path="/sports">
            <News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} category="sports" />
          </Route>
          <Route exact path="/technology">
            <News
              key="technology"
              pageSize={this.pageSize}
              category="technology"
            />
          </Route>
          <Route exact path="/entertainment">
            <News
              key="entertainment"
              pageSize={this.pageSize}
              category="entertainment"
            />
          </Route>
          <Route exact path="/business">
            <News setProgress={this.setProgress} key="buisness" pageSize={this.pageSize} category="business" />
          </Route>
        </Switch>
      </Router>
    );
  }
}
