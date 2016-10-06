import React                from 'react';
import ReactDom             from 'react-dom';
import MainWindowComponent  from './views/main-window.jsx';

/**
 *
 * There is strange behavior of electron's require implementation
 * Relative module path should be relative on builded application
 * or should be in node_modules.
 */

var entryNode = document.getElementById('react-entry-point');

ReactDom.render(
    <MainWindowComponent/>,
    entryNode
);

