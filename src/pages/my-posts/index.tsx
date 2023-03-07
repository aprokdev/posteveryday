import { DataStore } from '@aws-amplify/datastore';
// import { Post } from '../../models';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import airport from '@public/airport.jpg';
import canada from '@public/canada.jpg';
import cancer from '@public/cancer.jpg';
import car from '@public/car.jpg';
import cat from '@public/cat.jpg';
import chart from '@public/chart.jpg';
import chemistry from '@public/chemistry.jpg';
import city from '@public/city.jpg';
import clearSky2 from '@public/clear-sky2.jpg';
import clearSky from '@public/clear-sky.jpg';
import door from '@public/door.jpg';
import figures from '@public/figures.jpg';
import hall from '@public/hall.jpg';
import hromosome from '@public/hromosome.jpg';
import kitchen from '@public/kitchen.jpg';
import london from '@public/london.jpg';
import meat from '@public/meat.jpg';
import medicine from '@public/medicine.jpg';
import money from '@public/money.jpg';
import night from '@public/night.jpg';
import ocean from '@public/ocean.jpg';
import phone from '@public/phone.jpg';
import plant from '@public/plant.jpg';
import rainy from '@public/rainy.jpg';
import rel from '@public/rel.jpg';
import room from '@public/room.jpg';
import shoe from '@public/shoe.jpg';
import sign from '@public/sign.jpg';
import skyscrapper from '@public/skyscrapper.jpg';
import sunset from '@public/sunset.jpg';
import t from '@public/t.jpg';
import train from '@public/train.jpg';
import willa from '@public/willa.jpg';
import woman from '@public/woman.jpg';
import React from 'react';
import Card from '@components/card';
import Container from '@components/container';
import Layout from '@components/layout';

export async function getServerSideProps({ req }) {
    const session = await getLoginSession(req);
    if (session) {
        const user = await prisma.user.findUnique({ where: { email: session?.email } });
        return {
            props: { user }, // will be passed to the page component as props
        };
    } else {
        return {
            props: {}, // will be passed to the page component as props
        };
    }
}

export default function MyPosts({ user }) {
    // const [posts, setPosts] = React.useState([]);

    // React.useEffect(() => {
    //     fetchPosts();
    //     async function fetchPosts() {
    //         const postData = await DataStore.query(Post);
    //         console.log(postData);
    //         setPosts(postData);
    //     }
    // }, []);
    return (
        <Layout user={user}>
            <Container>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 xl:gap-4">
                    {/* {posts.map((item) => (
                        <Card {...item} key={item.id} />
                    ))} */}
                    {/* <br /> */}
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
                    <Card img={train} />
                    <Card img={money} />
                    <Card img={chemistry} />
                    <Card img={medicine} />
                    <Card img={sign} />
                    <Card img={sunset} />
                    <Card img={t} />
                    <Card img={rel} />
                    <Card img={phone} />
                    <Card img={hromosome} />
                    <Card img={london} />
                    <Card img={ocean} />
                    <Card img={shoe} />
                </div>
            </Container>
        </Layout>
    );
}
