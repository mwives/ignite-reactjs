import { useRouter } from "next/router";
import Link, { LinkProps } from "next/link";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  exact?: boolean;
}

export function ActiveLink({
  children,
  exact = false,
  ...props
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  let isActive = false;

  if (exact) {
    if (asPath === props.href || asPath === props.as) {
      isActive = true;
    }
  } else {
    if (
      asPath.startsWith(String(props.href)) ||
      asPath.startsWith(String(props.as))
    ) {
      isActive = true;
    }
  }

  return (
    <Link {...props}>
      {cloneElement(children, { color: isActive ? "pink.400" : "gray.50" })}
    </Link>
  );
}
