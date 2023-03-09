import Link from 'next/link';
import { getLoginSession } from '@backend/auth';
import { prisma } from '@backend/index';
import airport from '@public/airport.jpg';
import canada from '@public/canada.jpg';
import chemistry from '@public/chemistry.jpg';
import hall from '@public/hall.jpg';
import house from '@public/house.jpg';
import hromosome from '@public/hromosome.jpg';
import ios from '@public/ios.jpg';
import kitchen from '@public/kitchen.jpg';
import london from '@public/london.jpg';
import medicine from '@public/medicine.jpg';
import money from '@public/money.jpg';
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
import train2 from '@public/train2.jpg';
import train from '@public/train.jpg';
import React from 'react';
import Card from '@components/card';
import Container from '@components/container';
import Layout from '@components/layout';

export async function getServerSideProps({ req }) {
    try {
        const session = await getLoginSession(req);
        let user = null;
        if (session) {
            user = await prisma.user.findUnique({ where: { email: session?.email } });
        }

        const posts = await prisma.post.findMany({
            take: 10,
            orderBy: {
                created: 'desc',
            },
        });

        return {
            props: {
                user,
                posts: posts.map((data) => ({
                    ...data,
                    created: JSON.parse(JSON.stringify(data.created.toISOString())),
                })),
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: { error: error.message },
        };
    }
}

export default function Feed({ user, posts = [], error = '' }) {
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
    /* <Card img={money} />
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
                    <Card img={room} />
                    <Card img={london} />
                    <Card img={canada} />
                    <Card img={ocean} />
                    <Card img={shoe} />
                    <Card img={skyscrapper} />
                    <Card img={kitchen} />
                    <Card img={airport} /> */
}
