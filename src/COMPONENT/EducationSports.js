import React from 'react'
import Popularpost from '../Sidebar/Popularpost'
import Article from '../Template/Article'

function EducationSports({page_name,agencyDetails,breakingNews}) {
    return (
        <div className='row'>
            <div className='col-md-8 col-sm-8'>
                <Article page_name={'Home_Page'} agencyDetails={agencyDetails} breakingNews={breakingNews}/>
            </div>
            <div className='col-md-4 col-sm-4'>
                <Popularpost page_name={'Home_Page'} agencyDetails={agencyDetails} breakingNews={breakingNews}/>
            </div>
        </div>
    )
}

export default EducationSports