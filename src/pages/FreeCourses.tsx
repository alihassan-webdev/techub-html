import React from 'react';
import FreeCourses from '../components/FreeCourses';
import withPageLoading from '../components/hoc/withPageLoading';

const FreeCoursesPage = () => {
  return <FreeCourses />;
};

export default withPageLoading(FreeCoursesPage, {
  loadingMessage: 'Loading Free Courses...',
  minLoadingTime: 600,
});
