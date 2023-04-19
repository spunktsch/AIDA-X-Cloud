import ModelListItem from "./ModelListItem";
import ReactPaginate from "react-paginate";
import Select from "./ui/Select";
import type { SelectOption } from "~/components/ui/Select";
import type { User } from "@supabase/supabase-js";
import type { Category, Model } from "@prisma/client";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { ProfileWithSocials } from "~/services/profile";
import ButtonLink from "./ui/ButtonLink";
import EmptyFollowFeed from "./EmptyFollowFeed";
import { useLocation, useSearchParams } from "@remix-run/react";
import ModelSortDropdown from "./ModelSortDropdown";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { getCategoryProfile } from "~/services/categories";

interface ModelListType {
  data: Model[];
  total: number;
  currentPage: number;
  limit: number;
  filterOptions?: SelectOption[];
  selectedFilter?: string | undefined | null;
  setSelectedFilter?: (arg: React.ChangeEvent<HTMLSelectElement>) => void | undefined;
  showFilters?: boolean;
  showMenu?: boolean;
  selectedSortBy?: "newest" | "popular" | "following";
  onSortChange?: (arg: string) => void | undefined;
  user?: User | null | undefined;
  profile: ProfileWithSocials | null;
  emptyMessage?: string;
  categories: Category[];
}

const ModelsListComponent = ({
  data = [],
  total = 0,
  currentPage = 0,
  categories,
  limit,
  filterOptions = [],
  selectedFilter = null,
  setSelectedFilter = undefined,
  showFilters = true,
  showMenu = true,
  selectedSortBy = "newest",
  onSortChange = undefined,
  user = null,
  profile,
  emptyMessage = "No results",
}: ModelListType) => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [followSearchParams] = useSearchParams();
  const [newestSearchParams] = useSearchParams();
  const [popularSearchParams] = useSearchParams();

  followSearchParams.set("sortBy", "following");
  newestSearchParams.set("sortBy", "newest");
  popularSearchParams.set("sortBy", "popular");

  const pageCount = Math.ceil(total / limit);
  const paginationButtonLinkStyle =
    "px-2 py-0.5 border border-white/20 hover:border-white/70  rounded-lg relative w-[36px] h-[36px] inline-flex items-center justify-center text-white/60";

  const pageIsFiltered = currentPage > 0 || searchParams.get("filter");
  const isAllFilter = searchParams.get("filter") === "all" || searchParams.get("filter") === null;
  const isSortedByFollowing = searchParams.get("filter") === "following";
  const pageIsEmpty = data.length === 0;
  const pageIsEmptyFollowFeed =
    data.length === 0 &&
    selectedSortBy === "following" &&
    isAllFilter &&
    !searchParams.get("tags") &&
    !isSortedByFollowing &&
    !pageIsFiltered &&
    showFilters &&
    user;

  const [newestParams] = useSearchParams();
  const [oldestParams] = useSearchParams();
  newestParams.delete("sortDirection");
  oldestParams.set("sortDirection", "asc");

  const [filterParams] = useSearchParams();

  return (
    <div>
      <ul className="list-none p-0 m-0 flex gap-3 items-center justify-center md:justify-end mb-5">
        <li>
          <ModelSortDropdown
            icon={<ArrowsUpDownIcon className="w-4- h-4" />}
            renderItem={(item) => item.title}
            items={[
              {
                title: "Newest",
                href: `${location.pathname}?${newestParams}`,
                default: !searchParams.get("sortDirection") || searchParams.get("sortDirection") === "desc",
              },
              {
                title: "Oldest",
                href: `${location.pathname}?${oldestParams}`,
                default: searchParams.get("sortDirection") === "asc",
              },
            ]}
          />
        </li>

        <li>
          <ModelSortDropdown
            icon={<ChevronDownIcon className="w-4 h-4" />}
            renderItem={(item) => {
              return (
                <span className="flex items-center gap-3 py-1">
                  <img className="w-6 h-6" src={getCategoryProfile(item.slug ?? "").icon} alt={item.title ?? ""} />
                  <span className="truncate">{item.title} </span>
                </span>
              );
            }}
            items={[{ title: "All", href: "", default: true }].concat(
              categories.map((c) => {
                const params = new URLSearchParams(filterParams);
                params.set("filter", c.slug);
                params.delete("page"); // Ensure we don't end up out of bounds

                return {
                  title: c.pluralTitle ?? "",
                  href: `${location.pathname}?${params}`,
                  default: false,
                  slug: c.slug,
                };
              })
            )}
          />
        </li>
      </ul>

      {/* MODELS LIST */}
      <div className="flex flex-col">
        {pageIsEmpty ? (
          pageIsEmptyFollowFeed ? (
            <EmptyFollowFeed />
          ) : (
            <div className="text-lg text-center py-10">{emptyMessage}</div>
          )
        ) : null}

        {data.length > 0
          ? data.map((model: any) => {
              return <ModelListItem key={model.id} profile={profile} model={model} />;
            })
          : null}
      </div>

      {/* PAGINATION AREA */}
      {pageCount > 1 ? (
        <div className="flex mt-5">
          <div className="flex-1">
            <ReactPaginate
              breakLabel="..."
              breakLinkClassName={paginationButtonLinkStyle}
              nextLabel={
                <ChevronRightIcon className="w-4 h-4 absolute inline left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
              }
              onPageChange={(event) => {
                if (event.selected === 0) {
                  searchParams.delete("page");
                } else {
                  searchParams.set("page", String(event.selected));
                }
                setSearchParams(searchParams);
              }}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              previousLabel={
                <ChevronLeftIcon className="w-4 h-4 absolute inline left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2" />
              }
              renderOnZeroPageCount={() => null}
              forcePage={currentPage}
              containerClassName="flex flex-row justify-center lg:justify-end flex-wrap"
              pageClassName="mx-1"
              pageLinkClassName={paginationButtonLinkStyle}
              previousClassName="mr-1"
              previousLinkClassName={paginationButtonLinkStyle}
              nextClassName="ml-1"
              nextLinkClassName={paginationButtonLinkStyle}
              disabledLinkClassName="text-white/30 border-white/30 hover:border-white/30 cursor-not-allowed"
              activeLinkClassName="font-satoshi-bold bg-white/10 text-black/80"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ModelsListComponent;
