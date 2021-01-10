import React from 'react'


function SidebarTarget(){
  return(
    <div className="sidebar sidebar-target">
      <p>Финансовые цели удобны, когда требуется накопить сумму на какую-то серьезную трату.
Добавьте собственные цели или воспользуйтесь примерами ниже.</p>
    </div>
  )
}

function Content(){
  return(
      <div className="content target_content">
        <div className="pagetitle">
                  Финансовые цели
        </div>
         
      </div>
  )
}


function TargetPage(){
    
      return (
      <div>
        
            <div className="page-box">

                <Content/>
                <SidebarTarget/>

            </div>
      </div>
      );
}

export default TargetPage;