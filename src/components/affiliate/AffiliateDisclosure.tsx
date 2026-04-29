interface Props {
  className?: string;
}

export default function AffiliateDisclosure({ className = '' }: Props) {
  return (
    <p className={`text-[11px] text-gray-500 leading-relaxed ${className}`}>
      This link is an affiliate link. If you buy through it we may earn a
      commission at no extra cost to you.
    </p>
  );
}
