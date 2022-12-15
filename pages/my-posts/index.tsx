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
import city from 'public/city.jpg';
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
import night from 'public/night.jpg';
import woman from 'public/woman.jpg';
import room from 'public/room.jpg';
import clearSky from 'public/clear-sky.jpg';
import clearSky2 from 'public/clear-sky2.jpg';
import chart from 'public/chart.jpg';
import rainy from 'public/rainy.jpg';
import airport from 'public/airport.jpg';
import figures from 'public/figures.jpg';

export default function MyPosts() {
    return (
        <Layout>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 xl:gap-6">
                <Card img={airport} />
                <Card img={clearSky} />
                <Card img={rainy} />
                <Card img={cat} />
                <Card img={city} />
                <Card img={cancer} />
                <Card img={room} />
                <Card img={night} />
                <Card img={woman} />
                <Card img={kitchen} />
                <Card img={skyscrapper} />
                <Card img={figures} />
                <Card img={canada} />
                {/* <Card img={train}  />
                <Card img={money}  />
                <Card img={chemistry}  />
                <Card img={medicine}  />
                <Card img={sign}  />
                <Card img={sunset}  />
                <Card img={t}  />
                <Card img={rel}  />
                <Card img={phone}  />
                <Card img={hromosome}  />
                <Card img={london}  />
                <Card img={ocean}  />
                <Card img={shoe}  /> */}
            </div>
        </Layout>
    );
}
