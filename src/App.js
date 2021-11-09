import styled from "styled-components";
import Footer from "./Components/Footer";
import React, { useContext } from "react";
import Header from "./Components/Header/Header";
import CountryDetail from "./Components/CountryDetail/CountryDetail";
import { ThemeContext } from "./Components/ThemeContext/ThemeContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Pages from "./Components/Pages/Pages";

const HOME_PATH = process.env.REACT_APP_PUBLIC_URL;

function App(props) {
  const themeContext = useContext(ThemeContext);

  return (
    <AppContainer className={themeContext.theme}>
      <Router>
        <Header />
        <ContentContainer>
          <Switch>
            <Route exact path={HOME_PATH} component={Pages}/>

            <Route path={`${HOME_PATH}region/:regionName`} component={Pages}/>

            <Route path={`${HOME_PATH}search/:name`} component={Pages}/>

            <Route path={`${HOME_PATH}country/:countryName`} component={CountryDetail}/>         
            
          </Switch>
        </ContentContainer>
        <Footer />
      </Router>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  max-width: 1280px;
  display: block;
  width: 100%;
  margin: 0 auto;
  padding: 0 12px;  
`;
