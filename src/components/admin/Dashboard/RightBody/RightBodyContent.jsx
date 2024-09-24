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
        <div className='RightBody-title'>
          {t('HomePage')}
        </div>
        <div className='RightBody-breadcrumbs'>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link component={RouterLink} to="/" color="inherit">
              {t('Home')}
            </Link>
          </Breadcrumbs>
        </div>
        <AnalyticOverview />
            <div className='RightBody-analyticchart'>
                <AnalyticChart />
            </div>
            <div className='RightBody-bottom'>
                <div className='RightBody-bottom-category'>

                </div>
                <div className='RightBody-bottom-calendar'>
                    <CalendarComponent />
                </div>
            </div>
    </div>
  )
}

export default RightBodyContent