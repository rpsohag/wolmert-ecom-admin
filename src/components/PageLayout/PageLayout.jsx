import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

const PageLayout = () => {
  return (
    <>
   <div className="main-wrapper">
		<Header/>
         <Sidebar/>
        
          <div className="page-wrapper">
    
              <div className="content container-fluid">
        

        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Welcome Admin!</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item active">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>


        <Outlet/>
      
      </div>			
    </div>
      </div>
    </>
  )
}

export default PageLayout