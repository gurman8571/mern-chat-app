import React from 'react'

export default function SearchResults({key,user}) {
  
  return (
    <>
    <div className="w-60 h-24 border-2 rounded-md mx-auto mt-20">
  <div className="flex flex-row items-center h-full space-x-5">
    <div className="flex flex-col space-y-3">
      <div className="w-48 bg-gray-300 h-12 rounded-md "></div>
    {user.name}
    </div>
  </div>
</div> 
    </>
  )
}
