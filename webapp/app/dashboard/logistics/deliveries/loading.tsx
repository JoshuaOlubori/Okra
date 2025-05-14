import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-[250px]" />
        </div>
      </div>

      <div className="w-full">
        <Skeleton className="h-10 w-full mb-4" />

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <Skeleton className="h-6 w-[200px] mb-2" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                  <Skeleton className="h-6 w-[100px]" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-2 w-full mb-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-3">
                    <div className="flex">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <div className="w-full">
                        <Skeleton className="h-5 w-[100px] mb-1" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                    <div className="flex">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <div className="w-full">
                        <Skeleton className="h-5 w-[100px] mb-1" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <div className="w-full">
                        <Skeleton className="h-5 w-[100px] mb-1" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                    <div className="flex">
                      <Skeleton className="h-5 w-5 mr-2" />
                      <div className="w-full">
                        <Skeleton className="h-5 w-[100px] mb-1" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t">
                  <div className="flex justify-between">
                    <Skeleton className="h-10 w-[100px]" />
                    <Skeleton className="h-10 w-[100px]" />
                    <Skeleton className="h-10 w-[100px]" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Skeleton className="h-10 w-[120px]" />
                <Skeleton className="h-10 w-[120px]" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
