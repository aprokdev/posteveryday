import Footer from '@components/footer';
import Header from '@components/header';
import { ILayoutProps } from './types';

export default function Layout({ user, isUserFetching, children }: ILayoutProps): JSX.Element {
    return (
        <>
            <Header user={user} isUserFetching={isUserFetching} />
            {children}
            <Footer />
        </>
    );
}
