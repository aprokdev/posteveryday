import Router from 'next/router';
import { IUser } from '@utils/user-entity';
import { useEffect } from 'react';
import useSWR from 'swr';

type User = IUser | null;

async function fetcher(url: string): Promise<{ user: User }> {
    const res = await fetch(url);
    const data: any = await res.json();
    return { user: data?.user || null };
}

type useUserArgs = {
    redirectTo?: string;
    redirectIfFound?: boolean;
};

export function useUser({ redirectTo, redirectIfFound }: useUserArgs = {}): User {
    const { data, error } = useSWR('/api/users/user', fetcher);
    const user = data?.user;
    const finished = Boolean(data);
    const hasUser = Boolean(user);

    useEffect(() => {
        if (!redirectTo || !finished) return;
        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && !hasUser) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && hasUser)
        ) {
            Router.push(redirectTo);
        }
    }, [redirectTo, redirectIfFound, finished, hasUser]);

    return error ? null : user;
}
