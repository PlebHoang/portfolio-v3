/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Capability {
  id: string;
  title: string;
  skills: string[];
  description: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  logoType: "ts" | "constructor";
  period: string;
  summary: string;
  description: string[];
  technologies: string[];
  metrics: string[];
}

export interface BeyondItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}
