import React from 'react';
import {createDevTools} from 'redux-devtools';
// import * as themes from 'redux-devtools-themes';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor';
import Inspector from 'redux-devtools-inspector';
import SliderMonitor from 'redux-slider-monitor';
import ChartMonitor from 'redux-devtools-chart-monitor';
import MultipleMonitors from 'redux-devtools-multiple-monitors';
import FilterMonitor from 'redux-devtools-filter-actions';
import Dispatcher from 'redux-devtools-dispatch';
import DiffMonitor from 'redux-devtools-diff-monitor';

// somewhere in your monitor component
// https://github.com/chriskempson/base16

// const themeArr = [
//     'threezerotwofour','apathy','ashes','atelierDune','atelierForest'
//     ,'atelierHeath','atelierLakeside','atelierSeaside','bespin','brewer'
//     ,'bright','chalk','codeschool','colors','eighties'
//     ,'embers','flat','google','grayscale','greenscreen'
//     ,'harmonic','hopscotch','isotope','marrakesh','mocha'
//     ,'monokai','ocean','paraiso','pop','railscasts'
//     ,'shapeshifter','solarized','summerfruit','tomorrow','tube'
//     ,'twilight','nicinabox'
// ]

// Restyled to look like chrome default theme
const Custom = {
  author: "Roman Yudin (https://github.com/darmikon)",
  base0A: "_",
  base0B: "#C80000", //key color
  base0C: "_",
  base0D: "#6A6A6A", //properties color
  base0E: "_",
  base0F: "_",
  base00: "white", //bg
  base01: "_",
  base02: "#C9C9C9", //action title bg
  base03: "black",
  base04: "_",
  base05: "_",
  base06: "#333333", //action title color
  base07: "_",
  base08: "_",
  base09: "_",
  scheme: "Custom"
};

// Stripping big data which slows down DevTools Monitor
const actionsFilter = (action) => (
  action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
    { ...action, data: '<<LONG_BLOB>>' } : action
);

export default createDevTools(
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               changeMonitorKey='ctrl-m'
               expandActionRoot={false}
               expandStateRoot={false}
               defaultIsVisible={true}
               defaultSize={0.3}
               defaultPosition={'bottom'}>
    <Inspector />
    <MultipleMonitors theme={Custom}>
      <FilterMonitor
        //blacklist={['@@router/LOCATION_CHANGE']}
        actionsFilter={actionsFilter}
        statesFilter={(state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state}>
        <LogMonitor />
        {/*<LogMonitor theme = 'ashes' />*/}
      </FilterMonitor>
      <Dispatcher />
    </MultipleMonitors>
    <DiffMonitor />
    <FilterableLogMonitor theme={Custom} />
    <SliderMonitor keyboardEnabled />
    <ChartMonitor transitionDuration={10}
                  widthBetweenNodesCoeff={1} />
    {/*<Dispatcher />*/}
  </DockMonitor>
);