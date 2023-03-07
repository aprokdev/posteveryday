import Image from 'next/image';
import { useUser } from '@frontend/hooks/useUser';
import chemistry from '@public/chemistry.jpg';
import Button from '@components/button';
import Layout from '@components/layout';
import MainContainer from '@components/main-container';
import s from '@components/post-preview/style.module.scss';

export async function getStaticPaths() {
    return {
        paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
        fallback: false, // can also be true or 'blocking'
    };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
    return {
        // Passed to the page component as props
        props: { post: {} },
    };
}

const defaultTitle = 'What is Lorem Ipsum?';
const defaultHTML = `<p><span style="font-size: 14pt; font-family: terminal, monaco, monospace;"><em><span style="text-decoration: underline;"><strong>Lorem Ipsum</strong></span></em>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>
<p>&nbsp;</p>
<p><span style="font-size: 14pt; font-family: terminal, monaco, monospace;"><em><span style="text-decoration: underline;"><strong>Lorem Ipsum</strong></span></em>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>
<p>&nbsp;</p>
<p><span style="font-size: 14pt; font-family: terminal, monaco, monospace;"><em><span style="text-decoration: underline;"><strong>Lorem Ipsum</strong></span></em>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>
<p>&nbsp;</p>
<p><span style="font-size: 14pt; font-family: terminal, monaco, monospace;"><em><span style="text-decoration: underline;"><strong>Lorem Ipsum</strong></span></em>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>
<p>&nbsp;</p>
<p><span style="font-size: 14pt; font-family: terminal, monaco, monospace;"><em><span style="text-decoration: underline;"><strong>Lorem Ipsum</strong></span></em>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>
<p>&nbsp;</p>
<p><span style="font-size: 14pt; font-family: terminal, monaco, monospace;"><em><span style="text-decoration: underline;"><strong>Lorem Ipsum</strong></span></em>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>`;

export default function PostPage() {
    const user = useUser();
    return (
        <Layout user={user}>
            <div className="min-h bg-grey-200">
                <div className="w-full overflow-hidden relative h-72 flex items-center justify-center bg-stone-200">
                    {/* <img src={chemistry} alt="" className="block w-full object-cover" /> */}
                    <Image src={chemistry} alt="" className="block w-full object-cover" />
                </div>
                <MainContainer>
                    <div className="mt-6">
                        <h1 className="xs:text-4xl md:text-5xl xl:text-6xl text-center mb-10">
                            Title
                        </h1>
                        <div dangerouslySetInnerHTML={{ __html: defaultHTML }} className={s.html} />
                    </div>
                    <div className="flex items-center justify-end py-10">
                        {/* <Button
                            type="button"
                            className="mr-4 bg-white border-black text-black border-2"
                            onClick={() => backCallback(null)}
                        >
                            Back
                        </Button>
                        <Button type="submit" className="" onClick={publishPost}>
                            Publish
                        </Button> */}
                    </div>
                </MainContainer>
            </div>
        </Layout>
    );
}
