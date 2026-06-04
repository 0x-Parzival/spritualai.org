import { notFound } from 'next/navigation';
import ProductDetailPage from './ProductDetailPage';
import { getBlock } from '@/lib/blockplain';

interface PageProps {
  params: Promise<{ csn: string; productId: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { csn, productId } = await params;
  const decodedCsn = decodeURIComponent(csn);

  const block = await getBlock(decodedCsn);
  if (!block) {
    notFound();
  }

  const reportData = block.reportData as any;
  const products = reportData?.products || [];
  const product = products.find((p: any) => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailPage
      product={product}
      csn={decodedCsn}
      mbti={block.mbti || 'Seeker'}
      identity={reportData?.report?.consciousnessIdentity || reportData?.patternName || 'The Hidden Self'}
    />
  );
}
