import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TransactionSkeletonLoader() {
  const loadingRows = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="relative w-full overflow-auto">
      <div className="py-2 px-2">
        <Skeleton className="h-7 w-48 bg-[#2A2A2A]" />
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-none">
            <TableHead className="w-[80px]">
              <Skeleton className="h-5 w-12 bg-[#2A2A2A]" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-16 bg-[#2A2A2A]" />
            </TableHead>
            <TableHead className="text-center">
              <div className="flex justify-center">
                <Skeleton className="h-5 w-14 bg-[#2A2A2A]" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex justify-center">
                <Skeleton className="h-5 w-10 bg-[#2A2A2A]" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex justify-center">
                <Skeleton className="h-5 w-24 bg-[#2A2A2A]" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex justify-center">
                <Skeleton className="h-5 w-20 bg-[#2A2A2A]" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {loadingRows.map((index) => (
            <TableRow key={index} className="border-none ">
              <TableCell className="py-4">
                <Skeleton className="h-4 w-8 bg-[#2A2A2A]" />
              </TableCell>
              <TableCell className="py-4">
                <Skeleton className="h-4 w-16 bg-[#2A2A2A]" />
              </TableCell>
              <TableCell className="py-4 text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-24 bg-[#2A2A2A]" />
                </div>
              </TableCell>
              <TableCell className="py-4 text-center">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-24 bg-[#2A2A2A]" />
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap text-center py-4">
                <div className="flex justify-center">
                  <Skeleton className="h-4 w-32 bg-[#2A2A2A]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-2">
                  <Skeleton className="h-4 w-24 bg-[#2A2A2A]" />
                  <div className="h-6 w-6 flex items-center justify-center">
                    <Skeleton className="h-3.5 w-3.5 rounded-full" />
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
