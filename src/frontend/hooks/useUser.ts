import Router from 'next/router';
import { getUser } from '@frontend/api';
import { API_PATHS } from '@frontend/api/paths';
import { IUser } from '@utils/user-entity';
import { useEffect } from 'react';
import useSWR from 'swr';

type User = IUser | null;

type useUserArgs = {
    redirectTo?: string;
    redirectIfFound?: boolean;
};

export function useUser({ redirectTo, redirectIfFound }: useUserArgs = {}): User {
    const { data } = useSWR(API_PATHS.user, getUser);
    const user = data?.data?.user || null;
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

    return user;
}
