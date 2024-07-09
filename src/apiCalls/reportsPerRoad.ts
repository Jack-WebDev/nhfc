import db from "@/utils/connect";

export async function reportPerRoad() {
  try {
    const res = await db.accident.groupBy({
      by: ["roadName", "date"],
      _sum: {
        numberOfDead: true,
        numberOfSeriouslyInjured: true,
        numberOfSlightlyInjured: true,
        numberOfNotInjured: true,
      },
    });
    let fatal = 0;
    let serious = 0;
    let slight = 0;
    let noInjury = 0;
    const accidents = [];
    for (let i = 0; i < res.length; i++) {
      const sum = res[i]._sum;
      const roadName = res[i].roadName;
      const date = res[i].date;
      fatal += sum.numberOfDead || 0;
      serious += sum.numberOfSeriouslyInjured || 0;
      slight += sum.numberOfSlightlyInjured || 0;
      noInjury += sum.numberOfNotInjured || 0;

      accidents.push({
        fatal: sum.numberOfDead,
        serious: sum.numberOfSeriouslyInjured,
        slight: sum.numberOfSlightlyInjured,
        noInjury: sum.numberOfNotInjured,
        roadName: roadName,
        date: date,
      });
    }

    return {
      accidents: accidents,
      error: null,
      total: { fatal, serious, slight, noInjury },
    };
  } catch (error) {
    return { accidents: null, error: error };
  }
}
export async function reportPerRoadType() {
  try {
    const res = await db.accident.groupBy({
      by: ["roadType", "date"],
      _sum: {
        numberOfDead: true,
        numberOfSeriouslyInjured: true,
        numberOfSlightlyInjured: true,
        numberOfNotInjured: true,
      },
    });
    let fatal = 0;
    let serious = 0;
    let slight = 0;
    let noInjury = 0;
    const accidents = [];
    for (let i = 0; i < res.length; i++) {
      const sum = res[i]._sum;
      const roadType = res[i].roadType;
      const date = res[i].date;
      fatal += sum.numberOfDead || 0;
      serious += sum.numberOfSeriouslyInjured || 0;
      slight += sum.numberOfSlightlyInjured || 0;
      noInjury += sum.numberOfNotInjured || 0;

      accidents.push({
        fatal: sum.numberOfDead,
        serious: sum.numberOfSeriouslyInjured,
        slight: sum.numberOfSlightlyInjured,
        noInjury: sum.numberOfNotInjured,
        roadType: roadType,
        date: date,
      });
    }

    return {
      accidents: accidents,
      error: null,
      total: { fatal, serious, slight, noInjury },
    };
  } catch (error) {
    return { accidents: null, error: error };
  }
}
