import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsComponent() {
  const typologys = [
    {
      typology: "RDP Houses",
      description: "	Basic housing units",
      qty: "5000",
      sellingPrice: "R150,000.00",
      income: "R890,000.00",
    },
    {
      typology: "Social Housing Units",
      description: "Affordable rental apartments",
      qty: "3000",
      sellingPrice: "R325,000.00",
      income: "R1200,000.00",
    },
    {
      typology: "Bonded Houses",
      description: "Market-rate housing",
      qty: "2000",
      sellingPrice: "R750,000.00",
      income: "R2000,000.00",
    },
  ];

  const risks = [
    {
      typology: "Delays in land acquisition",
      description: "High",
      qty: "Early engagement with land owners and municipality",

    },
    {
      typology: "Cost overruns due to material price fluctuations",
      description: "Medium",
      qty: "Contingency budget and bulk purchasing agreements",

    },
    {
      typology: "Community resistance to project",
      description: "High",
      qty: "Comprehensive stakeholder engagement and community liaison program",

    },
    {
      typology: "Assumption: Stable political environment",
      description: "Medium",
      qty: "Regular monitoring of political landscape and contingency planning",

    },
  ];
  return (
    <Tabs defaultValue="deliverables">
      <TabsList className="flex items-center justify-between py-4 bg-transparent">
        <TabsTrigger value="deliverables">
          Deliverables / Outputs / Outcomes
        </TabsTrigger>
        <TabsTrigger value="implement">Implement Partners</TabsTrigger>
        <TabsTrigger value="risk">Risk and Assumption</TabsTrigger>

        <TabsTrigger value="finance">Financing</TabsTrigger>
      </TabsList>
      <TabsContent value="deliverables">
        <Card>
          <CardHeader>
            <CardTitle>Deliverables / Outputs / Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            Deliverables Summary:
            <br />
            This project aims to provide 10,000+ housing units, including a mix
            of social housing, RDP houses, and bonded units. The project also
            includes the construction of 4 schools, 2 clinics, 5 recreational
            facilities, and a shopping center, spread across 20 hectares of
            green spaces and parks.
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Typology</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead >Selling Price</TableHead>
                  <TableHead >Income</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {typologys.map((typology) => (
                  <TableRow key={typology.typology}>
                    <TableCell className="font-medium">
                      {typology.typology}
                    </TableCell>
                    <TableCell>{typology.description}</TableCell>
                    <TableCell>{typology.sellingPrice}</TableCell>
                    <TableCell>
                      {typology.qty}
                    </TableCell>
                    <TableCell>
                      {typology.income}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="implement">
        <Card>
          <CardHeader>
            <CardTitle>Implement Partners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
              <h2>Partners:</h2>
              <br/>
              <div className="flex justify-evenly items-center flex-wrap  gap-2">

              <span className="bg-gray-100 text-black p-2 rounded-xl">Eskom</span>
              <span className="bg-gray-100 text-black p-2 rounded-xl">City of Johannesburg</span>
              <span className="bg-gray-100 text-black p-2 rounded-xl">Gauteng Department of Human Settlements</span>
              <span className="bg-gray-100 text-black p-2 rounded-xl">Department of Water and Sanitation</span>
              </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="risk">
        <Card>
          <CardHeader>
            <CardTitle>Risk and Assumption</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
          <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Risk / Assumption</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>	Mitigation / Validation</TableHead>

                </TableRow>
              </TableHeader>
              <TableBody>
                {risks.map((risk) => (
                  <TableRow key={risk.typology}>
                    <TableCell className="font-medium">
                      {risk.typology}
                    </TableCell>
                    <TableCell>{risk.description}</TableCell>
                    <TableCell>{risk.qty}</TableCell>

                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="finance">
        <Card>
          <CardHeader>
            <CardTitle>Finance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
              <h2>Total Project Value: R3.5 Billion</h2>
              Funding Sources:
            <ul className="grid grid-cols-2 list-disc list-inside">
              <li>NHFC Loan: R1.5 Billion</li>
              <li>Government Subsidy: R1 Billion</li>
              <li>Private Sector Investment: R800 Million</li>
              <li>Municipal Contribution: R200 Million</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
