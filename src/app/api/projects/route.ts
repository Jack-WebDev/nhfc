import db from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await db.projects.findMany();

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = await req.json();
    const {
      projectName,
      projectCode,
      programme,
      projectStatus,
      province,
      municipality,
      ward,
      address,
      gpscoordinates,
      projectOwner,
      developer,
      projectLiason,
      materialSupplier,
      contractor,
      deliverablesSummary,
      skilledWorkers,
      unskilledWorkers,
      schools,
      clinics,
      communityHalls,
      sportsField,
      implementationPartners,
    } = data;
    // console.log(
    //   projectName,
    //   projectCode,
    //   programme,
    //   projectStatus,
    //   province,
    //   municipality,
    //   ward,
    //   address,
    //   gpscoordinates,
    //   projectOwner,
    //   developer,
    //   projectLiason,
    //   materialSupplier,
    //   contractor,
    //   deliverablesSummary,
    //   skilledWorkers,
    //   unskilledWorkers,
    //   schools,
    //   clinics,
    //   communityHalls,
    //   sportsField,
    //   implementationPartners
    // );

    const projectData = await db.projects.create({
      data: {
        projectName: projectName,
        projectCode: projectCode,
        programme: programme,
        projectStatus: projectStatus,
        province: province,
        municipality: municipality,
        ward: ward,
        address: address,
        gpscoordinates: gpscoordinates,
        projectOwner: projectOwner,
        developer: developer,
        projectLiason: projectLiason,
        materialSupplier: materialSupplier,
        contractor: contractor,
        deliverablesSummary: deliverablesSummary,
        skilledWorkers: skilledWorkers,
        unskilledWorkers: unskilledWorkers,
        schools: schools,
        clinics: clinics,
        communityHalls: communityHalls,
        sportsField: sportsField,
        implementationPartners: implementationPartners,

      },
    });

    return NextResponse.json({ projectData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
