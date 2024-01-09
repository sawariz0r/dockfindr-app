export interface Config {
  collections: {
    users: User;
    media: Media;
    points: Point;
    "payload-preferences": PayloadPreference;
    "payload-migrations": PayloadMigration;
  };
  globals: {};
}
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
export interface Media {
  id: string;
  title?: string | null;
  uploadedBy?: (string | null) | User;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}
export interface Point {
  id: string;
  title?: string | null;
  city?: string | null;
  /**
   * @minItems 2
   * @maxItems 2
   */
  location?: [number, number] | null;
  createdBy?: string | null;
  reviewed?: boolean | null;
  locked?: boolean | null;
  price?: number | null;
  rampType?: ("naturramp" | "anlagd-ramp" | "annat")[] | null;
  additionalInfo?: string | null;
  images?:
    | {
        image: string | Media;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: "users";
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}

declare module "payload" {
  export interface GeneratedTypes extends Config {}
}
