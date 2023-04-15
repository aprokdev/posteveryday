import Footer from '@components/footer';
import Header from '@components/header';
import { ILayoutProps } from './types';

export default function Layout({ user, children }: ILayoutProps): JSX.Element {
    return (
        <>
            <Header user={user} />
            {children}
            <Footer />
        </>
    );
}
