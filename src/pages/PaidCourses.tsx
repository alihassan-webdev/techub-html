import React from 'react';
import PaidCourses from '../components/PaidCourses';
import withPageLoading from '../components/hoc/withPageLoading';

const PaidCoursesPage = () => {
  return <PaidCourses />;
};

export default withPageLoading(PaidCoursesPage, {
  loadingMessage: 'Loading Paid Courses...',
  minLoadingTime: 600,
});
