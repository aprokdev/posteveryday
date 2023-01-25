import Image from 'next/image';
import money from 'public/money.jpg';
import Layout from '@components/layout';
import MainContainer from '@components/main-container';

const html = `<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: center;"><span style="text-decoration: underline;"><span style="font-size: 24pt; font-family: tahoma, arial, helvetica, sans-serif;">This is the initial content of the editor.</span></span></p>`;

export default function LoginPage(): JSX.Element {
    return (
        <Layout>
            <div className="min-h bg-grey-200">
                <div className="w-full relative h-64 flex items-center justify-center bg-stone-200">
                    <Image
                        src={money}
                        alt="Picture of the author"
                        className="w-full h-64 object-cover object-center"
                        sizes="(min-width: 640px) 640px, (min-width: 768px) 768px,
                    (min-width: 1024px) 1024px, (max-width: 1200px) 1200px"
                        fill
                    />
                </div>
                <MainContainer>
                    <div className="mt-6">
                        <h1 className="text-6xl text-center mb-10">Text main</h1>
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                </MainContainer>
            </div>
        </Layout>
    );
}
