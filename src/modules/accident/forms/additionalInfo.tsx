import { FormTextArea, FormInput } from "@/components";
import React from "react";

export const AdditionalInfo = (props: AdditionalInfoProps) => {
  const form = props.form;
  const watch = form.watch()
  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="text-md font-bold text-blue-500">
        Additional information
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 min-w-[600px]"></div>

        <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 bg-gray-50 fit">
          <h1 className=" flex items-center gap-2 text-semibold text-md text-gray-500">
            Brief description from both drivers
          </h1>

          <FormTextArea
            name="accidentSchema.descriptionD1"
            label="Brief description from driver A"
            placeholder="description of the accident"
            defaultValue={watch.accidentSchema?.descriptionD1}
          />
          <FormTextArea
            name="accidentSchema.descriptionD2"
            label="Brief description from driver B"
            placeholder="description of the accident"
            defaultValue={watch.accidentSchema?.descriptionD2}
          />
        </div>
        <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4  fit">
          <h1 className=" flex items-center gap-2 text-semibold text-md text-gray-500">
            Summary of persons involved (incliding driver/cyclist)
          </h1>

          <div className="flex item-center gap-4 w-full">
            <FormInput
              name="accidentSchema.numberOfDead"
              label="Number of persons dead (killed)"
              type="number"
              placeholder="0"
              defaultValue={watch.accidentSchema?.numberOfDead}
            />
            <FormInput
              name="accidentSchema.numberOfSlightlyInjured"
              label="Number of persons slightly injured"
              type="number"
              placeholder="0"
              defaultValue={watch.accidentSchema?.numberOfSlightlyInjured}
            />
          </div>
          <div className="flex item-center gap-4 w-full">
            <FormInput
              name="accidentSchema.numberOfSeriouslyInjured"
              label="Number of persons seriously injured"
              type="number"
              placeholder="0"
              defaultValue={watch.accidentSchema?.numberOfSeriouslyInjured}
            />
            <FormInput
              name="accidentSchema.numberOfNotInjured"
              label="Number of persons not injured"
              type="number"
              placeholder="0"
              defaultValue={watch.accidentSchema?.numberOfNotInjured}
            />
          </div>

        </div>
        <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 bg-gray-50 fit">
          <h1 className=" flex items-center gap-2 text-semibold text-md text-gray-500">
            Officer statements
          </h1>

          <FormTextArea
            name="accidentSchema.courtData"
            label="Particulars of summons/written notice to appear in court written by officer"
            placeholder="description of the accident"
            defaultValue={watch.accidentSchema?.courtData}
          />
          <FormTextArea
            name="accidentSchema.discontinueUseOfVehicle"
            label="Particulars of notice to discontinue use of vehicle issued by officer"
            placeholder="description of the accident"
            defaultValue={watch.accidentSchema?.discontinueUseOfVehicle}
          />
        </div>
      </div>
    </section>
  );
};

type AdditionalInfoProps = {
  form: any
}

