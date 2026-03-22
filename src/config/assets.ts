/**
 * ============================================================
 *  ASSET CONFIG — edit paths here, nowhere else
 * ============================================================
 *
 *  All files must live inside the  public/  folder so Vite
 *  serves them at the root URL.
 *
 *  Current folder layout expected:
 *
 *  public/
 *  ├── assets_image/
 *  │   ├── HERObaCKGROUND.png
 *  │   ├── ABOUTSECTION.png
 *  │   ├── PROJECTSECTION.png
 *  │   └── Gemini_Generated_Image_4wmnxj4wm.png
 *  └── assets_model/
 *      ├── HERO_MODEL.glb
 *      ├── AI_CORE.glb
 *      ├── NEURAL_network.glb
 *      ├── skills.glb
 *      └── HOLOGRAPHIC_project_card.glb
 *
 *  To change a path just update the string below — the whole
 *  app picks up the change automatically.
 * ============================================================
 */

const BASE_MODEL = '/assets_model'
const BASE_IMAGE = '/assets_image'

export const MODELS = {
  hero: `${BASE_MODEL}/HERO_MODEL.glb`,
  aiCore: `${BASE_MODEL}/AI_CORE.glb`,
  neural: `${BASE_MODEL}/NEURAL_network.glb`,
  skills: `${BASE_MODEL}/skills.glb`,
  holoCard: `${BASE_MODEL}/HOLOGRAPHIC_project_card.glb`,
} as const

export const IMAGES = {
  heroBg: `${BASE_IMAGE}/HERObaCKGROUND.png`,
  about: `${BASE_IMAGE}/ABOUTSECTION.png`,
  project1: `${BASE_IMAGE}/PROJECTSECTION.png`,
  project2: `${BASE_IMAGE}/Gemini_Generated_Image_4wmhxj4wmhxj4wmh.png`,
} as const
