/**
 * ReviewerSlot, deferred E-E-A-T reviewer credit.
 *
 * Renders nothing until a real reviewer is secured and data is passed.
 * This component is dropped into content page templates NOW so reviewer
 * credit can be turned on later without touching individual pages.
 *
 * When populated, also add `reviewedBy` to the Article JSON-LD on that page.
 */
interface Props {
  reviewerName?: string;
  reviewerCredentials?: string;
  reviewDate?: string; // ISO date
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function ReviewerSlot({
  reviewerName,
  reviewerCredentials,
  reviewDate,
}: Props) {
  // Hidden until all three are populated
  if (!reviewerName || !reviewerCredentials || !reviewDate) return null;

  return (
    <div className="mt-3 text-xs text-gray-500 italic">
      Technically reviewed by{' '}
      <span className="font-medium text-gray-700">{reviewerName}</span>
      {', '}
      {reviewerCredentials}
      {' on '}
      <time dateTime={reviewDate}>{formatDate(reviewDate)}</time>.
    </div>
  );
}
