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

export default function Feed({ user }) {
    return (
        <Layout user={user}>
            <Container>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-4 md:gap-8 xl:gap-4">
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
                    <Card img={room} />
                    <Card img={london} />
                    <Card img={canada} />
                    <Card img={ocean} />
                    <Card img={shoe} />
                    <Card img={skyscrapper} />
                    <Card img={kitchen} />
                    <Card img={airport} />
                </div>
            </Container>
        </Layout>
    );
}
