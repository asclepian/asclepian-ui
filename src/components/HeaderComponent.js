import React from "react";
import styled from "styled-components";
const HeaderDiv = styled.div`
grid-area: header;
background:${props=>props.theme.secondaryDark};
color:${props=>props.theme.dominant};
border-radius: 1em 0em 0em 0em;
padding: 0em 0em 0em 1em;
font-size: 2em;
`;
export default function Header(){
    return (<HeaderDiv>Header</HeaderDiv>)
}
