import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box; 
    }
    html {
        font-family: 'HelveticaNeue', Helvetica, Arial, 'Lucida Grande', sans-serif;
    }
    body {
        background-color: #01324E;
        font-family: Roboto, "Helvetica Neue", Helvetica, Arial, "PingFang TC", 黑體-繁, "Heiti TC", 蘋果儷中黑, "Apple LiGothic Medium", 微軟正黑體, "Microsoft JhengHei", sans-serif;
    }
    a {
        display: block;
    } 
    img {
        width: 100%;
        height: 100%;
    }
`;

export default GlobalStyle;
