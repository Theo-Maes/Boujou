import React, { SVGProps } from "react";

interface MySvg extends SVGProps<SVGSVGElement> {
  title?: string;
}

export const EyeIcon: React.FC<MySvg> = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    role="presentation"
    viewBox="0 0 19 18"
    height={props.height ?? "24"}
    width={props.width ?? "24"}
    {...props}
  >
    <title>{props.title ?? ""}</title>
    <path
      d="M12.1644 9.02778C12.1644 10.5128 10.9644 11.7127 9.47944 11.7127C7.99444 11.7127 6.79443 10.5128 6.79443 9.02778C6.79443 7.54278 7.99444 6.34277 9.47944 6.34277C10.9644 6.34277 12.1644 7.54278 12.1644 9.02778Z"
      stroke="#A1A1AA"
      stroke-width="1.35"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M9.47693 15.2298C12.1245 15.2298 14.5919 13.6699 16.3095 10.9699C16.9845 9.91237 16.9845 8.13488 16.3095 7.07738C14.5919 4.37738 12.1245 2.81738 9.47693 2.81738C6.82943 2.81738 4.36193 4.37738 2.64443 7.07738C1.96943 8.13488 1.96943 9.91237 2.64443 10.9699C4.36193 13.6699 6.82943 15.2298 9.47693 15.2298Z"
      stroke="#A1A1AA"
      stroke-width="1.35"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
