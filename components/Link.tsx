import NextLink from "next/link";

type Props = {
  href?: string;
  children?: any;
  className?: string;
};

export const Link: React.FunctionComponent<Props> = ({
  href = "",
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};
