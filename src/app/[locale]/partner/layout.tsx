// Force dynamic rendering for partner route
export const dynamic = 'force-dynamic';

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
