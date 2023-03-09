import Link from 'next/link';
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
    try {
        const session = await getLoginSession(req);
        let user = null;
        let posts = null;
        const userId = Number(session?.id);
        if (session) {
            user = await prisma.user.findUnique({ where: { email: session?.email } });
            posts = await prisma.post.findMany({
                where: {
                    author_id: userId,
                },
                orderBy: {
                    created: 'desc',
                },
            });
        }

        const editedPosts =
            Array.isArray(posts) &&
            posts.map((data) => ({
                ...data,
                created: JSON.parse(JSON.stringify(data.created.toISOString())),
            }));

        return {
            props: {
                user,
                posts: editedPosts,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: { error: error.message },
        };
    }
}

export default function MyPosts({ user, posts = [], error = '' }) {
    const [domLoaded, setDomLoaded] = React.useState(false);
    React.useEffect(() => {
        setDomLoaded(true);
    }, []);
    return domLoaded && !error ? (
        <Layout user={user}>
            <Container>
                {posts?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-96 w-full mt-20">
                        <h1 className="block mb-5 text-center w-full text-4xl">
                            There are no posts yet
                        </h1>
                        <p>
                            You can {!user && <Link href="/login">log in</Link>} {!user && 'and'}{' '}
                            create one ;D
                        </p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 xl:gap-4">
                        {posts.map((data) => (
                            <Card {...data} key={data.id} />
                        ))}
                    </div>
                )}
            </Container>
        </Layout>
    ) : (
        <div>{error}</div>
    );
}

{
    /* <Card img={airport} />
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
                    <Card img={shoe} /> */
}
