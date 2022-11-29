import Layout from '@components/layout';
import Card from '@components/card';
import money from 'public/money.jpg';
import chemistry from 'public/chemistry.jpg';
import sign from 'public/sign.jpg';
import train from 'public/train.jpg';
import rel from 'public/rel.jpg';
import hall from 'public/hall.jpg';
import phone from 'public/phone.jpg';
import ios from 'public/ios.jpg';
import plant from 'public/plant.jpg';
import canada from 'public/canada.jpg';
import t from 'public/t.jpg';
import hromosome from 'public/hromosome.jpg';
import house from 'public/house.jpg';
import london from 'public/london.jpg';
import train2 from 'public/train2.jpg';
import sunset from 'public/sunset.jpg';
import ocean from 'public/ocean.jpg';
import medicine from 'public/medicine.jpg';
import shoe from 'public/shoe.jpg';

function Feed() {
    return (
        <Layout>
            <div className="flex lg:justify-start flex-wrap w-full">
                <Card img={money} />
                <Card img={chemistry} />
                <Card img={medicine} />
                <Card img={sign} />
                <Card img={train} />
                <Card img={sunset} />
                <Card img={plant} />
                <Card img={t} />
                <Card img={rel} />
                <Card img={phone} />
                <Card img={train2} />
                <Card img={hromosome} />
                <Card img={house} />
                <Card img={london} />
                <Card img={canada} />
                <Card img={ocean} />
                <Card img={shoe} />
            </div>
        </Layout>
    );
}

export default Feed;
