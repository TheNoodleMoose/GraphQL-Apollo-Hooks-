import React from "react";

import styled from "@emotion/styled";
import { GET_CURRENT_TAB, UPDATE_CURRENT_TAB } from "./GraphQL/Queries";
import _ from "lodash";
import { useMutation, useQuery } from "react-apollo-hooks";
import Tab from "./tab";

const TabsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-radius: 5px 5px 0px 0px;
  overflow: hidden;
`;

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

const Tabs = () => {
  const { loading, data } = useQuery(GET_CURRENT_TAB);
  const updateCurrentTab = useMutation(UPDATE_CURRENT_TAB);

  const onTabClick = name => {
    if (!name) {
      return;
    }
    updateCurrentTab({ variables: { name } });
  };

  if (loading) {
    return <div>Loading</div>;
  }

  const {
    apolloClient: { currentTab }
  } = data;

  return (
    <TabsContainer>
      {_.map(TabsConfig, tab => (
        <Tab
          key={tab.key}
          active={currentTab === tab.key}
          onTabClick={() => onTabClick(tab.key)}
          title={tab.title}
        />
      ))}
    </TabsContainer>
  );
};

export default Tabs;
