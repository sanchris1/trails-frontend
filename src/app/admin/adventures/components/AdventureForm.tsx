/* eslint-disable react-hooks/exhaustive-deps */
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
import { useFetchAdventureDetails } from "@/hooks/adventures/fetchAdventureQuery";
import { useEffect } from "react";
import { editAdventure } from "@/hooks/adventures/editAdventure";

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

const AdventureForm = ({ mode, adventureId }: AdventureFormProps) => {
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

  const editAdventureMutation = useMutation({
    mutationFn: editAdventure,

    onSuccess: (data: any) => {
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

  const data = useFetchAdventureDetails(adventureId!);

  useEffect(() => {
    if (!data?.data) return;

    form.reset(data.data);
  }, [data?.data?.id]);

  return (
    <FormProvider {...form}>
      <form
        className="my-4 space-y-6"
        onSubmit={form.handleSubmit(
          (values) => {
            if (mode === "new") {
              createAdventureMutation.mutate(values);
            } else if (mode === "edit") {
              if (!adventureId) return;

              editAdventureMutation.mutate({
                adventureId,
                values,
              });
            }
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
            disabled={
              mode === "new"
                ? createAdventureMutation.isPending
                : editAdventureMutation.isPending
            }
          >
            {mode === "new" ? (
              createAdventureMutation.isPending ? (
                <>
                  <Spinner /> <span>Creating...</span>
                </>
              ) : (
                "Create adventure"
              )
            ) : editAdventureMutation.isPending ? (
              <>
                <Spinner /> <span>Editing...</span>
              </>
            ) : (
              "Edit Adventure"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AdventureForm;
