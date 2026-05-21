export function formatDate(dateString: string): string {
  const [year, month] = dateString.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function sortByDateDesc(
  a: { data: { startDate: string } },
  b: { data: { startDate: string } }
): number {
  return b.data.startDate.localeCompare(a.data.startDate);
}

export function isExpired(endDate?: string): boolean {
  if (!endDate || endDate === "present") return false;
  const [year, month] = endDate.split("-");
  const expiry = new Date(Number(year), Number(month) - 1);
  return expiry < new Date();
}
