import ChartLoader from './ChartLoader';
import CustomBarLineChart from './CustomBarLineChart';

const Home = () => (
    <main
        style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem' }}
    >
        <CustomBarLineChart />
        <ChartLoader />
    </main>
);

export default Home;
