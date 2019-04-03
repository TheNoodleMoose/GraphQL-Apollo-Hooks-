import React from "react";
import styled from "@emotion/styled";
import { GET_CURRENT_TAB, UPDATE_CURRENT_TAB } from "../GraphQL/Queries";
import _ from "lodash";
import { useMutation, useQuery } from "react-apollo-hooks";
import Tab from "./tab";

const TabsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-radius: 5px 5px 0px 0px;
  overflow: hidden;
`;

// Our Tabs Config for each of our three tabs
const TabsConfig = [
  {
    title: "ONE",
    key: "ONE"
  },
  {
    title: "TWO",
    key: "TWO"
  },
  {
    title: "THREE",
    key: "THREE"
  }
];

// Tabs function for rendering our tabs
const Tabs = () => {
  // grab our loading state and then the data from our GET_CURRENT_TAB query
  const { loading, data } = useQuery(GET_CURRENT_TAB);
  // We create a function that runs our UPDATE_CURRENT_TAB mutation
  const updateCurrentTab = useMutation(UPDATE_CURRENT_TAB);

  // On tab click, grab the name value, if there is none than return. If there is a value than run updateCurrentTab with name as the variable
  const onTabClick = name => {
    if (!name) {
      return;
    }
    updateCurrentTab({ variables: { name } });
  };

  // If loading is true render a div that says loading
  if (loading) {
    return <div>Loading</div>;
  }

  // Grab out current tab from our apolloClient data
  const {
    apolloClient: { currentTab }
  } = data;

  return (
    <TabsContainer>
      {_.map(TabsConfig, tab => (
        <Tab
          key={tab.key}
          // If the current tab equals the tab key, than active is true, used for rendering tab background
          active={currentTab === tab.key}
          onTabClick={() => onTabClick(tab.key)}
          title={tab.title}
        />
      ))}
    </TabsContainer>
  );
};

export default Tabs;
