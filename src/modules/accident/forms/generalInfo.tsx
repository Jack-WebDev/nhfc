import { FormSelect } from "@/components";
import React from "react";
import {
  lightConditions,
  weatherConditions,
  roadSurfaceTypes,
  roadSurfaceQuality,
  roadMarkingVisibility,
  obstructions,
  overtakingControls,
  trafficControlType,
  yes_no_nothing,
  roadSignsConditions,
  roadDirection,
  accidentType,
  boolean,
} from "..";

export const GeneralInfo = (props: GeneralInfoProps) => {
  const form = props.form;
  const watch = form.watch();
  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="text-md font-bold text-blue-500">General information</h1>
      <div className="flex flex-col gap-5">
        <FormSelect
          name="generalInfoSchema.lightCondition"
          label="Light condition"
          data={lightConditions}
          placeholder="Select light condition"
          fullWidth={true}
          defaultValue={watch.generalInfoSchema?.lightCondition}
        />
        <FormSelect
          name="generalInfoSchema.weatherConditionsAndVisibility"
          label="Weather condition and visibility"
          data={weatherConditions}
          placeholder="Select light condition"
          fullWidth={true}
          defaultValue={watch.generalInfoSchema?.weatherConditionsAndVisibility}
        />
        <FormSelect
          name="generalInfoSchema.roadSurfaceType"
          label="Road surface type"
          data={roadSurfaceTypes}
          placeholder="Select road surface type"
          fullWidth={true}
          defaultValue={watch.generalInfoSchema?.roadSurfaceType}
        />
        <FormSelect
          name="generalInfoSchema.qualityOfRoadSurface"
          label="Quality of road surface"
          data={roadSurfaceQuality}
          placeholder="Select road surface type"
          fullWidth={true}
          defaultValue={watch.generalInfoSchema?.qualityOfRoadSurface}
        />
        <FormSelect
          name="generalInfoSchema.roadSurface"
          label="Road surface"
          data={roadSurfaceQuality}
          placeholder="Select road surface"
          fullWidth={true}
          defaultValue={watch.generalInfoSchema?.roadSurface}
        />
        <FormSelect
          name="generalInfoSchema.roadMarkingVisibility"
          label="Road marking visibility"
          data={roadMarkingVisibility}
          placeholder="Select road marking visibility"
          fullWidth={true}
          defaultValue={watch.generalInfoSchema?.roadMarkingVisibility}
        />
        <FormSelect
          name="generalInfoSchema.obstructions"
          label="Obstruction"
          data={obstructions}
          placeholder="Select road obstruction"
          fullWidth={true}
          defaultValue={watch.generalInfoSchema?.obstructions}
        />
        <FormSelect
          name="generalInfoSchema.overtakingControl"
          label="Overtaking control"
          data={overtakingControls}
          placeholder="Select road overtaking control"
          fullWidth={true}
          defaultValue={watch.generalInfoSchema?.overtakingControl}
        />
        <FormSelect
          name="generalInfoSchema.traficControlType"
          label="Traffic control type"
          data={trafficControlType}
          placeholder="Select road traffic control type"
          fullWidth={true}
          defaultValue={watch.generalInfoSchema?.traficControlType}
        />
        <FormSelect
          name="generalInfoSchema.roadSignsClearlyVisible"
          label="Road signs clearly visible"
          data={yes_no_nothing}
          placeholder="Select visibility"
          fullWidth={true}
          defaultValue={watch.generalInfoSchema?.roadSignsClearlyVisible}
        />
        <FormSelect
          name="generalInfoSchema.conditionOfRoadSigns"
          label="Condition of road signs"
          data={roadSignsConditions}
          placeholder="Select condition"
          fullWidth={true}
          defaultValue={watch.generalInfoSchema?.conditionOfRoadSigns}
        />
        <FormSelect
          name="generalInfoSchema.directionOfRoad"
          label="Direction of road"
          data={roadDirection}
          placeholder="Select direction"
          fullWidth={true}
          defaultValue={watch.generalInfoSchema?.directionOfRoad}
        />
        <FormSelect
          name="accidentSchema.accidentType"
          label="Accident type"
          data={accidentType}
          placeholder="Select accident type"
          fullWidth={true}
          defaultValue={watch.accidentSchema?.accidentType}
        />
        <FormSelect
          name="accidentSchema.hitAndRun"
          label="Hit and run"
          data={boolean}
          placeholder="Select accident type"
          fullWidth={true}
          defaultValue={watch.accidentSchema?.hitAndRun}
        />
      </div>
    </section>
  );
};

type GeneralInfoProps = {
  form: any;
};
