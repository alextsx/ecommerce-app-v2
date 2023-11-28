import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export function FeatureCard({ title, link }: { title: string; link: string }) {
  return (
    <Card className="max-w-[350px] row-span-1 md:row-span-4 lg:row-span-4 bg-primary/80 hover:bg-primary text-primary-foreground">
      <CardHeader className="flex justify-center items-center py-14">
        <div className="text-box-content text dark">
          <div className="text-inner text-center">
            <CardTitle className="uppercase">
              <strong>{title}</strong>
            </CardTitle>
            <div className="is-divider divider clearfix"></div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
