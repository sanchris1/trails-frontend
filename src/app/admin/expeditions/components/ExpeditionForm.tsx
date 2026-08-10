/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useFetchAdventureDetails } from "@/hooks/adventures/fetchAdventureQuery";
import { Plus } from "lucide-react";
import AdventurePreview from "./AdventurePreview";
import BackButton from "@/components/common/BackButton";
import SchedulesAndLogisticsComponent from "./SchedulesAndLogisticsComponent";
import { FormProvider, useForm } from "react-hook-form";
import {
  Expedition,
  ExpeditionFormValues,
  expeditionSchema,
} from "@/types/t.types";
import { zodResolver } from "@hookform/resolvers/zod";
import FetchingProductsPage from "@/components/common/FetchingProductsPage";
import GuideInformationComponent from "./GuideInformationComponent";
import StatusComponent from "./StatusComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewExpedition } from "@/hooks/expedition/creaateNewExpedition";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { editExpedition } from "@/hooks/expedition/editExpedition";

export const defaultExpeditionValues: ExpeditionFormValues = {
  adventureId: "",
  departureDate: "",
  departureTime: "",
  returnDate: "",
  returnTime: "",
  meetingPoint: "",
  guide: "",
  guideContact: "",
  expeditionStatus: "scheduled",
};

const ExpeditionForm = ({
  adventureId,
  expedition,
  mode,
}: {
  adventureId: string;
  expedition?: Expedition;
  mode: "edit" | "new";
}) => {
  console.log(adventureId);

  const { data, isFetching } = useFetchAdventureDetails(adventureId);
  const router = useRouter();

  const form = useForm<ExpeditionFormValues>({
    resolver: zodResolver(expeditionSchema),
    defaultValues: { ...defaultExpeditionValues, adventureId },
  });

  useEffect(() => {
    form.setValue("adventureId", adventureId);
  }, [adventureId, form]);

  const queryClient = useQueryClient();
  const createNewExpeditionMutation = useMutation({
    mutationFn: createNewExpedition,

    onSuccess: (data: any) => {
      toast.success(data?.success || "Successfully created the expedition");
      queryClient.invalidateQueries({ queryKey: ["expeditions"] });
      queryClient.invalidateQueries({ queryKey: ["adventures"] });
      router.push("/admin/expeditions");
    },

    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const editExpeditionMutation = useMutation({
    mutationFn: editExpedition,

    onSuccess: (data: any) => {
      toast.success(data?.success || "Successfully updated the expedition");
      queryClient.invalidateQueries({ queryKey: ["expeditions"] });
      queryClient.invalidateQueries({ queryKey: ["adventures"] });
      router.push("/admin/expeditions");
    },

    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleSubmitExpedition = (values: ExpeditionFormValues) => {
    if (mode === "new") {
      createNewExpeditionMutation.mutate(values);
    } else {
      if (!expedition) return;
      editExpeditionMutation.mutate({ expeditionId: expedition?.id, values });
    }
  };

  useEffect(() => {
    if (!expedition) return;

    form.reset({
      adventureId: expedition.adventureId,
      departureDate: expedition.departureDate,
      departureTime: expedition.departureTime,
      expeditionStatus: expedition.expeditionStatus,
      guide: expedition.guide,
      guideContact: expedition.guideContact,
      meetingPoint: expedition.meetingPoint,
      returnDate: expedition.returnDate,
      returnTime: expedition.returnTime ?? "",
    });
  }, [expedition, form]);

  if (isFetching) return <FetchingProductsPage />;

  return (
    <div className="">
      <div className="bg-secondary/20 z-999 backdrop-blur-3xl p-5 rounded-2xl border  flex items-center justify-between mb-5 sticky top-0 ">
        <div className="">
          <BackButton />
          <h3 className="text-3xl font-semibold text-primary">
            Create Expedition
          </h3>
          <p className="text-sm text-secondary">
            Schedule an expedition for this adventure
          </p>
        </div>
        <Button
          type="submit"
          form="expedition-form"
          disabled={createNewExpeditionMutation.isPending}
        >
          {createNewExpeditionMutation.isPending ? (
            <>
              <Spinner />
              <span>Creating...</span>
            </>
          ) : (
            <>
              <Plus />
              Create Expedition
            </>
          )}
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-8 ">
        <main className="flex flex-col gap-5">
          <AdventurePreview adventure={data!} />
          <FormProvider {...form}>
            <form
              id="expedition-form"
              className="space-y-6"
              onSubmit={form.handleSubmit(handleSubmitExpedition, (error) => {
                console.log(error);
                toast.error(
                  "Some problem need fixing before creating expedition",
                );
              })}
            >
              <SchedulesAndLogisticsComponent />
              <GuideInformationComponent />
              <StatusComponent />
            </form>
          </FormProvider>
        </main>
        {/* <aside className="bg-primary rounded-2xl p-3">Expedition summary</aside> */}
      </div>
    </div>
  );
};

export default ExpeditionForm;
