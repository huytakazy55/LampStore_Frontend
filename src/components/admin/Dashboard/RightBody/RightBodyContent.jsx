import React from 'react'
import AnalyticOverview from '../AnalyticOverview/AnalyticOverview'
import AnalyticChart from '../AnalyticChart/AnalyticChart'
import CalendarComponent from '../Calendar/Calendar'
import { Breadcrumbs, Link } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const RightBodyContent = () => {
  const {t} = useTranslation();
  return (
    <div>
        <div className='text-h2 font-semibold'>
          {t('HomePage')}
        </div>
        <div className='mb-4'>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link component={RouterLink} to="/admin" color="inherit">
              {t('Home')}
            </Link>
          </Breadcrumbs>
        </div>
        <AnalyticOverview />
            <div className='mb-8'>
                <AnalyticChart />
            </div>
            <div className='flex justify-between items-center'>
                <div className='w-4/6'>
                  
                </div>
                <div className='w-[30%]'>
                    <CalendarComponent />
                </div>
            </div>
    </div>
  )
}

export default RightBodyContent