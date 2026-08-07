"use client";

import { categories, difficulties } from "@/common";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AdventureFormValues } from "@/types/t.types";
import { Info } from "lucide-react";
import { useFormContext } from "react-hook-form";

const BasicInformation = () => {
  const form = useFormContext<AdventureFormValues>();

  return (
    <div className="bg-secondary/10 border border-border p-5 rounded-xl ">
      <div className="flex items-center gap-3 ">
        <span className="text-secondary ">
          <Info />
        </span>
        <h4 className="text-secondary font-semibold">Basic Information</h4>
      </div>
      <div className="my-5 space-y-4">
        <div className="">
          <Label className="mb-1.5">Adventure Title</Label>
          <Input {...form.register("title")} placeholder="Adventure title" />
        </div>
        <div className="grid grid-cols-2 gap-24">
          <div className="">
            <Label className="mb-1.5">Category</Label>
            <Select
              value={form.watch("category")}
              onValueChange={(value) => form.setValue("category", value!)}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Label className="mb-1.5">Difficulty</Label>
            <Select
              value={form.watch("difficulty")}
              onValueChange={(value) => form.setValue("difficulty", value!)}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Difficulties</SelectLabel>
                  {difficulties.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="">
          <Label className="mb-1.5">Location</Label>
          <Input
            {...form.register("location")}
            placeholder="Adventure location"
          />
        </div>
        <div className="">
          <Label className="mb-1.5">Short Description</Label>
          <Textarea
            {...form.register("shortDescription")}
            placeholder="Describe the adventure shortly..."
          />
        </div>
        <div className="">
          <Label className="mb-1.5">Full Description</Label>
          <Textarea
            className="h-40"
            {...form.register("description")}
            placeholder="Describe the adventure in details..."
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
