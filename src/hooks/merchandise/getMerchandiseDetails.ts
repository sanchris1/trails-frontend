import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

async function getMerchandiseDetails({
  merchandiseSlug,
}: {
  merchandiseSlug: string;
}) {
  const { data } = await api.get(`/shop/${merchandiseSlug}`);

  return data;
}

export function useGetMerchandiseDetails({
  merchandiseSlug,
}: {
  merchandiseSlug: string;
}) {
  return useQuery({
    queryKey: ["merchandise", merchandiseSlug],
    queryFn: () => getMerchandiseDetails({ merchandiseSlug }),
    enabled: !!merchandiseSlug,
  });
}
