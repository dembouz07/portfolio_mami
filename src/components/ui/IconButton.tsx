import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";

import { cn } from "../../lib/cn";

interface IconButtonSharedProps {
  readonly label: string;
  readonly icon: ReactNode;
  readonly className?: string;
}

export type IconButtonLinkProps = IconButtonSharedProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "aria-label" | "children" | "className" | "href"
  > & {
    readonly href: string;
  };

export type IconButtonButtonProps = IconButtonSharedProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "aria-label" | "children" | "className"
  >;

export type IconButtonProps = IconButtonLinkProps | IconButtonButtonProps;

const baseClassName =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] transition-[color,border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] motion-reduce:transform-none motion-reduce:transition-none";

export function IconButton(props: IconButtonLinkProps): ReactElement;
export function IconButton(props: IconButtonButtonProps): ReactElement;
export function IconButton(props: IconButtonProps): ReactElement {
  if ("href" in props) {
    const {
      label,
      icon,
      className,
      href,
      target,
      rel,
      ...anchorProps
    } = props;

    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        className={cn(baseClassName, className)}
        aria-label={label}
        title={label}
        {...anchorProps}
      >
        <span aria-hidden="true">{icon}</span>
      </a>
    );
  }

  const { label, icon, className, type = "button", ...buttonProps } = props;

  return (
    <button
      type={type}
      className={cn(baseClassName, className)}
      aria-label={label}
      title={label}
      {...buttonProps}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}

export default IconButton;
