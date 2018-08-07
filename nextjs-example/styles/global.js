import { injectGlobal } from 'styled-components';
import COLOR from './colors';

injectGlobal`
  html, body, div, span, h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code, del, dfn, em, q, s, samp,
  small, strike, strong, sub, sup, tt, b, u, i, center, dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, figure, figcaption, footer, header, hgroup, menu, nav, output,
  section, summary, time, mark {
    font-family: 'Source Sans Pro'
  }
  
  html,
  body {
    height: 100%;
    min-height: 100vh;
    background-color: ${COLOR.GRAY_850};
    line-height: 1;
    font-family: 'Source Sans Pro';
    font-size: 16px;
    color: ${COLOR.GRAY_400};
  }
  
  #__next {
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  ul {
    list-style: none;
  }
  
  a {
    text-decoration: none;
  }
  
  p {
    padding: 0;
    margin: 0;
  }
  
  td, th {
    vertical-align: middle;
  }
 
`;
