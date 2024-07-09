import React from "react";
import {
  areaType,
  boolean,
  direction,
  junctionType,
  provinces,
  roadType,
} from "..";
import { FormInput, FormRadio, FormSelect } from "@/components";

export const LocationInfo = (props: LocationInfoProps) => {
  const form = props.form;
  const watch = form.watch();

  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="text-md font-bold text-blue-500">Location</h1>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-6 min-w-[600px]">
          <FormRadio
            data={boolean}
            name="accidentSchema.builtUpArea"
            label="Built-up-area"
            layout="row"
            defaultValue={watch.accidentSchema?.builtUpArea}
          />

          <FormInput
            label="Speed limit on road"
            name="accidentSchema.roadSpeedLimit"
            placeholder="100"
            defaultValue={watch.accidentSchema?.roadSpeedLimit}
            type="number"
          />

          <FormSelect
            data={provinces}
            label="Province"
            name="accidentSchema.province"
            placeholder="Select province"
            defaultValue={watch.accidentSchema?.province}
          />
        </div>

        <div className="w-full flex flex-wrap justify-between gap-4 ">
          <FormInput
            label="Street"
            name="accidentSchema.street"
            placeholder="Chabangu street"
            defaultValue={watch.accidentSchema?.street}
          />
          <FormInput
            label="Road name"
            name="accidentSchema.roadName"
            placeholder="Luthuli road"
            defaultValue={watch.accidentSchema?.roadName}
          />
          <FormInput
            label="Road number"
            name="accidentSchema.roadNumber"
            placeholder="R55"
            defaultValue={watch.accidentSchema?.roadNumber}
          />
        </div>

        <div className="flex items-center gap-6 justify-between">
          <FormSelect
            data={roadType}
            label="Road type"
            name="accidentSchema.roadType"
            placeholder="Select road type"
            defaultValue={watch.accidentSchema?.roadType}
          />
          <FormSelect
            data={junctionType}
            label="Junction type"
            name="accidentSchema.junctionType"
            placeholder="Select junction type"
            defaultValue={watch.accidentSchema?.junctionType}
          />
        </div>

        <FormSelect
            name="areaSchema.areaType"
            label="Area type"
            data={areaType}
            placeholder="select area"
            defaultValue={watch.areaSchema?.areaType}
          />

        <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4  bg-blue-50 max-w-[800px]">
          <h1 className="text-semibold text-md text-gray-500 ">{watch.areaSchema?.areaType}</h1>

          

          {watch.areaSchema?.areaType === "Town/City" && <>
            <FormInput
              label="At intersection with"
              name="areaSchema.intersection"
              placeholder="coner of alexander"
              fullWidth={true}
              defaultValue={watch.areaSchema?.intersection}
            />
            <div className="flex items-center gap-6 justify-between">
              <FormInput
                label="Or between"
                name="areaSchema.between"
                placeholder="Alexander road and Empire road"
                defaultValue={watch.areaSchema?.between}
              />
              <FormInput
                label="And"
                name="areaSchema.and"
                placeholder="Alexander road and Empire road"
                defaultValue={watch.areaSchema?.and}
              />
            </div>
            <FormInput
              label="Suburb (if in city or town)"
              name="areaSchema.suburb"
              placeholder="Alexander road and Empire road"
              defaultValue={watch.areaSchema?.suburb}
              fullWidth={true}
            />
            <FormInput
              label="City/town name"
              name="areaSchema.townName"
              placeholder="Alexander road and Empire road"
              defaultValue={watch.areaSchema?.townName}
              fullWidth={true}
            />
          </>}
          {watch.areaSchema?.areaType === "Freeway/Rural" && <>
            <FormInput
              label="At intersection with"
              name="areaSchema.intersection"
              placeholder="coner of alexander"
              fullWidth={true}
              defaultValue={watch.areaSchema?.intersection}
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-end gap-6  min-w-max w-full">
                <FormInput
                  label="Or approximately"
                  name="areaSchema.approximateDistance"
                  placeholder="35"
                  type="number"
                  small={true}
                  defaultValue={watch.areaSchema?.approximateDistance}
                />
                <p className="text-md font-semibold">km</p>

                <FormSelect
                  label="measured in compass direction"
                  name="areaSchema.direction"
                  placeholder="Select direction"
                  data={direction}
                  fullWidth={true}
                  defaultValue={watch.areaSchema?.direction}
                />
              </div>
                <FormInput
                  label="From"
                  name="areaSchema.from"
                  placeholder="Alexander road and Empire road"
                  fullWidth={true}
                  defaultValue={watch.areaSchema?.from}
                />

                <div className="flex items-center gap-6 w-full ">

                  <FormInput
                    label="Information on kilometer marker: road no/section"
                    name="areaSchema.kmMarker"
                    placeholder=""
                    fullWidth={true}
                    defaultValue={watch.areaSchema?.kmMarker}
                  />
                  <FormInput
                    label="km"
                    name="areaSchema.kmMarkerDistance"
                    type="number"
                    placeholder="10"
                    fullWidth={true}
                    defaultValue={watch.areaSchema?.kmMarkerDistance}
                  />
                </div>
            </div>
          </>}
        </div>

        <div className="flex flex-col gap-3 border-2 border-gray-100 rounded-lg p-4 ">
          <h1 className="text-semibold text-md text-gray-500 ">
            GPS coordinates
          </h1>

          <div className="flex items-center  gap-4">
            <FormInput
              label="X Co-ordinate"
              name="accidentSchema.xCoordinate"
              placeholder="145.157014"
              defaultValue={watch.accidentSchema?.xCoordinate}
            />
            <FormInput
              label="Y Co-ordinate"
              name="accidentSchema.yCoordinate"
              placeholder="145.157014"
              defaultValue={watch.accidentSchema?.yCoordinate}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

type LocationInfoProps = {
  form: any;
};
