import React, { useState } from "react";
import "./App.css";
import { Spring } from "react-spring/renderprops";
import styled from "@emotion/styled";
import { useQuery } from "react-apollo-hooks";
import { GET_CURRENT_TAB, GET_CURRENCY } from "./GraphQL/Queries";

import Tabs from "./Tabs/tabs";

// Function that grabs the current tab and then renders that
const GetCurrentTab = () => {
  const { data } = useQuery(GET_CURRENT_TAB);

  const currentTab: string = data.apolloClient.currentTab;

  return <div>{currentTab}</div>;
};

const GetCurrency = () => {
  const { data, loading, error } = useQuery(GET_CURRENCY);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error! {error.message}</div>;

  return (
    <React.Fragment>
      {data.allFilms.films.map((films: { title: string }) => (
        <p key={films.title}>{films.title}</p>
      ))}
    </React.Fragment>
  );
};

const App = () => {
  // React Hooks for creating a clicked state for rending Tab Number
  const [clicked, setClicked] = useState(false);

  const RatesButton = styled.button`
    border-radius: 5px;
    width: 100px;
  `;

  const Container = styled.div`
    margin: 0 auto;
    display: flex;
    width: 800px;
    flex-direction: column;
    jusify-content: center;
  `;

  return (
    <Container>
      <div className="App">
        <h2>
          My First Apollo app!{" "}
          <span role="img" aria-label="rocket">
            🚀
          </span>
          <br />
          <Tabs />
          {/* Create a Spring Object for simple color animation, if clicked is either true or false a different color will be rendered */}
          <Spring to={{ background: clicked ? "#68e879" : "#e86868" }}>
            {props => (
              <RatesButton style={props} onClick={() => setClicked(!clicked)}>
                Click Me
              </RatesButton>
            )}
          </Spring>
          {/* If Clicked is true render a div with the current tab */}
          {clicked ? <GetCurrentTab /> : null}
        </h2>
        <GetCurrency />
      </div>
    </Container>
  );
};

export default App;
