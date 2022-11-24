import Layout from '../../components/layout';
import Card from '../../components/card';
import money from '../../public/money.jpg';
import chemistry from '../../public/chemistry.jpg';
import sign from '../../public/sign.jpg';
import train from '../../public/train.jpg';
import rel from '../../public/rel.jpg';
import hall from '../../public/hall.jpg';
import phone from '../../public/phone.jpg';
import ios from '../../public/ios.jpg';
import plant from '../../public/plant.jpg';
import canada from '../../public/canada.jpg';
import t from '../../public/t.jpg';
import hromosome from '../../public/hromosome.jpg';
import house from '../../public/house.jpg';
import london from '../../public/london.jpg';
import train2 from '../../public/train2.jpg';
import sunset from '../../public/sunset.jpg';
import ocean from '../../public/ocean.jpg';
import medicine from '../../public/medicine.jpg';
import shoe from '../../public/shoe.jpg';

function Feed() {
    return (
        <Layout>
            <div className="flex lg:justify-start flex-wrap w-full">
                <Card img={money} marginRight />
                <Card img={chemistry} marginRight />
                <Card img={medicine} />
                <Card img={sign} marginRight />
                <Card img={train} marginRight />
                <Card img={sunset} />
                <Card img={plant} marginRight />
                <Card img={t} marginRight />
                <Card img={rel} />
                <Card img={phone} marginRight />
                <Card img={train2} marginRight />
                <Card img={hromosome} />
                <Card img={house} marginRight />
                <Card img={london} marginRight />
                <Card img={canada} />
                <Card img={ocean} marginRight />
                <Card img={shoe} marginRight />
            </div>
        </Layout>
    );
}

export default Feed;
