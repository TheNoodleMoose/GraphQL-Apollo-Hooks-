import React, { useState } from "react";
import "./App.css";
import { Spring } from "react-spring/renderprops";
import styled from "@emotion/styled";
import { useQuery } from "react-apollo-hooks";
import { GET_CURRENT_TAB } from "./GraphQL/Queries/index";

import Tabs from "./tabs";

const GetCurrentTab = () => {
  const {
    data: {
      apolloClient: { currentTab }
    }
  } = useQuery(GET_CURRENT_TAB);

  return <div>{currentTab}</div>;
};

const App = () => {
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
          <Spring to={{ background: clicked ? "#68e879" : "#e86868" }}>
            {props => (
              <RatesButton style={props} onClick={() => setClicked(!clicked)}>
                Click Me
              </RatesButton>
            )}
          </Spring>
          {clicked ? <GetCurrentTab /> : null}
        </h2>
      </div>
    </Container>
  );
};

export default App;
