import Gallery from '../components/Gallery';
import withPageLoading from '../components/hoc/withPageLoading';

const GalleryPage = () => {
  return <Gallery />;
};

export default withPageLoading(GalleryPage, {
  loadingMessage: 'Loading Gallery...',
  minLoadingTime: 800,
});
