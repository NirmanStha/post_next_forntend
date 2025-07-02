import { format, formatDistance, formatRelative } from "date-fns";

export const formatDate = (date: Date | string) => {
  return format(new Date(date), "PPP");
};

export const formatRelativeDate = (date: Date | string) => {
  return formatRelative(new Date(date), new Date());
};

export const formatDistanceDate = (date: Date | string) => {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export const truncateText = (text: string, length: number = 100) => {
  return text.length > length ? text.substring(0, length) + "..." : text;
};

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

export const capitalizeFirst = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
