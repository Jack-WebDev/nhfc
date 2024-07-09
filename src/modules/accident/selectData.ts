import { SelectData } from "@/components";
import { Select } from "@prisma/client/runtime/library";

export const gender: SelectData[] = [
  {
    id: "2f9e4083-53dc-5fea-8275-e9937e772fab",
    title: "Male",
    value: "Male",
  },
  {
    id: "df77c90c-c7e8-524e-871f-18c983ad11ab",
    title: "Female",
    value: "Female",
  },
  {
    id: "3590fa8e-ad60-50c6-8e73-55ffd7c4fa6e",
    title: "Unknown",
    value: "Unknown",
  },
];
export const driverRef: SelectData[] = [
  {
    id: "2f9e4083-5rf3dc-5fea-8275-e9937e772fab",
    title: "Driver A",
    value: "A",
  },
  {
    id: "df77c90c-c7eerg8-524e-871f-18c983ad11ab",
    title: "Driver B",
    value: "B",
  }
];
export const vehicleRef: SelectData[] = [
  {
    id: "2f9e4083-5rf3dc-5fea-82kik75-e993772fab",
    title: "Vehicle A",
    value: "A",
  },
  {
    id: "df77c90c-c7eerg8-524e-87ikuhu1f-18c98d11ab",
    title: "Vehicle B",
    value: "B",
  }
];
export const areaType: SelectData[] = [
  {
    id: "2f9ef4083-53dc-5fea-8275-e9937e772fab",
    title: "Town/City",
    value: "Town/City",
  },
  {
    id: "df77wc90c-c7e8-524e-871f-18c983ad11ab",
    title: "Freeway/Rural",
    value: "Freeway/Rural",
  },

];
export const witnessType: SelectData[] = [
  {
    id: "0ff588c8-919f-577a-9e81-ae31323ad508",
    title: "Independent eyewitness",
    value: "Independent eyewitness",
  },
  {
    id: "6f44f199-3717-5eb6-9aed-9884d9764c12",
    title: "Passenger of vehicle",
    value: "Passenger of vehicle",
  },
 
];
export const phoneType: SelectData[] = [
  {
    id: "2107302c-d110-5103-b0fb-7edc056ce940",
    title: "Home",
    value: "H",
  },
  {
    id: "131b15ad-f269-5e7b-b131-464b2fbb8bed",
    title: "Work",
    value: "W",
  },
  
];
export const licenseType: SelectData[] = [
  {
    id: "2107302c-d110-5103-b0fb-7edc056ce940555",
    title: "Driving",
    value: "Driving",
  },
  {
    id: "131b15ad-f269-5e7b-b131-464b2fbb8bed855",
    title: "Leaner",
    value: "Leaner",
  },
  {
    id: "131b15ad-f219-5e7b-b131-464b2fbb8bed855",
    title: "None",
    value: "None",
  },
  
];
export const weekDays: SelectData[] = [
  {
    id: "4b9e0637-5d4e-5133-920d-18f074d1551c",
    value: "Su",
    title: "Sunday",
  },
  {
    id: "f72d0cea-8aee-5888-a4f6-bd85762b36bf",
    value: "M",
    title: "Monday",
  },
  {
    id: "fd88ddef-1fda-5ae4-8639-08e41d1f8d15",
    value: "Tu",
    title: "Tuesday",
  },
  {
    id: "d056a4d1-9a82-5998-bbfc-b3a40bcb6c1a",
    value: "W",
    title: "Wednesday",
  },
  {
    id: "e7f64406-64ef-50be-b333-b6763503a724",
    value: "Th",
    title: "Thursday",
  },
  {
    id: "914ec8d4-51b3-50c3-95f4-d9260c3b56b6",
    value: "F",
    title: "Friday",
  },
  {
    id: "2d0d1af8-abf1-5b4e-9bb6-dcf66af382a8",
    value: "Sa",
    title: "Saturday",
  },
 
];

export const provinces: SelectData[] = [
  {
    id: "7c866d2a-adfc-536e-934f-decb29fa9b70",
    title: "EC",
    value: "EC",
  },
  {
    id: "02e983b2-42b6-5b9d-a52b-bfed3d321481",
    title: "FS",
    value: "FS",
  },
  {
    id: "2f529cfa-6b70-55b7-9e1d-3e161c763514",
    title: "GP",
    value: "GP",
  },
  {
    id: "7ecb109e-d4ba-5ef5-a037-484271d4fdd6",
    title: "KZN",
    value: "KZN",
  },
  {
    id: "0e29021a-6b7e-5fde-8381-f4c17bd306fe",
    title: "MP",
    value: "MP",
  },
  {
    id: "95d9a67f-56f7-5a90-81f4-7ab0e2bd13e5",
    title: "NC",
    value: "NC",
  },
  {
    id: "d6e4e1d1-82a9-51d5-b3fe-b4c54b58a62c",
    title: "WC",
    value: "WC",
  },
  {
    id: "5f31e17a-d521-5515-83ed-aedf2ffc6019",
    title: "LM",
    value: "LM",
  },
  {
    id: "0d3d36c2-2891-5bfe-8fd0-688f9165cc13",
    title: "NW",
    value: "NW",
  },
];

export const roadType: SelectData[] = [
  {
    id: "1c4fc6b7-ffec-5300-ae1c-7a1e183799c3",
    title: "Freeway",
    value: "Freeway",
  },
  {
    id: "c6499c59-d2ab-5ed5-b2bc-5b4514524fae",
    title: "On/off ramp",
    value: "On/off ramp",
  },
  {
    id: "e844276f-8769-526a-a41d-1da9996acc04",
    title: "Dual carriageway",
    value: "Dual carriageway",
  },
  {
    id: "20e87876-6a14-58f7-a31d-9d4b74080a12",
    title: "Single carriageway",
    value: "Single carriageway",
  },
  {
    id: "89d4e3a8-f8f3-5ae6-bc44-e0d2a62e4e44",
    title: "One way",
    value: "One way",
  },
  {
    id: "0ef4bf05-2bc0-5082-a3d4-78fbcddf5b1a",
    title: "Other",
    value: "Other",
  },
  {
    id: "4b921682-ec60-5691-b0ff-c174b5eae99c",
    title: "On-road parking/rank",
    value: "On-road parking/rank",
  },
  {
    id: "3640abfb-7836-58c6-80e9-ebfb0f7ffa2f",
    title: "Off-road parking/rank",
    value: "Off-road parking/rank",
  },
];
export const junctionType: SelectData[] = [
  {
    id: "043e7f35-7c10-54ab-8240-1cc883009b1d",
    title: "Cross roads",
    value: "Cross roads",
  },
  {
    id: "be0d30f2-c147-5387-ab15-bcc650affe7b",
    title: "T-junction",
    value: "T-junction",
  },
  {
    id: "c0ca3045-052c-5e62-9542-32cbd5362f58",
    title: "Staggered junction",
    value: "Staggered junction",
  },
  {
    id: "67627120-9f93-57e5-a249-75d364fbbb9a",
    title: "Y-junction",
    value: "Y-junction",
  },
  {
    id: "bd4ea776-6f0b-5306-a39f-1d04a50e0771",
    title: "Circle",
    value: "Circle",
  },
  {
    id: "0d1f232b-bae4-51d5-a014-35b44a3d56e9",
    title: "Level-Crossing",
    value: "Level-Crossing",
  },
  {
    id: "f9be20ad-1564-5e9e-8fc1-7bec2506177b",
    title: "Not a junction or crossing",
    value: "Not a junction or crossing",
  },
  {
    id: "f2f239ad-bd29-57a3-80e7-0a14a384d745",
    title: "On ramp/slipway",
    value: "On ramp/slipway",
  },
  {
    id: "9812740d-a9b1-53f6-89c0-0c25c3c0f526",
    title: "Off ramp/slipway",
    value: "Off ramp/slipway",
  },
  {
    id: "3e048cec-e74a-53bb-ba3e-c567796953dc",
    title: "Pedestrian crossing",
    value: "Pedestrian crossing",
  },
  {
    id: "ce2970a6-f295-58b6-8248-f37d9cc6b10a",
    title: "Property driveway access",
    value: "Property driveway access",
  },
  {
    id: "39372fe5-ded9-5e3c-b2a8-203b674cb254",
    title: "Other",
    value: "Other",
  },
];

export const direction: SelectData[] = [
  {
    id: "89d0e462-bc5d-5833-bff4-8db61076f0e5",
    title: "North",
    value: "N",
  },
  {
    id: "633a12fb-21b2-5201-97c8-72c5968869fb",
    title: "South",
    value: "S",
  },
  {
    id: "be02f9d2-6364-5bb1-b9e3-ceab411ade24",
    title: "East",
    value: "E",
  },
  {
    id: "e668fdcc-c4be-5aea-8744-87d563a35aaf",
    title: "West",
    value: "W",
  },
];

export const race: SelectData[] = [
  {
    id: "0ec7e954-4161-59a0-bc75-0e9816d27059",
    title: "Black",
    value: "Black",
  },
  {
    id: "b172f769-042b-5446-b470-ee518d4ef285",
    title: "Coloured",
    value: "Coloured",
  },
  {
    id: "465e6b2f-c5d9-5559-95ac-224b3b0c002c",
    title: "Asian",
    value: "Asian",
  },
  {
    id: "6962b7cf-c7ce-5309-b87d-1d32b58a3404",
    title: "White",
    value: "White",
  },
];

export const licenceCodes: SelectData[] = [
  {
    id: "ccc23eab-23b2-5b39-9976-030a192e8fee",
    title: "A1",
    value: "A1",
  },
  {
    id: "83a8dcc0-1fb8-5d7e-af7f-84a2029446cd",
    title: "A",
    value: "A",
  },
  {
    id: "6ca63d0e-9507-5259-9d5e-6ef2cc55cb98",
    title: "A",
    value: "A",
  },
  {
    id: "4da1692f-5733-5a90-b2ef-3358a0ed2757",
    title: "B",
    value: "B",
  },
  {
    id: "047b3336-0e25-51e1-a61c-d1e3069169ec",
    title: "C1",
    value: "C1",
  },
  {
    id: "7620c03e-0a2d-5646-94fc-76873f220c69",
    title: "C",
    value: "C",
  },
  {
    id: "758cc6f1-9898-5d49-b50c-ae3e75d5da9a",
    title: "EB",
    value: "EB",
  },
  {
    id: "50116136-41bf-5280-995d-17afaf38f814",
    title: "EC1",
    value: "EC1",
  },
  {
    id: "a470be07-b34d-57ca-8566-029752c9cd5d",
    title: "EC",
    value: "EC",
  },
  {
    id: "400838ae-e6a4-5338-94cb-a647e6898131",
    title: "Other",
    value: "Other",
  },
];

export const injuryList: SelectData[] = [
  {
    id: "92faf344-5d40-5c01-bdae-8ef6649c4626",
    title: "Killed",
    value: "Killed",
  },
  {
    id: "433eb012-aa5d-599d-9192-82a3bdb42eee",
    title: "Serious",
    value: "Serious",
  },
  {
    id: "22979b23-7a49-54ca-8c7e-515dc4662f48",
    title: "Slight",
    value: "Slight",
  },
  {
    id: "d13ae7e1-e03e-5f6a-af13-c5957b73a2a8",
    title: "No injury",
    value: "No injury",
  },
];

export const BooleanWithUnknown: SelectData[] = [
  {
    id: "5a16f6a2-9884-5f48-877c-3e79807a1e84",
    title: "Yes",
    value: "Yes",
  },
  {
    id: "533510c5-1de5-5c04-9fa9-8f90ec110bff",
    title: "No",
    value: "No",
  },
  {
    id: "46270f06-95f5-58ea-989d-25506bd47fdb",
    title: "Unknown",
    value: "Unknown",
  },
];

export const vehicleType: SelectData[] = [
  {
    id: "3f9b30b7-54fd-5770-8d20-b6dc015ddd94",
    title: "Motor car or station wagon",
    value: "Motor car or station wagon",
  },
  {
    id: "bf31f9ba-6915-5ea7-afd4-a862e3052e60",
    title: "Combi/minibus",
    value: "Combi/minibus",
  },
  {
    id: "09f4a51d-c108-5b3d-89e9-394ea5dd4c55",
    title: "Midibus",
    value: "Midibus",
  },
  {
    id: "47412ceb-6a6d-54f7-a3d1-d8654e56b547",
    title: "Bus",
    value: "Bus",
  },
  {
    id: "8af2f3b6-b3f1-5344-a187-b0ae4b0e0ecd",
    title: "But-train",
    value: "But-train",
  },
  {
    id: "f1df69f3-186a-5702-839a-ff6892b97699",
    title: "Light delivery vehicle",
    value: "Light delivery vehicle",
  },
  {
    id: "80ba9d97-3dfe-5614-ba58-6da99eddeabe",
    title: "Panel van",
    value: "Panel van",
  },
  {
    id: "51db3490-9c93-58cb-bd09-d8dcbea609d3",
    title: "GVM>3500kg (grater than)",
    value: "GVM>3500kg (grater than)",
  },
  {
    id: "0b5deb61-a37b-5782-a922-acd9378e1afe",
    title: "Truck: articulated",
    value: "Truck: articulated",
  },
  {
    id: "5e1f139b-9b09-58c7-8687-44b2c60391a7",
    title: "Truck: articulated multiple",
    value: "Truck: articulated multiple",
  },
  {
    id: "092fd5d9-5ea5-567e-81ca-72a6d048fb15",
    title: "125cc and under",
    value: "125cc and under",
  },
  {
    id: "c4dd9a24-f568-573b-bec0-c3d27c6f4b21",
    title: "Above 125cc",
    value: "Above 125cc",
  },
  {
    id: "b384c33a-b83d-5641-8169-766b3bb76866",
    title: "Tri-cycle",
    value: "Tri-cycle",
  },
  {
    id: "2386e927-73e7-5013-adcd-b6a4dfbce1b0",
    title: "Quandru-cycly",
    value: "Quandru-cycly",
  },
  {
    id: "5850fff7-8f3f-5f3b-bb15-683462972679",
    title: "Bycycle",
    value: "Bycycle",
  },
  {
    id: "14a0ddd7-c327-518e-ad61-e79938500e77",
    title: "Mobile equipment: (driven)",
    value: "Mobile equipment: (driven)",
  },
  {
    id: "5cb6f699-dabd-5601-9f90-c79280d8719e",
    title: "Caravan/trailer",
    value: "Caravan/trailer",
  },
  {
    id: "c35bb23b-6f94-5e54-b06a-d99cd1f90d49",
    title: "Tractor",
    value: "Tractor",
  },
  {
    id: "79485852-f160-51ea-9a3c-6a0aa7a77471",
    title: "Animal-drawn vehicle",
    value: "Animal-drawn vehicle",
  },
  {
    id: "196e120e-65bc-55f3-b61b-d0e2893e4b36",
    title: "Other",
    value: "Other",
  },
];

export const lightConditions: SelectData[] = [
  {
    id: "09da9a21-91f8-58bf-9cd0-9a248de0a4d3",
    title: "Daylight",
    value: "Daylight",
  },
  {
    id: "6915b85c-5d75-5416-9499-fe56c33b3189",
    title: "Night: unlit",
    value: "Night: unlit",
  },
  {
    id: "5c0a1662-1032-52c7-98b1-0ef51db88aa3",
    title: "Night: lit by street light",
    value: "Night: lit by street light",
  },
  {
    id: "618df9ef-1742-5875-b14e-f9a62d0bba5b",
    title: "Dawn/dusk",
    value: "Dawn/dusk",
  },
  {
    id: "b1dabedb-fcdc-5dfb-ba26-2b51e224bafc",
    title: "Other",
    value: "Other",
  },
];

export const weatherConditions: SelectData[] = [
  {
    id: "dae3e188-7d60-5f7c-a2d9-1befcb129775",
    title: "Clear",
    value: "Clear",
  },
  {
    id: "128bd964-0017-5a6a-bf60-8f363b00464a",
    title: "Overcast",
    value: "Overcast",
  },
  {
    id: "56c43eed-713e-5c3c-bcf4-fc8f9fbb019f",
    title: "Rain",
    value: "Rain",
  },
  {
    id: "a4b182de-715e-50a9-95bc-903c144dd1d6",
    title: "Mist/fog",
    value: "Mist/fog",
  },
  {
    id: "da3ce1ad-ab9c-52bf-ba39-b527fc677131",
    title: "Hail/snow",
    value: "Hail/snow",
  },
  {
    id: "8e9ab686-157e-52f5-b2ca-5a58bab833f1",
    title: "Dust",
    value: "Dust",
  },
  {
    id: "5c2feb42-0c59-5e57-9d5f-a2c611adc447",
    title: "Fire/smoke",
    value: "Fire/smoke",
  },
  {
    id: "b9636815-70aa-5859-a4e0-9dede7a44948",
    title: "Severe eind",
    value: "Severe eind",
  },
  {
    id: "9de72717-4ea3-517c-b6af-a8b9dc395076",
    title: "Unknown",
    value: "Unknown",
  },
];

export const roadSurfaceTypes: SelectData[] = [
  {
    id: "d476a463-1ed3-5db5-9b57-e90b709133d7",
    title: "Concrete",
    value: "Concrete",
  },
  {
    id: "bfbb7026-5fe1-54a4-b21d-c6a441d83b79",
    title: "Tarmac",
    value: "Tarmac",
  },
  {
    id: "b109727b-11bf-5707-8ca6-4a1cd43fb294",
    title: "Gravel",
    value: "Gravel",
  },
  {
    id: "f7e45719-13be-5ed5-8d65-36e429ee6ff9",
    title: "Dirt",
    value: "Dirt",
  },
  {
    id: "b2bfb516-4465-5472-b741-6f4ab7a7be52",
    title: "Other",
    value: "Other",
  },
];
export const roadSurfaceQuality: SelectData[] = [
  {
    id: "c321761d-ae0e-5034-9506-9e0027f2d5e6",
    title: "Good",
    value: "Good",
  },
  {
    id: "72e86454-d86f-53cc-bb71-d4b3c3560c3c",
    title: "Bumpy",
    value: "Bumpy",
  },
  {
    id: "fdd71a3b-7f68-5fed-8ab3-9a815569bc37",
    title: "Pothole",
    value: "Pothole",
  },
  {
    id: "7a32828e-5795-5a6b-8d34-1208e333dfd7",
    title: "Cracks",
    value: "Cracks",
  },
  {
    id: "8d493406-4186-529e-bf9c-98455e9d8be8",
    title: "Corrugated",
    value: "Corrugated",
  },
  {
    id: "5bac993b-8bd4-536c-b4d8-fe483d05f779",
    title: "Other",
    value: "Other",
  },
];

export const roadSurfaces: SelectData[] = [
  {
    id: "a8d00611-2030-5d74-9d34-3142c5d6aaff",
    title: "Dry",
    value: "Dry",
  },
  {
    id: "b36940e1-c29c-5896-b2b7-2de125cad980",
    title: "Wet",
    value: "Wet",
  },
  {
    id: "06df22e7-15f3-53cc-9560-87d3e7aff8d9",
    title: "Wet in areas",
    value: "Wet in areas",
  },
  {
    id: "e471f695-5fd4-5fe3-a4aa-13c687557899",
    title: "Ice",
    value: "Ice",
  },
  {
    id: "070e6fd9-6fdb-53b4-b67f-c00a1b0b8ba1",
    title: "Snow",
    value: "Snow",
  },
  {
    id: "e17182b2-bdaf-503f-9ff0-9e9a8e86d0b2",
    title: "loose gravel or sand",
    value: "loose gravel or sand",
  },
  {
    id: "557d3928-7337-59e4-807b-96fc77c55075",
    title: "Slippery",
    value: "Slippery",
  },
  {
    id: "0942daf9-eba4-5d60-98f2-2116e9edee8c",
    title: "Water: standing or moving",
    value: "Water: standing or moving",
  },
  {
    id: "5c856a41-d031-5fd5-8a23-d70192598282",
    title: "Other",
    value: "Other",
  },
];

export const roadMarkingVisibility: SelectData[] = [
  {
    id: "4e41c054-8b51-5394-ad10-e0b27ba27a68",
    title: "Unknown",
    value: "Unknown",
  },
  {
    id: "",
    title: "Not good",
    value: "Not good",
  },
  {
    id: "",
    title: "Good",
    value: "Good",
  },
  {
    id: "",
    title: "N/A",
    value: "N/A",
  },
];

export const obstructions: SelectData[] = [
  {
    id: "1e7edb91-7002-5641-ae24-1d98bbf6965c",
    title: "Accident site",
    value: "Accident site",
  },
  {
    id: "8201c29b-c5f0-5649-a570-097d1d08e910",
    title: "Roadworks",
    value: "Roadworks",
  },
  {
    id: "70a8dc1a-30fa-5387-be02-09a0b571a3b2",
    title: "Roadblock",
    value: "Roadblock",
  },
  {
    id: "909e9c0d-c758-5a29-9837-eaf32bdddfa1",
    title: "None",
    value: "None",
  },
  {
    id: "0bb21507-9439-5194-bc63-0507747d95d6",
    title: "Other",
    value: "Other",
  },
];

export const overtakingControls: SelectData[] = [
  {
    id: "e7d0e510-22ae-510f-93c6-4725c1c52d8c",
    title: "Barrier line",
    value: "Barrier line",
  },
  {
    id: "2ceef286-8012-59a7-a1f0-ded33902636a",
    title: "Road sign",
    value: "Road sign",
  },
  {
    id: "6eb5957b-b097-56bf-bf3a-b8793346ec89",
    title: "None",
    value: "None",
  },
  {
    id: "d5683baa-77c2-5d69-b551-f82c59c62642",
    title: "N/A",
    value: "N/A",
  },
];

export const trafficControlType: SelectData[] = [
  {
    id: "b3be0c09-f6c3-5822-8eaf-d540de751675",
    title: "Robot",
    value: "Robot",
  },
  {
    id: "1f213601-3e4b-506e-8e57-850236e28e5f",
    title: "Stop sign",
    value: "Stop sign",
  },
  {
    id: "9df9c6c6-666f-5464-9237-ff36dbbb849f",
    title: "Yield sign",
    value: "Yield sign",
  },
  {
    id: "5001f3d2-a07f-5137-8fa7-d2801e077f97",
    title: "Officer",
    value: "Officer",
  },
  {
    id: "f16f6e06-14a3-5606-b015-625401e3d51c",
    title: "Officer+robot",
    value: "Officer+robot",
  },
  {
    id: "19f14925-9edf-572b-9fb6-42eee3845ae3",
    title: "Uncontrolled junction",
    value: "Uncontrolled junction",
  },
  {
    id: "a0a1cb5d-3e58-5d85-a468-965b93dc4e6a",
    title: "Not at junction, crossing or barrier line",
    value: "Not at junction, crossing or barrier line",
  },
  {
    id: "18604d9c-dc43-5949-ba25-0fcf12b6792a",
    title: "All robots out of order",
    value: "All robots out of order",
  },
  {
    id: "c0931715-c8a9-5a14-bb51-77add0f1b5c5",
    title: "Some robots out of order",
    value: "Some robots out of order",
  },
  {
    id: "a0302cac-ec3a-57f5-b85a-503595b0d7b2",
    title: "Flashing robots (red/yellow)",
    value: "Flashing robots (red/yellow)",
  },
  {
    id: "67a1bb3e-3fd9-58e4-8845-e4e57a721a6c",
    title: "Boom",
    value: "Boom",
  },
  {
    id: "1b2b6585-0207-526a-8729-4be99559b762",
    title: "Pedestrian crossing",
    value: "Pedestrian crossing",
  },
  {
    id: "3b732ed5-6c6f-572a-85e8-5e12a6a02f7f",
    title: "Barrier line",
    value: "Barrier line",
  },
];

export const boolean: SelectData[] = [
  {
    id: "3278ca13-b6b4-5438-9367-f7dd33986553",
    title: "Yes",
    value: "Yes",
  },
  {
    id: "b9635d21-ce28-5a50-9e39-8dfedad08b99",
    title: "No",
    value: "No",
  },
 
];
export const yes_no_nothing: SelectData[] = [
  {
    id: "87e4b954-0550-579c-bf83-9c36e3f28e93",
    title: "Yes",
    value: "Yes",
  },
  {
    id: "dde7ef58-1143-5716-bd85-5948a31987c5",
    title: "No",
    value: "No",
  },
  {
    id: "2cd8dbcc-c807-586a-963c-90e8c0ae567f",
    title: "N/A",
    value: "N/A",
  },
];

export const roadSignsConditions: SelectData[] = [
  {
    id: "163728bb-ce14-5ec2-b457-e96f4c3181ae",
    title: "Good",
    value: "Good",
  },
  {
    id: "1b35ac76-c9b6-5677-8fd0-56c2586d2ebe",
    title: "Not good",
    value: "Not good",
  },
  {
    id: "5df3acce-356b-5ff8-b3bf-71d6138a318e",
    title: "Damaged or missing",
    value: "Damaged or missing",
  },
  {
    id: "1da22288-04bd-57e6-bf56-af944dab4012",
    title: "N/A",
    value: "N/A",
  },
];

export const roadDirection: SelectData[] = [
  {
    id: "1189e058-5435-5f28-85ec-0849334e2c28",
    title: "Straight",
    value: "Straight",
  },
  {
    id: "7186dcff-5939-590d-a574-191cef0c829f",
    title: "Curving",
    value: "Curving",
  },
  {
    id: "2ec3d625-2e04-5556-a576-1f42ca00e046",
    title: "Sharp curve (90 degree bend)",
    value: "Sharp curve (90 degree bend)",
  },
];

export const roadAngle: SelectData[] = [
  {
    id: "61940ac5-649b-5cda-8675-ff8db3d7b8d3",
    title: "Flat",
    value: "Flat",
  },
  {
    id: "c3001115-b931-5f3b-bd5a-166161e34fd1",
    title: "Uphill",
    value: "Uphill",
  },
  {
    id: "118a4fb3-2d8f-532a-a166-fc789c7d43e2",
    title: "Downhill",
    value: "Downhill",
  },
  {
    id: "f8d094db-92f3-5770-865a-cddb688e48cc",
    title: "Steep uphill",
    value: "Steep uphill",
  },
  {
    id: "718cb7f5-04c8-5dc2-a039-53200d500f3d",
    title: "Steep downhill",
    value: "Steep downhill",
  },
];

export const vehiclePosition: SelectData[] = [
  {
    id: "8b615ab7-de57-5fc9-8b5d-925a9155882f",
    title: "Correct road lane",
    value: "Correct road lane",
  },
  {
    id: "11aeedc5-bad0-57b5-a110-09f72bcea0c8",
    title: "Wrong road lane (but right side of the road)",
    value: "Wrong road lane (but right side of the road)",
  },
  {
    id: "1fb2e1c8-4c10-5519-b717-60584070ec51",
    title: "Wrong side of road",
    value: "Wrong side of road",
  },
  {
    id: "3a2d1e3a-6057-593d-9ffc-86d1a53f41bf",
    title: "Road shoulder",
    value: "Road shoulder",
  },
  {
    id: "44fdf194-0265-5abb-8302-9ece5f8e4ef7",
    title: "On-road parking bay",
    value: "On-road parking bay",
  },
  {
    id: "4069be47-2136-53ea-9584-5062aaaf4009",
    title: "Off-road parking bay",
    value: "Off-road parking bay",
  },
];

export const vehicleManoeuvre: SelectData[] = [
  {
    id: "9af69a42-d912-5c76-a42f-08c097a1c1dc",
    title: "Turning right",
    value: "Turning right",
  },
  {
    id: "178017a4-cc5b-5f69-897c-6a87ab16b562",
    title: "Turning left",
    value: "Turning left",
  },
  {
    id: "a5ff016b-d718-5cae-ad12-3d7523bfdea2",
    title: "U-turn",
    value: "U-turn",
  },
  {
    id: "25730c22-80c9-595f-b4de-5acda5df9e03",
    title: "Enter traffic flow",
    value: "Enter traffic flow",
  },
  {
    id: "a1320eca-af7c-59d3-98c2-25f565396a9b",
    title: "Merging",
    value: "Merging",
  },
  {
    id: "983f58b8-4a07-5387-aa0f-9195712c2933",
    title: "Diverging",
    value: "Diverging",
  },
  {
    id: "13a5df4e-0de1-55f5-b030-dfefe20be32e",
    title: "Overtaking (pass to right)",
    value: "Overtaking (pass to right)",
  },
  {
    id: "b86be9c0-61f2-5c74-93be-02584eac6b16",
    title: "Overtaking (pass to left)",
    value: "Overtaking (pass to left)",
  },
  {
    id: "90021fa8-fe92-5be7-8676-fb2fbb2f7443",
    title: "Travelling straight",
    value: "Travelling straight",
  },
  {
    id: "167a9870-079c-5757-a6df-624bbdc299d4",
    title: "Reversing",
    value: "Reversing",
  },
  {
    id: "cf5ec185-ce6a-53f0-960c-c03fbfe5ac98",
    title: "Sudden start",
    value: "Sudden start",
  },
  {
    id: "e9d23fb4-cb1c-5a4d-8b98-999629718804",
    title: "Sudden stop",
    value: "Sudden stop",
  },
  {
    id: "cc8fe4c1-3a68-5bb4-b594-8fef9d9136d8",
    title: "Busy parking",
    value: "Busy parking",
  },
  {
    id: "99435a31-9d42-5e09-86ab-70b738043178",
    title: "Changing lane",
    value: "Changing lane",
  },
  {
    id: "764b1290-57f9-5375-a19d-c0eab8ed143a",
    title: "Swerving",
    value: "Swerving",
  },
  {
    id: "a10cb569-5cbb-5541-88d4-d1b0e00c14a6",
    title: "Slowing down",
    value: "Slowing down",
  },
  {
    id: "c1a8e5dc-5531-5038-aff4-58d942985294",
    title: "Avoiding object",
    value: "Avoiding object",
  },
  {
    id: "dc4d3319-3f5a-5cca-873c-0584b5ac9004",
    title: "Sationary",
    value: "Sationary",
  },
  {
    id: "99ab8aa2-711f-5dfa-b133-e8ce390551a3",
    title: "Parked",
    value: "Parked",
  },
  {
    id: "b24b3ddb-42ee-5b3e-9588-5f165a82d65a",
    title: "Other",
    value: "Other",
  },
];

export const vehicleDamage = [
  {
    id: "dca35e8c-13a3-5fd8-9b36-03af0ff167fc",
    title: "Right front",
    value: "Right front",
  },
  {
    id: "8edadffe-b2bc-5eab-9b0d-e0b383dfa596",
    title: "Right mid-front",
    value: "Right mid-front",
  },
  {
    id: "f88b777a-6d04-5b33-8aca-4ced303ff0e8",
    title: "Right mid-back",
    value: "Right mid-back",
  },
  {
    id: "42dec9be-c0c3-5a9e-90d1-beb9a0992b99",
    title: "Back right",
    value: "Back right",
  },
  {
    id: "4a46320f-abb8-5d78-bccb-ff1b0abef4e7",
    title: "Back center",
    value: "Back center",
  },
  {
    id: "6659962b-200e-5081-b82c-1705ff63b8b6",
    title: "Back left",
    value: "Back left",
  },
  {
    id: "306160c8-2ff9-5a73-859c-5be2b07d25de",
    title: "Left mid-back",
    value: "Left mid-back",
  },
  {
    id: "e3b17d87-c363-5869-a03c-f50f48e085b3",
    title: "Left mid-front",
    value: "Left mid-front",
  },
  {
    id: "122ffd84-8977-50b8-a6bf-6eecbbddd715",
    title: "Left front",
    value: "Left front",
  },
  {
    id: "171d88a2-071f-573b-8eb9-7aa23e32f71d",
    title: "Front center",
    value: "Front center",
  },
  {
    id: "3b516fce-8736-5ad5-8cc3-174161910f3c",
    title: "Bonnet",
    value: "Bonnet",
  },
  {
    id: "8f43be6b-4fed-54d1-9e6b-f7c34c47d29b",
    title: "Roof",
    value: "Roof",
  },
  {
    id: "2599c014-4fad-546d-b760-d29b8614c563",
    title: "Boot",
    value: "Boot",
  },
  {
    id: "e87abb53-7456-565e-b9a3-ea6250bdb99c",
    title: "Multiple",
    value: "Multiple",
  },
  {
    id: "6f26fa45-b4fa-5b09-8182-e944e1992ed2",
    title: "Cught fire",
    value: "Cught fire",
  },
  {
    id: "c1307707-100d-5ec8-a220-d09439b9aa19",
    title: "Rolled",
    value: "Rolled",
  },
  {
    id: "81125951-271e-5ac9-adb0-8993f2a1a56a",
    title: "Damage undercarriage",
    value: "Damage undercarriage",
  },
  {
    id: "b15d31d7-c64c-5c6a-987d-341a38189fa6",
    title: "Damage no detail",
    value: "Damage no detail",
  },
  {
    id: "0ae7fe39-1fdc-590e-bb99-d2a6925fa8f5",
    title: "No damage",
    value: "No damage",
  },
  {
    id: "9a08c59a-5c72-5270-b9c2-fab321153853",
    title: "Windscreen/windows",
    value: "Windscreen/windows",
  },
];

export const accidentType: SelectData[] = [
  {
    id: "29ef5397-3a3a-5dfb-baf1-bp5e3b7d9",
    title: "Unknown",
    value: "Unknown",
  },
  {
    id: "29ef5397-3a3a-5dfb-baf1-bbf445e3b7d9",
    title: "Head/rear end",
    value: "Head/rear end",
  },
  {
    id: "0998b295-ccd4-50bd-a840-d450dc857a04",
    title: "Head on",
    value: "Head on",
  },
  {
    id: "11190d79-ee86-51c7-b6d7-0b03679408e5",
    title: "Sideswipe: opposite direction",
    value: "Sideswipe: opposite direction",
  },
  {
    id: "5def33a0-c61b-5d93-9bd6-b7d2ec40e8ef",
    title: "Sideswipe: same direction",
    value: "Sideswipe: same direction",
  },
  {
    id: "86beff22-0377-5a99-9f5f-6268f813d0f0",
    title: "Approach at angle (both traveling straight)",
    value: "Approach at angle (both traveling straight)",
  },
  {
    id: "00cf87d3-b075-5ae7-b5c5-a7ad09ee95f3",
    title: "Single vehicle: left the road",
    value: "Single vehicle: left the road",
  },
  {
    id: "d9607f70-7112-5014-a493-6a5cb8f5208b",
    title: "Single vehicle: overturned",
    value: "Single vehicle: overturned",
  },
  {
    id: "c50298e3-4c0e-5a80-be99-8999fdb62582",
    title: "Accident with pedestrian",
    value: "Accident with pedestrian",
  },
  {
    id: "cabfecce-5e4a-54d8-856a-e1626d338862",
    title: "Accident with animal",
    value: "Accident with animal",
  },
  {
    id: "d62d8c95-895e-59dc-afcb-2554a72a1de7",
    title: "Accident with train",
    value: "Accident with train",
  },
  {
    id: "4b3423c0-980a-5f1d-9182-def633d83a05",
    title: "Accident with fixed/other object",
    value: "Accident with fixed/other object",
  },
];

export const position: SelectData[] = [
    {
        id: "3211ffa6-ce92-5bb1-88ac-4070817432a2",
        title: "Roadway",
        value: "Roadway",
    },
    {
        id: "61b27780-0d3e-57d7-b8cc-80d99df78151",
        title: "Sidewalk/verge",
        value: "Sidewalk/verge",
    },
    {
        id: "6bd48b5c-5aa8-5cd9-a23e-94a1c11f16e6",
        title: "Shouder of road",
        value: "Shouder of road",
    },
    {
        id: "b211e07e-a65f-5712-89f0-ebb662bfa6cc",
        title: "Median",
        value: "Median",
    },
]

export const pedestrianLocation: SelectData[] = [
    {
        id: "ad6fe5a0-5832-5f07-af37-97bb527b9807",
        title: "Within marked crossing",
        value: "Within marked crossing",
    },
    {
        id: "d7f1c132-a1b9-5517-99c1-f047b0226ee9",
        title: "Within 50m of crossing",
        value: "Within 50m of crossing",
    },
    {
        id: "c793f19b-6608-5840-bd75-ef99778a7474",
        title: "Not at crossing",
        value: "Not at crossing",
    },
]

export const manoeuvre: SelectData[] = [
    {
        id: "8f610737-5147-521a-b275-4502544e5bbf",
        title: "Facing traffic",
        value: "Facing traffic",
    },
    {
        id: "57aa9dea-86f1-5be9-9e30-141ca8b190ac",
        title: "Back to traffic",
        value: "Back to traffic",
    },
    {
        id: "2a72170a-ce06-573b-9250-aa5ab4b09deb",
        title: "Crossing road",
        value: "Crossing road",
    },
]

export const pedestrianActions: SelectData[] = [
    {
        id: "a1096894-bf8c-54f9-9c07-1d74c58f5662",
        title: "Walking",
        value: "Walking",
    },
    {
        id: "63fb231d-905d-5745-aaf4-23826ee8ece2",
        title: "Running",
        value: "Running",
    },
    {
        id: "133c2b50-9880-5332-bf81-b0a560665e15",
        title: "Standing",
        value: "Standing",
    },
    {
        id: "b97f0beb-c585-5082-87e8-448a02e9a276",
        title: "Playing",
        value: "Playing",
    },
    {
        id: "f3bf012b-06a6-556a-a997-d0f46362cb1d",
        title: "Sitting",
        value: "Sitting",
    },
    {
        id: "669c2556-f0a5-5235-9969-eeade223bf6f",
        title: "Lying down",
        value: "Lying down",
    },
    {
        id: "18fa4405-da6f-5242-a93c-9f10eb9c3e10",
        title: "Working",
        value: "Working",
    },
    {
        id: "8647651e-04ff-5e14-8a1a-1ce0b975405b",
        title: "Other",
        value: "Other",
    },
]

export const clothingColors: SelectData[] = [
    {
        id: "",
        title: "Light",
        value: "Light",
    },
    {
        id: "",
        title: "dark",
        value: "dark",
    },
    {
        id: "",
        title: "Light&Dark",
        value: "Light&Dark",
    },
    {
        id: "",
        title: "Reflective",
        value: "Reflective",
    },
    {
        id: "",
        title: "Other",
        value: "Other",
    },
]

export const vehicleLights: SelectData[] = [
    {
        id: "a6a46954-1bd7-55b9-93f7-2a5c172f12a9",
        title: "Good",
        value: "Good",
    },
    {
        id: "0bdcbabf-83fa-5e38-bb2b-7fd6ee3cdaa2",
        title: "Faulty/not visible",
        value: "Faulty/not visible",
    },
    {
        id: "fad6bcb5-5503-57d1-b066-aab38204ab49",
        title: "Unknown",
        value: "Unknown",
    },
]

export const personSpace: SelectData[] = [
    {
        id: "6d107e3f-4e89-5d34-b100-0374fa194ccf",
        title: "Trapped",
        value: "Trapped",
    },
    {
        id: "e950f3f4-9765-5cf4-80a1-d95cd64f40e1",
        title: "Fallen out",
        value: "Fallen out",
    },
    {
        id: "824211b2-9c1f-5be4-9944-78156a51e4fc",
        title: "N/A",
        value: "N/A",
    },
]