import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pack } from "@potion/layout";
import { Svg, Circle } from "@potion/element";

import styled from 'styled-components';

const LogoutButton = styled.div`
    position: absolute;
    margin-top: 0px;
    right: 15px;
    text-align: center;
    width: 7%;
    background: #3c68ae;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 3px;
    cursor: pointer;
    outline: none;
    border: none;
    padding: 10px;
    box-shadow: 0 3px 0 0 rgba(0, 0, 0, 0.507);
    margin: 35px;
`;

const Bubbles = ({ colors, props }) => {
  const [bubbleData, setBubbleData] = useState([]);
  useEffect(() => {
    const generateBubbleData = colors.map((_, i) => ({
      value: Math.floor(Math.random() * (colors.length * 2)) + 1,
      key: `${i + 1}`
    }));
    setBubbleData(generateBubbleData);
  }, [colors]);

   
  return (

    

    <div className="bubble-wrap">

    <Link to = "/"> <LogoutButton> Log Out</LogoutButton> </Link>

      <p>bubbles</p>
      <Svg width={400} height={400}>
        <Pack
          data={{
            children: bubbleData
          }}
          sum={datum => datum.value}
          size={[400, 400]}
          includeRoot={false}
          nodeEnter={d => ({ ...d, r: 0 })}
          animate
        >
          {nodes =>
            nodes
              .map(({ x, y, r, key }, i) => {
                if (i < colors.length) {
                  return (
                    <Circle
                      key={key}
                      cx={x}
                      cy={y}
                      r={r}
                      fill={colors[i].code.hex}
                    />
                  );
                }
                return null;
              })
              .filter(v => v)
          }
        </Pack>
      </Svg>
    </div>
  );
};

export default Bubbles;
