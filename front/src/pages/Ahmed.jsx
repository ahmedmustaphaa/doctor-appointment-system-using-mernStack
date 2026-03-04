import React from 'react'

function Ahmed() {

    const today=new Date();
     
    for(let i=0 ; i<7  ;i++){
        let currData=new Date(today);

        currData.setDate(today.getDate()+i)
      

        const endTime=new Date(currData);
        endTime.setHours(21,0,0,0)
        console.log(endTime)
    }
    
  return (
    <div className='pt-20'>
     <h1 className='text-[black]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae non eligendi in voluptatem delectus officia quibusdam excepturi. Quibusdam libero cum repellat, velit, iusto neque porro similique perferendis, beatae temporibus eius!</h1>
    </div>
  )
}

export default Ahmed
