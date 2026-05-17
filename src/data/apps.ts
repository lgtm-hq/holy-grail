import type { Section } from "./apps-types";
import {
  authenticatorsSection,
  passwordManagersSection,
  securityPrivacySection,
} from "./sections/auth-security";
import { aiSection, browsersSection, developmentSection } from "./sections/browsers-dev-ai";
import {
  communicationSection,
  documentsCloudStorageSection,
  menuBarSection,
  workflowSection,
} from "./sections/productivity-communication";
import {
  filesMediaSection,
  screenshotsSection,
  systemMaintenanceSection,
  virtualizationSection,
} from "./sections/system-media";
import {
  gamingStreamingSection,
  remoteDesktopSection,
  smartHomeSection,
} from "./sections/remote-fun-home";

export type * from "./apps-types";

export const sections: Section[] = [
  passwordManagersSection,
  authenticatorsSection,
  browsersSection,
  aiSection,
  developmentSection,
  workflowSection,
  menuBarSection,
  communicationSection,
  documentsCloudStorageSection,
  virtualizationSection,
  filesMediaSection,
  screenshotsSection,
  securityPrivacySection,
  systemMaintenanceSection,
  remoteDesktopSection,
  gamingStreamingSection,
  smartHomeSection,
];
