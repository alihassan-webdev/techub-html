import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../Header';
import Footer from '../Footer';

const Layout = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0, 1],
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0, 1],
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background smooth-rendering">
      <Header />
      <motion.main
        className="flex-grow pt-0 mt-0 relative overflow-visible"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="w-full overflow-visible">
          <Outlet />
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
