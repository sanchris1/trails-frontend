/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AdventureFormValues, adventureSchema } from "@/types/t.types";
import BasicInformation from "./BasicInformation";
import LogisticsAndDetails from "./LogisticsAndDetails";
import ImageUploadComponent from "./ImageUploadComponent";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewAdventure } from "@/hooks/adventures/createNewAdventure";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface AdventureFormProps {
  mode: "edit" | "new";
  adventureId?: string;
}

export const defaultAdventureValues: AdventureFormValues = {
  title: "",
  category: "",
  shortDescription: "",
  description: "",
  location: "",
  difficulty: "",
  duration: 0,
  elevationGain: null,
  defaultCapacity: 1,
  defaultPrice: 0,
  coverImage: "",
  coverImagePublicId: "",
  isActive: true,
};

const AdventureForm = ({ mode }: AdventureFormProps) => {
  const form = useForm<AdventureFormValues>({
    resolver: zodResolver(adventureSchema),
    defaultValues: defaultAdventureValues,
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const createAdventureMutation = useMutation({
    mutationFn: createNewAdventure,

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["adventures"],
      });

      router.push("/admin/adventures");
    },

    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  return (
    <FormProvider {...form}>
      <form
        className="my-4 space-y-6"
        onSubmit={form.handleSubmit(
          (values) => {
            console.log(values);
            createAdventureMutation.mutate(values);
          },
          (error) => {
            console.log(error);
          },
        )}
      >
        <BasicInformation />
        <LogisticsAndDetails />
        <ImageUploadComponent />

        <div className="flex items-center gap-5">
          <Button variant={"outline"}>Cancel</Button>
          <Button
            variant={"default"}
            type="submit"
            disabled={createAdventureMutation.isPending}
          >
            {createAdventureMutation.isPending ? (
              <>
                <Spinner /> <span>Creating</span>
              </>
            ) : (
              "Create adventure"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AdventureForm;
