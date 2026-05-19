export interface SocialLink {
  id: string;
  label: string;
  href: string;
  username: string;
}

export const social: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/yocopk",
    username: "@yocopk",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andrea-marchese/",
    username: "/in/andrea-marchese",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:a.marchese@emergento.com",
    username: "a.marchese@emergento.com",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/yocopk",
    username: "@yocopk",
  },
];

export const primaryEmail = "a.marchese@emergento.com";
