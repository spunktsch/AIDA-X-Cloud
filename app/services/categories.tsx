import { db } from "~/utils/db.server";

import iconCab from "~/assets/categories_icons/icon-cab.svg";
import iconCabCollection from "~/assets/categories_icons/icon-cab-pack.svg";

import iconFullrig from "~/assets/categories_icons/icon-fullrig.svg";
import iconFullrigCollection from "~/assets/categories_icons/icon-fullrig-pack.svg";

import iconPedal from "~/assets/categories_icons/icon-pedal.svg";
import iconPedalCollection from "~/assets/categories_icons/icon-pedal-pack.svg";

import iconIr from "~/assets/categories_icons/icon-ir.svg";
import iconIrCollection from "~/assets/categories_icons/icon-ir-pack.svg";

import iconOutboard from "~/assets/categories_icons/icon-outboard.svg";
import iconOutboardCollection from "~/assets/categories_icons/icon-outboard.svg";

import iconGeneric from "~/assets/categories_icons/icon-generic.svg";

export const getCategories = async () => {
  const categories = await db.category.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
    orderBy: [
      {
        order: "asc",
      },
    ],
  });

  return categories;
};

export const getCategoryProfile = (catSlug: string) => {
  switch (catSlug) {
    case "amps":
      return {
        icon: iconCab,
        color: "text-tonehunt-green",
      };
    case "amps-collection":
      return {
        icon: iconCabCollection,
        color: "text-tonehunt-green",
      };
    case "fullrigs":
      return {
        icon: iconFullrig,
        color: "text-tonehunt-pink",
      };
    case "fullrigs-collection":
      return {
        icon: iconFullrigCollection,
        color: "text-tonehunt-pink",
      };
    case "pedals":
      return {
        icon: iconPedal,
        color: "text-tonehunt-yellow",
      };
    case "pedals-collection":
      return {
        icon: iconPedalCollection,
        color: "text-tonehunt-yellow",
      };
    case "irs":
      return {
        icon: iconIr,
        color: "text-tonehunt-orange",
      };
    case "irs-collection":
      return {
        icon: iconIrCollection,
        color: "text-tonehunt-orange",
      };
    case "outboard":
      return {
        icon: iconOutboard,
        color: "text-tonehunt-blue-light",
      };
    case "outboard-collection":
      return {
        icon: iconOutboardCollection,
        color: "text-tonehunt-blue-light",
      };
    default:
      return {
        icon: iconGeneric,
        color: "text-tonehunt-purple",
      };
  }
};