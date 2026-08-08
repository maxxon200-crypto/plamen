import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "filled" | "outline";

const variantClasses: Record<Variant, string> = {
  filled: "bg-blood text-white hover:bg-blood-hi",
  outline: "border-2 border-white text-white hover:bg-white hover:text-ink",
};

const baseClasses =
  "inline-flex min-h-11 min-w-11 items-center justify-center px-6 py-3 font-condensed text-body uppercase tracking-[0.02em] transition-colors";

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: Variant;
}

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
  variant?: Variant;
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

/**
 * Real, functional CTA element — never a dead button per CLAUDE.md. Pass
 * `href` for a link (renders <a>, e.g. tel:/maps links); omit it for a
 * <button> that takes standard button props (type, onClick, form, etc.).
 */
export default function Button({ variant = "filled", className = "", ...props }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as LinkButtonProps;
    return (
      <a href={href} className={classes} {...rest}>
        {props.children}
      </a>
    );
  }

  const { type = "button", ...rest } = props as ActionButtonProps;
  return (
    <button type={type} className={classes} {...rest}>
      {props.children}
    </button>
  );
}
