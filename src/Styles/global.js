import {createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
body{
    margin: 0;
    padding: 0;
}
.top-element {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    background-color: #EBEBEB;
}
.tool-bar-parent {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 24px;
    z-index: 5;
    width: max-content;
    height: max-content;
    padding: 12px 12px;
    border-radius: 8px;
    background-color: #ffffff;
    gap: 10px;
  
}
.tool-wrapper {
    display: flex;  
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    padding: 8px 10px;
    border-radius: 8px;
} 
.tool-wrapper:hover {
    cursor: pointer;
    background-color: #fff0f3;
}
.selected-tool {
    transition: background-color 200ms linear;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    padding: 8px 10px;
    border-radius: 8px;
    background-color: #ffb3c1;
}
`