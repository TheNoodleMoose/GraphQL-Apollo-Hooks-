import React, { useState } from "react";
import "./App.css";
import { Spring } from "react-spring/renderprops";
import styled from "@emotion/styled";
import { useQuery } from "react-apollo-hooks";
import { GET_CURRENT_TAB } from "./GraphQL/Queries/index";

import Tabs from "./Tabs/tabs";

// Function that grabs the current tab and then renders that
const GetCurrentTab = () => {
  const {
    data: {
      apolloClient: { currentTab }
    }
  } = useQuery(GET_CURRENT_TAB);

  return <div>{currentTab}</div>;
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
      </div>
    </Container>
  );
};

export default App;
