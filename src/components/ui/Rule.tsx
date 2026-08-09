interface RuleProps {
  className?: string;
}

/**
 * 2px blood-red horizontal divider. The only sanctioned use of red as a
 * rule element per CLAUDE.md's palette table.
 */
export default function Rule({ className = "" }: RuleProps) {
  return <hr className={`h-0.5 w-full border-0 bg-blood ${className}`} />;
}
