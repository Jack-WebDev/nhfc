import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsComponent() {
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
            <ul className="list-disc list-inside">
              <li>
                10,000+ housing units (mix of social housing, RDP houses, and
                bonded units)
              </li>
              <li>4 schools (2 primary, 2 secondary)</li>
              <li>2 clinics</li>
              <li>5 recreational facilities</li>
              <li>1 shopping center</li>
              <li>20 hectares of green spaces and parks</li>
              <li>Improved public transport infrastructure</li>
              <li>8,000+ temporary jobs during construction</li>
              <li>1,500+ permanent jobs post-completion</li>
            </ul>
          </CardContent>
 
        </Card>
      </TabsContent>
      <TabsContent value="implement">
        <Card>
          <CardHeader>
            <CardTitle>Implement Partners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc ">
              <li>
                National Housing Finance Corporation (NHFC) - Project Owner
              </li>
              <li>Calgro M3 - Developer</li>
              <li>City of Johannesburg - Municipal Partner</li>
              <li>
                Gauteng Department of Human Settlements - Provincial Partner
              </li>
              <li>
                Department of Water and Sanitation - Infrastructure Support
              </li>
              <li>Eskom - Electricity Provider</li>
              <li>Johannesburg Water - Water and Sanitation</li>
              <li>Johannesburg Roads Agency - Road Infrastructure</li>
              <li>Local Community Organizations - Community Engagement</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="risk">
        <Card>
          <CardHeader>
            <CardTitle>Risk and Assumption</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc list-inside">
              <h2>Risks</h2>
              <li>Delays in construction due to unforeseen circumstances</li>
              <li>Budget overruns</li>
              <li>Community resistance or conflicts</li>
              <li>Changes in government policies or regulations</li>
              <li>Environmental challenges</li>
              <h2>Assumptions</h2>
              <li>Continued government support and funding</li>
              <li>Stable economic conditions</li>
              <li>Availability of skilled labor</li>
              <li>Timely delivery of materials and resources</li>
              <li>Positive community engagement and acceptance</li>
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="finance">
        <Card>
          <CardHeader>
            <CardTitle>Finance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="list-disc list-inside">
              <h2>Total Project Value: R3.5 Billion</h2>
              <li>Funding Sources:</li>
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
