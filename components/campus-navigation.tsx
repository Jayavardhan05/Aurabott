"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, NavigationIcon, Building, Book, Coffee, Users, Laptop } from "lucide-react"

export default function CampusNavigation() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  const locations = [
    { id: "admin", name: "Administrative Block", icon: Building },
    { id: "library", name: "Central Library", icon: Book },
    { id: "cafeteria", name: "Cafeteria", icon: Coffee },
    { id: "auditorium", name: "Auditorium", icon: Users },
    { id: "labs", name: "Computer Labs", icon: Laptop },
  ]

  const getDirections = (locationId: string) => {
    setSelectedLocation(locationId)
    // In a real application, this would show directions on a map
  }

  return (
    <Card className="shadow-lg border-sky-100">
      <CardHeader className="bg-sky-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center">
          <MapPin className="mr-2" />
          Campus Navigation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <p className="text-gray-600">Find your way around the VIIT campus:</p>

          <div className="space-y-2">
            {locations.map((location) => (
              <Button
                key={location.id}
                variant={selectedLocation === location.id ? "default" : "outline"}
                className={`w-full justify-start ${
                  selectedLocation === location.id
                    ? "bg-sky-600 hover:bg-sky-700"
                    : "text-sky-700 border-sky-200 hover:bg-sky-50"
                }`}
                onClick={() => getDirections(location.id)}
              >
                <location.icon className="mr-2 h-4 w-4" />
                {location.name}
              </Button>
            ))}
          </div>

          {selectedLocation && (
            <div className="mt-4 p-3 bg-sky-50 rounded-md">
              <div className="flex items-center text-sky-700 mb-2">
                <NavigationIcon className="mr-2 h-4 w-4" />
                <span className="font-medium">Directions</span>
              </div>
              <p className="text-sm text-gray-600">
                {`From Main Entrance:go ahead 200meters and  ${
                  selectedLocation === "admin"
                    ? "central pathway to the right"
                    : selectedLocation === "library"
                      ? "central pathway and turn right at the junction and go upstairs through the staircase there you will find vignanadhaara"
                      : selectedLocation === "cafeteria"
                        ? "go ahead another 200 Meters on the left you will have the annapurna canteen"
                        : selectedLocation === "auditorium"
                          ? "now turn right and  pass through the chairmans chamber 100meters then turn left go 3 Stairs Above and there you will see the Akcnb Hall"
                          : "pathway to the left of the library building"
                }`}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

