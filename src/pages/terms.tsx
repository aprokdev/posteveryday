import Head from 'next/head';
import HeaderLink from '@components/header/header-link';
import SmallerContainer from '@components/smaller-container';

export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}

export default function TermsOfUsePage(): JSX.Element {
    return (
        <div className="min-h">
            <Head>
                <title>Terms Of Use - POSTEVERYDAY</title>
            </Head>
            <SmallerContainer className="min-h-post py-20">
                <h1 className="text-center text-4xl underline mb-16">Terms and conditions</h1>

                <p className="mb-6">
                    These terms and conditions (the "Terms and Conditions") govern the use of
                    {` `}
                    <span className="underline">www.posteveryday.ca</span> (the "Site"). This Site
                    is owned and operated by Anton Prokopenko. This Site is a blog.
                    <br />
                    By using this Site, you indicate that you have read and understand these Terms
                    and Conditions and agree to abide by them at all times.
                </p>

                <p className="mb-6">
                    <span className="block font-semibold underline">Intellectual Property</span>
                    All content published and made available on our Site is the property of Anton
                    Prokopenko. This includes, but is not limited to images, text, logos, documents,
                    downloadable files and anything that contributes to the composition of our Site.
                </p>

                <p className="mb-6">
                    <span className="block font-semibold underline">Age Restrictions</span>
                    The minimum age to use our Site is 13 years old. By using this Site, users agree
                    that they are over 13 years old. We do not assume any legal responsibility for
                    false statements about age.
                </p>

                <p className="mb-6">
                    <span className="block font-semibold underline">User Contributions</span>
                    Users may post the following information on our Site:
                </p>

                <ul className="mb-6 list-disc pl-10">
                    <li className="mb-6">
                        <span>Images</span>
                    </li>
                    <li className="mb-6">
                        <span>Videos</span>
                    </li>
                    <li>
                        <span>Public comments</span>
                    </li>
                </ul>

                <p className="mb-6">
                    By posting publicly on our Site, you agree not to act illegally or violate these
                    Terms and Conditions.
                </p>

                <p className="mb-6">
                    <span className="block font-semibold underline">Accounts</span>
                    When you create an account on our Site, you agree to the following:
                </p>

                <ol className="mb-6 list-disc pl-10">
                    <li className="mb-6">
                        <span>
                            You are solely responsible for your account and the security and privacy
                            of your account, including passwords or sensitive information attached
                            to that account; and
                        </span>
                    </li>
                    <li>
                        <span>
                            All personal information you provide to us through your account is up to
                            date, accurate, and truthful and that you will update your personal
                            information if it changes.
                        </span>
                    </li>
                </ol>

                <p className="mb-6">
                    We reserve the right to suspend or terminate your account if you are using our
                    Site illegally or if you violate these Terms and Conditions.
                </p>

                <p className="mb-6">
                    <span className="block font-semibold underline">Limitation of Liability</span>
                    Anton Prokopenko will not be liable for any actions, claims, losses, damages,
                    liabilities and expenses including legal fees from your use of the Site.
                </p>

                <p className="mb-6">
                    <span className="block font-semibold underline">Indemnity</span>
                    Except where prohibited by law, by using this Site you indemnify and hold
                    harmless Anton Prokopenko from any actions, claims, losses, damages, liabilities
                    and expenses including legal fees arising out of your use of our Site or your
                    violation of these Terms and Conditions.
                </p>

                <p className="mb-6">
                    <span className="block font-semibold underline">Applicable Law</span>
                    These Terms and Conditions are governed by the laws of the Province of Alberta.
                </p>

                <p className="mb-6">
                    <span className="block font-semibold underline">Severability</span>
                    If at any time any of the provisions set forth in these Terms and Conditions are
                    found to be inconsistent or invalid under applicable laws, those provisions will
                    be deemed void and will be removed from these Terms and Conditions. All other
                    provisions will not be affected by the removal and the rest of these Terms and
                    Conditions will still be considered valid.
                </p>

                <p className="mb-6">
                    <span className="block font-semibold underline">Changes</span>
                    These Terms and Conditions may be amended from time to time in order to maintain
                    compliance with the law and to reflect any changes to the way we operate our
                    Site and the way we expect users to behave on our Site. We will notify users by
                    email of changes to these Terms and Conditions or post a notice on our Site.
                </p>

                <p className="mb-6">
                    <span className="block font-semibold underline">Contact Details</span>
                    Please contact us if you have any questions or concerns. Our contact details are
                    as follows:
                    <br />
                    Email:{' '}
                    <a
                        href="mailto:aprokopenko.dev@gmail.com"
                        className="text-black underline underline-offset-2 transition-opacity hover:opacity-50"
                    >
                        aprokopenko.dev@gmail.com
                    </a>
                </p>
                <div className="grid justify-center">
                    <HeaderLink href="/">BACK TO FEED</HeaderLink>
                </div>
            </SmallerContainer>
        </div>
    );
}
