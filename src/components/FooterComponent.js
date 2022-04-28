import React from "react";
import styled from "styled-components";

const FooterDiv = styled.div`
grid-area: footer;
color: ${props => props.theme.dominant};
background: ${props => props.theme.secondaryLight};
`;
export default function Footer() {
    return (<FooterDiv>Footer</FooterDiv>)
}
