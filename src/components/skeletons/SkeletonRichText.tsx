import { SkeletonText } from '@/components/skeletons/SkeletonText';

export default function SkeletonRichText() {
  return (
    <div className="space-y-1px mt-8">
      <SkeletonText width="95%"/>
      <SkeletonText width="75%"/>
      <SkeletonText width="90%"/>
      <SkeletonText width="100%"/>
      <SkeletonText width="85%"/>
      <SkeletonText width="60%"/>
    </div>
  );
}
