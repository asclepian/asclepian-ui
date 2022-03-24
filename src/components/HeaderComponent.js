import React from "react";
import styled from "styled-components";
const HeaderDiv = styled.div`
grid-area: header;
background:${props=>props.theme.secondary};
color:${props=>props.theme.dominant};
border-radius: 25px 0px 25px 0px;
padding: 5px;
font-size: 2em;
`;
export default function Header(){
    return (<HeaderDiv>Header</HeaderDiv>)
}
