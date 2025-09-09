import { Skeleton } from '@/components/ui/skeleton';

export const HeroSkeleton = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <Skeleton className="h-12 w-3/4 mb-6 bg-gray-700" />
          <Skeleton className="h-6 w-full mb-4 bg-gray-700" />
          <Skeleton className="h-6 w-2/3 mb-8 bg-gray-700" />
          <Skeleton className="h-4 w-1/2 bg-gray-700" />
        </div>
        <div className="bg-white rounded-3xl p-8">
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const SectionSkeleton = ({ className = "" }: { className?: string }) => (
  <section className={`py-20 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <Skeleton className="h-10 w-1/2 mx-auto mb-6" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const CarsSkeleton = () => (
  <SectionSkeleton className="bg-background" />
);

export const TrustSkeleton = () => (
  <SectionSkeleton className="bg-gradient-subtle" />
);

export const TestimonialsSkeleton = () => (
  <section className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <Skeleton className="h-10 w-1/2 mx-auto mb-6" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 space-y-4">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, j) => (
                <Skeleton key={j} className="w-4 h-4" />
              ))}
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center space-x-3 pt-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);