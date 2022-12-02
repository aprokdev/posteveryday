import Layout from '@components/layout';
import Card from '@components/card';
import money from 'public/money.jpg';
import chemistry from 'public/chemistry.jpg';
import sign from 'public/sign.jpg';
import train from 'public/train.jpg';
import rel from 'public/rel.jpg';
import hall from 'public/hall.jpg';
import phone from 'public/phone.jpg';

import plant from 'public/plant.jpg';
import canada from 'public/canada.jpg';
import t from 'public/t.jpg';
import hromosome from 'public/hromosome.jpg';
import butterfly from 'public/butterfly.jpg';
import london from 'public/london.jpg';
import skyscrapper from 'public/skyscrapper.jpg';
import sunset from 'public/sunset.jpg';
import ocean from 'public/ocean.jpg';
import medicine from 'public/medicine.jpg';
import shoe from 'public/shoe.jpg';
import cancer from 'public/cancer.jpg';
import car from 'public/car.jpg';
import cat from 'public/cat.jpg';
import door from 'public/door.jpg';
import kitchen from 'public/kitchen.jpg';
import meat from 'public/meat.jpg';
import willa from 'public/willa.jpg';
import woman from 'public/woman.jpg';

export default function MyPosts() {
    return (
        <Layout>
            <div className="flex lg:justify-start flex-wrap w-full">
                <Card img={butterfly} animate />
                <Card img={cancer} animate />
                <Card img={car} animate />
                <Card img={cat} animate />
                <Card img={door} animate />
                <Card img={hromosome} animate />
                <Card img={willa} animate />
                <Card img={woman} animate />
                <Card img={kitchen} animate />
                <Card img={skyscrapper} animate />
                <Card img={plant} animate />
                <Card img={canada} animate />
                {/* <Card img={train} animate />
                <Card img={money} animate />
                <Card img={chemistry} animate />
                <Card img={medicine} animate />
                <Card img={sign} animate />
                <Card img={sunset} animate />
                <Card img={t} animate />
                <Card img={rel} animate />
                <Card img={phone} animate />
                <Card img={hromosome} animate />
                <Card img={london} animate />
                <Card img={ocean} animate />
                <Card img={shoe} animate /> */}
            </div>
        </Layout>
    );
}
