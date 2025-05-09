
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, Bridge, Warehouse } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            SkyBoundSim
          </h1>
          <p className="mt-3 text-xl text-gray-600 dark:text-gray-300">
            Choose a mission to begin.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
          {/* Construction Site Inspection */}
          <Card className="w-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Construction className="h-5 w-5" />
                Construction Site
              </CardTitle>
              <CardDescription>
                Inspect a construction site perimeter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Fly around a building under construction to monitor progress and identify safety issues.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Select Mission</Button>
            </CardFooter>
          </Card>

          {/* Bridge Inspection */}
          <Card className="w-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bridge className="h-5 w-5" />
                Bridge Inspection
              </CardTitle>
              <CardDescription>
                Examine a bridge over waterway
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Navigate under and over a bridge structure to inspect for damage and maintenance needs.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Select Mission</Button>
            </CardFooter>
          </Card>

          {/* Warehouse Roof Scan */}
          <Card className="w-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Warehouse className="h-5 w-5" />
                Warehouse Roof Scan
              </CardTitle>
              <CardDescription>
                Grid-pattern roof inspection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Perform a systematic scan of a warehouse roof to identify structural issues or damage.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Select Mission</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
