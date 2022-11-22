import Layout from '../components/layout';
import Card from '../components/card';

function HomePage() {
    return (
        <Layout>
            HomePage
            <div className="flex justify-start flex-wrap w-full">
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </Layout>
    );
}

export default HomePage;
