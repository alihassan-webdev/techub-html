import { useParams } from 'react-router-dom';
import FreeCourses from '../components/FreeCourses';
import PaidCourses from '../components/PaidCourses';

const Courses = () => {
  const { type } = useParams();
  
  return (
    <div className="w-full">
      {type === 'free' ? <FreeCourses /> : <PaidCourses />}
    </div>
  );
};

export default Courses;
