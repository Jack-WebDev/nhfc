import db from "@/utils/connect";

export async function totalFatalReport() {

  try {

    
    const results = await db.accident.aggregate({
        
      _sum: {
        numberOfDead: true,
        
      },
    }) 

    const data = results._sum

    return data.numberOfDead? data.numberOfDead : 0;
  } catch (error) {
    return 
      null
    
  }
}
export async function totalSeriousReport() {

  try {

    
    const results = await db.accident.aggregate({
        
      _sum: {
        numberOfSeriouslyInjured: true,
        
      },
    }) 

    const data = results._sum

    return data.numberOfSeriouslyInjured? data.numberOfSeriouslyInjured : 0;
  } catch (error) {
    return 
      null
    
  }
}
export async function totalSlightReport() {

  try {

    
    const results = await db.accident.aggregate({
        
      _sum: {
        numberOfSlightlyInjured: true,
        
      },
    }) 

    const data = results._sum

    return data.numberOfSlightlyInjured? data.numberOfSlightlyInjured : 0;
  } catch (error) {
    return 
      null
    
  }
}
export async function totalNoInjuryReport() {

  try {

    
    const results = await db.accident.aggregate({
        
      _sum: {
        numberOfNotInjured: true,
        
      },
    }) 

    const data = results._sum

    return data.numberOfNotInjured? data.numberOfNotInjured : 0;
  } catch (error) {
    return 
      null
    
  }
}

export async function reportPerAccidentType() {
  try {
    const res = await db.accident.groupBy({
      by: ["accidentType", "date"],
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
      const accidentType = res[i].accidentType;
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
        accidentType: accidentType,
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


