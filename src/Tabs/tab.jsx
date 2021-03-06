import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { Spring } from "react-spring/renderprops";

const Tabs = ({ title, active, onTabClick }) => {
  const arrow = css`
    ::after {
      color: transparent;
      content: "";
      position: absolute;
      bottom: 0;
      left: 7%;
      margin: auto;
      border-bottom: 6px solid white;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      width: 0;
    }
  `;

  const Tab = styled.div`
    display: flex;
    flex-direction: column;
    align-item: flex-start;
    background: ${props => (props.active ? "#007398" : "#3cc8e6")};
    width: 100%;
    height: 70px;
    font-size: 12px;
    color: white;
    position: relative;
    > p {
      margin-left: 10px;
      margin-top: 5px;
      margin-bottom: -10px;
    }
    :not(:last-child) {
      border-right: 1px solid white;
    }
    :hover {
      cursor: pointer;
      opacity: 0.7;
    }
    ${props => (props.active ? arrow : null)}
  `;
  return (
    <Spring to={{ background: active ? "#007398" : "#3cc8e6" }}>
      {props => (
        <Tab style={props} active={active} onClick={onTabClick}>
          <p>{title}</p>
        </Tab>
      )}
    </Spring>
  );
};

Tabs.propTypes = {
  title: PropTypes.string.isRequired,

  active: PropTypes.bool.isRequired,
  onTabClick: PropTypes.func
};

export default Tabs;
