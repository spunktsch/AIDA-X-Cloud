import { useState } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { find, map } from "lodash";
import { stringify as qs_stringify } from "qs";
import { getSession } from "~/auth.server";

import type { SelectOption } from "~/components/ui/Select";
import ModelsListComponent from "~/components/ModelList";
import Loading from "~/components/ui/Loading";
import type { User } from "@supabase/supabase-js";
import { getModels } from "~/services/models";
import { getCategories } from "~/services/categories";
import type { ProfileWithFavorites } from "~/services/profile";
import { getProfileWithFavorites } from "~/services/profile";

export type LoaderData = {
  user?: User | null;
  username: string | null;
  modelList?: {
    models: any;
    total: number;
    page: number;
    filter: string;
    categories: any;
    sortBy: string;
    sortDirection: string;
    tags: string | null;
  };
  modelDetail?: {};
  profile: ProfileWithFavorites | null;
};

const sortByOptions = [
  { slug: "newest", field: "createdAt" },
  { slug: "popular", field: "popular" },
  { slug: "name", field: "title" },
];

// THE AMOUNT OF MODELS PER PAGE
const MODELS_LIMIT = 8;

export const modelListLoader: LoaderFunction = async ({ request }) => {
  const { session } = await getSession(request);
  const user = session?.user;
  const url = new URL(request.url);

  const profile = await getProfileWithFavorites(session);

  // GET PAGE
  let page = Number(url.searchParams.get("page")) ?? 1;
  if (!page || page === 0) page = 1;
  const offset = (page - 1) * MODELS_LIMIT;

  // GET SORT BY
  const sortByParam = url.searchParams.get("sortBy") ?? "newest";
  const selectedSortBy = find(sortByOptions, ["slug", sortByParam]);
  const sortBy = selectedSortBy?.field ?? "createdAt";

  // GET SORT DIRECTION
  const sortDirectionParam = url.searchParams.get("sortDirection") ?? "desc";
  const sortDirection = sortDirectionParam === "asc" || sortDirectionParam === "desc" ? sortDirectionParam : "desc";

  // GET USERNAME
  const usernameParam = url.searchParams.get("username") ?? null;

  // GET FILTER
  const filter = url.searchParams.get("filter") ?? "all";

  // GET TAGS
  const tagsParam = url.searchParams.get("tags") ?? null;

  // GET CATEGORIES
  const categories = await getCategories();
  const selectedCategory = find(categories, ["slug", filter]);
  const categoryId = selectedCategory?.id ?? null;

  // GET MODELS
  const models = await getModels({
    limit: MODELS_LIMIT,
    next: offset,
    categoryId,
    sortBy,
    sortDirection,
    username: usernameParam,
    user,
    tags: tagsParam,
  });

  return json<LoaderData>({
    user,
    username: usernameParam,
    modelList: {
      models: models.data,
      total: models.total,
      page: page - 1,
      filter,
      categories,
      sortBy: selectedSortBy?.slug ?? "newest",
      sortDirection,
      tags: tagsParam,
    },
    profile,
  });
};

export default function ModelListPage() {
  const data = useLoaderData();
  const [loading, setLoading] = useState<boolean>(false);

  const modelList = data.modelList;

  const filterOptions = [{ id: 0, title: "All", slug: "all" }, ...modelList.categories];
  const findFilter = find(filterOptions, ["slug", modelList.filter]);

  const defaultFilter = findFilter
    ? { value: String(findFilter.id), description: findFilter.title }
    : { value: "0", description: "All" };

  const selectOptions: SelectOption[] = map(filterOptions, (option) => ({
    value: String(option.id),
    description: option.title,
  }));
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter.value);

  if (!modelList) {
    return <></>;
  }

  const handlePageClick = (selectedPage: number) => {
    setLoading(true);

    const params: any = {
      page: selectedPage + 1,
      filter: modelList.filter,
      sortBy: modelList.sortBy,
      sortDirection: modelList.sortDirection,
    };

    if (data.username) {
      params.username = data.username;
    }

    const query = qs_stringify(params);
    window.location.href = `/?${query}`;
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    setSelectedFilter(selectedFilter);

    const findFilter = find(filterOptions, ["id", Number(selectedFilter)]);

    const params: any = {
      page: 1,
      filter: findFilter.slug,
      sortBy: modelList.sortBy,
      sortDirection: modelList.sortDirection,
    };

    if (data.username) {
      params.username = data.username;
    }

    if (data.tags) {
      params.tags = data.tags;
    }

    const query = qs_stringify(params);
    window.location.href = `/?${query}`;
  };

  const onSortChange = (sortBy: string) => {
    const params: any = {
      page: 1,
      filter: findFilter.slug,
      sortBy: sortBy,
      sortDirection: modelList.sortDirection,
    };

    if (data.username) {
      params.username = data.username;
    }

    if (data.tags) {
      params.tags = data.tags;
    }

    const query = qs_stringify(params);
    window.location.href = `/?${query}`;
  };

  // WE ARE MAKING MODEL LIST THE DEFAULT FOR NOW
  return (
    <div className="w-full">
      <div className="flex">
        <h1 className="w-full text-center text-2xl lg:text-3xl font-satoshi-bold mb-10">
          Find amps, pedals, and packs for NAM
        </h1>
      </div>
      <div className="flex">
        <div className="w-full">
          {loading ? (
            <div className="flex justify-center px-10 py-60">
              <Loading size="48" />
            </div>
          ) : null}
          {!loading ? (
            <ModelsListComponent
              data={modelList.models}
              total={modelList.total}
              currentPage={modelList.page}
              limit={MODELS_LIMIT}
              handlePageClick={handlePageClick}
              filterOptions={selectOptions}
              selectedFilter={selectedFilter}
              setSelectedFilter={handleFilterChange}
              selectedSortBy={modelList.sortBy}
              onSortChange={onSortChange}
              user={data.user}
              profile={data.profile}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
