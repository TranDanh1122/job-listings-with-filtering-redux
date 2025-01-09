import './App.css'
import React from 'react'
import JobItem from './components/JobItem'
import Category from './components/Category'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from './app/store';
import { applyFilter, clear, fetchJobs } from './feature/FilterJobList'
function App() {
  const { filteredData, filter } = useSelector((state: RootState) => state.app)
  const dispatch: AppDispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchJobs())
  }, [])
  React.useEffect(() => {
    dispatch(applyFilter())
  }, [filter])
  const handleClear = () => {
    dispatch(clear())
  }
  return (
    <>
      <header className='bg-contain bg-top bg-fixed bg-dark_cyan bg-[url(./assets/images/bg-header-desktop.svg)] mb:bg-[url(./assets/images/bg-header-mobile.svg)] w-full h-[150px] bg-no-repeat'></header>
      {
        (filter.length > 0) ?
          <div className='container mb:max-w-none bg-white py-5 px-10 flex items-center translate-y-[-50%]'>
            <div className='flex flex-wrap gap-6 gap-y-4'>

              {filter.map((el: string, index: number) => <Category text={el} key={index} isFilter={true} />)}
            </div>
            <span onClick={() => handleClear()} className='uppercase text-dark_cyan leading-6 tracking-[-0.12px] font-bold hover:underline ml-auto cursor-pointer'>clear</span>
          </div>
          : ""
      }


      <div className='container mb:max-w-none  flex flex-col gap-6 mb:gap-10 mt-20'>
        {
          filteredData.map(el => <JobItem key={el.id} job={el} />)
        }
      </div>
    </>
  )
}

export default App
