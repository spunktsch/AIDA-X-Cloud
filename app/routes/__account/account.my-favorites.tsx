import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "~/auth.server";

import type { User } from "@supabase/supabase-js";
import { getFavorites } from "~/services/favorites";
import { map } from "lodash";
import type { ProfileWithSocials } from "~/services/profile";
import { getProfileWithSocials } from "~/services/profile";
import { MODELS_LIMIT } from "~/utils/constants";
import ModelList from "~/components/ModelList";
import type { Category, Model } from "@prisma/client";
import { getSortFilter } from "~/utils/loader";

export const meta: MetaFunction<LoaderData> = ({ data }) => {
  return {
    title: `Favorites | ToneHunt`,
    description: `A list of my favorite models.`,
  };
};

export type LoaderData = {
  user: User | null | undefined;
  models: Model[];
  total: number;
  page: number;
  profile: ProfileWithSocials | null;
  categories: Category[];
};

export const loader: LoaderFunction = async ({ request, context, params }) => {
  const { session } = await getSession(request);
  const user = session?.user;

  if (!session) {
    return redirect("/login?redirectTo=/account/my-favorites");
  }

  const url = new URL(request.url);
  const profile = await getProfileWithSocials(session);
  const { offset, sortDirection, categoryId, page, categories } = await getSortFilter(url);

  // GET MODELS
  const favorites = profile
    ? await getFavorites({
        limit: MODELS_LIMIT,
        next: offset,
        profileId: profile?.id,
        sortDirection,
        categoryId,
        sortBy: "createdAt",
      })
    : {
        data: [],
        total: 0,
      };

  const models = map(favorites.data, (favorite) => favorite.model);

  return json<LoaderData>({
    user,
    models,
    categories,
    total: favorites.total,
    page,
    profile,
  });
};

export default function MyFavoritesPage() {
  const data = useLoaderData();

  return (
    <ModelList
      data={data.models}
      categories={data.categories}
      total={data.total}
      currentPage={data.page}
      limit={MODELS_LIMIT}
      user={data.user}
      profile={data.profile}
    />
  );
}
