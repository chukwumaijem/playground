import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';

export function ContractHeroSkeleton() {
  return (
    <Card className="flex h-full w-full items-center overflow-hidden">
      <CardContent className="flex h-[300px] w-[300px] flex-col items-center justify-center !p-0">
        <Skeleton className="aspect-square h-full w-full" />
      </CardContent>

      <CardHeader className="flex h-full flex-grow flex-col !p-4">
        <Skeleton className="mb-2 h-6 w-[200px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[250px]" />
      </CardHeader>
    </Card>
  );
}
