"use client"
// IMPORTS
import AppProvider from "./contexts/AppProvider";
import bg from "../app/assets/img/bg.jpg" //background image

// SCRIPTS

// COMPONENTS
import StateProvider from "./state";

import { LeftPanel } from "./components/left_panel/index";
import { MainPanel } from "./components/main_panel/index";
import { RightPanel } from "./components/right_panel/index";

import DebugPanel from "./components/DebugPanel"
import TopNavBar from "./components/TopNavBar";

export default function Home() {
  return (
    <AppProvider children={
          <>
            <div className='-z-20 absolute w-screen overflow-hidden square-background'>
              <img src={bg.src} className='opacity-50 saturate-100' />
            </div> 

            <TopNavBar isHomepage={false}/>

            <div className='relative flex flex-row gap-3 pt-4 px-4 2xl:px-20'>
              <LeftPanel />
              <MainPanel />

              {/* <div className='z-40 absolute right-0 top-0'>
                <button
                  className={'w-6 h-32 translate-y-100 bg-yellow-300 rounded-l-lg content-center' +(showDebug && " -translate-x-6")}
                  onClick={() => { setShowDebug(!showDebug)} }>
                  { showDebug ? <ChevronDoubleRightIcon className='text-black'/> : <ChevronDoubleLeftIcon className='text-black'/> }
                </button>
                
                { 
                  showDebug ? <DebugPanel /> : <></>
                }
              </div> */}
              <RightPanel />
            </div>
          </>
        } 
    />
  );
}
